import shell, { ls, cat, exit } from 'shelljs'
import SVGO from 'svgo'
import cheerio from 'cheerio'

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
  ]
})

const files = ls([
  'assets/academy/*.svg',
  'assets/consulting/*.svg',
  'assets/material/*.svg',
  'assets/training/*.svg',
]).map(svgFileName => {
  const svgContent = cat(svgFileName).toString()
  return svgo.optimize(svgContent).then(svgo => {
    const $ = cheerio.load(svgo.data, { decodeEntities: false })

    const skipIds = [] as string[]
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
    const optimisedContent = $('body').html()
    if (optimisedContent !== svgContent) {
      (shell as any).ShellString(optimisedContent).to(svgFileName)
    }
  })
})

Promise.all(files).then(() => exit(0))