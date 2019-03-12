import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Consultation, Footer, Layout } from './layout'
import {Image} from './assets'
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: identity<'careers'>('careers'),
  url: '/careers',
  seoTitle: 'Team ♦︎ Learnk8s',
  title: 'Careers',
  description: 'Help others learn Kubernetes.',
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
          <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Careers</h1>
          <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>Help others learn Kubernetes.</h2>
        </div>
      </section>

    </div>

    <section className='bg-black-02 black-70 relative z-999 w-90-m w-70-l center pa3 pa4-ns mb3 mb5-ns lh-copy'>
      <h2 className='navy'>Freelance Kubernetes engineer - REMOTE</h2>
      <p>learnk8s is looking for a talented engineer on a freelance basis to help:</p>
      <ul className=''>
        <li>create automation scripts for Kubernetes based applications</li>
        <li>authoring and designing training material for educational content</li>
      </ul>
      <h3 className='navy'>About you</h3>
      <ul className=''>
        <li>You are a talented engineer</li>
        <li>You are experienced in Docker</li>
        <li>You can clearly articulate how to architect applications to best leverage microservices</li>
        <li>You deployed and scaled applications on Kubernetes</li>
        <li>You're patient and understand the value in pair programming and knowledge sharing</li>
        <li>You fluent in either Java, Scala, Python or Node.js</li>
        <li>You use CI/CD on a daily basis and can’t imagine a world without it</li>
      </ul>
      <h3 className='navy'>Arrangement & renumeration</h3>
      <p>This is an ongoing REMOTE engagement on a freelance basis. Please get in touch to discuss your rate.</p>
      <h3 className='navy'>How to apply</h3>
      <p>Write a deployment for Kubernetes. You can find the details on how to complete the challenge at the following link: <a href='https://github.com/learnk8s/kubernetes-challenge' className='link navy underline'>https://github.com/learnk8s/kubernetes-challenge</a>.</p>
      <p>Once you solved the challenge, please send us a link with your repository and a link to your Linkedin profile at <a href='mailto:careers@learnk8s.io' className='link navy underline'>careers@learnk8s.io</a>.</p>
      <a href='mailto:careers@learnk8s.io' className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3'>Apply now &#8594;</a>
    </section>

    <Consultation />
    <Footer root={website} />
  </Layout>)
}