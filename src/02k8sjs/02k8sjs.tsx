import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ZeroToK8sJs = {
  id: '02k8sjs',
  url: '/nodejs-kubernetes-guide',
  title: 'Hands-on guide: developing & deploying Node.js apps in Kubernetes',
  description: `Learn how to design and architect Node.js apps that leverage Kubernetes and scale to millions of requests.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(ZeroToK8sJs))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-02k8sjs',
      pageId: ZeroToK8sJs.id,
      image: (
        <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
      ),
      title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
      description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-02k8sjs',
      pageId: ZeroToK8sJs.id,
      authorId: Authors.danielePolencic.id,
      description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
      title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
      publishedDate: '2019-10-31',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: ZeroToK8sJs.id + '-general-post', tag: 'general-post', pageId: ZeroToK8sJs.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: '02k8sjs-related-0',
      blogPostId: 'bp-02k8sjs',
      content: toVFile({ path: join(__dirname, '02k8sjs-related.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.previewPictures.add({
      id: 'v-picture',
      pageId: ZeroToK8sJs.id,
      image: <img src='src/02k8sjs/jury.svg' alt={ZeroToK8sJs.title} />,
    }),
  )
}
