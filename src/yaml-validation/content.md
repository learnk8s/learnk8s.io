Kubernetes workloads are most commonly defined as YAML formatted documents.

Those manifests are parsed, checked, and deserialized in kubectl before they are submitted to the API server.

One of the challenges with YAML is that it's rather hard to express constraints or relationships between manifest files.

_What if you wish to check that all images deployed into the cluster are pulled from a trusted registry?_

_How can you prevent your teammates from submitting Deployments that don't have PodDisruptionBudgets from being deployed to production?_

Integrating static checking of these YAML manifests allows catching errors and policy violations closer to the
development lifecycle.

The guarantee around the validity and safety of the resource definitions is improved and you can trust that production workloads are following best practices.

The ecosystem of static checking of Kubernetes YAML files can be grouped in the following categories:

- **API validators** — Tools in this category validate a given YAML manifest against the Kubernetes server API for the data types as well as the data itself.
- **Built-in checkers** — Tools in this category come with some opinionated and recommended checks built-in which are run against specified YAML manifests.
- **Custom validators** — Tools in this category allow writing custom checks written in a standard language such as Rego.

In this article, you will be learning about six different tools:

1. kubeval
1. kube-score
1. config-lint
1. copper
1. conftest
1. polaris

Let's get started!

## Example manifests

For the purpose of this article, you will consider a few kubernetes manifests to test how the different tools work.

Let's start with the following deployment and service:

```yaml|title=base-valid.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
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
---
apiVersion: v1
kind: Service
metadata:
  name: http-echo
spec:
  ports:
  - port: 5678
    protocol: TCP
    targetPort: 5678
  selector:
    app: http-echo
```

