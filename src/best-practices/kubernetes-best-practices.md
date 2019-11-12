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

## Chapter 3. Monitoring and Logging in Kubernetes

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

## Chapter 6. Versioning, Releases, and Rollouts

## Chapter 7. Worldwide Application Distribution and Staging

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
- Use https://github.com/sysdiglabs/kube-psp-advisor to generate PodSecurityPolicies automatically based on exisiting Pods

### RuntimeClass

_Allow to specify which container runtime to use for a Pod (if there are multiple ones configured) based on the amount of isolation between containers that is required for this pod._

- Set the `runtimeClassName` field in the pod specification
- Only use it if you have workloads that require different amounts of workload isolation on the host (for security or compliance)

### Other

- Use DenyExecOnPrivileged or DenyEscalatingExec admission controllers as an easier alternative to PodSecurityPolicies -> **however this is not a best practice as these are deprecated and it is recommended to use PodSecurityPolicies**
- Use Falco to enforce security policies within the container runtime

## Chapter 11. Policy and Governance for Your Cluster

Explanation:

_Only allow compliant Kubernetes resources (of any kind) to be applied to the cluster (compliant with the defined policies).

- Open Policy Agent (OPA): policy engine
- Gatekeeper
   - Validating admission control webhook
   - Kubernetes Operator for installing, configuring and managing Open Policy Agent policies

Example policies that can be implemented with Gatekeeper:

- Services must not be exposed publicly on the internet
- Allow containers only from trusted container registries
- All containers must have resource limits
- Ingress hostnames must not overlap
- Ingresses must use only HTTPs_

## Chapter 12. Managing Multiple Clusters

## Chapter 13. Integrating External Services and Kubernetes

## Chapter 14. Running Machine Learning in Kubernetes

## Chapter 15. Building Higher-Level Application Patterns on Top of Kubernetes

## Chapter 16. Managing State and Stateful Applications

## Chapter 17. Admission Control and Authorization

