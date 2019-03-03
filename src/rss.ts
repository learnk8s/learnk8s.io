import { getAbsoluteUrl, getBlogPosts, Website } from './sitemap'
import { Feed } from 'feed'
import moment = require('moment')

export function generateRSS(root: Website, siteUrl: string) {
  const articles = getBlogPosts(root.children.blog)
  const feed = new Feed({
    title: 'Learnk8s',
    description: 'Learn Kubernetes',
    id: 'https://learnk8s.io',
    link: 'https://learnk8s.io',
    favicon: 'https://learnk8s.io/favicon.ico',
    feedLinks: {},
    copyright: 'Learnk8s Ltd',
    feed: 'https://example.com/atom',
    updated: new Date(),
  })
  articles.forEach(it => {
    feed.addItem({
      title: it.payload.pageDetails.title,
      link: getAbsoluteUrl(it, siteUrl),
      date: moment(it.payload.publishedDate).toDate(),
      id: getAbsoluteUrl(it, siteUrl),
      description: it.payload.pageDetails.description,
      content: it.payload.pageDetails.description,
      image: `${siteUrl}${it.payload.pageDetails.openGraphImage}`
    })
  })
  return feed.atom1()
}