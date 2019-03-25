import { Image } from '../assets'
import { Details, BiteSizedRender } from '../biteSized'

export const MultipleClustersDetails = identity<Details>({
  type: identity<'bsk-march-01'>('bsk-march-01'),
  url: '/connecting-multiple-clusters',
  seoTitle: 'How do you connect clusters located in different data centres?',
  title: 'How do you connect clusters located in different data centres?',
  description: `In Kubernetes, Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Learn what options you have.`,
  openGraphImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
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
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
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
  url: '/ingress-api-gateway',
  seoTitle: 'Can you have an API Gateway as an ingress? ♦︎ Learnk8s',
  title: 'Can you have an API Gateway as an ingress?',
  description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
  openGraphImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
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
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
    shortDescription: 'Daniele is an instructor and software engineer at [Learnk8s](https://learnk8s.io).',
  },
})

export const MultipleClustersRender = BiteSizedRender(`${__dirname}/connectMultipleClusters.md`)
export const IngressApiGatewayRender = BiteSizedRender(`${__dirname}/ingressApiGateway.md`)
export const VisualiseYamlRender = BiteSizedRender(`${__dirname}/visualiseYaml.md`)
export const helmRender = BiteSizedRender(`${__dirname}/helm.md`)

function identity<T>(value: T): T {
  return value
}
