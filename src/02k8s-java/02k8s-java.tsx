import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ZeroToK8sJava = {
  id: '02k8s-java',
  url: '/spring-boot-kubernetes-guide',
  title: 'Developing and deploying Spring Boot microservices on Kubernetes',
  description: `Learn how to design and architect Spring Boot microservices that leverage Kubernetes and scale to millions of requests.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ZeroToK8sJava))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-02k8s-java',
      pageId: ZeroToK8sJava.id,
      image: 'src/02k8s-java/jury.png',
      title: 'Developing and deploying Spring Boot microservices on Kubernetes',
      description: `Learning how to design and architect Spring Boot microservices that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-02k8s-java',
      pageId: ZeroToK8sJava.id,
      authorId: Authors.mauricioSalatino.id,
      description: `Learning how to design and architect Spring Boot microservicesleverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
      title: 'Developing and deploying Spring Boot microservices on Kubernetes',
      publishedDate: '2020-03-11',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: ZeroToK8sJava.id + '-general-post', tag: 'general-post', pageId: ZeroToK8sJava.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: '02k8s-java-related-0',
      blogPostId: 'bp-02k8s-java',
      content: toVFile({ path: join(__dirname, '02k8s-java-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: '02k8s-java-picture',
      pageId: ZeroToK8sJava.id,
      image: 'src/02k8s-java/jury.svg',
    }),
  )
}
