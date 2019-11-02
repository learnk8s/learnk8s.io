declare module '~markdown-table/index' {
  import { Node } from 'unist'
  export default function renderTable(
    table: string[][],
    options?: Partial<{
      align: null | 'left' | 'right' | 'center' | '.' | Array<'left' | 'right' | 'center' | '.' | null>
      delimiter: string
      start: string
      end: string
      rule: string
      stringLength: (value: any) => number
      pad: boolean
    }>,
  ): string
}

declare module 'markdown-table' {
  import alias = require('~markdown-table/index')
  export = alias
}
