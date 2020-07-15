import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Gatekeeper = {
  id: 'gatekeeper',
  url: '/kubernetes-policies',
  title: 'Enforcing policies and governance for Kubernetes workloads',
  description: `In this article, you will learn about enforcing policies for your Kubernetes workloads using both out-of-cluster and in-cluster solutions.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Gatekeeper))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-gatekeeper',
      pageId: Gatekeeper.id,
      imagePath: 'src/gatekeeper/gatekeeper.png',
      title: Gatekeeper.title,
      description: Gatekeeper.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-gatekeeper',
      pageId: Gatekeeper.id,
      authorId: Authors.amitSaha.id,
      description: Gatekeeper.description,
      title: Gatekeeper.title,
      publishedDate: '2020-07-15',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: Gatekeeper.id + '-general-post',
      tag: 'general-post',
      pageId: Gatekeeper.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'gatekeeper-picture',
      pageId: Gatekeeper.id,
      imagePath: 'src/gatekeeper/gatekeeper.svg',
    }),
  )
}
