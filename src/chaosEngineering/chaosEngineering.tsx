import * as React from 'react'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Store } from 'redux'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ChaosEngineering = {
  id: 'chaos-engineering',
  url: '/blog/kubernetes-chaos-engineering-lessons-learned',
  title: 'Kubernetes Chaos Engineering: Lessons Learned ⎈ Learnk8s',
  description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(ChaosEngineering))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-chaos-engineering',
      pageId: ChaosEngineering.id,
      image: <img src='src/chaosEngineering/chaos-engineering-kubernetes.png' alt='Chaos engineering' />,
      title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
      description: ChaosEngineering.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
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
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ChaosEngineering.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'chaos-engineering-related-0',
      blogPostId: 'bp-chaos-engineering',
      content: toVFile({ path: join(__dirname, 'chaos-engineering-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'chaos-enginnering-picture',
      pageId: ChaosEngineering.id,
      image: <img src='src/chaosEngineering/chaos-engineering-kubernetes.svg' alt={ChaosEngineering.title} />,
    }),
  )
}
