import * as React from 'react'
import { RelatedConentContainer, RelatedContentItem, Author } from '../article.v2'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getBlogPosts, getAuthors, getConfig } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { Html, Head, OpenGraph, Body, Navbar, Footer } from '../layout.v3'
import { format } from 'date-fns'
import { defaultAssetsPipeline } from '../optimise'
import { toVFile } from '../files'
import { renderPage } from '../genericBlogPost'

export const Details = {
  type: 'kubectlProductivity',
  url: '/kubectl-productivity',
  seoTitle: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  title: 'Boosting your kubectl productivity',
  shortDescription: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective.`,
  description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
  openGraphImage: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
  publishedDate: '2019-03-27',
  lastModifiedDate: '2019-04-15',
  previewImage: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
  },
} as const

export const KubectlProductivity = {
  id: 'kubectl-productivity',
  url: '/blog/kubectl-productivity',
  title: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  description:
    'If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(KubectlProductivity))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-kubectl-productivity',
      pageId: KubectlProductivity.id,
      image: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
      title: 'Boosting your kubectl productivity',
      description: KubectlProductivity.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-kubectl-productivity',
      pageId: KubectlProductivity.id,
      authorId: Authors.danielWeibel.id,
      description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

    This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

    The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
      title: 'Boosting your kubectl productivity',
      publishedDate: '2019-03-27',
      lastModifiedDate: '2019-04-15',
    }),
  )
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubectl-productivity-related-0',
      blogPostId: 'bp-kubectl-productivity',
      content: toVFile({ path: join(__dirname, 'kubectl-productivity-related.md') }),
    }),
  )
}

export async function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  await Promise.resolve(
    defaultAssetsPipeline({
      jsx: await renderPage(KubectlProductivity, state),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: KubectlProductivity.url,
      outputFolder: getConfig(state).outputFolder,
    }),
  )
}
