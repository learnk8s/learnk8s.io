import React from 'react'
import { extname } from 'path'
import md5 from 'md5'
import { existsSync, writeFileSync } from 'fs'
import { ok } from 'assert'
import postcss from 'postcss'
import cssnano from 'cssnano'
import shell, { cat, mkdir, cp } from 'shelljs'
import { minify } from 'terser'

enum AssetsType {
  IMAGE = 'IMAGE',
  JAVASCRIPT = 'JAVASCRIPT',
  EXTERNAL_JAVASCRIPT = 'EXTERNAL_JAVASCRIPT',
  CSS = 'CSS',
  JS = 'JS',
}

export interface Image {
  url: string
  description: string
  type: AssetsType.IMAGE
}

export function Image(image: { url: string; description: string }): Image {
  const digest = md5(cat(image.url).toString())
  mkdir('-p', '_site/a')
  ok(existsSync(image.url), `Image ${image.url} doesn't exist.`)
  cp(image.url, `_site/a/${digest}${extname(image.url)}`)
  return { ...image, type: AssetsType.IMAGE, url: `/a/${digest}${extname(image.url)}` }
}

export const Img: React.StatelessComponent<{ image: Image; className?: string }> = ({ image, className }) => {
  return <img src={image.url} alt={image.description} className={className || ''} />
}

export interface Javascript {
  script: string
  type: AssetsType.JAVASCRIPT
}

export function Javascript(js: { script: string }): Javascript {
  return { ...js, type: AssetsType.JAVASCRIPT }
}

export const Script: React.StatelessComponent<{ script: Javascript }> = ({ script }) => {
  return <script dangerouslySetInnerHTML={{ __html: script.script }} />
}

export interface ExternalJavascript {
  url: string
  type: AssetsType.EXTERNAL_JAVASCRIPT
}

export function ExternalJavascript(js: { url: string }): ExternalJavascript {
  return { ...js, type: AssetsType.EXTERNAL_JAVASCRIPT }
}

export const ExternalScript: React.StatelessComponent<{ script: ExternalJavascript }> = ({ script }) => {
  return <script src={script.url} />
}

export interface CSSBundle {
  paths: string[]
  styles: string[]
  type: AssetsType.CSS
}

export function CSSBundle({ paths, styles }: { paths?: string | string[]; styles?: string | string[] }): CSSBundle {
  return {
    type: AssetsType.CSS,
    paths: Array.isArray(paths) ? paths : paths ? [paths] : [],
    styles: Array.isArray(styles) ? styles : styles ? [styles] : [],
  }
}

export const CSSLink: React.StatelessComponent<{ css: CSSBundle }> = ({ css }) => {
  const content = (css.paths.length === 0 ? '' : cat(css.paths)).toString().concat(css.styles.join('\n'))
  const digest = md5(content.toString())
  postcss([cssnano])
    .process(content, { from: 'src/style.css', to: `_site/a/${digest}.css` })
    .then(result => {
      ;(shell as any).ShellString(result).to(`_site/a/${digest}.css`)
      if (result.map) {
        ;(shell as any).ShellString(result).to(`_site/a/${digest}.css.map`)
      }
    })
  return <link rel='stylesheet' href={`/a/${digest}.css`} />
}

export interface JSBundle {
  paths: string[]
  scripts: string[]
  type: AssetsType.JS
}

export function JSBundle({ paths, scripts }: { paths?: string | string[]; scripts?: string | string[] }): JSBundle {
  return {
    type: AssetsType.JS,
    paths: Array.isArray(paths) ? paths : paths ? [paths] : [],
    scripts: Array.isArray(scripts) ? scripts : scripts ? [scripts] : [],
  }
}

export const JSScript: React.StatelessComponent<{ js: JSBundle }> = ({ js }) => {
  const content = (js.paths.length === 0 ? '' : cat(js.paths)).toString().concat(js.scripts.join('\n'))
  const digest = md5(content.toString())
  const minifiedJs = minify(content)
  if (minifiedJs.error) {
    console.log('ERROR minifying', minifiedJs.error)
  }
  writeFileSync(`_site/a/${digest}.js`, minifiedJs.code)
  return <script src={`/a/${digest}.js`} />
}
