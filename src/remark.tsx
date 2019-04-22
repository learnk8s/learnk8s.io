import unified from 'unified'
import { Node } from 'unist'
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const raw = require('rehype-raw')
import Prism from 'prismjs'
const map = require('unist-util-map')
import cheerio from 'cheerio'
import { h } from './h'
const all: all = require('mdast-util-to-hast/lib/all')
const one: one = require('mdast-util-to-hast/lib/one')
const { selectAll, select } = require('unist-util-select')
import { readFileSync } from 'fs'
import { AsciiCast, Image } from './assets'
import { dirname } from 'path'
const remove = require('unist-util-remove')
const toString = require('mdast-util-to-string')
const H: Hastscript = require('hastscript')
const inspect = require('unist-util-inspect')

interface Hastscript {
  (selector: string): Node
  (selector: string, properties: {}): Node
  (selector: string, children: Node[]): Node
  (selector: string, properties: {}, children: Node[]): Node
}

const prismSolarizedCss = readFileSync('src/prism-solarizedlight.css', 'utf8')
const prismOkaidiadCss = readFileSync('src/prism-okaidia.css', 'utf8')
require('prismjs/components/')()

export function parse(content: string): Node {
  const tree = unified()
    .use(markdown, { commonmark: true })
    .parse(content)

  return unified()
    .use(() => {
      return (tree, file) => {
        return map(tree, (node: Node, parent: Node) => {
          if (isCode(node)) {
            switch (node.lang) {
              case 'slideshow': {
                const { slides, description } = JSON.parse(node.value) as {
                  description: string
                  slides: { image: string; description: string }[]
                }
                return {
                  type: 'slideshow',
                  children: (unified()
                    .use(markdown, { commonmark: true })
                    .parse(description) as any).children.concat(
                    slides.map(it => {
                      return {
                        type: 'slide',
                        children: [
                          {
                            type: 'image',
                            url: it.image,
                          },
                        ].concat(
                          (unified()
                            .use(markdown)
                            .parse(it.description) as any).children,
                        ),
                      }
                    }),
                  ),
                }
              }
              case 'include': {
                const $ = cheerio.load(node.value, { decodeEntities: false })
                return {
                  type: 'include',
                  children: [
                    {
                      type: 'html',
                      value: $('template').html() || '',
                    },
                    {
                      type: 'style',
                      value: $('style').html() || '',
                    },
                    {
                      type: 'script',
                      value: $('script').html() || '',
                    },
                  ],
                }
              }
              default: {
                const { lang } = extractCodeFences(node.lang, [])
                switch (lang) {
                  case 'terminal': {
                    const { command, title } = extractCodeFences(node.lang, ['command', 'title'])
                    return {
                      type: 'terminal',
                      value: node.value,
                      command,
                      title,
                    }
                  }
                  default: {
                    const { title, highlight } = extractCodeFences(node.lang, ['highlight', 'title'])
                    return { ...node, data: { ...node.data, title, highlight }, lang }
                  }
                }
              }
            }
          }
          return node
        })
      }
    })
    .runSync(tree)
}

