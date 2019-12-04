import React from 'react'
import { writeFileSync, readFileSync, existsSync, copyFileSync } from 'fs'

import { resolve, extname, join } from 'path'
import { mkdir, cp } from 'shelljs'
import { SyncEvents } from './eventbrite.v2'
import { ok } from 'assert'
import { Sitemap, LinkedNode, getFullUrl, runSiteMap, Register } from './sitemap'
import unified from 'unified'
const raw = require('rehype-raw')
import { Node } from 'unist'
const inspect = require('unist-util-inspect')
const { selectAll, select, matches } = require('hast-util-select')
const remove = require('unist-util-remove')
const stringify = require('rehype-stringify')
const toString = require('hast-util-to-string')
import Axios from 'axios'

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
import * as Troubleshooting from './troubleshooting/troubleshooting'
import * as GenericBlogPost from './genericBlogPost'

import * as BiteSized from './biteSized'
import * as BiteSizedV2 from './biteSized.v2'
import * as BiteSized201903 from './bite-sized-articles'
import md5 = require('md5')
import postcss = require('postcss')
import cssnano = require('cssnano')
import { minify } from 'terser'
import { renderToStaticMarkup } from 'react-dom/server'
import { store, getConfig } from './store'
import * as Courses from './courses'
import * as Training2 from './training.v2'
import * as BestPractices from './best-practices/best'
import * as Flipboard from './flipboard'

const isOptimisedBuild = !!process.env.IS_BUILD_OPTIMISED

Courses.Register(store)
Training2.Register(store)
Landing.Register(store)
BestPractices.Register(store)
Careers.Register(store)
TermsAndConditions.Register(store)
Consulting.Register(store)
Homepage.Register(store)
AboutUs.Register(store)
Newsletter.Register(store)
AdvancedKubectl.Register(store)
Academy.Register(store)
ContactUs.Register(store)
ChaosEngineering.Register(store)
Flipboard.Register(store)
ZeroToK8sJs.Register(store)
DeployLaravel.Register(store)
K8sOnWindows.Register(store)
ScalingTensorflow.Register(store)
ScalingSpringBoot.Register(store)
SmallerImages.Register(store)
SolarPlants.Register(store)
SpotInstances.Register(store)
TerraformAks.Register(store)
WhatIsKubernetes.Register(store)
BiteSized201903.Register(store)
RSS.Register(store)
NotFound.Register(store)
Register(store)
Blog.Register(store)
ArchitectingAndScaling.Register(store)
ZeroToK8s.Register(store)
BiteSized.Register(store)
Troubleshooting.Register(store)

class Cheerio {
  constructor(private tree: Node) {}
  public static of(content: string) {
    const tree = unified()
      .use(raw)
      .runSync({
        type: 'root',
        children: [
          { type: 'doctype', name: 'html' },
          { type: 'raw', value: content },
        ],
      })
    return new Cheerio(tree)
  }
  debug() {
    return inspect(this.tree)
  }
  find(selector: string): CheerioSelectionOne {
    return new CheerioSelectionOne(this.tree, selector)
  }
  findAll(selector: string): CheerioSelectionAll {
    return new CheerioSelectionAll(this.tree, selector)
  }
  html() {
    const tree = unified()
      .use(raw)
      .runSync(this.tree)
    return unified()
      .use(stringify)
      .stringify(tree)
  }
}

class CheerioSelectionOne {
  constructor(private tree: Node, private selector: string) {}
  append(node: JSX.Element): Cheerio {
    const element: Node | null = select(this.selector, this.tree)
    if (!!element && Array.isArray(element.children)) {
      ;(element.children as Node[]).push({ type: 'raw', value: renderToStaticMarkup(node) })
    }
    return new Cheerio(this.tree)
  }
  prepend(node: JSX.Element): Cheerio {
    const element: Node | null = select(this.selector, this.tree)
    if (!!element && Array.isArray(element.children)) {
      ;(element.children as Node[]).unshift({ type: 'raw', value: renderToStaticMarkup(node) })
    }
    return new Cheerio(this.tree)
  }
  get(): Node {
    return select(this.selector, this.tree)
  }
}

