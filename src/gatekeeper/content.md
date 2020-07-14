Policies in Kubernetes allow you to prevent certain workloads from being deployed in the cluster. 
While compliance is usually the reason for enforcing strict policies in the cluster, there are a 
number of recommended best practices that cluster admins should enforce. 

Examples of such guidelines are:

1. Not running privileged pods
1. Not running pods as root user
1. Not specifying resource limits
1. Not using the latest tag for the container images
1. Now allowing additional Linux capabilities by default

In addition, you may want to enforce bespoke policies that all workloads may want to abide by, such as:

- All workloads must have a "project" and "app" label
- All workloads must use container images from a specific container registry (e.g.  my-company.com)

Finally, there is a third category of checks that you would want to implement as policies to avoid disruption in your services. 
An example of such a check is ensuring that no two services can use the same ingress hostname. 

In this article, you will learn about enforcing policies for your Kubernetes workloads using both out-of-cluster and in-cluster solutions. 
These policies aim to reject workloads if they do not successfully satisfy the conditions set forth by the policy. 
The out-of-cluster approaches are accomplished by running static checks on the YAML manifests before they are submitted to the cluster. 
There are multiple tools available for achieving this. The in-cluster approaches make use of validating admission controllers which 
are invoked as part of the API request and before the manifest is stored in the database. 

