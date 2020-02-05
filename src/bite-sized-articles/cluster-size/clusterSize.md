**If you use Kubernetes as the operational platform for your applications, one of the fundamental questions is, how many Kubernetes clusters you should have, and how big they should be?**

_Should you have one large general-purpose cluster for all your applications or multiple smaller specialised cluster for individual workloads?_

This article gets to the bottom of this question and summarises the pros and cons of the major different options you have.

## The problem

As a software creator, you typically develop and operate multiple applications in multiple environments.

For example, you might have applications _app1_, _app2_, and _app3_, and maintain each of them in a development environment (_dev_), a testing environment (_test_), and a production environment (_prod_).

This results in a "matrix" of applications and environments, as shown in the following:

![Applications and environments](assets/apps-and-envs.svg)

Each component in this matrix is a standalone workload that can be deployed independently from the others.

If you use Kubernetes, this immediately leads to a host of questions:

- _Should you have one big cluster for deploying all of these components?_
- _Or should you have a separate cluster for each application?_
- _Or would it make more sense to have a separate cluster for each environment?_

As a matter of fact, all these options are possible and valid approaches.

Kubernetes is a flexible system and it doesn't dictate you how to use it.

_It's up to you how to best use Kubernetes for your purposes._

However, this requires you to know the pros and cons of the various options you have — this is what this article is about.

In the following, we will examine the following Kubernetes cluster strategies:

