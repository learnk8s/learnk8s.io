import * as React from 'react'
import { Store } from 'redux'
import {
  State,
  Actions,
  getPages,
  hasTag,
  getOpenGraph,
  getBlogPosts,
  getAuthors,
  getBlogPostMarkdownBlocks,
  getConfig,
  getPreviewPictures,
} from './store'
import { toVFile, read } from './files'
import { join } from 'path'
import { Html, Head, OpenGraph, Body, Footer, Navbar, Subscribe, Author, WhatIsLearnk8s } from './layout.v3'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { renderToJsx, toMdast } from './markdown'
import { defaultAssetsPipeline } from './optimise'
import { Page } from './store/websiteReducer'
import { format } from 'date-fns'
import { selectAll } from 'unist-util-select'
import * as Mdast from 'mdast'
import { transform } from './markdown/utils'
import { mdast2Jsx, mdast2JsxInline } from './markdown/jsx'
import { tachyons } from './tachyons/tachyons'

export async function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  const pages = getPages(state).filter(hasTag(state, 'bite-sized'))
  await Promise.all(
    pages.map(async page => {
      defaultAssetsPipeline({
        jsx: await renderPage(page, state),
        isOptimisedBuild: getConfig(state).isProduction,
        siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
        url: page.url,
        outputFolder: getConfig(state).outputFolder,
      })
    }),
  )
}

async function renderPage(page: Page, state: State) {
  const openGraph = getOpenGraph(state).find(it => it.pageId === page.id)
  if (!openGraph) {
    throw new Error('The page does not have an open graph.')
  }
  const blog = getBlogPosts(state).find(it => it.pageId === page.id)
  if (!blog) {
    throw new Error('The page is not a blog post page.')
  }
  const author = getAuthors(state).find(it => it.id === blog.authorId)
  if (!author) {
    throw new Error('The blog post does not have an author attached')
  }
  const previewPicture = getPreviewPictures(state).find(it => it.pageId === page.id)
  const extraBlocks = getBlogPostMarkdownBlocks(state).filter(it => it.blogPostId === blog.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  const [content, ...blocks] = await Promise.all([
    read(blog.content),
    ...extraBlocks.map(it => it.content).map(it => read(it)),
  ])
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
        <article className='lazy-article ph3 pt0 pb4 mw7 center'>
          <h1 className='navy tc f2 f1-ns'>{blog.title}</h1>
          <p className='f7 black-60 tc ttu'>Published in {format(new Date(blog.publishedDate), 'MMMM yyyy')}</p>
          {blog.lastModifiedDate ? (
            <p className='f7 black-60 tc ttu b'>
              <Tick className='w1 h1 v-mid' /> Updated in {format(new Date(blog.lastModifiedDate), 'MMMM yyyy')}
            </p>
          ) : null}
          <hr className='pv2 bn' />
          <div className='aspect-ratio aspect-ratio--6x4'>
            {previewPicture ? (
              {
                ...previewPicture.image,
                props: {
                  ...previewPicture.image.props,
                  className: (previewPicture.image.props.className || '').concat('aspect-ratio--object'),
                },
              }
            ) : (
              <img src='assets/bsk.svg' className='aspect-ratio--object' alt={blog.title} />
            )}
          </div>
          <hr className='w3 center b--navy mv4 mb5-ns' />
          <p className='lh-copy measure-wide f4'>
            <strong className='b'>Welcome to Bite-sized Kubernetes learning</strong> — a regular column on the most
            interesting questions that we see online and during our workshops answered by a Kubernetes expert.
          </p>
          <blockquote className='pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4'>
            <p className='lh-copy measure-wide f4'>
              Today's answers are curated by{' '}
              <a href={author.link} className='link navy underline hover-sky' target='_blank' rel='noreferrer'>
                {author.fullName}
              </a>
              . {transform(toMdast(toVFile({ contents: author.description || '' })), mdast2JsxInline())}
            </p>
          </blockquote>
          <p className='lh-copy measure-wide f4'>
            <em className='i'>
              If you wish to have your question featured on the next episode,{' '}
              <a href='mailto:hello@learnk8s.io' className='link navy underline hover-sky' target='_self'>
                please get in touch via email
              </a>{' '}
              or{' '}
              <a
                href='https://twitter.com/learnk8s'
                className='link navy underline hover-sky'
                target='_blank'
                rel='noreferrer'
              >
                you can tweet us at @learnk8s
              </a>
              .
            </em>
          </p>
          <p className='lh-copy measure-wide f4'>
            Did you miss the previous episodes?{' '}
            <a href='/bite-sized' className='link navy underline hover-sky'>
              You can find them here.
            </a>
          </p>
          {renderToJsx(content)}
          {blocks.map(it => {
            const mdast = toMdast(it)
            bumpHeadings(mdast.children, 1)
            return transform({ type: 'root' as const, children: mdast.children }, mdast2Jsx())
          })}
          <Subscribe identifier={blog.id}></Subscribe>
        </article>
        <WhatIsLearnk8s />
        <Footer />
      </Body>
    </Html>
  )
}

function bumpHeadings(children: Mdast.Content[], amount: number): void {
  selectAll<Mdast.Heading>('heading', { type: 'root', children }).forEach(heading => {
    heading.depth = heading.depth + amount
  })
}

const Tick: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' className={className || ''}>
      <g fill='#3BDBB8' fill-rule='evenodd'>
        <circle fill-opacity='.2' cx='15' cy='15' r='15' />
        <path d='M22.61 12.116c0 .235-.094.47-.263.64l-8.099 8.098a.913.913 0 0 1-1.28 0l-4.69-4.69a.913.913 0 0 1 0-1.28l1.28-1.28a.913.913 0 0 1 1.281 0l2.77 2.777 6.177-6.186a.913.913 0 0 1 1.28 0l1.28 1.28c.17.17.265.405.265.64z' />
      </g>
    </svg>
  )
}
