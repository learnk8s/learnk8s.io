import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ClusterSize = {
  id: 'cluster-size',
  url: '/how-many-clusters',
  title: 'Architecting Kubernetes clusters — how many should you have?',
  description: `How many Kubernetes clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ClusterSize))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-cluster-size',
      pageId: ClusterSize.id,
      image: 'src/clusterSize/architecting-clusters.png',
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: how many clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-cluster-size',
      pageId: ClusterSize.id,
      authorId: Authors.danielWeibel.id,
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: how many clusters should you have? One big cluster or multiple smaller clusters? This article investigates the pros and cons of different approaches.`,
      publishedDate: '2020-02-20',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.tags.add({ id: ClusterSize.id + '-general-post', tag: 'general-post', pageId: ClusterSize.id }))
  store.dispatch(
    Action.previewPictures.add({
      id: 'cluster-size-picture',
      pageId: ClusterSize.id,
      image: <img src='src/clusterSize/architecting-clusters.svg' alt={ClusterSize.title} />,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'kubernetes-cluster-size-related-0',
      blogPostId: 'bp-cluster-size',
      content: toVFile({ path: join(__dirname, 'clusterSize-related.md') }),
    }),
  )
}
