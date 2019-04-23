import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'

export const Details = {
  type: 'solarPlants',
  url: '/kubernetes-on-solar-plants',
  seoTitle: 'Internet of Things on solar plants with Kubernetes ♦︎ Learnk8s',
  title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
  shortDescription: `When you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications? Enter Kubernetes.`,
  description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
  openGraphImage: <img src='src/solarPlants/solar_panel.png' alt='Solar panels and Kubernetes' />,
  publishedDate: '2018-12-04',
  previewImage: <img src='src/solarPlants/solar_panel.png' alt='Cloud infrastructure for the Internet of Things: Kubernetes on solar plants' />,
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
            Kubernetes Chaos Engineering: Lessons Learned — Part 1
          </a>{' '}
          what happens when things go wrong in Kubernetes? Can Kubernetes recover from failure and self-heal?
        </RelatedContentItem>
      </RelatedConentContainer>

      <Subscribe identifier='solar-plants' />
    </Article>,
  )
}
