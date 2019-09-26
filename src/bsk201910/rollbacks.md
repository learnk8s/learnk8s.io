[TODO: Nice intro]

Even if you use techniques such as Rolling updates, Canary and Blue-green Deployments, there's still risk that your application doesn't work the way you expect.

**When you introduce a change that breaks production, you should have a plan to roll back that change.**

Kubernetes and `kubectl` offer a simple mechanism to roll back changes to resources such as Deployments.

But before talking about rollbacks, you should learn an important detail about Deployments.

You learned how Deployments are responsible for gradually rolling out new versions of your Pods without causing any downtime.

You are also familiar with the fact that Kubernetes watches over the number of replicas in your deployment.

_If you asked for 5 Pods but have only 4, Kubernetes creates one more._

_If you asked for 4 Pods, but you have 5, Kubernetes deletes one of the running Pods._

Since the replicas is a field in the Deployment, you might be tempted to conclude that is the Deployment's job to count the number of Pods and create or delete them.

_This is not the case, unfortunately._

**Deployments delegate counting Pods to another component called the ReplicaSet.**

Every time you create a Deployment, the deployment creates a ReplicaSet and delegates creating (and deleting) the Pods.

```slideshow
{
  "description": "Deployments don't create Pods. ReplicaSets do.",
  "slides": [
    {
      "image": "assets/replicaset-2.svg",
      "description": "Let's focus on a Deployment."
    },
    {
      "image": "assets/replicaset-3.svg",
      "description": "You might be tempted to think that Deployments are in charge of creating Pods."
    },
    {
      "image": "assets/replicaset-4.svg",
      "description": "The Deployment doesn't create Pods. Instead it creates another object called ReplicaSet."
    },
    {
      "image": "assets/replicaset-5.svg",
      "description": "The Deployment passes the spec (which includes the replicas) to the ReplicaSet."
    },
    {
      "image": "assets/replicaset-6.svg",
      "description": "The ReplicaSet is in charge of creating the Pods and watching over them."
    }
  ]
}
```

_But why isn't the Deployment creating the Pods?_

_Why does it have to delegate that task to someone else?_

Let's consider the following scenario.

You have a Deployment with a container on version 1 and three replicas.

You change the spec for your template and upgrade your container from version 1 to version 2.

**The ReplicaSet can hold only a single type of Pod.**

So you can't have version 1 and version 2 of the Pods on the same ReplicaSet.

The Deployment knows that the two Pods can't coexist on the same ReplicaSet, so it creates a second ReplicaSet to hold version 2.

Then gradually it decreases the count of replicas from the previous ReplicaSet and increases the count on the current one until the latter ReplicaSet has all the Pods.

In other words, the sole responsibility for the ReplicaSet is to count Pods.

Instead, the Deployment manages ReplicaSets and orchestrates the rolling update.

```slideshow
{
  "description": "Deployments use ReplicaSets to orchestrate rolling updates.",
  "slides": [
    {
      "image": "assets/rolling-replicaset-2.svg",
      "description": "Deployments create ReplicaSets that create Pods."
    },
    {
      "image": "assets/rolling-replicaset-3.svg",
      "description": "Can you have two different Pods in the same ReplicaSet?"
    },
    {
      "image": "assets/rolling-replicaset-4.svg",
      "description": "ReplicaSets can only contain a single type of Pod. You can't use two different Docker images. _How can you deploy two versions of the app simultaneously?_"
    },
    {
      "image": "assets/rolling-replicaset-5.svg",
      "description": "The Deployment knows that you can't have different Pods in the same ReplicaSet. So it creates another ReplicaSet."
    },
    {
      "image": "assets/rolling-replicaset-6.svg",
      "description": "It increases the number of replicas of the current ReplicaSet to one."
    },
    {
      "image": "assets/rolling-replicaset-7.svg",
      "description": "And then it proceeds to decrease the replicas count in the previous ReplicaSet."
    },
    {
      "image": "assets/rolling-replicaset-8.svg",
      "description": "The same process of increasing and decreasing Pods continues until all Pods are created on the current ReplicaSet."
    },
    {
      "image": "assets/rolling-replicaset-9.svg",
      "description": "Please notice how you have two Pods templates and two ReplicaSets."
    },
    {
      "image": "assets/rolling-replicaset-10.svg",
      "description": "Also, the traffic is hitting both the current and previous version of the app."
    },
    {
      "image": "assets/rolling-replicaset-11.svg",
      "description": "After the rolling update is completed, **the previous ReplicaSet is not deleted.**"
    }
  ]
}
```

_But what if you don't care about rolling updates and only wish for your Pods to be recreated when they are deleted?_

_Could you create a ReplicaSet without a Deployment?_

Of course, you can.

Here's an example of a ReplicaSet.

```yaml|title=replicaset.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: example-replicaset
spec:
  replicas: 3
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
        image: learnk8s/hello:1.0.0
```

For reference, this is a Deployment that creates the ReplicaSet above:

```yaml|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  replicas: 3
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
        image: learnk8s/hello:1.0.0
```

_Aren't those the same?_

They are in this example.

However, in a Deployment, you can define properties such _how long to wait before considering the Pod live (`minReadySeconds`)._

The same property isn't available in the ReplicaSet.

