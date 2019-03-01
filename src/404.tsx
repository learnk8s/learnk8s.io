import React from 'react'
import { LinkedNode, Page, NotFoundPage } from './sitemap'
import { Navbar, Footer, Layout, assets as layoutAssets} from './layout'

export const assets = {
  page: {},
  layout: layoutAssets,
}

export const NotFound: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<NotFoundPage>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout root={root} siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>

      <Navbar root={root} assets={assets.layout}/>

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

    <Footer root={root} assets={assets.layout}/>
  </Layout>
}