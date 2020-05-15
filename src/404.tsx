import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getOpenGraph, StoreV2, ActionV2 } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { tachyons } from './tachyons/tachyons'

export const NotFound404 = {
  id: 'not-found-404',
  url: '/404',
  title: 'Oops! Not found',
  description: `The page you that tried to visit does not exist. If you think this is mistake, please get in touch.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(NotFound404))
  storeV2.dispatch(
    ActionV2.tags.add({ id: NotFound404.id + '-skip-sitemap', tag: 'skip-sitemap', pageId: NotFound404.id }),
  )
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-not-found-404',
      pageId: NotFound404.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: NotFound404.title,
      description: NotFound404.description,
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: NotFound404.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === NotFound404.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === NotFound404.id)
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
      </Head>
      <Body>
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

        <Footer />
      </Body>
    </Html>
  )
}
