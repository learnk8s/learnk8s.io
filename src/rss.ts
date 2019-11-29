import { getAbsoluteUrl, Sitemap, LinkedNode, getBlogPosts, getBiteSizedSeries } from './sitemap'
import { join } from 'path'
import { Store } from 'redux'
import { State, Actions, Action } from './store'

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
  store.dispatch(
    Action.registerRedirect({
      id: 'redirect-rss',
      fromPageId: OldRSS.id,
      redirectToPageId: RSS.id,
    }),
  )
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const articles = [...getBlogPosts(website), ...getBiteSizedSeries(website)]
  const feed = [
    '<title>Learnk8s</title>',
    `<link href="${siteUrl}"/>`,
    `<link rel="self" href="${getAbsoluteUrl(website.children.rss, siteUrl)}"/>`,
    `<updated>${new Date().toISOString()}</updated>`,
    `<icon>https://learnk8s.io/favicon.ico</icon>`,
    `<rights>Learnk8s Ltd</rights>`,
    `<id>${join(siteUrl, '/')}</id>`,
    articles
      .filter((it, i, array) =>
        onlyUnique(
          it.payload.type,
          i,
          array.map(it => it.payload.type),
        ),
      )
      .map(it => {
        return [
          '<entry>',
          `<title>${it.payload.title}</title>`,
          `<link href="${getAbsoluteUrl(it, siteUrl)}"/>`,
          `<id>${getAbsoluteUrl(it, siteUrl)}</id>`,
          `<updated>${new Date(it.payload.publishedDate).toISOString()}</updated>`,
          `<published>${new Date(it.payload.publishedDate).toISOString()}</published>`,
          `<summary><![CDATA[${it.payload.description}]]></summary>`,
          `<author><name>${it.payload.author.fullName}</name></author>`,
          '</entry>',
        ].join('')
      })
      .join(''),
  ].join('')
  return `<feed xmlns="http://www.w3.org/2005/Atom">${feed}</feed>`
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}
