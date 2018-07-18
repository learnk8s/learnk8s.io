During the last few years, the industry as experienced a shift towards micro service based architecture.

It doesn't come as a surprise that more and more companies are breaking their large and static monoliths into a set of decoupled and independent micro services.

And rightly so.

Microservices are:

- quicker to deploy because you create and release smaller services
- easier to iterate on, since adding features happens independently
- reselient — the overall service can still function despite one of the services not being available

Microservices are great from a product and development perspective.

But how does the microservices cultural shift impact the infrastructure?

It turns out that things are rather simple when you deal with few sparse applications.

You only manage a handful of them and your infrastructure team has plenty of time to dedicate to support and release.

If you're a large organisation, managing hundreds of applications is demanding, but still manageable.

You have several teams dedicated to developing, packaging and releasing applications.

Microservices on the other hand introduce a different challenge.

When for every application, you can refactor the same applications in a collection of four microservices, you have at least four times more services to develop, package and release.

It's not uncommon for a small service to be made out of dozen of micro services such as a front-end app, a backend API, an authorisation server, an admin application, etc.

Indeed when you develop services that interact with each other, you see an explosion of applications deployed on your infrastructure.

And that's a challenge in managing and scaling your infrastructure.

But it doesn't end there.

Most of microservices are deployed to virtual machines such as Amazon EC2, Digital Ocean Droplets or Azure Virtual Machines.

Each virtual machine comes with an operating system that consumes part of the memory and CPU allocated to it.

When you ask for a 1GB, 1 vCPU droplet on Digital Ocean, you're probably only using 700MB in memory and 0.8 vCPU after you remove the overhead of the operating system.

Or in other words, every five virtual machine the overhead adds up to a full virtual machine.

You pay for five, but can use only four.

You can't escape from it, even if you're on bare metal.

You still need to run your services from a base operating system.

It's fine, you say.

Everybody needs to run an operating system.

Everybody pays for it.

It's an unavoidable _tax_.

And you're right.

The cash wasted on operating systems overhead is only the tip of the iceberg.

You have probably realised that microservices come with very different resource requirements.

Some microservices such as data processing and data mining applications are more CPU intensive.

Others, such as servers for real-time applications, are more memory intesive.

Your automation and CI pipelines engineers has selected the most common setup as the de facto standard.

Every application is wrapped into a 2GB and vCPU machine.

Even if you need only 1GB of memory.

You will optimise in the future, you keep telling yourself.

In practice, it never happens.

When you're lucky the micro services fits the requirements perfectly.

Some times you end up wasting few hundreds megabytes of RAM.

Others you only use a single digit percent of the allocated resources.

It's common to find companies utilising only 10% of the allocated resources.

You pay $1000 in EC2 instances on Amazon, you only actual use $100 of it.

That doesn't sound like the best way to spend your budget.

You should get your money back on the resources you don't use.

You should also have a word with your engineering team and ask to pack your applications more efficiently!

You could do all of the above.

But resource utilisation is not the only challenge when it comes to microservices.

Development teams have the freedom to use the right tool for the job.

And when they do so, they can iterate quickly and churn more features.

Your infrastructure becomes a theme park.

Node.js for the front-end, Spring Boot for the backend API, Flask and Celery for the workers, React.js for the client-side, you name it.

Having the right technology for the job enables greater iteration speed, but it usually comes with the extra burden on managing one more programming language.

In fact, your infrastructure team has never been busier than now.

Each application has a number of dependencies, runtimes and libraries to be installed before it can be deployed.

And each of them is a special snowflake: both the payment and the backend API team selected Java as their technology of choice, but they run on Java 1.8 and Java 10 respectively.

It turns out, your cloud engineers are writing Puppet scripts to automate deployments and installing dependecies.

But they size of the team is nowhere comparable with the rest of the development teams.

So you're pipelines are clogged.

Features rarely make it to production in time and there's a costant chatting between development and infrastructure team.

Too much talking not enough action!

It would much easier if the development team could help out by taking some of the responsabilities such as packaging dependencies.

You could finally stop hiring dozen of cloud engineers just to cope with the current demand.

If you've started thinking that perhaps holding to the big monoliths is not such a bad idea, please welcome to the club.

Not only it was more cost effective, but it scaled nicely with the team.

And you had proper teams!

System administrators, testers, developers, Jenkins team.

All of them separated in their own cublicles talking through a well organised Jira board.

Those were the days!

Unlike today where collaboration is king and you should strive to have cross functional teams that are empowered in making decisions.

But what if that wasn't such a bad idea, after all?

What if your small team could work on packaging, deploying and releasing their application.

What if they had the tool to ship consistent artefacts that can be easily deployed in production.

And what if instead of having humans providing virtual machines and selecting resources and requirements you had a machine in charge of orchestrating the resources?

You could finally save thousands of dollars on your cloud provider bill.

You could finally save yourself from hirining dozen of niche engineers since you can now empower your team into making releases.

You could finally promote collaboration and break the silos that divide your teams.

You're in luck, today.

Linux containers are a technology popularised by Docker that helps you replace virtual machines with simple processes.

Instead of instantiating a virtual machine and running a process, Docker containers allow you to isolate a process in the kernel.

It's like clicking on Firefox on your desktop.

When it opens and you're ready to browse.

The magic of containers comes from two feature in the Linux kernel: control groups and namespaces.

Control groups are a convenient way to limit the CPU or memory that a particular process can use.

In our example, you could say that Firefox should use only 2GB of memory and one of your 4 core processors CPU.

Namespaces on the other hand are in charge of isolating the process and limiting what it can see.

Again, Firefox could only see the network packets that are directly related to it.

It won't be able to see all of the network packets flowing through the network adapter.

Control groups and namespaces are low level primitives.

With the years developers created more and more layers of abstractions.

At the beginning there was LXC, then finally Docker and the rest is history.

So Docker containers aren't virtual machines and don't need to emulate hardware or have an operating system.

But how can they help your team to ship software quicker?




https://twitter.com/amicel/status/1009326802106552320





Why should you bother with Docker and Kubernetes?

- Intro to microservices & large # of apps
- Challenges
  1. resource utilisation
    - vm overhead
    - scheduling & automation
  2. dependencies
    - encapsulating environment vs puppet
    - different skills (past)
  3. team silos
    - devops => is just ops
    - testers
    - network
    - request IP on load balancer, VM as jira ticket
- What if
- Containers as Lighter VMs
  - processes vs VMs
  - cgroups
  - namespaces
  - features
    - boot in seconds
    - no hw emulation
    - dynamic resource allocation
  - package all deps
  - infrastructure is language agnostic
- how do you manage containers, though
  - the case for a container orchestrator
  - container orchestrators in the market
- kubernetes
  - how does it work?
  - scheduler
  - glorified API
- end to end journey
  - CI and automation
  - team coming together
  - digital transformation
- Case studies?


- What I want
  - effienciency
    - containers and scheduling
    - VMs, bare metal, different machines
    - multi cloud
  - delivery iteration and throughput
    - team spending more time on infra than code
  - control, visibility
    - business continuity (DR)
- Challenges
  - security
    - containers, registry
    - new attack vectors
  - developers, network, DBAs
    - now all in one
  - maturity


