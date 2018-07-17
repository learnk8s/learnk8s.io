During the last few years, the industry as experienced a shift towards micro service based architecture.

It doesn't come as a surprise that more and more companies are breaking their large and static monoliths into a set of decouple and independent micro services.

And rightly so. Microservices are:

- quicker to deploy because you create and release smaller services
- easier to iterate on, since adding features happens independently
- reselient — the overall service can still function despite one of the services not being available

Microservices are great from a product and development perspective.

But how does the microservices cultural shift impact the infrastructure?

It turns out that things are rather simple when you deal with few sparse applications.

You only manage a handful of them and your infrastructure team has plenty of time to dedicate to supporting and releasing them.

If you're a large organisation, managing hundreds of applications is demanding, but still manageable.

You have several teams dedicated to developing, packaging and releasing applications.

Microservices on the other hand introduce a different challenge.

When for every application that you created, you can refactor the same applications in a collection of four microservices, you have at least four times more services to develop, package and release.

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

Microservices come with very different resource requirements.

Some microservices such as data processing and data mining applications are more CPU intensive .

Others such as servers for real-time applications are more memory intesive.

It's a common trade-off to select a handful of VM sizes that fit most of the application use cases.

When you're lucky.

It's very common to have a single VM size for all of your microservices.

So you end up wasting 50% of the cost of a 1GB EC2 t2.micro when all you need is 256MB for your Node.js application.

You could almost fit 4 apps in that space!

Indeed most of the company nowadays are able to utilise only 10% of the resources they allocate.

Wouldn't be great if you could get your money back on the resources you don't use?

And it would be even better if you could pay only for the CPU and memory that your application actually uses.

You don't really want to pay for OSes, do you?

What if you could pack your applications more efficiently and reduce your cloud provider bill?

Resource utilisation is not the only challenge when it comes to microservices.

Development teams have the freedom to iterate quickly and use the right tool for the job.

Indeed, team using microservices are more keen on using more programming languages and technologies than teams that are stuck developing and mantaining monoliths.

Node.js, Spring Boot, Flask, React.js, you name it.

It turns out that the increased speed in delivery is usually lost when it's time to deploy the application.

In fact, your infrastructure team has never been busier than now.

Each application has a number of dependencies, runtimes and libraries to be installed before it can be deployed.

And each of them is a special snowflake: even two Java applications running on the JVM can end up using Java 1.8 and Java 10.

Your cloud engineers are busy writing scripts to deploy applications automatically and wrapping all of the dependecies with it.

But they size of the team is nowhere near your development team.

And your engineers are busy supporting the existing infrastructure.

It would be great if the development team could do the work as part of developing the application.

And it would be even better if they could define all of the depdencies in the scripts.

You will most end up with a team doing development and operations. A real DevOps team.




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


