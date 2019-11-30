import React from 'react'
import { getFullUrl, Sitemap } from './sitemap'

export const Layout: React.StatelessComponent<{
  website: Sitemap
  seoTitle: string
  title: string
  description: string
  openGraphImage: JSX.Element
  absoluteUrl: string
}> = ({ children, website, seoTitle, title, description, openGraphImage, absoluteUrl }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>{seoTitle}</title>
        <meta name='description' content={description} />
        <meta name='author' content='Learnk8s' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@learnk8s' />
        <meta property='fb:app_id' content='398212777530104' />
        <link rel='apple-touch-icon' sizes='180x180' href='assets/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='assets/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='assets/favicon-16x16.png' />
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Subscribe to Learnk8s RSS'
          href={getFullUrl(website.children.rss)}
        />
        <meta property='og:site_name' content='Learnk8s' />
        <meta property='og:url' content={absoluteUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={openGraphImage.props.src} />
        <meta property='og:description' content={description} />
        <meta name='pocket-site-verification' content='1476398dfb5a771a94da9466e0bb43' />
        <link rel='stylesheet' href='node_modules/tachyons/css/tachyons.css' />
        <link rel='stylesheet' href='assets/style.css' />
      </head>
      <body className='bg-near-white sans-serif'>
        <div className='cf w-100 mw9-l center bg-white'>{children}</div>
      </body>
    </html>
  )
}
