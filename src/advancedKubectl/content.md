If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

This article contains a series of tips and tricks to help you boost your kubectl productivity. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!

## Contents

- [**Introduction: what is kubectl?**](#introduction-what-is-kubectl-)
- [**1. Save typing with command completion**](#1-save-typing-with-command-completion)
- [**2. Quickly look up resource specifications**](#2-quickly-look-up-resource-specifications)
- [**3. Use the custom columns output format**](#3-use-the-custom-columns-output-format)
- [**4. Switch between clusters and namespaces with ease**](#4-switch-between-clusters-and-namespaces-with-ease)
- [**5. Save typing with auto-generated aliases**](#5-save-typing-with-auto-generated-aliases)
- [**6. Extend kubectl with plugins**](#6-extend-kubectl-with-plugins)

## Introduction: what is kubectl?

Before learning how to use kubectl more efficiently, you should have a basic understanding of what it is and how it works.

From a user's point of view, kubectl your cockpit to control Kubernetes. It allows you to perform every possible Kubernetes operation.

From a technical point of view, kubectl is a client for the **Kubernetes API**.

The Kubernetes API is an **HTTP REST API**. This API is the real Kubernetes **user interface**. Kubernetes is fully controlled through this API. This means that every Kubernetes operation is exposed as an API endpoint and can be executed by an HTTP request to this endpoint.

Consequently, the main job of kubectl is to carry out HTTP requests to the Kubernetes API:

![Kubernetes API](kubernetes-api.svg)

> Kubernetes is a fully **resource-centred** system. That means, Kubernetes maintains an internal state of resources, and all Kubernetes operations are [**CRUD**](https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete) operations on these resources. You fully control Kubernetes through manipulation of these resources (and Kubernetes figures out what to do based on the current state of resources). For this reason, the Kubernetes [**API reference**](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/) is organised as a list of resource types with their associated operations.

Let's consider an example.

Imagine you want to create a [ReplicaSet](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#replicaset-v1-apps) resource. To do so, you would define the ReplicaSet in a file named `replicaset.yaml` file, and then run the following command:

~~~bash
kubectl create -f replicaset.yaml
~~~

Obviously, this creates your ReplicaSet in Kubernetes. But what happens behind the scenes?

Kubernetes has a *create ReplicaSet* operation, and like all Kubernetes operations, it is exposed as an API endpoint. The specific API endpoint for this operation is as follows:

~~~
POST /apis/apps/v1/namespaces/{namespace}/replicasets
~~~

> You can find the API endpoints of all Kubernetes operations in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13) (including the [above endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-replicaset-v1-apps)). To make an actual request to an endpoint, you need to prepend the URL of the API server to the endpoint paths that are listed in the API reference.

Consequently, when you execute the above command, kubectl makes an HTTP POST request to the above API endpoint. The ReplicaSet definition (that you provided in the `replicaset.yaml` file) is passed in the body of the request.

This is how kubectl works for *all* commands that interact with the Kubernetes cluster. In all these cases, kubectl simply makes HTTP requests to the appropriate Kubernetes API endpoints.

> Note that it's totally possible to control Kubernetes with a tool like `curl` by manually issuing HTTP requests to the Kubernetes API. Kubectl just makes it easier for you to use the Kubernetes API.

These are the basics of what kubectl is and how it works. But there is much more about the Kubernetes API that every kubectl user should know. To this end, let's briefly dive into the Kubernetes internals.


### Kubernetes internals

Kubernetes consists of a set of independent components that run as separate processes on the nodes of a cluster. Some components run on the master nodes and others run on the worker nodes, and each component has a very specific function.

The most important components on the master nodes are:

- **Storage backend:** stores resource definitions (usually [etcd](https://coreos.com/etcd/) is used)
- **API server:** provides Kubernetes API and manages storage backend
- **Controller manager:** ensures resource statuses match specifications
- **Scheduler:** schedules Pods to worker nodes

And the most important component running on each worker node is:

- **kubelet:** manages execution of containers on a worker node

To see how these components work together, let's consider an example.

Assume, you just executed `kubectl create -f replicaset.yaml`, upon which kubectl made an HTTP POST request to the [*create ReplicaSet* API endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-replicaset-v1-apps) (passing along your ReplicaSet resource definition).

What happens now inside Kubernetes?


```slideshow
{
  "description": "Walkthrough from the creation of a ReplicaSet to the execution of the containers on the worker nodes.",
  "slides": [
    {
      "image": "kubernetes-internals-1.svg",
      "description": "Following `kubectl create -f replicaset.yaml`, the API server saves your ReplicaSet resource definition in the storage backend."
    },
    {
      "image": "kubernetes-internals-2.svg",
      "description": "This triggers the ReplicaSet controller in the controller manager, who watches for creations, updates, and deletions of ReplicaSet resources."
    },
    {
      "image": "kubernetes-internals-3.svg",
      "description": "The ReplicaSet controller creates a Pod definition for each replica of the ReplicaSet (according to the Pod template in the ReplicaSet definition) and saves them in the storage backend."
    },
    {
      "image": "kubernetes-internals-4.svg",
      "description": "This triggers the scheduler who watches for Pods that have not yet been assigned to a worker node."
    },
    {
      "image": "kubernetes-internals-5.svg",
      "description": "The scheduler chooses a suitable worker node for each Pod and adds this information to the Pod definitions in the storage backend."
    },
    {
      "image": "kubernetes-internals-6.svg",
      "description": "This triggers the kubelet on the worker node that the Pods have been scheduled to, who watches for Pods that have been scheduled to its worker node."
    },
    {
      "image": "kubernetes-internals-7.svg",
      "description": "The kubelet reads the Pod definitions from the storage backend, downloads the required container images, and runs the containers via Docker (or another container runtime) on the worker node."
    }
  ]
}
```

The API request to the *create ReplicaSet* endpoint is handled by the **API server**. The API server authenticates the request and saves your ReplicaSet resource definition in the storage backend.

This event triggers the **ReplicaSet controller**, which is a sub-process of the **controller manager**. The ReplicaSet controller watches for creations, updates, and deletions of ReplicaSet resources in the storage backend, and gets notified by an event when this happens.

The job of the ReplicaSet controller is to make sure that the required number of replica Pods of a ReplicaSet exists. In our example, no Pods exist yet, so the ReplicaSet controller creates these Pod definitions (according to the Pod template in the ReplicaSet definition) and saves them in the storage backend.

The creation of the new Pods triggers the **scheduler**, who watches for Pod definitions that are not yet scheduled to a worker node. The scheduler chooses a suitable worker node for each Pod and updates the Pod definitions in the storage backend with this information.

> Note that up to this point, no workload code is being run anywhere in the cluster. All that has been done so far is creating and updating resources in the storage backend on the master node.

This event triggers the **kubelets** who watch for Pods that are scheduled to their worker nodes. The kubelet of the worker node your ReplicaSet Pods have been scheduled to downloads the container images for these Pods (if not already present on the machine) and runs them with the configured container runtime (which may be Docker or another container runtime).

At this point, finally, your ReplicaSet application is running!

### The role of the Kubernetes API

As you can see from the above example, Kubernetes components (except the API server and the storage backend) work by watching for resource changes in the storage backend and manipulating resources in the storage backend.

However, these components **do not** access the storage backend directly, but only **through the Kubernetes API**.

Consider the following examples:

- The ReplicaSet controller uses the [*list ReplicaSets* API endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#list-replicaset-v1-apps) API operation with a `watch` parameter for watching for changes to ReplicaSet resources.
- The ReplicaSet controller uses the [*create Pod* API endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-pod-v1-core) for creating Pods.
- The scheduler uses the [*patch Pod* API endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#patch-pod-v1-core) for updating Pods with the information about the selected worker node.

As you can see, this is the **same API that is also used by kubectl**.

This double usage of the Kubernetes API for internal components as well as for external users is a **fundamental design concept** of Kubernetes.

With this knowledge, you can summarise how Kubernetes works as follows:

- The storage backend stores the state (i.e. resources) of Kubernetes.
- The API server provides an interface to the storage backend in the form of the Kubernetes API.
- All other Kubernetes components and users read, watch, and manipulate the state (i.e. resources) of Kubernetes through the Kubernetes API.

Being familiar with these concepts **will help you a lot** to understand kubectl better and make the most use of it!

Let's now look at a series of concrete tips and tricks to help you boost your kubectl productivity.

## 1. Save typing with command completion

One of the most useful, but often overlooked, tricks to boost your kubectl productivity is command completion.

Command completion allows you to auto-complete individual parts of kubectl commands with the *Tab* key. This works for sub-commands, options, and arguments, including hard-to-type things like resource names.

Here you can see kubectl command completion in action:

![](asciicast-completion.gif)

Command completion is available for the [**Bash**](https://www.gnu.org/software/bash/) and [**Zsh**](https://www.zsh.org/) shells.

The [official documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion) contains detailed instructions for setting up command completion, but the following sections provide a recap for you.

### How command completion works

In general, command completion is a shell feature that works by the means of a **completion script**. A completion script is a shell script that defines the completion behaviour for a specific command. Sourcing a completion script enables completion for the corresponding command.

Kubectl can automatically generate and print out the completion scripts for Bash and Zsh with the following commands:

~~~
kubectl completion bash
kubectl completion zsh
~~~

In theory, sourcing the output of this command in the appropriate shell enables kubectl command completion.

However, in practice, the details differ for Bash (including a difference between Linux and macOS) and Zsh. The following sections explain all these cases:

- [**Set up command completion for Bash on Linux**](#bash-on-linux)
- [**Set up command completion for Bash on macOS**](#bash-on-macos)
- [**Set up command completion for Zsh**](#zsh)

### Bash on Linux

The completion script for Bash depends on the [**bash-completion**](https://github.com/scop/bash-completion) project, so you have to install that first.

You can install bash-completion with [various package managers](https://github.com/scop/bash-completion#installation). For example:

~~~
sudo apt-get install bash-completion
yum install bash-completion
~~~

You can test if bash-completion is correctly installed with the following command:

~~~bash
type _init_completion
~~~

If this outputs the code of shell function, then bash-completion has been correctly installed. If the command outputs a `not found` error, you have to add the following line to your `~/.bashrc` file:

~~~bash
source /usr/share/bash-completion/bash_completion
~~~

> Whether you have to add this line to your `~/.bashrc` file or not, depends on the package manager you used to install bash-completion. For APT it's necessary, for yum not.

Once bash-completion is installed, you have to set things up so that the kubectl **completion script** gets sourced in all your shell sessions.

One way to do this is to add the following line to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

Another possibility is to add the kubectl completion script to the `/etc/bash_completion.d` directory (create it, if it doesn't exist):

~~~bash
kubectl completion bash >/etc/bash_completion.d/kubectl
~~~

> All completion scripts in the `/etc/bash_completion.d` directory are automatically sourced by bash-completion.

Both approaches are equivalent.

After reloading your shell, kubectl command completion should be working!

[Jump to the next section →](#2-quickly-look-up-resource-specifications)

### Bash on macOS

With macOS, there is a slight complication. The reason is that the default version of Bash on macOS is 3.2, which is quite outdated. The kubectl completion script unfortunately requires at least Bash 4.1 and thus doesn't work with Bash 3.2.

> The reason that Apple includes an outdated version of Bash in macOS is that newer versions use the [GPLv3](https://en.wikipedia.org/wiki/GNU_General_Public_License) license, which Apple doesn't support.

That means, to use kubectl command completion on macOS, you have to **install a newer version of Bash**. You can even make it your new default shell, which will save you a lot of trouble of this kind in the future. It's actually not difficult, and you can find instructions in an [**Upgrading Bash on macOS**](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba) article that I wrote previously.

*Before continuing, make sure that you are now indeed using Bash 4.1 or newer (find out with `bash --version`).*

The completion script for Bash depends on the [**bash-completion**](https://github.com/scop/bash-completion) project, so you have to install that first.

You can install bash-completion with [Homebrew](https://brew.sh):

~~~bash
brew install bash-completion@2
~~~

> The `@2` stands for of **bash-completion v2**. The kubectl completion script requires bash-completion v2, and bash-completion v2 requires at least Bash 4.1. This is the reason that you can't use the kubectl completion script on Bash versions lower than 4.1.

The output of the `brew install` command includes a "Caveats" section with instructions to add the following lines to your `~/.bash_profile` file:

~~~bash
export BASH_COMPLETION_COMPAT_DIR=/usr/local/etc/bash_completion.d
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
~~~

You have to do this in order to complete the installation of bash-completion. However, I recommend adding these lines to your `~/.bashrc` instead of `~/.bash_profile` file. This ensures that bash-completion is also available in sub-shells.

After reloading your shell, you can test if bash-completion is correctly installed with the following command:

~~~bash
type _init_completion
~~~

If this outputs the code of a shell function, then you're all set.

Now, you have to set things up so that the kubectl **completion script** gets sourced in all your shell sessions.

One way to do this is to add the following line to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

Another possibility is to add the kubectl completion script to the `/usr/local/etc/bash_completion.d` directory:

~~~bash
kubectl completion bash >/usr/local/etc/bash_completion.d/kubectl
~~~

> This only works if you installed bash-completion with Homebrew. In that case, bash-completion sources all completion scripts in this directory.

In case you also [installed kubectl with Homebrew](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-with-homebrew-on-macos), you don't even have to do the above step, because the completion script should already have been put in the `/usr/local/etc/bash_completion.d` directory by the kubectl Homebrew formula. In that case, kubectl completion should just start working automatically after installing bash-completion.

In the end, all of these approaches are equivalent.

After reloading your shell, kubectl completion should be working!

[Jump to the next section →](#2-quickly-look-up-resource-specifications)

### Zsh

The completion script for Zsh doesn't have any dependencies. So, all you have to do is to set things up so it gets sourced in all your shell sessions.

You can do this by adding the following line to your `~/.zshrc` file:

~~~bash
source <(kubectl completion zsh)
~~~

In case you get a `command not found: compdef` error after reloading your shell, you have to enable the `compdef` builtin, which you can do by adding the following to the beginning of your `~/.zshrc` file:

~~~bash
autoload -Uz compinit
compinit
~~~

## 2. Quickly look up resource specifications

When you create YAML resource definitions, you need to know the fields and their meanings of these resources. One location to look up this information is in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/), which contains the full specifications of all resources.

However, switching to a web browser each time you need to look up something is tedious. Therefore, kubectl provides the `kubectl explain` command, which can print out the resource specifications of all resources right in your terminal.

The usage of `kubectl explain` is as follows:

~~~bash
kubectl explain resource[.field]...
~~~

The command outputs the specification of the requested resource or field. The information shown by `kubectl explain` is identical to the information in the API reference.

Here you can see `kubectl explain` in action:

![](asciicast-kubectl-explain.gif)

By default, `kubectl explain` displays only a single level of fields. You can display the **entire tree** of fields with the `--recursive` flag:

~~~bash
kubectl explain deployment.spec --recursive
~~~

In case you're not sure about which **resource names** you can use with `kubectl explain`, you can display all of them with the following command:

~~~bash
kubectl api-resources
~~~

This command displays the resource names in their plural form (e.g. `deployments` instead of `deployment`). It also displays the shortname (e.g. `deploy`) for those resources that have one. Don't worry about these differences. All of these name variants are equivalent for kubectl. That is, you can use any of them for `kubectl explain`.

For example, all of the following commands are equivalent:

~~~bash
kubectl explain deployments.spec
kubectl explain deployment.spec
kubectl explain deploy.spec
~~~

## 3. Use the custom columns output format

The default output format of the `kubectl get` command (for *reading* resources) is as follows:

~~~bash
$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
engine-544b6b6467-22qr6   1/1     Running   0          78d
engine-544b6b6467-lw5t8   1/1     Running   0          78d
engine-544b6b6467-tvgmg   1/1     Running   0          78d
web-ui-6db964458-8pdw4    1/1     Running   0          78d
~~~

That's a nice human-readable format, but it contains only a limited amount of information. As you can see, just some few fields (compared to the full resource definitions) are shown for each resource.

That's where the [**custom columns**](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#resource-operations) output format comes in. This output format lets you freely define the columns and the data to display in them. You can choose *any* field of a resource to be displayed as a separate column in the output

The usage of the custom columns output option is as follows:

~~~
-o custom-columns=&lt;header&gt;:&lt;jsonpath&gt;[,&lt;header&gt;:&lt;jsonpath&gt;]...
~~~

You have to define each output column as a `<header>:<jsonpath>` pair:

- `<header>` is the name of the column, you can choose anything you want.
- `<jsonpath>` is an expression that selects a resource field (explained in more detail below).

Let's look at a simple example:

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name'
NAME
engine-544b6b6467-22qr6
engine-544b6b6467-lw5t8
engine-544b6b6467-tvgmg
web-ui-6db964458-8pdw4
~~~

Here, the output consists of a single column displaying the names of all Pods.

The expression selecting the Pod names is `metadata.name`. The reason for this is that the name of a Pod is defined in the `name` field of the `metadata` field of a Pod resource (you can look this up in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#pod-v1-core) or with `kubectl explain pod.metadata.name`).

Now, imagine you want to add an additonal column to the output, for example, showing the node that each Pod is running on. To do so, you can just add an appropriate column specification to the custom columns option:

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name,NODE:spec.nodeName'
NAME                      NODE
engine-544b6b6467-22qr6   ip-10-0-80-67.ec2.internal
engine-544b6b6467-lw5t8   ip-10-0-36-80.ec2.internal
engine-544b6b6467-tvgmg   ip-10-0-118-34.ec2.internal
web-ui-6db964458-8pdw4    ip-10-0-118-34.ec2.internal
~~~

The expression selecting the node name is `spec.nodeName`. This is because the node a Pod has been scheduled to is saved in the `spec.nodeName` field of a Pod (see `kubectl explain pod.spec.nodeName`).

> Note that Kubernetes resource fields are **case-sensitive**.

You can set *any* field of a resource as an output column in that way. Just browse the resource specifications and try it out with any fields you like!

But first, let's have a closer look at these field selection expressions.

### JSONPath expressions

The expressions for selecting resource fields are based on [JSONPath](https://goessner.net/articles/JsonPath/index.html). 

JSONPath is a language to extract data from JSON documents (it is similar to XPath for XML). Selecting a single field is only the most basic usage of JSONPath. It has [a lot of features](https://goessner.net/articles/JsonPath/index.html#e3), like list selectors, filters, and more.

However, with `kubectl explain`, only a subset of the JSONPath capabilities is supported. The following summarises these supported features with example usages:

~~~bash
# Select all elements of a list
kubectl get pods -o custom-columns='DATA:spec.containers[*].image'

# Select a specific element of a list
kubectl get pods -o custom-columns='DATA:spec.containers[0].image'

# Select those elements of a list that match a filter expression
kubectl get pods -o custom-columns='DATA:spec.containers[?(@.image!="nginx")].image'

# Select all fields under a specific location, regardless of their name
kubectl get pods -o custom-columns='DATA:metadata.*'

# Select all fields with a specific name, regardless of their location
kubectl get pods -o custom-columns='DATA:..image'
~~~

Of particular importance is the `[]` operator. Many fields of Kubernetes resources are lists, and this operator allows you to select items of these lists. It is often used with a wildcard as `[*]` to select all items of the list.

Below you will find some examples that use this notation.

### Example applications

The possibilities for using the custom columns output format are endless, as you can display any field, or combination of fields, of a resource in the output. Here are some example applications, but feel free to explore on your own and find applications that are useful to you!

> **Tip:** if you end up using one of these a commands frequently, you can create a [shell alias](https://en.wikipedia.org/wiki/Alias_(command)#Creating_aliases) for it.

#### Display container images of Pods

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name,IMAGES:spec.containers[*].image'
NAME                       IMAGES
engine-544b6b6467-22qr6    rabbitmq:3.7.8-management,nginx
engine-544b6b6467-lw5t8    rabbitmq:3.7.8-management,nginx
engine-544b6b6467-tvgmg    rabbitmq:3.7.8-management,nginx
web-ui-6db964458-8pdw4     wordpress
~~~

This command displays the names of all the container images of each Pod.

> Remember that a Pod may contain more than one container. In that case, the container images of a single Pod are displayed as a comma-separated list in the same column.

#### Display availability zones of nodes

~~~bash
$ kubectl get nodes -o custom-columns='NAME:metadata.name,ZONE:metadata.labels.failure-domain\.beta\.kubernetes\.io/zone'
NAME                          ZONE
ip-10-0-118-34.ec2.internal   us-east-1b
ip-10-0-36-80.ec2.internal    us-east-1a
ip-10-0-80-67.ec2.internal    us-east-1b
~~~

This command can be useful if your Kubernetes cluster is deployed on a public cloud infrastructure (such as AWS, Azure, or GCP). It displays the *availability zone* that each node is in.

> The *availability zone* is a cloud concept that denotes a point of replication within a geographical *region*.

The availability zones for each node are obtained through the special [`failure-domain.beta.kubernetes.io/zone`](https://kubernetes.io/docs/reference/kubernetes-api/labels-annotations-taints/#failure-domainbetakubernetesiozone) label. If the cluster runs on a public cloud infrastructure, then this label is automatically created and its value is set to the name of the availability zone of the node.

Labels are not part of the Kubernetes resource specifications, so you can't find the above label in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/). However, you can see it (as well as all other labels), if you output the nodes as YAML or JSON:

~~~bash
kubectl get nodes -o yaml
kubectl get nodes -o json
~~~

This is generally a good way to discover even more information about your resources, in addition to exploring the [resource specifications](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/).

<!--
### What `kubectl get` gets from the API server

- You can set the log level for kubectl with the `-v` option
    - Default is 0 (`-v 0`), highest is 10 (`-v 10`)
- If you set the log level to 9+, the output includes each request kubectl makes to the API server, including the full request and response bodies
    - Thus, you can see what exactly the response to a `kubectl get` API request is
- The response bodies to GET requests issued by `kubectl get` are:
    - Always JSON
    - For the default output format and `-o wide` with `--server-print=true` (this is the default)
        - JSON object of kind *Table* that defines the columns and rows of the output table
        - https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables
        - Since v1.10
    - The above with `--server-print=false` and all other output formats:
        - List* operation:
            - JSON object representing resource of kind *XList* (e.g. *PodList*) according to [API reference](https://kubernetes.io/docs/reference/kubernetes-api/)
            - Similar, but not identical, to the output with the `-o json` option (this output object is of kind *List*)
            - In Kubernetes v1.13, for all resources except the following ones there exists a *XList* object (where *X* is the resource type):
                - Container
                - Volume
                - Binding
                - LocalSubjectAccessReview
                - SelfSubjectAccessReview
                - SelfSubjectRulesReview
                - SubjectAccessReview
                - TokenReview
        - Read operation:
            - JSON object representing a resource of kind *X* (e.g. *Pod*) according to [API reference](https://kubernetes.io/docs/reference/kubernetes-api/)
            - Exactly the same as the output with the `-o json` option

### When creating resources with kubectl: what is sent to the API server

- The request bodies for POST request issued, for example, by `kubectl create` are:
    - Always JSON
    - A JSON representation fo the resource specification that is passed to `kubectl create` (no matter if the specification is in YAML or JSON)

### Creating resources by talking to the API server directly

- Start a proxy to the API server with kubectl: kubectl proxy
    - API server can now be accessed as http://127.0.0.1:8001
- Now, you can create resources as follows (example for a pod):
    - `curl -H "Content-Type: <in>" -H "Accept: <out>" -d "$(cat file)" -X POST http://127.0.0.1:8001/api/v1/namespaces/default/pods`
        - Where:
            - `<in>` is the data type of the resource specification in `file`. It can be one of:
            - `<out>` is the desired data type of the response
            - Both `<in>` and `<out>` can be one of:
                - `application/json` (default for `<out>`)
                - `application/yaml`
                - `application/vnd.kubernetes.protobuf`
    - That means, the API server accepts resource specifications in three formats: JSON, YAML, and Protocol Buffers
        - This is as explained in [Managing Kubernetes, Chapter 4](https://www.oreilly.com/library/view/managing-kubernetes/9781492033905/ch04.html) (Alternate Encodings)
        - Protobuf support is a newer feature, see here: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/protobuf.md
    - On a POST request, the API server returns the completed specification of the created resource
        - This returned specifications contains all the default and initialised values that were not present in the specification initially passed to the API server
    - You can choose any combinations of input and output formats (i.e. `<in>` and `<out>`)
        - For example, post a specification in YAML (set `<in>` to `application/yaml`) and get the response in Protocol Buffers (set `<out>` to `application/vnd.kubernetes.protobuf`
    - https://kubernetes.io/docs/reference/using-api/api-concepts/#alternate-representations-of-resources
-->

## 4. Switch between clusters and namespaces with ease

When kubectl has to make a request to the Kubernetes API, it reads the so-called **kubeconfig** file on your system to get all the connection parameters it needs to access and make a request to the API server.

> The default kubeconfig file is `~/.kube/config`. This file is usually automatically created or updated by some command (for example, `aws eks update-kubeconfig` or `gcloud container clusters get-credentials`, if you use managed Kubernetes services).

When you work with **multiple clusters**, then you have connection parameters for *multiple* clusters configured in your kubeconfig file. This means, you need a way to tell kubectl to *which* of these clusters you want it to connect.

Within a cluster, you can set up **multiple [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)** (a namespace is kind of "virtual" clusters within a physical cluster). Kubectl determines which namespace to use for a request from the kubeconfig file as well. So, you need a way to tell kubectl *which* of these namespaces you want it to use.

This section explains how this works and how you can do it effortlessly.

> Note that you can also have multiple kubeconfig files by listing them in the [`KUBECONFIG`](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#the-kubeconfig-environment-variable) environment variable. In that case, all these files will be merged into a single effective configuration at execution time. You can also overwrite the default kubeconfig file with the `--kubeconfig` option for every kubectl command. See the [official](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) [documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/).

### Kubeconfig files

Let's see what a kubeconfig file actually contains:

![A kubeconfig file contains a set of contexts](kubeconfig-1.svg)

As you can see, a kubeconfig file consists of a set of **contexts**. A context contains the following three elements:

- **Cluster:** URL of the API server of a cluster
- **User:** authentication credentials for a specific user of the cluster
- **Namespace:** the namespace to use when connecting to the cluster

> In practice, people often use a single context per cluster in their kubeconfig file. However, you could also have multiple contexts per cluster, differing in their *user* or *namespace*. But this seems to be less common so that often there is a one-to-one mapping between clusters and contexts.

At any given time, one of these contexts is set as the **current context** (through a dedicated field in the kubeconfig file):

![One of the contexts in a kubeconfig file is set as the current context](kubeconfig-2.svg)

When kubectl reads a kubeconfig file, it always uses the information from the *current context*. Thus, in the above example, kubectl would connect to the *Hare* cluster.

Consequently, to switch to another cluster, you can just change the *current context* in the kubeconfig file:

![Changing the current context of a kubeconfig file](kubeconfig-3.svg)

In the above example, kubectl would now connect to the *Fox* cluster.

And to switch to another namespace in the same cluster, you can change the value of the *namespace* element of the current context:

![Changing the namespace of the current context in a kubeconfig file](kubeconfig-4.svg)

In the above example, kubectl would now use the *Prod* namespace in the *Fox* cluster (instead of the *Test* namespace that was set before).

> Note that kubectl also provides the `--cluster`, `--user`, `--namespace`, and `--context` options that allow you to overwrite individual elements and the current context itself, regardless of what is set in the kubeconfig file. See `kubectl options`.

In theory, you could do these changes by manually editing the kubeconfig file. But of course this is tedious. The following sections present various tools that allow you to do these changes automatically.

### Use kubectx

A very popular tool for switching between clusters and namespaces is [**kubectx**](https://github.com/ahmetb/kubectx/).

This tool provides the `kubectx` and `kubens` commands that allow you to change the current context and namespace, respectively.

> As mentioned, changing the current context means changing the cluster, if you have only a single context per cluster.

Here you can see these two commands in action:

![](asciicast-kubeconfig-kubectx.gif)

> Under the hood, these commands just edit the kubeconfig file as explained in the previous section.

To install kubectx, just follow the [instructions on the GitHub page](https://github.com/ahmetb/kubectx/#installation).

Both `kubectx` and `kubens` provide **command completion** through a completion script. This allows you to auto-complete the context names and namespaces so that you don't have to fully type them. You can find the instructions to set up completion on the [GitHub page](https://github.com/ahmetb/kubectx/#installation) as well.

Another useful feature of kubectx is the [**interactive mode**](https://github.com/ahmetb/kubectx/#interactive-mode). This works in conjunction with the [**fzf**](https://github.com/junegunn/fzf) tool, which you have to install separately (in fact, installing fzf, automatically enables kubectx interactive mode). The interactive mode allows you to select the target context or namespace through an interactive fuzzy search interface (provided by fzf).

### Use shell aliases

Actually, you don't really need separate tools to change the current context and namespace, because kubectl provides commands for doing this too. In particular, the `kubectl config` command provides sub-commands for editing kubeconfig files. Here are some of them:

- `kubectl config get-contexts`: list all contexts
- `kubectl config current-context`: get the current context
- `kubectl config use-context`: change the current context
- `kubectl config set-context`: change an element of a context

However, using these commands directly is not very convenient, because they are long to type. But what you can do is wrapping them into shell aliases that can be more easily executed.

I created a set of aliases based on these commands that provide a similar functionality as kubectx. Here you can see them in action:

![](asciicast-kubeconfig-aliases.gif)

> Note that the aliases use [**fzf**](https://github.com/junegunn/fzf) to provide an interactive fuzzy search interface (like the interactive mode of kubectx). That means, you need to [install fzf](https://github.com/junegunn/fzf#installation) in order to use these aliases.

Here are the definitions of the aliases:

~~~bash
# Get current context
alias krc='kubectl config current-context'
# List all contexts
alias klc='kubectl config get-contexts -o name | sed "s/^/  /;\|^  $(krc)$|s/ /*/"'
# Change current context
alias kcc='kubectl config use-context "$(klc | fzf -e | sed "s/^..//")"'

# Get current namespace
alias krn='kubectl config get-contexts --no-headers "$(krc)" | awk "{print \$5}" | sed "s/^$/default/"'
# List all namespaces
alias kln='kubectl get -o name ns | sed "s|^.*/|  |;\|$(krn)|s/ /*/"'
# Change current namespace
alias kcn='kubectl config set-context --current --namespace "$(kln | fzf -e | sed "s/^..//")"'
~~~

To **install these aliases**, you just have to add the above definitions to your `~/.bashrc` or `~/.zshrc` file and reload your shell!

### Use plugins

Kubectl allows installing plugins that can be invoked like native commands. You can, for example, install a plugin named *kubectl-foo* and then invoke it as `kubectl foo`.

> Kubectl plugins will be described in detail in a [later section of this article](#6-extend-kubectl-with-plugins).

Wouldn't it be nice to be able to change the current context and namespace like that? For example, running `kubectl ctx` to change the context and `kubectl ns` to change the namespace?

I created two plugins that allow to do that:

- [**kubectl-ctx**](https://github.com/weibeld/kubectl-ctx)
- [**kubectl-ns**](https://github.com/weibeld/kubectl-ns)

Internally, the plugins build on the aliases from the previous section.

Here you can see the plugins in action:

![](asciicast-kubeconfig-plugins.gif)

> Note that the plugins use [**fzf**](https://github.com/junegunn/fzf) to provide an interactive fuzzy search interface. That means, you need to [install fzf](https://github.com/junegunn/fzf#installation) in order to use these plugins.

To **install the plugins**, you just have to download the shell scripts named [`kubectl-ctx`](https://raw.githubusercontent.com/weibeld/kubectl-ctx/master/kubectl-ctx) and [`kubectl-ns`](https://raw.githubusercontent.com/weibeld/kubectl-ns/master/kubectl-ns) to *any* directory in your `PATH` and make them executable (for example, with `chmod +x`). That's it! Immediately after that, you should be able to use `kubectl ctx` and `kubectl ns`!

<!-- [Markdown syntax highlighting fix] -->

## 5. Save typing with auto-generated aliases

Shell aliases are generally a good way to save typing. The [**kubectl-aliases**](https://github.com/ahmetb/kubectl-aliases) project takes this idea to heart and provides about **800 aliases** for common kubectl commands.

You might wonder how you could possibly remember 800 aliases? Actually, you don't need to remember them, because they are all generated according to a simple scheme, which is shown below together with some example aliases:

> Try to hover over the example aliases for a visual effect.

```include
<template>
<div class="list pl0 flex flex-wrap f1">

  <div class="f3 w-100 gray order-last mb3">EXAMPLE ALIASES</div>
  <div class="mv3 b pl4 order-last pointer example-1 w-50 hover-sky">kgpooyaml</div>
  <div class="mv3 b pl4 order-last pointer example-2 w-50 hover-sky">ksysrmcm</div>
  <div class="mv3 b pl4 order-last pointer example-3 w-50 hover-sky">ksysgsvcw</div>
  <div class="mv3 b pl4 order-last pointer example-4 w-50 hover-sky">kgpdepallsl</div>

  <div class="f3 w-100 black-50 mb3">SCHEME</div>
  <ul class="abbreviations list pl0 flex justify-center items-center f4 b mv4 w-100">
    <li class="mh2 relative">
      <p class="absolute top--2 left-0 ttu black-50 f6 mv0">base</p>
      <ul class="list pl0 flex flex-column">
        <li><span class="alias-k sky">k</span>ubectl</li>
      </ul>
    </li>
    <li class="mh2 relative">
      <p class="absolute top--2 left-0 ttu black-50 f6 mv0">System</p>
      <ul class="list pl0 flex flex-column">
        <li>-n kube-<span class="alias-sys sky no-wrap">sys</span>tem</li>
      </ul>
    <li class="mh2 relative">
      <p class="absolute top--2 left-0 ttu black-50 f6 mv0">Operation</p>
      <ul class="list pl0 flex flex-column">
        <li><span class="alias-g sky">g</span>et</li>
        <li><span class="alias-d sky">d</span>escribe</li>
        <li><span class="alias-rm sky">rm</span>&nbsp;(delete)</li>
        <li><span class="sky">lo</span>gs -f</li>
        <li><span class="sky">ex</span>ec -it</li>
        <li><span class="sky">a</span>pply -f</li>
      </ul>
    </li>
    <li class="mh2 relative">
      <p class="absolute top--2 left-0 ttu black-50 f6 mv0">Resource</p>
      <ul class="list pl0 flex flex-column">
        <li><span class="alias-po sky">po</span>ds</li>
        <li><span class="alias-dep sky">dep</span>loyment</li>
        <li><span class="sky">sec</span>ret</li>
        <li><span class="sky">ing</span>ress</li>
        <li><span class="sky">no</span>de</li>
        <li><span class="alias-svc sky">svc</span>&nbsp;(service)</li>
        <li><span class="sky">ns</span>&nbsp;(namespace)</li>
        <li><span class="alias-cm sky">cm</span>&nbsp;(configmap)</li>
      </ul>
    </li>
    <li class="mh2 relative">
      <p class="absolute top--2 left-0 ttu black-50 f6 mv0">Options</p>
      <ul class="list pl0 flex flex-column">
        <li><span class="alias-oyaml sky">oyaml</span>:&nbsp;-o yaml</li>
        <li><span class="alias-ojson sky">ojson</span>:&nbsp;-o json</li>
        <li><span class="alias-owide sky">owide</span>:&nbsp;-o wide</li>
        <li><span class="alias-all sky no-wrap">all</span>:&nbsp;--all-namespaces</li>
        <li><span class="alias-w sky">w</span>:&nbsp;--watch</li>
        <li><span class="alias-sl sky">sl</span>:&nbsp;--show-labels</li>
        <li><span class="sky">f</span>:&nbsp;-f</li>
        <li><span class="sky">l</span>:&nbsp;-l</li>
      </ul>
    </li>
  </ul>
</div>
</template>
<style>
.example-1:hover ~ .abbreviations .alias-k,
.example-1:hover ~ .abbreviations .alias-g,
.example-1:hover ~ .abbreviations .alias-po,
.example-1:hover ~ .abbreviations .alias-oyaml,

.example-2:hover ~ .abbreviations .alias-k,
.example-2:hover ~ .abbreviations .alias-sys,
.example-2:hover ~ .abbreviations .alias-rm,
.example-2:hover ~ .abbreviations .alias-cm,

.example-3:hover ~ .abbreviations .alias-k,
.example-3:hover ~ .abbreviations .alias-sys,
.example-3:hover ~ .abbreviations .alias-g,
.example-3:hover ~ .abbreviations .alias-svc,
.example-3:hover ~ .abbreviations .alias-w,

.example-4:hover ~ .abbreviations .alias-k,
.example-4:hover ~ .abbreviations .alias-g,
.example-4:hover ~ .abbreviations .alias-dep,
.example-4:hover ~ .abbreviations .alias-sl,
.example-4:hover ~ .abbreviations .alias-all
{
  color: #E7040F;
}
</style>
```

As you can see, the aliases consist of **components**, each standing for a specific element of a kubectl command. Each alias can have one component for the **base command**, **operation**, and **resource**, and multiple components for the **options**, and you just "fill in" these components from left to right according to the above scheme.

> Please note that the current and fully detailed scheme is on the [GitHub page](https://github.com/ahmetb/kubectl-aliases#syntax-explanation). There you can also find the [full list of aliases](https://github.com/ahmetb/kubectl-aliases/blob/master/.kubectl_aliases).

For example, the alias `kgpooyamlall` stands for the command `kubectl get pods -o yaml --all-namespaces`:

```include
<template>
<ul class="list pl0 pr5 flex justify-center f-headline b pointer mv4">
<li class="hover-sky relative hide-child pv2">k<span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
<li class="hover-sky relative hide-child pv2">g<span class="child absolute bottom--2 left-0 f2">get</span></li>
<li class="hover-sky relative hide-child pv2">po<span class="child absolute bottom--2 left-0 f2">pods</span></li>
<li class="hover-sky relative hide-child pv2">oyaml<span class="child absolute bottom--2 left-0 f2" no-wrap>-o yaml</span></li>
<li class="hover-sky relative hide-child pv2">all<span class="child absolute bottom--2 left-0 f2 no-wrap">--all-namespaces</span></li>
</ul>
</template>
<script>
</script>
```

Note that the relative order of most option components doesn't matter. So, `kgpooyamlall` is equivalent to `kgpoalloyaml`.

You don't need to use all the components for an alias. For example, `k`, `kg`, `klo`, `ksys`, or `kgpo` are valid aliases too. Furthermore, you can combine aliases with other words on the command-line.

For example, you could use `k proxy` for running `kubectl proxy`:

```include
<template>
<ul class="list pl0 pr5 flex justify-center f-headline b pointer mv4">
<li class="hover-sky relative hide-child pv2">k <span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
<li class="relative hide-child pv2 gray">&nbsp;proxy</li>
</ul>
</template>
<script>
</script>
```

Or you could use `kg roles` for running `kubectl get roles` (there exists currently no alias component for the Roles resource):

```include
<template>
<ul class="list pl0 pr5 flex justify-center f-headline b pointer mv4">
<li class="hover-sky relative hide-child pv2">k <span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
<li class="hover-sky relative hide-child pv2">g <span class="child absolute bottom--2 left-0 f2">get</span></li>
<li class="relative hide-child pv2 gray">&nbsp;roles</li>
</ul>
</template>
<script>
</script>
```

To get a specific Pod, you could use `kgpo my-pod` for running `kubectl get pod my-pod`:

```include
<template>
<ul class="list pl0 pr5 flex justify-center f-headline b pointer mv4">
<li class="hover-sky relative hide-child pv2">k <span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
<li class="hover-sky relative hide-child pv2">g <span class="child absolute bottom--2 left-0 f2">get</span></li>
<li class="hover-sky relative hide-child pv2">po <span class="child absolute bottom--2 left-0 f2">pods</span></li>
<li class="relative hide-child pv2 gray">&nbsp;my-pod</li>
</ul>
</template>
<script>
</script>
```

Note that some aliases even *require* a further argument on the command-line. For example, the `kgpol` alias stands for `kubectl get pods -l`. The `-l` option requires an argument (a label specification). So, you have to use this alias, for example, like this:

```include
<template>
<ul class="list pl0 pr5 flex justify-center f-headline b pointer mv4">
<li class="hover-sky relative hide-child pv2">k<span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
<li class="hover-sky relative hide-child pv2">g<span class="child absolute bottom--2 left-0 f2">get</span></li>
<li class="hover-sky relative hide-child pv2">po<span class="child absolute bottom--2 left-0 f2">pods</span></li>
<li class="hover-sky relative hide-child pv2">l<span class="child absolute bottom--2 left-0 f2 no-wrap">-l</span></li>
<li class="relative hide-child pv2 gray">&nbsp;app=ui</li>
</ul>
</template>
<script>
</script>
```

> For that reason, you can use the `a`, `f`, and `l` components only at the end of an alias.

In general, once you get the hang of this scheme, you can intuitively deduce the alias names from the commands you want to execute and save a lot of typing!

### Installation

To install kubectl-aliases, you just have to download the [`.kubectl-aliases`](https://raw.githubusercontent.com/ahmetb/kubectl-aliases/master/.kubectl_aliases) file from GitHub and source it in your `~/.bashrc` or `~/.zshrc` file:

<!-- [Markdown syntax highlighting fix] -->

~~~bash
source ~/.kubectl_aliases
~~~

That's it! After reloading your shell, you should be able to use all the 800 kubectl aliases!

### Completion

As you have seen, you often append further words to an alias on the command-line. For example:

~~~bash
kgpooyaml test-pod-d4b77b989
~~~

If you use kubectl command completion, then you're probably used to auto-complete things like resource names. But can you still do that when you use the aliases?

*That's an important question because if it wouldn't work, that would undo some of the benefits of these aliases!*

The answer depends on which shell you use.

For **Zsh**, completion works out-of-the-box for aliases.

For **Bash**, unfortunately, completion doesn't work by default for aliases. The good news is that it can be made working with some extra steps. The next section explains how to do this.

### Enable completion for aliases in Bash

The problem with Bash is that it attempts completion (whenever you press *Tab*) on the alias name, instead of on the aliased command (like Zsh). Since you don't have a completion script for all the 800 aliases, this doesn't work.

The [**complete-alias**](https://github.com/cykerway/complete-alias) project provides a general solution to this problem. It taps into the completion mechanism for an alias, internally expands the alias to the aliased command, and returns the completion suggestion for the expanded command. This means, it makes completion for an alias behave exactly the same as for the aliased command.

In the following, I will first explain how to install complete-alias, and then how to configure it to enable completion for all of the kubectl aliases.

#### Install complete-alias

First of all, complete-alias depends on [bash-completion](https://github.com/scop/bash-completion). So you need to ensure that bash-completion is installed before installing complete-alias. Instructions for this have been given earlier for [Linux](#bash-on-linux) and [macOS](#bash-on-macos).

> **Important note for macOS users:** like the [kubectl completion script](#bash-on-macos), complete-alias does not work with Bash 3.2, which is the default version of Bash on macOS. In particular, complete-alias depends on bash-completion v2 (`brew install bash-completion@2`), which requires at least Bash 4.1. That means, to use complete-alias on macOS, you need to [install a newer version of Bash](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba).

<!-- If you try to use complete-alias with bash-completion 1 and Bash 3.2, you will get an error of the form `_completion_loader: command not found`. -->

To install complete-alias, you just have to download the [`bash_completion.sh`](https://raw.githubusercontent.com/cykerway/complete-alias/master/bash_completion.sh) script from the [GitHub repository](https://github.com/cykerway/complete-alias), and source it in your `~/.bashrc` file:

<!-- [] -->

~~~bash
source ~/bash_completion.sh
~~~

After reloading your shell, complete-alias should be correctly installed.

#### Enable completion for kubectl aliases

Technically, complete-alias provides the `_complete_alias` shell function. This function inspects an alias and returns the completion suggestions for the aliased command.

To hook this up with a specific alias, you have to use the [`complete`](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion-Builtins.html#Programmable-Completion-Builtins) Bash builtin to set `_complete_alias` as the *completion function* of the alias.

<!-- [] -->

As an example, let's take the `k` alias that stands for the `kubectl` command. To set `_complete_alias` as the completion function for this alias, you have to execute the following command:

~~~bash
complete -F _complete_alias k
~~~

The effect of this is that whenever you auto-complete on the `k` alias, the `_complete_alias` function is invoked, which inspects the alias and returns the completion suggestions for the `kubectl` command.

As another example, let's take the `kg` alias that stands for `kubectl get`:

~~~bash
complete -F _complete_alias kg
~~~

Similarly, the effect of this is that when you auto-complete on `kg`, you get the same completion suggestions that you would get for `kubectl get`.

> Note that can use complete-alias in this way for *any* alias on your system.

Consequently, to enable completion for *all* the kubectl aliases, you just have to run the above command for each of them. The following snippet does exactly that (assuming you installed kubectl-aliases to `~/.kubectl-aliases`):

~~~bash
for _a in $(sed '/^alias /!d;s/^alias //;s/=.*$//' ~/.kubectl_aliases); do
  complete -F _complete_alias "$_a"
done
~~~

Just add this snippet to your `~/.bashrc` file, reload your shell, and now you should be able to use completion for all the 800 kubectl aliases!

<!--
- https://github.com/ahmetb/kubectl-aliases
- Described here: https://ahmet.im/blog/kubectl-aliases/
- 800 auto-generated aliases
- Just download the `.kubectl_aliases` file and source it from your `~/.bashrc` of `~/.zshrc`

### Programmable Completion

- With Zsh, command completion keeps working with aliases
- With Bash, command completion doesn't work with aliases by default

#### Solution for Bash Problem

- https://github.com/cykerway/complete-alias
- Simply download the https://github.com/cykerway/complete-alias/blob/master/bash_completion.sh file and source it in your `~/.bashrc`
- This provides the function `_complete_alias`
- Then, for every alias for which you want to enable command completion:
    - `complete -F _complete_alias <alias>`
- This works by internally expanding the alias and getting the completion options in the same way as the aliased command
- The implementation depends on bash-completion https://github.com/scop/bash-completion
- Problem with macOS
    - complete-alias depends on bash-completion 2.0 or newer
    - macOS indludes Bash 3.2 which uses bash-completion 1.3 (when installed with Homebrew)
    - This results in an error: `_completion_loader: command not found`
        - The `_completion_loader` function has been added in bash-completion 2.0 (i.e. does not exist in bash-completion 1.3)
    - Solution: install a newer version of Bash on macOS and use bash-completion 2.8
-->

## 6. Extend kubectl with plugins

Since [version 1.12](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG-1.12.md#sig-cli-1), kubectl includes a [plugin mechanism](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) that allows you to extend kubectl with custom commands.

Here is an example of a kubectl plugin that can be invoked as `kubectl hello`:

![](asciicast-plugins-hello.gif)

> In case you're familiar with it, the kubectl plugin mechanisms closely follows the design of the [Git plugin mechanism](https://adamcod.es/2013/07/12/how-to-create-git-plugin.html).

This section will show you how to install plugins, where you can find existing plugins, and how to create your own plugins.

### Installing plugins

Kubectl plugins are distributed as simple executable files with a name of the form `kubectl-x`. The prefix `kubectl-` is mandatory, and what follows is the new kubectl sub-command that allows invoking the plugin.

For example, the *hello* plugin shown above would be distributed as a file named `kubectl-hello`.

To [install a plugin](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/#installing-kubectl-plugins), you just have to copy the `kubectl-x` file to *any* directory in your `PATH` and make it executable (for example, with `chmod +x`). Immediately after that, you can invoke the plugin with `kubectl x`.

You can use the following command to list all the plugins that are currently installed on your system:

~~~bash
kubectl plugin list
~~~

This command also displays warnings if you have multiple plugins with the same name, or if there is a plugin file that is not executable.

### Finding and installing plugins with krew

Kubectl plugins lend themselves to be shared and reused like software packages. But where can you find plugins that were shared by others?

The [**krew**](https://github.com/GoogleContainerTools/krew) project aims at providing a unified solution for sharing, finding, installing, and managing kubectl plugins. The project refers to itself as a "package manager for kubectl plugins" (the name *krew* is a hint at [*brew*](https://brew.sh)).

Krew is centred around an [index](https://github.com/GoogleContainerTools/krew-index) of kubectl plugins from which you can choose and install. Here you can see krew in action:

![](asciicast-plugins-krew.gif)

As you can see, krew itself is a kubectl plugin. That means, **installing krew**  works in essence like installing any other kubectl plugin. You can find the detailed installation instructions for krew on the [GitHub page](https://github.com/GoogleContainerTools/krew/#installation).

The most important krew commands are as follows:

~~~bash
# Search the krew index (with an optional search query)
kubectl krew search [<query>]
# Display information about a plugin
kubectl krew info <plugin>
# Install a plugin
kubectl krew install <plugin>
# Upgrade all plugins to the newest versions
kubectl krew upgrade
# List all plugins that have been installed with krew
kubectl krew list
# Uninstall a plugin
kubectl krew remove <plugin>
~~~

Note that installing plugins with krew does **not** prevent installing plugins the [traditional way](#installing-plugins). Even if you use krew, you can still install plugins that you find elsewhere (or create yourself) by other means.

> Note that the `kubectl krew list` command does only list the plugins that have been installed with krew, whereas the `kubectl plugin list` command lists *all* plugins, that is, those installed with krew and those installed in other ways.

### Finding plugins elsewhere

Krew is still a young project and at the moment there are only about 30 plugins in the [krew index](https://github.com/GoogleContainerTools/krew-index/). In case you don't find what you need there, you can look for plugins elsewhere, for example, on GitHub. 

I recommend to check out the [**kubectl-plugins**](https://github.com/topics/kubectl-plugins) GitHub topic. You will find several dozens of available plugins there that are worth to have a look at.

### Creating your own plugins

Of course, you can [create your own kubectl plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/#writing-kubectl-plugins), and it is very easy to do so.

You just have to create an executable file that does what you want, give it a name of the form `kubectl-x`, and then install it as described [above](#installing-plugins).

The executable can be of *any* type, a Bash script, a compiled Go program, a Python script, it really doesn't matter. The only requirement is that it can be directly executed by the operating system.

Let's create an example plugin right now. In a [previous section](#3-use-the-custom-columns-output-format), you used a kubectl command to list the container images of each pod. You can easily turn this command into a plugin that you can invoke with, say, `kubectl img`.

To do so, just create a file named `kubectl-img` with the following content:

~~~bash
#!/bin/bash
kubectl get pods -o custom-columns='NAME:metadata.name,IMAGES:spec.containers[*].image'
~~~

Now make the file executable with `chmod +x kubectl-img` and move it to any directory in your `PATH`. Immediately after that, you can start using the plugin with `kubectl img`!

> As mentioned, kubectl plugins can be written in *any* programming or scripting language. If you use shell scripts, you have the advantage that you can easily invoke kubectl from the plugin. However, you can write more sophisticated plugins with real programming languages, for example, using a [Kubernetes client library](https://kubernetes.io/docs/reference/using-api/client-libraries/). If you use Go, you can also use the [cli-runtime](https://github.com/kubernetes/cli-runtime) library, which exists specifically for writing kubectl plugins.

### Sharing your plugins

If you think that one of your plugins might be useful for others, feel free to share it on **GitHub**. Make sure to add it to the [**kubectl-plugins**](https://github.com/topics/kubectl-plugins) topic, so that others can find it.

You can also request to add your plugin to the [**krew index**](https://github.com/GoogleContainerTools/krew-index/). You can find the instructions for how to do this in the [krew GitHub repository](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md).

### Command completion

At the moment, the plugin mechanism unfortunately doesn't yet support command completion. This means that you need to fully type the plugin names, as well as any arguments for the plugins.

However, there is an open [**feature request**](https://github.com/kubernetes/kubectl/issues/585) for this in the kubectl GitHub repository. So, it is possible that this feature will be implemented sometime in the future.

<!-- #### Distribute your own plugins via krew

If you created a plugin and want to add it to the *krew* index, so that other users can discover and install it via *krew*, you can do that. The instructions for this can be found in the [developer guide](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md) of the *krew* documentation.

In short, you have create two artefacts for publishing your plugin to *krew*:

- A `.zip` or `.tar.gz` archive containing the executables of your plugin (possibly for different platforms)
- A *krew* [plugin manifest](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md#writing-a-plugin-manifest) YAML file

The **archive** with the executables must be publicly downloadable via a URL. You can achieve this, for example, by adding it as a binary to a GitHub [release](https://help.github.com/articles/creating-releases/).

The **plugin manifest** must contain all the required information for *krew* to install the plugin. This includes the URL of the archive with the executables, and the names of the executables to install for each platform. The plugin manifest is what will be uploaded to the *krew* index.

To publish your plugin to the *krew* index, you have to create a pull request to the [krew-index](https://github.com/GoogleContainerTools/krew-index) repository adding your plugin manifest to the [`plugins`](https://github.com/GoogleContainerTools/krew-index/tree/master/plugins) directory of this repository. This is were the manifests of all the plugins in the *krew* index are maintained.

Once the pull request is accepted, your plugin will be publicly listed by `kubectl krew search` and users can install it with `kubectl install <plugin>`. If you create a new version of your plugin, you have to update your plugin manifest in the krew-index repository with a new pull request.

Again, the detailed instructions for publishing plugins to *krew* can be found in the *krew* [developer guide](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md).
 -->

