import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const K8sOnWindows = {
  id: 'k8s-on-windows',
  url: '/blog/installing-docker-and-kubernetes-on-windows',
  title: 'Getting started with Docker and Kubernetes on Win 10 ⎈ Learnk8s',
  description: `In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(K8sOnWindows))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-k8s-on-windows',
      pageId: K8sOnWindows.id,
      image: 'src/k8sOnWindows/k8s_on_win.jpg',
      title: K8sOnWindows.title,
      description: K8sOnWindows.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-k8s-on-windows',
      pageId: K8sOnWindows.id,
      authorId: Authors.keithMifsud.id,
      description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
      title: 'Getting started with Docker and Kubernetes on Windows 10',
      publishedDate: '2018-06-05',
      lastModifiedDate: '2019-12-01',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: K8sOnWindows.id + '-general-post', tag: 'general-post', pageId: K8sOnWindows.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'k8s-on-windows-related-0',
      blogPostId: 'bp-k8s-on-windows',
      content: toVFile({ path: join(__dirname, 'k8s-on-windows-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'k8s-on-windows-picture',
      pageId: K8sOnWindows.id,
      image: 'src/k8sOnWindows/k8s_on_win.svg',
    }),
  )
}
