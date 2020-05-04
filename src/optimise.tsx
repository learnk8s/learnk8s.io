import hastParser from 'hast-util-raw'
import { Node } from 'unist'
import inspect from 'unist-util-inspect'
import { selectAll, select, matches } from 'hast-util-select'
import * as Unist$ from 'unist-util-select'
import remove from 'unist-util-remove'
import toHtml from 'hast-util-to-html'
import { ok } from 'assert'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import md5 from 'md5'
import * as Hast from 'hast'

import { extname, join, resolve, basename, dirname } from 'path'
import { mkdir, cp } from 'shelljs'
import { minify } from 'terser'
import postcss from 'postcss'
import cssnano from 'cssnano'
import purgecss from '@fullhuman/postcss-purgecss'
import toString from 'hast-util-to-string'
import React from 'react'
import { jsxToString, jsxToHast } from './jsx-utils/jsxToHast'
import srcset from 'srcset'
export async function defaultAssetsPipeline({
  jsx,
  isOptimisedBuild,
  siteUrl,
  url,
  outputFolder,
}: {
  jsx: JSX.Element
  isOptimisedBuild: boolean
  siteUrl: string
  outputFolder: string
  url: string
}) {
  const $ = Cheerio.of(jsxToString(jsx))
  await optimise({ $, siteUrl: siteUrl, isOptimisedBuild: true })

  $.findAll('a')
    .get()
    .filter((it: any) => /\.(zip|pdf|png)$/i.test(it.properties.href) && !it.properties.href.startsWith('http'))
    .forEach((it: any) => {
      cp(resolve(it.properties.href), `_site/a`)
      it.properties.href = `/a/${basename(it.properties.href)}`
      it.properties['target'] = '_blank'
    })

  writeFileSync(generatePath(url), $.html())

  function generatePath(url: string) {
    const path = `${outputFolder}${join('/', `${url === '/' ? 'index' : url}.html`)}`
    mkdir('-p', dirname(path))
    return path
  }
}

export function RSSPipeline({
  content,
  url,
  outputFolder,
  siteUrl,
  isOptimisedBuild,
}: {
  content: string
  outputFolder: string
  url: string
  siteUrl: string
  isOptimisedBuild: boolean
}) {
  const finalContent = (content.match(/enclosure\surl="([^"]*)"/gim) || [])
    .filter(onlyUnique)
    .map(it => it.slice(15).slice(0, -1))
    .reduce((content, image) => {
      return content.replace(image, isOptimisedBuild ? `${siteUrl}${digest(image)}` : `/b/${image}`)
    }, content)
  writeFileSync(generatePath(url), finalContent)

  function generatePath(url: string) {
    const path = `${outputFolder}${join('/', url)}`
    mkdir('-p', `${outputFolder}${join('/', dirname(url))}`)
    return path
  }
}

