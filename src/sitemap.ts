import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as ArchitectingAndScaling from './architecting'
import * as ZeroToK8s from './zeroToK8s'
import * as Blog from './blog'
import * as Careers from './careers'
import * as Consulting from './consulting'
import * as ContactUs from './contactUs'
import * as Homepage from './homepage'
import * as Landing from './landing'
import * as Newsletter from './newsletter'
import * as Redirect from './redirect'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'
import * as Training from './training.v2'

import * as SmallerImages from './smallerDockerImages/smallerImages'
import * as DeployLaravel from './deployLaravel/deployLaravel'
import * as K8sOnWindows from './k8sOnWindows/installingK8sOnWindows'
import * as ChaosEngineering from './chaosEngineering/chaosEngineering'
import * as SolarPlants from './solarPlants/solarPlants'
import * as SpotInstances from './spotInstances/spotInstances'
import * as ScalingTensorflow from './scalingKubeflow/scalingTensorflow'
import * as ScalingSpringBoot from './scalingSpringBoot/scalingSpringBoot'
import * as WhatIsKubernetes from './whatIsKubernetes/whatIsK8s'
import * as AdvancedKubectl from './advancedKubectl/advancedKubectl'
import * as TerraformAks from './terraformAks/terraformAks'
import * as ZeroToK8sJs from './02k8sjs/02k8sjs'
import * as BestPractices from './best-practices/best'

import * as BiteSized from './biteSized'
import * as BiteSized201903 from './bite-sized-articles'

import moment from 'moment-timezone'
import { Store } from 'redux'
import { State, Actions, Action, getConfig, getPages, getRedirects, hasTag } from './store'
import { RSSPipeline } from './optimise'
import { join } from 'path'

export function createNode<T extends {}, U extends { [name: string]: LinkedNode<any> }>({
  page,
  children,
}: {
  page: T
  children: U
}): LinkedNode<T, U> {
  const linkedNode = {
    prev: null,
    next: null,
    payload: page,
    children,
    parent: null,
  }
  Object.keys(children).forEach((key, index, array) => {
    children[key].parent = linkedNode
    if (index > 0) {
      children[key].prev = children[array[index - 1]]
    }
    if (index < array.length) {
      children[key].next = children[array[index + 1]]
    }
  })
  return linkedNode
}

const blogPosts = {
  scalingTensorflow: createNode({
    page: ScalingTensorflow.Details,
    children: {},
  }),
}

const newBlog = {
  zro2k8sjs: createNode({
    page: ZeroToK8sJs.Details,
    children: {},
  }),
}

const bsk = {
  bskMultiCluster: createNode({
    page: BiteSized201903.MultipleClustersDetails,
    children: {},
  }),
}

export const Sitemap = createNode({
  page: Homepage.Details,
  children: {},
})

export type Sitemap = typeof Sitemap

export interface LinkedNode<T, U = {}> {
  prev: LinkedNode<any, any> | null
  next: LinkedNode<any, any> | null
  payload: T
  children: U
  parent: LinkedNode<any, any> | null
}

export function getFullUrl(currentPage: LinkedNode<any>): string {
  let finalUrl = ''
  let currentNode: LinkedNode<any> | null = currentPage
  while (currentNode !== null) {
    finalUrl = `${currentNode.payload.url}${finalUrl}`
    currentNode = currentNode.parent
  }
  return finalUrl.startsWith('//') ? finalUrl.slice(1) : finalUrl
}

export function getAbsoluteUrl(currentPage: LinkedNode<any>, siteUrl: string): string {
  return `${siteUrl}${getFullUrl(currentPage)}`
}

function render(node: LinkedNode<any, object>, siteUrl: string): string {
  if (node.payload.type === Redirect.Type) {
    return ''
  }
  return `<url><loc>${getAbsoluteUrl(node, siteUrl)}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
}

function renderTree(node: LinkedNode<any, object>, siteUrl: string): string[] {
  return [
    render(node, siteUrl),
    ...Object.values(node.children)
      .filter(it => {
        return it.payload.url !== '/404'
      })
      .reduce((acc, it) => acc.concat(renderTree(it as any, siteUrl)), [] as string[]),
  ]
}

export function runSiteMap(root: LinkedNode<any, object>, siteUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderTree(
    Sitemap,
    siteUrl,
  ).join('')}</urlset>`
}

export const SitemapXML = {
  id: 'sitemap',
  url: '/sitemap.xml',
  title: 'Site map',
  description: `Sitemap`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(SitemapXML))
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  RSSPipeline({
    content: renderPage(state),
    url: SitemapXML.url,
    outputFolder: getConfig(state).outputFolder,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    isOptimisedBuild: getConfig(state).isProduction,
  })
}

function renderPage(state: State) {
  const redirects = getRedirects(state).map(it => it.fromPageId)
  const pages = getPages(state).filter(it => !redirects.includes(it.id))
  const page = pages.find(it => it.id === SitemapXML.id)
  if (!page) {
    throw new Error(`Sitemap page not registered`)
  }
  const urlset = pages
    .filter(it => !hasTag(state, 'skip-sitemap')(it))
    .map(it => {
      return [
        `<url>`,
        `<loc>${state.config.protocol}://${join(state.config.hostname, it.url)}</loc>`,
        `<lastmod>${new Date().toISOString()}</lastmod>`,
        `</url>`,
      ].join('')
    })
    .join('')

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`,
  ].join('')
}
