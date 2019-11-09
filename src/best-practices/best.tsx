import React from 'react'
import { Html, Head, OpenGraph, Body, Navbar } from '../layout.v3'
import { renderToStaticMarkup } from 'react-dom/server'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getConfig } from '../store'
import { join } from 'path'
import { toMdast } from '../markdown'
import { toVFile } from '../files'
import { readFileSync } from 'fs'
import { defaultAssetsPipeline } from '../optimise'
import { selectAll, matches } from 'unist-util-select'
import * as Mdast from 'mdast'
import { Node } from 'unist'
import toString from 'mdast-util-to-string'
import { mdast2JsxInline, mdast2Jsx } from '../markdown/jsx'
import { transform } from '../markdown/utils'

export const BestPractices = {
  id: 'kubernetes-best-practices',
  url: '/kubernetes-best-practices',
  title: 'Kubernetes best practices',
  description:
    'This document highlights and consolidates best practices for building, deploying and scaling apps on Kubernetes',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(BestPractices))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-best-practices',
      pageId: BestPractices.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      description:
        'This document highlights and consolidates best practices for building, deploying and scaling apps on Kubernetes',
      title: 'Kubernetes best practices',
    }),
  )
}

function collectUntil(children: Mdast.Content[], startingElement: Node, untilSelector: string): Mdast.Content[] {
  let index = children.findIndex(it => it === startingElement) + 1
  const out: Mdast.Content[] = []
  while (!matches(untilSelector, children[index]) && index <= children.length) {
    out.push(children[index])
    index = index + 1
  }
  return out
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  function parseMd({ title, file }: { file: string; title: string }) {
    const mdast = toMdast(
      toVFile({ contents: readFileSync(join(__dirname, file), 'utf8'), path: join(__dirname, file) }),
    )
    const Sections = selectAll<Mdast.Heading>('heading[depth=2]', mdast)
      .map(heading => {
        return { heading, content: collectUntil(mdast.children, heading, 'heading[depth=2]') }
      })
      .map(({ heading, content }) => {
        const subheadings = content.filter(it => matches('heading[depth=3]', it))
        return {
          title: { type: 'root', children: [heading] } as Mdast.Root,
          description: { type: 'root', children: collectUntil(content, content[0], 'heading') } as Mdast.Root,
          items: subheadings.map(it => {
            return {
              title: { type: 'root' as const, children: [it] },
              content: { type: 'root' as const, children: collectUntil(content, it, 'heading').filter(it => !!it) },
            }
          }),
        }
      })
    return { title, description: { type: 'root' as const, children: [] }, categories: Sections }
  }

  try {
    const state = store.getState()
    defaultAssetsPipeline({
      jsx: renderPage(state, [
        parseMd({ title: 'Application development', file: 'application-development.v2.md' }),
        // parseMd({ title: 'Governance', file: 'governance.md' }),
      ]),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: BestPractices.url,
      outputFolder: getConfig(state).outputFolder,
    })
  } catch (error) {
    console.log(error)
  }
}

type Section = {
  title: string
  description: Mdast.Root
  categories: {
    title: Mdast.Root
    description: Mdast.Root
    items: {
      title: Mdast.Root
      content: Mdast.Root
    }[]
  }[]
}

