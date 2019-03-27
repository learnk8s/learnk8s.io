import { Image, AsciiCast } from './assets'
import marked from 'marked'
import { cat } from 'shelljs'
import Prism from 'prismjs'
import { renderToStaticMarkup } from 'react-dom/server'
import * as React from 'react'
import cheerio from 'cheerio'

require('prismjs/components/')()

const prismSolarizedCss = cat('src/prism-solarizedlight.css').toString()

export function Markdown(content: string, assetsPath: string): { html: string; css: string[]; js: string[] } {
  const js: string[] = []
  const css: string[] = []
  const renderer = new marked.Renderer()
  const inlineRenderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    switch (level) {
      case 1:
        return `<h${level} class="f${level} pt5" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      case 2:
        return `<h${level} class="f${level} pt4 pb2" id="${raw
          .toLowerCase()
          .replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      case 3:
        return `<h${level} class="f${level} pt3" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
      default:
        return `<h${level} class="f${level}" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>`
    }
  }
  renderer.paragraph = text => {
    if (text.startsWith('<img') && text.endsWith('/>')) {
      return text
    }
    return `<p class="lh-copy measure-wide f4">${text}</p>`
  }
  inlineRenderer.paragraph = text => {
    return `<p class="lh-copy measure-wide f5">${text}</p>`
  }
  renderer.image = (src, title, text) => {
    if (/\.cast$/gi.test(src)) {
      const asciiCast = AsciiCast({ castPath: `${assetsPath}/${src}` })
      return `<img src="${asciiCast.url}" alt="${title}" class="db pv4"/>`
    }
    const { url, description } = Image({ url: `${assetsPath}/${src}`, description: title })
    return `<img src="${url}" alt="${description}" class="db pv3"/>`
  }
  renderer.code = (code, args, escaped) => {
    const { lang, title, highlight } = extractArgs(args)
    switch (lang) {
      case 'slideshow':
        return renderSlideshow(JSON.parse(code))
      case 'include':
        return includeModule(code)
      case 'eval':
        return code
      default:
        return decorateWithEditor(lang, code, highlight, title)
    }

    function renderSlideshow({
      slides,
      description,
    }: {
      description: string
      slides: { image: string; description: string }[]
    }): string {
      js.push(`(${Slideshow.toString()})()`)
      css.push(`.pagination-icon {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: .125rem;
  display: inline-block;
  width: 0.4rem;
}`)
      return renderToStaticMarkup(
        <div className='slideshow-js overflow-hidden'>
          <ul className='pl0 list slider-js'>
            {slides.map(({ image, description }, index) => {
              const optimisedImage = Image({ url: `${assetsPath}/${image}`, description })

              return (
                <li className='mv3'>
                  <img src={optimisedImage.url} alt={optimisedImage.description} />
                  <div className='bt b-solid bw2 b--black-70 relative mt3'>
                    <div className='bg-black-10 br1 pa1 dib mt2 absolute bottom-1 left-0'>
                      <span className='b black-60'>{index + 1}</span>
                      <span className='f7 black-50'>/{slides.length}</span>
                    </div>
                  </div>
                  <div className='navigation-js flex items-start justify-between bg-evian ph2'>
                    <div
                      className='f5 lh-copy black-90 w-60 center'
                      dangerouslySetInnerHTML={{ __html: marked(description, { renderer: inlineRenderer }) }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>,
      )
    }

    function includeModule(module: string): string {
      const $ = cheerio.load(module, { decodeEntities: false })
      const style = $('style').html()
      const script = $('script').html()
      if (style) {
        css.push(style)
      }
      if (script) {
        js.push(script)
      }
      const html = $('template').html()
      return html ? `<div class="mv4 mv5-l">${html}</div>` : ''
    }

    function decorateWithEditor(lang: string | null, code: string, lines: string | null, title: string | null): string {
      css.push(prismSolarizedCss)
      const codeAsLines = code.split('\n')
      const groupedCode = groupHighlightedCode(lines, codeAsLines.length)
      const codeBlocks = groupedCode.map(([groupType, lines]) => {
        const start = lines[0]
        const end = lines[lines.length - 1]
        const currentBlock = codeAsLines.slice(start - 1, end).join('\n')
        switch (groupType) {
          case Group.HIGHLIGHT:
            return `<span class="highlight">${
              !!lang ? Prism.highlight(currentBlock, Prism.languages[lang]) : currentBlock
            }</span>`
          case Group.STANDARD:
            return `<span class="standard">${
              !!lang ? Prism.highlight(currentBlock, Prism.languages[lang]) : currentBlock
            }</span>`
        }
      })
      return renderToStaticMarkup(
        <div className='mv4 mv5-l'>
          <header className='bg-light-gray flex pv2 pl1 br--top br2 relative'>
            <div className='w1 h1 ml1 bg-dark-red br-100' />
            <div className='w1 h1 ml1 bg-green br-100' />
            <div className='w1 h1 ml1 bg-yellow br-100' />
            {!!title ? <p className='code f6 mv0 black-60 w-100 tc absolute top-0 left-0 h1 pv2'>{title}</p> : null}
          </header>
          <pre className={`code-light-theme relative pv4 overflow-auto mv0 br2 br--bottom`}>
            <code className={`code lh-copy`} dangerouslySetInnerHTML={{ __html: `${codeBlocks.join('\n')}` }} />
          </pre>
        </div>,
      )
    }
  }
  renderer.blockquote = quote => {
    return `<blockquote class="pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4">${quote}</blockquote>`
  }
  renderer.strong = text => {
    return `<strong class="b">${text}</strong>`
  }
  renderer.em = text => {
    return `<em class="i">${text}</em>`
  }
  renderer.link = (href, title, text) => {
    const isLocal = !/^http/.test(href)
    const attributes = isLocal ? 'target="_self"' : 'target="_blank" rel="noreferrer"'
    return !!title
      ? `<a href="${href}" class="link dib white bg-blue br1 pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer">${text}</a>`
      : `<a href="${href}" class="link navy underline hover-sky" ${attributes}>${text}</a>`
  }
  renderer.codespan = inlineRenderer.codespan = code => {
    return `<code class="code f5 lh-copy bg-near-white br2 pv1 ph2 fs-normal">${code}</code>`
  }
  renderer.list = (body, ordered) => {
    const type = ordered ? 'ol' : 'ul'
    return `<${type}>${body}</${type}>`
  }
  renderer.listitem = text => {
    return `<li class="lh-copy f4 mv1 measure-wide">${text}</li>`
  }
  renderer.tablecell = (content: string, flags: { header: boolean; align: 'center' | 'left' | 'right' | null }) => {
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
    return flags.header
      ? `<th class="bg-near-white ${commonClasses} pa2 ba bw2 b--white">${content}</th>`
      : `<td class="${commonClasses} bb bw1 b--black-50 pa3">${content}</td>`
  }
  renderer.tablerow = (content: string) => {
    return `<tr>${content}</tr>`
  }
  renderer.table = (header: string, body: string) => {
    return `<table class="table w-100 f4 mv3 mv5-l" cellspacing="0"><thead>${header}</thead><tbody class="lh-copy">${body}</tbody></table>`
  }
  return {
    html: marked(content, { renderer }),
    css: css.filter(onlyUnique),
    js: js.filter(onlyUnique),
  }
}

function range(start: number, end: number) {
  return [...Array.from(Array(1 + end - start).keys())].map(v => start + v)
}

export const enum Group {
  STANDARD = 'standard',
  HIGHLIGHT = 'highlight',
}

export function groupHighlightedCode(
  linesToHighlight: string | null | undefined,
  linesLength: number,
): [Group, number[]][] {
  if (!linesToHighlight) {
    return [[Group.STANDARD, range(1, linesLength)]]
  }
  const taggedCode = linesToHighlight.split(',').reduce(
    (acc, it) => {
      if (/-/.test(it)) {
        const [start, end] = it.split('-')
        return range(parseInt(start, 10), parseInt(end, 10)).reduce(
          (acc, n) => {
            acc[n] = it
            return acc
          },
          { ...acc },
        )
      } else {
        return { ...acc, [it]: it }
      }
    },
    {} as { [index: string]: string },
  )
  const { obj: fullyTaggedCode } = range(1, linesLength).reduce(
    (acc, n) => {
      if (!acc.obj[n]) {
        acc.obj[n] = `group${acc.counter}`
      } else {
        acc.counter += 1
      }
      return acc
    },
    { counter: 0, obj: taggedCode },
  )
  const groupedCodeBlocks = range(1, linesLength).reduce(
    (acc, n) => {
      const label = fullyTaggedCode[n]
      if (!acc[label]) {
        acc[label] = []
      }
      acc[label].push(n)
      return acc
    },
    {} as { [name: string]: number[] },
  )
  const sorted = Object.keys(groupedCodeBlocks)
    .map(key => {
      return [/^group/.test(key) ? Group.STANDARD : Group.HIGHLIGHT, groupedCodeBlocks[key]] as [Group, number[]]
    })
    .sort((a, b) => {
      return a[1][0] - b[1][0]
    })
  return sorted
}

export function extractArgs(args: string | null | undefined) {
  if (!args) {
    return {
      lang: null,
      highlight: null,
      title: null,
    }
  }
  let [head, ...rest] = args.split('|')
  let highlight = null
  let title = null
  let lang = null
  if (/=/.test(head)) {
    rest.push(head)
  } else {
    lang = head
  }
  const maybeHighlight = rest.find(it => /^highlight=/gi.test(it))
  if (!!maybeHighlight) {
    highlight = maybeHighlight.replace(/^highlight=/gi, '')
  }
  const maybeTitle = rest.find(it => /^title=/gi.test(it))
  if (!!maybeTitle) {
    title = maybeTitle.replace(/^title=/gi, '')
  }
  return {
    lang: lang || null,
    highlight,
    title,
  }
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}

function Slideshow() {
  function setupSlideshow(root: HTMLElement) {
    const width = root.offsetWidth
    const slides = [].slice.call(root.querySelectorAll('li')) as HTMLElement[]
    const slider = root.querySelector<HTMLElement>('.slider-js')
    if (!slider) {
      return console.log(`I couldn't find the slider`)
    }
    slider.style.width = `${width * slides.length}px`
    slider.classList.add('flex')
    slides.forEach(slide => (slide.style.width = `${width}px`))

    function createEmptyNav() {
      const emptyNav = document.createElement('div')
      emptyNav.classList.add('w-20')
      emptyNav.innerHTML = '&nbsp;'
      return emptyNav
    }

    slides.forEach((slide, index, items) => {
      const leftNav = document.createElement('div')
      leftNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20')
      leftNav.innerHTML = `<svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon mr2'>
  <polyline fill='none' vectorEffect='non-scaling-stroke' points='8,2 2,8 8,14'></polyline>
</svg>
<span class='ttu'>Previous</span>`
      leftNav.onclick = () => (root.scrollLeft -= width)
      const rightNav = document.createElement('div')
      rightNav.classList.add('f6', 'b', 'black-50', 'pv3', 'pointer', 'w-20', 'tr')
      rightNav.innerHTML = `<span class='ttu'>Next</span>
<svg viewBox='0 0 10 16' xmlns='http://www.w3.org/2000/svg' class='pagination-icon ml2'>
  <polyline fill='none' vectorEffect='non-scaling-stroke' points='2,2 8,8 2,14'></polyline>
</svg>`
      rightNav.onclick = () => (root.scrollLeft += width)
      const navigation = slide.querySelector('.navigation-js')
      if (!navigation) {
        return console.log(`I couldn't find the navigation`)
      }
      navigation.prepend(index === 0 ? createEmptyNav() : leftNav)
      navigation.append(index === items.length - 1 ? createEmptyNav() : rightNav)
    })
  }

  document.querySelectorAll<HTMLElement>('.slideshow-js').forEach(setupSlideshow)
}
