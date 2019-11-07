# Governance

Are you following the best practices?

## Define namespace limits

When you decide to segregate your cluster in namespaces, you should protect against misuses in resources.

You shouldn't allow your user to use more resources than what you agreed in advance.

Cluster administrators can set constraints to limit the number of objects or amount of computing resources that are used in your project with quotas and limit ranges.

Containers without limits can lead to resource contention with other containers and unoptimized consumption of computing resources.

Kubernetes has two feature to constraining resource utilisation: ResourceQuota and LimitRange.

With the LimitRange object, you can define default values for resource requests and limits for individual containers inside namespaces.

Any container created inside that namespace, without request and limit values explicitly specified, is assigned the default values.

Instead, with ResourceQuotas, you can limit the total resource consumption of all containers inside a Namespace.

Defining a resource quota for a namespace limits the total amount of CPU, memory or storage resources that can be consumed by all containers belonging to that namespace.

You can also set quotas for other Kubernetes objects such as the number of Pods in the current namespace.

If you're thinking that someone could exploit your cluster and create 20000 ConfigMaps, using the LimitRange is how you can prevent that.

### Resources

- You should check out the official documentation if you need a refresher on [resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/) and [limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

### Checklist

- [ ] Namespaces have LimitRage
- [ ] Namespaces have ResourceQuotas

## Define Pod security policies

When a Pod is deployed into the cluster, you should guard against:

- the container being compromised
- the container using resources on the node that shouldn't use such as process, network or file system

More in general, you should restrict what the Pod can do to the bare minimum.

Kubernetes has Pod Security Policies — cluster-wide resources that control what policies a Pod must comply with to be accepted into the cluster.

For example, you can use Kubernetes Pod security policies for restricting:

- Access the host process or network namespace
- Running privileged containers
- The user that the container is running as
- Access the host filesystem
- Linux capabilities, Seccomp or SELinux profiles

Choosing the right policy depends on the nature of your cluster.

### Resources

- If you are not familiar with [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/), the official documentation gives an excellent head start.
- If you wish to learn about Pod Security Policies (PSPs) with hands-on examples, [you should check out this article](https://sysdig.com/blog/kubernetes-security-guide/).
- The following article explains some of the [Kubernetes Pod Security Policy best practices](https://resources.whitesourcesoftware.com/blog-whitesource/kubernetes-pod-security-policy)

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

_Imagine if a user in your cluster were able to use any other service in the cluster._

Now, _imagine if a malicious user in the cluster were to obtain access to the cluster_ — they could make requests to the whole cluster.

To fix that, you can define how Pods should be allowed to communicate in the current namespace and cross-namespace using Network Policies.

Kubernetes network policies specify the access permissions for groups of pods, much like security groups in the cloud are used to control access to VM instances.

### Resources

- [Kubernetes Pod Security Policy Best Practices](https://resources.whitesourcesoftware.com/blog-whitesource/kubernetes-pod-security-policy)
- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

### Checklist

- [ ] Enable network policies
- [ ] There's a conservative NetworkPolicy in every namespace

## Define Role-Based Access Control (RBAC) policies

Role-Based Access Control (RBAC) allows you to define policies on how to access resources in your cluster.

It's common practice to give away the least permission needed, _but what is practical and how do you quantify the least privilege?_

_Should you create a single policy per namespace and share it?_

_Or perhaps it's better to have them on a more granular basis?_

There's no one-size-fits-all approach, and you should judge your requirements case by case.

_But where do you start?_

If you start with a Role with empty rules, you can add all the resources that you need one by one and still be sure that you're not giving away too much.

If you're giving away as much access as possible, remember that there're some resources that you most likely don't want to be accessed:

- **LimitRanges.** A user could remove or set the limits to zero and bypass the standard limits
- **ResourcesQuota.** You don't want your user to change the limits of resources that they can utilise
- **Secrets.** They should be read-only only to a restricted set of ServiceAccounts
- **ServiceAccounts.** Users shouldn't be allowed to create more ServiceAccounts
- **Namespaces.** Users shouldn't be allowed to edit the current namespace
- **Network Policies.** Users shouldn't be allowed to relax the rules and reach the rest of the containers in the cluster.

### Resources

- [How to: RBAC best practices and workarounds](http://docs.heptio.com/content/tutorials/rbac.html)
- [Privilege Escalation Prevention and Bootstrapping](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#privilege-escalation-prevention-and-bootstrapping)
- It's challenging to find good advice on how to set up your RBAC rules. In [3 realistic approaches to Kubernetes RBAC](https://thenewstack.io/three-realistic-approaches-to-kubernetes-rbac/), you can find three practical scenarios and practical advice on how to get started.
- Please note that [the default ServiceAccount is automatically mounted into the file system of all Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server). You might want to disable that and provide more granular policies.

### Checklist

- [ ] Disable auto-mounting of the default ServiceAccount
- [ ] RBAC policies are set to the least amount of privileges necessary
- [ ] RBAC policies are granular and not shared

## Define custom policies

Even if you're able to assign policies in your cluster to resources such as Secrets and Pods, there are some cases where Pod Security Policies (PSPs), Role-Based Access Control (RBAC), and Network Policies fall short.

As an example, you might want to avoid downloading containers from the public internet and prefer to approve those containers first.

Perhaps you have an internal registry, and only the images in this registry can be deployed in your cluster.

_How do you enforce that only \_trusted_ containers can be deployed in the cluster?\_

There's no RBAC policy for that.

Network policies won't work.

_What should you do?_

You could use the [Admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) to vet resources that are submitted to the cluster.

Since setting up and wiring those controllers is tedious, there're tools that you can install in the cluster designed to simplify the process.

One of such tools is the [Open Policy Agent](https://www.openpolicyagent.org/).

You can use the Open Policy Agent to write custom policy rules and validate and mutate resources before they are stored in the cluster.

### Resources

- The best way to get started with custom admission controllers it the Open Policy Agent. On the official website, you can find [a tutorial on how to secure your Ingress resources](openpolicyagent.org/docs/latest/kubernetes-tutorial/) and make sure that they are whitelisted and unique.
- At the moment of writing, there is no open-source list of standard rego policies for Kubernetes.

### Checklist

- [ ] Allow deploying containers only from known registries
- [ ] Enforce uniqueness in Ingress hostnames
- [ ] Only use approved domain names in the Ingress hostnames
