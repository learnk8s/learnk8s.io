---
layout: post
title: What is Kubernetes anyway?
description:
date: 2018-07-16 11:26:00
categories:
image:
open_graph:
  type: article
  title: What is Kubernetes anyway?
  image:
  description:
---

During the last few years, the industry has experienced a shift towards developing smaller and more focussed applications.

It doesn't come as a surprise that more and more companies are breaking their massive and static monoliths into a set of decoupled and independent components.

And rightly so.

Services that are tiny in size are:

- quicker to deploy because you create and release them in smaller chunks
- easier to iterate on, since adding features happens independently
- resilient — the overall service can still function despite one of the components not being available

Smaller services are great from a product and development perspective.

_But how does that cultural shift impact the infrastructure?_

## Managing infrastructure at scale

It turns out that things are rather simple when you deal with a few sparse applications.

You can count them with your hands, and you have plenty of time to dedicate to support and release.

In large organisation, managing hundreds of applications is demanding, but still manageable.

You have several teams dedicated to developing, packaging and releasing applications.

Developing services out of smaller components, on the other hand, introduces a different challenge.

When for every application, you can refactor the same apps in a collection of four components, you have at least four times more apps to develop, package and release.

It's not uncommon for a small service to be made out of a dozen of components such as a front-end app, a backend API, an authorisation server, an admin application, etc.

Indeed when you develop services that interact with each other, you see an explosion of components deployed on your infrastructure.

It gets harder, though.

## You're probably wasting your money on compute resources

Most of the services are deployed to virtual machines such as Amazon EC2, Digital Ocean Droplets or Azure Virtual Machines.

Each virtual machine comes with an operating system that consumes part of the memory and CPU resources allocated to it.

When you create a 1GB of memory and 1 vCPU droplet on Digital Ocean, you end up using 700MB in memory and 0.8 vCPU after you remove the overhead of the operating system.

Or in other words, every five virtual machine the overhead adds up to a full virtual machine.

**You pay for five but can use only four.**

You can't escape from it, even if you're on bare metal.

You still need to run your services from a base operating system.

_It's okay_, you say.

_Everybody needs to run an operating system._

_Everybody pays for it._

_It's an unavoidable tax_.

And you're right.

However, the cash wasted on operating systems overhead is only the tip of the iceberg.

## Who is paying for all the waste?

You have probably realised that when you break your service in smaller components each of them comes with different resource requirements.

Some components such as data processing and data mining applications are CPU intensive.

Others, such as servers for real-time applications might use more memory.

Amazon Web Services has indeed a long list of compute resources that fits every need: general purpose, CPU optimised, memory optimised, storage optimised and GPU computing.

You should strive to use the right virtual machine that supports the requirements of the component that you're developing.

Are you working on a critical web component written in Java? Perhaps you should use a c5.4xlarge optimised for compute intensive workloads.

The closer you match the requirements, the better you're utilising your resources.

In practice this is rather uncommon, though.

_Should you use a c5.2xlarge or a c5.4xlarge?_

_Do the 8 vCPU and 16GB memory makes a difference?_

It's much easier to select a couple of computing profiles that are good enough in 80% of the cases and use those for all components.

_In fact, what's wrong with using mostly the same virtual machine for every workload?_

None at all, if you're happy to wrap every component into a 2GB of memory and vCPU compute capacity.

Even if your component can run with only 1GB of memory.

_Yes, you could optimise in the feature._

But let's be honest: **you never have the time**.

And you end up wasting hundreds of megabytes of RAM and plenty of CPU cycles.

If it makes you feel any better, there're plenty companies suffering from similar inefficiencies.

Some utilise as little as 10% of the allocated resources.

**You pay $1000 in EC2 instances on Amazon, you only actual use $100 of it.**

That doesn't sound like the best way to spend your budget.

_You should get your money back on the resources you don't use._

_And you should spend more time tailoring compute capacity to your services._

_But why are those requirements so different anyway?!_

## Choosing the right tool — ah! it hurts!

When developers have the freedom to use the right tool for the job they usually go wild.

Node.js for the front-end, Spring Boot for the backend API, Flask and Celery for the processing background jobs, React.js for the client-side, you name it.

The infrastructure becomes a theme park, hundreds of applications running on completely different runtimes.

Having the right technology for the job enables greater iteration speed, but it usually comes with the extra burden of managing one more programming language.

