**TL;DR:** here's a diagram to help you debug your deployments in Kubernetes.

![Flow chart to debug deployments in Kubernetes](diagram.png)

When you wish to deploy an application in Kubernetes, you usually define three components:

- a Deployment — which is a recipe for creating copies of your application called Pods
- a Service — an internal load balancer that routes the traffic to Pods
- an Ingress — a description of how the traffic should flow from outside the cluster to your Service.

Here's a quick visual recap.

```slideshow
{
  "description": "Kubernetes core concepts: Ingress, Service, Pod and Deployment.",
  "slides": [
    {
      "image": "core-concepts-1.svg",
      "description": "In Kubernetes your applications are exposed through two layers of load balancers: internal and external."
    },
    {
      "image": "core-concepts-2.svg",
      "description": "The internal load balancer is called Service, whereas the external one is called Ingress."
    },
    {
      "image": "core-concepts-3.svg",
      "description": "Pods are not deployed directly. Instead, the Deployment creates the Pods and whatches over them."
    }
  ]
}
```

Assuming you wish to deploy a simple _Hello World_ application, the YAML for such application should look similar to this:

```yaml|highlight=2,23,34|title=hello-world.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  labels:
    track: canary
spec:
  selector:
    matchLabels:
      name: app
  template:
    metadata:
      labels:
        name: app
    spec:
      containers:
      - name: app
        image: learnk8s/app:1.0.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: app
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    name: app
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: app
spec:
  rules:
  - http:
    paths:
    - backend:
        serviceName: app
        servicePort: 80
      path: /
```

The definition is quite long, and it's easy to overlook how the components related to each other.

For example:

- when should you use port 80 or port 8080?
- should you create a new port for every Service so that they don't clash?
- do label names matter? Should it be the same everywhere?

Before focusing on the debugging, let's recap how the three components link to each other.

Let's start with Deployment and Service.

## Connecting Deployment and Service

The surprising news is that Service and Deployment aren't connected at all.

Instead, the Service points the Pods directly and skips the Deployment all together.

So what you should pay attention to is how the Pods and the Service related to each other.

You should remember three things:

1. The Service selector should match the label of the Pod
1. The Service `targetPort` should match the `containerPort` of the container inside the Pod
1. The Service `port` can be any number. Multiple Service can use the same port because they have different IP addresses assigned.

The following diagram summarises the how to connect the ports:

```slideshow
{
  "description": "Connecting a Service and a Pod",
  "slides": [
    {
      "image": "ports-1.svg",
      "description": "Consider the following Pod exposed by a Service."
    },
    {
      "image": "ports-2.svg",
      "description": "When you create a Pod, you should define the port `containerPort` for each container in your Pods."
    },
    {
      "image": "ports-3.svg",
      "description": "When you create a Service, you can define a `port` and a `targetPort`. _But which one should you connect to the container?_"
    },
    {
      "image": "ports-4.svg",
      "description": "`targetPort` and `containerPort` should always match."
    },
    {
      "image": "ports-5.svg",
      "description": "If your container exposes port 3000, then the `targetPort` should match that number."
    }
  ]
}
```

If you look at the YAML, the labels and `ports`/`targetPort` should match:

```yaml|highlight=13-14,20,29,30-31|title=hello-world.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  labels:
    track: canary
spec:
  selector:
    matchLabels:
      name: app
  template:
    metadata:
      labels:
        name: app
    spec:
      containers:
      - name: app
        image: learnk8s/app:1.0.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: app
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    name: app
```

_What about the `track: canary` label at the top of the Deployment?_

_Should that match too?_

That labels belong to the deployment, and it's not used by the Service's selector to route traffic.

In other words, you can safely remove it or assign it a different value.

_Assuming that you made the correct change, how do you test it?_

You can check if the Pods have the right label with the following command:

```terminal|command=1|title=bash
kubectl get pods --show-labels
```

Or, if you have several labels:

```terminal|command=1|title=bash
kubectl get pods --selector name=app
```

Where `name=app` is the label `name: app`.

However, checking the label isn't enough.

You can use the `port-forward` command in kubectl to connect to the Service and test the connection.

```terminal|command=1|title=bash
kubectl port-forward service/<service name> 3000:80
```

Where:

- `service/<service name>` is the name of the service — in the current YAML is "app"
- 3000 is the port that you wish to open on your computer
- 80 is the port exposed by the Service in the `port` field

