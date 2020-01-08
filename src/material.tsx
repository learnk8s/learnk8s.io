import * as React from 'react'

const content = {
  docker: {
    id: 'LK8S-CONTAINERS',
    name: 'Linux containers and Kubernetes',
    description: `Kubernetes doesn't know how to deploy apps written in languages such as Java, Node.js, or .NET. Instead, it only understands and uses Linux containers. But how do these Linux containers work? Are those strictly necessary to master Kubernetes? In this course, you will familiarise yourself with containers and Docker.`,
    cover: <img src='assets/material/cover_containers.svg' alt='Linux containers and Kubernetes' />,
    topics: {
      containersVMs: {
        title: 'Containers vs VMs',
        image: <img src='assets/material/vms-2.svg' alt='Containers vs VMs' />,
      },
      isolation: {
        title: 'Understanding process isolation',
        image: <img src='assets/material/bundle-10.svg' alt='Process isolation' />,
      },
      docker: {
        title: 'Is Docker the only one?',
        image: <img src='assets/material/cgroups-ns-9.svg' alt='Docker' />,
      },
      architecture: {
        title: 'Docker client-server architecture',
        image: <img src='assets/material/architecture-7.svg' alt='Docker client-server architecture' />,
      },
      run: {
        title: 'Running containers',
        image: <img src='assets/material/docker-run-5.svg' alt='docker run' />,
      },
      build: {
        title: 'Building Docker images',
        image: <img src='assets/material/docker-build-2.svg' alt='docker build' />,
      },
      volumes: {
        title: 'Mounting volumes',
        image: <img src='assets/material/volumes-3.svg' alt='Docker volumes' />,
      },
      port: {
        title: 'Exposing ports',
        image: <img src='assets/material/forwarding-6.svg' alt='Forwarding ports with Docker' />,
      },
      managing: {
        title: 'Managing containers lifecycle',
        image: <img src='assets/material/managing-containers-3.svg' alt='Containers lifecycle' />,
      },
      environment: {
        title: 'Injecting environment variables',
        image: <img src='assets/material/env-3.svg' alt='Injecting environment variables' />,
      },
      debugging: {
        title: 'Debugging running containers',
        image: <img src='assets/material/exec-1.svg' alt='Debugging containers' />,
      },
    },
  },
  kubernetesFundamentals: {
    id: 'LK8S-FUNDAMENTALS',
    name: 'Kubernetes fundamentals',
    description:
      'In this course, you will learn how to build, deploy and scale your application in a Kubernetes cluster. You will also learn how to declare and schedule resources to the cluster and understand how to expose architect apps that are designed to be horizontally scalable.',
    cover: <img src='assets/material/cover_fundamentals.svg' alt='Kubernetes fundamentals' />,
    topics: {
      containersAtScale: {
        title: 'Managing containers at scale',
        image: <img src='assets/material/allocations-5.svg' alt='Collection of servers' />,
      },
      containerOrchestrators: {
        title: 'The battle of container orchestrators',
        image: <img src='assets/material/orchestrators-2.svg' alt='Kubernetes, Apache Mesos, Hashicorp Nomad' />,
      },
      datacentreAsVM: {
        title: 'Visualising the data centre as a single VM',
        image: <img src='assets/material/dc-single-vm-7.svg' alt='Data centre as single a virtual machine' />,
      },
      tetrisPlayer: {
        title: 'The best Tetris player',
        image: <img src='assets/material/scheduler-13.svg' alt='Playing tetris with Kubernetes' />,
      },
      apiInfrastructure: {
        title: 'Exploring an API over your infrastructure',
        image: <img src='assets/material/api-12.svg' alt='Kubernetes Open API definition' />,
      },
      basics: {
        title: 'What are Pods, Services, and Igresses?',
        image: <img src='assets/material/logical-11.svg' alt='Kubernetes basic concepts' />,
      },
      localCluster: {
        title: 'Creating a local cluster with minikube',
        image: <img src='assets/material/minikube-6.svg' alt='minikube' />,
      },
      deploy: {
        title: 'Creating a Deployment',
        image: <img src='assets/material/deployment-4.svg' alt='Deployment' />,
      },
      expose: {
        title: 'Exposing Deployments',
        image: <img src='assets/material/logical-6.svg' alt='Exposing deployment' />,
      },
      pod: {
        title: 'What is a Pod?',
        image: <img src='assets/material/pod-4.svg' alt='Pod' />,
      },
      scale: {
        title: 'Scaling applications',
        image: <img src='assets/material/6-deployment-strategies.svg' alt='Collection of applications' />,
      },
      failover: {
        title: 'Testing resiliency',
        image: <img src='assets/material/deployment-5.svg' alt='Deleting a Pod' />,
      },
    },
  },
  deploymentStrategies: {
    id: 'LK8S-ADVANCED-DEPLOYMENTS',
    name: 'Deployment strategies',
    description: `Every time you deploy new features in production, you shouldn't stop your app, change the version and start it again. With zero-downtime deployments, no one notices any glitch while you're upgrading your apps. How does that work in Kubernetes? In this course, you will learn how Services work in Kubernetes and how you can roll out changes with zero downtime using Rolling updates, Canary Deployments or Blue-green deployments.`,
    cover: <img src='assets/material/cover_deployment-strategies.svg' alt='Advanced deployment strategies' />,
    topics: {
      uptime: {
        title: 'Monitoring for uptime',
        image: <img src='assets/material/5-deployment-strategies.svg' alt='A collection of apps' />,
      },
      livenessProbe: {
        title: 'Liveness probe',
        image: <img src='assets/material/32-deployment-strategies.svg' alt='Liviness probe' />,
      },
      readinessProbe: {
        title: 'Readiness probe',
        image: <img src='assets/material/25-deployment-strategies.svg' alt='Readiness probe' />,
      },
      rollingUpdates: {
        title: 'Executing zero downtime deployments',
        image: <img src='assets/material/48-deployment-strategies.svg' alt='Rolling updates' />,
      },
      servicesAndSelectors: {
        title: 'Using labels and selectors',
        image: <img src='assets/material/73-deployment-strategies.svg' alt='Labels and selectors' />,
      },
      canaryDeployments: {
        title: 'Releasing features with canary deploymentss',
        image: <img src='assets/material/61-deployment-strategies.svg' alt='Canary deployment' />,
      },
      bluGreenDeployments: {
        title: 'Releasing features with blue-green deployments',
        image: <img src='assets/material/95-deployment-strategies.svg' alt='Blue-green deployment' />,
      },
      rollbacks: {
        title: 'Preparing for rollbacks',
        image: <img src='assets/material/109-deployment-strategies.svg' alt='Rollbacks' />,
      },
    },
  },
  architecture: {
    id: 'LK8S-ARCHITECTURE',
    name: 'Kubernetes Architecture',
    description: `Can Kubernetes recover from failures? In this course, you will learn the Kubernetes core components by building a cluster from scratch using kubeadm. But the best way to learn something is by breaking it. So you will also break the cluster one node at the time and observe what happens.`,
    cover: <img src='assets/material/cover_architecture.svg' alt='Architecture' />,
    topics: {
      clusters: {
        title: 'Single and multi-node clusters',
        image: <img src='assets/material/20-architecture.svg' alt='Multi-node cluster' />,
      },
      controlPlane: {
        title: 'Examining the control plane',
        image: <img src='assets/material/48-architecture.svg' alt='Control plane' />,
      },
      etcd: {
        title: 'Persisting changes in etcd',
        image: <img src='assets/material/31-architecture.svg' alt='etcd' />,
      },
      raft: {
        title: 'Syncing changes with RAFT',
        image: <img src='assets/material/36-architecture.svg' alt='Raft protocol' />,
      },
      events: {
        title: 'Event-based architecture',
        image: <img src='assets/material/43-architecture.svg' alt='Controller manager reacts to an event' />,
      },
      kubelet: {
        title: 'Understanding the kubelet',
        image: <img src='assets/material/54-architecture.svg' alt='kubelet asking for updates' />,
      },
      noSinglePointOfFailure: {
        title: 'Verifying "no single point of failure"',
        image: <img src='assets/material/70-architecture.svg' alt='Testing failover in a Kubernetes cluster' />,
      },
      multiNodes: {
        title: 'Setting up a multi-master cluster',
        image: <img src='assets/material/83-architecture.svg' alt='HA multi-master setup' />,
      },
      eks: {
        title: 'Investigating multi-master setup in EKS',
        image: <img src='assets/material/85-architecture.svg' alt='Amazon Elastic Container Service for Kubernetes' />,
      },
      monzo: {
        title: 'Exploring multi-master setup in Monzo',
        image: <img src='assets/material/95-architecture.svg' alt='Monzo multi-master setup' />,
      },
      kubeadm: {
        title: 'Creating a 3 node cluster with kubeadm',
        image: <img src='assets/material/164-architecture.svg' alt='Three nodes cluster' />,
      },
      overlay: {
        title: 'Installing an overlay network',
        image: <img src='assets/material/flannel.svg' alt='Flannel overlay network' />,
      },
      ingress: {
        title: 'Installing an Ingress controller',
        image: <img src='assets/material/traefik.svg' alt='Traefik ingress controller' />,
      },
      api: {
        title: 'Exploring the API without kubectl',
        image: <img src='assets/material/api-12.svg' alt='Kubernetes Open API definition' />,
      },
      resiliency: {
        title: 'Taking down the cluster one node at the time',
        image: <img src='assets/material/165-architecture.svg' alt='Testing Kubernetes resiliency' />,
      },
    },
  },
  networking: {
    id: 'LK8S-NETWORKING',
    name: 'Networking in Kubernetes',
    description: `How do you route external traffic to your applications in the cluster? How can two apps in the cluster talk to each other? How is Kubernetes assigning IP addresses to Pods and Services? In this course, you will explore how the traffic is routed in the cluster.`,
    cover: <img src='assets/material/cover_networking.svg' alt='Networking' />,
    topics: {
      basicNetworking: {
        title: 'Network routing in Linux',
        image: <img src='assets/material/basic-network-15.svg' alt='Basic networking' />,
      },
      networkRequirements: {
        title: 'Understanding network requirements',
        image: <img src='assets/material/network-setup-8.svg' alt='Example of a Kubernetes network' />,
      },
      endpoints: {
        title: 'Exploring the Endpoints',
        image: <img src='assets/material/endpoints-dynamic-list-3.svg' alt='Endpoint object' />,
      },
      loadBalancing: {
        title: 'Balancing in-cluster traffic',
        image: <img src='assets/material/in-cluster-balancing-11.svg' alt='Load balancing' />,
      },
      kubeProxy: {
        title: 'Routing traffic with kube-proxy',
        image: <img src='assets/material/kube-proxy-routing-11.svg' alt='kube-proxy' />,
      },
      interfaces: {
        title: 'CRI, CNI, CSI: interfaces for the kubelet',
        image: <img src='assets/material/endpoints-11.svg' alt='CRI, CSI, CNI' />,
      },
      latency: {
        title: 'Choosing between latency and load balancing',
        image: <img src='assets/material/in-cluster-balancing-9.svg' alt='In-cluster load balancing' />,
      },
      servicesProsAndCons: {
        title: 'Pros and cons of the 4 types of Services',
        image: <img src='assets/material/which-service-7.svg' alt='Services pros and cons' />,
      },
      serviceDiscovery: {
        title: 'Discovering Services',
        image: <img src='assets/material/service-discovery-7.svg' alt='Service discovery' />,
      },
      ingress: {
        title: 'Routing traffic with an Ingress controller',
        image: <img src='assets/material/ingress-9.svg' alt='Ingress controller' />,
      },
      e2e: {
        title: 'End-to-end traffic journey',
        image: <img src='assets/material/e2e-ingress-18.svg' alt='End-to-end traffic flow' />,
      },
    },
  },
  managingState: {
    id: 'LK8S-MANAGING-STATE',
    name: 'Managing state in Kubernetes',
    description: `How does Kubernetes store state? Can you host databases in your cluster? Can you extract configurations and share them with different deployments? How do you make sure that your storage layer is replicated and persisted even if a node becomes unavailable? In this course, you will learn how to deploy a database with durable persistence.`,
    cover: <img src='assets/material/cover_managing-state.svg' alt='Managing state' />,
    topics: {
      configMaps: {
        title: 'Managing configurations',
        image: <img src='assets/material/13-state.svg' alt='ConfigMap' />,
      },
      secrets: {
        title: 'Managing secrets',
        image: <img src='assets/material/24-state.svg' alt='Secrets' />,
      },
      volumes: {
        title: 'Using Kubernetes Volumes',
        image: <img src='assets/material/66-state.svg' alt='Kubernetes volumes' />,
      },
      persistentVolumes: {
        title: 'Creating Persistent Volumes',
        image: <img src='assets/material/94-state.svg' alt='Kubernetes persistent volumes' />,
      },
      persistentVolumeClaims: {
        title: 'Creating Persistent Volume Claims',
        image: <img src='assets/material/119-state.svg' alt='Kubernetes persistent volume claims' />,
      },
      storageClass: {
        title: 'Provisioning volumes dynamically',
        image: <img src='assets/material/137-state.svg' alt='StorageClass templates' />,
      },
      statefulSets: {
        title: 'Managing stateful applications',
        image: <img src='assets/material/203-state.svg' alt='Stateful applications' />,
      },
      localVolumes: {
        title: 'Creating volumes on bare metal',
        image: <img src='assets/material/152-state.svg' alt='Deploying Apache Cassandra' />,
      },
      singleDatabase: {
        title: 'Deploying a single database with persitence',
        image: <img src='assets/material/48-state.svg' alt='Deploying PostgreSQL' />,
      },
      clusteredDatabase: {
        title: 'Deploying a clustered database with persitence',
        image: <img src='assets/material/174-state.svg' alt='Deploying a clustered PostgreSQL' />,
      },
      distributedStorage: {
        title: 'Designing storage that can span multiple nodes',
        image: <img src='assets/material/252-state.svg' alt='Clustered PostgreSQL with OpenEBS' />,
      },
    },
  },
  templating: {
    id: 'LK8S-TEMPLATING',
    name: 'Templating Kubernetes resources',
    description: `Resources in Kubernetes are described as YAML files. If you wish to have the same resources for different environments such as development, preproduction and production, you may be tempted to copy the files three times. Or you could use a templating engine. In this course, you will learn how to do precisely that with Helm.`,
    cover: <img src='assets/material/cover_templating.svg' alt='Templating resources' />,
    topics: {
      reusableTemplates: {
        title: 'Creating reusable templates',
        image: <img src='assets/material/5-templating.svg' alt='Templating resources' />,
      },
      helm: {
        title: `Helm's templating engine`,
        image: <img src='assets/material/2-templating.svg' alt='Templating variables' />,
      },
      helmArchitecture: {
        title: 'Understanding the Helm architecture',
        image: <img src='assets/material/29-templating.svg' alt='Helm architecture' />,
      },
      templating: {
        title: 'Templating resources with Go and Sprig',
        image: <img src='assets/material/golang.svg' alt='Golang' />,
      },
      releases: {
        title: 'Managing releases with Helm',
        image: <img src='assets/material/57-templating.svg' alt='Releases in Helm' />,
      },
      helpers: {
        title: 'Writing helper functions',
        image: <img src='assets/material/65-templating.svg' alt='Helpers in Helm' />,
      },
      rollbacks: {
        title: 'Reverting changes with rollbacks',
        image: <img src='assets/material/79-templating.svg' alt='Rollbacks in Helm' />,
      },
      dependencies: {
        title: 'Depending on other charts',
        image: <img src='assets/material/89-templating.svg' alt='Dependencies in Helm' />,
      },
      repositories: {
        title: 'Storing reusable templates in repositories',
        image: <img src='assets/material/84-templating.svg' alt='Chart Museum' />,
      },
    },
  },
  advancedNetworking: {
    id: 'LK8S-ADVANCED-NETWORKING',
    name: 'Advanced networking',
    description:
      "Dive into the specifics of network interfaces, IP addresses and network topologies in this course about advanced Kubernetes networking. Learn how to build your Kubernetes network and how the Container Network Interface (CNI) works. And while you're at it why not making your very own Container Network Interface (CNI)?",
    cover: <img src='assets/material/cover_advanced-networking.svg' alt='Advanced networking' />,
    topics: {
      nodeNetwork: {
        title: 'Exploring the Node network',
        image: <img src='assets/material/9-networking.svg' alt='Node network' />,
      },
      clusterNetwork: {
        title: 'Cluster network',
        image: <img src='assets/material/29-networking.svg' alt='Kubernetes cluster network' />,
      },
    },
  },
  security: {
    id: 'LK8S-SECURITY',
    name: 'Security',
    description:
      'Wear your black hat and try to break the cluster. Study mitigation and countermeasure to secure your cluster against malicious attacks.',
    topics: {
      rbac: {
        title: 'Role-based access control',
        image: <img src='assets/material/security-04.svg' alt='Kubernetes RBAC' />,
      },
    },
  },
  autoscaling: {
    id: 'LK8S-AUTOSCALING',
    name: 'Autoscaling',
    description: `After deploying your app to production, the received traffic may change in unpredictable ways. How do you keep your app responsive at all times? You can adapt the number of replicas. But is it feasible to do this manually, or are there better ways? In this course, you will learn how to autoscale an application based on an application-specific custom metric.`,
    cover: <img src='assets/material/cover_autoscaling.svg' alt='autoscaling' />,
    topics: {
      intro: {
        title: 'Introduction to autoscaling',
        image: <img src='assets/material/cluster-autoscaler.svg' alt='Cluster autoscaler' />,
      },
      hpa: {
        title: 'The Horizontal Pod Autoscaler',
      },
      registry: {
        title: 'The Kubernetes metrics registry',
        image: <img src='assets/material/scaling-external-metrics.svg' alt='Scaling with external registry metrics' />,
      },
      app: {
        title: 'Exposing metrics from your apps',
      },
      prometheus: {
        title: 'Installing and configuring Prometheus',
      },
      adapters: {
        title: 'Understanding custom and external metrics adapters',
      },
      tuning: {
        title: 'Tuning the Horizontal Pod Autoscaler',
      },
    },
  },
  advancedScheduling: {
    id: 'LK8S-ADVANCED-SCHEDULING',
    name: 'Advanced scheduling',
    description:
      'Master advanced placements of workloads in your infrastructure. Learn how to schedule machine learning deployments to nodes with GPU or how you can segregate workloads for regions (useful if you need to comply with policies and regulations).',
    topics: {
      antiAffinity: {
        title: 'Node affinity and anti-affinity',
        image: <img src='assets/material/node-affinity07.svg' alt='Node affinity and anti-affinity' />,
      },
    },
  },
  multiCloud: {
    id: 'LK8S-MULTICLOUD',
    name: 'Multi-cloud, multi-data centre deployments',
    description: `Learn how to design clusters that span multiple cloud providers for resilience, disaster recovery or just saving money.`,
    topics: {
      clusterFederation: {
        title: 'Cluster federation',
        image: <img src='assets/material/multicloud07.svg' alt='Cluster federation' />,
      },
    },
  },
  serviceMeshes: {
    id: 'LK8S-SERVICE-MESHES',
    name: 'Service meshes',
    description: `When you have dozens, hundreds or even thousands of applications interacting in your cluster, it's hard to tell what is going on. What if you could inspect the traffic without affecting routine operations? What if you could upgrade the network and encrypt communications? In this course, you will explore what a Service Mesh is and how you can build your own.`,
    cover: <img src='assets/material/cover_service-meshes.svg' alt='Service meshes' />,
    topics: {
      why: {
        title: 'Why service meshes?',
      },
      envoy: {
        title: 'Envoy',
      },
      circuitBreaker: {
        title: 'Circuit breaker, rate limiting and filters',
      },
      discovery: {
        title: 'Envoy discovery service',
      },
      k8s: {
        title: 'Envoy and Kubernetes integration',
      },
      lb: {
        title: 'Load balancing with Envoy',
      },
      mesh: {
        title: 'Building a basic service mesh',
      },
    },
  },
  extensions: {
    id: 'LK8S-EXTENDING',
    name: 'Extending and customising Kubernetes',
    description: ``,
    topics: {
      operators: {
        title: 'Extending Kubernetes with operators',
        image: <img src='assets/material/operator-framework.svg' alt='Operator framework from CoreOS' />,
      },
    },
  },
  managedServices: {
    id: 'LK8S-MANAGED',
    name: 'EKS, AKS, GKE',
    description: 'Discover the nitty-gritty details of how AKS, EKS and GKE work and their strength and limitations.',
    topics: {
      managedServices: {
        title: 'Kubernetes managed services',
        image: <img src='assets/material/managed-services.svg' alt='AKS, EKS and GKE' />,
      },
    },
  },
  pipelines: {
    id: 'LK8S-CICD',
    name: 'CI/CD pipelines',
    description:
      'Learn how to design CI/CD pipelines that leverage containers and Kubernetes. Ship software quicker, more reliably and cheaply.',
    topics: {
      flow: {
        title: 'From development to production',
        image: <img src='assets/material/pipeline15.svg' alt='From development to production' />,
      },
    },
  },
  ckad: {
    id: 'LK8S-CKAD',
    name: 'CKAD exam preparation',
    description:
      'This course is designed to help you prepare and pass the Certified Kubernetes Application Developer (CKAD) exam. It has practical challenges as well as tips and tricks on how to be efficient with your time during the exam.',
    cover: <img src='assets/material/cover_ckad.svg' alt='CKAD exam preparation' />,
    topics: {
      intro: {
        title: 'Introduction to the CKAD exam',
      },
      tipsAndTricks: {
        title: 'Tips and tricks',
      },
      core: {
        title: 'Core concepts',
      },
      podDesign: {
        title: 'Pod design',
      },
      configuration: {
        title: 'Configuration',
      },
      observability: {
        title: 'Observability',
      },
      networking: {
        title: 'Services and networking',
      },
      state: {
        title: 'State persistence',
      },
    },
  },
}

export const assets: {
  [section in keyof typeof content]: { [topic in keyof typeof content[section]['topics']]: JSX.Element }
} = Object.keys(content).reduce((acc, key) => {
  ;(acc as any)[key] = {}
  ;(acc as any)[key] = Object.keys(content[key as keyof typeof content].topics).reduce((acc, topic) => {
    acc[topic] = (content[key as keyof typeof content].topics as any)[topic].image
    return acc
  }, {} as any)
  return acc
}, {} as any)

/* WARNING: this mutates content */
export const material: {
  [section in keyof typeof content]: {
    id: string
    name: string
    description: string
    cover: JSX.Element
    topics: { [topic in keyof typeof content[section]['topics']]: string }
  }
} = Object.keys(content).reduce(
  (acc: any, key) => {
    acc[key].topics = Object.keys(content[key as keyof typeof content].topics).reduce((acc: any, topic) => {
      acc[topic] = (content[key as keyof typeof content].topics as any)[topic].title
      return acc
    }, {})
    return acc
  },
  { ...(content as any) } as any,
)
