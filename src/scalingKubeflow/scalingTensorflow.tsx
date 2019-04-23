import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'scalingTensorflow',
  url: '/scaling-machine-learning-with-kubeflow-tensorflow',
  seoTitle: 'Scaling Jupyter notebooks with Kubernetes, Tensorflow ♦︎ Learnk8s',
  title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow',
  shortDescription: `In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
  description: `One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can operate at scale and in real-time. Data scientists and engineers are often expected to learn, develop and maintain the infrastructure for their experiments, but the process takes time away from focussing on training and developing the models. But what if you could outsource all of the non-data science to someone else while still retaining control? In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
  openGraphImage: <img src='src/scalingKubeflow/kubeflow.png' alt='Big data' />,
  publishedDate: '2019-01-09',
  previewImage: <img src='src/scalingKubeflow/kubeflow.png' alt='Scaling Jupyter notebooks with Kubernetes and Tensorflow' />,
  author: {
    fullName: 'Salman Iqbal',
    avatar: <img src='assets/authors/salman_iqbal.jpg' alt='Salman Iqbal' />,
    link: 'https://twitter.com/soulmaniqbal',
  },
} as const

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Article
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.shortDescription}
      openGraphImage={currentNode.payload.openGraphImage}
      absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
      authorFullName={currentNode.payload.author.fullName}
      authorAvatar={currentNode.payload.author.avatar}
      authorLink={currentNode.payload.author.link}
      publishedDate={currentNode.payload.publishedDate}
    >
      <JsonLd<BlogPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: currentNode.payload.title,
          image: `${currentNode.payload.previewImage.props.src}`,
          author: {
            '@type': 'Person',
            name: currentNode.payload.author.fullName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Learnk8s',
            logo: {
              '@type': 'ImageObject',
              url: `assets/learnk8s_logo_square.png`,
            },
          },
          url: getAbsoluteUrl(currentNode, siteUrl),
          datePublished: currentNode.payload.publishedDate,
          dateModified: currentNode.payload.publishedDate,
          description: currentNode.payload.description,
          mainEntityOfPage: {
            '@type': 'SoftwareSourceCode',
          },
        }}
      />
      {Remark.render(`${__dirname}/content.md`)}

      <RelatedConentContainer>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.whatIsKubernetes)}
            className='link navy underline hover-sky'
          >
            What is Kubernetes? Optimise your hosting costs and efficiency
          </a>{' '}
          and learn how Kubernetes works and why it was invented in the first place.
        </RelatedContentItem>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.scalingSpringBoot)}
            className='link navy underline hover-sky'
          >
            Scaling Microservices with Message Queues, Spring Boot and Kubernetes.
          </a>{' '}
          Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.
        </RelatedContentItem>
      </RelatedConentContainer>

      <Subscribe identifier='scaling-tensorflow' />
    </Article>,
  )
}
