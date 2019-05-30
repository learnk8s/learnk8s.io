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
  type: identity<'kubeflowTutorial'>('kubeflowTutorial'),
  url: '/recognising-handwritten-digits-kubernetes-tensorflow',
  seoTitle: 'Recognising handwritten digits with Kubernetes, Tensorflow ♦︎ Learnk8s',
  title: 'Recognising handwritten digits with Kubernetes and Tensorflow',
  shortDescription: ``,
  description: ``,
  openGraphImage: Image({
    url: 'src/kubeflowTutorial/digits.png',
    description: 'Machine learning with Kubeflow, Tensorflow, Kubernetes',
  }),
  publishedDate: '2019-03-15',
  previewImage: Image({
    url: 'src/kubeflowTutorial/digits.png',
    description: 'Machine learning with Kubeflow, Tensorflow, Kubernetes',
  }),
  author: {
    fullName: 'Salman Iqbal',
    avatar: Image({ url: 'assets/authors/salman_iqbal.jpg', description: 'Salman Iqbal' }),
    link: 'https://twitter.com/soulmaniqbal',
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
      publishedDate={currentNode.payload.publishedDate}
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
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <RelatedConentContainer>
        <RelatedContentItem>
          <a
            href={getFullUrl(website.children.blog.children.whatIsKubernetes)}
            className='link navy underline hover-sky'
          >
            What is Kubernetes? Optimise your hosting costs and efficiency
          </a>{' '}
          and learn how Kubernetes works and why it was invented in the first place.
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

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
        })}
      />
    </Article>,
  )
}
