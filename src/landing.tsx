import React from 'react'
import { CourseRow, faqs, DashboardModule, PackageFeatures } from './training.v2'
import { material } from './material'
import { PrimaryButton } from './homepage'
import { Course, Boolean, ItemAvailabilityEnum, CourseInstance } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { Store } from 'redux'
import {
  State,
  Actions,
  Action,
  getPages,
  getOpenGraph,
  getWorkshops,
  getLandingPageLocations,
  getConfig,
} from './store'
import {
  Html,
  Head,
  OpenGraph,
  Body,
  Navbar,
  Hero,
  Testimonal,
  mailto,
  Interlude,
  FAQs,
  Footer,
  MailTo,
} from './layout.v3'
import { join } from 'path'
import { defaultAssetsPipeline } from './optimise'
import { subDays } from 'date-fns'
import { tachyons } from './tachyons/tachyons'

export const Pages = {
  landingLondon: {
    id: 'landingLondon',
    url: '/london',
    title: 'Kubernetes training in London',
    description: 'Become an expert in deploying application at scale with Kubernetes in London.',
    city: 'London',
  },
  landingToronto: {
    id: 'landingToronto',
    url: '/toronto',
    title: 'Kubernetes training in Toronto',
    description: 'Become an expert in deploying application at scale with Kubernetes in Toronto.',
    city: 'Toronto',
  },
  landingSingapore: {
    id: 'landingSingapore',
    url: '/singapore',
    title: 'Kubernetes training in Singapore',
    description: 'Become an expert in deploying application at scale with Kubernetes in Singapore.',
    city: 'Singapore',
  },
  landingSanFrancisco: {
    id: 'landingSanFrancisco',
    url: '/san-francisco',
    title: 'Kubernetes training in San Francisco',
    description: 'Become an expert in deploying application at scale with Kubernetes in San Francisco.',
    city: 'San Francisco',
  },
}

export function Register(store: Store<State, Actions>) {
  Object.values(Pages).forEach(page => {
    store.dispatch(Action.registerPage(page))
    store.dispatch(
      Action.registerLandingPageLocation({
        id: `${page.id}-location`,
        city: Pages[page.id as keyof typeof Pages].city,
        pageId: page.id,
      }),
    )
    store.dispatch(
      Action.registerOpenGraph({
        id: `og-${page.id}`,
        pageId: page.id,
        image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
        description:
          'Join an instructor-led, hands-on course on how to quickly deploy applications in Kubernetes — without having to wade through mountains of documentation — and learn how to orchestrate and manage containers at scale.',
        title: 'Kubernetes Training Courses',
      }),
    )
  })
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  const pages = getPages(state).filter(it => Object.keys(Pages).includes(it.id))
  pages.forEach(page => {
    defaultAssetsPipeline({
      jsx: renderPage(state, page.id),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: page.url,
      outputFolder: getConfig(state).outputFolder,
    })
  })
}

