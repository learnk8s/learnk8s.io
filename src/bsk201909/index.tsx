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

export const SecretsDetails = identity<Details>({
  type: 'bsk-september-02' as const,
  url: '/managing-secrets-in-kubernetes',
  seoTitle: 'How do you securely manage secrets in Kubernetes?',
  title: 'How do you securely manage secrets in Kubernetes?',
  description: `Kubernetes secrets that you load into the cluster must exist somewhere. Do you keep a copy or rely on Kubernetes to be the only source of truth? How do you back them up? What if you keep a copy and they go out of sync?`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-09-01',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Omer Levi Hevroni',
    avatar: <img src='assets/authors/omer_levi_hevroni.jpg' alt='Omer Levi Hevroni' />,
    link: 'https://twitter.com/omerlh',
    shortDescription: 'DevSecOps engineer at [Soluto Engineering](https://www.solutotlv.com/). OWASP member.',
  },
})

export const SecretsRender = BiteSizedRender(`${__dirname}/secrets.md`)
export const SmallOrLargeRender = BiteSizedRender(`${__dirname}/smallOrLarge.md`)

function identity<T>(value: T): T {
  return value
}
