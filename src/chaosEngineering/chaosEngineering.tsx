import { Image, CSSBundle, JSScript, JSBundle } from '../assets'
import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import { h } from '../h'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article'
import unified from 'unified'
const stringify = require('rehype-stringify')
import { BlogPosting, WithContext } from 'schema-dts'
import { Subscribe } from '../layout'
import * as Remark from '../remark'

export const Details = {
  type: identity<'chaosEngineering'>('chaosEngineering'),
  url: '/kubernetes-chaos-engineering-lessons-learned',
  seoTitle: 'Kubernetes Chaos Engineering: Lessons Learned ♦︎ Learnk8s',
  title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
  shortDescription: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?`,
  description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
  openGraphImage: Image({
    url: 'src/chaosEngineering/chaos-engineering-kubernetes.png',
    description: 'Chaos engineering',
  }),
  publishedDate: '2018-05-15',
  lastModifiedDate: '2019-04-15',
  previewImage: Image({
    url: 'src/chaosEngineering/chaos-engineering-kubernetes.png',
    description: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
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
  return unified()
    .use(stringify)
    .stringify(
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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              identity<WithContext<BlogPosting>>({
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
                    url: `${siteUrl}${
                      Image({ url: 'assets/learnk8s_logo_square.png', description: 'Learnk8s logo' }).url
                    }`,
                  },
                },
                url: getAbsoluteUrl(currentNode, siteUrl),
                datePublished: currentNode.payload.publishedDate,
                dateModified: currentNode.payload.lastModifiedDate,
                description: currentNode.payload.description,
                mainEntityOfPage: {
                  '@type': 'SoftwareSourceCode',
                },
              }),
            ),
          }}
        />
        {html}

        <RelatedConentContainer>
          <RelatedContentItem>
            <a
              href={getFullUrl(website.children.blog.children.smallerDockerImage)}
              className='link navy underline hover-sky'
            >
              3 simple tricks for smaller Docker images
            </a>{' '}
            and learn how to build and deploy Docker images quicker.
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

        <Subscribe identifier='chaos-engineering' />

        <JSScript
          js={JSBundle({
            scripts: js,
            paths: ['src/chaosEngineering/anime.min.js', 'src/chaosEngineering/isScrolledIntoView.js'],
          })}
        />
      </Article>,
    )
}
