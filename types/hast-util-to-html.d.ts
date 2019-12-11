declare module '~hast-util-to-html/index' {
  import { Root } from 'hast'
  export default function toHtml(
    tree: Root,
    options?: Partial<{
      space: 'svg' | 'html'
      voids: string[]
      entities: Partial<{
        escapeOnly: boolean
        subset: string[]
        useNamedReferences: boolean
        useShortestReferences: boolean
        omitOptionalSemicolons: boolean
        attribute: boolean
      }>
      quote: string
      quoteSmart: boolean
      preferUnquoted: boolean
      omitOptionalTags: boolean
      collapseEmptyAttributes: boolean
      closeSelfClosing: boolean
      closeEmptyElements: boolean
      tightSelfClosing: boolean
      tightCommaSeparatedLists: boolean
      tightAttributes: boolean
      tightDoctype: boolean
      allowParseErrors: boolean
      allowDangerousCharacters: boolean
      allowDangerousHTML: boolean
    }>,
  ): string
}

declare module 'hast-util-to-html' {
  import alias = require('~hast-util-to-html/index')
  export = alias
}
