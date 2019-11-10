# Kubernetes best practices

## Resource management

Manage the resource usage (CPU and memory) of the workloads in your cluster.

### Set resource requests and limits (memory and CPU) for all containers of all pods

#### What?

In a pod specification, you can set a "request" and a "limit" for all supported physical resources (currently memory and CPU) for all containers of the pod.

#### Why?

The **request** for a resource is the minimum amount of the resource the container needs for running. It influences the scheduling decision of the Kubernetes scheduler (the scheduler schedules a pod only to a node that has enough free resources to accommodate the requests of all the containers of the pod).

The **limit** for a resource is the maximum amount of the resource that the container is allowed to use (you can think of it as an upper cap for resource usage bursts). What happens when a container reaches the limit, depends on the type of resource:

- For memory, the container is killed and restarted
- For CPU, the container is throttled (TODO: what does "throttled" mean exactly?)

By default, no resource requests and limits are set, which means that the scheduler schedules a pod to any node and there's no limit of how much resources a pod may use on a node.

Setting a request and limit for both the memory and CPU resources ensures that:

1. All pods are able to run, because they are only scheduled to nodes that have the amount of free resources that they need
1. Pods are prevented from monopolising all the resources on a given node for themselves

#### How?

By setting the [`pod.spec.containers[].resources`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#resourcerequirements-v1-core) field of a pod specification:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test
spec:
  # ...
    spec:
      containers:
      - image: nginx
        name: nginx
        resources:
          requests:
            memory: 100Mi
            cpu: 100m
          limits:
            memory: 400Mi
            cpu: 800m
```

The amounts for memory are measured in bytes and can have [M, Mi, K, Ki, etc. suffixes](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) with their common meanings.

The amounts for CPU are measured in fractions of CPU time of a single CPU core and can be noted as [integers with SI suffixes](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) (`100m` means 100 milli-units which is equivalent to 0.1).

#### References

- [Kubernetes documentation: Managing Compute Resources for Containers](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

## Scheduling constraints

Influence the Kubernetes scheduler's decision to which nodes to schedule pods.

## Availability

Make sure your applications stay available and responsive at all times.
