import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getRedirects, hasTag } from './store'
import { RSSPipeline } from './optimise'
import { join } from 'path'

export const SitemapXML = {
  id: 'sitemap',
  url: '/sitemap.xml',
  title: 'Site map',
  description: `Sitemap`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(SitemapXML))
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  RSSPipeline({
    content: renderPage(state),
    url: SitemapXML.url,
    outputFolder: getConfig(state).outputFolder,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    isOptimisedBuild: getConfig(state).isProduction,
  })
}

export function renderPage(state: State) {
  const redirects = getRedirects(state).map(it => it.fromPageId)
  const pages = getPages(state).filter(it => !redirects.includes(it.id))
  const page = pages.find(it => it.id === SitemapXML.id)
  if (!page) {
    throw new Error(`Sitemap page not registered`)
  }
  const urlset = pages
    .filter(it => !hasTag(state, 'skip-sitemap')(it))
    .map(it => {
      return [
        `<url>`,
        `<loc>${state.config.protocol}://${join(state.config.hostname, it.url)}</loc>`,
        `<lastmod>${new Date().toISOString()}</lastmod>`,
        `</url>`,
      ].join('')
    })
    .join('')

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`,
  ].join('')
}
