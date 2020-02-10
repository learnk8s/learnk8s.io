**If you use Kubernetes as the operational platform for your applications, you are confronted with some fundamental questions about the way you use clusters:**

- _How many clusters should you have?_
- _How big should they be?_
- _What should they contain?_

This article gets to the bottom of this question and analyses the pros and cons of some of the options you have.

## The problem

As a software creator, you typically develop and operate multiple applications.

Furthermore, you typically run multiple instances of these applications in different environments — for example, you might have a _dev_, _test_, and _prod_ environment.

This results in a "matrix" of applications and environments:

![Applications and environments](assets/apps-and-envs.svg)

In the above example, there are 3 applications and 3 environments, which results in 9 application instances.

Each application instance is a self-contained deployment unit that can be operated and independently from the others.

> An **application instance** may consist of multiple **components**, such as the frontend, backend, database, etc. (in a microservices application, it consists of all the microservices that make up the application). This article assumes that an application instance is always deployed as a **unit**, that is, all the components of an application instance are deployed to the **same** Kubernetes cluster.

As a Kubernetes user, this immediately raises some questions:

- _Should you run all application instances on a single cluster?_
- _Or should you have a separate cluster for each application instance?_
- _Or should you use a combination of the above?_

All of these are valid approaches — Kubernetes is a flexible system and it doesn't dictate you how to use it!

This article explores the pros and cons of different approaches on the scale from _"few large shared clusters"_ to _"many small dedicated clusters"_ — in particular, these are:

