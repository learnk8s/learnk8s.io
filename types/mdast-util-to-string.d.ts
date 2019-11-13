declare module '~mdast-util-to-string/index' {
  import { Node } from 'unist'
  export default function toString(node: Node): string
}

declare module 'mdast-util-to-string' {
  import alias = require('~mdast-util-to-string/index')
  export = alias
}
