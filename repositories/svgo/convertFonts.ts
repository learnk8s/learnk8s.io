import { selectAll, matches } from 'hast-util-select'
import parents, { NestedNode } from 'unist-util-parents'
import { Node } from 'unist'
import * as Hast from 'hast'
import { loadSync, Font as DefaultFont } from 'opentype.js'
import toString from 'hast-util-to-string'
import { matches as UnistMatches } from 'unist-util-select'
import { join } from 'path'

const FONT_ASSETS = {
  'Montserrat-Thin': {
    default: 'fonts/Montserrat-Thin.otf',
  },
  'Montserrat-ExtraLight': {
    default: 'fonts/Montserrat-ExtraLight.otf',
  },
  'Montserrat-Light': {
    default: 'fonts/Montserrat-Light.otf',
  },
  'Montserrat-Regular': {
    default: 'fonts/Montserrat-Regular.otf',
  },
  'Montserrat-Medium': {
    default: 'fonts/Montserrat-Medium.otf',
  },
  'Montserrat-SemiBold': {
    default: 'fonts/Montserrat-SemiBold.otf',
  },
  'Montserrat-Bold': {
    default: 'fonts/Montserrat-Bold.otf',
  },
  'Montserrat-ExtraBold': {
    default: 'fonts/Montserrat-ExtraBold.otf',
  },
  'Montserrat-Black': {
    default: 'fonts/Montserrat-Black.otf',
  },
  Montserrat: {
    '100': 'fonts/Montserrat-Thin.otf',
    '200': 'fonts/Montserrat-ExtraLight.otf',
    '300': 'fonts/Montserrat-Light.otf',
    '400': 'fonts/Montserrat-Regular.otf',
    '500': 'fonts/Montserrat-Medium.otf',
    '600': 'fonts/Montserrat-SemiBold.otf',
    '700': 'fonts/Montserrat-Bold.otf',
    '800': 'fonts/Montserrat-ExtraBold.otf',
    '900': 'fonts/Montserrat-Black.otf',
    bold: 'fonts/Montserrat-Bold.otf',
    default: 'fonts/Montserrat-Regular.otf',
  },
  'OpenSans-Light': {
    default: 'fonts/OpenSans-Light.ttf',
  },
  'OpenSans-Regular': {
    default: 'fonts/OpenSans-Regular.ttf',
  },
  'OpenSans-SemiBold': {
    default: 'fonts/OpenSans-SemiBold.ttf',
  },
  'OpenSans-Bold': {
    default: 'fonts/OpenSans-Bold.ttf',
  },
  'OpenSans-ExtraBold': {
    default: 'fonts/OpenSans-ExtraBold.ttf',
  },
  OpenSans: {
    '300': 'fonts/OpenSans-Light.ttf',
    '400': 'fonts/OpenSans-Regular.ttf',
    '600': 'fonts/OpenSans-SemiBold.ttf',
    '700': 'fonts/OpenSans-Bold.ttf',
    '800': 'fonts/OpenSans-ExtraBold.ttf',
    bold: 'fonts/OpenSans-Bold.ttf',
    default: 'fonts/OpenSans-Regular.ttf',
  },
  'Roboto-Thin': {
    default: 'fonts/Roboto-Thin.ttf',
  },
  'Roboto-Light': {
    default: 'fonts/Roboto-Light.ttf',
  },
  'Roboto-Regular': {
    default: 'fonts/Roboto-Regular.ttf',
  },
  'Roboto-Medium': {
    default: 'fonts/Roboto-Medium.ttf',
  },
  'Roboto-Bold': {
    default: 'fonts/Roboto-Bold.ttf',
  },
  'Roboto-Black': {
    default: 'fonts/Roboto-Black.ttf',
  },
  Roboto: {
    '100': 'fonts/Roboto-Thin.ttf',
    '300': 'fonts/Roboto-Light.ttf',
    '400': 'fonts/Roboto-Regular.ttf',
    '500': 'fonts/Roboto-Medium.ttf',
    '700': 'fonts/Roboto-Bold.ttf',
    '900': 'fonts/Roboto-Black.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    default: 'fonts/Roboto-Regular.ttf',
  },
  'JetBrainsMono-Regular': {
    default: 'fonts/JetBrainsMono-Regular.ttf',
  },
  'JetBrainsMono-Medium': {
    default: 'fonts/JetBrainsMono-Medium.ttf',
  },
  'JetBrainsMono-Bold': {
    default: 'fonts/JetBrainsMono-Bold.ttf',
  },
  'JetBrainsMono-ExtraBold': {
    default: 'fonts/JetBrainsMono-ExtraBold.ttf',
  },
  JetBrainsMono: {
    '400': 'fonts/JetBrainsMono-Regular.ttf',
    '500': 'fonts/JetBrainsMono-Medium.ttf',
    '700': 'fonts/JetBrainsMono-Bold.ttf',
    '900': 'fonts/JetBrainsMono-ExtraBold.ttf',
    default: 'fonts/JetBrainsMono-ExtraBold.ttf',
  },
  'Inter-Regular_Thin': {
    default: 'fonts/Inter-Thin-slnt=0.ttf',
  },
  'Inter-Regular_ExtraLight': {
    default: 'fonts/Inter-ExtraLight-slnt=0.ttf',
  },
  'Inter-Regular_Light': {
    default: 'fonts/Inter-Light-slnt=0.ttf',
  },
  'Inter-Regular': {
    default: 'fonts/Inter-Regular-slnt=0.ttf',
  },
  'Inter-Regular_Medium': {
    default: 'fonts/Inter-Medium-slnt=0.ttf',
  },
  'Inter-Regular_SemiBold': {
    default: 'fonts/Inter-SemiBold-slnt=0.ttf',
  },
  'Inter-Regular_Bold': {
    default: 'fonts/Inter-Bold-slnt=0.ttf',
  },
  'Inter-Regular_ExtraBold': {
    default: 'fonts/Inter-ExtraBold-slnt=0.ttf',
  },
  'Inter-Regular_Black': {
    default: 'fonts/Inter-Black-slnt=0.ttf',
  },
  Inter: {
    '100': 'fonts/Inter-Thin-slnt=0.ttf',
    '200': 'fonts/Inter-ExtraLight-slnt=0.ttf',
    '300': 'fonts/Inter-Light-slnt=0.ttf',
    '400': 'fonts/Inter-Regular-slnt=0.ttf',
    '500': 'fonts/Inter-Medium-slnt=0.ttf',
    '600': 'fonts/Inter-SemiBold-slnt=0.ttf',
    '700': 'fonts/Inter-Bold-slnt=0.ttf',
    '800': 'fonts/Inter-ExtraBold-slnt=0.ttf',
    '900': 'fonts/Inter-Black-slnt=0.ttf',
    bold: 'fonts/Inter-Bold-slnt=0.ttf',
    default: 'fonts/Inter-Regular-slnt=0.ttf',
  },
  default: {
    bold: 'fonts/Roboto-Bold.ttf',
    default: 'fonts/Roboto-Regular.ttf',
  },
  '-apple-system': {
    bold: 'fonts/Roboto-Bold.ttf',
    default: 'fonts/Roboto-Regular.ttf',
  },
} as Record<string, Record<string, string>>

