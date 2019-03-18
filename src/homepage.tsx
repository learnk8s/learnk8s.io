import React from 'react'
import { LinkedNode, getFullUrl, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, Hero } from './layout'
import { Img, Image, CSSBundle } from './assets'
import { renderToStaticMarkup } from 'react-dom/server'

export const Assets = {
  loadingCargos: Image({ url: 'assets/loading_cargos.svg', description: 'Shipping cargo' }),
  mediumCargo: Image({ url: 'assets/medium_cargo.svg', description: 'Shipping cargo' }),
  containers: Image({ url: 'assets/containers.svg', description: 'Shipping containers' }),
  catAndDog: Image({ url: 'assets/cat_and_dog.svg', description: 'Learn at your own pace' }),
  whiteboard: Image({ url: 'assets/whiteboard.svg', description: 'Instructor-led training' }),
  team: Image({ url: 'assets/team.svg', description: 'Consulting' }),
}

export const Details = {
  type: identity<'homepage'>('homepage'),
  url: '/',
  seoTitle: 'Learnk8s',
  title: 'Learnk8s — the Kubernetes training company',
  description:
    'We help you get started on your Kubernetes journey through comprehensive online, in person or remote training.',
  openGraphImage: Image({ url: 'assets/open_graph_preview.png', description: 'Learnk8s preview' }),
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Layout
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
      openGraphImage={currentNode.payload.openGraphImage}
      absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
      cssBundle={CSSBundle({
        paths: ['node_modules/tachyons/css/tachyons.css', 'assets/style.css'],
      })}
    >
      <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
        <Navbar root={website} />

        <Hero image={Assets.loadingCargos} imageClass='i-loading-cargos'>
          <h1 className='f1 pl3 pl4-ns pt5-l f-subheadline-l lh-solid'>Mastering Kubernetes</h1>
          <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>
            The fastest way to become an expert in deploying applications at scale.
          </h2>
          <a href='#start' className='link dib blue bg-white br1 pa3 b f5 shadow-3 mt4 ml3 ph4 ml4-ns mb3 mb5-l'>
            Get started &#8594;
          </a>
          <div className='dn db-l absolute bottom-0 left-0 translate-100-100'>
            <div className='i-medium-cargo relative'>
              <Img image={Assets.mediumCargo} className='absolute top-0 right-0' />
            </div>
          </div>
        </Hero>
      </div>

      <section className='w-100 ph3 ph4-ns relative z3'>
        <div id='start' className='pt3-m pt5-l flex items-center'>
          <div className='w-50-l tc'>
            <div className='dn dib-l'>
              <div className='i-containers relative'>
                <Img image={Assets.containers} className='absolute top-0 right-0' />
              </div>
            </div>
          </div>

          <div className='w-50-l center'>
            <h2 className='f3 navy f2-l measure-narrow'>
              Learn Kubernetes the <span className='strike'>hard</span> smart way
            </h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>
                Kubernetes is particularly well known for having a steep learning curve. It's also very early days, and
                the technology is changing at a fast pace. So how do you quickly get up to speed when everything around
                it is moving quickly? At learnk8s we have the best resources to master Kubernetes so that you can:
              </p>
              <ul className='list black-70 pl0 pt2'>
                <ListItem>Decide which one of the dozen ways to install Kubernetes is right for your team</ListItem>
                <ListItem>Speak the Kubernetes lingo and communicate with the rest of the industry</ListItem>
                <ListItem>
                  Architect micro-services that scale and leverage the strength and weaknesses of the platform
                </ListItem>
                <ListItem>
                  Get up to speed quickly without drowning in the amount of incomplete/outdated documentation
                </ListItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Interlude />

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
        <div className='ph3'>
          <div className='content measure-wide'>
            <h2 className='f3 navy f2-l'>Learnk8s Academy</h2>
            <p className='f4-l lh-copy black-70 measure-wide'>
              Learn Kubernetes online with hands-on material and instructor-led webinars. From playing to developing,
              testing to deploying, we'll cover it all in a way that is easy to understand. Master application
              deployment and scaling from the comfort of your home. There's no deadline: enjoy learning Kubernetes and
              solving challenges at your pace.
            </p>
            <PrimaryButton href={getFullUrl(website.children.academy)} text='Learn more &#8594;' />
          </div>
        </div>

        <div className='ml7-l dn db-ns'>
          <div className='i-cat-and-dog relative'>
            <Img image={Assets.catAndDog} className='absolute top-0 right-0' />
          </div>
        </div>
      </section>

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100 bg-evian'>
        <div className='tc'>
          <div className='mr7-l dib'>
            <div className='i-whiteboard relative'>
              <Img image={Assets.whiteboard} className='absolute top-0 right-0' />
            </div>
          </div>
        </div>

        <div className='ph3'>
          <div className='measure-wide'>
            <h2 className='f3 navy f2-l'>Quickstart Kubernetes training</h2>
            <p className='f4-l lh-copy black-70'>
              Hands-on modular courses that will train you how to deploy Kubernetes, how to get it into production, and
              how to operate and manage it efficiently and effectively. The training course draws from the real world
              examples making it perfect to quickly get up to speed with containers and Kubernetes.
            </p>
            <PrimaryButton href={getFullUrl(website.children.training)} text='Get started &#8594;' />
          </div>
        </div>
      </section>

      <section className='pa3 pa4-ns flex-ns items-center-ns justify-center-ns w-100'>
        <div className='ph3'>
          <div className='measure-wide'>
            <h2 className='f3 navy f2-l'>Enterprise-ready Kubernetes consulting</h2>
            <p className='f4-l lh-copy black-70'>
              Have you already built a Kubernetes cluster, but want the confidence it won't die when you move into prod?
              Our engineers have deployed production-ready Kubernetes for the hottest start-ups and the largest
              Enterprises. Their wide variety of experience will enable you to get the most out of Kubernetes and make
              sure you avoid unnecessary issues and pitfalls.
            </p>
            <PrimaryButton href={getFullUrl(website.children.consulting)} text='Get started &#8594;' />
          </div>
        </div>

        <div className='ml7-l dn db-ns'>
          <div className='i-team relative'>
            <Img image={Assets.team} className='absolute top-0 right-0' />
          </div>
        </div>
      </section>

      <Consultation />
      <Footer root={website} />
    </Layout>,
  )
}

export const PrimaryButton: React.StatelessComponent<{
  text: string
  anchor?: string
  mailto?: string
  href?: string
}> = ({ anchor, text, mailto, href }) => {
  return (
    <a href={href || anchor || mailto || ''} className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3'>
      {text}
    </a>
  )
}
