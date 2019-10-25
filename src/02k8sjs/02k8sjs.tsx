import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import * as Markdown from '../remark.v2'
import { Subscribe } from '../layout.v2'

export const Details = {
  type: '02k8sjs',
  url: '/nodejs-kubernetes-guide',
  seoTitle: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
  title: 'Hands-on guide: developing and deploying Node.js apps in Kubernetes',
  description: `Learning how to design and architect applications that leverage Kubernetes is the most valuable skill that you could learn to be successful in deploying and scaling your traffic to millions of requests and beyond.`,
  openGraphImage: (
    <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
  ),
  publishedDate: '2019-10-31',
  previewImage: (
    <img src='src/02k8sjs/jury.jpg' alt='Hands-on guide: developing and deploying Node.js apps in Kubernetes' />
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
      <p className='lh-copy measure-wide f4'>
        The last two chapter are available for free (and you can also download the full course as a PDF).
      </p>
      <p className='lh-copy measure-wide f4'>Enter your email address to access the last two chapters of the guide:</p>
      <form action='https://academy.learnk8s.io/access' method='POST' className='pt1 pb4'>
        <ol className='list pl0'>
          <li className='mv4'>
            <label htmlFor='email' className='f5 db tl ttu pb2 fw6 navy'>
              Your email address
            </label>
            <input
              className='f4 pa3 w-60-l w-100 br3 input-reset ba b--silver bw1'
              type='email'
              required={true}
              name='email'
              id='email'
              placeholder='Your email address'
            />
          </li>
          <li>
            <input type='hidden' name='language' id='nodejs' value='nodejs' />
          </li>
        </ol>
        <button className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv2' type='submit'>
          Get access ⇢
        </button>
      </form>
      <RelatedConentContainer>
        <RelatedContentItem>
          <a href={getFullUrl(website.children.bskAutoscaling)} className='link navy underline hover-sky'>
            How to autoscale apps on Kubernetes with custom metrics
          </a>{' '}
          Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod
          Autoscaler. In this article, you will learn how to use it.
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

      <Subscribe identifier='02k8sjs' />
    </Article>,
  )
}
