declare module '~unist-util-inspect/index' {
  import { Node } from 'unist'
  export default function inspect(node: Node): string
}

declare module 'unist-util-inspect' {
  import alias = require('~unist-util-inspect/index')
  export = alias
}
