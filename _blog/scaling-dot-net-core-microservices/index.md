---
layout: post
title: Scaling Microservices with Message Queues, DotNet Core and Kubernetes
date: 2019-03-01 08:00:00
author: "Lewis Denham-Parry"
author_link: https://twitter.com/soulmaniqbal
categories: kubernetes microservices "message queues" "dotnet core"
image: /to/add
excerpt: To do...
description: To do...
open_graph:
  title: Scaling Microservices with Message Queues, DotNet Core and Kubernetes
  description: To do...
  type: article
  image: /to/add
---

There are many challenges when working as a developer within an organisation.  Usually its linked to the following cycle:

1) Ship your code as quickly as possible.
2) Scale your product to meet the demand created.
3) Repeat.

Twitter recently created a valid point about Kubernetes:

> I know I can run different languages in different containers, but this makes it hard to learn when I don't know several languages...  
> *Someone, Internet 2019.*

This is true, just because we *can* do this doesn't mean we have to do it.

All the source code for this application has been written in C#, built using dotnet core to deploy onto Linux.
The core focus has been to make the code readable to understand what is being achieved.
To keep it simple, factors such as security have been left out, this will be addressed within future posts for best practices.

## Case Study

For our demo application, we're going to build a ticketing system.
This system is going to be similar to a deli counter at a local market.
When a customer comes to the website, they can request a ticket.
When a ticket is generated, it is put into a message queue.
There is a worker that can collect a ticket from the queue and then it takes 5 seconds to process that ticket.
Once the ticket is processed, the customer is redirected to a success page.

### Causes for concern

When running the application locally, there are six different services that are required:

1) Front end website
2) API
3) Database
4) Message Queue
5) Worker
6) Worker monitor

Looking at out application, lets assume that there is only a single instance of each of the services running.
Is it a problem that the worker can only process a single ticket every 5 seconds?
I'l be fine if we had a ticket once every 5 seconds, but usually people want to get a ticket at the same time.
How long should we allow a user to wait prior to the ticket being completed?
Should we scale the number of workers based on the number of tickets within the message queue?

### Technology choices

For this demo, all our code is written using C# and dotnet core.

1) MVC Website
2) MVC API
3) Mongo DB
4) RabbitMQ
5) C# Console Application
6) MVC Website

### Running locally

Using `tmux`, we can see 6 windows running each of the services we mentioned.
All dotnet core services were started with `dotnet run` within the project directory.
What happens if one of the services stops?  For example, let say that the worker service stops.
The website would be able to submit a ticket to the API, and the API would put the ticket into the database.
The API would then send the ticket to the queue, but nothing would be subscribed to pick up that ticket and process it.
Also, we have a lot to do to get the service up and running locally, are we expecting to do this to debug the application locally?
Is there a better way that we could manage this?

## The Case For Containers

So far, we've found out that running our microservice application has been a bit harder to do than we'd like.
If we compare our services to spinning plates, we have a lot of spinning plates that are dependent on each other and we're not great at noticing when a plate has fallen.
We're going to add a `Dockerfile` to each of our services to containerise them.

### Containers should do just one thing, and one thing well

Containers can be whatever you want them to be, a 30mb console application to a 4gb monolith.
But they should really just do one job and do one job well.
When you scale your application, do you want to scale your whole application or just some services within it?
If a service fails or has an error, do you want to know that it was the one thing that did it, or possibly one or many of several?

### Do I need to do anything differently if the code is in a container

If you can build and run your code locally, you'll be able to run it within a container.
If you're running an application and you have to manually kill threads locally, will this work within a container?
Yes, it will!  But you're going to find problems down the line.

The containers run microservices, if we implement bad code and practices, these will just grow when scaling the application.
As with most concerns, by addressing the common issues early vast improvements can be attained later.

> TOP TIP: When you build something, learn how to kill it and make it graceful

Regardless of what part of your system this relates to, you should be able to create and delete parts of your system.
For example, if you're creating a cluster, you should be able to have a command that can delete your cluster.
If you create a console application, you should manage the `Ctrl + C` or `SIGTERM` event.
Normally, containers will give containers 30 seconds notice before terminating an application.
If you have a console application that is processing a lead, how do you manage this when the orchestrator fires the `Ctrl + C` event?
Do you delete the process or wait for it to complete?  These are the decisions you should be making prior to moving to a container.
Also, this will empower your team later on, as you'll know how to manage when you have an actual fire.

### Docker Build

We use Docker build to create Docker images.  Docker images can then be used to spin up containers.

> TOP TIP: Environment Variables are your Best Friend Forever (BFF)

When running containers, you have the option to pass variables into the container via a number of ways:

* Volumes
* Environment Variable

When should you them?  Use volumes for static assets that might need to change.  For example, if you have a website then load your images via a volume, or if you have a database then keep the data within a volume so that you don't lose it when the container is deleted.
Use Environment Variables for connections strings and any secrets that you're managing with the application.

### Docker Compose

When you have lots of images that need to run together then one option is Docker Compose.  By creating a `docker-compose` file, you can run a command to spin up a local environment within a terminal window and then access the services locally.

## Orchestrator to the rescue

So far, everything we've spoken about has been based on a single computer.  Now I can guess what you're thinking...

> But if all my code is running in production on one box, what happens when that dies?
> *Everyone, all the time.*

If you're dependent on any one thing then you're getting ready for a bad time.
Your application, infrastructure and sanity can only cope with so much.
Luckily, Orchestrator's like Kubernetes are making this simpler for you to manage.
Orchestrator's are based on a declarative state, this means you declare of how much you should have and Kubernetes will maintain it.
So if I want four instances of my website running, I'll get four.  If one instance dies another one will spin up.
If another instance comes back to life and I have five websites running, then Kubernetes will send a kill command to one of the instances and get it back to four.
This happens 24/7, without human interaction allowing you to stay asleep and enjoy your life away from a computer.
