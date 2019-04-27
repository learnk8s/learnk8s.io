import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: 'browserConfig',
  url: '/browserconfig.xml',
  mstyle: <img src='assets/mstile-150x150.png' alt='MS Style' />,
} as const

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string) {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="${currentNode.payload.mstyle.props.src}"/>
      <TileColor>#326ce5</TileColor>
    </tile>
  </msapplication>
</browserconfig>`
}
