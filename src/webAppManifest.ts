import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'


export const Details = {
  type: identity<'webAppManifest'>('webAppManifest'),
  url: '/manifest.json',
  android192: Image({url: 'assets/android-chrome-192x192.png', description: 'Android Chrome'}),
  android384: Image({url: 'assets/android-chrome-384x384.png', description: 'Android Chrome'}),
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string) {
  return JSON.stringify({
    name: '',
    icons: [
      {
        src: currentNode.payload.android192.url,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: currentNode.payload.android384.url,
        sizes: '384x384',
        type: 'image/png'
      }
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone'
  })
}