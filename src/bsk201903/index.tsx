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
    Action.registerBlogPostV2({
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
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'multiple-kubernetes-clusters-related-0',
      blogPostId: 'bp-multiple-kubernetes-clusters',
      content: toVFile({ path: join(__dirname, 'connectMultipleClusters/connectMultipleClusters-related.md') }),
    }),
  )

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
    Action.registerBlogPostV2({
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
    Action.registerBlogPostV2({
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
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'visualise-yaml-related-0',
      blogPostId: 'bp-visualise-yaml',
      content: toVFile({ path: join(__dirname, 'visualiseYaml/visualiseYaml-related.md') }),
    }),
  )

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
    Action.registerBlogPostV2({
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

function identity<T>(value: T): T {
  return value
}
