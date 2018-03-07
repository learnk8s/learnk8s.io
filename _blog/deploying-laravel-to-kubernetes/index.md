---
layout: post
title: Deploying Laravel to Kubernetes
date: 2018-02-18 00:00:00
categories: kubernetes laravel php
author: "Keith Mifsud"
author_avatar: "keith_mifsud.jpg"
image: /blog/deploying-laravel-to-kubernetes/laravel-and-kubernetes.png

---

As most of us know, Laravel is a great framework for developing any PHP application. Whether we need to   prototype a new idea, develop an MVP (Minimum Viable Product) or release a 
full-fledged enterprise system, Laravel facilitates all of the development 
tasks and work-flows.

How we deal with deploying the application is another story. Vagrant is 
very good with setting up a local environment similar to a remote server, 
however, in production, we will most likely require more than just one 
web host and one database. We probably will have separate services for several 
requirements. We also need to have mechanisms in place to ensure that our 
application is always online and that the servers can effectively balance the
 load.

In this article, I'll explain how to deal with the simple requirement of
 running a Laravel application across three Nodes on a Kubernetes architecture. 

<!--more-->

## Kubernetes, Why and What?

Kubernetes is an open-source system originally designed by Google to 
facilitate the management of containerised applications in a clustered 
environment. This is also referred to as an orchestration platform and 
Kubernetes is not the only available platform of this type. However, it has a
 very high and fast adoption rate. Not to mention that it is quite easy to 
 implement once one gets used to it.
 
 If you're still wondering why someone can benefit from using Kubernetes, the 
 answer is simple. Kubernetes makes it easier to set up and manage as many 
 clusters as required across multiple projects.



## Kubernetes Basics

Before we deploy our demo application, it is fundamental to get to grips with
 some Kubernetes terms and their meaning.
 
__Clusters__

A cluster is made of one or more physical or virtual machines. In Kubernetes,
 a minimum of one cluster is needed called the "master cluster". The master 
 cluster, at the very least, runs the control processes for managing 
 the orchestration of multiple worker machines including the 
 control panel, the API server, scheduling and core resource containers.
 
__Pods__

In Kubernetes, a Pod is a group of containers which would normally be run 
together. An example of this would be an application which is run on two 
separate containers, one for HTTP requests and another for data storage. A 
Pod can be configured to always set up these containers together when the 
application is deployed. It is important to note that Pods are simply an 
abstraction of the setup of one or more containers and how they work together
. These are not physical objects but simply ephemeral instances of the group 
of containers. 

__Nodes__

As aforementioned, a Pod is simply an abstraction of the application's 
configuration across its containers. A Node is the actual worker machine for 
the Pods. A Node can be made up of more than one Pod and will, at the very least 
run __Kubelet__, the process that manages the communication between the 
Kubernetes master and the Node. Further to Kubelet, a Node will also run the 
container runtime, handling the retrieval, unpacking and running of the application's image.

__Services__

As we've already established, Pods are disposable. They are created and 
destroyed dynamically during several  system events such as scaling and 
updating. So what if a Pod relies on communicating with another one? The 
Pod's IP address may and probably will change on even non-trivial event. 
Services solve this problem through configuration. This is yet another 
abstraction layer in Kubernetes. They define a set of Pods and a policy by 
which they can be accessed. Think of a Service (configuration) as a router 
between Nodes, it 
knows which IP addresses belong to each component, together with the 
required ports and ensures to route to the correct addresses even once they 
have changed due to any system event. 

__Labels and Selectors__

Several components in Kubernetes can be configured so that the abstraction 
can be reused. Services are one of the components which do require this 
configuration as without it there's no reference to how the Nodes can be 
rebuilt using the Pods' abstraction. These configuration files are very 
standard and made up of key/value pairs.

__Kubectl__

Kubectl is the command line interface application for managing Kubernetes. 
This is to Kubernetes as what the Docker CLI is to Docker. Kubernetes 
can also be managed through a GUI control panel which, as much as Kubectl does, 
communicates with the Kubernetes Clusters through the API endpoints.


__Minikube__

Kubernetes can be run on any container cluster, including  custom ones built by 
yourself. However, _probably_, the most popular destination is the Google Cloud 
Platform (GCP) followed by Amazon Web Services (AWS). In any case, during 
development, testing or learning it is best to do so locally, at least at 
first. Minikube does exactly this. It mimics an orchestration platform within 
your local workstation. Allowing us to deploy all our containers in their 
respective Nodes locally as if they were hosted on the Cloud. This is great 
while learning and testing new setups but also indispensable when testing a 
production scenario without having to lease any external services on the 
cloud until you're ready to do so, fully knowing what will be needed and when.

__Contexts__

So, we use Kubectl to manage our local Minikube cluster and maybe a few 
more clusters on the cloud. These different orchestration targets are contexts 
which we can tell Kubectl to switch between.



## Deploying the Laravel Application to Minikube

The previous section, explaining some of the terms used when working with 
Kubernetes may intimidate most of us, but let's not be. These are 
simply words to compartmentalise different layers and attributes within a 
deployment scenario.
 
I have kept this example quite simple by removing state, i.e. no persistence 
and thus no databases. In this example, we will use Minikube to locally deploy
 a basic Laravel application across three nodes for load balancing.
 
_Want to learn how to manage storage volumes and databases? We will be 
writing a tutorial about this soon. Subscribe and be notified as
 soon as new articles are published._
 
__The application__

