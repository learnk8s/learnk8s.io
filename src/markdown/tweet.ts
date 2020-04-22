import * as Mdast from 'mdast'
import { parseLink, MdastVisitors } from './utils'

const CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ '
const BOLD_CHAR = '!"#$%&\'()*+,-./𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵:;<=>?@𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭[\\]^_`𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇{|}~ '
const ITALIC_CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡[\\]^_`𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻{|}~ '
const ITALIC_BOLD_CHAR =
  '!"#$%&\'()*+,-./0123456789:;<=>?@𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕[\\]^_`𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯{|}~ '
const STRIKE_CHAR = '!̶"̶#̶$̶%̶&̶\'̶(̶)̶*̶+̶,̶-̶.̶/̶0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶:̶;̶<̶=̶>̶?̶@̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶[̶̶]̶^̶_̶`̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶{̶|̶}̶~̶ ̶'
const MONO_CHAR = '!"#$%&\'()*+,-./0𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿:;<=>?@𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉[\\]^_`𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣{|}~ '

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
      return [all(node)
        .map(getBold)
        .join('')]
    },
    strong(node, parent, { all }): string {
      return all(node)
        .map(getBold)
        .join('')
    },
    emphasis(node, parent, { all, one }): string {
      return all(node)
        .map(getItalic)
        .join('')
    },
    paragraph(node, parent, { all, one }): string[] | string {
      if (node.children[0].type === 'image') {
        return one(node.children[0], node)
      }
      return [all(node).join('')]
    },
    list(node, parent, { all }): string[]  {
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
    delete(node, parent, { all }) {
      return all(node)
        .map(getStrike)
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
    .map(c =>
      CHAR.indexOf(c) === -1
        ? BOLD_CHAR.indexOf(c) === -1
          ? c
          : ITALIC_BOLD_CHAR[BOLD_CHAR.indexOf(c)]
        : BOLD_CHAR[CHAR.indexOf(c)],
    )
    .join('')
}

function getBold(text: string) {
  return text
    .split('')
    .map(c =>
      CHAR.indexOf(c) === -1
        ? ITALIC_CHAR.indexOf(c) === -1
          ? c
          : ITALIC_BOLD_CHAR[ITALIC_CHAR.indexOf(c)]
        : ITALIC_CHAR[CHAR.indexOf(c)],
    )
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
