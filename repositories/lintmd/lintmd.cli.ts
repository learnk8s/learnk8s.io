import { ls, exit } from 'shelljs'
import { parse, toMd } from '../../src/remark.v2'
import { promises } from 'fs'
import commander from 'commander'

commander
  .version('1.0.0')
  .usage(`lintmd 'src/**/*.md'`)
  .option('--write', 'Write the parsed file in place')
  .parse(process.argv)

commander.on('command:*', (paths: string[] | undefined) => {
  if (!paths || paths.length === 0) {
    commander.help()
    exit(1)
    return
  }
  ls(paths).forEach(async it => {
    const content = await promises.readFile(it, 'utf8')
    const parsedContent = toMd(parse(content))
    if (content === parsedContent) {
      console.log(`${it} ✅`)
      return
    }
    if (content !== parsedContent && commander.write) {
      console.log(`${it} ✏️`)
      await promises.writeFile(it, parsedContent)
      return
    }
    console.log(`${it} ❌`)
    exit(1)
  })
})

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}
