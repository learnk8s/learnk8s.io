There are many ways to create a Kubernetes cluster — from low-level cluster installation tools like [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) to full-blown managed Kubernetes services like [GKE](https://cloud.google.com/kubernetes-engine), [EKS](https://aws.amazon.com/eks/), or [AKS](https://docs.microsoft.com/azure/aks/).

Generally, the available tools pose a trade-off between automation and flexibility:

- One one end of the spectrum are managed Kubernetes services which make creating a cluster extremely easy, but come preconfigured with many settings that you can't modify
- On the other end of the spectrum is a [bare-bones cluster installation](https://github.com/kelseyhightower/kubernetes-the-hard-way) which allows you to control every single detail of your cluster setup, but requires many manual steps and processes

What if you wanted both automation _and_ flexibility?

## 

The ways to create a Kubernetes cluster can be divided into two categories: managed services and installation tools.

### Managed services

Managed Kubernetes services create and operate a cluster for you and give you access to it.

_They allow you to use Kubernetes in a Software as a Service (SaaS) manner._

Naturally, managed Kubernetes services provide the highest degree of automation (creation and operation is entirely done for you), but the least amount of flexibiltiy (you can configure only those settings that the service provider exposes through its API).

The most popular managed Kubernetes services are provided by the major cloud providers:

- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks/)

### Installation tools

Kubernetes installation tools allow you to install Kubernetes on your own infrastructure (be it on premises or in the cloud).

_They allow you to use Kubernetes as a traditional self-managed piece of software._

Installation tools provide varying degrees of automation and flexibility depending on the extent to which the tool wants to "get it right for you".

Currently, the most popular (and officially supported) installation tools are:

- [kops](https://kops.sigs.k8s.io/)
- [kubespray](https://kubespray.io/)
- [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)

Let's briefly look at each of them.

### kops

Of all presented tools, **kops** provides the highest degree of automation and least amount of flexibility.

What's special about kops is that it does not only install Kubernetes, but it also provisions the cloud infrastructure on which the cluster will run (currently, AWS and GCP are supported).

That means, you can go from zero to a running cluster without needing to have any infrastructure to start with.

On the other hand, kops is opiniated and depends on external services — for example, it requires you to use a valid DNS name for your cluster and create DNS records that resolve it, as well as creating an Amazon S3 bucket for kops to store its state.

### kubespray

kubespray is a collection of [Ansible](https://www.ansible.com/) playbooks that automate the installation of Kubernetes on an existing infrastructure.

That means, in contrast to kops, you need to have a suitable infrastructure (on premises or in the cloud) before you can use kubespray.

kubespray provides an abundance of configuration options allowing you to customise your cluster in many ways.

However, kubespray also attempts to create a "production-ready" cluster, which causes it to set a certain amount of default options for you.

In this regard, kubespray can still be seen as somewhat opiniated (if less than kops).

### kubeadm

Of all presented installation tools, kubeadm is the most unopiniated and low-level one (in fact, kubesrpay uses kubeadm under the hood).

kubeadm is an executable that is run directly on the infrastructure on which you want to install Kubernetes.

In contrast to the other presented installation tools, kubeadm does not assume anything about the purpose of your cluster (such that it should be "production-ready") — that means, kubeadm is less likely to configure any default settings that might actually interfere with your real purpose of the cluster.

Furthermore, kubeadm allows you configure almost every aspect of the Kubernetes cluster.

For example, you can directly specify custom command-line flags for the individual Kubernetes components (API server, scheduler, controller manager, etc.) with a [kubeadm configuration file](https://pkg.go.dev/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2).

_The flipside of the coin is that [creating a cluster with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) is by no means a single-command operation._

First of all, you need to log in to every node that should be part of your cluster and install kubeadm on it.

Then you need to run a specific command on each node: [`kubeadm init`](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/) on the first master node and [`kubeadm join`](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-join/) on every worker node as well as on any additional master nodes.

These commands further depend on each other — all the `kubeadm join` commands must include a token that is generated by the initial `kubeadm init` command — you can imagine that doing this manually results in a lot of SSHing and copy-pasting.

_In summary, kubeadm provides the optimal flexibility for configuring the cluster, but using it, involves a lot of manual labour._

## A Terraform module for bootstrapping clusters with kubeam

Learnk8s has been working on a solution to maintain the benefits of kubeadm while reducing its drawbacks.

The result is the [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws).

![Terraform kubeadm module](assets/terraform-kubeadm-module.png)

The Terraform kubeadm module is a [Terraform module](https://www.terraform.io/docs/modules/index.html) that automates both the provisioning of cloud infrastructure as well as the operation of kubeadm to install Kubernetes on this infrastructure.

With the Terraform kubeadm module, you can go from zero to a running cluster with a single command in a few minutes (similar to kops), while at the same time not having to give in to an opiniated cluster design, and any default settings and features.

> Currently, the Terraform kubeadm module exists only for AWS, but support for GCP and Azure is planned.

In the following, the article will 

## What is Terraform?

[Terraform](https://www.terraform.io/) is an open-source Infrastructure as Code (IaC) tool.

It allows to declaratively define a set of infrastructure resources (e.g. compute instances, networks, application configurations) and then turn this configuration into reality by talking to the APIs of the corresponding infrastructure services (e.g. AWS, GCP, Cloudflare, GitHub).

The power and versatility of Terraform comes from [Terraform providers](https://www.terraform.io/docs/providers/index.html).

Providers are plugin-style components that, on one hand, encapsulate the interaction with the API of a specific service, and, on the other hand, expose the resources that can be managed through this service as [Terraform resources](https://www.terraform.io/docs/configuration/resources.html).

For example, there exists a [Terraform provider for AWS](https://www.terraform.io/docs/providers/aws/index.html), and this provider exposes a resource named [`aws_instance`](https://www.terraform.io/docs/providers/aws/r/instance.html).

The `aws_instance` resource corresponds to an [Amazon EC2 instance](https://aws.amazon.com/ec2/).

If you declare an `aws_instance` resource in your Terraform code, Terraform will create an EC2 instance in your AWS account — by autonomously talking to the [AWS EC2 API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Welcome.html).

Moreover, if you change the definition of your `aws_instance` resource (such as adding a new security group), Terraform will automatically apply this change to the real-world EC2 instance too.

_There exist over a hundred [officially supported Terraform providers](https://www.terraform.io/docs/providers/index.html) and many more [provided by the community](https://www.terraform.io/docs/providers/type/community-index.html) — thus, you can use Terraform for a multitude of purposes!_

A set of Terraform code that describes a related set of infrastrucute is called a [Terraform configuration](https://www.terraform.io/docs/configuration/index.html).

Terraform configurations can be organised as [Terraform modules](https://www.terraform.io/docs/modules/index.html) that can be reused and shared on the [Terraform Registry](https://registry.terraform.io/).

The [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws) is exactly that — a Terraform configuration that describes the infrastructure for a Kubernetes cluster as well as the installation of Kubernetes on this infrastructure with kubeadm.

Invoking the module with Terraform will bring the desired cluster to life in a few minutes.

The following sections first describe the prerequisites for using the Terraform module and then finally show you how you can use it to create a cluster.

## Prerequisites for using the module

### Installing Terraform

To use the Terraform kubeadm module, first of all, you have to install Terraform.

Terraform is distributed as a single statically linked and precompiled binary (written in Go).

To install Terraform, you simply have to download the correct binary for your platform and move it to any directory in your `PATH`.

The [Terraform website](https://www.terraform.io/downloads.html) contains the binaries for the various supported platform of the latest version of Terraform.

All you have to do is downloading the corresponding package, unzip it, and move the contained binary to any directory in your `PATH` (e.g. `/usr/bin`).

If you're on macOS, you can alternativel install Terraform with:

```terminal|command=1|title=bash
brew install terraform
```

Once you have installed Terraform, you can verify the installation with:

```terminal|command=1|title=bash
terraform version
```

> Please make sure that you have at least Terraform v0.12 as the module is not compatible with lower versions.

### Configuring AWS credentials

To create a Kubernetes cluster on AWS, first of all, you need an [AWS account](https://aws.amazon.com/).

On AWS, a set of credentials consisting of an [Access Key ID and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) is used to authenticate access to an account and Terraform needs to have access to them in order to create AWS resources on your behalf.

> You can find out your Access Key ID and Secret Access Key in the [AWS IAM Console](https://console.aws.amazon.com/iam/home).

_There are two ways in which you can make your Access Key ID an Secret Access Key available to Terraform._

First, you can save these credentials in a file named `~/.aws/credentials`, which is done automatically when you initialise the [AWS CLI](https://aws.amazon.com/cli/).

To do so, you have to [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) (if you haven't already) and run the following command:

```terminal|command=1|title=bash
aws configure
```

Second, you can directly save your Access Key ID and Secret Access Key in the following environment variables:

```terminal|command=1,2|title=bash
export AWS_ACCESS_KEY_ID=AccessKeyID
export AWS_SECRET_ACCESS_KEY=SecretAccessKey
```

> If you use this approach, you have to set the environment variables in every terminal window in which you run Terraform.

_You're now ready to bootstrap a cluster on AWS with the Terrafrom kubeadm module._

## Using the module

Start by creating a new directory for your Terraform configuration:

```terminal|command=1,2|title=bash
mkdir terraform-kubeadm
cd terraform-kubeadm
```

Then, create a file named `main.tf` with the following content:

```hcl|title=main.tf
provider "aws" {
  region = "eu-central-1"
}

module "cluster" {
  source           = "weibeld/kubeadm/aws"
  version          = "~> 0.2"
}
```

> You can replace `eu-central-1` with any other [AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) you prefer.

The above code is all the configuration you need to write to bootstrap a minimal Kubernetes cluster with default values.

The next step is to initialise Terraform in your current working directory:

```terminal|command=1|title=bash
terraform init
```

This downloads the Terraform module as well as the necessary Terraform providers to your local machine.

Now, you can apply the configuration:

```terminal|command=1|title=bash
terraform apply
```

This command shows you a list of Terraform resources that Terraform will create and then prompt for an input.

You can look at this as Terraform telling you what it's going to do and asking you if you want to proceed or not.

You want to go ahead, so confirm the prompt with "Yes":

```
yes
```

At this point, you can lean back and wait for Terraform to create your cluster.

_It shouldn't take longer than 3-4 minutes._

When the command completes, you should find a file with a random name and a `.conf` extension in your current working directory (such as `real-hedgehog.conf`):

```terminal|command=1|title=bash
ls *.conf
```

This is the [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file for your newly created cluster.

You can use it right away to access your cluster with kubectl:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
```

> Please replace `real-hedgehog.conf` with the real name of your kubeconfig file.

The output should be the list of currently existing Pods in your cluster

_Congratulations — your cluster is up and running!_

However, note that the `coredns` Pods are `Pending`:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   coredns-66bff467f8-j2mmc         0/1     Pending   0          4m2s
kube-system   coredns-66bff467f8-n265d         0/1     Pending   0          4m2s
```

And if you list the nodes of your cluster, they should be `NotReady`:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get nodes
NAME       STATUS     ROLES    AGE     VERSION
master     NotReady   master   8m57s   v1.18.2
worker-0   NotReady   <none>   8m41s   v1.18.2
worker-1   NotReady   <none>   8m41s   v1.18.2
```

_This is the expected behaviour and doesn't mean that there's anything broken._

The reason for this is that there is currently no [CNI plugin](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) installed in your cluster.

This stems from the mentioned unopiniated nature of kubeadm — kubeadm doesn't install a CNI plugin by default but it leaves this choice entirely to the user.

This allows you to install any CNI plugin (in any configuration and with any installation method) you want.

_You could do so right now, but before installing a CNI plugin, let's explore the cluster a bit more._

### Connecting to a node

Terraform allows to show [outputs](https://www.terraform.io/docs/configuration/outputs.html) to allow conveying information about the internal state of the infrastructure to the user.

Let's use an output to find out the public IP addresses of your cluster nodes so that you can connect to them.

Modify your Terraform configuration to look as follows:

```hcl|highlight=10-12|title=main.tf
provider "aws" {
  region = "eu-central-1"
}

module "cluster" {
  source  = "weibeld/kubeadm/aws"
  version = "~> 0.2"
}

output "nodes" {
  value = module.cluster.cluster_nodes
}
```

The above code defines an output named `nodes` which reuses an output of the Terraform module named `cluster_nodes`.

This output includes some information about all the nodes of the cluster.

> You can see all available outputs of the Terraform kubeadm module on its [Terraform Registry page](https://registry.terraform.io/modules/weibeld/kubeadm/aws?tab=outputs).

With the above change, run `terraform apply` again:

```terminal|command=1|title=bash
terraform apply --auto-approve
```

> The `--auto-approve` flag automatically assumes `yes` for the prompt, so you don't need to type it explicitly.

The above command doesn't change any resources, but it populates the output value with the current information so that you can see it.

Indeed, the command should output something like this:

```
nodes = [
  {
    "name" = "master"
    "private_ip" = "172.31.43.251"
    "public_ip" = "3.127.72.79"
    "subnet_id" = "subnet-a95feed4"
  },
  {
    "name" = "worker-0"
    "private_ip" = "172.31.41.249"
    "public_ip" = "3.127.39.172"
    "subnet_id" = "subnet-a95feed4"
  },
  {
    "name" = "worker-1"
    "private_ip" = "172.31.32.223"
    "public_ip" = "18.197.147.253"
    "subnet_id" = "subnet-a95feed4"
  },
]
```

As you can see, the output includes the public IP address of each node.

Remember the `~/.ssh/id_rsa` key that you ensured in the prerequisites? This key allows you to SSH into any of your nodes.

For example, you can log in to the master node as follows:

```terminal|command=1|title=bash
ssh -i ~/.ssh/id_rsa ubuntu@3.127.72.79
```

> Please replace `3.127.72.79` with the actual public IP address of your master node.

You should now be logged into the master node, which allows you to inspect your cluster in more detail, such as listing the currently running containers:

```terminal|command=1|title=bash
sudo docker ps
```

But for now, let's go back to the local machine:

```terminal|command=1|title=bash
exit
```

The Terraform kubeadm module allows you to level-up your cluster even more.

### Using a dedicated VPC

By default, the Terraform kubeadm module creates the cluster in the [default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html) of your selected AWS region (in one of its default subnets).

That means, the cluster coexists with other AWS resources that you might have in this VPC.

This is usually not a problem, but in general it's a good practice to separate resources that belong to unrelated applications into different VPCs.

The Terraform kubeadm module has you covered here as well as it allows you to create a dedicated VPC for your cluster.

To do so, edit your Terraform configuration to look like this:

```hcl|highlight=5-8,13-14|title=main.tf
provider "aws" {
  region = "eu-central-1"
}

module "network" {
  source  = "weibeld/kubeadm/aws//modules/network"
  version = "~> 0.2"
}

module "cluster" {
  source    = "weibeld/kubeadm/aws"
  version   = "~> 0.2"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_id
}

output "nodes" {
  value = module.cluster.cluster_nodes
}
```

The above code invokes an additional module labelled `network`.

This module is actually a submodule of the kubeadm module and it allows you to create a suitable dedicated VPC with a single subnet in which you can then create your cluster with the kubeadm module.

For applying this udpated configuration, you must first arrange for the network submodule to be downloaded:

```terminal|command=1|title=bash
terraform init
```

You can then run the configuration as you did before:

```terminal|command=1|title=bash
terraform apply
```

Note that you didn't need to first delete the old infrastructure before applying the updated configuration.

Terraform figures out itself which resources must be destroyed and recreated, which can be updated in place, and which can be left unchanged.

If you look at the execution plan that Terraform presents you, you can see that the `aws_instance` resources get destroyed and recreated (in the new VPC), which  means that you get essentially an entirely new cluster.

> Any applications that are running in your existing cluster would now be destroyed.

Confirm the Terraform prompt with `yes` and wait for the command to complete.

When the command completes, you should see the output with the node details again (the IP addressed changed since the nodes have been recreated).

The kubeconfig file in your current working directory has been updated as well and you can use it to access your new cluster:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
```

_Congratulations — you just created a new cluster in its own VPC!_

### Creating multiple clusters

What if you wanted to have not just one cluster but many of them?

Imagine you want to run a series of experiments, such as testing different configurations of a CNI plugin — it would be great to create and manage multiple clusters in one sweep.

The Terraform kubeadm module has you covered here as well.

Just edit your Terraform configuration file to look like this:

```hcl|highlight=13-25,28-32|title=main.tf
module "network" {
  source  = "weibeld/kubeadm/aws//modules/network"
  version = "~> 0.2"
}

module "cluster" {
  source    = "weibeld/kubeadm/aws"
  version   = "~> 0.2"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_id
}

module "cluster_2" {
  source    = "weibeld/kubeadm/aws"
  version   = "~> 0.2"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_id
}

module "cluster_3" {
  source    = "weibeld/kubeadm/aws"
  version   = "~> 0.2"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_id
}

output "nodes" {
  value = {
    (module.cluster.cluster_name)   = module.cluster.cluster_nodes
    (module.cluster_2.cluster_name) = module.cluster_2.cluster_nodes
    (module.cluster_3.cluster_name) = module.cluster_3.cluster_nodes
  }
}
```

As you can see, the above code adds two more kubeadm module blocks to the configuration.

This results in the creation of two addtional clusters leaving you with three clusters in total.

> Note that these additional clusters will be created in the same VPC as the initial cluster. However, if you wanted, you could create a dedicated VPC for each cluster by also repeating the network module block.

Since you added additional module blocks, you need to run `terraform init` again:

```terminal|command=1|title=bash
terraform init
```

Now, you can run your updated configuration as usual:

```terminal|command=1|title=bash
terraform apply
```

The execution plan that Terraform shows you should include the creation of two additional clusters (and the existing one is left unchaged).

Confirm the prompt with `yes` to start the update.

When the command completes, you should see a longer output that now includes the node details of all three clusters.

And you should now have a total of three kubeconfig files in your working directory:

```terminal|command=1|title=bash
ls *.conf
growing-cattle.conf
obliging-eft.conf
real-hedgehog.conf
```

You can access your three clusters with these kubeconfig files right away:

```terminal|command=1,2,3|title=bash
kubectl get nodes --kubeconfig growing-cattle.conf
kubectl get nodes --kubeconfig obliging-eft.conf
kubectl get nodes --kubeconfig real-hedgehog.conf
```

> Please replace the names of the kubeconfig files with the random names used in your setup.

### Installing CNI plugin

Having three freshly bootstrapped Kubernetes clusters, let's do something interesting with them.

As mentioned, clusters created with kubeadm don't have a CNI plugin installed by default — but you can change that!

Three of the most popular CNI plugins are [Calico](https://www.projectcalico.org/), [Weave Net](https://www.weave.works/docs/net/latest/overview/), and [Cilium](https://cilium.io/), so let's install each of them on one of the clusters.

Let's install Calico on the first cluster:

```terminal|command=1|title=bash
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml --kubeconfig growing-cattle.conf 
```

> You can find the command for installing Calico in the [Calico docs](https://docs.projectcalico.org/getting-started/kubernetes/quickstart).

Next, let's install Weave Net on the second cluster:

```terminal|command=1|title=bash
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')" --kubeconfig obliging-eft.conf 
```

> You can find the command for installing Weave Net in the [Weave Net docs](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/).

Finally, let's install Cilium on the third cluster:

```terminal|command=1|title=bash
kubectl create -f https://raw.githubusercontent.com/cilium/cilium/1.7.0/install/kubernetes/quick-install.yaml --kubeconfig real-hedgehog.conf 
```

> You can find the command for installing Cilium in the [Cilium docs](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/).

Give the CNI plugins some time to initialise, then check the nodes of your clusters again:

```terminal|command=1,2,3|title=bash
kubectl get nodes --kubeconfig growing-cattle.conf
kubectl get nodes --kubeconfig obliging-eft.conf
kubectl get nodes --kubeconfig real-hedgehog.conf
```

All the nodes should be `Ready` now!

You can also check the Pods:

```terminal|command=1,2,3|title=bash
kubectl get pods -n kube-system --kubeconfig growing-cattle.conf
kubectl get pods -n kube-system --kubeconfig obliging-eft.conf
kubectl get pods -n kube-system --kubeconfig real-hedgehog.conf
```

All Pods should be `Running` — that means, your clusters are fully functional now!

_You just performed an experiment of testing three CNI plugins on freshly bootstrapped clusters._

### Destroying the clusters

When you're done using the clusters, they should be deleted, because some of the AWS resources they're composed of cost money.

Again, Terraform makes this very easy.

All you have to do to clean up all created resources is to run the following command:

```terminal|command=1|title=bash
terraform destroy
```

This command also asks you for confirmation, which you can answer with `yes`.

Terraform now deletes _all_ the created AWS resources and leaves your AWS account in exactly the state it was before you ran `terraform apply` for the first time.

## Where to go from here?


