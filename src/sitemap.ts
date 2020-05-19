import { State, Action, getConfig, hasTag, Store, Selector } from './store'
import { RSSPipeline } from './optimise'
import { join } from 'path'

export const SitemapXML = {
  id: 'sitemap',
  url: '/sitemap.xml',
  title: 'Site map',
  description: `Sitemap`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(SitemapXML))
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  RSSPipeline({
    content: renderPage(state),
    url: SitemapXML.url,
    outputFolder: getConfig(state).outputFolder,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    isOptimisedBuild: getConfig(state).isProduction,
  })
}

function renderPage(state: State) {
  const redirects = Selector.redirects.selectAll(state).map(it => it.fromPageId)
  const pages = Selector.pages.selectAll(state).filter(it => !redirects.includes(it.id))
  const page = pages.find(it => it.id === SitemapXML.id)
  if (!page) {
    throw new Error(`Sitemap page not registered`)
  }
  const urlset = pages
    .filter(it => !hasTag(state, 'skip-sitemap')(it))
    .map(it => {
      return [
        `<url>`,
        `<loc>${getConfig(state).protocol}://${join(getConfig(state).hostname, it.url)}</loc>`,
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
