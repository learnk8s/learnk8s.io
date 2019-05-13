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
    {
      minifyStyles: false,
    }
  ],
})

export async function optimise(svgContent: string, skipIds = [] as string[]): Promise<string> {
  const { data } = await svgo.optimize(svgContent)
  const $ = cheerio.load(data, { decodeEntities: false })

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
}
