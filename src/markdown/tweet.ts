import * as Mdast from 'mdast'
import { parseLink, MdastVisitors } from './utils'
import { readFileSync } from 'fs'
import { join } from 'path'

const CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ '
const STRIKE_CHAR = '!̶"̶#̶$̶%̶&̶\'̶(̶)̶*̶+̶,̶-̶.̶/̶0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶:̶;̶<̶=̶>̶?̶@̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶[̶̶]̶^̶_̶`̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶{̶|̶}̶~̶ ̶'
const MONO_CHAR = '!"#$%&\'()*+,-./0𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿:;<=>?@𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉[\\]^_`𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣{|}~ '

const configFile = join('./', 'char.json')
const chars = JSON.parse(readFileSync(configFile, 'utf8'))

const BOLD_CHAR = chars.BOLD_CHAR
const ITALIC_CHAR = chars.ITALIC_CHAR

export function mdast2tweet(): MdastVisitors<any> {
  return {
    root(node, parent, { all }) {
      return all(node)
    },
    text(node): string {
      return node.value
    },
    html(node): string {
      return node.value
    },
    heading(node, parent, { all }): string[] {
      return [
        all(node)
          .map(getBold)
          .join(''),
      ]
    },
    strong(node, parent, { all }): string {
      return all(node)
        .map(getBold)
        .join('')
    },
    emphasis(node, parent, { all, one }): string {
      return (
        all(node)
          .map(getItalic)
          .join('')
      )
    },
    paragraph(node, parent, { all, one }): string[] | string {
      if (node.children[0].type === 'image') {
        return one(node.children[0], node)
      }
      return [all(node).join('')]
    },
    list(node, parent, { all }): string[] {
      return node.ordered
        ? [
            all(node)
              .reduce((acc, text, index) => {
                return `${acc}\n${index + (node.start || 1)} ${text[0]}`
              }, '')
              .trim(),
          ]
        : [
            all(node)
              .reduce((acc, text, index) => {
                return `${acc}\n- ${text[0]}`
              }, '')
              .trim(),
          ]
    },
    listItem(node, parent, { one }): string[] {
      return node.children.reduce((acc, it) => {
        if (it.type === 'paragraph') {
          return acc.concat(it.children.map(it => one(it)))
        }
        return acc.concat(one(it))
      }, [] as any)
    },
    inlineCode(node) {
      return [getMonospace(node.value)]
    },
    code(node) {
      return [getMonospace(node.value)]
    },
    terminal(node) {
      return [getMonospace(node.value)]
    },
    powershell(node) {
      return [getMonospace(node.value)]
    },
    image(node) {
      return node.url
    },
    link(node, parent, { all }) {
      return parseLink(node)({
        absolute: external.bind(null, node),
        relative: internal.bind(null, node),
        inline: internal.bind(null, node),
        file: internal.bind(null, node),
      })
      function external(node: Mdast.Link) {
        return node.url
      }
      function internal(node: Mdast.Link): string {
        throw new Error('Only absolute link implemented')
      }
    },
    delete(node, parent, { all }) {
      throw new Error('delete not implemented')
    },
    blockquote(node, parent, { all }) {
      throw new Error('blockquote not implemented')
    },
    thematicBreak() {
      throw new Error('thematicBreak not implemented')
    },
    break() {
      throw new Error('break not implemented')
    },
    linkReference(node, parent) {
      throw new Error('linkReference not implemented')
    },
    imageReference(node) {
      throw new Error(`imageReference not implemented`)
    },
    definition() {
      throw new Error('definition not implemented')
    },
    slideshow(node, parent, { all }) {
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
    animation(node) {
      throw new Error('tableRow not implemented')
    },
    include(node) {
      throw new Error('include not implemented')
    },
  }
}

function getStrike(text: string) {
  return text
    .split('')
    .map(c => {
      return `${c}${String.fromCodePoint(822)}`
    })
    .join('')
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

function isString(test: unknown): test is string {
  return {}.toString.call(test) === '[object String]'
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}
