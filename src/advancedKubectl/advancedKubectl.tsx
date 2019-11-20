import * as React from 'react'
import { RelatedConentContainer, RelatedContentItem, Author } from '../article.v2'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Subscribe } from '../layout.v2'
import * as Remark from '../remark.v2'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getBlogPosts, getAuthors, getConfig } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { Html, Head, OpenGraph, Body, Navbar, Footer } from '../layout.v3'
import { format } from 'date-fns'
import { defaultAssetsPipeline } from '../optimise'

export const Details = {
  type: 'kubectlProductivity',
  url: '/kubectl-productivity',
  seoTitle: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  title: 'Boosting your kubectl productivity',
  shortDescription: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective.`,
  description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
  openGraphImage: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
  publishedDate: '2019-03-27',
  lastModifiedDate: '2019-04-15',
  previewImage: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
  author: {
    fullName: 'Daniel Weibel',
    avatar: <img src='assets/authors/daniel_weibel.jpg' alt='Daniel Weibel' />,
    link: 'https://medium.com/@weibeld',
  },
} as const

export const KubectlProductivity = {
  id: 'kubectl-productivity',
  url: '/blog/kubectl-productivity',
  title: 'Boosting your kubectl productivity ♦︎ Learnk8s',
  description:
    'If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(KubectlProductivity))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-kubectl-productivity',
      pageId: KubectlProductivity.id,
      image: <img src='src/advancedKubectl/magic.jpg' alt='Advanced kubectl usage' />,
      title: 'Boosting your kubectl productivity',
      description: KubectlProductivity.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-kubectl-productivity',
      pageId: KubectlProductivity.id,
      authorId: Authors.danielWeibel.id,
      description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

    This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

    The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
      title: 'Boosting your kubectl productivity',
      publishedDate: '2019-03-27',
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
    url: KubectlProductivity.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === KubectlProductivity.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === KubectlProductivity.id)
  if (!openGraph) {
    throw new Error('The page does not have an open graph.')
  }
  const blog = getBlogPosts(state).find(it => it.pageId === KubectlProductivity.id)
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
              <a href='/blog/kubernetes-spot-instances/' className='link navy underline hover-sky'>
                How to practice chaos engineering and reduce costs
              </a>{' '}
              with Kubernetes and spot instances.
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
