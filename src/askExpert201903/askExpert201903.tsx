import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl } from '../sitemap'
import * as React from 'react'
import { Article } from '../article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { PromoAcademy } from '../layout'
import { Markdown } from '../markdown'

export const Details = {
  type: identity<'askExpert201903'>('askExpert201903'),
  url: '/ask-kubernetes-expert-march-2019',
  seoTitle: 'Ask the expert: Kubernetes top questions March 2019 ♦︎ Learnk8s',
  title: 'Ask the expert: Kubernetes top questions in March 2019',
  description: `The top Kubernetes questions in March 2019 answered by Daniele Polencic`,
  openGraphImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({ url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic' }),
    link: 'https://twitter.com/danielepolencic',
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const { css, js, html } = Markdown(cat('src/askExpert201903/content.md').toString(), __dirname)
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

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
        })}
      />
    </Article>,
  )
}
