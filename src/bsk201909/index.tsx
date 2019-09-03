import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'

export const SmallOrLargeDetails = identity<Details>({
  type: 'bsk-sept-01' as const,
  url: '/kubernetes-node-size',
  seoTitle: 'Architecting Kubernetes clusters — choosing a worker node size',
  title: 'Architecting Kubernetes clusters — choosing a worker node size',
  description: `When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use, and how many of them?". This article looks at the pros and cons of either using many small or few large worker nodes in your cluster.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-09-04',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const SmallOrLargeRender = BiteSizedRender(`${__dirname}/smallOrLarge.md`)

function identity<T>(value: T): T {
  return value
}
