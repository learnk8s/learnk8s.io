import { getAbsoluteUrl, Sitemap, LinkedNode, getBlogPosts, getBiteSizedSeries } from './sitemap'
import { Feed } from 'feed'
import moment = require('moment')

export const Details = {
  type: identity<'rss'>('rss'),
  url: '/rss.xml',
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  const articles = [...getBlogPosts(website)] // [BSK ENABLE] ...getBiteSizedSeries(website)]
  const feed = new Feed({
    title: 'Learnk8s',
    description: 'Learn Kubernetes',
    id: siteUrl,
    link: siteUrl,
    favicon: `${siteUrl}/favicon.ico`,
    feedLinks: {},
    copyright: 'Learnk8s Ltd',
    feed: getAbsoluteUrl(website.children.rss, siteUrl),
    updated: new Date(),
  })
  articles.forEach(it => {
    feed.addItem({
      title: it.payload.title,
      link: getAbsoluteUrl(it, siteUrl),
      date: moment(it.payload.publishedDate).toDate(),
      id: getAbsoluteUrl(it, siteUrl),
      description: it.payload.description,
      content: it.payload.description,
      image: `${siteUrl}${it.payload.openGraphImage}`,
    })
  })
  return feed.atom1()
}
