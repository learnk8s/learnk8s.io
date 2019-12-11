declare module '~unist-util-remove/index' {
  import { Node } from 'unist'
  export default function remove(
    tree: Node,
    options?: { cascade: boolean },
    test?: (node: Node, index?: number, parent?: Node) => boolean,
  ): Node | null
}

declare module 'unist-util-remove' {
  import alias = require('~unist-util-remove/index')
  export = alias
}
