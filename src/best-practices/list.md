# Kubernetes best practices

Are you following the best practices?

## Configure the health checks

Kubernetes offers two mechanisms to track the lifecycle of your containers and Pods: liveness and readiness probes.

The readiness probe determines when a container can receive traffic.

The kubelet executes the checks and decides if the app can receive traffic or not.

The liveness probe determines when a container should be restarted.

The kubelet executes the check and decides if the container should be restarted.

Please note that there's no default value for readiness and liveness.

If you don't set the readiness probe, the kubelet assumes that the app is ready to receive traffic as soon as the container starts.

If the container takes 2 minutes to start, all the requests to it will fail for those 2 minutes.

Omitting the liveness probe won't cause as much troubles.

The probe is designed to restart your container when it's stuck due to edge-case scenarios such as a dead-lock.

_But if you can detect the deadlock and signal a failing liveness probe, why not fixing the deadlock in the first place?_

It's a fair question, and that's perhaps the reason why liveness probes are generally not recommended.

Instead your should let your app crash.

Kubernetes will restart your container and you can start fresh.

### References

- [Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Liveness probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html)"
- [10 Ways to Shoot Yourself in the Foot with Kubernetes, #9 Will Surprise You - Laurent Bernaille](https://www.youtube.com/watch?v=QKI-JRs2RIE)

### Checklist

- [ ] Containers have readiness probes
- [ ] Avoid using the liveness probe (if you can)
- [ ] Don't use `exec` for your probes

## Make your apps dependency free

You might be tempted to signal the readiness of your app only if all of the dependencies such as databases or backend API are also ready.

If the app connects to a database, you might think that returning a failing readiness probe until the database is available is a good idea — it is not.

Consider the following scenario: you have one front-end app that depends on a backend API.

If the API is flaky (e.g. it's unavailable from time to time due to a bug), the readiness probe fails, and the dependent readiness in the front-end app fail as well.

And you have downtime.

More in general, a failure in a dependecy downstream could propagate to all apps upstream and eventually bring down your front-end facing layer as well.

But it doesn't stop there.

You can't deploy the front-end unless you deploy the backend first.

And you can't deploy an upgrade of the front-end unless you upgrade the backend first.

While it might not sound like a lot of work with two components, imagine when you have a complex collection of apps interacting together.

You shouldn't create dependencies between your apps.

### References

- [Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Liveness probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html)

### Checklist

- [ ] The Readiness probes is independent
- [ ] The app retries connecting to dependent services

## Gracefully shutdown apps

When a Pod is deleted you don't want to abruptly terminate all the live connections.

Instead, you should wait for the existing connection to drain and stop processing new ones.

In Kubernetes, when a Pod is terminated, the endpoints for that Pod are removed from the Service.

However, it might take some time before component such as kube-proxy or the Ingress controller are notified of the change.

Hence, traffic might still flow to the Pod despite it being marked as terminated.

> You might want to consider using the container lifecycle events such as [the preStop handler](https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/#define-poststart-and-prestop-handlers) to customise what happened after a Pod is deleted

### References

- [Handling Client Requests Properly with Kubernetes](https://freecontent.manning.com/handling-client-requests-properly-with-kubernetes/)
- [Graceful shutdown of pods with Kubernetes](https://pracucci.com/graceful-shutdown-of-kubernetes-pods.html)"

### Checklist

- [ ] The app doesn't shut down on SIGTERM, but it waits
- [ ] The CMD in the `Dockerfile` forwards the SIGTERM to the process
