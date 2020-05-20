import { State, Action, getConfig, Store, Selector } from './store'
import { join } from 'path'
import { RSSPipeline } from './optimise'

export const RSS = {
  id: 'rss-flipboard',
  url: '/rss-flipboard.xml',
  title: 'RSS Flipboard',
  description: 'RSS Flipboard',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(RSS))
  store.dispatch(Action.tags.add({ id: RSS.id + '-no-sitemap', tag: 'no-sitemap', pageId: RSS.id }))
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
  const blogPosts = Selector.blogPosts.selectAll(state)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`

  const channel = [
    `<title>Learnk8s</title>`,
    `<link>${currentAbsoluteUrl}</link>`,
    `<description>Learn8s blog</description>`,
    `<language>en</language>`,
    blogPosts
      .sort((a, b) => {
        return new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf()
      })
      .map(blogPost => {
        const page = pages.find(it => it.id === blogPost.pageId)!
        const author = Selector.authors.selectAll(state).find(it => it.id === blogPost.authorId)
        if (!author) {
          throw new Error(`No author for blogPost ${blogPost.title}`)
        }
        const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === page.id)
        if (!openGraph) {
          throw new Error(`Missing opengraph for blog post ${blogPost.title} and page ${page.title}`)
        }
        const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
        return [
          '<item>',
          `<title>${blogPost.title}</title>`,
          `<link>${currentAbsoluteUrl}</link>`,
          `<guid>${currentAbsoluteUrl}</guid>`,
          `<pubDate>${new Date(blogPost.publishedDate).toUTCString()}</pubDate>`,
          `<dc:creator>${author.fullName}</dc:creator>`,
          `<description><![CDATA[${blogPost.description}]]></description>`,
          `<enclosure url="${openGraph.image}" length="1000" type="${fileToMime(openGraph.image)}"/>`,
          '</item>',
        ].join('')
      })
      .join(''),
  ].join('')
  return `<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>${channel}</channel></rss>`
}

function fileToMime(path: string): string {
  if (path.endsWith('jpg')) {
    return 'image/jpeg'
  }
  if (path.endsWith('png')) {
    return 'image/png'
  }
  throw new Error(`Unrecognised file extension ${path}`)
}
