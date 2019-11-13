# Kubernetes Best Practices

O'Reilly, 2019.

## Chapter 1. Setting Up a Basic Service

### Managing resource manifests

_Resource manifests are the declarative state of an application._

- Store resource manifests in Git (version control)
- Manage Git repository on GitHub (code review)
- Use a single top-level directory for all manifests of an application
- Use subdirectories for subcomponents (e.g. services) of the application
- Use GitOps: ensure that contents of cluster match content of Git repository
  - Deploy to production only from a specific Git branch using some automation (e.g. a CI/CD pipeline)
- Use CI/CD from the beginning (difficult to retrofit into an existing application)

### Managing container images

- Base images on well-known and trusted image providers
  - Alternatively, build all images "from scratch" (e.g. with Go)
- The tag of an image is immutable (i.e. images with different content have different tags
  - Combine semantic versioning with the hash of the corrsponding Git commit (e.g. _v1.0.1-bfeda01f_)
- Avoid the _latest_ tag (is not immutable)

### Deploying applications

- Set resource requests equal to limits: provides predictability at the expense of maximising the resource utilisation (the app can't make use of excess idle resources)
  - Set requests and limits to different values only when you have more experience
- Always use an Ingress for exposing services, even for simple applications (for production, you don't need to use an Ingress for experimentation)
- Manage configuration data that is likely to be updated during runtime separately from the code in a ConfigMap
- Put a version number in the name of each ConfigMap (e.g. `myconfig-v1`). When you make an update to the configuration, create a new ConfigMap with an increased version number (e.g. `myconfig-v2`), and then update the application to use the new ConfigMap. This ensure that the new configuration is loaded into the application, no matter how the ConfigMap is mounted in the app (as an env var or a file, and in the latter case, if the app watches the file for changes)
  - Don't delete the previous ConfigMap (e.g. `myconfig-v1`). This allows to roll back to a previous configuration at any time.
- If deploying an application to multiple environments, use a template system (don't maintain multiple copies of resource manifest directories)
  - Helm, kustomize, Kapitan, ...

## Chapter 2. Developer Workflows

_Creating a development cluster (where developers can deploy and test the applications they are working on)._

- One cluster per organisation or team (10-20 people)
- One namespace for each developer
- Use an external identity systems for cluster user management (Azure Active Directory, AWS IAM)
  - Authentication with bearer token and API server validates token with the external service
- Grant developers the `edit` ClusterRole for their namespace with a RoleBinding (not ClusterRoleBinding)
- Grant developers the `view` ClusterRole for the entire cluster with a ClusterRoleBinding (not RoleBinding)
- Assign a ResourceQuota to each namespace
- Make developer namespaces transient by assigning them a time to live (TTL) after which they are automatically deleted
  - So that no unused resources accumulate in the cluster
- Assign the following annotations to each namespace: TTL, assignee, resource quotas, team, purpose
  - You could define a CRD that creates a namespace with all this metadata

## Chapter 3. Monitoring and Logging in Kubernetes

### Monitoring

- Run monitoring system in a dedicated "utility cluster" (to avoid problems with the target cluster affecting the monitoring system)

### Logging

_Collect and centrally store logs from all the workloads running in the cluster and from the cluster components themselves._

- Implement a retention and archival strategy for logs (retain 30-45 days of historical logs)
- What to collect logs from:
  - Nodes (kubelet, container runtime)
  - Control plane (API server, scheduler, controller mananger)
  - Kubernetes auditing (all requests to the API server)
- Applications should log to stdout rather than to files
  - Allows a daemon on each node to collect the logs from the container runtime (if logging to files, a sidecar container for each pod might be necessary)
- Some log aggregation tools: EFK stack (Elasticsearch, Fluentd, Kibana), DataDog, Sumo Logic, Sysdig, GCP Stackdriver, Azure Monitor, AWS CloudWatch
- Use a hosted logging solution (e.g. DataDog, Stackdriver) rather than a self-hosted one (e.g. EFK stack)

### Alerting

- Only alert on events that affect service level objectives (SLO)
- Only alert on events that require immediate human intervention
- Automate remediation of events that don't require immediate human intervention
- Include relevant information in the alert notification (e.g. link to troubleshooting playbook, context information)

## Chapter 4. Configuration, Secrets, and RBAC

### ConfigMaps and Secrets

- Use ConfigMaps and Secrets to inject configuration into pods
- PodPresets: automatically mount a ConfigMap or Secret to a pod based on annotations
- In the application, watch the configuration file for changes, so that the configuration can be changed at runtime by updating the ConfigMap or Secret
- When using values from a ConfigMap/Secret as environment variables, the environment variables in the containers are NOT updated when updating the ConfigMap/Secret
- Use CI/CD pipeline that restarts pods whenever a ConfigMap/Secret is updated (this ensures that the new data is being used by the pods, even if the application does not watch the configuration file for changes or if the configuration data is mounted as environment variables)
  - Alternatively, include a version name in the name of the ConfigMap and when configuration changes, create a new ConfigMap and update applications to use the new ConfigMap (see Chapter 1).
- Always mount Secrets as volumes (files), never as env vars
- Avoid stateful applications in Kubernetes
  - Use SaaS/cloud service offerings for stateful services
  - If running on premises and public SaaS is not an option, have a dedicated team that provides internal stateful SaaS to the rest of the organisation

### RBAC

- Use specific service accounts for all "users" of the Kubernetes API that are assigned tailored roles with the least amount of privileges to do the job

## Chapter 5. Continuous Integration, Testing, and Deployment

_Common steps of a CI/CD pipeline: (1) push code to Git repository, (2) build entire application code, (3) running tests against the built code, (4) building the container images, (5) push the container images to a container registry, (6) deploy the application to Kubernetes (use one of various deployment strategies, such as rolling update, blue/green deployment, canary deployment, or A/B deployment), (7) run tests against the deployed application (e.g. a chaos experiment)_

- Keep production code in the master branch
- Keep container images sizes small (use scratch images with multistage builds, distroless base images, or optimised base images, e.g. Alpine, Debian Slim)
- Use an image tagging strategy: each image that is built by the CI system should have a unique tag (image tags should be immutable, that is, if two images have differing content, they can't have the same tag, see Chapter 1)
  - Use the build ID as part of the tag
  - Use the Git commit hash as part of the tag
- Minimise CI build times
- Include extensive tests in CI (build should fail if any test fails)
- Set up extensive monitoring in the production environment

## Chapter 6. Versioning, Releases, and Rollouts

_The true declarative nature of Kubernetes really shines when planning the proper use of labels._

_By properly identifying the operational and development states by the means of labels in the resource manifests, it becomes possible to tie in tooling and automation to more easily manage the complex processes of upgrades, rollouts, and rollbacks._

- _Version: increments when the code specification changes_
- _Release: increments when the applicatoin is (re)-deployed (even if it's the same version of the app)_
- _Rollout: how a replicated app is put into production (this is taken care of automatically by the Deployment resource when there are changes to the `deployment.spec.template` field)_
- _Rollback: revert an application to the state of a previous release_

Best practices:

- Label each resource with at least: `app`, `version`, `environment`
  - Pods can additionally be labelled with `tier` and top-level objects like Deployments or Jobs should be labelled with `release` and `release-number`
- Use independent versions for container images, Pods, and Deployments
  - E.g. if Pod specification changes, update only the Pod and Deployment version, but not the container image version
- Use a `release` (e.g. `frontend-stable`, `frontend-alpha`) and `release-number` (e.g. `34e57f01`) label for top-level objects (e.g. Deployment, StatefulSet, Job)
  - If the same version of the app is deployed again, it results in a new release number
  - The release number is created by the CI/CD tool that deploys the application

_Compare this with the officially [recommended labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/) in the Kubernetes documentation._

- `app.kubernetes.io/name`
- `app.kubernetes.io/instance`
- `app.kubernetes.io/version`
- `app.kubernetes.io/component`
- `app.kubernetes.io/part-of`
- `app.kubernetes.io/managed-by`

## Chapter 7. Worldwide Application Distribution and Staging

_Deploying app in multiple regions around the world (for scaling, reduced latency, etc.)._

_Distributing container images, load balancing, canary regions, testing..._

## Chapter 8. Resource Management

### Advanced scheduling

- Pod affinity
- Pod anti-affinity
- Node selector
- Taints and tolerations

### Pod resource management

- Resource requests
- Resource limits
- Quality of Service (automatically determined by values for requests and limits)
- PodDisruptionBudget
- ResourceQuota
- LimitRange
- Cluster autoscaler
- Horizontal pod autoscaler
- Vertical pod autoscaler

## Chapter 9. Networking, Network Security, and Service Mesh

### Services and Ingresses

_Service:_

- ClusterIP (headless service has no label selector but an explicitly assigned Endpoint; is not managed by kube-proxy; has no ClusterIP address but creates a DNS entry for every Pod in the Endpoint)
- NodePort
- ExternalName
- LoadBalancer

_Ingress:_

Provides HTTP application-level routing in contrast to level 3/4 of services.

Ingress controller enables the use of Ingress resources (all of them are third-party)jjj

- All services that don't need to be accessed from outside the cluster should be ClusterIP
- Use Ingress for external-facing HTTP services and choose appropriate ingress controller

### NetworkPolicy

_Defines how pods within the cluster are allowed to communicate with each other._

- _Requires a CNI that suppports NetworkPolicy (Calico, Cilium, Weave Net)_
- Start with restricting ingress, then restrict egress if needed
- Create a deny-all policy in all namespaces
- Try to restrict inter-pod communication to within namespaces (avoid cross-namespace communication)

### Service meshes

_Manage traffic between services of an application (or multiple applications)._

- Most probably only needed for large deployments with hundreds of services and thousands of endpoints

## Chapter 10. Pod and Container Security

### PodSecurityPolicy

_Centrally enforce security-sensitive fields in pod specifications._

_Many fields of PodSecurityPolicy match those of securityContext in the Pod specifications._

- Using PodSecurityPolicies requires the PodSecurityPolicy admission controller to be enabled, but in most Kubernetes deployments it is not enabled. As soon as the PodSecurityPolicy admission controller is enabled, you need appropriate PodSecurityPolicy resources to allow any Pods to be created.
  - You also need to grant "use" access to the created PodSecurityPolicies to the service account of the workload or the controller of the workload (you can use  `system:serviceaccounts` group which compromises all controller service accounts).
- Use <https://github.com/sysdiglabs/kube-psp-advisor> to generate PodSecurityPolicies automatically based on exisiting Pods

### RuntimeClass

_Allow to specify which container runtime to use for a Pod (if there are multiple ones configured) based on the amount of isolation between containers that is required for this pod._

- Set the `runtimeClassName` field in the pod specification
- Only use it if you have workloads that require different amounts of workload isolation on the host (for security or compliance)

### Other

- Use DenyExecOnPrivileged or DenyEscalatingExec admission controllers as an easier alternative to PodSecurityPolicies -> **however this is not a best practice as these are deprecated and it is recommended to use PodSecurityPolicies**
- Use Falco to enforce security policies within the container runtime

## Chapter 11. Policy and Governance for Your Cluster

Explanation:

Only allow compliant Kubernetes resources (of any kind) to be applied to the cluster (compliant with the defined policies).

- Open Policy Agent (OPA): policy engine
- Gatekeeper
  - Validating admission control webhook
  - Kubernetes Operator for installing, configuring and managing Open Policy Agent policies

Example policies that can be implemented with Gatekeeper:

- Services must not be exposed publicly on the internet
- Allow containers only from trusted container registries
- All containers must have resource limits
- Ingress hostnames must not overlap
- Ingresses must use only HTTPs

## Chapter 12. Managing Multiple Clusters

_How to manange multiple clusters, making application in different clusters interact with each other, deploying applications to multiple clusters at once, Kubernetes Federation..._

## Chapter 13. Integrating External Services and Kubernetes

- _Application in Kubernetes consuming a service from outside the cluster_
- _Application outside the cluster consuming a service in Kubernetes_
- _Application in Kubernetes consuming a service in another Kubernetes cluster_

## Chapter 14. Running Machine Learning in Kubernetes

_Apparently, Kubernetes is "perfect environment toenable the machine learning workflow and lifecycle"._

## Chapter 15. Building Higher-Level Application Patterns on Top of Kubernetes

_Develop higher-level abstractions in order to provide more developer-friendly primitives on topof Kubernetes._

## Chapter 16. Managing State and Stateful Applications

### Basic volumes

_Mounting directories from the host into containers._

- Use `emptyDir` for sharing data between containers in the same pod
- Use `hostPath` if the data needs to be accessed also by agents running on the node 

### Storage managed by Kubernetes

_Kubernetes support for managing persistent storage._

- _PersistentVolume: a "disk" that exists independently from any nodes in the cluster and has its own Kubernetes resource_
- _PersistentVolumeClaim: a request for a PersistentVolume referenced from a Pod spec. This exists to prevent that specific PersistentVolumes must be referenced from a Pod spec (making the Pod spec non-portable) by referencing the generic PersistentVolumeClaim instead._
- _StorageClass: defines a provisioner to create the disk backing a PersistentVolume to automate the creation of PersistentVolumes. A StorageClass name is referenced from PersistenVolumeClaim._
- _Default StorageClass: used by any PersistentVolumeClaim that doesn't explicitly define a StorageClass name. Requires the [DefaultStorageClass](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaultstorageclass) admission controller to be enabled._

Best practices:

- Avoid managing state in the cluster if you can: use an outside service for persisting state
  - Even if it involves modifying the app to become stateless
- Define a default StorageClass named `default` (because this is often used by default in Helm charts)
- If cluster is distributed across multiple availability zones, ensure that PersistentVolumes and Pod using them are in the same availability zone
  - By properly labelling all objects and using node affinity, etc.

### Running stateful applications

- Check if an operator exists for the type of application, and if yes, use it

## Chapter 17. Admission Control and Authorization

### Admission control

- Recommended set of admission controllers to enabled: `NamespaceLifecycle, LimitRanger, ServiceAccount, DefaultStorageClass, DefaultTolerationSeconds, MutatingAdmissionWebhook, ValidatingAdmissionWebhook, Priority, ResourceQuota, PodSecurityPolicy`
- If you use multiple mutating admission control webhooks, don't modify the same fields of the same resources (the order in which admission control webhook are called is undefined)
- If you use mutating admission webhooks, also create a validating admission webhook that verifies that the resources have been modified in the way you expected
- Define the least amount of requests to be sent to an admission webhook (avoid `resources: [*]`, etc.)
- Always use the `namespaceSelector` field in MutatingWebhookConfiguration/ValidatingWebhookConfiguration, which causes the admission control webhook to be only applied in certain namespaces. Select the least amount of namespaces that are necessary.
- Always exclude the `kube-system` namespace from the scope of an admisson control webhook by the means of the `namespaceSelector` field
- Don't give anyone RBAC rules to create MutatingWebhookConfiguration/ValidatingWebhookConfiguration unless it's really needed 
- Don't send Secret resources to an admission control webhook if it's not needed (scope the requests that are passed to the webhook to the bare minimum)

### Authorization

- Only use the default RBAC mode (there's also ABAC and webhook, but don't use them)
- For RBAC best practices, see Chapter 4
