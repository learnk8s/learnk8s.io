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

export function Mount({ store }: { store: Store<State, Actions> }) {
  const mdast = toMdast(toVFile({ contents: readFileSync(join(__dirname, 'list.md'), 'utf8') }))
  console.log(inspect(mdast))
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: BestPractices.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
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
          <div className='left mw5-l w-third js-left'>
            <section>
              <p className='b f3'>Categories</p>
              <ul className='list pl0'>
                <li className='mv2'>
                  <a href='#' className='pv2 no-underline f4 black-80'>
                    Containers
                  </a>
                </li>
                <li className='mv2'>
                  <a href='#' className='pv2 no-underline f4 black-80'>
                    Apps
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className='right mw8-l w-two-thirds js-checklist'>
            <section className='pl4-l'>
              <h2>Containers</h2>
              <ul className='list pl0'>
                <li>
                  <ListItem />
                </li>
                <li>
                  <ListItem />
                </li>
              </ul>
            </section>
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

const ListItem: React.StatelessComponent<{}> = ({ children }) => {
  const id = `${Math.random()}`.replace('.', '')
  return (
    <div className='module'>
      <div className='pv2 ph3 flex items-center bt bl br b--light-gray bg-evian relative'>
        <label htmlFor='one' className='dn'>
          Accustom everyone to good security practices
        </label>
        <input
          type='checkbox'
          name='one'
          id='one'
          className='tick-checkbox input-reset h2 w2 ba bw2 b--light-gray br-100 v-mid bg-white pointer'
        />
        <p className='f3 b v-mid pl3 navy pointer' data-toggle={`.details-${id},.controls-${id}`}>
          Accustom everyone to good security practices
        </p>
        <div className={`controls controls-${id} absolute top-50 right-1`}>
          <button
            className='open dib bg-evian bn pointer'
            data-toggle={`.details-${id},.controls-${id}`}
            data-toggle-collapsed
          >
            <i className='arr-down' />
          </button>
          <button className='close dib bg-evian bn pointer' data-toggle={`.details-${id},.controls-${id}`}>
            <i className='arr-up' />
          </button>
        </div>
      </div>
      <div className={`bg-white bl br b--light-gray details details-${id}`}>
        <div className='ph4 pt2 pb4'>
          <p className='lh-copy measure-wide f4'>
            People are often the weakest links in any company's security. By holding trainings to explain how an
            attacker could infiltrate your company, you will increase their awareness and thus minimize the chance of
            them falling for common traps. Some things to cover include phishing emails, and the dangers of USB drives
            and email attachments.
          </p>
          <p className='lh-copy measure-wide f4'>Read more:</p>
          <ul className='f4 measure'>
            <li className='mv2 lh-copy'>
              https://www.secureworks.com/blog/cybersecurity-awareness-training-best-practices
            </li>
            <li className='mv2 lh-copy'>
              https://resources.infosecinstitute.com/top-10-security-awareness-training-topics-for-your-employees/
            </li>
            <li className='mv2 lh-copy'>https://sudo.pagerduty.com/</li>
          </ul>
        </div>
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
