import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Details = {
  type: 'deployLaravel',
  url: '/kubernetes-deploy-laravel-the-easy-way',
  seoTitle: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
  title: 'Kubernetes: deploy Laravel the easy way',
  shortDescription: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
  description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
  openGraphImage: <img src='src/deployLaravel/laravel_k8s.jpg' alt='Deploy Laravel on Kubernetes' />,
  publishedDate: '2018-04-25',
  lastModifiedDate: '2019-11-15',
  previewImage: <img src='src/deployLaravel/laravel_k8s.jpg' alt='Deploy Laravel on Kubernetes' />,
  author: {
    fullName: 'Keith Mifsud',
    avatar: <img src='assets/authors/keith_mifsud.jpg' alt='Keith Mifsud' />,
    link: 'https://keith-mifsud.me/',
  },
} as const

export const DeployLaravel = {
  id: 'deploy-laravel',
  url: '/blog/kubernetes-deploy-laravel-the-easy-way',
  title: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
  description: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
}

const OldDeployLaravel = {
  id: 'old-deploy-laravel',
  url: '/blog/deploying-laravel-to-kubernetes',
  title: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
  description: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(DeployLaravel))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-deploy-laravel',
      pageId: DeployLaravel.id,
      image: <img src='src/deployLaravel/laravel_k8s.jpg' alt='Deploy Laravel on Kubernetes' />,
      title: 'Kubernetes: deploy Laravel the easy way',
      description: DeployLaravel.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-deploy-laravel',
      pageId: DeployLaravel.id,
      authorId: Authors.keithMifsud.id,
      description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
      title: 'Kubernetes: deploy Laravel the easy way',
      publishedDate: '2018-04-25',
      lastModifiedDate: '2019-11-15',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: DeployLaravel.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'deploy-laravel-related-0',
      blogPostId: 'bp-deploy-laravel',
      content: toVFile({ path: join(__dirname, 'deploy-laravel-related.md') }),
    }),
  )
  store.dispatch(Action.registerPage(OldDeployLaravel))
  store.dispatch(
    Action.registerRedirect({
      id: 'redirect-laravel',
      fromPageId: OldDeployLaravel.id,
      redirectToPageId: DeployLaravel.id,
    }),
  )
}
