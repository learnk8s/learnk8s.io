import React from 'react'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve, extname } from 'path'
import { mkdir, cp } from 'shelljs'
import { syncEvents } from './eventbrite'
import eventbrite from 'eventbrite'
import { ok } from 'assert'
import { Sitemap, LinkedNode, getFullUrl, runSiteMap } from './sitemap'
import unified from 'unified'
const raw = require('rehype-raw')
import { Node } from 'unist'
const inspect = require('unist-util-inspect')
const { selectAll, select, matches } = require('hast-util-select')
const remove = require('unist-util-remove')
const stringify = require('rehype-stringify')
const toString = require('mdast-util-to-string')

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
import md5 = require('md5')
import postcss = require('postcss')
import cssnano = require('cssnano')
import { minify } from 'terser'
import { renderToStaticMarkup } from 'react-dom/server'
import { array } from 'prop-types';

const isOptimisedBuild = !!process.env.IS_BUILD_OPTIMISED

class Cheerio {
  constructor(private tree: Node) {}
  public static of(content: string) {
    const tree = unified()
      .use(raw)
      .runSync({ type: 'root', children: [{ type: 'doctype', name: 'html' }, { type: 'raw', value: content }] })
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
    if (!!options.canPublishEvents && !!options.eventBriteToken && !!options.eventBriteOrg) {
      syncEvents(
        console.log,
        eventbrite({ token: options.eventBriteToken }),
        options.eventBriteOrg,
        options.canPublishEvents,
      )
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
    const path = `_site${resolve('.', fullUrl, 'index.html')}`
    mkdir('-p', `_site${resolve('.', fullUrl)}`)
    return path
  }

  switch (page.type) {
    case Homepage.Details.type: {
      const $ = Cheerio.of(Homepage.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case Training.Details.type: {
      const $ = Cheerio.of(Training.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case Academy.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Academy.render(root, node, siteUrl)}`)
      return
    }
    case Consulting.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Consulting.render(root, node, siteUrl)}`)
      return
    }
    case ContactUs.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ContactUs.render(root, node, siteUrl)}`)
      return
    }
    case Careers.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Careers.render(root, node, siteUrl)}`)
      return
    }
    case TermsAndConditions.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${TermsAndConditions.render(root, node, siteUrl)}`)
      return
    }
    case AboutUs.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${AboutUs.render(root, node, siteUrl)}`)
      return
    }
    case Redirect.Type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Redirect.render(root, node, siteUrl)}`)
      return
    }
    case Newsletter.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Newsletter.render(root, node, siteUrl)}`)
      return
    }
    case Blog.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Blog.render(root, node, siteUrl)}`)
      return
    }
    case BiteSized.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${BiteSized.render(root, node, siteUrl)}`)
      return
    }
    case SmallerImages.Details.type: {
      const $ = Cheerio.of(SmallerImages.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case DeployLaravel.Details.type: {
      const $ = Cheerio.of(DeployLaravel.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case ChaosEngineering.Details.type: {
      const $ = Cheerio.of(ChaosEngineering.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case K8sOnWindows.Details.type: {
      const $ = Cheerio.of(K8sOnWindows.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case SolarPlants.Details.type: {
      const $ = Cheerio.of(SolarPlants.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case WhatIsKubernetes.Details.type: {
      const $ = Cheerio.of(WhatIsKubernetes.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case SpotInstances.Details.type: {
      const $ = Cheerio.of(SpotInstances.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case ScalingTensorflow.Details.type: {
      const $ = Cheerio.of(ScalingTensorflow.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case ScalingSpringBoot.Details.type: {
      const $ = Cheerio.of(ScalingSpringBoot.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case Landing.Type: {
      const $ = Cheerio.of(Landing.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case BiteSized201903.MultipleClustersDetails.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${BiteSized201903.MultipleClustersRender(root, node, siteUrl)}`)
      return
    }
    case BiteSized201903.IngressApiGatewayDetails.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${BiteSized201903.IngressApiGatewayRender(root, node, siteUrl)}`)
      return
    }
    case BiteSized201903.VisualiseYamlDetails.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${BiteSized201903.VisualiseYamlRender(root, node, siteUrl)}`)
      return
    }
    case BiteSized201903.HelmDetails.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${BiteSized201903.HelmRender(root, node, siteUrl)}`)
      return
    }
    case NotFound.Details.type: {
      writeFileSync(`_site/404.html`, `<!DOCTYPE html>${NotFound.render(root, node, siteUrl)}`)
      return
    }
    case AdvancedKubectl.Details.type: {
      const $ = Cheerio.of(AdvancedKubectl.render(root, node, siteUrl))
      isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
      isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
      optimiseCss({ $ })
      optimiseJs({ $ })
      isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
      isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
      writeFileSync(generatePath(), $.html())
      return
    }
    case WebAppManifest.Details.type: {
      writeFileSync(`_site${WebAppManifest.Details.url}`, WebAppManifest.render(root, node, siteUrl))
      return
    }
    case BrowserConfig.Details.type: {
      writeFileSync(`_site${BrowserConfig.Details.url}`, BrowserConfig.render(root, node, siteUrl))
      return
    }
    case RSS.Details.type: {
      writeFileSync(`_site${RSS.Details.url}`, RSS.render(root, node, siteUrl))
      return
    }
    default:
      assertUnreachable(page)
  }
}

function assertUnreachable(x: any): any {
  throw new Error('Did not expect to get here')
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
  canPublishEvents: process.env.NODE_ENV === 'production',
})(Sitemap)

writeFileSync('_site/sitemap.xml', runSiteMap(Sitemap, 'https://learnk8s.io'))

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
  ].filter(onlyUnique).join('\n')
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

function optimiseJs({ $ }: { $: Cheerio }): Cheerio {
  const scriptTags = $.findAll('script:not([type="application/ld+json"])')
  const externalScripts = scriptTags.get().filter(it => !!(it.properties as any).src)
  const inlineScripts = scriptTags.get().filter(it => !(it.properties as any).src)
  const thirdPartyScripts = externalScripts.filter(it => /^http/.test((it.properties as any).src))
  const includeScripts = externalScripts.filter(it => !/^http/.test((it.properties as any).src)).map(it => readFileSync((it.properties as any).src, 'utf8'))
  const js: string = [...includeScripts, ...inlineScripts.map(it => toString(it)),].filter(onlyUnique).join('\n;')
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

function rewriteImages({ $ }: { $: Cheerio }): Cheerio {
  $.findAll('img').forEach(image => {
    const url: string = (image.properties as any).src
    ;(image.properties as any).src = `/b/${url}`
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
  $.findAll('script[type="application/ld+json"]').forEach(node => {
    const schema = JSON.parse(toString(node))
    if (schema['@type'] && schema['@type'] === 'BlogPosting' && schema.image) {
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