function getFontPath(fontName: string, weight: string) {
  if (!(fontName in FONT_ASSETS)) {
    throw `${fontName} not supported.`
  }
  const selectedFont = fontName in FONT_ASSETS ? FONT_ASSETS[fontName] : FONT_ASSETS['default']
  return join(__dirname, `${weight}` in selectedFont ? selectedFont[weight] : selectedFont['default'])
}

const DEFAULT_OPTION = DefaultFont.prototype.defaultRenderOptions

export function rasteriseFonts(hast: Node) {
  const tree = parents(hast)

  const tspans = selectAll<NestedNode<Hast.Element>>('tspan', tree, 'svg')
  if (tspans.some(it => it.parent && matches('tspan', it.parent, 'svg'))) {
    throw 'Nested <tspan>s are not supported. Remove the nested <tspan>s'
  }
  if (!tspans.every(it => it.parent && matches('text', it.parent, 'svg'))) {
    throw 'Dangling tspan not supported. <tspan>s are allowed only in <text> elements.'
  }
  const texts = selectAll<NestedNode<Hast.Element>>('text', tree, 'svg')
  if (
    !texts.every(it =>
      (it.children as Hast.Element[]).every(child => matches('tspan', child) || UnistMatches('text', child)),
    )
  ) {
    throw 'All text within <text> elements should be wrapped in a <tspan>. Aborting.'
  }

  tspans.forEach(tspan => {
    const text = tspan.parent!
    const props = {
      fontFamily: 'Roboto',
      fontSize: '16',
      letterSpacing: '0',
      fontWeight: 'default',
      ...pick(['fontFamily', 'fontSize', 'letterSpacing', 'fontWeight'], text.node.properties as any),
      ...(tspan.node.properties as object),
    } as {
      fontFamily: string
      fontWeight: string
      x?: string
      y?: string
      fontSize: string
      letterSpacing: string
      fill?: string
    }
    const [firstFontFamily] = props.fontFamily.split(',').map(it => it.trim())
    const glyphs = loadSync(getFontPath(firstFontFamily, props.fontWeight))
    const path = glyphs.getPath(
      toString(tspan),
      props.x ? parseFloat(props.x) : 0,
      props.y ? parseFloat(props.y) : 0,
      parseInt(props.fontSize),
      {
        ...DEFAULT_OPTION,
        letterSpacing: parseFloat(props.letterSpacing) / parseInt(props.fontSize),
      },
    )
    tspan.node.tagName = 'path'
    tspan.node.properties = {
      d: `${path.toPathData(6)}`,
      ...omit(
        ['fontFamily', 'fontSize', 'letterSpacing', 'fontWeight', 'textAnchor', 'textDecoration', 'wordSpacing'],
        props,
      ),
    }
    tspan.node.children = []
  })

  texts.forEach(text => {
    const props = text.node.properties
    if ('textAnchor' in props) {
      throw `textAnchor not supported. Aborting`
    }
    if ('textDecoration' in props) {
      throw `textDecoration not supported. Aborting`
    }
    if ('wordSpacing' in props && props.wordSpacing !== '0') {
      throw `wordSpacing not supported. Aborting`
    }
    text.node.tagName = 'g'
    text.node.properties = {
      ...omit(
        [
          'fontFamily',
          'fontSize',
          'letterSpacing',
          'fontWeight',
          'textAnchor',
          'textDecoration',
          'wordSpacing',
          'fillRule',
        ],
        props,
      ),
      fillRule: 'nonzero',
    }
  })
}

function pick<K extends string, V>(keys: K[], obj: Record<K, V>): Record<K, V> {
  return Object.keys(obj).reduce((acc, it) => {
    const key: K = it as any
    if (keys.includes(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as Record<K, V>)
}

function omit<K extends string, V>(keys: K[], obj: Record<K, V>): Record<K, V> {
  return Object.keys(obj).reduce((acc, it) => {
    const key: K = it as any
    if (!keys.includes(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as Record<K, V>)
}
