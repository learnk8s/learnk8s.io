import * as Mdast from 'mdast'
import { parseLink, MdastVisitors } from './utils'
import { readFileSync } from 'fs'
import { join } from 'path'

const CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ '
const ITALIC_BOLD_CHAR = {
  A: '𝘼',
  B: '𝘽',
  C: '𝘾',
  D: '𝘿',
  E: '𝙀',
  F: '𝙁',
  G: '𝙂',
  H: '𝙃',
  I: '𝙄',
  J: '𝙅',
  K: '𝙆',
  L: '𝙇',
  M: '𝙈',
  N: '𝙉',
  O: '𝙊',
  P: '𝙋',
  Q: '𝙌',
  R: '𝙍',
  S: '𝙎',
  T: '𝙏',
  U: '𝙐',
  V: '𝙑',
  W: '𝙒',
  X: '𝙓',
  Y: '𝙔',
  Z: '𝙕',
  a: '𝙖',
  b: '𝙗',
  c: '𝙘',
  d: '𝙙',
  e: '𝙚',
  f: '𝙛',
  g: '𝙜',
  h: '𝙝',
  i: '𝙞',
  j: '𝙟',
  k: '𝙠',
  l: '𝙡',
  m: '𝙢',
  n: '𝙣',
  o: '𝙤',
  p: '𝙥',
  q: '𝙦',
  r: '𝙧',
  s: '𝙨',
  t: '𝙩',
  u: '𝙪',
  v: '𝙫',
  w: '𝙬',
  x: '𝙭',
  y: '𝙮',
  z: '𝙯',
}
const STRIKE_CHAR = '!̶"̶#̶$̶%̶&̶\'̶(̶)̶*̶+̶,̶-̶.̶/̶0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶:̶;̶<̶=̶>̶?̶@̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶[̶̶]̶^̶_̶`̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶{̶|̶}̶~̶ ̶'
const MONO_CHAR = '!"#$%&\'()*+,-./0𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿:;<=>?@𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉[\\]^_`𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣{|}~ '
// const ITALIC_CHAR = {
//   0: '0',
//   1: '1',
//   2: '2',
//   3: '3',
//   4: '4',
//   5: '5',
//   6: '6',
//   7: '7',
//   8: '8',
//   9: '9',
//   A: '𝘈',
//   B: '𝘉',
//   C: '𝘊',
//   D: '𝘋',
//   E: '𝘌',
//   F: '𝘍',
//   G: '𝘎',
//   H: '𝘏',
//   I: '𝘐',
//   J: '𝘑',
//   K: '𝘒',
//   L: '𝘓',
//   M: '𝘔',
//   N: '𝘕',
//   O: '𝘖',
//   P: '𝘗',
//   Q: '𝘘',
//   R: '𝘙',
//   S: '𝘚',
//   T: '𝘛',
//   U: '𝘜',
//   V: '𝘝',
//   W: '𝘞',
//   X: '𝘟',
//   Y: '𝘠',
//   Z: '𝘡',
//   a: '𝘢',
//   b: '𝘣',
//   c: '𝘤',
//   d: '𝘥',
//   e: '𝘦',
//   f: '𝘧',
//   g: '𝘨',
//   h: '𝘩',
//   i: '𝘪',
//   j: '𝘫',
//   k: '𝘬',
//   l: '𝘭',
//   m: '𝘮',
//   n: '𝘯',
//   o: '𝘰',
//   p: '𝘱',
//   q: '𝘲',
//   r: '𝘳',
//   s: '𝘴',
//   t: '𝘵',
//   u: '𝘶',
//   v: '𝘷',
//   w: '𝘸',
//   x: '𝘹',
//   y: '𝘺',
//   z: '𝘻',
// }
// const BOLD_CHAR = {
//   '0': '𝟬',
//   '1': '𝟭',
//   '2': '𝟮',
//   '3': '𝟯',
//   '4': '𝟰',
//   '5': '𝟱',
//   '6': '𝟲',
//   '7': '𝟳',
//   '8': '𝟴',
//   '9': '𝟵',
//   A: '𝗔',
//   B: '𝗕',
//   C: '𝗖',
//   D: '𝗗',
//   E: '𝗘',
//   F: '𝗙',
//   G: '𝗚',
//   H: '𝗛',
//   I: '𝗜',
//   J: '𝗝',
//   K: '𝗞',
//   L: '𝗟',
//   M: '𝗠',
//   N: '𝗡',
//   O: '𝗢',
//   P: '𝗣',
//   Q: '𝗤',
//   R: '𝗥',
//   S: '𝗦',
//   T: '𝗧',
//   U: '𝗨',
//   V: '𝗩',
//   W: '𝗪',
//   X: '𝗫',
//   Y: '𝗬',
//   Z: '𝗭',
//   a: '𝗮',
//   b: '𝗯',
//   c: '𝗰',
//   d: '𝗱',
//   e: '𝗲',
//   f: '𝗳',
//   g: '𝗴',
//   h: '𝗵',
//   i: '𝗶',
//   j: '𝗷',
//   k: '𝗸',
//   l: '𝗹',
//   m: '𝗺',
//   n: '𝗻',
//   o: '𝗼',
//   p: '𝗽',
//   q: '𝗾',
//   r: '𝗿',
//   s: '𝘀',
//   t: '𝘁',
//   u: '𝘂',
//   v: '𝘃',
//   w: '𝘄',
//   x: '𝘅',
//   y: '𝘆',
//   z: '𝘇',
// }

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
          // .map(getBold)
          .join(''),
      ]
    },
    strong(node, parent, { all }): string {
      return all(node)
        // .map(getBold)
        .join('')
    },
    emphasis(node, parent, { all, one }): string {
      return all(node)
        // .map(getItalic)
        .join('')
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
      // return [getMonospace(node.value)]
      return [node.value]
    },
    code(node) {
      // return [getMonospace(node.value)]
      return [node.value]
    },
    terminal(node) {
      // return [getMonospace(node.value)]
      return [node.value]
    },
    powershell(node) {
      // return [getMonospace(node.value)]
      return [node.value]
    },
    delete(node, parent, { all }) {
      return all(node)
        // .map(getStrike)
        .join('')
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
    .map(c => (CHAR.indexOf(c) === -1 ? c : STRIKE_CHAR[CHAR.indexOf(c)]))
    .join('')
}

function getMonospace(text: string) {
  return text
    .split('')
    .map(c => (CHAR.indexOf(c) === -1 ? c : MONO_CHAR[CHAR.indexOf(c)]))
    .join('')
}

function getItalic(text: string) {
  return text
    .split('')
    .map(c => (!ITALIC_CHAR.c ? c : ITALIC_CHAR.c))
    .join('')
}

function getBold(text: string) {
  return text
    .split('')
    .map(c => (!BOLD_CHAR.c ? c : BOLD_CHAR.c))
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
