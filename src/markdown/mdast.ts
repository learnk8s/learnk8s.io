import { Parser } from 'remark-parse'
import { selectAll, select, matches } from 'unist-util-select'
import { join, relative } from 'path'
import * as Mdast from 'mdast'
import { ok } from 'assert'
import markdownTable from 'markdown-table'
import { transform, MdastVisitors, parseLink, Helpers } from './utils'
import { VFile, toVFile, VMemory, VReference } from '../files'
import hastParser from 'hast-util-raw'
import * as HastSelect from 'hast-util-select'
import * as Hast from 'hast'
import toHtml from 'hast-util-to-html'

export function toMdast(vfile: VFile | VMemory): Mdast.Root {
  const tree = parseToMdast(vfile)
  return transform(tree, mdast2mdast(vfile)) as any
}

export function toMd(tree: Mdast.Root, vfile: VFile): VFile
export function toMd(tree: Mdast.Root, vfile: VMemory): VMemory
export function toMd(tree: Mdast.Root, vfile: VReference): VFile
export function toMd(tree: Mdast.Root, vfile: VFile | VMemory | VReference): VFile | VMemory
export function toMd(tree: Mdast.Root, vfile: VFile | VMemory | VReference): VFile | VMemory {
  const contents = transform(tree, mdast2string(vfile))
  return { ...vfile, contents }
}

function parseToMdast(vfile: VFile | VMemory): Mdast.Root {
  const parser = new Parser(null, vfile.contents)
  parser.options.commonmark = true
  return parser.parse()
}

function mdast2mdast(vfile: VFile | VMemory | VReference): MdastVisitors<Mdast.Literal | Mdast.Node | Mdast.Parent> {
  return {
    root(node, parent, { all }): Mdast.Root {
      return { type: 'root', children: all(node) as any }
    },
    text: identity,
    slideshow: unwrapAll,
    slide: unwrapAll,
    heading: unwrapAll,
    paragraph: unwrapAll,
    blockquote: unwrapAll,
    list: unwrapAll,
    listItem: unwrapAll,
    inlineCode: identity,
    code(
      node,
      parent,
      { one },
    ): Mdast.Code | Mdast.Terminal | Mdast.PowerShell | Mdast.Animation | Mdast.Include | Mdast.Slideshow {
      switch (node.lang) {
        case 'animation': {
          const { description, animation, fallback } = JSON.parse(node.value) as Partial<{
            description: string
            animation: string
            fallback: string
          }>
          ok(
            `${description || ''}`.trim().length > 0,
            `Invalid description in animation ${vfile.basename}:${node.position &&
              node.position.start.line}.\nExpected string got ${description}.`,
          )
          ok(
            `${animation || ''}`.trim().length > 0,
            `Invalid image in animation ${vfile.basename}:${node.position &&
              node.position.start.line}.\nExpected string got ${animation}.`,
          )
          ok(
            `${fallback || ''}`.trim().length > 0,
            `Invalid fallback in animation ${vfile.basename}:${node.position &&
              node.position.start.line}.\nExpected string got ${fallback}.`,
          )
          return {
            type: 'animation',
            children: [
              one({ type: 'image', url: animation!, alt: description! }) as Mdast.Image,
              one({ type: 'image', url: fallback!, alt: description! }) as Mdast.Image,
            ],
          }
        }
        case 'slideshow': {
          const { slides, description } = JSON.parse(node.value) as Partial<{
            description: string
            slides: Partial<{ image: string; description: string }>[]
          }>
          ok(
            `${description || ''}`.trim().length > 0,
            `Invalid description in slides ${vfile.basename}:${node.position &&
              node.position.start.line}.\nExpected string got ${description}.`,
          )
          ok(
            Array.isArray(slides),
            `Invalid slides array in slides ${vfile.basename}:${node.position &&
              node.position.start.line}.\nExpected an array got ${slides}.`,
          )
          slides!.forEach(it => {
            ok(
              `${it.description || ''}`.trim().length > 0,
              `Invalid description in slide ${vfile.basename}:${node.position &&
                node.position.start.line}.\nExpected string got ${it.description}.`,
            )
            ok(
              `${it.image || ''}`.trim().length > 0,
              `Invalid image in slide ${vfile.basename}:${node.position &&
                node.position.start.line}.\nExpected string got ${it.image}.`,
            )
          })
          return {
            type: 'slideshow',
            children: [
              ...(parseToMdast(toVFile({ contents: description! })).children as Mdast.Paragraph[]),
              ...slides!.map(it => {
                return {
                  type: 'slide' as const,
                  children: [
                    one({
                      type: 'image',
                      url: it.image!,
                    }) as Mdast.Image,
                    ...(parseToMdast(toVFile({ contents: it.description! })).children as Mdast.Paragraph[]),
                  ],
                }
              }),
            ],
          }
        }
        case 'include': {
          const hast = hastParser({ type: 'root', children: [{ type: 'raw', value: node.value }] })
          HastSelect.selectAll<Hast.Element>('script[src]', hast).forEach(
            it => (it.properties.src = `${vfile.dirname}/${it.properties.src}`),
          )
          return {
            type: 'include',
            value: toHtml(hast, { allowDangerousHTML: true }),
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
                position: node.position,
              }
            }
            case 'powershell': {
              const { command, title } = extractCodeFences(node.lang, ['command', 'title'])
              return {
                type: 'powershell',
                value: node.value,
                command,
                title,
                position: node.position,
              }
            }
            default: {
              const { title, highlight } = extractCodeFences(node.lang, ['highlight', 'title'])
              return { ...node, data: { ...node.data, title, highlight }, lang: lang || undefined }
            }
          }
        }
      }
    },
    terminal: identity,
    powershell: identity,
    html: identity,
    thematicBreak: identity,
    strong: unwrapAll,
    emphasis: unwrapAll,
    break: identity,
    delete: identity,
    link: node => {
      return parseLink(node)({
        absolute: () => node,
        relative: () => node,
        inline: () => node,
        file: () => {
          if (node.url.startsWith('mailto:')) {
            return node
          }
          const [fileName, anchor] = node.url.split('#') as [string, string | null]
          return { ...node, url: `${join(vfile.dirname || '', fileName)}${!!anchor ? `#${anchor}` : ''}` }
        },
      })
    },
    linkReference: identity,
    imageReference: identity,
    definition: identity,
    image: node => {
      return { ...node, url: join(vfile.dirname || '', node.url) }
    },
    footnote: identity,
    footnoteReference: identity,
    footnoteDefinition: identity,
    table: unwrapAll,
    tableCell: unwrapAll,
    tableRow: unwrapAll,
    animation: unwrapAll,
    include: identity,
  }
  function identity<T>(value: T): T {
    return value
  }
  function unwrapAll(node: any, parent: unknown, { all }: Helpers<Mdast.Base>) {
    return { ...node, children: all(node) }
  }
}

