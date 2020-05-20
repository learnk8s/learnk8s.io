import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const SpotInstances = {
  id: 'spot-instances',
  url: '/blog/kubernetes-spot-instances',
  title: 'Spot instances in Kubernetes ⎈ Learnk8s',
  description: `How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(SpotInstances))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-spot-instances',
      pageId: SpotInstances.id,
      image: 'src/spotInstances/cheap-cluster.jpg',
      title: SpotInstances.title,
      description: SpotInstances.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-spot-instances',
      pageId: SpotInstances.id,
      authorId: Authors.césarTronLozai.id,
      description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
      title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
      publishedDate: '2018-11-06',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: SpotInstances.id + '-general-post', tag: 'general-post', pageId: SpotInstances.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'spot-instances-related-0',
      blogPostId: 'bp-spot-instances',
      content: toVFile({ path: join(__dirname, 'spot-instances-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'spot-instances-picture',
      pageId: SpotInstances.id,
      image: <img src='src/spotInstances/cheap-cluster.svg' alt={SpotInstances.title} />,
    }),
  )
}
