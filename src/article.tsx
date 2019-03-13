import marked from 'marked'
import * as React from 'react'
import Prism from 'prismjs'
import { Img, Image } from './assets'
import { Sitemap } from './sitemap'
import { Layout, Navbar, Footer} from './layout'

const loadLanguages = require('prismjs/components/')
loadLanguages(['powershell', 'bash', 'docker', 'json', 'yaml', 'sql', 'ruby'])

export const Article: React.StatelessComponent<{
  website: Sitemap
  siteUrl: string
  seoTitle: string
  title: string
  description: string
  openGraphImage: Image
  absolutUrl: string
  authorFullName: string
  authorAvatar: Image
  authorLink: string
}> = ({
  website,
  siteUrl,
  seoTitle,
  title,
  description,
  openGraphImage,
  absolutUrl,
  authorFullName,
  authorAvatar,
  authorLink,
  children,
}) => {
  return <Layout
  website={website}
  seoTitle={seoTitle}
  title={title}
  description={description}
  openGraphImage={openGraphImage}
  absoluteUrl={absolutUrl}>
    <div className='white pv2 pv0-ns mb4 mb5-ns'>
      <Navbar root={website} />
    </div>
    <div className='tc mb4 db mw4 center'>
      <Author name={authorFullName} avatar={authorAvatar} link={authorLink} />
    </div>
    <article className='ph3 pt0 pb4 article'>
      <h1 className='navy tc f2 f1-ns'>{title}</h1>
      <Img image={openGraphImage}/>
      <hr className='w3 center b--navy mv4 mb5-ns'/>
      {children}
    </article>
    <Footer root={website}/>
  </Layout>
}

export const Author: React.StatelessComponent<{name: string, link: string, avatar: Image}> = ({name, link, avatar}) => {
  return <div>
    <a href={link} title={name} className='link'>
      <Img image={avatar} className='br-100 w3 dib' />
      <span className='black-50 f6 db'>{name}</span>
    </a>
  </div>
}

export const Markdown: React.StatelessComponent<{markdown: string}> = ({markdown}) => {
  const renderer = new marked.Renderer()
  const inlineRenderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    switch (level) {
      case 1:
        return `<h${level} class="f${level} pt5" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      case 2:
        return `<h${level} class="f${level} pt4 pb2" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      case 3:
        return `<h${level} class="f${level} pt3" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      default:
        return `<h${level} class="f${level}" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
    }
  }
  renderer.paragraph = (text) => {
    if (text.startsWith('<img') && text.endsWith('/>')) {
      return text
    }
    return `<p class="lh-copy measure-wide f4">${text}</p>`
  }
  inlineRenderer.paragraph = (text) => {
    return `<p class="lh-copy measure-wide f5">${text}</p>`
  }
  renderer.image = (src, title, text) => {
    const {url, description} = Image({url: src, description: title})
    return `<img src="${url}" alt="${description}" class="db pv3"/>`
  }
  renderer.code = (code, langAndLines, escaped) => {
    const matches = (langAndLines || '').match(/\{(.*?)\}/)
    const lang = (langAndLines || '').replace(/(\{.*?\})/, '')
    const lines = !!matches ? matches[1] : undefined
    switch (lang) {
      case 'slideshow':
        return renderSlideshow(JSON.parse(code))
      case 'eval':
        return code
      default:
        return decorateWithEditor(lang, code, lines)
    }

    function renderSlideshow({slides, description}: {description: string, slides: {image: string, description: string}[]}) {
      return `<div class="slideshow-js overflow-hidden">
  <ul class="pl0 list slider-js">
      ${slides.map(({image, description}, index) => {
        const optimisedImage = Image({url: image, description})
        return `<li class="mv3">
          <img src="${optimisedImage.url}" alt="${optimisedImage.description}"/>
          <div class="bt b-solid bw2 b--black-70 relative mt3">
            <div class="bg-black-10 br1 pa1 dib mt2 absolute bottom-1 left-0"><span class="b black-60">${index + 1}</span><span class="f7 black-50">/${slides.length}</span></div>
          </div>
          <div class="navigation-js flex items-start justify-between bg-evian ph2">
            <div class="f5 lh-copy black-90 w-60 center">${marked(description, {renderer: inlineRenderer})}</div>
          </div>
        </li>`
      }).join('')}
  </ul>
</div>`
    }

    function decorateWithEditor(lang: string, code: string, lines?: string) {
      return `<div class="">
  <header class="bg-light-gray flex pv2 pl1 br--top br2">
    <div class="w1 h1 ml1 bg-dark-red br-100"></div>
    <div class="w1 h1 ml1 bg-green br-100"></div>
    <div class="w1 h1 ml1 bg-yellow br-100"></div>
  </header>
  ${!!lang ?
    `<pre class="code language-${lang} relative" ${lines ? `data-line="${lines}"` : ''}><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang])}</code>` :
    `<pre class="code language-none relative"><code class="language-none">${code}</code></pre>`
  }
</pre>
</div>`
    }
  }
  renderer.blockquote = (quote) => {
    return `<blockquote class="pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4">${quote}</blockquote>`
  }
  renderer.strong = (text) => {
    return `<strong class="b">${text}</strong>`
  }
  renderer.em = (text) => {
    return `<em class="i">${text}</em>`
  }
  renderer.link = (href, title, text) => {
    const isLocal = !(/^http/.test(href))
    const target = isLocal ? '_self' : '_blank'
    return !!title ?
      `<a href="${href}" class="link dib white bg-blue br1 pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer">${text}</a>` :
      `<a href="${href}" class="link navy underline hover-sky" target=${target}>${text}</a>`
  }
  renderer.codespan = inlineRenderer.codespan = (code) => {
    return `<code class="code f5 lh-copy bg-near-white br2 pv1 ph2 fs-normal">${code}</code>`
  }
  renderer.list = (body, ordered) => {
    const type = ordered ? 'ol' : 'ul'
    return `<${type}>${body}</${type}>`
  }
  renderer.listitem = (text) => {
    return `<li class="lh-copy f4 mv1 measure-wide">${text}</li>`
  }
  renderer.tablecell = (content: string, flags: {header: boolean, align: 'center' | 'left' | 'right' | null}) => {
    let commonClasses = ''
    switch (flags.align) {
      case 'center':
        commonClasses += ' tc'
        break
      case 'left':
        commonClasses += ' tl bg-washed-yellow'
        break
      case 'right':
        commonClasses += ' tr'
        break
    }
    return flags.header ? `<th class="bg-near-white ${commonClasses} pa2 ba bw2 b--white">${content}</th>` : `<td class="${commonClasses} bb bw1 b--black-50 pa3">${content}</td>`
  }
  renderer.tablerow = (content: string) => {
    return `<tr>${content}</tr>`
  }
  renderer.table = (header: string, body: string) => {
    return `<table class="table w-100 f4 mv3 mv5-l" cellspacing="0"><thead>${header}</thead><tbody class="lh-copy">${body}</tbody></table>`
  }
  return <div dangerouslySetInnerHTML={{__html: marked(markdown, {renderer})}}></div>
}
