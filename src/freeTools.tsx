import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { join } from 'path'
import { getOpenGraph, getPages, getConfig, State, Actions, Action, StoreV2, ActionV2 } from './store'
import { defaultAssetsPipeline } from './optimise'
import { Store } from 'redux'
import { tachyons } from './tachyons/tachyons'
import { PrimaryButton } from './homepage'

export const FreeTools = {
  id: 'free-tools',
  url: '/kubernetes-free-tools',
  title: 'Kubernetes tools ⎈ Learnk8s',
  description: 'A collection of free tools to help you navigate your Kubernetes journey.',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(FreeTools))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-free-tools',
      pageId: FreeTools.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Kubernetes tools',
      description: 'A collection of free tools to help you navigate your Kubernetes journey.',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: FreeTools.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const pages = getPages(state)
  const page = pages.find(it => it.id === FreeTools.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === FreeTools.id)
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
        <Navbar />

        <section className='ph3 pv4 center'>
          <h1 className='f2 f1-ns navy b tc ph3'>Kubernetes tools</h1>
          <p className='lh-copy f4 black-70 measure center tc ph3'>
            A collection of free tools to help you navigate your Kubernetes journey.
          </p>

          <ul className='pl0 list pt4'>
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  <img
                    src='assets/free-tools/checklist.svg'
                    alt='Kubernetes production best practices'
                    className='aspect-ratio--object'
                  />
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h2 className='f3 b navy lh-solid'>Kubernetes production best practices</h2>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A curated checklist of best practices designed to help you release to production
                  </p>
                  <PrimaryButton href='/production-best-practices' text='Get started &#8594;' />
                </div>
              </div>
            </li>

            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center bg-evian ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/free-tools/troubleshooting.svg',
                    alt: 'Troubleshooting deployments in Kubernetes',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h2 className='f3 b navy lh-solid'>Troubleshooting flowchart (PDF)</h2>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A handy diagram to help you debug your deployments in Kubernetes. No more surprises when you see a{' '}
                    <span className='i'>CrashLoopBackOff</span> error message.
                  </p>
                  <PrimaryButton href='/troubleshooting-deployments' text='Download &#8594;' />
                </div>
              </div>
            </li>

            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/free-tools/wallpaper-magician.svg',
                    alt: 'Kubernetes wallpapers',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h2 className='f3 b navy lh-solid'>Kubernetes wallpapers</h2>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A collection of free Kubernetes wallpapers for your computer.
                  </p>
                  <PrimaryButton href='/kubernetes-wallpapers' text='Download &#8594;' />
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className='pt1 pb4 bg-evian ph3'>
          <p className='f2 navy b tc mb2 pt3-ns pt3'>Keep it going!</p>
          <p className='lh-copy f4 black-70 measure center tc'>
            If you enjoy discussing the latest news on Kubernetes and sharing your learnings, you might want to join the
            Learnk8s Telegram group. You can{' '}
            <a href='https://t.me/learnk8s' className='link navy underline'>
              join us using this link
            </a>
            .
          </p>
        </section>

        <Footer />
      </Body>
    </Html>
  )
}
