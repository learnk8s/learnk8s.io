import React from 'react'
import { LinkedNode, getFullUrl, Sitemap, getAbsoluteUrl, getBlogPosts } from './sitemap'
import { Navbar, Consultation, Footer, Layout } from './layout'
import { Image, Img, CSSBundle } from './assets'
import moment = require('moment')
import * as Redirect from './redirect'
import { renderToStaticMarkup } from 'react-dom/server'

function identity<T>(value: T): T {
  return value
}

export const Details = {
  type: identity<'blog'>('blog'),
  url: '/blog',
  seoTitle: 'Blog ♦︎ Learnk8s',
  title: 'Blog',
  description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
  openGraphImage: Image({ url: 'assets/open_graph_preview.png', description: 'Learnk8s preview' }),
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
      cssBundle={CSSBundle({
        paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
      })}
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

export const Block: React.StatelessComponent<{ image: Image; title: string; description: string }> = ({
  title,
  description,
  children,
  image,
}) => {
  return (
    <li className='bg-white br2 relative pt4 w-100 mw6-m center-m w-30-l mv5'>
      <div className='w3 h3 bg-white br-100 shadow-1 absolute top--2 left-0 absolute-center'>
        <Img image={image} />
      </div>
      <h2 className='navy normal tc'>{title}</h2>
      <p className='lh-copy black-70 ph4 measure-narrow'>{description}</p>
      <div className='tc bg-evian br2 br--bottom pv3'>{children}</div>
    </li>
  )
}
