---
layout: post
title: "Cloud infrastructure for the Internet of Things: Kubernetes on solar plants"
date: 2018-10-26 15:49:00
author: "Daniele Polencic"
description: "Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?"
excerpt: "Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?"
categories: kubernetes iot "internet of things" "solar plant" "clean energy"
image: /blog/kubernetes-on-solar-plants/solar_panel.png
open_graph:
  type: article
  title: "Cloud infrastructure for the Internet of Things: Kubernetes on solar plants"
  image: /blog/kubernetes-on-solar-plants/solar_panel.png
  description: "Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?"
js:
  - anime.min.js
  - isScrolledIntoView.js
---

Demand for renewable energy has been growing steadily in the last decade, with solar power outstripping the growth in all other renewable forms of power generation.

Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world.

**In addition to businesses and governments, individuals are increasingly finding that installing solar power arrays is viable at a lower scale.**

Capturing the optimal amount of energy from a solar panel is, however, a tricky business.

In order for solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating.

_So how do you keep everything under control and get notified when something isn't right and requires your attention?_

## Software is eating the world

One solution is to capitalise on small embedded devices that

- measure the performance and efficiency of the cells
- monitor the environment
- drive the actuators to track the sun during the day

The embedded computer collects data and sends them to a central location where is then aggregated, processed and stored.

If the solar panel is dropping in efficiency, an operator can be alerted to take action.

In larger plants, the solar arrays' data are passed through a wired network, but it's not uncommon to see those embedded computers connecting wirelessly.

**Imagine controlling your solar panels over 5G:** the beauty of not having to deal with extra cables and the horror of long responses, dropped connections and timeouts.

{% include_relative over_the_air.html %}

In a setup like that, deploying and managing applications becomes a real challenge.

## Designing the internet of things at scale

If you're managing hundreds or thousands of devices, it's not practical to attend every device in person in order to install software and firmware updates.

You should design a system that can be updated remotely.

{% include_relative ota_updates.html %}

Ideally, you should design a mechanism to package software that has almost zero overhead without sacrificing portability.

**Something small and efficient.**

Something that will last for years to come and transmit data securely to prevent malicious actors from damaging your infrastructure.

**Communication should be encrypted everywhere.**

_But how?_

Designing a secure cluster is no small feat, particularly at a solar installation that can span a wide area, making it hard to protect the perimeter from trespassers who could gain physical access to your devices to extract secrets.

_How do you protect against that?_

Even if you have security sorted and rolled out a strategy to take care of software and firmware updates, you have still a long way to go.

You still have to create a service to aggregate and process the data, design a dashboard for visualisations, set up alerts and monitoring and a control plane to drive coordinated changes.

What initially seems like a fun weekend project becomes a major effort in distributed systems engineering.

Companies exist that specialise in designing and installing software for solar plants. Should you surrender and buy prepackaged software?

**Never.**

So how can you compete with an established business with years of experience?

**By playing smart.**

## Scaling clusters with cloud infrastructure

Building an internet of things at scale, such as at the scale of a solar plant, shares plenty of commonalities with building cloud infrastructure.

Elastic Container Service (ECS), a product from Amazon Web Services, can deploy applications across several servers.

It's designed so that you install an agent on the worker computer, which communicates with a master node that is in charge of scheduling workloads.

You tell ECS what to deploy and the software on the master node instructs one of the agents to download and run it.

{% include_relative ecs.html %}

That sounds a lot like what you want to do with your solar panels.

You want to have an agent installed on each embedded computer, and you want to manage applications from a central location.

But ECS is Amazon only, and you can't take advantage of it on your hardware.

What you need is an open source version of ECS.

**Enter Kubernetes.**

## Kubernetes — the container orchestrator

Kubernetes is similar to ECS: you install an agent called the kubelet on your devices, which communicates with a Kubernetes master, forming a cluster.

From that moment onwards your devices are acting as one, and you can schedule deployments and manage applications.

{% include_relative k8s.html %}

**This time, however, you're not locked in.**

Kubernetes is a major open source effort which you're free to download, customise and contribute to.

_Is it secure?_

Communication between the kubelet and the master node is secured using TLS.

![The communication between the Kubernetes master and the kubelet is encrypted]({% link _blog/kubernetes-on-solar-plants/encrypted.png %})

Each node can be provisioned with its own certificate, so even if one node is compromised, you can reject only a single certificate while keeping the rest of the cluster available.

And even better, the community has a wealth of shared resources regarding good practices on how to secure your cluster, gleaned from thousands of real-world Kubernetes deployments.