const customRequest: MailTo = {
  subject: 'Advanced Kubernetes training — Module enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know if you cover _______ in your course.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export function renderPage(state: State, pageId: string): JSX.Element {
  const page = getPages(state).find(it => it.id === pageId)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === pageId)
  const [landingPageLocation] = getLandingPageLocations(state).filter(it => it.pageId === pageId)
  if (!landingPageLocation) {
    throw new Error(`Invalid location for landing page ${pageId}`)
  }
  const courses = getWorkshops(state).filter(it => it.venue.city === landingPageLocation.city)
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
        <style>{tachyons}</style>
        <link rel='stylesheet' href='assets/style.css' />
        {courses.map((course, index) => {
          return (
            <JsonLd<Course>
              key={index}
              item={{
                '@type': 'Course',
                '@context': 'https://schema.org',
                name: course.title,
                courseCode: course.id,
                description: `In this course, you'll take an app, build it into a container then use Kubernetes to deploy, scale, and update it. You will learn how to build a cluter and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
                educationalCredentialAwarded: 'Certificate of completetion',
                provider: {
                  '@type': 'Organization',
                  name: 'Learnk8s',
                },
                hasCourseInstance: [
                  {
                    '@type': 'CourseInstance',
                    name: course.title,
                    description: `In this course, you'll take an app, build it into a container then use Kubernetes to deploy, scale, and update it. You will learn how to build a cluter and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
                    courseMode: 'full-time',
                    duration: course.duration as any,
                    inLanguage: course.language,
                    startDate: course.startAt,
                    endDate: course.endsAt,
                    location: {
                      '@type': 'Place',
                      name: course.venue.locationName,
                      address: `${course.venue.city}, ${course.venue.country}`,
                    },
                    isAccessibleForFree: Boolean.False,
                    offers: {
                      '@type': 'Offer',
                      availability: ItemAvailabilityEnum.InStock,
                      price: course.price.price,
                      priceCurrency: course.price.currency,
                      url: currentAbsoluteUrl,
                      validFrom: subDays(new Date(course.startAt), 90).toISOString(),
                    },
                    image: `${course.picture.src}`,
                    performer: {
                      '@type': 'Organization',
                      name: 'Learnk8s',
                    },
                  } as CourseInstance,
                ],
              }}
            />
          )
        })}
      </Head>
      <Body>
        <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
          <Navbar />

          <Hero image={<img src='assets/training/training.svg' alt='Training' />} imageClass='i-training'>
            <h1 className='f1 f-subheadline-l'>
              Kubernetes <span className='no-wrap'>instructor-led</span> training course in {landingPageLocation.city}
            </h1>
            <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>
              Become an expert in deploing and scaling applications with Kubernetes.
            </h2>
            <div className='dn db-l mw6 mh3 mh4-ns tc'>
              <div className='w3 h3 dib'>
                <img src='assets/training/down_arrow_white.svg' alt='Down' />
              </div>
            </div>
          </Hero>
        </div>

        <section className='w-60-ns ph3 center relative z3 bg-white pt3 pb5 mb4'>
          <p className='f2 navy b tc ph3'>Join the next class in {landingPageLocation.city}</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb3'>
            Public classes are great to get started mastering Kubernetes or prepare for your CKA or CKAD exam. The
            starting time is 9.30 am local time.
          </p>
          <ul className='list'>
            {courses
              .slice(0)
              .sort((a, b) => new Date(a.startAt).valueOf() - new Date(b.startAt).valueOf())
              .map(it => (
                <CourseRow
                  event={{
                    timezone: it.timezone,
                    startAt: it.startAt,
                    location: it.venue,
                    details: it,
                    offer: it.price,
                  }}
                />
              ))}
          </ul>
        </section>

        <Testimonal
          quote='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.'
          author='Luke Anderson, Senior IT Engineer'
        />

        <section className='bg-evian pt4' id='start'>
          <p className='f2 navy b tc ph3'>Advanced Kubernetes course modules</p>
          <p className='lh-copy f4 black-70 measure center tc ph3'>
            The advanced course is made 6 core modules that are designed to last 2 full days. You're recommended to
            select 4 optional modules for the third day, but you choose more if you wish.
          </p>

          <div className='ma3 ma5-l flex-l flex-wrap justify-center'>
            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/docker.png' alt='Linux containers and Kubernetes' />}
              title={`1. ${material.docker.name}`}
              description={material.docker.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn how to package and run applications in Docker containers. The module covers the following
                topics:
              </p>
              <ul>
                {Object.values(material.docker.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/zero.png' alt='Zero to Kubernetes' />}
              title={`2. ${material.kubernetesFundamentals.name}`}
              description={material.kubernetesFundamentals.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the
                following topics:
              </p>
              <ul>
                {Object.values(material.kubernetesFundamentals.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/deploy.png' alt='Deployment strategies' />}
              title={`3. ${material.deploymentStrategies.name}`}
              description={material.deploymentStrategies.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn different techniques to deploy your applications with zero downtime. The module covers
                the following topics:
              </p>
              <ul>
                {Object.values(material.deploymentStrategies.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/architecture.png' alt='Kubernetes architecture' />}
              title={`4. ${material.architecture.name}`}
              description={material.architecture.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn the core components in Kubernetes and how they work. The module covers the following
                topics:
              </p>
              <ul>
                {Object.values(material.architecture.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/networking.png' alt='Kubernetes networking' />}
              title={`5. ${material.networking.name}`}
              description={material.networking.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn how the traffic flows inside the cluster. You will also learn how to expose your apps to
                the public internet. The module covers the following topics:
              </p>
              <ul>
                {Object.values(material.networking.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/state.png' alt='Managing state with Kubernetes' />}
              title={`6. ${material.managingState.name}`}
              description={material.managingState.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn how to persist data in Kubernetes. The module covers the following topics:
              </p>
              <ul>
                {Object.values(material.managingState.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/templating.png' alt='Templating Kubernetes resources' />}
              title={`7. ${material.templating.name}`}
              description={material.templating.description}
            >
              <p className='lh-copy measure-wide'>
                You will learn how to template resources for different environments. The module covers the following
                topics:
              </p>
              <ul>
                {Object.values(material.templating.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </DashboardModule>

            <DashboardModule
              className='w-40-l'
              preview={<img src='assets/training/optionals.png' alt='Optional modules' />}
              title='Optionals'
              description={`Kubernetes is a vast subject and there're many other topics you might be interested in such what's the best autoscaler and how you should secure your cluster. If you worked in a regulated environment, you could find interesting advanced allocations: scheduling workloads only on specific Nodes.`}
            >
              <p className='lh-copy measure-wide'>
                You can pick and choose from the modules below. Looking for something in particular?{' '}
                <a className='link underline' href={mailto(customRequest)}>
                  Get in touch!
                </a>
              </p>
              <ul>
                <li className='lh-copy mv1'>{material.advancedNetworking.name}</li>
                <li className='lh-copy mv1'>{material.security.name}</li>
                <li className='lh-copy mv1'>{material.autoscaling.name}</li>
                <li className='lh-copy mv1'>{material.advancedScheduling.name}</li>
                <li className='lh-copy mv1'>{material.multiCloud.name}</li>
                <li className='lh-copy mv1'>{material.serviceMeshes.name}</li>
                <li className='lh-copy mv1'>{material.extensions.name}</li>
              </ul>
            </DashboardModule>
            <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
          </div>

          <div className='pt5-m pb4 pb5-ns ph3 measure-wide center'>
            <p className='f3 mb1 mt0 lh-copy'>
              &ldquo;A really enjoyable 3-day workshop on Kubernetes. I cemented my understanding of Kubernetes and can
              now start implementing and furthering my knowledge with real examples and workflows. Next stop, production
              experience.&rdquo;
            </p>
            <p className='f4 i mb2'>— David Heward, Senior Devops Engineer</p>
          </div>
        </section>

        <div className={`mv3 mw6 center`}>
          <div className='header ph3 pt1 bb b--light-gray'>
            <h2 className='navy tc f2'>Looking to train your team?</h2>
            <h3 className='normal black-70 tc mt0 measure lh-copy'>
              The private training course is excellent if you wish to customise your learning path to adopt Kubernetes.
            </h3>
          </div>
          <PackageFeatures
            description=''
            benefits={[
              'Pick the modules relevant to your team',
              'Deep dive into the content with a three, four or five days course',
              'Delivered on site, remotely or in a cozy meeting room',
              'Classes from 10+ delegates',
            ]}
          />
          <p className='tc pb4'>
            <PrimaryButton text='Get in touch ⇢' mailto={mailto(privateGroupEnquiry)} />
          </p>
        </div>

        <Interlude />

        <FAQs faqs={faqs} />

        <Footer />
      </Body>
    </Html>
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
