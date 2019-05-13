import { ls, exit } from 'shelljs'
import commander from 'commander'
import { optimise } from '.'
import { promises } from 'fs'

commander
  .version('1.0.0')
  .usage(`svgo 'src/**/*.svg'`)
  .option('--write', 'Write the parsed file in place')
  .parse(process.argv)

commander.on('command:*', (paths: string[] | undefined) => {
  if (!paths || paths.length === 0) {
    commander.help()
    exit(1)
    return
  }
  ls(paths).forEach(async svgFileName => {
    const content = await promises.readFile(svgFileName, 'utf8')
    try {
      const optimisedContent = await optimise(content, ['anime-'])
      if (content === optimisedContent) {
        console.log(`${svgFileName} ✅`)
        return
      }
      if (content !== optimisedContent && commander.write) {
        console.log(`${svgFileName} ✏️`)
        await promises.writeFile(svgFileName, optimisedContent)
        return
      }
      console.log(`${svgFileName} ❌`)
      exit(1)
    } catch (error) {
      console.log(`ERROR in ${svgFileName}:\n${error}`)
      exit(1)
    }
  })
})

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}
