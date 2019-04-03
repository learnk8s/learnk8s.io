import { ls, cat, exit } from 'shelljs'
import SVGO from 'svgo'
import cheerio from 'cheerio'
import { writeFileSync } from 'fs'

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
      removeHiddenElems: true,
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
      convertTransform: true,
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
      removeStyleElement: false,
    },
    {
      removeScriptElement: false,
    },
  ],
})

export function optimise(svgContent: string, skipIds = [] as string[]): Promise<string> {
  return svgo.optimize(svgContent).then(svgo => {
    const $ = cheerio.load(svgo.data, { decodeEntities: false })

    $('[fill]').each((index, element) => {
      const fill = $(element).attr('fill')
      if (fill.startsWith('url(#')) {
        skipIds.push(fill.substring(5, fill.length - 1))
      }
    })
    $('[id]').each((i, element) => {
      const id = $(element).attr('id')
      if (skipIds.includes(id)) {
        return
      }
      $(element).attr('id', null)
    })
    $('svg').attr('width', null)
    $('svg').attr('height', null)
    $('[font-family]').each((index, element) => {
      $(element).attr('font-family', 'sans-serif')
    })
    return $('body').html() || ''
  })
}

const files = ls([
  'assets/academy/*.svg',
  'assets/consulting/*.svg',
  'assets/material/*.svg',
  'assets/training/*.svg',
  'assets/contact-us/*.svg',
  'src/advancedKubectl/*.svg',
]).map(svgFileName => {
  const svgContent = cat(svgFileName).toString()
  return optimise(svgContent).then(it => writeFileSync(svgFileName, it))
})

Promise.all(files).then(() => exit(0))
