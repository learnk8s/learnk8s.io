import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: identity<'k8sOnWindows'>('k8sOnWindows'),
  url: '/installing-docker-and-kubernetes-on-windows',
  seoTitle: 'Getting started with Docker and Kubernetes on Windows 10 ♦︎ Learnk8s',
  pageDetails: {
    title: 'Getting started with Docker and Kubernetes on Windows 10',
    description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
    openGraphImage: Image({url: '_blog/installing-docker-and-kubernetes-on-windows/k8s_on_win.jpg', description: 'Getting started with Docker and Kubernetes on Windows 10'}),
  },
  publishedDate: '2018-06-05',
  previewImage: Image({url: '_blog/installing-docker-and-kubernetes-on-windows/k8s_on_win.jpg', description: 'Getting started with Docker and Kubernetes on Windows 10'}),
  author: {
    fullName: 'Keith Mifsud',
    avatar: Image({url: 'assets/authors/keith_mifsud.jpg', description: 'Keith Mifsud'}),
    link: 'https://keith-mifsud.me/'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}