class CheerioSelectionAll {
  constructor(private tree: Node, private selector: string) {}
  remove(): Cheerio {
    remove(this.tree, { cascade: true }, (node: Node) => matches(this.selector, node))
    return new Cheerio(this.tree)
  }
  forEach(fn: (node: Node, index?: number, array?: Node[]) => void): void {
    const nodes = selectAll(this.selector, this.tree)
    nodes.forEach(fn)
  }
  get(): Node[] {
    return selectAll(this.selector, this.tree)
  }
}

export function run(options: Settings) {
  return function mount(root: Sitemap) {
    renderTree(root, root)

    Landing.Mount({ store })
    Training2.Mount({ store })
    BestPractices.Mount({ store })
    Careers.Mount({ store })
    TermsAndConditions.Mount({ store })
    Consulting.Mount({ store })
    Homepage.Mount({ store })
    AboutUs.Mount({ store })
    Newsletter.Mount({ store })
    Academy.Mount({ store })
    ContactUs.Mount({ store })
    BiteSizedV2.Mount({ store })
    GenericBlogPost.Mount({ store })
    Flipboard.Mount({ store })
    Redirect.Mount({ store })
    RSS.Mount({ store })
    NotFound.Mount({ store })
    Blog.Mount({ store })
    ArchitectingAndScaling.Mount({ store })
    ZeroToK8s.Mount({ store })
    BiteSized.Mount({ store })

    if (!!options.canPublishEvents && !!options.eventBriteToken && !!options.eventBriteOrg) {
      SyncEvents({
        log: console.log,
        sdk: Axios.create({
          baseURL: 'https://www.eventbriteapi.com/v3/',
          headers: { Authorization: `Bearer ${options.eventBriteToken}` },
        }),
        state: store.getState(),
        canPublish: options.canPublishEvents,
      })
    } else {
      console.log('Skipping Eventbrite publishing')
    }
  }

  function renderTree(node: LinkedNode<any>, root: Sitemap) {
    render(node, root, options)
    Object.values(node.children).forEach(it => renderTree(it as any, root))
  }
}

function render(node: LinkedNode<any>, root: Sitemap, { siteUrl }: Settings) {
  const page = node.payload
  const fullUrl = getFullUrl(node)
  function generatePath() {
    const path = `_site${join('/', fullUrl, 'index.html')}`
    mkdir('-p', `_site${join('/', fullUrl)}`)
    return path
  }

  switch (page.type) {
    case Homepage.Details.type: {
      return
    }
    case Training.Details.type: {
      return
    }
    case Academy.Details.type: {
      return
    }
    case ArchitectingAndScaling.Details.type: {
      return
    }
    case ZeroToK8s.Details.type: {
      return
    }
    case Consulting.Details.type: {
      return
    }
    case ContactUs.Details.type: {
      return
    }
    case Careers.Details.type: {
      return
    }
    case TermsAndConditions.Details.type: {
      return
    }
    case AboutUs.Details.type: {
      return
    }
    case Redirect.Type: {
      return
    }
    case Newsletter.Details.type: {
      return
    }
    case Blog.Details.type: {
      return
    }
    case BiteSized.Details.type: {
      return
    }
    case SmallerImages.Details.type: {
      return
    }
    case DeployLaravel.Details.type: {
      return
    }
    case ChaosEngineering.Details.type: {
      return
    }
    case K8sOnWindows.Details.type: {
      return
    }
    case SolarPlants.Details.type: {
      return
    }
    case WhatIsKubernetes.Details.type: {
      return
    }
    case SpotInstances.Details.type: {
      return
    }
    case ScalingTensorflow.Details.type: {
      return
    }
    case ScalingSpringBoot.Details.type: {
      return
    }
    case Landing.Type: {
      return
    }
    case BiteSized201903.MultipleClustersDetails.type: {
      return
    }
    case BiteSized201903.IngressApiGatewayDetails.type: {
      return
    }
    case BiteSized201903.VisualiseYamlDetails.type: {
      return
    }
    case BiteSized201903.HelmDetails.type: {
      return
    }
    case BiteSized201903.SmallOrLargeDetails.type: {
      return
    }
    case BiteSized201903.SecretsDetails.type: {
      return
    }
    case BiteSized201903.AutoscalingDetails.type: {
      return
    }
    case BiteSized201903.RollbacksDetails.type: {
      return
    }
    case NotFound.Details.type: {
      return
    }
    case AdvancedKubectl.Details.type: {
      return
    }
    case TerraformAks.Details.type: {
      return
    }
    case ZeroToK8sJs.Details.type: {
      return
    }
    case BestPractices.Details.type: {
      return
    }
    case RSS.Details.type: {
      return
    }
    default:
      throw new Error('Did not expect to get here')
  }
}

