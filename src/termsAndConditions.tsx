import React from 'react'
import { LinkedNode, Page, TAndCsPage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, assets as layoutAssets} from './layout'
import marked from 'marked'
import { cat } from 'shelljs'

const renderer = new marked.Renderer()

renderer.heading = (text: string) => {
  return `<h3>${text}</h3>`
}

export const assets = {
  page: {},
  layout: layoutAssets,
}

export const TermsAndConditions: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<TAndCsPage>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>

      <Navbar root={root} assets={assets.layout}/>

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
    <Footer root={root} assets={assets.layout}/>
  </Layout>
}