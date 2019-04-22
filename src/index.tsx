import { h } from './h'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve, extname } from 'path'
import { mkdir, cat, cp } from 'shelljs'
import { syncEvents } from './eventbrite'
import eventbrite from 'eventbrite'
import { ok } from 'assert'
import { Sitemap, LinkedNode, getFullUrl, runSiteMap } from './sitemap'

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

import unified from 'unified'
import { Node } from 'unist'
import md5 = require('md5')
import postcss = require('postcss')
import cssnano = require('cssnano')
import { minify } from 'terser'
const raw = require('rehype-raw')
const stringify = require('rehype-stringify')
const { selectAll, select, matches } = require('hast-util-select')
const remove = require('unist-util-remove')
const inspect = require('unist-util-inspect')
const toString = require('mdast-util-to-string')

const isProduction = process.env.NODE_ENV === 'production'

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
      writeFileSync(generatePath(), `<!DOCTYPE html>${Homepage.render(root, node, siteUrl)}`)
      return
    }
    case Training.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Training.render(root, node, siteUrl)}`)
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
      writeFileSync(generatePath(), `<!DOCTYPE html>${SmallerImages.render(root, node, siteUrl)}`)
      return
    }
    case DeployLaravel.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${DeployLaravel.render(root, node, siteUrl)}`)
      return
    }
    case ChaosEngineering.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ChaosEngineering.render(root, node, siteUrl)}`)
      return
    }
    case K8sOnWindows.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${K8sOnWindows.render(root, node, siteUrl)}`)
      return
    }
    case SolarPlants.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${SolarPlants.render(root, node, siteUrl)}`)
      return
    }
    case WhatIsKubernetes.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${WhatIsKubernetes.render(root, node, siteUrl)}`)
      return
    }
    case SpotInstances.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${SpotInstances.render(root, node, siteUrl)}`)
      return
    }
    case ScalingTensorflow.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ScalingTensorflow.render(root, node, siteUrl)}`)
      return
    }
    case ScalingSpringBoot.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ScalingSpringBoot.render(root, node, siteUrl)}`)
      return
    }
    case Landing.Type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Landing.render(root, node, siteUrl)}`)
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
      const tree = unified()
        .use(raw)
        .runSync(AdvancedKubectl.render(root, node, siteUrl))

      isProduction ? optimiseImages({ tree }) : rewriteImages({ tree })
      optimiseCss({ tree })
      optimiseJs({ tree })
      injectGoogleAnalytics({ tree, gaId: 'GTM-5WCKPRL' })
      rewriteFavicons({ tree })
      rewriteOpenGraphImage({ tree, siteUrl })

      writeFileSync(
        generatePath(),
        `<!DOCTYPE html>${unified()
          .use(stringify)
          .stringify(tree)}`,
      )
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
  canPublishEvents: isProduction,
})(Sitemap)

writeFileSync('_site/sitemap.xml', runSiteMap(Sitemap, 'https://learnk8s.io'))

function injectGoogleAnalytics({ tree, gaId }: { gaId: string; tree: Node }): Node {
  select('head', tree).children.push(
    <script>{`(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '${gaId}');`}</script>,
  )
  select('body', tree).children.unshift(
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>,
  )
  return tree
}

function optimiseCss({ tree }: { tree: Node }): Node {
  const styleTags: Node[] = selectAll('style', tree)
  const linkTags: Node[] = selectAll('link[rel=stylesheet]', tree)
  tree = remove(tree, { cascade: true }, (node: Node) => {
    return matches('style', node) || matches('link[rel=stylesheet]', node)
  })
  const css = [
    ...linkTags.map(it => readFileSync((it as any).properties.href, 'utf8')),
    ...styleTags.map(it => toString(it)),
  ]
  const digestCss = md5(css.join('\n'))
  postcss([cssnano])
    .process(css.join('\n'), { from: 'src/style.css', to: `_site/a/${digestCss}.css` })
    .then(result => {
      writeFileSync(`_site/a/${digestCss}.css`, result)
      if (result.map) {
        writeFileSync(`_site/a/${digestCss}.css.map`, result.map)
      }
    })
  select('head', tree).children.push(<link rel='stylesheet' href={`/a/${digestCss}.css`} />)
  return tree
}

function optimiseJs({ tree }: { tree: Node }): Node {
  const scriptTags: Node[] = selectAll('script:not([type="application/ld+json"])', tree)
  tree = remove(tree, { cascade: true }, (node: Node) => {
    return matches('script:not([type="application/ld+json"])', node)
  })
  const js = scriptTags.map(it => toString(it))
  const digestJs = md5(js.join('\n;'))
  const minifiedJs = minify(js)
  if (minifiedJs.error) {
    console.log('ERROR minifying', minifiedJs.error)
  }
  writeFileSync(`_site/a/${digestJs}.js`, minifiedJs.code)
  select('body', tree).children.push(<script src={`/a/${digestJs}.js`} />)
  return tree
}

function rewriteImages({ tree }: { tree: Node }) {
  selectAll('img', tree).forEach((image: any) => {
    const url = image.properties.src
    image.properties.src = `/b/${url}`
  })
  return tree
}

function optimiseImages({ tree }: { tree: Node }) {
  selectAll('img', tree).forEach((image: any) => {
    const url = image.properties.src
    const digest = md5(cat(url).toString())
    mkdir('-p', '_site/a')
    ok(existsSync(url), `Image ${url} doesn't exist.`)
    cp(url, `_site/a/${digest}${extname(image.url)}`)
    image.properties.src = `/a/${digest}${extname(image.url)}`
  })
  return tree
}

function rewriteFavicons({ tree }: { tree: Node }): Node {
  selectAll('head link[rel="apple-touch-icon"], head link[rel="icon"], head link[rel="mask-icon"]', tree).forEach(
    (link: any) => {
      const href = link.properties.href
      link.properties.href = `/b/${href}`
    },
  )
  return tree
}

function rewriteOpenGraphImage({ tree, siteUrl }: { tree: Node; siteUrl: string }): Node {
  const openGraphImage = select('[property="og:image"]', tree)
  openGraphImage.properties.content = `/b/${openGraphImage.properties.content}`
  return tree
}
