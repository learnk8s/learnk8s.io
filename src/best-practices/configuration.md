# Configuration

Are you following the best practices?

## Secure Baseline

Ensure that your underlying hosts are hardened and secure. I recommend CIS benchmarks as a starting point.

✅ Ensure that Docker itself is configured per security best-practices. Check out my previous article: Docker Security Best-Practices

✅ Ensure that you're starting off with Kubernetes with a secure baseline.

Center for Internet Security (CIS) maintains documentation available for free.
The fine folks at Aqua Security also open-sourced an automated checker based on CIS recommendations. Check it out: kube-bench

## Authentication

Most interactions with Kubernetes are done by talking to the control plane, specifically the kube-apiserver component of the control plane. Requests pass through 3 steps in the kube-apiserver before the request is served or rejected: Authentication, Authorization, and Admission Control. Once requests pass these 3 steps, kube-apiserver communicates with Kubelets over the network. Therefore, Kubelets also have to check authentications and authorizations as well.

The behavior of kube-apiserver and kubelet can be controlled or modified by launching them with certain command-line flags. The full list of supported command-line flags are documented here:

kube-apiserver
kubelet
Let's examine some common Kubernetes authentication security mistakes:

❌ By default, anonymous authentication is enabled
✅ Disable anonymous authentication by passing the --anonymous-auth=false flag
❌ Running kube-apiserver with --insecure-port=<PORT>

🗒️ In older versions of Kubernetes, you could run kube-apiserver with an API port that does not have any protections around it

✅ Disable insecure port by passing the --insecure-port=0 flag. In recent versions, this has been disabled by default with the intention of completely deprecating it
✅ Prefer OpenID Connect or X509 Client Certificate-based authentication strategies over the others when authenticating users

🗒️ Kubernetes supports different authentication strategies:

X509 client certs: decent authentication strategy, but you'd have to address renewing and redistributing client certs on a regular basis
Static Tokens: avoid them due to their non-ephemeral nature
Bootstrap Tokens: same as static tokens above
Basic Authentication: avoid them due to credentials being transmitted over the network in cleartext
Service Account Tokens: should not be used for end-users trying to interact with Kubernetes clusters, but they are the preferred authentication strategy for applications & workloads running on Kubernetes
OpenID Connect (OIDC) Tokens: best authentication strategy for end users as OIDC integrates with your identity provider (e.g. AD, AWS IAM, GCP IAM ...etc)

## Admission Controls

Admission controllers are pieces of code that intercept requests to the Kubernetes API in the 3rd and last step of the authentication/authorization process. The full list of admission control options are documented here:

## TLS traffic

## DNS entries

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
