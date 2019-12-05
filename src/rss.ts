import { join } from 'path'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getBlogPosts, getAuthors, getOpenGraph } from './store'
import { RSSPipeline } from './optimise'

export const Details = {
  type: identity<'rss'>('rss'),
  url: '/rss.xml',
}

function identity<T>(value: T): T {
  return value
}

export const RSS = {
  id: 'rss',
  url: '/rss.xml',
  title: 'RSS Feed',
  description: `RSS Feed`,
}

const OldRSS = {
  id: 'old-rss',
  url: '/rss',
  title: 'RSS Feed',
  description: `RSS Feed`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(RSS))
  store.dispatch(Action.registerPage(OldRSS))
  store.dispatch(Action.assignTag({ id: 'no-sitemap', pageId: RSS.id }))
  store.dispatch(
    Action.registerRedirect({
      id: 'redirect-rss',
      fromPageId: OldRSS.id,
      redirectToPageId: RSS.id,
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  RSSPipeline({
    content: renderPage(state),
    url: RSS.url,
    outputFolder: getConfig(state).outputFolder,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    isOptimisedBuild: getConfig(state).isProduction,
  })
}

function renderPage(state: State) {
  const pages = getPages(state)
  const page = pages.find(it => it.id === RSS.id)
  if (!page) {
    throw new Error(`RSS page not registered`)
  }
  const blogPosts = getBlogPosts(state)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`

  const feed = [
    '<title>Learnk8s</title>',
    `<link href="${state.config.protocol}://${state.config.hostname}"/>`,
    `<link rel="self" href="${currentAbsoluteUrl}"/>`,
    `<updated>${new Date().toISOString()}</updated>`,
    `<icon>https://learnk8s.io/favicon.ico</icon>`,
    `<rights>Learnk8s Ltd</rights>`,
    `<id>${state.config.protocol}://${join(state.config.hostname, '/')}</id>`,
    blogPosts
      .sort((a, b) => {
        return new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf()
      })
      .map(blogPost => {
        const page = pages.find(it => it.id === blogPost.pageId)!
        const author = getAuthors(state).find(it => it.id === blogPost.authorId)
        if (!author) {
          throw new Error(`No author for blogPost ${blogPost.title}`)
        }
        const openGraph = getOpenGraph(state).find(it => it.pageId === page.id)
        if (!openGraph) {
          throw new Error(`Missing opengraph for blog post ${blogPost.title} and page ${page.title}`)
        }
        const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
        return [
          '<entry>',
          `<title>${blogPost.title}</title>`,
          `<link href="${currentAbsoluteUrl}"/>`,
          `<id>${currentAbsoluteUrl}</id>`,
          `<updated>${new Date(blogPost.lastModifiedDate || blogPost.publishedDate).toISOString()}</updated>`,
          `<published>${new Date(blogPost.publishedDate).toISOString()}</published>`,
          `<summary><![CDATA[${blogPost.description}]]></summary>`,
          `<author><name>${author.fullName}</name></author>`,
          '</entry>',
        ].join('')
      })
      .join(''),
  ].join('')
  return `<feed xmlns="http://www.w3.org/2005/Atom">${feed}</feed>`
}
