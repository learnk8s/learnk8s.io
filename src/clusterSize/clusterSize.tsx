import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ClusterSize = {
  id: 'cluster-size',
  url: '/kubernetes-cluster-size',
  title: 'Architecting Kubernetes clusters — choosing a cluster size',
  description: `Should you use one big cluster or many small clusters for running your applications?. This article looks at the pros and cons of the different options you have.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ClusterSize))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-cluster-size',
      pageId: ClusterSize.id,
      image: (
        <img
          src='src/clusterSize/architecting-clusters.png'
          alt='Architecting Kubernetes clusters — choosing a cluster size'
        />
      ),
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: should use one big cluster for all your applications, or multiple smaller clusters for individual workloads? This article investigates the pros and cons of the different options you have.Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-cluster-size',
      pageId: ClusterSize.id,
      authorId: Authors.danielWeibel.id,
      title: ClusterSize.title,
      description: `If you use Kubernetes as your application platform, one of the fundamental questions is: should use one big cluster for all your applications, or multiple smaller clusters for individual workloads? This article investigates the pros and cons of the different options you have.`,
      publishedDate: '2020-02-19',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ClusterSize.id }))
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'cluster-size-picture',
      pageId: ClusterSize.id,
      image: <img src='src/clusterSize/architecting-clusters.svg' alt={ClusterSize.title} />,
    }),
  )
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'kubernetes-cluster-size-related-0',
      blogPostId: 'bp-cluster-size',
      content: toVFile({ path: join(__dirname, 'clusterSize-related.md') }),
    }),
  )
}
