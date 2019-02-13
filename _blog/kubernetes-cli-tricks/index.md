---
layout: post
title: Advanced kubectl tips and tricks for power users
date: 2019-01-24 12:00:00
author: Daniel Weibel
author_link: https://medium.com/@weibeld
image: /blog/kubernetes-cli-tricks/magic.jpg
categories: kubernetes kubectl command-line shell bash
excerpt: fooo bar
js:
  - anime.min.js
  - isScrolledIntoView.js
open_graph:
  title: Advanced kubectl tips and tricks for power users
  type: article
  image: /blog/kubernetes-cli-tricks/magic.jpg
---

## Understand what kubectl is

You probably know what you can do with kubectl, namely controlling and managing a Kubernetes cluster. But do you know what kubectl actually is from a technical point of view? The following diagram gives an overview:

![](what-is-kubectl.png)

To understand what kubectl is, you also need to have a rough idea how Kubernetes works.

Kubernetes itself consists of a set of independent **components** that run on different nodes of a cluster. A subset of these components are **control plane components** and they usually run on one or more dedicated nodes that only run control plane components and don't execute any workloads. These nodes are called master nodes. The remaining components are **worker nodes components**, and they run on those nodes of the cluster that execute the application workloads. These nodes are called worker nodes.

Each component has a very specific job. For example, the **[etcd](https://coreos.com/etcd/)** component (a control plane component) stores all the resource specifications that have been defined for the cluster, such as pods and services. The **scheduler** component (a control plane component) assigns pending pods to worker nodes for execution. The **kubelet** component (a worker node component) is responsible for running the container(s) of a pod that has been assigned to its node by the scheduler.

However, there is one very important component that I didn't mention yet: the **API server**. The API server is the switching point for all interactions between components within the cluster, as well as the main entry point for interactions from outside the cluster. The individual components in a cluster don't talk to each other directly, but they only talk to the API server (in fact components don't even know about each others' existence). Similarly, an external user (such as you) interacts with a Kubernetes cluster by talking to the API server.

The API server defines an **HTTP REST API** through which all these interactions happen. This is commonly known as the [Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview/). All Kubernetes operations are implemented as **CRUD** operations (create, read, update, delete) on Kubernetes **resources**. Everything, from a pod to a service to a deployment or namespace is a Kubernetes resource, and all Kubernetes operations are CRUD operations on these resources, carried out through the HTTP REST API of the API server. You can find the full list of these resources with all their fields for the latest version of Kubernetes (currently v1.13) [here](https://kubernetes.io/docs/reference/kubernetes-api/).

And now you can see what **kubectl** is: kubectl is a command-line tool that carries out HTTP requests to the API server. If you run `kubectl get pods`, then kubectl issues an HTTP request that corresponds to a *read* operation on the *pod* resources to the API server

So, if kubectl just makes HTTP requests to the API server, couldn't you also access this API directly? Sure. Nothing stops you from making raw HTTP requests to the API server with a tool like `curl`. If you know the relevant API endpoints and request formats, then you could fully control your cluster that way without ever using kubectl. However, this would be a lot of work and pretty error-prone. The whole point of kubectl is to make it easier for you to interact with the Kubernetes API server.

However, what's more common than accessing the API server directly is to use one of the Kubernetes [client libraries](https://kubernetes.io/docs/reference/using-api/client-libraries/) that exist for different programming languages. These are API client libraries that allow you to carry out requests to the API server programmatically. This allows you to write programs that communicate with the Kubernetes API server, just like kubectl.

In fact, kubectl is nothing else than a program that uses a Kubernetes client library to communicate with the Kubernetes API server. In particular, kubectl is a Go program that uses the [client-go](https://github.com/kubernetes/client-go) library.

The take-away message here is that, regarding cluster control, the crucial point is the HTTP REST API provided by the API server. Everything happens through this API. Kubectl is one of the means to access this API, but there are others, for example issuing raw HTTP requests (e.g. with `curl`) or using a Kubernetes client library. In the end, all these means are equivalent, that is, they all allow you to do the same things.

Now that you have a good idea of what kubectl is, let's look at a series of tips and tricks to make your usage of kubectl more efficient.

## Save typing with command completion

One of the most obvious, but often overlooked, tricks to make your kubectl usage more efficient is shell completion. This is a feature that kubectl provides for the **Bash** and **zsh** shells (see [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion)). It allows you to auto-complete kubectl sub-commands, options, and arguments, including hard-to-type things like pod or node names. This can save you really a lot of typing or copy-pasting!

Here is a small demonstration of shell completion in action:

![](todo.gif)

You use completion by hitting *Tab* to auto-complete the current word (if there is only a single match), and hitting *Tab* two times to display a list of all the possible completions (if there are multiple matches).

The setup procedure for shell completion depends on whether you use Bash or zsh and Linux or Mac. Each case is explained in the following. But first, some general notes that apply to all setups.

### General Notes

- The completion functionality for kubectl is provided by a **completion script**. This is a shell script that instructs the shell how completion should work for this command. kubectl outputs this script for the Bash and zsh shells with the command `kubectl completion bash` and `kubectl completion zsh`, respectively. You have to source this script for enabling completion.
- For Bash, the kubectl completion script depends on a third-party project called [**bash-completion**](https://github.com/scop/bash-completion). You need to install this project on your system to make kubectl completion work for Bash.

### Bash on Linux

As mentioned, for Bash you first have to install a project called [bash-completion](https://github.com/scop/bash-completion). This project provides Bash functions that are used by the kubectl completion script (that is, the output of `kubectl completion bash`).

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

## Quickly access resource documentation

This tip will prove useful for many of the subsequent tips in this post.

As mentioned, you manage a Kubernetes cluster by applying CRUD operations on Kubernetes resource objects (for example, through kubectl). Each resource object has a specific hierarchical structure, which is described in the Kubernetes [API reference](https://kubernetes.io/docs/reference/kubernetes-api/). Often you need to know the structure of, say, a *pod*, to know the fields and sub-fields it has. However, hitting the web documentation each time to find this out is a tedious and time-consuming process.

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


## Get the information you need with custom output formats

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
$ kubectl get -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image" pods
POD                       IMAGES
engine-544b6b6467-22qr6   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-lw5t8   foo/engine:0.0.1,foo/sidecar:0.0.1
engine-544b6b6467-tvgmg   foo/engine:0.0.1,foo/sidecar:0.0.1
web-ui-6db964458-8pdw4    foo/web-ui:0.0.1
~~~

This command displays the container images of each pod in the default namespace of the cluster.

The output has two columns. The first column (entitled `POD`) contains the name of each pod, which is defined in the `pod.metadata.name` field of a pod resource object. The second column (entitled `IMAGES`) contains the names of all the container images in this pod, which are defined in the `pod.spec.containers[*].image` fields.

For convenience, you can wrap this command in a shell alias, so that you can easily execute it, for example as `kgi` (standing for **k**ubectl **g**et **i**mages):

~~~bash
alias kgi='kubectl get -o custom-columns="POD:.metadata.name,IMAGES:.spec.containers[*].image" pods'
~~~

Note two things about using the `custom-columns` in general:

- Since the resource object itself (e.g. *pod*) is defined by the `kubectl get` command, you **don't** have to add it at the beginning of the path expressions (e.g. you write `.metadata` and **not** `pod.metadata`).
- If a field is a list rather than a single object (like `pod.spec.containers`), then you have to use brackets `[]` and a subscript operator between them to specify to which objects of the list the path applies. You can use a number or a wildcard `*` as a subscript operator.

Again, you can find out the nature of each field in a resource object (whether it's an object or a list, which sub-fields it contains, etc.) with the `kubectl explain` command.

## Quickly change contexts and namespaces

kubectl depends on a type of configuration file called **kubeconfig file** (described [here](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) and [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) in the docs). A kubeconfig file contains all the information that kubectl needs to connect and authenticate to a Kubernetes cluster (more precisely, to the API server of a Kubernetes cluster).

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

Our main interest here is in the contexts. Each context consists of a cluster, a user, and a namespace. When kubectl is invoked, it always uses one of the contexts defined in the kubeconfig file. Concretely, if kubectl uses, say, the context *MyContext*, this means the following:

- kubectl connects to the API server URL defined in the *cluster* of *MyContext*
- kubectl authenticates to the API server using the credentials in the *user* of *MyContext*
- kubectl performs any Kubernetes operation in the namespace defined in the *namespace* of *MyContext*

The context that kubectl uses is the one set in the **current context** field of the kubeconfig file. The value of this field can be easily changed. This allows you to apply the next invocation of kubectl to another cluster, or to the same cluster but authenticate with a different user, or to the same cluster with the same user but using a different namespace, and so on, and so on. By defining appropriate contexts, you can cover any use case of how to connect to which cluster.

### Managing Contexts

So, when you're working with kubectl, you might have a couple of questions:

- What is the current context?
- Which contexts exist?
- How can I change the current context?

Fortunately, kubectl provides commands that address these questions:

~~~bash
# What is the current context?
kubectl config current-context
# Which contexts exist?
kubectl config get-contexts
# How can I change the current context?
kubectl config use-context <name>
~~~

Note that the command to change the current context physically changes the *current context* field in the kubeconfig file.

These commands work well, but they are a bit bulky, aren't they? Especially, because you probably have to use them frequently to quickly orientate yourself in your kubectl environment. Furthermore, managed Kubernetes services like [EKS](https://aws.amazon.com/eks/) from AWS or [GKE](https://cloud.google.com/kubernetes-engine/) from GCP generate rather long context names, and copy-pasting them into the `kubectl config use-context` command is tedious and time-consuming.

So, let's define some shell aliases that allow performing these tasks with a minimum of typing. In particular, we will define the following aliases (they all start with `k` to indicate that they belong to kubectl):

- `ksc` (**s**show **c**ontext): show the current context
- `klc` (**l**ist **c**ontexts): list all contexts, marking the current one
- `kcc` (**c**hange **c**ontext): change the current context by interactively selecting it

Here are the aliases in action:

![](todo.gif)

And here are the definitions of the aliases:

~~~bash
alias ksc='kubectl config current-context'
alias klc='kubectl config get-contexts -o name | sed "s/^/  /;\|$(ksc)|s/ /*/"'
alias kcc='kubectl config use-context "$(klc | fzf -e | sed "s/^..//")"'
~~~

> Note that all the aliases presented in this section work for both, Bash and zsh.

Let's go through them one by one. The `ksc` alias prints out the name of the current context:

~~~bash
alias ksc='kubectl config current-context'
~~~

There's nothing complicted here. The alias just wraps a plain command into a shorter alias.

Next, the `klc` alias lists all the contexts that are defined in the kubeconfig file and indicates which of them is the current context with a `*` character:

~~~
$ klc
* arn:aws:eks:us-east-1:202449302273:cluster/test-cluster
  arn:aws:eks:us-east-2:202449302273:cluster/eks-sent2vec
~~~

And here is the defnition of the alias:

~~~bash
alias klc='kubectl config get-contexts -o name | sed "s/^/  /;\|$(ksc)|s/ /*/"'
~~~

That looks a bit more interesting. The alias first lists the names of all the contexts (with the `kubectl config get-contexts`) commands, and then uses *sed* to add a `*` in front of the current context.

Let's look at the *sed* command in more detail. It consists actually of two commands, separated by a semicolon. The first command looks as follows:

~~~sed
s/^/  /
~~~

This simply adds two spaces to the beginning of each context name. This is to make all contexts nicely aligned when one of them will get an astriks in front of it.

The second command looks as follows:

~~~
\|$(ksc)|s/ /*/
~~~

The `\|$(ksc)|` part is the so-called "address" part of the *sed* command. It selects the lines to which the subsequent `s/ /*/` function applies. In that case, the address is a regular expression, and the `\|` and `|` are the delimiters of this regular expression. The regular expression itself is the output of the `ksc` alias that we just defined above, and which prints out the name of the current context. Thus, what this command effectively does is selecting the line with the current context and applying the `s/ /*/` function to it. This function simply replaces the first space with an asteriks, thus effectively "marking" the current context with a `*`.

You might wonder about the strange regular expression delimiters `\|` and `|`. In fact, the default delimiters are `/` slashes. However, it is possible that context names include slashes themselves (this is, for example, the case in the context names generated by [Amazon EKS](https://aws.amazon.com/eks/)), and this would break the *sed* command. However, *sed* allows to use other charactes as delimiters. In this caes, I chose the `|` vertical bar, which is more likely to not occur in any context name. The backslash in `\|` is required in front of the first occurrence of the delimiter.

Let's look at the last of the three aliases. `kcc` lets you change the current context by interactively selecting it from the list of available contexts:

~~~
$ kcc
>   arn:aws:eks:us-east-2:202449302273:cluster/eks-sent2vec
  * arn:aws:eks:us-east-1:202449302273:cluster/test-cluster
  2/2
>
~~~

Now, how does *that* work? It's not magic, but the result of simple shell alias using a powerful tool. Here is the definition:

~~~bash
alias kcc='kubectl config use-context "$(klc | fzf -e | sed "s/^..//")"'
~~~

The first thing you might wonder is, where does the user-interface letting you select a context by typing parts of its name come from? The answer is, from a tool called [`fzf`](https://github.com/junegunn/fzf) (meaning *fuzzy finder*).

`fzf` is a simple as it is ingenious. It reads lines from standard input and then displays you an interface that lets you type a search term, which `fzf` matches to the available lines in real time. When you press the *Return* key, `fzf` writes the currently selected line to standard output. That's what `fzf` does from a high-level view, and it allows a huge range of amazing applications.

You need to install `fzf` on your system at this point. It can be easily installed with Homebrew or by cloning the Git repository and installing from sources, as explained in the instructions [here](https://github.com/junegunn/fzf#installation).

Once you have `fzf` installed, let's go back to the `kcc` alias. It uses the `kubectl config use-context` command, which changes the current context to the context received as argument. The crucial point is how the alias produces this argument (which must be the name of the new context). The argument is the output of the following chain of commands:

~~~bash
klc | fzf -e | sed "s/^..//"
~~~

First, it uses the `klc` alias that was just defined above. It produces a list of all the available contexts (the current context marked with an asteriks).

This list is then read by `fzf`, which lets you select one of these contexts by typing part of its name. The `-e` option of `fzf` enables *exact* matching, that is, your search term matches only if it *literally* occurs in one of the items (by default, `fzf` uses *fuzzy* matching). Whether you prefer exact matching or fuzzy matchine is a matter of taste, and you can adapt the command accordingly. You can see all the options of `fzf` in `man fzf`.

When you confirm your selection in the `fzf` finder interface, `fzf` writes the selected context to standard output, which in this case is a pipe. There, it is read by *sed*, which deletes the first two characters of this string. This is necessary, because the `klc` alias at the beginning of the chain adds two spaces, or an asteriks and a space, to the beginning of each context, and these need to be removed in order to form a valid context name.

That's how these aliases work. If you have `fzf` installed, then you can copy these aliases to your `~/.bashrc` or `~/.zshrc` file and start using the immediately!

> As you can see, some aliases have invocations of other aliases in their definition. For this reason, if you rename an alias, you have to make sure to also rename all its invocations in other alias definitions. Similarly, if you change the order of the aliases, you have to make sure that all invocations of an alias come after its definition.


### Changing Namespaces

As was explained at the beginning of this section, a context is a triple of a *cluster*, a *user*, and a *namespace*. If you wanted to use a given cluster with a given user, but with a different namespace, then you could just define a new context (with the same cluster and user, but with a different namespace) in the kubeconfig file. If you then need to switch between these namespaces, you could just switch between the correspnding contexts.

However, in practice, people often tend to have only a single context per cluster in their local kubeconfig configuration. They usually connect to a cluster using the same kubeconfig user, but what's more variable for a given cluster are the namespaces. Someone might need to do some work in the *dev* namespace of a cluster in one moment, and then in the *prod* namespace of the same cluster in another moment.

Since this is a common use case, let's define aliases for managing namespaces, analogous to the aliases for managing contexts from the previous sub-section.

In particular, we are going to define the following aliases:

- `ksn` (**s**show **n**namespace): show the namespace of the current context
- `kln` (**l**ist **n**amespaces): list all namespaces of the cluster referenced by the current context
- `kcn` (**c**hange **n**amespace): change the namespace of the current context

> Note that while the context aliases from the previous subsection work on the total set of contexts, the aliases here work on the *namespace* attribute of the *current context* (and each context consists of a *namespace*, *cluster*, and *user* attribute).

Here are the aliases in action:

![](todo.gif)

And here are the definitions of the aliases:

~~~bash
alias ksn='kubectl config get-contexts --no-headers "$(ksc)" | awk "{print \$5}" | sed "s/^$/default/"'
alias kln='kubectl get -o name ns | sed "s|^.*/|  |;\|$(ksn)|s/ /*/"'
alias kcn='kubectl config set-context --current --namespace "$(kln | fzf -e | sed "s/^..//")"'
~~~

Let's go through these aliases one by one.

The `ksn` alias prints the namespace of the current context:

~~~
$ ksn
default
~~~

Here is the definition:

~~~bash
alias ksn='kubectl config get-contexts --no-headers "$(ksc)" | awk "{print \$5}" | sed "s/^$/default/"'
~~~

First of all, the alias uses the `kubectl config get-contexts` command to produce a single line with the full information about the *current context* only. This is achieved by disabling headers in the output and passing the name of the current context as argument to the command. Note that the name of the current context is obtained through the `ksc` alias from the last sub-section.

The `kubectl config get-contexts` command outputs information about contexts in a plain text table with five columns. The fifth of these columns contains the namespace of the context. For this reason, the alias passes the output of this command to *awk*, which prints the fifth column only.

Usually, the output of *awk* would now be the name of the namespace already. However, the namespace attribute is *optional* for contexts. If it is omitted in the context definition in the kubeconfig file, then the namespace defaults to the *default* namespace. If this is the case, then the fifth column of the `kubectl config get-contexts` command is empty. For this reason, the output of *awk* is passed to *sed*, which tests if it is empty, and if so, replaces it with the name of the *default* namespace.

The `kln` alias lists all the namespaces of the cluster referenced by the current context, and it marks the namespace that is set in the current context:

~~~
$ kln
* default
  kube-public
  kube-system
~~~

Here is the definition:

~~~bash
alias kln='kubectl get -o name ns | sed "s|^.*/|  |;\|$(ksn)|s/ /*/"'
~~~

The alias uses the `kubectl get` command to get the names of all namespace in the cluster referenced by the current context. Note that this command makes a request to the API server of the cluster, and thus is subject to the network latency between you and the cluster. Therefore, this alias may take longer to complete than the other aliases presented so far, because the other aliases worked only on local data.

The *sed* expression of the alias takes care of marking the namespace of the current context with an asteriks. It is very similar to the *sed* expression of the `klc` alias (listing contexts). One difference is the `s|^.*/|  |` command, which replaces everything from the beginning of the line up to and including the first slash with two spaces. This is necessary, because the `kubectl get -o name ns` command outputs the namespaces in the format `namespace/<name>`, that is, including the resource object type. This first *sed* command strips off the `namespace/` part from these strings.

The second *sed* command then selects the line that matches the namespace of the current context (obtained with the `ksn` alias defined above), and replaces its first space with an asteriks to mark it.

The last alias, `kcn`, allows you to interactively change the namespae of the current context:

~~~
$ kcn
>   kube-system
    kube-public
  * default
  3/3
>
~~~

Here is its definition:

~~~bash
alias kcn='kubectl config set-context --current --namespace "$(kln | fzf -e | sed "s/^..//")"'
~~~

The alias uses the `kubectl config set-context` command to modify the definition of the current context in the kubeconfig file. The `--current` option selects the current context, and the `--namespace` option sets the namespace attribute of this context to the value of its argument.

This argument, which must be the name of the new namespace, is the output of the `kln | fzf -e | sed "s/^..//"` expression. It is similar to the corresponding expression in the `kcc` alias (changing current context). The `kln` alias is used to produce a list of all namespaces, which is passed to `fzf` to let you select one of them, and finally *sed* removes the first two characters that were used for aligning the items.

Note that since this alias uses the `kln` alias, it might also take longer to complete than the other aliases, because `kln` makes a request to the API server of the cluster.

As with the context aliases, you can add these aliases to your `~/.bashrc` or `~/.zshrc` file and start using them immediately.

### `kubectx` and `kubens`

Switching contexts and namespaces is such a common task that others have addressed this problem too. In particular, there's the **kubectx** project that you can find [here](https://github.com/ahmetb/kubectx) on GitHub.

The project provides the commands `kubectx` and `kubens` that allow you to list and switch between contexts and namespaces, just as with the aliases from the previous sub-section. These two commands provide some additional bells and whistles, such as auto-completion, remembering the the previous context and namespace to quickly switch back and forth, and commands for renaming and deleting contexts (although this last point you could easily implement with aliases too).

You can install `kubectx` and `kubens`, according to the instructions [here](https://github.com/ahmetb/kubectx#installation), and use them instead of the aliases. Both solutions allow to do similar things.

However, there's one notable difference. The scripts for `kubectx` and `kubens` together have more than 400 lines of code. With the aliases from the last sub-section, you implemented the largest part of the same functionality with literally just 6 (**six!**) lines of code. That's enough to be proud of!

<!--## More Fuzzy Finding-->

## Save more typing with shell aliases

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

