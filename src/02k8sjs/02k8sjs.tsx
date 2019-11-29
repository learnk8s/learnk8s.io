import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Details = {
  type: '02k8sjs',
  url: '/nodejs-kubernetes-guide',
  seoTitle: 'Hands-on guide: developing & deploying Node.js apps in Kubernetes',
  title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
  description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
  openGraphImage: (
    <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
  ),
  publishedDate: '2019-10-31',
  previewImage: (
    <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
  ),
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://linkedin.com/in/danielepolencic',
  },
} as const

export const ZeroToK8sJs = {
  id: '02k8sjs',
  url: '/nodejs-kubernetes-guide',
  title: 'Hands-on guide: developing & deploying Node.js apps in Kubernetes ♦︎ Learnk8s',
  description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ZeroToK8sJs))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-02k8sjs',
      pageId: ZeroToK8sJs.id,
      image: (
        <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
      ),
      title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
      description: ZeroToK8sJs.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-02k8sjs',
      pageId: ZeroToK8sJs.id,
      authorId: Authors.danielePolencic.id,
      description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
      title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
      publishedDate: '2019-10-31',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ZeroToK8sJs.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: '02k8sjs-related-0',
      blogPostId: 'bp-02k8sjs',
      content: toVFile({ path: join(__dirname, '02k8sjs-related.md') }),
    }),
  )
}