export function render(path: string): { html: JSX.Element; css: string[]; js: string[] } {
  const assetsPath = dirname(path)
  const content = readFileSync(path, 'utf8')

  const hastParser = unified()
    .use(remark2rehype, {
      allowDangerousHTML: true,
      handlers: {
        heading: (h: h, node: Mdast.Heading): Node => {
          switch (node.depth) {
            case 1:
              return H(`h${node.depth}.f${node.depth}.pt5#${toId(toString(node))}`, all(h, node))
            case 2:
              return H(`h${node.depth}.f${node.depth}.pt4.pb2#${toId(toString(node))}`, all(h, node))
            case 3:
              return H(`h${node.depth}.f${node.depth}.pt3#${toId(toString(node))}`, all(h, node))
            default:
              return H(`h${node.depth}.f${node.depth}#${toId(toString(node))}`, all(h, node))
          }
          function toId(raw: string): string {
            return raw.toLowerCase().replace(/[^\w]+/g, '-')
          }
        },
        slideshow: (h: h, node: Mdast.Slideshow): Node => {
          return H('div.slideshow-js.overflow-hidden', [
            H(
              'ul.pl0.list.slider-js',
              selectAll('slide', node)
                .map((it: Mdast.Slide, index: number, slides: Mdast.Slide[]) => {
                  const img: Node = select('slide image', it)
                  const rest: Node[] = selectAll('slide > :not(image)', it)
                  const imageNode = one(h, { ...img, alt: toString(it) })
                  delete (imageNode as any).properties.className
                  return H('li.mv3', [
                    imageNode,
                    H('div.bt.b-solid.bw2.b--black-70.relative.mt3', [
                      H('div.bg-black-10.br1.pa1.dib.mt2.absolute.bottom-1.left-0', [
                        H('span.b.black-60', [{ type: 'text', value: `${index + 1}` }]),
                        H('span.f7.black-50', [{ type: 'text', value: `/${slides.length}` }]),
                      ]),
                    ]),
                    H('div.navigation-js.flex.items-start.justify-between.bg-evian ph2', [
                      H(
                        'div.f5.lh-copy.black-90.w-60.center',
                        rest.map(it => {
                          if (it.type === 'paragraph') {
                            return H('p.lh-copy.measure-wide.f5', all(h, it))
                          }
                          return one(h, it)
                        }),
                      ),
                    ]),
                  ])
                })
                .concat([
                  H('style', [
                    {
                      type: 'text',
                      value: `.pagination-icon {
                        stroke: currentColor;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: .125rem;
                        display: inline-block;
                        width: 0.4rem;
                      }`,
                    },
                  ]),
                  H('script', [{ type: 'text', value: `(${Slideshow.toString()})()` }]),
                ]),
            ),
          ])
        },
        paragraph: (h: h, node: Mdast.Paragraph): Node => {
          if (node.children[0].type === 'image') {
            return one(h, node.children[0])
          }
          return H('p.lh-copy.measure-wide.f4', all(h, node))
        },
        blockquote: (h: h, node: Node): Node => {
          return H('blockquote.pl3.mh2.bl.bw2.b--blue.bg-evian.pv1.ph4', all(h, node))
        },
        strong: (h: h, node: Node): Node => {
          return H('strong.b', all(h, node))
        },
        emphasis: (h: h, node: Node): Node => {
          return H('em.i', all(h, node))
        },
        link: (h: h, node: Mdast.Link): Node => {
          const isLocal = !/^http/.test(node.url)
          const attrs = {
            className: !!node.title
              ? [
                  'link',
                  'dib',
                  'white',
                  'bg-blue',
                  'br1',
                  'pv2',
                  'ph3',
                  'b',
                  'f5',
                  'br2',
                  'mv3',
                  'hover-bg-dark-blue pointer',
                ]
              : ['link', 'navy', 'underline', 'hover-sky'],
            href: node.url,
          }
          if (isLocal) {
            Object.assign(attrs, { target: '_self' })
          } else {
            Object.assign(attrs, { target: '_blank', rel: 'noreferrer' })
          }
          return h(node, 'a', attrs, all(h, node))
        },
        list: (h: h, node: Mdast.List): Node => {
          return H(node.ordered ? 'ol' : 'ul', all(h, node))
        },
        listItem: (h: h, node: Mdast.ListItem): Node => {
          return H(
            'li.lh-copy.f4.mv1.measure-wide',
            node.children.reduce(
              (acc, it) => {
                if (it.type === 'paragraph') {
                  return acc.concat((it.children as Node[]).map(it => one(h, it)))
                }
                return acc.concat(one(h, it))
              },
              [] as Node[],
            ),
          )
        },
        table: (h: h, node: Mdast.Table): Node => {
          const [firstRow, ...restRows] = node.children
          return H('table.table.w-100.f4.mv3.mv5-l', [
            H('thead', [
              H(
                'tr',
                firstRow.children.map((it, index) => {
                  return h(
                    null,
                    'th',
                    { className: 'bg-near-white pa2 ba bw2 b--white '.concat(alignClass((node.align || [])[index])) },
                    all(h, it),
                  )
                }),
              ),
            ]),
            H(
              'tbody.lh-copy',
              restRows.map(row => {
                return H(
                  'tr',
                  row.children.map((it, index) => {
                    return h(
                      null,
                      'td',
                      { className: 'bb bw1 b--black-50 pa3 '.concat(alignClass((node.align || [])[index])) },
                      all(h, it),
                    )
                  }),
                )
              }),
            ),
          ])

          function alignClass(align: string): string {
            switch (align) {
              case 'center':
                return 'tc'
              case 'left':
                return 'tl bg-washed-yellow'
              case 'right':
                return 'tr'
              default:
                return ''
            }
          }
        },
        code: (h: h, node: Mdast.Code): Node => {
          const codeAsLines = node.value.split('\n')
          const groupedCode = groupHighlightedCode(
            node.data && (node.data.highlight as string | undefined),
            codeAsLines.length,
          )
          const codeBlocks = groupedCode.map(([groupType, lines], index, array) => {
            const start = lines[0]
            const end = lines[lines.length - 1]
            const isLastLine = index + 1 === array.length
            const currentBlock = `${codeAsLines.slice(start - 1, end).join('\n')}${isLastLine ? '' : '\n'}`
            switch (groupType) {
              case Group.HIGHLIGHT:
                return H('span.highlight', [
                  {
                    type: 'raw',
                    value: !!node.lang ? Prism.highlight(currentBlock, Prism.languages[node.lang]) : currentBlock,
                  },
                ])
              case Group.STANDARD:
                return H('span.standard', [
                  {
                    type: 'raw',
                    value: !!node.lang ? Prism.highlight(currentBlock, Prism.languages[node.lang]) : currentBlock,
                  },
                ])
            }
          })
          return H('div.mv4.mv5-l', [
            H(
              'header.bg-light-gray.flex.pv2.pl1 br--top.br2.relative',
              [
                H('div.w1.h1.ml1.br-100.bg-dark-red'),
                H('div.w1.h1.ml1.br-100.bg-green'),
                H('div.w1.h1.ml1.br-100.bg-yellow'),
              ].concat(
                node.data && node.data.title
                  ? H('p.code.f6.mv0.black-60.w-100.tc.absolute.top-0.left-0.h1.pv2', [
                      { type: 'text', value: node.data.title },
                    ])
                  : [],
              ),
            ),
            H('pre.code-light-theme.relative.pv4.overflow-auto.mv0.br2.br--bottom', [
              H('code.code.lh-copy', codeBlocks),
            ]),
            H('style', [{ type: 'text', value: prismSolarizedCss }]),
          ])
        },
        inlineCode: (h: h, node: Mdast.Code): Node => {
          return H('code.code.f5.lh-copy.bg-near-white.br2.pv1.ph2.fs-normal', [{ type: 'text', value: node.value }])
        },
        include: (h: h, node: Mdast.Include): Node => {
          const html = select('html', node)
          const css = select('style', node)
          const js = select('script', node)
          return H('div.mv4.mv5-l', [
            { type: 'raw', value: html.value },
            H('style', {}, [{ type: 'text', value: css.value }]),
            H('script', {}, [{ type: 'text', value: js.value }]),
          ])
        },
        image: (h: h, node: Mdast.Image): Node => {
          const props = {} as any
          if (node.title !== null && node.title !== undefined) {
            props.title = node.title
          }
          if (/\.cast$/gi.test(node.url)) {
            const asciiCast = AsciiCast({ castPath: `${assetsPath}/${node.url}` })
            return H('img.db.pv4', { ...props, src: asciiCast.url, alt: node.alt || '' })
          }
          const { url, description } = Image({ url: `${assetsPath}/${node.url}`, description: node.alt || '' })
          return H('img.db.pv3', { ...props, src: url, alt: description })
        },
        terminal: (h: h, node: Mdast.Terminal): Node => {
          const codeAsLines = node.value.split('\n')
          const groupedCode = groupHighlightedCode(
            node.command ? node.command : `1-${codeAsLines.length}`,
            codeAsLines.length,
          )
          const codeBlocks = groupedCode.map(([groupType, lines], index, array) => {
            const start = lines[0]
            const end = lines[lines.length - 1]
            const isLastLine = index + 1 === array.length
            const currentBlock = `${codeAsLines.slice(start - 1, end).join('\n')}${isLastLine ? '' : '\n'}`
            switch (groupType) {
              case Group.HIGHLIGHT:
                return H('span.command.prompt', [
                  {
                    type: 'raw',
                    value: Prism.highlight(currentBlock, Prism.languages['bash']),
                  },
                ])
              case Group.STANDARD:
                return H('span.output', [
                  {
                    type: 'raw',
                    value: Prism.highlight(currentBlock, Prism.languages['bash']),
                  },
                ])
            }
          })
          if (((codeBlocks[codeBlocks.length - 1] as any).properties.className || []).includes('output')) {
            codeBlocks.push(H('span.output.prompt.mt3.empty'))
          } else {
            const classNames = (codeBlocks[codeBlocks.length - 1] as any).properties.className || []
            ;(codeBlocks[codeBlocks.length - 1] as any).properties.className = [...classNames, 'active']
          }
          return H('div.mv4.mv5-l', [
            H(
              'header.bg-light-gray.flex.pv2.pl1 br--top.br2.relative',
              [
                H('div.w1.h1.ml1.br-100.bg-dark-red'),
                H('div.w1.h1.ml1.br-100.bg-green'),
                H('div.w1.h1.ml1.br-100.bg-yellow'),
              ].concat(
                node.title
                  ? H('p.code.f6.mv0.black-60.w-100.tc.absolute.top-0.left-0.h1.pv2', [
                      { type: 'text', value: node.title },
                    ])
                  : [],
              ),
            ),
            H('pre.code-dark-theme.relative.pv4.overflow-auto.mv0.br2.br--bottom', [
              H('code.code.lh-copy', codeBlocks),
            ]),
            H('style', [{ type: 'text', value: prismOkaidiadCss }]),
          ])
        },
      },
    })
    .use(raw)
    .use(() => (it: any) => {
      return remove(it, { cascade: false }, (node: Node, index: number, parent?: Node) => {
        return parent && parent.type === 'root' && node.type === 'text' && /^\s*$/.test(node.value as string)
      })
    })

  const mdastTree = parse(content)
  const hastTree = hastParser.runSync(mdastTree)
  const css: Node[] = selectAll('[tagName="style"]', hastTree)
  const js: Node[] = selectAll('[tagName="script"]', hastTree)
  const tree = remove(hastTree, { cascade: true }, (node: Node) => {
    return /script|style/gi.test(node.tagName as any)
  })
  return {
    html: (tree as any) as JSX.Element,
    css: css.map(it => toString(it)).filter(onlyUnique),
    js: js.map(it => toString(it)).filter(onlyUnique),
  }
}

