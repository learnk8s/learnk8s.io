import React from 'react'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { join } from 'path'
import { getConfig, State, Action, Store, Selector } from './store'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { PrimaryButton } from './homepage'

export const FreeTools = {
  id: 'free-tools',
  url: '/kubernetes-free-tools',
  title: 'Kubernetes tools ⎈ Learnk8s',
  description: 'A collection of free tools to help you navigate your Kubernetes journey.',
}

export const Resources = {
  id: 'resources',
  url: '/kubernetes-resources',
  title: 'Kubernetes curated resoureces',
  description: 'A collection of free tools and resources to help you navigate your Kubernetes journey.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Resources))
  store.dispatch(Action.pages.add(FreeTools))
  store.dispatch(
    Action.redirects.add({
      fromPageId: 'free-tools',
      redirectToPageId: 'resources',
      id: 'redirect-resources',
    }),
  )
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-resources',
      pageId: Resources.id,
      imagePath: 'assets/open_graph_preview.png',
      title: 'Kubernetes tools',
      description: 'A collection of free tools and resources to help you navigate your Kubernetes journey.',
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Resources.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const pages = Selector.pages.selectAll(state)
  const page = pages.find(it => it.id === Resources.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === Resources.id)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  return (
    <Html>
      <Head title={page.title} description={page.description}>
        {openGraph ? (
          <OpenGraph
            title={openGraph.title}
            description={openGraph.description}
            image={openGraph.imagePath}
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
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid'>Kubernetes tools and resources</h1>
            <div className='f4 measure'>
              <p className='f2-l f3 white bt bw2 pt3 o-90'>
                A collection of free tools and resources to help you navigate your Kubernetes journey.
              </p>
            </div>
          </div>
        </div>

        <section className='ph3 pv4 center'>
          <div className='mw8 center'>
            <p className='f3-l f4 b navy'>Table of contents</p>
            <ol className='f4 measure'>
              <li className='mv3'>
                <p className='b'>Kubernetes in production</p>
                <ul className='f4 measure'>
                  <li className='mv3'>
                    <a href='#best-practices' className='link navy underline-hover'>
                      Kubernetes production best practices
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='#troubleshooting' className='link navy underline-hover'>
                      Deployments troubleshooting flowchart
                    </a>
                  </li>
                </ul>
              </li>
              <li className='mv3'>
                <p className='b'>Research</p>
                <ul className='f4 measure'>
                  <li className='mv3'>
                    <a href='#choosing-node-size' className='link navy underline-hover'>
                      How to choose an instance type for a Kubernetes cluster
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='#managed-services' className='link navy underline-hover'>
                      Comparison of Kubernetes managed services
                    </a>
                  </li>
                  <li className='mv3'>
                    <a href='#service-meshes' className='link navy underline-hover'>
                      Comparison of services meshes
                    </a>
                  </li>
                </ul>
              </li>
              <li className='mv3'>
                <p className='b'>Others</p>
                <ul className='f4 measure'>
                  <li className='mv3'>
                    <a href='#wallpapers' className='link navy underline-hover'>
                      Kubernetes desktop wallpapers
                    </a>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <h2 className='f2-l f3 navy mw8 center pt4 ph3'>1. Kubernetes in production</h2>
          <ul className='pl0 list'>
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/free-tools/checklist.svg',
                    alt: 'Kubernetes production best practices',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h3 className='f3 b navy lh-solid' id='best-practices'>
                    Kubernetes production best practices
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A curated checklist of best practices for Kubernetes.
                  </p>
                  <a
                    href='/production-best-practices'
                    className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
                  >
                    Get started &#8594;
                  </a>
                </div>
              </div>
            </li>

            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center bg-evian ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/free-tools/troubleshooting.svg',
                    alt: 'Troubleshooting deployments in Kubernetes',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h3 className='f3 b navy lh-solid' id='troubleshooting'>
                    Deployments troubleshooting flowchart (PDF)
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A handy diagram to help you debug your deployments in Kubernetes. No more surprises when you see a{' '}
                    <span className='i'>CrashLoopBackOff</span> error message.
                  </p>
                  <a
                    href='/troubleshooting-deployments'
                    className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
                  >
                    Download &#8594;
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <h2 className='f2-l f3 navy mw8 center pt4 ph3'>2. Research</h2>
          <ul className='pl0 list'>
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
                  <h3 className='f3 b navy lh-solid' id='choosing-node-size'>
                    Choosing an instance type for a Kubernetes cluster
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    Research on the trade-offs when choosing an instance type for a Kubernetes cluster
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
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center bg-evian ph4 border-box'>
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
                  <h3 className='f3 b navy lh-solid' id='managed-services'>
                    Comparison of Kubernetes managed services
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    The research compares Kubernetes managed services such as Google Kubernetes Engine (GKE), Elastic
                    Kubernetes Service (EKS) and Azure Kubernetes (AKS).
                  </p>
                  <a
                    href='https://docs.google.com/spreadsheets/d/1RPpyDOLFmcgxMCpABDzrsBYWpPYCIBuvAoUQLwOGoQw'
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
                    src='assets/research/service-meshes.jpg'
                    alt='Comparison of service meshes for Kubernetes'
                    className='aspect-ratio--object shadow-1 br2'
                  />
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h3 className='f3 b navy lh-solid' id='service-meshes'>
                    Comparison of service meshes
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    The research compares service meshes for Kubernetes such as Istio, Linkerd and Kuma.
                  </p>
                  <a
                    href='https://docs.google.com/spreadsheets/d/1Bxf8VW9n-YyHeBiKdXt6zytOgw2cQlsDnK1gLUvsZ4A'
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

          <h2 className='f2-l f3 navy mw8 center pt4 ph3'>3. Others</h2>
          <ul className='pl0 list'>
            <li className='mv3 pv3 flex-ns mw8 center items-center justify-center ph4 border-box'>
              <div className='w-40-ns'>
                <div className='aspect-ratio aspect-ratio--4x3'>
                  {React.createElement('img', {
                    src: 'assets/free-tools/wallpaper-magician.svg',
                    alt: 'Kubernetes wallpapers',
                    loading: 'lazy',
                    className: 'aspect-ratio--object',
                  })}
                </div>
              </div>
              <div className='w-60-ns'>
                <div className='pl4-ns'>
                  <h3 className='f3 b navy lh-solid' id='wallpapers'>
                    Kubernetes wallpapers
                  </h3>
                  <p className='lh-copy measure-narrow f4 black-80'>
                    A collection of free Kubernetes wallpapers for your computer.
                  </p>
                  <a
                    href='/kubernetes-wallpapers'
                    className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
                  >
                    Download &#8594;
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className='pt1 pb4 bg-evian ph3'>
          <p className='f2 navy b tc mb2 pt3-ns pt3'>Keep it going!</p>
          <p className='lh-copy f4 black-70 measure center tc'>
            If you enjoy discussing the latest news on Kubernetes and sharing your learnings, you might want to join the
            Learnk8s Telegram group. You can{' '}
            <a href='/telegram' className='link navy underline'>
              join us using this link
            </a>
            .
          </p>
        </section>

        <Footer />
      </Body>
    </Html>
  )
}
