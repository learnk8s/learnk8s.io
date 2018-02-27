---
layout: post
title: Causing deliberate disruptions on Kubernetes
description:
date: 2018-02-27 05:33:00
categories: kubernetes kubeproxy network
image:
open_graph:
  type: article
  title: Causing deliberate disruptions on Kubernetes
  image:
  description:
---

When you deploy an application in Kubernetes, your code ends up running on one or more worker nodes. Nodes are just virtual machines such as AWS EC2 or Google Compute Engine and having several of them means you can efficiently run and scale your application across instances. If you have a cluster made of three nodes and decide to scale your application to have four replicas, Kubernetes will spread the replicas across the nodes evenly like so:

[TODO: PICT]

The architecture described above works particularly well in case of failures. If the first node was to be unavailable, the other two could still serve traffic to the application. Meanwhile, Kubernetes has enough time to reschedule the fourth replica to another node.

Let's scale down the application to two replicas:

[TODO: PICT]

Since each node can serve traffic to the application, how does the third node know that it doesn't run the application and has to reroute the traffic to one of the other nodes?

[TODO: PICT]

Kubernetes has a binary called kubeproxy that runs on each node, and that is in charge of setting routing tables. Each node has the same set of rules and, in this scenario, they look like this:

- Application instance 1 is available on Node 1
- Application instance 2 is available on Node 2

It doesn't matter which node the traffic is coming from; the iptables rules are in charge of redirecting the traffic to the right node. And kubeproxy is in charge of updating and deleting the iptables rules when needed.

But what happens when you drop the iptables manually from a node?

[Manabu Sakai tried just that](https://blog.manabusakai.com/2018/02/fault-tolerance-of-kubernetes/).

You will need a cluster with more than one node to test this — Minkube won't cut it.
Manabu created a Kubernetes cluster on AWS using KOPS. The version of the Kubernetes cluster is 1.8.6.

The demo application with the kube configuration files is available on [manabusakai/k8s-hello-world](https://github.com/manabusakai/k8s-hello-world).

The cluster is running on two nodes:

```bash
$ kubectl get no
NAME                                              STATUS  ROLES   AGE VERSION
ip-172-20-46-130.ap-northeast-1.compute.internal  Ready   master  17h v1.8.6
ip-172-20-64-88.ap-northeast-1.compute.internal   Ready   node    18h v1.8.6
```

The application is scaled to have ten replicas evenly ditrbuted across the two nodes:

```bash
$ kubectl get po
NAME                              READY STATUS RESTARTS AGE
k8s-hello-world-55f48f8c94-7shq5  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-9w5tj  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-cdc64  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-lkdvj  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-npkn6  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-ppsqk  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-sc9pf  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-tjg4n  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-vrkr9  1/1   Running 0       1m
k8s-hello-world-55f48f8c94-xzvlc  1/1   Running 0       1m
```

A Service was created to load balance the requests across ten replicas:

```bash
$ kubectl get svc
NAME              TYPE      CLUSTER-IP      EXTERNAL-IP PORT(S)         AGE
k8s-hello-world   NodePort  100.69.211.31   <none>      8080:30000/TCP  3h
kubernetes        ClusterIP 100.64.0.1      <none>      443/TCP         18h
```

The service is exposed to the outside world using a `NodePort` on port 30000. In other words, each node has port 30000 opened to the public internet and can accept incoming traffic. kubeproxy is in charge of setting up the iptables rules to route the incoming traffic from port 30000 to one of the ten pods.

You should try and hit a node on port 30000:

```bash
$ curl ip-172-20-46-130.ap-northeast-1.compute.internal:30000
```

You should be greeted by `Hello world! via k8s-hello-world-55f48f8c94-tjg4n`. Or the name of any other Pods. Please note how even if you're always querying one node, your requests are routed to pods hosted on the other node too.

To complete your setup, you should have an external load balancer routing the traffic to your nodes on port 30000.

[TODO: PICT]

## It's time to break things

Back to the original question. What if you drop the iptables rule? Will the cluster still work? What about the pods?

Let's go ahead and do that.

In a separate shell, you should set up curl to query the application every second and monitor for dropped requests:

```
$ while sleep 1; do date +%s; curl -sS http://k8s-hello-world.manabusakai.com/ | grep ^Hello; done
```

Log into one of the node servers and delete the iptables rules with `iptables -F`.

If everything went according to plan you should experience something similar to this:

```bash
1519526805 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
1519526807 Hello world! via k8s-hello-world-55f48f8c94-tjg4n
# this is when `iptables -F` was issued
1519526834 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
1519526835 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
```

As you can notice, it took about 27 seconds from when you dropped the iptables rules and the next response, from 1519526807 to 1519526834. During this time the external load balancer queued the request, and the curl command was waiting for a response.

The node couldn't reply because there was no rule to route the incoming traffic!

And in the meantime the iptables you deleted is magically restored:

```bash
$ iptables -L
```

Regardless of how many times you do it, it takes about 20s for the iptables rules to be restored.

Who puts the iptables rules back? Why 20 seconds?

Since the iptables rules are restored, perhaps the clue could be in the logs.

If you tail `/var/log/daemon.log` and look for any logs created after the `iptables -F` you should find the culprit:

```text
Feb 25 03:17:33 ip-172-20-64-88 kubelet[1229]: I0225 03:17:33.070531 1229 qos_container_manager_linux.go:320] [ContainerManager]: Updated QoS cgroup configuration
```

It's time to inspect the source code for [`kubernetes/pkg/kubelet/cm/qos_container_manager_linux.go`](https://github.com/kubernetes/kubernetes/blob/release-1.8/pkg/kubelet/cm/qos_container_manager_linux.go#L320).

And from [the official documentation for the Kubelet](https://kubernetes.io/docs/reference/generated/kubelet/) we're finally getting some clarity:

> The kubelet takes a set of PodSpecs that are provided through various mechanisms (primarily through the apiserver) and ensures that the containers described in those PodSpecs are running and healthy.

and

> [...] Files under this path will be monitored periodically for updates. The monitoring period is 20s by default and is configurable via a flag.

You can verify this is the case by inspecting the kubelet process in the node. You should be able to see the kubelet running with `--pod-manifest-path=/etc/kubernetes/manifests`. You should be able to inspect the folder with:

```bash
$ ls -l /etc/kubernetes/manifests
total 4 -rw-r--r-- 1 root root 1398 Feb 24 08:08 kube-proxy.manifest
```

There is a file called `kube-proxy.manifest`!

Mystery unravelled!

The kubelet monitors the state every 20 seconds, and when the state is wrong, it reverts to the setting in the manifest file.

## Lesson learned

Dropping iptables is similar to losing a node. The traffic is still routed to the node, but the node is not able to forward it further. Kubernetes can recover from a similar failure by monitoring the state of the iptables and restoring it if necessary.