While you could mitigate the proliferation of tools and languages, in practice, it's more complex than that.

Two applications sharing the same JVM runtime might rely on a different set of dependencies and libraries.

Perhaps one relies on ImageMagick to resize images.

The other relies on a binary such as PhantomJS to be available in its path.

You should package those dependencies alongside its application.

And so you end up dealing with dozens configurations that are the same, but different in their special way.

Using automation scripts such as Chef or Puppet will only take you so far.

You're always one step behind, catching up and reacting at the mercy of the development team.

In fact, you shouldn't treat the infrastructure as an after thought.

You should look after your dependencies and package them as you develop the application, right from the beginning.

Ideally, you should archive all of the parts necessary to run your component as a single bundle.

No more getting lost in chasing dependencies just before a release.

_It sounds all good, but how do you actually scale that in th organisation?_

## Scaling releases with your teams

When you have teams dedicated to development and others looking after the infrastructure, you have clear priorities defined for each of them.

And you want to keep teams accountable to their duties:

- software engineers — develop and release new features!
- infrastructure engineers — you're on package, release and support!

And the in the tipical scenario your application is developed, packaged and released in subsequent steps, one after the other.

One team produces the work, the other packages and releases it.

But when you actually implement the plan, you start noticing that reality looks different.

What you thought was a straight line from development to production is instead a bumpy road.

_"The application is done and dusted, we're just waiting for it to be deployed!"_

_"We can't deploy applications that require 48GB in memory! What are the developers doing?"_

The product owner is frustrated because teams are figthing each other and slowing down delivery.

And there's a constant pointing fingers between the teams.

It would be much easier if the teams could play nicely together.

They could finally focus on releasing features rather than fighting each other.

And you could finally smile at features shipped around the clock.

If only!

If only you could also cut your cloud provider bills too!

Paying for something that you don't use still hurts.

Less spending, quicker iterations and delivery.

If only.

_Maybe there's something you can do._

# Virtual machine on a diet

It turns out the technologies you dream of are ready available.

In fact, you could replace virtual machines with something lighter.

Linux containers are a technology popularised by Docker that helps you run isolated processes.

Instead of instantiating a virtual machine and running a process within an operating system, Docker containers allow you to sandbox a process in the kernel.

It's like opening Outlook. Click. Done.

When it opens, you're ready to see your emails.

When you want to use your Gmail instead, you have to open a web browser, find the right address, wait for the browser to render the page and finally read your emails.

The magic of containers comes from two feature in the Linux kernel: control groups and namespaces.

Control groups are a convenient way to limit the CPU or memory that a particular process can use.

As an example, you could say that your component should use only 2GB of memory and one of your four core processors CPU.

Namespaces, on the other hand, are in charge of isolating the process and limiting what it can see.

The component can only see the network packets that are directly related to it.

It won't be able to see all of the network packets flowing through the network adapter.

Control groups and namespaces are low-level primitives.

With time developers created more and more layers of abstractions to make it easier to control those kernel features.

One of the first abstractions was LXC, but the real deal was when Docker was released in 2013.

So Docker containers aren't virtual machines and don't need to emulate hardware or have an operating system.

But how can they help your team to ship software quicker?

Docker containers can be easily described with recipes.

And you're the chef.

If your application requires the JVM 1.8 with the Java Cryptographic Extension, you should add them to your list.

If you your application uses ImageMagick or PhantomJS, you can add those in too.

Once you're ready, you can bake your container with all dependencies and files.

The process is akin to packaging an RPM or compressing a folder as a Gzip file.

This is what the ~recipe~ `Dockerfile` looks like:

```dockerfile
FROM TODO
```

So what's different this time?

Once you know how to run a process packaged as a container, you know how to run all other containers.

In fact, containers expose a consistent interface independenlty of what they contain.

Have a look:

```
docker run -ti ubuntu bash
```

And I have a bash in an Ubuntu-flavoured environment. Or I can do:

```
docker run -ti mysql
```

And I can use a MySQL database inside a container.

By using a consistent interface to run a variety of containers you just solved the problem of portability.

As long as you know how to run containers, you can deploy applications ranging from Java to Node.js, to Python.

No need for complicated Puppet scripts.

And best of all, no operating system.

The Docker container is merely a running process that can only see its resources.

You're saving money operating systems ✅
Developers can package their creations in generic containers ✅
You still have to manage thousands of containers ❌

