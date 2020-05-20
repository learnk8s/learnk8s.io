import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ScalingSpringBoot = {
  id: 'scaling-spring-boot',
  url: '/blog/scaling-spring-boot-microservices',
  title: 'Scaling SpringBoot with Message Queues and Kubernetes ⎈ Learnk8s',
  description: `Learn how to scale SpringBoot apps in Kubernetes using the autoscaler and a message broker such as Kafka, RabbitMQ or ActiveMQ.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ScalingSpringBoot))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-scaling-spring-boot',
      pageId: ScalingSpringBoot.id,
      image: 'src/scalingSpringBoot/autoscaling.png',
      title: ScalingSpringBoot.title,
      description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-scaling-spring-boot',
      pageId: ScalingSpringBoot.id,
      authorId: Authors.danielePolencic.id,
      description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
      title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes',
      publishedDate: '2018-07-11',
      lastModifiedDate: '2019-11-15',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: ScalingSpringBoot.id + '-general-post',
      tag: 'general-post',
      pageId: ScalingSpringBoot.id,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'scaling-spring-boot-related-0',
      blogPostId: 'bp-scaling-spring-boot',
      content: toVFile({ path: join(__dirname, 'scaling-spring-boot-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'scaling-spring-boot-picture',
      pageId: ScalingSpringBoot.id,
      image: 'src/scalingSpringBoot/autoscaling.svg',
    }),
  )
}
