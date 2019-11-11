# Kubernetes Best Practices

O'Reilly, 2019.

## Chapter 1. Setting Up a Basic Service

## Chapter 2. Developer Workflows

## Chapter 3. Monitoring and Logging in Kubernetes

## Chapter 4. Configuration, Secrets, and RBAC

### ConfigMaps and Secrets

- Use ConfigMaps and Secrets to inject configuration into pods
- PodPresets: automatically mount a ConfigMap or Secret to a pod based on annotations
- In the application, watch the configuration file for changes, so that the configuration can be changed at runtime by updating the ConfigMap or Secret
- When using values from a ConfigMap/Secret as environment variables, the environment variables in the containers are NOT updated when updating the ConfigMap/Secret
- CI/CD pipeline that restarts pods whenever a ConfigMap/Secret is updated (this ensures that the new data is being used by the pods, even if the application does not watch the configuration file for changes or if the configuration data is mounted as environment variables)

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

