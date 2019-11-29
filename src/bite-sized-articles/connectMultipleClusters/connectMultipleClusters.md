## How do you connect Kubernetes clusters located in different data centres?

> **TL;DR:** [Kubefed v2 is coming soon](https://github.com/kubernetes-sigs/federation-v2), you probably want to check out [Shipper](https://github.com/bookingcom/shipper) and the [multi-cluster-scheduler project](https://github.com/admiraltyio/multicluster-scheduler).

It's relatively common to see infrastructure being replicated and distributed in different geographical regions, particularly in regulated environments.

**If one of the regions becomes unavailable, you can always route your traffic to another location and continue serving traffic.**

When it comes to Kubernetes, you might want to use a similar strategy and distribute your workloads in different regions.

You may have one or several clusters per team, region, environment, or a combination of them.

Your clusters may be hosted in different cloud providers and on-premise.

_But how should you design the infrastructure for such geographical split?_

_Should you create a single large cluster which spans multiple clouds over a unified network?_

_Or should you have a lot of smaller clusters and find a way to manage and synchronise them?_

## One cluster to rule them all

_Creating a single cluster that uses a unified network is a challenge._

Consider what happens during a network partition.

If you host a single master node, half of your fleet won't be able to receive new commands because it's unable to reach the master.

And that includes old routing tables (`kube-proxy` is unable to download new ones) and no more pods (the kubelet fails to ask for updates).

What's worse is that Kubernetes marks the nodes which it can't see as _Lost_ and reschedules the missing pods on the existing nodes.

**So you end up having twice as many pods.**

If you decide to have one master node for each region, you will face troubles with the consensus algorithm used in the database — etcd.

etcd uses the [raft protocol](http://thesecretlivesofdata.com/raft/) to agree on a value before it's written to disk.

In other words, the majority of the instances have to reach consensus before any state is written in etcd.

If the latency between the etcd instances spikes, like in the case where you host three etcd instances in different geographical regions, it takes longer to agree and write the value to disk.

The delay is propagated to the Kubernetes controllers.

The controller manager takes longer to be notified of a change and to write the response to the database.

And since you don't have a single controller but a few of them, **like a chain reaction, the entire cluster becomes incredibly slow.**

You should know that etcd is so sensitive to latency that [the official documentation recommend using SSD disks](https://coreos.com/etcd/docs/latest/faq.html#deployment) instead of regular hard drives.

**At the moment, there are no good examples of a stretched network for a single cluster.**

Most of the effort from the community and the SIG-cluster group is focussed on answering another question: cluster federation — finding a way to orchestrate clusters in the same way that Kubernetes orchestrates containers.

## Option #1 — Federated clusters with kubefed

The official response from SIG-cluster is [kubefed2 — a revised version of the original kube federation client and operator](https://github.com/kubernetes-sigs/federation-v2).

The first attempt at managing a collection of clusters as a single entity came from a tool called kube federation.

It was a good start, but kube federation ended up being not so popular because not all resources were supported.

The tool had support for federated Deployments and Services but didn't cover StatefulSets, for example.

Also, the federation configuration was passed as annotations and wasn't flexible.

_Can you imagine describing the replicas split for each cluster in a federation using only annotations?_

**That ended up to be messy.**

SIG-cluster has gone a long way since kubefed v1 and decided to tackle the challenge again but from a different angle.

**Instead of using annotations, they decided to release a controller which can be installed in your clusters and can be configured using Custom Resource Definitions (CRDs).**

You have a Custom Resource Definition (CRD) for each resource that you wish to federate with three sections:

- the standard resource definition such as a Deployment
- a `placement` section where you can define how that resource should be distributed in the federation
- an `override` section where you can override weights and settings specified in the placement just for a particular cluster

Here's an example of a federated Deployment with placements and overrides.

```yaml|highlight=2,24-32|title=federated-deployment.yaml
apiVersion: types.federation.k8s.io/v1alpha1
kind: FederatedDeployment
metadata:
  name: test-deployment
  namespace: test-namespace
spec:
  template:
    metadata:
      labels:
        app: nginx
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: nginx
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
            - image: nginx
              name: nginx
  placement:
    clusterNames:
      - cluster2
      - cluster1
  overrides:
    - clusterName: cluster2
      clusterOverrides:
        - path: spec.replicas
          value: 5
```

As you can imagine, the Deployment is distributed in two clusters: `cluster1` and `cluster2`.

The first cluster deploys three replicas whereas the second overrides the value to 5.

If you wish to have more control on the number of replicas, kubefed2 exposes a new object called ReplicaSchedulingPreference where you can distribute replicas in weighted proportions:

```yaml|highlight=9-13|title=preference.yaml
apiVersion: scheduling.federation.k8s.io/v1alpha1
kind: ReplicaSchedulingPreference
metadata:
  name: test-deployment
  namespace: test-ns
spec:
  targetKind: FederatedDeployment
  totalReplicas: 9
  clusters:
    A:
      weight: 1
    B:
      weight: 2
```

The CRD structure and the API is not finalised, and there's a lot of activity on the official project repository.

**You should keep a close eye on kubefed2, but you should also be aware that this is not production ready yet.**

You can learn more about kubefed2 from [the official kubefed2 article](https://kubernetes.io/blog/2018/12/12/kubernetes-federation-evolution/) published on the Kubernetes Blog and [from the official repository of the kubefed project](https://github.com/kubernetes-sigs/federation-v2).

## Option #2 — Cluster federation the Booking.com way

Booking.com's engineering team wasn't involved with the design of kubefed v2, so they developed Shipper — an operator for multi-cluster, multi-region, multi-cloud deployment.

[Shipper](https://github.com/bookingcom/shipper) has a few similarities with kubefed2.

Both tools let you customise the rollout strategy to multiple clusters — which clusters are involved in the deployment and how many replicas for each of them.

However, **Shipper is designed to minimise the risk of a deployment going wrong.**

In Shipper, you define a series of steps that describe the replicas split between previous and current deployment and how much traffic should they receive.

When you submit the resource to the cluster, the Shipper controller takes care of rolling out the change in all federated clusters, one step at the time.

_Also, Shipper is very opinionated._

As an example, **Shipper is designed to take Helm charts as input,** and you can't use vanilla resources.

Here's a high-level overview of how Shipper works.

Instead of creating a standard Deployment, you should create an Application resource that wraps a Helm chart like this:

```yaml|highlight=2|title=application.yaml
apiVersion: shipper.booking.com/v1alpha1
kind: Application
metadata:
  name: super-server
spec:
  revisionHistoryLimit: 3
  template:
    chart:
      name: nginx
      repoUrl: https://storage.googleapis.com/shipper-demo
      version: 0.0.1
    clusterRequirements:
      regions:
        - name: local
    strategy:
      steps:
        - capacity:
            contender: 1
            incumbent: 100
          name: staging
          traffic:
            contender: 0
            incumbent: 100
        - capacity:
            contender: 100
            incumbent: 0
          name: full on
          traffic:
            contender: 100
            incumbent: 0
    values:
      replicaCount: 3
```

**Shipper is an interesting contender in the multi-cluster deployment space, but its tight integration with Helm is also a significant concern.**

_What if the community shifts its focus from Helm to [kustomize](https://kubernetes.io/blog/2018/05/29/introducing-kustomize-template-free-configuration-customization-for-kubernetes/) or [kapitan](https://github.com/deepmind/kapitan)?_

You can learn more about Shipper and its philosophy by [reading the official press release](https://medium.com/booking-com-infrastructure/introducing-shipper-daf9244e3882).

If you prefer to dive into the code, you should [head over to the official project repository](https://github.com/bookingcom/shipper).

## Option #3 — Magic ✨ cluster federation

Kubefed v2 and Shipper solve cluster federation by exposing new resources to the cluster using Custom Resource Definitions.

_But what if you don't want to rewrite all of your Deployments, StatefulSets, DaemonSets etc. to be federated?_

_Can you still federate your existing cluster without changing the YAML?_

[multi-cluster-scheduler is a project from Admirality](https://github.com/admiraltyio/multicluster-scheduler) that aims at solving scheduling workloads across clusters.

But instead of creating a new way to interact with the cluster and wrapping resources in Custom Resource Definitions, the multi-cluster-scheduler injects itself in the standard Kubernetes lifecycle and intercept all the calls that create pods.

**When a Pod is created, it is immediately replaced by a dummy Pod.**

> The multi-cluster-scheduler uses [mutating pod admission webhooks](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) to intercept the call and create a dummy pod that _sleeps_.

The original Pod goes through another round of scheduling where the placement decision is taken after interrogating the entire federation.

Finally, the Pod is deployed in the target cluster.

In other news, you end up having one extra Pod which doesn't do much — it's just a placeholder.

But the benefit is that you didn't have to write any new resource to make your Deployments federated.

**Every resource that creates a pod is automatically federation-ready.**

It's a neat idea because you can suddenly have deployments that span multiple regions without even noticing it, but it also feels quite risky as there's a lot of magic going on.

But if Shipper was mostly focussed at minimising the impact of rolling out deployments, multi-cluster-scheduler is a more general tool which is perhaps more appropriate for batch jobs.

It doesn't feature any advanced mechanism to roll out deployments in an incremental fashion.

If you wish to dive more into the multi-cluster-scheduler, you should check out [the official repository page](multi-cluster-scheduler).

If you prefer to read about the multi-cluster-scheduler in action, Admiralty has an [interesting use case applied to Argo](https://admiralty.io/blog/running-argo-workflows-across-multiple-kubernetes-clusters/) — the open source Kubernetes native workflows, events, CI and CD.

## More tools and solutions

Connecting and managing multiple clusters together is a complex topic, and there isn't a solution that fits all.

If you're interested in diving more into the topic, you should have a look at the following resources:

- [Submariner from Rancher](https://submariner.io), a tool built to connect overlay networks of different Kubernetes clusters
- The retailer Target is using [Unimatrix in combination with Spinnaker to orchestrate deployment across several clusters](https://tech.target.com/infrastructure/2018/06/20/enter-unimatrix.html)
- You could use IPV6 and have a [unified network across several regions](https://itnext.io/kubernetes-multi-cluster-networking-made-simple-c8f26827813)
- You could use a service mesh such as [Istio to connect multiple clusters](https://istio.io/docs/setup/kubernetes/install/multicluster/)
- Cilium, the Container Network Interface plugin, has a [cluster mesh feature](https://cilium.io/blog/2019/03/12/clustermesh/) that lets you combine multiple clusters

## That's all folks

_Thanks for reading until the end!_

If you know of a better way to connect multiple clusters, please [get in touch and let us know](mailto:hello@learnk8s.io).

We will add it to the links above.

A special thank you goes to [Chris Nesbitt-Smith](https://github.com/chrisns) and [Vincent De Smet](https://github.com/so0k) (SRE at [swatmobile.io](https://swatmobile.io)) that reviewed the content of this article and offered some insightful feedback on how federation works.
