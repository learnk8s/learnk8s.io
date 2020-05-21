import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer, mailto, MailTo } from './layout.v3'
import { join } from 'path'
import { getConfig, State, Action, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'

const contributionEnquiry: MailTo = {
  subject: 'Kubernetes research',
  body: `Hi Learnk8s,\n\nI'd like to suggest a change to your research documents.\n\n________.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const sponsorEnquiry: MailTo = {
  subject: 'Kubernetes research',
  body: `Hi Learnk8s,\n\nI'd like to suggest a topic of research.\n\n________.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export const Research = {
  id: 'research',
  url: '/research',
  title: 'Kubernetes research',
  description: 'Research on Kubernetes for best node instance types, managed services, ingress controllers, CNIs, etc.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Research))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-research',
      pageId: Research.id,
      image: <img src='assets/opengraph.v2.png' alt='Learnk8s' />,
      title: Research.title,
      description: Research.description,
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Research.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const pages = Selector.pages.selectAll(state)
  const page = pages.find(it => it.id === Research.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === Research.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
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
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        <link rel='canonical' href={currentAbsoluteUrl} />
      </Head>

      <Body>
        <Navbar />

        <div className='new-hero pt4 pb5-l pb4'>
          <div className='mw8 center ph3 ph4-ns'>
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid'>
              Kubernetes
              <br />
              research
            </h1>
            <div className='f4 measure'>
              <p className='f2-l f3 white bt bw2 pt3 o-90'>
                Research documents on node instance types, managed services, ingress controllers, CNIs, etc.
              </p>
            </div>
          </div>
        </div>

        <section className='ph3 pv4 center mw8 center'>
          <div className='mw8 center'>
            <p className='f3-l f4 b navy'>Table of contents</p>
            <ul className='f4 measure'>
              <li className='mv3'>
                <a href='#choosing-node-size' className='link navy underline-hover'>
                  Choosing an instance type for a Kubernetes cluster
                </a>
              </li>
              <li className='mv3'>
                <a href='#requests' className='link navy underline-hover'>
                  Research requests
                </a>
              </li>
            </ul>
          </div>

          <ul className='pl0 list pt4'>
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  <img
                    src='assets/research/node-size.png'
                    alt='Choosing an instance type for a Kubernetes cluster'
                    className='aspect-ratio--object shadow-1 br2'
                  />
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h2 className='f3 b navy lh-solid' id='choosing-node-size'>
                    Choosing an instance type for a Kubernetes cluster
                  </h2>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    Research on the trade offs when choosing an instance type for a Kubernetes cluster
                  </p>
                  <a
                    href='https://docs.google.com/spreadsheets/d/1yhkuBJBY2iO2Ax5FcbDMdWD5QLTVO6Y_kYt_VumnEtI'
                    rel='noreferrer'
                    target='_blank'
                    className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
                  >
                    Read &#8594;
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <Section className='bg-evian mt3 mt5-ns'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4' id='requests'>
              Research requests
            </p>
            <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>
              If you have an idea for a research topic or you want to sponsor the research get in touch!
            </p>
          </div>
          <p className='tc'>
            <a href={mailto(sponsorEnquiry)} className='link dib white bg-navy br1 pa3 b f5 mv3'>
              Get in touch →
            </a>
          </p>
        </Section>

        <Footer />
      </Body>
    </Html>
  )
}

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
}
