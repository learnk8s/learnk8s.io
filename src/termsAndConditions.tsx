import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Consultation, Footer, Layout } from './layout'
import marked from 'marked'
import { cat } from 'shelljs'
import { Image } from './assets'
import { renderToStaticMarkup } from 'react-dom/server'

const renderer = new marked.Renderer()

renderer.heading = (text: string) => {
  return `<h3>${text}</h3>`
}

export const Details = {
  type: identity<'termsAndConditions'>('termsAndConditions'),
  url: '/terms-and-conditions',
  seoTitle: 'Terms and Conditions ♦︎ Learnk8s',
  title: 'Terms and Conditions',
  description: 'Terms and Conditions.',
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
    absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}>
    <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>

      <Navbar root={website} />

      <section className='ph5-l'>
        <div className='w-100'>
          <h1 className='f1 pl3 pl4-ns f-subheadline-l'>General terms and conditions</h1>
          <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>Effective from 10 May 2018</h2>
        </div>
      </section>

    </div>

    <section className='bg-black-02 black-70 relative z-999 w-90-m w-70-l center pa3 pa4-ns mb3 mb5-ns lh-copy'>
      <div dangerouslySetInnerHTML={{__html: marked(cat(`${__dirname}/t-and-cs.md`).toString(), {renderer})}}></div>
    </section>

    <Consultation />
    <Footer root={website} />
  </Layout>)
}