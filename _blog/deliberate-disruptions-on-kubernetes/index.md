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

When you deploy an application in Kubernetes, your code ends up running on one or more worker nodes. Nodes are just virtual machines such as AWS EC2 or Google Compute Engine and having several of them means you can run and scale your application across instances efficiently. If you have a cluster made of three nodes and decide to scale your application to have four replicas, Kubernetes will spread the replicas across the nodes evenly like so:

[TODO: PICT]

The architecture described above works particularly well in case of failures. If the first node were to be unavailable, the other two could still serve the application. Meanwhile, Kubernetes has enough time to reschedule the fourth replica to another node.

[TODO: PICT]

Even better, if all of the nodes were to become isolated, they could still serve traffic.

[TODO: PICT]

Let's scale down the application to two replicas:

[TODO: PICT]

Since each node can serve the application, how does the third node know that it doesn't run the application and has to reroute the traffic to one of the other nodes?

[TODO: PICT]

Kubernetes has a binary called kube-proxy that runs on each node, and that is in charge of setting routing tables. Each node has the same set of rules and, in this scenario, they look like this:

- Application instance 1 is available on Node 1
- Application instance 2 is available on Node 2

It doesn't matter which node the traffic is coming from; the iptables rules are in charge of redirecting the traffic to the right node. And kube-proxy is in charge of adding and deleting the iptables rules when needed.

But what happens when you drop the iptables manually from a node?

[Manabu Sakai tried just that](https://blog.manabusakai.com/2018/02/fault-tolerance-of-kubernetes/).

You will need a cluster with more than one node to test this — Minkube won't cut it since it's running on a single node.
Manabu created a Kubernetes cluster on AWS using KOPS and in this article you'll replicate his findings.

The demo application with the kube configuration files is available on [manabusakai/k8s-hello-world](https://github.com/manabusakai/k8s-hello-world). The version of the Kubernetes cluster is 1.8.6.

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

The service is exposed to the outside world using `NodePort` on port 30000. In other words, each node has port 30000 opened to the public internet and can accept incoming traffic. kube-proxy is in charge of setting up the iptables rules to route the incoming traffic from port 30000 to one of the ten pods.

You should try and hit a node on port 30000:

```bash
$ curl ip-172-20-46-130.ap-northeast-1.compute.internal:30000
```

You should be greeted by `Hello world! via k8s-hello-world-55f48f8c94-tjg4n`. Or the name of any other pod. Please note how even if you're always querying one node, your requests are routed to pods hosted on the other node too.

To complete your setup, you should have an external load balancer routing the traffic to your nodes on port 30000.

[TODO: PICT]

## It's time to break things

Back to the original question. What if you drop the iptables rules? Will the cluster still work? What about the pods?

Let's go ahead and do that.

In a separate shell, you should set up `curl` to query the application every second and monitor for dropped requests:

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

As you can notice, it took about 27 seconds from when you dropped the iptables rules and the next response, from 1519526807 to 1519526834. During this time the external load balancer queued the request, and the `curl` command was waiting for a response.

The node couldn't reply because there was no rule to route the incoming traffic!

And in the meantime the iptables rules that you deleted are magically restored:

```bash
$ iptables -L
```

Regardless of how many times you do it, it takes about 30 seconds for the iptables rules to be restored.

Who puts the iptables rules back? Why 30 seconds?

It's all kube-proxy's fault, again.

You already familiar with kube-proxy generating iptables rules to route incoming traffic to the right pod. In the scenario above, kube-proxy sets up iptables rules in order to do random load balancing between the ten pods.

When you request for the node on port 30000, the ip address is resolved to the IP address of the service 100.69.211.31, and then iptables rules on your local host (generated by kube-proxy) redirect it to one of the ten IP addresses of the pods at random.

So how does kube-proxy know when a new ip address was added, removed or simply dropped like in your case?

Digging in the [official documentation for kube-proxy](https://kubernetes.io/docs/reference/generated/kube-proxy/) reveals two interesting flags:

- `--iptables-sync-period` - The maximum interval of how often iptables rules are refreshed (e.g. '5s', '1m', '2h22m'). Must be greater than 0. (default 30s)
- `--iptables-min-sync-period` - The minimum interval of how often the iptables rules can be refreshed as endpoints and services change (e.g. '5s', '1m', '2h22m'). (default 10s)

kube-proxy refreshes the iptables rules every 10 to 30 seconds. That explains why it took 30 seconds to get your node back!

But where are these flag set? And can you change them?

It turns out that the kubelet is in charge of starting kube-proxy as a static pod on each node. The documentation for static pods suggests that the kubelet scans a specific folder and creates all the resources contained in that folder. If you inspect the kubelet process in the node, you should be able to see the kubelet running with `--pod-manifest-path=/etc/kubernetes/manifests`.

Running a simple `ls` reveals the truth:

```bash
$ ls -l /etc/kubernetes/manifests
total 4 -rw-r--r-- 1 root root 1398 Feb 24 08:08 kube-proxy.manifest
```

And a quick `cat` of `kube-proxy.manifest` reveals the content:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-proxy
spec:
  hostNetwork: true
  containers:
  - name: kube-proxy
    image: gcr.io/google_containers/kube-proxy:v1.8.7-gke.1
    command:
    - /bin/sh
    - -c
    ->
    echo -998 > /proc/$$$/oom_score_adj &&
    exec kube-proxy
    --master=https://35.190.207.197
    --kubeconfig=/var/lib/kube-proxy/kubeconfig
    --cluster-cidr=10.4.0.0/14
    --resource-container=""
    --v=2
    --feature-gates=ExperimentalCriticalPodAnnotation=true
    --iptables-sync-period=30s
    1>>/var/log/kube-proxy.log 2>&1
```

> Please note that the content was truncated and is not shown in full.

Mystery unravelled!

You can see how `--iptables-sync-period=30s` is used to refresh the iptables rules every 30 seconds. You could go ahead and modify that command to customise the min and max time to refresh the iptables rules for that node.

## Lesson learned

Dropping iptables rules is similar to taking down a node. The traffic is still routed to the node, but the node is not able to forward it further. Kubernetes can recover from a similar failure by monitoring the state of the iptables rules and updating them when necessary.