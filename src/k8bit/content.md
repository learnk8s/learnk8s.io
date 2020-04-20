When you want to verify that a Pod is _Running_ in your cluster, you might have used commands such as `kubectl get pods` or `kubectl describe pod`.

Those commands are short and straightforward, _but what do they do?_

The `kubectl` command line is a wrapper around [the Kubernetes API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/).

While you type the commands, `kubectl` goes through the following steps:

- Validates that the current resource is valid.
- Uses [generators](https://kubernetes.io/docs/user-guide/kubectl-conventions/#generators) to serialise the resources (if any).
- [Scans the cluster APIs for the right endpoint to call](https://github.com/kubernetes/kubernetes/blob/v1.14.0/pkg/kubectl/cmd/run/run.go#L674-L686) and [assembles a client that talk to that particular version](https://github.com/kubernetes/kubernetes/blob/v1.14.0/pkg/kubectl/cmd/run/run.go#L705-L708).
- Authenticates with the API using your kubeconfig credentials.

_But do you need all of those if you wish to issue a `kubectl get pods`?_

Let's try to replicate the same functionality with `curl`.

Since the authentication is out of scope for this article, you will cheat and connect to the Kubernetes API directly with:

```terminal|command=1|title=bash
kubectl proxy
Starting to serve on 127.0.0.1:8001
```

The command creates a proxy on port 8001.

You can test that the authentication and the API server work, by issuing a request in another terminal:

```terminal|command=1|title=bash
curl localhost:8001
{
  "paths": [
    "/api",
    "/api/v1",
    "/apis",
    "/apis/",
    "/apis/admissionregistration.k8s.io",
    "/apis/admissionregistration.k8s.io/v1",
    // more APIs ...
  ]
}
```

The amount of endpoints is overwhelming, so don't worry if you don't understand all of them.

If you wish to retrieve all Pods in the _default_ namespace, you can issue the following command:

```terminal|command=1|title=bash
curl localhost:8001/api/v1/namespaces/default/pods
```

The output is, _again_, verbose.

It should look like this:

```json|title=pods-response.json
{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "selfLink": "/api/v1/namespaces/default/pods",
    "resourceVersion": "417662"
  },
  "items": [
    /* Pods */
  ]
}
```

The output is similar to `kubectl get pods`, but it's cluttered with extra fields that you might not care about.

You can make the output closer to `kubectl get pods` by parsing and formatting the output with `jq` — [a JSON processor](https://stedolan.github.io/jq/):

```terminal|command=1|title=bash
curl localhost:8001/api/v1/namespaces/default/pods \
  jq ".items[].metadata.name"
```

The output is a list of pods in the _default_ namespace, just like `kubectl get pods`.

Let's see what else you can do with the API.

_Can you retrieve the logs of a Pod using only the API?_

You can — if you know the URL that you should use.

Memorising REST API is hard, so I don't expect you to know this.

However, you can use the official documentation to look for the right endpoint and arguments.

Take a look at [what the documentation says for the logs command](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#read-log-pod-v1-core).

So you can copy the url and test it with:

```terminal|command=1|title=bash
curl localhost:8001/api/v1/namespaces/default/pods/my-pod/log
Webserver listening on port 8080
```

Great, it worked!

And you can use the same API to query Service, Ingresses, DaemonSets, StatefulSets, etc.

Now that you know the basics of how the Kubernetes API work, it's time explore more advanced usages.

## Watch out for changes

In kubectl, you can monitor changes to Pods in real-time with the `--watch` flag like this:

```terminal|command=1|title=bash
kubectl get pods --watch
```

_Can you do the same using `curl`?_

_How does the `--watch` flag work?_

It turns out that the watch flag is an extra argument that you can pass to your request.

```terminal|command=1|title=bash
curl localhost:8001/api/v1/namespaces/default/pods?watch=1
```

But notice how, this time, the request does not complete and hangs.

_Why?_

In another terminal, create a Pod in the _default_ namespace with:

```terminal|command=1|title=bash
kubectl run random-pod --image=nginx --restart=Never
```

Observe the previous command.

There's output this time! — and a lot of it.

```json|title=output.json
{"type":"ADDED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
```

_What happens when you change the image for that Pod?_

Let's try:

```terminal|command=1|title=bash
kubectl set image pod/my-pod my-pod=busybox
```

There's another entry in the watch output:

```json|highlight=2|title=output.json
{"type":"ADDED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
{"type":"MODIFIED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
```

You can already guess what happens when you delete the Pod with:

```terminal|command=1|title=bash
kubectl delete pod my-pod
```

The output from the watch command has another entry:

```json|highlight=3|title=output.json
{"type":"ADDED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
{"type":"MODIFIED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
{"type":"DELETED","object":{"kind":"Pod","apiVersion":"v1",/* more json */}}
```

In other words, every time you use the `watch=1` query string, you can expect:

1. The request to hang.
1. An update every time a Pod is added, deleted or modified.

And every update is a JSON response delimited by a new line — nothing complicated.

There are three events created:

1. The **ADDED** event is fired when a new resource is created.
1. The **MODIFIED** event is fired when an existing resource is changed.
1. The **DELETED** event is fire when the resource is removed from etcd.

You could use the events above to track changes in real-time to your Pods.

## Building a real-time dashboard for Pods

Imagine you want to build a real-time dashboard that tracks the location of your Pods in your Nodes.

It could look like something like this:

![K8bit — the tiny Kubernetes dashboard](preview.gif)

When a new Pod is added, a green block is created in a Node.

When an existing Pod is deleted, a green block is removed from a Pod.

_How do you track changes to Pods?_

As you probably guessed, you could use the `watch` query string and receive timely updates about Pods added or deleted.

The code in Javascript could look like this:

```javascript|title=dashboard.js
fetch(`/api/v1/pods?watch=1`).then((response) => {
  /* read line and parse it to json */
})
```

The code is remarkably similar to the curl command discussed earlier.

There's only one issue: the code above only returns deltas and not the full list of Pods.

It makes sense.

The watch flag is streaming updates and not the full list of Pods.

But when you launch the dashboard, you want to see the existing Pods.

_How can you achieve that?_

You could issue a request to list all the Pods first, and then use the watch API to update your list incrementally.

If you were to use `curl`, the above logic translates to the following commands:

```terminal|command=1,3|title=bash
curl localhost:8001/api/v1/pods
# retrieve all pods
curl localhost:8001/api/v1/pods?watch=1
# retrieve incremental updates
```

The code for the dashboard could look like this:

```javascript|highlight=1|title=dashboard.js
fetch('/api/v1/pods')
  .then((response) => response.json())
  .then((response) => {
    // The response is a PodList
    const pods = response.items
    console.log('EXISTING PODS: ', pods)
  })
  .then(() => {
    fetch(`/api/v1/pods?watch=1`).then((response) => {
      /* read line and parse it to json */
      console.log('POD EVENT: ', event)
    })
  })
```

That's great, but if you run the above code, you might notice that there's something odd:

```highlight=4,7|title=output
EXISTING PODS:
nginx-deployment-66df5b97b8-fxl7t
nginx-deployment-66df5b97b8-fxxqd
nginx-deployment-66df5b97b8-lvr2l

POD EVENT:
ADDED, nginx-deployment-66df5b97b8-lvr2l
MODIFIED, nginx-deployment-66df5b97b8-lvr2l
```

There's a Pod that is listed twice!

_Isn't the watch API only supposed to track deltas and not existing Pods?_

The watch API tracks only deltas and [it has a memory of 5 minutes](https://kubernetes.io/docs/reference/using-api/api-concepts/#efficient-detection-of-changes).

So you could receive updates for Pods that were created or deleted up to 5 minutes ago.

_How do you track only **new** changes reliably?_

Every Kubernetes object has a [`resourceVersion` field that represents the version of the resource in the cluster](https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions).

You can inspect the field in your existing cluster with:

```terminal|command=1|title=bash
kubectl get pod <my-pod> -o=jsonpath='{.metadata.resourceVersion}'
464927
```

The resource version is incremental and it is included in the events from the watch API:

```title=output
POD EVENT:
ADDED, nginx-deployment-66df5b97b8-lvr2l (resourceVersion: 11884)
MODIFIED, nginx-deployment-66df5b97b8-lvr2l (resourceVersion: 11885)
```

When you list all your Pods, the same `resourceVersion` is included in the response too:

```terminal|command=1|title=bash
curl localhost:8001/api/v1/pods | jq ".metadata.resourceVersion"
12031
```

You can think about the resource version number as a timeline.

As objects are created in the cluster, the number is increased.

The same number can be used to retrieve the state of the cluster in a given point in time.

You could list all the Pods when the `resourceVersion` number `12031` with:

```terminal|command=1|title=bash
curl localhost:8001/api/v1/pods?resourceVersion=12031
# ... PodList response
```

The `resourceVersion` could help you fix the delta stream in your code.

Here's what should happen:

1. The first request retrieves all the Pods and saves the `resourceVersion`.
1. You start the Watch API from the `resourceVersion` that you just kept.

The code should change to something like this:

```javascript|highlight=7,10|title=dashboard.js
fetch('/api/v1/pods')
  .then((response) => response.json())
  .then((response) => {
    // The response is a PodList
    const pods = response.items
    console.log('EXISTING PODS: ', pods)
    return response.metadata.resourceVersion
  })
  .then((resourceVersion) => {
    fetch(`/api/v1/pods?watch=1&resourceVersion=${resourceVersion}`).then((response) => {
      /* read line and parse it to json */
      console.log('POD EVENT: ', event)
    })
  })
```

The code now works as expected and there are no duplicate Pods.

If you add or delete a Pod in the cluster, you should be able to see an update in your Javascript code.

Since every Pod exposes a `.spec.nodeName` field with the name of the Pod, you could use that to construct a pair pod - node.

Please note that the current code is missing:

- A friendly user interface.
- A fallback and retry if the request is terminated prematurely.
- The code to parse incoming line updates as JSON.

Since most of those tasks are not related to Kubernetes, they are omitted here [you can find them here](https://github.com/learnk8s/k8bit).

The entire program is no more than ~130 lines of code.

## Watching APIs in the real world

You can imagine that the same logic could be extended to other Kubernetes resources.

And since the pattern of listing and watching for updates is so popular, the Kubernetes community came up with a pattern that combines the two operations called the [shared Informer](https://gianarb.it/blog/kubernetes-shared-informer).

A shared informer encapsulates:

1. The initial request to retrieve a list of resources.
1. A Watch API request that starts from the previous `resourceVersion`.
1. An efficient cache mechanism to store the resources locally in a dictionary.

You can find an example of the shared informer in several programming languages:

- [Go](https://gianarb.it/blog/kubernetes-shared-informer)
- [Javascript/Typescript](https://github.com/kubernetes-client/javascript/blob/ced85fc4783d95fd0e944f88d98a576e1f55746a/examples/typescript/informer/informer.ts)
- [Java](https://developers.redhat.com/blog/2019/10/07/write-a-simple-kubernetes-operator-in-java-using-the-fabric8-kubernetes-client/)
- [Python (in progress)](https://github.com/kubernetes-client/python/issues/868)
- [C# (in progress)](https://github.com/kubernetes-client/csharp/pull/394)

## Summary

TODO
