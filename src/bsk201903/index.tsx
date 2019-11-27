import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'
import { RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { getFullUrl } from '../sitemap'
import { Store } from 'redux'
import {
  State,
  Actions,
  Action,
  getPages,
  hasTag,
  getOpenGraph,
  getBlogPosts,
  getAuthors,
  getBlogPostMarkdownBlocks,
  getConfig,
} from '../store'
import { Authors } from '../aboutUs'
import { toVFile, read } from '../files'
import { join } from 'path'
import { Html, Head, OpenGraph, Body, Footer, Navbar } from '../layout.v3'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { renderToJsx, toMdast } from '../markdown'
import { defaultAssetsPipeline } from '../optimise'
import { Page } from '../store/websiteReducer'
import { Author } from '../article.v2'
import { format } from 'date-fns'
import { selectAll } from 'unist-util-select'
import * as Mdast from 'mdast'
import { transform } from '../markdown/utils'
import { mdast2Jsx, mdast2JsxInline } from '../markdown/jsx'

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

export async function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  const pages = getPages(state).filter(hasTag(state, 'bite-sized'))
  await Promise.all(
    pages.map(async page => {
      defaultAssetsPipeline({
        jsx: await renderPage(page, state),
        isOptimisedBuild: getConfig(state).isProduction,
        siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
        url: page.url,
        outputFolder: getConfig(state).outputFolder,
      })
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

export const MultipleClustersRender = BiteSizedRender(`${__dirname}/connectMultipleClusters.md`)
export const IngressApiGatewayRender = BiteSizedRender(`${__dirname}/ingressApiGateway.md`, website => (
  <React.Fragment>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.scalingSpringBoot)}
          className='link navy underline hover-sky'
        >
          Scaling Microservices with Message Queues, Spring Boot and Kubernetes.
        </a>{' '}
        You should design your service so that even if it is subject to intermittent heavy loads, it continues to
        operate reliably. But how do you build such applications? And how do you deploy an application that scales
        dynamically?
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.smallerDockerImage)}
          className='link navy underline hover-sky'
        >
          Boosting your kubectl productivity.
        </a>{' '}
        If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of
        time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.
      </RelatedContentItem>
    </RelatedConentContainer>
    <div>
      <h2 className='f2 pt4 pb2'>Learn how to deploy and debug an Ingress</h2>
      <p className='lh-copy measure-wide f4'>
        <span className='b'>
          In the Learnk8s Academy you can learn more about the Ingress and how the traffic flows inside your cluster.
        </span>{' '}
        The networking modules cover not only the Ingress but:
      </p>
      <ul>
        <li className='mv3 f4-l lh-copy'>Exploring the Endpoints</li>
        <li className='mv3 f4-l lh-copy'>Routing traffic with kube-proxy</li>
        <li className='mv3 f4-l lh-copy'>Choosing between latency and load balancing</li>
        <li className='mv3 f4-l lh-copy'>Pros and cons of the 4 types of Services in Kubernetes</li>
        <li className='mv3 f4-l lh-copy'>Discovering Services</li>
      </ul>
      <div className='mt4 mb5'>
        <a
          href={getFullUrl(website.children.academy)}
          className='dib white bg-blue br1 pv3 ph4 b f4 bn pointer no-underline'
        >
          Learn more ⇢
        </a>
      </div>
    </div>
  </React.Fragment>
))
export const VisualiseYamlRender = BiteSizedRender(`${__dirname}/visualiseYaml.md`)
export const HelmRender = BiteSizedRender(`${__dirname}/helm.md`, website => (
  <React.Fragment>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.bskVisualiseYaml)} className='link navy underline hover-sky'>
          How do you visualise dependencies in your Kubernetes YAML files?
        </a>{' '}
        When you have a large number of resources in your Kubernetes cluster, you might lose track of all relationships
        between them. Learn how to visualise your dependencies.
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.smallerDockerImage)}
          className='link navy underline hover-sky'
        >
          Boosting your kubectl productivity.
        </a>{' '}
        If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of
        time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.
      </RelatedContentItem>
    </RelatedConentContainer>
    <div>
      <h2 className='f2 pt4 pb2'>Master Helm with hands-on labs</h2>
      <p className='lh-copy measure-wide f4'>
        <span className='b'>The article is a small excerpt takes from the Helm course of the Learnk8s Academy.</span>{' '}
        The full course includes topics such as:
      </p>
      <ul>
        <li className='mv3 f4-l lh-copy'>Creating reusable templates</li>
        <li className='mv3 f4-l lh-copy'>Understanding the Helm architecture</li>
        <li className='mv3 f4-l lh-copy'>Templating resources with Go and Sprig</li>
        <li className='mv3 f4-l lh-copy'>Managing releases with Helm</li>
        <li className='mv3 f4-l lh-copy'>Reverting changes with rollbacks</li>
      </ul>
      <div className='mt4 mb5'>
        <a
          href={getFullUrl(website.children.academy)}
          className='dib white bg-blue br1 pv3 ph4 b f4 bn pointer no-underline'
        >
          Learn more ⇢
        </a>
      </div>
    </div>
  </React.Fragment>
))

function identity<T>(value: T): T {
  return value
}
