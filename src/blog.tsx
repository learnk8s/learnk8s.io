import React from 'react'
import moment = require('moment')
import { Navbar, Html, Head, OpenGraph, Body, Footer, Consultation } from './layout.v3'
import { join } from 'path'
import { getOpenGraph, getPages, getConfig, State, Actions, Action, getBlogPosts, hasTag } from './store'
import { defaultAssetsPipeline } from './optimise'
import { Store } from 'redux'
import { BlogPost, Page } from './store/websiteReducer'
import { VReference } from './files'

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
  const pages = getPages(state)
  const page = pages.find(it => it.id === Blog.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Blog.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  const blogPosts = getBlogPosts(state).sort(comparePublishedDate)
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
