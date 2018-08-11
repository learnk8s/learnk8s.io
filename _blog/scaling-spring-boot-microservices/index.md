---
layout: post
title: Scaling Microservices with Message Queues, Spring Boot and Kubernetes
date: 2018-07-11 16:49:00
author: "Daniele Polencic"

description: "When you design and build applications at scale, you deal with two significant challenges: scalability and robustness. You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically? Kubernetes has a feature called autoscaler where instances of your applications are increased or decreased automatically based on metrics that you define."

excerpt: "When you design and build applications at scale, you deal with two significant challenges: scalability and robustness. You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically? Kubernetes has a feature called autoscaler where instances of your applications are increased or decreased automatically based on metrics that you define."

categories: queue activemq jms kubernetes "spring boot" autoscaling

image: /blog/scaling-spring-boot-microservices/autoscaling.png

open_graph:
  type: article
  title: Scaling Microservices with Message Queues, Spring Boot and Kubernetes
  image: /blog/scaling-spring-boot-microservices/autoscaling.png
  description: "You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?"

js:
  - anime.min.js
  - isScrolledIntoView.js

has_cta: true
---

When you design and build applications at scale, you deal with two significant challenges: **scalability and robustness**.

You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably.

_Take the Apple Store as an example._

Every year millions of Apple customers preregister to buy a new iPhone.

That's millions of people all buying an item at the same time.

If you were to picture the Apple store's traffic as requests per second over time, this is what the graph could look like:

{% include_relative spike.html %}

Now imagine you're tasked with the challenge of building such application.

**You're building a store where users can buy their favourite items.**

You build a microservice to render the web pages and serving the static assets.

You also build a backend REST API to process the incoming requests.

You want the two components to be separated because with the same REST API you could serve the website and mobile apps.

{% include_relative api.html %}

Today turned out to be the big day, and your store goes live.

You decide to scale the application to four instances for the front-end and four instances for the backend because you predict the website to be busier than usual.

{% include_relative normal-traffic.html %}

You start receiving more and more traffic.

The front-end services are handling the traffic fine.

You notice that the backend that is connected to the database is struggling to keep up with the number of transactions.

No worries, you can scale the number of replicas to 8 for the backend.

{% include_relative scaling-in-response.html %}

You're receiving even more traffic, and the backend can't cope with it.

Some of the services start dropping connections.

Angry customers get in touch with your customer service.

And now you're drowning in traffic.

Your backend can't cope with it, and it drops plenty of connections.

{% include_relative dropping-connections.html %}

You just lost a ton of money, and your customers are unhappy.

Your application is not designed to be robust and highly available:

- the front-end and the backend are tightly coupled — _in fact it can't process applications without the backend_
- the front-end and backend have to scale in concert — _if there aren't enough backends, you could drown in traffic_
- if the backend is unavailable, you can't process incoming transactions.

And lost transactions are lost revenues.

You could redesign your architecture to decouple the front-end and the backend with a queue.

{% include_relative queue.html %}

The front-end posts messages to the queue, while the backend processes the pending messages one at the time.

The new architecture has some obvious benefits:

- if the backend is unavailable, the queue acts as a buffer
- if the front-end is producing more messages than what the backend can handle, those messages are buffered in the queue
- you can scale the backend independently of the front-end — i.e. you could have hundreds of front-end services and a single instance of the backend

_Great, but how do you build such application?_

_How do you design a service that can handle hundreds of thousands of requests?_

_And how do you deploy an application that scales dynamically?_

Before diving into the details of deployment and scaling, let's focus on the application.

## Coding a Spring application

The service has three components: the front-end, the backend and a message broker.

The front-end is a simple Spring Boot web app with the Thymeleaf templating engine.

The backend is a worker consuming messages from a queue.

