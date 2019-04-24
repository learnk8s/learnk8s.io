import { ls, exit } from 'shelljs'
import { parse, toMd } from './remark.v2'
import { readFileSync, writeFileSync } from 'fs'
const commander = require('commander')

commander
  .version('1.0.0')
  .option('--write', 'Write the parsed file in place')
  .parse(process.argv)

ls('src/**/*.md').forEach(it => {
  const content = readFileSync(it, 'utf8')
  const parsedContent = toMd(parse(content))
  if (content === parsedContent) {
    console.log(`${it} ✅`)
    return
  }
  if (content !== parsedContent && commander.write) {
    console.log(`${it} ✏️`)
    writeFileSync(it, parsedContent)
    return
  }
  console.log(`${it} ❌`)
  exit(1)
})
