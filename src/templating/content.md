When you have multiple Kubernetes clusters, it's common to have YAML resources that can be applied to all environments but with a small modification.

As an example, you could have a Pod that expects an environment variable with the name of the environment.

Applications built on Node.js and Ruby on Rails, as an example, have specific variables to signal the current environment — `NODE_ENV` and `RAILS_ENV` respectively.

As an example, those variables are used not to load debugging tools when you're in production.

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
    - name: ENV
      value: production
```

However, since the variable is hardcoded in the Pod, there's no easy way to deploy the same Pod in multiple environments.

You could create a Pod YAML definition for each of the environment you plan to deploy.

```terminal|command=1|title=bash
tree .
kube/
├── deployment-prod.yaml
└── deployment-staging.yaml
└── deployment-dev.yaml
```

Even if it is a temporary workaround, having several files has its challenges.

If you update the name of the image or the version, you should update all the files containing the same values.

## Using templates with search and replace

A better strategy is to have a placeholder and replace it with the real value before the resource is submitted to the cluster.

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

However, tagging all the templates and injecting placeholders is limiting.

_What if you want to change a value that isn't a placeholder?_

_What if you have to many, what does the `sed` command looks like?_

If you have only a handful variables that you wish to change, you might want to install `yq` — a command line tool designed to transform yaml.

> The CLI `yq` is similar to another more popular tool called `jq` that focuses on JSON instead of YAML.

## Templating with yq

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
    - name: ENV
      value: production
```

You could read the value for the environment variable `ENV` with:

```terminal|command=1|title=bash
yq r pod.yaml spec.containers[0].env[0].value
production
```

The command works as follows:

- `yq r` is the command to read a value from the YAML file.
- `pod.yaml` is the path of the YAML that you want to read
- `spec.containers[0].env[0].value` is the path of the value that you want to read

_What if you want to change the value instead?_

Perhaps you want to deploy to a dev environment and have to change the environment variable.

You can use the following command:

```terminal|command=1|title=bash
yq w pod.yaml spec.containers[0].env[0].value dev
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
      value: dev
```

You should notice that `yq` printed the result on the standard output.

If you prefer to edit the YAML in place, you should add the `-i` flag.

The difference between `yq` and `sed` is that the former understands the YAML format and can navigate and mangle the structured markup.

On the other hands, `sed` is treating files as strings and it doesn't mind if the file isn't a valid YAML.

Since `yq` understands YAML, let's explore a few more complex scenarios.

Let's assume that you want to inject an extra container to all the Pods submitted through the cluster.

But instead of using an Admission Webhook, you decide to add an extra step to your continuos integration pipeline.

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
    - name: ENV
      value: dev
```

You can issue the following command and merge the two YAMLs:

```terminal|command=1|title=bash
yq m --append pod.yaml envoy-pod.yaml
```

> Please notice the `--append` flag that is necessary to append values to an array. You can find more details in [the official documentation](https://mikefarah.github.io/yq/merge).

The output should have a proxy named Envoy as a container in the Pod:

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
    - name: ENV
      value: dev
  - name: proxy-container
    image: envoyproxy/envoy:v1.12.2
    ports:
      - containerPort: 80
```

In other words, the two YAML files are merged into one.

While the example shows a convenient strategy to compose complex YAML from basic files, it also shows some of the limitations of `yq`:

1. The two YAML files are merged at the top level. There's no way you add a chunk of YAML file under `.spec.containers[]`.
1. The order of the files matters. If you invert the order, `yq` keeps the wrong name for the pod in `metadata.name`.
1. You have to tell `yq` explicity when to append and overwrite values. Since those are flags apply to the whole document, it's hard to get the right granularity.

However, if you plan to use `yq` for small projects, you can probably go quite far with it.

You can take `yq` to the next level with kustomize.

While `yq` understands and transforms YAML, kustomize can understand and transform Kubernetes YAML.

That's a subtle but important difference so you will explore that next.

## Templating with Kustomize

Kustomize is a command line tool that can create and transform YAML files — just like `yq`.

However, instead of using only the command line, kustomize uses a file called `kustomization.yaml` to decide how to generate the YAML.

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
    - name: ENV
      value: production
```

You should also create a `kustomization.yaml` file:

```yaml|title=kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - pod.yaml
```

You can execute the kustomize to render the YAML template:

```terminal|command=1|title=bash
kubectl kustomize prod
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - env:
    - name: ENV
      value: production
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

