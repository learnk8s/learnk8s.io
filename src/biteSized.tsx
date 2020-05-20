import * as React from 'react'
import { Navbar, Footer, Consultation, Html, Head, Body, OpenGraph } from './layout.v3'
import { State, Action, getConfig, hasTag, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { BlogPost } from './store/websiteReducer'
import { format } from 'date-fns'
import { tachyons } from './tachyons/tachyons'

export const BiteSized = {
  id: 'bite-sized',
  url: '/bite-sized',
  title: 'Bite-sized Kubernetes learning ⎈ Learnk8s',
  description:
    'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(BiteSized))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-bite-sized',
      pageId: BiteSized.id,
      image: 'assets/open_graph_preview.png',
      title: 'Bite-sized Kubernetes learning ⎈ Learnk8s',
      description:
        'A regular column on the most interesting questions that we see online and during our workshops answered by a Kubernetes expert',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
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
  const pages = Selector.pages.selectAll(state)
  const page = pages.find(it => it.id === BiteSized.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === BiteSized.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  const blogPosts = Selector.blogPosts
    .selectAll(state)
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
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        <link rel='canonical' href={currentAbsoluteUrl} />
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
              const postPage = pages.find(it => it.id === post.pageId)!
              const url = postPage ? postPage.url : '#'
              return (
                <li className='pv3'>
                  <h2 className='mb0'>
                    <a href={url} className='link navy'>
                      {post.title}
                    </a>
                  </h2>
                  <p className='black-40 mt1'>{format(new Date(post.publishedDate), 'MMMM Do yyyy')}</p>
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

function comparePublishedDate(postA: BlogPost, postB: BlogPost) {
  return postA.publishedDate < postB.publishedDate ? 1 : postA.publishedDate > postB.publishedDate ? -1 : 0
}
