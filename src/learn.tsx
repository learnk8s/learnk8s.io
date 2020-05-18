import React from 'react'
import { Footer, Html, Head, OpenGraph, Body, Navbar } from './layout.v3'
import { State, Action, getOpenGraph, getConfig, Store, Selector } from './store'
import { join } from 'path'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { JsonLd } from 'react-schemaorg'
import { Course } from 'schema-dts'

export const Learn = {
  id: 'learn',
  url: '/learn',
  title: 'Kubernetes Online and Instructor-led courses ⎈ Learnk8s',
  description:
    'Join an instructor-led, hands-on course and become an expert in deploying and scaling applications with containers and Kubernetes.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Learn))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-learn',
      pageId: Learn.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      description: Learn.description,
      title: 'Kubernetes Training Courses',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  try {
    defaultAssetsPipeline({
      jsx: renderPage(state),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: Learn.url,
      outputFolder: getConfig(state).outputFolder,
    })
  } catch (error) {
    console.log(error)
  }
}

function renderPage(state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === Learn.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Learn.id)
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
        <JsonLd<Course>
          item={{
            '@type': 'Course',
            '@context': 'https://schema.org',
            name: 'Advanced Kubernetes workshop',
            courseCode: 'ADV-LK8S',
            description: `In this course, you'll take an app, build it into a container then use Kubernetes to deploy, scale, and update it. You will learn how to build a cluter and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
            educationalCredentialAwarded: 'Certificate of completetion',
            provider: {
              '@type': 'Organization',
              name: 'Learnk8s',
            },
          }}
        />
        <JsonLd<Course>
          item={{
            '@type': 'Course',
            '@context': 'https://schema.org',
            name: 'Online, self-paced course',
            courseCode: 'ACADEMY-LK8S',
            description: `In this course, you'll take an app, build it into a container then use Kubernetes to deploy, scale, and update it. You will learn how to build a cluter and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
            educationalCredentialAwarded: 'Certificate of completetion',
            provider: {
              '@type': 'Organization',
              name: 'Learnk8s',
            },
          }}
        />
      </Head>
      <Body>
        <Navbar />

        <div className='bg-evian pv4'>
          <section className='mw8 center'>
            <ul className='flex-l justify-between-l list pl0'>
              <li className='mw6 center'>
                <div className='mh3 mb5'>
                  <h2 className='f2-l f3 tc navy'>Online courses</h2>
                  <div className='ph5-l'>
                    <div className='aspect-ratio aspect-ratio--4x3'>
                      <img src='assets/training/solo.svg' alt='The expert package' className='aspect-ratio--object' />
                    </div>
                  </div>
                  <div className='bg-white br2 pa2 mt4'>
                    <p className='lh-copy f5 gray ttu b tc'>Great for</p>
                    <ul className='list ph2'>
                      <ListItem>
                        <span className='b'>Starting immediately</span> — as fast (or slow) as you want
                      </ListItem>
                      <ListItem>Learning Kubernetes in excruciating details</ListItem>
                      <ListItem>Part-time, evenings and weekend learners</ListItem>
                    </ul>
                    <p className='tc'>
                      <a href='/academy' className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none'>
                        Learn more ⇢
                      </a>
                    </p>
                  </div>
                </div>
              </li>
              <li className='mw6 center'>
                <div className='mh3 mb5'>
                  <h2 className='f2-l f3 tc navy'>Instructor-led workshops</h2>
                  <div className='ph5-l'>
                    <div className='aspect-ratio aspect-ratio--4x3'>
                      <img
                        src='assets/training/in-person.svg'
                        alt='The expert package'
                        className='aspect-ratio--object'
                      />
                    </div>
                  </div>
                  <div className='bg-white br2 pa2 mt4'>
                    <p className='lh-copy f5 gray ttu b tc'>Great for</p>
                    <ul className='list ph2'>
                      <ListItem>
                        <span className='b'>Focusing on Kubernetes without distractions</span>
                      </ListItem>
                      <ListItem>Becoming an expert in a short time</ListItem>
                      <ListItem>Discussing and asking questions to the instructor</ListItem>
                    </ul>
                    <ul className='list ph2 pt3'>
                      <SpecialListItem>
                        <span className='b'>Includes full access to the self-paced online course</span>
                      </SpecialListItem>
                    </ul>
                    <p className='tc'>
                      <a href='/training' className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none'>
                        Learn more ⇢
                      </a>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <Footer />
      </Body>
    </Html>
  )
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const SpecialListItem: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv2 flex justify-center'>
      <div className='v-top tc'>
        <img src='assets/plus2.svg' alt='Plus' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}
