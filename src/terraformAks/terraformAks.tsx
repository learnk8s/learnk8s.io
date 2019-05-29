import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import * as Markdown from '../remark.v2'
import { Subscribe } from '../layout.v2'

export const Details = {
  type: 'terraformAks',
  url: '/get-start-terraform-aks',
  seoTitle: 'Getting started with Terraform and Kubernetes on Azure AKS ♦︎ Learnk8s',
  title: 'Getting started with Terraform and Kubernetes on Azure AKS',
  description: ``,
  openGraphImage: (
    <img src='src/terraformAks/terraforming.jpg' alt='Getting started with Terraform and Kubernetes on Azure AKS' />
  ),
  publishedDate: '2019-05-07',
  previewImage: (
    <img src='src/terraformAks/terraforming.jpg' alt='Getting started with Terraform and Kubernetes on Azure AKS' />
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
      {Markdown.render(`${__dirname}/content.md`)}

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

      <Subscribe identifier='terraform-aks' />
    </Article>,
  )
}
