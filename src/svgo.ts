import { ls, cat, exit } from 'shelljs'
import SVGO from 'svgo'
import cheerio from 'cheerio'
import { writeFileSync } from 'fs'
const hastParser = require('hast-util-raw')
const inspect = require('unist-util-inspect')
const remove = require('unist-util-remove')
const toHtml = require('hast-util-to-html')
const utilSelect = require('hast-util-select')
const selectAll = utilSelect.selectAll
const select = utilSelect.select
const matches = utilSelect.matches
const jsxHast = require('./jsx-utils/jsxToHast')
const jsxToHast = jsxHast.jsxToHast
import Unist, { Node } from 'unist'

export interface Element extends Unist.Node {
  type: string
  tagName: string
  properties: Record<string, unknown>
  content?: Root
  children: Array<Element | Comment | Text | Raw>
}

export interface Parent extends Unist.Parent {
  children: Array<Element | Doctype | Comment | Text | Raw>
}

export interface Literal extends Unist.Literal {
  value: string
}

export interface Root extends Parent {
  type: 'root'
}

export interface Comment extends Literal {
  type: 'comment'
}

export interface Text extends Literal {
  type: 'text'
}

export interface Raw extends Literal {
  type: 'raw'
}

export interface Doctype extends Unist.Node {
  type: 'doctype'
  name: string
  public?: string
  system?: string
}

export interface Raw extends Literal {
  type: 'raw'
}

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
      removeHiddenElems: true,
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
      convertTransform: true,
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
      removeStyleElement: false,
    },
    {
      removeScriptElement: false,
    },
  ],
})

class Cheerio {
  constructor(private tree: Root) {}
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
  html() {
    return toHtml(this.tree, { allowDangerousHTML: true })
  }
}

class CheerioSelectionOne {
  constructor(private tree: Root, private selector: string) {}
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
  constructor(private tree: Root, private selector: string) {}
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

function optimise(svgContent: string, skipIds = [] as string[]): Promise<string> {
  return svgo.optimize(svgContent).then(svgo => {
    console.log(svgo.data)
    const $ = cheerio.load(svgo.data, { decodeEntities: false })
    $('[fill]').each((index, element) => {
      const fill = $(element).attr('fill')
      if (fill.startsWith('url(#')) {
        skipIds.push(fill.substring(5, fill.length - 1))
      }
    })
    $('[id]').each((i, element) => {
      const id = $(element).attr('id')
      if (skipIds.includes(id)) {
        return
      }
      $(element).attr('id', null)
    })
    $('svg').attr('width', null)
    $('svg').attr('height', null)
    $('[font-family]').each((index, element) => {
      $(element).attr('font-family', 'sans-serif')
    })

    console.log($('body').html())
    return $('body').html() || ''
  })
}

// function optimise2(svgContent: string, skipIds = [] as string[]): Promise<string> {
//   return svgo.optimize(svgContent).then(svgo => {
//     console.log(svgo)

//     const $ = Cheerio.of(svgo.data)

//     console.log($.findAll('[fill]'))

//     return ''
//   })
// }

const files = ls([
  // 'assets/academy/*.svg',
  // 'assets/consulting/*.svg',
  // 'assets/material/*.svg',
  // 'assets/training/*.svg',
  // 'assets/contact-us/*.svg',
  // 'src/advancedKubectl/*.svg',
  'assets/academy/academy.svg',
]).map(svgFileName => {
  const svgContent = cat(svgFileName).toString()
  return optimise(svgContent).then(it => writeFileSync(svgFileName, it))
})

Promise.all(files).then(() => exit(0))
