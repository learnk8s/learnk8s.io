import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { PromoAcademy } from '../layout'
import { Markdown } from '../markdown'

export const Details = {
  type: identity<'spotInstances'>('spotInstances'),
  url: '/kubernetes-spot-instances',
  seoTitle: 'Spot instances in Kubernetes ♦︎ Learnk8s',
  title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
  shortDescription: `How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
  openGraphImage: Image({ url: 'src/spotInstances/cheap-cluster.jpg', description: 'Serving cheaper servers' }),
  publishedDate: '2018-11-06',
  previewImage: Image({
    url: 'src/spotInstances/cheap-cluster.jpg',
    description: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
  }),
  author: {
    fullName: 'César Tron-Lozai',
    avatar: Image({ url: 'assets/authors/césar_tron-lozai.jpg', description: 'César Tron-Lozai' }),
    link: 'https://twitter.com/cesartronlozai',
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const { css, js, html } = Markdown(cat('src/spotInstances/content.md').toString(), __dirname)
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
      cssBundle={CSSBundle({
        paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
        styles: css,
      })}
      publishedDate={currentNode.payload.publishedDate}
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
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <RelatedConentContainer>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.installingK8sOnWindows)}
            className='link navy underline hover-sky'
          >
            Getting started with Docker and Kubernetes on Windows 10
          </a>{' '}
          where you'll get your hands dirty and install Docker and Kubernetes in your Windows environment.
        </RelatedContentItem>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.scalingSpringBoot)}
            className='link navy underline hover-sky'
          >
            Scaling Microservices with Message Queues, Spring Boot and Kubernetes
          </a>{' '}
          Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.
        </RelatedContentItem>
      </RelatedConentContainer>

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
          paths: ['src/spotInstances/anime.min.js', 'src/spotInstances/isScrolledIntoView.js'],
        })}
      />
    </Article>,
  )
}