If you can connect, the setup is correct.

If you can't, you most likely misplaced a label or the port doesn't match.

## Connecting Service and Ingress

The next step in exposing your app is to configure the Ingress.

The Ingress has to know how to retrieve the Service to then retrieve the Pods and route traffic to them.

The Ingress retrieves the right Service by name and port exposed.

Two things should match in the Ingress and Service:

1. The `servicePort` in the Ingress and the `port` in the Service should match
1. The name of the Service should match the field `serviceName` in the Ingress

The following diagram summarises the how to connect the ports:

```slideshow
{
  "description": "Connecting an Ingress and a Service",
  "slides": [
    {
      "image": "ports-6.svg",
      "description": "You already know that the Service expose a `port`."
    },
    {
      "image": "ports-7.svg",
      "description": "The Ingress has a field called `servicePort`."
    },
    {
      "image": "ports-8.svg",
      "description": "The Service `port` and the Ingress `servicePort` should always match."
    },
    {
      "image": "ports-9.svg",
      "description": "If you decide to assign port 80 to the service, you should change `servicePort` to 80 too."
    }
  ]
}
```

In practice, you should look at these lines:

```yaml|highlight=4,7,21,22|title=hello-world.yaml
apiVersion: v1
kind: Service
metadata:
  name: app
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    name: app
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: app
spec:
  rules:
  - http:
    paths:
    - backend:
        serviceName: app
        servicePort: 80
      path: /
```

_How do you test that the Ingress works?_

You can use the same strategy as before with `kubectl port-forward`, but instead of connecting to a service, you should connect to the Ingress controller.

First, retrieve the Pod name for the Ingress controller with:

```terminal|command=1|title=bash
kubectl get pods --all-namespaces
NAMESPACE   NAME                              READY STATUS
kube-system coredns-5644d7b6d9-jn7cq          1/1   Running
kube-system etcd-minikube                     1/1   Running
kube-system kube-apiserver-minikube           1/1   Running
kube-system kube-controller-manager-minikube  1/1   Running
kube-system kube-proxy-zvf2h                  1/1   Running
kube-system kube-scheduler-minikube           1/1   Running
kube-system nginx-ingress-controller-6fc5bcc  1/1   Running
```

Identify the Ingress Pod (which might be in a different Namespace) and describe it to retrieve the port:

```terminal|command=1|title=bash
kubectl describe pod nginx-ingress-controller-6fc5bcc
 --namespace kube-system \
 | grep Ports
```

Finally, connect to the Pod:

```terminal|command=1|title=bash
kubectl port-forward nginx-ingress-controller-6fc5bcc 3000:80 --namespace kube-system
```

At this point, every time you visit port 3000 on your computer, the request is forwarded to port 80 on the Pod.

If you visit <http://localhost:3000>, you should find the app serving a web page.

## Recap on ports

Here's a quick recap on what ports and labels should match:

1. The Service selector should match the label of the Pod
1. The Service `targetPort` should match the `containerPort` of the container inside the Pod
1. The Service port can be any number. Multiple Service can use the same port because they have different IP addresses assigned.
1. The `servicePort` in the Ingress and the `port` in the Service should match
1. The name of the Service should match the field `serviceName` in the Ingress

Knowing how to structure your YAML definition is only part of the story.

_What happens when something goes wrong?_

Perhaps the Pod doesn't start, or it's crashing.

## 3 steps to troubleshoot Kubernetes deployments

It's essential to have a well defined mental model of how Kubernetes works before diving into debugging a broken deployment.

Since there're three components in every deployment, you should debug all of them in order, starting from the bottom.

1. You should make sure that your Pods are running then
1. Focus on getting the Service to route traffic to the Pods and then
1. Check that the Ingress is correctly configured

```slideshow
{
  "description": "Troubleshooting Kubernetes deployments",
  "slides": [
    {
      "image": "layers-1.svg",
      "description": "You should start troubleshooting your deployments from the bottom. First, check that the Pod is _Ready_ and _Running_."
    },
    {
      "image": "layers-2.svg",
      "description": "If the Pods is _Ready_, you should investigate if the Service can distribute traffic to the Pods."
    },
    {
      "image": "layers-3.svg",
      "description": "Finally, you should examine the connection between the Service and the Ingress."
    }
  ]
}
```

