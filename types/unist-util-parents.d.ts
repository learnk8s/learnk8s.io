declare module '~unist-util-parents/index' {
  import { Node, Parent } from 'unist'

  export interface NestedParent<T = Parent> extends Parent {
    node: T
    parent: NestedParent | null
    children: Array<NestedParent | NestedNode>
  }

  export interface NestedNode<T = Node> extends Node {
    node: T
    parent: NestedParent | null
  }

  export default function parents<T extends Node>(tree: T): NestedNode<T>
  export default function parents<T extends Parent>(tree: T): NestedParent<T>
}

declare module 'unist-util-parents' {
  import alias = require('~unist-util-parents/index')
  export = alias
}
