---
layout: post
title: Kubernetes on solar plants
date: 2018-10-26 15:49:00
author: "Daniele Polencic"

description: ""

excerpt: ""

categories: kubernetes iot "internet of things" "solar plant" "clean energy"

image:

open_graph:
  type: article
  title: Kubernetes on solar plants
  image:
  description:
---

Demand for renewable energy has been growing steadily in the last decade. And according to the reports, Solar power was the fastest-growing source of new energy worldwide, outstripping the growth in all other forms of power generation.

Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world.
And not only businesses and governments, but also individuals find it attractive to build their solar plants.

Capturing the optimal amount of energy from a solar panel is a tricky business, however.

If you want your solar panels to operate efficiently, you have to keep them clean, point them at the sun and make sure they don’t get too hot.

So how do you keep everything under control and be notified when something isn’t right, and it requires your attention?

Solar panels can feature a small embedded device capable of

- measuring the performance and efficiency of the cells
- monitoring the environment
- driving the actuators to track the sun during the day

The embedded computer collects and sends the data to a central location where is then aggregated, processed and stored.

If the solar panel is dropping in efficiency, an operator can quickly be alerted and take action.

In larger plants, all the data is passed through a wired network, but it’s not uncommon to see those embedded computers connecting over the air. Imagine controlling your solar panels over 5G: the beauty of not having to deal with extra cables and the horror of long responses, dropped connections and timeouts.

In a setup like that, deploying and managing applications becomes a real challenge.

If you’re managing hundreds or thousands of devices, it’s not practical to install software and firmware updates manually. You should design a system that can be updated remotely and where you can release software incrementally without leaving your desk.

Ideally, you should design a mechanism to package software that has almost zero overhead without sacrificing portability. Something small and efficient. Something that will last for the years to come.

And you should pay attention to transmit data securely. You don’t want someone taking over operations. Imagine the damage they could cause, particularly in large-scale installations.

Communication should be encrypted everywhere. But how? Designing a secure cluster isn’t exactly a small feat. Mainly because you could have someone breaking in your property and physically inspecting your devices to extract secrets. How do you protect against that?

And even if you have security sorted, rolled out a strategy for software and firmware updates you have still a long way to go. You still have to create service to aggregate and process the data, as well as a dashboard for visualisations, alerts and monitoring and a control plane to drive coordinated changes.

What it initially looked like a fun weekend project, it’s a major effort in distributed system engineering.

There’re companies specialised in designing and installing software for solar plants. Should you surrender and buy a prepackaged software?

Never.

So how can you compete with an established business and years of experience?

By playing smart.

Building the internet of things at scale like in a solar plant has plenty of commonalities with cloud infrastructure. Elastic Containers Service (ECS), a product from Amazon Web Services, can deploy applications across several computers. It’s designed so that you install an agent on the computer and a master node is in charge of scheduling workloads. You tell ECS what to deploy and the software instruct one of the agents to download and run it.

That sounds a lot like what you want to do with your solar panels.

You want to have an agent installed on each embedded computer, and you want to manage applications from a central location.

But ECS is Amazon only, and you can’t take advantage of it on your hardware. What you need is an open source version of ECS.

Enter Kubernetes.

Kubernetes is similar to ECS: you install an agent called the kubelet in your devices, and you let them join the cluster. From that moment onwards your devices are acting as one, and you can schedule deployments and manage applications.

This time, however, you’re not locked in. Kubernetes is a major open source effort, and you’re free to download, customise it and contribute back.

Is it secure?
Communication between the kubelet and the master node is secured using TLS. Each node can be provisioned with its certificate, so even if one node is compromised, you can reject only a single certificate while keeping the rest of the cluster available.
And even better, the community has a track record of sharing good practices on how to secure your cluster.

You should check out the awesome kubernetes security on Github to see what I mean. [link]

Now, if only it had a way to roll-out updates…
Kubernetes doesn’t know how to deploy applications written in C, Java or Node.js. It doesn’t know how to deploy applications at all.

That’s not useful, is it?

Kubernetes is only able to deploy Linux containers — that’s why it’s also called a container orchestrator.

Containers are essentially archives — similar to zip files. To run the container you unpack the archive and run the application as a process on the host.
You probably don’t want processes to interfere with one another, so Linux containers have a nice feature where each process is isolated from the others.

Kubernetes leverages Linux containers to run your applications. So instead of developing your mechanism to distribute applications, you can:
1. Ask Kubernetes to schedule a deployment
2. Wait for the agent on each node (the kubelet) to pick up the task
3. Let the kubelet download the archive and run it as an isolated process.

