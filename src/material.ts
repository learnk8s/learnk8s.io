export interface MaterialModule {
  name: string
  description: string
  topics: string[]
}

export const material = {
  docker: {
    name: 'Linux containers and Kubernetes',
    description: `Kubernetes doesn't know how to deploy Java, Node.js, or .NET applications. The only thing it can deal with is Linux containers. But how do these Linux containers work? Why should you care? Are those necessary to master Kubernetes?`,
    topics: [
      'Running containers',
      'Docker registries',
      'Mounting volumes',
      'Building Docker images',
      'Exposing ports',
      'Containers lifecycle',
      'Injecting environment variables',
      'Debugging running containers',
    ],
  } as MaterialModule,
  zeroToKubernetes: {
    name: 'Zero to k8s',
    description: 'Learn the basics of Kubernetes and deploy your first application to minikube — a Kubernetes cluster for local development. Learn how to declare resources in YAML files, how to send those to the cluster and retrieve them. Understand how Kubernetes reconciles the desired state of the infrastructure.',
    topics: [
      'Creating a local cluster',
      'Creating deployments',
      'Exposing applications',
      'Scaling apps',
      'Testing failover',
    ],
  } as MaterialModule,
  deploymentStrategies: {
    name: 'Deployment strategies',
    description: `Every time you deploy new features in production you don't want to stop your service, load a new version and remove the holding page. Ideally, you should be able to transition to a new version of your application without anyone noticing any downtime. You can leverage Kubernetes to do that.`,
    topics: [
      'Rolling updates',
      'Services and selectors',
      'Canary deployments',
      'Blue-green deployments',
      'Rollbacks',
    ],
  } as MaterialModule,
  architecture: {
    name: 'Kubernetes Architecture',
    description: `When you deploy applications to Kubernetes you don't decide in which server a container is scheduled. Kubernetes abstracts your data centre into a single entity, and you don't get to worry about the underlying resources. But how does Kubernetes work its magic?`,
    topics: [
      'Creating a three nodes cluster',
      'Exploring the control plane',
      'Exploring the kubelet: the Kubernetes agent',
      'Interacting with the API server',
      'Testing resiliency',
    ],
  } as MaterialModule,
  networking: {
    name: 'Netwoking in Kubernetes',
    description: `How do you route traffic from the internet to your applications? How can you secure your communication with TLS? How about path routing to different services? In this module, you will explore how the traffic is routed in the cluster.`,
    topics: [
      'Exploring the Endpoints',
      'In-cluster load balancing',
      'kube-proxy',
      'The four kind of Services',
      'Installing and debugging the Ingress',
      'Service discovery',
    ],
  } as MaterialModule,
  managingState: {
    name: 'Managing state in Kubernetes',
    description: `How does Kubernetes store files and state? Can you host databases in it? Should you? Can you extract configurations and share them with different deployments? How do you make sure that your storage layer is replicated and persisted even if a node becomes unavailable?`,
    topics: [
      'Managing configurations',
      'Managing secrets',
      'Persisting changes',
      'Dynamic volume provisioning',
      'Stateful workloads',
    ],
  } as MaterialModule,
  templating: {
    name: 'Templating Kubernetes resources',
    description: `Resources in Kubernetes are described as YAML files. If you wish to have the same resources for different environments such as development, preproduction and production you may be tempted to copy the files three times. Or you could use a templating engine. Learn how to do precisely that with Helm — the Kubernetes package manager.`,
    topics: [
      'Creating reusable templates',
      `Helm's templating engine`,
      'Releases lifecycle',
      'Writing helpers',
      'Rollbacks',
    ],
  } as MaterialModule,
  advancedNetworking: {
    name: 'Advanced networking',
    description: 'Dive into the specifics of network interfaces, IP addresses and network topologies in this session about advanced Kubernetes networking.',
    topics: [],
  } as MaterialModule,
  security: {
    name: 'Security',
    description: 'Wear your black hat and try to break the cluster. Study mitigation and countermeasure to secure your cluster against malicious attacks.',
    topics: [],
  } as MaterialModule,
  autoscaling: {
    name: 'Autoscaling',
    description: ``,
    topics: [],
  } as MaterialModule,
  advancedScheduling: {
    name: 'Advanced scheduling',
    description: 'Master advanced placements of workloads in your infrastructure. Learn how to schedule machine learning deployments to nodes with GPU or how you can segregate workloads for regions (useful if you need to comply with policies and regulations).',
    topics: [],
  } as MaterialModule,
  multiCloud: {
    name: 'Multi-cloud, multi-data centre deployments',
    description: `Learn how to design clusters that span multiple cloud providers for resilience, disaster recovery or just saving money.`,
    topics: [],
  } as MaterialModule,
  serviceMeshes: {
    name: 'Service meshes',
    description: ``,
    topics: [],
  } as MaterialModule,
  extensions: {
    name: 'Extending and customising Kubernetes',
    description: ``,
    topics: [],
  } as MaterialModule,
  managedServices: {
    name: 'EKS, AKS, GKE',
    description: 'Discover the nitty-gritty details of how AKS, EKS and GKE work and their strength and limitations.',
    topics: [],
  } as MaterialModule,
  pipelines: {
    name: 'CI/CD pipelines',
    description: 'Learn how to design CI/CD pipelines that leverage containers and Kubernetes. Ship software quicker, more reliably and cheaply.',
    topics: [],
  } as MaterialModule,
}