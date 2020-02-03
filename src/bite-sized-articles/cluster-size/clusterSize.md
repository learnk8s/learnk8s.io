If you use Kubernetes as the operational platform for your applications, one of the fundamental questions is how many Kubernetes clusters you should have, and how big they should be.

Should you have one large cluster for all your applications, or multiple smaller clusters for individual applications or application components?

This article goes to the ground of this question and examines the different options that you have.

## The problem

As a software creator or operator, you typically have multiple applications and you deploy these applications to multiple environments.

For example, you might have a _dev_ environment where you deploy an app for developement, a _test_ environment where you deploy the app for testing, and a _prod_ environment where you deploy the app for production.

This results in a "matrix" of applications and environemts, as shown in the following:

![Applications and environments](assets/apps-and-envs.svg)

Each cell in this matrix is a standalone version of an app and can be deployed independently from the others.

So, if you use Kubernetes as the deployment platform for your apps, a number of questions arises:

- _Should you deploy all apps to the same Kubernetes cluster?_
- _Or better have muliple clusters split by applications?_
- _Or would it make more sense to have a dedicated cluster for each environment?_

All these options are possible, because Kubernetes is a flexible platform — it doesn't dictate you how to use it.

You can have a tiny Kubernetes cluster with a single worker node and run a single application on it — but you can also have a cluster consisting of hundreds of nodes and running hundreds of apps.

_It's all up to you._

However, to make an informed decision about what Kubernetes strategy is best for you, you should know the pros and cons of the different approaches.

This is what this article is about.

In particular, the remainder of this article will examine the following cases:

1. [**One large cluster for everything**](#1-one-large-cluster-for-everything)
1. [**Many small single-purpose clusters**](#2-many-small-single-purpose-clusters)
1. [**One cluster per application**](#3-one-cluster-per-application)
1. [**One cluster per environment**](#4-one-cluster-per-environment)

For each option, a list of pros and cons is given, which should help you to consider all aspects and make up your own mind.

_Let's get started._

## 1. One large cluster for everything

The first option is to a single large cluster that you use for all the environments of all your applications:

![One large cluster](assets/cluster-for-all.svg)

In such a scenario, you would typically organise the cluster with [Kubernetes namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

Namespaces allow to logically separate portions of a cluster and provide basic form of isolation between applications and users on a cluster.

For example, in the above scenario, you could have a separate namespace for each app/environment pair, such as, `app1-dev`, `app1-test`, `app1-prod`, and so on.

_Now, let's look at the pros and cons of this approach._

### 👍 Little management resource overhead

If you have only one Kubernetes cluster, you need to have only one instance of the Kubernetes control plane and all the resources that it requires.

A typical Kubernetes cluster has three master nodes, and if you have only a single Kubernetes cluster, you totally need only these three master nodes for managing _all_ your applications.

Compare this with having many smaller Kubernetes clusters — in this case, you need to have three master nodes for _each_ Kubernetes clusters.

For example, if you have a single cluster with 10 worker nodes to run all your applications, you totally need 13 nodes (10 worker nodes plus 3 master nodes).

On the other hand, if you have 10 clusters with 1 worker node each to run the same set of appliations, you totally need 40 nodes (10 worker nodes plus 30 master nodes).

In general, a large cluster results in a more efficient usage of your resources.

### 👍 Cheap

A Kubernetes cluster usually costs money, and the more you have of them, the more you have to pay.

If you run your clusters on premises or in the cloud, you need to provision the (typically three) master nodes for each cluster — and a master node is a resource that costs money.

This may be less an issue if you use managed Kubernetes services where you get the entire Kubernetes control plane for free, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/).

However, there are also managed Kubernetes services that charge substantial amounts for the control plane of a Kubernetes cluster, such as [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/).

In these cases, every additional Kubernetes cluster adds something to your bill.

### 👍 Easy to set up and configure

If you have only a single cluster, it's easy to apply configurations and tweaks consistently.

- _You want to update the Kubernetes version? Just update it once and you're done._
- _You want to install a different CNI plugin? Just install once and you're done._
- _You want to set up a new user authentication method? Just set it up once and you're done._

Since you have only a single cluster, there's only a single place that these configurations have to be applied to, and, thus, these are all one-off tasks that can even be done manually.

Contrast this with multi-cluster scenario — in this case, you probably need to come up with some sophisticated automation to be able to consistenly apply these configurations to all your clusters.

In general, fewer clusters are easier to manage than larger numbers of clusters.

### 👎 Single point of failure

One of the biggest drawbacks of having only a single cluster is that it constitutes a single point of failure.

If you have only one cluster and if _that_ cluster breaks, then _all_ your apps are affected.

Compare this with having multiple clusters — if there are problems with one of the clusters, then only a portion of your apps are affected.

If you run very critical applications, this is an issue that you should definitely consider.

### 👎 No hard security isolation

Kubernetes is a system for _sharing_ compute resources among multiple workloads — this means that the different applications on a Kubernetes cluster run on the same underlying infrastructure.

In particular, different applications may run on _same_ physical machine on the _same_ operating system.

This may be an issue for very security-sensitive applications.

In general, it also increases the effect that intentional or unintentional actions on the underlying infrastructure (such as changing operation system settings) may have on your applications.

> Linux containers provide some form of isolation, but it's not as strong the isolation provided by virtual machines (VMs) or separate physical machines. The processes running in containers are technically just ordinary processes running next to each other on the same kernel.

If security is a concern for your applications, then you should keep this lack of isolation in mind.

### 👎 No hard multi-tenancy

Since all the infrastructure is shared among the apps in a cluster, there are numerous ways that these apps can step on each other's toes.

For example, they can occupy and "steal" resources from each other, such as CPU time or memory.

Kubernetes provides ways to control this behaviour, such as [resource requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/), [ResourceQuotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/), and [LimitRanges](https://kubernetes.io/docs/concepts/policy/limit-range/).

However, it's hard to tweak these tools in exactly the right way, and they are not perfect either.

It's still possible that a single malfunctioning app creates a substantial collateral damage among other apps.

> Kubernetes [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) provide some form of isolation, but this is not a "hard" multitenancy where applications in one namespace are totally isolated and protected from applications in another namespace.

So, if your apps ar very sensitive, you should keep in mind that the focus of Kubernetes is on sharing resources and _not_ on providing isolation.

### 👎 Clusters can't grow infinitely large

If you use fewer clusters for running a given set of applications, these clusters must automatically be larger (that is, more worker nodes, Pods, and containers per cluster).

However, Kubernetes clusters can't grow infinitely large.

Kubernetes has some theoretical upper limits of cluster sizes that it supports — currently, these are [5000 nodes, 150,000 Pods, and 300,000 containers](https://kubernetes.io/docs/setup/best-practices/cluster-large/).

However, in practice, problems may arise already with much smaller cluster sizes — creating a [500 node cluster](https://events19.lfasiallc.com/wp-content/uploads/2017/11/BoF_-Not-One-Size-Fits-All-How-to-Size-Kubernetes-Clusters_Guang-Ya-Liu-_-Sahdev-Zala.pdf) may pose serious challenges.

The reason is that large numbers of nodes put a heavy strain on the Kubernetes control plane.

As a consequence, large clusters also require more performant control plane infrastructure, such as more powerful master nodes.

> This issue is also discussed in a companion article named [Architecting Kubernetes clusters — choosing a worker node size](https://learnk8s.io/kubernetes-node-size) on this blog.

Thus, if you have a very large set of applications, it may not be feasible to run them all on the same cluster, because the cluster would simply become too large.

_Having seen the pros and cons of a single large cluster, let's turn to the opposite extreme._

## 2. Many small single-purpose clusters

In this approach, you have a separate Kubernetes cluster for each independently deployable unit:

![Many small clusters](assets/cluster-per-app-and-env.svg)

In the above example, you have a dedicated cluster for the _dev_ environment of _App1_, another cluster for the _test_ environment of _App1_, and so on.

Since each cluster has only one "tenant", you don't really need to use [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to organise the contents of your clusters.

_Let's discuss the pros and cons of this approach._

### 👍 Reduced blast radius

Since you have so many clusters, the effect of some problems with one of them is very limited.

For example, if one of the clusters goes down, then only one of your apps is affected — and furthermore, only a single environment of this app.

If this is not the _prod_ environment of some app, you can probably cope with it.

Compare this with having fewer clusters are shared among various components each — if _that_ cluster goes down, then the effect is much bigger.

### 👍 Perfect isolation

If each application and environment runs on its own cluster, then these components are perfectly isolated from each other.

In an on-premises setting, each cluster may consist of entirely different hardware, and in the cloud, each cluster may consist of different compute instances — this creates a hard division line between the different workloads that can't be easily crossed.

For example, it's not possible that the _dev_ environment of some app steals resources from the _prod_ environment of that app, or that applications step on each other's toes in othe ways.

Also, security is greatly improved as the workloads run on entirely different hardware and operating systems so that applications can't sniff any sensitive information from each other or mess with other security-relevant settings.

In general, the isolation between workloads in separate cluster is much stronger than anything that can be achieved if these workloads run in the same cluster.

### 👎 Wasted resources

Each cluster requires some resources for the management of the cluster itself, and if you have so many clusters, this greatly accumulates.

For example, each Kubernetes cluster typically has three master nodes — so, if you have 10 clusters, you need 30 master nodes.

_That is 30 machines or cloud compute instances just for the job of managing your clusters!_

Furthermore, Kubernetes shines at intelligently sharing resources across workloads with the goal of using the available resources as efficiently as possible.

If you run only a very small set of workloads on each cluster, you can't really take adavange of this feature, and you might end up with many idling or wasted resources.

For example, if you run only a single application on a cluster, then a worker nodes might be idle most of the time — even if you use rather small worker node instances.

However, at the same time, you might still want to replicate your app across multiple worker nodes for high-availability — in that case, you even end up with multiple idle nodes per cluster.

_In general, you can expect smaller clusters to result in more unproductive and wasted resources._

### 👎 Expensive

Each Kubernetes cluster typically has a cost, and if you have more of them, you have to pay more.

If your clusters run on premises, you need to have dedicated machines for the master nodes of each cluster, if you're in the cloud, you need to rent the compute instances for the master nodes of each cluster.

This drawback can be alleviated by using managed Kubernetes services that don't charge for the master nodes of a cluster, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/).

In these cases, 10 clusters with 1 worker node each are not really more expensive than 1 cluster with 10 worker nodes.

However, due to the less efficient usage of resources in cluster with only few workloads, you might still end up with higher costs.

For example, if you could run all your 10 components in a cluster with 5 worker nodes, but since you want to run each component in its own cluster, you need 10 worker nodes, because each cluster must have at least one worker node.

In general, you can expect small dedicated cluster to be more expensive than a single general-purpose cluster.

### 👎 Laborious management

Managing many clusters is more work than managing a single cluster.

If you want to do some configurations, such as upgrading Kubernetes or installing an admission controller, you need to make sure that this setting is applied to all clusters in a consistent manner.

To this end, you likely have to develop some automated process for every tweak that you want to do to your clusters.

In this way, the management of the clusters becomes a problem in itself that you have to solve before you can actually take full advantage of the applications in your cluster.

_So far, you have seen the pros and cons of the most extreme approaches: one cluster for everything, and many small cluster for a single purpose._

However, it doesn't have to be only black or white — there are also some intermediate approaches.

_Let's explore them next._

## 3. One cluster per application

In this approach, you have a dedicated cluster for each application:

![One cluster per app](assets/cluster-per-app.svg)

The difference to the previous approach is that all the environments of an app (for example, _dev_, _test_, and _prod_) run in the same cluster.

In this case, you would typically organise the cluster with a separate namespace for each environment — for example, in the cluster for _App1_, you could have a `dev`, `test`, and `prod` namespace.

> Note that with this approach you have as many clusters as you have applications, which varies greatly from organisation to organisation.

_Let's see what particular pros and cons this approach has._

### 👍 Hard isolation between apps

Typically security considerations refer to transgressions between different applications.

If each app runs in its own cluster, then such transgressions are not easily possible.

The clusters provide a hard division line between apps — the apps do not share the hardware or operating systems among each other.

In that way, there's no way for an app to accidentially read or alter sensitive data of another app, as it's possible if the apps run in the same cluster.

Also, apps can't step on each other's toes in other ways, such as by occupying each other's resources.

These can be especially relevant for apps that must comply with security guidelines or that have service level agreements (SLAs).

It's much easier to control the execution environment of an app, and make guarantees about it, if the app is completely isolated from any other apps.

### 👍 Clusters can be tailored to apps

If each cluster runs only a single app, these clusters can be highly specialied for these apps.

For example, if an app requires a GPU, the a GPU worker node can be added to this cluster — but it's not necessary to have this GPU worker node in any other cluster where it's not needed.

The same applies for any other cluster-wide features, such as CNI pugins or Ingress controllers.

In general, each cluster can have exactly those features that are needed by the app that runs on it.

This may increase effciency, reduce costs, decrease the risk of unwanted side effects of features that are not needed, and improve security by minimising the attack surface.

### 👍 Cluster access can be locked down by team

Typically an application is developed and operated by a specific team.

If each app exclusively lives in a dedicated cluster, then access to this cluster can be restricted to the team that devleops this app.

People from other teams, which develop other apps, do not need to have access to this cluster at all.

This implements a sort of a principle of least privilege, which increases security and reduces the risk of accidental damages.

In other words, the fewer people have access to a cluster, the smaller the risk that someone makes a mistake and creates havoc in that cluster.

Access to a Kubernetes cluster can be controlled by the [authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) module in the Kubernetes API server.

Within a cluster, access can be further restricted by using different permission for different team members.

For example, access to the _dev_ environment can be restricted to the developers within the team, and access to the _test_ namespace to the testers.

This can be achieved by granting the corresponding users appropriate permissions for the `dev` and `test` namespaces, respectively.

The `prod` namespace is ideally locked down completely, so that no human has access to it and the application is deployed to production through an automated continous deployment (CD) process.

In Kubernetes, permissions can be granted with [role-based access control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) rules.

### 👎 Different environments in the same cluster

The main disadvantage of having a single cluster per app is that the different environments of the app run in the same cluster.

This bears a risk that the different versions of an app, and the people working on it, step on each other's toes.

For example, imagine that a developer makes a mistake and renders the cluster non-functional — it will bring down the production version of your app too.

Or if the resource restrictions of each environment are not configured properly (for example, with [ResourceQuotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)), a malfunctioning development version of the app may starve the production version by eating up all the compute resources in the cluster.

All this can theoretically be overcome with careful configuration of access control and resource restrictions — however, it's hard to tweak these settings in exactly the right way and eliminate all the loopholes. 

_Having seen the pros and cons of having a cluster per app, let's turn to the last configuration._

## 4. One cluster per environment

With this approach, you have a separate cluster for each of the environments for your apps:

![One cluster per environment](assets/cluster-per-env.svg)

In the above example, you have a _Dev_ cluster for the _dev_ environment, a _Test_ cluster for the _test_ environments, and a _Prod_ cluster for the _prod_environment.

Each cluster hosts the corresponding environment versions of all the apps.

To separate the apps in a cluster from each other, you would typically run each app in its own naemspace — for example, in the _Dev_ cluster, you would have an `App1`, `App2`, and `App3` namespace.

> Note that with this approach you have as many clusters as you have environments, which is typically between 2 and 4.

_Let's look at the specific pros and cons of this approach._

### 👍 Hard isolation between environments

With this approach the different environments are completely isolated from each other.

This is particularly important for the production environment — a flawed development version of an app now has no chance to harm a production version.

Similarly, a flaw in the development cluster does not affect the testing cluster, and so on.

### 👍 Cluster can be tailored to environment

If each cluster is used only for a specific purpose, then it can be tailored for this purpose.

For example, the _Dev_ cluster can be augmented with certain development tools that facilitate the work of the developers, and the _Test_ cluster can be equipped with testing tools.

The _Prod_ cluster can be optimised for serving the production versions of the apps, for example, by using more powerful hardware or faster network connectivity.

In this way, the overall development and operation of the applications becomes more efficient and streamlined.

### 👍 Cluster access can be controlled by job function

Access to _Dev_ cluster can be restricted to developers, access to _Test_ cluster can be restricted to testers.

Access to the _Prod_ cluster can be completely locked down, so that no human has access to it and the apps are depoyed to production through an automated continuous deployment (CD) process.

### 👎 Different apps in the same cluster

Security considerations.

Each cluster must satisfy the requirements of _all_ applications.

For example, if an application requires a GPU worker node, then _all_ clusters must have a GPU worker node.

Applications may potentially have conflicting requirements — for example, if an application requires a specific CNI plugin and another application requires another CNI plugin.

## Conclusion

Some general considerations:

- If you have just few applications, then you might be able to run all these applications in the same cluster. Kubernetes is made for _sharing_ a common infrastructure among muliple applications.
- If you have security or data protection compliances or SLAs, then you might consider using a separate cluster for each application. You can optionally run the production version of each app in an additional separate cluster.
- If you're apps are not security-sensitive, but you want to prevent accidential interferences and prouction downtime, you might have a separate cluster for each environment (_dev_, _test_, and _prod_).
- If money and wasted resoruces are not an issue for you, and you're willing to invest some work into developing automated management tools, you might create a cluster for each independently deployable component.
