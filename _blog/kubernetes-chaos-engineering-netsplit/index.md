---
layout: post
title: "Kubernetes Chaos Engineering: Simulating Network Partitions"
description:
date: 2018-02-27 05:33:00
categories: kubernetes kubeproxy network
image: /blog/kubernetes-chaos-engineering-netsplit/chaos-engineering-kubernetes.png
js:
  - anime.min.js
  - isScrolledIntoView.js
open_graph:
  type: article
  title: "Kubernetes Chaos Engineering: Simulating Network Partitions"
  image: /blog/kubernetes-chaos-engineering-netsplit/chaos-engineering-kubernetes.png
  description: What happens when you deliberately disrupt the network proxy in Kubernetes? Does it still work? Perhaps it will self heal if given enough time? This post explores how Kubernetes is designed to handle failures and how you can tweak your cluster to survive network partitions.
---

When you deploy an application in Kubernetes, your code ends up running on one or more worker nodes. Nodes are virtual machines such as AWS EC2 or Google Compute Engine and having several of them means you can run and scale your application across instances efficiently. If you have a cluster made of three nodes and decide to scale your application to have four replicas, Kubernetes will spread the replicas across the nodes evenly like so:

{% include_relative deployment.html %}

The architecture described above works particularly well in case of failures. If the first node were to be unavailable, the other two could still serve the application. Meanwhile, Kubernetes has enough time to reschedule the fourth replica to another node.

{% include_relative node-drained.html %}

Even better, if all of the nodes were to become isolated, they could still serve traffic. Let's scale down the application to two replicas:

{% include_relative two-replicas.html %}

Since each node can serve the application, how does the third node know that it doesn't run the application and has to route the traffic to one of the other nodes?

{% include_relative kube-proxy.html %}

Kubernetes has a binary called `kube-proxy` that runs on each node, and that is in charge of routing the traffic to a specific pod. You can think of `kube-proxy` like a receptionist. The proxy intercepts all the traffic directed to the node and routes it to the right pod.

**But how does `kube-proxy` know where are all the pods?** It doesn't.

The master node knows *everything* and is in charge of creating the list with all the routing rules. `kube-proxy` is in charge of checking and enforcing the rules on the list. In the simple scenario above, the list looks like this:

- Application instance 1 is available on Node 1
- Application instance 2 is available on Node 2

It doesn't matter which node the traffic is coming from; `kube-proxy` knows where the traffic should be forwarded to by looking at the list.

{% include_relative iptables.html %}

## But what happens when `kube-proxy` crashes?

And what if the list of rules is lost?

What happens when there's no rule to forward the traffic to?

