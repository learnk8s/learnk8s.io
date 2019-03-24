import { Image, CSSBundle, JSBundle, JSScript } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, Markdown, RelatedConentContainer, RelatedContentItem } from '../article'
import { renderToStaticMarkup } from 'react-dom/server'
import { cat } from 'shelljs'
import { ListItem, PromoAcademy } from '../layout'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

export const Details = {
  type: identity<'smaller_images'>('smaller_images'),
  url: '/smaller-docker-images',
  seoTitle: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
  title: '3 simple tricks for smaller Docker images',
  shortDescription: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control?`,
  description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
  openGraphImage: Image({ url: 'src/smallerDockerImages/smaller_images.png', description: 'Docker whale' }),
  publishedDate: '2018-02-12',
  previewImage: Image({
    url: 'src/smallerDockerImages/smaller_images.png',
    description: '3 simple tricks for smaller Docker images',
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
  const { css, js, html } = Markdown(cat('src/smallerDockerImages/content.md').toString(), __dirname)
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
            className='link navy underline hover-sky'
            href={getFullUrl(website.children.blog.children.installingK8sOnWindows)}
          >
            {website.children.blog.children.installingK8sOnWindows.payload.title}
          </a>
        </RelatedContentItem>
        <RelatedContentItem>
          <a
            className='link navy underline hover-sky'
            href={getFullUrl(website.children.blog.children.chaosEngineering)}
          >
            {website.children.blog.children.chaosEngineering.payload.title}
          </a>
        </RelatedContentItem>
      </RelatedConentContainer>

      <PromoAcademy sitemap={website} />

      <JSScript
        js={JSBundle({
          scripts: js,
          paths: ['src/smallerDockerImages/anime.min.js', 'src/smallerDockerImages/isScrolledIntoView.js'],
        })}
      />
    </Article>,
  )
}
