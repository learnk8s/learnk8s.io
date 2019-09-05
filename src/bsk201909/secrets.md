## How do you securely manage secrets in Kubernetes?

Kubernetes secrets hold the most sensitive information of your application - API keys, tokens, database passwords, etc.

If a hacker can retrieve one of these secrets, they could connect to your database without you even noticing it.

It's crucial to ensure that those secrets are stored as securely as possible.

Let's recap on how secrets work in Kubernetes.

Secrets are objects that contain key-value pairs and some metadata.

Secrets are similar to ConfigMaps and share the same limitations (1MB in size — as an example).

The main differences are the security protections added to Secrets.

This is how a secret looks like in the YAML representation:

```yaml|title=secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

You can create a secret like any other Kubernetes object (usually with kubectl).

The manifest will be sent to the server that will proceed it and store it in etcd - similarly to all Kubernetes objects.

_So why did the Kubernetes team decided to "encrypt" the secrets using base64?_

As you might already know, [base64 is an encoding, not an encryption](https://en.wikipedia.org/wiki/Base64).

Encoding allows you to represent binary data in a secret manifest.

Imagine storing a certificate in Kubernetes without base64: a lot of "���" — unrecognised characters.

Base64 translates those binaries files in standard strings such as "aGVsbG8gdGhlcmUh==".

But we still haven't answered how to secure those secrets properly.

In Kubernetes, you can opt-in to [encryption at rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/): by enabling this feature, Kubernetes API encrypts the secrets (optionally, using an external KMS system) before storing them in etcd.

You solved the issue of storing sensitive files such as certificates inside the cluster.

You also protected your secrets at rest with a suitable encryption provider.

_Is your cluster \_finally_ secure?\_

**Perhaps.**

However, the secrets that you load into the cluster must exist somewhere.

_Do you keep a copy or rely on Kubernetes to be the only source of truth?_

_How do you back them up?_

_What if you keep a copy and they go out of sync?_

You could store the secrets with the other manifests files - for example, in Git.

That could solve most of the challenges related to secret management:

- You get a full audit history for free thanks to Git
- You can reuse the same merging strategy and approve changes to your secrets as you do with the rest of the code
- Your code and your secrets are kept in sync at all times

_But can you secure the secrets in Git?_

_Can anyone who has access to the repository run away with your precious credentials?_

Some existing tools let you create "encrypted secrets" that can be stored on Git alongside the rest of the deployment files.

The tools also provide a mechanism to decrypt back to regular secrets so your app can consume them seamlessly.

Let's discuss some of them.

### Sealed Secretes

A successful project in this space is Sealed Secrets.

Sealed secrets has two parts: an operator deployed into your cluster and a command-line tool designed to interact with it called `kubeseal`.

You can install the operator with:

```terminal|command=1|title=bash
kubectl apply -f \
  https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.8.1/controller.yaml
