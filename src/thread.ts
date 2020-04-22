import commander from 'commander'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import Twitter from 'twitter-lite'
import { resolve, join, dirname, extname } from 'path'
import { homedir } from 'os'
import { createInterface, Interface } from 'readline'
import { tempdir } from 'shelljs'
import { tachyons } from './tachyons/tachyons'
import { jsxToHast } from './jsx-utils/jsxToHast'
import toHtml from 'hast-util-to-html'
import * as Hast from 'hast'
import { transform } from './markdown/utils'
import { mdast2Jsx } from './markdown/jsx'
import { toMdast, toMd } from './markdown'
import { toVFile } from './files'
import * as Hast$ from 'hast-util-select'
import * as Unist$ from 'unist-util-select'
import remove from 'unist-util-remove'
import open from 'open'
import inspect from 'unist-util-inspect'
import { selectAll } from 'unist-util-select'
import { mdast2tweet } from './markdown/tweet'

const configFile = join(homedir(), '.thread.json')

type Config = Record<string, Profile>

interface Profile {
  name: string
  active: boolean
  credential: TwitterCredential
}

interface TwitterCredential {
  consumer_key: string
  consumer_secret: string
  access_token_key: string
  access_token_secret: string
}

interface Content {
  text: string
  images: string[]
}

interface PostContent {
  text: string
  mediaIds: string[]
}

interface ImageData {
  path: string
  total_bytes: number
  media_type: string
  media_data: string
}

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
      const mdast = toMdast(toVFile({ contents: text }))
      remove(mdast, { cascade: true }, node => Unist$.matches('image', node))
      const currentBlock = i === 0 ? text : `${counter} ${toMd(mdast, toVFile({ contents: '' })).contents}`
      console.log(
        `Block [${counter}]: ${toMd(mdast, toVFile({ contents: '' })).contents}\nIt has ${
          currentBlock.length
        } characters.`,
      )
      if (currentBlock.length > 280) {
        console.log('It should have stopped at:\n', currentBlock.slice(0, 280))
        break
      }
      console.log('---')
    }
    console.log('Completed')
  })

commander
  .command('preview <filename>')
  .description('Renders a twitter thread')
  .action((filename, options) => {
    if (!existsSync(filename)) {
      console.log(`The file ${filename} does not exist.`)
      return
    }
    const file = readFileSync(filename, 'utf8')
    const blocks = file.split('---')
    const mappedBlocks = blocks.map((it, i) => {
      const mdast = toMdast(toVFile({ contents: it }))
      const hast = jsxToHast(transform(mdast, mdast2Jsx()))
      const root = { type: 'root', children: Array.isArray(hast) ? hast : [hast] } as Hast.Root
      const imageSrcs = Hast$.selectAll('img', root).map(image => {
        return (image.properties as { src: string }).src
      })
      remove(root, { cascade: true }, node => Hast$.matches('img', node))
      const html = toHtml(root, {
        allowDangerousHTML: true,
        allowDangerousCharacters: true,
      })
      const imagesHtml =
        imageSrcs.length === 0
          ? ''
          : `<div class="flex pt4">${imageSrcs
              .map(src => `<div><img src="${resolve(join(dirname(filename), src))}"/></div>`)
              .join('')}</div>`
      const counter = `<p class="gray f5 b lh-copy">${i}/${blocks.length - 1}</p>`
      return `<li class='mv4 bg-white pt3 pb4 ph4 br2'><div>${i === 0 ? '' : counter}${html}</div>${imagesHtml}</li>`
    })
    const html = `<html><head><title></title><style>${tachyons}</style></head><body class="sans-serif bg-evian"><ol class="list pl0 mw7 ph3 center pv4">${mappedBlocks.join(
      '\n',
    )}</ol></body></html>`
    const tmpFolder = tempdir()
    const previewFile = join(tmpFolder, `thread-${Date.now()}.html`)
    writeFileSync(previewFile, html)
    open(previewFile)
  })

