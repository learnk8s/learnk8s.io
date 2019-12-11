declare module '~hast-util-to-string/index' {
  import { Node } from 'unist'
  export default function toString(node: Node): string
}

declare module 'hast-util-to-string' {
  import alias = require('~hast-util-to-string/index')
  export = alias
}
