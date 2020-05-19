import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const K8Bit = {
  id: 'k8bit',
  url: '/real-time-dashboard',
  title: 'Coding a real-time dashboard for Kubernetes',
  description: `In Kubernetes, how can you be notified when a Pod is added, removed or modified? In this article you'll learn how to use the API to track changes to Kubernetes resources.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(K8Bit))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-k8bit',
      pageId: K8Bit.id,
      image: <img src='src/k8bit/k8bit.png' alt={K8Bit.title} />,
      title: K8Bit.title,
      description: K8Bit.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-k8bit',
      pageId: K8Bit.id,
      authorId: Authors.danielePolencic.id,
      description: K8Bit.description,
      title: K8Bit.title,
      publishedDate: '2020-04-28',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.tags.add({ id: K8Bit.id + '-general-post', tag: 'general-post', pageId: K8Bit.id }))
  store.dispatch(
    Action.previewPictures.add({
      id: 'k8bit-picture',
      pageId: K8Bit.id,
      image: <img src='src/k8bit/k8bit.svg' alt={K8Bit.title} />,
    }),
  )
}
