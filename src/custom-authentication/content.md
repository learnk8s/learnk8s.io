Kubernetes provides support for multiple user authentication methods out-of-the-box:

- [X.509 client certificates](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#x509-client-certs)
- [Bearer tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-token-file)
- [OpenID Connect](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)

> Earlier versions of Kubernetes also supported [HTTP basic authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file), however, this authentication method has been [deprecated in Kubernetes v1.16](https://v1-16.docs.kubernetes.io/docs/setup/release/notes/#deprecations-and-removals).

However, Kubernetes also provides you the means to integrate any authentication method you like.

In this article, you will learn how you can enable [LDAP authentication](https://connect2id.com/products/ldapauth/auth-explained) for your Kubernetes cluster.

This means that the users will be able to authenticate to your Kubernetes cluster by using their existing username and password from a [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) directory.

## How authentication works

## Setting up an LDAP directory

As a first step, you will set up an LDAP directory with some users in it.

You can look at this LDAP directory as your pre-existing central user management system that you use for the authentication of various applications.

This tutorial assumes that you have a [Google Cloud Platform (GCP)](https://cloud.google.com/) account, since you will use GCP as the underlying infrastructure.

> If you [create a new GCP account](https://cloud.google.com/), you get USD 300 credits that you can use for this tutorial.

Start by creating a new [VPC network and subnet](https://cloud.google.com/vpc/docs/vpc) for the components of your system:

```terminal|command=1,2|title=bash
gcloud compute networks create my-net --subnet-mode custom
gcloud compute networks subnets create my-subnet --network my-net --range 10.0.0.0/16
```

Next, create a compute instance for the LDAP directory in the created subnet:

```terminal|command=1-5|title=bash
gcloud compute instances create authn \
  --subnet my-subnet \
  --machine-type n1-standard-1  \
  --image-family ubuntu-1804-lts \
  --image-project ubuntu-os-cloud
```

GCP creates a default firewall rule for all compute instances that allows all outgoing traffic but blocks all incoming traffic (no matter whether it originates from within or outside the VPC network).

So, to make your instance reachable, you have to create a firewall rule that allows certain types of incoming traffic:

```terminal|command=1-5|title=bash
gcloud compute firewall-rules create allow-internal-and-admin \
  --network my-net \
  --allow icmp,tcp,udp \
  --source-ranges 10.0.0.0/16,$(curl checkip.amazonaws.com)
```

The above command defines a firewall rule for all the instances in your VPC network that allows all incoming traffic which originates either from within the VPC network (specified by the 10.0.0.0/16 range) or from your local machine.

> If the public IP address of your local machine ever changes, you can update the firewall rule with `gcloud compute firewall-rules update`.

At this point, you should be able to connect to your instance with SSH:

```terminal|command=1|title=bash
gcloud compute ssh root@authn
```

You should now be logged in to your instance as root.

_The next step is to install OpenLDAP on this instance._

OpenLDAP is available in the [`slapd`](https://packages.ubuntu.com/bionic/slapd) Debian package, but befor you install it, you should do the following configurations:

```terminal|command=1-6|title=bash
cat <<EOF | debconf-set-selections
slapd slapd/password1 password adminpassword
slapd slapd/password2 password adminpassword
slapd slapd/domain string mycompany.com
slapd shared/organization string mycompany.com
EOF
```

The above configurations set the password for the default admin user of the LDAP directory and the domain suffix for your LDAP database (which means that your LDAP entries will be hierarchically saved as nodes under `*.mycompany.com`).

Now, you can install the `slapd` package:

```terminal|command=1,2|title=bash
apt-get update
apt-get install -y slapd
```

OpenLDAP should now be up and running on your compute instance, so you can log out from it:

```terminal|command=1|title=bash
exit
```

_Back on your local machine, let's test if OpenLDAP is correctly set up and accessible._

You can do this by listing the current content of your LDAP directory.

To make LDAP queries (more precisely, [LDAP Search](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Search_and_Compare) operations), you can use a tool called `ldapsearch`.

If you're on macOS, then `ldapsearch` shoud be installed by default; if you're on Linux, you can install it with:

```terminal|command=1|title=bash
sudo apt-get install ldap-utils
```

With `ldapsearch` installed, execute the following command:

```terminal|command=1|title=bash
ldapsearch -LLL -H ldap://<IP> -x -D cn=admin,dc=mycompany,dc=com -w adminpassword -b dc=mycompany,dc=com
```

> Please replace `<IP>` with the _external IP address_ of your compute instance, which you can find it out with `gcloud compute instances list`.

The above command might look cryptic, but it's the canonical way to interact with an LDAP directory, so here are some explanations:

- The `-LLL` option simplifies the output format be removing comments and other metadata
- The `-H` option specifies the URL of the LDAP directory
- The `-x`, `-D`, and `-w` options specify the authentication information for connecting to the LDAP directory. The `-D` option specifies the user to connect as and the `-w` option specifies the corresponding password (note that this is the default admin user whose password you defined in the initial configuration before you installed the `slapd` package).
- The `-b` option specifies the search base, that is, the node in the LDAP directory under which the search is applied (in the above command, this is the root node, since the suffix of your LDAP database is `mycompany.com`).

In general, an LDAP directory is a hierarchical database and a node is identified by a so-called _distinguished name (DN)_ consisting of a sequence of attribute types and values:

- `dc` is the _domain component_ attribute type and `dc=mycompany,dc=com` specifies the node `mycompany.com` (which is the root node).
- `cn` is the _common name_ attribute type and `cn=admin,dc=mycompany,dc=com` specifies the node `admin.mycompany.com` (which is just under the root node).

In any case, the output of the command should look something like that:

```
dn: dc=mycompany,dc=com
objectClass: top
objectClass: dcObject
objectClass: organization
o: mycompany.com
dc: mycompany

dn: cn=admin,dc=mycompany,dc=com
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: admin
description: LDAP administrator
userPassword:: e1NTSEF9bHF4NGljTGlyL1BDSkhiYVVFMXcrQ2ZpM045S2laMzc=
```

These are the two LDAP entries that currently exist in your LDAP directory (note that the second one is the LDAP admin user).

_That's great — your LDAP directory is up and running and accessible from your local machine!_

## Creating an LDAP user

An empty LDAP directory is not of much use, so let's create a user in it.

The first user that you want to manage in your LDAP directory is Alice:

- First name: Alice
- Last name: Wonderland
- Username: `alice`
- Password: `alicepassword`
- Groups: `dev`

All in all, this defines a username of `alice`, a password of `alicepassword` and a group membership in the `dev` group for Alice Wonderland.

To store this information in the LDAP directory, you have to express it in the [LDAP Data Interchange Format (LDIF)](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format) as follows follows:

```title=alice.ldif
dn: cn=alice,dc=mycompany,dc=com
objectClass: top
objectClass: inetOrgPerson
cn: alice
gn: Alice
sn: Wonderland
userPassword: alicepassword
ou: dev
```

Go on and save the above in a file named `alice.ldif`.

In general, an LDIF entry consists of a _distinguished name_ (`dn`, here `cn=alice,dc=mycompany,dc=com`)  and a set of attributes; the attribute types in the above entry are:

- `objectClass`: defines the type of the entry and which other attributes are allowed and mandatory; the [`inetOrgPerson`](https://tools.ietf.org/html/rfc2798) object class is commonly used for storing user information
_ `cn`: is the _common name_ attribute and is commonly used for the username
- `gn`: is the _given name_ attribute
- `sn`: is the _surname_ attribute
- `userPassword`: the user's password
- `ou`: is the _organisational unit_ attribute and is commonly used for defining grou memberships

To add an entry to an LDAP directory (through the [LDAP Add](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Add) operation), you can use the `ldapadd` tool.

> `ldapadd` comes bundled with `ldapsearch` and other LDAP client tools, so you should have it installed on your system by now.


You can create the entry for Alice tha you just defined with the following command (again, replace `<IP>` with the external IP address of your compute instance):

```terminal|command=1|title=bash
ldapadd -H ldap://<IP> -x -D cn=admin,dc=mycompany,dc=com -w adminpassword -f alice.ldif
```

The output should say something like:

```
adding new entry "cn=alice,dc=mycompany,dc=com"
```

_Sounds like the entry for Alice has been added!_

But to be sure, let's query the LDAP directory again to see if the entry is really there.

In particular, you are looking for an entry with a `cn` attribute (username) of `alice` — here's how you can query for it:

```terminal|command=1-2|title=bash
ldapsearch -LLL -H ldap://<IP> -x -D cn=admin,dc=mycompany,dc=com -w adminpassword -b dc=mycompany,dc=com cn=alice
```

> The last argument in the above command defines the _filter_ for the [LDAP Search](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Search_and_Compare) request. It causes the query to return only those entries that match the filter expression.

The output should be:

```
dn: cn=alice,dc=mycompany,dc=com
objectClass: top
objectClass: inetOrgPerson
cn: alice
givenName: Alice
sn: Wonderland
userPassword:: YWxpY2VwYXNzd29yZA==
ou: dev
```

_Bingo!_

That's precisely the entry for Alice that you just created.

> The password in the output is [Base64](https://en.wikipedia.org/wiki/Base64) encoded. You can decode it with `echo YWxpY2VwYXNzd29yZA== | base64 -D` which results in `alicepassword`.

Let's summarise what you have at this point:

- You have an LDAP directory containing an entry for the user Alice
- The entry defines that Alice has a username of `alice` and a password of `alicepassword`
- These are Alice's credentials that she might use with various applications in your organisation
- This works by Alice presenting these credentials to the application, and the application verifying them with the LDAP directory 

And here we come to the goal of this tutorial: you want to enable this type of authentication for your future Kubernetes cluster too.

In particular, Alice should be able to authenticate to Kubernetes with her username `alice` and password `alicepassword` from the LDAP directory.

This has great advantages:

- No need for Alice to remember new credentials just for Kubernetes — Alice can just reuse her existing credentials
- No need for an admin to manage a separate user account for Alice on the Kubernetes cluster — all user information is managed centrally in the LDAP directory
- If some user information about Alice changes (such as the password), it has to be updated only once — in the LDAP directory — and the changes are immediately reflected across all the applications that use LDAP authentication

_In the next section, you will start implementing the binding of Kubernetes to your LDAP directory._

## Creating a webhook token authentication service

You will implement LDAP authentication for your Kubernetes cluster by the means of the [Webhook Token authentication plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication).

Here is how it works:

![Webhook Token authentication plugin](assets/webhook-token-authentication-plugin.svg)

The Webhook Token authentication plugin requires requests to the Kubernetes API to include an [HTTP bearer token](https://swagger.io/docs/specification/authentication/bearer-authentication/).

> An HTTP bearer token is included as an HTTP header of the form `Authorization: Bearer <TOKEN>`.

When it receives such a request, the Webhook Token authentication plugin extracts the bearer token and submits it to the configured _webhook token authentication service_.

This authentication service is provided by the cluster administrator (that is, by you) and it may run either inside or outside the cluster — it is _not_ part of Kubernetes.

The task of the authentication service is to verify the received token and return an appropriate response to the Kubernetes API server.

In the case that the token is valid, the response must include the _user info_ data fields.

Based on this response, the Webhook Token authentication plugin then either accepts or rejects the request.

As you can see, the webhook token authentication service may implement any logic you like and that's why the Webhook Token authentication plugin can be used to bind any desired authentication method to the cluster.

_So, how do you implement LDAP authentication with the Webhook Token authentication plugin?_

Here's the solution that you will use:

![LDAP authentication](assets/ldap-authentication.svg)

The HTTP bearer token that users include in their requests has the following form:

```
username:password
```

Where `username` and `password` are the username and password of a user from the LDAP directory, respectively.

The authentication service extracts the `username` and `password` parts from this token and queries the LDAP directory for a user with the given username and password.

_This is a similar LDAP query to the one you previously did with `ldapsearch`._

If such a user exists in the LDAP directory, then the token is valid, else it is invalid.

> The _user info_ that the authentication service must return in the case that the token is valid is also obtained from the corresponding LDAP user entry.

At this point, you have already created the LDAP directory


## Deploying the webhook token authentication service

Compile the webhook token authentication service with:

```terminal|command=1|title=bash
GOOS=linux GOARCH=amd64 go build authn.go
```

Upload the resulting binary to the compute instance:

```terminal|command=1|title=bash
gcloud compute scp authn root@authn:
```

Log in to the compute instance

```terminal|command=1|title=bash
gcloud compute ssh root@authn
```

On the instance, create a private key and certificate for the authentication service:

```terminal|command=1|title=bash
openssl req -x509 -newkey rsa:2048 -nodes -subj "/CN=localhost" -keyout key.pem -out cert.pem
```

Now, launch the service with:

```terminal|command=1|title=bash
./authn localhost key.pem cert.pem &>/var/log/authn.log &
```

Your authentication service should now be up and running on the compute instance.

> You can check the logs of your service with `tail -f /var/log/authn.log` and you can terminate it with `pkill authn` (for example, if you want to restart it).

Log out from the compute instance:

```terminal|command=1|title=bash
exit
```

Let's test if your authentication service works as expected by submitting it a sample TokenReview object.

Save the following in a file:

```json|title=tokenreview.json
{
  "apiVersion": "authentication.k8s.io/v1beta1",
  "kind": "TokenReview",
  "spec": {
    "token": "alice:alicepassword"
  }
}
```

Now, submit this TokenReview object to your authentication service with:

```terminal|command=1|title=bash
curl -k -X POST -d @tokenreview.json https://<IP>
```

> Please replace `<IP>` with the _external IP address_ of your compute instance.

You should get back a JSON object of the following form:

```json
{
  "kind": "TokenReview",
  "apiVersion": "authentication.k8s.io/v1beta1",
  "metadata": {
    "creationTimestamp": null
  },
  "spec": {
    "token": "alice:alicepassword"
  },
  "status": {
    "authenticated": true,
    "user": {
      "username": "alice",
      "uid": "alice",
      "groups": [
        "dev"
      ]
    }
  }
}
```

The JSON output that you get from the above command is compressed on a single line — for a more readable formatting, as shown above, you can pipe the output of the command to [`jq`](https://stedolan.github.io/jq/):

```terminal|command=1|title=bash
curl -k -X POST -d @tokenreview.json https://<IP> | jq
```

## Creating a Kubernetes cluster

Create a compute instance for the single-node Kubernetes cluster:

```terminal|command=1-5|title=bash
gcloud compute instances create k8s \
  --subnet my-subnet \
  --machine-type e2-medium \
  --image-family ubuntu-1804-lts \
  --image-project ubuntu-os-cloud
```

Log in to the instance:

```terminal|command=1|title=bash
gcloud compute ssh root@k8s
```


Since you will install Kubernetes with kubeadm, you have to install kubeadm on the instance.

To install kubeadm, you first have to add the APT package repository from Google that distributes the kubeadm package:

```terminal|command=1,2,3,4|title=bash
apt-get update
apt-get install -y apt-transport-https curl
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" >/etc/apt/sources.list.d/kubernetes.list
```

Now, you can install kubeadm, and since Kubernetes depends on Docker, you have to install Docker too:

```terminal|command=1,2|title=bash
apt-get update
apt-get install -y docker.io kubeadm
```

You can verify that kubeadm and Docker have been correctly installed with:

```terminal|command=1,2|title=bash
kubeadm version
docker version
```

_The next task is to install Kubernetes with kubeadm._

The crucial point here is that you have to set up the API server to use the Webhook Token authentication plugin, as well as pointing the Webhook Token authentication plugin to the authentication service that you deployed before.

This is done by setting the [`--authentication-token-webhook-config-file`](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) command-line flag of the API server to a configuration file (whose format is described in the [Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication)) that describes the location of the webhook token authentication service.

Let's start by creating this configuration file on the compute instance:

```yaml|title=/root/authn-config.yaml
apiVersion: v1
kind: Config
clusters:
  - name: authn
    cluster:
      server: https://<AUTHN-INTERNAL-IP>
      insecure-skip-tls-verify: true
users:
  - name: kube-apiserver
contexts:
- context:
    cluster: authn
    user: kube-apiserver
  name: authn
current-context: authn
```

> In the above file, please replace `<AUTHN-INTERNAL-IP>` with the _internal IP address_ of the compute instance hosting your authentication service, which you can find out by running `gcloud compute instances list` on your local machine.

Note that the configuration for the webhook token authentiation service, somewhat peculiarly, uses the [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file format:

- The `clusters` section refers to the webhook token authentication service
- The `users` section refers to the API server

So, in this scenario, the webhook token authentication service is the "cluster" and the API server is the "user" — after all, a kubeconfig file specifies how to access a remote service, and from the point of view of the API server, the webhook token authentication service is just a remote service.

The crucial part of this configuration file is the `server` field, which defines the URL of the webhook token authentication service.

Note also that the `insecure-skip-tls-verify` field is set to `true`, which causes the API server to omit the verification of the authentication service's certificate (this is similar to setting the `-k` option of `curl`) — this is necessary because you're currently using a simple self-signed certificate for your authentication service that couldn't be verified by the API server.

_The next step is to get kubeadm to pass this configuration file to the `--authentication-token-webhook-config-file` command-line flag of the API server._

To do so, you have to create yet another configuration file — namely, a [kubeadm configuration file](https://pkg.go.dev/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2?tab=doc) of type [ClusterConfiguration](https://pkg.go.dev/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2?tab=doc#ClusterConfiguration).

Here's the beginning of this configuration file:

```yaml|highlight=5|title=kubeadm-config.yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
apiServer:
  extraArgs:
    authentication-token-webhook-config-file: /etc/authn-config.yaml
```

The highlighted line above causes kubeadm to set the [`--authentication-token-webhook-config-file`](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) command-line flag of the API server to point to the authentication service configuration file that you just created above.

However, that's not enough: kubeadm launches the API server as a Pod, and thus, it can't access files on the host file system.

To make the configuration file accessible to the API server, you have to mount it as a volume into the API server Pod:

```yaml|highlight=6-9|title=kubeadm-config.yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
apiServer:
  extraArgs:
    authentication-token-webhook-config-file: /etc/authn-config.yaml
  extraVolumes:
    - name: authentication-token-webhook-config-file
      mountPath: /etc/authn-config.yaml
      hostPath: /root/authn-config.yaml
```

The above setting adds a volume to the API server Pod that mounts the `/root/authn-config.yaml` file of the host file system as `/etc/authn-config.yaml` in the API server Pod, where it can be accessed by the API server.

_That's all the configuration that you need for setting up the Webhook Token authentication plugin._

However, for convenience, let's add one last setting to the kubeadm configuration file:

```yaml|highlight=10-11|title=kubeadm-config.yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
apiServer:
  # ...
  certSANs:
    - <K8S-EXTERNAL-IP>
```

> Please replace `<K8S-EXTERNAL-IP>` with the _external IP address_ of your Kubernetes compute instance. You can find it out by running `curl -s checkip.amazonaws.com` on the compute instance.

This adds the external IP address of your Kubernetes node as a subject alternative name (SAN) to the API server certificate — this will allow you to properly access the Kubernetes cluster from your local machine via through external IP address.

_Now, everything is prepared to start the installation of Kubernetes!_

You can install Kubernetes by running the following [`kubeadm init`](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/) command:

```terminal|command=1|title=bash
kubeadm init --config kubeadm-config.yaml
```

Since you're creating a single-node cluster, that's all you have to do — you don't need to run any further kubeadm commands on other nodes.

However, since your master node acts at the same time as a worker node, you have remove its `NoSchedule` [taint](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) to allow workload Pods to be scheduled to the master node:

```terminal|command=1-2|title=bash
kubectl --kubeconfig /etc/kubernetes/admin.conf \
  taint node k8s node-role.kubernetes.io/master:NoSchedule- 
```

The final step is to install a CNI plugin in your cluster (which is not done automatically by kubeadm).

You can install the [Cilium](https://cilium.io/) CNI plugin as follows:

```terminal|command=1-2|title=bash
kubectl --kubeconfig /etc/kubernetes/admin.conf \
  apply -f https://raw.githubusercontent.com/cilium/cilium/1.7.2/install/kubernetes/quick-install.yaml
```

> Different CNI plugins have different requirements. Cilium works very well in the current context.

You can now watch all the system Pods of your cluster coming alive:

```terminal|command=1-2|title=bash
kubectl --kubeconfig /etc/kubernetes/admin.conf \
  get pods --all-namespaces --watch
```

_Your Kubernetes cluster is complete!_

You can now log out from the compute instance:

```terminal|command=1|title=bash
exit
```

To be able to access the cluster from your local machine, you can download the automatically created kubeconfig file from the master node:

```terminal|command=1|title=bash
gcloud compute scp root@k8s:/etc/kubernetes/admin.conf .
```

There's a little change you have to make to this kubeconfig file though: the URL of the API server in the kubeconfig file currently contains the _internal_ IP address of the compute instance; however, to be able to access the cluster from _outside_ the VPC network, you have to replace this with the _external_ IP address of the compute instance:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf \
  config set-cluster kubernetes --server https://<K8S-EXTERNAL-IP>:6443
```

> Please replace `<K8S-EXTERNAL-IP>` with the external IP address of the master node.

You should now be all set ot access the cluster:

```terminal|command=1|title=bash
kubectl --kubeconfig admin.conf get pods --all-namespaces
```

_Congratulations — you just created a Kubernetes cluster from scratch!_

But you didn't just create an ordinary cluster — you configured it with a custom authentication method.

_It's time to test if this authentication method works as expected._

## Testing the custom authentication method

Remember that you have created a user named Alice with username `alice` and password `alicepassword` in the LDAP directory.

If your custom LDAP authentication method works as expected, then Alice should now be able to access the cluster with the following HTTP bearer token:

```
alice:alicepassword
```

Cluster access credentials are saved in the kubeconfig file and you can add an entry for Alice as follows:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf \
  config set-credentials alice --token alice:alicepassword
```

You also need to create a separate context for the credentials of Alice:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf \
  config set-context alice@kubernetes --cluster kubernetes --user alice
```

If you make a request now with this context, the following should happen:

- kubectl should include the token `alice:alicepassword` in the request
- The API server passes the token to your webhook token authentication service
- The authentication service queries the LDAP directory for a user with username `alice` and password `alicepassword`
- The authentication of the request succeeds

To see if your authentication service really gets invoked, log in to the compute instance that hosts the authentication service in a separate terminal window:

```terminal|command=1|title=bash-1
gcloud compute ssh root@authn
```

And stream the logs of the authentication service:

```terminal|command=1|title=bash-1
tail -f /var/log/authn.log
```

Back in the main terminal window, execute the following request:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf --context alice@kubernetes \
  get pods --all-namespaces
```

> Note that this request uses the kubeconfig context with Alice's credentials.

_Woohoo!_

The logs of the authentication service should print some additional lines, that means, the service was invoked!

> Note that if you repeat the request immediately, there won't be any new lines in the log of the authentication service. This is because the API server caches the response from the webhook token authentication service for a limited amount of time and reuses it for future request. By default, the cache duration is 2 minutes.

However, the response of the kubectl command is something like this:

```
Error from server (Forbidden): pods is forbidden: User "alice" cannot list resource "pods" in API group "" at the cluster scope
```

This response tells you two things:

- First, the request has successfully passed the _authentication_ stage: the user `alice` has been correctly identified
- Second, the request failed at the _authorisation_ stage: the user `alice` does not have permission to execute the [`list Pods`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#read-pod-v1-core) operation

Regarding the second point, Alice does not yet have any permissions at all — but you can easily change that by binding an [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) [_role_](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) to the user `alice` with a [_role binding_](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding).

You could either create your own role or reuse one of the [Kubernetes default roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles), such as `view`, `edit`, `admin`, and `cluster-admin`.

Let's bind the `cluster-admin` ClusterRole to the user `alice` with the following ClusterRolebinding:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf --context kubernetes-admin@kubernetes \
  create clusterrolebinding alice --clusterrole cluster-admin --user alice
```

> Note that the above command uses the kubeconfig context with the credentials of the default admin user that has been automatically created by kubeadm.

Now Alice _should_ have permissions for the `list Pods` operations.

Let's try to make a request as Alice again:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf --context alice@kubernetes \
  get pods --all-namespaces
NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   cilium-dhspr                       1/1     Running   0          54m
kube-system   cilium-operator-6568744949-w7b8r   1/1     Running   0          54m
kube-system   coredns-66bff467f8-dmspz           1/1     Running   0          55m
kube-system   coredns-66bff467f8-r6hjb           1/1     Running   0          55m
kube-system   etcd-k8s                           1/1     Running   0          55m
kube-system   kube-apiserver-k8s                 1/1     Running   0          55m
kube-system   kube-controller-manager-k8s        1/1     Running   0          55m
kube-system   kube-proxy-jxcq8                   1/1     Running   0          55m
kube-system   kube-scheduler-k8s                 1/1     Running   0          55m
```

_Wohoo!_

Alice has now full access to the cluster.

But let's do some more testing — assume that Alice uses a different password in her token than is saved in the LDAP directory.

Change the password in Alice's token in the kubeconfig file to `otheralicepassword`:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf \
  config set-credentials alice --token alice:otheralicepassword
```

Now, try to make another request as Alice:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf --context alice@kubernetes \
  get pods --all-namespaces
```

The response of the kubectl command should say something like:

```
error: You must be logged in to the server (Unauthorized)
```

That means, that the request could not be authenticated — which makes sense because the token is invalid.

_This is the message that everyone will see who tries to impersonate Alice but doesn't know her real password._

But now let's assume that Alice really wants to change her password to `otheraliceassword`.

Changing a user password is done by updating the user entry in the LDAP directory.

To do so, you have to create an LDAP modification specification in LDIF format:

```title=modify-password.ldif
dn: cn=alice,dc=mycompany,dc=com
changetype: modify
replace: userPassword
userPassword: otheralicepassword
```

You can then execute the corresponding [LDAP Modify](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Modify) request with the `ldapmodify` tool as follows:

```terminal|command=1-2|title=bash
ldapmodify -H ldap://<AUTHN-EXTERNAL-IP> -x -D cn=admin,dc=mycompany,dc=com -w adminpassword \
  -f modify-password.ldif
```

> Please replace `<AUTHN-EXTERNAL-IP>` with the external IP address of the `authn` compute instance.

Alice's password is now be centrally changed to `otheralicepassword` and should be valid immediately for all the applications that use LDAP authentication.

_Will this make the formerly rejected request with the token `alice:otheralicepassword` work?_

Let's test it:

```terminal|command=1-2|title=bash
kubectl --kubeconfig admin.conf --context alice@kubernetes \
  get pods --all-namespaces
NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   cilium-dhspr                       1/1     Running   0          80m
kube-system   cilium-operator-6568744949-w7b8r   1/1     Running   0          80m
kube-system   coredns-66bff467f8-dmspz           1/1     Running   0          80m
kube-system   coredns-66bff467f8-r6hjb           1/1     Running   0          80m
kube-system   etcd-k8s                           1/1     Running   0          80m
kube-system   kube-apiserver-k8s                 1/1     Running   0          80m
kube-system   kube-controller-manager-k8s        1/1     Running   0          80m
kube-system   kube-proxy-jxcq8                   1/1     Running   0          80m
kube-system   kube-scheduler-k8s                 1/1     Running   0          80m
```

_Bingo!_

Since Alice's password is now officially `otheralicepassword`, the token is valid and the request succeeds.




