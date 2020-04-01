import { Font } from 'opentype.js'

declare module 'opentype.js' {
  interface RenderOptions {
    script?: string
    language?: string
    kerning?: boolean
    xScale?: number
    yScale?: number
    tracking?: number
    letterSpacing?: number
    features?: {
      [key: string]: boolean
    }
  }

  export class FontExtended extends Font {
    getPath(text: string, x: number, y: number, fontSize: number, options?: RenderOptions): Path
    getAdvanceWidth(text: string, fontSize?: number, options?: RenderOptions): number
  }
}
