import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer, mailto, MailTo } from './layout.v3'
import { join } from 'path'
import { getConfig, State, Action, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'

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
                <a href='#managed-services' className='link navy underline-hover'>
                  Kubernetes managed services (coming soon)
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
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  <img
                    src='assets/research/managed-services.jpg'
                    alt='Comparison of Kubernetes managed services'
                    className='aspect-ratio--object shadow-1 br2'
                  />
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h2 className='f3 b navy lh-solid' id='managed-services'>
                    Comparison of Kubernetes managed services (coming soon)
                  </h2>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    The research compares Kubernetes managed services such as Google Kubernetes Engine (GKE), Elastic
                    Kubernetes Service (EKS) and Azure Kubernetes (AKS).
                  </p>
                  <span className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'>Coming soon</span>
                </div>
              </div>
            </li>
          </ul>

          <div className='ph3'>
            <p className='f2-l f3 navy b tc mb2 pt4-ns pt2'>Don't miss the new research!</p>
            <p className='lh-copy f4 black-70 measure center tc'>
              If you want to be notified when we publish new research documents, you can sign up for the Learnk8s
              newsletter.
            </p>
            <div className='f4 measure tc center'>
              <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST'>
                <input type='hidden' name='u' value='2f82ec7d5caaa9ced71141211' />
                <input type='hidden' name='id' value='8ecff1a8cf' />
                <input type='hidden' name='orig-lang' value='1' />
                {/* <Honeypot> */}
                <div className='dn' aria-label='Please leave the following three fields empty'>
                  <label htmlFor='b_name'>Name: </label>
                  <input type='text' name='b_name' tabIndex={-1} defaultValue='' placeholder='Freddie' id='b_comment' />

                  <label htmlFor='b_email'>Email: </label>
                  <input
                    type='email'
                    name='b_email'
                    tabIndex={-1}
                    defaultValue=''
                    placeholder='youremail@gmail.com'
                    id='b_comment'
                  />

                  <label htmlFor='b_comment'>Comment: </label>
                  <textarea name='b_comment' tabIndex={-1} placeholder='Please comment' id='b_comment' />
                </div>
                {/* </Honeypot> */}

                <div className='mv4'>
                  <div className='mv3'>
                    <span className='dib bb ml2'>
                      <input
                        className='pa2 input-reset b--none'
                        type='email'
                        autoCapitalize='off'
                        autoCorrect='off'
                        name='MERGE0'
                        id='MERGE0'
                        size={25}
                        defaultValue=''
                        placeholder='Your email address'
                      />
                    </span>
                  </div>
                </div>

                <div className=''>
                  <input
                    type='submit'
                    defaultValue='Subscribe'
                    className='dib white bg-navy br1 pv2 ph3 b f5 bn pointer'
                    name='submit'
                  />
                </div>
                <input type='hidden' name='MERGE2' id='MERGE2' defaultValue='research' />
                <input
                  type='hidden'
                  name='ht'
                  defaultValue='69b0fd8eb9c012c25b28cf22b63612792eb64a30:MTU4OTUyNjkxMC45MDUz'
                />
                <input type='hidden' name='mc_signupsource' defaultValue='hosted' />
              </form>
              <p className='f6 black-60 mt4 mb0 underline'>
                *We'll never share your email address, and you can opt-out at any time.
              </p>
            </div>
          </div>
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
