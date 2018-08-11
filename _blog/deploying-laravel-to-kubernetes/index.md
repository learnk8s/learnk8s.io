---
layout: post
title: How to deploy Laravel to Kubernetes
date: 2018-04-25 00:00:00
author: "Keith Mifsud"

description: "Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up."


excerpt: "Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up."

categories: php docker minikube kubernetes laravel
image: /blog/deploying-laravel-to-kubernetes/laravel_k8s.jpg

open_graph:
  type: article
  title: How to deploy Laravel to Kubernetes
  image: /blog/deploying-laravel-to-kubernetes/laravel_k8s.jpg
  description: "Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up."

js:
  - anime.min.js
  - isScrolledIntoView.js

has_cta: true
---

Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows.

How you deal with deploying the application is a different story. Vagrant is very good with setting up a local environment similar to a remote server. However, in production, you will most likely require more than just one web host and one database. You'll probably have separate services for several requirements. You also need to have mechanisms in place to ensure that the application is always online and that the servers can efficiently balance the load.

In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.

## Kubernetes, Why and What?

Kubernetes is an open-source system initially designed by Google to facilitate the management of containerised applications in a clustered environment. Some refer to it as an orchestration platform, and Kubernetes is not the only available platform of this type. Although, it does have a very high and fast adoption rate. Not to mention that it is quite easy to implement once you get used to it.

If you're still wondering why someone can benefit from using Kubernetes, the answer is simple. Kubernetes makes it easier to set up and manage as many clusters as required across multiple projects.

## Deploying a Laravel Application to Minikube

As I've afore-mentioned, I will be showing you how to deploy a straightforward and stateless Laravel application to Kubernetes. I aim to detail the steps involved in accomplishing this while explaining why specific actions are required. Furthermore, I will show you how to quickly scale the application and also make it available on a named host using an Ingress controller.

You can run Kubernetes on several cloud hosting providers such as Google Cloud Engine and Amazon Web Services. In this tutorial, you will run the application on Minikube, a tool that makes it easy to run Kubernetes locally.

Similar to Vagrant, Minikube is merely a Virtual Machine that contains a Kubernetes platform and Docker. You will need both to deploy your application as a Docker container and scale it to three instances using Kubernetes.


__The application__

I have prepared a simple Laravel application which you can clone from <a href="https://github.com/learnk8s/laravel-kubernetes-demo" target="_blank" rel="noopener" class="link">GitHub</a>. It is nothing more than a fresh Laravel installation. Therefore you can follow this example using either the demo application or just create a new Laravel application. To use the demo application clone it in your project's directory.

```bash
cd /to/your/working/directory
git clone git@github.com:learnk8s/laravel-kubernetes-demo.git .
```

__Prerequisites__

To follow with this demonstration, you will need the following installed on your local system:


1) <a href="https://docs.docker.com/install/" target="_blank" rel="noopener">Docker</a>

2) <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank" rel="noopener">Kubectl</a>

3) <a href="https://github.com/kubernetes/minikube/releases" target="_blank" rel="noopener">Minikube</a>

>Are you having problems installing and running these applications on Windows? LearnK8s will be publishing a tutorial on how to accomplish this very soon. Subscribe and be notified as soon as new articles get published.


__Docker image__

Kubernetes deploys containerised applications, and therefore as a first step, you will need to build a Docker image of the demo application. Since this tutorial will be run locally on Minikube, you can just build a local Docker Image from the `DockerFile` included in the example code.

```bash
FROM php:7
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring
WORKDIR /app
COPY . /app
RUN composer install

RUN php artisan key:generate
RUN php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181
```
This `DockerFile` is reasonably basic:

It extends a PHP7 base image, installs some system dependencies including composer and the standard PHP extensions required by Laravel. It then copies the application files to a working directory and installs the application's dependencies via composer. It also runs a couple of `artisan` commands,  last of which serves the application using the built-in PHP web server. In the end, it exposes port `8181` to the host machine.

To build the local Docker image:

```bash
cd /to/your/project/directory
eval $(minikube docker-env)
docker build -t yourname/laravel-kubernetes-demo .
```

> Don't forget to execute the eval. Building the image within the virtual machine is necessary. You should run the command only once in the current terminal.

__Deploying the image__

Now that the application's image is built and available in Minikube you can go ahead with deploying it.

I always start with making sure that `kubectl` is in the correct context. In this case, the context is Minikube. You can quickly switch context as follows:

```bash
kubectl config use-context minikube
```

then you can deploy the container image:

```bash
kubectl run laravel-kubernetes-demo --image=yourname/laravel-kubernetes-demo
--port=8181 --image-pull-policy=IfNotPresent
```
The above command tells `kubectl` to run our demo application from the Docker image while making port 8181 available for listening. The last parameter of the command simply asks `kubectl` to not pull the image from a registry such as Docker Hub if it exists locally which in this case it does. Do note that you still need to be logged on to Docker's so that `kubectl` can check if the image is up to date.

You can check that a Pod is created for the application by running:

```bash
kubectl get pods
```

which should return a similar output to:

```bash
NAME                                       READY     STATUS    RESTARTS   AGE
laravel-kubernetes-demo-7dbb9d6b48-q54wp   1/1       Running   0          18m
```

You can also use the Minikube GUI dashboard to monitor the cluster. The GUI also helps with visualising most of the discussed concepts. To view the dashboard, just run the following:

```bash
minikube dashboard
```

or to acquire the dashboard's URL address:

```bash
minikube dashboard --url=true
```

__Exposing a Service__

