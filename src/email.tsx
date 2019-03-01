import React from 'react'
import { Mjml, MjmlHead, MjmlTitle, MjmlPreview, MjmlBody, MjmlSection, render } from 'mjml-react'
import marked from 'marked'
import { cat } from 'shelljs'
import { ok } from 'assert'
import { existsSync } from 'fs'
const commander = require('commander')

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
  return !!title ?
    `<mj-button background-color="#346DB7" href="${href}" font-family="${font}" line-height="1.5" font-size="18px">${text}</mj-button>` :
    `<a href="${href}">${text}</a>`
}

export const NewsletterLayout: React.StatelessComponent<{title: string, preview?: string, content: string}> = ({title, preview, content}) => {
  return <Mjml>
  <MjmlHead>
    <MjmlTitle>{title}</MjmlTitle>
    {!!preview ? <MjmlPreview>{preview}</MjmlPreview> : null}
  </MjmlHead>
  <MjmlBody width={600}>
    <MjmlSection>
      <Md content={content} />
    </MjmlSection>
  </MjmlBody>
</Mjml>
}

export const Md: React.StatelessComponent<{content: string}> = ({content}) => {
  return React.createElement('mj-column', {dangerouslySetInnerHTML: {__html: `${marked(content, {renderer})}`}});
}

const newsletter = <NewsletterLayout title={commander.title} preview={commander.preview} content={cat(commander.md).toString()}/>
console.log(render(newsletter).html)