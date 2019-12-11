declare module '~hast-util-raw/index' {
  import { Root } from 'hast'
  export default function raw(tree: Root): Root
}

declare module 'hast-util-raw' {
  import alias = require('~hast-util-raw/index')
  export = alias
}
