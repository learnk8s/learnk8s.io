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
  type: identity<'terraformAks'>('terraformAks'),
  url: '/get-start-terraform-aks',
  seoTitle: 'Getting started with Terraform and Kubernetes on Azure AKS ♦︎ Learnk8s',
  title: 'Getting started with Terraform and Kubernetes on Azure AKS',
  description: ``,
  openGraphImage: Image({
    url: 'src/terraformAks/terraforming.png',
    description: 'Getting started with Terraform and Kubernetes on Azure AKS',
  }),
  publishedDate: '2019-03-30',
  previewImage: Image({
    url: 'src/terraformAks/terraforming.png',
    description: 'Getting started with Terraform and Kubernetes on Azure AKS',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://linkedin.com/in/danielepolencic',
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
      description={currentNode.payload.description}
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
            href={getFullUrl(website.children.blog.children.smallerDockerImage)}
            className='link navy underline hover-sky'
          >
            3 simple tricks for smaller Docker images.
          </a>{' '}
          Docker images don't have to be large. Learn how to put your Docker images on a diet!
        </RelatedContentItem>
      </RelatedConentContainer>

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
          paths: ['src/whatIsKubernetes/anime.min.js', 'src/whatIsKubernetes/isScrolledIntoView.js'],
        })}
      />
    </Article>,
  )
}
