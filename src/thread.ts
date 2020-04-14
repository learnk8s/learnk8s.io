import commander from 'commander'
import { readFileSync, existsSync } from 'fs'
import Twitter from 'twitter-lite'

const CONSUMER_KEY = process.env.CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.CONSUMER_SECRET || ''
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || ''
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ''

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
      console.log(text)
      console.log(text.length)
      console.log(text.trim().length)
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

commander
  .command('post <filename>')
  .description('Post to twitter thread')
  .action(async filename => {
    checkFileExists(filename)
    const blocks = makeBlocks(filename)
    lint(blocks)
    const tw = initTwitterClient()
    await post(tw, blocks.length - 1, blocks)
    console.log('Complated')
  })

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}

function checkFileExists(filename: string) {
  if (!existsSync(filename)) {
    throw new Error(`The file ${filename} does not exist.`)
  }
}

function makeBlocks(filename: string): string[] {
  const file = readFileSync(filename, 'utf8')
  return file.split('---').map((text, i, arr) => {
    const total = arr.length - 1
    const counter = `${i}/${total}`
    return `${counter}\n\n${text.trim()}`
  })
}

function lint(blocks: string[]): void {
  blocks.forEach(block => {
    if (block.length > 280) {
      throw new Error(`It should have stopped at:\n ${block.slice(0, 280)}`)
    }
  })
}

function initTwitterClient(): Twitter {
  return new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET,
  })
}

async function post(tw: Twitter, index: number, blocks: string[]): Promise<Record<string, any>> {
  if (index === 0) {
    const response = await tw.post('statuses/update', {
      status: blocks[index],
    })
    console.log(`Posted ${index}/${blocks.length - 1}`)
    return response
  }
  const response = await tw.post('statuses/update', {
    status: blocks[index],
    in_reply_to_status_id: (await post(tw, index - 1, blocks)).id_str,
  })
  console.log(`Posted ${index}/${blocks.length - 1}`)
  return response
}