function renderPage(state: State, sections: Section[]) {
  const page = getPages(state).find(it => it.id === BestPractices.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === BestPractices.id)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`
  return (
    <Html>
      <Head title={page.title} description={page.description}>
        {openGraph ? (
          <OpenGraph
            title={openGraph.title}
            description={openGraph.description}
            image={openGraph.image}
            currentAbsoluteUrl={currentAbsoluteUrl}
          />
        ) : null}
        <link rel='stylesheet' href='node_modules/tachyons/css/tachyons.css' />
        <link rel='stylesheet' href='assets/style.css' />
      </Head>
      <Body>
        <Navbar />
        <div className='new-hero pt4 pb5-l pb4'>
          <div className='mw8 center ph3 ph4-ns'>
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid pb4'>
              Kubernetes
              <br />
              best practices
              <br />
              checklist
            </h1>
            <div />
          </div>
        </div>
        <div className='flex-l mt5-l mt4 center justify-center-l'>
          <div className='left mw5-l w-third-l ph3 ph4-m pn-l relative'>
            <div className='sticky top-0 left-0 js-left pt3'>
              <section>
                <p className='b f3'>Categories</p>
                <ul className='list pl0'>
                  {sections.map(it => {
                    return (
                      <li className='mv3'>
                        <a
                          href={`#${toId(it.title)}`}
                          className='pv2 no-underline f4 black-80 hover-navy underline-hover'
                        >
                          {it.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>
          </div>
          <div className='right mw8-l w-two-thirds-l ph3 ph4-m pn-l js-checklist black-80'>
            {sections.map((section, index) => {
              return (
                <div className={`${index === 0 ? '' : 'mt5'}`}>
                  <h2 className='ph4-l f3-l f4-l pb3' id={toId(section.title)}>
                    {section.title}
                  </h2>
                  {section.categories.map(category => {
                    return (
                      <section className='pl4-l'>
                        <Category title={transform(category.title, mdast2JsxInline())}>
                          {category.description ? transform(category.description, mdast2Jsx()) : null}
                        </Category>
                        <ul className='list pl0 mv0 bb b--light-gray'>
                          {category.items.map((item, index) => {
                            return (
                              <li>
                                <ListItem
                                  id={`${toId(toString(category.title))}-${index}`}
                                  title={transform(item.title, mdast2JsxInline())}
                                >
                                  {transform(item.content, mdast2Jsx())}
                                </ListItem>
                              </li>
                            )
                          })}
                        </ul>
                      </section>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(${TrackProgress.toString()})('${renderToStaticMarkup(<ProgressWidget />)}')`,
          }}
        />
      </Body>
    </Html>
  )
}

const ProgressWidget: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <section className=''>
      <p className='gray ttu f7 mb0'>Your progress</p>
      <p className='mt2 mb3 b navy f4 js-progress-percentage'>0% complete</p>
      <div className='w-100 relative'>
        <div className='pa1 bg-blue br2 js-active-progress-bar absolute top-0 left-0' />
        <div className='pa1 w-100 bg-light-gray br2 br--right js-progress-bar' />
      </div>
    </section>
  )
}

const Category: React.StatelessComponent<{ title: JSX.Element }> = ({ children, title }) => {
  const id = `${Math.random()}`.replace('.', '')
  return (
    <div className='module'>
      <div className='ph3 flex items-center ba b--light-gray bg-evian relative'>
        <p className='f4 f3-ns b v-mid pl3 navy pointer' data-toggle={`.details-${id},.controls-${id}`}>
          {title}
        </p>
        <div className={`controls controls-${id} absolute top-50 right-1`}>
          <button
            className='open dib bg-transparent bn pointer'
            data-toggle={`.details-${id},.controls-${id}`}
            data-toggle-collapsed
          >
            <img src='assets/info.svg' alt='Info' className='w1 h1' />
          </button>
          <button className='close dib bg-transparent bn pointer' data-toggle={`.details-${id},.controls-${id}`}>
            <i className='arr-up' />
          </button>
        </div>
      </div>
      <div className={`bg-white bl br b--light-gray details details-${id}`}>
        <div className='ph4 pt2 pb4'>{children}</div>
      </div>
    </div>
  )
}

const ListItem: React.StatelessComponent<{ id: string; title: JSX.Element }> = ({ children, title, id }) => {
  return (
    <div className='module'>
      <div className='ph3 flex items-center bt bl br b--light-gray relative'>
        <label htmlFor='one' className='dn'>
          {title}
        </label>
        <input
          type='checkbox'
          name={id}
          id={id}
          className='tick-checkbox input-reset h2 w2 ba bw2 b--light-gray br-100 v-mid bg-white pointer flex-shrink-0'
        />
        <p className='f5 f4-ns v-mid pl3 navy pointer' data-toggle={`.details-${id},.controls-${id}`}>
          {title}
        </p>
        <div className={`controls controls-${id} absolute top-50 right-1`}>
          <button
            className='open dib bg-transparent bn pointer'
            data-toggle={`.details-${id},.controls-${id}`}
            data-toggle-collapsed
          >
            <i className='arr-down' />
          </button>
          <button className='close dib bg-transparent bn pointer' data-toggle={`.details-${id},.controls-${id}`}>
            <i className='arr-up' />
          </button>
        </div>
      </div>
      <div className={`bg-white bl br b--light-gray details details-${id}`}>
        <div className='ph4 pt2 pb4'>{children}</div>
      </div>
    </div>
  )
}

function CreateToggle() {
  function doesntExist<T>(it: T): boolean {
    return !it
  }
  function Toggle(element: Element) {
    var target = element.getAttribute('data-toggle')
    if (!target) {
      return
    }
    var targetElements = target.split(',').map(function(selector) {
      return document.querySelector(selector)
    })
    if (targetElements.some(doesntExist)) {
      return
    }
    if (targetElements[0]!.classList.contains('toggle-collapse')) {
      targetElements.forEach(function(it) {
        return it!.classList.remove('toggle-collapse')
      })
    } else {
      targetElements.forEach(function(it) {
        return it!.classList.add('toggle-collapse')
      })
    }
  }

  ;[].slice.call(document.querySelectorAll('[data-toggle]')).forEach(function(element: Element) {
    element.addEventListener('click', function() {
      Toggle(element)
    })
  })
  ;[].slice.call(document.querySelectorAll('[data-toggle-collapsed]')).forEach(Toggle)
}

function TrackProgress(progressTemplate: string) {
  const leftElement = document.querySelector('.js-left')
  if (!leftElement) {
    return
  }
  const templateElement = document.createElement('div')
  templateElement.innerHTML = progressTemplate
  leftElement.prepend(templateElement)

  const checklistElement = document.querySelector<HTMLElement>('.js-checklist')
  const progressBar = document.querySelector<HTMLElement>('.js-progress-bar')
  const activeProgressBar = document.querySelector<HTMLElement>('.js-active-progress-bar')
  const percentageProgressBar = document.querySelector<HTMLElement>('.js-progress-percentage')
  if (!checklistElement || !progressBar || !activeProgressBar) {
    return
  }
  const totalWidth = progressBar.clientWidth
  const checkboxes = checklistElement.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', updateBar)
  })

  updateBar()

  function updateBar() {
    const checkedCheckboxes = Array.from(checkboxes).filter(it => it.checked)
    const percentage = checkedCheckboxes.length / checkboxes.length
    activeProgressBar!.style.width = `${percentage * totalWidth}px`
    percentageProgressBar!.innerText = `${Math.ceil(percentage * 100)}% complete`
  }
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}