You should check out [these collections of](https://kubernetes-security.info/) [kubernetes security best practices](https://github.com/freach/kubernetes-security-best-practice) to see what I mean.

_Now, if only it had a way to roll-out updates…_

Kubernetes doesn't know how to deploy applications written in C, Java or Node.js.

In fact, it doesn't know how to deploy applications at all.

_That's not useful, is it?_

Kubernetes is only able to deploy Linux containers — that's why it's also called a 'container orchestrator'.

**Containers are essentially archives — similar to zip files.**

To run the container you unpack the archive and run the application as a process on the host.

You probably don't want processes to interfere with one another, so Linux containers have a nice feature where each process is isolated from the others.

So instead of developing your mechanism to distribute applications, you can:

1. Ask Kubernetes to schedule a deployment
2. Wait for the agent on each node (the kubelet) to pick up the task
3. Let the kubelet download the archive and run it as an isolated process.

**Containers are also designed to be efficient.**

When you update your package and wish to redistribute it, you can only ship the difference between the previous and the current container.

{% include_relative layers.html %}

When the delta is received, the new package is recomputed from the diff, unzipped and run as a separate process.

Linux containers and Kubernetes are an excellent platform to run applications on your internet of things.

In fact, installing Kubernetes in your solar plant lets you benefit from:

- a centralised scheduler to issue deployments
- secure and encrypted updates delivered as containers
- a proven technology able to scale to thousands of devices

_So what happens when a solar panel breaks?_

## Resilience and failover in Kubernetes

Kubernetes continually watches your infrastructure for failing processes and agents.

When a device fails, Kubernetes will reschedule all of the applications deployed on that computer to another.

{% include_relative reschedule.html %}

If one of the application fails, perhaps because of a memory leak, Kubernetes will restart the app a predetermined number of times.

Kubernetes is designed with the understanding that nodes cannot be expected to continue working forever, so has a design that is self-healing; it is always observing the current state of the infrastructure and takes action whenever it detects that this doesn't match the desired state of the infrastructure.

Where it finds a discrepancy, for example if there isn't enough capacity to run all of your apps, it will ask the cloud provider to provision more compute resources.

{% include_relative scaling.html %}

Kubernetes is excellent for deploying containers in a way that maximises the efficiency of your infrastructure.

When you deploy three instances of an application, those are scheduled to maximise efficiency.

There's no guarantee that three instances of your applications will end up on five different devices.

{% include_relative allocations.html %}

They could all be deployed on the same node, or they could be deployed across two nodes, depending on the physical resources available.

Particularly in the embedded world where resources are scarce, you don't want deployments to be placed just anywhere.

**You want to have a strict set of rules for deployments.**

As an example, each solar panel should have only one app running at any given time.

In the case of an application responsible for tilting the solar panels to track the trajectory of the sun, you don't want to have two applications deployed on the same node that are trying to drive the same motor.

## Advanced deployments in Kubernetes

Kubernetes can use several strategies to allocate containers to your nodes.

The most straightforward strategy is a _[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)_.

In a _Deployment_, you specify the number of instances of your application and Kubernetes will find the space to allocate them.

This is the most common deployment type, but while it's useful for cloud deployments where you don't care which specific node is running our application (you just care that it's being run by _something_), this is less useful in the embedded world.

Other srategies include _[StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)_ and _[ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)_.

Each of them comes with different trade-offs, but doesn't serve our goal of having our application run on every available node.

For this you need a _[DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)_, a strategy that deploys one application per node.

If you add a new IoT-connected solar panel to the cluster, Kubernetes will automatically schedule and deploy the application on that embedded device (node) too.

{% include_relative daemonset.html %}

So far so good.

You have:

- packaged applications as Linux containers
- a centralised way to distribute software securely and incrementally
- strategies to deploy applications across all devices (to prioritise hardware access), or across as few as possible (to maximise efficiency)
- a reliable platform that self-heals when there are failures

Considering that you started from nothing, you're now in a pretty good place.

Now you that you know what Kubernetes is capable of and how it can scale your internet of things, what's next?

{% include inline-subscribe-cta/index.html %}

## Running Kubernetes in cars

In June 2018 Redmonk wrote an article suggesting that [Toyota runs Kubernetes in their cars](https://redmonk.com/jgovernor/2018/06/28/rancher-labs-treating-cattle-like-cattle/).

You can imagine each small component in your car such as the dashboard, the radio functions or the side lights having their computer with a Kubernetes agent installed.

The components are connected and can communicate using the internal network.

The kubernetes master is in charge of making sure that the services are always up and running, as well as scheduling deployments.

_Need to replace the dashboard?_

Just replace the component and Kubernetes will schedule the software to run on the embedded computer.

_Adding a GPS?_

No problem.

Join the device to the cluster and start streaming the data.

**In the beginning, it might sound odd.**

But if you think about it, it makes sense.

You have to connect those components and orchestrate them.

You can't have the front lights disconnected from the dashboard.

But it turned out that it wasn't right.

Toyota didn't run Kubernetes in their cars, but they used Kubernetes as part of their backend services.

Once you connect the car to one of their diagnostic tools, the data is extracted from the vehicle and ingested into a Kubernetes cluster that's designed to run in the cloud.

A few days after the article's publication, Redmonk amended the article to clarify this.

Even if the story was untrue and was just a result of a misunderstanding, it still makes you think.

_What if?_

## What if you could run Kubernetes in a car?

_And what's stopping you from using Kubernetes in a solar plant?_

_Or in any other internet of things device?_

You could solve some of the hard challenges such as securing communications, delivering incremental updates and centrally controlling your fleet.

You could have the best time to market for your internet of things.

Hundreds of days of development saved because you can reuse a proven tool.

While Kubernetes was initially designed to run in data centres, its applications go well beyond the cloud, and it won't take long before the news come out of kubernetes used in another internet of things setup.

And I can't wait to hear what you're going to build next with it.

## That's all folks!

Thanks to [Aled James](https://www.linkedin.com/in/aledjames/) (University of Bristol), and [Joe Heck](https://twitter.com/heckj) for their feedback!

If you enjoyed this article, you might find the following articles interesting:

- [What is Kubernetes? Optimise your hosting costs and efficiency](https://learnk8s.io/blog/what-is-kubernetes) and learn how Kubernetes works and why it was invented in the first place
- [Kubernetes Chaos Engineering: Lessons Learned — Part 1](https://learnk8s.io/blog/kubernetes-chaos-engineering-lessons-learned) what happens when things go wrong in Kubernetes? Can Kubernetes recover from failure and self-heal?


{:.caution}
## Become an expert at deploying and scaling applications in Kubernetes

Are you building a solar plant? Maybe a car? Or just want to deploy web applications at scale?

Get a head start with our hands-on courses and learn how to master Kubernetes.

Learn how to:

{% include promo-workshop/index.html %}

P.S. Don't miss the next experiment, insight, or *discount*: [subscribe to the mailing list!]({% link _pages/newsletter/index.html %})