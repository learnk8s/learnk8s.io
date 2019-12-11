declare module '~hast-util-select/index' {
  import { Node } from 'unist'

  export function select<T extends Node>(selector: string, tree: Node, space?: 'html' | 'svg'): T | null
  export function selectAll<T extends Node>(selector: string, tree: Node, space?: 'html' | 'svg'): T[]
  export function matches(selector: string, node: Node, space?: 'html' | 'svg'): boolean
}

declare module 'hast-util-select' {
  import alias = require('~hast-util-select/index')
  export = alias
}
