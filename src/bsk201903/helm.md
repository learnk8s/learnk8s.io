## Is Helm used just for templating Kubernetes YAML files?

> **TL;DR:** Helm is used for templating, sharing charts and managing releases. If you're looking just for templating, you should check out [kustomize](https://github.com/kubernetes-sigs/kustomize).

When you start using Kubernetes in different environments, you might see yourself copy-pasting the same YAML resources over and over.

_A better strategy is to create and use dynamic templates as you've done for HTML pages — for example._

All the variables that can change are replaced with placeholders.

Before submitting them to the cluster, you could use the template engine of choice to customise them with the correct value.

```yaml|highlight=11|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
    - name: test-container
      image: k8s.gcr.io/busybox
      env:
        - name: ENV
          value: {{ .Values.env_name }}
```

While there're a lot of tools to template Kubernetes YAML files, Helm caught a lot of attention very early on and established itself as the market leader.

Helm is a convenient templating engine: it uses the [Go templating engine](https://golang.org/pkg/text/template/) and the [helpers from the Sprig library](https://github.com/Masterminds/sprig).

You can compile and deploy the `pod.yaml` resource above with:

```terminal|command=1-3|title=bash
helm template . \
  -x templates/pod.yaml \
  --set env_name=production
---
# Source: helm-chart/templates/pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
    - name: test-container
      image: k8s.gcr.io/busybox
      env:
        - name: ENV
          value: production
```

But the reason for such a quick uptake isn't for the templating alone.

**A collection of templated resources in Helm is called a chart.**

Charts are similar to archives, and you can share them with your colleagues or upload them to a registry.

Charts became such a ubiquitous tool to share collections of YAML files and that helped Helm raise in popularity.

[Have a look at all the available charts on the public registry](https://github.com/helm/charts/).

> Please note that you can use `helm search <keyword>` to search for a specific chart on the official registry.

```terminal|command=1|title=bash
helm search mysql
NAME                              DESCRIPTION
stable/mysql                      Fast, reliable, scalable, and easy to use open-source rel...
stable/mysqldump                  A Helm chart to help backup MySQL databases using mysqldump
stable/prometheus-mysql-exporter  A Helm chart for prometheus mysql exporter with cloudsqlp...
stable/percona                    free, fully compatible, enhanced, open source drop-in rep...
stable/percona-xtradb-cluster     free, fully compatible, enhanced, open source drop-in rep...
stable/phpmyadmin                 phpMyAdmin is an mysql administration frontend
stable/gcloud-sqlproxy            DEPRECATED Google Cloud SQL Proxy
stable/mariadb                    Fast, reliable, scalable, and easy to use open-source rel...
```

Companies started sharing packages internally in their teams, and that led to private registries.

You have a public registry with packages contributed by the community and private registry for internal use.

Tools such as [Artifactory](https://www.jfrog.com/confluence/display/RTF/Helm+Chart+Repositories) or [Azure Container Registry](https://azure.microsoft.com/en-us/updates/azure-container-registry-helm-repositories-public-preview/) are popular options when it comes to using a registry to store your private charts.

> If you wish to host your private registry [Chartmuseum is a solid choice](https://github.com/helm/chartmuseum).

But templating and sharing charts are not the only tasks that Helm can handle.

**Helm is deployed into parts: a client-side binary and a server, which is deployed inside your cluster as a controller.**

The server component is usually referred to as the Tiller.

Every time you install a chart or upgrade your definitions, the client sends the YAML resources to the Tiller.

The Tiller templates the YAML files and stores a copy of them for future reference.

```slideshow
{
  "description": "Helm client-server architecture",
  "slides": [
    {
      "image": "28-templating.svg",
      "description": "When you create resources with Helm, the request is sent to your cluster."
    },
    {
      "image": "29-templating.svg",
      "description": "But before the resources are submitted to the API, they are collected and templated by an operator: the tiller."
    },
    {
      "image": "30-templating.svg",
      "description": "The tiller is in charge of storing previous resources used for deployments as well as templating the YAML."
    },
    {
      "image": "74-templating.svg",
      "description": "Helm records every resource that you submit in the Tiller."
    },
    {
      "image": "75-templating.svg",
      "description": "It also records all the updates and upgrade you did to your releases."
    }
  ]
}
```

Keeping track of all releases is handy.

You can roll back when you notice that the current deployment doesn't behave the way you expect.

```slideshow
{
  "description": "Helm history",
  "slides": [
    {
      "image": "78-templating.svg",
      "description": "If you realise that a release contained a bug, you can rollback."
    },
    {
      "image": "79-templating.svg",
      "description": "Helm creates a new entry in the history table and reverts the resource definition to the previous deployment."
    }
  ]
}
```

Helm helps you manage the lifecycle of your releases.

From creating to updating and deleting charts, Helm makes sure there's always an audit trail, and you can inspect the current and past state.

To summarise, Helm is:

- a **templating engine** for your YAML files
- a convenient way for **packaging collections of YAML files and distributing them** in public and private registry
- a **release manager** capable of rolling back deployments

_Is Helm the only option?_

## Other tools to kustomize your YAML

Two recent events threaten Helm's popularity.

First, Helm 3 was announced in June 2018 as a radical departure from the previous version.

It doesn't feature a Tiller anymore: having a component that has admin-like access to create resources in the cluster was also a security concern.

_What if a malicious user can get hold of the Tiller?_

They could end up with unlimited access to creating and deleting resources inside the cluster.

However, removing the tiller is posing new challenges on how to manage releases and rollbacks.

Also, Helm 3 offers a novel approach to templating resources.

You can use Go templates like in Helm 2, but you can also leverage Lua to write resources as code.

Here's an example of a Pod written in Lua:

```lua|title=pod.lua
local pods = require("mylib.pods");
function create_alpine_pod(_)
  myPod = pods.new("alpine:3.7", _)
  myPod.spec.restartPolicy = "Always"
  -- set any other properties
  _.Manifests.add(myPod)
end
```

Lua is meant to solve nasty hacks such as [the need to indent lines](https://github.com/technosophos/k8s-helm/blob/master/docs/charts_tips_and_tricks.md#using-the-include-function) in the Go templates.

The other noteworthy event is a competing templating engine was merged in the official `kubectl` client: [kustomize](https://github.com/kubernetes-sigs/kustomize).

Kustomize lets you customise your YAML files by applying patches and overlays to your existing resources.

You can think of Kustomize as a way to define exceptions on your YAML files without touching the original file.

Let's have a look at an example for a Pod:

```yaml|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-pod
    image: nginx
```

And a `kustomization.yaml` like:

```yaml|title=kustomization.yaml
commonLabels:
  env: production
resources:
- pod.yaml
```

When you run `kubectl apply -k .` the following resource is submitted to the cluster:

```yaml|highlight=4-5|title=kustomized-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    env: production
  name: my-pod
spec:
  containers:
  - image: nginx
    name: my-pod
```

You can use kustomize as an independent binary, but having it bundled in `kubectl` is convenient.

It also demonstrates the commitment of the SIG-machinery to provide a reliable alternative to Helm.

With Helm 3 still in the making and kustomize being merged in kubectl, it looks like the war for a Kubernetes templating engine has just started.

## That's all folks

Still, have questions about Helm and what it can do?

[Let us know in an email](mailto:hello@learnk8s) or [ask us with a tweet](https://twitter.com/learnk8s).

A special thank you goes to [Mike Bright](https://mjbright.github.io/) that reviewed the content of this article.
