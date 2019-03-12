import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: identity<'chaosEngineering'>('chaosEngineering'),
  url: '/kubernetes-chaos-engineering-lessons-learned',
  seoTitle: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1 ♦︎ Learnk8s',
  pageDetails: {
    title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
    description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
    openGraphImage: Image({url: '_blog/kubernetes-chaos-engineering-lessons-learned/chaos-engineering-kubernetes.png', description: 'Chaos engineering'}),
  },
  publishedDate: '2018-05-15',
  previewImage: Image({url: '_blog/kubernetes-chaos-engineering-lessons-learned/chaos-engineering-kubernetes.png', description: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1'}),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic'}),
    link: 'https://linkedin.com/in/danielepolencic'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}