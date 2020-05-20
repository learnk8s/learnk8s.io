import React from 'react'
import marked from 'marked'
import { cat } from 'shelljs'
import { Navbar, Html, Head, OpenGraph, Body, Footer, Consultation } from './layout.v3'
import { State, Action, getConfig, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { tachyons } from './tachyons/tachyons'

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

export function Register(store: Store) {
  store.dispatch(Action.pages.add(TermsAndConditions))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-terms-and-conditions',
      pageId: TermsAndConditions.id,
      image: 'assets/open_graph_preview.png',
      title: 'Terms and Conditions',
      description: 'Terms and Conditions that applies to all services offered by Learnk8s',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
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
  const page = Selector.pages.selectAll(state).find(it => it.id === TermsAndConditions.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === TermsAndConditions.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
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
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        <link rel='canonical' href={currentAbsoluteUrl} />
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

        <section className='bg-black-025 black-70 relative z-999 w-90-m w-70-l center pa3 pa4-ns mb3 mb5-ns lh-copy'>
          <div dangerouslySetInnerHTML={{ __html: marked(cat(`${__dirname}/t-and-cs.md`).toString(), { renderer }) }} />
        </section>
        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}
