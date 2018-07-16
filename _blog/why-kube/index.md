During the last few years, the industry as experienced a shift towards micro service based architecture.

It's probably not news to you that more and more companies are breaking their large and static monoliths into a set of decouple and independent micro services.

And it's hard to argue with the hard truth that microservices:

- are quicker to deploy because you don't need to wait for a long release cycle to complete
- allow for quicker iterations since they can be developed and released independently
- can handle failure gracefully — the overall service can still function despite one of the components not being available

Microservices are great from a product and development perspective.

But how does the microservices cultural shift impact the infrastructure?

It turns out that things are rather simple when you deal with few sparse monoliths.

You only manage a handful of applications and your infrastructure team can take care and look after them.

If you're a large organisation, managing hundreds of monoliths is demanding, but still manageable.

You have several teams dedicated to developing, packaging and releasing applications.

Microservices on the other hand introduce complexity.

When for every monolith that you created, you can refactor the same applications in a collection of 4 microservices, you have at least 4 times more artefacts to develop, package and release.

It's not uncommon for a small service to be made out of dozen of micro services such as a front-end app, a backend API, an authorisation server, an admin application, etc.

Most of microservices are deployed to virtual machines such as Amazon EC2, Digital Ocean Droplets or Azure <name>.

And each virtual machine has an operating system that consumes part of the memory and CPU allocated to the VM.

If you ask for a 1GB, 2Ghz machine on DO, you're probably using a 0.8GB / 1.8Ghz computer after you remove the operating system.

The wastage when you use dozens of microservices and dozen of virtual machine is perhaps considerable. At least 20% of your bill is burned in running the OS.

You pay the same "tax" even if you're on bare metal. So perhaps you can live with it as every one else is effected in the same way.

But overhead from OSes is not your only concern.

Microservices come with very different resource requirements.

Some microservices are more CPU intensive such as data processing and data mining applications.

Others are more memory intesive such as servers for real-time applications.

Unfortunately not many teams have time to profile the application and select the right VMs.

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


