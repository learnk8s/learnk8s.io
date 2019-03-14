import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Footer, Layout} from './layout'
import { Image, CSSBundle } from './assets'
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: identity<'notFound'>('notFound'),
  url: '/404',
  seoTitle: 'Oops! Not found',
  title: 'Not Found',
  description: 'We are sorry but he page you tried to visit does not exist',
  openGraphImage: Image({url: 'assets/open_graph_preview.png', description: 'Learnk8s preview'}),
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(<Layout
    website={website}
    seoTitle={currentNode.payload.seoTitle}
    title={currentNode.payload.title}
    description={currentNode.payload.description}
    openGraphImage={currentNode.payload.openGraphImage}
    absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
    cssBundle={CSSBundle({
      paths: [
        'node_modules/tachyons/css/tachyons.css',
        'assets/style.css',
      ],
    })}>

    <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>

      <Navbar root={website} />

      <section className='ph5-l'>
        <div className='w-100'>
          <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Oops!</h1>
          <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>Something went wrong!</h2>
        </div>
      </section>

    </div>

    <section className='ph3 measure-wide pv4 center'>
      <h3 className='f3 f2-l navy'>Are we missing something?</h3>
      <p className='lh-copy black-70'>Please get in touch <a href='mailto:hello@learnk8s.io' className='link navy underline'>hello@learnk8s.io</a>.</p>
    </section>

    <Footer root={website} />
  </Layout>)
}