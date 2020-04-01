import SVGO from 'svgo'
import { selectAll, select, matches } from 'hast-util-select'
import remove from 'unist-util-remove'
import toString from 'hast-util-to-string'
import hastParser from 'hast-util-raw'
import toHtml from 'hast-util-to-html'
import * as Hast from 'hast'
import { rasteriseFonts } from './convertFonts'

const svgo = new SVGO({
  plugins: [
    {
      removeDimensions: true,
    },
    {
      cleanupAttrs: true,
    },
    {
      removeAttrs: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: false, // animations have hidden elements
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: false, // breaks animations
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: false,
    },
    {
      cleanupNumericValues: true,
    },
    {
      cleanupListOfValues: true,
    },
    {
      collapseGroups: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      minifyStyles: false,
    },
    {
      moveGroupAttrsToElems: false,
    },
    {
      moveElemsAttrsToGroup: false,
    },
  ],
})

export async function optimise(svgContent: string, skipIds = [] as string[]): Promise<string> {
  const tree = hastParser({ type: 'root', children: [{ type: 'raw', value: (await svgo.optimize(svgContent)).data }] })
  rasteriseFonts(tree)

  selectAll('[fill]', tree, 'svg').forEach(element => {
    const fill = (element.properties as { fill: string }).fill
    if (fill.startsWith('url(#')) {
      skipIds.push(fill.substring(5, fill.length - 1))
    }
  })

  selectAll('[mask]', tree, 'svg').forEach(element => {
    const mask = (element.properties as { mask: string }).mask
    if (mask.startsWith('url(#')) {
      skipIds.push(mask.substring(5, mask.length - 1))
    }
  })

  selectAll('use', tree, 'svg').forEach(element => {
    const xLinkHref = (element.properties as { xLinkHref: string }).xLinkHref
    if (xLinkHref && xLinkHref.startsWith('#')) {
      skipIds.push(xLinkHref.slice(1))
    }
  })

  selectAll('[id]', tree, 'svg').forEach(element => {
    const id = (element.properties as { id: string }).id
    if (skipIds.some(it => id.startsWith(it))) {
      return
    }
    delete (element.properties as { id: string }).id
  })

  const svg = select<Hast.Element>('svg', tree, 'svg')!

  svg.properties.width = null
  svg.properties.height = null

  selectAll<Hast.Element>('script', tree, 'svg').forEach(element => {
    element.children = [{ type: 'text', value: `<![CDATA[${toString(element)}]]>` }]
  })

  const styleTags = selectAll<Hast.Element>('style', tree, 'svg')
  const style = styleTags
    .map(it => toString(it))
    .filter(onlyUnique)
    .join('')
  remove(tree, { cascade: true }, node => matches('style', node))
  if (style.length > 0) {
    svg.children.unshift({
      type: 'element' as const,
      properties: {},
      tagName: 'style',
      children: [{ type: 'text', value: style }],
    })
  }

  return toHtml(tree, { space: 'svg', allowDangerousHTML: true })
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}
