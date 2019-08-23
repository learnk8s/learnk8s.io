Whenever you create a Kubernetes cluster, one of the first questions that you have to ask yourself is: "what type of worker nodes should I use and how many of them?".

If you're building an on-premises cluster, should you order some last-generation power servers, or should you use the dozen or so old machines that are still lying around in your data centre?

Or if you're using a managed Kubernetes service like [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/), should you use 8 `n1-standard-1` or 2 `n1-standard-4` machines to achieve your desired computing capacity?

## Cluster capacity

In general, a Kubernetes cluster abstracts a set of nodes as a single big node whose total compute capacity (in terms of CPU and memory) is the sum of all the constituent nodes' capacities.

Naturally, there are thus multiple ways to achieve a desired target cluster capacity.

For example, imagine that you need a cluster with a total capacity of 16 CPU cores and 16 GB of RAM.

> This corresponds to the total amount of resources that your applications need to run.

Here are just two of the possible choices you have to design such a cluster:

![Small vs. large nodes](small-vs-large-nodes.svg)

With both options, the total capacity of the cluster is the same — but one uses 16 smaller nodes, whereas the other uses 4 larger nodes.

> All nodes are assumed to be worker nodes. The choice of number and size of master nodes is a topic on its own.

_Which is better?_

To approach this question, let's look at the pros and cons of the two opposing directions of "few large nodes" and "many small nodes".

## Few large nodes

The most extreme case in this direction would be to have a single worker node that provides the entire desired cluster capacity.

In the above example, this would be a single worker node with 16 CPU cores and 16 GB of RAM.

_Let's look at what advantages such an approach could have._

### Pro

#### Less management overhead

Simply said, having to manage a small number of machines is less labourious than having to manage a large number of machines.

Updates and patches can be applied more quickly, the machines can be kept in sync more easily.

Furthermore, the absolute number of failures to expect is smaller with few machines than with many machines.

_However, note that this applies primarily to bare metal servers and not to cloud instances._

If you use cloud instnaces (as part of a managed Kubernetes service or your own Kubernetes installation on cloud infrastructure) you outsource the management of the underlying machines to the cloud provider.

Thus managing, 10 nodes in the cloud is not much more work than managing a 1 node in the cloud.

#### Lower costs per node

While a more powerful machine is clearly more expensive than a low-end machine, the price increase is not necessarily linear.

In other words, a single machine with 10 CPU cores and 10 GB of RAM might be cheaper than 10 machines with 1 CPU core and 1 GB of RAM each.

_However, note again that this likely doesn't apply if you use cloud instances._

