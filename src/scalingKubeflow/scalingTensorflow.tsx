import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ScalingTensorflow = {
  id: 'scaling-tensorflow',
  url: '/blog/scaling-machine-learning-with-kubeflow-tensorflow',
  title: 'Scaling Jupyter notebooks with Kubernetes, Tensorflow ⎈ Learnk8s',
  description: `In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
}

const InfiniteConf = {
  id: 'infinite-conf-2018',
  url: '/infiniteconf2018',
  title: 'Infinite Conf 2018',
  description: `Workshop on Tensorflow and Kubernetes held at InfiniteConf 2018`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ScalingTensorflow))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-scaling-tensorflow',
      pageId: ScalingTensorflow.id,
      image: 'src/scalingKubeflow/kubeflow.png',
      title: ScalingTensorflow.title,
      description: ScalingTensorflow.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-scaling-tensorflow',
      pageId: ScalingTensorflow.id,
      authorId: Authors.salmanIqbal.id,
      description: `One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can operate at scale and in real-time. Data scientists and engineers are often expected to learn, develop and maintain the infrastructure for their experiments, but the process takes time away from focussing on training and developing the models. But what if you could outsource all of the non-data science to someone else while still retaining control? In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
      title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow',
      publishedDate: '2019-01-09',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: ScalingTensorflow.id + '-general-post',
      tag: 'general-post',
      pageId: ScalingTensorflow.id,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'scaling-tensorflow-related-0',
      blogPostId: 'bp-scaling-tensorflow',
      content: toVFile({ path: join(__dirname, 'scaling-tensorflow-related.md') }),
    }),
  )
  store.dispatch(Action.pages.add(InfiniteConf))
  store.dispatch(
    Action.redirects.add({
      id: 'redirect-infinite-conf',
      fromPageId: InfiniteConf.id,
      redirectToPageId: ScalingTensorflow.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'scaling-tensorflow-picture',
      pageId: ScalingTensorflow.id,
      image: <img src='src/scalingKubeflow/kubeflow.svg' alt={ScalingTensorflow.title} />,
    }),
  )
}
