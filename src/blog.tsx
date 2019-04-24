import React from 'react'
import { LinkedNode, getFullUrl, Sitemap, getAbsoluteUrl, getBlogPosts } from './sitemap'
import { Navbar, Consultation, Footer, Layout } from './layout.v2'
import moment = require('moment')
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: 'blog',
  url: '/blog',
  seoTitle: 'Blog ♦︎ Learnk8s',
  title: 'Blog',
  description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

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
        <Navbar root={website} />

        <section className='ph5-l'>
          <div className='w-100'>
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Latest posts</h1>
          </div>
        </section>
      </div>

      <section className='ph3 measure-wide pv4 center'>
        <ul className='list pl0'>
          {getBlogPosts(website).map(it => {
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