## 1. Troubleshooting Pods

Most of the time, the issue is in the Pod itself.

You should make sure that your Pods are running and _Ready_.

_How do you check that?_

```terminal|command=1|title=bash
kubectl get pods
NAME                    READY STATUS            RESTARTS  AGE
app1                    0/1   ImagePullBackOff  0         47h
app2                    0/1   Error             0         47h
app3-76f9fcd46b-xbv4k   1/1   Running           1         47h
```

In the above session, the first two Pods aren't _Running_ and _Ready_.

_How do you investigate on what went wrong?_

There are four useful commands to troubleshoot Pods:

1. `kubectl logs <pod name>` is helpful to retrieve the logs of the container
1. `kubectl describe pod <pod name>` is helpful to retrieve a list of events associated with the Pod
1. `kubectl get pod <pod name>` is helpful to extract the YAML file stored in Kubernetes
1. `kubectl exec -ti <pod name> bash` is helpful to run an interactive session within the container

_Which one should you use?_

There isn't a one-size-fits-all.

Instead, you should use a combination of them.

## Common Pods errors

Pods can have startup and runtime errors.

Startup errors include:

- ImagePullBackoff
- ImageInspectError
- ErrImagePull
- ErrImageNeverPull
- RegistryUnavailable
- InvalidImageName

Runtime errors include:

- CrashLoopBackOff
- RunContainerError
- KillContainerError
- VerifyNonRootError
- RunInitContainerError
- CreatePodSandboxError
- ConfigPodSandboxError
- KillPodSandboxError
- SetupNetworkError
- TeardownNetworkError

Some errors are more common than others.

The following is a list of the most common error and how you can fix them.

### ImagePullBackOff

The error appears when Kubernetes isn't able to retrieve the container for the Pods.

There are three common culprits:

1. The name of the image is invalid such as you misspelt the name
1. The tag for that container doesn't exist
1. The image that you're trying to retrieve belongs to a private registry, and Kubernetes doesn't have credentials to access it

In the first two cases, the issue can be solved by changing the name of the image (and tag).

For the latter, you should add the credentials to your private registry in a Secret and reference it in your Pods.

[The official documentation as an example about how you could to that.](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)

### CrashLoopBackOff

If the container can't start, then Kubernetes shows the CrashLoopBackOff message as a status.

Usually, a container can't start when:

