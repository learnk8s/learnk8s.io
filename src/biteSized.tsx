import { Sitemap, LinkedNode, getAbsoluteUrl, getFullUrl, getBiteSizedSeries } from './sitemap'
import * as React from 'react'
import { Article } from './article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { PromoAcademy, Layout, Navbar, Consultation, Footer } from './layout'
import { Markdown } from './markdown'
import { Image, CSSBundle, JSScript, JSBundle, Img } from './assets'
import marked from 'marked'
import moment = require('moment')

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
  openGraphImage: Image
  publishedDate: string
  previewImage: Image
  author: {
    fullName: string
    avatar: Image
    link: string
    shortDescription: string
  }
}

export function BiteSizedRender(markdownPath: string) {
  return function render(website: Sitemap, currentNode: LinkedNode<Details>, siteUrl: string): string {
    const { css, js, html } = Markdown(cat(markdownPath).toString(), __dirname)
    return renderToStaticMarkup(
      <Article
        website={website}
        seoTitle={currentNode.payload.seoTitle}
        title={currentNode.payload.title}
        description={currentNode.payload.description}
        openGraphImage={currentNode.payload.openGraphImage}
        absolutUrl={getAbsoluteUrl(currentNode, siteUrl)}
        authorFullName={currentNode.payload.author.fullName}
        authorAvatar={currentNode.payload.author.avatar}
        authorLink={currentNode.payload.author.link}
        cssBundle={CSSBundle({
          paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
          styles: css,
        })}
        publishedDate={currentNode.payload.publishedDate}
      >
        <JsonLd<BlogPosting>
          item={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: currentNode.payload.title,
            image: `${siteUrl}${currentNode.payload.previewImage.url}`,
            author: {
              '@type': 'Person',
              name: currentNode.payload.author.fullName,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Learnk8s',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}${Image({ url: 'assets/learnk8s_logo_square.png', description: 'Learnk8s logo' }).url}`,
              },
            },
            url: getAbsoluteUrl(currentNode, siteUrl),
            datePublished: currentNode.payload.publishedDate,
            dateModified: currentNode.payload.publishedDate,
            description: currentNode.payload.description,
            mainEntityOfPage: {
              '@type': 'SoftwareSourceCode',
            },
          }}
        />
        <p className='lh-copy measure-wide f4'>
          <strong className='b'>Welcome to Bite-sized Kubernetes learning</strong> — a regular column on the most
          interesting questions that we see online and during our workshops answered by a Kubernetes expert.
        </p>
        <blockquote className='pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4'>
          <p className='lh-copy measure-wide f4'>
            This month's answers are curated by{' '}
            <a
              href={currentNode.payload.author.link}
              className='link navy underline hover-sky'
              target='_blank'
              rel='noreferrer'
            >
              {currentNode.payload.author.fullName}
            </a>
            .{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: marked(currentNode.payload.author.shortDescription, { renderer: inlineRenderer }),
              }}
            />
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
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <PromoAcademy sitemap={website} />

        <JSScript
          js={JSBundle({
            scripts: js,
          })}
        />
      </Article>,
    )
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
  openGraphImage: Image({ url: 'assets/open_graph_preview.png', description: 'Learnk8s preview' }),
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Layout
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
      openGraphImage={currentNode.payload.openGraphImage}
      absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
      cssBundle={CSSBundle({
        paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
      })}
    >
      <div className='trapezoid-1 white pt3 pt0-ns pb2 pb4-ns'>
        <Navbar root={website} />

        <section className='ph5-l'>
          <div className='w-100'>
            <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Latest posts</h1>
          </div>
        </section>
      </div>

      <section className='ph3 measure-wide pv4 center'>
        <ul className='list pl0'>
          {getBiteSizedSeries(website).map(it => {
            return (
              <li className='pv3'>
                <h2 className='mb0'>
                  <a href={getFullUrl(it)} className='link navy'>
                    {it.payload.title}
                  </a>
                </h2>
                <p className='black-40 mt1'>{moment(it.payload.publishedDate).format('MMMM Do YYYY')}</p>
                <p className='lh-copy black-70'>{it.payload.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <Consultation />
      <Footer root={website} />
    </Layout>,
  )
}

export const Block: React.StatelessComponent<{ image: Image; title: string; description: string }> = ({
  title,
  description,
  children,
  image,
}) => {
  return (
    <li className='bg-white br2 relative pt4 w-100 mw6-m center-m w-30-l mv5'>
      <div className='w3 h3 bg-white br-100 shadow-1 absolute top--2 left-0 absolute-center'>
        <Img image={image} />
      </div>
      <h2 className='navy normal tc'>{title}</h2>
      <p className='lh-copy black-70 ph4 measure-narrow'>{description}</p>
      <div className='tc bg-evian br2 br--bottom pv3'>{children}</div>
    </li>
  )
}
