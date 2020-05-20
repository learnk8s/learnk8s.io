import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const PersistentConnections = {
  id: 'persistent-connections',
  url: '/kubernetes-long-lived-connections',
  title: 'Load balancing and scaling long-lived connections in Kubernetes',
  description: `Kubernetes doesn't load balance long-lived connections and some Pods might receive more requests than others. Learn how to fix that.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(PersistentConnections))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-persistent-connections',
      pageId: PersistentConnections.id,
      image: 'src/persistent-connections/persistent-connections.png',
      title: PersistentConnections.title,
      description: `Kubernetes doesn't load balance long-lived connections, and some Pods might receive more requests than others. If you're using HTTP/2, gRPC, RSockets, AMQP or any other long-lived connection such as a database connection, you might want to consider client-side load balancing.`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-persistent-connections',
      pageId: PersistentConnections.id,
      authorId: Authors.danielePolencic.id,
      title: PersistentConnections.title,
      description: `Kubernetes doesn't load balance long-lived connections, and some Pods might receive more requests than others. If you're using HTTP/2, gRPC, RSockets, AMQP or any other long-lived connection such as a database connection, you might want to consider client-side load balancing.`,
      publishedDate: '2020-02-05',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: PersistentConnections.id + '-general-post',
      tag: 'general-post',
      pageId: PersistentConnections.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'persistent-connections-picture',
      pageId: PersistentConnections.id,
      image: <img src='src/persistent-connections/persistent-connections.svg' alt={PersistentConnections.title} />,
    }),
  )
}
