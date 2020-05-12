import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Troubleshooting = {
  id: 'troubleshooting-deployments',
  url: '/troubleshooting-deployments',
  title: 'A visual guide on troubleshooting Kubernetes deployments',
  description: `Troubleshooting in Kubernetes can be a daunting task. In this article you will learn how to diagnose issues in Pods, Services and Ingress.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Troubleshooting))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      image: <img src='src/troubleshooting/flowchart.png' alt='Troubleshooting Kubernetes deployments' />,
      title: Troubleshooting.title,
      description: Troubleshooting.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      authorId: Authors.danielePolencic.id,
      title: Troubleshooting.title,
      description: `Troubleshooting in Kubernetes can be a daunting task if you don't know where to start. Why is the Pod pending? And why is it Running but can't receive any traffic? In this article you will learn how to diagnose problems in Pods, Services and Ingress.`,
      publishedDate: '2019-12-05',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: Troubleshooting.id }))
  storeV2.dispatch(
    ActionV2.previewPictures.add({
      id: 'troubleshooting-picture',
      pageId: Troubleshooting.id,
      image: <img src='src/troubleshooting/flowchart.svg' alt={Troubleshooting.title} />,
    }),
  )
}
