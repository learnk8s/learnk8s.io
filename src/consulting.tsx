import React from 'react'
import { PrimaryButton } from './homepage'
import {
  Navbar,
  Html,
  Head,
  OpenGraph,
  Body,
  Footer,
  ListItem,
  Interlude,
  Consultation,
  mailto,
  MailTo,
} from './layout.v3'
import { join } from 'path'
import { getConfig, State, Action, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'

const continuousDeliveryEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our delivery pipeline.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const cloudMigrationEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our cloud adoption with Kubernetes.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const cloudDevelopmentEnquiry: MailTo = {
  subject: 'Learnk8s Consulting',
  body: `Hi Learnk8s,\n\nWe'd like to discuss an opporunity to accelerate our development with Kubernetes.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export const Consulting = {
  id: 'consulting',
  url: '/consulting',
  title: 'Consulting ⎈ Learnk8s',
  description: 'Expertise in software development, strategy and operations to help you innovate at speed and scale.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Consulting))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-consulting',
      pageId: Consulting.id,
      image: 'assets/open_graph_preview.png',
      title: 'Consulting',
      description:
        'Expertise in software development, strategy and operations to help you innovate at speed and scale.',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Consulting.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === Consulting.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === Consulting.id)
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
        <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
          <Navbar />

          <section className='flex-ns items-center-ns ph5-l pt5-l'>
            <div className=''>
              <h1 className='f1 pl3 pl4-ns f-subheadline-l'>Enterprise-ready Kubernetes consulting</h1>
              <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>
                Expertise in software development, strategy and operations to help you innovate at speed and scale.
              </h2>
              <a href='#start' className='link dib blue bg-white br1 pa3 b f5 shadow-3 mt4 ml3 ph4 ml4-ns mb3'>
                Get started &#8594;
              </a>
            </div>

            <div className='dn db-l mt4 tr w-100 mw5'>
              <div className='aspect-ratio aspect-ratio--1x1'>
                <img
                  src='assets/consulting/kcsp.png'
                  alt='Kubernetes Certified Service Provider'
                  className='aspect-ratio--object'
                />
              </div>
              <div className='aspect-ratio aspect-ratio--1x1'>
                <img
                  src='assets/consulting/cka.png'
                  alt='Certified Kubernetes administrator'
                  className='aspect-ratio--object'
                />
              </div>
            </div>
          </section>
        </div>

        <section className='content ph3 ph4-ns flex items-center justify-center pt5-ns relative z3'>
          <div className='w-50-l dn db-l tc'>
            <div className='dib'>
              <div className='i-more-cargo-loading relative'>
                <img
                  src='assets/consulting/more_cargo_loading.svg'
                  alt='Loading cargos'
                  className='absolute top-0 right-0'
                />
              </div>
            </div>
          </div>

          <div id='start' className='w-50-l center pt3'>
            <h2 className='f3 navy f2-l measure-narrow'>Accelerating Kubernetes adoption</h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>
                Accelerate your development by leveraging learnk8s expertise in deploying production-ready Kubernetes
                for the hottest start-ups and the largest enterprises. Our engineers will help you:
              </p>
              <ul className='list black-70 pl0 pt2'>
                <ListItem>
                  Validate your Kubernetes setup and identify opportunities for resource optimisation and cost-savings
                </ListItem>
                <ListItem>Inspect security risks and propose mitigations for sensitive data</ListItem>
                <ListItem>Refine your CI/CD pipeline to speed up your software delivieries</ListItem>
                <ListItem>Test the cluster for reselience and scaling under high traffic</ListItem>
              </ul>
            </div>
          </div>
        </section>

        <Interlude />

        <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
          <div className='ph3'>
            <div className='content measure-wide'>
              <h2 className='f3 navy f2-l'>Enterprise DevOps and continuous delivery</h2>
              <p className='f4-l lh-copy black-70'>
                If you can quickly make small changes to your software, get them to market, and get rapid feedback you
                are reducing the cost and time of delivery. Transforming how you deliver software in this way - making
                it faster, more frequent and scalable - means that you can exponentially increase the value you create
                for your customers.
              </p>
              <PrimaryButton mailto={mailto(continuousDeliveryEnquiry)} text='Get in touch &#8594;' />
            </div>
          </div>

          <div className='ml7-l dn db-ns'>
            <div className='i-containers relative'>
              <img src='assets/consulting/containers.svg' alt='Containers' className='absolute top-0 right-0' />
            </div>
          </div>
        </section>

        <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100 bg-evian'>
          <div className='dn db-ns mr7-l'>
            <div className='i-cloud-providers relative'>
              <img
                src='assets/consulting/managed-services.svg'
                alt='AKS, EKS and GKE'
                className='absolute top-0 right-0'
              />
            </div>
          </div>

          <div className='ph3'>
            <div className='content measure-wide'>
              <h2 className='f3 navy f2-l'>Cloud migration and adoption</h2>
              <p className='f4-l lh-copy black-70'>
                The speed, efficiency and cost-effectiveness of public cloud means that it is an invaluable enabler in
                any software innovation drive or digital transformation. Learn how to benefit from the cloud and speed
                up your software development cycle.
              </p>
              <PrimaryButton mailto={mailto(cloudMigrationEnquiry)} text='Get in touch &#8594;' />
            </div>
          </div>
        </section>

        <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
          <div className='ph3'>
            <div className='content measure-wide'>
              <h2 className='f3 navy f2-l'>Cloud-native application development</h2>
              <p className='f4-l lh-copy black-70'>
                Cloud-native applications are delivered as flexible, scalable microservices in the cloud, where we can
                fully automate and software-define more of the stack. Leaern how to design, build, deploy and run cloud
                native application platforms, which drive real business value and competitive advantage.
              </p>
              <PrimaryButton mailto={mailto(cloudDevelopmentEnquiry)} text='Get in touch &#8594;' />
            </div>
          </div>

          <div className='ml7-l dn db-ns'>
            <div className='i-team relative'>
              <img src='assets/consulting/team.svg' alt='Team' className='absolute top-0 right-0' />
            </div>
          </div>
        </section>
        <Consultation />
        <Footer />
      </Body>
    </Html>
  )
}
