**TL;DR:** You should use tools such as [`yq`](https://mikefarah.github.io/yq/) and [kustomize](https://kustomize.io/) to template YAML resources instead of relying on tools that interpolate strings such as [Helm](https://helm.sh/).

If you're working on large scale projects, you should consider using **real code** — you can find [hands-on examples on how to programatically generate Kubernetes resources in Java, Go, Javascript, C# and Python in this repository](https://github.com/learnk8s/templating-kubernetes).

## Contents:

- [Introduction: managing YAML files](#introduction-managing-yaml-files)
- [Search and replace](#using-templates-with-search-and-replace)
- [Templating with `yq`](#templating-with-yq)
- [Templating with Kustomize](#templating-with-kustomize)
- [Generating resource manifests with code](#generating-resource-manifests-with-code)
- [Why not Helm?](#why-not-helm-)
- [Other configuration tools](#other-configuration-tools)
- [Summary](#summary)

## Introduction: managing YAML files

When you have multiple Kubernetes clusters, it's common to have resources that can be applied to all environments but with a small modification.

As an example, when an app runs in the staging environment, it should connect to the staging database.

However, in production, it should connect to the production database.

In Kubernetes, you can use an environment variables to inject the correct database URL.

The following Pod is an example:

```yaml|highlight=9-11|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://db_url:5432
```

However, since the value `postgres://db_url:5432` is hardcoded in the YAML definition, there's no easy way to deploy the same Pod in multiple environments such as dev, staging and production.

You could create a Pod YAML definition for each of the environment you plan to deploy.

```terminal|command=1|title=bash
tree .
kube/
├── deployment-prod.yaml
├── deployment-staging.yaml
└── deployment-dev.yaml
```

_Unfortunately, having several copies of the same file with minor modifications has its challenges._

**If you update the name of the image or the version, you have to amend all the remaining files.**

## Using templates with search and replace

A better strategy is to have a placeholder and replace it with the real value before the YAML is submitted to the cluster.

_Search and replace._

If you're familiar with `bash`, you can implement the search and replace with few lines of `sed`.

Your Pod should contain a placeholder like this:

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
      value: %ENV_NAME%
```

And you could run the following command to replace the value of the environment on the fly.

```terminal|command=1-2|title=bash
sed s/%ENV_NAME%/$production/g \
 pod_template.yaml > pod_production.yaml
```

However, tagging all the templates and injecting placeholders is hard work.

_What if you want to change a value that isn't a placeholder?_

_What if you have too many placeholders, what does the `sed` command look like?_

If you have only a handful variables that you wish to change, you might want to install [`yq`](https://mikefarah.github.io/yq/) — a command line tool designed to transform YAML.

> `yq` is similar to another more popular tool called [`jq`](https://stedolan.github.io/jq/) that focuses on JSON instead of YAML.

You can install `yq` on macOS with:

```terminal|command=1|title=bash
brew install yq
```

On Linux with:

```terminal|command=1-2|title=bash
sudo add-apt-repository ppa:rmescandon/yq
sudo apt-get install yq
```

> In case you don't have the `add-apt-repository` command installed, you can install it with `apt-get install software-properties-common`.

If you're on Windows, you can [download the executable from Github](https://github.com/mikefarah/yq/releases).

## Templating with `yq`

`yq` takes a YAML file as input and can:

1. read values from the file
1. add new values
1. updated existing values
1. generate new YAML files
1. covert YAML into JSON
1. merge two or more YAML files

Let's have a look at the same Pod definition:

```yaml|highlight=9-11|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://db_url:5432
```

You could read the value for the environment variable `ENV` with:

```terminal|command=1|title=bash
yq r pod.yaml "spec.containers[0].env[0].value"
postgres://db_url:5432
```

The command works as follows:

- `yq r` is the command to read a value from the YAML file.
- `pod.yaml` is the file path of the YAML that you want to read.
- `spec.containers[0].env[0].value` is the query path.

_What if you want to change the value instead?_

Perhaps you want to deploy to the production environment and change the URL to the production database.

You can use the following command:

```terminal|command=1|title=bash
yq w pod.yaml "spec.containers[0].env[0].value" "postgres://prod:5432"
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://prod:5432
```

You should notice that `yq` printed the result on the standard output.

If you prefer to edit the YAML in place, you should add the `-i` flag.

The difference between `yq` and `sed` is that the former understands the YAML format and can navigate and mangle the structured markup.

On the other hands, `sed` is treating files as strings and it doesn't mind if the file isn't a valid YAML.

Since `yq` understands YAML, let's explore a few more complex scenarios.

## Merging YAML files

Let's assume that you want to inject an extra container to all the Pods submitted to the cluster.

But instead of using an [Admission Webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks), you decide to add an extra command in your deployment script.

You could save the YAML configuration for the extra container as a YAML file:

```yaml|title=envoy-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: envoy-pod
spec:
  containers:
  - name: proxy-container
    image: envoyproxy/envoy:v1.12.2
    ports:
      - containerPort: 80
```

Assuming that you have a Pod like this:

```yaml|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://db_url:5432
```

You can execute the following command and merge the two YAMLs:

```terminal|command=1|title=bash
yq m --append pod.yaml envoy-pod.yaml
```

> Please notice the `--append` flag that is necessary to append values to an array. You can find more details in [the official documentation](https://mikefarah.github.io/yq/merge).

The output should have a proxy named Envoy as an additional container:

```yaml|highlight=12-15|title=container-snippet.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://db_url:5432
  - name: proxy-container
    image: envoyproxy/envoy:v1.12.2
    ports:
      - containerPort: 80
```

> Please note that `yq` sorts the YAML fields in the output alphabetically, so the order of fields in your output could be different from above listing.

In other words, the two YAML files are merged into one.

While the example shows a convenient strategy to compose complex YAML from basic files, it also shows some of the limitations of `yq`:

1. The two YAML files are merged at the top level. There's no way you add a chunk of YAML file under `.spec.containers[]`, as an example.
1. The order of the files matters. If you invert the order, `yq` keeps `envoy-pod` for the Pod's name in `metadata.name`.
1. You have to tell `yq` explicity [when to append and overwrite values](https://mikefarah.github.io/yq/merge). Since those are flags apply to the whole document, it's hard to get the granularity right.

However, if you plan to use `yq` for small projects, you can probably go quite far with it.

There's another tool similar to `yq`, but focused specifically on Kubernetes YAML resources: [kustomize](https://kustomize.io/).

While `yq` understands and transforms YAML, kustomize can understand and transform Kubernetes YAML.

That's a subtle but important difference so you will explore that next.

## Templating with Kustomize

Kustomize is a command line tool that can create and transform YAML files — just like `yq`.

However, instead of using only the command line, kustomize uses a file called `kustomization.yaml` to decide how to template the YAML.

Let's have a look at how it works.

All the files should be created in a separate folder:

```terminal|command=1,2|title=bash
mkdir prod
cd prod
```

You will use the same Pod as before:

```yaml|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: test-container
    image: k8s.gcr.io/busybox
    env:
    - name: DB_URL
      value: postgres://db_url:5432
```

You can save the file as `pod.yaml` in the `prod directory`.

In the same directory, you should also create a `kustomization.yaml` file:

```yaml|title=kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - pod.yaml
```

You can then execute the kustomize command by passing it the directory where your `kustomization.yaml` file resides as an argument:

> Please note that the `.` (dot) in the next command is the `prod` directory.

```terminal|command=1|title=bash
kubectl kustomize .
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - env:
    - name: DB_URL
      value: postgres://db_url:5432
    image: k8s.gcr.io/busybox
    name: test-container
```

There's no change in the output since you haven't applied any kustomization yet.

You can define a patch that should be applied to the Pod.

The patch is defined like this:

```yaml|highlight=4|title=pod-patch.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: proxy-container
    image: envoyproxy/envoy:v1.12.2
    ports:
      - containerPort: 80
```

You should save the file in the same directory as `pod-patch.yaml`.

> Please notice that the name of the resources (highlighted) has to match the `metadata.name` in `pod.yaml`.

And you should update your `kustomize.yaml` to include the following lines:

```yaml|highlight=5-6|title=kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - pod.yaml
patchesStrategicMerge:
  - pod-patch.yaml
```

If you rerun the command, the output should be a Pod with two containers:

```terminal|command=1|title=bash
kubectl kustomize .
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - image: envoyproxy/envoy:v1.12.2
    name: proxy-container
    ports:
    - containerPort: 80
  - env:
    - name: DB_URL
      value: postgres://db_url:5432
    image: k8s.gcr.io/busybox
    name: test-container
```

The kustomize patch functionality works in a similar way as `yq merge`, but the setup for kustomize is more verbose.

Also, kutomize merges the two YAML only when `metadata.name` is the same in both files.

_It's safer, but is it enough to justify using kustomize in favour or `yq`?_

Kustomize is designed to map changes and resources in code.

You should create another folder at the same level at the previous one:

```terminal|command=1,2,3,4|title=bash
cd ..
mkdir dev
cd dev
tree ..
├── dev
└── prod
    ├── kustomization.yaml
    ├── pod-patch-envoy.yaml
    └── pod.yaml
```

You can create another `kustomization.yaml`:

```yaml|highlight=3-4|title=kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
bases:
  - ../prod
patchesStrategicMerge:
  - pod-patch-env.yaml
```

The new configuration extends the base configuration in the `prod` directory, so there's no need to recreate all patches in the `dev` directory.

Instead, you can create a single patch in the `dev` directory that changes the value of the environment variable:

```yaml|highlight=10|title=pod-patch-env.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
    - name: test-container
      env:
    - name: DB_URL
      value: postgres://dev:5432
```

The final directory structure is the following:

```terminal|command=1|title=bash
tree .
├── dev
│   ├── kustomization.yaml
│   └── pod-patch-env.yaml
└── prod
    ├── kustomization.yaml
    ├── pod-patch-envoy.yaml
    └── pod.yaml
```

If you run kustomize this time, the output will be different:

```terminal|command=1|title=bash
kubectl kustomize dev
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - image: envoyproxy/envoy:v1.12.2
    name: proxy-container
    ports:
    - containerPort: 80
  - env:
    - name: DB_URL
      value: postgres://dev:5432
    image: k8s.gcr.io/busybox
    name: test-container
```

Please notice how:

1. you still have the extra container which is patched in the base `kustomization.yaml` file
1. the environment variable `DB_URL` was changed to `postgres://dev:5432`

You can imagine that you can have more folders and more `kustomization.yaml` to match your clusters and environments.

_Can you also edit fields without having to create a folder, a `kustomization.yaml` and the extra YAML?_

Kustomize's support for inline editing fields is limited and discouraged.

Kustomize is designed on purpose to [make it hard to change values through the command line](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/eschewedFeatures.md#unstructured-edits).

You have to write YAML files to change even a single value — unlike `yq`.

_Is there an alternative to Kustomize and `yq` that is flexible and structured?_

## Generating resource manifests with code

You could generate YAML programatically with code.

And you don't even need to start from scratch.

[Kubernetes has several official libraries](https://kubernetes.io/docs/reference/using-api/client-libraries/) where you can create objects such as Deployments and Pod with code.

As an example, let's have a look at how you can use JavaScript to generate a Kubernetes Pod definition.

> You will find more examples in Go, Java, Python and C# later on.

```js|title=pod.js
const { Pod, Container } = require('kubernetes-models/v1')

const pod = new Pod({
  metadata: {
    name: 'test-pod',
  },
  spec: {
    containers: [
      new Container({
        name: 'test-container',
        image: 'nginx',
        env: [{ name: 'ENV', value: 'production' }],
      }),
    ],
  },
})

// Any valid JSON is also valid YAML
const json = JSON.stringify(pod, null, 2)

console.log(json)
```

You can execute the script with the `node` binary:

```terminal|command=1|title=bash
node pod.js
{
  "metadata": {
    "name": "test-pod"
  },
  "spec": {
    "containers": [
      {
        "name": "test-container",
        "image": "k8s.gcr.io/busybox",
        "env": [
          {
            "name": "ENV",
            "value": "production"
          }
        ]
      }
    ]
  },
  "apiVersion": "v1",
  "kind": "Pod"
}
```

The output is a Pod definition in JSON.

That shouldn't be a problem because:

1. YAML is a superset of JSON. Any JSON file is also a valid YAML file
1. The Kubernetes API receives the resource in JSON even if you write YAML files. `kubectl` serialises the YAML into JSON

_What if you want to change the environment variable?_

Since this is just code, you can use native constructs:

```js|highlight=3,13,20|title=pod.js
const { Pod, Container } = require('kubernetes-models/v1')

function createPod(environment = 'production') {
  return new Pod({
    metadata: {
      name: 'test-pod',
    },
    spec: {
      containers: [
        new Container({
          name: 'test-container',
          image: 'k8s.gcr.io/busybox',
          env: [{ name: 'ENV', value: environment }],
        }),
      ],
    },
  })
}

const pod = createPod('dev')

// Any valid JSON is also valid YAML
const json = JSON.stringify(pod, null, 2)

console.log(json)
```

The code above uses a function and an argument to customise the environment variables.

You can execute the script again with:

```terminal|command=1|title=bash
node pod.js
{
  "metadata": {
    "name": "test-pod"
  },
  "spec": {
    "containers": [
      {
        "name": "test-container",
        "image": "nginx",
        "env": [
          {
            "name": "ENV",
            "value": "dev"
          }
        ]
      }
    ]
  },
  "apiVersion": "v1",
  "kind": "Pod"
}
```

You could save the above output in a file named `pod.json` and then create the Pod in the cluster with `kubectl`:

```terminal|command=1|title=bash
kubectl apply -f pod.json
```

**It works!**

You could also skip `kubectl` all together and submit the JSON to your cluster directly.

Using the official Javascript library, you could have the following code:

```js|highlight=2-5,22|title=pod.js
const { Pod, Container } = require('kubernetes-models/v1')
const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()

// Using the default credentials for kubectl
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

function createPod(environment = 'production') {
  return new Pod({
    metadata: {
      name: 'test-pod',
    },
    spec: {
      containers: [
        new Container({
          name: 'test-container',
          image: 'nginx',
          env: [{ name: 'ENV', value: environment }],
        }),
      ],
    },
  })
}

const pod = createPod('dev')

k8sApi.createNamespacedPod('default', pod).then(() => console.log('success'))
```

Writing resource definition for objects such as Deployments, Services, StatefulSets, etc. with code is convenient.

1. You don't need to come up with a way to replace values.
1. You don't need to learn YAML.
1. You can leverage functions, string concatenations are many other features that are already available as part of the language.
1. If your language of choice supports types, you can use intellisense to create resources.

However, it's not as common despite the advantages.

You can find the [above example translated in Java, Go, Python, C# in this repository](https://github.com/learnk8s/templating-kubernetes).

## Why not Helm?

[Helm is a packager manager, release manager and a templating engine.](https://learnk8s.io/helm-templating-kubernetes-yaml)

So you could use Helm to template the same Pod.

```yaml|highlight=9-11|title=pod-template.yaml
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
      value: {{ .Values.environment_name }}
```

The template cannot live in isolation and should be placed in a directory that has a specific structure — [an Helm chart](https://helm.sh/docs/topics/charts/).

```terminal|command=1|title=bash
tree
.
├── Chart.yaml
├── templates
│   └── pod-template.yaml
└── values.yaml
```

The `values.yaml` file contains all the fields that are customisable:

```yaml|title=values.yaml
environment_name: production
```

You can render the template with:

```terminal|command=1|title=bash
helm template .
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

Please note that, unless a parameter is listed in the `values.yaml`, it cannot be changed.

In the example above, you can't customise the name of the container or the name of the Pod.

If you want to do so, you should introduce more variables such as `{{ .Values.image_name }}` and `{{ .Values.pod_name }}` and add them to the `values.yaml`.

The bottom line is, unless it's wrapped into `{{ }}`, you cannot change any value.

Also, Helm doesn't _really_ understand YAML.

Helm uses the [Go templating engine](https://golang.org/pkg/text/template/) which only replaces values.

Hence, you could generate invalid YAML with Helm.

Helm is usually a popular choice because you can share and discover [charts — collection of Kubernetes resources](https://helm.sh/docs/topics/charts/).

But, when it comes to templating, it's a poor choice.

## Other configuration tools

There are many other tools that are designed to augment or replace YAML in Kubernetes.

The following list has some of the more interesting approaches:

1. [Cue is a configuration language](https://cuelang.org/) that doesn't limit itself to Kubernetes. Instead it can generate configuration for APIs, database schemas, etc.
1. [jk](https://github.com/jkcfg/jk) is a data templating tool designed to help writing structured configuration files.
1. [jsonnet](https://jsonnet.org/) is a data templating language similar to Cue.
1. [Dhall](https://github.com/dhall-lang/dhall-lang) is a programmable configuration language.
1. [Skycfg](https://github.com/stripe/skycfg) is an extension library for the Starlark language that adds support for constructing Protocol Buffer messages (and hence Kubernetes resources).

The bottom line is that all of the above tools require you to learn one more language (or DSL) to handle configuration.

_If you have to introduce a new language, why not introducing a **real** language that perhaps you already use?_

## Summary

When you manage multiple environments and multiple teams, it's natural to look for strategies to parametrise your deployments.

And templating your Kubernetes definitions, it's the next logical choise to avoid repeating yourself and standardise your practices.

There're several options to template YAML some of them treat it as a string.

You should avoid tools that don't understand YAML because they requires to pay extra care on things such as identation, escaping, etc.

Instead you should look for tools that can mangle YAML such as [`yq`](https://mikefarah.github.io/yq/) or [kustomize](https://kustomize.io/).

The other option at your disposal is to use your programming language of choice to create the objects and then serialise them into YAML or JSON.

You can find the [a few example on how to create Kubernetes YAML in Java, Go, Python, C# in this repository](https://github.com/learnk8s/templating-kubernetes).

That's all!

A special thanks goes to:

- [Daniel Weibel](https://medium.com/@weibeld) who offered excellent feedback on this article and contributed with the Go and Python translation for the example.
- [Salman Iqbal](https://twitter.com/soulmaniqbal) who translated the snippets into C#.
- [Mauricio _Salaboy_ Salatino](https://salaboy.com/) who translated the snippets into Java.
