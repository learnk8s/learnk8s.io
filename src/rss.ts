import { join } from 'path'
import { State, Action, getConfig, getBlogPosts, getAuthors, Store, Selector } from './store'
import { RSSPipeline } from './optimise'

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

export function Register(store: Store) {
  store.dispatch(Action.pages.add(RSS))
  store.dispatch(Action.pages.add(OldRSS))
  store.dispatch(Action.tags.add({ id: RSS.id + '-no-sitemap', tag: 'no-sitemap', pageId: RSS.id }))
  store.dispatch(
    Action.redirects.add({
      id: 'redirect-rss',
      fromPageId: OldRSS.id,
      redirectToPageId: RSS.id,
    }),
  )
}

export function Mount({ store }: { store: Store }) {
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
  const pages = Selector.pages.selectAll(state)
  const page = pages.find(it => it.id === RSS.id)
  if (!page) {
    throw new Error(`RSS page not registered`)
  }
  const blogPosts = getBlogPosts(state)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`

  const feed = [
    '<title>Learnk8s</title>',
    `<link href="${getConfig(state).protocol}://${getConfig(state).hostname}"/>`,
    `<link rel="self" href="${currentAbsoluteUrl}"/>`,
    `<updated>${new Date().toISOString()}</updated>`,
    `<icon>https://learnk8s.io/favicon.ico</icon>`,
    `<rights>Learnk8s Ltd</rights>`,
    `<id>${getConfig(state).protocol}://${join(getConfig(state).hostname, '/')}</id>`,
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
        const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === page.id)
        if (!openGraph) {
          throw new Error(`Missing opengraph for blog post ${blogPost.title} and page ${page.title}`)
        }
        const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
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
