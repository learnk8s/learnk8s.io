import commander from 'commander'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import Twitter from 'twitter-lite'
import { resolve, join, dirname, extname } from 'path'
import { tempdir } from 'shelljs'
import { tachyons } from './tachyons/tachyons'
import { jsxToHast } from './jsx-utils/jsxToHast'
import toHtml from 'hast-util-to-html'
import * as Hast from 'hast'
import { transform } from './markdown/utils'
import { mdast2Jsx } from './markdown/jsx'
import { toMdast } from './markdown'
import { toVFile } from './files'
import { selectAll, matches } from 'hast-util-select'
import remove from 'unist-util-remove'
import open from 'open'

const KEYS_AND_SECRETS = {
  consumer_key: process.env.CONSUMER_KEY || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token_key: process.env.ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || '',
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
      const imageSrcs = selectAll('img', root).map(image => {
        return (image.properties as { src: string }).src
      })
      remove(root, { cascade: true }, node => matches('img', node))
      const html = toHtml(root, {
        allowDangerousHTML: true,
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
  .description('Post to twitter thread')
  .action(async filename => {
    checkFileExists(filename)
    const blocks = makeBlocks(filename)
    const contents = extractImage({ blocks, filename })
    lint(contents.map(c => c.text))

    const imagePaths = contents
      .reduce((acc, b) => [...acc, ...b.images], [] as string[])
      .filter((path, i, arr) => arr.indexOf(path) === i)
    imagePaths.forEach(path => checkFileExists(path))
    checkImageNumberPerPost(contents)
    const imagesData = imagePaths.map(getImagesData)
    imagesData.forEach(checkImageSize)

    const twMedia = initTwitterMediaClient()
    const pathAndImageId = await uploadImages(twMedia, imagesData)
    const postContents = contents.map(content => {
      const mediaIds = content.images.map(path => pathAndImageId.find(img => path === img.path))
      return {
        text: content.text,
        mediaIds: mediaIds.map(it => it?.mediaId),
      }
    })

    const tw = initTwitterClient()
    await post({ tw, index: postContents.length - 1, contents: postContents })
    console.log('Completed')
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

function extractImage({ blocks, filename }: { blocks: string[]; filename: string }): Content[] {
  const imagesRegex = /!\[.*?\]\(.+?\)/g
  const imagePathRegex = /!\[.*?\]\((.+?)\)/
  return blocks.map(block => {
    const images = block.match(imagesRegex) || []
    const imagePaths = images.map(img => {
      const [, path] = img.match(imagePathRegex)!
      return join(resolve(dirname(filename)), path)
    })
    const text = block.replace(imagesRegex, '')
    return {
      text: text,
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

function initTwitterMediaClient(): Twitter {
  return new Twitter({
    ...KEYS_AND_SECRETS,
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

function initTwitterClient(): Twitter {
  return new Twitter({
    ...KEYS_AND_SECRETS,
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
