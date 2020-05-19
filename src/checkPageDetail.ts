import { State, store, Selector, Store } from './store'
import { ok } from 'assert'

function getCommonPages(state: State) {
  const redirectPageIds = Selector.redirects.selectAll(state).map(it => it.fromPageId)
  return Selector.pages
    .selectAll(state)
    .filter(it => !redirectPageIds.includes(it.id))
    .filter(it => it.url.split('.').pop() !== 'xml')
}

function checkTitleDescription(store: Store) {
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

function checkOpenGraph(store: Store) {
  const state = store.getState()
  const commonPageIds = getCommonPages(state).map(it => it.id)
  const openGraphs = Selector.openGraphs.selectAll(state).filter(it => commonPageIds.includes(it.pageId))
  openGraphs.forEach(og => {
    ok(og.title !== '', `Page: ${og.id}, open graph title is not defined.`)
    ok(og.description !== '', `Page: ${og.id}, open graph description is not defined.`)
  })
}

function checkBlogPost(store: Store) {
  const state = store.getState()
  const blogPosts = Selector.blogPosts.selectAll(state)
  blogPosts.forEach(bp => {
    ok(bp.title !== '', `Page: ${bp.id}, blog post title is not defined.`)
    ok(bp.description !== '', `Page: ${bp.id}, blog post description is not defined.`)
    ok(bp.publishedDate !== '', `Page: ${bp.id}, blog post published date is not defined.`)
  })
}

export function checkPageDetail(store: Store) {
  checkTitleDescription(store)
  checkOpenGraph(store)
  checkBlogPost(store)
}
