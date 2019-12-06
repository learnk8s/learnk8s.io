import * as React from 'react'
import marked from 'marked'
import moment = require('moment')
import { Navbar, Footer, Consultation, Html, Head, Body, OpenGraph } from './layout.v3'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getOpenGraph, getBlogPosts, hasTag } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { BlogPost, Page } from './store/websiteReducer'
import { VReference } from './files'

const inlineRenderer = new marked.Renderer()

inlineRenderer.paragraph = text => {
  return text
}
inlineRenderer.link = (href, title, text) => {
  const isLocal = !/^http/.test(href)
  const attributes = isLocal ? 'target="_self"' : 'target="_blank" rel="noreferrer"'
  return !!title
    ? `<a href="${href}" class="link dib white bg-blue br1 pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer">${text}</a>`
    : `<a href="${href}" class="link navy underline hover-sky" ${attributes}>${text}</a>`
}

export interface Details {
  type: string
  url: string
  seoTitle: string
  title: string
  description: string
  openGraphImage: JSX.Element
  publishedDate: string
  lastModifiedDate?: string
  previewImage: JSX.Element
  author: {
    fullName: string
    avatar: JSX.Element
    link: string
    shortDescription: string
  }
}

function identity<T>(value: T): T {
  return value
}

export const Details = {
  type: identity<'biteSizedSeries'>('biteSizedSeries'),
  url: '/bite-sized',
  seoTitle: 'Bite-sized Kubernetes learning ♦︎ Learnk8s',
  title: 'Bite-sized Kubernetes learning',
  description:
    'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
}

export const BiteSized = {
  id: '/bite-sized',
  url: '/bite-sized',
  title: 'Bite-sized Kubernetes learning ♦︎ Learnk8s',
  description:
    'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(BiteSized))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-bite-sized',
      pageId: BiteSized.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Bite-sized Kubernetes learning ♦︎ Learnk8s',
      description:
        'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: BiteSized.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const pages = getPages(state)
  const page = pages.find(it => it.id === BiteSized.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === BiteSized.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  const blogPosts = getBlogPosts(state)
    .filter(post => hasTag(state, 'bite-sized')(pages.find(it => it.id === post.pageId)!))
    .sort(comparePublishedDate)
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
              <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Latest posts</h1>
            </div>
          </section>
        </div>

        <section className='ph3 measure-wide pv4 center'>
          <ul className='list pl0'>
            {blogPosts.map(post => {
              let postPage: Page = pages.find(it => it.id === post.pageId)!
              let url: string = postPage ? postPage.url : '#'
              return (
                <li className='pv3'>
                  <h2 className='mb0'>
                    <a href={url} className='link navy'>
                      {post.title}
                    </a>
                  </h2>
                  <p className='black-40 mt1'>{moment(post.publishedDate).format('MMMM Do YYYY')}</p>
                  <p className='lh-copy black-70'>{post.description}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}

function comparePublishedDate(
  postA: BlogPost & { content?: VReference<string> | undefined },
  postB: BlogPost & { content?: VReference<string> | undefined },
) {
  return postA.publishedDate < postB.publishedDate ? 1 : postA.publishedDate > postB.publishedDate ? -1 : 0
}
