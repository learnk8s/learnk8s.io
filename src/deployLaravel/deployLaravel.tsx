import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const DeployLaravel = {
  id: 'deploy-laravel',
  url: '/blog/kubernetes-deploy-laravel-the-easy-way',
  title: 'Kubernetes: deploy Laravel the easy way ⎈ Learnk8s',
  description: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
}

const OldDeployLaravel = {
  id: 'old-deploy-laravel',
  url: '/blog/deploying-laravel-to-kubernetes',
  title: 'Kubernetes: deploy Laravel the easy way ⎈ Learnk8s',
  description: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(DeployLaravel))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-deploy-laravel',
      pageId: DeployLaravel.id,
      image: 'src/deployLaravel/laravel_k8s.jpg',
      title: 'Kubernetes: deploy Laravel the easy way',
      description: DeployLaravel.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-deploy-laravel',
      pageId: DeployLaravel.id,
      authorId: Authors.keithMifsud.id,
      description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
      title: 'Kubernetes: deploy Laravel the easy way',
      publishedDate: '2018-04-25',
      lastModifiedDate: '2020-05-12',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: DeployLaravel.id + '-general-post', tag: 'general-post', pageId: DeployLaravel.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'deploy-laravel-related-0',
      blogPostId: 'bp-deploy-laravel',
      content: toVFile({ path: join(__dirname, 'deploy-laravel-related.md') }),
    }),
  )
  store.dispatch(Action.pages.add(OldDeployLaravel))
  store.dispatch(
    Action.redirects.add({
      id: 'redirect-laravel',
      fromPageId: OldDeployLaravel.id,
      redirectToPageId: DeployLaravel.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'deploy-laravel-picture',
      pageId: DeployLaravel.id,
      image: <img src='src/deployLaravel/laravel_k8s.svg' alt={DeployLaravel.title} />,
    }),
  )
}
