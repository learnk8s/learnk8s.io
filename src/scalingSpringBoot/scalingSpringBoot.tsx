import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'scalingSpringBoot',
  url: '/scaling-spring-boot-microservices',
  seoTitle: 'Scaling SpringBoot with Message Queues and Kubernetes ♦︎ Learnk8s',
  title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes',
  description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
  openGraphImage: <img src='src/scalingSpringBoot/autoscaling.png' alt='Containers' />,
  publishedDate: '2018-07-11',
  lastModifiedDate: '2019-11-15',
  previewImage: (
    <img
      src='src/scalingSpringBoot/autoscaling.png'
      alt='Scaling Microservices with Message Queues, Spring Boot and Kubernetes'
    />
  ),
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://linkedin.com/in/danielepolencic',
  },
} as const

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Article
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
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
          <a
            href={getFullUrl(website.children.blog.children.smallerDockerImage)}
            className='link navy underline hover-sky'
          >
            3 simple tricks for smaller Docker images
          </a>{' '}
          and learn how to build and deploy Docker images quicker.
        </RelatedContentItem>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.chaosEngineering)}
            className='link navy underline hover-sky'
          >
            Kubernetes Chaos Engineering: Lessons Learned — Part 1
          </a>
          what happens when things go wrong in Kubernetes? Can Kubernetes recover from failure and self-heal?
        </RelatedContentItem>
      </RelatedConentContainer>

      <Subscribe identifier='scaling-spring-boot' />
    </Article>,
  )
}
