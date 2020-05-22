import * as React from 'react'
import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const AllocatableResources = {
  id: 'allocatable-resources',
  url: '/allocatable-resources',
  title: 'Allocatable memory and CPU in Kubernetes Nodes',
  description: `Pods deployed in your Kubernetes cluster consume resources such as memory, CPU and storage. However, not all resources in a Node can be used to run Pods.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(AllocatableResources))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-allocatable-resources',
      pageId: AllocatableResources.id,
      image: 'src/allocatable-resources/allocatable-resources.png',
      title: AllocatableResources.title,
      description: AllocatableResources.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-allocatable-resources',
      pageId: AllocatableResources.id,
      authorId: Authors.danielePolencic.id,
      description: AllocatableResources.description,
      title: AllocatableResources.title,
      publishedDate: '2020-05-20',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: AllocatableResources.id + '-general-post',
      tag: 'general-post',
      pageId: AllocatableResources.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'allocatable-resources-picture',
      pageId: AllocatableResources.id,
      image: 'src/allocatable-resources/allocatable-resources.svg',
    }),
  )
}
