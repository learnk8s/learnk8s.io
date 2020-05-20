import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ChaosEngineering = {
  id: 'chaos-engineering',
  url: '/blog/kubernetes-chaos-engineering-lessons-learned',
  title: 'Kubernetes Chaos Engineering: Lessons Learned ⎈ Learnk8s',
  description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ChaosEngineering))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-chaos-engineering',
      pageId: ChaosEngineering.id,
      image: 'src/chaosEngineering/chaos-engineering-kubernetes.png',
      title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
      description: ChaosEngineering.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-chaos-engineering',
      pageId: ChaosEngineering.id,
      authorId: Authors.danielePolencic.id,
      description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
      title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
      publishedDate: '2018-05-15',
      lastModifiedDate: '2019-04-15',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: ChaosEngineering.id + '-general-post', tag: 'general-post', pageId: ChaosEngineering.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'chaos-engineering-related-0',
      blogPostId: 'bp-chaos-engineering',
      content: toVFile({ path: join(__dirname, 'chaos-engineering-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'chaos-enginnering-picture',
      pageId: ChaosEngineering.id,
      image: 'src/chaosEngineering/chaos-engineering-kubernetes.svg',
    }),
  )
}
