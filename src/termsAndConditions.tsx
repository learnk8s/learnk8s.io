import React from 'react'
import marked from 'marked'
import { cat } from 'shelljs'
import { Navbar, Html, Head, OpenGraph, Body, Footer, Consultation } from './layout.v3'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getOpenGraph, getWorkshops } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'

const renderer = new marked.Renderer()

renderer.heading = (text: string) => {
  return `<h3>${text}</h3>`
}

export const TermsAndConditions = {
  id: 'termsAndConditions',
  url: '/terms-and-conditions',
  title: 'Terms and Conditions ⎈ Learnk8s',
  description: 'Terms and Conditions that applies to all services offered by Learnk8s',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(TermsAndConditions))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-terms-and-conditions',
      pageId: TermsAndConditions.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Terms and Conditions',
      description: 'Terms and Conditions that applies to all services offered by Learnk8s',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: TermsAndConditions.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === TermsAndConditions.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === TermsAndConditions.id)
  const courses = getWorkshops(state)
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
              <h1 className='f1 pl3 pl4-ns f-subheadline-l'>General terms and conditions</h1>
              <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns f3-l pb4'>Effective from 10 May 2018</h2>
            </div>
          </section>
        </div>

        <section className='bg-black-02 black-70 relative z-999 w-90-m w-70-l center pa3 pa4-ns mb3 mb5-ns lh-copy'>
          <div dangerouslySetInnerHTML={{ __html: marked(cat(`${__dirname}/t-and-cs.md`).toString(), { renderer }) }} />
        </section>
        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}
