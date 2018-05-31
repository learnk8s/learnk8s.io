---
layout: post
title: Autoscaling Microservices using Spring Boot and Kubernetes
date: 2018-05-17 00:00:00
author: "Daniele Polencic"

description: ""

excerpt: ""

categories: queue redis kubernetes "spring boot"

image:

open_graph:
  type: article
  title: Scaling Microservices using Spring Boot and Kubernetes
  image:
  description: ""
---

When you design and build applications at scale, you deal with two significant challenges: scalability and robustness.

You should design your services so that even if it is subject to intermittent heavy loads, it continues to operate reliably.

Take the Apple Store as an example.

Every year millions of Apple customers preregister to buy a new iPhone.

And all of them visit the website and fill in their details at precisely the same time.

If you were to picture the Apple store's traffic over time, this is what the graph could look like:

[TODO: pict]

Now imagine you're tasked with the challenge of building such application.

**You're building a store where users can buy their favorite items.**

You need a microservice to render the web pages and serving the static assets.

You also need a backend REST API to process the incoming requests.

You want the two components to be separated because with the same REST API you could serve your website and your mobile apps.

[TODO: pict]

Today turned out to be the big day, and your store goes live.

You decide to scale the application to four instances each because you predict the website is busier than usual.

[TODO: pict]

You start receiving more and more traffic.

The front-end services are handling the traffic fine.

The API layer that is connected to the database and is doing the heavy processing.

You noticed that it is struggling to keep up with the number of transactions.

No worries, you can scale the number of replicas to 8 for the API layer.

[TODO: pict]

You're receiving even more traffic, and the API layer can't cope with it.

Some of the services started dropping connections.

Angry customers get in touch with your customer service.

And now you're drowning in traffic.

Your API layer can't cope with it, and it drops plenty of connections.

[TODO: pict]

You just lost a ton of money, and your customers are unhappy.

Your application is not designed to be robust and highly available:

- the front-end and the API are tightly coupled
- the front-end and API have to scale in concert
- if the API is unavailable, you can't process incoming transactions

And lost transactions are lost revenues.

You could redesign your architecture to decouple the front-end and the API with a queue.

[TODO: pict]

The front-end posts messages to the queue, while the API layer processes the pending messages one at the time.

The new architecture has some obvious benefits:

- if the API is unavailable, the queue acts as a buffer
- if the front-end is producing more messages than what the API can handle, those messages are buffered in the queue
- you can scale the API layer independently of the front-end — i.e. you could have hundreds of front-end services and a single instance of the API

In this article, you will learn how to design queue based architectures using Spring Boot.

You'll also learn how to package applications as Docker containers, deploy your services to Kubernetes and scale them based on the number of messages of the queue.

## Coding a Spring Boot shop app

You need to services: a front-end and the API layer.

The front-end is a simple Spring Boot web app with the Thymeleaf template engine.

The API layer is akin to a worker consuming messages from a queue.

