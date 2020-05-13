import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, ActionV2, StoreV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ZeroToK8sJava = {
  id: '02k8s-java',
  url: '/spring-boot-kubernetes-guide',
  title: 'Developing and deploying Spring Boot microservices on Kubernetes',
  description: `Learn how to design and architect Spring Boot microservices that leverage Kubernetes and scale to millions of requests.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(ZeroToK8sJava))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-02k8s-java',
      pageId: ZeroToK8sJava.id,
      image: (
        <img src='src/02k8s-java/jury.png' alt='Hands-on guide: developing and deploying Java apps in Kubernetes' />
      ),
      title: 'Developing and deploying Spring Boot microservices on Kubernetes',
      description: `Learning how to design and architect Spring Boot microservices that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-02k8s-java',
      pageId: ZeroToK8sJava.id,
      authorId: Authors.mauricioSalatino.id,
      description: `Learning how to design and architect Spring Boot microservicesleverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
      title: 'Developing and deploying Spring Boot microservices on Kubernetes',
      publishedDate: '2020-03-11',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ZeroToK8sJava.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: '02k8s-java-related-0',
      blogPostId: 'bp-02k8s-java',
      content: toVFile({ path: join(__dirname, '02k8s-java-related.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.previewPictures.add({
      id: '02k8s-java-picture',
      pageId: ZeroToK8sJava.id,
      image: <img src='src/02k8s-java/jury.svg' alt={ZeroToK8sJava.title} />,
    }),
  )
}
