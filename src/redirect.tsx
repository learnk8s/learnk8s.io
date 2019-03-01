import React from 'react'
import { LinkedNode, Page, Redirect as R } from './sitemap'

export const Redirect: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<R>, siteUrl: string}> = ({siteUrl, currentPage}) => {
  return <html>
    <meta charSet='utf-8' />
    <title>Redirecting…</title>
    <link rel='canonical' href={`${siteUrl}${currentPage.payload.redirectTo}`}/>
    <script>location='{`${siteUrl}${currentPage.payload.redirectTo}`}'</script>
    <meta httpEquiv='refresh' content={`0; url=${siteUrl}${currentPage.payload.redirectTo}`} />
    <meta name='robots' content='noindex'/>
    <h1>Redirecting…</h1>
    <a href={`${siteUrl}${currentPage.payload.redirectTo}`}>Click here if you are not redirected.</a>
  </html>
}