[Manabu Sakai had the same questions](https://blog.manabusakai.com/2018/02/fault-tolerance-of-kubernetes/). So he decided to find out.

Let's assume you have a 2 node cluster on GCP:

```bash
$ kubectl get nodes
NAME                                              STATUS  ROLES   AGE VERSION
ip-172-20-46-130.ap-northeast-1.compute.internal  Ready   master  17h v1.8.6
ip-172-20-64-88.ap-northeast-1.compute.internal   Ready   node    18h v1.8.6
```

And you deployed Manabu's application with:

```bash
$ kubectl create -f https://raw.githubusercontent.com/manabusakai/k8s-hello-world/master/kubernetes/deployment.yml
$ kubectl create -f https://raw.githubusercontent.com/manabusakai/k8s-hello-world/master/kubernetes/service.yml
```

You should scale the deployments to ten replicas with:

```bash
$ kubectl scale --replicas 10 deployment/k8s-hello-world
```

The ten replicas are ditributed evenly across the two nodes:

```bash
$ kubectl get pods
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

A Service was created to load balance the requests across the ten replicas:

```bash
$ kubectl get services
NAME              TYPE      CLUSTER-IP      EXTERNAL-IP PORT(S)         AGE
k8s-hello-world   NodePort  100.69.211.31   <none>      8080:30000/TCP  3h
kubernetes        ClusterIP 100.64.0.1      <none>      443/TCP         18h
```

The service is exposed to the outside world using `NodePort` on port 30000. In other words, each node has port 30000 opened to the public internet and can accept incoming traffic.

But how is the traffic routed from port 30000 to my pod?

`kube-proxy` is in charge of setting up the rules to route the incoming traffic from port 30000 to one of the ten pods.

You should try to request the node on port 30000:

```bash
$ curl ip-172-20-46-130.ap-northeast-1.compute.internal:30000
```

The application replies with *Hello World!* and the hostname of the container is running on. In the previous command, you should be greeted by `Hello world! via <hostname>`.

If you keep requesting the same URL, you may notice how sometimes you get the same response and sometimes it changes. `kube-proxy` is acting as a load balancer and is looking at the routing list and distributing the traffic across the ten pods.

What's more interesting is that it doesn't matter which node you request. The response could come from any pod, even one that is not hosted on the same node you made the request to.

To complete your setup, you should have an external load balancer routing the traffic to your nodes on port 30000.

{% include_relative load-balancer.svg %}

The load balancer will route the incoming traffic from the internet to one of the two pods.

If you're confused by how many load balancer-like things we have, let me quickly recap:

1. Traffic coming from the internet is routed to the primary load balancer
1. The load balancer forwards the traffic to one of the two nodes on port 30000
1. The rules set up by `kube-proxy` route the traffic from the node to a pod
1. the traffic reaches the pod

Phew! That was long!

## It's time to break things

Now that you know how things are plugged in together let's get back to the original question.

*What if you tamper with the routing rules?*

*Will the cluster still work?*

*Do the pods still serve requests?*

Let's go ahead and delete the routing rules.

In a separate shell, you should monitor the application for time and dropped requests. You could use a command like this:

```bash
$ while sleep 1; do date +%s; curl -sS http://<your cluster>/ | grep ^Hello; done
```

In this case, you have the timestamp in the first column and the response from the pod in the other:

```bash
1519526805 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
1519526807 Hello world! via k8s-hello-world-55f48f8c94-tjg4n
```

It's time to drop the bomb. Let's delete the routing rules from the node.

`kube-proxy` can operate in three modes: **userspace**, **iptables** and **ipvs**. The default since Kubernetes 1.2 is **iptables**.

In **iptables** mode, `kube-proxy` writes the list of routing rules to the node using iptables rules.

So you could log in into one of the node servers and delete the iptables rules with `iptables -F`.

If everything went according to plan you should experience something similar to this:

```bash
1519526805 Hello world! via k8s-hello-world-55f48f8c94-xzvlc
1519526807 Hello world! via k8s-hello-world-55f48f8c94-tjg4n
# this is when `iptables -F` was issued
1519526834 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
1519526835 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
```

As you noticed, it took about 27 seconds from when you dropped the iptables rules and the next response, from 1519526807 to 1519526834.

*What happened in this 27 seconds?*

*Why is everything back to normal after 27 seconds?*

Perhaps it's just a coincidence. Let's flush the rules again:

```bash
1519526855 Hello world! via k8s-hello-world-55f48f8c94-xzvlc
1519526856 Hello world! via k8s-hello-world-55f48f8c94-tjg4n
# this is when `iptables -F` was issued
1519526885 Hello world! via k8s-hello-world-55f48f8c94-npkn6
1519526887 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
```

There was a gap of 29 seconds, from 1519526856 to 1519526885, but the cluster is back to normal.

*Why does it take about 30 seconds to reply?*

*Is the node receiving traffic despite no routing table?*

Maybe you could investigate what happens to the node in this 30 seconds. In another terminal, let's monitor requests to the node with:

```bash
$ while sleep 1; printf %"s\n" $(curl -sS http://<ip of the node>:30000); done
```

And let's drop the iptables rules. The log from the previous command is:

```bash
Hello world! via k8s-hello-world-55f48f8c94-xzvlc
Hello world! via k8s-hello-world-55f48f8c94-tjg4n
curl: (28) Connection timed out after 10003 milliseconds
curl: (28) Connection timed out after 10004 milliseconds
Hello world! via k8s-hello-world-55f48f8c94-npkn6
Hello world! via k8s-hello-world-55f48f8c94-vrkr9
```

It shouldn't come as a surprise that connections to the node are timing out after you drop the iptables rules. What's more interesting is that `curls` waits for ten seconds before giving up.

*What if in the previous example the load balancer is waiting for the connection to be made?*

That would explain the 30 seconds delay. But it doesn't tell why the node is ready to accept connection when you wait long enough.

*So why is the traffic recovering after 30 seconds?*

*Who is putting the iptables rules back?*

Before you drop the iptables rules, you can inspect them with:

```bash
$ iptables -F
```

Soon after you drop the rules, you should keep executing `iptables -F` and notice that the rules are back in few seconds!

*Is this you, `kube-proxy`?*

Yes, it is.

Digging in the [official documentation for `kube-proxy`](https://kubernetes.io/docs/reference/generated/kube-proxy/) reveals two interesting flags:

- `--iptables-sync-period` - The maximum interval of how often iptables rules are refreshed (e.g. '5s', '1m', '2h22m'). Must be greater than 0. (default 30s)
- `--iptables-min-sync-period` - The minimum interval of how often the iptables rules can be refreshed as endpoints and services change (e.g. '5s', '1m', '2h22m'). (default 10s)

`kube-proxy` refreshes the iptables rules every 10 to 30 seconds. If we drop the iptables rules, it will take up to 30 seconds for `kube-proxy` to realise and restore them back.

That explains why it took 30 seconds to get your node back!

It also explains how routing tables are propagated from the master node to the worker node. `kube-proxy` is in charge of syncing them on a regular basis. In other words, every time a pod is added or deleted, the master node recomputes the routing list. On a regular interval, `kube-proxy` syncs the rules into the current node.

Let's recap how Kubernetes and `kube-proxy` can recover from someone tampering with the iptables rules on the node:

1. The iptables rules are deleted from the node
1. A request is forwarded to the load balancer and routed to the node
1. The node doesn't accept incoming requests, so the load balancer waits
1. After 30 seconds `kube-proxy` restores the iptables
1. The node can serve traffic again. The iptables rules forward the request from the load balancer to the pod
1. The pod replies to the load balancer with a 30 seconds delay

Waiting for 30 seconds may be unacceptable for your application. You may be interested in tweaking the default refresh interval for `kube-proxy`.

*So where are the settings and how can you change them?*

It turns out that there's an agent on the node — *the kubelet* — that is in charge of starting `kube-proxy` as a static pod on each node. The documentation for static pods suggests that the kubelet scans a specific folder and creates all the resources contained in that folder.

If you inspect the kubelet process in the node, you should be able to see the kubelet running with `--pod-manifest-path=/etc/kubernetes/manifests`.

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

You can see how `--iptables-sync-period=30s` is used to refresh the iptables rules every 30 seconds. You could go ahead and modify that command to customise the min and max time to update the iptables rules for that node.

## Lesson learned

Dropping iptables rules is similar to make a node unavailable. The traffic is still routed to the node, but the node is not able to forward it further. Kubernetes can recover from a similar failure by monitoring the state of the routing rules and updating them when necessary.

Many thanks to [Manabu Sakai](https://twitter.com/manabusakai)'s blog post that was a huge inspiration and to [Valentin Ouvrard](https://twitter.com/Valentin_NC) for investigating the issue with the iptables propagation.

If you liked the article and you want to know more, subscribe to our newsletter!