I have provided a simple Laravel application which can be cloned from <a href="https://github.com/learnk8s/laravel-kubernetes-demo" target="_blank" rel="noopener" class="link">GitHub</a>. This is nothing more than a new 
Laravel installation. Therefore you can follow this example using either the 
demo application or simply create your own new Laravel application. To use 
the demo application simply clone in your project's directory.

```bash
cd /to/your/working/directory
git clone git@github.com:learnk8s/laravel-kubernetes-demo.git .
```

__Prerequisites__

In order to follow with this demonstration, you will need the following 
installed on your local system:

1) <a href="https://docs.docker.com/install/" target="_blank" 
rel="noopener">Docker</a>

2) <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank" 
rel="noopener">Kubectl</a>

3) <a href="https://github.com/kubernetes/minikube/releases" target="_blank" 
   rel="noopener">Minikube</a>

_Having problems installing and running these applications on Windows? We will
 be writing a tutorial on how to accomplish this very soon. Subscribe and be 
notified as soon as new articles are published._

__Docker image__

Since this tutorial will be run locally, we can simply build a local Docker 
Image from the `DockerFile` included in the example code. This `DockerFile` 
is fairly basic:

```bash
FROM php:7
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring
WORKDIR /app
COPY . /app
RUN composer install

CMD php artisan key:generate
CMD php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181
``` 

It extends a PHP base image, installs some system dependencies including 
composer and the standard PHP extensions required by Laravel. It will then
 copy the application files to a working directory and install the application's 
  dependencies via composer. It also runs a couple of `artisan` commands, 
  last of which serves the application using the built-in PHP web server. At the
   end, it exposes port `8181` to the deployment.
  
To build the local Docker image:

```bash
cd /to/your/project/directory
docker build -t yourname/laravel-kubernetes-demo .
```

__Deploying the image__

Now that the application's image is built and is available for deploying it 
locally, let's go ahead and deploy it.

I always start with making sure that Kubectl is in the right context. In our 
case, the context is Minikube. We can simply switch context as follows:

```bash
kubectl config use-context minikube
```

then we can deploy the container image:

```bash
kubectl run laravel-kubernetes-demo --image=yourname/laravel-kubernetes-demo 
--port=8181 --image-pull-policy=IfNotPresent
```

The above command tells Kubectl to run our demo application from the Docker 
image, whilst making port 8181 available for listening. The last parameter of 
the command simply asks Kubectl to not pull the image from a registry such as
 Docker Hub if it exists locally which in our case it does. Do note that you 
 still need to be logged on to Docker so that Kubectl can check if the image 
 is up to date.
 
We can check that a Pod is created for our application by running:

```bash
kubectl get pods
```

which should return a similar output to:

```bash
NAME                                       READY     STATUS    RESTARTS   AGE
laravel-kubernetes-demo-7dbb9d6b48-q54wp   1/1       Running   0          18m
```

We can also use the Minikube GUI dashboard to monitor our cluster. The GUI 
also helps with visualising most of the discussed concepts. To view the 
dashboard, simply run the following:

```bash
minikube dashboard
```

or to acquire the dashboard's URL address:

```bash
minikube dashboard --url=true
```

which will return the IP address and the port number of the dashboard.

__Exposing a service__

So far we have created a deployment which is running our application's 
container. With the container running, we need to expose the PHP's built-in web 
server as a service.

```bash
kubectl expose deployment laravel-kubernetes-demo --type=NodePort --port=8181
```

and provided all went well, we should see a confirmation similar to:

```bash
service "laravel-kubernetes-demo" exposed
```

We can also view the running service under "Services" navigation menu within 
the dashboard. A more exciting way to verify this deployment and the service 
exposure is obviously viewing our running application in the browser 😊

To obtain the URL of our application (service), we can use the following 
command:

```bash
minikube service --url=true laravel-kubernetes-demo
```

which will output the IP address and port number similar to:

```bash
http://192.168.99.101:31399
```

or, launch the application directly in the browser:

```bash
minikube service laravel-kubernetes-demo
```

__Scaling__

And that is it. We have successfully deployed our application in Kubernetes. 
It's exciting, but what's the point of doing all of this? Well, we only have 
one deployment with a single Pod running, provisioned to a Node with the 
exposed web service. Let's replicate this service to two more Pods acting as 
load balancers to our traffic.

So that we understand where we are at this moment, run the following command 
to get a list of desired and available Pods:

```bash
kubectl get deployment

NAME                      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
laravel-kubernetes-demo   1         1         1            1           57m
```

The output will be "1" for each. We want to have 3 available Pods so let's 
scale this up:

```bash
kubectl scale --replicas=3 deployment/laravel-kubernetes-demo
deployment "laravel-kubernetes-demo" scaled
```

Done. We have replicated the initial Pod to another two, giving us three 
Pods running this service. Running the `get deployment` command will verify 
this.

```bash
kubectl get deployment

NAME                      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
laravel-kubernetes-demo   3         3         3            3           59m
```

The same can be viewed in the Dashboard under Pods or in the Service detail.

Now our application's deployment services are running on three 
separate replicated Pods.


## This is just the beginning

Hopefully, this article has helped you in getting acquainted with Kubernetes. 
From my own experience, once one has performed similar deployments a couple or
 more times, things start getting habitual and make a lot more sense. But our
  Kubernetes journey has only just begun. In future articles, we will walk 
  through more real-life applications using storage volumes to persist state 
  and we will also learn how to deploy to Cloud providers such as Google's 
  Cloud Platform. Until then, check out these <a href="/training" title 
  ="Learn Kubernetes">courses</a> to get up to speed and possibly even become a Certified Kubernetes Administrator (CKA).

