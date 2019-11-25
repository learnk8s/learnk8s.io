import { ls } from 'shelljs'
import { parse, toMd } from '../../src/remark.v2'
import { promises } from 'fs'

export async function LintMd(paths: string[], write = false) {
  return Promise.all(ls(paths).map(async it => {
    const content = await promises.readFile(it, 'utf8')
    const parsedContent = toMd(parse(content))
    if (content === parsedContent) {
      console.log(`${it} ✅`)
      return
    }
    if (content !== parsedContent && write) {
      console.log(`${it} ✏️`)
      await promises.writeFile(it, parsedContent)
      return
    }
    throw new Error(`${it} ❌`)
  }))
}