1. There's an error in the application that prevents it from starting
1. You [misconfigured the container](https://stackoverflow.com/questions/41604499/my-kubernetes-pods-keep-crashing-with-crashloopbackoff-but-i-cant-find-any-lo)
1. The Liveness probe failed too many times

You should try and retrieve the logs from that container to investigate why it failed.

If you can't see the logs because your container is restarting too quickly, you can use the following command:

```terminal|command=1|title=bash
kubectl logs <pod-name> --previous
```

Which prints the error messages from the previous container.

### Pods in a pending state

When you create a Pod, the Pod stays in the _Pending_ state.

_Why?_

Assuming that your scheduler component is running fine, here are the causes:

1. The cluster doesn't have enough resources such as CPU and memory to run the Pod
1. The current Namespace has a ResourceQuota object and creating the Pod will make the Namespace go over the quota
1. The Pod is bound to a _Pending_ PersistentVolumeClaim

Your best option is to inspect the _Events_ section in the `kubectl describe` command:

```terminal|command=1|title=bash
kubectl describe pod <pod name>
```

For error that are created as a result of ResourceQuotas, you can inspect the logs of the cluster with:

```terminal|command=1|title=bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

### RunContainerError

The error appears when the container is unable to start.

That's even before the application inside the container starts.

The issue is usually due to misconfiguration such as:

- mounting a not existant volume such as ConfigMap or Secrets
- mounting a read-only volume as read-write

You should use `kubectl describe` to collect and analyse the error.

## Not Ready Pods

If a Pod is _Running_ but not _Ready_ it means that the Readiness probe is failing.

When the Readiness probe is failing, you the Pods isn't attached to the Service, and no traffic is forwarded to that instance.

A failing Readiness probe is an application-specific error, so you should inspect the _Events_ section in `kubectl describe` to identify the error.

## Troubleshooting Services

If you're Pods are _Running_ and _Ready_, but you're still unable to receive a response for your app, you should check if the Service is configured correctly.

Services are designed to route the traffic to Pods based on their labels.

So the first thing that you should check is how many Pods are target by the Service.

You can do so by checking the Endpoints in the Service:

```terminal|command=1|title=bash
kubectl describe service <service-name> | grep Endpoints
```

An endpoint is a pair of `<ip address:port>`, and there should be at least one — when the Service targets (at least) a Pod.

If the endpoints section is empty, there are two explanations:

1. you don't have any Pod running with the correct label (check the namespace)
1. the label doesn't exist

If you see a list of endpoints, but still can't route the traffic, then the `targetPort` in your service is the likely culprit.

_How do you test the Service?_

Regardless of the type of Service, you can use `kubectl-forward` to connect to it:

```terminal|command=1|title=bash
kubectl port-forward service/<service-name> 3000:80
```

Where:

- `<service-name>` is the name of the Service
- `3000` is the port that you wish to open on your computer
- `8080` is the port exposed by the Service

## Troubleshooting Ingress

If you've reached this section:

- the Pods are _Running_ and _Ready_
- the Service distributes the traffic to the Pod

But you still can't see a response from your cluster.

At this point, the Ingress is likely misconfigured.

Since the Ingress is a component that doesn't come by default in the cluster, there are different debugging techniques depending on the type of Ingress.

But before diving into Ingress specific tools, there's something straightforward that you could check.

The Ingress uses the `serviceName` and `servicePort` to connect to the Service.

You should check that those are correctly configured.

You can inspect that the Ingress is correctly configured with:

```terminal|command=1|title=bash
kubectl describe ingress <ingres-name>
```

If the _Backend_ column is empty, then there must be an error in the configuration.

If you can see the endpoints in the _Backend_ column, but still can't route the traffic, the issue is likely to be:

- how you exposed your Ingress to the public internet
- how you exposed your cluster to the public internet

You can isolate infrastructure issues from Ingress by connecting to the Ingress Pod directly.

First, retrieve the Pod for your Ingress controller (which could be located in a different namespace):

```terminal|command=1|title=bash
kubectl get pods --all-namespaces
NAMESPACE   NAME                              READY STATUS
kube-system coredns-5644d7b6d9-jn7cq          1/1   Running
kube-system etcd-minikube                     1/1   Running
kube-system kube-apiserver-minikube           1/1   Running
kube-system kube-controller-manager-minikube  1/1   Running
kube-system kube-proxy-zvf2h                  1/1   Running
kube-system kube-scheduler-minikube           1/1   Running
kube-system nginx-ingress-controller-6fc5bcc  1/1   Running
```

Describe it to retrieve the port:

```terminal|command=1|title=bash
kubectl describe pod nginx-ingress-controller-6fc5bcc
 --namespace kube-system \
 | grep Ports
```

Finally, connect to the Pod:

```terminal|command=1|title=bash
kubectl port-forward nginx-ingress-controller-6fc5bcc 3000:80 --namespace kube-system
```

At this point, every time you visit port 3000 on your computer, the request is forwarded to port 80 on the Pod.

_Does it works now?_

- Yes, it worked! The issue is in the infrastructure. You should investigate how the traffic is routed to your cluster.
- No, it doesn't work. The issue is in the Ingress controller. You should debug the Ingress

If you still can't get the Ingress controller to work, you should start debugging it.

Please notice that the Ingress controller comes in a different version.

Popular options include Nginx, HAProxy, Traefik, etc.

You should consult the official documentation for the project to find a troubleshooting guide specific to your Ingress controller.

Since [Nginx-Ingress](https://github.com/kubernetes/ingress-nginx) is the most popular Ingress, we included a few tips below.

### Debugging Nginx

The Ingress-nginx project has an [official plugin for Kubectl](https://kubernetes.github.io/ingress-nginx/kubectl-plugin/).

You can use `kubectl ingress-nginx` to:

- inspect logs, backends, certs, etc.
- connect to the Ingress
- examine the current configuration

The three commands that you should try are:

- `kubectl ingress-nginx lint`, which checks the `nginx.conf`
- `kubectl ingress-nginx backend`, to inspect the backend (similar to `kubectl describe ingress <ingress-name>`)
- `kubectl ingress-nginx logs`, to check the logs

> Please notice that you might need to specify the correct namespace for your Ingress controller with `--namespace <name>`.