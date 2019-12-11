declare module '~hast/index' {
  import * as Unist from 'unist'

  export interface Element extends Unist.Node {
    type: string
    tagName: string
    properties: Record<string, unknown>
    content?: Root
    children: Array<Element | Comment | Text | Raw>
  }

  export interface Parent extends Unist.Parent {
    children: Array<Element | Doctype | Comment | Text | Raw>
  }

  export interface Literal extends Unist.Literal {
    value: string
  }

  export interface Root extends Parent {
    type: 'root'
  }

  export interface Comment extends Literal {
    type: 'comment'
  }

  export interface Text extends Literal {
    type: 'text'
  }

  export interface Raw extends Literal {
    type: 'raw'
  }

  export interface Doctype extends Unist.Node {
    type: 'doctype'
    name: string
    public?: string
    system?: string
  }

  export interface Raw extends Literal {
    type: 'raw'
  }
}

declare module 'hast' {
  import alias = require('~hast/index')
  export = alias
}
