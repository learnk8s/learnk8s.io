If you work with Kubernetes, you use kubectl. And you probably use it *a lot*. Whenever you spend a lot of time working with a tool, it is worth to get to know it very well and learn to use it as efficiently as possible.

This article contains a set of tips and tricks to make boost your kubectl productivity. At the same time, this article also aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient, but also more enjoyable!

## Understanding kubectl

Before learning how to use kubectl more efficiently, you should have a basic understanding of what it actually is.

From a user's point of view, kubectl your cockpit to control Kubernetes. It allows you to perform every possible Kubernetes operation.

From a technical point of view, kubectl is a client for the **Kubernetes API**.

The Kubernetes API is an **HTTP REST API**. This API is the real Kubernetes **user interface**. Kubernetes is fully controlled through this API. This means that every Kubernetes operation is exposed as an API endpoint and can be executed by an HTTP request to this endpoint.

Consequently, the main job of kubectl is to carry out HTTP requests to the Kubernetes API:

![Kubernetes API](kubernetes-api.svg)

> Kubernetes is fully **resource-centred**. That means, Kubernetes maintains an internal state of resources, and all Kubernetes operations are [**CRUD**](https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete) operations on these resources. You fully control Kubernetes through manipulation of these resources (and Kubernetes figures out what to do based on the current state of resources). For this reason, the Kubernetes [**API reference**](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/) is organised as a list of resource types with their associated operations.

Let's consider an example.

Imagine you want to create a [ReplicaSet](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#replicaset-v1-apps) resource. To do so, you would define the ReplicaSet in the `replicaset.yaml` file, and then run the following command:

~~~bash
kubectl create -f replicaset.yaml
~~~

Obviously, this creates your ReplicaSet in Kubernetes. But what happens behind the scenes?

Kubernetes has a *create ReplicaSet* operation, and the API endpoint that exposes this operation is as follows:

~~~
POST /apis/apps/v1/namespaces/{namespace}/replicasets
~~~

> You can find the API endpoints of all Kubernetes operations in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13) (including the [above endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-replicaset-v1-apps)).

Thus, behind the scenes, the above kubectl command makes an HTTP POST request to the above endpoint, passing the ReplicaSet definition (the content of the `replicaset.yaml` file) in the request body.

This is how *all* kubectl command (that access the Kubernetes API) are implemented. They simply make HTTP requests to endopints of the Kubernetes API.

> It's totally possible to fully control Kubernetes with a tool like `curl` by manually issuing HTTP requests to the Kubernetes API. Kubectl just makes it easier for you to use the Kubernetes API.

These are the basics of what kubectl is. But there is much more about the Kubernetes API that every kubectl user should know. To this end, let's briefly dive into the Kubernetes internals.

<!--If you're very impatient, you can [jump to the next section →](#1-save-typing-with-command-completion)-->

### Kubernetes internals

Kubernetes consists of a set of independent components that run as separate processes on the nodes of a cluster. Each component has a very specific function, and some components run on the master nodes and others on the worker nodes.

The most important components on the master nodes are:

