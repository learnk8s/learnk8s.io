import marked from 'marked'
import { cat } from 'shelljs'
import { ok } from 'assert'
import { existsSync } from 'fs'
import commander from 'commander'
import mjml2html from 'mjml'

commander
  .version('1.0.0')
  .option('--md <markdown>', 'The markdown that should be rendered as email')
  .option('--title <title>', 'The title for the email')
  .option('--preview <title>', 'The preview for the email')
  .parse(process.argv)

ok(commander.md, 'Please provide a markdown file')
ok(commander.title, 'Please provide a title')
ok(existsSync(commander.md), 'Please provide a valid markdown file')

const renderer = new marked.Renderer()

const font = `-apple-system,BlinkMacSystemFont,'avenir next',avenir,helvetica,'helvetica neue',ubuntu,roboto,noto,'segoe ui',arial,sans-serif`

renderer.paragraph = (text: string) => {
  if (text.startsWith('<mj-button') && text.endsWith('/mj-button>')) {
    return text
  }
  return `<mj-text font-family="${font}" line-height="1.5" font-size="18px">${text}</mj-text>`
}
renderer.list = (body: string, ordered: boolean, start: number) => {
  const type = ordered ? 'ol' : 'ul'
  return `<mj-text font-family="${font}" line-height="1.5" font-size="18px"><${type}>${body}</${type}></mj-text>`
}
renderer.link = (href: string, title: string, text: string) => {
  return !!title
    ? `<mj-button background-color="#346DB7" href="${href}" font-family="${font}" line-height="1.5" font-size="18px">${text}</mj-button>`
    : `<a href="${href}">${text}</a>`
}

const newsletter = (title: string, content: string, preview?: string) => `<mjml>
<mj-head>
  <mj-title>${title}</mj-title>
  ${!!preview ? `<mj-preview>${preview}</mj-preview>` : ''}
</mj-head>
<mj-body width="600px">
  <mj-section>
    <mj-column>${marked(content, { renderer })}</mj-column>
  </mj-section>
</mj-body>
<mjml>`

console.log(mjml2html(newsletter(commander.title, cat(commander.md).toString(), commander.preview)).html)
