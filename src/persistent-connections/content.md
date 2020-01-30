Kubernetes offers two convenient abstractions to deploy apps: Services and Deployments.

Deployments describe a recipe for what kind and how many copies of your app should run at any given time.

Each app is deployed as a Pod, and an IP address is assigned to it.

Services, on the other hand, are similar to load balancers, and they are designed to distribute the traffic to a set of Pods.

It's often useful to think about Services as a collection of IP address.

Every time you make a request to a Service, one of the IP addresses from that list is selected and used as the destination.

If you have two apps such as a front-end and a backend, you can use a Deployment and a Service for each and deploy them in the cluster.

Notice how, when the front-end app makes a request, it doesn't need to know how many Pods are connected to the backend Service.

It could be one, tens or hundreds.

The front-end app isn't aware of the individual IP addresses of the backend app either.

When it wants to make a request, that request is sent to the backend Service which has an IP address that doesn't change.

_But what's the load balancing strategy for the Service?_

_Is it round-robin, right?_

Sort of.

## Load balancing in a Service

Kubernetes Services don't exist.

There's no process listening on the IP address and port of the Service.

> You can check that this is the case by accessing any node in your Kubernetes cluster and executing `netstat -ntlp`.

Even the IP address can't be found anywhere.

The IP address for a Service is allocated by the control plane in the controller manager and stored in the database — etcd.

That same IP address is then used by another component: kube-proxy.

Kube-proxy reads the list of IP addresses for all Services and writes a collection of iptables rules in every node.

The rules are meant to say: "if you see this Service IP address, instead rewrite the request and pick one of the Pod as the destination".

The Service IP address is used only as a placeholder — that's why there is no process listening on the IP address or port.

_Does iptables use round-robin?_

No, iptables is primarily used for firewalls, and it is not designed to do load balancing.

