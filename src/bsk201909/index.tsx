import { Details } from '../biteSized'
import * as React from 'react'
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
    Action.registerBlogPostV2({
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

function identity<T>(value: T): T {
  return value
}
