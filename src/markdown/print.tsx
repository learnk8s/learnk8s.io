import { join } from 'path'
import { toMdast } from '.'
import { groupHighlightedCode, Group } from './jsx'
import React, { Fragment } from 'react'
import { selectAll, select } from 'unist-util-select'
import * as Mdast from 'mdast'
import toString from 'mdast-util-to-string'
import Prism from 'prismjs'
import { transform, MdastVisitors, parseLink } from './utils'
import { VFile, read, toVFile } from '../files'

require('prismjs/components/')()

export async function renderPrint(vfile: VFile): Promise<JSX.Element> {
  const mdastTree = toMdast(vfile)
  return transform(mdastTree, await mdast2Print(vfile))
}

export async function mdast2Print({ path }: { path: string }): Promise<MdastVisitors<JSX.Element>> {
  const prismSolarizedCss = await read(toVFile({ path: join(__dirname, 'prism-solarizedlight.css') }))
  const prismOkaidiadCss = await read(toVFile({ path: join(__dirname, 'prism-okaidia.css') }))
  const prismLakeDarkCss = await read(toVFile({ path: join(__dirname, 'prism-lakedark.css') }))
  let heading2 = 0
  return {
    root(node, parent, { all, one }) {
      const compact = node.children.reduce((acc, it) => {
        const lastElement: Mdast.Content | null = acc[acc.length - 1]
        if (
          lastElement &&
          lastElement.type === 'paragraph' &&
          lastElement.children[0].type !== 'image' &&
          it.type === 'paragraph'
        ) {
          if (it.children[0].type === 'image') {
            return acc.concat(it)
          }
          lastElement.children = [...lastElement.children, { type: 'text', value: '\n' }, ...it.children]
        } else {
          return acc.concat(it)
        }
        return acc
      }, [] as Mdast.Content[])
      return <Fragment>{all({ ...node, children: compact })}</Fragment>
    },
    text(node) {
      return <Fragment>{node.value}</Fragment>
    },
    slideshow(node, parent, { all, one }) {
      return (
        <div className='slideshow'>
          {selectAll<Mdast.Slide>('slide', node).map((it, index, slides) => {
            return (
              <Slide
                key={index}
                slide={it}
                currentSlide={index + 1}
                totalSlides={slides.length}
                className='half-page ph4'
                renderChildren={all}
              >
                {all(it)}
              </Slide>
            )
          })}
        </div>
      )
    },
    slide(node, parent, { all, one }) {
      throw new Error('slide not implemented')
    },
    heading(node, parent, { all, one }) {
      switch (node.depth) {
        case 1:
          return (
            <div className='full-page bg-sky on-new-page flex items-center chapter'>
              <h2
                className='bt bw4 b--white w-70 f-subheadline mt6 pt4 pb2 mt0 white pl5'
                id={`${toId(path)}-${toId(toString(node))}`}
              >
                {all(node)}
              </h2>
            </div>
          )
        case 2:
          heading2++
          return (
            <h3 className='f3 pt3 on-new-page' id={`${toId(path)}-${toId(toString(node))}`}>
              {heading2}. {all(node)}
            </h3>
          )
        case 3:
          return (
            <h4 className='f4' id={`${toId(path)}-${toId(toString(node))}`}>
              {all(node)}
            </h4>
          )
        case 4:
          return (
            <h5 className='f5' id={`${toId(path)}-${toId(toString(node))}`}>
              {all(node)}
            </h5>
          )
        default:
          return React.createElement(
            `h${node.depth}`,
            { className: `f${node.depth}`, id: `${toId(path)}-${toId(toString(node))}` },
            all(node),
          )
      }
    },
    paragraph(node, parent, { all, one }) {
      if (node.children[0].type === 'image') {
        return one(node.children[0], node)
      }
      return <p className='lh-copy measure f4 mv1 tj'>{all(node)}</p>
    },
    blockquote(node, parent, { all, one }) {
      return (
        <blockquote className='pl3 mh2 bl bw2 b--blue bg-evian pv1 ph4 inseparable measure-wide'>
          {all(node)}
        </blockquote>
      )
    },
    list(node, parent, { all, one }) {
      return node.ordered ? <ol>{all(node)}</ol> : <ul>{all(node)}</ul>
    },
    listItem(node, parent, { all, one }) {
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
        return codeAsLines.slice(start - 1, end).map(it => {
          switch (groupType) {
            case Group.HIGHLIGHT:
              return (
                <span
                  key={index}
                  className='highlight'
                  dangerouslySetInnerHTML={{
                    __html: !!node.lang ? Prism.highlight(it, Prism.languages[node.lang]) : it,
                  }}
                />
              )
            case Group.STANDARD:
              return (
                <span
                  key={index}
                  className='standard'
                  dangerouslySetInnerHTML={{
                    __html: !!node.lang ? Prism.highlight(it, Prism.languages[node.lang]) : it,
                  }}
                />
              )
          }
        })
      })
      return (
        <Fragment>
          {makeSlots(
            codeBlocks.reduce((acc, it) => acc.concat(it), []),
            24,
          ).map((it, i, array) => {
            return (
              <div className='mv4 mv5-l inseparable'>
                <header className='bg-light-gray pv1 pl1 br--top br2 cf'>
                  <div className='fl w-30 f7'>
                    <div className='dib w05 h05 ml1 br-100 bg-dark-red v-btm' />
                    <div className='dib w05 h05 ml1 br-100 bg-green v-btm' />
                    <div className='dib w05 h05 ml1 br-100 bg-yellow v-btm' />
                  </div>
                  {node.data && node.data.title ? (
                    <p className='fl w-40 code f7 mv0 black-60 tc lh-copy'>
                      {node.data.title as string}
                      {array.length === 1 ? (
                        ''
                      ) : (
                        <span>
                          {' '}
                          <small>
                            ({i + 1}/{array.length})
                          </small>
                        </span>
                      )}
                    </p>
                  ) : null}
                </header>
                <pre className='code-light-theme pv3 overflow-auto mv0 br2 br--bottom'>
                  <code className='code lh-copy'>{it}</code>
                </pre>
              </div>
            )
          })}
        </Fragment>
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
            className: `${codeBlocks[codeBlocks.length - 1].props.className}`,
          },
        }
      }
      return (
        <div className='mv4 mv5-l inseparable'>
          <header className='bg-light-gray pt2 pb1 pl1 br--top br2 cf'>
            <div className='fl w-30 f6 lh-copy'>
              <div className='dib w1 h1 ml1 br-100 bg-dark-red' />
              <div className='dib w1 h1 ml1 br-100 bg-green' />
              <div className='dib w1 h1 ml1 br-100 bg-yellow' />
            </div>
            {node.title ? <p className='fl w-40 code f6 mv0 black-60 tc lh-copy'>{node.title}</p> : null}
          </header>
          <pre className='code-dark-theme pv4 overflow-auto mv0 br2 br--bottom'>
            <code className='code lh-copy'>{codeBlocks}</code>
          </pre>
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
            className: `${codeBlocks[codeBlocks.length - 1].props.className}`,
          },
        }
      }
      return (
        <div className='mv4 mv5-l inseparable'>
          <header className='bg-white pt2 pb1 pl1 ba b--gray cf'>
            <div className='fl w-30 tr f6 lh-copy'>
              <div className='dib w1 h1 mr3'>—</div>
              <div className='dib w1 h1 mr3'>□</div>
              <div className='dib w1 h1 mr3'>𝖷</div>
            </div>
            {node.title ? <p className='fl w-40 code f6 mv0 black-60 tc lh-copy'>{node.title}</p> : null}
          </header>
          <pre className='powershell pv4 overflow-auto mv0 br2 br--bottom'>
            <code className='code lh-copy'>{codeBlocks}</code>
          </pre>
        </div>
      )
    },
    html(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
    thematicBreak(node, parent, { all, one }) {
      throw new Error('thematicBreak not implemented')
    },
    strong(node, parent, { all, one }) {
      return <strong className='b'>{all(node)}</strong>
    },
    emphasis(node, parent, { all, one }) {
      return <em className='i'>{all(node)}</em>
    },
    break(node, parent, { all, one }) {
      throw new Error('break not implemented')
    },
    delete(node, parent, { all, one }) {
      throw new Error('break not implemented')
    },
    link(node, parent, { all, one }) {
      return parseLink(node)({
        absolute: () => {
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
        },
        relative: () => {
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
        },
        inline: () => {
          return (
            <a
              href={`#${toId(path)}-${node.url.slice(1)}`}
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
        },
        file: () => {
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
        },
      })
    },
    linkReference(node, parent, { all, one }) {
      throw new Error('linkReference not implemented')
    },
    imageReference(node, parent, { all, one }) {
      throw new Error('imageReference not implemented')
    },
    definition(node, parent, { all, one }) {
      throw new Error('definition not implemented')
    },
    image(node) {
      return <Figure url={node.url}>{node.alt}</Figure>
    },
    footnote(node, parent, { all, one }) {
      throw new Error('footnote not implemented')
    },
    footnoteReference(node, parent, { all, one }) {
      throw new Error('footnoteReference not implemented')
    },
    footnoteDefinition(node, parent, { all, one }) {
      throw new Error('footnoteDefinition not implemented')
    },
    table(node, parent, { all, one }) {
      const [firstRow, ...restRows] = node.children
      return (
        <table className='table w-100 f4 mv3 mv5-l inseparable'>
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
    tableCell(node, parent, { all, one }) {
      throw new Error('tableCell not implemented')
    },
    tableRow(node, parent, { all, one }) {
      throw new Error('tableRow not implemented')
    },
    animation(node, parent, { one }) {
      return one({ type: 'image', url: node.children[1].url, alt: node.children[1].alt })
    },
    include(node) {
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />
    },
  }
}

type ArrayType<T extends Array<any>> = T extends (infer U)[] ? U : never
function assertUnreachable(x: never): void {}

export const Slide: React.StatelessComponent<{
  slide: Mdast.Slide
  currentSlide: number
  totalSlides: number
  className?: string
  renderChildren: (content: Mdast.Content) => JSX.Element[]
}> = ({ slide, currentSlide, totalSlides, className, renderChildren }) => {
  const img = select<Mdast.Image>('slide image', slide) as Mdast.Image
  const rest = selectAll<Exclude<ArrayType<Mdast.Slideshow['children']>, Mdast.Slide>>('slide > :not(image)', slide)

  return (
    <Figure url={img.url} className={className}>
      {rest.map((it, i) => {
        switch (it.type) {
          case 'paragraph':
            return (
              <Fragment>
                <span className='b'>{currentSlide}</span>
                <span className='f7'>/{totalSlides}</span>
                <p key={i} className='f5 lh-copy black-90 ph3 bt bw2 b--light-gray pt3'>
                  {renderChildren(it)}
                </p>
              </Fragment>
            )
          default:
            assertUnreachable(it.type)
            return
        }
      })}
    </Figure>
  )
}

export const Figure: React.StatelessComponent<{
  url: string
  className?: string
}> = ({ className, children, url }) => {
  return (
    <div className={`inseparable overflow-hidden ${className || ''}`}>
      <div className='pv2 h-100 cf'>
        <div className='fl w-60 center h-100'>
          <img className='object-fit' src={url} />
        </div>
        <div className='fl w-40'>
          <div className='f5 lh-copy black-90 ph3 pt4'>{children}</div>
        </div>
      </div>
    </div>
  )
}

function makeSlots<T>(array: T[], slots: number): T[][] {
  if (slots < 1 || array.length <= slots) {
    return [array]
  }
  return [array.slice(0, slots), ...makeSlots(array.slice(slots), slots)]
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}
