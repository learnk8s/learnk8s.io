import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Details = {
  type: 'spotInstances',
  url: '/kubernetes-spot-instances',
  seoTitle: 'Spot instances in Kubernetes ♦︎ Learnk8s',
  title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
  shortDescription: `How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  openGraphImage: <img src='src/spotInstances/cheap-cluster.jpg' alt='Serving cheaper servers' />,
  publishedDate: '2018-11-06',
  previewImage: (
    <img
      src='src/spotInstances/cheap-cluster.jpg'
      alt='Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes'
    />
  ),
  author: {
    fullName: 'César Tron-Lozai',
    avatar: <img src='assets/authors/césar_tron-lozai.jpg' alt='César Tron-Lozai' />,
    link: 'https://twitter.com/cesartronlozai',
  },
} as const

export const SpotInstances = {
  id: 'spot-instances',
  url: '/blog/kubernetes-spot-instances',
  title: 'Spot instances in Kubernetes ♦︎ Learnk8s',
  description: `How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(SpotInstances))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-spot-instances',
      pageId: SpotInstances.id,
      image: <img src='src/spotInstances/cheap-cluster.jpg' alt='Serving cheaper servers' />,
      title: SpotInstances.title,
      description: SpotInstances.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-spot-instances',
      pageId: SpotInstances.id,
      authorId: Authors.césarTronLozai.id,
      description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
      title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
      publishedDate: '2018-11-06',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: SpotInstances.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'spot-instances-related-0',
      blogPostId: 'bp-spot-instances',
      content: toVFile({ path: join(__dirname, 'spot-instances-related.md') }),
    }),
  )
}