Managing containers at scale sound one of those hard problems that require a bit of thinking.

Perhaps you could automate your deployment even more.

Still doesn't help with optimising resources if you run one Docker container per virtual machine, though.

You should work out how to run multiple containers on the same virtual machine.

But it sounds like a lot of work.

However if it pays off, perhaps it's worth it.

But what if you could automate that too?

What if you could have an algorithm deciding where to place those containers?

It turns out that someone had precisely that idea.

And luckily for you, more than a single person.

Three technologies are competing in the container orchestration arena:

- Apache Mesos
- Hashicopr Nomad
- Kubernetes

They all have pros and cons.

But the reality is that if you start comparing them, you will notice that it's not a fair fight.

Kubernetes is the de facto container orchestrator with support from all the major players: Google, Microsoft, Red Hat, Pivotal, VMware, IBM and many more.

Why Kubernetes?

What's so unique about it?

Kubernetes has initially been a Google creation.

Google was running a technology similar to containers and had to find an efficient way to schedule workloads.

They decided to write a platform that can automatically analyse resource utilisation and schedule deployments.

Later on, few Googlers decided to leave the company and restart the project as an open source effort.

The rest is history.

How does Kubernetes work, you say?

You can think about it as a scheduler.

Kubernetes measures your infrastructure (bare metal or cloud, public or private) and collects CPU and memory for each computer.

When you request to deploy a container, Kubernetes identifies the memory requirements for your container and finds the best computer to satisfy your request.

You don't decide where the application is deployed. The data centre is abstracted away from you.

In other words, Kubernetes will play Tetris with your infrastructure.

Docker containers are the blocks; computers are the board, and Kubernetes is the player.

Having someone efficiently packing your infrastructure means that you get more computing for your money.

And your overall bill usage should decrease as a result of that.

Remember the companies using only 10% of their allocated resource?

Well, Kubernetes just saved your day.

But there's more.

Kubernetes has a killer feature that's usually forgotten or dismissed.

Everything you do in Kubernetes is one API call away from you.

Do you need to deploy a container? There's a REST endpoint for that.

Perhaps you wish to provision a load balancer? Not a problem. Just call this API.

Do you wish to provision storage? Please send a POST request to this URL.

Everything you do in Kubernetes is calling APIs.

And there're plenty of good reasons to be excited about that:

- You can create scripts and daemons that interact with the API programmatically
- The APIs are versioned; when you upgrade your cluster you can keep using the old APIs and gradually upgrade
- You can install Kubernetes in any cloud provider or data centre, and you can leverage the same API

You can think of Kubernetes as a layer on top of your infrastructure.

And since this layer is generic and it can be installed anywhere, you can always take it with you.

Amazon Web Service is too expensive?

No problemo.

You can install Kubernetes on Google Cloud Platform and move your workloads there.

Or perhaps you can keep both because having a strategy for high availability always comes in handy.

But maybe you don't believe me.

It's too good to be true, and I'm selling smoke and mirrors.

Let me show you.

Netlify is a platform for building, deploying, and managing static websites.

It has its own CI pipeline, so every time you push a change to a repository, your website is rebuilt.

Netlify managed to migrate to Kubernetes, double their user base but still maintained the costs unchanged.

That's great news!

Imagine saving 50% of your Google Cloud Platform bill!

But Netlify isn't the only one.

Qbox — a company that focuses on hosted Elastic Search — managed to save again 50% per month on AWS bills!

In the process, they also [open sourced their efforts in multi-cloud operations](https://github.com/supergiant/supergiant).

If you're still not impressed, you should check out the press made by OpenAI.

OpenAI is a non-profit research company that focuses on artificial intelligence and machine learning.

They wrote an algorithm to play the first shooter game Dota as any human player would.

But they went the extra step and trained a team of machines to play together.

And they used Kubernetes to scale their machine learning model in the cloud.

Do you want to know the details?

128000 vCPUs

That's about 16000 MacBook Pros.

256 Nvidia Tesla P100

That's 2100 Teraflops 16-bit floating-point performance.

The same as you'd run 525 PlayStation 4.

Can you guess the cost per hour?

No?

Only $1280/hr for 128000 vCPU and $400 for the 256 Nvidia P100.

That's not a lot considering that winning Dota tournaments could net you prizes in the order of millions of dollars.