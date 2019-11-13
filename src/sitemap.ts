import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as ArchitectingAndScaling from './architecting'
import * as ZeroToK8s from './zeroToK8s'
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
import * as Training from './training.v2'
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
import * as TerraformAks from './terraformAks/terraformAks'
import * as ZeroToK8sJs from './02k8sjs/02k8sjs'
import * as BestPractices from './best-practices/best'

import * as BiteSized from './biteSized'
import * as BiteSized201903 from './bsk201903'
import * as BiteSized201909 from './bsk201909'
import * as BiteSized201910 from './bsk201910'

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
  terraformAks: createNode({
    page: TerraformAks.Details,
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
  bskIngressApi: createNode({
    page: BiteSized201903.IngressApiGatewayDetails,
    children: {},
  }),
  bskHelm: createNode({
    page: BiteSized201903.HelmDetails,
    children: {},
  }),
  bskVisualiseYaml: createNode({
    page: BiteSized201903.VisualiseYamlDetails,
    children: {},
  }),
  bskSmallOrLarge: createNode({
    page: BiteSized201909.SmallOrLargeDetails,
    children: {},
  }),
  bskSecrets: createNode({
    page: BiteSized201909.SecretsDetails,
    children: {},
  }),
  bskAutoscaling: createNode({
    page: BiteSized201910.AutoscalingDetails,
    children: {},
  }),
  bskRollbacks: createNode({
    page: BiteSized201910.RollbacksDetails,
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
    architectingAndScaling: createNode({
      page: ArchitectingAndScaling.Details,
      children: {},
    }),
    zeroToK8s: createNode({
      page: ZeroToK8s.Details,
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
      children: {
        bskMultiCluster: bsk.bskMultiCluster,
      },
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
        city: 'London',
      }),
      children: {},
    }),
    toronto: createNode({
      page: Landing.Details({
        url: '/toronto',
        city: 'Toronto',
      }),
      children: {},
    }),
    singapore: createNode({
      page: Landing.Details({
        url: '/singapore',
        city: 'Singapore',
      }),
      children: {},
    }),
    sanFrancisco: createNode({
      page: Landing.Details({
        url: '/san-francisco',
        city: 'San Francisco',
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
    bskHelm: bsk.bskHelm,
    bskApiIngress: bsk.bskIngressApi,
    bskVisualiseYaml: bsk.bskVisualiseYaml,
    bskSmallOrLarge: bsk.bskSmallOrLarge,
    bskSecrets: bsk.bskSecrets,
    bskAutoscaling: bsk.bskAutoscaling,
    bskRollbacks: bsk.bskRollbacks,
    zro2k8sjs: newBlog.zro2k8sjs,
    bestPractices: createNode({
      page: BestPractices.Details,
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
  return [
    ...Object.values(website.children.blog.children)
      .filter(it => it.payload.type !== Redirect.Type)
      .slice(0),
    ...getBiteSizedSeries(website),
    ...Object.values(newBlog),
  ].sort((a: any, b: any) => {
    return moment(a.payload.publishedDate).isBefore(b.payload.publishedDate) ? 1 : -1
  }) as any
}

export function getBiteSizedSeries(website: Sitemap): typeof bsk[keyof typeof bsk][] {
  return [
    ...Object.values(website.children.biteSizedKubernetes.children),
    website.children.bskHelm,
    website.children.bskApiIngress,
    website.children.bskVisualiseYaml,
    website.children.bskSmallOrLarge,
    website.children.bskSecrets,
    website.children.bskAutoscaling,
    website.children.bskRollbacks,
  ]
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
