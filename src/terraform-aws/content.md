There are many ways to create a Kubernetes cluster — from simple cluster installation tools like [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) to full-blown managed Kubernetes services like [GKE](https://cloud.google.com/kubernetes-engine), [EKS](https://aws.amazon.com/eks/), or [AKS](https://docs.microsoft.com/azure/aks/).

Generally, the available options pose a trade-off between automation and flexibility:

- On one hand, you could use a managed Kubernetes service which makes creating a cluster extremely easy; but the cluster will likely have many preconfigured settings that you can't modify
- On the other hand, you could install Kubernetes manually [without any scripts and tools](https://github.com/kelseyhightower/kubernetes-the-hard-way) which allows you to configure every single detail of the cluster; but this requires many manual and error-prone steps

_Often, what you want is a middle ground between these two extremes._

Such as creating a bare-bones unopinionated cluster in a simple way — preferably with a single command.

This is especially true if you want to experiment with specific Kubernetes settings and features, like, for example, testing [CNI plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/).

In such cases, using one of the available automated cluster creation methods (such as a managed Kubernetes service) might not be an option because it doesn't allow you to configure the settings that you need.

_This article presents an approach that attempts to combine both automation and flexibility._

It's a [Terraform module](https://registry.terraform.io/modules/weibeld/kubeadm/aws) based on [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) that allows creating bare-bones clusters on AWS with a single command:

![Screencast](assets/screencast.gif)

You can find the code [on GitHub](https://github.com/weibeld/terraform-aws-kubeadm).

The aim of the project is to enable the creation of disposable kubeadm clusters which is an enabler for running controlled and automated Kubernetes experiments.

_The remainder of this article first reviews the available options for creating Kubernetes clusters and then presents the Terraform module._

## Managed Kubernetes services

The options for creating a Kubernetes cluster can be divided into two categories: managed services and installation tools.

Managed Kubernetes services create and operate a cluster for you and give you access to it.

_They allow you to use Kubernetes in a Software as a Service (SaaS) manner._

Managed Kubernetes services provide the highest degree of automation (creation and operation are entirely done for you), but the least amount of flexibility (you can configure only those settings that the service provider exposes through its API).

The most popular managed Kubernetes services are provided by the major cloud providers:

- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) by GCP
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) by AWS
- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks/) by Azure

## Kubernetes installation tools

Kubernetes installation tools allow you to install Kubernetes on your own infrastructure (both on-premises or in the cloud).

_They allow you to use Kubernetes as a self-managed piece of software._

Installation tools provide varying degrees of automation and flexibility depending on the extent to which the tool wants to "get it right for you".

At the time of writing, the most popular (and officially supported) Kubernetes installation tools are:

- [kops](https://kops.sigs.k8s.io/)
- [kubespray](https://kubespray.io/)
- [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)

Let's briefly look at each of them.

### kops

Of the three presented tools, [kops](https://kops.sigs.k8s.io/) provides the highest degree of automation, but it's also the most opinionated one.

What's special about kops is that it does not only install Kubernetes, but it also provisions the cloud infrastructure on which the cluster will run (currently, AWS and GCP are supported).

That means, you can go from zero to a running cluster with effectively a single command.

On the other hand, kops anticipates many decisions for you, thus reducing your flexibility for how you want your cluster to look like.

For example, kops requires the name of the cluster to be a valid DNS name and asks you to set up DNS records that resolve this name.

Also, you have to create an [Amazon S3 bucket](https://aws.amazon.com/s3/) for kops to store its state.

### kubespray

[kubespray](https://kubespray.io/) is a collection of [Ansible](https://www.ansible.com/) playbooks that automate the installation of Kubernetes on existing infrastructure.

That means, in contrast to kops, you need to already have a suitable infrastructure (either on-premises or in the cloud) before you can use kubespray.

Once you have your infrastructure, kubespray provides a large number of options for configuring the Kubernetes installation.

Not all options are configurable, though — kubespray attempts to create a "production-ready" cluster, which causes it to apply certain default settings and features (such as installing a CNI plugin by default).

This is great if you really want a production-ready cluster, but if all you want is a "bare-bones" cluster that you can then configure very selectively, the well-intentioned defaults of kubespray might get in your way.

### kubeadm

[kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) is the most basic and low-level one of the three presented cluster installation tools (in fact, kubespray uses kubeadm under the hood).

Consequently, kubeadm provides the lowest degree of automation but the highest degree of flexibility.

kubeadm is an executable that is run directly on the infrastructure on which the cluster is to be installed.

In contrast to the other presented installation tools, kubeadm does not make any strong assumptions about the purpose of the cluster, such that it should be production-ready, or highly available.

In particular, kubeadm performs the following tasks:

- Creating and distributing client and server certificates for the individual Kubernetes components (API server, etcd, scheduler, etc.)
- Creating and distributing kubeconfig files for the individual Kubernetes components (so that they can talk to the API server)
- Launching the kubelet as a [systemd](https://systemd.io/) process
- Launching the remaining Kubernetes components as Pods in the [host network](https://github.com/kubernetes/api/blob/master/core/v1/types.go#L2938) through the kubelet

The result is a "minimum viable" cluster that you can then freely customise yourself according to your requirements.

Moreover, kubeadm allows fine control over the individual cluster settings — for example, you can directly define command-line arguments for the individual Kubernetes components with a [kubeadm configuration file](https://pkg.go.dev/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2).

_In short, kubeadm is an optimal solution if you want maximum control over the cluster creation process._

However, the flip side is that creating a cluster with kubeadm is by no means done with a single command (as it's the case for kops and kubespray).

Rather, it requires a whole series of manual steps:

- Provision the infrastructure on which you want to create the cluster
- Log in to every node and install kubeadm and Docker on it
- Run the [`kubeadm init`](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/) command on one of the nodes
- Run the [`kubeadm join`](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-join/) command on all the other nodes

Furthermore, these steps depend on each other — for example, the `kubeadm join` commands must include a token and other identifiers that are generated by the initial `kubeadm init` command.

In summary, creating a Kubernetes cluster with kubeadm is a time-consuming tedious process when done manually.

_This is where the Terraform kubeadm module comes in._

## Terraform kubeadm module

The [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws) automates the operation of kubeadm with the goal of providing both automation and flexibility.

![Terraform kubeadm module](assets/terraform-kubeadm-module.png)

However, the module does not only run kubeadm, but it also provisions the infrastructure for the cluster.

> Currently, only AWS is supported as an infrastructure provider, but support for GCP and Azure is planned.

That means, with the Terraform kubeadm module, you can go from zero to a running cluster on AWS with a single command in a few minutes.

This brings you the convenience of kops without having to deal with opinionated features that you might not need.

With the Terraform kubeadm module, you get the exact same "minimum viable" cluster that you also get when running kubeadm manually.

_The following sections first briefly present Terraform and then give a full usage walkthrough of the Terraform kubeadm module._

## What is Terraform?

[Terraform](https://www.terraform.io/) is an open-source Infrastructure as Code (IaC) tool created by Hashicorp.

It allows declaratively describing a set of infrastructure (e.g. compute instances, networks) of different services (e.g. AWS, GCP, Cloudflare) as code and then automatically turning this description into reality.

Terraform code is written in the [Hashicorp Configuration Language (HCL)](https://www.terraform.io/docs/configuration/index.html) and a related set of Terraform code files is called a _Terraform configuration_.

To turn a Terraform configuration into reality, Terraform talks to the APIs of the corresponding services (e.g. AWS, GCP, Cloudflare).

The power and versatility of Terraform comes from the [Terraform providers](https://www.terraform.io/docs/providers/index.html).

Terraform providers are plugin-style components that encapsulate the interaction with the API of a specific service (e.g. AWS, GCP, Cloudflare) and expose the resources that can be managed through this service as [Terraform resources](https://www.terraform.io/docs/configuration/resources.html).

Terraform resources are the basic building blocks of a Terraform configuration.

For example, there exists a [Terraform provider for AWS](https://www.terraform.io/docs/providers/aws/index.html), and this provider defines a Terraform resource named [`aws_instance`](https://www.terraform.io/docs/providers/aws/r/instance.html) which corresponds to an [Amazon EC2 instance](https://aws.amazon.com/ec2/).

When you define an `aws_instance` Terraform resource in your Terraform configuration, Terraform will create an EC2 instance for you.

Furthermore, when you change the definition of the `aws_instance` resource in your configuration, Terraform will apply the corresponding changes to the real EC2 instance in your AWS account.

**There exist over a hundred [officially supported Terraform providers](https://www.terraform.io/docs/providers/index.html) and many more [provided by the community](https://www.terraform.io/docs/providers/type/community-index.html).**

A Terraform configuration can be organised as a [Terraform module](https://www.terraform.io/docs/modules/index.html).

A Terraform module encapsulates a piece of Terraform configuration so that it can be reused and shared.

The [Terraform Registry](https://registry.terraform.io/) is the primary place where Terraform modules are hosted and shared — you can browse hundreds of freely available Terraform modules there.

The [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws) is also freely available on the Terraform Registry, and the following sections explain how to use it.

_The next section describes the prerequisites for using the module._ 

## Prerequisites

### 1. Install Terraform

To use Terraform on your machine, you first have to install it.

> If you already have Terraform installed, make sure you have at least Terraform v0.12 since this is the minimum version required by the module.

Terraform is distributed as a statically linked, precompiled binary (written in Go) and to install it, you simply have to download it and move it to any directory in your `PATH`.

The [Terraform website](https://www.terraform.io/downloads.html) contains the latest versions of the Terraform binaries for all supported target platforms:

![Install Terraform](assets/terraform-download.png)

Download the package corresponding to your platform, unzip it, and move the contained binary to some directory in your `PATH`, such as `/usr/bin`.

On macOS, you can alternatively install Terraform with:

```terminal|command=1|title=bash
brew install terraform
```

Once Terraform is installed, you can verify the installation with:

```terminal|command=1|title=bash
terraform version
```

> Please make sure that you have at least version 0.12 since this is the minimum version required by the Terraform kubeadm module.

### 2. Configure AWS credentials

First of all, you need an [AWS account](https://aws.amazon.com/).

Since the Terraform kubeadm module will create AWS resources on your behalf, it needs to have access to the [Access Key ID and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) of an [IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) in your AWS account.

If you're already using the [AWS CLI](https://aws.amazon.com/cli/) and have an `~/.aws/credentials` file on your machine, then you should be good to go.

In all other cases, you can set the following environment variables:

```terminal|command=1,2|title=bash
export AWS_ACCESS_KEY_ID=<AccessKeyID>
export AWS_SECRET_ACCESS_KEY=<SecretAccessKey>
```

You can find out the Access Key ID and Secret Access Key of all the IAM users in your AWS account in the [AWS IAM Console](https://console.aws.amazon.com/iam/home) 

> In the AWS IAM Console, you can also generate a new Access Key ID and Secret Access Key for any IAM user if you can't retrieve the existing one.

If you're using an IAM user with limited permissions, make sure that it has at least the following [IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) attached:

- `AmazonEC2FullAccess`
- `AmazonVPCFullAccess`

### 3. Ensure default OpenSSH keys

The Terraform kubeadm module will set up SSH access to the nodes of the cluster by using the default key pair of OpenSSH:

- `~/.ssh/id_rsa` (private key)
- `~/.ssh/id_rsa.pub` (public key)

If you currently don't have these files on your local machine, you can generate them with the following command:

```terminal|command=1|title=bash
ssh-keygen
```

_You're now ready to use the Terraform kubeadm module!_

## Creating a minimal cluster

In the following, you will create a minimal cluster consisting of a single master node and two worker nodes on AWS.

Start by creating a new directory:

```terminal|command=1,2|title=bash
mkdir terraform-kubeadm
cd terraform-kubeadm
```

And in this directory, create a file named `main.tf` with the following content:

```hcl|title=main.tf
provider "aws" {
  region = "eu-central-1"
}

module "cluster" {
  source  = "weibeld/kubeadm/aws"
  version = "~> 0.2"
}
```

> Note that `eu-central-1` is the [AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) in which the cluster will be created. You can replace this with any other region you like.

The above is a Terraform configuration that invokes the [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws).

_That's all the code you have to write to create a minimal Kubernetes cluster._

But before you can do so, you have to initialise Terraform in your current working directory as follows:

```terminal|command=1|title=bash
terraform init
```

The [`terraform init`](https://www.terraform.io/docs/commands/init.html) downloads both the AWS provider and the Terraform kubeadm module to a subdirectory named `.terraform` in your current working directory.

Now you can start the process of turning your configuration into reality:

```terminal|command=1|title=bash
terraform apply
```

The [`terraform apply`](https://www.terraform.io/docs/commands/apply.html) command first shows you a so-called [execution plan](https://www.terraform.io/docs/commands/plan.html) which is a summary of resources that Terraform will create, modify, or delete.

In your case, since you're starting from zero, there should be only resources to create.

The command prompts you if you want to proceed, which you can confirm by typing `yes`:

```
yes
```

Terraform now turns the execution plan into reality by creating the necessary AWS resources in your AWS account.

You can lean back and wait for Terraform to create your cluster!

_It shouldn't take longer than 3-4 minutes._

When the command completes, your cluster should be up and running!

In your current working directory, you should now have a file with a random pet name (e.g. `real-hedgehog`) and a `.conf` extension:

```terminal|command=1|title=bash
ls *.conf
real-hedgehog.conf
```

This is the [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file for connecting to your newly created cluster.

You can use it to access your cluster right away as follows:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
```

> Please replace `real-hedgehog.conf` with the name of your kubeconfig file.

You should see the system Pods of your cluster.

_Congratulations, you just created your first cluster!_

> You can see the EC2 instances (and other resources) that Terraform created in your AWS account in the [AWS EC2 Console](https://console.aws.amazon.com/ec2/v2/home).

_So, looks like you have a running cluster, right?_

However, if you inspect the above output a bit closer, you should see that the `coredns` Pods are `Pending`:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   coredns-66bff467f8-j2mmc         0/1     Pending   0          4m2s
kube-system   coredns-66bff467f8-n265d         0/1     Pending   0          4m2s
```

And if the nodes of the cluster should be `NotReady`:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get nodes
NAME       STATUS     ROLES    AGE     VERSION
master     NotReady   master   8m57s   v1.18.2
worker-0   NotReady   <none>   8m41s   v1.18.2
worker-1   NotReady   <none>   8m41s   v1.18.2
```

_Don't worry!_

This doesn't mean that there's something wrong, it's the expected behaviour!

The reason is that your cluster doesn't yet have a [CNI plugin](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) installed — this keeps the nodes in the `NotReady` state and prevents any Pods in the Pod network from being scheduled.

> In case you wonder why the other Pods are all `Running`: that's because these Pods run in the [host network](https://github.com/kubernetes/api/blob/master/core/v1/types.go#L2938) (i.e. they have `.spec.hostNetwork` set to `true`) rather than in the Pod network, which doesn't depend on a CNI plugin.

The reason that your cluster has no CNI plugin installed is that kubeadm doesn't install a CNI plugin by default — rather it leaves this choice to the user.

The article will show how to install a CNI plugin in your cluster later.

_For now, let's first explore the cluster a bit more._

## Connecting to a node

In the following, you will SSH into one of the nodes of your cluster.

To do so, you need to know the public IP address of this node.

You could do so by going to the [AWS EC2 Console](https://console.aws.amazon.com/ec2/v2/home) and looking up the public IP address of the EC2 instance that corresponds to the node.

However, the Terraform kubeadm module provides an easier way to get this information.

The module features a collection of [output values](https://registry.terraform.io/modules/weibeld/kubeadm/aws?tab=outputs) that convey internal information about the cluster to the user.

One of these outputs is called `cluster_nodes` and it contains information about the individual nodes of the cluster, including their public IP addresses.

You can include this output in your Terraform configuration as follows:

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

To display this output, you have to run `terraform apply` again:

```terminal|command=1|title=bash
terraform apply --auto-approve
```

> The `--auto-approve` flag automatically approves the execution plan so that you don't need to type `yes`.

When the command completes, you should see an output looking something like this:

```hcl
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

As you can see, this contains some information about each node of the cluster, including its public IP address.

With this information, you can now SSH into any node of the cluster as follows:

```terminal|command=1|title=bash
ssh -i ~/.ssh/id_rsa ubuntu@<NODE-PUBLIC-IP>
```

> Note that `~/.ssh/id_rsa` is the default OpenSSH private key that is used by default by the Terraform kubeadm module to set up SSH access to the cluster nodes. It's the credential that allows you to connect to all the nodes of the cluster.

You should now be logged into the node, where you can do all kind of interesting things, such as listing the running containers:

```terminal|command=1|title=bash
sudo docker ps
```

But for now, just return to your local machine:

```terminal|command=1|title=bash
exit
```

_There's a way you can improve your cluster infrastructure!_

## Using a dedicated VPC

By default, the kubeadm module creates the cluster in the [default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html) of the specified AWS region.

That means, the cluster coexists with other AWS resources in this VPC.

Often, this is not a problem, but in general, it's a good idea to separate unrelated applications into separate VPCs.

The Terraform kubeadm module allows you to create a dedicated VPC for your cluster on-the-fly.

To do so, edit your Terraform configuration as follows:

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

The above configuration adds an invocation of the [network submodule](https://github.com/weibeld/terraform-aws-kubeadm/tree/master/modules/network).

The network submodule is distributed as part of the kubeadm module and it creates a VPC that is suitable for hosting a cluster created by the kubeadm module.

The configuration passes the IDs of the created VPC and its subnet to the `vpc_id` and `subnet_id` [input variables](https://registry.terraform.io/modules/weibeld/kubeadm/aws?tab=inputs) of the kubeadm module.

This causes the kubeadm module to create the cluster in the specified VPC and subnet, which means that your cluster will run this new dedicated VPC.

Since you added a new module invocation, you first need to run `terraform init` before you can apply the configuration:

```terminal|command=1|title=bash
terraform init
```

This downloads the network submodule to your local directory.

Now you can apply your new configuration:

```terminal|command=1|title=bash
terraform apply
```

Terraform now figures out how to get from the current state to the new specification and shows you the execution plan.

If you pay close attention to the execution plan, you can see that the `aws_instance` resources get destroyed and recreated — this means that Terraform will effectively destroy the existing cluster and create a new one in the new VPC.

To confirm the execution plan, type `yes`.

When the command completes, you should have both a new VPC and a new cluster running in it.

> You can see the VPC that Terraform created in the [AWS VPC Console](https.//console.aws.amazon.com/vpc/home).

Let's test if you can still access this new cluster:

```terminal|command=1|title=bash
kubectl --kubeconfig real-hedgehog.conf get pods --all-namespaces
```

_Bingo!_

You should see the list of system Pods just like before.

But now your cluster is running in its own VPC isolated from any other AWS resources!

## Multiple clusters

So far, you created only a single cluster, but what if you want multiple ones?

_For example, if you wanted to run a series of experiments on multiple clusters in parallel?_

In the following, you will extend your fleet of clusters to three clusters in total.

To do so, edit your configuration as follows:

```hcl|highlight=17-29,32-36|title=main.tf
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

The main change of the above configuration consists in the addition of two invocations of the kubeadm module.

The configuration now includes three invocations of the kubeadm module, which results in Terraform creating three clusters.

In the present configuration, all clusters use the same settings, but you could configure each cluster separately by specifying different [input variables](https://registry.terraform.io/modules/weibeld/kubeadm/aws?tab=inputs) for the individual invocations of the kubeadm module.

> You could also create a dedicated VPC for each cluster by adding additional invocations of the network submodule.

_If this configuration works, then, after applying it, you should have three running clusters._

Since you added additional module invocations, you first need to run `terraform init`:

```terminal|command=1|title=bash
terraform init
```

Now, you can apply the configuration with `terraform apply`:

```terminal|command=1|title=bash
terraform apply
```

If you pay attention to the execution plan that Terraform presents to you, you should see that it includes the creation of the resources belonging to two new clusters.

This means, that Terraform will create two new clusters while leaving the existing cluster unchanged — that's because you just added two new cluster specifications in your configuration, but didn't modify the existing one.

_After you confirm the prompt with `yes` and the command completes, there should now be three running clusters!_

You should now also have three kubeconfig files in your current working directory, one for each cluster:

```terminal|command=1|title=bash
ls *.conf
growing-cattle.conf
obliging-eft.conf
real-hedgehog.conf
```

Let's test if you can access each of the clusters:

```terminal|command=1,2,3|title=bash
kubectl get nodes --kubeconfig growing-cattle.conf
kubectl get nodes --kubeconfig obliging-eft.conf
kubectl get nodes --kubeconfig real-hedgehog.conf
```

All the commands should succeed!

Which means that all three clusters are running.

_Congratulations, you just created a fleet of three Kubernetes clusters!_

## Installing CNI plugins

You have three clusters now, but something might still slightly bother you about them.

They have no CNI plugin installed which causes the nodes to be `NotReady` and prevents any Pods from being scheduled.

_Let's fix that!_

Having three freshly bootstrapped clusters is actually a great opportunity to compare different CNI plugins in a controlled environment.

Three of the most popular CNI plugins are:

- [Calico](https://www.projectcalico.org/)
- [Weave Net](https://www.weave.works/docs/net/latest/overview/)
- [Cilium](https://cilium.io/)

So let's install one of them on each cluster.

[Install Calico](https://docs.projectcalico.org/getting-started/kubernetes/quickstart) on the first cluster:

```terminal|command=1-2|title=bash
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml \
  --kubeconfig growing-cattle.conf 
```

[Install Weave Net](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/) on the second cluster:

```terminal|command=1-2|title=bash
K8S_VERSION=$(kubectl --kubeconfig obliging-eft.conf version | base64 | tr -d '\n')
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$K8S_VERSION" \
  --kubeconfig obliging-eft.conf 
```

And [install Cilium](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/) on the third cluster:

```terminal|command=1-2|title=bash
kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/1.7.0/install/kubernetes/quick-install.yaml \
  --kubeconfig real-hedgehog.conf 
```

_Now, give the CNI plugins some time to initialise._

Then query the nodes of your clusters again:

```terminal|command=1,2,3|title=bash
kubectl get nodes --kubeconfig growing-cattle.conf
kubectl get nodes --kubeconfig obliging-eft.conf
kubectl get nodes --kubeconfig real-hedgehog.conf
```

_Bingo!_

All the nodes should be `Ready` now!

If you list the Pods, they should now also all be `Running`.

_The CNI plugins indeed completed the setup of your clusters and rendered them fully functional._

At this point, you can launch further Pods in your clusters and do more experiments.

## Destroying the clusters

When you're done experimenting with the clusters, you should delete them because, unfortunately, running clusters on AWS costs money.

_Fortunately, Terraform makes this very easy._

All you have to is to issue the following command:

```terminal|command=1|title=bash
terraform destroy
```

The [`terraform destroy`](https://www.terraform.io/docs/commands/destroy.html) deletes all the resources from your configuration that are currently running.

This means that all the AWS resources corresponding to your clusters will be deleted.

The command also shows you an execution plan, specifying the exact set of resources that will be deleted, which you can confirm with `yes`.

When the command completes, your AWS account will be in exactly the same state as it was before your ran `terraform apply` for the first time!

## Conclusion

This article presented the [Terraform kubeadm module](https://registry.terraform.io/modules/weibeld/kubeadm/aws) which allows to automatically create Kubernetes clusters on AWS.

There are various directions into which you can go from here:

- The article presented only the most basic usage of the module. The module has various [input variables](https://registry.terraform.io/modules/weibeld/kubeadm/aws?tab=inputs) that allow configuring the clusters in different ways.
- For example, you can define the number and type of worker nodes, the CIDR block for the Pod network, or the IP addresses that may access your cluster to secure it from unwanted access.
- The module is still in an early stage of development and new features will be added in the future, such as new input variables.
- Future work on equivalent modules for GCP and Azure is planned.
- You can [raise issues and create pull requests for the module](https://github.com/weibeld/terraform-aws-kubeadm) on GitHub.