In the current pricing schemes of the major cloud providers [Amazon Web Services](https://aws.amazon.com/ec2/pricing/on-demand/), [Google Cloud Platform](https://cloud.google.com/compute/vm-instance-pricing), and [Microsoft Azure](https://azure.microsoft.com/en-us/pricing/calculator/#virtual-machines), the instance prices increase linearly with the capacity.

For example, on Google Cloud Platform, 64 `n1-standard-1` instances cost you exactly the same as a single `n1-standard-64` instance — so you can't save any money there.

#### Allows to run resource-hungry applications

Despite all pros and cons, having large nodes might be simply a requirement for the type of application that you are running.

For example, if you have a machine learning application that requires 8 GB of memory, you can't run it on a cluster that has only 1 GB RAM nodes — but you can run it on a cluster that has, say, 10 GB RAM nodes.

_Having seen the pros of large nodes, let's see what the cons are._

### Contra

#### Larger number of pods per node 

If your applications consist of a certain number of pods, then having fewer nodes means a larger number of pods per node.

_This can be an issue._

The reason is that each pod introduces some overhead on the Kubernetes agents that run on the node — such as the container runtime (e.g. Docker), the kubelet, and cAdvisor.

For example, the kubelet executes regular liveness and readiness probes against each container on the node — more pods means more load on the kubelet.

Or, the cAdvisor collects resource usage statistics of all containers on the node, and the kubelet regularly queries this information to expose it on its own API — again, more pods means more work.

There are reports of [nodes being reported as `NonReady`](https://github.com/kubernetes/kubernetes/issues/45419) because the regular kubelet health checks iterating over all the containers on the node were taking too long.

All these issues depend on the type of node and are hard to predict.

**For these reasons, Kubernetes [recommends a limit of 110 pods per node](https://kubernetes.io/docs/setup/best-practices/cluster-large/).**

_You can run more pods per node, but you might run into issues._

If you use managed Kubernetes services, you even have a fixed limit on the number of pods you can run on a node:

- For [Amazon Elastic Kubernetes Service (EKS)](https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt), the maximum numer of pods per node depends on the node type and ranges from 4 to 737.
- For [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/quotas), the limit is 100 pods per node, regardless of the type of node.
- For [Azure Kubernetes Servcie (AKS)](https://docs.microsoft.com/bs-latn-ba/azure/aks/configure-azure-cni#maximum-pods-per-node), the default limit is 30 but it can be increased up to 250 pods per node.

To summarise, if your applications consists of 1000 pods, then you most likely can't run it reliably on a cluster with only 2 nodes — you might have to resort to a cluster with more (and possible smaller) nodes.

#### Less replication/high-availability

A small number of nodes limits might impact the grade of replication for youra applications

For example, if you have a high-availability applications with 5 replicas and run it on a cluster with only 2 nodes, then the effective replication is reduced from 5 to 2.

This is because the 5 replicas of your app can be distributed to at most 2 nodes, and if both of these nodes fail, the entire app is down (instead of 5 failures to bring the entire app down).

Thus, if you have high-availability applications, the number of nodes should be at least as big as the desired grade of replication for these apps.

#### Higher blast radius

If you have only few nodes, then the impact of a node failing is bigger than if you have many nodes.

In the most extreme case of only a single node, this node failing means that the entirety of your applications are immediately down.

And even worse, since this was the only node, Kubernetes can't reschedule your workloads to any other nodes to bring your apps up again.

Even if you have multiple nodes and the workloads can be rescheduled, the overhead to do so is large — think about pulling container images, reconfiguring network connections, and so on.

Furthermore, if you have only few nodes, the risk that there is not enough spare capacity on the other nodes for rescheduling all the workloads of the failed node is higher — resulting in parts of your apps not being able to run again.

So, if reducing the impact of hardware failures is a concern for your, then a cluster with few large nodes might not be optimal.

#### Large scaling increments

When the utilisation of your cluster approaches its limits, you can add additional worker nodes to the cluster.

If your cluster runs on cloud infrastructure, you can set up your cluster to be scaled up and down automatically by using the [Kubernetes Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler).

If you use large nodes in your cluster, then adding a new node might be quite a large increment — probably larger than you need.

As a result, the new node may be underutilised — and you pay for resources that you don't use.

_Having discussed pros and cons of large nodes, let's turn to the small nodes scenario._

## Many small nodes

The most extreme case in this direction would be to run as many nodes as you have pods in your applications.


Small number of Pods on each node, but many nodes.

### Pro

The pros of using smaller nodes correspond mainly to the cons of using larger nodes.

Here are they again.

#### Reduced blast radius

If you have many small nodes, the impact of a single node failing is limited.

If your applications are well distributed across the nodes, chances are that none of your apps is completely down, but that only some replicas are lost.

Furthermore, Kubernetes can reschedule the workload of the failed node to other running nodes quickly and with little overhead.

#### Higher replication

If you replicate an app for high-availability, then Kubernetes can schedule the individual replicas to distinct nodes.

This ensures that when a node fails, only a single replica is affected, and the app can hold its high-availability guarantee.

### Contra

#### Higher load on control plane

The larger the number of nodes, the larger the load on the Kubernetes control plane.

In Kubernetes, each node can directly communicate with each other node — thus, the number of possible communication paths grows exponentially with the number of nodes in the cluster.

Each node imposes some load on the master nodes — a higher number of nodes requires more performant master nodes.

This can be seen in the [node types used for the master nodes](https://kubernetes.io/docs/setup/best-practices/cluster-large/#size-of-master-and-master-components) by managed Kubernetes services:

- Google Kubernetes Engine (GKE): with up to 5 worke nodes, uses `n1-standard-1` master nodes, but with 500 worker nodes uses `n1-standard-32` master nodes
- Amazon Elastic Kubernetes Service (EKS): with up to 5 worker nodes uses `m3.medium` master noes, but with 500 worker nodes or more uses `c4.8xlarge` master nodes

Kubernetes has been tested up to 5000 nodes per cluster.

<!--
- Maximum number of [nodes per cluster is 5000](https://kubernetes.io/docs/setup/best-practices/cluster-large/)
  - Number of possible communication paths, and the cumulative load on the underlying database, grows exponentially with the size of the cluster (Cloud Native DevOps with Kubernetes, p. 97)
  - While Kubernetes may still function with more than 5,000 nodes, it’s not guaranteed to work (Cloud Native DevOps with Kubernetes, p. 97).
- The larger the number of nodes, the larger the load on the master nodes → need more powerful master nodes
  - https://kubernetes.io/docs/setup/best-practices/cluster-large/#size-of-master-and-master-components
    - GKE: up to 5 nodes n1-standard-1, up to 500 nodes n1-standard-16 → factor 16
    - EKS: up to 5 nodes m3.medium, up to 500 nodes c4.4xlarge → factor 16
- Kubernetes add-ons [consume much more resources](https://github.com/kubernetes/kubernetes/issues/5880#issuecomment-113984085) when there are many nodes in the cluster
-->

#### More system overhead

- More overhead for system daemons: Kubernetes runs some system daemons (kubelet, cAdvisor, Docker) on each node. If you use small nodes, the proportion of the computing resources used by these daemons is higher, thus you pay 

#### Lower resource utilisation

- Lower resource utilisation: more small chunks of free resources on each node that can't be assigned to any workload because they are too small

#### Pod limits

- If you use Amazon EKS, small instances may have a [much lower limit](https://docs.microsoft.com/bs-latn-ba/azure/aks/configure-azure-cni) of pods per node than the default of 110
  - For example, t2.micro instance has a limit of 4 Pods per node

## Conclusion

_So, should you build your cluster out of few large nodes or many small nodes?_

As always, there is no definite answer.

The type of application that you want to deploy on the cluster might pose some hard constraints that guide your choice of the right node size and number.

For example, if you have an app that requires 4 CPU cores and 10 GB of memory, you have to choose nodes with at least that capacity — but in return, you might use fewer of them.

On the other hand, if you have an app that requires a 10-fold replication for high-availability, you should have at least 10 nodes in your cluster — but in return, you might choose smaller nodes.

For all cases inbetween it depends on your specific requirements — which of the above pros and cons are relevant for you and which are not? 

_That being said, there is no rule at all that you must use only a single node type._

It is actually a recommended practive to use a mix of different node sizes in your cluster — this gives the Kubernetes scheduler more degrees of freedom to optimally place your workloads.

* * * 

- In practice, most nodes host [not more than 100 Pods](https://github.com/kubernetes/kubernetes/issues/23349#issuecomment-200484407).
- Use a mix of [different node sizes](https://stackoverflow.com/questions/40924834/selecting-a-node-size-for-a-gke-kubernetes-cluster)
- General arguments: https://stackoverflow.com/questions/52832440/use-larger-worker-nodes-or-more?rq=1

* * * 

## Different topic: many small clusters or few large clusters?

If you have 10 applications, should you run each of them on its own small cluster, or run all of them on one big cluster?

Here the level of granularty (to split across the small or big clusters) are applications, not Pods.

- https://srcco.de/posts/many-kubernetes-clusters.html
- https://thenewstack.io/the-optimal-kubernetes-cluster-size-lets-look-at-the-data/
- https://content.pivotal.io/blog/kubernetes-one-cluster-or-many

* * * 

Also, Fargate (no nodes at all)
Also Banzai telescope (query for best cheap instance type)
