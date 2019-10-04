import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'k8sOnWindows',
  url: '/installing-docker-and-kubernetes-on-windows',
  seoTitle: 'Getting started with Docker and Kubernetes on Win 10 ♦︎ Learnk8s',
  title: 'Getting started with Docker and Kubernetes on Windows 10',
  shortDescription: `In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
  description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
  openGraphImage: (
    <img src='src/k8sOnWindows/k8s_on_win.jpg' alt='Getting started with Docker and Kubernetes on Windows 10' />
  ),
  publishedDate: '2018-06-05',
  lastModifiedDate: '2019-03-20',
  previewImage: (
    <img src='src/k8sOnWindows/k8s_on_win.jpg' alt='Getting started with Docker and Kubernetes on Windows 10' />
  ),
  author: {
    fullName: 'Keith Mifsud',
    avatar: <img src='assets/authors/keith_mifsud.jpg' alt='Keith Mifsud' />,
    link: 'https://keith-mifsud.me/',
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
      lastUpdated={currentNode.payload.lastModifiedDate}
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
          dateModified: currentNode.payload.lastModifiedDate,
          description: currentNode.payload.description,
          mainEntityOfPage: {
            '@type': 'SoftwareSourceCode',
          },
        }}
      />
      {Remark.render(`${__dirname}/content.md`)}

      <RelatedConentContainer>
        <RelatedContentItem>
          <a href={getFullUrl(website.children.blog.children.terraformAks)} className='link navy underline hover-sky'>
            Getting started with Terraform and Kubernetes on Azure AKS
          </a>{' '}
          — an in-depth tutorial on how to use infrastructure as code to generate Kubernetes cluster on Azure.
        </RelatedContentItem>
        <RelatedContentItem>
          <a href={getFullUrl(website.children.bskApiIngress)} className='link navy underline hover-sky'>
            Can you expose your microservices with an API gateway in Kubernetes?
          </a>{' '}
          In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and
          Pods inside the cluster. You can select an Ingress that is also an API gateway. Learn how.
        </RelatedContentItem>
      </RelatedConentContainer>
    </Article>,
  )
}