You may find this [git repository](http://github.com/amitsaha/kubernetes-policy-enforcement-demo) handy as you work through the article.

## Example Deployment

Let’s consider the following YAML manifest to create a deployment for the image hashicorp/http-echo (`deployment.yaml`):

```yaml|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
  labels:
    app: http-echo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: http-echo
  template:
    metadata:
      labels:
        app: http-echo
    spec:
      containers:
      - name: http-echo
        image: hashicorp/http-echo
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678

      - name: http-echo-1
        image: hashicorp/http-echo:latest
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678
```

The above deployment will create a pod consisting of two containers from the same docker image. The first container doesn’t specify any 
tag and the second container specifies the `latest` tag. Effectively, both the containers will use the latest version of the image, 
`hashicorp/http-echo`. This is considered a bad practice and you want to prevent such a deployment from being created on your cluster.  

The best practice is to pin the container image to a tag such as `hashicorp/http-echo:0.2.3`.

Let’s see how you can detect the policy violation using a static check. Since you want to prevent the resource from reaching the 
cluster, the right place for running this check is:

- As a git pre commit, before the resource is committed to git.
- As part of your CI/CD pipeline before the branch is merged into the master branch.
- As part of the CI/CD pipeline before the resource is submitted to the cluster.

## Enforcing policies using conftest

[Conftest](https://conftest.dev) is a testing framework for configuration data that can be used to check and verify 
Kubernetes manifests. Tests are written using the purpose-built query language, [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/).

You can install conftest following the [instructions](https://www.conftest.dev/install/) on the project website. 
At the time of writing, the latest release is 0.19.0.

Create a new directory, conftest-checks and a file named `check_image_tag.rego` with the following content:

```prolog|title=check_image_tag.rego
package main

deny[msg] {
  input.kind == "Deployment"  
  image := input.spec.template.spec.containers[_].image
  not count(split(image, ":")) == 2
  msg := sprintf("image '%v' doesn't specify a valid tag", [image])
}


deny[msg] {
  input.kind == "Deployment"  
  image := input.spec.template.spec.containers[_].image
  endswith(image, "latest")  
  msg := sprintf("image '%v' uses latest tag", [image])
}
```

Can you guess what the two policies are checking?

Both checks are applied only to Deployments and are designed to extract the image name from the `spec.container` section.

The former rule checks that there’s a tag defined on the image.

The latter checks that, if a tag is defined, it is not the latest tag.

The two `deny` blocks evaluate to a violation when true.

Notice that, when you have more than one deny block, conftest checks them independently, and the overall result is a 
violation of any of the blocks results in a breach.

Now, let’s run conftest specifying the above policy and the deployment.yaml manifest:

```terminal|command=1|title=bash
conftest test -p conftest-checks  test-data/deployment.yaml
FAIL - test-data/deployment.yaml - image 'hashicorp/http-echo' doesn't specify a valid tag
FAIL - test-data/deployment.yaml - image 'hashicorp/http-echo:latest' uses latest tag

2 tests, 0 passed, 0 warnings, 2 failures
```

Great, it detected both violations.

Since conftest is a static binary, you could have it running your checks before you submit the YAML to the cluster.  If you already use 
a CI/CD pipeline to apply changes to your cluster, you could have an extra step that validates all resources against your conftest policies.

But does it really prevent someone from submitting a Deployment with the latest tag?

Of course, anyone with sufficient rights can still create the workload in your cluster and skip the CI/CD pipeline.

If you can run `kubectl apply -f deployment.yaml` successfully, you can ignore conftest and your cluster will run images with the latest tag.

How can you prevent someone from working around your policies?

You could supplement the static check with dynamic policies deployed inside your cluster.

## The Kubernetes API

Let's recap what happens when you create a Pod like this in the cluster:

```yaml|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: sise
    image: learnk8s/app:1.0.0
    ports:
    - containerPort: 8080
```

You could deploy the Pod to the cluster with:

```terminal|command=1|title=bash
kubectl apply -f pod.yaml
```

The definition is sent to the API server and:

1. The definition is stored in etcd.
1. The scheduler assigns the Pod to a node.
1. The kubelet retrieves the Pod spec and creates it.

At least that's the high-level plan.

But what's really going on under the hood?

You write resources in YAML, but the API is a REST (JSON) API.

How does that work?

And what happens when there's a typo in the YAML?

Who stops you from submitting broken resources to the etcd?

When you type `kubectl apply` a few things happen.

The kubectl binary:

1. Validates the resource client-side (is there any obvious error?).
1. Converts the YAML payload into JSON.
1. Reads the configs from your `KUBECONFIG`.
1. Authenticates with the kube-apiserver and
1. Sends a request with the payload to the kube-apiserver

When the kube-apiserver receives the request, it doesn’t store it in etcd immediately.

First, it has to verify that the requester is legitimate.

In other words, it has to authenticate the request.

Once you are authenticated, do you have the permission to create resources?

Identity and permission are not the same things.

Just because you have access to the cluster doesn't mean you can create or read all the resources.

The authorisation is commonly done with Role-Based Access Control (RBAC).

With Role-Based Access Control (RBAC), you can assign granular permissions and restrict what a user or app can do.

At this point, you are authenticated and authorised by the kube-apiserver.

Can you finally store the Pod definition in the etcd?

Not so fast.

The kube-apiserver is designed as a pipeline.

The request goes through a series of components before it's stored in the database.

While authorisation and authentication are the first two components, they are not the only ones.

Before the object reaches the database, it is intercepted by the Admission controllers.

At this stage, there's the opportunity to execute further checks on the current resource.

And Kubernetes has plenty of Admission controllers enabled by default.

> You can check all the Admission controllers that are enabled in minikube with `kubectl -n kube-system describe pod kube-apiserver-minikube`. The output should contain the flag `--enable-admission-plugins` and a list of admission controllers.

As an example, let's have a look at the NamespaceLifecycle admission controller.

## Validation admission controllers

The NamespaceLifecycle admission controller prevents you from creating Pods in namespaces that don't exist yet.

You can define a Pod with a namespace as follows:

```yaml|title=pod-namespaced.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: does-not-exist
spec:
  containers:
  - name: sise
    image: learnk8s/app:1.0.0
    ports:
    - containerPort: 8080
```

The YAML definition is valid, so kubectl validation checks pass and the request is submitted to the cluster:

```terminal|command=1|title=bash
kubectl apply -f pod-namespaced.yaml
```

Assuming that you are authenticated and authorised, the request reached the NamespaceLifecycle admission controller and is inspected.

The namespace `does-not-exist` doesn't exist and is finally rejected.

Also, the NamespaceLifecycle admission controller stops requests that could delete the `default`, `kube-system` and `kube-public` namespaces.

Controllers that check actions and resources are grouped under the Validation category.

There's another category of controllers, and that's called Mutating.

## Mutation admission controllers

As you can guess from the name, mutating controllers can inspect the request and change it.

The DefaultStorageClass admission controller is an example of a mutating controller.

Let's assume that you want to create a Persistent Volume Claim (PVC) like this:

```yaml|title=pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

You can create the Persistent Volume Claim (PVC) with:

```terminal|command=1|title=bash
kubectl apply -f pvc.yaml
```

If you inspect the list of Persistent Volume Claims with `kubectl get pvc`, you might notice that the volume is _Bound_ and has a "standard" storage class.

```terminal|title=bash
NAME     STATUS   VOLUME         CAPACITY   ACCESS MODES   STORAGECLASS   AGE
my-pvc   Bound    pvc-059f2da2   3Gi        RWO            standard       3s
```

However, you didn't specify any "standard" StorageClass in the YAML.

_Did you?_

You can inspect the YAML definition for the Persistent Volume Claim with:

```terminal|command=1|title=bash
kubectl get pvc my-pvc -0 yaml
```

If you pay attention to the definition, you might notice that there are some extra fields injected:

```yaml|highlight=11|title=pvc-retrieved.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
  storageClassName: standard
  volumeMode: Filesystem
  volumeName: pvc-059f2da2-a216-42b7-875e-e7da327605dd
```

The name "standard" isn't hardcoded in the API.

Instead the default StorageClass's name is injected in `spec.storageClassName`.

You can retrieve the _default_ StorageClass's name from the cluster with:

```terminal|command=1|title=bash
kubectl get storageclass
NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   AGE
standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           8m
```

If the name of the _default_ StorageClass were "aws-ebs", the DefaultStorageClass admission controller would have injected it instead of "standard".

Kubernetes has several mutating and validating admission controllers.

You can [find the full list on the official documentation](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/).

Once the request passes through the admission controllers, it is finally stored in etcd.

_But what if you want to have a custom check or customise the resources based on your rules?_

Admission controllers are designed to promote extensibility.

You can use the default Admission controllers that come with Kubernetes, or you can plug in your own.

_How do you do that?_

Two Admission controllers are programmable:

- the MutationAdmissionWebhook and
- the ValidationAdmissionWebhook

Those admission controllers don't do anything themselves.

You can register a component to the Mutation or Validation webhook, and those controllers will call it when the request passes through the Admission phase.

So you could write a component that checks if the current Pod uses a container image that comes from a private registry.

You could register it as part of the ValidationAdmissionWebhook and pass or reject requests based on the container image.

And that’s exactly what Gatekeeper does — it registers as a component in the cluster and validates requests.

## Enforcing policies using Gatekeeper

Gatekeeper allows a Kubernetes administrator to implement policies for ensuring compliance and best practices in their cluster.

Gatekeeper registers itself as a controller with the validation webhook in the Kubernetes API.
Any resource submitted to the cluster is intercepted and inspected against the list of active policies.

Also, Gatekeeper embraces Kubernetes native concepts such as Custom Resource Definitions (CRDs) and hence the policies are managed as Kubernetes resources. The Google Cloud docs on this topic are a good place to learn more.

Internally, Gatekeeper makes use of the Open Policy Agent (OPA) to implement the core policy engine and the policies are written in the Rego language. 

In the part, you will try out Gatekeeper. You will need access to a Kubernetes cluster with admin-level privileges such as minikube . Once you have kubectl configured to communicate to the cluster, run the following to setup gatekeeper:

```terminal|command=1|title=bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml 

namespace/gatekeeper-system created
customresourcedefinition.apiextensions.k8s.io/configs.config.gatekeeper.sh created
customresourcedefinition.apiextensions.k8s.io/constrainttemplates.templates.gatekeeper.sh created
serviceaccount/gatekeeper-admin created
role.rbac.authorization.k8s.io/gatekeeper-manager-role created
clusterrole.rbac.authorization.k8s.io/gatekeeper-manager-role created
rolebinding.rbac.authorization.k8s.io/gatekeeper-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/gatekeeper-manager-rolebinding created
secret/gatekeeper-webhook-server-cert created
service/gatekeeper-webhook-service created
deployment.apps/gatekeeper-audit created
deployment.apps/gatekeeper-controller-manager created
validatingwebhookconfiguration.admissionregistration.k8s.io/gatekeeper-validating-webhook-configuration created
```

To verify whether gatekeeper has been set up correctly, run 

```terminal|command=1|title=bash
kubectl -n gatekeeper-system describe svc gatekeeper-webhook-service 
```

The output should be similar to:

```terminal|command=1|title=bash
Name:              gatekeeper-webhook-service
Namespace:         gatekeeper-system
Labels:            gatekeeper.sh/system=yes
Annotations:      ..
Type:              ClusterIP
IP:                10.102.199.165
Port:              <unset>  443/TCP
TargetPort:        8443/TCP
Endpoints:         172.18.0.4:8443
..
```

This is the service that is invoked by the Kubernetes API as part of the request processing in the "Validating Admission" stage.
All your Pods, Deployments, Services, etc. are now intercepted and scrutinised by Gatekeeper.

### Defining reusable policies using a constraint template

In Gatekeeper, you need to first create a policy using a ConstraintTemplate custom resource.

Let’s have a look at an example. The following constraint template definition rejects any deployment that uses the latest tag:

```yaml|title=check_image_tag.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8simagetagvalid
spec:
  crd:
    spec:
      names:
        kind: K8sImageTagValid
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8simagetagvalid

        violation[{"msg": msg, “details”:{}}] {         
          image := input.review.object.spec.template.spec.containers[_].image
          not count(split(image, ":")) == 2
          msg := sprintf("image '%v' doesn't specify a valid tag", [image])
        }

        violation[{"msg": msg, “details”:{}}] {
          image := input.review.object.spec.template.spec.containers[_].image
          endswith(image, "latest")  
          msg := sprintf("image '%v' uses latest tag", [image])
        }
```

You can save the above definition into a file and name it `check_image_tag.yaml`.

The policy is similar to the previous that used Conftest. But there are some subtle and important differences:

- The input object is available as via input.review.object instead of input, and there is no need to assert the 
  input object kind here. You do that when creating the Constraint.

- The deny rule is renamed to violation. For `conftest`, the rule signature was `Deny[msg] {...}`
  whereas for gatekeeper it is `violation[{"msg": msg}]  {..}`.

- The violation rule block has a specific signature - an object with two properties - msg, a string and and
  `details` an object with arbitrary properties to return custom data to provide additional information 
  related to the violation. Here we return an empty object. See the next `ConstraintTemplate` for an 
  example of a non-empty details object.

Now, create the constraint template:

```terminal|command=1|title=bash
kubectl apply -f templates/check_image_tag.yaml
constrainttemplate.templates.gatekeeper.sh/k8simagetagvalid created
```

You can run `kubectl describe` to query the template from the cluster:

```terminal|command=1|title=bash
kubectl describe constrainttemplate.templates.gatekeeper.sh/k8simagetagvalid
Name:         k8simagetagvalid
Namespace:    
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"templates.gatekeeper.sh/v1beta1","kind":"ConstraintTemplate","metadata":
                {"annotations":{},"name":"k8simagetagvalid"},"spec"...
API Version:  templates.gatekeeper.sh/v1beta1
Kind:         ConstraintTemplate

...
```

A ConstraintTemplate isn’t something you can use to validate deployments, though.
It's just a definition of a policy that can only be enforced by creating a Constraint. 
You may use the same ConstraintTemplate but define multiple constraints to enforce 
policies for different workloads, for example.

### Creating a constraint

A Constraint is a way to say “I want to apply this policy to the cluster”.

You can think about ConstraintTemplates as a book of recipes.
You have hundreds of recipes for baking cakes and cookies, but you can’t really eat them.
You need to select the recipe and actually mix the ingredients to bake your cake.

Constraints are a particular instance of a recipe — the ConstraintTemplate.

Let’s have a look at an example.

The following Constraint uses the previously defined ConstraintTemplate (recipe):

```yaml|title=check_image_tag_constraint.yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sImageTagValid
metadata:
  name: valid-image-tag
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
```

Notice how the `Constraint` references the `ConstraintTemplate` as well as what kind of resources it should be applied to.

The `spec.match` object defines the workloads against which the constraint will be enforced. Here, you specify that it will be 
enforced against the `apps` API group and of kind, `Deployment`. Since these fields are arrays, you can 
specify multiple values and extend the checks to StatefulSets, DaemonSets, etc.

You can save the above content into a new file and name it `check_image_tag_constraint.yaml`.

Run kubectl apply to create the constraint:

```terminal|command=1|title=bash
kubectl apply -f check_image_tag_constraint.yaml 
k8simagetagvalid.constraints.gatekeeper.sh/valid-image-tag created
```

Use kubectl describe to ensure that the constraint was created:

```terminal|command=1|title=bash
kubectl describe k8simagetagvalid.constraints.gatekeeper.sh/valid-image-tag

Name:         valid-image-tag
Namespace:    
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"constraints.gatekeeper.sh/v1beta1","kind":"K8sImageTagValid","metadata":
                 {"annotations":{},"name":"valid-image-tag"},"spec":...
API Version:  constraints.gatekeeper.sh/v1beta1
Kind:         K8sImageTagValid
Metadata:
  Creation Timestamp:  2020-07-01T07:57:23Z
...
```

### Is the policy working?

Now, try creating a deployment with the previous YAML file, `deployment.yaml`:

```terminal|command=1|title=bash
kubectl apply -f deployment.yaml 

Error from server ([denied by valid-image-tag] image 'hashicorp/http-echo' doesn't specify a valid tag
[denied by valid-image-tag] image 'hashicorp/http-echo:latest' uses latest tag): error when creating 
"test-data/deployment.yaml": admission webhook "validation.gatekeeper.sh" denied the request: 
[denied by valid-image-tag] image 'hashicorp/http-echo' doesn't specify a valid tag
[denied by valid-image-tag] image 'hashicorp/http-echo:latest' uses latest tag
```

The deployment was rejected by the Gatekeeper policy. Notice how the check is built-in in the Kubernetes API.
You can't skip the check or work around it. 

Implementing Gatekeeper policies in a cluster with existing workloads can be challenging since you don't want to 
disrupt critical workloads from being deployed due to non-compliance. Hence, Gatekeeper allows setting up constraints
in a dry run enforcement mode using enforcementAction: dryrun in the spec:

```yaml|highlight=6-6
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sImageTagValid
metadata:
  name: valid-image-tag
spec:
  enforcementAction: dryrun
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
```

In this mode, the policy will not prevent any workloads from being deployed, but will log any violations. To see the violations run:

```terminal|command=1|title=bash
kubectl describe k8simagetagvalid.constraints.gatekeeper.sh/valid-image-tag       
```

The violations will be logged in the Violations field of the result:

```terminal|command=1|title=bash
Name:         valid-image-tag
Namespace:    
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
....

  Total Violations:  2
  Violations:
    Enforcement Action:  dryrun
    Kind:                Deployment
    Message:             image 'hashicorp/http-echo' doesn't specify a valid tag
    Name:                http-echo
    Namespace:           default
    Enforcement Action:  dryrun
    Kind:                Deployment
    Message:             image 'hashicorp/http-echo:latest' uses latest tag
    Name:                http-echo
    Namespace:           default
Events:                  <none>
```

Subsequently, you can fix these workloads and recreate the constraints removing `enforcementAction: dryrun`.

Let’s have a look at another example.

Can you write a policy that forces the Deployment to have two labels: one for the project and application name?

## Policy to enforce consistent labeling

First, you should enforce the policy as a check for conftest:

```prolog|title=check_labels.rego
package main

deny[msg] {
  input.kind == "Deployment"  
  
  required := {"app", "project"}
  provided := {label | input.metadata.labels[label]}
  missing := required - provided
 
  count(missing) > 0
  msg = sprintf("you must provide labels: %v", [missing])
}
```

Save the above policy as a file check_labels.rego.

Let’s have a look at the policy in detail:

- "required" is a set with two members - `app` and `project`. Those labels should be presented on all Deployments.
- "provided" retrieves the set of labels specified in the input.

Then, a set difference operation is performed and a new set that contains the labels which are present in "required",
but not found in "provided" is created. If the number of elements in this set is greater than 0, the rule is violated. 
This is achieved using the `count()` function to check the number of elements in the "missing" set.

Run conftest specifying this policy and you will see a failure:

```terminal|command=1|title=bash
conftest test -p conftest-checks/check_labels.rego test-data/deployment.yaml
FAIL - test-data/deployment.yaml - you must provide labels: {"project"}
1 test, 0 passed, 0 warnings, 1 failure
```

You can fix the issue by adding the project label, like this:

```yaml|highlight=7|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
  labels:
    app: http-echo
    project: test
spec:
  replicas: 2
  selector:
    matchLabels:
      app: http-echo
  template:
    metadata:
      labels:
        app: http-echo
    spec:
      containers:
      - name: http-echo
        image: hashicorp/http-echo
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678

      - name: http-echo-1
        image: hashicorp/http-echo:latest
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678
```

What happens when someone deploys the resource directly to the cluster?

They could work around the policy.

So let’s add the same policy in Gatekeeper. First, you will have to create a
`ConstraintTemplate`:

```yaml|title=check_labels.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels        
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          properties:
            labels:
              type: array
              items: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels

        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("you must provide labels: %v", [missing])
        }
```

The above manifest illustrates how you can specify input parameters to the constraint template to configure its
behavior at runtime. Going back to our ConstraintTemplate as a recipe analogy, input parameters are a way that 
the recipe allows you to customize certain ingredients. However, these ingredients must obey certain rules. 
For example, you want to only allow an array of strings as input to the ConstraintTemplate. This is described 
using an OpenAPIV3 schema in the `validation` object in the ConstraintTemplate specification above. 

The validation object was defined as:

```yaml
validation:        
  openAPIV3Schema:
    properties:
      labels:
        type: array
        items: string
```

This schema defines that the constraint template expects to only have one parameter, `labels` 
which is an array of strings. This becomes useful when for example, you may want to enforce 
that all deployment workloads have app and project labels, but all job workloads have a project 
label only. In such a case, you can define two constraints using the same constraint template, 
but only differing in value of the labels parameter. All input provided is made available to 
the constraint via the input.parameters attribute 

Save the above manifest into a file check_labels.yaml and then run kubectl apply to create 
the constraint template:

```terminal|command=1|title=bash
kubectl apply -f check_labels.yaml
constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels created
```

To use the policy from the ConstraintTemplate, you need a Constraint.

Create a new file, check_labels_constraints.yaml  with the following contents:

```yaml|title=check_labels_constraints.yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: deployment-must-have-labels
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
  parameters:
    labels: ["app", "project"]
```

Run kubectl apply to create the constraint:

```terminal|command=1|title=bash
kubectl apply -f check_labels_constraints.yaml
k8srequiredlabels.constraints.gatekeeper.sh/deployment-must-have-labels created
```

At this stage, you have two constraints created in your cluster:
The first constraint checks that your deployment is using an image with a  valid tag
The second constraint checks that your deployment defines two labels, app, and project.

Now, try creating the deployment with the above manifest, deployment.yaml:

```terminal|command=1|title=bash
kubectl apply -f deployment.yaml

Error from server ([denied by deployment-must-have-labels] you must provide labels: {"project"}
[denied by valid-image-tag] image 'hashicorp/http-echo' doesn't specify a valid tag
[denied by valid-image-tag] image 'hashicorp/http-echo:latest' uses latest tag): error when creating 
"deployment.yaml": admission webhook "validation.gatekeeper.sh" denied the request: 
[denied by deployment-must-have-labels] you must provide labels: {"project"}
[denied by valid-image-tag] image 'hashicorp/http-echo' doesn't specify a valid tag
[denied by valid-image-tag] image 'hashicorp/http-echo:latest' uses latest tag
```

The deployment is not created successfully since it doesn’t have the required project label as well as not using a valid image tag. 

Job done!

A valid deployment manifest that will be successfully deployed will have two labels - app and project as well as use tagged images:

```yaml|title=deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
  labels:
    app: http-echo
    project: test
spec:
  replicas: 2
  selector:
    matchLabels:
      app: http-echo
  template:
    metadata:
      labels:
        app: http-echo
    spec:
      containers:
      - name: http-echo
        image: hashicorp/http-echo:0.2.3
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678

      - name: http-echo-1
        image: hashicorp/http-echo:0.2.1
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678
```

You validated your Deployment with a static and dynamic check. You can fail fast with the early static check and you can be 
sure that no one works around the policy by submitting resources directly to the cluster. 

## Summary

Both conftest and Gatekeeper uses the Rego language to define policies which makes these two tools an attractive solution 
to implement out-of-cluster and in-cluster checks, respectively. However, as you saw above, there were a few changes needed 
to make to the conftest Rego policy work with Gatekeeper. The [konstraint](https://github.com/plexsystems/konstraint) 
project aims to help in this regard. The premise of konstraint is that your source of truth is a policy that you would write 
in Rego for conftest and then generate the ConstraintTemplate and Constraint resources for Gatekeeper. Konstraint automates 
the manual steps involved in converting a policy written for conftest to one that works in Gatekeeper. In addition, 
testing Gatekeeper constraint templates and constraints is also made more straightforward using konstraint.

Neither conftest nor gatekeeper are the only solutions when it comes to enforcing out-of-cluster and in-cluster policies 
respectively. What makes the two solutions compelling is that you can use Rego to implement policies for both tools. 
In fact, you could even go as far as implementing a subset of relevant policies both inside and outside the cluster. 
A comparative solution which achieves the same level of policy enforcement is [polaris](https://github.com/FairwindsOps/polaris)
which has both an out-of-cluster and an in-cluster policy enforcement functionality. However it uses a custom JSON schema 
based policy specification language and hence may not be as expressive as Rego.