> You can find the above YAML manifest as the file `base-valid.yaml` along with the other manifests referred to in the article in the [git repository](https://github.com/amitsaha/kubernetes-static-checkers-demo) in the `test-data` directory.

You can deploy the application with:

```terminal|command=1|title=bash
kubectl apply -f hello-world.yaml
```

The container image is a simple web application that always replies with a "Hello World" message.

You can test it with:

```terminal|command=1|title=bash
$ kubectl port-forward svc/http-echo 8080:5678
```

You can visit <localhost:8080> and confirm that the app works as expected.

_But does it follow best practices?_

Let's start.

# Kubeval

The main premise of [kubeval](https://www.kubeval.com/) is that any interaction with Kubernetes goes via its REST API.

Hence, you can use the API schema to validate whether a given YAML input conforms to the schema.

Let's have a look at an example.

You can install Kubeval for your operating system following the [instructions](https://www.kubeval.com/installation/) on the project website.

> As of this writing, the latest release is 0.15.0.

Once installed, let's try and run it specifying the manifest discussed earlier:

```terminal|command=1|title=bash
kubeval base-valid.yaml
PASS - base-valid.yaml contains a valid Deployment (http-echo)
PASS - base-valid.yaml contains a valid Service (http-echo)
```

When successful, `kubeval` exits with an exit code of 0.

You can verify the exit code with:

```terminal|command=1|title=bash
echo $?
0
```

Let's now try `kubeval` with another manifest:

```yaml|title=kubeval-invalid.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
spec:
  replicas: 2
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
---
apiVersion: v1
kind: Service
metadata:
  name: http-echo
spec:
  ports:
  - port: 5678
    protocol: TCP
    targetPort: 5678
  selector:
    app: http-echo
```

_Can you spot the issue?_

Let's run kubeval:

```terminal|command=1|title=bash
kubeval kubeval-invalid.yaml
WARN - kubeval-invalid.yaml contains an invalid Deployment (http-echo) - selector: selector is required
PASS - kubeval-invalid.yaml contains a valid Service (http-echo)
```

And:

```terminal|command=1|title=bash
echo $?
1
```

The resource doesn't pass the validation.

Deployments using the `app/v1` API version have to include a selector that matches the Pod label.

The above manifest doesn't include the selector and running `kubeval` against the manifest reported an error and a non-zero exit code.

_You may wonder what happens when you run `kubectl apply -f` with the above manifest?_

Let's try:

```terminal|command=1|title=bash
kubectl apply -f kubeval-invalid.yaml
error: error validating "kubeval-invalid.yaml": error validating data: ValidationError(Deployment.spec):
missing required field "selector" in io.k8s.api.apps.v1.DeploymentSpec; if you choose to ignore these errors,
turn validation off with --validate=false
```

Exactly the error that kubeval warned you about.

You can fix the resource by adding the selector like this:

```yaml|highlight=7-9|title=base-valid.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
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
---
apiVersion: v1
kind: Service
metadata:
  name: http-echo
spec:
  ports:
  - port: 5678
    protocol: TCP
    targetPort: 5678
  selector:
    app: http-echo
```

The advantage of a tool like `kubeval` is of course that you can catch such errors before submitting them to a cluster.

Also, you don't need access to a cluster to run the checks.

By default, `kubeval` validates resources against the Kubernetes API schema as per the latest unreleased version of Kubernetes.

In most cases, however, you might want to run validations against a specific Kubernetes release.

You can test a specific API version using the flag `--kubernetes-version`:

```terminal|command=1|title=bash
kubeval --kubernetes-version 1.16.1 base-valid.yaml
```

Please notice that the release version should be of the form of `Major.Minor.Patch`.

To see the versions available for validating against, check out <https://github.com/instrumenta/kubernetes-json-schema> which `kubeval` uses to perform its validation.

A point worth noting here is that `kubeval` retrieves the schema hosted at <https://kubernetesjsonschema.dev> at runtime.

If you need to run `kubeval` offline, you can download the schemas and then use the `--schema-location` flag to specify a local directory.

In addition to individual YAML files, you can run `kubeval` against directories as well as provide the input via standard input.

Kubeval makes it for easy integration with your Continuous Integration pipeline.

If you want to include the checks before you submit your manifests to the cluster, you will be pleased to know that Kubeval supports three output formats:

1. plain text
1. JSON and
1. Test Anything Protocol (TAP)

And you may be able to use one of the formats to parse the output further to create a custom summary of the results.

One limitation of `kubeval` is that it is currently not able to validate against Custom Resource Definitions (CRDs).

However, you can either ignore all missing schemas, or you can specify resources to ignore.

Kubeval is an excellent choice to check and validate resources, but please notice that a resource that passes the test isn't guaranteed to conform to best practices.

As an example, using the latest tag in the container images isn't considered a best practice.

However, Kubeval doesn't report that as an error and it will validate the YAML without warnings.

_What if you want to score the YAML and catch violations such as the latest tag? How can you check your YAML files against best practices?_

# Kube-score

[Kube-score](https://github.com/zegl/kube-score) analyses a specified YAML manifest and scores it against in-built checks.

These checks have been created based on security recommendations and best practices such as:

- Running containers as a non-root user
- Specifying health checks for pods and
- Specifying resource requests and limits.

The result of a check can be _OK_, _WARNING_, or _CRITICAL_.

You can try out kube-score without installing locally at <https://kube-score.com/> or you can locally install it for your operating system following the [instructions](https://github.com/zegl/kube-score#installation).

> As of this writing, the latest release is 1.7.0.

Let's try and run it with the previous manifest `base-valid.yaml`:

```terminal|command=1|title=bash
kube-score score base-valid.yaml
apps/v1/Deployment http-echo
	[CRITICAL] Container Image Tag
    	· http-echo -> Image with latest tag
        	Using a fixed tag is recommended to avoid accidental upgrades
	[CRITICAL] Pod NetworkPolicy
    	· The pod does not have a matching network policy
        	Create a NetworkPolicy that targets this pod
	[CRITICAL] Pod Probes
    	· Container is missing a readinessProbe
        	A readinessProbe should be used to indicate when the service is ready to receive traffic.
		Without it, the Pod is risking to receive traffic before it has booted. It's also used during
		rollouts, and can prevent downtime if a new version of the application is failing.
        	More information: https://github.com/zegl/kube-score/blob/master/README_PROBES.md
	[CRITICAL] Container Security Context
    	· http-echo -> Container has no configured security context
        	Set securityContext to run the container in a more secure context.
	[CRITICAL] Container Resources
    	· http-echo -> CPU limit is not set
	        Resource limits are recommended to avoid resource DDOS. Set resources.limits.cpu
    	· http-echo -> Memory limit is not set
        	Resource limits are recommended to avoid resource DDOS. Set resources.limits.memory
    	· http-echo -> CPU request is not set
        	Resource requests are recommended to make sure that the application can start and run without
		crashing. Set resources.requests.cpu
    	· http-echo -> Memory request is not set
        	Resource requests are recommended to make sure that the application can start and run without crashing.
		Set resources.requests.memory
	[CRITICAL] Deployment has PodDisruptionBudget
    	· No matching PodDisruptionBudget was found
        	It's recommended to define a PodDisruptionBudget to avoid unexpected downtime during Kubernetes
		maintenance operations, such as when draining a node.
	[WARNING] Deployment has host PodAntiAffinity
    	· Deployment does not have a host podAntiAffinity set
        	It's recommended to set a podAntiAffinity that stops multiple pods from a deployment from
		being scheduled on the same node. This increases availability in case the node becomes unavailable.
```

The YAML file passes the `kubeval` checks, but `kube-score` points out several deficiencies:

- Missing readiness probes
- Missing memory and CPU requests and limits
- Missing Pod disruption budgets
- Missing anti-affinity rules to maximise availability
- The container running as root

Those are all valid points that you should address to make your deployment more robust and reliable.

The `kube-score` command prints a human-friendly output containing all the WARNING and CRITICAL results, which is great during development.

If you plan to use it as part of your Continuous Integration pipeline, you can use a more succinct output with the flag `-- output-format ci` which also prints the checks with level OK:

```terminal|command=1|title=bash
kube-score score base-valid.yaml --output-format ci
[OK] http-echo apps/v1/Deployment
[OK] http-echo apps/v1/Deployment
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) CPU limit is not set
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) Memory limit is not set
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) CPU request is not set
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) Memory request is not set
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) Image with latest tag
[OK] http-echo apps/v1/Deployment
[CRITICAL] http-echo apps/v1/Deployment: The pod does not have a matching network policy
[CRITICAL] http-echo apps/v1/Deployment: Container is missing a readinessProbe
[CRITICAL] http-echo apps/v1/Deployment: (http-echo) Container has no configured security context
[CRITICAL] http-echo apps/v1/Deployment: No matching PodDisruptionBudget was found
[WARNING] http-echo apps/v1/Deployment: Deployment does not have a host podAntiAffinity set
[OK] http-echo v1/Service
[OK] http-echo v1/Service
[OK] http-echo v1/Service
[OK] http-echo v1/Service
```

Similar to `kubeval`, `kube-score` returns a non-zero exit code when there is a CRITICAL check that failed.

You can also ask `kube-score` to return a non-zero exit code when there is a WARNING check failure.

The `kube-score list` command prints all the currently available checks.

One of the checks that kube-score includes checks for deprecated API versions — similar to kubeval.

However, this information is hardcoded in kube-score itself and it doesn't currently allow specifying the Kubernetes version.

Hence, if you upgrade your cluster or you have several different clusters running different versions, this can prove to be a severe limitation.

[There is an open issue to implement this feature.](https://github.com/zegl/kube-score/issues/63)

You can learn more about kube-score at <https://github.com/zegl/kube-score>

_Kube-score checks are an excellent tool to enforce best practices, but what if you want to customize one, or add your own rules?_

You can't.

Kube-score isn't designed to be extendable and you can't add or tweak policies.

If you want to write custom checks to comply with your organizational policies you can use one of the next four options - config-lint, copper, conftest or polaris.

# Config-lint

Config-lint is a tool designed to validate configuration files written in YAML, JSON, Terraform, CSV, and Kubernetes.

You can install it using the [instructions](https://stelligent.github.io/config-lint/#/install) on the project website.

> The latest release is 1.5.0 at the time of this writing.

Config-lint comes with no in-built checks for Kubernetes manifests.

You have to write your own rules to perform any validations.

The rules are written as YAML files, referred to as rulesets and have the following structure:

```yaml|title=rule.yaml
version: 1
description: Rules for Kubernetes spec files
type: Kubernetes
files:
  - "*.yaml"
rules:
   # array of rules
```

Let's have a look in more detail:

- The `type` field indicates what type of configuration we will be checking with `config-lint` and is `Kubernetes` for kubernetes manifests.
- The `files` field accepts a directory as input in addition to individual files.
- The `rules` field is where the custom checks are defined.

Let's say you want to write a rule to check whether the images in a Deployment are always from a trusted repository i.e. of the form my-company.com/myapp:1.0.

A `config-lint` rule to check this would look like this:

```yaml|title=rule-trusted-repo.yaml
- id: DEPLOYMENT_IMAGE_TAG
  severity: FAILURE
  message: Deployment must use a valid image tag
  resource: Deployment
  assertions:
    - every:
        key: spec.template.spec.containers
        expressions:
          - key: image
            op: starts-with
            value: "my-company.com/"
```

Each rule must have the following attributes:

- `id`: This uniquely identifies the rule
- `severity`: Has to be one of FAILURE, WARNING, and NON_COMPLIANT
- `message`: If a rule is violated, the contents of this string will be shown
- `resource`: The kind of resource we want this rule to be applied to
- `assertions`: A list of conditions that will be evaluated against the specified resource

In the above rule, the "[every" assertion ](https://stelligent.github.io/config-lint/#/operations?id=every) is used to ensure that each element of the container array specified via the `key: spec.templates.spec.containers` passes all the tests in `expressions`.

In the expressions array, there is only one condition that checks whether the `image` attribute of each array object starts with `my-company.com/` using the `starts-with` operation.

The complete ruleset looks like this:

```
version: 1
description: Rules for Kubernetes spec files
type: Kubernetes
files:
  - "*.yaml"
rules:
  - id: DEPLOYMENT_IMAGE_REPOSITORY
    severity: FAILURE
    message: Deployment must use a valid image repository
    resource: Deployment
    assertions:
      - every:
          key: spec.template.spec.containers
          expressions:
            - key: image
              op: starts-with
              value: "my-company.com/"
```

If you want to test the check, you can save the above contents in a file and name it `check_image_repo.yaml`.

Since config-lint rules are written in YAML, you can use `config-lint` to validates its rules:

```
$ config-lint -validate check_image_repo.yaml
```

Let's now run the validation against the `base-valid.yaml` file using the above ruleset file:

```
$ config-lint -rules check_image_repo.yaml base-valid.yaml

[
  {
	"AssertionMessage": "Every expression fails: And expression fails: image does not start with my-company.com/",
	"Category": "",
	"CreatedAt": "2020-06-04T01:29:25Z",
	"Filename": "test-data/base-valid.yaml",
	"LineNumber": 0,
	"ResourceID": "http-echo",
	"ResourceType": "Deployment",
	"RuleID": "DEPLOYMENT_IMAGE_REPOSITORY",
	"RuleMessage": "Deployment must use a valid image repository",
	"Status": "FAILURE"
  }
]
```

Now, let's consider the following manifest with a valid image repository (`image-valid-mycompany.yaml`):

<pre>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http-echo
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
        <b>image: my-company.com/http-echo:1.0</b>
        args: ["-text", "hello-world"]
        ports:
        - containerPort: 5678
---
apiVersion: v1
kind: Service
metadata:
  name: http-echo
spec:
  ports:
  - port: 5678
    protocol: TCP
    targetPort: 5678
  selector:
    app: http-echo
</pre>

Run the same check with the above manifest and there will be no violations reported:

```
$ config-lint -rules check_image_repo.yaml  image-valid-mycompany.yaml
[]
```

Config-lint is a promising framework that lets you write custom checks for Kubernetes YAML manifests using a YAML DSL.

But what if you want to express more complex logic and checks? Isn't YAML too limiting for that?
What if you could express those checks with a real programming language?

# Copper

[Copper V2](https://github.com/cloud66-oss/copper) is a framework that validates manifests using custom checks — just like config-lint. However, Copper doesn't use YAML to define the checks.

Instead, checks are written in JavaScript and Copper provides a library with a few basic helpers to assist in reading Kubernetes objects and reporting errors.

You can install Copper by downloading a binary for your operating system based on the [installation instructions](https://github.com/cloud66-oss/copper#installation). The latest release at the time of this writing is 2.0.1.

Similar to `config-lint`, Copper has no built-in checks. Let's write our first check to make sure a deployment uses only container images from a trusted repository, `my-company.com`.  Create a new file, `check_image_repo.js` with the following content:

```
$$.forEach(function($){
    if ($.kind === 'Deployment') {
        $.spec.template.spec.containers.forEach(function(container) {
            var image = new DockerImage(container.image);
            if (image.registry.lastIndexOf('my-company.com/') != 0) {
                errors.add_error('no_company_repo',"Image " + $.metadata.name + " is not from my-company.com repo", 1)
            }
        });
    }
});
```

Now, to run this check against our `base-valid.yaml` manifest, we will run the `copper validate` command:

```
$ copper validate --in=base-valid.yaml --validator=check_image_tag.js
Check no_company_repo failed with severity 1 due to Image http-echo is not from my-company.com repo
Validation failed
```

As you can imagine, you can write more sophisticated checks such as validating domain names for Ingress resources or forbidding any Pod that runs as privileged.

Copper has some built-in helpers:

- The `DockerImage` function reads the specified input file and creates an object containing the following attributes:
  
  - `name` containing the image name
  - `tag` containing the image tag
  - `registry` containing the image registry
  - `registry_url` containing the protocol and the image registry, and
  - `fqin` representing the entire fully qualified image location.

- The `findByName` function is helpful for finding a resource given a `kind` and `name` from an input file

- The `findByLabels` function is helpful for finding a resource given `kind` and the `labels`.

If you want to see all the helpers, they are available [here](https://github.com/cloud66-oss/copper/tree/master/libjs).

By default, it loads the entire input YAML file into the `$$` variable and that's available in your scripts (if you used jQuery in the past, you might find this pattern familiar). In addition to not having to learn a custom language,  you have access to the entire JavaScript language for writing your checks such as string interpolation, functions, etc. It is worth noting that the current copper release embeds the ES5 version of the JavaScript engine and not ES6.

To learn more, visit <https://github.com/cloud66-oss/copper>.

If Javascript isn't your favourite language and you prefer a language designed to query and describe policies, you should check out Conftest.

# Conftest

Conftest is a testing framework for configuration data that can be used to check and verify Kubernetes manifests. Tests are written using the purpose-built query language, [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/). You can install conftest following the [instructions ](https://www.conftest.dev/install/)on the project website. At the time of writing, the latest release is 0.18.2.

Similar to Config-lint and Copper, conftest doesn't come with any in-built checks. So let's try it out, by writing a  check.

As for the previous example, you will check that the container is coming from a trusted source.

Create a new directory, `conftest-checks` and create a new file named `check_image_registry.rego`
inside it with the following contents:

```
package main

deny[msg] {

  input.kind == "Deployment"
  image := input.spec.template.spec.containers[_].image
  not startswith(image, "my-company.com/")
  msg := sprintf("image '%v' doesn't come from my-company.com repository", [image])
}
```

Let's now run `conftest` to validate the manifest, `base-valid.yaml`:

```
$ conftest test --policy ./conftest-checks base-valid.yaml
FAIL - base-valid.yaml - image 'hashicorp/http-echo' doesn't come from my-company.com repository
1 tests, 1 passed, 0 warnings, 1 failure
```

Of course, it fails since the image isn't trusted.

The above Rego file specifies a `deny` block which evaluates to a violation when true. If we have more than one `deny` block, `conftest` checks them independently and the overall result is a violation if any of the blocks results in a violation.

Other than the default output format, `conftest` supports JSON, TAP, and a table format via the --output switch, which is great if you wish to integrate the reports with your existing Continuous Integration pipeline.

To help debug policies, `conftest` has a convenient `--trace` flag which prints a trace of how `conftest` is parsing the specified policy files.

`conftest` policies can be published and shared as artifacts in OCI (Open Container Initiative) registries. The commands, `push` and `pull` allow publishing an artifact and pulling an existing artifact to and from a remote registry, respectively.

Let's see a demo of publishing the above policy to a local docker registry using `conftest push`.

Start a local docker registry using:

```
$ docker run -it --rm -p 5000:5000 registry
```

From another terminal, navigate to the `conftest-checks` directory created above and run the following command:

```
$ conftest push 127.0.0.1:5000/amitsaha/opa-bundle-example:latest
```

The command should complete successfully with the following message:

```
2020/06/10 14:25:43 pushed bundle with digest: sha256:e9765f201364c1a8a182ca637bc88201db3417bacc091e7ef8211f6c2fd2609c
```

Now, create a temporary directory and run the `conftest pull` command which will download the above bundle to the temporary directory:

```
$ cd $(mktemp -d)
$ conftest pull 127.0.0.1:5000/amitsaha/opa-bundle-example:latest
```

You will see that there is a new sub-directory `policy` in the temporary directory containing the policy file pushed earlier:

```
$ tree
.

└── policy
	└── check_image_registry.rego
```

You can even run the tests directly from the artifact:

```
$ conftest test --update 127.0.0.1:5000/amitsaha/opa-bundle-example:latest base-valid.yaml
..
FAIL - base-valid.yaml - image 'hashicorp/http-echo' doesn't come from my-company.com repository
2 tests, 1 passed, 0 warnings, 1 failure
```

If you are wondering whether you can publish policy bundles to the docker hub, unfortunately, it is not yet one of the supported registries. However, if you are using Azure container registry or running your own docker distribution, you are in luck. The artifact format is the [same](https://www.openpolicyagent.org/docs/latest/bundles) as used by Open Policy Agent (OPA) bundles which makes it possible to use `conftest` to run tests from existing OPA bundles.

To learn more about sharing policies and other features of conftest,  visit <https://www.conftest.dev>.

# Polaris

The last tool we will explore in this article is `polaris` ([https://github.com/FairwindsOps/polaris](https://github.com/FairwindsOps/polaris#cli)). Polaris can be either installed inside a cluster or as a command-line tool to statically analyze Kubernetes manifests. When running as a command-line tool, it includes a number of inbuilt checks covering areas such as security and best practices similar to kube-score. Also, you can use it to write custom checks similar to config-lint, copper, and conftest. In that sense, it combines the best of the two categories of tools you have learned about so far.

You can install the polaris command-line tool as per the instructions on the project [website](https://github.com/FairwindsOps/polaris/blob/master/docs/usage.md#cli). The latest release at the time of writing is 1.0.3.

Once installed, you can run `polaris` against the `base-valid.yaml` manifest with:

```
$ polaris audit --audit-path base-valid.yaml
```

The above command will print a JSON formatted string detailing the checks that were run and the result of each check. The output will have the following structure:

```
{
  "PolarisOutputVersion": "1.0",
  "AuditTime": "0001-01-01T00:00:00Z",
  "SourceType": "Path",
  "SourceName": "test-data/base-valid.yaml",
  "DisplayName": "test-data/base-valid.yaml",
  "ClusterInfo": {
    "Version": "unknown",
    "Nodes": 0,
    "Pods": 2,
    "Namespaces": 0,
    "Controllers": 2
  },
  "Results": [
    ….
  ]
}
```

The complete result is available at <https://github.com/amitsaha/kubernetes-static-checkers-demo/blob/master/base-valid-polaris-result.json>

Similar to kube-score, polaris identifies a number of cases where the manifest falls short of recommended best practice which includes:

- Missing health checks for the pods
- Container images don't have a tag specified
- Running as the root user is allowed
- CPU and memory requests and limits are not set

Each check is either classified with a severity level of _warning_ or _danger. _To learn more about the current in-built checks, refer to the [documentation](https://github.com/FairwindsOps/polaris/blob/master/docs/usage.md#checks).

If you are not interested in the detailed results, passing the `--format score` will print a number in the range 1-100 which polaris refers to as the _score:_

```
$ polaris audit --audit-path test-data/base-valid.yaml   --format score
68
```

The closer the score is to 100, the higher the degree of conformance.

If you look at the exit code of the `polaris audit` command, you will see that it was 0. To make `polaris audit` exit with a non-zero code, we can make use of two other flags.

The `--set-exit-code-below-score`  flag accepts a threshold score in the range 1-100 and will exit with an exit code of 4 if the score is below the threshold. This is very useful in cases where your baseline score maybe 75, and you want to know when it goes below that.

The `--set-exit-code-on-danger` flag will exit with an exit code of 3 when any of the _danger_ checks fail.

Let's now see how you can define a custom check for `polaris` to check whether the container images in a deployment are from a trusted registry. Custom checks are defined in a YAML format with the check itself defined using JSON Schema. The following YAML snippet defines a new check-called, `checkImageRepo`:

```
checkImageRepo:
  successMessage: Image registry is valid
  failureMessage: Image registry is not valid
  category: Images
  target: Container
  schema:
    '$schema': http://json-schema.org/draft-07/schema
    type: object
    properties:
      image:
        type: string
        pattern: ^my-company.com/.+$
```

Let's have a closer look at it:

- `successMessage` is a string which will be displayed when the check succeeds.
- `failureMessage` is displayed when the check is unsuccessful.
- `category` refers to one of the categories - `Images`, `Health Checks`, `Security`, `Networking` and  `Resources`.
- `target` is a string that determines which _spec_ object the check is going to be applied against - and should be one of `Container`, `Pod`, or `Controller`.
- The check itself is defined in the `schema` object using a JSON schema. Here the check uses the `pattern` keyword to match whether the image is from an allowed registry or not.

To run the check defined above you will need to create a Polaris configuration file as follows:

```
checks:
  checkImageRepo: danger
customChecks:
  checkImageRepo:
    successMessage: Image registry is valid
    failureMessage: Image registry is not valid
    category: Images
    target: Container
    schema:
      '$schema': http://json-schema.org/draft-07/schema
      type: object
      properties:
        image:
          type: string
          pattern: ^my-company.com/.+$
```

Let's break down the file:

- The configuration file above specifies the checks to be run in the `checks` object along with the severity label of the check. Since we want to be alerted when the image isn't trusted, `checkImageRepo` is assigned a `danger` severity level.
- The `checkImageRepo` check itself is then defined in the `customChecks` object.

You can save the above file as `custom_check.yaml` and run `polaris audit` with the YAML manifest that you wish to validate. We will validate the `base-valid.yaml` manifest:

```
$ polaris audit --config custom_check.yaml --audit-path base-valid.yaml
```

You will see that `polaris audit` ran only the custom check defined above which did not succeed. If you amend the container image to `my-company.com/http-echo:1.0`, `polaris` will report success. The Github repository contains the amended manifest, so you can test the previous command against the `image-valid-mycompany.yaml` manifest,

How do you run both the built-in and custom checks? The configuration file above should be updated with all the built-in check identifiers and should look as follows:

```
checks:
  cpuRequestsMissing: warning
  cpuLimitsMissing: warning
  # Other inbuilt checks..
  # ..
  # custom checks

  checkImageRepo: danger
customChecks:
  checkImageRepo:
    successMessage: Image registry is valid
    failureMessage: Image registry is not valid
    category: Images
    target: Container
    schema:
      '$schema': http://json-schema.org/draft-07/schema
      type: object
      properties:
        image:
          type: string
          pattern: ^my-company.com/.+$
```

You can see an example of a complete configuration file [here](https://github.com/amitsaha/kubernetes-static-checkers-demo/blob/master/polaris-configs/config_with_custom_check.yaml).

Polaris augments the built-in checks with your own custom checks thus combining the best of both worlds. However, not having access to more powerful languages like Rego or JavaScript may be a limitation to write more sophisticated checks.

To learn more about polaris, check out the [project website](https://github.com/FairwindsOps/polaris).

# Summary

While there are plenty of tools to validate, score and lint Kubernetes YAML files, it's important to have a mental model on how you will design and perform the checks.

As an example, If you were to think about Kubernetes manifests going through a pipeline, kubeval could be the first step in such a pipeline as it validates if the object definitions conform to the Kubernetes API schema. Once this check has been successful, perhaps you could pass on to more elaborated checks such as standard best practices and custom organization policies. Kube-score and polaris are to excellent choices here

If you have complex requirements and want to customize the checks down to the details, you should consider copper, config-lint, and conftest. While both conftest and config-lint use more YAML to define custom validation rules, copper gives you access to a real programming language making it quite attractive. But should you use one of these and write all the checks from scratch or should you instead use Polaris and write only the additional custom checks? It depends.

The following table presents a summary of the tools:

<table>
  <tr>
    <td>Tool</td>
    <td>Features</td>
    <td>Limitations</td>
    <td>Custom checks</td>
  </tr>
  <tr>
    <td>kubeval</td>
    <td>Validate YAML manifests against API Schema of a specific version
</td>
    <td>Doesn't recognize CRDs</td>
    <td>No</td>
  </tr>
  <tr>
    <td>kube-score</td>
    <td>Analyzes YAML  manifests against standard best practices
Deprecated API version check</td>
    <td>Doesn't validate the definition
No support for specific API versions for deprecated resource check</td>
    <td>No</td>
  </tr>
  <tr>
    <td>copper</td>
    <td>A generic framework for writing custom checks for YAML manifests using JavaScript</td>
    <td>No inbuilt checks
Sparse documentation</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>config-lint</td>
    <td>A generic framework for writing custom checks using DSL embedded in YAML
The framework also supports other configuration formats - Terraform, for example.</td>
    <td>No inbuilt checks
The inbuilt assertions and operations may not be sufficient to account for all checks</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>conftest</td>
    <td>A generic framework for writing custom checks in Rego
Rego is a robust policy language
Sharing policies via OCI bundles</td>
    <td>No inbuilt checks
Rego has a learning curve
Docker hub not supported for sharing of policies</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>polaris</td>
    <td>Analyzes YAML manifest against standard best practices
Allows writing custom checks using JSON Schema</td>
    <td>JSON Schema-based checks may not be sufficient</td>
    <td>Yes</td>
  </tr>
</table>

A combination of kubeval and one of kube-score, copper, config-lint, conftest, or polaris will give you good coverage of static checks to ensure that Kubernetes YAML manifests are valid, conforms to best practices and adheres to any custom policies. Since these tools don't rely on access to a Kubernetes cluster, they are straightforward to set up and enable you to enforce gating as well as give quick feedback to pull request authors for projects.