export function extractCodeFences<T extends string>(
  args: string | null | undefined,
  features: T[],
): { [a in T]: string | null } & { lang: string | null } {
  const init = features.reduce(
    (acc, it) => {
      acc[it] = null
      return acc
    },
    {} as { [a in T]: string | null },
  )
  if (!args) {
    return { ...init, lang: null }
  }
  let [head, ...rest] = args.split('|')
  let lang = null
  if (/=/.test(head)) {
    rest.push(head)
  } else {
    lang = head
  }
  const collected = features.reduce(
    (acc, it) => {
      const regex = new RegExp(`^${it}=`, 'gi')
      const arg = rest.find(it => regex.test(it))
      if (!arg) {
        acc[it] = null
        return acc
      }
      acc[it] = arg.replace(regex, '')
      return acc
    },
    {} as { [a in T]: string | null },
  )
  return { ...collected, lang }
}

function isCode(node: Node): node is Mdast.Code {
  return node.type === 'code'
}

namespace Mdast {
  export interface Code extends Node {
    type: 'code'
    lang?: string
    meta?: string
    value: string
  }

  export interface Terminal extends Node {
    type: 'terminal'
    title: string | null
    command: string | null
    value: string
  }

  export interface Link extends Node {
    type: 'link'
    url: string
    title?: string
  }

