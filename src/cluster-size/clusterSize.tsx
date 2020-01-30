import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ClusterSize = {
  id: 'cluster-size',
  url: '/sizing-kubernetes-clusters',
  title: 'A single large Kubernetes cluser or many smaller clusters?',
  description: `Learn how you can parametrise resource definitions with yq, kustomize and real code.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ClusterSize))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-cluster-size',
      pageId: ClusterSize.id,
      image: <img src='src/templating/templating.png' alt='Troubleshooting Kubernetes deployments' />,
      title: ClusterSize.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-cluster-size',
      pageId: ClusterSize.id,
      authorId: Authors.danielePolencic.id,
      title: ClusterSize.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
      publishedDate: '2020-01-31',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ClusterSize.id }))
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'cluster-size-picture',
      pageId: ClusterSize.id,
      image: <img src='src/templating/templating.svg' alt={ClusterSize.title} />,
    }),
  )
}
