declare module '~cssom/index' {
  export function parse(token: string): ParsedStylesheet
  export interface ParsedStylesheet {
    parentStyleSheet: null
    cssRules: CSSRule[]
  }
  export interface CSSRule {
    selectorText: string
  }
}

declare module 'cssom' {
  import alias = require('~cssom/index')
  export = alias
}
