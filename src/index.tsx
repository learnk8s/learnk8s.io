import { LinkedNode, Page, PageType, getFullUrl, sitemap, TrainingPage } from './sitemap'
import * as Sitemap from './sitemap'
import { Homepage, assets as assetsHomepage } from './homepage'
import { Training, assets as assetsTraining } from './training'
import { Academy, assets as assetsAcademy } from './academy'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { optimiseAssets } from './assets'
import { mkdir } from 'shelljs'

export function run(options: Settings) {
  return function mount(root: LinkedNode<Page>) {
    renderTree(root, root)
  }

  function renderTree(node: LinkedNode<Page>, root: LinkedNode<Page>) {
    render(node, root, options)
    node.children.forEach(it => renderTree(it as any, root))
  }
}

function render(node: LinkedNode<Page>, root: LinkedNode<Page>, {siteUrl, vendorId}: Settings) {
  const page = node.payload
  const path = `_site${resolve('.', getFullUrl(node), 'index.html')}`
  mkdir('-p', `_site${resolve('.', getFullUrl(node))}`)
  switch (page.type) {
    case PageType.HOMEPAGE: {
      writeFileSync(path, renderToStaticMarkup(<Homepage root={root} currentPage={node as LinkedNode<Sitemap.Homepage>} siteUrl={siteUrl} assets={optimiseAssets(assetsHomepage)} />))
      return
    }
    case PageType.TRAINING: {
      writeFileSync(path, renderToStaticMarkup(<Training root={root} currentPage={node as LinkedNode<TrainingPage>} siteUrl={siteUrl} assets={optimiseAssets(assetsTraining)} />))
      return
    }
    case PageType.ACADEMY: {
      writeFileSync(path, renderToStaticMarkup(<Academy root={root} currentPage={node as LinkedNode<Sitemap.AcademyPage>} siteUrl={siteUrl} assets={optimiseAssets(assetsAcademy(vendorId))} />))
      return
    }
    default:
      // assertUnreachable(page)
  }
}

function assertUnreachable(x: never): never {
  throw new Error('Did not expect to get here')
}

interface Settings {
  siteUrl: string
  vendorId: string
}

run({
  siteUrl: 'https://learnk8s.io',
  vendorId: '38628',
})(sitemap)