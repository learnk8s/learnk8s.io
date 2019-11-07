import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Footer, Layout } from './layout.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar } from './layout.v3'

export const Details = {
  type: 'notFound' as const,
  url: '/404',
  seoTitle: 'Oops! Not found',
  title: 'Not Found',
  description: 'We are sorry but he page you tried to visit does not exist',
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
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Oops!</h1>
            <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>Something went wrong!</h2>
          </div>
        </section>
      </div>

      <section className='ph3 measure-wide pv4 center'>
        <h3 className='f3 f2-l navy'>Are we missing something?</h3>
        <p className='lh-copy black-70'>
          Please get in touch{' '}
          <a href='mailto:hello@learnk8s.io' className='link navy underline'>
            hello@learnk8s.io
          </a>
          .
        </p>
      </section>

      <Footer root={website} />
    </Layout>,
  )
}