And since [Spring Boot has excellent integration with JMS](https://spring.io/guides/gs/messaging-jms/), you could use that to send and receive asynchronous messages.

You can find a sample project with a front-end and backend application connected to JMS at [learnk8s/spring-boot-k8s-hpa](https://github.com/learnk8s/spring-boot-k8s-hpa).

> Please note that the application is written in Java 10 to leverage the [improved Docker container integration](https://blog.docker.com/2018/04/improved-docker-container-integration-with-java-10/).

There's a single code base, and you can configure the project to run either as the front-end or backend.

You should know that the app has:

- a homepage where you can buy items
- an admin panel where you can inspect the number of messages in the queue
- a `/health` endpoint to signal when the application is ready to receive traffic
- a `/submit` endpoint that receives submissions from the form and creates messages in the queue
- a `/metrics` endpoint to expose the number of pending messages in the queue (more on this later)

The application can function in two modes:

**As frontend**, the application renders the web page where people can buy items.

![Store front-end]({% link _blog/scaling-spring-boot-microservices/store.png %})

**As a worker**, the application waits for messages in the queue and processes them.

![Store admin worker]({% link _blog/scaling-spring-boot-microservices/admin.png %})

> Please note that in the sample project the processing is simulated by waiting for five seconds with a `Thread.sleep(5000)`.

You can configure the application in either mode, by changing the values in your `application.yaml`.

## Dry-run the application

By default, the application starts as a frontend and worker.

You can run the application and, as long as you have an ActiveMQ instance running locally, you should be able to buy items and having those processed by the system.

![Store admin worker]({% link _blog/scaling-spring-boot-microservices/demo.gif %})

If you inspect the logs, you should see the worker processing items.

It worked!

Writing Spring Boot applications is easy.

A more interesting subject is learning how to connect Spring Boot to a message broker.

## Sending and receiving messages with JMS

Spring JMS (Java Message Service) is a powerful mechanism to send and receive messages using standard protocols.

If you used the JDBC API in the past, you should find the JMS API familiar since it works similarly.

The most popular message broker that you can consume with JMS is [ActiveMQ](http://activemq.apache.org/) — an open source messaging server.

With those two components, you can publish messages to a queue (ActiveMQ) using a familiar interface (JMS) and use the same interface to receive messages.

And even better, Spring Boot has excellent integration with JMS so you can get up to speed in no time.

In fact, the following short class encapsulate the logic used to interact with the queue:

```java
@Component
public class QueueService implements MessageListener {
  private static final Logger LOGGER = LoggerFactory.getLogger(QueueService.class);

  @Autowired
  private JmsTemplate jmsTemplate;

  public void send(String destination, String message) {
    LOGGER.info("sending message='{}' to destination='{}'", message, destination);
    jmsTemplate.convertAndSend(destination, message);
  }

  @Override
  public void onMessage(Message message) {
    if (message instanceof ActiveMQTextMessage) {
      ActiveMQTextMessage textMessage = (ActiveMQTextMessage) message;
      try {
        LOGGER.info("Processing task " + textMessage.getText());
        Thread.sleep(5000);
        LOGGER.info("Completed task " + textMessage.getText());
      } catch (InterruptedException e) {
        e.printStackTrace();
      } catch (JMSException e) {
        e.printStackTrace();
      }
    } else {
      LOGGER.error("Message is not a text message " + message.toString());
    }
  }
}
```

You can use the `send` method to publish messages to a named queue.

Also, Spring Boot will execute the `onMessage` method for every incoming message.

The last piece of the puzzle is instructing Spring Boot to use the class.

You can process messages in the background by [registering the listener in the Spring Boot application](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#jms-annotated-programmatic-registration) like so:

```java
@SpringBootApplication
@EnableJms
public class SpringBootApplication implements JmsListenerConfigurer {
  @Autowired
  private QueueService queueService;

  public static void main(String[] args) {
    SpringApplication.run(SpringBootApplication.class, args);
  }

  @Override
  public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
    SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
    endpoint.setId("myId");
    endpoint.setDestination("queueName");
    endpoint.setMessageListener(queueService);
    registrar.registerEndpoint(endpoint);
  }
}
```

Where the _id_ is a unique identifier for the consumer and _destination_ is the name of the queue.

You can [read the source code in full for the Spring queue service](https://github.com/learnk8s/spring-boot-k8s-hpa/blob/master/src/main/java/com/learnk8s/app/queue/QueueService.java) from the project on Github.

Notice how you were able to code a reliable queue in less than 40 lines of code.

_You got to love Spring Boot._

## All the time you save in deploying you can focus on coding

You verified the application works, and it's finally time to deploy it.

At this point, you could start your VPS, install Tomcat, spend some time crafting custom scripts to test, build, package and deploy the application.

Or you could write a description of what you wish to have: one message broker and two application deployed with a load balancer.

Orchestrators such as Kubernetes can read your wishlist and provision the right infrastructure.

Since less time spent in the infrastructure means more time coding, you'll deploy the application to Kubernetes this time.

But before you start, you need a Kubernetes cluster.

You could signup for a Google Cloud Platform or Azure and use the cloud provider Kubernetes offering.

Or you could try Kubernetes locally before you move your application to the cloud.

`minikube` is a local Kubernetes cluster packaged as a virtual machine.

It's great if you're on Windows, Linux and Mac as it takes five minutes to create a cluster.

You should also install `kubectl`, the client to connect to your cluster.

You can find the instructions on how to install `minikube` and `kubectl` from the [official documentation](https://kubernetes.io/docs/tasks/tools/).

> If you're running on Windows, you should check out our [detailed guide on how to install Kubernetes and Docker](https://learnk8s.io/blog/installing-docker-and-kubernetes-on-windows).

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

You should see a few resources listed as a table.

The cluster is ready, _perhaps you should start deploying now?_

Not yet.

You have to pack your stuff first.

## What's better than an uber-jar? Containers

Applications deployed to Kubernetes have to be packaged as containers.

After all, Kubernetes is a container orchestrator, so it isn't capable of running your jar natively.

Containers are similar to fat jars: they contain all the dependencies necessary to run your application.

_Even the JVM is part of the container._

So they're technically an even fatter fat-jar.

A popular technology to package applications as containers is Docker.

> While being the most popular, Docker is not the only technology capable of running containers. Other popular options include `rkt` and `lxd`.

If you don't have Docker installed, you can follow the [instructions on the official Docker website](https://docs.docker.com/install/).

Usually, you build your containers and push them to a registry.

It's similar to publishing jars to Artifactory or Nexus.

But in this particular case, you will work locally and skip the registry part.

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

The cluster is ready, you packaged your application, _perhaps you're ready to deploy now?_

Yes, you can finally ask Kubernetes to deploy the applications.

## Deploying your application to Kubernetes

Your application has three components:

- the Spring Boot application that renders the frontend
- ActiveMQ as a message broker
- the Spring Boot backend that processes transactions

You should deploy the three component separately.

For each of them you should create:

- A _Deployment_ object that describes what container is deployed and its configuration
- A _Service_ object that acts as a load balancer for all the instances of the application created by the _Deployment_

Each instance of your application in a deployment is called a _Pod_.

{% include_relative k8s.html %}

### Deploy ActiveMQ

Let's start with ActiveMQ.

You should create a `activemq-deployment.yaml` file with the following content:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: queue
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: queue
    spec:
      containers:
      - name: web
        image: webcenter/activemq:5.14.3
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 61616
        resources:
          limits:
            memory: 512Mi
```

The template is verbose but straightforward to read:

- you asked for an activemq container from the official registry named [webcenter/activemq](https://hub.docker.com/r/webcenter/activemq/)
- the container exposes the message broker on port 61616
- there're 512MB of memory allocated for the container
- you asked for a single replica — a single instance of your application

Create a `activemq-service.yaml` file with the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: queue
spec:
  ports:
  - port: 61616
    targetPort: 61616
  selector:
    app: queue
```

Luckily this template is even shorter!

The yaml reads:

- you created a load balancer that exposes port 61616
- the incoming traffic is distributed to all Pods (see deployment above) that has a label of type `app: queue`
- the `targetPort` is the port exposed by the Pods

You can create the resources with:

```bash
kubectl create -f activemq-deployment.yaml
kubectl create -f activemq-service.yaml
```

You can verify that one instance of the database is running with:

```bash
kubectl get pods -l=app=queue
```

### Deploy the front-end

Create a `fe-deployment.yaml` file with the following content:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: spring-boot-hpa
        imagePullPolicy: IfNotPresent
        env:
        - name: ACTIVEMQ_BROKER_URL
          value: "tcp://queue:61616"
        - name: STORE_ENABLED
          value: "true"
        - name: WORKER_ENABLED
          value: "false"
        ports:
          - containerPort: 8080
        livenessProbe:
          initialDelaySeconds: 5
          periodSeconds: 5
          httpGet:
            path: /health
            port: 8080
        resources:
          limits:
            memory: 512Mi
```

The _Deployment_ looks a lot like the previous one.

There're some new fields, though:

- there's a section where you can inject environment variables
- there's the liveness probe that tells you when the application is ready to accept traffic

Create a `fe-service.yaml` file with the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  ports:
  - nodePort: 32000
    port: 80
    targetPort: 8080
  selector:
    app: frontend
  type: NodePort
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

### Deploy the backend

Create a `backend-deployment.yaml` file with the following content:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: backend
      annotations:
        prometheus.io/scrape: 'true'
    spec:
      containers:
      - name: backend
        image: spring-boot-hpa
        imagePullPolicy: IfNotPresent
        env:
        - name: ACTIVEMQ_BROKER_URL
          value: "tcp://queue:61616"
        - name: STORE_ENABLED
          value: "false"
        - name: WORKER_ENABLED
          value: "true"
        ports:
          - containerPort: 8080
        livenessProbe:
          initialDelaySeconds: 5
          periodSeconds: 5
          httpGet:
            path: /health
            port: 8080
        resources:
          limits:
            memory: 512Mi
```

Create a `backend-service.yaml` file with the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  ports:
  - nodePort: 31000
    port: 80
    targetPort: 8080
  selector:
    app: backend
  type: NodePort
```

You can create the resources with:

```bash
kubectl create -f backend-deployment.yaml
kubectl create -f backend-service.yaml
```

You can verify that one instance of the backend is running with:

```bash
kubectl get pods -l=app=backend
```

Deployment completed.

_Does it really work, though?_

You can visit the application in your browser with the following command:

```bash
minikube service backend
```

and

```bash
minikube service frontend
```

If it works, you should try to buy some items!

_Is the worker processing transactions?_

Yes, given enough time, the worker will process all of the pending messages.

Congratulations!

You just deployed the application to Kubernetes!

## Scaling manually to meet increasing demand

A single worker may not be able to handle a large number of messages.

In fact, it can only handle one message at the time.

If you decide to buy thousands of items, it will take hours before the queue is cleared.

At this point you have two options:

- you can manually scale up and down
- you can create autoscaling rules to scale up or down automatically

Let's start with the basics first.

You can scale the backend to three instances with:

```bash
kubectl scale --replicas=5 deployment/backend
```

You can verify that Kubernetes created five more instances with:

```bash
kubectl get pods
```

And the application can process five times more messages.

Once the workers drained the queue, you can scale down with:

```bash
kubectl scale --replicas=1 deployment/backend
```

Manually scaling up and down is great — if you know when the most traffic hits your service.

If you don't, setting up an autoscaler allows the application to scale automatically without manual intervention.

You only need to define a few rules.

## Exposing application metrics

_How does Kubernetes know when to scale your application?_

Simple, you have to tell it.

The autoscaler works by monitoring metrics.

Only then it can increase or decrease the instances of your application.

So you could expose the length of the queue as a metric and ask the autoscaler to watch that value.

The more pending messages in the queue, the more instances of your application Kubernetes will create.

_So how do you expose those metrics?_

The application has a `/metrics` endpoint to expose the number of messages in the queue.

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

## Consuming application metrics in Kubernetes

You're almost ready to autoscale; you should install the metrics server first.

In fact, Kubernetes will not ingest metrics from your application by default.

You should enable the [Custom Metrics API](https://github.com/kubernetes-incubator/custom-metrics-apiserver) if you wish to do so.

To install the Custom Metrics API, you also need [Prometheus](https://prometheus.io/) — a time series database.

All the files needed to install the Custom Metrics API are conveniently packaged in [learnk8s/spring-boot-k8s-hpa](https://github.com/learnk8s/spring-boot-k8s-hpa).

You should download the content of that repository and change the current directory to be in the `monitoring` folder of that project.

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

Mission accomplished!

_You're ready to consume metrics._

In fact, you should already find a custom metric for the number of messages in the queue:

```bash
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1/namespaces/default/pods/*/messages" | jq .
```

Congratulations, you have an application exposing metrics and a metric server consuming them.

You can finally enable the autoscaler!

## Autoscaling deployments in Kubernetes

Kubernetes has an object called [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) that is used to monitor deployments and scale the number of Pods up and down.

You will need one of those to scale your instances automatically.

You should create a `hpa.yaml` file with the following content:

```bash
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: spring-boot-hpa
spec:
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: backend
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Pods
    pods:
      metricName: messages
      targetAverageValue: 10
```

The file is cryptic, let me translate it for you:

- Kubernetes watches the deployment specified in `scaleTargetRef`. In this case, it's the worker.
- You're using the `messages` metric to scale your _Pods_. Kubernetes will trigger the autoscaling when there're more than ten messages in the queue.
- As a minimum, the deployment should have two _Pods_. Ten _Pods_ is the upper limit.

You can create the resource with:

```bash
kubectl create -f hpa.yaml
```

After you submitted the autoscaler, you should notice that the number of replicas for the backend is two:

```bash
kubectl get pods
```

It makes sense since you asked the autoscaler always to have at least two replicas running.

You can inspect the conditions that triggered the autoscaler and the events generated as a consequence with:

```bash
kubectl describe hpa
```

The autoscaler suggests it was able to scale the Pods to 2 and it's ready to monitor the deployment.

_Exciting stuff, but does it work?_

## Load testing

There's only one way to know if it works: creating loads of messages in the queue.

Head over to the front-end application and start adding a lot of messages.

As you add messages, monitor the status of the Horizontal Pod Autoscaler with:

```bash
kubectl describe hpa
```

The number of Pods goes up from 2 to 4, then 8 and finally 10.

_The application scales with the number of messages!_

_Hurrah!_

You just deployed a fully scalable application that scales based on the number of pending messages on a queue.

On a side note, the algorithm for scaling is the following:

```
MAX(CURRENT_REPLICAS_LENGTH * 2, 4)
```

> The documentation doesn't help a lot when it comes to explaining the algorithm. You can [find the details in the code](https://github.com/kubernetes/kubernetes/blob/bac31d698c1eed2b54374bdabfd120f7319dd5c8/pkg/controller/podautoscaler/horizontal.go#L588).

Also, every scale-up is re-evaluated every minute, whereas any scale down every two minutes.

All of the above are settings that can be tuned.

You're not done yet, though.

## What's better than autoscaling instances? Autoscaling clusters

Scaling Pods across nodes works fabulously.

_But what if you don't have enough capacity in the cluster to scale your Pods?_

If you reach peak capacity, Kubernetes will leave the Pods in a pending state and wait for more resources to be available.

_It would be great if you could use an autoscaler similar to the Horizontal Pod Autoscaler, but for Nodes._

Good news!

You can have a cluster autoscaler that adds more nodes to your Kubernetes cluster as you need more resources.

{% include_relative autoscaling-cluster.html %}

The cluster autoscaler comes in different shapes and sizes.

And it's also cloud provider specific.

> Please note that you won't be able to test the autoscaler with `minikube` since it is single node by definition.

You can find [more information about the cluster autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#cluster-autoscaler) and the [cloud provider implementation](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#deployment) on Github.

## Recap

Designing applications at scale require careful planning and testing.

Queue based architecture is an excellent design pattern to decouple your microservices and ensure they can be scaled and deployed independently.

And while you can roll out your deployment scripts, it's easier to leverage a container orchestrator such as Kubernetes to deploy and scale your applications automatically.

If you liked the article, you should stay tuned for more! Subscribe to our newsletter!