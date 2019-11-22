import React from 'react'
import { LinkedNode, getAbsoluteUrl, Sitemap } from './sitemap'
import { renderToStaticMarkup } from 'react-dom/server'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getRedirects, getPages } from './store'
import { defaultAssetsPipeline } from './optimise'

export const Type = 'redirect' as const

export function Details<T>({ redirectTo, url }: { redirectTo: LinkedNode<T>; url: string }) {
  return {
    url,
    type: Type,
    redirectTo,
  }
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  const redirects = getRedirects(state)
  const pages = getPages(state)
  redirects.map(redirect => {
    const from = pages.find(it => it.id === redirect.fromPageId)!
    const to = pages.find(it => it.id === redirect.redirectToPageId)!
    defaultAssetsPipeline({
      jsx: renderPage(`${getConfig(state).protocol}://${getConfig(state).hostname}${to.url}`),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: from.url,
      outputFolder: getConfig(state).outputFolder,
    })
  })
}

export function render(website: Sitemap, currentNode: LinkedNode<ReturnType<typeof Details>>, siteUrl: string): string {
  const redirectUrl = getAbsoluteUrl(currentNode.payload.redirectTo, siteUrl)
  return renderToStaticMarkup(
    <html>
      <meta charSet='utf-8' />
      <title>Redirecting…</title>
      <link rel='canonical' href={redirectUrl} />
      <script dangerouslySetInnerHTML={{ __html: `location='${redirectUrl}'` }} />
      <meta httpEquiv='refresh' content={`0; url=${redirectUrl}`} />
      <meta name='robots' content='noindex' />
      <h1>Redirecting…</h1>
      <a href={redirectUrl}>Click here if you are not redirected.</a>
    </html>,
  )
}

export function renderPage(fullRedirectUrl: string) {
  return (
    <html>
      <meta charSet='utf-8' />
      <title>Redirecting…</title>
      <link rel='canonical' href={fullRedirectUrl} />
      <script dangerouslySetInnerHTML={{ __html: `location='${fullRedirectUrl}'` }} />
      <meta httpEquiv='refresh' content={`0; url=${fullRedirectUrl}`} />
      <meta name='robots' content='noindex' />
      <h1>Redirecting…</h1>
      <a href={fullRedirectUrl}>Click here if you are not redirected.</a>
    </html>
  )
}
