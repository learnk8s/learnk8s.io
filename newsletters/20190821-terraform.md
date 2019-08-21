Hi there!

As you know, a functional Kubernetes cluster has several components:

- Master
- Nodes
- Ingress
- TLS
- DNS
- etc.

Most of the time you have scripts to provision some of those such as kubeadm to bootstrap the cluster.

But integrating cluster + Ingress + certs + (more?) is _usually_ a sequence of steps that you have to do by hand.

One of the time.

_❓But what if you could provision all of your infrastructure with a single command?_

_❓What if you could have a "start-k8s-cluster-with-everything" command that creates the cluster and everything else?_

**You can.**

Check out our latest article on how to provision a fully working cluster (with Ingress) with a single Terraform command on Azure.

[Getting started with Terraform and AKS](https://learnk8s.io/blog/get-start-terraform-aks/ "Getting started with Terraform and AKS")

Let us know what you think!

— Ale
