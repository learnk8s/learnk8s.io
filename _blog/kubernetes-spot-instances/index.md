---
layout: post
title: "Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes"
date: 2018-11-6 08:00:00
categories: kubernetes "chaos engineering" "spot instance"
image: /blog/kubernetes-spot-instances/cheap-cluster.jpg
description: "Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances."
excerpt: "Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances."
author: "César Tron-Lozai"
author_link: https://twitter.com/cesartronlozai
open_graph:
  type: article
  title: "Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes"
  image: /blog/kubernetes-spot-instances/cheap-cluster.jpg
  description: "Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances."
js:
  - anime.min.js
  - isScrolledIntoView.js
---

The last decades have seen a global shift from on-premise data centres to the provisioning of Virtual Machines (VMs) from mainstream cloud providers such as Amazon Web Services, Azure, Google Cloud Platform. Running and managing your own physical machines is hard and costly; chances are you'll never be as successful and efficient as any of the top cloud providers. And what's not to love when you can leverage a mature platform and features such as:

* **Vertical scalability** - You can get instances of different sizes
* **Horizontal scalability** - You can get (almost) as many instances as you want
* **Flexible pricing** - You only pay for what you use
* **Logistics cost** - You don't have to physically maintain any server (heat control, electricity, backup, storage cost, fire prevention etc…)
* **Availability** - Provision VM in separate data centres
* **Reliability** - If you pay for an instance you'll keep it until you are done. Should it go down you'll immediately (+- 5min) get a replacement

In this article, we will explore the different pricing models of a typical cloud provider. We will focus on one strategy and see how it could **cut your bill by up to  80%** if you are willing to trade in reliability. Finally, we will see how Kubernetes makes that lack of reliability irrelevant and allows you to run a cheap yet highly available cluster.

## Pay-as-you-go: flexibility comes at a price

The typical pricing model for cloud providers is based on a pay-as-you-go scheme.
Compute resources come in different sizes (i.e. memory, CPU, disk etc..) and an hourly cost. **You get billed for the amount of time the instance is running**.

This flexibility of pricing is excellent and fair, but you have to be careful with what you consume. If you leave instances running while you don't need them anymore, you'll be throwing money out of the window.

*However let's say you can foresee utilisation of a VM for a whole year. Shouldn't you be able to get a bulk discount on your bill?*

## Get a bulk discount with Reserved Instances

With reserved instances, you need to **commit** to compute resources for at least a whole year, and if you really love commitment, up to five years. You may decide to pay an amount of the bill upfront.

The discount that you get will depend on how long you are willing to commit and how much you can pay upfront. For example on Amazon Web Services, the *m4.large* instance type can be discounted as follow:


| Pricing Model               | $/hour | Instance/year | Total 1 year |
|-----------------------------|-------:|--------------:|-------------:|
|Pay-as-you-go                |$0.111  |$960           |$3847         |
|1 Year reserved 100% upfront |$0.071  |$615           |$2460         |


As you can see, the discount offered from reserved instances **typically range from 30% to 40%**.

With reserved instances, you are basically **trading flexibility for cash**. Though 30% to 40% might sound like reasonable savings, it might not always be worth it. Are you able to forecast your compute resource utilisation for the next 1 to 5 years? If you are building a cutting-edge startup in the cloud can you accurately predict what your traffic will be like in a few years?

*If it sounds like a gamble, it is. Perhaps commitment and upfront payment is not the only way you could save on your cloud bill.*

## Spot Instances: when cheap is better than reliable

