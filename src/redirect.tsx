import React from 'react'
import { LinkedNode, getAbsoluteUrl, Sitemap } from './sitemap'
import { renderToStaticMarkup } from 'react-dom/server'

export const Type = identity<'redirect'>('redirect')

export function Details<T>({ redirectTo, url }: { redirectTo: LinkedNode<T>; url: string }) {
  return {
    url,
    type: Type,
    redirectTo,
  }
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<ReturnType<typeof Details>>, siteUrl: string): string {
  const redirectUrl = getAbsoluteUrl(currentNode.payload.redirectTo, siteUrl)
  return renderToStaticMarkup(
    <html>
      <meta charSet='utf-8' />
      <title>Redirecting…</title>
      <link rel='canonical' href={redirectUrl} />
      <script>location='{redirectUrl}'</script>
      <meta httpEquiv='refresh' content={`0; url=${redirectUrl}`} />
      <meta name='robots' content='noindex' />
      <h1>Redirecting…</h1>
      <a href={redirectUrl}>Click here if you are not redirected.</a>
    </html>,
  )
}
