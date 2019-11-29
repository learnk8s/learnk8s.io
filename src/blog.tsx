import React from 'react'
import moment = require('moment')
import { Consultation } from './layout.v2'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { join } from 'path'
import { getOpenGraph, getPages, getConfig, State, Actions, Action, getBlogPosts, hasTag } from './store'
import { defaultAssetsPipeline } from './optimise'
import { Store } from 'redux'
import { BlogPost } from './store/websiteReducer'
import { VReference } from './files'

export const Details = {
  type: 'blog',
  url: '/blog',
  seoTitle: 'Blog ♦︎ Learnk8s',
  title: 'Blog',
  description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

export const Blog = {
  id: 'blog',
  url: '/blog',
  title: 'Blog ♦︎ Learnk8s',
  description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Blog))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-blog',
      pageId: Blog.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'blog',
      description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Blog.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Blog.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Blog.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  const blogPosts = getBlogPosts(state).sort(comparePublishedDate)
  const allPages = state.website.pages
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
            {blogPosts.map(it => {
              return (
                <li className='pv3'>
                  <h2 className='mb0'>
                    <a href={allPages[it.pageId].url} className='link navy'>
                      {it.title}
                    </a>
                  </h2>
                  <p className='black-40 mt1'>{moment(it.publishedDate).format('MMMM Do YYYY')}</p>
                  <p className='lh-copy black-70'>{it.description}</p>
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
