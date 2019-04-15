import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout'
import * as Remark from '../remark'

export const Details = {
  type: identity<'kubectlProductivity'>('kubectlProductivity'),
  url: '/kubectl-productivity',
  seoTitle: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  title: 'Boosting your kubectl productivity',
  shortDescription: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient.`,
  description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

This article contains a series of tips and tricks to help you boost your kubectl productivity. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
  openGraphImage: Image({ url: 'src/advancedKubectl/magic.jpg', description: 'Advanced kubectl usage' }),
  publishedDate: '2019-03-27',
  lastModifiedDate: '2019-04-15',
  previewImage: Image({ url: 'src/advancedKubectl/magic.jpg', description: 'Advanced kubectl usage' }),
  author: {
    fullName: 'Daniel Weibel',
    avatar: Image({ url: 'assets/authors/daniel_weibel.jpg', description: 'Daniel Weibel' }),
    link: 'https://medium.com/@weibeld',
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const { css, js, html } = Remark.render(`${__dirname}/content.md`)
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
      cssBundle={CSSBundle({
        paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
        styles: css,
      })}
    >
      <JsonLd<BlogPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: currentNode.payload.title,
          image: `${siteUrl}${currentNode.payload.previewImage.url}`,
          author: {
            '@type': 'Person',
            name: currentNode.payload.author.fullName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Learnk8s',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}${Image({ url: 'assets/learnk8s_logo_square.png', description: 'Learnk8s logo' }).url}`,
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
      {html}

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

      <Subscribe identifier='advanced-kubectl' />

      <JSScript
        js={JSBundle({
          scripts: js,
        })}
      />
    </Article>,
  )
}