interface Settings {
  siteUrl: string
  eventBriteToken: string
  eventBriteOrg: string
  canPublishEvents: boolean
}

ok(
  process.env.ENVENTBRITE_TOKEN,
  `Missing Oauth token for Eventbrite https://www.eventbrite.com/platform/api#/introduction/authentication`,
)
ok(
  process.env.ENVENTBRITE_ORG,
  `Missing the organization ID for Eventbrite https://www.eventbrite.com/platform/api#/reference/organization/list/list-your-organizations`,
)

run({
  siteUrl: 'https://learnk8s.io',
  eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
  eventBriteOrg: process.env.ENVENTBRITE_ORG as string,
  canPublishEvents: process.env.PUBLISH_EVENTS === 'yes',
})(Sitemap)

writeFileSync('_site/sitemap.xml', runSiteMap(Sitemap, 'https://learnk8s.io'))
copyFileSync('robots.txt', resolve('_site', 'robots.txt'))
copyFileSync('favicon.ico', resolve('_site', 'favicon.ico'))

if (!getConfig(store.getState()).isProduction) {
  writeFileSync('_site/state.json', JSON.stringify(store.getState(), null, 2))
}

function injectGoogleAnalytics({ $, gaId }: { gaId: string; $: Cheerio }): Cheerio {
  $.find('head').append(
    <script
      dangerouslySetInnerHTML={{
        __html: `(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '${gaId}');`,
      }}
    />,
  )
  $.find('body').prepend(
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>,
  )
  return $
}

function optimiseCss({ $ }: { $: Cheerio }): Cheerio {
  const styleTags = $.findAll('style')
  const linkTags = $.findAll('link[rel="stylesheet"]')
  const css: string = [
    ...linkTags.get().map(it => readFileSync((it as any).properties.href, 'utf8')),
    ...styleTags.get().map(it => toString(it)),
  ]
    .filter(onlyUnique)
    .join('\n')
  styleTags.remove()
  linkTags.remove()
  const digestCss = md5(css)
  postcss([cssnano])
    .process(css, { from: 'src/style.css', to: `_site/a/${digestCss}.css` })
    .then(result => {
      writeFileSync(`_site/a/${digestCss}.css`, result)
      if (result.map) {
        writeFileSync(`_site/a/${digestCss}.css.map`, result.map)
      }
    })
  $.find('head').append(<link rel='stylesheet' href={`/a/${digestCss}.css`} />)
  return $
}

function rewriteCss({ $ }: { $: Cheerio }): Cheerio {
  const linkTags = $.findAll('link[rel="stylesheet"]').forEach(link => {
    ;(link.properties as any).href = `/b/${(link.properties as any).href}`
  })
  return $
}

function optimiseJs({ $ }: { $: Cheerio }): Cheerio {
  const scriptTags = $.findAll('script:not([type="application/ld+json"])')
  const externalScripts = scriptTags.get().filter(it => !!(it.properties as any).src)
  const inlineScripts = scriptTags.get().filter(it => !(it.properties as any).src)
  const thirdPartyScripts = externalScripts.filter(it => /^http/.test((it.properties as any).src))
  const includeScripts = externalScripts
    .filter(it => !/^http/.test((it.properties as any).src))
    .map(it => readFileSync((it.properties as any).src, 'utf8'))
  const js: string = [...includeScripts, ...inlineScripts.map(it => toString(it))].filter(onlyUnique).join('\n;')
  scriptTags.remove()
  const digestJs = md5(js)
  const minifiedJs = minify(js)
  if (minifiedJs.error) {
    console.log('ERROR minifying', minifiedJs.error)
  }
  writeFileSync(`_site/a/${digestJs}.js`, minifiedJs.code)
  thirdPartyScripts.forEach(it => {
    $.find('body').append(<script src={(it.properties as any).src} />)
  })
  $.find('body').append(<script src={`/a/${digestJs}.js`} />)
  return $
}