- [**One large shared cluster**](#1-one-large-shared-cluster)
- [**Many small single-use clusters**](#2-many-small-single-use-clusters)
- [**Cluster per application**](#3-cluster-per-application)
- [**Cluster per environment**](#4-cluster-per-environment)

Note that the first two approaches are the two extremes on the scale, and the other two are in between — this is shown in the following:

![Scale of cluster sizes](assets/dimensions.svg)

> In general, a cluster can be defined "larger" than another if it contains a larger sum of nodes and Pods — for example, a cluster with 10 nodes and 100 Pods is larger than a cluster with 1 node and 10 Pods.

_Let's get started!_

## 1. Large shared cluster

The first approach is to have a single shared cluster that you use for everything:

![One large cluster](assets/cluster-for-all.svg)

In this case, you deploy all your workloads to the same cluster — in particular, this also applies to all your application instances, as shown above.

With this approach, the Kubernetes cluster is used like general-purpose **infrastructure platform** — whatever you need to run, you deploy it to your existing Kubernetes cluster.

> Kubernetes provides [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to logically separate portions of a cluster from each other, and in the above case, you could use a separate namespace for each application instance.

_Let's look at the pros and cons of this approach._

### 👍 Efficient resource usage

If you have only one Kubernetes cluster, you need to have only one copy of all the resources that are needed to run and manage a Kubernetes cluster.

This includes, for example, the master nodes — a Kubernetes cluster typically has 3 master nodes, and if you have only a single cluster, you need only 3 master nodes in total (compared to 30 master nodes if you have 10 Kubernetes clusters).

But this also includes other cluster-wide services, such as load balancers, Ingress controllers, authentication, logging, and monitoring.

If you have only a single cluster, you can reuse these services for _all_ your workloads, and you don't need to have multiple copies of them for multiple clusters.

### 👍 Cheap

As a consequence of the above point, fewer clusters are usually cheaper, because the resource overhead with larger numbers of clusters costs money.

This is particularly true for the master nodes, which may cost you substantial amounts — be it on-premises or in the cloud.

Some managed Kubernetes services provide the Kubernetes control plane for free, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/) — in this cases, cost-efficiency is less of an issue.

However, there are also managed Kubernetes services that charge a fixed amount for running a Kubernetes cluster, such as [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/).

In general, it's safe to say that running few (large) clusters is cheaper than running many (small) clusters.

### 👍 Efficient administration

Administrating a single cluster is easier than administrating many clusters.

Administration may include tasks like:

- _Upgrading the Kubernetes version_
- _Setting up a CI/CD pipeline_
- _Installing a CNI plugin_
- _Setting up the user authentication system_
- _Installing an admission controller_

_And many more..._

If you have only a single cluster, you need to do all of these tasks only once.

If you have many clusters, then you need to apply these tasks multiple times in a consistent way — which probably requires you to develop automated processes and tools.

**Let's look at the cons.**

### 👎 Single point of failure

If you have only one cluster and if _that_ cluster breaks, then _all_ your workloads are down!

There are many ways that something can go wrong:

- _A Kubernetes upgrade produces unexpected side effects_
- _An cluster-wide component (such as a CNI plugin) doesn't work as expected_
- _An erroneous configuration is made to one of the cluster components_
- _An outage occurs in the underlying infrastructure_

A single incident like this can produce major damage across all your workloads if you have only a single shared cluster.

### 👎 No hard security isolation

If multiple apps run in the same Kubernetes cluster, this means that these apps share the hardware, network, and operating system on the nodes of the cluster.

Concretely, two containers of two different apps running on the same node are technically two processes running on the same hardware and operating system kernel.

> Linux containers provide some form of isolation, but this isolation is not as strong as the one provided by, for example, virtual machines (VMs). Under the hood, a process in a container is still just a process running on the host's operating system.

This may be an issue from a security point of view — it theoretically allows unrelated apps to interact with each other in undesired ways (intentionally and unintentionally).

Furthermore, all the workloads in a Kubernetes cluster share certain cluster-wide services, such as [DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) — this allows apps to discover the Services of other apps in the cluster.

_All these may or may not be issues for you, depending on the security requirements for your applications._

Kubernetes provides various means to prevent security breaches, such as [PodSecurityPolicies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) and [NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) — however, it requires experience to tweak these tools in exactly the right way, and they can't prevent every security breach either.

It's important to keep in mind that Kubernetes is designed for _sharing_, and not for _isolation_ and _security_.

### 👎 No hard multi-tenancy

Given the many shared resources in a Kubernetes cluster, there are many ways that different apps can "step on each other's toes".

For example, an app may monopolise a certain shared resource, such as the CPU, and thus starve other apps that are running on the same node.

Kubernetes provides various ways to control this behaviour, such as [resource requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/), [ResourceQuotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/), and [LimitRanges](https://kubernetes.io/docs/concepts/policy/limit-range/) — however, again, it's not trivial to tweak these tools in exactly the right way, and they cannot prevent every unwanted side effect either.

### 👎 Many users

If you have only a single cluster, then many people in your organisation must have access to this cluster.

_The more people have access to a system, the higher the risk that they break something._

Within the cluster, you can control who can do what with [**role-based access control (RBAC)**](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) — however, this still can't prevent that users break something within their area of authorisation.

And if something breaks, the consequences can be serious, because the cluster is a single point of failure!

### 👎 Clusters can't grow infinitely large

If you use a single cluster for all your workload, this cluster will probably be rather large (in terms of nodes and Pods).

_However, Kubernetes clusters can't grow infinitely large._

There are some theoretical upper limits for how big a cluster can be, which are defined by Kubernetes at about [5000 nodes, 150,000 Pods, and 300,000 containers](https://kubernetes.io/docs/setup/best-practices/cluster-large/).

However, in practice, challenges may show up already with much smaller cluster sizes, such as [500 nodes](https://events19.lfasiallc.com/wp-content/uploads/2017/11/BoF_-Not-One-Size-Fits-All-How-to-Size-Kubernetes-Clusters_Guang-Ya-Liu-_-Sahdev-Zala.pdf).

The reason is that larger clusters put a higher strain on the Kubernetes control plane, which requires careful planning to keep the cluster functional and efficient.

> This issue is also discussed in a related article of this blog named [**Architecting Kubernetes clusters — choosing a worker node size**](https://learnk8s.io/kubernetes-node-size).

**Now, let's look at the other extreme — many small single-use clusters.**

## 2. Small single-use clusters

With this approach, you use a separate Kubernetes cluster for every deployment unit:

![Many small clusters](assets/cluster-per-app-and-env.svg)

For this article, a deployment unit is an application instance — which may consist of multiple components, such as frontend, backend, database, etc.

The rationale behind this approach is: _whenever you have to deploy something, create a new Kubernetes cluster for it._

With this strategy, Kubernetes is used a bit like a specialised **application runtime** for individual application instances.

_Let's see what the pros and cons of this approach are._

### 👍 Reduced blast radius

If one of the many cluster breaks, the damage is limited to a single deployment unit.

This is the counterpart of the _"Single point of failure"_ disadvantage of a large shared cluster.

### 👍 Isolation

Different clusters do _not_ need to share any of their hardware, network, operating system, or other services — clusters can be completely physically separated from each other.

This also means that the workloads running in different clusters can be completely physically separated from each other — there are no shared resources.

This provides strong isolation between workloads that have nothing to do with each other — which may be very beneficial from a security point of view.

### 👍 Few users

If every cluster runs only a small set of workload, then fewer people need to have access to this cluster — this should reduce the likelihood that someone breaks something.

**These were the pros — let's check out the cons.**

### 👎 Inefficient resource usage

As already mentioned, each Kubernetes cluster requires a set of resources for its management, such as the master nodes, load balancers, logging, and monitoring services.

In general, you need a copy of these resources for every cluster.

For example, if you have 10 clusters, you need 30 master nodes (even if each cluster has only 1 worker node) — compare this with the 3 master nodes that you need for a shared cluster with 10 worker nodes.

### 👎 Expensive

Inefficient resource usage automatically results in higher costs.

For example, if you have to run 30 master nodes instead of 3 for the same compute power, you will see this in your monthly bill.

### 👎 Complex administration

Administrating many Kubernetes clusters is more work than administrating a single Kubernetes cluster.

Administration tasks such as installing admission controllers, setting up a CI/CD pipeline, or configuring authentication cannot just be executed in a simple ad-hoc manner, but now must be coordinated and managed across the clusters.

You probably need to develop automated processes and tools to be able to do this efficiently.

**So far, we covered the most extreme cases — one cluster for everything and a separate cluster for each deployment unit.**

_However, there are also some interesting intermediate cases._

## 3. Cluster per application

With this approach, you have a separate cluster for all the versions of a specific application:

![One cluster per app](assets/cluster-per-app.svg)

You can see a cluster per **team** as a special case of this — usually, an app is developed by a single dedicated team (but a team may develop multiple apps).

Note that the pros and cons of the above approaches also apply in the moderated form to this approach, because it is on the same scale between the other two approaches.

_However, there are also some characteristics that are specific to this approach, which are explained below._

### 👍 Cluster can be customised for an app

If an app has specific requirements, then this requirement can be installed in the corresponding cluster without affecting any other clusters and apps.

Such requirements may include GPU worker nodes, a certain CNI plugin, a service mesh, or any other service.

Every cluster can be equipped with exactly the configuration that the corresponding app needs — not more and not less.

**There's also a con.**

### 👎 Different environments in the same cluster

Different instances of the same app run in the same cluster — this is especially relevant for the _prod_ instance.

Imagine that a new development version of the app has an error and bogs down the cluster — this probably breaks the production version of your app too!

**Let's turn to the last approach.**

## 4. Cluster per environment

With this approach, you have a separate cluster for each environment:

![One cluster per environment](assets/cluster-per-env.svg)

If you use a _dev_, _test_, and _prod_ environment for your apps, you would have a _dev_, _test_, and _prod_ cluster.

Each cluster contains the corresponding instance of all the apps.

_Let's see what the pros and cons of this approach are._

### 👍 Isolation of the _prod_ environment

In general, this approach isolates all the environments from each other, but, in practice, this especially matters for the _prod_ environment.

If all the production instances of the apps run in their own cluster, then they're not affected by any mishappenings in the other clusters (for example, a new development version of an app creating havoc in the _dev_ cluster).

This may be a huge advantage for the reliability and availability of your apps.

### 👍 Cluster can be customised for an environment

You can optimise each cluster for its specific task, for example:

- Install development and debugging tools and services in the _dev_ cluster
- Install testing frameworks and tools in the _test_ cluster
- Use more powerful hardware and network connections for the _prod_ cluster

This may overall improve the efficiency of both the development and operation of your apps.

### 👍 Lock down access to _prod_ cluster

If all the production versions of your apps are in a separate cluster, you can make access to this cluster very restrictive.

In fact, no humans at all really need access to the _prod_ cluster — all the deployments could be done by a CI/CD tool.

This decreases the risk of human error in the _prod_ cluster to a minimum!

**Let's turn to the cons.**

### 👎 Lack of isolation between apps

The main disadvantage of this approach is the missing isolation between apps since instances of multiple apps share the same cluster.

This may be a security issue as already explained above.

### 👎 App requirements are not localised

If an app has a special requirement, then this requirement must be satisfied in all clusters.

For example, if an app requires a GPU, then every cluster must have a GPU worker node, even if it is used only by this single app — this may lead to inefficient usage of resources.

**This concludes our discussion of the different cluster approaches.**

_Let's wrap up._

## Conclusion

This article discussed some possible Kubernetes cluster approaches on a scale from _"few large shared clusers"_ to _"many small dedicated clusters"_:

- [**One large shared cluster**](#1-one-large-shared-cluster)
- [**Many small single-use clusters**](#2-many-small-single-use-clusters)
- [**Cluster per application**](#3-cluster-per-application)
- [**Cluster per environment**](#4-cluster-per-environment)

For your convenience, here's a table that summarises the pros and cons of each approach with respect to some common requirements:

![Comparison table](assets/table.svg)

_So, which approach should you choose?_

As usual, the answer depends on your use case — you have to trade-off the pros and cons of the different approaches against each other to find the solution that works best for you.

But note that the choice is not limited to the above example configurations — it can be any combination!

For example, you might think about a development cluster as well as a production cluster per team.

This is a combination of several of the aspects that have been discussed in this article — and you can combine the pros and cons accordingly.

_In the end, the solution must fit **your** use case._
