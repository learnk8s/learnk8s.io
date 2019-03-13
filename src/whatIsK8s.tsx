import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'


export const Details = {
  type: identity<'whatIsK8s'>('whatIsK8s'),
  url: '/what-is-kubernetes',
  seoTitle: 'What is Kubernetes? Optimise your hosting costs and efficiency ♦︎ Learnk8s',
  title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
  description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
  openGraphImage: Image({url: '_blog/what-is-kubernetes/why-kube.png', description: 'Kubernetes bucks'}),
  publishedDate: '2018-09-04',
  previewImage: Image({url: '_blog/what-is-kubernetes/why-kube.png', description: 'What is Kubernetes? Optimise your hosting costs and efficiency'}),
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