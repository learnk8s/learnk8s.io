import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'
import { RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { getFullUrl } from '../sitemap'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { toVFile } from '../files'
import { join } from 'path'

export const Pages = {
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
}

export function Register(store: Store<State, Actions>) {
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
    Action.registerBlogPostV2({
      id: 'bp-kubernetes-node-size',
      pageId: Pages.nodeSize.id,
      authorId: Authors.danielWeibel.id,
      description: Pages.nodeSize.description,
      title: Pages.nodeSize.title,
      publishedDate: '2019-09-04',
      content: toVFile({ path: join(__dirname, 'smallOrLarge.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.nodeSize.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-node-size-related-0',
      blogPostId: 'bp-kubernetes-node-size',
      content: toVFile({ path: join(__dirname, 'smallOrLarge-related.md') }),
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
    Action.registerBlogPostV2({
      id: 'bp-secrets-git-ops',
      pageId: Pages.secretsGitOps.id,
      authorId: Authors.omerLeviHevroni.id,
      description: Pages.secretsGitOps.description,
      title: Pages.secretsGitOps.title,
      publishedDate: '2019-09-25',
      content: toVFile({ path: join(__dirname, 'secrets.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.secretsGitOps.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'secrets-git-ops-related-0',
      blogPostId: 'bp-secrets-git-ops',
      content: toVFile({ path: join(__dirname, 'secrets-related.md') }),
    }),
  )
}

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

export const SecretsRender = BiteSizedRender(`${__dirname}/secrets.md`, website => (
  <React.Fragment>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.bskSmallOrLarge)} className='link navy underline hover-sky'>
          Architecting Kubernetes clusters — choosing a worker node size
        </a>{' '}
        where you'll learn the pros and cons of having clusters with large and small instance types for your cluster
        nodes.
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.smallerDockerImage)}
          className='link navy underline hover-sky'
        >
          Is Helm used just for templating Kubernetes YAML files?
        </a>{' '}
        Maybe not.
      </RelatedContentItem>
    </RelatedConentContainer>
  </React.Fragment>
))
export const SmallOrLargeRender = BiteSizedRender(`${__dirname}/smallOrLarge.md`, website => (
  <React.Fragment>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.scalingSpringBoot)}
          className='link navy underline hover-sky'
        >
          Scaling Microservices with Message Queues, Spring Boot and Kubernetes.
        </a>{' '}
        Now that you master scaling, why not getting your hands dirty and autoscale your Spring Boot app with a message
        broker and Kubernetes.
      </RelatedContentItem>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.blog.children.spotInstances)} className='link navy underline hover-sky'>
          Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes.
        </a>{' '}
        Spot Instances are unused servers that are available for less than the regular price. Therefore, you can
        significantly save on your infrastructure costs. It does come with a price, though.
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.biteSizedKubernetes.children.bskMultiCluster)}
          className='link navy underline hover-sky'
        >
          How do you connect Kubernetes clusters located in different data centres?
        </a>{' '}
        In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and
        availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options
        you have.
      </RelatedContentItem>
    </RelatedConentContainer>
  </React.Fragment>
))

function identity<T>(value: T): T {
  return value
}
