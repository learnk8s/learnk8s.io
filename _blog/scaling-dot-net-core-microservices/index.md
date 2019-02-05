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

-Someone, Internet 2019-.

This is true, just because we *can* do this doesn't mean we have to do it.

All the source code for this application has been written in C#, built using dotnet core to deploy onto Linux.
The core focus has been to make the code readable to understand what is being achieved.
To keep it simple, factors such as security have been left out, this will be addressed within future posts for best practices.

## The case for Containers

So why do we need to focus on containers when we're talking about scalability with orchestrator's?
Aren't the orchestrator's powerful enough to manage my application regardless of what is running within it?

The containers run microservices, if we implement bad code and practices, these will just grow when scaling the application.

As with most concerns, by addressing the common issues vast improvements can be attained later on.

### Containers should do just one thing, and one thing well

Containers can be whatever you want them to be, a 30mb console application to a 4gb monolith.
But they should really just do one job and do one job well.
When you scale your application, do you want to scale your whole application or just some services within it?

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