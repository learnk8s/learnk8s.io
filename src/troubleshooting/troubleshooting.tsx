import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Troubleshooting = {
  id: 'troubleshooting-deployments',
  url: '/troubleshooting-deployments',
  title: 'A visual guide on troubleshooting Kubernetes deployments',
  description: `Troubleshooting in Kubernetes can be a daunting task. In this article you will learn how to diagnose issues in Pods, Services and Ingress.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Troubleshooting))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      imagePath: 'src/troubleshooting/flowchart.png',
      title: Troubleshooting.title,
      description: Troubleshooting.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      authorId: Authors.danielePolencic.id,
      title: Troubleshooting.title,
      description: `Troubleshooting in Kubernetes can be a daunting task if you don't know where to start. Why is the Pod pending? And why is it Running but can't receive any traffic? In this article you will learn how to diagnose problems in Pods, Services and Ingress.`,
      publishedDate: '2019-12-05',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: Troubleshooting.id + '-general-post', tag: 'general-post', pageId: Troubleshooting.id }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'troubleshooting-picture',
      pageId: Troubleshooting.id,
      imagePath: 'src/troubleshooting/flowchart.svg',
    }),
  )
}
