declare module '~unist-util-select/index' {
  import { Node } from 'unist'

  export function select<T extends Node>(selector: string, tree: Node): T | null
  export function selectAll<T extends Node>(selector: string, tree: Node): T[]
  export function matches(selector: string, node: Node): boolean
}

declare module 'unist-util-select' {
  import alias = require('~unist-util-select/index')
  export = alias
}
