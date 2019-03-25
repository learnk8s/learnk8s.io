## How do you connect clusters located in different data centres?

> **TL;DR:** [Kubefed v2 is coming soon](https://github.com/kubernetes-sigs/federation-v2), you probably want to check out [Shipper](https://github.com/bookingcom/shipper) and the [multi-cluster-scheduler project](https://github.com/admiraltyio/multicluster-scheduler).

It's relatively common to see the infrastructure being replicated and distributed in different geographical regions, particularly in regulated environments.

**If one of the regions becomes unavailable, you can always route your traffic to another location and continue serving traffic.**

When it comes to Kubernetes, you might want to use a similar strategy and distribute your workloads in different regions.

_But how should you design the infrastructure for such geographical split?_

_Should you create a single large cluster that spans multiple regions over a unified network?_

_Or should you have a lot of smaller clusters and find a way to manage and synchronise them?_

Creating a single cluster that uses a unified network isn't recommended due to challenges such as:

- **Distributing traffic using Kube-proxy.** Your requests could land in one region and being redirected to another
- **Etcd being very picky when it comes to network latency.** etcd is so sensitive to network latency that even not running SSD disk could cause delays in reconciliations and slowdowns in your cluster.

Most of the effort from the community and the SIG-cluster group is focussed on the latter question — finding a way to orchestrate clusters in the same way that Kubernetes orchestrates containers.

### Option #1 — Federated clusters with kubefed

The official response from SIG-cluster is [kubefed2 — a revised version of the original kube federation client and operator](https://github.com/kubernetes-sigs/federation-v2).

The first attempt at managing a collection of clusters as a single entity came from a tool called kube federation.

It was a good start, but kube federation ended up being not so popular because not all resources were supported.

The tool had support for federated Deployments and Services but didn't cover StatefulSets, for example.

Also, the federation configuration was passed as annotations and wasn't flexible.

_Can you imagine describing the replicas split for each cluster in a federation using only annotations?_

**That ended up to be messy.**

SIG-cluster has gone a long way since kubefed v1 and decided to tackle the challenge again but from a different angle.

**Instead of using annotations, they decided to release a controller that can be installed in your clusters and can be configured using Custom Resource Definitions (CRDs).**

You have a CRD for each resource that you wish to federate.

The federated CRD has three sections:

- the standard resource definition such as a Deployment
- a `placement` section where you can define how that resource should be distributed in the federation
- an `override` section where you can override weights and settings specified in the placement just for a particular cluster

Here's an example of a federated Deployment with placements and overrides.

```yaml|title=federated-deployment.yaml
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

```yaml|title=preference.yaml
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

The final design for the CRD and the API is not finalised, and there's a lot of activity on the official project repository.

**You should keep a close eye on kubefed2, but you should also be aware of that this is not production ready yet.**

You can learn more about kubefed2 from [the official kubefed2 article](https://kubernetes.io/blog/2018/12/12/kubernetes-federation-evolution/) published on the Kubernetes Blog and [from the official repository of the kubefed project](https://github.com/kubernetes-sigs/federation-v2).

### Option #2 — Cluster federation the Booking.com way

Booking.com's engineering team wasn't involved with the design of kubefed v2, so they developed shipper — an operator for multi-cluster, multi-region, multi-cloud deployment.

[Shipper](https://github.com/bookingcom/shipper) has a few similarities with kubefed2.

Both tools let you customise the rollout strategy to multiple clusters, which is excellent if you are looking to craft a rollout strategy with the appropriate speed/risk balance for your particular situation.

_However, Shipper is more opinionated._

As an example, Shipper is designed to take Helm charts as inputs, and you can't use vanilla resources.

Shipper is also used for production infrastructure, so it's technically a more mature and reliable product than kubefed2.

Here's a high-level overview of how Shipper works.

Instead of creating a standard Deployment, you should create an Application resource that wraps an Helm chart like this:

```yaml|title=application.yaml
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

When you submit the resource to the cluster, the Shipper controller takes care of rolling out the change in all federated clusters.

**Shipper is an interesting contender in the multi-cluster deployment space, but its tight integration with Helm is also a significant concern.**

You can learn more about Shipper and its philosophy by [reading the official press release](https://medium.com/booking-com-infrastructure/introducing-shipper-daf9244e3882).

If you prefer to dive into the code, you should [head over to the official project repository](https://github.com/bookingcom/shipper).

### Option #3 — Magic ✨ cluster federation

Kubefed v2 and Shipper solve cluster federation by exposing new resources to the cluster using Custom Resource Definitions.

_But what if you don't want to rewrite all of your Deployments, StatefulSets, Services etc. to be federated?_

_Can you still federate your existing cluster without changing the YAML?_

[multi-cluster-scheduler is a project from Admirality](https://github.com/admiraltyio/multicluster-scheduler) that aims at solving scheduling workloads across clusters.

But instead of creating a new way to interact with the cluster and wrapping resources in Custom Resource Definitions, the multi-cluster-scheduler inject itself in the standard Kubernetes lifecycle and intercept all the calls that create Pods.

When a Pod is created is immediately replaced by a proxy Pod.

The original Pod goes through another round of scheduling where the placement decision is taken after interrogating the entire federation.

Finally, the Pod is deployed in the target cluster.

In other news, you end up having one extra Pod that doesn't do much — it's just a placeholder.

But the benefit is that you didn't have to write any new resource to make your Deployments federated.

Every resource that creates Pod is automatically federation-ready.

It's a neat idea because you can suddenly have multi-region clusters without even noticing it, but it also feels quite risky as there's a lot of magic going on.

If you wish to dive more into the multi-cluster-scheduler, you should check out [the official repository page](multi-cluster-scheduler).

If you prefer to read about the multi-cluster-scheduler in action, Admiralty has an [interesting use case applied to Argo](https://admiralty.io/blog/running-argo-workflows-across-multiple-kubernetes-clusters/) — the open source Kubernetes native workflows, events, CI and CD.

### More tools and solutions

Connecting and managing multiple clusters together is a complex topic, and there's a solution fits all.

If you're interested in diving more into the topic, you should have a look at the following resources:

- [Submariner from Rancher](https://submariner.io), a tool built to connect overlay networks of different Kubernetes clusters
- The retailer Target is using [Spinnaker to orchestrate deployment across several clusters](https://tech.target.com/infrastructure/2018/06/20/enter-unimatrix.html)
- You could use IPV6 and have a [unified network across several regions](https://itnext.io/kubernetes-multi-cluster-networking-made-simple-c8f26827813)
- You could use a service mesh such as [Istio to connect multiple clusters](https://istio.io/docs/setup/kubernetes/install/multicluster/)
- Cilium, the Container Network Interface plugin, has a [cluster mesh feature](https://cilium.io/blog/2019/03/12/clustermesh/) that lets you connect multiple clusters toegether

## That's all folks

Thanks for reading until the end!

If you know of a better way to connect multiple clusters, please [get in touch and let us know](mailto:hello@learnk8s.io).

We will add it to the links above.

A special thank you goes to [XXXX](xxx) and [XXX](xxx) that reviewed the content of this article.
