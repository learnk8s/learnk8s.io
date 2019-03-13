import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'


export const Details = {
  type: identity<'spotInstances'>('spotInstances'),
  url: '/kubernetes-spot-instances',
  seoTitle: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes ♦︎ Learnk8s',
  title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
  description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  openGraphImage: Image({url: '_blog/kubernetes-spot-instances/cheap-cluster.jpg', description: 'Serving cheaper servers'}),
  publishedDate: '2018-11-06',
  previewImage: Image({url: '_blog/kubernetes-spot-instances/cheap-cluster.jpg', description: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes'}),
  author: {
    fullName: 'César Tron-Lozai',
    avatar: Image({url: 'assets/authors/césar_tron-lozai.jpg', description: 'César Tron-Lozai'}),
    link: 'https://twitter.com/cesartronlozai'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}