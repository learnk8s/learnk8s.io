import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { Subscribe } from '../layout.v2'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'smaller_images',
  url: '/smaller-docker-images',
  seoTitle: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
  title: '3 simple tricks for smaller Docker images',
  shortDescription: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control?`,
  description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
  openGraphImage: <img src='src/smallerDockerImages/smaller_images.png' alt='Docker whale' />,
  publishedDate: '2018-02-12',
  lastModifiedDate: '2019-04-14',
  previewImage: (
    <img src='src/smallerDockerImages/smaller_images.png' alt='3 simple tricks for smaller Docker images' />
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
      description={currentNode.payload.shortDescription}
      openGraphImage={currentNode.payload.openGraphImage}
      absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
      authorFullName={currentNode.payload.author.fullName}
      authorAvatar={currentNode.payload.author.avatar}
      authorLink={currentNode.payload.author.link}
      publishedDate={currentNode.payload.publishedDate}
      lastUpdated={currentNode.payload.lastModifiedDate}
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
      {Remark.render(`${__dirname}/content.md`)}

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

      <Subscribe identifier='smaller-images-docker' />
    </Article>,
  )
}