So far you have created a deployment which is running the application's container. A Pod running in the cluster has a dynamic IP. If you route the traffic directly to it using the IP, you may still need to update the routing table every time you restart the Pod. In fact, on every deployment or container restart, a new IP is assigned to the Pod. To avoid managing IP addresses manually, you need to use a Service. The Service acts as a load balancer for a set of Pods. So even if the IP address of a Pod changes, the service is always pointing to it. And since the Service always has the same IP, you won't need to update anything manually.

{% include_relative service.html %}

You can create a service with:

```bash
kubectl expose deployment laravel-kubernetes-demo --type=NodePort --port=8181
```

and provided all went well, you will see a confirmation similar to:

```bash
service "laravel-kubernetes-demo" exposed
```
Running the following command:

```bash
kubectl get services
```
will show you a list of running services. You can also view the running service under the "Services" navigation menu within the dashboard. A more exciting way to verify this deployment and the service exposure is obviously seeing the running application in the browser 😊

To obtain the URL of the application (service), you can use the following command:

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

And that is it. You have successfully deployed the application in Kubernetes. It's exciting. But what's the point of doing all of this? Well, you only have one deployment with a single Pod running, provisioned to a Node with the exposed web service. Let's scale this deployment to two more instances of the application.

{% include_relative scaling.html %}

So that you understand where you are at this moment, run the following command to get a list of desired and available Pods:

```bash
kubectl get deployment

NAME                      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
laravel-kubernetes-demo   1         1         1            1           57m
```

The output will be "1" for each. You want to have three available Pods so let's scale this up:

```bash
kubectl scale --replicas=3 deployment/laravel-kubernetes-demo
deployment "laravel-kubernetes-demo" scaled
```

Done. You have replicated the first Pod to another two, giving you three Pods running this service. Running the `get deployment` command will verify this.

```bash
kubectl get deployment

NAME                      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
laravel-kubernetes-demo   3         3         3            3           59m
```

You can also see this in the Dashboard under Pods or in the Service detail screen.

Now you're running three instances of the applications using three Pods.

Imagine your application becoming even more popular. Thousands of visitors are using your website or software. In the past, you may have been busy writing more scripts to create more instances of your application. In Kubernetes you can scale to multiple instances in a snap:

```bash
kubectl scale --replicas=10 deployment/laravel-kubernetes-demo
deployment "laravel-kubernetes-demo" scaled
```

You can see how convenient it is to use Kubernetes to scale your website.


__Ingress__

You've already achieved great things, you deployed the application and scaled the deployment. You have already seen the running application in the browser when pointed to the cluster's (Minikube) IP address and node's port number. Now, you will see how to access the application through an assigned URL as you would do when deploying to the cloud.

To use a URL in Kubernetes, you need an Ingress. An Ingress is a set of rules to allow inbound connections to reach a Kubernetes cluster. The Ingress is necessary because, in Kubernetes, resources such as Pods only have IP addresses which are routable by and within the cluster. Meaning that they are not accessible or reachable to and from the world outside.

{% include_relative ingress.html %}

I have included an `ingress.yaml` file with the source code of this demo application with the following contents:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: laravel-kubernetes-demo-ingress
  annotations:
    ingress.kubernetes.io/rewrite-target: /
spec:
  backend:
    serviceName: default-http-server
    servicePort: 80
  rules:
  - host: laravel-kubernetes.demo
  - http:
      paths:
      - path: /
        backend:
          serviceName: laravel-kubernetes-demo
          servicePort: 8181
```
Among the basic content you would expect from a Kubernetes resource file, this file defines a set of rules to follow when routing inbound traffic. The `laravel-kubernetes.demo` URL will point to the Service where the application is running, as previously labelled `laravel-kubernetes-demo` on port 8181.

The Ingress resource is useless without an Ingress controller so you will need to create a new controller or use an existing one. This tutorial uses the Nginx Ingress controller for routing the traffic. Minikube (v0.14 and above) comes with the Nginx setup as an addon which you will need to enable manually:

```bash
minikube addons enable ingress
```

>Please note that it may take few minutes for Minikube to download and install Nginx as an Ingress.


Once you have enabled the Ingress addon, you can create the Ingress in this way:

```bash
kubectl create -f path-to-your-ingress-file.yaml
```
You can verify and obtain the Ingress' information by running the following command:

```bash
kubectl describe ing laravel-kubernetes-demo-ingress
```
which outputs something similar to:

```bash
Name:             laravel-kubernetes-demo-ingress
Namespace:        default
Address:          192.168.99.101
Default backend:  default-http-server:80 (<none>)
Rules:
  Host  Path  Backends
  ----  ----  --------
  *
        /   laravel-kubernetes-demo:8181 (172.17.0.6:8181)
Annotations:
  rewrite-target:  /
Events:
  Type    Reason  Age   From                      Message
  ----    ------  ----  ----                      -------
  Normal  CREATE  39s   nginx-ingress-controller  Ingress default/laravel-kubernetes-demo-ingress
  Normal  UPDATE  20s   nginx-ingress-controller  Ingress default/laravel-kubernetes-demo-ingress
```
You can now access the application through the minikube IP address as shown above. To access the application through the URL https://laravel-kubernetes.demo, you will need to add an entry in your hosts file.

## This is just the beginning

Hopefully, this article has helped you in getting acquainted with Kubernetes. From my own experience, once one has performed similar deployments a couple or more times, things start getting habitual and make a lot more sense. But our Kubernetes journey has only just begun. In future articles, we will walk through more real-life applications using storage volumes to persist state, and we will also learn how to deploy to Cloud providers such as Google's  Cloud Platform. Until then, check out these <a href="/training" title ="Learn Kubernetes">courses</a> to get up to speed and possibly even become a Certified Kubernetes Administrator (CKA).
