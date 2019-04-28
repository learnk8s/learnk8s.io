import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'

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
  description: `When you have a large number of resources in your cluster, you might lose track of all relationships between them. Learn how you can build a dependency graph with all your resources.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-04-30',
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

export const MultipleClustersRender = BiteSizedRender(`${__dirname}/connectMultipleClusters.md`)
export const IngressApiGatewayRender = BiteSizedRender(`${__dirname}/ingressApiGateway.md`)
export const VisualiseYamlRender = BiteSizedRender(`${__dirname}/visualiseYaml.md`)
export const HelmRender = BiteSizedRender(`${__dirname}/helm.md`)

function identity<T>(value: T): T {
  return value
}
