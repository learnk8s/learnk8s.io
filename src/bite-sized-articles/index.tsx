import { Details } from '../biteSized'
import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { toVFile } from '../files'
import { join } from 'path'

export const Pages = {
  multipleClusters: {
    id: 'multiple-kubernetes-clusters',
    url: '/bite-sized/connecting-multiple-kubernetes-clusters',
    title: 'How do you connect clusters located in different data centres?',
    description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options you have.`,
  },

  ingressApiGateway: {
    id: 'ingress-api-gateway',
    url: '/kubernetes-ingress-api-gateway',
    title: 'Can you expose your services with an API gateway in Kubernetes?',
    description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
  },

  visualiseYaml: {
    id: 'visualise-yaml',
    url: '/visualise-dependencies-kubernetes',
    title: 'How do you visualise dependencies in your Kubernetes YAML files?',
    description: `When you have a large number of resources in your Kubernetes cluster, you might lose track of all relationships between them. Learn how to visualise your dependencies.`,
  },

  helm: {
    id: 'helm-templating',
    url: '/helm-templating-kubernetes-yaml',
    title: 'Is Helm used just for templating? ♦︎ Learnk8s',
    description: `Learn how Helm is used for templating, sharing charts and managing releases.`,
  },

  nodeSize: {
    id: 'kubernetes-node-size',
    url: '/kubernetes-node-size',
    title: 'Architecting Kubernetes clusters — choosing a worker node size',
    description:
      'When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use, and how many of them?". This article looks at the pros and cons of either using many small or few large worker nodes in your cluster.',
  },

  secretsGitOps: {
    id: 'secrets-git-ops',
    url: '/kubernetes-secrets-in-git',
    title: 'How to keep your Kubernetes secrets secure in Git',
    description:
      'Kubernetes secrets that you load into the cluster must exist somewhere. Do you keep a copy or rely on Kubernetes to be the only source of truth? How do you back them up? What if you keep a copy and they go out of sync?',
  },

  autoscaling: {
    id: 'autoscaling-apps-kubernetes',
    url: '/autoscaling-apps-kubernetes',
    title: 'How to autoscale apps on Kubernetes with custom metrics',
    description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  },

  rollbacks: {
    id: 'kubernetes-rollbacks',
    url: '/kubernetes-rollbacks',
    title: 'How do you rollback deployments in Kubernetes?',
    description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
  },
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Pages.multipleClusters))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-multiple-kubernetes-clusters',
      pageId: Pages.multipleClusters.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.multipleClusters.title,
      description: Pages.multipleClusters.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-multiple-kubernetes-clusters',
      pageId: Pages.multipleClusters.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.multipleClusters.description,
      title: 'How do you connect Kubernetes clusters located in different data centres?',
      publishedDate: '2019-04-04',
      content: toVFile({ path: join(__dirname, 'connectMultipleClusters/connectMultipleClusters.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.multipleClusters.id }))

  store.dispatch(Action.registerPage(Pages.ingressApiGateway))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-ingress-api-gateway',
      pageId: Pages.ingressApiGateway.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.ingressApiGateway.title,
      description: Pages.ingressApiGateway.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-ingress-api-gateway',
      pageId: Pages.ingressApiGateway.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.ingressApiGateway.description,
      title: 'Can you expose your microservices with an API gateway in Kubernetes?',
      publishedDate: '2019-04-23',
      lastModifiedDate: '2019-11-15',
      content: toVFile({ path: join(__dirname, 'ingressApiGateway/ingressApiGateway.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.ingressApiGateway.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'ingress-api-gateway-related-0',
      blogPostId: 'bp-ingress-api-gateway',
      content: toVFile({ path: join(__dirname, 'ingressApiGateway/ingressApiGateway-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.visualiseYaml))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-visualise-yaml',
      pageId: Pages.visualiseYaml.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.visualiseYaml.title,
      description: Pages.visualiseYaml.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-visualise-yaml',
      pageId: Pages.visualiseYaml.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.visualiseYaml.description,
      title: 'How do you visualise dependencies in your Kubernetes YAML files?',
      publishedDate: '2019-05-08',
      content: toVFile({ path: join(__dirname, 'visualiseYaml/visualiseYaml.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.visualiseYaml.id }))

  store.dispatch(Action.registerPage(Pages.helm))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-helm-templating',
      pageId: Pages.helm.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.helm.title,
      description: Pages.helm.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-helm-templating',
      pageId: Pages.helm.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.helm.description,
      title: 'Is Helm used just for templating Kubernetes YAML files?',
      publishedDate: '2019-04-16',
      content: toVFile({ path: join(__dirname, 'helm/helm.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.helm.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'helm-templating-related-0',
      blogPostId: 'bp-helm-templating',
      content: toVFile({ path: join(__dirname, 'helm/helm-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.nodeSize))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-kubernetes-node-size',
      pageId: Pages.nodeSize.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.nodeSize.title,
      description: Pages.nodeSize.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-kubernetes-node-size',
      pageId: Pages.nodeSize.id,
      authorId: Authors.danielWeibel.id,
      description: Pages.nodeSize.description,
      title: Pages.nodeSize.title,
      publishedDate: '2019-09-04',
      content: toVFile({ path: join(__dirname, 'nodes-size/smallOrLarge.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.nodeSize.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-node-size-related-0',
      blogPostId: 'bp-kubernetes-node-size',
      content: toVFile({ path: join(__dirname, 'nodes-size/smallOrLarge-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.secretsGitOps))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-secrets-git-ops',
      pageId: Pages.secretsGitOps.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.secretsGitOps.title,
      description: Pages.secretsGitOps.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-secrets-git-ops',
      pageId: Pages.secretsGitOps.id,
      authorId: Authors.omerLeviHevroni.id,
      description: Pages.secretsGitOps.description,
      title: Pages.secretsGitOps.title,
      publishedDate: '2019-09-25',
      content: toVFile({ path: join(__dirname, 'secrets/secrets.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.secretsGitOps.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'secrets-git-ops-related-0',
      blogPostId: 'bp-secrets-git-ops',
      content: toVFile({ path: join(__dirname, 'secrets/secrets-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.autoscaling))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.autoscaling.title,
      description: Pages.autoscaling.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      authorId: Authors.danielWeibel.id,
      description: Pages.autoscaling.description,
      title: 'How to autoscale apps on Kubernetes with custom metrics',
      publishedDate: '2019-10-03',
      content: toVFile({ path: join(__dirname, 'autoscaling/autoscaling.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.autoscaling.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'autoscaling-apps-kubernetes-related-0',
      blogPostId: 'bp-autoscaling-apps-kubernetes',
      content: toVFile({ path: join(__dirname, 'autoscaling/autoscaling-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.rollbacks))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.rollbacks.title,
      description: Pages.rollbacks.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      authorId: Authors.gergelyRisko.id,
      description: Pages.rollbacks.description,
      title: 'How do you rollback deployments in Kubernetes?',
      publishedDate: '2019-10-17',
      content: toVFile({ path: join(__dirname, 'rollbacks/rollbacks.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.rollbacks.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-rollbacks-related-0',
      blogPostId: 'bp-kubernetes-rollbacks',
      content: toVFile({ path: join(__dirname, 'rollbacks/rollbacks-related.md') }),
    }),
  )
}

export const MultipleClustersDetails = identity<Details>({
  type: 'bsk-march-01' as const,
  url: '/connecting-multiple-kubernetes-clusters',
  seoTitle: 'How do you connect clusters located in different data centres?',
  title: 'How do you connect Kubernetes clusters located in different data centres?',
  description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options you have.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-04-04',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const IngressApiGatewayDetails = identity<Details>({
  type: 'bsk-march-02' as const,
  url: '/kubernetes-ingress-api-gateway',
  seoTitle: 'Can you expose your services with an API gateway in Kubernetes?',
  title: 'Can you expose your microservices with an API gateway in Kubernetes?',
  description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-04-23',
  lastModifiedDate: '2019-11-15',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const VisualiseYamlDetails = identity<Details>({
  type: 'bsk-march-03' as const,
  url: '/visualise-dependencies-kubernetes',
  seoTitle: 'How do you visualise dependencies in your Kubernetes YAML files?',
  title: 'How do you visualise dependencies in your Kubernetes YAML files?',
  description: `When you have a large number of resources in your Kubernetes cluster, you might lose track of all relationships between them. Learn how to visualise your dependencies.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-05-08',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const HelmDetails = identity<Details>({
  type: 'bsk-march-04' as const,
  url: '/helm-templating-kubernetes-yaml',
  seoTitle: 'Is Helm used just for templating? ♦︎ Learnk8s',
  title: 'Is Helm used just for templating Kubernetes YAML files?',
  description: `Learn how Helm is used for templating, sharing charts and managing releases.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-04-16',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const SmallOrLargeDetails = identity<Details>({
  type: 'bsk-sept-01' as const,
  url: '/kubernetes-node-size',
  seoTitle: 'Architecting Kubernetes clusters — choosing a worker node size',
  title: 'Architecting Kubernetes clusters — choosing a worker node size',
  description: `When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use, and how many of them?". This article looks at the pros and cons of either using many small or few large worker nodes in your cluster.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-09-04',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const SecretsDetails = identity<Details>({
  type: 'bsk-september-02' as const,
  url: '/kubernetes-secrets-in-git',
  seoTitle: 'How to keep your Kubernetes secrets secure in Git',
  title: 'How to keep your Kubernetes secrets secure in Git',
  description: `Kubernetes secrets that you load into the cluster must exist somewhere. Do you keep a copy or rely on Kubernetes to be the only source of truth? How do you back them up? What if you keep a copy and they go out of sync?`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-09-25',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Omer Levi Hevroni',
    avatar: <img src='assets/authors/omer_levi_hevroni.jpg' alt='Omer Levi Hevroni' />,
    link: 'https://twitter.com/omerlh',
    shortDescription: 'DevSecOps engineer at [Soluto Engineering](https://www.solutotlv.com/). OWASP member.',
  },
})

export const AutoscalingDetails = identity<Details>({
  type: 'bsk-oct-01' as const,
  url: '/autoscaling-apps-kubernetes',
  seoTitle: 'How to autoscale apps on Kubernetes with custom metrics',
  title: 'How to autoscale apps on Kubernetes with custom metrics',
  description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-03',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const RollbacksDetails = identity<Details>({
  type: 'bsk-october-01' as const,
  url: '/kubernetes-rollbacks',
  seoTitle: 'How do you rollback deployments in Kubernetes?',
  title: 'How do you rollback deployments in Kubernetes?',
  description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-17',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Gergely Risko',
    avatar: <img src='assets/authors/gergely-risko.jpg' alt='Gergely Risko' />,
    link: 'https://github.com/errge',
    shortDescription: 'Gergely is an instructor at Learnk8s.',
  },
})

function identity<T>(value: T): T {
  return value
}
