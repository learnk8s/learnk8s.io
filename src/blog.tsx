import React from 'react'
import { LinkedNode, Page, Blog as B, getFullUrl, PageType, ArticlePage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, assets as layoutAssets} from './layout'
import {Image, Img} from './assets'
import moment = require('moment')

export const assets = {
  page: {},
  layout: layoutAssets
}

export const Blog: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<B>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout root={root} siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>

      <Navbar root={root} assets={assets.layout}/>

      <section className='ph5-l'>
        <div className='w-100'>
          <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Latest posts</h1>
        </div>
      </section>

    </div>

    <section className='ph3 measure-wide pv4 center'>
      <ul className='list pl0'>
        {(currentPage.children.slice(0)
          .filter(it => it.payload.type === PageType.ARTICLE) as LinkedNode<ArticlePage>[])
          .sort((a, b) => {
            return moment(a.payload.publishedDate).isBefore(b.payload.publishedDate) ? 1 : -1
          })
          .map(it => {
          return <li className='pv3'>
            <h2 className='mb0'><a href={getFullUrl(it)} className='link navy'>{it.payload.pageDetails.title}</a></h2>
            <p className='black-40 mt1'>{moment(it.payload.publishedDate).format('MMMM Do YYYY')}</p>
            <p className='lh-copy black-70'>{it.payload.pageDetails.description}</p>
          </li>
        })}
      </ul>
    </section>

    <Consultation />
    <Footer root={root} assets={assets.layout}/>
  </Layout>
}

export const Block: React.StatelessComponent<{image: Image, title: string, description: string}> = ({title, description, children, image}) => {
  return <li className='bg-white br2 relative pt4 w-100 mw6-m center-m w-30-l mv5'>
    <div className='w3 h3 bg-white br-100 shadow-1 absolute top--2 left-0 absolute-center'><Img image={image}/></div>
    <h2 className='navy normal tc'>{title}</h2>
    <p className='lh-copy black-70 ph4 measure-narrow'>{description}</p>
    <div className='tc bg-evian br2 br--bottom pv3'>{children}</div>
  </li>
}