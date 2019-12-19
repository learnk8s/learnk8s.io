declare module '~cssom/index' {
  export function parse(token: string): CSSStyleSheet
}

declare module 'cssom' {
  import alias = require('~cssom/index')
  export = alias
}
