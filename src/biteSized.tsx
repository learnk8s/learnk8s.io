import { Sitemap, LinkedNode, getAbsoluteUrl } from './sitemap'
import * as React from 'react'
import { Article } from './article'
import { cat } from 'shelljs'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { PromoAcademy } from './layout'
import { Markdown } from './markdown'
import { Image, CSSBundle, JSScript, JSBundle } from './assets'
import marked from 'marked'

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
          <strong className='b'>Welcome to Bite-sized Kubernetes</strong> — a regular column on the most interesting
          questions that we see online and during our workshops answered by a Kubernetes expert.
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
