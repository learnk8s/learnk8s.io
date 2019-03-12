import React from 'react'
import { extname } from 'path'
import { mkdir, cp, cat } from 'shelljs'
import md5 from 'md5'
import { existsSync } from 'fs'
import { ok } from 'assert'

const cache: {[name: string]: boolean} = {}

enum AssetsType {
  IMAGE = 'IMAGE',
  JAVASCRIPT = 'JAVASCRIPT',
  EXTERNAL_JAVASCRIPT = 'EXTERNAL_JAVASCRIPT',
}

export interface Image {
  url: string
  description: string
  type: AssetsType.IMAGE
}

export function Image(image: {url: string, description: string}): Image {
  const digest = md5(cat(image.url).toString())
  if (digest in cache) {
    return {...image, type: AssetsType.IMAGE, url: `/a/${digest}${extname(image.url)}`}
  }
  mkdir('-p', '_site/a')
  ok(existsSync(image.url), `Image ${image.url} doesn't exist.`)
  cp(image.url, `_site/a/${digest}${extname(image.url)}`)
  cache[digest] = true
  return {...image, type: AssetsType.IMAGE, url: `/a/${digest}${extname(image.url)}`}
}

export const Img: React.StatelessComponent<{image: Image, className?: string}> = ({image, className}) => {
  return <img src={image.url} alt={image.description} className={className || ''}/>
}

export interface Javascript {
  script: string
  type: AssetsType.JAVASCRIPT
}

export function Javascript(js: {script: string}): Javascript {
  return {...js, type: AssetsType.JAVASCRIPT}
}

export const Script: React.StatelessComponent<{script: Javascript}> = ({script}) => {
  return <script dangerouslySetInnerHTML={{__html: script.script}}></script>
}

export interface ExternalJavascript {
  url: string
  type: AssetsType.EXTERNAL_JAVASCRIPT
}

export function ExternalJavascript(js: {url: string}): ExternalJavascript {
  return {...js, type: AssetsType.EXTERNAL_JAVASCRIPT}
}

export const ExternalScript: React.StatelessComponent<{script: ExternalJavascript}> = ({script}) => {
  return <script src={script.url}></script>
}