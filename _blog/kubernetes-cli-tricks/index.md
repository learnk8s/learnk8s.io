---
layout: post
title: Advanced kubectl tips and tricks for power users
date: 2019-01-24 12:00:00
author: Daniel Weibel
author_link: https://medium.com/@weibeld
image: /blog/kubernetes-cli-tricks/magic.jpg
categories: kubernetes kubectl command-line shell bash
js:
  - anime.min.js
  - isScrolledIntoView.js
open_graph:
  title: Advanced kubectl tips and tricks for power users
  type: article
  image: /blog/kubernetes-cli-tricks/magic.jpg
---

If you work with Kubernetes, you most probably use kubectl. And you probably use it *a lot*. Whenever you spend a lot of time working with a specific tool, it is worth truly "mastering" it and using it efficiently.

This article contains a set of tips and tricks to make your usage of kubectl more efficient. By the way, this article also aims at deepening your understanding of how Kubernetes works.

The goal of all this is not only to make your daily work with Kubernetes more efficient, but also more enjoyable!

<!--more-->

## What is kubectl?

Before focussing on how to *use* kubectl more efficienly, you should know what it actually *is*. The following diagram shows an overview of the Kubernetes internals and the role kubectl plays in there:

![](what-is-kubectl.png)

As you can see, kubectl is in fact an HTTP-based client to the Kubernetes API. But what is the Kubernetes API? To understand this, let's briefly look at the Kubernetes internals.

### Kubernetes internals

Kubernetes consists of a set of independent components that run on the nodes (i.e. machines) of the cluster. Each component runs as a separate operating system process.

The most important Kubernetes components are shown in the above diagram. Some components run on the master nodes of the cluster (forming the cluster control plane) and others run on the worker nodes. In the following, they are listed again:

On master nodes:

- **API server:** provides the Kubernetes API, manages etcd storage
- **etcd:** storage backend (see [here](https://coreos.com/etcd/))
- **Controller manager:** ensures status matches spec of all resources
- **Scheduler:** schedules pods to worker nodes

On worker nodes:

- **kubelet:** controls execution of containers on worker node

To see how these components work together, let's see consider an example. Imagine you create a [ReplicaSet](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#replicaset-v1-apps) resource in your cluster (a ReplicaSet consists of a pod template and "replica count", that is, the number of replicas of this pod that should be running at all times) by preparing a YAML manifest of the resource and then creating it with `kubectl apply`.

When you create the ReplicaSet resource, the **API server** saves its manifest in the **etcd** storage. This event triggers the ReplicaSet controller, a sub-process of the **controller manager**. It detects that there is now a ReplicaSet, but no corresponding pods, so it creates manifests for these pods and saves them in the etcd storage (through the API server). This in turn triggers the **scheduler**, as it sees that there now exists a number of pods that are not assigned to a worker node yet. Thus, it selects a worker node for each of these pods and adds the respective node names to the pod manifests in the etcd storage (through the API server). This in turn triggers the **kubelets** on the corresponding worker nodes, as they detect that a pod has been assigned to them. The kubelets then run the containers of these pods on their worker nodes.

### The Kubernetes API

The Kubernetes API is an **HTTP REST API** provided by the API server, and *all* interactions between Kubernetes components happen as [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations through this API. That means, Kubernetes resources (such as ReplicaSets, pods, etc.) are created, read, updated, and deleted through this API (persisted in the etcd storage backend).

The special thing about Kubernetes is that the same management API is used for internal operations as well as for users of the cluster. That means, kubectl talks to exactly the same API as the internal components, such as the scheduler or kubelet.

The full specification of this API for the currently latest version of Kubernetes (v1.13) can be found [here](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/). As you can see, the specification is organised as a list of resource types. These are the resources that can be created, read, updated, and deleted (CRUD) through the Kubernetes API.

For each resource, the specification lists its **structure**, as well as the **operations** that can be applied to this resource. For example, you can see [here](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#create-replicaset-v1-apps) that the *create* operation for a ReplicaSet is implemented by the following HTTP API endpoint:

~~~
POST /apis/apps/v1/namespaces/{namespace}/replicasets
~~~

The body for this HTTP POST request must be a manifest of a ReplicaSet in one of the supported formats (YAML, JSON, or [protobuf](https://developers.google.com/protocol-buffers/)).

So, when you execute a command like `kubectl create -f rs.yaml`, then kubectl makes the above API request behind the scenes. Similarly, internal Kubernetes components themselves use the same API endpoints when they have to create, read, update, or delete Kubernetes resources.

Note that Kubernetes is organised in such a way that the whole cluster can be operated and used through CRUD operations on Kubernetes resources through the Kubernetes API.

After this introductory section, you should now have a good understanding what kubectl in essence is. Namely a tool that carries out HTTP requests to the Kubernetes API on your behalf, allowing you to create, read, update, and delete Kubernetes resources.

Let's now look at a series of tips and tricks to make your usage of kubectl more efficient.


## 1. Save typing with command completion

One of the most useful, but often overlooked, tricks to make your kubectl usage more efficient is shell completion. This feature is provided by kubectl for the [**Bash**](https://www.gnu.org/software/bash/) and [**Zsh**](https://www.zsh.org/) shells (see [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion)).

Command completion allows you to auto-complete kubectl sub-commands, options, and arguments. This includes hard-to-type things like resource names, such as pod names or node names. This can save you a tremendous amount of typing and copy-pasting!

Here is a small demonstration of kubectl command completion in action:

![](todo.gif)

<!--To use command completion, hit *Tab* to auto-complete the current word (if there is only a single match), and hit *Tab* two times to display a list of all the possible completions (if there are multiple matches).-->

Command completion works by the means of a **completion script** that defines the completion behaviour for a specific command. Kubectl can auto-generate its completion script for Bash and Zsh with the following command:

~~~bash
kubectl completion <shell>
~~~

Where `<shell>` is either `bash` or `zsh`.

In the end, this script must be sourced by your shell to enable command completion. However, the procedure to set everything up properly is different for Bash and Zsh, and furthermore, there is a small complication if you use Bash on macOS. The following sections cover all these cases and you can click on one of the links below to directly jump to the instructions for your scenario:

- [Setting up command completion for Bash](#bash)
- [Setting up command completion for Bash on macOS](#bash-on-macos)
- [Setting up command completion for Zsh](#zsh)

### Bash

For Bash, the kubectl completion script depends on a third-party project called [bash-completion](https://github.com/scop/bash-completion). You have to install this software on your system to make kubectl command completion work for Bash.

There are bash-completion packages for many common package managers (see [here](https://github.com/scop/bash-completion#installation)). For example, if you use APT, you can install the package as follows:

~~~bash
sudo apt-get install bash-completion
~~~

This creates the file `/etc/bash_completion`, which you have to source in your `~/.bashrc` file. So add the following to your `~/.bashrc` file:

~~~bash
source /etc/bash_completion
~~~

Now, everything is set up for the kubectl completion script to work, and you just have to source this script itself in your `~/.bashrc` file. You can do this by adding the following command to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

And that's it! After restarting your shell (or sourcing `~/.bashrc`), kubectl command completion should work.

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### Bash on macOS

Apple includes an old version of Bash in macOS, and unfortunately the kubectl completion script does not work with this version. In particular, macOS includes Bash 3.2, and the kubectl completion script requires at least Bash 4.1 (the current version of Bash is 5.0).

> In case you're interested why Apply includes such an old version of Bash in macOS (Bash 3.2 is from 2007): it is for licensing reasons. Bash 3.2 is the last version that uses the [GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) v2 (GPLv2), whereas later versions use GPLv3. Apple is generally unwilling to accept GPLv3.

The only way around this is to install a newer version of Bash on macOS. This is something that is generally recommended if you use Bash on macOS, as it can save you from a lot of trouble when using shell scripts and software that is designed for newer versions of Bash.

Installing a newer version of Bash on macOS and making it the default shell is actually not difficult, and I wrote an entire article about it [here](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba). If you want to use kubectl command completion on macOS, then you should follow the steps in this article before proceeding.

Once you have upgraded Bash to a newer version, you can set up kubectl command completion.

For Bash, the kubectl command completion script depends on a third-party project called [bash-completion](https://github.com/scop/bash-completion). You have to install this software on your system in order to make kubectl command completion work.

You can install bash-completion conveniently with the [Homebrew](https://brew.sh/) package manager:

~~~bash
brew install bash-completion@2
~~~

> The `@2` at the end of the Homebrew formula stands for version 2 of bash-completion. This version targets Bash 4.1 and later, whereas version 1 (without the `@2`) targets versions up to Bash 3.2. The kubectl completion script only works with version 2, that's why you had to install a newer version of Bash.

The `brew install` command asks you in the "Caveats" section to add the following snippet to your `~/.bash_profile`:

~~~bash
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
~~~

I recommend adding it to your `~/.bashrc` file instead, so that bash-completion is also available in sub-shells.

Now all that is left to do is to ensure that the kubectl completion script is sourced in your shell. The simplest way to do this is by simply adding the following command to your `~/.bashrc` file:

~~~bash
source <(kubectl completion bash)
~~~

Optionally, **if you installed kubectl with Homebrew** (`brew install kubernetes-cli`), you can achieve the same in another way (which will be useful for other commands that you installed with Homebrew too).

Homebrew formulas install completion scripts (if any) to the `/usr/local/etc/bash_completion.d` directory. If you installed kubectl with Homebrew, then the kubectl completion script has been placed in this directory by the Homebrew formula. You can instruct bash-completion to source all the completion script in this directory by adding the following line to your `~/.bashrc` file (this is also indicated in the "Caveats" section of the `brew install` command for bash-completion):

~~~bash
export BASH_COMPLETION_COMPAT_DIR="/usr/local/etc/bash_completion.d"
~~~

You just have to make sure this line comes *before* the above line of the "Caveats" section in your `~/.bashrc` file.

Once this is done, you don't need to source the kubectl completion script in your `~/.bashrc` file anymore. In addition, all completion scripts of other Homebrew formula will be automatically sourced too.

No matter which approach you use, after restarting your shell, kubectl command completion should be working!

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### Zsh

Setting up kubectl completion for Zsh is easy. All you have to do is to source the kubectl completion script for Zsh. You can do this by adding the following command to your `~/.zshrc` file:

~~~zsh
source <(kubectl completion zsh)
~~~

That's it! After restarting your shell, kubectl command completion should be working.

If after restarting your shell, you get an error like `complete:13: command not found: compdef`, then you have to enable the `compdef` builtin in your shell. You can do this by adding the following to the beginning of your `~/.zshrc` file:

~~~zsh
autoload -Uz compinit
compinit
~~~


## 2. Quickly look up resource definitions

This tip will prove useful for many of the subsequent tips, and for your Kubernetes usage in general. When you define a YAML or JSON manifest for a resource (e.g. a Deployment or a Service), you need to know the structure of this resource.

In general, resources have a hierarchical structure consisting of fields and sub-fields, each field must be of a specific data type, and some fields are mandatory whereas other are optional. One way to look up all this information is in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/) on the web.

However, there is a better and quicker way, namely the `kubectl explain` command. This command displays you the fields and sub-fields of each resource type, including a description and the data type of each field. The information displayed by `kubectl explain` is the same as in the API reference, but you get it right in your terminal.

The usage of this command is as follows:

~~~bash
kubectl explain resource[.field][.field]...
~~~

For example, if you want to look up the fields of a Deployment (one level deep), you can do that as follows:

~~~bash
kubectl explain deployment
~~~

If you then want to drill down into the `spec` field of a Deployment, you can do it like that:

~~~bash
kubectl explain deployment.spec
~~~

And so on, for any fields and sub-fields.

By default, `kubectl explain` displays only a single level of fields. You can recursively display all the fields and sub-fields (without their descriptions) with the `--recursive` flag. For example:

~~~bash
kubectl explain deployment.spec --recursive
~~~

In case you're not sure about which resources you can use with `kubectl explain`, you can display all of them with the following command:

~~~bash
kubectl api-resources
~~~

The above command displays the resource names in their plural forms (e.g. `deployments` instead of `deployment`). For applicable resources, it also displays their "shortname" (e.g. `deploy`). All of these name variants are in general equivalent for kubectl. That is, you can use any of these variants for `kubectl explain`.

For example, all the following commands are equivalent:

~~~bash
kubectl explain deployments.spec
kubectl explain deployment.spec
kubectl explain deploy.spec
~~~

## 3. Use custom output formats

When you use `kubectl get` to read Kubernetes resources, you get by default an output format like in the following example:

~~~bash
$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
engine-544b6b6467-22qr6   1/1     Running   0          78d
engine-544b6b6467-lw5t8   1/1     Running   0          78d
engine-544b6b6467-tvgmg   1/1     Running   0          78d
web-ui-6db964458-8pdw4    1/1     Running   0          78d
~~~

This format is practical for human consumption, but it displays only a limited amount of information for each resource instance. If you want more information, you could use the `-o json` or `-o yaml` option, but then kubectl displays the *full* definition of each resource, and that's probably more information than you want. Furthermore, JSON and YAML are intended for machine processing, and not as human-readable as the above table format.

The ["custom columns"](https://kubernetes.io/docs/reference/kubectl/overview/#custom-columns) output format displays resources in a human-readable table format (as above), but allows you to define the information displayed in the table yourself.

You use the custom columns output format with the `-o custom-columns=<spec>` option. Here is an example:

~~~bash
kubectl get pods -o custom-columns='NAME:metadata.name,IMAGES:spec.containers[*].image'
~~~

As you can see, the `<spec>` part of the `-o custom-columns` option is as follows:

~~~
NAME:metadata.name,IMAGES:spec.containers[*].image
~~~

It specifies two columns, one entitled `NAME` and the other entitled `IMAGES`, and defines which resource field value(s) to display in these columns. If you run this command, the output will be something like this:

~~~
NAME                       IMAGES
rabbitmq-d4b77b989-t4wzm   rabbitmq:3.7.8-management,nginx
test-pod                   nginx
test-rc-hnhqm              nginx
test-rc-zqz4n              nginx
~~~

As you can see, the output shows the name of each pod as well as the image names of all the containers that run as part of this pod.

In general, the custom columns output format is used as follows:

~~~
-o custom-columns=<header>:<jsonpath>[,<header>:<jsonpath>]...
~~~

That is, you specify a comma-separated list of `<header>:<jsonpath>` pairs, one for each column that you want in the output table.

The `<header>` part is the header of the column and you can freely choose it (it may also be empty). The `<jsonpath>` part is a specifier based on [JSONPath](https://goessner.net/articles/JsonPath/index.html) that selects a field value (or collection of field values) to display in the column.

### JSONPath expressions

JSONPath is a language to extract data from JSON documents. In kubectl, JSONPath is used to specify fields of resources for display.

For example, in the above command the JSONPath expression for the `NAME` column is:

~~~
metadata.name
~~~

If you look at the resource definition of a pod (which you can do either in the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/) or with `kubectl explain`), you see that the name of a pod is defined in the `metadata.name` field (see `kubectl explain pod.metadata.name`). Thus, if you want to display the name of a pod in the output table, you have to use this JSONPath expression.

The JSONPath expression for the `IMAGES` column is:

~~~
spec.containers[*].image
~~~

This is also a valid JSONPath expression, but this time it contains an array operator. If you look at the definition of a pod, you see that the `spec.containers` field is a **list**, each element containing the definition of a container of this pod (see `kubectl explain pod.spec.containers`).

When you encounter resource fields that are lists, then you can use the array operator `[]` in a JSONPath expression. The `*` is a wildcard array subscript operator that selects *all* elements of the array. Thus, in effect, this JSONPath expression the image names of *all* the containers in the pod, which will be displayed by kubectl as a comma-separated list.

JSONPath can do more than only that. You can see its most important capabilites for example [here](https://goessner.net/articles/JsonPath/index.html#e3). However, for the kubectl custom columns output format, only a subset of these capabilites is supported. The supported capabilities are listed in the following with examples:

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

### What else you can do with custom columns output

The uses cases of the custom column output format are endless. You can display any combination of data you want and thus creating your custom "reports" of what's going on in your cluster. Just follow these steps:

1. Explore the definition of a resource
    - In the [API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/)
    - With `kubectl explain`
    - In the YAML or JSON representation of a resource that you get with `kubectl get -o <yaml|json>`
2. Create JSONPath expressions to extract the data you want to display
3. Assemble the `-o custom-columns` option

Here is another example:

~~~bash
$ kubectl get nodes -o custom-columns='NAME:metadata.name,ZONE:metadata.labels.failure-domain\.beta\.kubernetes\.io/zone'
NAME                          ZONE
ip-10-0-118-34.ec2.internal   us-east-1b
ip-10-0-36-80.ec2.internal    us-east-1a
ip-10-0-80-67.ec2.internal    us-east-1b
~~~

As you can see, this command displays which "zone" each node in the cluster is in. This applies if your cluster runs on a cloud infrastructure, such as AWS or GCP. In these environments, a "zone" is a replication area within a "region".

The JSONPath expression for the `ZONE` column selects the value of a special label called [`failure-domain.beta.kubernetes.io/zone`](https://kubernetes.io/docs/reference/kubernetes-api/labels-annotations-taints/#failure-domainbetakubernetesiozone). This label is populated with the "zone" of the node, if the cluster runs on a cloud infrastructure.

Labels are custom data and are not specified in the API reference or in `kubectl explain`. So to see the full range of data you can display, you can explore the YAML or JSON definitions of your resources that you get with `kubectl get -o yaml` or `kubectl get -o json`.

This is just one of many examples of what you can do with the custom columns output format. Feel free to explore your resources and find new use cases!

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

## 4. Switch effortlessly between clusters and namespaces

Kubectl uses a YAML configuration called **kubeconfig** to decide to which **cluster** to connect and how to connect to it (see [here](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) and [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)) . You can have multiple clusters configured in your kubeconfig file, which allows you to easily switch between clusters by "pointing" kubectl to a new cluster (for example, do some work on cluster *A*, switch to cluster *B*, and do some work on cluster *B*).

Similarly, the kubeconfig file also contains the [**namespace**](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) that kubectl uses by default for any cluster. This allows you to switch between namespaces within a given cluster (for example, do some work in the *dev* namespace of a cluster, then switch to the *prod* namespace and do some work there).

> The default kubeconfig file that kubectl looks for is `~/.kube/config`. However, you can also use a different filename, and you can have multiple kubeconfig files. In this case, you have to list the kubeconfig file(s) in the `KUBECONFIG` environment variable (see [here](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable)). You can also explicitly specify the kubeconfig file for each invocation of kubectl with the `--kubeconfig` option.

This tip will show you different tools to switch between clusters and namespaces effortlessly. But to understand what these tools do, you should have a basic understanding of kubeconfig files.

### kubeconfig files

The following diagram shows what a kubeconfig file contains and how kubectl uses it:

![kubeconfig](kubeconfig.png)

As you can see, kubeconfig files are centred around so-called **contexts**. A context references a specific cluster, an authentication mechanism (user), and a namespace of the cluster.

At any time, one of these contexts is set as the **current context**. Whenever kubectl reads a kubeconfig file, it connects to the cluster of the current context (using the corresponding authentication mechanism) and it uses the namespace that is also set in the current context.

> Note that it's possible to overwrite each of these elements for every kubectl command with the `--cluster`, `--namespace`, and `--user` options. You can also overwrite the current context with the `--context` option.

That means, to switch to another cluster, you can just change the current context in your kubeconfig file, as shown in the following diagram:

![](kubeconfig-change-context.png)

Once this is done, the next invocation of kubectl will use the new context and thus connect to your desired cluster.

Similarly, to switch to another namespace in the same cluster, you can change the namespace entry of the current context, as shown here:

![](kubeconfig-change-namespace.png)

Now, the next time kubectl is invoked, it will apply its Kubernetes operations to the new namespace.

The tools that are presented in the next section all perform exactly these changes to your kubeconfig file.

### Approaches to change contexts and namespaces

Here are the approaches and tools you can use to effortlessly switch between clusters and namespaces.

#### kubectx

The most popular approach for these tasks is the [kubectx](https://github.com/ahmetb/kubectx/) project. This software provides two commands called `kubectx` and `kubens` which allow you to switch between contexts and namespaces, respectively. Under the hood, these commands perform exactly the operations that have been explained in the previous section.

You can install kubectx according to the instructions [here](https://github.com/ahmetb/kubectx/#installation) (it is distributed as a Homebrew formula, as well as a Debian package).

A particularly useful feature of kubectx is the [**interactive mode**](https://github.com/ahmetb/kubectx/#interactive-mode). It allows you to select the target context or namespace interactively through a fuzzy search. This can be extremely useful if you have long and cryptic context names like the ones generated by managed Kubernetes services like [Amazon Elastic Container Service for Kubernetes (EKS)](https://aws.amazon.com/eks/) or [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/).

The interactive mode depends on a third-party tool called [fzf](https://github.com/junegunn/fzf), which provides the fuzzy search interace. You must install fzf in order to use the interactive mode of kubectx.

fzf (meaning *fuzzy finder*) is an extremely useful and versatile tool. In a nutshell, it reads lines from stdin, lets the user select one of these lines by a fuzzy search query, and writes the selected line to stdout. You will see fzf again in the alternative tools below.

#### Aliases

kubectx is a full-blown software package that allows you to make some edits to your kubeconfig files. But actually, you can achieve the same thing in a much simpler way by using native kubectl commands.

kubectl provides a whole suite of commands editing kubeconfig files. The relevant ones for switching between clusters and namespaces are those:

- `kubectl config get-contexts`: list all contexts
- `kubectl config current-context`: get the current context
- `kubectl config use-context`: switch the current context
- `kubectl config set-context`: edit a context

However, using these commands directly is not very convenient. But what you can do is wrapping them into shell aliases so that you can execute them more easily. 

This also allows you to enhance them with additional tools to produce a streamlined user experience. In particular, you can combine them with [fzf](https://github.com/junegunn/fzf) (also used by kubectx) to allow you to select the target context and namespace interactively.

Below is an example set of such aliases. There is an alias for each of those operations:

- Get the current context/namespace (`kcc`/`kcn`)
- List all contexts/namespaces (`klc`/`kln`)
- Switch to another context/namespace (`ksc`/`ksn`)

~~~bash
# Contexts
alias kcc='kubectl config current-context'
alias klc='kubectl config get-contexts -o name | sed "s/^/  /;\|$(kcc)|s/ /*/"'
alias ksc='kubectl config use-context "$(klc | fzf -e | sed "s/^..//")"'
# Namespaces
alias kcn='kubectl config get-contexts --no-headers "$(kcc)" | awk "{print \$5}" | sed "s/^$/default/"'
alias kln='kubectl get -o name ns | sed "s|^.*/|  |;\|$(kcn)|s/ /*/"'
alias ksn='kubectl config set-context --current --namespace "$(kln | fzf -e | sed "s/^..//")"'
~~~

Here you can see the aliases in action:

![](todo.gif)

To use the aliases yourself, you just need to copy their definitions to your `~/.bashrc` or `~/.zshrc` file (all aliases work for both Bash an Zsh). Note that these aliases also depend on fzf, so you have to [install it](https://github.com/junegunn/fzf#installation) in order to make them work.

#### Plugins

This approach anticipates something that will be explained in depth in a [later section](#extend-kubectl-with-plugins), namely kubectl plugins. Kubectl allows to install plugins that can be invoked like native commands. The mechanism is extremely easy. If you have an executable named `kubectl-foo`, and it is in your `PATH`, then you can invoke it as `kubectl foo`.

It would be nice to have functionality for switching contexts and namespaces available as plugins. So you could, for example, change the context with `kubectl ctx` and change the namespace with `kubectl ns`. In this way, you don't need to use separate commands for these tasks (like with [kubectx](https://github.com/ahmetb/kubectx)), and the plugin names are probably easier to remember than the short alias names proposed above.

For this reason, I created two such plugins named [**kubectl-ctx**](https://github.com/weibeld/kubectl-ctx) and [**kubectl-ns**](https://github.com/weibeld/kubectl-ns). The installation is extremely easy. Just copy the shell script to any location in your `PATH`, make it executable, and that's it! Now you can change your context with `kubectl ctx` and change your namespace with `kubectl ns`.

The implementation of the plugins is based on the alias commands from the last section, and also depends on fzf. So, you must [install fzf](https://github.com/junegunn/fzf#installation) in order to use the plugins.

The [kubectl-ns](https://github.com/weibeld/kubectl-ns) plugin furthermore fixes a small annoyance that you might have noticed with the `kubens` command from [kubectx](https://github.com/ahmetb/kubectx) or the `kln` and `ksn` aliases from above. When you execute these commands, it might take a while until you see the list of namespaces that you can choose from. This is because the list of namespaces of a cluster is not locally saved and must be retrieved throught the Kubernetes API. That is, these commands include a round-trip to the API server, which is why they take longer to complete than the other commands.

The kubectl-ns plugins fixes this by locally caching the list of namespaces of each cluster, so that the information is immediately available for subsequent requests.


## 5. Save more typing with auto-generated shell aliases

Shell aliases are generally used to abbreviate long commands (including sub-commands, options, arguments, etc.) to short "alias" strings. Then, all you have to do is to type the alias string, and the shell expands the alias and executes the corresponding command, just as if you typed the long command yourself. Defining aliases pays off particularly for frequently used commands.


With kubectl you naturally use certain commands very frequently (for example, `kubectl get pods`). So, it would be nice to define aliases for these commands, right? You would just need to figure out which commands you use most frequently, choose an alias name for each one, and then define the aliases in your `~/.bashrc` or `~/.zshrc` file (for example, as `alias kgpo='kubectl get pods'`).

> In the following, the notation `~/*rc` is used to refer to either `~/.bashrc` or `~/.zshrc`.

But there's a better solution. There's a project called [*kubectl-aliases*](https://github.com/ahmetb/kubectl-aliases) which defines **800 aliases** for frequently used kubectl commands. You can just include these alias definitions in your `~/*rc` file and start using them immediately.

> All aliases in *kubectl-aliases* work with both, Bash and Zsh.

To install the project, just download the `.kubectl_aliases` file (which contains all the alias definitions) from the  GitHub repository [here](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba), and source it in your `~/*rc` file:

~~~bash
source ~/.kubectl_aliases
~~~

You might wonder how you could possibly remember 800 aliases? Well, actually you don't need to. The aliases in `.kubectl_aliases` are all auto-generated according to a simple scheme, which is shown in the following figure (taken from a [blog post](https://ahmet.im/blog/kubectl-aliases/) of the maker of the project):

![](kubectl-aliases.png)

All aliases start with `k`, and then you can append components from left to right, according to the above figure (the `sys` component is optional). Here are some example aliases and the commands that they stand for:

- `k` &#10230; kubectl
- `kg` &#10230; `kubectl get`
- `kgpo` &#10230; `kubectl get pods`
- `kgpooyaml` &#10230; `kubectl get pods -o yaml`

And so on, for all the possible combinations. So, if you want to list all pods, you can just type `kgpo`. If you want to get a specific pod, you can type `kgpo <pod>` (where `<pod>` is the name of the pod you want to retrieve). If you want to get the YAML specification of a specific pod, you can type `kgpooyaml <pod>`.

Nothing prevents you from using these aliases only as parts of your commands. For example, you can use `k` at any place where you would type kubectl otherwise. This means, you can type `k api-resources` (since there's no alias for this command as a whole). Or you can type `kg roles` (since there are no aliases defined for *role* resources). Just look at the command an alias stands for, and you can append further arguments to the alias at will. This allows you to minimise typing even fore use cases that are not explicitly covered by *kubectl-aliases*.

If you use Zsh, it gets even better. The kubectl command completion works with the aliases too. That means, you can type, for example, `kgpo [tab][tab]` and Zsh will complete the available pod names for you. Like this, you can combine two typing reduction mechanisms (aliases and completion) to an "ultra typing reduction" workflow.

If you use Bash, the bad news is that completion for aliases doesn't work by default. The good news is that you can make it working quite easily, which is explained in the following. This will allow you to have your "ultra typing reduction" workflow" also on Bash.

### Making alias completion work with Bash

The problem with Bash is that, unlike Zsh, it doesn't expand aliases before attempting command completion on them. So, for example, if you type `kgpo` and hit *Tab*, then Bash tries to find a completion specification for a command  called `kgpo`, which of course doesn't exist. The solution to this problem is a project called [*complete-alias*](https://github.com/cykerway/complete-alias).

This project provides a Bash function called `_complete_alias`. If you specify this function as the completion specification of any alias (using the [`complete`](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion-Builtins.html) builtin), it "magically" makes completion work (it's actually not "magic" and I will briefly explain how it works below).

For example, if you want to enable completion for the `kgpo` alias, you have to execute the following command:

~~~bash
complete -F _complete_alias kgpo
~~~

And this works with *any* alias (hence, *complete-alias* is very useful in general, not just for *kubectl-aliases*).

Let's first look at how to install *complete-alias*, and then how to run a sequence of commands like the above for every alias in *kubectl-aliases*.

Installing *complete-alias* itself is easy, but it depends on [*bash-completion*](https://github.com/scop/bash-completion) (presented earlier in this post). Most probably you have *bash-completion* already installed. If not, then you have to install it now according to the instructions given in section [*Shell Completion*](#shell-completion).

> **Important note for macOS users:** Apple includes an outdated version of Bash (version 3.2) in macOS. With this version, you are restricted to an old version of *bash-completion* that does **not** work with *complete-alias*. This means, if you use the default version of Bash, the below instructions will **not** work for you. The solution is to install a newer version of Bash on your macOS and set it as your default shell. Instructions to do this can be found [here](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba).

Installing *complete-alias* is done by simply downloading the project's [main file](https://raw.githubusercontent.com/cykerway/complete-alias/master/bash_completion.sh) (confusingly called `bash_completion.sh`) and source it in your `~/.bashrc` file. So, if you save the file, for example, as `~/.complete_alias`, then add the following command to your `~/.bashrc` file:

~~~bash
source ~/.complete_alias
~~~

Now, to enable completion for all the aliases of *kubectl-aliases*, you have to execute a command like `complete -F _complete_alias <alias>` for every alias of *kubectl-aliases*. You can do this by adding the following snippet to your `~/.bashrc` file (adapt `~/.kubectl_aliases` to the location of your *kubectl-aliases* file):

~~~bash
for _a in $(sed '/^alias /!d;s/^alias //;s/=.*$//' ~/.kubectl_aliases); do
  complete -F _complete_alias "$_a"
done
~~~

And that's it! Now completion should work with all the aliases. You can test it by typing, for example, `k [tab][tab]` or `kgpo [tab][tab]`.

In case you wonder how the `_complete_alias` function can enable appropriate completion for *any* alias: this function internally expands the alias and looks at the aliased command. It then invokes *bash-completion* to retrieve the completion suggestions for the expanded command and return them to the shell.

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

<!--## Kubernetes Shells-->

## Extend kubectl with plugins

Plugins are a kubectl feature that only few people know about. They have existed for a while, but the plugin system has been completely redesigned in **version 1.12** (released in September 2018) of kubectl. With the new plugin system, you can add custom sub-commands to kubectl as shown below:

![](screencast-plugin-hello-world.gif)

Plugins are described [here](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) in the Kubernetes documentation.

It is very easy to install kubectl plugins, and it can be explained in a single sentence (there are some further minor details to this, which are explained later): 

*Any executable named `kubectl-<name>` (where `<name>` is any string) in any directory of your `PATH` is detected by kubectl as a plugin and made available as `kubectl <name>`.*

The executable can be of any type: a shell script, a compiled C program, a Python script, and so on, there are no requirements. There is no interface against which you have to program, no plugin manifest to create, and no registration process. The only requirements are that the name of the executable starts with `kubectl-` and that it's located somewhere in your `PATH`.

For example, to create a "Hello World" plugin as shown above, all you have to do is the following:

- Create an executable file named `kubectl-hello`, for example as a shell script (don't forget to set its executable flag with `chmod +x`):
    ~~~bash
    #!/bin/bash
    echo "Hello, I'm a kubectl plugin!"
    ~~~
- Place the file in any directory of your `PATH`

That's all! Now you can invoke your plugin with `kubectl hello`.

What technically happens when you run `kubectl hello` is that kubectl executes the corresponding `kubectl-hello` executable. The executable can do anything it wants, it doesn't even have to be related to Kubernetes (as the above example shows).

Any arguments that you pass to a plugin are passed as-is to the executable. For example, if you run `kubectl hello -o opt` then the `-o` and `opt` arguments are passed to the `kubectl-hello` executable as the first and second arguments, as if it was invoked with `kubectl-hello -o opt`. Furthermore, the plugin executable runs in the same environment as kubectl. That means, any environment variables that are available to kubectl, are also available to the plugin executable.

There are the following further details about kubectl plugins:

- If the executable is named `kubectl-foo-bar`, it is made available as `kubectl foo bar`.
    - This allows you to create plugins that appear to have sub-commands.
- If the executable is named `kubectl-foo_bar` (note the underscore), it is made available as `kubectl foo_bar` *and* `kubectl foo-bar`.
    - This allows you to create plugins with dashes in their name.

Kubectl provides a single native command that is related to plugins:

~~~bash
kubectl plugin list
~~~

This command lists all the plugins that kubectl detects in the `PATH` of your system. This gives you an overview of which plugins are available for you to use.

The above command also includes warnings if a plugin has the same name as a native kubectl command (in which case the plugin will be ignored) or if there are multiple plugins with the same name (in which case, the plugin that appears first in the `PATH` will be used.

### Why plugins?

So, if plugins are just executables that are invoked by kubectl, why even bother with creating a plugin and not just executing the executable yourself? Instead of creating an executable named `kubectl-hello` and run it as `kubectl hello`, you could just create an executable named `hello` and execute it directly. There would be effectively no difference.

The main argument to use the plugin system is to avoid "command overload" (something like app overload on smartphones). Kubectl lends itself to create tools around it, and without plugins, each of these tools is a separate command. This clutters your system with many, often cryptically named, commands. If you design these tools as plugins, you have them all under the kubectl "namespace", which makes it easier to remember and give meaningful names to them. In addition, you can get an overview of all the plugins you are using at any time with the `kubectl plugins list` command.

Furthermore, if you want to distribute a tool to other users, distributing it as a plugin reduces the risk of name clashes with existing tools on the users' system.

At the present time, the plugin mechanism does unfortunately not yet support **completion**. That means, you always have to fully type the plugin names, and can't complete them like native kubectl sub-commands (e.g. `kubectl h[tab]` does not complete to `kubectl hello`). However, there is an open [feature request](https://github.com/kubernetes/kubectl/issues/585) for this on GitHub, so hopefully we will see this feature some time in the future.

### Creating and installing plugins

So far in this article, you have created a couple of convenience tools around kubectl. One example is the `kgi` alias from section [Custom Output Format](#custom-output-format) that displays the container image names n each pod of your cluster. As a reminder, this alias was defined as follows:

~~~bash
alias kgi='kubectl get -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image" pods'
~~~

What about making this tool a  plugin named `img`, so that you can execute it as `kubectl img`? That's definitely a good alternative to having the cryptic `kgi` alias around.

All you have to do transform this command to a plugin is the following:

- Add the alias command to a shell script named `kubectl-img`:
    ~~~bash
    #!/bin/bash
    kubectl get -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image" pods
    ~~~
- Make `kubectl-img` executable:
    ~~~bash
    chmod +x kubectl-img
    ~~~
- Move `kubectl-img` to any directory in your `PATH`
- Verify the installation by checking that the plugin is listed in the output of the following command:
    ~~~bash
    kubectl plugin list
    ~~~

That's it! Now you should be able to execute your container image listing plugin with `kubectl img`.

Some other tools that you created in this article include the aliases for changing the context and namespace from section [Contexts and Namespaces](contexts-and-namespaces). You can transform these tools into plugins exactly like the example above.

Alternatively, I did this already and created two plugins named `ctx` and `ns`, for changing the context and namespace, respectively. You can find them on GitHub:

- [weibeld/kubectl-ctx](https://github.com/weibeld/kubectl-ctx)
- [weibeld/kubectl-ns](https://github.com/weibeld/kubectl-ns)

You can install these plugins on your system by simply downloading the [kubectl-ctx](https://raw.githubusercontent.com/weibeld/kubectl-ctx/master/kubectl-ctx) or [kubectl-ns](https://raw.githubusercontent.com/weibeld/kubectl-ns/master/kubectl-ns) and place it in any directory in your `PATH`.

If you end up installing many plugins, a possible approach for keeping things organised is to create a dedicated directory, e.g. `~/.kubectl-plugins`, add it to your `PATH`, and then install all plugin executables there.

### How to write plugins

The plugins you saw so far are simple shell scripts that include invocations of kubectl. So there, you have basically a sub-command of kubectl that invokes the main command. This is completely legitimate, and made possible by the fact that a plugin executable can be sure that kubectl is installed on the local system (otherwise, the plugin executable couldn't be used as a kubectl plugin).

In fact, many common use cases can be solved by plugins that are implemented as shell scripts that carry out kubectl command.

However, for more complex use cases, nothing stops you from writing plugins as real programs that get their job done without kubectl. If your plugin needs to interact with the Kubernetes API server, you can use one of the Kubernetes [client libraries](https://kubernetes.io/docs/reference/using-api/client-libraries/) (note that kubectl itself is nothing but a program that uses a Kubernetes client library to interact with the Kubernetes API server, namely the [client-go](https://github.com/kubernetes/client-go) library).

If you decide to write your plugin in Go, then Kubernetes has you covered especially well. Kubernetes provides a library called [*cli-runtime*](https://github.com/kubernetes/cli-runtime) which includes helper functionality for interacting with the API server, working with local *kubeconfig* configuration, and more. This library is used by kubectl itself to implement its sub-commands, and if you write a plugin in Go, then you can use it too. There exists also an [example plugin](https://github.com/kubernetes/sample-cli-plugin) that uses this library.

But remember that this is not a requirement. A plugin does neither have to use the *cli-runtime* library, nor does it have to be written in Go. It can be *any* executable.

### krew: a package manager for kubectl plugins

So far you have seen that you can create and install your own plugins or you can install plugins that others created. If you want to do the latter, you might have the followin questions:

- Where can I find available plugins?
- How do I have to install each plugin?
- How can I keep installed plugins up-to-date?

There is a community project called [*krew*](https://github.com/GoogleContainerTools/krew) that attempts to solve these problems. *Krew* is a package manager for kubectl plugins (its name is a reference to [*brew*](https://brew.sh/), a package manager for macOS). 

*Krew* maintains an index of kubectl plugins to which plugin developers can add their plugins. As a plugin user, you can easily discover all the plugins in this index and install (and upgrade) them in standardised procedure.


The *krew* tool is provided as a kubectl plugin itself. You can install it as described [here](https://github.com/GoogleContainerTools/krew#installation) in the official instructions.

Once installed, you can use *krew* as follows:

- List all plugins in the *krew* index:
    ~~~bash
    kubectl krew search
    ~~~
- List all plugins that match a search query:
    ~~~bash
    kubectl krew search <query>
    ~~~
- Get information about a specific plugin:
    ~~~bash
    kubectl krew info <plugin>
    ~~~
- Install a specific plugin:
    ~~~bash
    kubectl krew install <plugin>
    ~~~
- List all plugins installed with *krew*:
    ~~~bash
    kubectl krew list
    ~~~
- Upgrade all plugins (if new versions are available):
    ~~~bash
    kubectl krew upgrade 
    ~~~
- Uninstall a specific plugin:
    ~~~bash
    kubectl krew remove <plugin>
    ~~~

As you can see, this makes it really easy to manage kubectl plugins on your system. Note that using *krew* doesn't exclude the installation of plugins in the conventional way. If you use *krew*, you can still install plugins that are not in the *krew* index by simply copying their executables to your `PATH`. These plugins will not be listed by `kubectl krew list`, but they will be listed by the native `kubectl plugin list`.

As a side note, *krew* is still in an early stage (like the plugin system as a whole), and at the moment there are about 30 plugins in the *krew* index. However, the project has gained promising traction, and there have even been [attempts](https://github.com/kubernetes/community/pull/2340) to add it natively to kubectl. So, it is definitely worth keeping an eye on!

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

