import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const PersistentConnections = {
  id: 'persistent-connections',
  url: '/kubernetes-websockets-load-balancing',
  title: 'Load balancing persistent connections in Kubernetes',
  description: `Learn how you can parametrise resource definitions with yq, kustomize and real code.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(PersistentConnections))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-persistent-connections',
      pageId: PersistentConnections.id,
      image: <img src='src/persistent-connections/persistent-connections.png' alt='Troubleshooting Kubernetes deployments' />,
      title: PersistentConnections.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-persistent-connections',
      pageId: PersistentConnections.id,
      authorId: Authors.danielePolencic.id,
      title: PersistentConnections.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
      publishedDate: '2020-01-31',
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
