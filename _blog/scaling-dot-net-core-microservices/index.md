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
The core focus has been to make the code readable to ubrew nderstand what is being achieved.
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

### Setup the Application

We pass `yaml` files to Kubernetes via `kubectl` to declare what state we want our application to run within.
Lets get the application up and running, then we'll look into a solution for our scaling issue.

### Minikube Vs Cloud

Minikube creates a local Kubernetes cluster on your computer that you can manage yourself.
How much does Minikube cost?  Nothing!  You're running it locally so this is one less thing to worry about.
You shouldn't use Minikube to manage an actual deployment, I'd love to see a blog post about it.

### Running in the Cloud

Within this example we're going to use the Azure Kubernetes Service, or AKS for short.
Kubernetes provides and abstraction on top of the cloud providers.
We don't have to understand how to do all the buts under the hood, all we need to understand is how to manage Kubernetes.

So lets setup our first AKS cluster.

To do this, you need to have access to the `azure-cli`, [click here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to find relevant documentation to install locally.
Alternatively, you can use the azure client via the [Azure Portal](https://portal.azure.com).

To keep track of some of the values we're going to be passing through the scripts, a `variables.sh` has been created to export names:

`variables.sh`

```bash
$ export RESOURCE_GROUP=ticketingGroup
$ export CLUSTER_NAME=ticketingAKSCluster
$ export AKS_VM_GROUP=MC_${RESOURCE_GROUP}_${CLUSTER_NAME}_EASTUS
```

No we can create our AKS cluster using the following script:

`aks-setup.sh`

```bash
# Provision AKS Cluster

source variables.sh

set -x

az group create --name ${RESOURCE_GROUP} --location eastus
az aks create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${CLUSTER_NAME} \
    --node-count 2 \
    --enable-addons monitoring \
    --generate-ssh-keys
az aks install-cli
$ az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
Merged "ticketingAKSCluster" as current context in /Users/denhamparry/.kube/config
$ kubectl get nodes
NAME                       STATUS    ROLES     AGE       VERSION
aks-nodepool1-17629832-0   Ready     agent     8m        v1.9.11
aks-nodepool1-17629832-1   Ready     agent     8m        v1.9.11
```

We've created a resource group named `ticketingGroup`, this will allow us to delete all associated resources at the end of the tutorial.
An AKS cluster called `ticketingAKSCluster` which has 2 nodes.
We make sure `kubectl` has been setup locally and then get credentials to the cluster.
Finally, we check to see that the nodes are ready.

### Setup Helm

TODO: Send link to install Helm locally.

* [Reference](https://www.digitalocean.com/community/tutorials/how-to-install-software-on-kubernetes-clusters-with-the-helm-package-manager#step-2-—-installing-tiller).

Now we need to create a `tiller` on our cluster:

`helm-setup.sh`

```bash
$ kubectl -n kube-system create serviceaccount tiller
serviceaccount "tiller" created
$ kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
clusterrolebinding "tiller" created
$ helm init --service-account tiller
$HELM_HOME has been configured at /Users/denhamparry/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.

Please note: by default, Tiller is deployed with an insecure 'allow unauthenticated users' policy.
To prevent this, run `helm init` with the --tiller-tls-verify flag.
For more information on securing your installation see: https://docs.helm.sh/using_helm/#securing-your-helm-installation
Happy Helming!
$ kubectl get pods --namespace kube-system
NAME                                   READY     STATUS              RESTARTS   AGE
tiller-deploy-9bdb7c6bc-86cwt          0/1       ContainerCreating   0          0s
```

### Helm - RabbitMQ

```bash
$ helm install --name ticketing-queue stable/rabbitmq
NAME:   ticketing-queue
LAST DEPLOYED: Tue Feb 12 09:28:56 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/ServiceAccount
NAME                      SECRETS  AGE
ticketing-queue-rabbitmq  1        1s

==> v1/Role
NAME                                      AGE
ticketing-queue-rabbitmq-endpoint-reader  1s

==> v1/RoleBinding
NAME                                      AGE
ticketing-queue-rabbitmq-endpoint-reader  1s

==> v1/Service
NAME                               TYPE       CLUSTER-IP   EXTERNAL-IP  PORT(S)                                AGE
ticketing-queue-rabbitmq-headless  ClusterIP  None         <none>       4369/TCP,5672/TCP,25672/TCP,15672/TCP  1s
ticketing-queue-rabbitmq           ClusterIP  10.0.44.105  <none>       4369/TCP,5672/TCP,25672/TCP,15672/TCP  1s

==> v1beta2/StatefulSet
NAME                      DESIRED  CURRENT  AGE
ticketing-queue-rabbitmq  1        1        1s

==> v1/Pod(related)
NAME                        READY  STATUS             RESTARTS  AGE
ticketing-queue-rabbitmq-0  0/1    ContainerCreating  0         1s

==> v1/Secret
NAME                      TYPE    DATA  AGE
ticketing-queue-rabbitmq  Opaque  2     2s

==> v1/ConfigMap
NAME                             DATA  AGE
ticketing-queue-rabbitmq-config  2     1s


NOTES:

** Please be patient while the chart is being deployed **

Credentials:

    Username      : user
    echo "Password      : $(kubectl get secret --namespace default ticketing-queue-rabbitmq -o jsonpath="{.data.rabbitmq-password}" | base64 --decode)"
    echo "ErLang Cookie : $(kubectl get secret --namespace default ticketing-queue-rabbitmq -o jsonpath="{.data.rabbitmq-erlang-cookie}" | base64 --decode)"

RabbitMQ can be accessed within the cluster on port  at ticketing-queue-rabbitmq.default.svc.cluster.local

To access for outside the cluster, perform the following steps:

To Access the RabbitMQ AMQP port:

    kubectl port-forward --namespace default svc/ticketing-queue-rabbitmq 5672:5672
    echo "URL : amqp://127.0.0.1:5672/"

To Access the RabbitMQ Management interface:

    kubectl port-forward --namespace default svc/ticketing-queue-rabbitmq 15672:15672
    echo "URL : http://127.0.0.1:15672/"
```

### Helm - Mongo DB

```bash
$ helm install --name ticketing-db stable/mongodb
NAME:   ticketing-db
LAST DEPLOYED: Tue Feb 12 09:39:34 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Pod(related)
NAME                                   READY  STATUS   RESTARTS  AGE
ticketing-db-mongodb-7775d8c89b-hxhp8  0/1    Pending  0         1s

==> v1/Secret
NAME                  TYPE    DATA  AGE
ticketing-db-mongodb  Opaque  1     1s

==> v1/PersistentVolumeClaim
NAME                  STATUS   VOLUME   CAPACITY  ACCESS MODES  STORAGECLASS  AGE
ticketing-db-mongodb  Pending  default  1s

==> v1/Service
NAME                  TYPE       CLUSTER-IP    EXTERNAL-IP  PORT(S)    AGE
ticketing-db-mongodb  ClusterIP  10.0.139.226  <none>       27017/TCP  1s

==> v1beta1/Deployment
NAME                  DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
ticketing-db-mongodb  1        1        1           0          1s


NOTES:


** Please be patient while the chart is being deployed **

MongoDB can be accessed via port 27017 on the following DNS name from within your cluster:

    ticketing-db-mongodb.default.svc.cluster.local

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default ticketing-db-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)

To connect to your database run the following command:

    kubectl run --namespace default ticketing-db-mongodb-client --rm --tty -i --restart='Never' --image bitnami/mongodb --command -- mongo admin --host ticketing-db-mongodb --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace default svc/ticketing-db-mongodb 27017:27017 &
    mongo --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD
```

### Kubernetes: Ticketing.API

TODO: Add notes for updating API config file.

```bash
$ kubectl apply -f ticketing.api
configmap "ticketingapi-configmap" created
deployment "ticketingapi" created
secret "ticketingapi-secret" created
service "ticketingapi" created
```

### How do I access the application

We've had successful messages but how do we access the web application as a public user?
We can look at our services to find an IP address that we could use.

## Its time to scale

We've got our application working in the cloud and have seen the power of `kubectl`, but we're essentially where we are when we started.
Each of the services that we're running are within a single instance.
LEts address that by updating our deployments to make sure we have at least 2 instances of each service running.  Why at least two?  The US Marines have a saying:

> One is none, two is one.  
> US Marines

The basis of this means that you can never trust having a single instance, you need at least two to have the basics constantly being provided.

```bash
TODO: Deployments that scale
```

This is great as we can scale our application, but what happens when we want more than two instances?
Throughout the day, you might expect to get peak traffic and trough traffic times.
If the ticketing site was setup for a gig and tickets went on sale at 9am, we'd want more instances running at 9am that morning, not 9pm in the evening.

### Horizontal Pod Autoscaling (HPA)

What if we could monitor a metric, and then scale when the metric exceeds a certain value.
Using tools like prometheus, we can scrape metric end points which can then be monitored by Kubernetes.
Creating a HPA we have 