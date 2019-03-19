import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Markdown, Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { ListItem, PromoAcademy } from '../layout'

export const Details = {
  type: identity<'k8sOnWindows'>('k8sOnWindows'),
  url: '/installing-docker-and-kubernetes-on-windows',
  seoTitle: 'Getting started with Docker and Kubernetes on Win 10 ♦︎ Learnk8s',
  title: 'Getting started with Docker and Kubernetes on Windows 10',
  shortDescription: `In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
  description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
  openGraphImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'Getting started with Docker and Kubernetes on Windows 10',
  }),
  publishedDate: '2018-06-05',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'Getting started with Docker and Kubernetes on Windows 10',
  }),
  author: {
    fullName: 'Keith Mifsud',
    avatar: Image({ url: 'assets/authors/keith_mifsud.jpg', description: 'Keith Mifsud' }),
    link: 'https://keith-mifsud.me/',
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const { css, js, html } = Markdown(cat('src/k8sOnWindows/content.md').toString(), __dirname)
  return renderToStaticMarkup(
    <Article
      website={website}
      siteUrl={siteUrl}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.shortDescription}
      openGraphImage={currentNode.payload.openGraphImage}
      absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
      authorFullName={currentNode.payload.author.fullName}
      authorAvatar={currentNode.payload.author.avatar}
      authorLink={currentNode.payload.author.link}
      cssBundle={CSSBundle({
        paths: [
          'node_modules/tachyons/css/tachyons.css',
          'src/prism-solarizedlight.css',
          'src/prism-line-highlight.css',
          'assets/style.css',
        ],
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
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <PromoAcademy sitemap={website} />
    </Article>,
  )
}