commander
  .command('post <filename>')
  .description('Post a twitter thread')
  .action(async filename => {
    const profile = getProfile()
    if (!profile) {
      return
    }
    checkFileExists(filename)
    const blocks = makeBlocks(filename)
    const contents = extractImage({ blocks, filename })
    lint(contents.map(c => c.text))

    // const imagePaths = contents
    //   .reduce((acc, b) => [...acc, ...b.images], [] as string[])
    //   .filter((path, i, arr) => arr.indexOf(path) === i)
    // imagePaths.forEach(path => checkFileExists(path))
    // checkImageNumberPerPost(contents)
    // const imagesData = imagePaths.map(getImagesData)
    // imagesData.forEach(checkImageSize)

    // const confirmation = await confirmProfile(profile)
    // if (confirmation.input.toLowerCase() !== 'y') {
    //   console.log('Tweets do not post.')
    //   confirmation.rl.close()
    // }

    // const twMedia = initTwitterMediaClient(profile.credential)
    // const pathAndImageId = await uploadImages(twMedia, imagesData)
    // const postContents = contents.map(content => {
    //   const mediaIds = content.images.map(path => pathAndImageId.find(img => path === img.path))
    //   return {
    //     text: content.text,
    //     mediaIds: mediaIds.map(it => it?.mediaId),
    //   }
    // })

    const tw = initTwitterClient(profile.credential)
    // await post({ tw, index: postContents.length - 1, contents: postContents })


    const response = await tw.post('statuses/update', {
      status: contents[0].text,
    })
    console.log(contents[0].text)
    console.log(`Posted ${0}/${contents.length - 1}`)
    console.log('Post Completed')
    // confirmation.rl.close()
  })

commander
  .command('authenticate <profileName>')
  .option('--ckey <consumer-key>', 'The consumer key of Twitter API')
  .option('--csecret <consumer-secret>', 'The consumer secret of Twitter API')
  .option('--tkey <access-token-key>', 'The access token key of Twitter API')
  .option('--tsecret <access-token-secret>', 'The access token secret of Twitter API')
  .description('Create new Twitter client profile')
  .action((profileName, options) => {
    if (!profileName || `${profileName}`.length === 0) {
      console.log('Please enter a valid profile name.')
      return
    }
    if (!options.ckey) {
      console.log("Please enter your consumer key with '--ckey'.")
      return
    }
    if (!options.csecret) {
      console.log("Please enter your consumer secret with '--csecret'.")
      return
    }
    if (!options.tkey) {
      console.log("Please enter your access token key with '--tkey'.")
      return
    }
    if (!options.tsecret) {
      console.log("Please enter your access token secret with '--tsecret'.")
      return
    }

    const config = readConfig(configFile)
    const newConfig: Config = {
      ...config,
      [profileName]: {
        name: profileName,
        active: false,
        credential: {
          consumer_key: options.ckey,
          consumer_secret: options.csecret,
          access_token_key: options.tkey,
          access_token_secret: options.tsecret,
        },
      },
    }
    writeConfig(newConfig)
    console.log('Profile created.')
  })

commander
  .command('profile:list')
  .description('Lists all profiles')
  .action(() => {
    const config = readConfig(configFile)
    console.table(
      Object.values(config).map(it => ({
        name: it.name,
        active: it.active ? '☑️' : '',
      })),
    )
  })

commander
  .command('profile:set <profileName>')
  .description('Sets a profile as active')
  .action(profileName => {
    if (!profileName || `${profileName}`.length === 0) {
      console.log('Please enter a valid profile name and retry.')
      return
    }
    const config = readConfig(configFile)
    const profiles = Object.values(config)
    if (!profiles.some(it => it.name === profileName)) {
      console.log('The profile does not exist. Please check the name and retry.')
      return
    }
    const newConfig = profiles.reduce((acc, profile) => {
      acc[profile.name] = { ...profile, active: profileName === profile.name }
      return acc
    }, {} as Config)
    writeConfig(newConfig)
    console.log(`Profile switched to ${profileName}.`)
  })

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}

function getProfile(): false | Profile {
  const config = readConfig(configFile)
  const profile = Object.values(config).find(p => p.active)
  if (!profile) {
    console.log('There is no active profile. Did you add one?')
    return false
  }
  return profile
}

function checkFileExists(filename: string) {
  if (!existsSync(filename)) {
    throw new Error(`The file ${filename} does not exist.`)
  }
}

function makeBlocks(filename: string): Content[] {
  const file = readFileSync(filename, 'utf8')
  return file.split('---').map((block, i, arr) => {
    const mdast = toMdast(toVFile({ contents: block }))
    const tweets: any[] = transform(mdast, mdast2tweet())

    const total = arr.length - 1
    const counter = `${i}/${total}`

    const text = tweets.filter((it: string | string[]) => Array.isArray(it)).join('\n\n')
    const tweetAndImage = {
      text: i === 0 ? text : `${counter}\n\n${text}`,
      images: tweets.filter((it: string | string[]) => !Array.isArray(it)),
    }
    return tweetAndImage
  })
}

function lint(blocks: string[]): void {
  blocks.forEach(block => {
    if (block.length > 280) {
      throw new Error(`It should have stopped at:\n ${block.slice(0, 280)}`)
    }
  })
}

