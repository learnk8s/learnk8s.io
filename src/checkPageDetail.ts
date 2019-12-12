import { Store } from 'redux'
import { Actions, State, getPages, getRedirects, getOpenGraph, getBlogPosts } from './store'
import { ok } from 'assert'

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
    try {
      ok(page.title !== '', `Page: ${page.id}, title is not defined.`)
      ok(page.title.length <= 65, `Page: ${page.id}, title is too long.`)
      ok(page.description !== '', `Page: ${page.id}, description is not defined.`)
      ok(page.description.length <= 170, `Page: ${page.id}, description is too long.`)
    } catch (e) {
      console.error(e.message)
    }
  })
}

function checkOpenGraph(store: Store<State, Actions>) {
  const state = store.getState()
  const commonPageIds = getCommonPages(state).map(it => it.id)
  const openGraphs = getOpenGraph(state).filter(it => commonPageIds.includes(it.pageId))
  openGraphs.forEach(og => {
    try {
      ok(og.title !== '', `Page: ${og.id}, open graph title is not defined.`)
      ok(og.description !== '', `Page: ${og.id}, open graph description is not defined.`)

    } catch (e) {
      console.error(e.message)
    }
  })
}

function checkBlogPost(store: Store<State, Actions>) {
  const state = store.getState()
  const blogPosts = getBlogPosts(state)
  blogPosts.forEach(bp => {
    try {
      ok(bp.title !== '', `Page: ${bp.id}, blog post title is not defined.`)
      ok(bp.description !== '', `Page: ${bp.id}, blog post description is not defined.`)
      ok(bp.publishedDate !== '', `Page: ${bp.id}, blog post published date is not defined.`)
      
    } catch (e) {
      console.error(e.message)
    }
  })
}

export function checkPageDetail(store: Store<State, Actions>) {
  checkTitleDescription(store)
  checkOpenGraph(store)
  checkBlogPost(store)
}
