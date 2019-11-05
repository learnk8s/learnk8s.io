# Governance

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

If you're thinking that someone could exploit your cluster and create 20000 ConfigMaps, using the LimitRange is how you can prevent that.

### References

- [Resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [Limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

### Checklist

- [ ] Namespaces have LimitRage
- [ ] Namespaces have ResourceQuotas

## Define Pod security policies

Pod Security Policies are cluster-wide resources that control what policies a Pod must comply with to be accepted into the cluster.

For example you can use Kubernetes Pod security policies for restricting:

- Access the host process or network namespace
- Running privileged containers
- The user that the container is running as
- Access the host filesystem
- Linux capabilities, Seccomp or SELinux profiles

Choosing the right level of security depends on the nature of your cluster.

Please note that you can't set Pod Security Policies on a per namespace basis.

### References

- [Kubernetes Pod Security Policy Best Practices](https://resources.whitesourcesoftware.com/blog-whitesource/kubernetes-pod-security-policy)
- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

### Checklist

- [ ] Enable Pod Security Policies
- [ ] Disable privileged containers
- [ ] Use a read-only filesystem in containers
- [ ] Prevent privilege escalation
- [ ] Prevent containers from running as root

## Define network policies

A Kubernetes network must adhere to three basic rules:

1. **containers can talk to any other container in the network**, and there's no translation of addresses in the process — i.e. no NAT is involved
1. **nodes in the cluster can talk to any other container in the network and vice-versa**. Even in this case, there's no translation of addresses — i.e. no NAT
1. **a container's IP address is always the same**, independently if seen from another container or itself.

The first rule isn't helping if you plan to segregate your cluster in smaller chunks and have isolation between namespaces.

You can define how Pods should be allowed to communicate in the current namespace and cross-namespace using Network Policies.

Kubernetes network policies specify the access permissions for groups of pods, much like security groups in the cloud are used to control access to VM instances.

### References

- [Kubernetes Pod Security Policy Best Practices](https://resources.whitesourcesoftware.com/blog-whitesource/kubernetes-pod-security-policy)
- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

### Checklist

- [ ] Enable network policies
- [ ] There's at least a deny-all policy in the namespace

## Define Role Based Access Control (RBAC) policies

Role Based Access Control (RBAC) allows you to define policies on how to access resources in your cluster.

It's common practice to give away the least permission needed, _but what is practical and how do you quantify least privilige?_

_Should you create a single policy per namespace and share it?_

_Or perhaps it's better to have them on a more granular basis?_

There's no one-size fits all approach, and you should judge your requirements case by case.

_But where do you start?_

If you start with a Role with empty rules, you can add all the resources that you need one by one and still be sure that you're not giving away too much.

If you're giving away as much access as possible, remember that there're some resources that you most likely don't want to be accessed:

- **LimitRanges.** A user could remove or set the limits to zero and bypass the standard limits
- **ResourcesQuota.** You really don't want your user to change the limits of resources that they can utilise
- **Secrets.** They should be read only only to a restricted set of ServiceAccounts
- **ServiceAccounts.** Users shouldn't be allowed to create more ServiceAccounts
- **Namespaces.** Users shouldn't be allowed to edit the current namespace

### References

- [3 Realistic Approaches to Kubernetes RBAC](https://thenewstack.io/three-realistic-approaches-to-kubernetes-rbac/)
- [How to: RBAC best practices and workarounds](http://docs.heptio.com/content/tutorials/rbac.html)
- [Privilege Escalation Prevention and Bootstrapping](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#privilege-escalation-prevention-and-bootstrapping)

### Checklist

- [ ] Prevent users from writing LimitRanges
- [ ] Prevent users from writing ResourcesQuotas
- [ ] Prevent users from reading and writing Secrets
- [ ] Prevent users from writing ServiceAccounts
- [ ] Prevent users from editing Namespaces
- [ ] Prevent users from editing NetworkPolicies
- [ ] Don't use the default ServiceAccount, prefer individual ServiceAccounts

## Define custom policies

Even if you're able to assign policies in your cluster to resources such as Secrets and ServiceAccounts, there are some cases where Role Based Access Control (RBAC) falls short.

As an example, you might want to avoiding downloading containers from the public internet and prefer to approve those containers first.

Perhaps you have an internal registry and only the images in this registry can be deployed in your cluster.

_How do you enforce that only _trusted_ containers can be deployed in the cluster?_

There's no RBAC policy for that.

You could use the [Admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) to vet resources that are submitted to the cluster.

Since setting up and wiring those controllers is tedious, there're tools that you can install in the cluster designed to simplify the process.

One of such tools is the [Open Policy Agent](https://www.openpolicyagent.org/).

You can use the Open Policy Agent to write custom policy rules and validate and mutate resources before they are stored in the cluster.

### References

- [Kubernetes Pod Security Policy Best Practices](https://resources.whitesourcesoftware.com/blog-whitesource/kubernetes-pod-security-policy)
- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

### Checklist

- [ ] Allow deploying containers only from known registries
- [ ] Enforce uniqueness in Ingress hostnames
- [ ] Only use approved domain names in the Ingress hostnames
