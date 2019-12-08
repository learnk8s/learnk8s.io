import SVGO from 'svgo'
import unified from 'unified'
const raw = require('rehype-raw')
const { selectAll, select, matches } = require('hast-util-select')
const remove = require('unist-util-remove')
const inspect = require('unist-util-inspect')
const toString = require('hast-util-to-string')
import { Node } from 'unist'
import { renderToStaticMarkup } from 'react-dom/server'
const stringify = require('rehype-stringify')
import * as React from 'react'

const svgo = new SVGO({
  plugins: [
    {
      removeDimensions: true,
    },
    {
      cleanupAttrs: true,
    },
    {
      removeAttrs: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: false, // animations have hidden elements
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: false, // breaks animations
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: false,
    },
    {
      cleanupNumericValues: true,
    },
    {
      cleanupListOfValues: true,
    },
    {
      collapseGroups: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      minifyStyles: false,
    },
    {
      moveGroupAttrsToElems: false,
    },
    {
      moveElemsAttrsToGroup: false,
    },
  ],
})

export async function optimise(svgContent: string, skipIds = [] as string[]): Promise<string> {
  const $ = Cheerio.of((await svgo.optimize(svgContent)).data)

  $.findAll('[fill]').forEach((element: any) => {
    const fill = element.properties.fill
    if (fill.startsWith('url(#')) {
      skipIds.push(fill.substring(5, fill.length - 1))
    }
  })

  $.findAll('use').forEach((element: any) => {
    const xLinkHref = element.properties.xLinkHref
    if (xLinkHref && xLinkHref.startsWith('#')) {
      skipIds.push(xLinkHref.slice(1))
    }
  })

  $.findAll('[id]').forEach((element: any) => {
    const id = element.properties.id
    if (skipIds.some(it => id.startsWith(it))) {
      return
    }
    delete element.properties.id
  })
  ;($.find('svg').get() as any).properties.width = null
  ;($.find('svg').get() as any).properties.height = null

  $.findAll('[font-family]').forEach((element: any) => {
    element.properties['class'] = 'sans-serif'
    element.properties.fontFamily = null
    $.find('svg').prepend(
      <style
        dangerouslySetInnerHTML={{
          __html: `.sans-serif{font-family:-apple-system,BlinkMacSystemFont,'avenir next', avenir,'helvetica neue',helvetica,ubuntu,roboto,noto,'segoe ui',arial,sans-serif}`,
        }}
      />,
    )
  })

  $.findAll('script').forEach((element: any) => {
    element.children = [{ type: 'text', value: `<![CDATA[${toString(element)}]]>` }]
  })

  const styleTags = $.findAll('style')
  const style = styleTags
    .get()
    .map(it => toString(it))
    .filter(onlyUnique)
    .join('')
  styleTags.remove()
  if (style.length > 0) {
    $.find('svg').prepend(<style dangerouslySetInnerHTML={{ __html: style }} />)
  }

  return $.html()
}

class Cheerio {
  constructor(private tree: Node) {}
  public static of(content: string) {
    const tree = unified()
      .use(raw)
      .runSync({ type: 'root', children: [{ type: 'raw', value: content }] })
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

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}
