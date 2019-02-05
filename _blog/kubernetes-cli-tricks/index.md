---
layout: post
title: Kubernetes Command-Line Tricks
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
  title: Kubernetes Command-Line Tricks
  type: article
  image: /blog/kubernetes-cli-tricks/magic.jpg
---

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

## Kubeconfig Contexts and Namespaces

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

These commands work well, but they are a bit bulky, aren't they? Especially, because you probably have to use them frequently to quickly orientate yourself in your `kubectl` environment. Furthermore, managed Kubernetes services like [EKS](https://aws.amazon.com/eks/) from AWS or [GKE](https://cloud.google.com/kubernetes-engine/) from GCP generate rather long context names, and copy-pasting them into the `kubectl config use-context` command is tedious and time-consuming.

So, let's define some shell aliases that allow performing these tasks with a minimum of typing. In particular, we will define the following aliases (they all start with `k` to indicate that they belong to `kubectl`):

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

## Save even more typing with aliases

Shell aliases are generally used to abbreviate long commands (including sub-commands, options, arguments, etc.) to short "alias" strings. Then, all you have to do is to type the alias string, and the shell expands the alias and executes the corresponding command, just as if you typed the long command yourself. Defining aliases pays off particularly for frequently used commands.


With `kubectl` you naturally use certain commands very frequently (for example, `kubectl get pods`). So, it would be nice to define aliases for these commands, right? You would just need to figure out which commands you use most frequently, choose an alias name for each one, and then define the aliases in your `~/.bashrc` or `~/.zshrc` file (for example, as `alias kgpo='kubectl get pods'`).

> In the following, the notation `~/*rc` is used to refer to either `~/.bashrc` or `~/.zshrc`.

But there's a better solution. There's a project called [*kubectl-aliases*](https://github.com/ahmetb/kubectl-aliases) which defines **800 aliases** for frequently used `kubectl` commands. You can just include these alias definitions in your `~/*rc` file and start using them immediately.

> All aliases in *kubectl-aliases* work with both, Bash and Zsh.

To install the project, just download the `.kubectl_aliases` file from the  GitHub repository [here](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba), and source it in your `~/*rc` file:

~~~bash
source ~/.kubectl_aliases
~~~

You might wonder how you could possibly remember 800 aliases? Well, actually you don't need to. The aliases of *kubectl-aliases* are all auto-generated according to a simple scheme, which is shown in the following figure (taken from a [blog post](https://ahmet.im/blog/kubectl-aliases/) of the maker of the project):

![](kubectl-aliases.png)

All aliases start with `k`, and then you can append components from left to right, according to the above figure (the `sys` component is optional). Here are some example aliases and the commands that they stand for:

- `k` &#10230; `kubectl`
- `kg` &#10230; `kubectl get`
- `kgpo` &#10230; `kubectl get pods`
- `kgpooyaml` &#10230; `kubectl get pods -o yaml`

And so on, for all the possible combinations. So, if you want to list all pods, you can just type `kgpo`. If you want to get a specific pod, you can type `kgpo <pod>` (where `<pod>` is the name of the pod you want to retrieve). If you want to get the YAML specification of a specific pod, you can type `kgpooyaml <pod>`.

Nothing prevents you from using these aliases only as parts of your commands. For example, you can use `k` at any place where you would type `kubectl` otherwise. This means, you can type `k api-resources` (since there's no alias for this command as a whole). Or you can type `kg roles` (since there are no aliases defined for *role* resources). Just look at the command an alias stands for, and you can append further arguments to the alias at will. This allows you to minimise typing even fore use cases that are not explicitly covered by *kubectl-aliases*.

If you use Zsh, it comes even better. The `kubectl` command completion works with the aliases too. That means, you can type, for example, `kgpo [tab][tab]` and Zsh will complete the available pod names for you. Like this, you can combine two typing reduction mechanisms (aliases and completion) to an "ultra typing reduction" workflow.

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

Just make sure this comes *after* the command for sourcing the *bash-completion* file.

Now, to enable completion for all the aliases of *kubectl-aliases*, you have to execute a command like `complete -F _complete_alias <alias>` for every alias of *kubectl-aliases*. You can do this by adding the following snippet to your `~/.bashrc` file (where `~/.kubectl_aliases` is the location of your *kubectl-aliases* file):

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

## Plugins

