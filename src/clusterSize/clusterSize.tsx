import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ClusterSize = {
  id: 'cluster-size',
  url: '/kubernetes-cluster-size',
  title: 'Architecting Kubernetes clusters — how many clusters are right?',
  description: `How many Kubernetes clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ClusterSize))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-cluster-size',
      pageId: ClusterSize.id,
      image: (
        <img
          src='src/clusterSize/architecting-clusters.png'
          alt='Architecting Kubernetes clusters — choosing a cluster size'
        />
      ),
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: how many clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-cluster-size',
      pageId: ClusterSize.id,
      authorId: Authors.danielWeibel.id,
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: how many clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
      publishedDate: '2020-02-20',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ClusterSize.id }))
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'cluster-size-picture',
      pageId: ClusterSize.id,
      image: <img src='src/clusterSize/architecting-clusters.svg' alt={ClusterSize.title} />,
    }),
  )
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-cluster-size-related-0',
      blogPostId: 'bp-cluster-size',
      content: toVFile({ path: join(__dirname, 'clusterSize-related.md') }),
    }),
  )
}
