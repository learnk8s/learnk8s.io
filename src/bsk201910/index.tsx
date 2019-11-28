import { Details } from '../biteSized'
import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { toVFile } from '../files'
import { join } from 'path'

export const Pages = {
  autoscaling: {
    id: 'autoscaling-apps-kubernetes',
    url: '/autoscaling-apps-kubernetes',
    title: 'How to autoscale apps on Kubernetes with custom metrics',
    description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  },

  rollbacks: {
    id: 'kubernetes-rollbacks',
    url: '/kubernetes-rollbacks',
    title: 'How do you rollback deployments in Kubernetes?',
    description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
  },
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Pages.autoscaling))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.autoscaling.title,
      description: Pages.autoscaling.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPostV2({
      id: 'bp-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      authorId: Authors.danielWeibel.id,
      description: Pages.autoscaling.description,
      title: 'How to autoscale apps on Kubernetes with custom metrics',
      publishedDate: '2019-10-03',
      content: toVFile({ path: join(__dirname, 'autoscaling.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.autoscaling.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'autoscaling-apps-kubernetes-related-0',
      blogPostId: 'bp-autoscaling-apps-kubernetes',
      content: toVFile({ path: join(__dirname, 'autoscaling-related.md') }),
    }),
  )

  store.dispatch(Action.registerPage(Pages.rollbacks))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.rollbacks.title,
      description: Pages.rollbacks.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPostV2({
      id: 'bp-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      authorId: Authors.gergelyRisko.id,
      description: Pages.rollbacks.description,
      title: 'How do you rollback deployments in Kubernetes?',
      publishedDate: '2019-10-17',
      content: toVFile({ path: join(__dirname, 'rollbacks.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'bite-sized', pageId: Pages.rollbacks.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-rollbacks-related-0',
      blogPostId: 'bp-kubernetes-rollbacks',
      content: toVFile({ path: join(__dirname, 'rollbacks-related.md') }),
    }),
  )
}

export const AutoscalingDetails = identity<Details>({
  type: 'bsk-oct-01' as const,
  url: '/autoscaling-apps-kubernetes',
  seoTitle: 'How to autoscale apps on Kubernetes with custom metrics',
  title: 'How to autoscale apps on Kubernetes with custom metrics',
  description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-03',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const RollbacksDetails = identity<Details>({
  type: 'bsk-october-01' as const,
  url: '/kubernetes-rollbacks',
  seoTitle: 'How do you rollback deployments in Kubernetes?',
  title: 'How do you rollback deployments in Kubernetes?',
  description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-17',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Gergely Risko',
    avatar: <img src='assets/authors/gergely-risko.jpg' alt='Gergely Risko' />,
    link: 'https://github.com/errge',
    shortDescription: 'Gergely is an instructor at Learnk8s.',
  },
})

function identity<T>(value: T): T {
  return value
}
