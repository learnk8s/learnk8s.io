import React from 'react'
import { LinkedNode, Redirect as R, getAbsoluteUrl, Website } from './sitemap'

export const Redirect: React.StatelessComponent<{root: Website, currentPage: LinkedNode<R, object>, siteUrl: string}> = ({root, siteUrl, currentPage}) => {
  const redirectUrl = getAbsoluteUrl(currentPage, siteUrl)
  return <html>
    <meta charSet='utf-8' />
    <title>Redirecting…</title>
    <link rel='canonical' href={redirectUrl}/>
    <script>location='{redirectUrl}'</script>
    <meta httpEquiv='refresh' content={`0; url=${redirectUrl}`} />
    <meta name='robots' content='noindex'/>
    <h1>Redirecting…</h1>
    <a href={redirectUrl}>Click here if you are not redirected.</a>
  </html>
}