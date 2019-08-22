Better small cluster with large nodes or smaller nodes in a single cluster?

# Few large nodes

Large number of Pods on each node, but few nodes.

## Pro

- Lower hardware/IaaS cost: one large node with 10 times the capacity of a small nodes may be cheaper than 10 of the small nodes together
- Less management overhead: you have to manage only one node instead of 10 nodes

## Contra

- It means a large number of Pods per node. The problems this introduces are:
  - The maximum number of Pods per node [is by default set to 110](https://kubernetes.io/docs/setup/best-practices/cluster-large/). This is a soft limit, powerful machines can without problems run more Pods. Yet the limit was [never removed](https://github.com/kubernetes/kubernetes/issues/23349#issuecomment-329811637) because it's hard to predict how many Pods can reliably run on a given node. 
    - There is an open Github Issue about changing the default limit (going on 3 years now) with [some graphs] (https://github.com/kubernetes/kubernetes/issues/23349#issuecomment-201004660) about the performance of large 
  - Kubelet overhead: the kubelet has to manage more containers
    - Liveness and readiness probes
  -  Every running container introduces a small level of overhead, even if it's doing nothing. Kubelet polls docker on a routine basis to gather container status, if the command takes too long to iterate through every container your node can actually go NotReady (Comment on https://github.com/kubernetes/kubernetes/issues/45419#issuecomment-304413713)
  - Each Pod on a node introduces some [overhead on the management agents](https://github.com/kubernetes/kubernetes/issues/23349#issuecomment-201084228) on the node (Docker, kubelet cAdvisor, network plugin, storage plugin)
  -  Resiliency, If you are running a node with 1000 pods and it fails, there is a lot of overhead for those pods to get rescheduled. Not just kubernetes, which can schedule pretty fast, but you have to think about nodes pulling images and the IO impact to other services running, network bottlenecks as services get restarted and retry connections as well as the cascading impact that has across your environment.

# Many small nodes

Small number of Pods on each node

# Conclusion

In practice, most nodes host [not more than 100 Pods](https://github.com/kubernetes/kubernetes/issues/23349#issuecomment-200484407).

* * *

https://www.reddit.com/r/kubernetes/comments/baxrtj/eks_which_instance_types_and_why/

Also, Fargate (no nodes at all)
Also Banzai telescope (query for best cheap instance type)

https://srcco.de/posts/many-kubernetes-clusters.html
https://thenewstack.io/the-optimal-kubernetes-cluster-size-lets-look-at-the-data/
