import prettier from 'prettier'
import { promises } from 'fs'
import { ls } from 'shelljs'

export async function Prettier(paths: string[], write = false) {
  const filePath = await prettier.resolveConfigFile()
  if (!filePath) {
    return Promise.reject('Could not find config file for prettier')
  }
  const options = await prettier.resolveConfig(filePath)
  if (!options) {
    return Promise.reject('Invalid options for prettier')
  }
  return Promise.all(
    ls(paths).map(async it => {
      const content = await promises.readFile(it, 'utf8')
      const parsedContent = prettier.format(content, { ...options, filepath: it })
      if (content === parsedContent) {
        console.log(`${it} ✅`)
        return
      }
      if (content !== parsedContent && write) {
        console.log(`${it} ✏️`)
        return promises.writeFile(it, parsedContent)
      }
      return Promise.reject(`${it} ❌`)
    }),
  )
}
