# Cluster configuration

Cluster configuration best practices.

## Approved Kubernetes configuration

Kubernetes is flexible and can be configured in several different ways.

But how do you know what's the recommended configuration for your cluster.

The best option is to compare your cluster with a standard reference.

In the case of Kubernetes, the reference is the Centre for Internet Security (CIS) benchmark.

### The cluster passes the CIS benchmark

The Center for Internet Security provides a number of guidelines and benchmark tests for best practices in securing your code.

They also maintain a benchmark for Kubernetes which you can [download from the official website](https://www.cisecurity.org/benchmark/kubernetes/).

While you can read the lengthy guide and manually check if your cluster is compliant, an easier way is to download and execute `kube-bench`.

`kube-bench` is a tool designed to automate the CIS Kubernetes benchmark and report on misconfigurations in your cluster.

Example output:

```terminal|title=bash
[INFO] 1 Master Node Security Configuration
[INFO] 1.1 API Server
[WARN] 1.1.1 Ensure that the --anonymous-auth argument is set to false (Not Scored)
[PASS] 1.1.2 Ensure that the --basic-auth-file argument is not set (Scored)
[PASS] 1.1.3 Ensure that the --insecure-allow-any-token argument is not set (Not Scored)
[PASS] 1.1.4 Ensure that the --kubelet-https argument is set to true (Scored)
[PASS] 1.1.5 Ensure that the --insecure-bind-address argument is not set (Scored)
[PASS] 1.1.6 Ensure that the --insecure-port argument is set to 0 (Scored)
[PASS] 1.1.7 Ensure that the --secure-port argument is not set to 0 (Scored)
[FAIL] 1.1.8 Ensure that the --profiling argument is set to false (Scored)
```

> Please note that it is not possible to inspect the master nodes of managed clusters such as GKE, EKS and AKS, using `kube-bench`. The master nodes are controlled and managed by the cloud provider.

## Authentication

### ServiceAccount tokens are for applications and controllers **only**

Service Account Tokens: should not be used for end-users trying to interact with Kubernetes clusters, but they are the preferred authentication strategy for applications & workloads running on Kubernetes

### Use OpenID (OIDC) tokens as a user authentication strategy

OpenID Connect (OIDC) Tokens: best authentication strategy for end users as OIDC integrates with your identity provider (e.g. AD, AWS IAM, GCP IAM ...etc)

## Logging

application
Application ID. Retrieved from metadata labels.
version
Application version. Retrieved from metadata labels.
release
Application release. Retrieved from metadata labels. [optional]
cluster
Cluster ID. Retrieved from Kubernetes cluster.
container
Container name. Retrieved from Kubernetes API.
node
Cluster node running this container. Retrieved from Kubernetes cluster.
pod
Pod name running the container. Retrieved from Kubernetes cluster.
namespace

## Reserve priority and space for Kubernetes resources

Kubelet can be instructed to reserve a certain amount of resources for the system and for Kubernetes components (kubelet itself and Docker etc). Reserved resources are subtracted from the node’s allocatable resources. This improves scheduling and makes resource allocation/usage more transparent.
<https://github.com/kubernetes/kubernetes/blob/1fc1e5efb5e5e1f821bfff8e2ef2dc308bfade8a/cmd/kubelet/app/options/options.go#L227>
<https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#node-allocatable>

## Handling long lived connections

<https://itnext.io/on-grpc-load-balancing-683257c5b7b3>
<https://kubernetes.io/blog/2018/11/07/grpc-load-balancing-on-kubernetes-without-tears/>

## Securing the kubelet

Cloud platforms (AWS, Azure, GCE, etc.) often expose metadata services locally to instances. By default these APIs are accessible by pods running on an instance and can contain cloud credentials for that node, or provisioning data such as kubelet credentials. These credentials can be used to escalate within the cluster or to other cloud services under the same account.

## Restrict access to alpha or beta features

Alpha and beta Kubernetes features are in active development and may have limitations or bugs that result in security vulnerabilities. Always assess the value an alpha or beta feature may provide against the possible risk to your security posture. When in doubt, disable features you do not use.