function extractImage({ blocks, filename }: { blocks: Content[]; filename: string }): Content[] {
  return blocks.map(block => {

    const imagePaths = block.images.map(img => {
      return join(resolve(dirname(filename)), img)
    })
    return {
      text: block.text,
      images: imagePaths,
    }
  })
}

function checkImageNumberPerPost(contents: Content[]) {
  contents.forEach(content => {
    content.images.forEach(path => {
      const ext = extname(path).slice(1)
      switch (ext) {
        case 'gif':
          if (content.images.length > 1) {
            throw new Error(`Only 1 'gif' per post allowed. At ${content.text}`)
          }
          break
        default:
          if (content.images.length > 4) {
            throw new Error(`Only 4 images per post allowed. At ${content.text}`)
          }
          break
      }
    })
  })
}

function checkImageSize(image: ImageData) {
  if (image.total_bytes > 5242880) {
    throw new Error(`Image size must not more than 5MB. File: ${image.path}`)
  }
}

function getImagesData(path: string): ImageData {
  const buffer = readFileSync(path)
  return {
    path,
    total_bytes: buffer.length,
    media_type: `image/${extname(path).slice(1)}`,
    media_data: buffer.toString('base64'),
  }
}

function initTwitterMediaClient(keysAndSecrets: TwitterCredential): Twitter {
  return new Twitter({
    ...keysAndSecrets,
    subdomain: 'upload',
  })
}

async function initImageUpload({ twMedia, data }: { twMedia: Twitter; data: ImageData }) {
  return await twMedia.post('media/upload', {
    command: 'INIT',
    total_bytes: data.total_bytes,
    media_type: data.media_type,
  })
}

async function appendImageUpload({ twMedia, data, mediaId }: { twMedia: Twitter; data: ImageData; mediaId: string }) {
  return await twMedia.post('media/upload', {
    command: 'APPEND',
    media_id: mediaId,
    media_data: data.media_data,
    segment_index: 0,
  })
}

async function finalizeImageUpload({ twMedia, mediaId }: { twMedia: Twitter; mediaId: string }) {
  return await twMedia.post('media/upload', {
    command: 'FINALIZE',
    media_id: mediaId,
  })
}

async function uploadImages(twMedia: Twitter, data: ImageData[]) {
  return await Promise.all(
    data.map(async imgData => {
      const initResponse = await initImageUpload({ twMedia, data: imgData })
      await appendImageUpload({ twMedia, data: imgData, mediaId: initResponse.media_id_string })
      const finalizeResponse = await finalizeImageUpload({ twMedia, mediaId: initResponse.media_id_string })
      if (finalizeResponse.error) {
        throw new Error(`Failed to upload image: ${finalizeResponse.error}`)
      }
      console.log(`${imgData.path} - Upload Completed`)
      return {
        path: imgData.path,
        mediaId: finalizeResponse.media_id_string,
      }
    }),
  )
}

function initTwitterClient(keysAndSecrets: TwitterCredential): Twitter {
  return new Twitter({
    ...keysAndSecrets,
  })
}

async function post({
  tw,
  index,
  contents,
}: {
  tw: Twitter
  index: number
  contents: PostContent[]
}): Promise<Record<string, any>> {
  if (index === 0) {
    const response = await tw.post('statuses/update', {
      status: contents[index].text,
      media_ids: contents[index].mediaIds.join(','),
    })
    console.log(`Posted ${index}/${contents.length - 1}`)
    return response
  }
  const response = await tw.post('statuses/update', {
    status: contents[index].text,
    media_ids: contents[index].mediaIds.join(','),
    in_reply_to_status_id: (await post({ tw, index: index - 1, contents })).id_str,
  })
  console.log(`Posted ${index}/${contents.length - 1}`)
  return response
}

function checkAndCreateConfigFile(filename: string) {
  if (!existsSync(filename)) {
    writeFileSync(configFile, JSON.stringify({}))
  }
}

function readConfig(filename: string): Config {
  try {
    checkAndCreateConfigFile(filename)
    return JSON.parse(readFileSync(filename, 'utf8'))
  } catch (e) {
    console.log(e.message)
    return {}
  }
}

function writeConfig(config: Record<string, Profile>) {
  writeFileSync(configFile, JSON.stringify(config))
}

function confirmProfile(profile: Profile): Promise<{ input: string; rl: Interface }> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on('close', function() {
    process.exit(0)
  })

  return new Promise(resolve => {
    rl.question(`Active Profile: ${profile.name}, proceed to post tweets? (y/n)`, input => resolve({ input, rl }))
  })
}
