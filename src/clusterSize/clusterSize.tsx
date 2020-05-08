import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ClusterSize = {
  id: 'cluster-size',
  url: '/how-many-clusters',
  title: 'Architecting Kubernetes clusters — how many should you have?',
  description: `How many Kubernetes clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(ClusterSize))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-cluster-size',
      pageId: ClusterSize.id,
      image: (
        <img
          src='src/clusterSize/architecting-clusters.png'
          alt='Architecting Kubernetes clusters — how many should you have?'
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