- **Storage backend:** stores resource definitions (usually [etcd](https://coreos.com/etcd/))
- **API server:** provides Kubernetes API and manages storage backend
- **Controller manager:** ensures resource statuses match specifications
- **Scheduler:** schedules Pods to worker nodes

And the most important component running on each worker node is:

- **kubelet:** manages execution of containers on a worker node

To see how these components work together, let's consider an example. Actually, let's just continue the ReplicaSet example from above.

Assume, you just executed `kubectl create -f replicaset.yaml`, upon which kubectl made an HTTP POST request to the [*create ReplicaSet* API endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-replicaset-v1-apps).

What happens now?


```slideshow
{
  "description": "Walkthrough from the creation of a ReplicaSet to the execution of the containers on the worker nodes.",
  "slides": [
    {
      "image": "kubernetes-internals-1.svg",
      "description": "After running `kubectl create -f replicaset.yaml`, the API server saves you ReplicaSet resource definition in the storage backend."
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
      "description": "The kubelet reads the Pod definitions, downloads the required container images, and runs the containers via Docker (or another container runtime) on the worker node."
    }
  ]
}
```

The API request to the *create ReplicaSet* endpoint is handled by the **API server**. The API server authenticates the request and saves your ReplicaSet resource definition in the storage backend.

This event triggers the **ReplicaSet controller**, which is a sub-process of the **controller manager**. The ReplicaSet controller watches for creations, updates, and deletions of ReplicaSet resources in the storage backend, and gets notified by an event when this happens.

The job of the ReplicaSet controller is to make sure that the required number of replica Pods of a ReplicaSet exists. In our example, no Pods exist yet, so the ReplicaSet controller creates these Pod definitions (according to the Pod template in the ReplicaSet definition) and saves them in the storage backend.

The creation of the new Pods triggers the **scheduler**, which watches for Pod definitions that are not yet associated to a worker node. The scheduler chooses a suitable worker node for each Pod and updates the Pod definitions in the storage backend with this information.

> Note that up to this point, no workload code is being run anywhere on the infrastructure. All that has been done so far is creating and updating resources in the storage backend on the master node.

This event triggers the **kubelets** who watch for Pods that are scheduled to their worker nodes. The kubelet worker node your ReplicaSet Pods have been scheduled to, downloads the container images of these Pods (if not already present on the machine), and runs them with the configured container runtime (which may be Docker).

At this point, finally, your ReplicaSet application is running!

### The role of the Kubernetes API

As you can see from the above example, Kubernetes components (except the API server and the storage backend) work by watching for resource changes in the storage backend, and manipulating resources in the storage backend.

However, these components **do not** access the storage backend directly, but only **through the Kubernetes API**.

Consider the following examples:

- The ReplicaSet controller uses the [*list ReplicaSets*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#list-replicaset-v1-apps) API operation with a `watch` parameter for watching for changes to ReplicaSet resources.
- The ReplicaSet controller uses the [*create Pod*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-pod-v1-core) API operation for creating Pods.
- The scheduler uses the [*patch Pod*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#patch-pod-v1-core) API operation for updating Pods with the information of the worker nodes the Pods were scheduled to.

As you can see, this is the **same API that is also used by kubectl**.

This double usage of the Kubernetes API for internal components as well as for external users is a fundamental design concept of Kubernetes.

With this knowledge, you can create a mental summary of how Kubernetes works:

- The storage backend stores the state (i.e. resources) of Kubernetes.
- The API server provides an interface to the storage backend in the form of the Kubernetes API.
- All other components, as well as external users, read, watch, and manipulate the state (i.e. resources) of Kubernetes through the Kubernetes API.

Being familiar with these concepts **will help you a lot** to understand kubectl better and make the most use of it!

Let's now look at a series of concrete tips and tricks to help you boosting your kubectl productivity.

## 1. Save typing with command completion

One of the most useful, but often overlooked, tricks to boost your kubectl productivity is command completion.

This allows you to auto-complete command-line words for kubectl commands with the *Tab* key. These command-line words may be sub-commands, options, or arguments, including hard-to-type things like resource names.

Here you can see kubectl command completion in action:

![](autocompletion.cast)

Command completion is available for the [**Bash**](https://www.gnu.org/software/bash/) and [**Zsh**](https://www.zsh.org/) shells.

There are detailed instructions for setting up command completion in the [official documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion), but below is a short recap.

### General notes

In general, command completion works by the means of **completion scripts**. A completion script is shell script that defines the completion behaviour for a specific command. Sourcing a completion script in your shell, enables command completion for the corresponding command.

Kubectl can conveniently print out its completion scripts for Bash and Zsh with the following commands:

~~~
kubectl completion bash
kubectl completion zsh
~~~

In principle, sourcing the output of these commands in the respective shells, enables kubectl command completion.

However, the details differ for Bash (including a difference between Linux and macOS) and Zsh. All these cases are explained in the following.

- [Setting up command completion for Bash on Linux](#bash-on-linux)
- [Setting up command completion for Bash on macOS](#bash-on-macos)
- [Setting up command completion for Zsh](#zsh)

### Bash on Linux

The completion script for Bash depends on the [**bash-completion**](https://github.com/scop/bash-completion) package, so you have to install that first.

You can install bash-completion with [various package managers](https://github.com/scop/bash-completion#installation). For example:

~~~
sudo apt-get install bash-completion
yum install bash-completion
~~~

You can test if bash-completion is correctly installed with the following command:

~~~bash
type _init_completion
~~~

If this outputs the code of a function, then the installation is complete. If it outputs a `not found` error, you have to add the following line to your `~/.bashrc` file:

~~~bash
source /usr/share/bash-completion/bash_completion
~~~

> Whether you have to add this line to your `~/.bashrc` file or not, depends on the package manager you used to install bash-completion. For APT it's necessary, for yum not.

Once bash-completion is installed, you have to ensure that the kubectl **completion script** gets sourced in all your shell sessions.

One way to do this is to add the following line to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

Another possibility is to add the completion script to the `/etc/bash_completion.d` directory (you might have to create this directory if it doesn't exist):

~~~bash
kubectl completion bash >/etc/bash_completion.d/kubectl
~~~

> Completion scripts in `/etc/bash_completion.d` are sourced by bash-completion.

Both approaches are equivalent.

After reloading your shell, kubectl completion should be working!

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### Bash on macOS

With macOS there is a slight complication. The reason is that the default version of Bash on macOS is 3.2, which is hopelessly outdated. The kubectl completion script unfortunately doesn't work with this version of Bash, it requires at least Bash 4.1.

> The reason that Apple includes an outdated version of Bash in macOS is that newer versions use the [GPLv3](https://en.wikipedia.org/wiki/GNU_General_Public_License) license, which Apple doesn't support.

That means, to use kubectl command completion on macOS, you have to **install a newer version of Bash**. You can even make this new Bash your default shell, which will save you a lot of trouble of this kind in the future. It's actually a quick and easy process, and I wrote an [**Upgrading Bash on macOS**](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba) article about it.

*Before continuing, make sure that you are now indeed using Bash 4.1 or newer (find out with `bash --version`).*

The kubectl completion script for Bash depends on [**bash-completion**](https://github.com/scop/bash-completion), so you have to install this first.

You can install bash-completion with [Homebrew](https://brew.sh):

~~~bash
brew install bash-completion@2
~~~

> The `@2` at stands for version 2 of bash-completion, and the kubectl completion script works only with this version. However, bash-completion 2 works only with Bash 4.1+, and that's the reason that you can use the kubectl completion script only with Bash 4.1+.

The output of the `brew install` command includes instructions to add the following lines to your `~/.bash_profile` file:

~~~bash
export BASH_COMPLETION_COMPAT_DIR=/usr/local/etc/bash_completion.d
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
~~~

You have to do this to complete the installation of bash-completion, but I recommend adding it to the `~/.bashrc` file instead. This ensures that bash-completion is also available in sub-shells.

After reloading your shell, you can test if bash-completion is correctly installed with the following command:

~~~bash
type _init_completion
~~~

If this outputs the code of a function, then the installation was successful.

Now, all you have to do is ensuring that the kubectl **completion script** gets sourced in all your shell sessions.

One way to do this is to add the following line to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

Another option is to add the completion script to the `/usr/local/etc/bash_completion.d` directory:

~~~bash
kubectl completion bash >/usr/local/etc/bash_completion.d/kubectl
~~~

> This only works if you installed bash-completion with Homebrew. In that case, bash-completion sources all completion scripts in this directory.

In case you [installed kubectl with Homebrew](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-with-homebrew-on-macos), you don't even have to do the above, because the completion script has already been put in the `/usr/local/etc/bash_completion.d` directory by the kubectl Homebrew formula.

All these approaches are equivalent.

After reloading your shell, kubectl completion should be working!

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### Zsh

The completion script for Zsh doesn't have any dependencies. So, all you have to do is to ensure that it gets sourced in all your shell sessions.

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

This tip will prove useful for many of the subsequent tips.

When you create YAML resource definitions, you need to know the fields and their meanings of these resources. One location to look up this information is in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/), which contains the full specifications of all resources.

However, switching to a web browser each time you need to look up something is tedious. Therefore, kubectl provides the `kubectl explain` command, which can print out the full resource specifications of all resources right in your terminal.

The usage of `kubectl explain` is as follows:

~~~bash
kubectl explain resource[.field]...
~~~

And the output is the specification of the resource or resource field. The displayed information is identical to the information in the API reference.

Here you can see `kubectl explain` in action:

![](explain.cast)

By default, `kubectl explain` displays only a single level of fields. You can recursively display all fields and sub-fields (without their descriptions) with the `--recursive` flag:

~~~bash
kubectl explain deployment.spec --recursive
~~~

In case you're not sure about which resource names you can use with `kubectl explain`, you can display all of them with the following command:

~~~bash
kubectl api-resources
~~~

This command displays the resource names in their plural form (e.g. `deployments` instead of `deployment`). It also displays the shortname (e.g. `deploy`) for those resources that have one.

Don't worry about these differences. In general, all of these name variants are equivalent for kubectl. That is, you can use any of them for `kubectl explain`.

For example, all the following commands are equivalent:

~~~bash
kubectl explain deployments.spec
kubectl explain deployment.spec
kubectl explain deploy.spec
~~~

## 3. Use custom columns output

The default output format of the `kubectl get` command (for *reading* resources) is as follows:

~~~bash
$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
engine-544b6b6467-22qr6   1/1     Running   0          78d
engine-544b6b6467-lw5t8   1/1     Running   0          78d
engine-544b6b6467-tvgmg   1/1     Running   0          78d
web-ui-6db964458-8pdw4    1/1     Running   0          78d
~~~

That's a nice human-readable format, but it contains just a limited amount of information. Just some few fields of the resource definitions are shown.

That's where the [**custom columns**](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#resource-operations) output format comes in. This options lets you freely define the output columns and the data to display in them. You can choose *any* field of a resource definition (as stored in the storage backend) as an output column.

The usage of the custom columns output format is as follows:

~~~
-o custom-columns=&lt;header&gt;:&lt;jsonpath&gt;[,&lt;header&gt;:&lt;jsonpath&gt;]...
~~~

You have to define each output column as a `<header>:<jsonpath>` pair:

- `<header>` is the name of the column, and you can choose anything you want.
- `<jsonpath>` is an expression that selects a field of the resource (explained in more detail below).

Let's look at a simple example:

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name'
NAME
engine-544b6b6467-22qr6
engine-544b6b6467-lw5t8
engine-544b6b6467-tvgmg
web-ui-6db964458-8pdw4
~~~

This displays a single column with the names of all Pods.

The expression that selects the Pod names is `metadata.name`. The reason for this is that the name of a Pod is defined in the `name` field of the `metadata` field of a Pod resource (you can look this up in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#pod-v1-core) or with `kubectl explain pod.metadata.name`).

Now, imagine you want to add an additonal column to the output, for example, one that shows the node that each Pod is running on. To do so, just add an additional column specification:

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name,NODE:spec.nodeName'
NAME                      NODE
engine-544b6b6467-22qr6   ip-10-0-80-67.ec2.internal
engine-544b6b6467-lw5t8   ip-10-0-36-80.ec2.internal
engine-544b6b6467-tvgmg   ip-10-0-118-34.ec2.internal
web-ui-6db964458-8pdw4    ip-10-0-118-34.ec2.internal
~~~

Here, the expression that selects the node name is `spec.nodeName`, because this is the field in the Pod resource specification that contains the name of the node the Pod has been scheduled to (see `kubectl explain pod.spec.nodeName`).

You can set *any* field of a resource as an output column in this way. Just browse the resource specifications and look for fields that interest you!

But first, let's look more closely at these field selection expressions.

### JSONPath expressions

The expressions for selecting resource fields are based on [JSONPath](https://goessner.net/articles/JsonPath/index.html). 

JSONPath is a language to extract data from JSON documents (it is similar to XPath for XML). Selecting single field is only the most basic usage of JSONPath. It has [a lot of features](https://goessner.net/articles/JsonPath/index.html#e3), like list selectors, filters, and more.

However, for the field selector expressions, only a subset of the JSONPath capabilities are supported. The following summarises these supported advanced features with example usages:

~~~bash
# Select all elements of a list
kubectl get pods -o custom-columns='DATA:spec.containers[*].image'

# Select a specific element of a list
kubectl get pods -o custom-columns='DATA:spec.containers[0].image'

# Select those elements of a list that match a filter expression
kubectl get pods -o custom-columns='DATA:spec.containers[?(@.image!="nginx")].image'

# Select all fields under a specific location, regardless their name
kubectl get pods -o custom-columns='DATA:metadata.*'

# Select all fields with a specific name, regardless their location
kubectl get pods -o custom-columns='DATA:..image'
~~~

Of particualar importance is the `[]` operator. Many fields of Kubernetes resources are lists, and this operator allows you to select items of these lists. It is often used with a wildcard as `[*]` to select all items of the list.

Below you will find some examples that use this notation.

### Applications

Here are some ideas of what you can do with the custom columns output format.

In general, the possibilites are endless, as you can display any field of a resource as an output column. Feel free to experiment and find usages that are useful for you!

> **Tip:** if you use a command frequently, create a [shell alias](https://en.wikipedia.org/wiki/Alias_(command)#Creating_aliases) for it.

#### Display container images of Pods

~~~bash
$ kubectl get pods -o custom-columns='NAME:metadata.name,IMAGES:spec.containers[*].image'
NAME                       IMAGES
engine-544b6b6467-22qr6    rabbitmq:3.7.8-management,nginx
engine-544b6b6467-lw5t8    rabbitmq:3.7.8-management,nginx
engine-544b6b6467-tvgmg    rabbitmq:3.7.8-management,nginx
web-ui-6db964458-8pdw4     wordpress
~~~

This command displays the names of the container images of each Pod.

> Remember that a Pod may contain more than one container. In that case, the container images are displayed as a comma-separated list in the same column.

#### Display availability zones of nodes

~~~bash
$ kubectl get nodes -o custom-columns='NAME:metadata.name,ZONE:metadata.labels.failure-domain\.beta\.kubernetes\.io/zone'
NAME                          ZONE
ip-10-0-118-34.ec2.internal   us-east-1b
ip-10-0-36-80.ec2.internal    us-east-1a
ip-10-0-80-67.ec2.internal    us-east-1b
~~~

This command can be useful if your Kubernetes cluster is deployed on a public cloud infrastructure (such as AWS, Azure, or GCP). It displays the *availability zone* that each node is in.

The availability zone is a cloud concept that denotes a point of replication within a geographical *region*.

The way the availability zone is obtained for each node is through the special label [`failure-domain.beta.kubernetes.io/zone`](https://kubernetes.io/docs/reference/kubernetes-api/labels-annotations-taints/#failure-domainbetakubernetesiozone). If the cluster runs on a public cloud infrastructure, then this label is automatically created, and its value is set to the name of the availability zone the node is in.

Labels are not part of the Kubernetes resource specifications, so you can't find this label in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/). However, you can see it (as well as all other labels), if you output the nodes as YAML or JSON:

~~~bash
kubectl get nodes -o yaml
kubectl get nodes -o json
~~~

This is generally a good way to disover even more information about your resources, in addition to exploring the [resource specifications](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/).

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

All the information that kubectl needs to connect to a cluster is saved in a so-called **kubeconfig** file in YAML format. Whenever you invoke kubectl, it reads the kubeconfig file to determine the connection parameters of the cluster it is supposed to connect to.

Often you work with **multiple clusters** at the same time. In that case, the kubeconfig file contains the connection parameters of *all of these* clusters. But now you need a way to indicate to *which* of those clusters you want kubectl to connect to.

Similarly, you might have configured **multiple [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)** within a given cluster (these are kind of "virtual" clusters within physical cluster). Kubectl also determines which namespace to use from the kubeconfig file. So, you need a way to indicate *which* namespace you intend to use.

This section shows you how you can do this with ease.

> Note that the default kubeconfig file is `~/.kube/config`. You can also explicitly specify a kubeconfig file with the `--kubeconfig` option or by setting the `KUBECONFIG` environment variable. In these cases, the kubeconfig files can have any name. If you use the `KUBECONFIG` variable, you can even have multiple kubeconfig files (for example, one for each cluster), but these files will be merged to a single effective configuration when kubectl is run. See the [official](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) [documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/).

### Kubeconfig files

Let's have a look what a kubeconfig file actually contains:

![A kubeconfig file contains a set of contexts](kubeconfig-1.svg)

In essence, a kubeconfig file consists of a set of **contexts**. A context contains the following three pieces of information:

- **Cluster:** address (IP or DNS) of the API server in a cluster
- **User:** authentication information for a specific user of the cluster
- **Namespace:** the namespace to use when connecting to the cluster

> In practice, people often have a single context per cluster in their kubeconfig file. However, you could also have multiple contexts per cluster, differing in their *user* or *namespace*. But this seems to be less common, so that a *context* can often be equated to a *cluster*.

At any time, one of these contexts is set as the **current context** (through a dedicated field in the kubeconfig file):

![One of the contexts in a kubeconfig file is set as the current context](kubeconfig-2.svg)

Kubectl always connects to the cluster of the current context. Thus, in the above example, kubectl would connect to the *Hare* cluster.

Consequently, to switch to another cluster, you can just change the value of the *current context* in the kubeconfig file:

![Changing the current context of a kubeconfig file](kubeconfig-3.svg)

In the above example, kubectl would now connect to the *Fox* cluster.

And to switch to another namespace in the same cluster, you can change the value of the *namespace* field of the current context:

![Changing the namespace of the current context in a kubeconfig file](kubeconfig-4.svg)

In the above example, kubectl would now use the *Prod* namespace in the *Fox* cluster (instead of the *Test* namespace that was set before).

> Kubectl also provides the `--cluster`, `--user`, `--namespace`, and `--context` options that allow you to overwrite individual elements and the current context as a whole, no matter what is set in the kubeconfig file. See `kubectl options`.

In principle, you could do these changes by manually editing the kubeconfig file. But of course this is very tedious. In the following I'm going to present some tools and approaches that do these modifications automatically for you, so that you can switch between clusters and namespaces with ease.

### Use kubectx

A very popular tool for switching between clusters and namespaces is [kubectx](https://github.com/ahmetb/kubectx/).

This tool provides the `kubectx` and `kubens` commands that allow you change the current context and namespace, respectively.

> As mentioned, changing the current context means changing the cluster, if you have only a single context per cluster.

Here you can see these two commands in action:

![](kubectx.cast)

> Note that under the hood, these commands perform the same manipulations in the kubeconfig file that were explained in the previous section.

To install kubectx, just follow the [instructions on the GitHub page](https://github.com/ahmetb/kubectx/#installation).

A particularly useful feature of kubectx is the [**interactive mode**](https://github.com/ahmetb/kubectx/#interactive-mode). This works in conjunction with the [**fzf**](https://github.com/junegunn/fzf) tool, which you have to install separately. In fact, installing fzf, automatically enables kubectx interactive mode.

With the interactive mode, you don't need to type the context or namespace that you want to change to, but you can select it through an interactive fuzzy search interface (provided by fzf). This can be extremely useful if you have long and cryptic context names, as they are, for example, produced by managed Kubernetes services like [EKS from AWS](https://aws.amazon.com/eks/) or [GKE from GCP](https://cloud.google.com/kubernetes-engine/).

### Use smart shell aliases

Actually, you don't need to use separate tools to change the current context or namespace in your kubeconfig file, because kubectl provides command for doing exactly this:

- `kubectl config get-contexts`: list all contexts
- `kubectl config current-context`: get the current context
- `kubectl config use-context`: change the current context
- `kubectl config set-context`: change entries of a context

However, using these commands directly is not very convenient, because they are long to type. But what you can do is wrapping them into shell aliases that can be easily executed.

I crafted a set of such aliases that provide a similar functionality as kubectx. The aliases also use [fzf](https://github.com/junegunn/fzf) to provide an interactive fuzzy search interface for selecting the target context or namespace. That means, to use these aliases, you also need to have fzf installed.

Here you can see the aliases in action:

![](aliases.cast)

And here are their definitions:

~~~bash
# Get the current context
alias kcc='kubectl config current-context'
# List all contexts
alias klc='kubectl config get-contexts -o name | sed "s/^/  /;\|^  $(kcc)$|s/ /*/"'
# Change the current context
alias ksc='kubectl config use-context "$(klc | fzf -e | sed "s/^..//")"'

# Get the current namespace
alias kcn='kubectl config get-contexts --no-headers "$(kcc)" | awk "{print \$5}" | sed "s/^$/default/"'
# List all namespaces
alias kln='kubectl get -o name ns | sed "s|^.*/|  |;\|$(kcn)|s/ /*/"'
# Change the current namespace
alias ksn='kubectl config set-context --current --namespace "$(kln | fzf -e | sed "s/^..//")"'
~~~

To install these aliases, all you have to do is to add the above definitions to your `~/.bashrc` or `~/.zshrc` file (they work for both Bash and Zsh).

As you can see, the aliases provide roughly the same functionality as kubectx, but you have literally implemented it in **6 lines of code**.

### Use plugins

This approach builds on the aliases from the last section, but goes one step further. It actually anticipates something that will be treated in a [later section](#6-extend-kubectl-with-plugins).

Kubectl allows to intall plugins that can be invoked like native command. You can, for example, very easily install a plugin called *kubectl-foo* and then invoke it as `kubectl foo`.

Wouldn't it be nice to be able to change the current context and namespace like this? For example, `kubectl ctx` to change the context and `kubectl ns` to change the namespace?

I created two plugins that allow to do exactly this:

- [**kubectl-ctx**](https://github.com/weibeld/kubectl-ctx)
- [**kubectl-ns**](https://github.com/weibeld/kubectl-ns)

Here you can see the plugins in action:

![](kubeconfig-plugins.gif)

As you can see, the plugins also make use of [fzf](https://github.com/junegunn/fzf), which means you need to have fzf installed in order to use them.

To install the plugins themselves, you simply have to download the shell scripts named [`kubectl-ctx`](https://raw.githubusercontent.com/weibeld/kubectl-ctx/master/kubectl-ctx) and [`kubectl-ns`](https://raw.githubusercontent.com/weibeld/kubectl-ns/master/kubectl-ns) to *any directory* in your `PATH` and make them executable (for example, with `chmod +x`).

That's it! You should now be able to use `kubectl ctx` and `kubectl ns`.

<!-- [Markdown syntax highlighting fix] -->

## 5. Save more typing with auto-generated aliases

Shell aliases are a great way to save typing.

You can wrap long and complicated commands in short aliases, and then execute them by just typing the alias name.

> Note that in general you can do the same with shell functions as with shell aliases (and even in a more flexible way). However, aliases are still often used.

Using aliases for kubectl makes a lot of sense, because commands can get quite long, and you use certain commands very frequently.

The [**kubectl-aliases**](https://github.com/ahmetb/kubectl-aliases) project takes this idea seriously.

**It defines about 800 aliases** for common kubectl commands.**

Among them ar alises like `k` for `kubectl` and `kding` for `kubectl describe ingress`.

You can explore all the alias definitions [in the official repository](https://github.com/ahmetb/kubectl-aliases/blob/master/.kubectl_aliases).

You must be wondering how you could possible remember 800 aliases?

Well, actually you don't need to remember them, because they are all auto-generated according to a simple scheme.

Here's an example for `kubectl get pods -o yaml`. Try to interact with the letters below:

```include
<template>
<ul class="list pl0 flex justify-center f-headline b pointer mv4">
  <li class="hover-sky relative hide-child pv2">k <span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
  <li class="hover-sky relative hide-child pv2">g <span class="child absolute bottom--2 left-0 f2">get</li>
  <li class="hover-sky relative hide-child pv2">po <span class="child absolute bottom--2 left-0 f2">pods</li>
  <li class="hover-sky relative hide-child pv2">oyaml <span class="child absolute bottom--2 left-0 f2">-o yaml</li>
</ul>
</template>
<script>
</script>
```

Another example is `kubect describe services all`:

```include
<template>
<ul class="list pl0 flex justify-center f-headline b pointer mv4">
  <li class="hover-sky relative hide-child pv2">k <span class="child absolute bottom--2 left-0 f2">kubectl</span></li>
  <li class="hover-sky relative hide-child pv2">d <span class="child absolute bottom--2 left-0 f2">describe</li>
  <li class="hover-sky relative hide-child pv2">svc <span class="child absolute bottom--2 left-0 f2">services</li>
  <li class="hover-sky relative hide-child pv2">all <span class="child absolute bottom--2 left-0 f2 no-wrap">--all-namespaces</li>
</ul>
</template>
<style>
.no-wrap {
  white-space: nowrap;
}
</style>
```

The table below summarises the aliases and explores further examples:

```include
<template>
<div class="list pl0 flex flex-wrap f1">
<div class="mv3 b tc order-last pointer ksysgdepowide w-50">ksysgdepowide</div>
<div class="mv3 b tc order-last pointer krmcm w-50">krmcm</div>
<div class="mv3 b tc order-last pointer kgpowall w-50">kgpowall</div>
<div class="mv3 b tc order-last pointer kdsvcowide w-50">kdsvcowide</div>
<ul class="abbreviations list pl0 flex justify-center items-center f4 b mv4 w-100">
  <li class="mh2 relative">
    <p class="absolute top--2 left-0 ttu black-50 f6 mv0">base</p>
    <ul class="list pl0 flex flex-column">
      <li><span class="alias-k sky">k</span>ubectl</li>
    </ul>
  </li>
  <li class="mh2 relative">
    <p class="absolute top--2 left-0 ttu black-50 f6 mv0">System?</p>
    <ul class="list pl0 flex flex-column">
      <li>-n=kube-<span class="alias-sys sky">sys</span>tem</li>
    </ul>
  <li class="mh2 relative">
    <p class="absolute top--2 left-0 ttu black-50 f6 mv0">Operation</p>
    <ul class="list pl0 flex flex-column">
      <li><span class="alias-g sky">g</span>et</li>
      <li><span class="alias-d sky">d</span>escribe</li>
      <li><span class="alias-rm sky">rm</span>:delete</li>
      <li><span class="sky">lo</span>gs</li>
      <li><span class="sky">ex</span>ec</li>
      <li><span class="sky">a</span>pply</li>
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
      <li><span class="alias-svc sky">svc</span>:service</li>
      <li><span class="sky">ns</span>:namespace</li>
      <li><span class="alias-cm sky">cm</span>:configmap</li>
    </ul>
  </li>
  <li class="mh2 relative">
    <p class="absolute top--2 left-0 ttu black-50 f6 mv0">Flags</p>
    <ul class="list pl0 flex flex-column">
      <li><span class="sky">oyaml</span>:-o yaml</li>
      <li><span class="sky">ojson</span>:-o json</li>
      <li><span class="alias-owide sky">owide</span>:-o wide</li>
      <li><span class="alias-all sky">all</span>:--all-namespaces</li>
      <li><span class="sky">w</span>atch</li>
      <li><span class="sky">f</span>ile</li>
      <li><span class="sky">l</span>abel</li>
    </ul>
  </li>
</ul>
</div>
</template>
<style>
.ksysgdepowide:hover ~ .abbreviations .alias-k,
.ksysgdepowide:hover ~ .abbreviations .alias-sys,
.ksysgdepowide:hover ~ .abbreviations .alias-g,
.ksysgdepowide:hover ~ .abbreviations .alias-dep,
.ksysgdepowide:hover ~ .abbreviations .alias-owide,

.krmcm:hover ~ .abbreviations .alias-k,
.krmcm:hover ~ .abbreviations .alias-rm,
.krmcm:hover ~ .abbreviations .alias-cm,

.kgpowall:hover ~ .abbreviations .alias-k,
.kgpowall:hover ~ .abbreviations .alias-g,
.kgpowall:hover ~ .abbreviations .alias-po,
.kgpowall:hover ~ .abbreviations .alias-all,

.kdsvcowide:hover ~ .abbreviations .alias-k,
.kdsvcowide:hover ~ .abbreviations .alias-d,
.kdsvcowide:hover ~ .abbreviations .alias-svc,
.kdsvcowide:hover ~ .abbreviations .alias-owide {
  color: #E7040F;
}
</style>
```

The nature of aliases allows to append any arguments to an alias on the command-line.

If, for example, you want to get the YAML definition of a *specific* pod (not of all pods), you can just append the pod name to the `kgpooyaml` alias:

~~~bash
kgpooyaml test-pod
~~~

This will actually execute `kubectl get pods -o yaml test-pod`, which is a valid kubectl command that does exactly what you want.

You could also use, for example, the `kg` alias for resources for which no aliases exist.

For example, if you want to get all ReplicaSets, you could run `kg replicasets` (or using the shortname `kg rs`).

Or you could use the `k` alias to start *any* kubectl command, for example, `k explain pod`.

### Installation

The installation of kubectl-aliases is very easy. The only thing you have to do is download the [`.kubectl-aliases`](https://raw.githubusercontent.com/ahmetb/kubectl-aliases/master/.kubectl_aliases) file (which contains all the alias definitions), and source it in your `~/.bashrc` or `~/.zshrc` file:

~~~bash
source ~/.kubectl_aliases
~~~

> Note that all aliases work for both Bash and Zsh.

After restarting your shell, all the aliases should be ready to use!

### Command completion

The [first tip](#1-save-typing-with-command-completion) in this article was about enabling command completion, which allows you to auto-complete things like kubectl sub-commands, options, resource names, and other arguments.

You probably expect command completion to also work with the aliases. Imagine you type the following:

~~~
kgpooyaml [tab][tab]
~~~

This should display all the pod names, exactly as if you typed `kubectl get pods -o yaml [tab][tab]`.

There should be no difference regarding auto-completion whether you use aliases or the full commands.

If you use **Zsh**, then there is good news for you.

Command completion for aliases works exactly like that by default.

So you can just go on auto-completing all the aliases as you would the full commands.

If you use **Bash** (as probably the majority of people), then there is good and bad news.

The bad news is that command completion for aliases doesn't work natively in Bash.

The good news is that it can be made working quite easily, which is explained in the following section.

If you use Zsh, or don't care about command completion for aliases in Bash, you can [jump to the next tip →](#6-extending-kubectl-with-plugins).

### Make Bash completion work for aliases

A general and reliable solution to make command completion work for aliases in Bash is the [**complete-alias**](https://github.com/cykerway/complete-alias) project.

Technically, this software provides a Bash function called `_complete_alias`.

If you set this function as the completion specification ([compspec](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion.html#Programmable-Completion)) of *any* alias, then it makes command completion "magically" work for this alias.

Concretely, if you have an alias `foo`, then you just need to execute the following command (read can find more about the `complete` builtin [on the official GNU website](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion-Builtins.html#Programmable-Completion-Builtins)):

~~~bash
complete -F _complete_alias foo
~~~

And after that, command completion works for the `foo` alias exactly as it does for the alias command.

Technically, the `_complete_alias` function looks at the aliased command, gets the completion suggestions for this command, and returns them to the shell.

This is the reason that the same completion function can be used for *any* alias.

The solution for our kubectl-aliases problem is to execute the above command for each alias of kubectl-aliases (a snippet that does this automatically will be shown further below).

#### Install complete-alias

complete-alias depends on the [**bash-completion**](https://github.com/scop/bash-completion) project.

So, you first have to install bash-completion (if you haven't already), which you can do easily with various package managers.

For example, on Debian-based systems:

~~~bash
sudo apt-get install bash-completion
~~~

Or on macOS:

~~~bash
brew install bash-completion@2
~~~~

> **Important note for macOS users:** complete-alias requires bash-completion 2 (indicated by the `@2` in the Homebrew formula). However, bash-completion 2 runs only on Bash 4.1+, and the default Bash version on macOS is 3.2. This means that complete-alias won't work on the default version of Bash on macOS. To make it work, you have to [install a newer version of Bash](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba). If you try to use complete-alias with bash-completion 1 and Bash 3.2, you will get an error of the form `_completion_loader: command not found`.

Once bash-completion is installed, you can install **complete-alias**.

All you have to do for this, is downloading the [`bash_completion.sh`](https://raw.githubusercontent.com/cykerway/complete-alias/master/bash_completion.sh) script and source it in your `~/.bashrc` file. So, for example:

~~~bash
source ~/bash_completion.sh
~~~

That's it! Now complete-alias is installed and ready to be used to enable command completion for your aliases.

#### Enable completion for the kubectl aliases

As mentioned, complete-alias provides the `_complete_alias` shell function, and you have to set this function as the completion function for all the aliases of kubectl-aliases.

You can do this by adding the below snippet anywhere in your `~/.bashrc` file (just adapt the actual location of your `.kubectl-aliases` file):

~~~bash
for _a in $(sed '/^alias /!d;s/^alias //;s/=.*$//' ~/.kubectl_aliases); do
  complete -F _complete_alias "$_a"
done
~~~

That's it!

After restarting your shell, everything should be correctly configured so that you can now use command completion with all the 800 kubectl aliases!

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

One thing that many people don't know is that [kubectl includes a plugin system](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) that allows you to "extend" kubectl with custom commands.

For example, you can install a plugin named `kubectl-hello` that you can then execute as `kubectl hello`:

![](kubectl-hello.cast)

The kubectl plugin system has been introduced in kubectl v1.12 (released in September 2018), and it is currently (v1.13) in beta (which means that the feature is here to stay).

> Note that the kubectl plugin system was inspired by, and works exactly like, the [Git plugin system](https://adamcod.es/2013/07/12/how-to-create-git-plugin.html).

### Installing plugins

Installing kubectl plugins is extremely straightforward.

Plugins are distributed as executable files named `kubectl-x` (where `x` is the name of the plugin).

To install a plugin, all you have to do is to copy this file to any directory in your `PATH` and make sure it is executable.

If that's the case, you can immediately start using the plugin as `kubectl x`.

To uninstall a plugin, simply delete the corresponding plugin file.

### Listing plugins

You can use the following command to list all the kubectl plugins that are installed on your system:

~~~bash
kubectl plugin list
~~~

This command also displays warnings if you have multiple plugins with the same name, or if you forgot to make a plugin file executable.

### Disovering plugins

One of the places to look for existing plugins is on GitHub, for example, in the [**kubectl-plugins**](https://github.com/topics/kubectl-plugins) topic.

You will find several dozens of plugins there that might give you some inspiration of what else you can use kubectl for.

Furthermore, there is a project called **krew** aiming at streamlining the discovery and installation of kubectl plugins, which is presented next.

#### Using krew to discover and install kubectl plugins

[Krew](https://github.com/GoogleContainerTools/krew) is a package manager for kubectl plugins (the name *krew* is a pun on the [*brew*](https://brew.sh/) package manager for macOS).

It allows to browse kubectl plugins that are in the krew index and to install, upgrade, and uninstall them with a single command.

To use krew, you have to install it first.

Krew is itself distributed as a plugin, and you can install it according to the instructions [on the official project](https://github.com/GoogleContainerTools/krew/#installation).

Once krew is installed, you can invoke it as `kubectl krew`. You can browse the plugins in the krew index as follows:

~~~bash
kubectl krew search
~~~

And you can install a particular plugin like that:

~~~bash
kubectl krew install <plugin>
~~~

This command lists all the plugins that have been installed via krew:

~~~bash
kubectl krew list
~~~

Note that the above command does *not* list the plugins that have been installed manually (that is, not with krew).

To list *all* plugins on your system, you can use the `kubectl plugin list` command.

In general, the use of krew does not prevent you from installing plugins manually.

Plugins installed by krew and plugins installed manually can live side by side on your system.

### Creating your own plugins

If you don't find an existing plugin that does what you want, you can create your own.

A kubectl plugin can be any type of an executable file (a Bash script, a compiled C program, a Python script, etc.).

The only requirement is that it is named `kubectl-x`, where `x` is the name of your plugin.

For example, do you remember the command for listing the container images of all pods in your cluster from a [previous section](#3-using-custom-output-formats)?

You can easily transform it to a plugin that you can invoke as `kubectl images`.

All you have to do for this is to create a file named `kubectl-images` with the following content:

~~~bash
#!/bin/bash
kubectl get pods -o custom-columns='NAME:metadata.name,IMAGES:spec.containers[*].image'
~~~

That's it! The `kubectl-images` file is a valid kubectl plugin and can be [installed](#installing-plugins) by anyone, and invoked as `kubectl images`.

This example plugin is just a simple shell script, but plugins can be arbitrarily sophisticated.

Nothing prevents you from implementing a plugin in Java or Go, possibly using a [Kubernetes client library](https://kubernetes.io/docs/reference/using-api/client-libraries/) (for Go there exists even a utility library called [cli-runtime](https://github.com/kubernetes/cli-runtime) specifically for kubectl plugins).

Detailed information about creating plugins can be found [on the official website](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/).

Feel free to distribute your plugins on GitHub if you think they might be useful for others too (just add the [kubectl-plugins](https://github.com/topics/kubectl-plugins) topic to make them easily discoverable).

You can even try to [add a plugin to the krew index](https://github.com/GoogleContainerTools/krew-index) [according to the instructions here](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md) (it requires your plugin to be accepted by the krew maintainers).

### Command completion

Currently, the kubectl plugin mechanism does unfortunately not yet support command completion.

This means that you have to fully type the plugin names and any arguments.

For example, consider you type the following:

~~~
kubectl im[tab][tab]
~~~

This will **not** auto-complete to `kubectl images` (if you have the `kubectl-images` plugin installed). Similarly, if the plugin would take any arguments, you couldn't auto-complete them.

However, there is an open [**feature request**](https://github.com/kubernetes/kubectl/issues/585) in the kubectl repository on GitHub that asks for exactly that. So there is hope that some time in the future, command completion will also work for plugins.

<!--
#### Distribute your own plugins via krew

If you created a plugin and want to add it to the *krew* index, so that other users can discover and install it via *krew*, you can do that. The instructions for this can be found in the [developer guide](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md) of the *krew* documentation.

In short, you have create two artefacts for publishing your plugin to *krew*:

- A `.zip` or `.tar.gz` archive containing the executables of your plugin (possibly for different platforms)
- A *krew* [plugin manifest](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md#writing-a-plugin-manifest) YAML file

The **archive** with the executables must be publicly downloadable via a URL. You can achieve this, for example, by adding it as a binary to a GitHub [release](https://help.github.com/articles/creating-releases/).

The **plugin manifest** must contain all the required information for *krew* to install the plugin. This includes the URL of the archive with the executables, and the names of the executables to install for each platform. The plugin manifest is what will be uploaded to the *krew* index.

To publish your plugin to the *krew* index, you have to create a pull request to the [krew-index](https://github.com/GoogleContainerTools/krew-index) repository adding your plugin manifest to the [`plugins`](https://github.com/GoogleContainerTools/krew-index/tree/master/plugins) directory of this repository. This is were the manifests of all the plugins in the *krew* index are maintained.

Once the pull request is accepted, you plugin will be publicly listed by `kubectl krew search` and users can install it with `kubectl install <plugin>`. If you create a new version of your plugin, you have to update your plugin manifest in the krew-index repository with a new pull request.

Again, the detailed instructions for publishing plugins to *krew* can be found in the *krew* [developer guide](https://github.com/GoogleContainerTools/krew/blob/master/docs/DEVELOPER_GUIDE.md).
