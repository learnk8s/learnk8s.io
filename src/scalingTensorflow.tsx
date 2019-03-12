import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'


export const Details = {
  type: identity<'scalingTensorflow'>('scalingTensorflow'),
  url: '/scaling-machine-learning-with-kubeflow-tensorflow',
  seoTitle: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow ♦︎ Learnk8s',
  pageDetails: {
    title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow',
    description: `One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can operate at scale and in real-time. Data scientists and engineers are often expected to learn, develop and maintain the infrastructure for their experiments, but the process takes time away from focussing on training and developing the models. But what if you could outsource all of the non-data science to someone else while still retaining control? In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
    openGraphImage: Image({url: '_blog/scaling-machine-learning-with-kubeflow-tensorflow/kubeflow.png', description: 'Big data'}),
  },
  publishedDate: '2019-01-09',
  previewImage: Image({url: '_blog/scaling-machine-learning-with-kubeflow-tensorflow/kubeflow.png', description: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow'}),
  author: {
    fullName: 'Salman Iqbal',
    avatar: Image({url: 'assets/authors/salman_iqbal.jpg', description: 'Salman Iqbal'}),
    link: 'https://twitter.com/soulmaniqbal'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}