> Please notice that the name of the resources has to match.

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
kubectl kustomize prod
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
    - name: ENV
      value: production
    image: k8s.gcr.io/busybox
    name: test-container
```

The patch functionality works in a similar way of `yq`, but setup for kustomize is more verbose.

_Should you stop using kustomize in favour or `yq`?_

Kustomize is designed to map changes and resources easily.

You should create another folder at the same level at the previous one:

```terminal|command=1,2,3|title=bash
cd ..
mkdir dev
cd dev
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

The new configuration extends the base configuration `prod`, so there's no need to reapply all patches.

Instead, you can create a single YAML file that changes the environment variable:

```yaml|title=pod-patch-env.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
    - name: test-container
      env:
      - name: ENV
        value: dev
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
    - name: ENV
      value: dev
    image: k8s.gcr.io/busybox
    name: test-container
```

Please notice how:

1. you still have the extra container which is patched in the base `kustomization.yaml` file
1. the environment variable was changed to `dev`

You can imagine that you can have more folders and more `kustomization.yaml` to match your clusters and environments.

_Can you also edit fields without having to create a folder, a `kustomization.yaml` and the extra YAML?_

Kustomize supports inline editing for some fields.

Kustomize is more structured that `yq` but this convenience comes with some drawbacks.

Kustomize is designed on purpose to [make it hard to change values through the command line](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/eschewedFeatures.md#unstructured-edits).

You have to write YAML files to change even a single value — unlike `yq`.

_Is there an alternative to Kustomize and `yq` that is flexible and structured?_

## Writing YAML with code

You could generate YAML programatically with code.

And you don't even need to start from scratch.

Kubernetes has several official libraries where you can create objects such as Deployments and Pod with code.

> Please note that since Kubernetes uses an OpenAPI, you can autogenerate a library for your favourite language — if there isn't one already.

As an example, let's have a look at how you can use Javascript to create a Pod and programatically change it.

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
        image: 'k8s.gcr.io/busybox',
        env: [{ name: 'ENV', value: 'production' }],
      }),
    ],
  },
})

console.log(JSON.stringify(pod, null, 2))
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

The output is a Pod, but it's in JSON and not YAML.

That shouldn't be a problem because:

1. YAML is a superset of JSON. Any JSON file is also a valid YAML file
1. The Kubernetes API receives the resource in JSON even if you write YAML files. `kubectl` serialises the YAML into JSON

_What if you want to change the environment variable?_

Since this is just code, you can use native constructs:

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
        image: 'k8s.gcr.io/busybox',
        env: [{ name: 'ENV', value: process.env.ENV || 'production' }],
      }),
    ],
  },
})

console.log(JSON.stringify(pod, null, 2))
```

The code above read the environment variable `ENV` and, if set, set the according value in the JSON.

```terminal|command=1|title=bash
ENV=dev node pod.js
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

You could also skip `kubectl` all together and submit the JSON to your cluster.

Using the official Javascript library, you could have the following code:

```js|highlight=2-5,22|title=pod.js
const { Pod, Container } = require('kubernetes-models/v1')
const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

const pod = new Pod({
  metadata: {
    name: 'test-pod',
  },
  spec: {
    containers: [
      new Container({
        name: 'test-container',
        image: 'k8s.gcr.io/busybox',
        env: [{ name: 'ENV', value: process.env.ENV || 'production' }],
      }),
    ],
  },
})

k8sApi.createNamespacedPod('default', pod).then(() => console.log('success'))
```

Writing resource definition for objects such as Deployments, Services, StatefulSets, etc. with code is convenient.

1. You don't need to come up with a way to replace values
1. You don't need to learn YAML
1. You can leverage functions, string concatenations are many other features that are already available as part of the language

However, it requires more dedication and setup time.

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

The template cannot live in isolation and should be placed in a directory that has a specific structure.

```terminal|command=1|title=bash
tree
.
├── Chart.yaml
├── templates
│   ├── pod-template.yaml
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

With both `yq` and kustomize you could have find a way to change them, but not with Helm.

Also, Helm doesn't understand YAML.

Helm uses the Go templating engine which only replaces values.

Hence, you could generate invalid YAML with Helm.

There are many other tools that are designed to augment or replace YAML in Kubernetes.

The following list has some of the more interesting approaches:

1. Cue is a configuration language that doesn't limit itself to Kubernetes.

Instead it can generate configuration for APIs, database schemas, etc.

## Summary
