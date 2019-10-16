import { Details, BiteSizedRender } from '../biteSized'
import * as React from 'react'
import { RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { getFullUrl } from '../sitemap'

export const AutoscalingDetails = identity<Details>({
  type: 'bsk-oct-01' as const,
  url: '/autoscaling-apps-kubernetes',
  seoTitle: 'How to autoscale apps on Kubernetes with custom metrics',
  title: 'How to autoscale apps on Kubernetes with custom metrics',
  description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-03',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
    shortDescription: 'Daniel is a software engineer and instructor at Learnk8s.',
  },
})

export const AutoscalingRender = BiteSizedRender(`${__dirname}/autoscaling.md`, website => (
  <React.Fragment>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.bskSmallOrLarge)} className='link navy underline hover-sky'>
          Architecting Kubernetes clusters — choosing a worker node size
        </a>{' '}
        where you'll learn the pros and cons of having clusters with large and small instance types for your cluster
        nodes.
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.scalingTensorflow)}
          className='link navy underline hover-sky'
        >
          Scaling Jupyter notebooks with Kubernetes and Tensorflow
        </a>{' '}
        One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can
        operate at scale and in real-time. In this article, you will explore how you can leverage Kubernetes, Tensorflow
        and Kubeflow to scale your models without having to worry about scaling the infrastructure.
      </RelatedContentItem>
    </RelatedConentContainer>
    <div>
      <h2 className='f2 pt4 pb2'>More autoscaling, metrics, etc.</h2>
      <p className='lh-copy measure-wide f4'>
        <span className='b'>
          The article is a summary of the first three modules of the autoscaling course on the Learnk8s Academy.
        </span>{' '}
        The full course includes a deep dive into the three different metrics server as well as how to:
      </p>
      <ul>
        <li className='mv3 f4-l lh-copy'>expose metrics from your application</li>
        <li className='mv3 f4-l lh-copy'>install and configure Prometheus to collect metrics</li>
        <li className='mv3 f4-l lh-copy'>
          configure the custom and external metrics adapters to serve custom metrics to Kubernetes
        </li>
        <li className='mv3 f4-l lh-copy'>tune the Horizontal Pod Autoscaler</li>
      </ul>
      <div className='mt4 mb5'>
        <a
          href={getFullUrl(website.children.academy)}
          className='dib white bg-blue br1 pv3 ph4 b f4 bn pointer no-underline'
        >
          Learn more ⇢
        </a>
      </div>
    </div>
  </React.Fragment>
))

export const RollbacksDetails = identity<Details>({
  type: 'bsk-october-01' as const,
  url: '/kubernetes-rollbacks',
  seoTitle: 'Do you have a rollback plan in Kubernetes?',
  title: 'Do you have a rollback plan in Kubernetes?',
  description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
  openGraphImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  publishedDate: '2019-10-09',
  previewImage: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
  author: {
    fullName: 'Gergely Risko',
    avatar: <img src='assets/authors/gergely-risko.jpg' alt='Gergely Risko' />,
    link: 'https://github.com/errge',
    shortDescription: 'Gergely is an instructor at Learnk8s.',
  },
})

export const RollbacksRender = BiteSizedRender(`${__dirname}/rollbacks.md`, website => (
  <React.Fragment>
    <div>
      <h2 className='f2 pt4 pb2'>Advanced deployment strategies and rollbacks</h2>
      <p className='lh-copy measure-wide f4'>
        <span className='b'>
          The article is an excerpt from the Advanced Deployment course on the Learnk8s Academy.
        </span>{' '}
        The full course includes a deep dive into the three different deployment strategies you can practice in
        Kubernetes:
      </p>
      <ul>
        <li className='mv3 f4-l lh-copy'>Rolling updates</li>
        <li className='mv3 f4-l lh-copy'>Canary deployments</li>
        <li className='mv3 f4-l lh-copy'>Blue-green deployments</li>
      </ul>
      <div className='mt4 mb5'>
        <a
          href={getFullUrl(website.children.academy)}
          className='dib white bg-blue br1 pv3 ph4 b f4 bn pointer no-underline'
        >
          Learn more ⇢
        </a>
      </div>
    </div>
    <RelatedConentContainer>
      <RelatedContentItem>
        <a href={getFullUrl(website.children.bskSmallOrLarge)} className='link navy underline hover-sky'>
          Architecting Kubernetes clusters — choosing a worker node size
        </a>{' '}
        where you'll learn the pros and cons of having clusters with large and small instance types for your cluster
        nodes.
      </RelatedContentItem>
      <RelatedContentItem>
        <a
          href={getFullUrl(website.children.blog.children.scalingTensorflow)}
          className='link navy underline hover-sky'
        >
          Scaling Jupyter notebooks with Kubernetes and Tensorflow
        </a>{' '}
        One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can
        operate at scale and in real-time. In this article, you will explore how you can leverage Kubernetes, Tensorflow
        and Kubeflow to scale your models without having to worry about scaling the infrastructure.
      </RelatedContentItem>
    </RelatedConentContainer>
  </React.Fragment>
))

function identity<T>(value: T): T {
  return value
}