> How do you know which properties are available? [You can consult the official API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#deployment-v1-apps).

_In general, the YAML for the Deployment contains the ReplicaSet plus some additional details._

You can create the ReplicaSet with:

```terminal|command=1|title=bash
kubectl create -f replicaset.yaml
```

_There's something else worth noting about the ReplicaSets and Deployments._

When you upgrade your Pods from version 1 to version 2, the Deployment creates a new ReplicaSet and increases the count of replicas while the previous count goes to zero.

**After the rolling update, the previous ReplicaSet is not deleted** — not immediately at least.

Instead, it is kept around with a replicas count of 0.

If you try to execute another rolling update from version 2 to version 3, you might notice that at the end of the upgrade, you have two ReplicaSets with a count of 0.

_Why are the previous ReplicaSets not deleted or garbage collected?_

Imagine that the current version of the container introduces a regression.

You probably don't want to serve unhealthy responses to your users, so you might want to roll back to a previous version of your app.

If you still have an old ReplicaSet, perhaps you could scale the current replicas to zero and increment the previous ReplicaSet count.

In other words, **keeping the previous ReplicaSets around is a convenient mechanism to roll back to a previously working version of your app.**

By default Kubernetes stores the last 10 ReplicaSets and lets you roll back to any of them.

But you can change how many ReplicaSets should be retained by changing the `Deployment.spec.revisionHistoryLimit` in your deployment.

```yaml|highlight=15|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      name: app
  template:
    metadata:
      labels:
        name: app
    spec:
      revisionHistoryLimit: 100
      containers:
      - name: app
        image: learnk8s/hello:1.0.0
```

_What about the previous ReplicaSets?_

_Could you list all the previous Replicasets that belong to a Deployment?_

You can use the following command to inspect the history of your Deployment:

```terminal|command=1|title=bash
kubectl rollout history deployment/app
```

And you can rollback to a specific version with:

```terminal|command=1|title=bash
kubectl rollout undo deployment/app --to-revision=2
```

_But how does the Deployment know their ReplicaSets?_

_Does it store the order in which ReplicaSets are created?_

The ReplicaSets have random names with id such as `app-6ff88c4474`, so you should expect the Deployment to store a reference to them.

Let's inspect the Deployment with:

```terminal|command=1|title=bash
kubectl get deployment app -o yaml
```

Nothing is looking like a list of previous 10 ReplicaSets.

Deployments don't hold a reference to their ReplicaSets.

At least not in the same YAML.

Instead, related ReplicaSets are retrieved comparing the template section in YAML.

_Remember when you learnt that Deployments are ReplicaSets with some extra features?_

Kubernetes uses that information to compare Deployments and ReplicaSets and make sure that they are related.

_What about the order?_

_How do you know which one was the last ReplicaSet used? Or the third?_

Kubernetes stores the revision in the `ReplicaSet.metatada.annotation`.

You can inspect the revision with:

```terminal|command=1|title=bash
kubectl get replicaset app-6ff88c4474 -o yaml
```

In the case below the revision is 3:

```yaml|highlight=6|title=replicaset.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: example-replicaset
  annotations:
    deployment.kubernetes.io/revision: "3"
spec:
  replicas: 3
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
        image: learnk8s/hello:1.0.0
```

So, what happens when you find a regression in the current release and decide to rollback to version 2 like so:

```terminal|command=1|title=bash
kubectl rollout undo deployment/app --to-revision=2
```

- Kubectl finds the ReplicaSets that belong to the Deployment
- Each ReplicaSet has a revision number. Revision 2 is selected
- The current replicas count is decreased, and the count is gradually increased in the RepiicaSet belonging to revision 2
- The `deployment.kubernetes.io/revision` annotation is updated. The current ReplicaSet changes from revision 2 to 4

If before the undo you had three ReplicaSets with revision 1, 2 and 3, now you should have 1, 3 and 4.

There's a missing entry in the history: the revision 2 that was promoted to 4.

_There's also something else that looks useful but doesn't work quite right._

The history command displays two columns: _Revision_ and _Change-Cause_.

```terminal|command=1|title=bash
kubectl rollout history deployment/app
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         <none>
```

While you're now familiar with the Revision column, you might be wondering what Change-Cause is used for — and why it's always set to `<none>`.

When you create a resource in Kubernetes, you can append the `--record` flag like so:

```terminal|command=1|title=bash
kubectl create -f deployment.yaml --record
```

When you do, Kubernetes adds an annotation to the resource with the command that generated it.

In the example above, the Deployment has the following metadata section:

```yaml|highlight=5|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
  kubernetes.io/change-cause: kubectl create --filename=deployment.yaml
spec:
  replicas: 3
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
        image: learnk8s/hello:1.0.0
```

Now, if you try to display the history again, you might notice that the same annotation is used in the rollout history command:

```terminal|command=1|title=bash
kubectl rollout history app
REVISION  CHANGE-CAUSE
1         kubectl create --filename=deployment.yaml --record=true
```

If you change the container image in the YAML file and apply the new configuration with:

```terminal|command=1|title=bash
kubectl apply -f deployment.yaml --record
```

You should see the following new entry in the rollout history:

```terminal|command=1|title=bash
kubectl rollout history deployment/app
REVISION  CHANGE-CAUSE
1         kubectl create --filename=deployment.yaml --record=true
2         kubectl apply --filename=deployment.yaml --record=true
```

The `--record` command can be used with any resource type, but it has an effect only on Deployment, DaemonSet, and StatefulSet resources, i.e. resources that can be "rolled out" (see `kubectl rollout -h`).

But you should remember:

- The `--record` flag adds an annotation to the YAML resource, which can be changed at any time
- The rollout history command uses the value of this annotation to populate the Change-Cause table
- The annotation contains the last command only. If you create the resource and later use `kubectl scale --replicas=10 deploy/app --record` to scale it, only the scaling command is stored in the annotation.

Also, there is an [ongoing discussion on deprecating the `--record` flag](https://github.com/kubernetes/kubernetes/issues/40422).

The feature provides little value for manual usage, but it still has some justification for automated processes as a simple form of auditing (keeping track of which commands caused which changes to a rollout).
