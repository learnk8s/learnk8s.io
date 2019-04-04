import { Image } from '../assets'
import { Details, BiteSizedRender } from '../biteSized'

export const MultipleClustersDetails = identity<Details>({
  type: identity<'bsk-march-01'>('bsk-march-01'),
  url: '/connecting-multiple-kubernetes-clusters',
  seoTitle: 'How do you connect clusters located in different data centres?',
  title: 'How do you connect Kubernetes clusters located in different data centres?',
  description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options you have.`,
  openGraphImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  publishedDate: '2019-04-04',
  previewImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const IngressApiGatewayDetails = identity<Details>({
  type: identity<'bsk-march-02'>('bsk-march-02'),
  url: '/ingress-api-gateway',
  seoTitle: 'Can you have an API Gateway as an ingress? ♦︎ Learnk8s',
  title: 'Can you have an API Gateway as an ingress?',
  description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
  openGraphImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const VisualiseYamlDetails = identity<Details>({
  type: identity<'bsk-march-03'>('bsk-march-03'),
  url: '/visualise-dependencies-kubernetes',
  seoTitle: 'Is there any tool to visualise the dependency between YAML files?',
  title: 'Is there any tool to visualise the dependency between YAML files?',
  description: `When you have a large number of resources in your cluster, you might lose track of all relationships between them. Learn how you can build a dependency graph with all your resources.`,
  openGraphImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const HelmDetails = identity<Details>({
  type: identity<'bsk-march-04'>('bsk-march-04'),
  url: '/helm-package-manager',
  seoTitle: 'Is Helm used just for templating? ♦︎ Learnk8s',
  title: 'Is Helm used just for templating?',
  description: `Learn how Helm is used for templating, sharing charts and managing releases.`,
  openGraphImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'assets/bsk.png',
    description: 'Bite-sized Kubernetes learning',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const MultipleClustersRender = BiteSizedRender(`${__dirname}/connectMultipleClusters.md`, __dirname)
export const IngressApiGatewayRender = BiteSizedRender(`${__dirname}/ingressApiGateway.md`, __dirname)
export const VisualiseYamlRender = BiteSizedRender(`${__dirname}/visualiseYaml.md`, __dirname)
export const HelmRender = BiteSizedRender(`${__dirname}/helm.md`, __dirname)

function identity<T>(value: T): T {
  return value
}
