import { ls } from 'shelljs'
import { exists } from 'fs'
import { read, toVFile, write } from '../../src/files'
import { selectAll } from 'unist-util-select'
import * as Mdast from 'mdast'
import { toMdast, toMd } from '../../src/markdown'
import { ok, equal, fail } from 'assert'
import toString from 'mdast-util-to-string'

export async function LintMd(paths: string[], writeInPlace = false) {
  return Promise.all(
    ls(paths).map(async file => {
      const vfile = await read(toVFile({ path: file }))
      const mdast = toMdast(vfile)
      const codeBlocks = [
        ...selectAll<Mdast.Code>('code', mdast),
        ...selectAll<Mdast.Terminal>('terminal', mdast),
        ...selectAll<Mdast.PowerShell>('powershell', mdast),
      ]
      codeBlocks.forEach(it => {
        it.value.split('\n').forEach((line, i) => {
          ok(
            line.length <= 120,
            `${vfile.path}:${it.position ? it.position!.start.line + i + 1 : `\n\n${toString(it)}`} code block has ${
              line.length
            } characters.`,
          )
        })
      })
      const headings = selectAll<Mdast.Heading>('heading', mdast)
      const titles = headings.filter(it => it.depth < 3).map(it => toId(toString(it)))
      const duplicateTitles = duplicateString(titles)
      equal(duplicateTitles.length, 0, `duplicate titles: (${duplicateTitles.join(', ')})`)

      selectAll<Mdast.Link>('link', mdast).forEach(link => {
        parseLink(link)({
          absolute: () => {},
          relative: () => {
            fail(`${vfile.path}:${link.position!.start.line} relative links are not allowed. Remove ${link.url}`)
          },
          inline: () => {
            const hasAnchor = headings.map(it => toId(toString(it))).includes(link.url.slice(1))
            ok(hasAnchor, `${vfile.path}:${link.position!.start.line} checking anchor existence for ${link.url}`)
          },
          file: async () => {
            const [linkedFile, anchor] = link.url.split('#') as [string, string | null]
            const subslingVfile = toVFile({ path: linkedFile })
            ok(
              await fileExist(subslingVfile.path),
              `${vfile.path}:${link.position!.start.line} checking link to local file ${linkedFile}`,
            )
            if (!!anchor) {
              const mdast = toMdast(await read(subslingVfile))
              const hasAnchor = selectAll<Mdast.Heading>('heading', mdast)
                .map(it => toId(toString(it)))
                .includes(anchor)
              ok(
                hasAnchor,
                `${vfile.path}:${link.position!.start.line} checking anchor ${anchor} for ${link.url} to ${linkedFile}`,
              )
            }
          },
        })
      })

      const parsedContent = toMd(mdast, vfile)
      if (vfile.contents === parsedContent.contents) {
        console.log(`transformation md => mdast => md didn't produce changes`)
        return
      }
      if (vfile.contents !== parsedContent.contents && writeInPlace) {
        console.log('Transforming markdown')
        await write({ ...vfile, contents: parsedContent.contents })
        return
      }
      fail('transformation md => mdast => md produced changes')
    }),
  )
}

function duplicateString(strings: string[]): string[] {
  return [...Array.from(new Set(strings.filter((it, index, arr) => arr.indexOf(it) !== index)))]
}

function parseLink(link: Mdast.Link) {
  return <T>({
    absolute,
    relative,
    inline,
    file,
  }: {
    absolute: () => T
    relative: () => T
    inline: () => T
    file: () => T
  }) => {
    // absolute
    if (link.url.startsWith('http')) {
      return absolute()
    }
    // external relative
    if (link.url.startsWith('/')) {
      return relative()
    }
    // local
    if (link.url.startsWith('#')) {
      return inline()
    }
    // relative
    return file()
  }
}

async function fileExist(filePath?: string) {
  if (!filePath) {
    return Promise.resolve(false)
  }
  return new Promise<boolean>(resolve => exists(filePath, it => (it ? resolve(true) : resolve(false))))
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}
