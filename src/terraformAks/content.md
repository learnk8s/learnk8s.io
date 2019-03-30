# learnk8s - the state of Terraform on Azure Kubernetes Service (AKS)

Azure offers a managed Kubernetes service where you can request for a cluster, connect to it and use it to deploy applications.
Using Azure Kubernetes Service (AKS) instead of creating your cluster is convenient if you are a small team and don't want to spend time monitoring and maintaining Kubernetes control planes. Why worrying about scaling APIs, managing databases, provisioning compute resources, and offering a five nines reliability when you can outsource all of it to Azure. For free — yes, Azure doesn't charge you a penny for the master nodes in AKS.
But while you can create a cluster with few clicks in the Azure portal, it usually a better idea to keep the configuration for your cluster under source control. If you accidentally delete your cluster, or decide to provision a copy in another region, you can replicate the exact same configuration.
And if you're working as part of a team, source control gives you peace of mind. You know exactly why changes occurred and who made them.

## Managing infrastructure as code

You have a few options when it comes to keeping your cluster configuration under version control.

### Pulumi

[Pulumi](https://github.com/pulumi/pulumi) was recently released and offers a novel approach to configuration management through code. It resemble a universal SDK that works for any cloud provider. The infrastructure on Azure (or Google Cloud or Amazon Web Services) is exposed as a collection of objects that you can leverage from your favourite programming language. Imagine instantiating a LoadBalancer class in Typescript and having an Azure load balancer provisioned as a side effect. But it doesn't end there.
Pulumi stores the current state of your infrastructure. So if you run your code twice, it will create a single load balancer and not two.
While technically promising, it's also the new kid on the block. Pulumi was released at the beginning of 2018 and some of the features are not as polished as in Terraform or Azure Resource Manager templates.

> As an example, you are force to connect to the Pulumi servers to store the state of your infrastructure. But there're efforts to [make it work with Azure blob storage and Amazon S3](https://github.com/pulumi/pulumi/pull/2455).

Creating an Azure load balancer in Pulumi looks like this using Typescript:

```
import * as azure from '@pulumi/azure'

const testResourceGroup = new azure.core.ResourceGroup('test', {
  location: 'West US',
  name: 'LoadBalancerRG',
})

const testPublicIp = new azure.network.PublicIp('test', {
  allocationMethod: 'Static',
  location: 'West US',
  name: 'PublicIPForLB',
  resourceGroupName: testResourceGroup.name,
})

const testLoadBalancer = new azure.lb.LoadBalancer('test', {
  frontendIpConfigurations: [
    {
      name: 'PublicIPAddress',
      publicIpAddressId: testPublicIp.id,
    },
  ],
  location: 'West US',
  name: 'TestLoadBalancer',
  resourceGroupName: testResourceGroup.name,
})
```

> Please note that Pulumi supports Javascript, Go, Python and Typescript out of the box. However, more languages will be supported later on.

In the example above, you created three resources:

- a resource group to store all of your resources,
- a public IP address to assign to the load balancer
- and the load balancer.

Note how IP address and load balancer are referencing the resource group.

Assuming that you have the `pulumi` binary installed, you can execute the script and create the load balancer with:

```bash
pulumi up
```

### Azure Resource Manager Templates

Often abbreviated ARM. ARM is the toolset developed by Microsoft designed to provision and control resources in Azure. ARM templates describe a resource and its related dependencies. The templates are akin to JSON files and not particularly human friendly. Also, ARM lack advanced features such as keeping track of what's being deployed, dry runs, and the ability to modularise and reuse your code.
If Pulumi gave you the extreme flexibility of writing your own code, ARM takes that away by giving you a semi static JSON file where you can dynamically inject variables.
Azure Templates are made of two parts:

1. a generic template and
2. A parameter file that is used to inject the value in the template

Here you can [find the generic template for the Azure Load Balancer](https://github.com/Azure/azure-quickstart-templates/blob/master/201-1-vm-loadbalancer-2-nics/azuredeploy.json).

Creating an Azure load balancer in ARM looks like this:

```powershell
New-AzResourceGroupDeployment -Name TestRG -Location uswest `
    -TemplateFile 'https://raw.githubusercontent.com/azure/azure-quickstart-templates/master/201-2-vms-loadbalancer-lbrules/azuredeploy.json' `
    -TemplateParameterFile 'https://raw.githubusercontent.com/azure/azure-quickstart-templates/master/201-2-vms-loadbalancer-lbrules/azuredeploy.parameters.json'
```

Notice how you had to specify the parameter file to customise some of the values.

### Terraform

Terraform gained most of its popularity from being a friendly tool to provision infrastructure on Amazon Web Services. Terraform is not a library that you use in your favourite programming language, and it's not even a collection of JSON templates. It's something in between. It's a sort of DSL — a domain specific language that's designed to be easy to read and write.

Terraform doesn't know to connect to a cloud provider and orchestrate their API. It delegates all the work to plugins called providers. Providers are in charge of translating the terraform DSL into HTTP requests to Azure, Amazon Web Service or any other cloud provider.
Of course, there is a Terraform provider for Azure, [as well as many others](https://www.terraform.io/docs/providers/).

> Did you know that [you could use Terraform to provision Github's actions](https://www.terraform.io/docs/github-actions/index.html)?

Creating an Azure load balancer in Terraform looks like this:

```hcl
resource "azurerm_resource_group" "test" {
  name     = "LoadBalancerRG"
  location = "West US"
}

resource "azurerm_public_ip" "test" {
  name                = "PublicIPForLB"
  location            = "West US"
  resource_group_name = "${azurerm_resource_group.test.name}"
  allocation_method   = "Static"
}

resource "azurerm_lb" "test" {
  name                = "TestLoadBalancer"
  location            = "West US"
  resource_group_name = "${azurerm_resource_group.test.name}"

  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = "${azurerm_public_ip.test.id}"
  }
}
```

> Please note how the code is remarkably similar to Pulumi's.

Terraform has a powerful mechanism where it can trace dependencies across resources and store them in a graph. The graph is used to optimise creating infrastructure: resources that are independent are created in parallel instead of sequentially.

The dependency graph for the load balancer above is simple.

[TODO]

But you can imagine that once you have a dozen services to maintain, things could become more complicated.

The following complex dependency graph was drawn with [Blast Radius](https://github.com/28mm/blast-radius) — a tool for reasoning about Terraform dependency graphs with interactive visualisations.

[TODO]

Terraform also keeps track of the current state of your infrastructure, so running your the script twice hold the same result.

In the rest of this article you will explore why Terraform is loved by small and large enterprises that uses it everyday in production.

## Getting started with Terraform

Terraform uses a different set of credentials to provision the infrastructure, so you should create those first.

The first step is to install the Azure CLI. You can find detailed [instructions on how to install it on the official website](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

> [Sign up for an Azure account](https://azure.microsoft.com/en-gb/free/), if you don't own one already. You will receive \$300 in free credits.

You can link your Azure CLI to your account with:

```bash
az login
```

And you can list your accounts with:

```bash
az account list
```

**Make a note of your subscription id.**

> If you have more than one subscription, you can set your active subscription with `az account set --subscription="SUBSCRIPTION_ID"`

Terraform needs a Service Principal to create resources on your behalf. You can think of it as a user identity (login and password) with a specific role, and tightly controlled permissions to access your resources. It could have fine grained permissions such as only to create virtual machines or read from a particular blob storage. In your case, you need a Contributor Service Principal — enough permissions to create, and delete resources.

You can create the Service Principal with:

```bash
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"
```

The previous command should print a JSON payload like this:

```json
{
  "appId": "00000000-0000-0000-0000-000000000000",
  "displayName": "azure-cli-2017-06-05-10-41-15",
  "name": "http://azure-cli-2017-06-05-10-41-15",
  "password": "0000-0000-0000-0000-000000000000",
  "tenant": "00000000-0000-0000-0000-000000000000"
}
```

Make a note of the `appId`, `password` and `tenant`. You need those to set up Terraform.

Export the following environment variables

```shell
export ARM_CLIENT_ID=<insert the appId from above>
export ARM_SUBSCRIPTION_ID=<insert your subscription id>
export ARM_TENANT_ID=<insert the tenant from above>
export ARM_CLIENT_SECRET=<insert the password from above>
```

You should install the Terraform CLI. You can [follow the instructions from the official website](https://learn.hashicorp.com/terraform/getting-started/install.html).

If the installation is successful, you should be able to test it by printing the current version of the binary:

```shell
terraform version
```

Let's create the simplest Terraform file. Create a file named `main.tf` with the following content:

```bash
provider "azurerm" {
  version = "~> 1.23"
}

resource "azurerm_resource_group" "rg" {
  name     = "test"
  location = "uksouth"
}
```

The file contains the provider and an empty resource group.

In the same directory initialise Terraform with:

```bash
terraform init
```

The command execute two crucial tasks:

1. It downloads the Azure provider which is necessary to translate the Terraform instructions into API calls
2. It initialises the state where it keeps track of all the resources that are created.

You're ready to create your resource group using Terraform.

There're two commands that are frequently used in succession:

```shell
terraform plan
```

Terraform asks for two variables:

1. The service principal id — this is the appId that you retrieved previously and
2. The service principal secret — this is the password

Executes a dry run. It's always a good idea to double check what happens to your infrastructure, before you commit the changes.
You don't want to accidentally destroy a database because you forgot to add or remove a resource.

Once, you are happy with the changes, you can create the resources with:

```bash
terraform apply
```

Please note that you may enter the service principal id (`tenant`) and service principal secret (`password`) again.

> If you are bored at typing the same credentials every time you type `terraform plan` or `terraform apply`, you can export the following variables `export TF_VAR_service_principal_client_secret=<password>` and `TF_VAR_service_principal_client_id=<tenant>`

As soon as you type those, Terraform creates the resource group.

Congratulations, you just used Terraform to provision your infrastructure.

You can imagine that, by adding more block resources, you can create more components in your infrastructure.
You can have a look at all the resources that you could create [in the left column of the official provider page for Azure](https://www.terraform.io/docs/providers/azurerm/index.html#).

> Please note that you should have a sufficient knowledge of Azure and its resources to understand how components can be plugged in together.

The bill of material to provision a Kubernetes cluster on Azure is as follow. You need:

- a resource group to contain all of the resources
- a virtual network and a subnet where to place the virtual machines (nodes) for the cluster
- security groups to expose the cluster to the public internet
- a Kubernetes master node (that is managed by Azure)

The list translates to the following Terraform code:

```hcl

```

Please notice how we are referencing to some of the variables defined in the vnet and resource groups. Terraform computes the dependencies between resources and substitutes the references with the real values once those are computed.

Before you apply the changes, execute a dry-run with:

```bash
terraform plan
```

You should notice that the old resource group is marked as ready to be deleted, and there are a lot of resources that are ready to be created.

If the proposed changes resonate with what you asked for, you can apply them with:

```hcl
terraform apply
```

It's time for a cup of coffee. Provisioning a cluster on AKS takes in average about ten minutes.

Done?

You might wonder where is your cluster.

How do you connect to it?

You can head back to the Azure console and search for your cluster and download the kubeconfig file.

But there's a quicker way.

Terraform can print information about the state. You could use that to print the kubeconfig file associated with the cluster.

You should add the following snippet to the end of your `main.tf` file:

```hcl
output "kube_config" {
  value = "${azurerm_kubernetes_cluster.cluster.kube_config_raw}"
}
```

You should go through another cycle of `terraform plan` and `terraform apply` and verify that nothing changed.

You should also notice that, after the last `terraform apply`, the kubeconfig file is printed to the terminal before the script completes.

You could copy the content and save it locally. Or if you prefer, you can use the following command to access the value and save it to disk:

```bash
echo "$(terraform output kube_config)" > azurek8s
```

You can load that kubeconfig with:

```bash
export KUBECONFIG="$PWD/azurek8s"
```

Assuming you have kubectl installed locally, you can test the connection to the cluster with:

```bash
kubectl get pods --all-namespaces
```

Hurrah!

You have provision a cluster using Terraform.

## Requirements for production

A production ready Kubernetes cluster is made of few parts:

- A master, node usually provisioned by Azure
- At least one agent pool — a collection of identical compute resources such a the Ev4
- An Ingress controller — used to expose your Pods to the internet
- A load balancer which distributes incoming traffic to the compute resources in the agent pool

[PIC]

The above setup is the bare minimum to deploy, scale and serve applications in Kubernetes.

However, if you're deploying enterprise grade software that scales to million of users you probably need few extra components:

- An application gateway to provide the DNS component and the Web Application Firewall
- A Traffic manager to distribute traffic across several clusters geographically distributed across the globe.

[PIC]

Ideally you should keep all your infrastructure setup in Terraform and version control. You don't want details to be missed, particularly if you wish to have a robust disaster recovery plan or you want to build a copy of your setup in a different region.
[why single command deploy]

Time to write some Terraform.

## Terraforming AKS

AKS is defined as a single resource in Terraform. Go ahead and add the following snippet of code in your `main.tf`:

[code]

A few notes on the resource definition:

- `linux_profile` is used to set the username and public key to SSH into the node
- `agent_pool_profile` defines how many virtual machines should be part of the cluster and what their configuration should look like.
- `service_principal` is used by the API to provision the AKS cluster and connect the master to the worker nodes. [check]

You can create the cluster with:

```bash
Terraform plan
Terraform apply
```

The process take in average about 10 minutes. What happens in the background is that Azure receives your request, generates a few ARM templates, deploys them internally and create the extra resources needed (such as NICs and virtual machines) to create the cluster.

Terraform created the cluster, but where is it?

You could log in into the portal and check if the cluster is ready, but that doesn’t help. You want to connect to the cluster with kubectl.

Terraform can expose the details for your cluster using outputs. You can configure the following outputs:

[code]

You will have to run `terraform apply` again to see the output.

Assuming you have kubectl installed locally, you can connect kubectl to your AKS cluster by following the steps:

```bash
echo "$(terraform output kube_config)" > ./azurek8s
export KUBECONFIG=${PWD}/azurek8s
```

You can test that the kubectl is working with:

```bash
Kubectl cluster-info
```

Congratulations! You just configured your first cluster using Terraform.

The cluster is empty, though. And you don’t have an Ingress controller to route the traffic to the cluster.

## Installing an Ingress

In this tutorial, you will deploy the nginx-ingress controller. While the nginx-ingress controller is the most popular, it is not necessarily the best option all the time.
When you install the ingress controller you have two options.

You can install the nginx-ingress controller using a service of type NodePort.
Each node in your agent pool will expose a fixed port and you can route the traffic to that port to reach the Pods in your cluster.
To reach the port on a node, you need the node’s IP address.
Unfortunately, you can’t reach the node’s IP address directly because the IP is private. You still need to find a way to route the traffic from the outside to your node.
You could provision a load balancer. And since you’re acquainted with Terraform, you could use that to create the load balancer and link it to the agent pool.
Not so fast. To provision a load balancer, you need a list of IP addresses to route the traffic to, and Azure doesn’t expose the NIC created as part of the AKS cluster.
Manually provisioning a load balancer on top of your agent pool is not doable in AKS.

You’re left with another option. Using a Service of `type: LoadBalancer`.
Services of this type are cloud provider aware and can create a load balancer on your current cloud provider such as Azure.
So instead of exposing your Services as NodePort and you manually linking the load balancer, you have Azure doing the work.

Sounds like a plan.

But how do you submit the YAML resources for your ingress?

You could download the resources from the official website. Or you could use Helm and the official nginx-ingress controller chart.

The easiest option is to use the Helm chart.
Helm comes with a server side component that is installed inside the cluster called the tiller. The tiller act as a middleman and creates resources on your behalf. The tiller is hard to secure
You can install the ingress with:

```bash

```

The IP address of the load balancer is dynamically generated. You can retrieve the IP with:

```bash

```

Congrats you have a fully working cluster that is capable of routing the traffic using Nginx.

## Creating more copies

The beauty of Terraform is that you can use the same code to generate several cluster with a different name.
You might have a cluster for each environment such as a cluster for dev, one for preproduction and one for production.
You can change your terraform code to allow for any number of clusters to be created.

[TODO]

## What's next
