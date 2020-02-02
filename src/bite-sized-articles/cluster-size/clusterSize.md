If you use Kubernetes as the operational platform for your applications, one of the fundamental questions is how many Kubernetes clusters you should have, and how big they should be.

Should you have one large cluster for all your applications, or should you have multiple smaller clusters for individual applications or application components?

It turns out that both are valid approaches but they have their pros and cons and trade-offs against each other.

## The problem

## One large cluster

The first option is to have a single large cluster that you use for all the environments of all your applications:

![One large cluster](assets/cluster-for-all.svg)

A possible way to organise this is to create a separate namespace for each environment of each app.

For example, you could have namespaces like _app1-dev_, _app1-test_, etc.

_Let's look at the pros and cons of this approach._

### 👍 Efficient resource usage

By having only a single cluster, you have to operate only a single instance of the Kubernetes cluster management overhead.

For example, you totally have only one set of master nodes, only one Kubernetes control plane, etc.

Furthermore, Kubernetes is designed to make optimal use of the available compute resources by intelligently scheduling workloads to appropriate worker nodes.

All this results in a good utilisation of your resources, with respect to the proportion of resources used for running your apps vs. the proportion of resources used for managing the cluster or idling.

### 👍 Financially cheap

Most of the time, each Kubernetes cluster costs money, and the more you have of them, the more you have to pay.

For example, you need a set of master nodes for each cluster, and each master node usually costs some money, be it in on premises or in the cloud.

This may be less an issue if you use managed Kubernetes services where you get the Kubernetes master nodes for free, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/).

However, there are also major managed Kubernetes services that charge for the Kubernetes control plan, such as [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) — in these cases, each additional cluster costs you some money too.

### 👍 Central management

If you have only a single cluster, it is straightforward to change common operational settings.

_For example, you want to update the version of Kubernetes?_

Just update it on your cluster and all your apps immediately can enjoy the capabilities of the new Kubernetes version.

_Or, you want to use a different, more capable, CNI plugin?_

Just install the new CNI plugin once and it immediately applies to all the Pods you have.

By having only a single cluster, these operations are simple one-off tasks and don't require any complicated management and coordination.

### 👎 Single point of failure

### 👎 Hard to achieve security isolation

### 👎 Clusters can't grow infinitely large

Large number of nodes may hamper the performance of a cluster.

See also one of the disadvantages of using many small nodes in a Kubernetes cluster in [Architecting Kubernetes clusters — choosing a worker node size](https://learnk8s.io/kubernetes-node-size).

Large number of worker nodes require more powerful master nodes.

### 👎 Complex user and resource management

_Having seen the pros and cons of a single cluster for all the applications and environments, let's turn to the opposite extrem of a separate cluster for each app and environment._

## Many small clusters

The opposite of having one large cluster for everything is having many small cluster with each one only running a specific environment of a specific app:

![Many small clusters](assets/cluster-per-app-and-env.svg)

_Let's discuss the pros and cons of this approach._

### 👍 Security isolation

There is a hard divison line between all environments and apps.

### 👍 Reduced blast radius

### 👎 Wasted resources

### 👎 Higher cost

### 👎 More cluster management overhead

_Besides the extreme cases of one large or many small clusters, there are also some intermediate cases — let's look at them next._

## One cluster per app

In this approach, you have a dedicated cluster for each application:

![One cluster per app](assets/cluster-per-app.svg)

Each app cluster includes runs all the environments, (_dev_, _test_, etc.) of a specific app.

A possible way to organise this is to have a separate namespace for each environment.

_Let's see what particular pros and cons this approach has._

### 👍 Clusters can be tailored to apps

- Suitable if you operate third-party apps and have to conider security considerations and SLAs.

### 👎 Different environments on the same cluster



## One cluster per environment

In this approach, you have a separate cluster for each environment that you use for your apps:

![One cluster per environment](assets/cluster-per-env.svg)

For example, you can have a _Dev_ cluster that runs the _dev_ environments of all your apps, a _Test_ cluster that runs the _test_ environments of all your apps, etc.

A possible way to organise the different apps on a cluster is to have a separate namespace for each app on ever cluster.

_Let's look at the pros and cons of this approach._

### 👍 Cluster can be tailored to an environment

- Allows to set up each cluster with common tooling, settings, etc. appropriate for the purpose of the environment.

### 👎 Clusters must support all applications

For example, if an application requires a GPU worker node, you need to have such a worker node in every cluster.

## Conclusion

## Resources

- <https://thenewstack.io/the-optimal-kubernetes-cluster-size-lets-look-at-the-data/>: more people prefer smaller clusters because they're easier to set up and manage. This is especially true if multi-tenancy is required.
- [Kubernetes Best Practices](http://shop.oreilly.com/product/0636920273219.do): one development cluster used by all developers

