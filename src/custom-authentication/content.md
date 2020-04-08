Kubernetes provides support for multiple user authentication methods out-of-the-box:

- [X.509 client certificates](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#x509-client-certs)
- [Bearer tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-token-file)
- [OpenID Connect](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)

> Earlier versions of Kubernetes also supported [HTTP basic authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file), however, this authentication method has been [deprecated in Kubernetes v1.16](https://v1-16.docs.kubernetes.io/docs/setup/release/notes/#deprecations-and-removals).

However, Kubernetes also provides you the means to integrate any authentication method you like.

In this article, you will learn how you can enable [LDAP authentication](https://connect2id.com/products/ldapauth/auth-explained) for your Kubernetes cluster.

This means that the users of your cluster will be able to authenticate to Kubernetes by using their existing username and password from a [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) directory.

## How authentication works

## Setting up an LDAP directory

GLAuth config file:

```cfg|title=glauth.cfg
watchconfig = true

[ldap]
  enabled = true
  listen = "0.0.0.0:389"

[ldaps]
  enabled = false

[backend]
  datastore = "config"
  baseDN = "dc=glauth,dc=com"

[[users]]
  name = "alice"
  ou = "dev"
  passsha256 = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" # password

[[users]]
  name = "bob"
  ou = "dev"
  passsha256 = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" # password


[[groups]]
  name = "dev"
```

GLAuth systemd unit file:

```title=/etc/systemd/system/glauth.service
[Unit]
Description=GLAuth

[Service]
WorkingDirectory=/root
ExecStart=/root/glauth64 -c glauth.cfg
Restart=on-failure
```



