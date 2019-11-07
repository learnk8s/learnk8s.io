import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl, getBiteSizedSeries } from './sitemap'
import * as React from 'react'
import { Article } from './article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Layout, Consultation, Footer, Subscribe } from './layout.v2'
import * as Remark from './remark.v2'
import marked from 'marked'
import moment = require('moment')
import { Navbar } from './layout.v3'

const inlineRenderer = new marked.Renderer()

inlineRenderer.paragraph = text => {
  return text
}
inlineRenderer.link = (href, title, text) => {
  const isLocal = !/^http/.test(href)
  const attributes = isLocal ? 'target="_self"' : 'target="_blank" rel="noreferrer"'
  return !!title
    ? `<a href="${href}" class="link dib white bg-blue br1 pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer">${text}</a>`
    : `<a href="${href}" class="link navy underline hover-sky" ${attributes}>${text}</a>`
}

export interface Details {
  type: string
  url: string
  seoTitle: string
  title: string
  description: string
  openGraphImage: JSX.Element
  publishedDate: string
  previewImage: JSX.Element
  author: {
    fullName: string
    avatar: JSX.Element
    link: string
    shortDescription: string
  }
}

export function BiteSizedRender(markdownPath: string, extra?: (website: Sitemap) => JSX.Element) {
  return function render(website: Sitemap, currentNode: LinkedNode<Details>, siteUrl: string): string {
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
        <p className='lh-copy measure-wide f4'>
          <strong className='b'>Welcome to Bite-sized Kubernetes learning</strong> — a regular column on the most
          interesting questions that we see online and during our workshops answered by a Kubernetes expert.
        </p>
        <blockquote className='pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4'>
          <p className='lh-copy measure-wide f4'>
            Today's answers are curated by{' '}
            <a
              href={currentNode.payload.author.link}
              className='link navy underline hover-sky'
              target='_blank'
              rel='noreferrer'
            >
              {currentNode.payload.author.fullName}
            </a>
            .{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: marked(currentNode.payload.author.shortDescription, { renderer: inlineRenderer }),
              }}
            />
          </p>
        </blockquote>
        <p className='lh-copy measure-wide f4'>
          <em className='i'>
            If you wish to have your question featured on the next episode,{' '}
            <a href='mailto:hello@learnk8s.io' className='link navy underline hover-sky' target='_self'>
              please get in touch via email
            </a>{' '}
            or{' '}
            <a
              href='https://twitter.com/learnk8s'
              className='link navy underline hover-sky'
              target='_blank'
              rel='noreferrer'
            >
              you can tweet us at @learnk8s
            </a>
            .
          </em>
        </p>
        <p className='lh-copy measure-wide f4'>
          Did you miss the previous episodes?{' '}
          <a href={getFullUrl(website.children.biteSizedKubernetes)} className='link navy underline hover-sky'>
            You can find them here.
          </a>
        </p>
        {Remark.render(markdownPath)}
        {extra ? extra(website) : <Subscribe identifier={currentNode.payload.title.replace(/[^\w]+/g, '-')} />}
      </Article>,
    )
  }
}

function identity<T>(value: T): T {
  return value
}

export const Details = {
  type: identity<'biteSizedSeries'>('biteSizedSeries'),
  url: '/bite-sized',
  seoTitle: 'Bite-sized Kubernetes learning ♦︎ Learnk8s',
  title: 'Bite-sized Kubernetes learning',
  description:
    'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Layout
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
      openGraphImage={currentNode.payload.openGraphImage}
      absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
    >
      <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
        <Navbar />

        <section className='ph5-l'>
          <div className='w-100'>
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Latest posts</h1>
          </div>
        </section>
      </div>

      <section className='ph3 measure-wide pv4 center'>
        <ul className='list pl0'>
          {getBiteSizedSeries(website).map(it => {
            return (
              <li className='pv3'>
                <h2 className='mb0'>
                  <a href={getFullUrl(it)} className='link navy'>
                    {it.payload.title}
                  </a>
                </h2>
                <p className='black-40 mt1'>{moment(it.payload.publishedDate).format('MMMM Do YYYY')}</p>
                <p className='lh-copy black-70'>{it.payload.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <Consultation />
      <Footer root={website} />
    </Layout>,
  )
}

export const Block: React.StatelessComponent<{ image: JSX.Element; title: string; description: string }> = ({
  title,
  description,
  children,
  image,
}) => {
  return (
    <li className='bg-white br2 relative pt4 w-100 mw6-m center-m w-30-l mv5'>
      <div className='w3 h3 bg-white br-100 shadow-1 absolute top--2 left-0 absolute-center'>{image}</div>
      <h2 className='navy normal tc'>{title}</h2>
      <p className='lh-copy black-70 ph4 measure-narrow'>{description}</p>
      <div className='tc bg-evian br2 br--bottom pv3'>{children}</div>
    </li>
  )
}
