import React from 'react'
import { extname } from 'path'
import { mkdir, cp, cat } from 'shelljs'
import md5 from 'md5'

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
  return {...image, type: AssetsType.IMAGE}
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

export function optimiseAssets<T extends NestedAssets>(assets: T): T {
  mkdir('-p', '_site/a')
  return Object.keys(assets).reduce((acc, key) => {
    if (assets[key].hasOwnProperty('type')) {
      switch((assets[key] as Assets).type) {
        case AssetsType.IMAGE: {
          const asset = assets[key] as Image
          const digest = md5(cat(asset.url).toString())
          cp(asset.url, `_site/a/${digest}${extname(asset.url)}`)
          acc[key] = {...asset, url: `/a/${digest}${extname(asset.url)}`}
          break
        }
        case AssetsType.JAVASCRIPT: {
          acc[key] = assets[key]
          break
        }
        case AssetsType.EXTERNAL_JAVASCRIPT: {
          acc[key] = assets[key]
          break
        }
        default: {
          break
        }
      }
    } else {
      acc[key] = optimiseAssets(assets[key] as NestedAssets)
    }
    return acc
  }, {} as T)
}

type Assets = Image | Javascript | ExternalJavascript

interface NestedAssets {
  [name: string]: NestedAssets | Assets
}