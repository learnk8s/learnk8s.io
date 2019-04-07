import { Image } from './assets'
import { ok } from 'assert'
import { existsSync } from 'fs'

const content = {
  docker: {
    name: 'Linux containers and Kubernetes',
    description: `Kubernetes doesn't know how to deploy Java, Node.js, or .NET applications. The only thing it can deal with is Linux containers. But how do these Linux containers work? Why should you care? Are those necessary to master Kubernetes?`,
    topics: {
      containersVMs: {
        title: 'Containers vs VMs',
        image: Image({ url: 'assets/material/vms-2.svg', description: 'Containers vs VMs' }),
      },
      isolation: {
        title: 'Understanding process isolation',
        image: Image({ url: 'assets/material/bundle-10.svg', description: 'Process isolation' }),
      },
      docker: {
        title: 'Is Docker the only one?',
        image: Image({ url: 'assets/material/cgroups-ns-9.svg', description: 'Docker' }),
      },
      architecture: {
        title: 'Docker client-server architecture',
        image: Image({ url: 'assets/material/architecture-7.svg', description: 'Docker client-server architecture' }),
      },
      run: {
        title: 'Running containers',
        image: Image({ url: 'assets/material/docker-run-5.svg', description: 'docker run' }),
      },
      build: {
        title: 'Building Docker images',
        image: Image({ url: 'assets/material/docker-build-2.svg', description: 'docker build' }),
      },
      volumes: {
        title: 'Mounting volumes',
        image: Image({ url: 'assets/material/volumes-3.svg', description: 'Docker volumes' }),
      },
      port: {
        title: 'Exposing ports',
        image: Image({ url: 'assets/material/forwarding-6.svg', description: 'Forwarding ports with Docker' }),
      },
      managing: {
        title: 'Managing containers lifecycle',
        image: Image({ url: 'assets/material/managing-containers-3.svg', description: 'Containers lifecycle' }),
      },
      environment: {
        title: 'Injecting environment variables',
        image: Image({ url: 'assets/material/env-3.svg', description: 'Injecting environment variables' }),
      },
      debugging: {
        title: 'Debugging running containers',
        image: Image({ url: 'assets/material/exec-1.svg', description: 'Debugging containers' }),
      },
    },
  },
  zeroToKubernetes: {
    name: 'Zero to k8s',
    description:
      'Learn the basics of Kubernetes and deploy your first application to minikube — a Kubernetes cluster for local development. Learn how to declare resources in YAML files, how to send those to the cluster and retrieve them. Understand how Kubernetes reconciles the desired state of the infrastructure.',
    topics: {
      containersAtScale: {
        title: 'Managing containers at scale',
        image: Image({ url: 'assets/material/allocations-5.svg', description: 'Collection of servers' }),
      },
      containerOrchestrators: {
        title: 'The battle of container orchestrators',
        image: Image({
          url: 'assets/material/orchestrators-2.svg',
          description: 'Kubernetes, Apache Mesos, Hashicorp Nomad',
        }),
      },
      datacentreAsVM: {
        title: 'Visualising the data centre as a single VM',
        image: Image({
          url: 'assets/material/dc-single-vm-7.svg',
          description: 'Data centre as single a virtual machine',
        }),
      },
      tetrisPlayer: {
        title: 'The best Tetris player',
        image: Image({ url: 'assets/material/scheduler-13.svg', description: 'Playing tetris with Kubernetes' }),
      },
      apiInfrastructure: {
        title: 'Exploring an API over your infrastructure',
        image: Image({ url: 'assets/material/api-12.svg', description: 'Kubernetes Open API definition' }),
      },
      basics: {
        title: 'What are Pods, Services, and Igresses?',
        image: Image({ url: 'assets/material/logical-11.svg', description: 'Kubernetes basic concepts' }),
      },
      localCluster: {
        title: 'Creating a local cluster with minikube',
        image: Image({ url: 'assets/material/minikube-6.svg', description: 'minikube' }),
      },
      deploy: {
        title: 'Creating a Deployment',
        image: Image({ url: 'assets/material/deployment-4.svg', description: 'Deployment' }),
      },
      expose: {
        title: 'Exposing Deployments',
        image: Image({ url: 'assets/material/logical-6.svg', description: 'Exposing deployment' }),
      },
      pod: {
        title: 'What is a Pod?',
        image: Image({ url: 'assets/material/pod-4.svg', description: 'Pod' }),
      },
      scale: {
        title: 'Scaling applications',
        image: Image({ url: 'assets/material/6-deployment-strategies.svg', description: 'Collection of applications' }),
      },
      failover: {
        title: 'Testing resiliency',
        image: Image({ url: 'assets/material/deployment-5.svg', description: 'Deleting a Pod' }),
      },
    },
  },
  deploymentStrategies: {
    name: 'Deployment strategies',
    description: `Every time you deploy new features in production you don't want to stop your service, load a new version and remove the holding page. Ideally, you should be able to transition to a new version of your application without anyone noticing any downtime. You can leverage Kubernetes to do that.`,
    topics: {
      uptime: {
        title: 'Monitoring for uptime',
        image: Image({ url: 'assets/material/5-deployment-strategies.svg', description: 'A collection of apps' }),
      },
      livenessProbe: {
        title: 'Liveness probe',
        image: Image({ url: 'assets/material/32-deployment-strategies.svg', description: 'Liviness probe' }),
      },
      readinessProbe: {
        title: 'Readiness probe',
        image: Image({ url: 'assets/material/25-deployment-strategies.svg', description: 'Readiness probe' }),
      },
      rollingUpdates: {
        title: 'Executing zero downtime deployments',
        image: Image({ url: 'assets/material/48-deployment-strategies.svg', description: 'Rolling updates' }),
      },
      servicesAndSelectors: {
        title: 'Using labels and selectors',
        image: Image({ url: 'assets/material/73-deployment-strategies.svg', description: 'Labels and selectors' }),
      },
      canaryDeployments: {
        title: 'Releasing features with canary deploymentss',
        image: Image({ url: 'assets/material/61-deployment-strategies.svg', description: 'Canary deployment' }),
      },
      bluGreenDeployments: {
        title: 'Releasing features with blue-green deployments',
        image: Image({ url: 'assets/material/95-deployment-strategies.svg', description: 'Blue-green deployment' }),
      },
      rollbacks: {
        title: 'Preparing for rollbacks',
        image: Image({ url: 'assets/material/109-deployment-strategies.svg', description: 'Rollbacks' }),
      },
    },
  },
  architecture: {
    name: 'Kubernetes Architecture',
    description: `When you deploy applications to Kubernetes you don't decide in which server a container is scheduled. Kubernetes abstracts your data centre into a single entity, and you don't get to worry about the underlying resources. But how does Kubernetes work its magic?`,
    topics: {
      clusters: {
        title: 'Single and multi-node clusters',
        image: Image({ url: 'assets/material/20-architecture.svg', description: 'Multi-node cluster' }),
      },
      controlPlane: {
        title: 'Examining the control plane',
        image: Image({ url: 'assets/material/48-architecture.svg', description: 'Control plane' }),
      },
      etcd: {
        title: 'Persisting changes in etcd',
        image: Image({ url: 'assets/material/31-architecture.svg', description: 'etcd' }),
      },
      raft: {
        title: 'Syncing changes with RAFT',
        image: Image({ url: 'assets/material/36-architecture.svg', description: 'Raft protocol' }),
      },
      events: {
        title: 'Event-based architecture',
        image: Image({
          url: 'assets/material/43-architecture.svg',
          description: 'Controller manager reacts to an event',
        }),
      },
      kubelet: {
        title: 'Understanding the kubelet',
        image: Image({ url: 'assets/material/54-architecture.svg', description: 'kubelet asking for updates' }),
      },
      noSinglePointOfFailure: {
        title: 'Verifying "no single point of failure"',
        image: Image({
          url: 'assets/material/70-architecture.svg',
          description: 'Testing failover in a Kubernetes cluster',
        }),
      },
      multiNodes: {
        title: 'Setting up a multi-master cluster',
        image: Image({ url: 'assets/material/83-architecture.svg', description: 'HA multi-master setup' }),
      },
      eks: {
        title: 'Investigating multi-master setup in EKS',
        image: Image({
          url: 'assets/material/85-architecture.svg',
          description: 'Amazon Elastic Container Service for Kubernetes',
        }),
      },
      monzo: {
        title: 'Exploring multi-master setup in Monzo',
        image: Image({ url: 'assets/material/95-architecture.svg', description: 'Monzo multi-master setup' }),
      },
      kubeadm: {
        title: 'Creating a 3 node cluster with kubeadm',
        image: Image({ url: 'assets/material/164-architecture.svg', description: 'Three nodes cluster' }),
      },
      overlay: {
        title: 'Installing an overlay network',
        image: Image({ url: 'assets/material/flannel.svg', description: 'Flannel overlay network' }),
      },
      ingress: {
        title: 'Installing an Ingress controller',
        image: Image({ url: 'assets/material/traefik.svg', description: 'Traefik ingress controller' }),
      },
      api: {
        title: 'Exploring the API without kubectl',
        image: Image({ url: 'assets/material/api-12.svg', description: 'Kubernetes Open API definition' }),
      },
      resiliency: {
        title: 'Taking down the cluster one node at the time',
        image: Image({ url: 'assets/material/165-architecture.svg', description: 'Testing Kubernetes resiliency' }),
      },
    },
  },
  networking: {
    name: 'Networking in Kubernetes',
    description: `How do you route traffic from the internet to your applications? How can you secure your communication with TLS? How about path routing to different services? In this module, you will explore how the traffic is routed in the cluster.`,
    topics: {
      basicNetworking: {
        title: 'Network routing in Linux',
        image: Image({ url: 'assets/material/basic-network-15.svg', description: 'Basic networking' }),
      },
      networkRequirements: {
        title: 'Understanding network requirements',
        image: Image({ url: 'assets/material/network-setup-8.svg', description: 'Example of a Kubernetes network' }),
      },
      endpoints: {
        title: 'Exploring the Endpoints',
        image: Image({ url: 'assets/material/endpoints-dynamic-list-3.svg', description: 'Endpoint object' }),
      },
      loadBalancing: {
        title: 'Balancing in-cluster traffic',
        image: Image({ url: 'assets/material/in-cluster-balancing-11.svg', description: 'Load balancing' }),
      },
      kubeProxy: {
        title: 'Routing traffic with kube-proxy',
        image: Image({ url: 'assets/material/kube-proxy-routing-11.svg', description: 'kube-proxy' }),
      },
      interfaces: {
        title: 'CRI, CNI, CSI: interfaces for the kubelet',
        image: Image({ url: 'assets/material/endpoints-11.svg', description: 'CRI, CSI, CNI' }),
      },
      latency: {
        title: 'Choosing between latency and load balancing',
        image: Image({ url: 'assets/material/in-cluster-balancing-9.svg', description: 'In-cluster load balancing' }),
      },
      servicesProsAndCons: {
        title: 'Pros and cons of the 4 types of Services',
        image: Image({ url: 'assets/material/which-service-7.svg', description: 'Services pros and cons' }),
      },
      serviceDiscovery: {
        title: 'Discovering Services',
        image: Image({ url: 'assets/material/service-discovery-7.svg', description: 'Service discovery' }),
      },
      ingress: {
        title: 'Routing traffic with an Ingress controller',
        image: Image({ url: 'assets/material/ingress-9.svg', description: 'Ingress controller' }),
      },
      e2e: {
        title: 'End-to-end traffic journey',
        image: Image({ url: 'assets/material/e2e-ingress-18.svg', description: 'End-to-end traffic flow' }),
      },
    },
  },
  managingState: {
    name: 'Managing state in Kubernetes',
    description: `How does Kubernetes store files and state? Can you host databases in it? Should you? Can you extract configurations and share them with different deployments? How do you make sure that your storage layer is replicated and persisted even if a node becomes unavailable?`,
    topics: {
      configMaps: {
        title: 'Managing configurations',
        image: Image({ url: 'assets/material/13-state.svg', description: 'ConfigMap' }),
      },
      secrets: {
        title: 'Managing secrets',
        image: Image({ url: 'assets/material/24-state.svg', description: 'Secrets' }),
      },
      volumes: {
        title: 'Using Kubernetes Volumes',
        image: Image({ url: 'assets/material/66-state.svg', description: 'Kubernetes volumes' }),
      },
      persistentVolumes: {
        title: 'Creating Persistent Volumes',
        image: Image({ url: 'assets/material/94-state.svg', description: 'Kubernetes persistent volumes' }),
      },
      persistentVolumeClaims: {
        title: 'Creating Persistent Volume Claims',
        image: Image({ url: 'assets/material/119-state.svg', description: 'Kubernetes persistent volume claims' }),
      },
      storageClass: {
        title: 'Provisioning volumes dynamically',
        image: Image({ url: 'assets/material/137-state.svg', description: 'StorageClass templates' }),
      },
      statefulSets: {
        title: 'Managing stateful applications',
        image: Image({ url: 'assets/material/203-state.svg', description: 'Stateful applications' }),
      },
      localVolumes: {
        title: 'Creating volumes on bare metal',
        image: Image({ url: 'assets/material/152-state.svg', description: 'Deploying Apache Cassandra' }),
      },
      singleDatabase: {
        title: 'Deploying a single database with persitence',
        image: Image({ url: 'assets/material/48-state.svg', description: 'Deploying PostgreSQL' }),
      },
      clusteredDatabase: {
        title: 'Deploying a clustered database with persitence',
        image: Image({ url: 'assets/material/174-state.svg', description: 'Deploying a clustered PostgreSQL' }),
      },
      distributedStorage: {
        title: 'Designing storage that can span multiple nodes',
        image: Image({ url: 'assets/material/252-state.svg', description: 'Clustered PostgreSQL with OpenEBS' }),
      },
    },
  },
  templating: {
    name: 'Templating Kubernetes resources',
    description: `Resources in Kubernetes are described as YAML files. If you wish to have the same resources for different environments such as development, preproduction and production you may be tempted to copy the files three times. Or you could use a templating engine. Learn how to do precisely that with Helm — the Kubernetes package manager.`,
    topics: {
      reusableTemplates: {
        title: 'Creating reusable templates',
        image: Image({ url: 'assets/material/5-templating.svg', description: 'Templating resources' }),
      },
      helm: {
        title: `Helm's templating engine`,
        image: Image({ url: 'assets/material/2-templating.svg', description: 'Templating variables' }),
      },
      helmArchitecture: {
        title: 'Understanding the Helm architecture',
        image: Image({ url: 'assets/material/29-templating.svg', description: 'Helm architecture' }),
      },
      templating: {
        title: 'Templating resources with Go and Sprig',
        image: Image({ url: 'assets/material/golang.svg', description: 'Golang' }),
      },
      releases: {
        title: 'Managing releases with Helm',
        image: Image({ url: 'assets/material/57-templating.svg', description: 'Releases in Helm' }),
      },
      helpers: {
        title: 'Writing helper functions',
        image: Image({ url: 'assets/material/65-templating.svg', description: 'Helpers in Helm' }),
      },
      rollbacks: {
        title: 'Reverting changes with rollbacks',
        image: Image({ url: 'assets/material/79-templating.svg', description: 'Rollbacks in Helm' }),
      },
      dependencies: {
        title: 'Depending on other charts',
        image: Image({ url: 'assets/material/89-templating.svg', description: 'Dependencies in Helm' }),
      },
      repositories: {
        title: 'Storing reusable templates in repositories',
        image: Image({ url: 'assets/material/84-templating.svg', description: 'Chart Museum' }),
      },
    },
  },
  advancedNetworking: {
    name: 'Advanced networking',
    description:
      'Dive into the specifics of network interfaces, IP addresses and network topologies in this session about advanced Kubernetes networking.',
    topics: {
      nodeNetwork: {
        title: 'Exploring the Node network',
        image: Image({ url: 'assets/material/9-networking.svg', description: 'Node network' }),
      },
      clusterNetwork: {
        title: 'Cluster network',
        image: Image({ url: 'assets/material/29-networking.svg', description: 'Kubernetes cluster network' }),
      },
    },
  },
  security: {
    name: 'Security',
    description:
      'Wear your black hat and try to break the cluster. Study mitigation and countermeasure to secure your cluster against malicious attacks.',
    topics: {
      rbac: {
        title: 'Role-based access control',
        image: Image({ url: 'assets/material/security-04.svg', description: 'Kubernetes RBAC' }),
      },
    },
  },
  autoscaling: {
    name: 'Autoscaling',
    description: ``,
    topics: {
      clusterAutoscaler: {
        title: 'Cluster autoscaler',
        image: Image({ url: 'assets/material/cluster-autoscaler.svg', description: 'Cluster autoscaler' }),
      },
    },
  },
  advancedScheduling: {
    name: 'Advanced scheduling',
    description:
      'Master advanced placements of workloads in your infrastructure. Learn how to schedule machine learning deployments to nodes with GPU or how you can segregate workloads for regions (useful if you need to comply with policies and regulations).',
    topics: {
      antiAffinity: {
        title: 'Node affinity and anti-affinity',
        image: Image({ url: 'assets/material/node-affinity07.svg', description: 'Node affinity and anti-affinity' }),
      },
    },
  },
  multiCloud: {
    name: 'Multi-cloud, multi-data centre deployments',
    description: `Learn how to design clusters that span multiple cloud providers for resilience, disaster recovery or just saving money.`,
    topics: {
      clusterFederation: {
        title: 'Cluster federation',
        image: Image({ url: 'assets/material/multicloud07.svg', description: 'Cluster federation' }),
      },
    },
  },
  serviceMeshes: {
    name: 'Service meshes',
    description: ``,
    topics: {
      istio: {
        title: 'Istio',
        image: Image({ url: 'assets/material/istio.svg', description: 'Istio' }),
      },
    },
  },
  extensions: {
    name: 'Extending and customising Kubernetes',
    description: ``,
    topics: {
      operators: {
        title: 'Extending Kubernetes with operators',
        image: Image({ url: 'assets/material/operator-framework.svg', description: 'Operator framework from CoreOS' }),
      },
    },
  },
  managedServices: {
    name: 'EKS, AKS, GKE',
    description: 'Discover the nitty-gritty details of how AKS, EKS and GKE work and their strength and limitations.',
    topics: {
      managedServices: {
        title: 'Kubernetes managed services',
        image: Image({ url: 'assets/material/managed-services.svg', description: 'AKS, EKS and GKE' }),
      },
    },
  },
  pipelines: {
    name: 'CI/CD pipelines',
    description:
      'Learn how to design CI/CD pipelines that leverage containers and Kubernetes. Ship software quicker, more reliably and cheaply.',
    topics: {
      flow: {
        title: 'From development to production',
        image: Image({ url: 'assets/material/pipeline15.svg', description: 'From development to production' }),
      },
    },
  },
}

export const assets: {
  [section in keyof typeof content]: { [topic in keyof typeof content[section]['topics']]: Image }
} = Object.keys(content).reduce(
  (acc, key) => {
    ;(acc as any)[key] = {}
    ;(acc as any)[key] = Object.keys(content[key as keyof typeof content].topics).reduce(
      (acc, topic) => {
        acc[topic] = (content[key as keyof typeof content].topics as any)[topic].image
        return acc
      },
      {} as any,
    )
    return acc
  },
  {} as any,
)

/* WARNING: this mutates content */
export const material: {
  [section in keyof typeof content]: {
    name: string
    description: string
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
