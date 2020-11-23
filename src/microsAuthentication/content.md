If your infrastructure consists of several applications interacting with each other, you might have faced the issue of securing communications between services to prevent unauthenticated requests.

Imagine having two apps:

1. An API
1. A data store

You might want the data store only to reply to requests to the API and reject requests from anywhere else.

_How would the data store decide to authenticate or deny the request?_

A popular approach is to request and pass identity tokens to every call within services.

So instead of issuing a request to the data store directly, you might need to go through an Authentication service first, 
retrieve a token and use that to authenticate your request to the data store.

There is a certain context associated with the token that allows the data store to accept a token from the API service and to 
reject a token from elsewhere. 

This context is used to authorize the request or reject it.

TODO: insert new diagram

You have several options when it comes to implementing this mechanism of authentication:

- **You could use static tokens that don't expire.** In this case, there is no need for running a dedicated authorization server.
- **You could set up an oAuth server.**
- **You could roll out your own authorisation mechanism** such as mutual TLS certificates.

All authorisation servers have to do is to:

1. **Authenticate the caller** - The caller should have a valid and verifiable identity.
1. **Generate a token with a limited scope, validity and the desired audience.**
1. **Validate a token** - Service to service communication is allowed only if the token is legit for the two services involved.

Examples of Authorisation servers are tools such as [Keycloak](https://www.keycloak.org/) or [Dex](https://github.com/dexidp/dex).

When you use Keycloack, you first:

1. Log in using your email and password — your identity is verified.
1. A valid session is created for your user. The session might describe what groups you belong to.
1. Every request proxied through Keycloak has to validate the current session, or you will be asked to log in again.

The same is valid for the two apps within your infrastrucure.

1. The caller makes a request to Keycloack with its API key and secret to retrieve a session token.
1. The caller makes a request to the second app using the token.
1. The second app retrieves the token from the request and validates with Keycloak.
1. If the token is valid, it replies to the request.

You might have not noticed, but Kubernetes offers the same primitives as the authentication and authorisation 
service with Service Accounts, Roles and RoleBindings.

## Kubernetes as an authorisation server

In Kubernetes, you [assign identities using Service Accounts.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

Service Accounts are then linked to Roles that grant access to resources.

A Token is generated as soon as you create the Service Account.

Users and Pods can use the tokens as a mechanism to authenticate to the API and issue requests.

And they only receive successful replies for the resources you are entitled to consume.

If a Role grants access to create and delete Pods, you won't be able to amend Secrets, or create ConfigMaps — for example.

_Could you use Service Accounts as a mechanism to authenticate requests between apps in the cluster?_

Kubernetes offers the same primitives to authenticate requests just like Keycloak and Dex.

_What if the Kubernetes API could be used as an Authorisation server?_

_Could you use Service Accounts as a mechanism to authenticate requests between apps in the cluster?_

Let's try that.

## Creating the cluster

You will need access to a Kubernetes cluster with the [Service Account Volume projection](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-token-volume-projection) feature enabled.

> Don't worry if you don't know what a Service Account Volume is — you will learn more about it later on in the article.

The Service Account Volume projection feature requires the Kubernetes API server to be running with specific API flags.

The support for different managed Kubernetes providers may vary.

However, you can start a local cluster with the volume projection feature enabled in [minikube](https://github.com/kubernetes/minikube) with:

```terminal|command=1-6|title=bash
minikube start \
    --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
    --extra-config=apiserver.service-account-key-file=/var/lib/minikube/certs/sa.pub \
    --extra-config=apiserver.service-account-issuer=kubernetes/serviceaccount \
    --extra-config=apiserver.service-account-api-audiences=api
```

You should also clone the repository <https://github.com/amitsaha/kubernetes-sa-volume-demo> as it contains the demo source code that 
will be referred to in the article.

You will now deploy two services:

1. You will refer to these services as the API service (API) and the data store.
1. They are written in the Go programming language and they communicate via HTTP.
1. Each service runs in its own namespaces and use dedicated Service Accounts.
1. The data store replies to requests successfully only when the caller has a valid identity, 
   else it rejects the request with an error.

## Deploying the API component

The API service is a headless web application listening on port 8080.

When a client makes any request to it, the API component:

1. Issues an HTTP GET request to the data store with the token linked to the Service Account.
1. Forwards the response.

You can deploy the app and expose it as a Service in the cluster with:

```terminal|command=1|title=bash
kubectl apply -f service_accounts/api/deployment.yaml
namespace/api created
serviceaccount/api created
deployment.apps/app created
service/app created
```

You can retrieve the URL of the API service with:

```terminal|command=1|title=bash
minikube --namespace api service app --url
http://192.168.99.101:31541
```

_If you issue a request to that app, will you get a successful response?_

Let's try that:

```terminal|command=1|title=bash
curl http://192.168.99.101:31541
Get "http://app.data-store.svc.cluster.local": dial tcp: lookup app.data-store.svc.cluster.local: no such host
```

This is expected since you haven't yet deployed the data store yet.

_Keep the terminal open._

Open a new terminal to carry out the next set of steps.

## Deploying the Data store

The Data store service is another headless web application listening on port 8081.

When a client makes any request to it, the Data store:

1. Looks for a token in the request header. If there isn't one, it replies with a HTTP 401 error response.
1. Checks the token with the Kubernetes API for its validity. If it's invalid, it replies with a HTTP 403 response.
1. Finally, when the token is valid, it replies to the original request.

You can create the data store with:

```terminal|command=1|title=bash
kubectl apply -f service_accounts/data-store/deployment.yaml
namespace/data-store created
serviceaccount/data-store created
clusterrolebinding.rbac.authorization.k8s.io/role-tokenreview-binding created
deployment.apps/app created
service/app created
```

Now, use `curl` to make a request to the API service again:

```terminal|command=1|title=bash
curl http://192.168.99.101:31541
Hello from data store. You have been authenticated
```

The data store service successfully verified the token and replied to your request.

_But how does all of that work? Let's find out._

Keep the two terminal sessions running and switch to a new (third) terminal session.

## Under the hood

**Service Accounts are a way to associate your Kubernetes workloads with an identity.**

You can combine a Service Account with a Role (or ClusterRole) and a RoleBinding (or ClusterRoleBinding) to define what or who can access what resources in a cluster.

For example, when you want to restrict reading Secrets only to admin users in the cluster, you can do so using a Service Account.

**Service Accounts aren't just for users, though.**

You can authenticate humans as well as applications in the cluster.

If you want your applications to list all the available Pods in the cluster, you will need to create a Service Account that is associated with read-only access to the Pod API.

When you deployed two apps earlier, you also created two Service Accounts:

```terminal|command=1,5|title=bash
kubectl get serviceaccount --namespace api
NAME      SECRETS   AGE
api       1         4m5s
default   1         4m5s
kubectl get serviceaccount --namespace data-store
NAME           SECRETS   AGE
default        1         6m4s
data-store   1         6m4s
```

Those Service Account are the identities associated with the apps, but they don't define what permissions are granted.

For that, you might need to list the Role and the RoleBinding:

```terminal|command=1,3|title=bash
kubectl get role,rolebinding --namespace api
No resources found in api namespace.
kubectl get role,rolebinding --namespace data-store
No resources found in data-store namespace.
```

There are none!

_How come you can have a Service Account without a Role and RoleBinding?_

You created an empty Service Account that doesn't have any sort of permission.

However, you can use it to authenticate your request to the Kubernetes API (but you can't create, update, delete, etc. resources).

_What components is validating the Service Account identity?_

## Issueing requests to the Kubernetes API

Tokens associated with Service Accounts are verified by the Kubernetes API.

In particular, there's a specific component in charge of validating and rejecting them: the **Token Review API**.

Let's manually create a token and validate it against the Token Review API.

Consider the following YAML manifest to create a namespace `test` and a service account `sa-test-1`:

```yaml|title=sa.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: test
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: sa-test-1
  namespace: test
```

You can create the resources with:

```terminal|command=1|title=bash
kubectl apply -f sa.yaml
namespace/test created
serviceaccount/sa-test-1 created
```

The Service Account doesn't have any Role or ClusterRole associated.

_What kind of access does it have?_

You can use kubectl with the `can-i` subcommand and the impersonation `--as` flag to test it:

```terminal|command=1,3,5|title=bash
kubectl auth can-i create deployments --as=sa-test-1
no
kubectl auth can-i list pods --as=sa-test-1
no
kubectl auth can-i delete services --as=sa-test-1
no
```

You can keep querying all Kubernetes resources, but the Service Account doesn't have any access.

If you want to grant access to the Service Account you need two more objects: a Binding and a Role.

In the Role you define access to the resources such as read-only access to Secrets or only GET, DESCRIBE and LIST operations on Pods.

Kubernetes comes with a list of roles and cluster roles prepackaged that you can list with
`kubectl get roles --all-namespaces` and `kubectl get clusterroles` respectively.

In the following example, you will use the `system:auth-delegator` cluster role which has all the permission to call the Token Review API.

You can inspect it with:

```terminal|command=1|title=bash
kubectl describe clusterrole system:auth-delegator --namespace kube-system
Name:         system:auth-delegator
Labels:       kubernetes.io/bootstrapping=rbac-defaults
Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
PolicyRule:
  Resources                                  Non-Resource URLs  Resource Names  Verbs
  ---------                                  -----------------  --------------  -----
  tokenreviews.authentication.k8s.io         []                 []              [create]
  subjectaccessreviews.authorization.k8s.io  []                 []              [create]
```

The only part missing is the ClusterRoleBinding.

You can create a ClusterRoleBinding to link the Service Account to a Role and grant the permission cluster wide:

```yaml|highlight=8,11|title=sa_rbac.yaml
kind: ClusterRoleBinding
metadata:
  name: role-tokenreview-binding
  namespace: test
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: sa-test-1
  namespace: test
```

Now you Service Account is linked to the `system:auth-delegator` role.

Save the above into a new file, `sa_rbac.yaml` and submit it to the cluster with:

```terminal|command=1|title=bash
kubectl apply -f sa_rbac.yaml
clusterrolebinding.rbac.authorization.k8s.io/role-tokenreview-binding created
```

TODO: I couldn't find a easy way to do this.

Let's impersonate the Service Account and test it:

```terminal|command=1|title=bash
kubectl can-i <I wish I could check the auth-delegator> --as=sa-test-1
MISSING OUTPUT
```

Great!

You have now created a Service Account and associated it with a ClusterRole to allow it to invoke the TokenReview API.

_How should you use it?_

First, you should retrieve the Service Account token which is Stored in a Secret.

You can reveal the name of the Secret associated with the Service Account with:

```terminal|command=1|title=bash
kubectl --namespace test describe sa sa-test-1
Name:                 sa-test-1
Namespace:            test
Labels:               <none>
Image pull secrets:   <none>
Mountable secrets:    sa-test-1-token-99l5r
Tokens:               sa-test-1-token-99l5r
Events:               <none>
```

Then to inspect the Secret object, you can issue the following command:

```terminal|command=1|title=bash
kubectl --namespace test describe secret sa-test-1-token-99l5r
Name:       sa-test-1-token-99l5r
Namespace:  test
Labels:     <none>
Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1066 bytes
namespace:  4 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6…
```

The `token` object in the Data is a base64 encoded object representing a JSON web token payload.

It's time to verify the token.

### Sending a token verification request

To issue a request to the Token Review API, you need to create a TokenReview resource:

```yaml|title=token.yaml
kind: TokenReview
apiVersion: authentication.k8s.io/v1
spec:
  token: <the token that you want to validate>
```

AMIT: this should be refactored. We can use Kubectl + impersonation.

> I am not sure how we can make an API call using impersonation. Quick google didn't return anything
> Also I would prefer this example to be as it is as it shows how this would work in an application running in a 
> pod and flows nicely into the service implementation in Go.

Thus, the `curl` command to run in the pod shell session is:

```terminal|command=1-6|title=bash
curl --cacert ${CACERT} -X "POST" \
  $APISERVER/apis/authentication.k8s.io/v1/tokenreviews \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{"kind": "TokenReview","apiVersion": \
   "authentication.k8s.io/v1", "spec": {"token": "'$TOKEN'"}}'
```

Notice how you're verifying the same token that you use to connect to the API.

You can use the same command to verify other tokens by replacing `{"token": "'$TOKEN'"}` with `{"token": "'$OTHER_TOKEN'"}`

When you issue the command, the response should look as follows:

```json|highlight=12,13,16-20,22-24
{
  "kind": "TokenReview",
  "apiVersion": "authentication.k8s.io/v1",
  "metadata": {
    "creationTimestamp": null,
    // truncated output
  },
  "spec": {
    "token": "eyJhbGciOiJSUzI1NiI…"
  },
  "status": {
    "authenticated": true,
    "user": {
      "username": "system:serviceaccount:test:sa-test-1",
      "uid": "42d43e46-76fe-441f-8281-a566964e52fe",
      "groups": [
        "system:serviceaccounts",
        "system:serviceaccounts:test",
        "system:authenticated"
      ]
    },
    "audiences": [
      "api"
    ]
  }
}
```

The key information in the response is in the status object with the following fields:

- **Authenticated**: the field is set to true which means the token was successfully validated.
- In **user** object you can find the following properties:
  - The **username** corresponding to the service account used by the Pod - `system:serviceaccount:test:sa-test-1`.
  - The **uid** for system user ID of current user.
- **Groups** includes the groups that the user belongs to.
- **Audiences** contains a list of audiences that the token is intended for. In this case, only the `api` is a valid audience.

_Excellent, you just verified your own token!_

You know that:

- The token is valid.
- The identity of the caller (the Service Account).
- The groups that the caller belongs to.

Since you can validate and verify any token, you could leverage the same API endpoint in your Secret Store component to authenticate and authorise requests!

Let's have a look at how you could include the above logic in your apps.

## Implementation of the services

Here's how the two services interact with each other and the Kubernetes API:

1. At startup, an API service reads the Service Account token and keeps it in memory.
1. The API service calls the data store passing the token as a HTTP header — i.e. `X-Client-Id`.
1. When the data store receives a request from the API component, it reads the token from the `X-Client-Id` header and issues a request to to the TokenReview API to check its validity.
1. If the response is authenticated, the data store service replies with a successful message, otherwise a 401 error.

The following diagram represents the above call flow:

TODO: Diagram updation needed

![Call flow between the services](image2.png)

First let's look at the implementation of the API service.

You can find the application code in the file `service_accounts/api/main.go`.

To read the Service Account Token, you could use the following function:

```go|highlight=2,6|title=main.go
func readToken() {
	b, err := ioutil.ReadFile("/var/run/secrets/kubernetes.io/serviceaccount/token")
	if err != nil {
		panic(err)
	}
	serviceToken = string(b)
}
```

Then, the Service Token is passed on to the call to the Secret store service in the `X-Client-Id` HTTP header:

```go|highlight=8|title=main.go
func handleIndex(w http.ResponseWriter, r *http.Request) {
	…
	client := &http.Client{}
	req, err := http.NewRequest("GET", serviceConnstring, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("X-Client-Id", serviceToken)
	resp, err := client.Do(req)
	..
```

As soon as the reply from the Secret store is received, it is then sent back as a response:

```go|highlight=7-8|title=main.go
        ..
        if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		io.WriteString(w, string(body))
	}
```

The following YAML manifest is used to deploy the API service:

```yaml|highlight=27-27|title=deployment.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: api
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: api
  namespace: api
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      serviceAccount: api
      containers:
      - name: app
        image: amitsaha/k8s-sa-volume-demo-api:sa-1
        env:
        - name: LISTEN_ADDR
          value: ":8080"
        - name: DATA_STORE_CONNSTRING
          value: "http://app.data-store.svc.cluster.local"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: app
  namespace: api
spec:
  type: NodePort
  selector:
    app: api
  ports:
    - port: 8080
      targetPort: 8080
```

You will notice that there is nothing special about the Deployment manifest above apart from having a Service Account associated with it.

Let's move onto the data store service.

You can find the complete application in `service_accounts/data-store/main.go`.

The data store service does two key things:

1. It retrieves the value of the `X-Client-Id` header from the incoming request.
1. It then invokes the Kubernetes Token Review API to check if it is a valid token or not.

Step (1) is performed by the following code:

```go|highlight=1|title=main.go
clientId := r.Header.Get("X-Client-Id")
	if len(clientId) == 0 {
		http.Error(w, "X-Client-Id not supplied", http.StatusUnauthorized)
		return
	}
```

Then, step (2) is performed using the Kubernetes Go client.

First, we create a `ClientSet` object:

```go|title=main.go
config, err := rest.InClusterConfig()
clientset, err := kubernetes.NewForConfig(config)
```

The `InClusterConfig()` function automatically reads the Service Account Token for the Pod and hence you do not have to manually specify the path.

Then, you construct a `TokenReview` object specifying the token you want to validate in the `Token` field:

```go|title=main.go
tr := authv1.TokenReview{
	Spec: authv1.TokenReviewSpec{
	    Token: clientId,
	},
}
```

Finally, you can create a `TokenReview` request with:

```go|title=main.go
result, err := clientset.AuthenticationV1().TokenReviews().Create(ctx, &tr, metav1.CreateOptions{})
```

The following YAML manifest will create the various resources needed for the data store service:

```yaml|highlight=12-23|title=deployment.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: data-store
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: data-store
  namespace: data-store
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: role-tokenreview-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: data-store
  namespace: data-store
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: data-store
spec:
  replicas: 1
  selector:
    matchLabels:
      app: data-store
  template:
    metadata:
      labels:
        app: data-store
    spec:
      serviceAccount: data-store
      containers:
      - name: app
        image: amitsaha/k8s-sa-volume-demo-ss:sa-1
        env:
        - name: LISTEN_ADDR
          value: ":8081"
        ports:
        - containerPort: 8081
---
apiVersion: v1
kind: Service
metadata:
  name: app 
  namespace: data-store
spec:
  selector:
    app: data-store
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8081
```

Compared to the API service, the data store service requires a ClusterRoleBinding resource to be created which associates the 
data-store Service Account to the `system:auth-delegator` ClusterRole.

Go back to the terminal session where you deployed the data store service and inspect the logs:

```terminal|command=1|title=bash
kubectl --namepsace data-store logs <data-store-pod-id>
2020/08/21 09:09:10 v1.TokenReviewStatus{Authenticated:true,
User:v1.UserInfo{Username:"system:serviceaccount:data-store:data-store",
UID:"24ae6734-9ca1-44d8-af93-98b6e6f8da17", Groups:[]string{"system:serviceaccounts",
"system:serviceaccounts:api", "system:authenticated"}, Extra:map[string]v1.ExtraValue(nil)},
Audiences:[]string{"api"}, Error:""}
```

The output is a Go structure version of the JSON response you saw earlier.

Thus, you see how API service reads the Service Account Token and passes it onto its request to the data store service as a way to authenticate itself.

The data store service retrieves the token and then checks with the Kubernetes API whether it is valid or not.

If valid, the data store service allows the request from the API service to be processed.

The implementation works well, but it suffers from three drawbacks:

## One Secret for every Service Account

When you create a Service Account, Kubernetes creates a companion Secret object with a token.

You use the token to authenticate with the Kubernetes API.

In this example, you can inspect the Service Account and find the token with:

```terminal|command=1|title=bash
kubectl --namespace api describe serviceaccount api
Name:                api
Namespace:           api
Mountable secrets:   api-token-ttr8q
Tokens:              api-token-ttr8q
```

Which matches the Secret object in the namespace:

```terminal|command=1|title=bash
kubectl get secrets --namespace api
NAME                  TYPE
api-token-ttr8q       kubernetes.io/service-account-token
default-token-vppc9   kubernetes.io/service-account-token
```

**However, any workload that can read a secret in a namespace can also read the service account tokens in the same namespace.**

In other words, you could have any other Pod using the same Service Account to authenticate against the Kubernetes API — effectively impersonating someone else.

Unfortunately, there's no mechanism to restrict access to a subset of Secrets in a namespace.

**The application has access to all of them, or none of them.**

You could create a namespace for every app and store a Service Account with it, but that's often overkilled.

## Long live the Service Account's token

The tokens associated with a Service Account are long-lived and do not expire.

In other words, once you have access to one of them, you can use it forever (or until the administrator deletes the secret associated with the token).

You could manually rotate identities by manually removing and re-assigning Service Accounts.

If if sounds like a lot of work, it's because it is.

### 3. No audience binding of the tokens

As a cluster administrator, you cannot associate a token with a specific audience.

Anyone with access to the Service Account token can authenticate with the Kubernetes API and is authorised to communicate with any other service running inside the cluster.

The destination service doesn't have any way to verify whether the token it was presented with was meant for itself at all.

As an example, imagine buying a ticket for a flight from London to New York.

If you buy a Ticket from British Airways, you can't use the ticket to board a Virgin Atlantic flight.

Your ticket is bound to a particular audience (British Airways).

But in the case of Kubernetes, the same ticket (token) can be used with any airline (audience).

You could solve both challenges by implementing solutions such as mutual TLS or using a JWT based solution with a central authority server.

**However, in Kubernetes, you can use the Service Account Token Volume Projection feature to create time-bound and audience-specific Service Account Tokens which do not persist in the cluster store.**

The Kubernetes API server acts as the central authority server and you don't have to worry about expiring tokens.

This feature was introduced in Kubernetes 1.12 and gained further improvements in 1.13 and provides a more secure alternative to workload-specific service accounts.

In fact, this will be promoted to a GA feature in the upcoming Kubernetes 1.20 release.

In the next part of the article, you will re-implement the same code for authenticating apps using the Service Account Token Volume Projection.

It's a good idea to cleanup the two namespaces with:

```terminal|command=1,3|title=bash
kubectl delete namespace api
namespace "api" deleted
kubectl delete namespace data-store
namespace "data-store" deleted
```

## Inter-Service authentication using Service Account Token Volume Projection

The Service Account Tokens made available to workloads via the Service Account Token Volume Projection (`ProjectedServiceAccountToken`) are time-limited, audience bound and are not associated with secret objects.

If a Pod is deleted or the Service Account is removed, these tokens become invalid, thus preventing any misuse.

A `serviceAccountToken` volume projection is one of the `projected` volume types.

> [A projected volume is a volume that mounts several existing volumes into the same directory.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-projected-volume-storage/#configure-a-projected-volume-for-a-pod)

When this volume type is added to a Pod, the Service Aaccount Token is mounted on the filesystem — in the same way that the Service Account Tokens are mounted.

_There's a difference though._

**The kubelet automatically rotates the token when it's about to expire.**

In addition, you can configure the path at which you want this token to be available.

Let's see how you can amend the API component to include the Service Account Token Volume Projection.

### The API component

You can read the Service Account Token mounted via volume projection with:

```go|title=main.go
b, err := ioutil.ReadFile("/var/run/secrets/tokens/api-token")
serviceToken = string(b)
```

Note how the path to the Service Account Token is different from the previous case (i.e. it used to be `/var/run/secrets/kubernetes.io/serviceaccount/token`).

Since the Service Account Token Volume Projection feature relies on the token being refreshed periodically by the kubelet, it is recommended to re-read the token every 5 minutes in the app.

You can accomplish this via [a _ticker_ in Go](https://gobyexample.com/tickers) as follows:

```go|title=main.go
ticker := time.NewTicker(300 * time.Second)
done := make(chan bool)

go func() {
		for {
				select {
			case <-done:
					return
			case <-ticker.C:
					readToken()
			}
		}
}()
```

The `readToken()` function reads the file, `/var/run/secrets/tokens/api-token` and sets the global variable, `serviceToken` to the token value.

_If you are not familiar with Go's ticker, think of a ticker as a background thread which runs a function at periodic intervals_.

You can find the entire application code in `service_accounts_volume_projection/api/main.go`.

_Now, let's deploy this service._

You will use that image in the deployment manifest (`service_accounts_volume_projection/api/deployment.yaml`):

```yaml|highlight=28-36|title=deployment.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: api
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: api
  namespace: api
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      serviceAccount: api
      volumes:
        - name: api-token
          projected:
            sources:
            - serviceAccountToken:
                path: api-token
                expirationSeconds: 600
                audience: data-store
      containers:
      - name: app
        image: amitsaha/k8s-sa-volume-demo-api:sa-2
        env:
        - name: LISTEN_ADDR
          value: ":8080"
        - name: DATA_STORE_CONNSTRING
          value: "http://app.data-store.svc.cluster.local"
        ports:
        - containerPort: 8080
        volumeMounts:
          - mountPath: /var/run/secrets/tokens
            name: api-token
---
apiVersion: v1
kind: Service
metadata:
  name: app
  namespace: api
spec:
  type: NodePort
  selector:
    app: api
  ports:
    - port: 8080
      targetPort: 8080
```

A volume named `api-token` of `projected` type will be created with the source being `serviceAccountToken`.

The volume defines three additional properties:

1. The `path` indicates the file where the token will be available inside the configured volume.
1. The `audience` field specifies what the intended audience for the token is (if not specified, it defaults to `api`).
1. The `expirationSeconds` indicate how long a token is valid for - the minimum is 600 seconds or 10 minutes.

Please notice how the `audience` field specifies that this Service Account Token is allowed to communicate only with services that identify themselves as a `data-store`.

If you don't include `data-store` as an audience in the Secret store component, the API won't be able to talk to it — it's not its audience!

> Note that if you are deploying a Pod to use this feature in a cluster with Pod Security Policies enforced, [you will need to ensure that the `projected` volume type is allowed.](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems)

You can create a new API deployment with:

```terminal|command=1|title=bash
kubectl apply -f service_accounts_volume_projection/api/deployment.yaml
namespace/api created
serviceaccount/api created
deployment.apps/app created
service/app created
```

Retrieve the URL of the API service with:

```terminal|command=1|title=bash
minikube --namespace api service app --url
http://192.168.99.101:31541
```

You can issue a request with:

```terminal|command=1|title=bash
curl http://192.168.99.101:31541
Get "http://app.data-store.svc.cluster.local": dial tcp: lookup app.data-store.svc.cluster.local: no such host
```

This is expected as the data store is not yet deployed.

Keep the terminal open.

Next, let's modify and deploy the data store service.

### Data Store

The token review payload for the data store will now be as follows:

```go|title=main.go
tr := authv1.TokenReview{
	pec: authv1.TokenReviewSpec{
		Token:	clientId,
		Audiences:	[]string{"data-store"},
	},
}
```

Now, in the TokenReview object, the data store explicitly passes `data-store` as the audience for the token it is asking the API to review.

If the token doesn't include `data-store` as an audience, the Token Review API will not authenticate the request.

In other words, the data store service can assert the identity of the caller and validate that the incoming request token was meant for the data store service.

You can find the entire application code in `service_accounts_volume_projection/data-store/main.go`.

_Next, let's deploy this service._

You can create the deployment with:

```terminal|command=1|title=bash
kubectl apply -f service_accounts_volume_projection/data-store/deployment.yaml
namespace/data-store created
serviceaccount/data-store created
clusterrolebinding.rbac.authorization.k8s.io/role-tokenreview-binding created
deployment.apps/app created
service/app created
```

Let's check if the service is up and running correctly:

```terminal|command=1|title=bash
kubectl --namespace data-store describe service app
Name:           app
Namespace:      data-store
Labels:         <none>
Selector:       app=data-store
Type:           ClusterIP
IP:             10.106.239.243
Port:           <unset>  80/TCP
TargetPort:     8081/TCP
Endpoints:      172.18.0.5:8081
```

The value of `Endpoints` in the output above tells us that service is now up and running.

Now, use `curl` to make a request to the API service again:

```terminal|command=1|title=bash
curl http://192.168.99.101:31541
Hello from data store. You have been authenticated
```

You should inspect the logs of the Secret store with:

```terminal|command=1|title=bash
kubectl --namespace data-store logs <pod id>
(v1.TokenReviewStatus) &TokenReviewStatus{Authenticated:true,
User:UserInfo{Username:system:serviceaccount:api:api,
UID:ec7c304f-9722-4d1b-9f67-d3ce32cd8d4c,
Groups:[system:serviceaccounts system:serviceaccounts:api system:authenticated],
Extra:map[string]ExtraValue{authentication.kubernetes.io/pod-name:
[app-65d954658c-dbbr5],
authentication.kubernetes.io/pod-uid: [1b37a3f4-54f1-419c-b435-affce3f4a0f3],},},
Error:,Audiences:[data-store],}
```

In you switch to the logs of the API service, you should see the following lines that demonstrate when the Service Account Token is re-read from the filesystem:

```terminal|title=bash
2020/08/26 05:03:43 Refreshing service account token
2020/08/26 05:13:42 Refreshing service account token
2020/08/26 05:18:42 Refreshing service account token
```

## Summary

Service Account Token Volume projection allows you to associate non-global, time-bound and audience bound service tokens to your Kubernetes workloads.

In this article you saw an example of using it for authentication between your services and how it is a better alternative to using the default Service Account Tokens.

Kubernetes native software such as [Linkerd](https://github.com/linkerd/linkerd2/issues/3260) and [Istio](https://istio.io/latest/blog/2019/trustworthy-jwt-sds/) are embracing it for their internal communication and managed Kubernetes service providers such as [GKE](https://cloud.google.com/community/tutorials/gke-workload-id-clientserver) and [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts-technical-overview.html) are using this projection volume type to enable more robust pod identity systems.

## Learn more

- [Kubernetes Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [Kubernetes Service Account Token Volume Projection](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-token-volume-projection)
