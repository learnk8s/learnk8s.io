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
  type: identity<'whatIsK8s'>('whatIsK8s'),
  url: '/what-is-kubernetes',
  seoTitle: 'What is Kubernetes? ♦︎ Learnk8s',
  title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
  shortDescription: `The industry has experienced a shift towards developing smaller applications. But how does that impact the infrastructure? Don't end up paying the extra price in your cloud bill; learn how you can fix it with Kubernetes.`,
  description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
  openGraphImage: Image({ url: 'src/whatIsKubernetes/why-kube.png', description: 'Kubernetes bucks' }),
  publishedDate: '2018-09-04',
  previewImage: Image({
    url: 'src/whatIsKubernetes/why-kube.png',
    description: 'What is Kubernetes? Optimise your hosting costs and efficiency',
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
      {html}

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

      <Subscribe identifier='what-is-kube' />

      <JSScript
        js={JSBundle({
          scripts: js,
          paths: ['src/whatIsKubernetes/anime.min.js', 'src/whatIsKubernetes/isScrolledIntoView.js'],
        })}
      />
    </Article>,
  )
}