  export interface List extends Node {
    type: 'list'
    ordered?: boolean
    start?: number
    spread?: boolean
    children: ListItem[]
  }

  export interface ListItem extends Node {
    type: 'listItem'
    checked?: boolean
    spread?: boolean
    children: Node[]
  }

  export interface Table extends Node {
    type: 'table'
    align?: string[]
    children: TableRow[]
  }

  export interface TableRow extends Node {
    type: 'tableRow'
    children: TableCell[]
  }

  export interface TableCell extends Node {
    type: 'tableCel'
  }

  export interface Slideshow extends Node {
    type: 'slideshow'
    children: (Slide | Paragraph)[]
  }

  export interface Slide extends Node {
    type: 'slide'
    children: (Image | Paragraph)[]
  }

  export interface Paragraph extends Node {
    type: 'paragraph'
    children: (Image | Node)[]
  }

  export interface Image extends Node {
    type: 'image'
    url: string
    title?: string
    alt?: string
  }

  export interface Include extends Node {
    type: 'include'
    children: (Html | Style | Script)[]
  }

  export interface Html extends Node {
    type: 'html'
    value: string
  }

  export interface Style extends Node {
    type: 'style'
    value: string
  }

  export interface Script extends Node {
    type: 'script'
    value: string
  }

  export interface Root extends Node {
    type: 'root'
    children: Node[]
  }