However, you could [craft a smart set of rules that could make iptables behave like a load balancer](https://scalingo.com/blog/iptables#load-balancing).

And this is precisely what happens in Kubernetes.

If you have three Pods, iptables writes these rules:

1. select Pod 1 as the destination with a probability of 0.33
1. select Pod 2 as the destination with a probability of 0.33
1. select Pod 3 as the destination with a probability of 0.33

Since this is a probability, there's no guarantee that Pod 2 is selected after Pod 1 as the destination.

The behaviour is closer to be random than round-robin.

Let's explore that in more detail.

## Inspecting Services in minikube

Let's deploy a simple front-end and backend app in minikube.

> You can consult [the official documentation on how to install minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/). If you're on Windows, it isn't as straightforward. But we wrote [a detailed guide on your options](/blog/installing-docker-and-kubernetes-on-windows).

You can start minikube with:

```terminal|command=1|title=bash
minikube start
```

> Please notice that you can find all the [YAML files and code for this article in this repository]().

The definition for the front-end is the following:

```yaml|title=front-end.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: front-end
spec:
  selector:
    matchLabels:
      name: front-end
  template:
    metadata:
      labels:
        name: front-end
    spec:
      containers:
      - name: container1
        image: learnk8s/hello:1.0.0
        ports:
          - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: front-end
spec:
  ports:
  - nodePort: 32000
    port: 80
    targetPort: 3000
  selector:
    name: front-end
  type: NodePort
```

and for the backend is the following:

```yaml|title=backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      name: backend
  template:
    metadata:
      labels:
        name: backend
    spec:
      containers:
      - name: container1
        image: learnk8s/hello:1.0.0
        ports:
          - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    name: backend
```

You can submit the two definitions with:

```terminal|command=1|title=bash
kubectl apply -f front-end.yaml -f backend.yaml
```

If the deployment is successful, you should a response:

```terminal|command=1|title=bash
curl $(minikube service front-end --url)
{"host": "app-9b68c75cd-8s27d"}
```

You should verify that a Service doesn't "exist".

_Is there a process listening on the IP address and port of the `backend` Service?_

You can list the Service with:

```terminal|command=1|title=bash
kubectl get service
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)
front-end    NodePort    10.96.45.152   <none>        80:32000/TCP
backend      ClusterIP   10.96.45.153   <none>        80/TCP
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP
```

Let's see if there's a process listening on `10.96.45.153:80`.

You can ssh into minikube with:

```terminal|command=1|title=bash
minikube ssh
```

From within minikube list the network connections:

```terminal|command=1|title=bash
netstat -ntlp
```

There isn't!

Instead, the IP address is used by iptables rules.

Let's inspect the rules with:

```terminal|command=1|title=bash
sudo iptables-save
```

You should notice a long chain of rules.

If you pay attention (or filter with `grep`) for the IP address of the Service, you should find something similar to this:

```terminal|title=bash
TODO
```

A few things worth noting:

- iptables use the [statistic module](http://ipset.netfilter.org/iptables-extensions.man.html#lbCD) with `random` mode. So the load balancing algorithm is random.
- the probability isn't split 33%-33%-33% to the three Pods. Instead ...TODO...

You can imagine that if you scale the Deployment to four replicas, kube-proxy will update the rules to reflect the new Pods.

Now that you're familiar with how Services work let's have a look at more exciting scenarios.

## Keeping it alive

With every request started from the front-end to the backend, a new HTTP connection is opened and closed.

If you front-end makes 100 requests per second to the backend, 100 different HTTP connections are opened and closed in that second.

You can improve the latency and save resources if you open a single connection and reuse it for any subsequent requests.

The HTTP protocol has a featured called HTTP keep-alive, or HTTP connection reuse that uses a single TCP connection to send and receive multiple HTTP requests and responses.

It doesn't work out of the box; your server and client should be configured to use it.

But the change is straightforward, and it's available in most languages and frameworks.

Here a few examples on how to implement keep-alive in different languages:

- [Keep-alive in Node.js](https://medium.com/@onufrienkos/keep-alive-connection-on-inter-service-http-requests-3f2de73ffa1)
- [Keep-alive in Spring boot](https://www.baeldung.com/httpclient-connection-management)
- [Keep-alive in Python](https://blog.insightdatascience.com/learning-about-the-http-connection-keep-alive-header-7ebe0efa209d)
- [Keep-alive in .NET](https://docs.microsoft.com/en-us/dotnet/api/system.net.httpwebrequest.keepalive?view=netframework-4.8)

_What happens when you use keep-alive with a Kubernetes Service?_

Let's imagine that front-end and backend support keep-alive.

You have a single instance of the front-end and three replicas for the backend.

The front-end makes the first request to the backend and opens the connection.

The request reaches the Service, and one of the Pod is selected as the destination.

The backend Pod replies and the front-end receives the response.

But instead of closing the HTTP connection, it is kept open for subsequent requests.

_What happens when the front-end issues more requests?_

Let's find out.

The front-end application that you previously deployed in minikube has a different endpoint `/persistent`.

When you use that endpoint, the front-end uses the HTTP keep-alive feature to connect to the backend.

You can make a request with:

```terminal|command=1|title=bash
curl $(minikube service --url)
{"host": "app-9b68c75cd-8s27d"}
```

_If you try to issue more requests what happens?_

```terminal|command=1,3,5|title=bash
curl $(minikube service --url)
{"host": "app-9b68c75cd-8s27d"}
curl $(minikube service --url)
{"host": "app-9b68c75cd-8s27d"}
curl $(minikube service --url)
{"host": "app-9b68c75cd-8s27d"}
```

They are sent to the same Pod.

_Isn't iptables supposed to distribute the traffic?_

It is.

There is a single connection open, and iptables rule were invocated the first time.

One of the three Pods was selected as the destination.

Since all subsequent requests are channelled through the same connection, iptables isn't invoked anymore.

So you achieved better latency and throughput, but you lost the ability to scale your backend.

Even if you have three backend Pods that can receive requests, only one is actively used.

_Is it fixable?_

Since Kubernetes doesn't know how to load balance persistent connections, you could step in and fix it yourself.

Services are a collection of IP addresses and ports — usually called endpoints.

Your app could retrieve the list of endpoints from the Service and decide how to distribute the requests.

As a first try, you could open a persistent connection to every Pod and round-robin requests to them.

Or you could [implement more sophisticated load balancing algorithms](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/daperture-load-balancer.html).

The client-side code that executes the load balancing should follow the following logic:

1. retrieve a list of endpoints from the Service
1. for each of them, open a connection and keep it open
1. when you need to make a request, pick one of the open connections
1. on a regular interval refresh the list of endpoints and remove or add new connections

_Does this problem apply only to keep-alive?_

## Database persistent connections

HTTP isn't the only protocol designed to open a long-lived connection.

If your app uses a database, the connection isn't opened and closed every time you wish to retrieve a record or a document.

Instead, the connection is established once and kept open.

If your database is deployed in Kubernetes using a Service, you might experience the same issues as the previous example.

There's one replica in your database that is utilised more than the others.

Kube-proxy and Kubernetes don't help to balance persistent connections.

Instead, you should take care of load balancing the requests to your database.

Depending on the library that you use to connect to the database, you might have different options.

The following example is from a clustered MySQL database called from Node.js:

```js|title=index.js
var mysql = require('mysql');
var poolCluster = mysql.createPoolCluster();

var endpoints = /* retrieve endpoints from the Service */

for (var [index, endpoint] of endpoints) {
  poolCluster.add(`mysql-replica-${index}`, endpoint);
}

// Make queries to the clustered MySQL database
```

## Websockets, gRPC, RSockets, HTTP/2 and more persistent connections

As you can imagine, several other protocols open a single connection at the time and reuse it.

Here you can read a few examples:

- Websockets and secured WebSockets
- HTTP/2
- gRPC
- RSockets
- AMQP

You might recognise most of the protocol above.

_So if those protocols are so popular, why isn't there a standard answer to do load balancing rather than moving the logic into the client?_

_Is there a native solution in Kubernetes?_

Kube-proxy and iptables are designed to cover the most popular use cases of deployments in a Kubernetes cluster.

But they are mostly there for convenience.

If you're using a web service that exposes a REST API, then you're in luck — you can use any Kubernetes Service.

But as soon as you start using any persistent connections, you should look into how you can evenly distribute the load.

Kubernetes doesn't cover that specific use case out of the box.

However, there's something that could help.

## Services in Kubernetes

Kubernetes has four different kinds of Services:

1. ClusterIP
1. NodePort
1. LoadBalancer
1. Headless

The first three Services have a virtual IP address that is used by kube-proxy to create iptables rules.

But the basic block of all the Services is the Headless Service.

The headless Service doesn't have an IP address assigned and is only a mechanism to collect a list of Pod IP addresses and ports (also called endpoints).

Every other Service is built on top of the Headless Service.

The ClusterIP Service is a Headless Service with some extra features:

- the control plane assigns it an IP address
- kube-proxy iterates through all the IP addresses and creates iptables rules

So you could ignore kube-proxy all together and always use the list of endpoints collected by the Headless Service to load balance requests client-side.

_But can you imagine adding that logic to all apps deployed in the cluster?_

If you have an existing fleet of applications, this might sound like an impossible task.

But there's an alternative.

## One more sidecar

You probably already noticed that the client-side load balancing strategy is quite standard.

When the app starts, it should

- retrieve a list of IP addresses from the Service
- open and maintain a pool of connections
- periodically refresh the pool by adding and removing endpoints

As soon as it wishes to make a request, it should:

- pick one of the available connections using a predefined logic such as round-robin
- issue the request

The steps above are valid for WebSockets connections as well as gRPC and AMQP.

You could extract that logic in a separate component and share it with all apps.

A popular tool in this space is Envoy — a programmable proxy.

Envoy can be programmed to dynamically reconfigure the load balancing algorithm and add and remove destination IP addresses as they are updated in the Service.

So instead of writing a library, you can simply deploy Envoy as a companion process to your app.

When the app makes a request, you could have Envoy intercepting the requests and load balancing it.

Not having to write client-side load balancing code for all apps, frameworks and languages is a great win.

But you still need to configure every app to use Envoy.

If you wish to skip even that, you can use a service meshes such as Istio or Linkerd.

Service meshes use a programmable proxy to:

- automatically discover Services
- inspect connections such as WebSockets and gRPC
- load-balance requests using the right protocol
