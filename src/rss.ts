import { LinkedNode, Page, findOrPanic, PageName, PageType, ArticlePage, getFullUrl } from './sitemap'
import { Feed } from 'feed'
import moment = require('moment')

export function generateRSS(root: LinkedNode<Page>, siteUrl: string) {
  const articles = findOrPanic(root, PageName.BLOG).children.filter(it => it.payload.type === PageType.ARTICLE) as LinkedNode<ArticlePage>[]
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
      link: `${siteUrl}${getFullUrl(it)}`,
      date: moment(it.payload.publishedDate).toDate(),
      id: `${siteUrl}${getFullUrl(it)}`,
      description: it.payload.pageDetails.description,
      content: it.payload.pageDetails.description,
      image: `${siteUrl}${it.payload.pageDetails.image}`
    })
  })
  return feed.atom1()
}