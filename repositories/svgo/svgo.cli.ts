import { ls } from 'shelljs'
import { optimise } from '.'
import { promises } from 'fs'

export async function LintSVG(paths: string[], write = false) {
  return Promise.all(
    ls(paths).map(async svgFileName => {
      const content = await promises.readFile(svgFileName, 'utf8')
      try {
        const optimisedContent = await optimise(content, ['anime-'])
        if (content === optimisedContent) {
          console.log(`${svgFileName} ✅`)
          return
        }
        if (content !== optimisedContent && write) {
          console.log(`${svgFileName} ✏️`)
          await promises.writeFile(svgFileName, optimisedContent)
          return
        }
        throw new Error(`${svgFileName} ❌`)
      } catch (error) {
        throw new Error(`ERROR in ${svgFileName}:\n${error}`)
      }
    }),
  )
}