AWS call them [Spot Instances](https://aws.amazon.com/ec2/spot/), Azure [Low-priority VM](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-use-low-priority) and Google [Preemptible VM](https://cloud.google.com/compute/docs/instances/preemptible).  We will call them “spot instances” as it seems to be the most common terminology. Though their inner workings differ a little, they stem from the same rationale.

A typical cloud provider buys loads of powerful servers organised in large data centres. To maximise the utilisation of hardware, they divide those computers into smaller virtual machines.

{% include_relative split.html %}

**Because they promise horizontal scalability to everyone, they need to keep a lot of unutilised hardware in case someone suddenly needs additional compute units. That, however, leaves a lot of resources unused.**

The idea behind spot instances is to allow users to tap into those extra resources at a much lower cost with the caveat that you might lose the instance at any moment. If you are running a spot instance and the cloud provider suddenly need that resource to accommodate demand from on-demand or reserved customers, you will immediately lose your instance.

Whereas **flexibility** was used as the bargaining chip with reserved instances, here it is **reliability** that has been given away. The saving benefits are much more significant though. You can typically expect to shave your bill by **70% to 80%**.

From that follows the big question:

**Should you wager the stability of your infrastructure on account of 70% to 80% discount on your bill? What would be the impact on your customers if you are likely to lose a node at any moment?**

## Embracing failure

Observations from systems at scale have proven that your application **will eventually go down**. Hard-drives, networks, JVMs, etc.,  they **all** fail if you give them enough time and requests.

Your primary weapon against failure is **replication** and **redundancy**.

If you run several copies of each component, it might be resilient to a certain number of failures. The amount of failure you can recover from will depend on how much redundancy you are willing to put in place.

Don't forget that redundancy means more compute resources. And more compute resources leads to a higher bill.

Another point to consider is the dynamic aspect of spot instances. Being based on idle resources, the size of instances available to you will **depend on what is currently unpopular**. In other words, *beggars can't be choosers*.

Perhaps this week you can pick up cheap 2GB memory instances, which is great if it is the amount of memory which your application requires. What should you do next week if those instances become unavailable, and you can only buy instances with memory starting from 4GB of memory? Of course, you could use those instances, but you'd be paying twice the price, and the extra memory would be wasted.

{% include_relative waste.html %}

Spot instances are an excellent deal, but the downsides might not be acceptable. How can you cope with random nodes disappearing without notice? How should your infrastructure handle nodes of ever-changing sizes?

What you need is a tool that continually monitors nodes and automatically manages redundancy. This tool should scale and spread the components of applications on your infrastructure; when a node is lost or created, the infrastructure is rebalanced.

It seems that one wouldn't be able to manage a consequent cloud infrastructure without such a tool. Chances are someone already built it. You are in luck, Google faced those issues years ago and have since open-sourced their solution to the problem: **Kubernetes**.

## Abstracting the data centre into a single computer

In a traditional infrastructure - say the early 2000s - you had a **fixed** number of servers and a **predictable** amount of resources.

Cloud infrastructure - especially with spot instances - have completely changed the game. Kubernetes was developed to oversee the increasing complexity of managing ever-changing compute resources.

Kubernetes provides a layer of abstraction on all your compute resources - regardless of how many, irrespective of their sizes. You only have to interact with a **single** entity: **the cluster**.

Your cluster could be formed of 10 small virtual machines or 2 big bare metal servers, the end result is the same: *a single point of interaction that manages and scales workload on your nodes*.

{% include_relative united.html %}

When you install Kubernetes on your infrastructure you select one computer as the **master** node, the rest of your fleet join the cluster as **worker** nodes. As you add or remove nodes to the cluster, Kubernetes keeps track of the available memory and CPU on each node.

When your cluster is ready, you send a deployment request to the master node. Upon receiving the request, Kubernetes surveys the worker nodes for available memory and CPU and finds the best candidates to run your application.

As a user, you don't have to worry about where your application is running; it's in the cluster. If a node running your application dies, its workload will immediately be moved to other nodes.

{% include inline-subscribe-cta/index.html %}

Interestingly, Kubernetes doesn't care what the size of a worker node is, as long as it offers memory and CPU.

When a worker node with 4GB of memory and 2 CPUs registers to the cluster, the master node keeps track of the total available and spare capacities. It continually monitors the current workload on each node and can decide if a given node has enough available resources to run an application.

This is one of Kubernetes true beauty. You can forget how many individual nodes joined the cluster and how big they are: you only see a single unified entity. But if you're interested to know how big is your cluster you can sum the memory and CPU of all nodes and this will tell you how much total capacity your cluster has.

If you have one 4GB/1vCPU and one 8GB/2vCPUs instances, you only have a cluster with 12GB and 3 vCPUs.

{% include_relative resources.html %}

The other noteworthy feature in Kubernetes is that nodes are monitored for uptime.

*If a node is lost, Kubernetes will remove its memory and CPU from the cluster and migrate all applications to other worker nodes.*

## Self-healing infrastructure with Kubernetes

The Master node runs a series of synchronisation loops which follow a simple principle: as a user, you specify the desired state, e.g. “I want 3 instances of my application”.

The master node regularly checks the current state, compares it with the desired state and make any required adjustment. For example, if a master node notices that only 2 instances of an application are running, but you requested three, it immediately starts another one.

Most of Kubernetes components are designed this way: a control loop that constantly regulates the current state around the desired state.

Imagine you have 3 nodes and 3 replicas of an application, one running on each node. When a node running on a spot instance is reclaimed by the cloud provider, the application on that node is lost. Kubernetes realises that you only have 2 replicas running instead of 3 and immediately starts another copy in one of the two remaining nodes (if space is available of course).

{% include_relative reschedule.html %}

## Spot instances and Kubernetes: a match made in heaven

In the last decade, our industry has massively adopted microservices architecture. Some would argue it is a fad, others that it is just SOA rebranded. I would say that the most important revolution which came with microservices architecture, wasn't that we decided to write smaller applications, but was the **shift from preventing failures to embracing failures**.

The most significant insight from the likes of Netflix, Google and Amazon, is that at scale, things go wrong. Even on the best and most expensive hardware, the probability of failure is strictly larger than zero.

*So how do you design around it?*

**You test the failover with chaos engineering.**

Chaos engineering recommends that you actively create failures in your infrastructure to ensure you are resilient indeed. If you need to remember a single thing it is that **availability and reliability can only be achieved if you test them actively**. If you want to make sure your application is highly available, you need to kill nodes regularly.

*And what better way to kill node at random times if not spot instances?*

So not only you're saving 80% of your cloud bill because you're leveraging spare resources, but you're also continuously testing your infrastructure for resilience.

The precious reliability you obtained from reserved instances isn't that much important anymore. In fact, you don't actually care if your cloud provider reclaims your nodes unexpectedly; if you have modern and resilient architecture, you just won't even notice.

**Reduced bill and chaos engineering. That's a win-win.**

## Spot instances hot tips

If you wish to try spot instances in your Kubernetes clusters, a few things could help you optimise your infrastructure.

### Be smart with the instance type

Pick unpopular instance types. For instance, *m4* instances on Amazon Web Services are cheap because the *m5* instance family has recently been released. This made the *m4* instances go out of fashion meaning lower demand and better price for you!

### Maximum bid price (AWS only)

While Azure's Low Priority VM and Google Preemptible VMs have a fixed price, Spot instance prices are determined with a bidding process. As a user, you specify the maximum price per hour you are willing to pay. If AWS have enough spare VMs to serve everyone, everyone gets their instance at a low price. However, the price will get higher as demand increases.

Choosing the maximum bid price allows you to decide how much **reliability you are willing to trade in**. A **low bid** will ensure your **bill stays low** but will increase the **likelihood of losing a node**. A **high bid** (for example equal to the on-demand price) will **reduce node failures** but means you might pay the same as on-demand price, i.e. with no discount.

You may choose to align the bid price to the reserved instance price for 3 years (typically ~35% cheaper than on-demand). That way you are sure to never pay more than a reserved instance without having to actually reserve it.

That also depends on what you are doing. If you want to do non-critical work at the lowest price you may have a low bidding price, hoping to get cheap resource when you can but nothing otherwise.

### Monitor everything

Appropriate monitoring will tell you if your system recovered properly after a node failure. If your application did not cope with losing a spot instance in your cluster, you need to know pretty quickly.

At the beginning of your journey with spot instances, you could set up email notifications when your cloud provider reclaims one of your nodes. As your system gets more robust and you get more confident you probably won't need those anymore.

On AWS you could try the [Spot Termination Notice Handler](https://github.com/mumoshu/kube-spot-termination-notice-handler) which can be notified of spot instance termination before it happens, leaving you time to reschedule your app onto other nodes gracefully.

On AWS you should also monitor how much you pay. If the bid price ends up being close to the on-demand price, you should probably find another instance type. Remember that **Kubernetes helps you with that**. Having 3 instances with 8GB of memory is almost identical to having 6 instances with 4GB. Be smart!

### Prepare alternative means

Have an alternative means of providing instances. For example, if you are provisioning your cluster in Amazon Web Services, you can prepare additional node pools on the pay-as-you-go model and set the desired quantity to 0. If there are no available spot instances available you can always let Kubernetes switch to those other node pools.

## Summary

Kubernetes was designed to **abstract the size of nodes** and to seamlessly **move components between nodes**. This makes it the perfect candidate to work with **spot instances**. A cluster built on top of spot instances will **scarcely be less reliable** than a cluster built on reserved virtual machines. When shopping for nodes for your Kubernetes cluster, reliability should not be your primary concern. You should focus on **cheap memory and CPU**! This echoes one of the fundamental principles at Google: **You don't need reliable hardware with good enough software!**

But remember that **running your applications on Kubernetes doesn't make them horizontally scalable**. It is your **duty** to ensure that multiple copies of the application can run at the same time and can gracefully be shut down without dropping connections. More importantly, it is **critical that you actively test your availability**.

Choosing spot instances will force you to practice some degree of **chaos engineering while slashing your bill**. If you are not on that Bandwagon, you should try it now!

## That's all folks!

If you enjoyed this article, you might find the following articles interesting:

- [Getting started with Docker and Kubernetes on Windows 10](https://learnk8s.io/blog/installing-docker-and-kubernetes-on-windows) where you’ll get your hands dirty and install Docker and Kubernetes in your Windows environment.
- [Scaling Microservices with Message Queues, Spring Boot and Kubernetes](http://learnk8s.io/blog/scaling-spring-boot-microservices/). Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.

{:.caution}
## Become an expert at deploying and scaling applications in Kubernetes

Get a head start with our hands-on courses and learn how to master scalability in the cloud with spot instances.

Learn how to:

{% include promo-workshop/index.html %}

P.S. Don't miss the next experiment, insight, or *discount*: [subscribe to the mailing list!](/newsletter)
