import commander from 'commander'
import { readFileSync, existsSync } from 'fs'

commander.version('1.0.0').usage('[command] [options]')

commander
  .command('lint <filename>')
  .description('Lints a twitter thread')
  .action((filename, options) => {
    if (!existsSync(filename)) {
      console.log(`The file ${filename} does not exist.`)
      return
    }
    const file = readFileSync(filename, 'utf8')
    const blocks = file.split('---')
    for (let i = 0, length = blocks.length; i < length; i++) {
      const counter = `${i}/${blocks.length - 1}`
      const text = blocks[i]
      const currentBlock = `${counter} ${text}`
      console.log(`Block [${counter}]: ${text}\nIt has ${currentBlock.length} characters.`)
      if (currentBlock.length > 280) {
        console.log('It should have stopped at:\n', currentBlock.slice(0, 280))
        break
      }
      console.log('---')
    }
    console.log('Completed')
  })

commander
  .command('apply <filename>')
  .description('Renders a twitter thread')
  .action((filename, options) => {
    if (!existsSync(filename)) {
      console.log(`The file ${filename} does not exist.`)
      return
    }
    const file = readFileSync(filename, 'utf8')
    const blocks = file.split('---')
    const mappedBlocks = blocks.map((it, i) => {
      const counter = `${i}/${blocks.length - 1}`
      return `${counter} ${it}`
    })
    console.log(mappedBlocks.join('---\n'))
  })

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}
