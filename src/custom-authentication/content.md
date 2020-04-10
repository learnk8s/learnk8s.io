Kubernetes supports certain authentication methods out-of-the-box, such as X.509 client certificates, static HTTP bearer tokens, and [OpenID Connect](https://openid.net/) tokens.

_However, Kubernetes also provides the means to integrate a cluster with any desired authentication method and user management system._

This article explains how to do this by walking you through an example of setting [LDAP authentication](https://connect2id.com/products/ldapauth/auth-explained) for a Kubernetes cluster.

This means that users will be able to authenticate to Kubernetes with their existing credentials from a [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) directory.

![Kubernetes LDAP authentication](assets/intro.svg)

However, LDAP is used just as an example here — the goal of this article is to show the general principles for integrate custom authentication methods with Kubernetes.

_Think of [Kerberos](https://en.wikipedia.org/wiki/Kerberos%5f%28protocol%29), [Keycloak](https://www.keycloak.org/), [OAuth](https://en.wikipedia.org/wiki/OAuth), [SAML](https://en.wikipedia.org/wiki/SAML%5f2.0), custom certificates, custom tokens, and any kind of existing single-sign on infrastructure._

You can integrate all of them with Kubernetes!

And the principles for doing that are the same as those you will learn in this article.

_But before starting, let's briefly review the fundamentals of how the Kubernetes API is accessed._

## How access to the Kubernetes API is controlled

Every request to the Kubernetes API server has to pass through three stages to be accepted: **authentication**, **authorisation**, and **admission control**:

![Kubernetes API access](assets/kubernetes-api-access.svg)

Each stage has a well-defined purpose:

- [Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) checks whether the user is a legitimate user of the API and, if yes, establishes its user identity
- [Authorisation](https://kubernetes.io/docs/reference/access-authn-authz/authorization/) checks whether the identified user has permission to execute the requested API operation
- [Admission control](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) performs a variety of further checks on the request to enforce configurable cluster policies

At each stage, a request can fail, and only requests that successfully make it through all three stages are handled by the Kubernetes API.

The task of the authentication stage is to check whether a request does come from a legitimate user and to reject all requests that don't.

This is done by verifying some form of credentials in the request and establishing the identity of the user that these credentials belong to.

Internally, the authentication stage is organised as a sequence of authentication plugins:

![Authentication plugins](assets/authentication-plugins.svg)

Each authentication plugin implements a specific authentication method, and an incoming request is presented to each authentication plugin in sequence.

If any of the authentication plugins can successfully authenticate a request, then authentication is complete and the request proceeds to the authorisation stage.

If none of the authentication plugin can authenticate the request, the request is rejected with a [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) HTTP status code.

> Note that the [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) status code is a [long-standing misnomer](https://stackoverflow.com/a/6937030/4747193) as it indicates _authentication_ errors and **not** _authorisation_ errors. The HTTP status code for authorisation errors is [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403).

_So what authentication plugin do there exist?_

Well, first of all, Kubernetes does not provide an open plugin mechanism that allows you to develop your own plugins and simply plug them into Kubernetes.

Rather, Kubernetes provides a fixed set of in-tree authentication plugins that are compiled in the API server binary.

These plugins can be selectively enabled and configured with [command-line flags](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/9) when the API server is started up.

There are three "closed" authentication plugins that implementing specific authentication methods:

- [**X.509 Client Certs**](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#x509-client-certs)
- [**Static Token File**](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-token-file)
- [**OpenID Connect Tokens**](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)

> Up to and including Kubernetes v1.15, there was additionally the [Static Password File](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file) authentication plugin which implemented [HTTP basic authentication](https://tools.ietf.org/html/rfc7617), however, it was [deprecated in Kubernetes v1.16](https://v1-16.docs.kubernetes.io/docs/setup/release/notes/#deprecations-and-removals).

Furthermore, there are two "open-ended" authentication plugins that don't implement a specific authentication method but provide a framework for incorporating custom authentication logics:

- [**Webhook Token**](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication)
- [**Authenticating Proxy**](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authenticating-proxy)

The flexibility of the Kubernetes authentication mechanisms comes from these two open-ended authentication plugins.

_They allow to integrate any desired authentication method with a Kubernetes cluster._

And that's what the tutorial in the remainder of this article is about.

In this tutorial, you will use the [Webhook Token](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication) authentication plugin to implement [LDAP authentication](https://connect2id.com/products/ldapauth/auth-explained) for your Kubernetes cluster.

> As mentioned, LDAP authentication is just an example, and you can use the same principles for binding any other custom authentication method to Kubernetes.

_Let's get started!_

## Prerequisites

This tutorial assumes that you have a [Google Cloud Platform (GCP)](https://connect2id.com/products/ldapauth/auth-explained) account and a working installation of the [`gcloud`](https://cloud.google.com/sdk/gcloud) command-line tool on your system.

If you haven't a GCP account yet, you can [create a new one](https://cloud.google.com/), in which case you get USD 300 credits that you can use for this tutorial.

You can install `gcloud` by installing the [Google Cloud SDK](https://cloud.google.com/sdk/docs/) according to the [GCP documentation](https://cloud.google.com/sdk/docs/downloads-interactive).

The accumulated costs for the resources created in this tutorial are no more than 10 US cents per hour.

> Any charges will be subtracted from the USD 300 free credits if you create a new account.

## Setting up an LDAP directory

The first thing that you will do is creating an LDAP directory.

In general, [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) is a [directory service](https://en.wikipedia.org/wiki/Directory_service) and thus is in the same category of applications as the [Domain Name System (DNS)](https://en.wikipedia.org/wiki/Domain_Name_System) — in essence, it resolves names to values.

In practice, LDAP is often used to centrally store user information, such as personal data (name, address, email address, etc.), usernames, passwords, group affiliations and so on.

This information is then accessed by various applications for authentication purposes, such as validating the username and passwod supplied by the user.

_This is called [LDAP authentication](https://connect2id.com/products/ldapauth/auth-explained)._

One of the most popular LDAP server implementations is [OpenLDAP](https://www.openldap.org/), which is what you will use for this tutorial.

_You will deploy all the components for this tutorial to GCP, so let's start by creating the necessary GCP infrastructure._

Create a new GCP [VPC network and subnet](https://cloud.google.com/vpc/docs/vpc):

```terminal|command=1,2|title=bash
gcloud compute networks create my-net --subnet-mode custom
gcloud compute networks subnets create my-subnet --network my-net --range 10.0.0.0/16
```

Next, create a GCP [compute instance](https://cloud.google.com/compute/docs/instances) for the LDAP directory in the new subnet:

```terminal|command=1-5|title=bash
gcloud compute instances create authn \
  --subnet my-subnet \
  --machine-type n1-standard-1  \
  --image-family ubuntu-1804-lts \
  --image-project ubuntu-os-cloud
```

By default, GCP compute instances can't accept any traffic unless you define [firewall rules](https://cloud.google.com/vpc/docs/firewalls) that explicitly allow certain types of traffic.

In your case, traffic should be accepted from other instances in the same VPC network as well as from your local machine.

To realise this, create the following firewall rule:

```terminal|command=1-4|title=bash
gcloud compute firewall-rules create allow-internal-and-admin \
  --network my-net \
  --allow icmp,tcp,udp \
  --source-ranges 10.0.0.0/16,$(curl checkip.amazonaws.com)
```

> If the public IP address of your local machine ever changes, you can update the firewall rule with [`gcloud compute firewall-rules update`](https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/update).

Now, log in to your instance with SSH:

```terminal|command=1|title=bash
gcloud compute ssh root@authn
```

_Your next task is to install OpenLDAP on the instance._

OpenLDAP is distributed as the [`slapd`](https://packages.ubuntu.com/bionic/slapd) Debian package.

However, before you install this package, you should preset some of its settings, which will make the configuration easier:

```terminal|command=1-6|title=bash
cat <<EOF | debconf-set-selections
slapd slapd/password1 password adminpassword
slapd slapd/password2 password adminpassword
slapd slapd/domain string mycompany.com
slapd shared/organization string mycompany.com
EOF
```

The above command sets the password of the LDAP admin user to `adminpassword` and the base of your LDAP database to `mycompany.com`.

Now, you can install the `slapd` package:

```terminal|command=1,2|title=bash
apt-get update
apt-get install -y slapd
```

_That's it — OpenLDAP should now be installed, configured, and running on your instance._

Log out from the instance:

```terminal|command=1|title=bash
exit
```

_Let's test if you can access the LDAP directory from your local machine._

To do so, you can use the `ldapsearch` command-line tool which allows to make [LDAP Search](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Search_and_Compare) requests to an LDAP directory.

If you're on macOS, then `ldapsearch` shoud be already installed — if you're on Linux, you can install it with:

```terminal|command=1|title=bash
sudo apt-get install ldap-utils
```

With `ldapsearch` installed, run the following command:

```terminal|command=1-3|title=bash
ldapsearch -LLL -H ldap://<AUTHN-EXTERNAL-IP> \
  -x -D cn=admin,dc=mycompany,dc=com -w adminpassword \
  -b dc=mycompany,dc=com
```

> Please replace `<AUTHN-EXTERNAL-IP>` with the _external IP address_ of the `authn` compute instance that you just created. You can find it out with `gcloud compute instances list`.

The above command might look cryptic, but it's the canonical way to interact with an LDAP directory, so here are some explanations:

- The `-LLL` option simplifies the output format be removing comments and other metadata
- The `-H` option specifies the URL of the LDAP directory
- The `-x`, `-D`, and `-w` options provide authentication information for connecting to the LDAP directory: `-D` specifies the user to connect as and `-w` specifies the corresponding password (note that this user is the LDAP admin user whose password you defined in the initial `slapd` package configuration).
- The `-b` option specifies the search base, that is, the node in the LDAP directory under which the search is performed.

In general, an LDAP directory is a tree-like hierarchical database (like DNS): a node like `dc=mycompany,dc=com` (`dc` stands for _domain component_) can be read as `mycompany.com`; so a node like `cn=admin,dc=mycompany,dc=com` (`admin.mycompany.com`) is one level under `dc=mycompany,dc=com`.

In any case, the output of the command should look like that:

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

These are the two LDAP entries that currently exist in your LDAP directory.

An LDAP entry is like at a DNS record or a row in a relational database — the basic entity that contains the data.

In general, an LDAP entry consists of an identifier called the _distinguished name_ (`dn`) and a set of attributes, such as `objectClass`, `cn` (_common name_), `o` (_organisation_), or `userPassword`.

_All in all, the above result tells you that your LDAP directory is working!_

## Creating an LDAP user entry

Currently there's not much useful informatin in your LDAP directory, but let's change that.

Your goal is to create an entry for the user Alice in the LDAP directory.

The following information should be saved:

- First name: Alice
- Last name: Wonderland
- Username: `alice`
- Password: `alicepassword`
- Group: `dev`

To store this as an LDAP entry, you have to express it in the [LDAP Data Interchange Format (LDIF)](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format) format.

Here's how this looks like (save the following in a file named `alice.ldif`):

```title=alice.ldif
dn: cn=alice,dc=mycompany,dc=com
objectClass: top
objectClass: inetOrgPerson
gn: Alice
sn: Wonderland
cn: alice
userPassword: alicepassword
ou: dev
```

The above specification defines an entry with a _distinguished name_ (`dn`) of `cn=alice,dc=mycompany,dc=com` which will be the unique identifier of this entry in your LDAP directory.

Furthermore, the entry has a set of attributes:

- `objectClass` defines the type of the entry and dictates which other attributes are allowed or mandatory; [`inetOrgPerson`](https://tools.ietf.org/html/rfc2798) is a standard object class for storing user information.
- `gn` stands for _given name_
- `sn` stands for _surname_
- `cn` stands for _common name_ and is commonly used for the username
- `userPassword` is the user's personal password
- `ou` stands for _organisational unit_ and is commonly used to express affiliations

To create this entry in the LDAP directory, you can use the `ldapadd` command-line tool which allows you to make [LDAP Add](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Add) requests to an LDAP directory.

> If you have installed `ldapsearch`, you should also have `ldapadd` because they are bundled together.

Run the following command:

```terminal|command=1-2|title=bash
ldapadd -H ldap://<AUTHN-EXTERNAL-IP> \
  -x -D cn=admin,dc=mycompany,dc=com -w adminpassword -f alice.ldif
```
> Please replace `<AUTHN-EXTERNAL-IP>` with the _external IP address_ of the `authn` compute instance.

The output should say:

```
adding new entry "cn=alice,dc=mycompany,dc=com"
```

_Sounds good!_

To be sure that the entry has been added, let's try to query it witht the following command:

```terminal|command=1-3|title=bash
ldapsearch -LLL -H ldap://<AUTHN-EXTERNAL-IP> \
  -x -D cn=admin,dc=mycompany,dc=com -w adminpassword \
  -b dc=mycompany,dc=com cn=alice
```

Note that this command is similar to the one you issued previously, but it has an additional argument at the end (`cn=alice`) — this is the _search filter_ and it causes only those entries to be returned that match the filter.

In your case, the filter is `cn=alice` and there is currently only single entry with a `cn=alice` attribute in your LDAP directory — so the command should print the following output:

```
dn: cn=alice,dc=mycompany,dc=com
objectClass: top
objectClass: inetOrgPerson
givenName: Alice
sn: Wonderland
cn: alice
userPassword:: YWxpY2VwYXNzd29yZA==
ou: dev
```

That's precisely the entry that you just created, so it has indeed been added to the database.

> Note that the password in the output is [Base64-encoded](https://en.wikipedia.org/wiki/Base64), which is done automatically by LDAP. You can decode it with `echo YWxpY2VwYXNzd29yZA== | base64 -D` which results in `alicepassword`.

_Congratulations — you're successfully operating an LDAP directory!_

The real goal of all this is, of course, to enable LDAP authentication for your (future) Kubernetes cluster.

_Let's take care of this next!_

## Using the Webhook Token authentication plugin

In this tutorial, you will use the [Webhook Token](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication) authentication plugin to implement LDAP authentiation for your Kubernetes cluster.

Here is how the Webhook Token authentication plugin works:

![Webhook Token authentication plugin](assets/webhook-token-authentication-plugin.svg)

To be authenticatable by the Webhook Token authentication plugin, requests must include an [HTTP bearer token](https://swagger.io/docs/specification/authentication/bearer-authentication/).

> An HTTP bearer token is included in the `Authorization` header as as `Authorization: Bearer <TOKEN>`.

When the Webhook Token authentication plugin receives a request, it extracts the HTTP bearer token and submits it to an external webhook token authentication service.

The service is invoked with an HTTP POST request (hence the name "webhook") and the token is submitted in a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1-authentication-k8s-io) object in JSON format.

The webhook token authentication service is provided and operated by the cluster administrator and it must already exist when the API server is configured with the Webhook Token authentication plugin — it is completely independent from Kubernetes.

The task of the authentication service is to verify the received token and, in the case that the token is valid, establish the identify of the user who made the request.

This user identity is then returned as a [_user info_](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#userinfo-v1beta1-authentication-k8s-io) data structure to the API server (again in a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1-authentication-k8s-io) object).

_The crucial point is that the webhook token authentication service may implement any imaginable logic to verify the token — there are no limits._

That's why the Webhook Token authentication plugin allows to implement any desired authentication method.

**So, how does a concrete solution for LDAP authentication look like?**

Here's how:

![LDAP authentication](assets/ldap-authentication.svg)

In your solution, the HTTP bearer token has the following form:

```
username:password
```

Where `username` and `password` are the username and password of a user as saved in the LDAP directory.

> In a real-world scenario, you would most probably [Base64-encode](https://en.wikipedia.org/wiki/Base64) the token to correctly handle special characters in the token. For simplicity, this is omitted from this tutorial.

When this token is submitted to the webhook token authentication service, the service extracts the `username` and `password` parts of the token and verifies them by talking to the LDAP directory.

In particular, the authentication service performs an [LDAP Search](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Search_and_Compare) querying wether there exists a user entry with the given username and password:

- If yes, the token is valid, and the authentication service returns the identity of this user (_user info_) to the API server
- If no, the token is invalid and the authentication service returns a corresponding negative resopnse to the API server

You will implement this authentication service from scratch in [Go](https://golang.org/).

_So, the road to your Kubernetes cluster with LDAP authentication looks as follows:_

1. Implement and deploy the webhook token authentication service
1. Create the Kubernetes cluster and configure it to use the webhook token authentication service

_Let's tackle the implementation of the authentication service next._

## Implementing the webhook token authentication service

As mentioned, you will implement the authentication service in Go, so you have to make sure to have Go installed on your system.

If you're using macOS, you can install Go simply with:

```terminal|command=1|title=bash
brew install go
```

If you're using Linux, you can install the latest version of Go as described in the [Go documentation](https://golang.org/doc/install#tarball):

```terminal|command=1,2,3|title=bash
wget https://dl.google.com/go/go1.14.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.14.linux-amd64.tar.gz
echo "PATH=$PATH:/usr/local/go/bin" >>~/.bash_profile && . ~/.bash_profile
```

You can find the complete source code of the authentication service in the file [`authn.go`](https://github.com/learnk8s/authentication/blob/master/authn.go) in [this GitHub repository](https://github.com/learnk8s/authentication).

For the quickest result, you may just download this file to your local machine:

```terminal|command=1|title=bash
wget https://raw.githubusercontent.com/learnk8s/authentication/master/authn.go
```

Or you may type the code yourself to be sure you understand every part of it.

_Let's go through this source code file step by step._

The implementation starts with the following code:

```go|title=authn.go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-ldap/ldap"
	"io/ioutil"
	"k8s.io/api/authentication/v1"
	"log"
	"net/http"
	"os"
	"strings"
)
# ...
```

As usual in Go, a source file starts with the package declaration and the list of imported packages.

Note that one of the imported packages, `k8s.io/api/authentication/v1`, comes directly from the Kubernetes source code — this will prove very useful in your implementation.

> The ability to directly import packages from the Kubernetes source code is one of the main advantages of using Go for Kubernetes-related applications.

The next part looks as follows:

```go|title=authn.go
# ...
var ldapURL string

func main() {
	ldapURL = "ldap://" + os.Args[1]
	log.Printf("Using LDAP directory %s\n", ldapURL)
	log.Println("Listening on port 443 for requests...")
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServeTLS(":443", os.Args[3], os.Args[2], nil))
}
# ...
```

This is the `main` function of your implementation, and it sets up a web server serving HTTPS — besides that, it also ready the IP address of the LDAP directory from a command-line argument.

The bulk of the rest of the code will be the implementation of the HTTPS handler function.

This is the function that will handle the requests from the API server carrying the HTTP bearer token in a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1beta1-authentication-k8s-io) object.

Here's how it starts:

```go|title=authn.go
# ...
func handler(w http.ResponseWriter, r *http.Request) {

	// Read body of POST request
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		writeError(w, err)
		return
	}
	log.Printf("Receiving: %s\n", string(b))
# ...
```

The above code reads the body data of the received HTTPS POST request which is supposed to be a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1beta1-authentication-k8s-io) object in JSON format.

The following code deserialises this body data into a Go `TokenReview` structure:

```go|title=authn.go
# ...
	// Unmarshal JSON from POST request to TokenReview object
	var tr v1.TokenReview
	err = json.Unmarshal(b, &tr)
	if err != nil {
		writeError(w, err)
		return
	}
#...
```

Note that the `TokenReview` type comes from a [Kubernetes source code package](https://github.com/kubernetes/api/blob/master/authentication/v1/types.go), which makes it very easy for you to deserialise the JSON object.

The following code extracts the username and password parts from the HTTP bearer token in the TokenReview object:

```go|title=authn.go
# ...
	// Extract username and password from the token in the TokenReview object
	s := strings.SplitN(tr.Spec.Token, ":", 2)
	if len(s) != 2 {
		writeError(w, fmt.Errorf("badly formatted token: %s", tr.Spec.Token))
		return
	}
	username, password := s[0], s[1]
# ...
```

The following code makes an [LDAP Search](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Search_and_Compare) request to the LDAP directory:

```go|title=authn.go
# ...
	// Make LDAP Search request with extracted username and password
	userInfo, err := ldapSearch(username, password)
	if err != nil {
		writeError(w, fmt.Errorf("failed LDAP Search request: %v", err))
		return
	}
# ...
```
The request effectively queries the LDAP directory for a user entry with the given username and password.

> You will implement the `ldapSearch` function in a moment.

The following code prepares the response (which is also a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1beta1-authentication-k8s-io) object) to the API server:

```go|title=authn.go
# ...
	// Set status of TokenReview object
	if userInfo == nil {
		tr.Status.Authenticated = false
	} else {
		tr.Status.Authenticated = true
		tr.Status.User = *userInfo
	}
# ...
```

Finally, the following code sends the response back to the API server:

```go|title=authn.go
# ...
	// Marshal the TokenReview to JSON and send it back
	b, err = json.Marshal(tr)
	if err != nil {
		writeError(w, err)
		return
	}
	w.Write(b)
	log.Printf("Returning: %s\n", string(b))
}
```

That was the complete HTTPS handler function.

Related to this is also the following helper function for handling errors:

```go|title=authn.go
# ...
func writeError(w http.ResponseWriter, err error) {
	err = fmt.Errorf("Error: %v", err)
	w.WriteHeader(http.StatusInternalServerError) // 500
	fmt.Fprintln(w, err)
	log.Println(err)
}
# ...
```

The last part of the implementation is the `ldapSearch` function that makes the actual request to th LDAP directory.

That's how it starts:

```go|title=authn.go
# ...
func ldapSearch(username, password string) (*v1.UserInfo, error) {

	// Connect to LDAP directory
	l, err := ldap.DialURL(ldapURL)
	if err != nil {
		return nil, err
	}
	defer l.Close()
# ...
```

The above code establishes the initial connection to the LDAP directory.

The following code authenticates to the LDAP directory as the LDAP admin user:

```go|title=authn.go
# ...
	// Authenticate as LDAP admin user
	err = l.Bind("cn=admin,dc=mycompany,dc=com", "adminpassword")
	if err != nil {
		return nil, err
	}
# ...
```

Note that this corresponds to the `-x`, `-D`, and `-w` options that you used in your previous manual LDAP requests.

The following code performs the actual LDAP Search request:

```go|title=authn.go
# ...
	// Execute LDAP Search request
	searchRequest := ldap.NewSearchRequest(
		"dc=mycompany,dc=com",  // Search base
		ldap.ScopeWholeSubtree, // Search scope
		ldap.NeverDerefAliases, // Dereference aliases
		0,                      // Size limit (0 = no limit)
		0,                      // Time limit (0 = no limit)
		false,                  // Types only
		fmt.Sprintf("(&(objectClass=inetOrgPerson)(cn=%s)(userPassword=%s))", username, password), // Filter
		nil, // Attributes (nil = all user attributes)
		nil, // Additional 'Controls'
	)
	result, err := l.Search(searchRequest)
	if err != nil {
		return nil, err
	}
# ...
```

The crucial part is the _filter_ argument: it effectively searches for an LDAP entry with object class `intetOrgPerson`, and a `cn` and `userPassword` attribute corresponding to the provided username and password.

If such an entry exists, then the provided username and password, and thus the token, is valid — else it is not.

Finally, the following code inspects the response from the LDAP directory and constructs the return value of the function:

```go|title=authn.go
# ...
	// If LDAP Search produced a result, return UserInfo, otherwise, return nil
	if len(result.Entries) == 0 {
		return nil, nil
	} else {
		return &v1.UserInfo{
			Username: username,
			UID:      username,
			Groups:   result.Entries[0].GetAttributeValues("ou"),
		}, nil
	}
}
```

If the LDAP response includes an entry, the code constructs a `UserInfo` structure (which is als provided by the Kubernetes source code package) that describes the identity of the user and returns it to the calling function.

That's it — the complete code of your webhook token authentication service!

_The next step is to deploy the code._

## Deploying the webhook token authentication service

To deploy the service, you first of all have to compile the code:

```terminal|command=1|title=bash
GOOS=linux GOARCH=amd64 go build authn.go
```

This should produce a binary named `authn`.

You will deploy the service to the same GCP compute instance that also hosts the LDAP directory.

You can upload the binary to this compute instance as follows:

```terminal|command=1|title=bash
gcloud compute scp authn root@authn:
```

To launch the service, log in to the compute instance with SSH:

```terminal|command=1|title=bash
gcloud compute ssh root@authn
```

The service depends on a private key and certificate for serving HTTPS.

You can create both of them with the following command:

```terminal|command=1|title=bash
openssl req -x509 -newkey rsa:2048 -nodes -subj "/CN=localhost" -keyout key.pem -out cert.pem
```

> Note that the above command creates a self-signed certificate. This is fine for the purpose of this tutorial, but in a production scenario, you should use a certificate that's signed by a proper certificate authority (CA).

Now, launch the service as follows:

```terminal|command=1|title=bash
./authn localhost key.pem cert.pem &>/var/log/authn.log &
```

Note the following about this command:

- The first command-line argument is the IP address of the LDAP directory. Since the service runs on the same host as the LDAP directory, you can use `localhost` there.
- The `key.pem` and `cert.pem` arguments are the private key and certificate that you just created above
- The output of the command is directed to the log file `/var/log/authn.log`

_Your service should now be up and running!_

You can stream its logs with:

```terminal|command=1|title=bash
tail -f /var/log/authn.log
```

_Let's test if the service works as expected._

To do so, create the following file on your local machine:

```json|title=tokenreview.json
{
  "apiVersion": "authentication.k8s.io/v1beta1",
  "kind": "TokenReview",
  "spec": {
    "token": "alice:alicepassword"
  }
}
```

The above is a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1beta1-authentication-k8s-io) object in JSON format — that's exactly what will be received by your authentication service from the Kubernetes API server in production.

Note also that the TokenReview object contains the token `alice:alicepassword` which is the valid HTTP bearer token of the user Alice in your LDAP directory.

Now, in a separate terminal window on your local machine, submit this TokenReview object to the authentication service as an HTTP POST request:

```terminal|command=1|title=bash
curl -k -X POST -d @tokenreview.json https://<AUHTN-EXTERNAL-IP>
```

The authentication service should print a few log lines, indicating that a request was received and a response was sent back!

And the result of the request should look as follows:

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

Note that the actual response of the above command is compresses on a single line — but you can pipe the ouput to [`jq`](https://stedolan.github.io/jq/) to nicely format it as shown above:

```terminal|command=1|title=bash
curl -k -X POST -d @tokenreview.json https://<AUTHN-EXTERNAL-IP> | jq
```

The response object is a [TokenReview](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#tokenreview-v1beta1-authentication-k8s-io) object — as expected by the Kubernetes API sever.

Furhermore, this TokenReview object has the Status.Authenticated field set to `true` and the Status.User field set to the user identity `alice` of the identified user.

This means that the authentication service successfully verified the token that you submitted and associated with the user Alice.

_Your webhook token authentication service works and is ready to be used by Kubernetes!_

## Creating the Kubernetes cluster

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