export class Cheerio {
  constructor(private tree: Hast.Root) {}
  public static of(content: string) {
    const tree = hastParser({
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
  findAllNodes(selector: string): Node[] {
    return Unist$.selectAll(selector, this.tree)
  }
  html() {
    return toHtml(this.tree, { allowDangerousHTML: true })
  }
}

class CheerioSelectionOne {
  constructor(private tree: Hast.Root, private selector: string) {}
  append(node: JSX.Element): Cheerio {
    const element: Node | null = select(this.selector, this.tree)
    if (!!element && Array.isArray(element.children)) {
      const nodeOrNodes = jsxToHast(node)
      const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes]
      nodes.forEach(it => (element.children as Node[]).push(it))
    }
    return new Cheerio(this.tree)
  }
  prepend(node: JSX.Element): Cheerio {
    const element: Node | null = select(this.selector, this.tree)
    if (!!element && Array.isArray(element.children)) {
      const nodeOrNodes = jsxToHast(node)
      const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes]
      nodes.forEach(it => (element.children as Node[]).unshift(it))
    }
    return new Cheerio(this.tree)
  }
  get(): Node | null {
    return select(this.selector, this.tree)
  }
}

class CheerioSelectionAll {
  constructor(private tree: Hast.Root, private selector: string) {}
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

async function optimise({ $, siteUrl, isOptimisedBuild }: { $: Cheerio; siteUrl: string; isOptimisedBuild: boolean }) {
  try {
    isOptimisedBuild ? optimiseImages({ $, siteUrl }) : rewriteImages({ $ })
    isOptimisedBuild ? await optimiseCss({ $ }) : rewriteCss({ $ })
    isOptimisedBuild ? optimiseJs({ $ }) : rewriteJs({ $ })
    isOptimisedBuild ? optimiseFavicons({ $ }) : rewriteFavicons({ $ })
    isOptimisedBuild ? optimiseOpenGraphImage({ $, siteUrl }) : rewriteOpenGraphImage({ $ })
    optimiseLazy({ $ })
    isOptimisedBuild ? injectGoogleAnalytics({ $, gaId: 'GTM-5WCKPRL' }) : null
  } catch (error) {
    console.log(error)
  }
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

async function optimiseCss({ $ }: { $: Cheerio }): Promise<Cheerio> {
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
  const result = await postcss([
    purgecss({
      content: [{ raw: $ as any, extension: 'hast' }],
      extractors: [
        {
          extractor: (content: any): any => {
            const $ = content as Cheerio
            const attributes = { names: [] as string[], values: [] as string[] }
            const classes = $.findAll('[class]')
              .get()
              .reduce((acc, it) => {
                return acc.concat((it.properties as any).className as string[])
              }, [] as string[])
            const tags = $.findAllNodes('[type="element"]').map(it => it.tagName as string)
            const ids = $.findAll('[id]')
              .get()
              .reduce((acc, it) => {
                return acc.concat((it.properties as any).id as string[])
              }, [] as string[])
            $.findAll('input').forEach(element => {
              attributes.names.push('type')
              attributes.values.push((element.properties as any).type as string)
            })
            return { classes, ids, tags, attributes, undetermined: [] } as any
          },
          extensions: ['hast'],
        },
      ],
    }) as any,
    cssnano,
  ]).process(css, { from: 'src/style.css', to: `_site/a/${digestCss}.css` })
  $.find('head').append(<style dangerouslySetInnerHTML={{ __html: result.content }}></style>)
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
  if (js === '') {
    return $
  }
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
    const srcSets: string[] | undefined = (image.properties as any).srcSet
    if (srcSets) {
      ;(image.properties as any).srcSet = srcSets.map(it => `/b/${it}`)
    }
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
    const srcSets: string[] | undefined = (image.properties as any).srcSet
    if (srcSets) {
      ;(image.properties as any).srcSet = srcSets
        .map(it => srcset.parse(it))
        .map(it => {
          return it.map(sset => {
            return {
              ...sset,
              url: digest(sset.url),
            }
          })
        })
        .reduce((digestedSrcSets: string[], it) => {
          return [...digestedSrcSets, srcset.stringify(it)]
        }, [])
    }
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
  if (!openGraphImage) {
    return $
  }
  ;(openGraphImage.properties as any).content = `/b/${(openGraphImage.properties as any).content}`
  return $
}

function optimiseOpenGraphImage({ $, siteUrl }: { $: Cheerio; siteUrl: string }): Cheerio {
  const openGraphImage = $.find('[property="og:image"]').get()
  if (!openGraphImage) {
    return $
  }
  ;(openGraphImage.properties as any).content = `${siteUrl}${digest((openGraphImage.properties as any).content)}`
  return $
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}

function optimiseLazy({ $ }: { $: Cheerio }): Cheerio {
  $.findAll('.lazy-article img').forEach((image, index) => {
    if (index === 0) {
      return
    }
    ;(image.properties as any).loading = 'lazy'
  })
  return $
}
