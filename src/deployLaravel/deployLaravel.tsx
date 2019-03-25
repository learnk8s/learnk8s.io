import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { PromoAcademy } from '../layout'
import { cat } from 'shelljs'
import { Markdown } from '../markdown'

export const Details = {
  type: identity<'deployLaravel'>('deployLaravel'),
  url: '/kubernetes-deploy-laravel-the-easy-way',
  seoTitle: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
  title: 'Kubernetes: deploy Laravel the easy way',
  shortDescription: `In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
  description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I'll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
  openGraphImage: Image({ url: 'src/deployLaravel/laravel_k8s.jpg', description: 'Deploy Laravel on Kubernetes' }),
  publishedDate: '2018-04-25',
  lastModifiedDate: '2018-09-10',
  previewImage: Image({ url: 'src/deployLaravel/laravel_k8s.jpg', description: 'Deploy Laravel the easy way' }),
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
  const { css, js, html } = Markdown(cat(`${__dirname}/content.md`).toString(), __dirname)
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
      lastUpdated={currentNode.payload.lastModifiedDate}
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
          You can use{' '}
          <a href={getFullUrl(website.children.blog.children.solarPlants)} className='link navy underline hover-sky'>
            Kubernetes to control IoT
          </a>{' '}
          devices such as Raspberry Pis and build your Internet of Things automated fleet.
        </RelatedContentItem>
        <RelatedContentItem>
          Learn how you can use virtual machines that can disappear at any time to{' '}
          <a href={getFullUrl(website.children.blog.children.solarPlants)} className='link navy underline hover-sky'>
            lower your infrastructure costs
          </a>
          .
        </RelatedContentItem>
      </RelatedConentContainer>

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
          paths: ['src/deployLaravel/anime.min.js', 'src/deployLaravel/isScrolledIntoView.js'],
        })}
      />
    </Article>,
  )
}
