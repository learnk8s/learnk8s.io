declare module '~remark-parse/index' {
  import { Root } from 'mdast'
  export class Parser {
    public readonly options: {
      commonmark: boolean
      gfm: boolean
      footnotes: boolean
      pedantic: boolean
      blocks: string[]
    }
    constructor(doc: null, file: string)
    parse(): Root
  }
}

declare module 'remark-parse' {
  import alias = require('~remark-parse/index')
  export = alias
}
