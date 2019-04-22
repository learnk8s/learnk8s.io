declare module 'hastscript' {
  interface Hastscript {
    /** Creates an Element */
    <T extends keyof HTMLElementTagNameMap>(tagName: T, attrs?: Object, ...children: any[]): HTMLElementTagNameMap[T]
    <T extends Element>(tagName: string, attrs?: Object, ...children: any[]): T
  }

  const h: Hastscript
  export = h
}

declare module 'hastscript/svg' {
  interface Hastscript {
    /** Creates an Element */
    <T extends keyof SVGElementTagNameMap>(tagName: T, attrs?: Object, ...children: any[]): SVGElementTagNameMap[T]
    <T extends Element>(tagName: string, attrs?: Object, ...children: any[]): T
  }

  const h: Hastscript
  export = h
}
