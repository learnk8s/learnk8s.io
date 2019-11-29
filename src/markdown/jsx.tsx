import Prism from 'prismjs'
import React, { Fragment } from 'react'
import { selectAll, select } from 'unist-util-select'
import { join } from 'path'
import toString from 'mdast-util-to-string'
import * as Mdast from 'mdast'
import { ok } from 'assert'
import { toMdast } from './mdast'
import { ArrayType, parseLink, transform, MdastVisitors } from './utils'
import { VFile, toPath } from '../files'
import parents from 'unist-util-parents'

require('prismjs/components/')()

export function renderToJsx(vfile: VFile): JSX.Element
export function renderToJsx(vfile: VFile<Mdast.Root>): JSX.Element
export function renderToJsx(vfile: VFile | VFile<Mdast.Root>): JSX.Element {
  const mdastTree = isString(vfile.contents) ? toMdast(vfile as VFile) : (vfile.contents as Mdast.Root)
  return transform(parents(mdastTree), mdast2Jsx())
}

export function mdast2Jsx(): MdastVisitors<JSX.Element> {
  return {
    root(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    text(node) {
      return <Fragment>{node.value}</Fragment>
    },
    slideshow(node, parent, { all }) {
      const slides = selectAll<Mdast.Slide>('slide', node).map(Slide)
      return (
        <div className='slideshow-js overflow-hidden'>
          <ul className='pl0 list slider-js'>{slides}</ul>
          <style
            dangerouslySetInnerHTML={{
              __html: `.pagination-icon {
              stroke: currentColor;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: .125rem;
              display: inline-block;
              width: 0.4rem;
            }`,
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: `(${Slideshow.toString()})()` }} />
        </div>
      )

      function Slide(slide: Mdast.Slide, index: number, slides: Mdast.Slide[]) {
        const img = select<Mdast.Image>('slide image', slide) as Mdast.Image
        const paragraphs = selectAll<Exclude<ArrayType<Mdast.Slideshow['children']>, Mdast.Slide>>(
          'slide > :not(image)',
          slide,
        )
        ok(img, `Missing image in slide ${node.position ? node.position.start.line : ''}`)
        return (
          <li key={index} className='mv3'>
            <img src={img.url} alt={toString(slide)} />
            <div className='bt b-solid bw2 b--black-70 relative mt0'>
              <div className='bg-black-10 br1 pa1 dib mt2 absolute bottom-1 left-0'>
                <span className='b black-60'>{index + 1}</span>
                <span className='f7 black-50'>/{slides.length}</span>
              </div>
            </div>
            <div className='navigation-js flex items-start justify-between bg-evian ph2'>
              <div className='f5 lh-copy black-90 w-60 center'>{paragraphs.map(Paragraph)}</div>
            </div>
          </li>
        )

        function Paragraph(paragraph: Mdast.Paragraph, index: number) {
          return (
            <p key={index} className='lh-copy measure-wide f5'>
              {all(paragraph)}
            </p>
          )
        }
      }
    },
    slide() {
      throw new Error('slide not implemented')
    },
    heading(node, parent, { all }) {
      const id = toId(toString(node))
      switch (node.depth) {
        case 1:
          return (
            <h1 className='f1 pt5' id={id}>
              {all(node)}
            </h1>
          )
        case 2:
          return (
            <h2 className='f2 pt4 pb2' id={id}>
              {all(node)}
            </h2>
          )
        case 3:
          return (
            <h3 className='f3 pt3' id={id}>
              {all(node)}
            </h3>
          )
        case 4:
          return (
            <h4 className='f4' id={id}>
              {all(node)}
            </h4>
          )
        default:
          return React.createElement(`h${node.depth}`, { className: `f${node.depth}`, id }, all(node))
      }
    },
    paragraph(node, parent, { all, one }) {
      if (node.children[0].type === 'image') {
        return one(node.children[0], node)
      }
      return <p className='lh-copy measure-wide f4'>{all(node)}</p>
    },
    blockquote(node, parent, { all }) {
      return <blockquote className='pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4'>{all(node)}</blockquote>
    },
    list(node, parent, { all }) {
      return node.ordered ? <ol>{all(node)}</ol> : <ul>{all(node)}</ul>
    },
    listItem(node, parent, { one }) {
      return (
        <li className='lh-copy f4 mv1 measure-wide'>
          {node.children
            .reduce((acc, it) => {
              if (it.type === 'paragraph') {
                return acc.concat(it.children.map(it => one(it)))
              }
              return acc.concat(one(it))
            }, [] as JSX.Element[])
            .map((it, i) => ({ ...it, key: i }))}
        </li>
      )
    },
    inlineCode(node) {
      return <code className='code f5 lh-copy bg-near-white br2 pv1 ph2 fs-normal'>{node.value}</code>
    },
    code(node) {
      const codeAsLines = node.value.split('\n')
      const groupedCode = groupHighlightedCode(
        node.data && (node.data.highlight as string | undefined),
        codeAsLines.length,
      )
      const codeBlocks = groupedCode.map(([groupType, lines], index, array) => {
        const start = lines[0]
        const end = lines[lines.length - 1]
        const isLastLine = index + 1 === array.length
        const currentBlock = `${codeAsLines.slice(start - 1, end).join('\n')}${isLastLine ? '' : '\n'}`
        switch (groupType) {
          case Group.HIGHLIGHT:
            return (
              <span
                key={index}
                className='highlight'
                dangerouslySetInnerHTML={{
                  __html: !!node.lang ? Prism.highlight(currentBlock, Prism.languages[node.lang]) : currentBlock,
                }}
              />
            )
          case Group.STANDARD:
            return (
              <span
                key={index}
                className='standard'
                dangerouslySetInnerHTML={{
                  __html: !!node.lang ? Prism.highlight(currentBlock, Prism.languages[node.lang]) : currentBlock,
                }}
              />
            )
        }
      })
      return (
        <div className='mv4 mv5-l'>
          <header className='bg-light-gray flex pv2 pl1 br--top br2 relative'>
            <div className='w1 h1 ml1 br-100 bg-dark-red' />
            <div className='w1 h1 ml1 br-100 bg-green' />
            <div className='w1 h1 ml1 br-100 bg-yellow' />
            {node.data && node.data.title ? (
              <p className='code f6 mv0 black-60 w-100 tc absolute top-0 left-0 h1 pv2'>{node.data.title as string}</p>
            ) : null}
          </header>
          <pre className='code-light-theme relative pv4 overflow-auto mv0 br2 br--bottom'>
            <code className='code lh-copy'>{codeBlocks}</code>
          </pre>
          <link rel='stylesheet' href={toPath(join(__dirname, 'prism-solarizedlight.css'))} />
        </div>
      )
    },
    terminal(node) {
      const codeAsLines = node.value.split('\n')
      const groupedCode = groupHighlightedCode(node.command, codeAsLines.length)
      const codeBlocks = groupedCode.map(([groupType, lines], index, array) => {
        const start = lines[0]
        const end = lines[lines.length - 1]
        const isLastLine = index + 1 === array.length
        const currentBlock = `${codeAsLines.slice(start - 1, end).join('\n')}${isLastLine ? '' : '\n'}`
        switch (groupType) {
          case Group.HIGHLIGHT:
            return (
              <span
                key={index}
                className='command prompt'
                dangerouslySetInnerHTML={{ __html: Prism.highlight(currentBlock, Prism.languages['bash']) }}
              />
            )
          case Group.STANDARD:
            return (
              <span
                key={index}
                className='output'
                dangerouslySetInnerHTML={{ __html: Prism.highlight(currentBlock, Prism.languages['bash']) }}
              />
            )
        }
      })
      if ((codeBlocks[codeBlocks.length - 1].props.className || '').indexOf('output') > -1) {
        codeBlocks.push(<span key={codeBlocks.length} className='output prompt mt3 empty' />)
      } else {
        codeBlocks[codeBlocks.length - 1] = {
          ...codeBlocks[codeBlocks.length - 1],
          props: {
            ...codeBlocks[codeBlocks.length - 1].props,
            className: `${codeBlocks[codeBlocks.length - 1].props.className} active`,
          },
        }
      }
      return (
        <div className='mv4 mv5-l'>
          <header className='bg-light-gray flex pv2 pl1 br--top br2 relative'>
            <div className='w1 h1 ml1 br-100 bg-dark-red' />
            <div className='w1 h1 ml1 br-100 bg-green' />
            <div className='w1 h1 ml1 br-100 bg-yellow' />
            {node.title ? (
              <p className='code f6 mv0 black-60 w-100 tc absolute top-0 left-0 h1 pv2'>{node.title}</p>
            ) : null}
          </header>
          <pre className='code-dark-theme relative pv4 overflow-auto mv0 br2 br--bottom'>
            <code className='code lh-copy'>{codeBlocks}</code>
          </pre>
          <link rel='stylesheet' href={toPath(join(__dirname, 'prism-okaidia.css'))} />
        </div>
      )
    },
    powershell(node) {
      const codeAsLines = node.value.split('\n')
      const groupedCode = groupHighlightedCode(node.command, codeAsLines.length)
      const codeBlocks = groupedCode.map(([groupType, lines], index, array) => {
        const start = lines[0]
        const end = lines[lines.length - 1]
        const isLastLine = index + 1 === array.length
        const currentBlock = `${codeAsLines.slice(start - 1, end).join('\n')}${isLastLine ? '' : '\n'}`
        switch (groupType) {
          case Group.HIGHLIGHT:
            return (
              <span
                key={index}
                className='command prompt'
                dangerouslySetInnerHTML={{ __html: Prism.highlight(currentBlock, Prism.languages['powershell']) }}
              />
            )
          case Group.STANDARD:
            return (
              <span
                key={index}
                className='output'
                dangerouslySetInnerHTML={{ __html: Prism.highlight(currentBlock, Prism.languages['powershell']) }}
              />
            )
        }
      })
      if ((codeBlocks[codeBlocks.length - 1].props.className || '').indexOf('output') > -1) {
        codeBlocks.push(<span key={codeBlocks.length} className='output prompt mt3 empty' />)
      } else {
        codeBlocks[codeBlocks.length - 1] = {
          ...codeBlocks[codeBlocks.length - 1],
          props: {
            ...codeBlocks[codeBlocks.length - 1].props,
            className: `${codeBlocks[codeBlocks.length - 1].props.className} active`,
          },
        }
      }
      return (
        <div className='mv4 mv5-l'>
          <header className='bg-white flex pv2 pl1 relative justify-end ba b--gray'>
            <div className='w1 h1 mr3'>—</div>
            <div className='w1 h1 mr3'>□</div>
            <div className='w1 h1 mr3'>𝖷</div>
            {node.title ? (
              <p className='code f6 mv0 black-60 w-100 tc absolute top-0 left-0 h1 pv2'>{node.title}</p>
            ) : null}
          </header>
          <pre className='powershell relative pv4 overflow-auto mv0 br2 br--bottom'>
            <code className='code lh-copy'>{codeBlocks}</code>
          </pre>
          <link rel='stylesheet' href={toPath(join(__dirname, 'prism-lakedark.css'))} />
        </div>
      )
    },
    html(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
    thematicBreak() {
      throw new Error('thematicBreak not implemented')
    },
    strong(node, parent, { all }) {
      return <strong className='b'>{all(node)}</strong>
    },
    emphasis(node, parent, { all }) {
      return <em className='i'>{all(node)}</em>
    },
    break() {
      throw new Error('break not implemented')
    },
    delete(node, parent, { all }) {
      return <span className='strike'>{all(node)}</span>
    },
    link(node, parent, { all }) {
      return parseLink(node)({
        absolute: external.bind(null, node),
        relative: internal.bind(null, node),
        inline: internal.bind(null, node),
        file: internal.bind(null, node),
      })
      function external(node: Mdast.Link) {
        return (
          <a
            href={node.url}
            target='_blank'
            rel='noreferrer'
            className={
              !!node.title
                ? 'link dib white bg-blue pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer'
                : 'link navy underline hover-sky'
            }
          >
            {all(node)}
          </a>
        )
      }
      function internal(node: Mdast.Link) {
        return (
          <a
            href={node.url}
            target='_self'
            className={
              !!node.title
                ? 'link dib white bg-blue pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer'
                : 'link navy underline hover-sky'
            }
          >
            {all(node)}
          </a>
        )
      }
    },
    linkReference(node, parent) {
      console.log(node, parent)
      throw new Error('linkReference not implemented')
    },
    imageReference() {
      throw new Error('imageReference not implemented')
    },
    definition() {
      throw new Error('definition not implemented')
    },
    image(node) {
      return <img className='db pv3 center' src={node.url} alt={node.alt || ''} title={node.title} />
    },
    footnote() {
      throw new Error('footnote not implemented')
    },
    footnoteReference() {
      throw new Error('footnoteReference not implemented')
    },
    footnoteDefinition() {
      throw new Error('footnoteDefinition not implemented')
    },
    table(node, parent, { all }) {
      const [firstRow, ...restRows] = node.children
      return (
        <table className='table w-100 f4 mv3 mv5-l'>
          <thead>
            <tr>
              {firstRow.children.map((it, index) => {
                return (
                  <th
                    key={index}
                    className={`bg-near-white pa2 ba bw2 b--white ${alignClass((node.align || [])[index])}`}
                  >
                    {all(it)}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {restRows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.children.map((it, index) => {
                    return (
                      <td key={index} className={`bb bw1 b--black-50 pa3 ${alignClass((node.align || [])[index])}`}>
                        {all(it)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
      function alignClass(align: string | undefined | null): string {
        switch (align) {
          case 'center':
            return 'tc'
          case 'left':
            return 'tl bg-washed-yellow'
          case 'right':
            return 'tr'
          default:
            return ''
        }
      }
    },
    tableCell() {
      throw new Error('tableCell not implemented')
    },
    tableRow() {
      throw new Error('tableRow not implemented')
    },
    animation(node) {
      return (
        <div className='js-animation-svg'>
          <object data={node.children[0].url} type='image/svg+xml' />
          <script dangerouslySetInnerHTML={{ __html: `(${ResetAnimation.toString()})()` }} />
        </div>
      )
    },
    include(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
  }
}

export function mdast2JsxInline(): MdastVisitors<JSX.Element> {
  return {
    root(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    text(node) {
      return <Fragment>{node.value}</Fragment>
    },
    slideshow(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    slide(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    heading(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    paragraph(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    blockquote(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    list(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    listItem(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    inlineCode(node) {
      return <code className='code f5 lh-copy bg-near-white br2 pv1 ph2 fs-normal'>{node.value}</code>
    },
    code(node) {
      return <Fragment />
    },
    terminal(node) {
      return <Fragment />
    },
    powershell(node) {
      return <Fragment />
    },
    html(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
    thematicBreak() {
      throw new Error('thematicBreak not implemented')
    },
    strong(node, parent, { all }) {
      return <strong className='b'>{all(node)}</strong>
    },
    emphasis(node, parent, { all }) {
      return <em className='i'>{all(node)}</em>
    },
    break() {
      throw new Error('break not implemented')
    },
    delete() {
      throw new Error('break not implemented')
    },
    link(node, parent, { all }) {
      return parseLink(node)({
        absolute: external.bind(null, node),
        relative: internal.bind(null, node),
        inline: internal.bind(null, node),
        file: internal.bind(null, node),
      })
      function external(node: Mdast.Link) {
        return (
          <a
            href={node.url}
            target='_blank'
            rel='noreferrer'
            className={
              !!node.title
                ? 'link dib white bg-blue pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer'
                : 'link navy underline hover-sky'
            }
          >
            {all(node)}
          </a>
        )
      }
      function internal(node: Mdast.Link) {
        return (
          <a
            href={node.url}
            target='_self'
            className={
              !!node.title
                ? 'link dib white bg-blue pv2 ph3 b f5 br2 mv3 hover-bg-dark-blue pointer'
                : 'link navy underline hover-sky'
            }
          >
            {all(node)}
          </a>
        )
      }
    },
    linkReference(node, parent) {
      throw new Error('linkReference not implemented')
    },
    imageReference() {
      throw new Error('imageReference not implemented')
    },
    definition() {
      throw new Error('definition not implemented')
    },
    image(node) {
      return <img className='db pv3 center' src={node.url} alt={node.alt || ''} title={node.title} />
    },
    footnote() {
      throw new Error('footnote not implemented')
    },
    footnoteReference() {
      throw new Error('footnoteReference not implemented')
    },
    footnoteDefinition() {
      throw new Error('footnoteDefinition not implemented')
    },
    table(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    tableCell(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    tableRow(node, parent, { all }) {
      return <Fragment>{all(node)}</Fragment>
    },
    animation(node) {
      return <Fragment />
    },
    include(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
  }
}

export const enum Group {
  STANDARD = 'standard',
  HIGHLIGHT = 'highlight',
}

function range(start: number, end: number) {
  return [...Array.from(Array(1 + end - start).keys())].map(v => start + v)
}

export function groupHighlightedCode(
  linesToHighlight: string | null | undefined,
  linesLength: number,
): [Group, number[]][] {
  if (!linesToHighlight) {
    return [[Group.STANDARD, range(1, linesLength)]]
  }
  const taggedCode = linesToHighlight.split(',').reduce((acc, it) => {
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
  }, {} as { [index: string]: string })
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
  const groupedCodeBlocks = range(1, linesLength).reduce((acc, n) => {
    const label = fullyTaggedCode[n]
    if (!acc[label]) {
      acc[label] = []
    }
    acc[label].push(n)
    return acc
  }, {} as { [name: string]: number[] })
  const sorted = Object.keys(groupedCodeBlocks)
    .map(key => {
      return [/^group/.test(key) ? Group.STANDARD : Group.HIGHLIGHT, groupedCodeBlocks[key]] as [Group, number[]]
    })
    .sort((a, b) => {
      return a[1][0] - b[1][0]
    })
  return sorted
}

function Slideshow() {
  function setupSlideshow(root: HTMLElement) {
    const width = root.offsetWidth
    const slides = [].slice.call(root.querySelectorAll('li')) as HTMLElement[]
    const slider = root.querySelector<HTMLElement>('.slider-js')
    if (!slider) {
      return console.log(`I couldn't find the slider`)
    }
    if (([].slice.call(slider.classList) as string[]).indexOf('ok') > 0) {
      return
    }
    slider.style.width = `${width * slides.length}px`
    slider.classList.add('flex', 'ok')
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

function ResetAnimation() {
  ;([].slice.call(document.querySelectorAll('.js-animation-svg')) as HTMLElement[]).forEach(it => {
    const obj = it.querySelector('object') as HTMLObjectElement | null
    if (!obj) {
      return
    }
    obj.onload = () => init(it)
  })

  function init(element: HTMLElement) {
    if (element.className.indexOf('ok') > 0) {
      return
    }
    const register = throttle(() => {
      if (isScrolledIntoView(element)) {
        reset(element)
        window.removeEventListener('scroll', register)
      }
    }, 100)
    window.addEventListener('scroll', register)
    element.className += ' ok relative pv3 pv4-ns mb4'
    const buttonWrapper = document.createElement('div')
    buttonWrapper.innerHTML =
      '<svg viewBox="0 0 90 96" xmlns="http://www.w3.org/2000/svg"><g fill="#aaa" fill-rule="nonzero"><path d="M39.1 34.8c-2.5-1.5-5.8.3-5.8 3.3v26.5c0 3 3.2 4.8 5.8 3.3L61 54.7c2.4-1.5 2.4-5 0-6.5L39.1 34.8z"/><path d="M82.8 28.2c-1.6-2.5-4.9-3.4-7.4-1.8-2.6 1.6-3.4 4.9-1.8 7.6 3.6 5.9 5.4 13.1 4.7 20.7-1.6 16.1-14.8 28.9-31 30C27.7 86 11.4 70.4 11.6 51c.2-18 14.9-32.8 32.8-33.1 1 0 1.9 0 2.9.1v4.2c0 1.7 1.9 2.7 3.3 1.8l15.6-9.7c1.3-.8 1.3-2.8 0-3.6L50.5.8c-1.4-.9-3.3.1-3.3 1.8V7H45C19.5 7-1.1 28.7.9 54.6 2.5 76.3 20 93.8 41.6 95.4c25.9 1.9 47.7-18.6 47.7-44.1 0-8.5-2.4-16.4-6.5-23.1z"/></g></svg>'
    buttonWrapper.className = ' absolute bottom-0 left-0 w2 dim pointer z-3'
    buttonWrapper.addEventListener('click', () => reset(element))
    element.appendChild(buttonWrapper)
  }

  function reset(element: HTMLElement) {
    element.setAttribute('style', `height:${element.clientHeight}px`)
    const obj = element.querySelector('object')
    if (!obj) {
      return
    }
    const newObject = obj.cloneNode() as HTMLObjectElement
    newObject.className = ' absolute top right z-1'
    newObject.setAttribute('style', `height:${obj.clientHeight}px`)
    element.appendChild(newObject)
    element.removeChild(obj)
  }

  function isScrolledIntoView(el: HTMLElement) {
    var rect = el.getBoundingClientRect()
    var elemTop = rect.top
    var elemBottom = rect.bottom

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible
  }

  function throttle(callback: Function, wait: number) {
    let timeout: number | null = null

    return function(this: any) {
      const args = [].slice.call(arguments)
      const next = () => {
        callback.apply(this, args)
        timeout = null
      }

      if (!timeout) {
        timeout = setTimeout(next, wait) as any
      }
    }
  }
}

function isString(test: unknown): test is string {
  return {}.toString.call(test) === '[object String]'
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}
