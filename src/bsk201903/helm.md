## Is Helm used just for templating?

> **TL;DR:** Helm is used for templating, sharing charts and managing releases.

When you start using Kubernetes in different environments, you might see yourself copy-pasting the same YAML resources over and over.

A better strategy is to create and use dynamic templates as you've done for HTML in web pages — for example.

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
          value: { { .Values.env_name } }
```

While there're a lot of tools to template Kubernetes YAML files, Helm caught a lot of attention very early on and established itself as the market leader.

Helm is a convenient templating engine: it uses the [Go templating engine](https://golang.org/pkg/text/template/) and the [helpers from the Sprig library](https://github.com/Masterminds/sprig).

But the reason for such a quick uptake isn't for the templating alone.

**A collection of templated resources in Helm is called a chart.**

Charts are similar to archives, and you can share them with your colleagues or uploaded them to a registry.

Charts became such a ubiquitous tool to share collections of YAML files that made Helm even more popular.

[Have a look at all the available charts on the public registry](github.com/helm/charts/).

> Please note that you can use `helm search <keyword>` to search for a specific chart on the official registry.

Companies started sharing packages internally for their teams, and that led to private registries.

You have a public registry with packages contributed by the community and private registry for internal use.

Tools such as [Artifactory](https://www.jfrog.com/confluence/display/RTF/Helm+Chart+Repositories) or [Azure Container Registry](https://azure.microsoft.com/en-us/updates/azure-container-registry-helm-repositories-public-preview/) are popular options when it comes to using a registry to store your private charts.

If you wish to host your private registry [Chartmuseum is a solid choice](https://github.com/helm/chartmuseum).

But templating and sharing charts are not the only task that Helm can handle.

Helm is deployed into parts: a client-side tool that is connected to a controller that lives inside your cluster.

Every time you install a chart or upgrade your definitions, the client side tool sends the YAML resources to the controller.

The controller templates the YAML and stores a copy of the resources in a history table.

```slideshow
{
  "description": "Description",
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

From creating to updating and deleting charts, Helm makes sure there's always an audit trail, and you can inspect the current and past states.

To summarise, Helm is:

- a **templating engine** for your YAML files
- a convenient way for **packaging collections of YAML files and distributing them** in public and private registry
- a **release manager** capable of rolling back deployments

## That's all folks

Still have questions about Helm and what it can do?

[Let us know in an email](mailto:hello@learnk8s) or [ask us with a tweet](https://twitter.com/learnk8s).

A special thank you goes to [XXXX](xxx) and [XXX](xxx) that reviewed the content of this article.