function rewriteJs({ $ }: { $: Cheerio }): Cheerio {
  const scriptTags = $.findAll('script:not([type="application/ld+json"])')
  const externalScripts = scriptTags
    .get()
    .filter(it => !!(it.properties as any).src && !/^http/.test((it.properties as any).src))
  externalScripts.forEach(script => {
    ;(script.properties as any).src = `/b/${(script.properties as any).src}`
  })
  return $
}

function rewriteImages({ $ }: { $: Cheerio }): Cheerio {
  $.findAll('img').forEach(image => {
    const url: string = (image.properties as any).src
    ;(image.properties as any).src = `/b/${url}`
  })
  $.findAll('object').forEach(image => {
    const url: string = (image.properties as any).data
    ;(image.properties as any).data = `/b/${url}`
  })
  $.findAll('script[type="application/ld+json"]').forEach(node => {
    const schema = JSON.parse(toString(node))
    if (schema['@type'] && schema['@type'] === 'BlogPosting' && schema.image) {
      schema.image = `/b/${schema.image}`
    }
    if (schema.publisher && schema.publisher.log && schema.publisher.logo.url) {
      schema.publisher.logo.url = `/b/${schema.publisher.logo.url}`
    }
    if (Array.isArray(schema.hasCourseInstance)) {
      schema.hasCourseInstance.forEach((course: any) => {
        course.image = `/b/${course.image}`
      })
    }
    node.children = [{ type: 'text', value: JSON.stringify(schema) }]
  })
  return $
}

function optimiseImages({ $, siteUrl }: { $: Cheerio; siteUrl: string }): Cheerio {
  $.findAll('img').forEach(image => {
    const url: string = (image.properties as any).src
    ;(image.properties as any).src = digest(url)
  })
  $.findAll('object').forEach(image => {
    const url: string = (image.properties as any).data
    ;(image.properties as any).data = digest(url)
  })
  $.findAll('script[type="application/ld+json"]').forEach(node => {
    const schema = JSON.parse(toString(node))
    if (schema.image) {
      schema.image = `${siteUrl}${digest(schema.image)}`
    }
    if (schema.publisher && schema.publisher.logo && schema.publisher.logo.url) {
      schema.publisher.logo.url = `${siteUrl}${digest(schema.publisher.logo.url)}`
    }
    if (Array.isArray(schema.hasCourseInstance)) {
      schema.hasCourseInstance.forEach((course: any) => {
        course.image = `${siteUrl}${digest(course.image)}`
      })
    }
    node.children = [{ type: 'text', value: JSON.stringify(schema) }]
  })
  return $
}

function digest(url: string) {
  console.log('>>', url)
  ok(existsSync(url), `Asset ${url} doesn't exist.`)
  const digest = md5(readFileSync(url, 'utf8'))
  mkdir('-p', '_site/a')
  cp(url, `_site/a/${digest}${extname(url)}`)
  return `/a/${digest}${extname(url)}`
}

function rewriteFavicons({ $ }: { $: Cheerio }): Cheerio {
  $.findAll('head link[rel="apple-touch-icon"], head link[rel="icon"], head link[rel="mask-icon"]').forEach(link => {
    const href: string = (link.properties as any).href
    ;(link.properties as any).href = `/b/${href}`
  })
  return $
}

function optimiseFavicons({ $ }: { $: Cheerio }): Cheerio {
  $.findAll('head link[rel="apple-touch-icon"], head link[rel="icon"], head link[rel="mask-icon"]').forEach(link => {
    const href: string = (link.properties as any).href
    ;(link.properties as any).href = digest(href)
  })
  return $
}

function rewriteOpenGraphImage({ $ }: { $: Cheerio }): Cheerio {
  const openGraphImage = $.find('[property="og:image"]').get()
  ;(openGraphImage.properties as any).content = `/b/${(openGraphImage.properties as any).content}`
  return $
}

function optimiseOpenGraphImage({ $, siteUrl }: { $: Cheerio; siteUrl: string }): Cheerio {
  const openGraphImage = $.find('[property="og:image"]').get()
  ;(openGraphImage.properties as any).content = `${siteUrl}${digest((openGraphImage.properties as any).content)}`
  return $
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}

function optimise({ $, siteUrl }: { $: Cheerio; siteUrl: string }) {
  isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
  isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
  isOptimisedBuild ? optimiseCss({ $ }) : rewriteCss({ $ })
  isOptimisedBuild ? optimiseJs({ $ }) : rewriteJs({ $ })
  isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
  isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
}