function mdast2string(vfile: VFile | VMemory | VReference): MdastVisitors<string> {
  const fences = '```'
  return {
    root(node, parent, { all }) {
      return `${all(node).join('\n\n')}\n`
    },
    text(node) {
      return node.value
    },
    slideshow(node) {
      const slides = selectAll<Mdast.Slide>('slide', node).map(slide => {
        const firstImage = select<Mdast.Image>('image', slide)
        return {
          image: firstImage ? relative(vfile.dirname || '', firstImage.url) : '',
          description: toMd(
            {
              type: 'root',
              children: slide.children.filter(it => matches(':not(image)', it)),
            },
            vfile,
          ).contents.trim(),
        }
      })
      const description = toMd(
        {
          type: 'root',
          children: node.children.filter(it => matches(':not(slide)', it)),
        },
        vfile,
      ).contents.trim()
      return `${fences}slideshow\n${JSON.stringify({ description, slides }, null, 2)}\n${fences}`
    },
    slide(node, parent, { all, one }) {
      throw new Error('slide not implemented')
    },
    heading(node, parent, { all }) {
      return `${'#'.repeat(node.depth)} ${all(node).join('')}`
    },
    paragraph(node, parent, { all }) {
      return `${all(node).join('')}`
    },
    blockquote(node, parent, { all }) {
      return all(node)
        .join('')
        .split('\n')
        .map(it => `> ${it}`)
        .join('\n')
    },
    list(node, parent, { one }) {
      const tabSize = 4
      const marker = node.ordered ? '1.' : '-'
      return `${node.children
        .map(item => {
          ok(!node.checked, 'Checkboxes are not supported')
          const content = item.children.map(it => one(it, item)).join(node.spread ? '\n\n' : '\n')
          const indent = marker.length + 1
          const spacing = ' '
          return `${marker}${spacing}${pad(content, indent / tabSize).slice(indent)}`
        })
        .join(node.spread ? '\n\n' : '\n')}`

      function pad(content: string, level: number): string {
        return content
          .split('\n')
          .map(it => `${' '.repeat(level * tabSize)}${it}`)
          .join('\n')
      }
    },
    listItem(node) {
      throw new Error(`listItem not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    inlineCode(node) {
      return `\`${node.value}\``
    },
    code(node) {
      const head = ([] as string[])
        .concat((node.lang as string) || [])
        .concat(node.data && node.data.highlight ? `highlight=${node.data.highlight}` : [])
        .concat(node.data && node.data.title ? `title=${node.data.title}` : [])
        .join('|')
      return `${fences}${head}\n${node.value}\n${fences}`
    },
    terminal(node) {
      return `${fences}terminal${node.command ? `|command=${node.command}` : ''}${
        node.title ? `|title=${node.title}` : ''
      }\n${node.value}\n${fences}`
    },
    powershell(node) {
      return `${fences}powershell${node.command ? `|command=${node.command}` : ''}${
        node.title ? `|title=${node.title}` : ''
      }\n${node.value}\n${fences}`
    },
    html(node) {
      return node.value
    },
    thematicBreak(node) {
      throw new Error(`thematicBreak not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    strong(node, parent, { all }) {
      return `**${all(node).join('')}**`
    },
    emphasis(node, parent, { all }) {
      return `_${all(node).join('')}_`
    },
    break() {
      throw new Error('break not implemented in ${vfile.path} line ${node.position?.start.line}')
    },
    delete(node, parent, { all }) {
      return `~~${all(node).join('')}~~`
    },
    link(node, parent, { all }) {
      const url = parseLink(node)({
        absolute: () => node.url,
        relative: () => node.url,
        inline: () => node.url,
        file: () => {
          if (node.url.startsWith('mailto:')) {
            return node.url
          }
          const [fileName, anchor] = node.url.split('#') as [string, string | null]
          return `${relative(vfile.dirname || '', fileName)}${!!anchor ? `#${anchor}` : ''}`
        },
      })
      const protocol = /^[a-z][a-z+.-]+:\/?/i
      const content = all(node).join('')
      return !node.title && protocol.test(url) && content === url
        ? `<${url}>`
        : `[${content}](${url}${node.title ? ` "${node.title}"` : ''})`
    },
    linkReference(node) {
      throw new Error(`linkReference not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    imageReference(node) {
      throw new Error(`imageReference not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    definition(node) {
      throw new Error(`definition not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    image(node) {
      return `![${node.alt}](${relative(vfile.dirname || '', node.url)}${node.title ? ` "${node.title}"` : ''})`
    },
    footnote(node) {
      throw new Error(`footnote not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    footnoteReference(node) {
      throw new Error(`footnoteReference not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    footnoteDefinition(node) {
      throw new Error(`footnoteDefinition not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    table(node, parent, { all }) {
      const rows = node.children.map(it => all(it))
      return markdownTable(rows, {
        align: node.align,
        pad: true,
        start: '| ',
        end: ' |',
        stringLength: (value: string) => value.length,
        delimiter: ' | ',
      })
    },
    tableCell(node, parent, { all }) {
      return all(node).join('')
    },
    tableRow(node) {
      throw new Error(`tableRow not implemented in ${vfile.path} line ${node.position?.start.line}`)
    },
    animation(node) {
      const animation = node.children[0]
      const fallback = node.children[1]
      return `${fences}animation\n${JSON.stringify(
        {
          description: animation.alt,
          animation: relative(vfile.dirname || '', animation.url),
          fallback: relative(vfile.dirname || '', fallback.url),
        },
        null,
        2,
      )}\n${fences}`
    },
    include(node) {
      const hast = hastParser({ type: 'root', children: [{ type: 'raw', value: node.value }] })
      HastSelect.selectAll<Hast.Element>('script[src]', hast).forEach(
        it => (it.properties.src = relative(vfile.dirname || '', it.properties.src as string)),
      )
      return `${fences}include\n${toHtml(hast, {
        allowDangerousHTML: true,
        closeEmptyElements: true,
        collapseEmptyAttributes: true,
        tightSelfClosing: true,
      })}\n${fences}`
    },
  }
}

export function extractCodeFences<T extends string>(
  args: string | null | undefined,
  features: T[],
): { [a in T]: string | null } & { lang: string | null } {
  const init = features.reduce((acc, it) => {
    acc[it] = null
    return acc
  }, {} as { [a in T]: string | null })
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
  const collected = features.reduce((acc, it) => {
    const regex = new RegExp(`^${it}=`, 'gi')
    const arg = rest.find(it => regex.test(it))
    if (!arg) {
      acc[it] = null
      return acc
    }
    acc[it] = arg.replace(regex, '')
    return acc
  }, {} as { [a in T]: string | null })
  return { ...collected, lang }
}
