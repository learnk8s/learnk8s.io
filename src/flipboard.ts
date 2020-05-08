import {
  State,
  Actions,
  Action,
  getPages,
  getConfig,
  getBlogPosts,
  getAuthors,
  getOpenGraph,
  StoreV2,
  ActionV2,
} from './store'
import { Store } from 'redux'
import { join } from 'path'
import { RSSPipeline } from './optimise'

export const RSS = {
  id: 'rss-flipboard',
  url: '/rss-flipboard.xml',
  title: 'RSS Flipboard',
  description: 'RSS Flipboard',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(RSS))
  store.dispatch(Action.assignTag({ id: 'no-sitemap', pageId: RSS.id }))
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
          '<item>',
          `<title>${blogPost.title}</title>`,
          `<link>${currentAbsoluteUrl}</link>`,
          `<guid>${currentAbsoluteUrl}</guid>`,
          `<pubDate>${new Date(blogPost.publishedDate).toUTCString()}</pubDate>`,
          `<dc:creator>${author.fullName}</dc:creator>`,
          `<description><![CDATA[${blogPost.description}]]></description>`,
          `<enclosure url="${openGraph.image.props.src}" length="1000" type="${fileToMime(
            openGraph.image.props.src,
          )}"/>`,
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
