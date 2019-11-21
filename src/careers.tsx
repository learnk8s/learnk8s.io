import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Layout } from './layout.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar, Footer, Consultation, Html, Head, Body, OpenGraph } from './layout.v3'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getOpenGraph } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'

export const Details = {
  type: 'careers',
  url: '/careers',
  seoTitle: 'Team ♦︎ Learnk8s',
  title: 'Careers',
  description: 'Join Learnk8s and help others learn Docker and Kubernetes.',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

export const Career = {
  id: 'careers',
  url: '/careers',
  title: 'Careers ♦︎ Learnk8s',
  description: 'Join Learnk8s and help others learn Docker and Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Career))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-career',
      pageId: Career.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Careers',
      description: 'Join Learnk8s and help others learn Docker and Kubernetes.',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Career.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Career.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Career.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  return (
    <Html>
      <Head title={page.title} description={page.description}>
        {openGraph ? (
          <OpenGraph
            title={openGraph.title}
            description={openGraph.description}
            image={openGraph.image}
            currentAbsoluteUrl={currentAbsoluteUrl}
          />
        ) : null}
        <link rel='stylesheet' href='node_modules/tachyons/css/tachyons.css' />
        <link rel='stylesheet' href='assets/style.css' />
      </Head>
      <Body>
        <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
          <Navbar />

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
            <li>You use CI/CD on a daily basis and can't imagine a world without it</li>
          </ul>
          <h3 className='navy'>Arrangement & renumeration</h3>
          <p>This is an ongoing REMOTE engagement on a freelance basis. Please get in touch to discuss your rate.</p>
          <h3 className='navy'>How to apply</h3>
          <p>
            Write a deployment for Kubernetes. You can find the details on how to complete the challenge at the
            following link:{' '}
            <a href='https://github.com/learnk8s/kubernetes-challenge' className='link navy underline'>
              https://github.com/learnk8s/kubernetes-challenge
            </a>
            .
          </p>
          <p>
            Once you solved the challenge, please send us a link with your repository and a link to your Linkedin
            profile at{' '}
            <a href='mailto:careers@learnk8s.io' className='link navy underline'>
              careers@learnk8s.io
            </a>
            .
          </p>
          <a href='mailto:careers@learnk8s.io' className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3'>
            Apply now &#8594;
          </a>
        </section>
        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}
