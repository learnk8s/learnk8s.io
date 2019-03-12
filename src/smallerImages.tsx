import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: identity<'smaller_images'>('smaller_images'),
  url: '/smaller-docker-images',
  seoTitle: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
  pageDetails: {
    title: '3 simple tricks for smaller Docker images',
    description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
    openGraphImage: Image({url: '_blog/smaller-docker-images/smaller_images.png', description: 'Docker whale'}),
  },
  publishedDate: '2018-02-12',
  previewImage: Image({url: '_blog/smaller-docker-images/smaller_images.png', description: '3 simple tricks for smaller Docker images'}),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic'}),
    link: 'https://linkedin.com/in/danielepolencic'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}