  export interface Heading extends Node {
    type: 'heading'
  }
}

export const enum Group {
  STANDARD = 'standard',
  HIGHLIGHT = 'highlight',
}

function range(start: number, end: number) {
  return [...Array.from(Array(1 + end - start).keys())].map(v => start + v)
}

export function groupHighlightedCode(
  linesToHighlight: string | null | undefined,
  linesLength: number,
): [Group, number[]][] {
  if (!linesToHighlight) {
    return [[Group.STANDARD, range(1, linesLength)]]
  }
  const taggedCode = linesToHighlight.split(',').reduce(
    (acc, it) => {
      if (/-/.test(it)) {
        const [start, end] = it.split('-')
        return range(parseInt(start, 10), parseInt(end, 10)).reduce(
          (acc, n) => {
            acc[n] = it
            return acc
          },
          { ...acc },
        )
      } else {
        return { ...acc, [it]: it }
      }
    },
    {} as { [index: string]: string },
  )
  const { obj: fullyTaggedCode } = range(1, linesLength).reduce(
    (acc, n) => {
      if (!acc.obj[n]) {
        acc.obj[n] = `group${acc.counter}`
      } else {
        acc.counter += 1
      }
      return acc
    },
    { counter: 0, obj: taggedCode },
  )
  const groupedCodeBlocks = range(1, linesLength).reduce(
    (acc, n) => {
      const label = fullyTaggedCode[n]
      if (!acc[label]) {
        acc[label] = []
      }
      acc[label].push(n)
      return acc
    },
    {} as { [name: string]: number[] },
  )
  const sorted = Object.keys(groupedCodeBlocks)
    .map(key => {
      return [/^group/.test(key) ? Group.STANDARD : Group.HIGHLIGHT, groupedCodeBlocks[key]] as [Group, number[]]
    })
    .sort((a, b) => {
      return a[1][0] - b[1][0]
    })
  return sorted
}

interface all {
  (h: h, parent: Node): Node[]
}

interface one {
  (h: h, node: Node, parent?: Node): Node
}

interface h {
  (node: Node | null, tagName: string, props: {}, children?: Node[]): Node
}

function Slideshow() {
  function setupSlideshow(root: HTMLElement) {
    const width = root.offsetWidth
    const slides = [].slice.call(root.querySelectorAll('li')) as HTMLElement[]
    const slider = root.querySelector<HTMLElement>('.slider-js')
    if (!slider) {
      return console.log(`I couldn't find the slider`)
    }
    slider.style.width = `${width * slides.length}px`
    slider.classList.add('flex')
    slides.forEach(slide => (slide.style.width = `${width}px`))

    function createEmptyNav() {
      const emptyNav = document.createElement('div')
      emptyNav.classList.add('w-20')
      emptyNav.innerHTML = '&nbsp;'
      return emptyNav
    }

    slides.forEach((slide, index, items) => {
      const leftNav = document.createElement('div')
      leftNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20')
      leftNav.innerHTML = `<svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon mr2'>
  <polyline fill='none' vectorEffect='non-scaling-stroke' points='8,2 2,8 8,14'></polyline>
</svg>
<span class='ttu'>Previous</span>`
      leftNav.onclick = () => (root.scrollLeft -= width)
      const rightNav = document.createElement('div')
      rightNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20', 'tr')
      rightNav.innerHTML = `<span class='ttu'>Next</span>
<svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon ml2'>
  <polyline fill='none' vectorEffect='non-scaling-stroke' points='2,2 8,8 2,14'></polyline>
</svg>`
      rightNav.onclick = () => (root.scrollLeft += width)
      const navigation = slide.querySelector('.navigation-js')
      if (!navigation) {
        return console.log(`I couldn't find the navigation`)
      }
      navigation.prepend(index === 0 ? createEmptyNav() : leftNav)
      navigation.append(index === items.length - 1 ? createEmptyNav() : rightNav)
    })
  }

  document.querySelectorAll<HTMLElement>('.slideshow-js').forEach(setupSlideshow)
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}