Containers are also designed to be efficient. When you update your package and wish to redistribute it, you can only ship the difference between the previous and the current container. When the delta is received, the new package is recomputed from the diff, unzipped and run as a separate process.

Linux containers and Kubernetes are an excellent platform to run applications on your internet of things.

In fact, you could install kubernetes in your solar plant and benefit from:

- A centralised scheduler to issue deployments
- secure and encrypted updates delivered as containers
- A proven technology able to scale to thousands of devices

_So what happens when a solar panel breaks?_

Kubernetes continually watches your infrastructure for failing processes and agents. When a device fails, Kubernetes will reschedule all of the applications deployed on that computer to another.
Also If one of the application fails, perhaps because of a memory leak, Kubernetes will restart the app a predetermined number of times.

Kubernetes never trust the nodes and the applications to work fine and is always observing the state of your infrastructure for glitches.
In the cloud, Kubernetes also monitors resources. If you don’t have enough capacity to run all of your apps, it will ask the cloud provider to provision more compute resources.

Kubernetes is excellent for deploying containers, but it’s designed to maximise the efficiency of your infrastructure. When you deploy five instances of an application, those are scheduled to maximise efficiency. Kubernetes by default will try to spread the containers across all nodes, and try to pack your nodes as dense as possible. There’s no guarantee that five instances of your applications will end up on five different devices. They could be deployed all on the same node. Or maybe in two, depending on the resource allocation.

Particularly in the embedded world where resources are scares, you don’t want deployments just to be placed anywhere. You want to have a strict set of rules for deployments. As an example, each solar panel should have only one app running at any given time.
In the case of an application in charge of tilting the solar panels to track the trajectory of the sun, you don’t want to have two applications deployed on the same node to drive the same motor.

Kubernetes has several strategies to deploy containers in your nodes. The most straightforward strategy is Deployment. In a Deployment, you specify the number of instances of your application and Kubernetes will find the space to allocate them. This is the most common deployment. It’s a very popular strategy for releasing apps in the cloud, but not useful in the embedded world.

There's a few more strategy such as StatefulSets and ReplicaSets. Each of them comes different trade-offs.

One in particular — the DaemonSet — deploys one application per node. If you wish to have a single application accessing the hardware of your embedded computer, perhaps a DaemonSet is a better strategy.

If you add a new solar panel with a connected device and join it to the cluster, Kubernetes will schedule and deploy the application automatically on that node too.

So far so good. You have:

- Packaged applications as Linux containers
- A centralised way to distribute software securely and incrementally
- Few strategies to deploy applications to maximise efficiency or prioritise hardware access
- A reliable platform that self-heals when there are failures

Excellent setup if you consider that you started from zero.

Now you that you know what Kubernetes is capable of and how it can scale your internet of things, what’s next?

In June 2018 Redmonk wrote an article suggesting that Toyota runs Kubernetes in their cars.

You can imagine each small component in your car such as the dashboard, the radio functions or the side lights having their computer with a Kubernetes agent installed. The components are connected and can communicate using the internal network. The kubernetes master is in charge of making sure that the services are always up and running, as well as scheduling deployments.

Need to replace the dashboard? Just replace the component and Kubernetes will schedule the software to run on the embedded computer.

Adding a GPS? No problem. Join the device to the cluster and start streaming the data.

In the beginning, it might sound odd. But if you think about it, it makes sense.
You have to connect those components and orchestrate them.
You can’t have the front lights disconnected from the dashboard.

But it turned out that it wasn’t right. Toyota didn’t run Kubernetes in their cars, but they used Kubernetes as part of their backend services. Once you connect the car to one of their diagnostic tools, the data is extracted from the vehicle and ingested into a Kubernetes cluster that’s designed to run in the cloud.

Few days after the release, Redmonk amended the article to clarify the use of Kubernetes.

Even if the story was untrue and was just a result of a misunderstanding, it still makes you think.

What if?
What if you could run Kubernetes in a car?
And what’s stopping you from using Kubernetes in a solar plant?
Or in any other internet of things device?

You could solve some of the hard challenges such as securing communications, delivering incremental updates and centrally controlling your fleet.

You could have the best time to market for your internet of things. Hundreds of days of development saved because you can reuse a proven tool.

While Kubernetes was initially designed to run in data centres, its applications go well beyond the cloud, and it won’t take long before the news come out of kubernetes used in another internet of things setup.

And I can’t wait to hear what you’re going to build next with it.