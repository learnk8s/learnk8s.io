# Cluster configuration

Cluster configuration best practices.

## Approved Kubernetes configuration

### Master Node Configuration Files

### API Server

### Controller Manager

### Scheduler

### etcd

### Control Plane Configuration

### Authentication and Authorization

### Logging

### Worker Nodes

### Worker Node Configuration Files

### Kubelet

### Policies

### RBAC and Service Accounts

### Pod Security Policies

### Network Policies and CNI

### Secrets Management

### Extensible Admission Control

### General Policies

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
