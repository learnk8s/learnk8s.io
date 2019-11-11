# Kubernetes best practices

## Defining resource objects

### All resources have a common set recommended labels

#### What?

The [Kubernetes documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/) recommends a set of common labels to be applied to all resource objects.

#### Why?

Having a set of common labels allows third-party tools to interoperate with the resources in your cluster. Furthermore, a common set of labels facilitates and standardises manual management of the resources.

#### How?

The recommended labels are:

- `app.kubernetes.io/name`: the name of the application
- `app.kubernetes.io/instance`: a unique name identifying the instance of an application
- `app.kubernetes.io/version`: the current version of the application (e.g., a semantic version, revision hash, etc.)
- `app.kubernetes.io/component`: the component within the architecture
- `app.kubernetes.io/part-of`: the name of a higher level application this one is part of
- `app.kubernetes.io/managed-by`: the tool being used to manage the operation of an application

Here is an example of applying these labels to a StatefulSet resource:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: mysql
    app.kubernetes.io/instance: wordpress-abcxzy
    app.kubernetes.io/version: "5.7.21"
    app.kubernetes.io/component: database
    app.kubernetes.io/part-of: wordpress
    app.kubernetes.io/managed-by: helm
```

Note that depending on the application, only some of these labels may be defined (for example, `app.kubernetes.io/name` and `app.kubernetes.io/instance`), but they should be applied to _all_ resource objects.

#### References

- [Kubernetes documentation: Recommended Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/)

## Compute resource management

Manage the compute resource usage (CPU and memory) of the workloads in your cluster.

### All containers have defined resource requests and limits (memory and CPU)

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
