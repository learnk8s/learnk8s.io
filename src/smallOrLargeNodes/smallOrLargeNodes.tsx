import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'smallOrLargeNodes',
  url: '/small-vs-large-nodes',
  seoTitle: 'Should you have many small nodes or few large nodes in your cluster?♦︎ Learnk8s',
  title: 'Should you have many small nodes or few large nodes in your cluster?',
  shortDescription: `When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use and how many of them?". This article looks at the pros and cons of either using many small nodes or few large nodes.`,
  description: `When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use and how many of them?". You can achieve the desired cluster capacity (in terms of CPU and memory) equally with many small nodes or with few large nodes. But which way is better? This article looks at the pros and cons of both approaches.`,
  openGraphImage: <img src='src/smallOrLargeNodes/nodes.jpg' alt='Small vs large nodes' />,
  publishedDate: '2019-09-01',
  lastModifiedDate: '2019-09-01',
  previewImage: <img src='src/smallOrLargeNodes/nodes.jpg' alt='Small vs large nodes' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
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
          <a href={getFullUrl(website.children.blog.children.spotInstances)} className='link navy underline hover-sky'>
            How to practice chaos engineering and reduce costs
          </a>{' '}
          with Kubernetes and spot instances.
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

      <Subscribe identifier='small-vs-large-nodes' />
    </Article>,
  )
}
