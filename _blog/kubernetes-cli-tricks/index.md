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

If you use Kubernetes, you use kubectl. And you probably use it *a lot*. If you spend so much time using a certain tool, it's worth knowing it very well and being able to use it *efficiently* and *effectively*. This article presents a series of tips and tricks to power-up your usage of kubectl, and along the way, giving you a deeper understanding of the kubectl/Kubernetes ecosystem. The ultimate goal of this article is not only to make your daily work with Kubernetes more professional, but also more fun and enjoyable!

<!--more-->

## What is kubectl?

In order to use a took efficiently and effectively, you need to understand what it is an how it works. The following diagram gives an overview of where kubectl is in the Kubernetes ecosystem:

![](what-is-kubectl.png)

To understand the role of kubectl, you also need to have a basic understanding of how Kubernetes works.

Kubernetes itself consists of a set of independent **components** that run on different nodes of a cluster. A subset of these components are **control plane components** and they usually run on one or more dedicated nodes that only run control plane components and don't execute any workloads. These nodes are called master nodes. The remaining components are **worker nodes components**, and they run on those nodes of the cluster that execute the application workloads. These nodes are called worker nodes.

Each component has a very specific job. For example, the **etcd** component ([etcd](https://coreos.com/etcd/) is a distributed key-value store) in the control plane stores all the resource specifications that have been defined for the cluster, such as pods and services. The **scheduler** component (a control plane component) assigns pending pods to worker nodes for execution. The **kubelet** component (a worker node component) is responsible for running the container(s) of a pod that has been assigned to its node by the scheduler.

However, there is one very important component that I didn't mention yet: the **API server**. The API server is the switching point for all interactions between components within the cluster, as well as the main entry point for interactions from outside the cluster. The individual components in a cluster don't talk to each other directly, but they only talk to the API server (in fact components don't even know about each others' existence). Similarly, an external user (such as you) interacts with a Kubernetes cluster by talking to the API server.

The API server defines an **HTTP REST API** through which all these interactions happen. This is commonly known as the [Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview/). All Kubernetes operations are implemented as **CRUD** operations (create, read, update, delete) on Kubernetes **resources**. Everything, from a pod to a service to a deployment or namespace is a Kubernetes resource, and all Kubernetes operations are CRUD operations on these resources, carried out through the HTTP REST API of the API server. You can find the full list of these resources with all their fields for the latest version of Kubernetes [here](https://kubernetes.io/docs/reference/kubernetes-api/).

Now that you have a good idea of what kubectl is, let's look at a series of tips and tricks to make your usage of kubectl more efficient.

## 1. Save typing with command completion

One of the most obvious, but often overlooked, tricks to make your kubectl usage more efficient is shell completion. This is a feature that kubectl provides for the **Bash** and **zsh** shells (see [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion)). It allows you to auto-complete kubectl sub-commands, options, and arguments, including hard-to-type things like pod or node names. This can save you really a lot of typing or copy-pasting!

Here is a small demonstration of shell completion in action:

![](todo.gif)

You use completion by hitting *Tab* to auto-complete the current word (if there is only a single match), and hitting *Tab* two times to display a list of all the possible completions (if there are multiple matches).

The setup procedure for shell completion depends on whether you use Bash or zsh and Linux or Mac. [Note: what about windows?]

> Please note that the completion functionality for kubectl is provided by a **completion script**. This is a shell script that instructs the shell how completion should work for this command. kubectl outputs this script for the Bash and zsh shells with the command `kubectl completion bash` and `kubectl completion zsh`, respectively. You have to source this script for enabling completion.

- [Setting up autocompletion on Bash and Linux](#bash-on-linux)
- [Setting up autocompletion on Bash and macOS](#bash-on-macos)
- [Setting up autocompletion on zsh](#zsh)

### Bash on Linux

For Bash, the kubectl completion script depends on a third-party project called [**bash-completion**](https://github.com/scop/bash-completion). You need to install this project on your system to make kubectl completion work for Bash.

You can install bash-completion as follows:

~~~bash
sudo apt-get install bash-completion
~~~

This creates the file `/etc/bash_completion`, which you have to source in your `~/.bashrc` file. So add the following to your `~/.bashrc` file:

~~~bash
source /etc/bash_completion
~~~

Now, you just need to make sure the kubectl completion script is sourced in every shell session. You can do this by adding the following command to your `~/.bashrc` file (after the above command):

~~~bash
source <(kubectl completion bash)
~~~

And that's it! After starting a new shell (or sourcing `~/.bashrc`), kubectl completion should work.

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### Bash on macOS

On macOS, the story is (unfortunately) a bit more complicated. The reason for this is that Apple includes a completely outdated version of Bash in macOS. In particular, this is version 3.2 which dates from 2007 (you can test it on your Mac by running `bash --version`). Apple does this for licensing reasons: Bash 3.2 is the last version that uses the GPLv2 license, whereas later versions use GPLv3, and Apple is unwilling to accept GPLv3.

The problem is that the kubectl completion script (that you generate with `kubectl completion bash`) does not work properly with Bash 3.2. It requires at least Bash 4.1.

The only solution to this problem is to install a newer version of Bash on your Mac (the currently latest version is 5.0). This is actually not difficult and I wrote an entire article about it [here](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba). I recommend you to follow the steps in this article before proceeding.

Once you have upgraded Bash to a newer version, you have to install bash-completion.

You can do this conveniently with the [Homebrew](https://brew.sh/) package manager:

~~~bash
brew install bash-completion@2
~~~

The `@2` at the end of the Homebrew formula stands for major version 2 of bash-completion. This version has to be used for Bash 4.1 and newer (which you are hopefully using by now).

The above command will prompt you in the "Caveats" section to add the following command to your `~/.bash_profile` or `~/.bashrc` file:

~~~bash
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
~~~

You have to do this in order to enable the bash-completion functionality.

After that, you just need to source the kubectl completion script, which you can do by adding the following command to your `~/.bashrc` file (after the above command):

~~~bash
source <(kubectl completion bash)
~~~

And that's it! After starting a new shell, kubectl completion should be working.

[Jump to the next section →](#quickly-access-resource-documentation-with-kubectl-explain)

### zsh

With zsh, the setup procedure is the same for macOS and Linux, and furthermore, it doesn't depend on a third-party project like bash-completion. So, all you have to do is to source the kubectl completion script.

You can do this by adding the following to your `~/.zshrc` file:

~~~zsh
source <(kubectl completion zsh)
~~~

If you get an error like `complete:13: command not found: compdef` when you execute the above command, you have to enable the `compdef` builtin in your shell. You can do this by adding the following to the beginning of your `~/.zshrc` file:

~~~zsh
autoload -Uz compinit
compinit
~~~

## 2. Creating YAML quickly with `kubectl explain`

You manage a Kubernetes cluster by applying CRUD operations on resources such as deployment and services that are stored in the control plane of the cluster (more precisely, in the etcd component). Resources have a hierarchical structure (consisting of fields and sub-fields) that is specified in the [API reference](https://kubernetes.io/docs/reference/kubernetes-api/).

When you create, read, or update a resource, you need to know the structure of this resource (for example, if you want to specify or retrieve the image of a container in a pod, you need to know that this information is located in the `pod.spec.containters.image` field).

You could do this by consulting the API reference on the web, but this is a time-consuming and tedious process. Looking up this information should be faster and more integrated in your workflow.

This is where `kubectl explain` comes in. This command provides the complete API reference right in your terminal.

For example, if you want to know the fields of a pod, you can run:

~~~bash
kubectl explain pod
~~~

This command shows you all top-level fields of a pod including their type and a description.

You can then drill down into any fields that you're interested in to get their documentation, for example:

~~~bash
kubectl explain pod.spec
kubectl explain pod.spec.containers
kubectl explain pod.spec.containers.image
~~~

The information shown by `kubectl explain` is identical to the information in the [API reference](https://kubernetes.io/docs/reference/kubernetes-api/) on the web. The only difference is that with `kubectl explain`, you have it right at your fingertips.

By default, `kubectl explain` displays only one level of fields. You can recursively display the entire tree of fields (including the type of each field but omitting the description) with the `--recursive` flag:

~~~bash
kubectl explain pod.spec --recursive
~~~

In case you're not sure about the top-level resource names that you can use with `kubectl explain` (e.g. *pod*, *service*), you can display all of them with the following command:

~~~bash
kubectl api-resources
~~~

Note that this command displays the resource names in their plural form (e.g. *services* instead of *service*). It also displays the short name for those resources that have a short name (e.g. *svc* for the service resource). You can use any of these forms for `kubectl explain`.

For example, the following invocations are all equivalent:

~~~bash
kubectl explain svc.spec
kubectl explain service.spec
kubectl explain services.spec
~~~

## 3. Listing images deployed in the cluster with custom a formatting

When you retrieve resources from the API server with the `kubectl get` command, then kubectl, by default, displays these resources to you in a format like in the following example:

~~~bash
$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
engine-544b6b6467-22qr6   1/1     Running   0          78d
engine-544b6b6467-lw5t8   1/1     Running   0          78d
engine-544b6b6467-tvgmg   1/1     Running   0          78d
web-ui-6db964458-8pdw4    1/1     Running   0          78d
~~~


Each resource is represented as a row in a table consisting of some few attributes of the resource (in the case of pods shown above, these attributes are the name of the pod, the number of containers in the pod and the number thereof that are ready, the status of the pod, and the age of the pod).

The table format is great for human readers, because it makes information recognisable at a single glance. But the selection of attributes that are displayed seems pretty arbitrary. Indeed, this selection of attributes is mainly a nice guess of kubectl about what might interest you most about this resource type.

But are you always just interested in what kubectl thinks is best for you? Definitely not, and you are by no means restricted to it.

What if you wish to know all the Pod's images deployed in the cluster?

Unfortunately the stock `kubectl get` command doesn't help with you with that.

But you can use custom colums to surface the info:

~~~bash
$ kubectl get pods \
  -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image"
POD                       IMAGES
engine-544b6b6467-22qr6   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-lw5t8   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-tvgmg   foo/engine:0.0.1,foo/sidecar:0.0.1
web-ui-6db964458-8pdw4    foo/web-ui:0.0.1
~~~

This command displays the container images of each pod in the default namespace of the cluster.

The output has two columns. The first column (entitled `POD`) contains the name of each pod, which is defined in the `pod.metadata.name` field of a pod resource object. The second column (entitled `IMAGES`) contains the names of all the container images in this pod, which are defined in the `pod.spec.containers[*].image` fields.

If your cluster is deployed in the cloud, you could use a similar command to display a list of nodes and their availability zones:

~~~bash
$ kubectl get nodes \
  -o custom-columns=NAME:.metadata.name,ZONE:metadata.labels."failure-domain\.beta\.kubernetes\.io/zone"
[TODO: add output]
~~~

The way to do this is to use the [`custom-columns` output format](https://kubernetes.io/docs/reference/kubectl/overview/#custom-columns). It is used in the following way:

~~~
-o custom-columns=<COL>:<PATH>[,...]
~~~

You specify a comma-separated list of `<COL>:<PATH>` pairs, where `<COL>` is a column name (freely chosen by you), and `<PATH>` is a "path" in the hierarchical object specification to the field you wish to display in this column. `<PATH>` can refer to *any* field in an object (remember that you can inspect the field structure of any object with the `kubectl explain` command).

Note two things about using the `custom-columns` in general:

- Since the resource object itself (e.g. *pod*) is defined by the `kubectl get` command, you **don't** have to add it at the beginning of the path expressions (e.g. you write `.metadata` and **not** `pod.metadata`).
- If a field is a list rather than a single object (like `pod.spec.containers`), then you have to use brackets `[]` and a subscript operator between them to specify to which objects of the list the path applies. You can use a number or a wildcard `*` as a subscript operator.

Again, you can find out the nature of each field in a resource object (whether it's an object or a list, which sub-fields it contains, etc.) with the `kubectl explain` command.

## 4. Connecting and switching to different clusters and namespaces effortlessly

If you're already working with one or more clusters, then you must have a kubeconfig file (for example, the default `~/.kube/config`). Most probably you didn't write this file yourself, so how did it get there?

If you created your clusters with a managed Kubernetes service, such as [Amazon Elastic Container Service for Kubernetes (EKS)](https://aws.amazon.com/eks/) or [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/), then it was either the cluster creation command or a dedicated command that created or updated your kubeconfig file.

The dedicated commands that create or update a kubeconfig file with the information of a specific cluster are as follows for Amazon EKS and GKE, respectively:

- `aws eks update-kubeconfig -name <cluster>`
- `gcloud container clusters get-credentials <cluster>`

What these commands do is adding a **cluster**, **user** and **context** element to your kubeconfig file.

- Clusters, a list of cluster entries. Technically, a cluster entry consists of the API server URL and possibly a server authentication certificate.
- Contexts, component is a list of context entries. Each context entry has exactly three elements: Cluster, Namespace, and User
- Users, contains client authentication information. In other words, the information in a user entry allows to authenticate requests to an API server

There's also a fourth entry: **current context** that points to one of the contexts in the contexts component.

Whenever you use kubectl, it uses the **current context**. That means, when you issue a command like `kubectl get pods`, then kubectl connects to the cluster found in the **cluster** of the current context, authenticates the request using the credentials found in the **user** of the current context, and applies the Kubernetes operation to the Kubernetes namespace found in the **namespace** of the current context.

Imagine you have a bunch of entries from different clusters in your kubeconfig file. At any point in time, you are using one specific context (that is, a combination of a cluster, user, and namespace). At some point, you will want to change to another context.

You could edit manually the **current context** in your kubeconfig. But that's tedious and we want to have it simpler.

Or you could use kubectl's built-in commands:

- Get the current context with `kubectl config current-context`
- List all contexts `kubectl config get-contexts`
- Change the current context `kubectl config use-context <context>`

That's already better than working on the kubeconfig file directly. However, using these commands is still not very efficient.

- the commands are relatively long to type (even with command completion it still takes some time to enter them) and
- hanging the context, you need to enter the name of the new context. Managed services like Amazon EKS and GKE create pretty long context names

A very popular solution is the [**kubectx**](https://github.com/ahmetb/kubectx) project. This project provides two commands, `kubectx` and `kubens`. These commands allow you to quickly and easily switch context and namespace.

For example, `kubectx` provides completion of context names, a shortcut to switch back to the previous context, and sub-commands for renaming and deleting a context. `kubens` also provides completion of namespaces and a shortcut to switch back to the previous namespace.

![](todo.gif)

I personally created two other tools called [**kubectl-ctx**](https://github.com/weibeld/kubectl-ctx) and [**kubectl-ns**](https://github.com/weibeld/kubectl-ns). These tools are based on simple bash commands, and they can be installed as kubectl plugins (kubectl plugins will be explained in the [*Extend kubectl with plugins*](#extend-kubectl-with-plugins) section). An advantage of kubectl-ns is that it locally caches the namespaces of each cluster so that the commands for listing and changing namespaces can omit requests to the API server and are thus much faster

![](todo.gif)

## 4. Save even more typing with autogenerated shell aliases

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

![](todo.gif)

## 5. Extend kubectl with plugins

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

Kubectl provides a single native command that is related to plugins:

~~~bash
kubectl plugin list
~~~

This command lists all the plugins that kubectl detects in the `PATH` of your system. This gives you an overview of which plugins are available for you to use.

### Creating and installing plugins

So far in this article, you have created a couple of convenience tools around kubectl. One example is the `kgi` alias from section [Custom Output Format](#custom-output-format) that displays the container image names n each pod of your cluster. As a reminder, this alias was defined as follows:

~~~bash
alias kgi='kubectl get -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image" pods'
~~~

What about making this tool a plugin named `img`, so that you can execute it as `kubectl img`? That's definitely a good alternative to having the cryptic `kgi` alias around.

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

How do you find more plugins for kubectl?

### krew: a package manager for kubectl plugins

So far you have seen that you can create and install your own plugins or you can install plugins that others created. If you want to do the latter, you might have the followin questions:

- Where can I find available plugins?
- How do I have to install each plugin?
- How can I keep installed plugins up-to-date?

There is a community project called [*krew*](https://github.com/GoogleContainerTools/krew) that attempts to solve these problems. *Krew* is a package manager for kubectl plugins (its name is a reference to [*brew*](https://brew.sh/), a package manager for macOS).

*Krew* maintains an index of kubectl plugins to which plugin developers can add their plugins. As a plugin user, you can easily discover all the plugins in this index and install (and upgrade) them in standardised procedure.

The *krew* tool is provided as a kubectl plugin itself. You can install it as described [here](https://github.com/GoogleContainerTools/krew#installation) in the official instructions.

Once installed, you can use *krew* as follows:

~~~bash
kubectl krew install <plugin>
~~~

As you can see, this makes it really easy to manage kubectl plugins on your system. Note that using *krew* doesn't exclude the installation of plugins in the conventional way.

As a side note, *krew* is still in an early stage (like the plugin system as a whole), and at the moment there are about 30 plugins in the *krew* index. However, the project has gained promising traction, and there have even been [attempts](https://github.com/kubernetes/community/pull/2340) to add it natively to kubectl. So, it is definitely worth keeping an eye on!
