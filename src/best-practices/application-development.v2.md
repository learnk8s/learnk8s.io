# Application development

Are you following the best practices?

## Health checks

Kubernetes offers two mechanisms to track the lifecycle of your containers and Pods: liveness and readiness probes.

**The readiness probe determines when a container can receive traffic.**

The kubelet executes the checks and decides if the app can receive traffic or not.

**The liveness probe determines when a container should be restarted.**

The kubelet executes the check and decides if the container should be restarted.

**Resources:**

- The official Kubernetes documentation offers some practical advices on how to [configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
- [Liveness probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html) has some advice on how to set (or not) dependencies in your readiness probes.

### Containers have readiness probes

> Please note that there's no default value for readiness and liveness.

If you don't set the readiness probe, the kubelet assumes that the app is ready to receive traffic as soon as the container starts.

If the container takes 2 minutes to start, all the requests to it will fail for those 2 minutes.

### Avoid using the Liveness probe (if you can)

The Liveness probe is designed to restart your container when it's stuck due to edge-cases such as a dead-lock.

_But if you can detect the deadlock and signal a failing liveness probe, why not exiting from the deadlock in the first place?_

It's a fair question, and that's perhaps the reason why liveness probes are generally not necessary.

It's a best practice to let the app crash rather than signalling a failing liveness probe.

You can find [more details about using (or not) liveness probes in this article](https://blog.colinbreck.com/kubernetes-liveness-and-readiness-probes-revisited-how-to-avoid-shooting-yourself-in-the-other-foot/#letitcrash).

### Liveness probes values aren't the same as the Readiness

When Liveness and Readiness probes are pointing to the same endpoint, the effects of the probes are combined.

When the app signals that it's not ready or live, the kubelet detaches the container from the Service and delete it **at the same time**.

You might notice dropping connections, because the container there isn't enough time to drain the current connections or process the incoming ones.

You can dig deeper in the following [article that discussed graceful shutdown](https://freecontent.manning.com/handling-client-requests-properly-with-kubernetes/).

## Apps are independent

You might be tempted to signal the readiness of your app only if all of the dependencies such as databases or backend API are also ready.

If the app connects to a database, you might think that returning a failing readiness probe until the database is _ready_ is a good idea — it is not.

Consider the following scenario: you have one front-end app that depends on a backend API.

If the API is flaky (e.g. it's unavailable from time to time due to a bug), the readiness probe fails, and the dependent readiness in the front-end app fail as well.

And you have downtime.

More in general, **a failure in a dependecy downstream could propagate to all apps upstream** and eventually bring down your front-end facing layer as well.

### The Readiness probes are independent

The readiness probe doesn't include dependencies to services such as:

- databases
- database migrations
- APIs
- third party services

You can [explore what happens when there're dependencies in the readiness probes in this eassy](https://blog.colinbreck.com/kubernetes-liveness-and-readiness-probes-how-to-avoid-shooting-yourself-in-the-foot/#shootingyourselfinthefootwithreadinessprobes).

### The app retries connecting to dependent services

When the app starts, it shouldn't crash because a dependency such as a database isn't ready.

Instead, the app should keep retrying to connect to the database until it succeeds.

Kubernetes expects that application components can be started in any order.

Making sure that your app reconnect to a dependecy such as a database helps you deliver more robust services.

## Graceful shut down

When a Pod is deleted you don't want to abruptly terminate all connections.

Instead, you should wait for the existing connection to drain and stop processing new ones.

Please notice that, when a Pod is terminated, the endpoints for that Pod are removed from the Service.

However, it might take some time before component such as kube-proxy or the Ingress controller are notified of the change.

You can find a detail explanation on how graceful shutdown works in [handling client requests properly with Kubernetes](https://freecontent.manning.com/handling-client-requests-properly-with-kubernetes/).

The correct graceful shutdown sequence is:

1. upon receiving SIGTERM
1. the server stops accepting new connections
1. completes all active requests
1. then immediately kills all keepalive connections and
1. the process exits

You can [test that your app gracefully shuts down with this tool: kube-sigterm-test](https://github.com/mikkeloscar/kube-sigterm-test).

### The app doesn't shut down on SIGTERM, but it gracefully terminate connections

It might take some time before component such as kube-proxy or the Ingress controller are notified of the endpoint changes.

Hence, traffic might still flow to the Pod despite it being marked as terminated.

The app should stop accepting new requests on all remaining connections, and close these once the outgoing queue is drained.

If you need a refresher on how endpoints are propagate in your cluster, [read this article on how to handle client requests properly]((https://freecontent.manning.com/handling-client-requests-properly-with-kubernetes/)).

### The app still process incoming requests in the grace period

You might want to consider using the container lifecycle events such as [the preStop handler](https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/#define-poststart-and-prestop-handlers) to customise what happened before a Pod is deleted.

### The CMD in the `Dockerfile` forwards the SIGTERM to the process

You can be notifed when the Pod is about to be terminated by capturing the SIGTERM signal in your app.

You should also pay attention to [forwarding the signal to the right process in your container](https://pracucci.com/graceful-shutdown-of-kubernetes-pods.html).

### Close all idle keep-alive sockets

If the calling app is not closing the TCP connection (e.g. using TCP keep-alive or a connection pool) it will connect to one Pod and not use the other Pods in that Service.

_But what happens when a Pod is deleted?_

Ideally, the request should go to another Pod.

However, the calling app has a long lived connection open with the Pod that is about to be terminated and it will keep using it.

On the other hand, you shouldn't abruptly terminate long lived connections.

Instead, you should terminate them before shutting down the app.

You can read about keep-alive connections on this article about [gracefully shutting down a Nodejs HTTP server](http://dillonbuchanan.com/programming/gracefully-shutting-down-a-nodejs-http-server/).

## Fault tolerance

Your cluster nodes could disappear at any time for several reasons:

- a hardware failure of the physical machine
- cloud provider or hypervisor failure
- a kernel panic

Pods deployed in those nodes are lost too.

Also, there are other scenarios where Pods could be deleted:

- directly deleting a pod (accident)
- draining a node
- removing a pod from a node to permit another Pod to fit on that node

Any of the above scenarios could affect the availability of your app and potentially cause downtime.

You should protect from a scenario where all of your Pods are made unavailble and you aren't able to serve live traffic.

### Run mor than one replica for your Deployment

Never run a single Pod individually.

Instead consider deploying your Pod as part of a Deployment, DaemonSet, ReplicaSet or StatefulSet.

[Running more than one instance your of your Pods guarantees that deleting a single Pod won't cause downtime](https://cloudmark.github.io/Node-Management-In-GKE/#replicas).

### Avoid Pods being places into a single node

**Even if you run several copies of your Pods, there are no guarantees that losing a node won't take down your service.**

Consider the following scenario: you have 11 replicas on a single cluster node.

If the node is made unavailable, the 11 replicas are lost and you have downtime.

[You should apply anti-affinity rules to your Deployments so that Pods are spread in all the nodes of your cluster](https://cloudmark.github.io/Node-Management-In-GKE/#pod-anti-affinity-rules).

The [inter-pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#inter-pod-affinity-and-anti-affinity) documentation describe how you can you could change your Pod to be located (or not) in the same node.

### Set Pod disruption budgets

When a node is drained, all the Pods on that node are deleted and rescheduled.

_But what if you are under heavy load and you can't lose more than 50% of your Pods?_

The drain event could affect your availability.

To protect the Deployments from unexpected events that could take down several Pods at the same time, you can define Pod Disruption Budget.

Imagine saying: _"Kubernetes, please make sure that there are always at least 5 Pods running for my app"._

Kubernetes will prevent the drain event if the final state results in less than 5 Pods for that Deployment.

The official documentation is an excellent place to start to understand [Pod Disruption Budgets](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/).

## Resources utilisation

You can think about the Kubernetes as a skilled Tetris player.

Docker containers are the blocks; servers are the boards, and the scheduler is the player.

![Kubernetes is the best tetris player](tetris.svg)

To maximise the efficiency of the scheduler you should share with Kubernetes details such as resource utilisation, workload priorities and overheads.

### Set memory limits and requests for all containers

Resource limits are used to constraint how much CPU and memory your containers can utilise and are set using the resources property of a `containerSpec`.

The scheduler uses those as one of metrics to decide which node is best suited for the current Pod.

A container without a memory limit has memory utilisation of zero — according to the scheduler.

An unlimited number of Pods if schedulable on any nodes leading to resource overcommitment and potential node (and kubelet) crashes.

The same applies to CPU limits.

_But should you always set limits and requests for memory and CPU?_

Yes and no.

If your process goes over the memory limit, the process is terminated.

Since CPU is a compressable resource, if your container goes over the limit, the process is throttled.

Even if it could have used some of the CPU that was available at that moment.

**[CPU limits are hard.](https://www.reddit.com/r/kubernetes/comments/cmp7jj/multithreading_in_a_container_with_limited/ew52fcj/)**s

If you wish to dig deeper into CPU and memory limits you should check out the following articles:

- [Understanding resource limits in kubernetes: memory](https://medium.com/@betz.mark/understanding-resource-limits-in-kubernetes-memory-6b41e9a955f9)
- [Understanding resource limits in kubernetes: cpu time](https://medium.com/@betz.mark/understanding-resource-limits-in-kubernetes-cpu-time-9eff74d3161b)

> Please note that if you are not sure what should be the _right_ CPU or memory limit, you can use the [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) in Kubernetes with the recommendation mode turned on. The autoscaler profiles your app and recommends limits for it.

### Set CPU request to 1 CPU or below

Unless you have computetional intensive jobs, [it is recommended to set the request to 1 CPU or below](https://www.youtube.com/watch?v=xjpHggHKm78).

### Disable CPU limits — unless you have a good use case

CPU is measured as CPU timeunits per timeunit.

`cpu: 1` means 1 CPU second per second.

If you have 1 thread, you can't consume more than 1 CPU second per second.

If you have 2 threads, you can consume 1 CPU second in 0.5 seconds.

8 threads can consume 1 CPU second in 0.125 seconds.

After that your process is throttled.

If you're not sure about what's the best settings for your app, it's better to not set the CPU limits.

If you wish to learn more, [this article digs deeper in CPU requests and limits](https://medium.com/@betz.mark/understanding-resource-limits-in-kubernetes-cpu-time-9eff74d3161b).

### The namespace has a LimitRange

If you think you might forget to set memory and CPU limits, you should consider using a LimitRange object to define the standard size for a container deployed in the current namespace.

[The official documentation about LimitRange](https://kubernetes.io/docs/concepts/policy/limit-range/) is an excellent place to start.

### Set an appropriate Quality of Service (QoS) for Pods

When a node goes into an overcommited state (i.e. using too many resources) Kubernetes tries to evict some of the Pod in that Node.

Kubernetes ranks and evicts the Pods according to a well defined logic.

You can find more about [configuring the quality of service for your Pods](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/) on the official documentation.

## Tagging resources

Labels are the mechanism you use to organize Kubernetes objects.

A label is a key-value pair without any pre-defined meaning.

They can be applied to all resources in your cluster from Pods to Service, Ingress manifests, Endpoints, etc.

You can use labels to categorize resources by purpose, owner, environment, or other criteria.

So you could choose a label to tag a Pod in an environment such as "this pod is running in production" or "the payment team owns that Deployment".

You can also omit labels all together.

However, you might want to consider using labels to cover the following categories:

- technical labels such as the environment
- labels for automation
- label related to your business such as cost-center allocation
- label related to security such as compliance requirements

### Resources have technical labels defined

You should tag your Pods with:

- `name`, the name of the application such "User API"
- `instance`, a unique name identifying the instance of an application (you could use the container image tag)
- `version`, the current version of the application (an incremental counter)
- `component`, the component within the architecture such as "API" or "database"
- `part-of`, the name of a higher level application this one is part of such as "payment gateway"

Here's an example on how you could use such labels in a Deployment:

```yaml|highlight=6-10,19-23|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment
  labels:
    app.kubernetes.io/name: user-api
    app.kubernetes.io/instance: user-api-5fa65d2
    app.kubernetes.io/version: "42"
    app.kubernetes.io/component: api
    app.kubernetes.io/part-of: payment-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      application: my-app
  template:
    metadata:
      labels:
        app.kubernetes.io/name: user-api
        app.kubernetes.io/instance: user-api-5fa65d2
        app.kubernetes.io/version: "42"
        app.kubernetes.io/component: api
        app.kubernetes.io/part-of: payment-gateway
    spec:
      containers:
      - name: app
        image: myapp
```

### Resources have business labels defined

TODO

### Resources have security labels defined

TODO

## Logging

TODO

### The application logs to `stdout` and `stderr`

TODO
