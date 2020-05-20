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
      image: 'assets/open_graph_preview.png',
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

        <Section>
          <div className='mt4 pb4 pb5-l'>
            <div className='measure f3-l f4 center'>
              <h1 className='f1-l f2 navy'>Kubernetes online courses</h1>
            </div>
            <p className='measure f3-l f4 lh-copy center bl bw3 b--blue ph3'>
              Learn <span className='b'>best practices and common pitfall</span> of deploying and scale apps in
              Kubernetes with the Learnk8s' hands-on, <span className='b'>online courses.</span>
            </p>
            <div className='mw6 center'>
              <div className='aspect-ratio aspect-ratio--4x3'>
                <img src='assets/academy/full-package.svg' alt='The expert package' className='aspect-ratio--object' />
              </div>
            </div>
          </div>
        </Section>

        <section className='mw8 center pv4 ph3'>
          <div className='measure f3-l f4 center'>
            <h2 className='f2 measure-narrow lh-solid navy'>
              1. Architecting, developing and deploying applications at scale
            </h2>
            <p className='measure f4 lh-copy black-80'>
              If you need to <span className='b underline'>quickly become productive at Kubernetes</span> to tackle the
              next big project at work, this is the perfect collection of courses for you.
            </p>
            <p className='measure f4 lh-copy black-80'>
              You will <span className='b underline'>learn the basics as well as advanced deployment strategies</span>{' '}
              to get your apps ready to a production Kubernetes cluster.
            </p>
            <a
              href='/architecting-scaling-apps-kubernetes'
              className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv3'
              target='_self'
              rel='noreferrer'
            >
              Learn more →
            </a>
          </div>
          <ul className='flex flex-wrap items-start list pl0 bt bw2 b--near-white pt4'>
            <CourseBlock
              title={material.docker.name}
              img={material.docker.cover}
              className='w-third-l center db mw6'
              difficulty='Beginner'
              defaultUSPrice={39}
              priceId='single-containers'
            >
              <p className='lh-copy masure f5'>{material.docker.description}</p>
              <a href='/architecting-scaling-apps-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.kubernetesFundamentals.name}
              img={material.kubernetesFundamentals.cover}
              className='w-third-l center db mw6'
              difficulty='Intermediate'
              defaultUSPrice={49}
              priceId='single-fundamentals'
            >
              <p className='lh-copy masure f5'>{material.kubernetesFundamentals.description}</p>
              <a href='/architecting-scaling-apps-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.deploymentStrategies.name}
              img={material.deploymentStrategies.cover}
              className='w-third-l center db mw6'
              difficulty='Intermediate'
              defaultUSPrice={49}
              priceId='single-deployment-strategies'
            >
              <p className='lh-copy masure f5'>{material.deploymentStrategies.description}</p>
              <a href='/architecting-scaling-apps-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
          </ul>
        </section>

        <section className='mw8 center pv4 ph3'>
          <div className='measure f3-l f4 center'>
            <h2 className='f2 measure-narrow lh-solid navy'>2. Advanced Kubernetes in practice</h2>
            <p className='measure f4 lh-copy black-80'>
              If you <span className='i'>really</span> want to learn Kubernetes, you should{' '}
              <span className='underline'>build and break your own cluster</span>.
            </p>
            <p className='measure f4 lh-copy black-80'>
              This collection of courses are designed to{' '}
              <span className='b underline'>dig deeper into Kubernetes internal components</span>.
            </p>
            <a
              href='/advanced-kubernetes-in-practice'
              className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv3'
              target='_self'
              rel='noreferrer'
            >
              Learn more →
            </a>
          </div>
          <ul className='flex flex-wrap items-start list pl0 bt bw2 b--near-white pt4'>
            <CourseBlock
              title={material.architecture.name}
              img={material.architecture.cover}
              className='w-third-l center db mw6'
              difficulty='Intermediate'
              defaultUSPrice={49}
              priceId='single-architecture'
            >
              <p className='lh-copy masure f5'>{material.architecture.description}</p>
              <a href='/advanced-kubernetes-in-practice' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.networking.name}
              img={material.networking.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-networking'
            >
              <p className='lh-copy masure f5'>{material.networking.description}</p>
              <a href='/advanced-kubernetes-in-practice' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.advancedNetworking.name}
              img={material.advancedNetworking.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-advanced-networking'
            >
              <p className='lh-copy masure f5'>{material.advancedNetworking.description}</p>
              <a href='/advanced-kubernetes-in-practice' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
          </ul>
        </section>

        <section className='mw8 center pv4 ph3'>
          <div className='measure f3-l f4 center'>
            <h2 className='f2 measure-narrow lh-solid navy'>3. Microservices at scale</h2>
            <p className='measure f4 lh-copy black-80'>
              Operating clusters with dozens, hundreds or thousands of microservices requires expertise and a solid
              plan.
            </p>
            <p className='measure f4 lh-copy black-80'>
              This collection of courses are designed to help you{' '}
              <span className='b underline'>design your services with scalability and flexibility</span> in mind.
            </p>
            <a
              href='/microservices-at-scale'
              className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv3'
              target='_self'
              rel='noreferrer'
            >
              Learn more →
            </a>
          </div>
          <ul className='flex flex-wrap items-start list pl0 bt bw2 b--near-white pt4'>
            <CourseBlock
              title={material.templating.name}
              img={material.templating.cover}
              className='w-third-l center db mw6'
              difficulty='Intermediate'
              defaultUSPrice={49}
              priceId='single-templating'
            >
              <p className='lh-copy masure f5'>{material.templating.description}</p>
              <a href='/microservices-at-scale' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.autoscaling.name}
              img={material.autoscaling.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-autoscaling'
            >
              <p className='lh-copy masure f5'>{material.autoscaling.description}</p>
              <a href='/microservices-at-scale' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.serviceMeshes.name}
              img={material.serviceMeshes.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-service-meshes'
            >
              <p className='lh-copy masure f5'>{material.serviceMeshes.description}</p>
              <a href='/microservices-at-scale' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
          </ul>
        </section>

        <section className='mw8 center pv4 ph3'>
          <div className='measure f3-l f4 center'>
            <h2 className='f2 measure-narrow lh-solid navy'>4. Exploring Kubernetes</h2>
            <p className='measure f4 lh-copy black-80'>
              Kubernetes is a vast subject and become an expert requires exploring concepts related to storage,
              networking, and scaling — to name a few.
            </p>
            <p className='measure f4 lh-copy black-80'>
              This collection of courses are designed to cover several{' '}
              <span className='b underline'>advanced topics necessary to operate a production-ready cluster</span>.
            </p>
            <a
              href='/exploring-kubernetes'
              className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv3'
              target='_self'
              rel='noreferrer'
            >
              Learn more →
            </a>
          </div>
          <ul className='flex flex-wrap items-start list pl0 bt bw2 b--near-white pt4'>
            <CourseBlock
              title={material.managingState.name}
              img={material.managingState.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-managing-state'
            >
              <p className='lh-copy masure f5'>{material.managingState.description}</p>
              <a href='/exploring-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.authentication.name}
              img={material.authentication.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={59}
              priceId='single-authentication'
            >
              <p className='lh-copy masure f5'>{material.authentication.description}</p>
              <a href='/exploring-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
            <CourseBlock
              title={material.ckad.name}
              img={material.ckad.cover}
              className='w-third-l center db mw6'
              difficulty='Advanced'
              defaultUSPrice={49}
              priceId='single-ckad'
            >
              <p className='lh-copy masure f5'>{material.ckad.description}</p>
              <a href='/exploring-kubernetes' className='link no-underline underline-hover navy'>
                Learn more &#8594;
              </a>
            </CourseBlock>
          </ul>
        </section>

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

export const Item: React.StatelessComponent<{ tick: JSX.Element }> = ({ children, tick }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src={tick.props.src} alt={tick.props.alt} className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>{children}</div>
    </li>
  )
}

const CourseBlock: React.StatelessComponent<{
  className?: string
  img: JSX.Element
  title: string
  difficulty: string
  defaultUSPrice: number
  priceId: string
}> = ({ children, className, img, title, difficulty, defaultUSPrice, priceId }) => {
  return (
    <li className={`${className || ''}`}>
      <div className='br2 br--top shadow-4 ma3'>
        <div className='aspect-ratio aspect-ratio--7x5 relative'>
          {React.createElement('img', {
            src: img.props.src,
            alt: img.props.alt,
            loading: 'lazy',
            className: 'aspect-ratio--object br2 br--top z-1',
          })}
          <div className='z-2 absolute bottom-1 right-1 bg-navy b f6 ph2 pv1 br4 white ttu'>
            Price:{' '}
            <span id={priceId}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(
                defaultUSPrice,
              )}
            </span>
          </div>
        </div>
        <div className='ph3 pb4'>
          <ul className='list pl0 flex pt3'>
            <li className='bg-near-white navy f7 ph2 pv1 ttu b br1'>Difficulty: {difficulty.toLowerCase()}</li>
          </ul>
          <h3 className='f3 lh-solid mt3'>{title}</h3>
          {children}
        </div>
      </div>
    </li>
  )
}

export const Feedback: React.StatelessComponent<{
  description: string
  author: string
  role?: string
  className?: string
}> = ({ description, author, role, className }) => {
  return (
    <div className={`bg-evian ph4 pv3 ${className}`}>
      <p className='f5 lh-copy black-80'>{description}</p>
      <p className='f5 lh-copy black-80 b'>
        — {author}
        {role ? `, ${role}` : ''}
      </p>
    </div>
  )
}

export const ListItemQuestion: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src='assets/question.svg' alt='Question' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy black-70'>{children}</p>
      </div>
    </li>
  )
}

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
}
