import * as Mdast from 'mdast'
import { parseLink, MdastVisitors } from './utils'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface TweetComponent {
  type: string
  value?: string
  children?: TweetComponent[]
  start?: number
}

export function mdast2tweet(): MdastVisitors<TweetComponent> {
  return {
    root(node, parent, { all }) {
      return {
        type: 'root',
        children: all(node),
      }
    },
    text(node) {
      return {
        type: 'text',
        value: node.value,
      }
    },
    html(node) {
      return {
        type: 'text',
        value: node.value,
      }
    },
    strong(node, parent, { all }) {
      return {
        type: 'text',
        value: all(node)
          .filter(it => !!it.value)
          .map(it => getBold(it.value!))
          .join(''),
      }
    },
    emphasis(node, parent, { all, one }) {
      return {
        type: 'text',
        value: all(node)
          .filter(it => !!it.value)
          .map(it => getItalic(it.value!))
          .join(''),
      }
    },
    paragraph(node, parent, { all, one }) {
      if (node.children[0].type === 'image') {
        return one(node.children[0], node)
      }
      return {
        type: 'paragraph',
        children: all(node),
      }
    },
    list(node, parent, { all }) {
      return node.ordered
        ? {
            type: 'list',
            children: all(node),
            start: node.start,
          }
        : {
            type: 'list',
            children: all(node),
          }
    },
    listItem(node, parent, { one }) {
      return {
        type: 'listItem',
        children: node.children.reduce((acc, it) => {
          if (it.type === 'paragraph') {
            return acc.concat(it.children.map(it => one(it)))
          }
          return acc.concat(one(it))
        }, [] as any),
      }
    },
    inlineCode(node) {
      return {
        type: 'text',
        value: getMonospace(node.value),
      }
    },
    code(node) {
      return {
        type: 'text',
        value: getMonospace(node.value),
      }
    },
    terminal(node) {
      return {
        type: 'text',
        value: getMonospace(node.value),
      }
    },
    powershell(node) {
      return {
        type: 'text',
        value: getMonospace(node.value),
      }
    },
    image(node) {
      return {
        type: 'image',
        value: node.url,
      }
    },
    link(node, parent, { all }) {
      return parseLink(node)({
        absolute: external.bind(null, node),
        relative: internal.bind(null, node),
        inline: internal.bind(null, node),
        file: internal.bind(null, node),
      })
      function external(node: Mdast.Link): any {
        return {
          type: 'link',
          value: node.url,
        }
      }
      function internal(node: Mdast.Link) {
        throw new Error('Only absolute link implemented')
      }
    },
    heading() {
      throw new Error('heading not implemented')
    },
    delete() {
      throw new Error('delete not implemented')
    },
    blockquote() {
      throw new Error('blockquote not implemented')
    },
    thematicBreak() {
      throw new Error('thematicBreak not implemented')
    },
    break() {
      throw new Error('break not implemented')
    },
    linkReference() {
      throw new Error('linkReference not implemented')
    },
    imageReference() {
      throw new Error(`imageReference not implemented`)
    },
    definition() {
      throw new Error('definition not implemented')
    },
    slideshow() {
      throw new Error('slideshow not implemented')
    },
    slide() {
      throw new Error('slide not implemented')
    },
    footnote() {
      throw new Error('footnote not implemented')
    },
    footnoteReference() {
      throw new Error('footnoteReference not implemented')
    },
    footnoteDefinition() {
      throw new Error('footnoteDefinition not implemented')
    },
    table() {
      throw new Error('table not implemented')
    },
    tableCell() {
      throw new Error('tableCell not implemented')
    },
    tableRow() {
      throw new Error('tableRow not implemented')
    },
    animation() {
      throw new Error('tableRow not implemented')
    },
    include() {
      throw new Error('include not implemented')
    },
  }
}

function getMonospace(text: string) {
  return text
    .split('')
    .map(c => {
      if (/[A-Z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120367)
      } else if (/[a-z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120361)
      } else if (/[0-9]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120774)
      } else {
        return c
      }
    })
    .join('')
}

function getItalic(text: string) {
  return text
    .split('')
    .map(c => {
      if (/[A-Z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120263)
      } else if (/[a-z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120257)
      } else {
        return c
      }
    })
    .join('')
}

function getBold(text: string) {
  return text
    .split('')
    .map(c => {
      if (/[A-Z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120211)
      } else if (/[a-z]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120205)
      } else if (/[0-9]/.test(c)) {
        return String.fromCodePoint(c.codePointAt(0)! + 120734)
      } else {
        return c
      }
    })
    .join('')
}
