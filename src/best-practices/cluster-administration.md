# Cluster administration

Are you following the best practices?

## Define namespace limits

Cluster administrators can set constraints to limit the number of objects or amount of compute resources that are used in your project with quotas and limit ranges.

Containers without limits can lead to resource contention with other containers and unoptimized consumption of compute resources.

You should ensure all containers are allotted the _right_ amount of resources.

Kubernetes has two feature to constraing resource utilisation: ResourceQuota and LimitRange.

With the LimitRange object you can define default values for resource requests and limits for individual containers inside namespaces.

Any container created inside that namespace, without request and limit values explicitly specified, is assigned the default values.

Instead, with ResourceQuotas, you can limit the total resource consumption of all containers inside a Namespace.

Defining a resource quota for a namespace limits the total amount of CPU, memory or storage resources that can be consumed by all containers belonging to that namespace.

You can also set quotas for other Kubernetes objects such as the number of Pods in the current namespace.

### References

- [Resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [Limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

### Checklist

- [ ] Namespaces have LimitRage
- [ ] Namespaces have ResourceQuotas
