import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const PersistentConnections = {
  id: 'persistent-connections',
  url: '/kubernetes-long-lived-connections',
  title: 'Load balancing and scaling long-lived connections in Kubernetes',
  description: `Kubernetes doesn't load balance long-lived connections and some Pods might receive more requests than others. Learn how to fix that.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(PersistentConnections))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-persistent-connections',
      pageId: PersistentConnections.id,
      image: (
        <img src='src/persistent-connections/persistent-connections.png' alt='Troubleshooting Kubernetes deployments' />
      ),
      title: PersistentConnections.title,
      description: `Kubernetes doesn't load balance long-lived connections, and some Pods might receive more requests than others. If you're using HTTP/2, gRPC, RSockets, AMQP or any other long-lived connection such as a database connection, you might want to consider client-side load balancing.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-persistent-connections',
      pageId: PersistentConnections.id,
      authorId: Authors.danielePolencic.id,
      title: PersistentConnections.title,
      description: `Kubernetes doesn't load balance long-lived connections, and some Pods might receive more requests than others. If you're using HTTP/2, gRPC, RSockets, AMQP or any other long-lived connection such as a database connection, you might want to consider client-side load balancing.`,
      publishedDate: '2020-02-05',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: PersistentConnections.id }))
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'persistent-connections-picture',
      pageId: PersistentConnections.id,
      image: <img src='src/persistent-connections/persistent-connections.svg' alt={PersistentConnections.title} />,
    }),
  )
}
