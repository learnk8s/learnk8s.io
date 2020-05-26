import React from 'react'
import { State, Action, getConfig, Store, Selector } from './store'
import { Navbar, Html, Head, OpenGraph, Body, Footer } from './layout.v3'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { tachyons } from './tachyons/tachyons'
import { material } from './material'

export const Academy = {
  id: 'Academy',
  url: '/academy',
  title: 'In-depth, hands-on Kubernetes online courses ⎈ Learnk8s Academy',
  description: `Learn Kubernetes from the comfort of wherever you are with step-by-step tutorial and guided, hands-on material.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Academy))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-academy',
      pageId: Academy.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'In-depth, hands-on Kubernetes online courses',
      description: `Learn Kubernetes from the comfort of wherever you are with step-by-step tutorial and guided, hands-on material.`,
    }),
  )
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Academy.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === Academy.id)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === Academy.id)
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

        <div className='new-hero pt4 pb5-l pb4 flex-ns justify-center-ns ph4'>
          <div className='mw6-m mw7-l pr2 pr4-ns'>
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid'>Online Kubernetes courses</h1>
            <div className='f4 measure'>
              <p className='f2-l f3 white bt bw2 pt3 o-90'>
                Learn <span className='b'>best practices and common pitfall</span> of deploying and scale apps in
                Kubernetes with the Learnk8s' hands-on, <span className='b'>online courses.</span>
              </p>
            </div>
          </div>
          <div className='dn db-ns flex-auto-l w4-m mw5-l'>
            <div className='aspect-ratio aspect-ratio--3x4'>
              <img src={'assets/academy/pc.svg'} alt='' className='aspect-ratio--object' />
            </div>
          </div>
        </div>

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt5'>
          <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Unlimited access</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>
            Enjoy all the Kubernetes content from Learnk8s and get access to future courses.
          </p>
          <div className='mw6 center'>
            <div className='aspect-ratio aspect-ratio--4x3'>
              <img src='assets/academy/full-package.svg' alt='The expert package' className='aspect-ratio--object' />
            </div>
          </div>
          <p className='lh-copy f3 black-80 tc b pv3'>Includes access to the following courses</p>
          <ul className='list pl0 flex flex-wrap'>
            <ListItem className='w-50-ns'>{material.docker.name}</ListItem>
            <ListItem className='w-50-ns'>{material.kubernetesFundamentals.name}</ListItem>
            <ListItem className='w-50-ns'>{material.deploymentStrategies.name}</ListItem>
            <ListItem className='w-50-ns'>{material.architecture.name}</ListItem>
            <ListItem className='w-50-ns'>{material.networking.name}</ListItem>
            <ListItem className='w-50-ns'>{material.advancedNetworking.name}</ListItem>
            <ListItem className='w-50-ns'>{material.autoscaling.name}</ListItem>
            <ListItem className='w-50-ns'>{material.templating.name}</ListItem>
            <ListItem className='w-50-ns'>{material.serviceMeshes.name}</ListItem>
            <ListItem className='w-50-ns'>{material.authentication.name}</ListItem>
            <ListItem className='w-50-ns'>{material.managingState.name}</ListItem>
            <ListItem className='w-50-ns'>{material.ckad.name}</ListItem>
            <SpecialListItem>
              <span className='b'>Future courses and updates</span>
            </SpecialListItem>
          </ul>
          <p className='lh-copy f3 tc'>
            Price:{' '}
            <span id='all' className=''>
              USD 499.00
            </span>
          </p>
          <div className='tc'>
            <a
              href='https://academy.learnk8s.io/all'
              className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
            >
              Buy now →
            </a>
          </div>
        </section>

        <Section className='bg-evian mt5'>
          <h2 className='f1-l f2 navy tc'>Course bundles</h2>
          <p className='lh-copy f4 black-70 measure center tc ph3 mb4'>
            Guided paths that help you learn Kubernetes one step at the time.
          </p>
          <div className='mw8 center pv4 ph3-ns'>
            <ul className='list pl0'>
              <li className='mv4'>
                <BundleBlock
                  buynNowLink='https://academy.learnk8s.io/bundle-architecting'
                  learnMoreLink='/architecting-scaling-apps-kubernetes'
                  fullPriceInUSD='USD 137.00'
                  bundlePriceInUSD='USD 89.00'
                  fullPriceId='bundle-architecting-full'
                  bundlePriceId='bundle-architecting'
                  images={[
                    material.docker.cover,
                    material.kubernetesFundamentals.cover,
                    material.deploymentStrategies.cover,
                  ]}
                >
                  <h2 className='f2-ns f3 measure-narrow lh-title navy'>
                    1. Architecting, developing and deploying applications at scale
                  </h2>
                  <p className='gray ttu f7'>
                    Difficulty: <span className='dib pv1 ph2 white bg-gray br2'>Entry level</span>{' '}
                    <span className='dib pv1 ph2 white bg-gray br2'>Intermediate</span>
                  </p>
                  <p className='measure f4 lh-copy black-80 pt3'>
                    If you need to <span className='b underline'>quickly become productive at Kubernetes</span> to
                    tackle the next big project at work, this is the perfect collection of courses for you.
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    You will learn the basics as well as advanced deployment strategies to get your apps ready to a
                    production Kubernetes cluster. The bundle includes access to the following courses:
                  </p>
                  <ol className='f4'>
                    <li className='mv3'>{material.docker.name}</li>
                    <li className='mv3'>{material.kubernetesFundamentals.name}</li>
                    <li className='mv3'>{material.deploymentStrategies.name}</li>
                  </ol>
                </BundleBlock>
              </li>

              <li className='mv4'>
                <BundleBlock
                  buynNowLink='https://academy.learnk8s.io/bundle-advanced-kubernetes'
                  learnMoreLink='/architecting-scaling-apps-kubernetes'
                  fullPriceInUSD='USD 167.00'
                  bundlePriceInUSD='USD 119.00'
                  fullPriceId='bundle-advanced-kubernetes-full'
                  bundlePriceId='bundle-advanced-kubernetes'
                  images={[material.architecture.cover, material.networking.cover, material.advancedNetworking.cover]}
                >
                  <h2 className='f2-ns f3 measure-narrow lh-solid navy'>2. Advanced Kubernetes in practice</h2>
                  <p className='gray ttu f7'>
                    Difficulty: <span className='dib pv1 ph2 white bg-gray br2'>Intermediate</span>{' '}
                    <span className='dib pv1 ph2 white bg-gray br2'>Advanced</span>
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    If you <span className='i'>really</span> want to learn Kubernetes, you should build and break your
                    cluster.
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    The following collection of courses are designed to{' '}
                    <span className='b underline'>dig deeper into Kubernetes internal components:</span>
                  </p>
                  <ol className='f4'>
                    <li className='mv3'>{material.architecture.name}</li>
                    <li className='mv3'>{material.networking.name}</li>
                    <li className='mv3'>{material.advancedNetworking.name}</li>
                  </ol>
                </BundleBlock>
              </li>

              <li className='mv4'>
                <BundleBlock
                  buynNowLink='https://academy.learnk8s.io/bundle-microservices'
                  learnMoreLink='/microservices-at-scale'
                  fullPriceInUSD='USD 167.00'
                  bundlePriceInUSD='USD 119.00'
                  fullPriceId='bundle-microservices-full'
                  bundlePriceId='bundle-microservices'
                  images={[material.autoscaling.cover, material.templating.cover, material.serviceMeshes.cover]}
                >
                  <h2 className='f2-ns f3 measure-narrow lh-solid navy'>3. Microservices at scale</h2>
                  <p className='gray ttu f7'>
                    Difficulty: <span className='dib pv1 ph2 white bg-gray br2'>Intermediate</span>{' '}
                    <span className='dib pv1 ph2 white bg-gray br2'>Advanced</span>
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    Operating clusters with dozens, hundreds or thousands of microservices requires expertise and a
                    solid plan.
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    The following collection of courses are designed to help you{' '}
                    <span className='b underline'>create your services with scalability and flexibility</span> in mind.
                  </p>
                  <ol className='f4'>
                    <li className='mv3'>{material.autoscaling.name}</li>
                    <li className='mv3'>{material.templating.name}</li>
                    <li className='mv3'>{material.serviceMeshes.name}</li>
                  </ol>
                </BundleBlock>
              </li>

              <li className='mv4'>
                <BundleBlock
                  buynNowLink='https://academy.learnk8s.io/bundle-exploring-kubernetes2'
                  learnMoreLink='/exploring-kubernetes'
                  fullPriceInUSD='USD 167.00'
                  bundlePriceInUSD='USD 119.00'
                  fullPriceId='bundle-exploring-kubernetes2-full'
                  bundlePriceId='bundle-exploring-kubernetes2'
                  images={[material.authentication.cover, material.managingState.cover, material.ckad.cover]}
                >
                  <h2 className='f2-ns f3 measure-narrow lh-solid navy'>4. Exploring Kubernetes</h2>
                  <p className='gray ttu f7'>
                    Difficulty: <span className='dib pv1 ph2 white bg-gray br2'>Intermediate</span>{' '}
                    <span className='dib pv1 ph2 white bg-gray br2'>Advanced</span>
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    Kubernetes is a vast subject and becoming an expert requires exploring concepts related to storage,
                    networking, and scaling — to name a few.
                  </p>
                  <p className='measure f4 lh-copy black-80'>
                    This collection of courses are designed to cover several{' '}
                    <span className='b underline'>advanced topics necessary to operate a production-ready cluster</span>
                    .
                  </p>
                  <ol className='f4'>
                    <li className='mv3'>{material.authentication.name}</li>
                    <li className='mv3'>{material.managingState.name}</li>
                    <li className='mv3'>{material.ckad.name}</li>
                  </ol>
                </BundleBlock>
              </li>
            </ul>
          </div>
        </Section>

        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
var request = new XMLHttpRequest();
request.open('GET', 'https://academy.learnk8s.io/api/v1/prices', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    try {
      var resp = JSON.parse(this.response);
      const keys = Object.keys(resp)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var element = document.querySelector('#' + key)
        if (!!element) {
          var price = resp[key]
          element.innerHTML = new Intl.NumberFormat('en-' + price.country, {
            style: 'currency',
            currency: price.currency,
            currencyDisplay: 'code',
          }).format(price.gross)
        }
      }
    } catch(error) {
      console.log(error)
    }
  } else {}
};

request.onerror = function() {};

request.send();
      `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } }; (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({c: 'c062c959-f796-45f5-a451-e24c09b4df27', f: true }); done = true; } }; })();`,
          }}
          data-cfasync='false'
        />
      </Body>
    </Html>
  )
}

const BundleBlock: React.StatelessComponent<{
  buynNowLink: string
  learnMoreLink: string
  fullPriceInUSD: string
  bundlePriceInUSD: string
  fullPriceId: string
  bundlePriceId: string
  images: [JSX.Element, JSX.Element, JSX.Element]
}> = ({
  children,
  buynNowLink,
  learnMoreLink,
  fullPriceInUSD,
  bundlePriceInUSD,
  fullPriceId,
  bundlePriceId,
  images,
}) => {
  return (
    <>
      <div className='bg-white br2 pv2 ph4 f2-ns measure-narrow-ns center mw-100-l flex-l'>
        <div className='w-70-l'>
          {children}
          <p className='lh-copy f3'>
            Price:{' '}
            <span id={fullPriceId} className='strike f4'>
              {fullPriceInUSD}
            </span>{' '}
            <span id={bundlePriceId}>{bundlePriceInUSD}</span>
          </p>
          <p className='lh-copy f4'>
            <a
              href={buynNowLink}
              className='no-underline dib white bg-navy br1 pv3 ph4 b f4 br2 mv3 dib mr2'
              target='_self'
              rel='noreferrer'
            >
              Buy now →
            </a>
            or&nbsp;
            <a href={learnMoreLink} className='link gray underline navy-hover'>
              learn more
            </a>
          </p>
        </div>
        <div className='w-30 dn db-l'>
          <ul className='list pl0 pt5'>
            <li className='h3 w-90'>
              <div className='aspect-ratio aspect-ratio--7x5 relative'>
                {React.createElement('img', {
                  src: images[0].props.src,
                  alt: images[0].props.alt,
                  loading: 'lazy',
                  className: 'aspect-ratio--object br2 z-1 shadow-1',
                })}
              </div>
            </li>
            <li className='h3 w-90 ml4'>
              <div className='aspect-ratio aspect-ratio--7x5 relative'>
                {React.createElement('img', {
                  src: images[1].props.src,
                  alt: images[1].props.alt,
                  loading: 'lazy',
                  className: 'aspect-ratio--object br2 z-1 shadow-1',
                })}
              </div>
            </li>
            <li className='h3 w-90 ml2'>
              <div className='aspect-ratio aspect-ratio--7x5 relative'>
                {React.createElement('img', {
                  src: images[2].props.src,
                  alt: images[2].props.alt,
                  loading: 'lazy',
                  className: 'aspect-ratio--object br2 z-1 shadow-1',
                })}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl2 pl3-ns w-90'>
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

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
}