You could use [@Async functions in Spring Boot](https://spring.io/guides/gs/async-method/) for asynchronous processing of messages in a separate thread.

Lucky for you, there's a demo project ready to be tested.

You can check out the code at [learnk8s/spring-boot-k8s-hpa](https://github.com/learnk8s/spring-boot-k8s-hpa).

There's a single code base, and you can configure the project to run either as the front-end or the worker.

You should know that the app has:

- a homepage where you can buy items
- an admin panel where you can inspect the number of messages in the queue
- a `/health` endpoint to signal when the application is ready to receive traffic
- a `/submit` endpoint that receives submissions from the form and creates messages in the queue
- a `/metrics` endpoint to expose the number of pending messages in the queue (more on this later)

The application can function in two modes:

**As frontend**, the application renders the shop website where people can buy items.

[TODO: pict]

**As a worker**, the application waits for messages in the queue and processes them.

[TODO: pict]

You can configure the application in either mode, by changing the values in your `application.yaml`.

## Dry-run the store

By default, the application starts as a frontend and worker.

You can run the application and, as long as you have a Redis instance running locally, you should be able to buy items and having those processed by the system.

[TODO: gif]

If you inspect the logs, you should see the worker processing items.

[TODO: gif]

It worked!

## What is Redis anyway?

You noticed that you need Redis to run the application.

Perhaps you are familiar with Kafka, RabbitMQ or AWS SQS as message brokers.

While those are excellent choices for a queue, they come with extra complexity:

- they're challenging to deploy because they're made of several parts
- they consume significant resources such as CPU and RAM
- they have dependencies

On the contrary, Redis is a simple, lightweight binary with no dependency.

In its most natural form, Redis is a key-value store.

But Redis has other data structures such as lists, maps, sets, etc.

Which is all you need when you're in need of a simple and efficient queue.

## Reliable queue pattern in Redis

Implementing a reliable queue in Redis is straightforward.

The main queue can be model as a list.

And messages are appended to it.

Some processes competes for messages from the main queue.

When a process gets hold of a message from the main queue, it moves it to the local queue and starts processing it.

When the process completes the task, it removes the message from the local queue.

The process then waits for more messages.

[TODO: image]

The pattern works well in case of crashes.

In fact, the message isn't lost unless the worker can remove it from the local queue.

## Jedis — a blazingly small Redis Java client

_In theory, the algorithm is excellent, but how do you implement the above as a Service in Spring Boot?_

You start with a Redis client.

The most popular Java client for Redis is called - _guess what!_ - Jedis.

Pushing an item to the queue is trivial:

```java
@Override
public boolean addJob(String listName, String val) {
  Jedis jedis = this.jedisPool.getResource();
  try {
    return "OK".equals(jedis.lpush(listName, val));
  } finally {
    if (jedis != null)
      jedis.close();
  }
}
```

Where the `lpush` method is used to insert an item at the head of a list.

[TODO: pict]

The code for processing jobs in the background runs on a separate thread and is:

```java
@Async
public void processJobs(String mainQueueName, String workerQueueName) {
  Jedis jedis = this.jedisPool.getResource();
  try {
    while (true) {
      List<String> taskIds = jedis.lrange(workerQueueName, 0, 0);
      String taskId = taskIds.size() > 0 ? taskIds.get(0) : jedis.brpoplpush(mainQueueName, workerQueueName, 0);
      LOGGER.info("Processing task " + taskId);
      Thread.sleep(5000);
      LOGGER.info("Completed task " + taskId);
      jedis.lrem(workerQueueName, -1, taskId);
      this.completedJobs += 1;
    }
  } catch (InterruptedException e) {
    e.printStackTrace();
  } finally {
    if (jedis != null)
      jedis.close();
  }
}
```

The code reads as follow:

1. the `lrange` method returns all the messages in the local queue called `workerQueueName`
2. if there's a message in the pending queue, the algorithm select that as for the next message to process
3. if the local queue is empty, the `brpoplpush` method waits for a message on the main queue. When there's one, it moves the message to the local queue
4. the next step is processing the task. Here you're pretending to do a long-running computation by waiting for 5 seconds
5. the computation is completed and finally `lrem` deletes the message from the queue

You can [read the source code in full for the Spring queue service](https://github.com/learnk8s/spring-boot-k8s-hpa/blob/master/src/main/java/com/learnk8s/app/service/QueueServiceImpl.java) from the project on Github.

Notice how you were able to code a reliable queue in less than 40 lines of code.

## All the time you save in deploying you can focus on coding

You verified the application works, and it's time to deploy it.

You could start your VPS, install Tomcat, spend some time crafting custom scripts to test, build, package and deploy the application.

Or you could write a description of what you wish to have: one database and two application deployed with a load balancer.

Orchestrators such as Kubernetes can read your wishlist and provision the right infrastructure.

Since less time spent in the infrastructure means more time coding, you'll deploy the application to Kubernetes this time.

But before you start, you need a Kubernetes cluster.

You could signup for a Google Cloud Platform or Azure and use the cloud provider Kubernetes offering.

Or you could try Kubernetes locally before you move your application to the cloud.

`minikube` is a local Kubernetes cluster packaged as a virtual machine.

It's great if you're on Windows, Linux and Mac as it takes five minutes to create a cluster.

You should also install `kubectl`, the client to connect to your cluster.

You can find the instructions on how to install `minikube` and `kubectl` from the [official documentation](https://kubernetes.io/docs/tasks/tools/).

> If you're running on Windows, you should check out our [detailed guide on how to install Kubernetes and Docker](#TODO).

You should start a cluster with 8GB of RAM and some extra configuration:

```bash
minikube start \
  --memory 8096 \
  --extra-config=controller-manager.horizontal-pod-autoscaler-upscale-delay=1m \
  --extra-config=controller-manager.horizontal-pod-autoscaler-downscale-delay=2m \
  --extra-config=controller-manager.horizontal-pod-autoscaler-sync-period=10s
```

> Please note that if you're using a pre-existing `minikube` instance, you can resize the VM by destroying it an recreating it. Just adding the `--memory 8096` won't have any effect.

You should verify that the installation was successful with:

```bash
kubectl get all
```

You should few resources listed as a table.

## What's better than an uber-jar? Containers

Applications deployed to Kubernetes have to be packaged as containers.

After all, Kubernetes is a container orchestrator, so it isn't capable of running your jar natively.

Containers are similar to fat jars: they contain all the dependencies necessary to run your application.

Even the JVM is part of the container.

So they're technically an even fatter fat jar.

You're going to use Docker to package your containers.

If you don't have Docker installed, you can follow the [instructions on the official Docker website](https://docs.docker.com/install/).

> While being the most popular, Docker is not the only technology capable of running containers. Other popular options include `rkt` and `lxd`.

Usually, you should build your containers and push them to a registry.

This workflow should be familiar to you since it's similar to publishing jars to Artifactory or Nexus.

In this particular case, you will work locally and skip pushing to a registry.

In fact, you will create the container image directly in `minikube`.

First, connect your Docker client to `minikube` by following the instruction printed by this command:

```bash
minikube docker-env
```

> Please note that if you switch terminal, you need to reconnect to the Docker daemon inside `minikube`. You should follow the same instructions every time you use a different terminal.

and from the root of the project build the container image with:

```bash
docker build -t spring-k8s-hpa .
```

You can verify that the image was built and is ready to run with:

```bash
docker images | grep spring
```

Great!

Next, you should tell Kubernetes to deploy the application.

## Deploying your application to Kubernetes

Your application has three components:

- the Spring Boot application that renders the frontend
- a Redis database used a queue
- the Spring Boot worker that processes transactions

You have to deploy the three component separately.

For each of them you need to create:

- A _Deployment_ object that describes what container is deployed and its configuration
- A _Service_ object that acts as a load balancer for all the instances of the application created by the _Deployment_

Each instance of your application in a deployment is called _Pod_.

[TODO: picture]

### Deploy Redis

Let's start with the Redis database.

You should create a `redis-deployment.yaml` file with the following content:

```yaml
```

Create a `redis-service.yaml` file with the following content:

```yaml
```

You can create the resources with:

```bash
kubectl create -f redis-deployment.yaml
kubectl create -f redis-service.yaml
```

You can verify that one instance of the database is running with:

```bash
kubectl get pods -l=app=redis
```

### Deploy the frontend

Create a `fe-deployment.yaml` file with the following content:

```yaml
```

Create a `fe-service.yaml` file with the following content:

```yaml
```

You can create the resources with:

```bash
kubectl create -f fe-deployment.yaml
kubectl create -f fe-service.yaml
```

You can verify that one instance of the front-end application is running with:

```bash
kubectl get pods -l=app=fe
```

### Deploy the worker

Create a `worker-deployment.yaml` file with the following content:

```yaml
```

Create a `worker-service.yaml` file with the following content:

```yaml
```

You can create the resources with:

```bash
kubectl create -f worker-deployment.yaml
kubectl create -f worker-service.yaml
```

You can verify that one instance of the worker is running with:

```bash
kubectl get pods -l=app=worker
```

You should visit your application in the browser and make sure that it works.

You can visit the application with the following command:

```bash
minikube service spring-boot-hpa
```

Try to buy some items!

Given enough time, the worker will process all of the pending messages.

Congratulations!

You just deployed the application to Kubernetes!

## Scaling manually to meet increasing demand

A single worker may not be able to handle a large number of tickets.

If you decide to buy thousands of items in the shop, it will take hours before the queue is cleared.

You have two options now:

- you can manually scale up and down
- you can create autoscaling rules to scale up or down automatically

Let's start with the basics first.

You can scale the worker to three instances with:

```bash
kubectl scale --replicas=5 deployment/worker
```

You can verify that Kubernetes created five more instances of the worker application with:

```bash
kubectl get pods
```

And the application can process five times more tickets at the same time.

Once the workers drained the queue, you can scale down with:

```bash
kubectl scale --replicas=1 deployment/worker
```

Manually scaling up and down is great — if you know when the peak of traffic hits your service.

If you don't, setting up an autoscaler allows the application to scale automatically without manual intervention.

You only need to define the rules.

## Exposing application metrics

The autoscaler works by monitoring metrics and increasing or decreasing instances of your application.

So you could expose the length of the queue as a metric and ask the autoscaler to watch that value.

The more pending messages in the queue, the more instances of your application Kubernetes will create.

The application has a `/metrics` endpoint to expose the number of messages in the queue

If you try to visit that page you'll notice the following content:

```text
# HELP messages Number of messages in the queue
# TYPE messages gauge
messages 0
```

The application doesn't expose the metrics as a JSON format.

The format is plain text and is the standard for exposing [Prometheus metrics](https://prometheus.io/docs/concepts/metric_types/).

Don't worry about memorising the format.

Most of the time you will use one of the [Prometheus client libraries](https://prometheus.io/docs/instrumenting/clientlibs/).

In this example, you use a single metric, so it doesn't make much sense to use the full library for such a small task.

## Consuming application metrics in Kubernetes

Kubernetes will not ingest metrics from your application by default.

You should enable the [Custom Metrics API](https://github.com/kubernetes-incubator/custom-metrics-apiserver) if you wish to do so.

To install the Custom Metrics API, you also need [Prometheus](https://prometheus.io/) — a time series database.

All the files needed to install the Custom Metrics API are in [learnk8s/spring-boot-k8s-hpa](https://github.com/learnk8s/spring-boot-k8s-hpa).

You should download the content of that repository and change the current directory to be in the `monitoring` folder of the project.

```bash
cd spring-boot-k8s-hpa/monitoring
```

From there you can create the Custom Metrics API with:

```bash
kubectl create -f ./metrics-server
kubectl create -f ./namespaces.yaml
kubectl create -f ./prometheus
kubectl create -f ./custom-metrics-api
```

You should wait until the following command returns a list of custom metrics:

```bash
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1" | jq .
```

If you pay attention, you should be able to find a custom metric for the number of messages in the queue:

```bash
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1/namespaces/default/pods/*/messages" | jq .
```

Kubernetes watches your metrics.

It's time to link the number of instances of your application to the custom metric.

## Autoscaling deployments in Kubernetes

Kubernetes has an object called Horizontal Pod Autoscaler that is used to monitor deployments and scale the number of Pods up and down.

You should create a `hpa.yaml` file with the following content:

```bash
```

If you're unfamiliar with Kubernetes, the file may be hard to read.

I'll translate it for you:

- Kubernetes watches the deployment specified in `scaleTargetRef`. In this case, it's the worker.
- You're using the `messages` metric to scale your _Pods_. In average, we wish to have ten messages per worker.
- As a minimum, the deployment should have two _Pods_. Ten _Pods_ is the upper limit.

You can create the resource with:

```bash
kubectl create -f hpa.yaml
```

After you submitted the autoscaler, you should notice that the number of replicas for the workers is two:

```bash
kubectl get pods
```

It makes sense since we asked the autoscaler always to have at least two replicas running.

To inspect the conditions that triggered the autoscaler and events generated by it you can use:

```bash
kubectl describe hpa
```

The autoscaler suggests it was able to scale the Pods to 2 and it's ready to monitor the deployment.

## Load testing

You should add more messages to the queue.

A lot of them!

As you add messages, monitor the status of the Horizontal Pod Autoscaler.

The number of Pods goes up from 2 to 4, then 8 and finally 10.

The algorithm for scaling is the following:

```
MAX(CURRENT_REPLICAS_LENGTH * 2, 4)
```

> The documentation doesn't help a lot when it comes to the scaling algorithm. You can [find the details in the code](https://github.com/kubernetes/kubernetes/blob/bac31d698c1eed2b54374bdabfd120f7319dd5c8/pkg/controller/podautoscaler/horizontal.go#L588).

Every scale-up is re-evaluated every minute, whereas any scale down every two minutes.

Congratulations!

You just deployed a fully scalable application that scales based on the number of pending messages on a queue.

## What's better than autoscaling instances? Autoscaling clusters

Scaling Pods across nodes works fabulously.

_But what if you don't have enough capacity in the cluster to scale your Pods?_

If you reach peak capacity, Kubernetes will leave the Pods in a pending state and wait for more resources to be available.

_It would be great if you could use an autoscaler similar to the Horizontal Pod Autoscaler, but for Nodes._

Good news!

As you need more resources, you can have a cluster autoscaler that adds more nodes to your Kubernetes cluster.

[TODO: pict]

The cluster autoscaler comes in different shapes and sizes.

And it's also cloud provider specific.

> Please note that you won't be able to test the autoscaler with `minikube` since it is single node by definition.

You can find [more information about the cluster autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#cluster-autoscaler) and the (cloud provider implementation)[https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#deployment] on Github.

## Recap

Designing applications at scale require careful planning and testing.

Queue based architecture is an excellent design pattern to decouple your microservices and ensure they can be scaled and deployed independently.

And while you can roll out your deployment scripts, it's easier to leverage a container orchestrator such as Kubernetes to deploy and scale your applications.

If you liked the article, you should stay tuned for more! Subscribe to our newsletter!