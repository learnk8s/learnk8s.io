import React from 'react'
import { Html, Head, OpenGraph, Body } from '../layout.v3'
import { renderToStaticMarkup } from 'react-dom/server'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getConfig } from '../store'
import { join } from 'path'
import { toMdast } from '../markdown'
import { toVFile } from '../files'
import { readFileSync } from 'fs'
import inspect from 'unist-util-inspect'
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
  const mdast = toMdast(toVFile({ contents: readFileSync(join(__dirname, 'list.md'), 'utf8') }))
  inspect(mdast)
  const Sections = selectAll<Mdast.Heading>('heading[depth=2]', mdast)
    .map(heading => {
      return { heading, content: collectUntil(mdast.children, heading, 'heading[depth=2]') }
    })
    .map(({ heading, content }) => {
      const subheadings = content.filter(it => matches('heading[depth=3]', it))
      return {
        heading: { type: 'root', children: [heading] } as Mdast.Root,
        description: { type: 'root', children: collectUntil(content, content[0], 'heading') } as Mdast.Root,
        references: { type: 'root', children: collectUntil(content, subheadings[0], 'heading') } as Mdast.Root,
        checklist: collectUntil(content, subheadings[1], 'heading')
          .filter(it => matches('list', it))
          .reduce((acc, it) => acc.concat(it.children as any), [] as Mdast.Content[])
          .map(it => ({ type: 'root', children: it.children } as Mdast.Root)),
      }
    })
  console.log(Sections)

  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state, Sections),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: BestPractices.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

type Section = {
  heading: Mdast.Root
  description: Mdast.Root
  references: Mdast.Root
  checklist: Mdast.Root[]
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
        <div className='flex-l mt5 center justify-center-l'>
          <div className='left mw5-l w-third-l ph3 ph4-m pn-l js-left'>
            <section>
              <p className='b f3'>Categories</p>
              <ul className='list pl0'>
                {/* {sections.map(it => {
                  return (
                    <li className='mv2'>
                      <a href={`#${toId(toString(it.heading))}`} className='pv2 no-underline f4 black-80'>
                        {transform(it.heading, mdast2JsxInline())}
                      </a>
                    </li>
                  )
                })} */}
                <li className='mv2'>
                  <a href={`#`} className='pv2 no-underline f4 black-80'>
                    Application development
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className='right mw8-l w-two-thirds-l ph3 ph4-m pn-l js-checklist'>
            {sections.map(it => {
              return (
                <section className='pl4-l'>
                  <Category title={transform(it.heading, mdast2JsxInline())}>
                    {transform(it.description, mdast2Jsx())}
                  </Category>
                  <ul className='list pl0 bb b--light-gray'>
                    {it.checklist.map(it => {
                      return (
                        <li>
                          <ListItem>{transform(it, mdast2JsxInline())}</ListItem>
                        </li>
                      )
                    })}
                  </ul>
                </section>
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

const ListItem: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <div className='module'>
      <div className='ph3 flex items-center bt bl br b--light-gray'>
        <label htmlFor='one' className='dn'>
          {children}
        </label>
        <input
          type='checkbox'
          name='one'
          id='one'
          className='tick-checkbox input-reset h2 w2 ba bw2 b--light-gray br-100 v-mid bg-white pointer flex-shrink-0'
        />
        <p className='f5 f4-ns v-mid pl3 navy pointer'>{children}</p>
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
