import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: 'webAppManifest',
  url: '/manifest.json',
  android192: <img src='assets/android-chrome-192x192.png' alt='Android Chrome' />,
  android384: <img src='assets/android-chrome-384x384.png' alt='Android Chrome' />,
} as const

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string) {
  return {
    name: '',
    icons: [
      {
        src: currentNode.payload.android192.props.src,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: currentNode.payload.android384.props.src,
        sizes: '384x384',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  }
}
