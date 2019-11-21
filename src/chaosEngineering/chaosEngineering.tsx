import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl } from '../sitemap'
import * as React from 'react'
import { Article, RelatedConentContainer, RelatedContentItem, Author } from '../article.v2'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'
import { defaultAssetsPipeline } from '../optimise'
import { getConfig, State, Actions, Action, getPages, getOpenGraph, getBlogPosts, getAuthors } from '../store'
import { Store } from 'redux'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { Head, Html, Body, Navbar, OpenGraph, Footer } from '../layout.v3'
import { format } from 'date-fns'

export const Details = {
  type: 'chaosEngineering',
  url: '/kubernetes-chaos-engineering-lessons-learned',
  seoTitle: 'Kubernetes Chaos Engineering: Lessons Learned ♦︎ Learnk8s',
  title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
  shortDescription: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?`,
  description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
  openGraphImage: <img src='src/chaosEngineering/chaos-engineering-kubernetes.png' alt='Chaos engineering' />,
  publishedDate: '2018-05-15',
  lastModifiedDate: '2019-04-15',
  previewImage: <img src='src/chaosEngineering/chaos-engineering-kubernetes.png' alt='Chaos engineering' />,
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://linkedin.com/in/danielepolencic',
  },
} as const

export const ChaosEngineering = {
  id: 'chaos-engineering',
  url: '/blog/chaos-engineering',
  title: 'Kubernetes Chaos Engineering: Lessons Learned ♦︎ Learnk8s',
  description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ChaosEngineering))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-chaos-engineering',
      pageId: ChaosEngineering.id,
      image: <img src='src/chaosEngineering/chaos-engineering-kubernetes.png' alt='Chaos engineering' />,
      title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
      description: ChaosEngineering.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-chaos-engineering',
      pageId: ChaosEngineering.id,
      authorId: Authors.danielePolencic.id,
      description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
      title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
      publishedDate: '2018-05-15',
      lastModifiedDate: '2019-04-15',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: ChaosEngineering.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === ChaosEngineering.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === ChaosEngineering.id)
  if (!openGraph) {
    throw new Error('The page does not have an open graph.')
  }
  const blog = getBlogPosts(state).find(it => it.pageId === ChaosEngineering.id)
  if (!blog) {
    throw new Error('The page is not a blog post page.')
  }
  const author = getAuthors(state).find(it => it.id === blog.authorId)
  if (!author) {
    throw new Error('The blog post does not have an author attached')
  }
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
        <JsonLd<BlogPosting>
          item={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            image: `${openGraph.image.props.src}`,
            author: {
              '@type': 'Person',
              name: author.fullName,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Learnk8s',
              logo: {
                '@type': 'ImageObject',
                url: `assets/learnk8s_logo_square.png`,
              },
            },
            url: currentAbsoluteUrl,
            datePublished: blog.publishedDate,
            dateModified: blog.lastModifiedDate || blog.publishedDate,
            description: blog.description,
            mainEntityOfPage: {
              '@type': 'SoftwareSourceCode',
            },
          }}
        />
      </Head>
      <Body>
        <div className='white mb4 mb5-ns'>
          <Navbar />
        </div>
        <div className='tc mb4 db mw4 center'>
          <Author name={author.fullName} avatar={author.avatar} link={author.link} />
        </div>
        <article className='ph3 pt0 pb4 mw7 center'>
          <h1 className='navy tc f2 f1-ns'>{blog.title}</h1>
          <p className='f7 black-60 tc ttu'>Published in {format(new Date(blog.publishedDate), 'MMMM yyyy')}</p>
          {blog.lastModifiedDate ? (
            <p className='f7 black-60 tc ttu b'>
              <img src='assets/tick.svg' alt='Tick' className='w1 h1 v-mid' /> Updated in{' '}
              {format(new Date(blog.lastModifiedDate), 'MMMM yyyy')}
            </p>
          ) : null}
          <img src={openGraph.image.props.src} className='pt2' alt={openGraph.image.props.alt} />
          <hr className='w3 center b--navy mv4 mb5-ns' />
          {Remark.render(`${__dirname}/content.md`)}

          <RelatedConentContainer>
            <RelatedContentItem>
              <a href='/blog/smaller-docker-images/' className='link navy underline hover-sky'>
                3 simple tricks for smaller Docker images
              </a>{' '}
              and learn how to build and deploy Docker images quicker.
            </RelatedContentItem>
            <RelatedContentItem>
              <a href='/blog/scaling-spring-boot-microservices/' className='link navy underline hover-sky'>
                Scaling Microservices with Message Queues, Spring Boot and Kubernetes.
              </a>{' '}
              Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.
            </RelatedContentItem>
          </RelatedConentContainer>
          <Subscribe identifier={blog.id} />
        </article>
        <Footer />
      </Body>
    </Html>
  )
}
