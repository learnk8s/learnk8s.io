import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'

export const AutoscalingDetails = identity<Details>({
  type: 'bsk-oct-01' as const,
  url: '/autoscaling',
  seoTitle: 'How to autoscale your app on Kubernetes?',
  title: 'How to autoscale your app on Kubernetes?',
  description: `Deploying an app in a static configuration is not optimal. Traffic patterns can change quickly an the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-02',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const AutoscalingRender = BiteSizedRender(`${__dirname}/autoscaling.md`)

function identity<T>(value: T): T {
  return value
}
