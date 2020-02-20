import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer, Consultation } from './layout.v3'
import { join } from 'path'
import { getOpenGraph, getPages, getConfig, State, Actions, Action, getBlogPosts, hasTag } from './store'
import { defaultAssetsPipeline } from './optimise'
import { Store } from 'redux'
import { tachyons } from './tachyons/tachyons'

export const FreeTools = {
  id: 'free-tools',
  url: '/free-tools',
  title: 'Free Tools ⎈ Learnk8s',
  description: 'Best Practices, Download Desktop Wallpaper, Flowchart Pdf',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(FreeTools))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-free-tools',
      pageId: FreeTools.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Free Tools',
      description: 'Best Practices, Download Desktop Wallpaper, Flowchart Pdf',
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
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        <link rel='canonical' href={currentAbsoluteUrl} />
      </Head>

      <Body>
        <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
          <Navbar />

          <section className='ph5-l'>
            <div className='w-100'>
              <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Free Tools</h1>
            </div>
          </section>
        </div>

        <section className='ph3 pv4 center'>
          <ul className='flex flex-wrap items-start list pl0 bt bw2 b--near-white pt4'>
            <UrlBlock
              title='Kubernetes production best practices'
              img={<img src='src/best-practices/checklist.jpg' alt='Kubernetes production best practices' />}
              url='/production-best-practices'
              className='w-third-l w-100'
            >
              <p className='lh-copy masure f5'>
                This document highlights and consolidates best practices for building, deploying and scaling apps on
                Kubernetes in production.
              </p>
            </UrlBlock>
            <UrlBlock
              title='Desktop Wallpaper'
              img={<img src='src/wallpaper/assets/chokolates-01.png' alt='Desktop Wallpaper' />}
              url='/wallpaper'
              className='w-third-l w-100'
            >
              <p className='lh-copy masure f5'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, facilis.
              </p>
            </UrlBlock>
            <UrlBlock
              title='Flowchart PDF'
              img={<img src='src/flowchartPdf/assets/flowchart.png' alt='Flowchart PDF' />}
              url='/flowchart-pdf'
              className='w-third-l w-100'
            >
              <p className='lh-copy masure f5'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, facilis.
              </p>
            </UrlBlock>
          </ul>
        </section>

        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}

const UrlBlock: React.StatelessComponent<{
  className?: string
  img: JSX.Element
  title: string
  url: string
}> = ({ children, className, img, title, url }) => {
  return (
    <li className={`${className || ''}`}>
      <a href={url} className='black link underline-hover'>
        <div className='br2 br--top shadow-4 ma3'>
          <div className='aspect-ratio aspect-ratio--7x5 relative'>
            {React.createElement('img', {
              src: img.props.src,
              alt: img.props.alt,
              loading: 'lazy',
              className: 'aspect-ratio--object br2 br--top z-1',
            })}
          </div>
          <div className='ph3 pb4'>
            <h3 className='f3 lh-solid mt3'>{title}</h3>
            {children}
          </div>
        </div>
      </a>
    </li>
  )
}