1. [**One large general-purpose cluster**](#1-one-large-general-purpose-cluster)
1. [**Many small single-purpose clusters**](#2-many-small-single-purpose-clusters)
1. [**One cluster per application**](#3-one-cluster-per-application)
1. [**One cluster per environment**](#4-one-cluster-per-environment)

For each approach, we will discuss the pros and cons in detail.

This should give you a good overview of the space and enable you to make up your mind for your own Kubernetes strategy.

_Let's get started!_

## 1. One large general-purpose cluster

The first option is to have a single large cluster that you use for all your workloads:

![One large cluster](assets/cluster-for-all.svg)

In such a scenario, you would typically organise the cluster with namespaces.

[Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) allow to logically separate portions of a cluster and can provide a basic form of isolation between different workloads.

For example, for a workload in namespace _A_, it looks as if it's running in its own cluster and it can't see the workloads in, say, namespace _B_.

In the above scenario, you could have a separate [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) for each logically separated workload, such as, `app1-dev`, `app1-test`, `app1-prod`, and so on.

> As you will see later, the isolation provided by namespaces is rather "soft" and can't be compared with "hard" multi-tenancy. Workloads in different namespaces still share many resources under the hood.

_Now, let's look at the pros and cons of this approach._

### 👍 Efficient resource usage

If you have only one Kubernetes cluster, you need to have only one instance of the Kubernetes control plane and all the resources that come with it.

For example, a typical Kubernetes cluster has 3 master nodes, and if you have only a single Kubernetes cluster, you totally need only these 3 master nodes.

Compare this with having many smaller clusters — in this case, you need to have 3 master nodes for _each_ cluster.

For example, if you have 1 cluster with 10 worker nodes, you totally need 13 nodes (10 worker nodes plus 3 master nodes).

On the other hand, if you have 10 clusters with 1 worker node each, you totally need 40 nodes (10 worker nodes plus 30 master nodes)!

Clearly, in the first case, the proportion of resources that actually creates value (by running your apps) is much higher.

_In general, you can expect larger clusters to result in a more efficient usage of your resources._

### 👍 Cheap

Operating a Kubernetes cluster usually costs money — thus, if you have fewer of them, you have to pay less.

For example, each Kubernetes cluster needs a set of master nodes that you need to pay for — be it as bare-metal machines on-premises or as compute instances in the cloud.

This may be less an issue if you use managed Kubernetes services where you get the entire Kubernetes control plane for free, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/).

However, there are also managed Kubernetes services that charge for the control plane of each Kubernetes cluster, such as [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/).

_In the general case, you can expect a single large cluster to be cheaper than many small clusters._

### 👍 Efficient administration

In simple words, administrating a single cluster is easier than administrating many clusters.

Possible administration tasks include things such as:

- _Upgrading the Kubernetes version_
- _Setting up a CI/CD pipeline_
- _Installing a CNI plugin_
- _Setting up the user authentication system_
- _Installing an admission controller_

_And many more..._

With a single cluster, all of these tasks can be done in a simple ad-hoc manner.

With many clusters, on the other hand, you probably need to develop automated processes and tools to perform these tasks efficiently and consistently.

_By having only a single cluster, the administration is easy, and you can use more of your time for actually developing your apps._

**These were the pros — let's see what the cons are.**

### 👎 Single point of failure

One of the biggest disadvantages of using a single cluster is that it constitutes a single point of failure.

If you have only one cluster and if _that_ cluster breaks, then the disaster is perfect — _all your apps are down!_

There are many ways that something can go wrong in a cluster:

- _A Kubernetes upgrade produces unexpected side effects_
- _An cluster-wide component (such as a CNI plugin) doesn't work as expected_
- _An erroneous configuration is made to one of the cluster components_
- _An outage occurs in the underlying infrastructure_

Every single incident like these has the potential to bring down or severely hamper all the apps in your cluster.

_So, if your apps are very critical, a single-cluster solution might not be ideal for you._

### 👎 No hard security isolation

Kubernetes is designed for _sharing_ infrastructure among workloads.

This means that the different apps running in a Kubernetes cluster share various resources, including the hardware, CPU, memory, operating system, network, Kubernetes components (e.g. container runtime, kubelet, API server), and cluster-wide services (e.g. DNS).

For most applications, this is not a problem — but for very security-sensitive apps, or apps that must comply with security policies, it may be.

The reason is that all these shared resources can be misused as attack vectors.

For example, a hijacked app could be used to read sensitive information of another app via the shared storage resource.

Kubernetes provides various means to prevent such security breaches, such as [PodSecurityPolicies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) and [NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

However, it requires experience to tweak these tools in exactly the right way, and they can't prevent every security breach either.

> Linux containers (which are used in Kubernetes) provide some form of isolation, but this isolation is not as strong as, for example, the one provided by virtual machines (VMs). A process running in a container is still an ordinary process running on the same kernel as the processes in other containers.

_In summary, if you have very security-sensitive apps, running them in a shared cluster with other apps might not be ideal._

### 👎 No hard multi-tenancy

Given the many shared resources in Kubernetes, there are many ways that the apps in a cluster can "step on each other's toes".

For example, an app may monopolise a certain shared resource, such as the CPU, and thus starve other apps that are running on the same node.

Kubernetes provides various ways to control this behaviour, such as [resource requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/), [ResourceQuotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/), and [LimitRanges](https://kubernetes.io/docs/concepts/policy/limit-range/).

However, it's not trivial to tweak these tools in exactly the right way, and they cannot prevent every unwanted side effect either.

It's still possible for a single malfunctioning app to create major havoc among the other apps in the cluster.

> Kubernetes [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) go into the direction of multi-tenancy, but they provide rather a "soft" multi-tenancy because most fundamental resources, including Kubernetes components, are still shared across namespaces.

_If your apps are very critical, keep in mind that the focus of Kubernetes is on "sharing" and not on "isolation"._

### 👎 Broad cluster access

If you have only one cluster for everything, then basically _everyone_ in your organisation must have access to this cluster.

This may include people with different backgrounds and working on different parts of the cluster.

Most users will probably have only a limited view of the cluster — this increases the risk of unwanted side effects from applying certain configurations.

Kubernetes provides a way to control who can do what in a cluster with [**role-based access control (RBAC)**](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

However, setting up RBAC requires a lot of fine-tuning, and it still can't prevent someone from creating damage in their assigned area of authorisation.

_In general, you have to consider that the more people have access to a cluster, the higher the risk that they break something._

### 👎 Clusters can't grow infinitely large

If you have only a single cluster, this cluster will probably be rather large.

_However, Kubernetes clusters can't grow infinitely large._

There are some theoretical upper limits for how big a cluster can be, which are defined by Kubernetes at about [5000 nodes, 150,000 Pods, and 300,000 containers](https://kubernetes.io/docs/setup/best-practices/cluster-large/).

However, in practice, challenges may show up already with much smaller cluster sizes, such as [500 nodes](https://events19.lfasiallc.com/wp-content/uploads/2017/11/BoF_-Not-One-Size-Fits-All-How-to-Size-Kubernetes-Clusters_Guang-Ya-Liu-_-Sahdev-Zala.pdf).

The reason is that larger clusters put a higher strain on the Kubernetes control plane, which requires careful planning to keep the cluster functional and efficient.

For example, larger clusters typically require more powerful master nodes.

> This issue is also discussed in a related article of this blog named [**Architecting Kubernetes clusters — choosing a worker node size**](https://learnk8s.io/kubernetes-node-size).

_If you have a very large number of applications, you have to check if it's feasible to run them all in a single cluster — or whether the cluster would simply become too large._

**Let's turn to the opposite of a single large cluster — many small clusters.**

## 2. Many small single-purpose clusters

With this approach, you have a separate Kubernetes cluster for every independent workload:

![Many small clusters](assets/cluster-per-app-and-env.svg)

In particular, you have a dedicated cluster for each of the environments of each of your applications — for example, you have a cluster that hosts nothing but the _dev_ environment of _app1_ (call it _app1-dev_), and so on.

If you have 3 applications and 3 environments for each application, you get a total of 9 clusters.

_Let's see what the pros and cons of this approach are._

### 👍 Reduced blast radius

Since each cluster runs only a single workload, the effect of a defect in one of the clusters is limited to a single workload.

For example, if the _app1-dev_ cluster breaks down, then only the _dev_ environment of _app1_ is affected — all other workloads are unaffected and keep running as usual.

_This is a huge advantage compared to the single-cluster approach where a single accident can cause everything to break down._

### 👍 Isolation

Since each workload runs in its own cluster, there are no shared resources between the different workloads.

Each workload has its own hardware, CPU, memory, operating system, Kubernetes components (e.g. container runtime, kubelet, API server), and cluster services (e.g. DNS).

This creates hard division lines between the workloads.

For example, it's not possible that a workload monopolises the shared CPU and thereby starves another workload — because there is no shared CPU.

It's also not possible that a workload sniffs some sensitive information of another workload from a shared kernel data structure — because there is no shared kernel.

This is crucial for very security-sensitive apps or apps that must comply with security policies.

It also makes it easier to make performance guarantees for a workload, which may be required for apps with a service level agreement (SLA).

_If you have very critical apps, then the isolation provided by multiple clusters may be a very important factor for you._

### 👍 Fine-grained cluster access

If every cluster runs only a single workload, then you can grant access to a cluster only to those people that have something to do with this workload.

> Access to a Kubernetes cluster can be controlled through the [authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) module in the Kubernetes API server.

For example, the only people that really need access to the _app1-dev_ cluster are the developers that currently work on _app1_.

Access to the _prod_ clusters could be further locked down by preventing _all_ humans from accessing — all deployments to these clusters could be done through an automated continuous deployment (CD) tool.

_All this can help you reduce the risk of human error to a minimum in your clusters._

**These were the pros — let's check out the cons.**

### 👎 Inefficient resource usage

Each cluster has some management overhead, and if you have many clusters, this overhead accumulates.

For example, each Kubernetes cluster typically has 3 master nodes — so, if you have 10 clusters, you have 30 master nodes in total.

If each of these clusters also has 3 worker nodes, you have 60 nodes in total — 30 master nodes and 30 worker nodes.

_This means that 50% of your compute instances are used solely for management purposes!_

Compare this with a scenario where you have a single cluster with 30 worker nodes and 3 master nodes.

_In that case, only 9% of the compute instances are used for management purposes._

Running only a single workload per cluster may also require you to overprovision the compute resources in each cluster.

For example, for high-availability, you may need 3 worker nodes in each cluster to run a single workload — even if a single worker node could easily run 3 instances of that workload.

So, if you have 10 workloads, you need 30 worker nodes — on the other hand, with a single cluster, you could run the 10 workloads on a cluster with just 10 worker nodes, under the same high-availability guarantees.

_In general, if you use many small clusters, you can expect a worse resource utilisation._

### 👎 Expensive

A Kubernetes cluster typically comes at a cost, and the more you have of them, the more you have to pay.

For example, you need to provision and pay for the master nodes of each cluster, be it on-premises or in the cloud.

This inconvenience can be alleviated by using managed Kubernetes services that don't charge for the master nodes, such as [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/).

In these cases, you only pay for the worker nodes — thus, 10 clusters with 1 worker node cost the same thing as 1 cluster with 10 worker nodes.

_However, in the general case, you can expect a larger number of smaller clusters to be more expensive than a single large cluster._

### 👎 Costly administration

Administrating many Kubernetes clusters is more work than administrating a single Kubernetes cluster.

Typical administration tasks may include upgrading the Kubernetes version, installing CNI plugins or admission controllers, setting up a CI/CD pipeline, configuring [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) authorisation rules, and much more.

If you want consistency between the clusters, you must make sure to apply all settings in a uniform way to your clusters.

_The only way to achieve this efficiently is through automation._

Thus, you have to invest time and effort in developing automated tools and processes.

_In summary, if you use a multi-cluster approach, you have to be ready to use a non-negligible amount of your time for administration tasks._

**That's it for the single-purpose cluster approach.**

So far, you have seen the two most extreme cluster strategies:

- **One large general-purpose cluster**
- **Many small single-purpose clusters**

However, it doesn't have to be only black or white — there are also some intermediate strategies:

- **One cluster per application**
- **One cluster per environment**

_Let's look at them next._

## 3. One cluster per application

With this approach, you have a separate cluster for each application:

![One cluster per app](assets/cluster-per-app.svg)

Each cluster hosts all the environments of the corresponding application.

For example, the _app1_ cluster hosts the _dev_, _test_, and _prod_ environments of _app1_.

In a case like this, you would typically organise the cluster with a separate [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) for each environment — so, you could have a `dev`, `test`, and `prod`  namespace in each cluster.

_Let's see what particular pros and cons this approach has._

### 👍 Isolation between apps

Since each app runs in its own cluster, there are no shared resources between the different apps — each app has its own hardware, operating system, network, and so on.

_This may increase the security and reliability of your apps._

For example, it's not possible that some sensitive information leaks to some other app through a shared resource, because there are no shared resources.

Also, an app can't be hampered by another app overusing a shared resource such as the CPU, because there is no shared CPU.

Note that there are still multiple workloads running in each cluster, namely the different environments of each app — however, this is much easier to control than having different apps running on the same cluster.

_In general, isolating apps by running them on separate clusters makes it easier to control the execution of these apps, which may enable you to meet security policies and SLAs._

### 👍 Clusters can be customised for their app

Each cluster has a specific purpose, namely running a specific app — that means that you can customise each cluster for this specific task.

For example, you can configure all those settings and components in a cluster that are beneficial for the app that is running in it.

If an app benefits from a specific CNI plugin or Ingress controller, you can install exactly those features in the cluster.

Furthermore, if an app has a specific requirement, this requirement is localised to a single cluster.

For example, if an app requires a GPU, you can add a GPU worker node to the corresponding cluster — since the app runs only in _that_ cluster, there's no need to add this resource in any other cluster.

_In short, having a separate cluster for each app allows you to create a streamlined and efficient execution environment for the apps._

### 👍 Cluster access can be locked down by team

Typically, each app is developed by a team.

If each cluster runs only a single app, then access to a cluster can be restricted to the team that is responsible for this app.

For example, the only users that need to have access to the _app1_ cluster are the developers of the team that is responsible for _app1_.

_By granting cluster access on a team basis, you can prevent people from having access to unnecessary areas of your system, which reduces the risk for mistakes and unwanted side effects._

**These were the pros — let's see what the cons are.**

### 👎 Different environments in the same cluster

The main disadvantage of this approach is that multiple environments run in the same cluster.

This means that different versions of the same app run on the same cluster — thus sharing all the cluster resources among each other.

This bears a certain risk, especially with respect to the _prod_ environment.

Imagine that a developer makes a mistake and breaks the cluster — _this will potentially break your production app too!_

It's also possible that a development version of an app monopolises the shared CPU and therefore negatively affects the performance of the production version.

_In general, if multiple versions of an app share the same cluster, there's a latent risk of the production version getting impaired._

**That was it — let's turn to the last cluster strategy.**

## 4. One cluster per environment

With this approach, you have a separate cluster for each environment:

![One cluster per environment](assets/cluster-per-env.svg)

Each cluster contains the corresponding environment versions of all the apps.

For example, the _dev_ cluster contains the development versions of all the apps, the _test_ cluster contains the testing versions of all the apps, and so on.

In a situation like this, you would typically organise the cluster with a separate [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) for each app — so, you could have an `app1`, `app2`, and `app3` namespace in each cluster.

_Let's see what the pros and cons of this approach are._

### 👍 Isolation between environments

Since each environment runs in a different cluster, these environments are completely isolated from each other.

This does especially matter for the _prod_ environment.

All the production versions of the apps are independent of whatever happens in any of the other environments.

For example, if a developer breaks the _dev_ cluster, this does not affect any of the production versions in the _prod_ cluster — they keep running as usual.

This approach also allows to safely test new cluster configurations before applying them to production.

For example, if you want to upgrade the Kubernetes version, you can first test it in the _dev_ cluster — if everything goes well, you can then apply it to the _prod_ cluster.

_In general, having the environments isolated in separate clusters allows for more reliable operation of the production environment._

### 👍 Clusters can be customised for their environment

By having each environment in a separate cluster, each cluster has a specific purpose:

- The _dev_ cluster is used for developing new versions of apps
- The _test_ cluster is used for testing apps
- The _prod_ cluster is used for running apps in production

This allows you to customise each cluster for its specific task.

For example, you could augment the _dev_ cluster with development and debugging tools that facilitate the work of the developers.

Or you could install various testing frameworks in the _test_ cluster.

You could also power-up the _prod_ cluster — for example, by equipping it with more powerful hardware and network connectivity to serve your production apps more efficiently.

_In summary, the separation of concerns provided by separating environments in different clusters, allows you to achieve each task more efficiently._

### 👍 Cluster access can be locked down by function

Since each cluster carries out a specific function, you can restrict access to each cluster to users who have something to do with this function.

For example, only developers need to have access to the _dev_ clusters, and only testers need to have access to the _test_ cluster.

The _prod_ cluster can be further locked down so that no humans have access to it at all.

Any deployments and configurations to the _prod_ cluster can be done through automated processes, such as a CI/CD pipeline.

This would greatly increase the reliability of the _prod_ environment because the risk of human error in the _prod_ cluster is minimised.

_In general, having a separate cluster for each environment gives you a great way to protect your most critical applications from human mistakes._

**Having seen the pros, let's turn to the cons.**

### 👎 Different apps in the same cluster

The main flaw of having a separate cluster per environment is that there are multiple unrelated applications in the same cluster.

_This has several disadvantages._

On one hand, there are security considerations — the apps use shared resources in the cluster, which increases their attack surface.

_If you have very security-sensitive apps, or must comply with security policies, this may be a deal-breaker for you._

Furthermore, dependencies of individual apps must be fulfilled in all the clusters.

_For example, if one of the apps requires a GPU, then you need to have a GPU worker node in all clusters, even if it's used only by a single app._

Finally, different apps may have conflicting requirements.

_For example, if a specific app relies on CNI plugin A and another app relies on CNI plugin B, then you can't satisfy both requirements at the same time._

This also means that you can't optimise your clusters for any of the apps — you need to find a compromise that works for all of them.

_In general, the fact that multiple apps are running on the same cluster, may have negative impacts on security and efficiency of these apps._

**This concludes our discussion of the different Kubernetes cluster strategies.**

_Let's wrap up._

## Conclusion

In this article, you have examined the pros and cons of the most important Kubernetes cluster strategies, including:

1. [**One large general-purpose cluster**](#1-one-large-general-purpose-cluster)
1. [**Many small single-purpose clusters**](#2-many-small-single-purpose-clusters)
1. [**One cluster per application**](#3-one-cluster-per-application)
1. [**One cluster per environment**](#4-one-cluster-per-environment)

_So, which approach should you choose?_

As usual, there is no general answer to this question.

_It entirely depends on your use case and requirements._

You have to carefully trade-off the pros and cons of each approach against each other to find the solution that works best for you.

_However, as rule of thumb, here are some general considerations:_

- If you want to save money and resources and security is not a major issue, you may consider using a single cluster for all your workloads. Kubernetes is made for _sharing_ infrastructure workloads, and this approach honours this intention.
- If you have to comply with security policies or SLAs, you may consider using a separate cluster for each application. This provides a hard division line between your apps which allows you to fully control each of them.
- If security is not a major issue, but you want to focus on production uptime and performance, you may consider using a separate cluster for each environment. This allows you to fully control and lock down your production workloads.
- If money and efficient usage of resources are no issues for you, and you're willing to invest some effort in the development of administration tools, you may consider using a separate cluster for each of your workloads. This provides you with the ultimate level of isolation and control for your workloads.
