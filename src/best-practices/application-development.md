# Application development

Are you following the best practices?

## Pods have health checks

Kubernetes offers two mechanisms to track the lifecycle of your containers and Pods: liveness and readiness probes.

**The readiness probe determines when a container can receive traffic.**

The kubelet executes the checks and decides if the app can receive traffic or not.

**The liveness probe determines when a container should be restarted.**

The kubelet executes the check and decides if the container should be restarted.

> Please note that there's no default value for readiness and liveness.

If you don't set the readiness probe, the kubelet assumes that the app is ready to receive traffic as soon as the container starts.

If the container takes 2 minutes to start, all the requests to it will fail for those 2 minutes.

_Omitting the liveness probe won't cause as much troubles._

The probe is designed to restart your container when it's stuck due to edge-case scenarios such as a dead-lock.

_But if you can detect the deadlock and signal a failing liveness probe, why not exiting from the deadlock in the first place?_

It's a fair question, and that's perhaps the reason why liveness probes are generally not necessary.

It's a best practice to let the app crash rather than signalling a failing liveness probe.

### Resources

- The official Kubernetes documentation offers some practical advices on how to [configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
- [Liveness probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html) collects some of the best practices for setting liveness and readiness probes.
- It's worth noting that [using the `exec` command to probe the process inside the container could lead to zombie processes](https://www.youtube.com/watch?v=QKI-JRs2RIE). Avoid using it, if you can.

### Checklist

- [ ] Containers have readiness probes
- [ ] Avoid using the liveness probe (if you can)
- [ ] Liveness probes values aren't the same as the Readiness
- [ ] Don't use `exec` for your probes

## Apps are independent

You might be tempted to signal the readiness of your app only if all of the dependencies such as databases or backend API are also ready.

If the app connects to a database, you might think that returning a failing readiness probe until the database is _ready_ is a good idea — it is not.

Consider the following scenario: you have one front-end app that depends on a backend API.

If the API is flaky (e.g. it's unavailable from time to time due to a bug), the readiness probe fails, and the dependent readiness in the front-end app fail as well.

And you have downtime.

More in general, **a failure in a dependecy downstream could propagate to all apps upstream** and eventually bring down your front-end facing layer as well.

_But it doesn't stop there._

When there are dependencies between the two apps, you can't deploy the front-end unless you deploy the backend first.

It makes sense, the readiness for the front-end is dependent on the backend.

While it might not sound like a lot of work with two components, imagine when you have a complex collection of apps interacting together.

You might need to figure out what's **the correct sequence of releases to have your service running**.

That's not only impractical, it's also not feasible most of the time — particularly when you have circular dependencies.

In general, you shouldn't create dependencies between your apps.

Instead, you should make sure that apps are self-sufficient and they try to reconnect to their dependencies (perhaps with an exponential backoff strategy).

### Resources

- The official Kubernetes documentation offers some practical advices on how to [configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
- [Liveness probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html) has some advice on how to set (or not) dependencies in your readiness probes.

### Checklist

- [ ] The Readiness probes are independent
- [ ] The app retries connecting to dependent services

## Pods gracefully shut down

When a Pod is deleted you don't want to abruptly terminate all connections.

Instead, you should wait for the existing connection to drain and stop processing new ones.

You can be notifed when the Pod is about to be terminated by capturing the SIGTERM signal in your app.

Please notice that, when a Pod is terminated, the endpoints for that Pod are removed from the Service.

However, it might take some time before component such as kube-proxy or the Ingress controller are notified of the change.

Hence, traffic might still flow to the Pod despite it being marked as terminated.

In other words, you should:

- listen for the SIGTERM signal in your app
- process current connection
- wait "long enough" to process the few "late" incoming connections
- terminate the current process

### Resources

- You can find a detail explanation on how graceful shutdown works in [handling client requests properly with Kubernetes](https://freecontent.manning.com/handling-client-requests-properly-with-kubernetes/).
- You should also pay attention to [forwarding the signal to the right process in your container](https://pracucci.com/graceful-shutdown-of-kubernetes-pods.html).
- You might want to consider using the container lifecycle events such as [the preStop handler](https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/#define-poststart-and-prestop-handlers) to customise what happened before a Pod is deleted.

### Checklist

- [ ] The app doesn't shut down on SIGTERM, but it gracefully terminate connections
- [ ] The app still process incoming requests in the grace period
- [ ] The CMD in the `Dockerfile` forwards the SIGTERM to the process

## Fault tolerance

Your cluster nodes could disappear at any time for several reasons:

- a hardware failure of the physical machine
- cloud provider or hypervisor failure
- a kernel panic

Pods deployed in those nodes are lost.

Also, there are other scenarios where Pods could be deleted:

- directly deleting a pod (accident)
- draining a node
- removing a pod from a node to permit another Pod to fit on that node

Any of the above scenarios could affect the availability of your app and potentially cause downtime.

You should protect from a scenario where all of your Pods are made unavailble and you aren't able to serve live traffic.

### Resources

- The official documentation is an excellent place to start to understand [Pod Disruption Budgets](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/).
- You can find some practical scenarios and actionable advice on how to configure replicas, Pod Disruption Budgets and spreading your Pods in several nodes [in this article](https://cloudmark.github.io/Node-Management-In-GKE).
- The [inter-pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#inter-pod-affinity-and-anti-affinity) documentation describe how you can you could change your Pod to be located (or not) in the same node.

### Checklist

- [ ] Run at least three replicas for your Deployment
- [ ] Set up the Horizontal Pod Autoscaler
- [ ] Avoid Pods being places into a single node
- [ ] Set Pod disruption budgets

## Manage resource utilisation

Resource limits are used to constraint how much CPU and memory your containers can utilise and are set using the resources property of a `containerSpec`.

The scheduler uses those as one of metrics to decide which node is best suited for the current Pod.

You can think about the Kubernetes scheduler as a skilled Tetris player.

Docker containers are the blocks; servers are the boards, and the scheduler is the player.

![Kubernetes is the best tetris player](tetris.svg)

A container without a memory limit has memory utilisation of zero — according to the scheduler.

_Have you ever tried to play tetris when the blocks don't have width (CPU) and height (memory)?_

An unlimited number of Pods if schedulable on any nodes leading to resource overcommitment and potential node (and kubelet) crashes.

The same applies to CPU limits.

_But should you always set limits and requests for memory and CPU?_

Yes and no.

If your process goes over the memory limit, the process is terminated.

Since CPU is a compressable resource, if your container goes over the limit, the process is throttled.

Even if it could have used some of the CPU that was available at that moment.

> [CPU limits are hard.](https://www.reddit.com/r/kubernetes/comments/cmp7jj/multithreading_in_a_container_with_limited/ew52fcj/)

### Resources

- If you wish to dig deeper into CPU and memory limits you should check out the following articles:
  - [Understanding resource limits in kubernetes: memory](https://medium.com/@betz.mark/understanding-resource-limits-in-kubernetes-memory-6b41e9a955f9)
  - [Understanding resource limits in kubernetes: cpu time](https://medium.com/@betz.mark/understanding-resource-limits-in-kubernetes-cpu-time-9eff74d3161b)
- You can find a quick recap on th [best practices for requests and limits in this video](https://www.youtube.com/watch?v=xjpHggHKm78).
- Please note that if you are not sure what should be the _right_ CPU or memory limit, you can use the [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) in Kubernetes with the recommendation mode turned on. The autoscaler profiles your app and recommends limits for it.
- When a node goes into an overcommited state (i.e. using too many resources) Kubernetes tries to evict some of the Pod in that Node. Kubernetes ranks and evicts the Pods according to a well defined logic. You can find more about [configuring the quality of service for your Pods](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/) on the official documentation.

### Checklist

- [ ] Set memory limits and requests for all containers
- [ ] Set CPU request to 1 CPU or below
- [ ] Disable CPU limits — unless you have a good use case
- [ ] The namespace has a LimitRange with default values for memory and CPU
- [ ] Set an appropriate Quality of Service (QoS) for Pods
