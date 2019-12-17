import { Store } from 'redux'
import { Actions, State, getPages, getRedirects, getOpenGraph, getBlogPosts, store } from './store'
import { ok } from 'assert'
import { Cheerio } from './optimise'
import { Page } from './store/websiteReducer'

function getCommonPages(state: State) {
  const redirectPageIds = getRedirects(state).map(it => it.fromPageId)
  return getPages(state)
    .filter(it => !redirectPageIds.includes(it.id))
    .filter(it => it.url.split('.').pop() !== 'xml')
}

function checkTitleDescription(store: Store<State, Actions>) {
  const state = store.getState()
  const pages = getCommonPages(state)
  pages.forEach(page => {
    ok(page.title !== '', `Page: ${page.id}, title is not defined.`)
    ok(page.title.length <= 65, `Page: ${page.id}, title is too long (${page.title.length} expected 65 or less).`)
    ok(page.title.length >= 15, `Page: ${page.id}, title is too short (${page.title.length} expected 15 or more).`)
    ok(page.description !== '', `Page: ${page.id}, description is not defined.`)
    ok(
      page.description.length <= 170,
      `Page: ${page.id}, description is too long (${page.description.length} expected 170 or less).`,
    )
    ok(
      page.description.length >= 50,
      `Page: ${page.id}, description is too short (${page.description.length} exptected 50 or more).`,
    )
  })
}

function checkOpenGraph(store: Store<State, Actions>) {
  const state = store.getState()
  const commonPageIds = getCommonPages(state).map(it => it.id)
  const openGraphs = getOpenGraph(state).filter(it => commonPageIds.includes(it.pageId))
  openGraphs.forEach(og => {
    ok(og.title !== '', `Page: ${og.id}, open graph title is not defined.`)
    ok(og.description !== '', `Page: ${og.id}, open graph description is not defined.`)
  })
}

function checkBlogPost(store: Store<State, Actions>) {
  const state = store.getState()
  const blogPosts = getBlogPosts(state)
  blogPosts.forEach(bp => {
    ok(bp.title !== '', `Page: ${bp.id}, blog post title is not defined.`)
    ok(bp.description !== '', `Page: ${bp.id}, blog post description is not defined.`)
    ok(bp.publishedDate !== '', `Page: ${bp.id}, blog post published date is not defined.`)
  })
}

export function checkPageDetail(store: Store<State, Actions>) {
  checkTitleDescription(store)
  checkOpenGraph(store)
  checkBlogPost(store)
}

export const checkCanonical = (() => {
  let pages: Page[] = []
  return ($: Cheerio) => {
    if (pages.length === 0) {
      const state = store.getState()
      pages = getCommonPages(state).filter(it => it.id !== 'not-found-404')
    }
    const canonicalNode = $.find('link[rel="canonical"]').get() as any
    const title = ($.find('title').get() as any)?.children.pop().value
    const page = pages.filter(it => it.title === title).pop()
    if (page) {
      try {
        ok(canonicalNode === null, `Page: ${page.id}, canonical is not defined.`)
        ok(canonicalNode.properties.href === '', `Page: ${page.id}, canonical is not defined.`)
      } catch (err) {
        console.error(page.id)
      }
    }
  }
})()
