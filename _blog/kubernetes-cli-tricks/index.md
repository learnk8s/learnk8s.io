---
layout: post
title: Kubernetes Command-Line Tricks
date: 2019-01-24 12:00:00
author: Daniel Weibel
author_link: https://medium.com/@weibeld
categories: kubernetes kubectl command-line shell bash
excerpt: fooo bar
js:
  - anime.min.js
  - isScrolledIntoView.js
open_graph:
  title: Kubernetes Command-Line Tricks
  type: article
  image: 
---


<!--more-->


## What is `kubectl`?

You probably know what you can do with `kubectl`, namely controlling and managing a Kubernetes cluster. But do you know what `kubectl` actually *is* from a technical point of view? The following diagram gives an overview:

![](what-is-kubectl.png)

To understand what `kubectl` is, you also need to have a rough idea how a Kubernetes cluster works. Kubernetes itself consists of various independent **components**. Some of them are control plane components and they usually run on one or more dedicated master nodes of the cluster. Other components run on each worker node of a cluster.

Each component has a very specific job. For example, the **[etcd](https://coreos.com/etcd/) storage** component stores all the resource specifications that have been defined for a cluster (e.g. deployments, services, etc.). The **scheduler** component assigns pending pods to worker nodes for execution. The **kubelet** component, which runs on each worker node, runs the container(s) of a pod that has been assigned to its node by the scheduler.

However, there is one very central component: the **API server**. The API server is the switching point for all interactions between components within the cluster, as well as the main entry point for interactions from outside the cluster. The individual components in a cluster don't talk to each other directly, but they communicate via the API server. Similarly, an external user (such as you) interacts with a cluster through the API server. 

The API server defines an HTTP REST API through which all these interactions happen. This is commonly known as the **Kubernetes API** and it is described [here](https://kubernetes.io/docs/reference/using-api/api-overview/) in the docs. Since it is a REST API, all Kubernetes operations are implemented as CRUD operations (create, read, update, delete) on Kubernetes **resource objects** (which are stored in the etcd component). The full specifications of these resource objects for the currently latest version of Kubernetes can be found [here](https://kubernetes.io/docs/reference/kubernetes-api/).

This means that, as a cluster user, you control a Kubernetes cluster by making HTTP calls to the REST API of your cluster's API server. You could do this with a tool like `curl`. Or, since this is tedious and error-prone, you could use a tool that provides you a nice interface and carries out these HTTP API calls for you behind the scenes. And that's exactly what `kubectl` is.

`kubectl` is essentially a command-line tool that carries out HTTP calls to the API server on your behalf. It allows you to do everything that you could also do by directly calling the API (e.g. with `curl`), but in a more user-friendly way (plus it allows you to do some additional management tasks).

Technically, `kubectl` is a Go program, and it uses a library called [client-go](https://github.com/kubernetes/client-go) to make the calls to the Kubernetes API. The client-go library is the official Kubernetes API client library for Go. There exist Kubernetes API client libraries for various other programming languages (see [here](https://kubernetes.io/docs/reference/using-api/client-libraries/)), and you are free to use these libraries in your own programs that need to access a Kubernetes cluster.

The important point to remember from this section is that a Kubernetes cluster is controlled through an HTTP REST API provided by an API server, and `kubectl` is one of the means through which you can access this API.

The remainder of this article presents a collection of "tricks" that help you make your usage of `kubectl` as efficient as possible.


## Shell Completion

One of the most obvious, but often overlooked, tricks to make your `kubectl` usage more efficient is shell completion. This is a feature that `kubectl` provides for the **Bash** and **zsh** shells (see [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion)). It allows you to auto-complete `kubectl` sub-commands, options, and arguments, including hard-to-type things like pod or node names. This can save you really a lot of typing or copy-pasting!

Here is a small demonstration of shell completion in action:

![](todo.gif)

You use completion by hitting *Tab* to auto-complete the current word (if there is only a single match), and hitting *Tab* two times to display a list of all the possible completions (if there are multiple matches).

The setup procedure for shell completion depends on whether you use Bash or zsh and Linux or Mac. Each case is explained in the following. But first, some general notes that apply to all setups.

### General Notes

- The completion functionality for `kubectl` is provided by a **completion script**. This is a shell script that instructs the shell how completion should work for this command. `kubectl` outputs this script for the Bash and zsh shells with the command `kubectl completion bash` and `kubectl completion zsh`, respectively. You have to source this script for enabling completion.
- For Bash, the `kubectl` completion script depends on a third-party project called [**bash-completion**](https://github.com/scop/bash-completion). You need to install this project on your system to make `kubectl` completion work for Bash.

### Bash on Linux

As mentioned, for Bash you first have to install a project called [bash-completion](https://github.com/scop/bash-completion). This project provides Bash functions that are used by the `kubectl` completion script (that is, the output of `kubectl completion bash`).

You can install bash-completion as follows:

~~~bash
sudo apt-get install bash-completion
~~~

This creates the file `/etc/bash_completion`, which you have to source in your `~/.bashrc` file. So add the following to your `~/.bashrc` file:

~~~bash
source /etc/bash_completion
~~~

Now, you just need to make sure the `kubectl` completion script is sourced in every shell session. You can do this by adding the following command to your `~/.bashrc` file (after the above command):

~~~bash
source <(kubectl completion bash)
~~~

And that's it! After starting a new shell (or sourcing `~/.bashrc`), `kubectl` completion should work.

### Bash on macOS

On macOS, the story is (unfortunately) a bit more complicated. The reason for this is that Apple includes a completely outdated version of Bash in macOS. In particular, this is version 3.2 which dates from 2007 (you can test it on your Mac by running `bash --version`). Apple does this for licensing reasons: Bash 3.2 is the last version that uses the GPLv2 license, whereas later versions use GPLv3, and Apple is unwilling to accept GPLv3.

The problem is that the `kubectl` completion script (that you generate with `kubectl completion bash`) does not work properly with Bash 3.2. It requires at least Bash 4.1. 

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

After that, you just need to source the `kubectl` completion script, which you can do by adding the following command to your `~/.bashrc` file (after the above command):

~~~bash
source <(kubectl completion bash)
~~~

And that's it! After starting a new shell, `kubectl` completion should be working.

### zsh

With zsh, the setup procedure is the same for macOS and Linux, and furthermore, it doesn't depend on a third-party project like bash-completion. So, all you have to do is to source the `kubectl` completion script.

You can do this by adding the following to your `~/.zshrc` file:

~~~zsh
source <(kubectl completion zsh)
~~~

If you get an error like `complete:13: command not found: compdef` when you execute the above command, you have to enable the `compdef` builtin in your shell. You can do this by adding the following to the beginning of your `~/.zshrc` file:

~~~zsh
autoload -Uz compinit
compinit
~~~

## `kubectl explain`

This tip will prove useful for many of the subsequent tips in this post.

As mentioned, you manage a Kubernetes cluster by applying CRUD operations on Kubernetes resource objects (for example, through `kubectl`). Each resource object has a specific hierarchical structure, which is described in the Kubernetes [API reference](https://kubernetes.io/docs/reference/kubernetes-api/). Often you need to know the structure of, say, a *pod*, to know the fields and sub-fields it has. However, hitting the web documentation each time to find this out is a tedious and time-consuming process.

This is where `kubectl explain` comes in. This command contains the same information as the API reference web documentation, but it lets you access it conveniently from your command-line. 

For example, if you want to know which top-level fields the *pod* object has, you can issue the following command:

~~~bash
kubectl explain pod
~~~

If you're interested in the *spec* field of a *pod* object, you can get this information as follows:

~~~bash
kubectl explain pod.spec
~~~

And so on, up to any level of nestings.

By default, `kubectl explain` displays only one level of fields. You can print out the entire hierarchy of fields with the `--recursive` flag:

~~~bash
kubectl explain pod.spec.affinity --recursive
~~~

In case you wonder which top-level resource objects you can use for the `kubectl explain` command, you can print out the entire list with the following command:

~~~bash
kubectl api-resources
~~~

In the output of this command, the resource object names are in plural. However, you can also use the singular version of each name for the `kubectl explain` command.


## Custom Output Format

When you execute a `kubectl get` command, retrievng one or more resource objects from the cluster, the default output is a table-like plain text format. Below is an example:

~~~bash
$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
engine-544b6b6467-22qr6   1/1     Running   0          78d
engine-544b6b6467-lw5t8   1/1     Running   0          78d
engine-544b6b6467-tvgmg   1/1     Running   0          78d
web-ui-6db964458-8pdw4    1/1     Running   0          78d
~~~

As you can see, each object is represented by a few fields. However, the above command actually retrieves the *full* specification of each object from the cluster (coming straight out of the etcd storage via the API server). Thus, you are not confined to view only these few default fields, but you can customise the output to display whatever fields you're interested in.

The way to do this is to use the `custom-columns` output format (see [here](https://kubernetes.io/docs/reference/kubectl/overview/#custom-columns)). It is used in the following way:

~~~
-o custom-columns=<COL>:<PATH>[,...]
~~~

You specify a comma-separated list of `<COL>:<PATH>` pairs, where `<COL>` is a column name (freely chosen by you), and `<PATH>` is a "path" in the hierarchical object specification to the field you wish to display in this column. `<PATH>` can refer to *any* field in an object (remember that you can inspect the field structure of any object with the `kubectl explain` command).

This is best explained with an example:

~~~bash
$ kubectl get -o custom-columns='POD:.metadata.name,IMAGES:.spec.containers[*].image' pods
POD                       IMAGES
engine-544b6b6467-22qr6   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-lw5t8   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-tvgmg   foo/engine:0.0.1,foo/sidecar:0.0.1
web-ui-6db964458-8pdw4    foo/web-ui:0.0.1
~~~

The above command displays the container images in each pod in the cluster (default namespace).

The output has two columns. The first column (entitled `POD`) contains the name of each pod, which is defined in the `pod.metadata.name` field of a pod resource object. The second column (entitled `IMAGES`) contains the names of all the container images in this pod, which are defined in the `pod.spec.containers[*].image` fields.

Note two things about using the `custom-columns` in general:

- Since the resource object itself (e.g. *pod*) is defined by the `kubectl get` command, you **don't** have to add it at the beginning of the path expressions (e.g. you write `.metadata` and **not** `pod.metadata`).
- If a field is a list rather than a single object (like `pod.spec.containers`), then you have to use brackets `[]` and a subscript operator between them to specify to which objects of the list the path applies. You can use a number or a wildcard `*` as a subscript operator.

Again, you can find out the nature of each field in a resource object (whether it's an object or a list, which sub-fields it contains, etc.) with the `kubectl explain` command.

## Switching Contexts and Namespaces

`kubectl` depends on a type of configuration file called **kubeconfig file** (described [here](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) and [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) in the docs). A kubeconfig file contains all the information that `kubectl` needs to connect and authenticate to a Kubernetes cluster (more precisely, to the API server of a Kubernetes cluster).

<!--If you use a managed Kubernetes service (such as [EKS](https://aws.amazon.com/eks/) from AWS or [GKE](https://cloud.google.com/kubernetes-engine/) from GCP), the kubeconfig file can be created or updated automatically with the information of a new cluster by a dedicated command (`aws eks update-kubeconfig` for EKS and `gcloud container clusters get-credentials` for GKE, respectively). -->

The default kubeconfig file is `~/.kube/config`. You can have the information of multiple clusters in the same kubeconfig file (and you can also have multiple kubeconfig files). Kubeconfig files allow you to work with multiple clusters on the same system and easily switch between them.

A kubeconfig file contains the following pieces of information:

- **Clusters**
    - A list of clusters
    - A cluster is represented by a **name**, the **API server URL**, and a **server authentication certificate**
- **Users**
    - A list of cluster users
    - A user is represented by a **name**, and **authentication credentials**
- **Contexts**
    - A list of contexts
    - A context is represented by a **name** and a triple of a **cluster name**, a **user name**, and a Kubernetes **namespace**
- **Current context**
    - The name of the context that is currently active

Our main interest here is in the contexts. Each context consists of a cluster, a user, and a namespace. When `kubectl` is invoked, it always uses one of the contexts defined in the kubeconfig file. Concretely, if `kubectl` uses, say, the context *MyContext*, this means the following:

- `kubectl` connects to the API server URL defined in the *cluster* of *MyContext*
- `kubectl` authenticates to the API server using the credentials in the *user* of *MyContext*
- `kubectl` performs any Kubernetes operation in the namespace defined in the *namespace* of *MyContext*

The context that `kubectl` uses is the one set in the **current context** field of the kubeconfig file. The value of this field can be easily changed. This allows you to apply the next invocation of `kubectl` to another cluster, or to the same cluster but authenticate with a different user, or to the same cluster with the same user but using a different namespace, and so on, and so on. By defining appropriate contexts, you can cover any use case of how to connect to which cluster.

### Managing Contexts

So, when you're working with `kubectl`, you might have a couple of questions:

- What is the current context?
- Which contexts exist?
- How can I change the current context?

Fortunately, `kubectl` provides commands that address these questions:

~~~bash
# What is the current context?
kubectl config current-context
# Which contexts exist?
kubectl config get-contexts
# How can I change the current context?
kubectl config use-context <name>
~~~

Note that the command to change the current context physically changes the *current context* field in the kubeconfig file.

These commands work well, but they are a bit bulky, aren't they? Especially, because you probably have to use them frequently to quickly orientate yourself in your `kubectl` environment.

Furthermore, managed Kubernetes services like [EKS](https://aws.amazon.com/eks/) from AWS or [GKE](https://cloud.google.com/kubernetes-engine/) from GCP generate rather long context names, and copy-pasting them into the command for changing the current context is tedious and time-consuming.

Let's define some shell aliases that allow performing these tasks with a minimum of typing. Here are the aliases in action:

![](todo.gif)


### Changing Namespaces


## More Fuzzy Finding

## More Aliases

## Kubernetes Shells

## Plugins




