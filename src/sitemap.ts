import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as Blog from './blog'
import * as BrowserConfig from './browserConfig'
import * as Careers from './careers'
import * as Consulting from './consulting'
import * as ContactUs from './contactUs'
import * as Homepage from './homepage'
import * as Landing from './landing'
import * as Newsletter from './newsletter'
import * as Redirect from './redirect'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'
import * as Training from './training'
import * as WebAppManifest from './webAppManifest'

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

import * as BiteSized from './biteSized'
import * as BiteSized201903 from './bsk201903'

import { Venues, Timezone } from './courses'
import moment from 'moment-timezone'

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
  installingK8sOnWindows: createNode({
    page: K8sOnWindows.Details,
    children: {},
  }),
  chaosEngineering: createNode({
    page: ChaosEngineering.Details,
    children: {},
  }),
  deployLaravel: createNode({
    page: DeployLaravel.Details,
    children: {},
  }),
  solarPlants: createNode({
    page: SolarPlants.Details,
    children: {},
  }),
  spotInstances: createNode({
    page: SpotInstances.Details,
    children: {},
  }),
  scalingTensorflow: createNode({
    page: ScalingTensorflow.Details,
    children: {},
  }),
  scalingSpringBoot: createNode({
    page: ScalingSpringBoot.Details,
    children: {},
  }),
  smallerDockerImage: createNode({
    page: SmallerImages.Details,
    children: {},
  }),
  whatIsKubernetes: createNode({
    page: WhatIsKubernetes.Details,
    children: {},
  }),
  advancedKubectl: createNode({
    page: AdvancedKubectl.Details,
    children: {},
  }),
}

const bsk = {
  bskMultiCluster: createNode({
    page: BiteSized201903.MultipleClustersDetails,
    children: {},
  }),
  // bskIngressApi: createNode({
  //   page: BiteSized201903.IngressApiGatewayDetails,
  //   children: {},
  // }),
  // bskVisualiseYaml: createNode({
  //   page: BiteSized201903.VisualiseYamlDetails,
  //   children: {},
  // }),
  bskHelm: createNode({
    page: BiteSized201903.HelmDetails,
    children: {},
  }),
}

const rss = createNode({
  page: RSS.Details,
  children: {},
})

export const Sitemap = createNode({
  page: Homepage.Details,
  children: {
    training: createNode({
      page: Training.Details,
      children: {},
    }),
    academy: createNode({
      page: Academy.Details,
      children: {},
    }),
    blog: createNode({
      page: Blog.Details,
      children: {
        ...blogPosts,
        deployLaravelOld: createNode({
          page: Redirect.Details({
            url: '/deploying-laravel-to-kubernetes',
            redirectTo: blogPosts.deployLaravel,
          }),
          children: {},
        }),
      },
    }),
    biteSizedKubernetes: createNode({
      page: BiteSized.Details,
      children: bsk,
    }),
    contactUs: createNode({
      page: ContactUs.Details,
      children: {},
    }),
    termsAndConditions: createNode({
      page: TermsAndConditions.Details,
      children: {},
    }),
    newsletter: createNode({
      page: Newsletter.Details,
      children: {},
    }),
    consulting: createNode({
      page: Consulting.Details,
      children: {},
    }),
    aboutUs: createNode({
      page: AboutUs.Details,
      children: {},
    }),
    careers: createNode({
      page: Careers.Details,
      children: {},
    }),
    infiniteConf2018: createNode({
      page: Redirect.Details({
        url: '/infiniteconf2018',
        redirectTo: blogPosts.scalingTensorflow,
      }),
      children: {},
    }),
    oldRss: createNode({
      page: Redirect.Details({
        url: '/rss',
        redirectTo: rss,
      }),
      children: {},
    }),
    rss,
    notFound: createNode({
      page: NotFound.Details,
      children: {},
    }),
    london: createNode({
      page: Landing.Details({
        url: '/london',
        location: Venues.London,
        timezone: Timezone.LONDON,
        city: 'London',
      }),
      children: {},
    }),
    toronto: createNode({
      page: Landing.Details({
        url: '/toronto',
        location: Venues.TorontoGK,
        timezone: Timezone.TORONTO,
        city: 'Toronto',
      }),
      children: {},
    }),
    cardiff: createNode({
      page: Landing.Details({
        url: '/cardiff',
        location: Venues.Cardiff,
        timezone: Timezone.LONDON,
        city: 'Cardiff',
      }),
      children: {},
    }),
    singapore: createNode({
      page: Landing.Details({
        url: '/singapore',
        location: Venues.Singapore,
        timezone: Timezone.SINGAPORE,
        city: 'Singapore',
      }),
      children: {},
    }),
    sanFrancisco: createNode({
      page: Landing.Details({
        url: '/san-francisco',
        location: Venues.SanFrancisco,
        timezone: Timezone.SAN_FRANCISCO,
        city: 'San Francisco',
      }),
      children: {},
    }),
    milan: createNode({
      page: Landing.Details({
        url: '/milan',
        location: Venues.Milan,
        timezone: Timezone.ROME,
        city: 'Milan',
      }),
      children: {},
    }),
    webAppManifest: createNode({
      page: WebAppManifest.Details,
      children: {},
    }),
    browserConfig: createNode({
      page: BrowserConfig.Details,
      children: {},
    }),
  },
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

export function getBlogPosts(website: Sitemap): typeof blogPosts[keyof typeof blogPosts][] {
  return Object.values(website.children.blog.children)
    .filter(it => it.payload.type !== Redirect.Type)
    .slice(0)

    .sort((a: any, b: any) => {
      return moment(a.payload.publishedDate).isBefore(b.payload.publishedDate) ? 1 : -1
    }) as any
}

export function getBiteSizedSeries(website: Sitemap): typeof bsk[keyof typeof bsk][] {
  return Object.values(website.children.biteSizedKubernetes.children)
    .filter(it => it.payload.type !== Redirect.Type)
    .slice(0)

    .sort((a: any, b: any) => {
      return moment(a.payload.publishedDate).isBefore(b.payload.publishedDate) ? 1 : -1
    }) as any
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
    ...Object.values(node.children).reduce((acc, it) => acc.concat(renderTree(it as any, siteUrl)), [] as string[]),
  ]
}

export function runSiteMap(root: LinkedNode<any, object>, siteUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderTree(
    Sitemap,
    siteUrl,
  ).join('')}</urlset>`
}
