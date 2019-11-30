import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl, getBiteSizedSeries } from './sitemap'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Layout } from './layout.v2'
import marked from 'marked'
import moment = require('moment')
import { Navbar, Consultation, Footer } from './layout.v3'

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
  lastModifiedDate?: string
  previewImage: JSX.Element
  author: {
    fullName: string
    avatar: JSX.Element
    link: string
    shortDescription: string
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
      <Footer />
    </Layout>,
  )
}
