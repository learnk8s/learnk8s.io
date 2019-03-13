import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'


export const Details = {
  type: identity<'scalingSpringBoot'>('scalingSpringBoot'),
  url: '/scaling-spring-boot-microservices',
  seoTitle: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes ♦︎ Learnk8s',
  title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes',
  description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
  openGraphImage: Image({url: '_blog/scaling-spring-boot-microservices/autoscaling.png', description: 'Containers'}),
  publishedDate: '2018-07-11',
  previewImage: Image({url: '_blog/scaling-spring-boot-microservices/autoscaling.png', description: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes'}),
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