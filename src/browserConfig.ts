import { Image } from './assets'
import { Sitemap, LinkedNode } from './sitemap'

export const Details = {
  type: identity<'browserConfig'>('browserConfig'),
  url: '/browserconfig.xml',
  mstyle: Image({ url: 'assets/mstile-150x150.png', description: 'MS Style' }),
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string) {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="${currentNode.payload.mstyle.url}"/>
      <TileColor>#326ce5</TileColor>
    </tile>
  </msapplication>
</browserconfig>`
}