```

You can install the command-line tool (on macOS) with:

```terminal|command=1|title=bash
brew install kubeseal
```

(For other operations systems, use the [releases pages](https://github.com/bitnami-labs/sealed-secrets/releases) and download the relevant executable).

When the operator starts, it generates a private and public key.

The private key stays in the cluster, but you can retrieve the public key with the `kubeseal` CLI:

```terminal|command=1|title=bash
kubeseal --fetch-cert > mycert.pem
```

Once you have the public key, you can encrypt all your secrets.

Storing the public key and the secrets in the repository are safe, even if the repo is public, as the public key is used only for encryption.

The mechanism described above is usually called asymmetric encryption.

If you're interested in learning more about it, you can do so here.

Assuming you have a secret in JSON format like this:

```json|title=mysecret.json
{
    "kind": "Secret",
    "apiVersion": "v1",
    "metadata": {
        "name": "mysecret",
        "creationTimestamp": null
    },
    "data": {
        "foo": "YmFy"
    }
}
```

You can encrypt the secret with:

```terminal|command=1|title=bash
kubeseal <mysecret.json >mysealedsecret.json
```

The new file contains a custom resourced definition (CRD):

```json|title=mysealedsecret.json
{
  "kind": "SealedSecret",
  "apiVersion": "bitnami.com/v1alpha1",
  "metadata": {
    "name": "mysecret",
    "namespace": "default",
    "creationTimestamp": null
  },
  "spec": {
    "template": {
      "metadata": {
        "name": "mysecret",
        "namespace": "default",
        "creationTimestamp": null
      }
    },
    "encryptedData": {
      "foo": "AgArmb9SihSb9MJtFZr/ajQk8ocLWYomgAQzD4rsGTbXUSmSYEj0L+Du9t8u7nSy2o6SqFszpXSQf21Z05CPcvpfapLTjlJn+150+CZma/8DsljQT0mkr8xJSrMX1sj7XIl4T5KuMDzJpYtmGJ5LF9EJkP2ViEhlVQP8EeusCkcvQ5OPXamsHI1EhsoePyk8uCMnebJ41Pl+HZV+8ZWyDZG5QzwBLq9HfMD0EuKyfZdXgUEDb4CFbTk6HbabaQYR8zCF1+HTuwMVc+Fgij7+D+nWlenf20LPYHZB+jMD0i/Z15VD5pN4mqYNdGsya9NMmbOgrEJqXFEdMMcVceI23+odRUqqK4KzwAacnWJGHFxkLdfRxtif6RYLTpsYw8YpCu12pnsvAj/J8By8vLXZaro0lrVCv5P9YI0ATT2jURfCNia3I0W58D6cFJLm5LpENYvnU6Z8h8jEWZfqnGt3+lv/5YV5UAkUQlvkhRGdHBR2LhEkR9iNffcBbq2Xicb3tn+T24Ml78+ugsMg5oGmWlfAgV53EIEG5GoneDrBP6xONS11lx9hoVCJPjNVUN71n3xO5YPkVv1IykV4FTdckY8/tj+zSIsLzYjOXwB+YJQHgFZOVec0vkMX2eLnSepoOwrm6bNB/y36rc4m3HQ/dHa7NohU1Vb5K3aTrYbt3a+Ean08HgtmBNWPl+LPw7HmrPhVsPQ="
    }
  },
  "status": {

  }
}
```

You can use the above file to create a SealedSecret in your cluster.

```terminal|command=1|title=bash
kubectl create -f mysealedsecret.json
```

The operator is watching for resources.

As soon as it finds a SealedSecret, it uses the private key to decrypt the values and create a standard Kubernetes secret.

You can verify that the secret was created successfully with:

```terminal|command=1|title=bash
kubectl get secrets mysecret -o yaml
```

Please notice that the secret created by the operator has the same name as the SealedSecret.

You can use the Secrets in your Pods to inject environment variables or mount them as files.

Since you can only decrypt the secrets with the private key (and that is safely stored in the cluster), you can sleep sweet dreams.

Also, Kubeseal supports secrets rotation.

You can generate a new public and private key and re-encrypt your secrets.

There are some downsides to consider, though:

- First, you can't see what's inside the secret. Every time you want to add a new value, you might need to re-encrypt all values or create a separate secret. In Git, you will see the content of the secret changed in full. It's hard to tell if a single entry or all them changed.
- Second, sealed Secret use one key pair to encrypt all your secrets. Also, the key is kept inside the cluster - without any additional protection (for example, using Hardware Security Model).

There are alternative tools to Sealed secrets that address those two shortcomings.

### Helm Secrets

While the underlying mechanism to secure the secrets is similar to Sealed Secrets, there are some noteworthy differences.

Helm secrets is capable of leveraging Helm to template secrets resources.

If you work in a large team with several namespaces and you use Helm already, you might find Helm secrets more convenient than Sealed secrets.

Helm secret has another advantage over Sealed Secrets - it's using the popular open-source project SOPS (developed by Mozilla) for encrypting secrets.

SOPS supports external key management systems, like AWS KMS, making it more secure as it's a lot harder to compromise the keys.

With that said, both solutions share the same issues - to use them, you must have permissions to decrypt the secrets.

If you work as part of a small team, perhaps this isn't a great deal.

However, if you want to reduce your blast radius, you might not want to hand over the keys to your secrets to every DevOps and Developer in your team.

Also, Helm Secrets is a Helm plugin, and it is strongly coupled to Helm, making it harder to change to other templating mechanisms such as kustomize.

You can learn more about Helm secrets on the [official project page](https://github.com/futuresimple/helm-secrets).

### Kamus

> Full disclosure - the author is the lead developer.

The architecture is similar to Sealed Secrets and Helm Secrets. However, Kamus lets you encrypt a secret for a specific application, and only this application can decrypt it.

The more granular permissions make Kamus more suitable to zero-trust environments with a high standard of security.

Kamus works by associating a service account to your secrets.

Only applications running with this service account are allowed to decrypt it.

You can install Kamus in your cluster with the official Helm chart:

```terminal|command=1,2|title=bash
helm repo add soluto https://charts.soluto.io
helm upgrade --install kamus soluto/kamus
```

And you can install the Kamus CLI with:

```terminal|command=1|title=bash
npm install -g @soluto-asurion/kamus-cli
```

You can create a secret with the Kamus CLI:

```terminal|command=1|title=bash
kamus-cli encrypt \
  --secret super-secret \
  --sa kamus-example-sa \
  --namespace default \
  --kamus-url <Kamus URL>
```

The output is the encrypted secret.

You can store the value safely your repository even if public.

Only the Kamus API has the private key to decrypt it.

To use the secret in your app, you need to add a particular init container to your pod.

The init container is responsible for reading the secrets, decrypting them and producing files in various formats.

Your application can then consume this file to consume the decrypted secrets.

Being able to encrypt and store one secret at the time is convenient if you gradually need to add more secrets to your app.

You can find more examples of how to use Kamus on the [official project page](https://github.com/Soluto/kamus).

## Summary

Storing and managing secrets in Kubernetes isn't only about enabling encryption at rest.

You should have a strategy for

- Loading secrets into the cluster safely and securely. After all, the secrets are created externally and then migrated to the cluster
- Keeping a single and trusted source of truth for your secrets. So you don't risk having secrets out of sync.
- Having an audit history of who changed the secret and for what reason

Tools such as Sealed Secrets, Helm Secrets and Kamus are designed to help you keep your secrets in Git so that you can leverage existing coding practices without compromising on security.
