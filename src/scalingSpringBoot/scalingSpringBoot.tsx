import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ScalingSpringBoot = {
  id: 'scaling-spring-boot',
  url: '/blog/scaling-spring-boot-microservices',
  title: 'Scaling SpringBoot with Message Queues and Kubernetes ♦︎ Learnk8s',
  description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ScalingSpringBoot))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-scaling-spring-boot',
      pageId: ScalingSpringBoot.id,
      image: <img src='src/scalingSpringBoot/autoscaling.png' alt='Containers' />,
      title: ScalingSpringBoot.title,
      description: ScalingSpringBoot.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
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
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ScalingSpringBoot.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'scaling-spring-boot-related-0',
      blogPostId: 'bp-scaling-spring-boot',
      content: toVFile({ path: join(__dirname, 'scaling-spring-boot-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'scaling-spring-boot-picture',
      pageId: ScalingSpringBoot.id,
      image: <img src='src/scalingSpringBoot/autoscaling.svg' alt={ScalingSpringBoot.title} />,
    }),
  )
}
