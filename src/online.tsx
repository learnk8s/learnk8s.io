import React from 'react'
import { material } from './material'
import {
  Course,
  Boolean,
  ItemAvailability,
  CourseInstance,
  EventStatusType,
  EventAttendanceModeEnumeration,
} from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { Store } from 'redux'
import {
  State,
  Actions,
  Action,
  getPages,
  getOpenGraph,
  getConfig,
  getAuthors,
  getOnlineCourses,
  StoreV2,
  StateV2,
  ActionV2,
} from './store'
import { Html, Head, OpenGraph, Body, Navbar, mailto, FAQs, Footer, MailTo, FAQ } from './layout.v3'
import { join } from 'path'
import { defaultAssetsPipeline } from './optimise'
import { subDays, format } from 'date-fns'
import { tachyons } from './tachyons/tachyons'
import { Authors } from './aboutUs'

export const Page = {
  id: 'online-classroom',
  url: '/kubernetes-online-classroom',
  title: 'Online Kubernetes training',
  description: 'Become an expert in deploying application at scale with Kubernetes.',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Page))
  store.dispatch(
    Action.registerOpenGraph({
      id: `og-${Page.id}`,
      pageId: Page.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      description:
        'Join an instructor-led, hands-on course on how to quickly deploy applications in Kubernetes — without having to wade through mountains of documentation — and learn how to orchestrate and manage containers at scale.',
      title: 'Kubernetes Training Courses',
    }),
  )
}

export function Mount({ store, storeV2 }: { store: Store<State, Actions>; storeV2: StoreV2 }) {
  const state = store.getState()
  const stateV2 = storeV2.getState()
  defaultAssetsPipeline({
    jsx: renderPage({ state, stateV2 }),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Page.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const moreInfo = (date: string): MailTo => ({
  subject: 'Online Kubernetes workshop',
  body: `Hi Learnk8s,\n\nI'd like to know ____ about the next online workshop scheduled for the ${date}. Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
})

const faqs: FAQ[] = [
  {
    title: 'Who is this workshop for?',
    content:
      'It is intended for Software developers, Architects and Deployment engineers seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerised applications.',
  },
  {
    title: 'Are there any joining instructions?',
    content:
      'You will receive the joining instructions with all the material needed to run the course after you sign up for the course.',
  },
  {
    title: 'What tools do you use?',
    content: 'Slack for chatting and Google Hangouts or Zoom for video conferencing.',
  },
  {
    title: 'Is there 2-way audio with the instructor?',
    content: 'Yes, you will be able to ask questions like if you were in a physical class.',
  },
  {
    title: 'What version of Kubernetes was this created for?',
    content: 'The material was authored for Minikube 1.9.x, Kubernetes 1.17, Helm 3',
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this, so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt, and we will refund you.`,
  },
  {
    title: 'Is the course guaranteed to run?',
    content:
      'Not all courses are guaranteed to run. [Please get in touch](mailto:hello@learnk8s.io) and we will confirm with you which event is guaranteed to run.',
  },
  {
    title: 'How many people attend a class',
    content:
      'We can participations at 20 students per class. We might reimburse your ticket if you are oversubscribed.',
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! Send us an email at [hello@learnk8s.io](mailto:hello@learnk8s.io) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any type of schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`,
  },
]

export function renderPage({ state, stateV2 }: { state: State; stateV2: StateV2 }): JSX.Element {
  const pageId = Page.id
  const page = getPages(state).find(it => it.id === pageId)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === pageId)
  const courses = getOnlineCourses(stateV2)
  const currentAbsoluteUrl = `${state.config.protocol}://${join(state.config.hostname, page.url)}`

  const instructors = getAuthors(state).filter(it =>
    [
      Authors.danielePolencic.id,
      Authors.salmanIqbal.id,
      Authors.gergelyRisko.id,
      Authors.mauricioSalatino.id,
      Authors.danielWeibel.id,
      Authors.chrisNesbittSmith.id,
    ].includes(it.id),
  )
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
                    duration: '3 days',
                    inLanguage: 'English',
                    startDate: course.startsAt,
                    endDate: course.endsAt,
                    location: {
                      '@type': 'VirtualLocation',
                      url: `https://academy.learnk8s.io`,
                    },
                    isAccessibleForFree: Boolean.False,
                    offers: {
                      '@type': 'Offer',
                      availability: ItemAvailability.InStock,
                      price: 2249,
                      priceCurrency: 'USD',
                      url: currentAbsoluteUrl,
                      validFrom: subDays(new Date(course.startsAt), 90).toISOString(),
                    },
                    image: `${course.image}`,
                    performer: {
                      '@type': 'Organization',
                      name: 'Learnk8s',
                    },
                    eventStatus: EventStatusType.EventScheduled,
                    eventAttendanceMode: EventAttendanceModeEnumeration.OnlineEventAttendanceMode,
                  } as CourseInstance,
                ],
              }}
            />
          )
        })}
      </Head>
      <Body>
        <Navbar />

        <div className='new-hero pt4 pb5-l pb4 flex-ns justify-center-ns ph4'>
          <div className='mw6-m mw7-l pr2 pr4-ns'>
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid'>Kubernetes online classrooms</h1>
            <div className='f4 measure'>
              <p className='f2-l f3 white bt bw2 pt3 o-90'>
                Learn Kubernetes from the comfort of your home, from seasoned instructors while making new friends
              </p>
            </div>
          </div>
          <div className='dn db-ns flex-auto-l w4-m mw5-l'>
            <div className='aspect-ratio aspect-ratio--3x4'>
              <img src={'assets/training/temp.svg'} alt='' className='aspect-ratio--object' />
            </div>
          </div>
        </div>

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt5'>
          <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Join the next online class</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>
            Online public classes are great to get started with Kubernetes from the comfort of your home.
          </p>
          <ul className='list pl0'>
            {courses
              .slice(0)
              .sort((a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf())
              .map((it, i) => (
                <CourseRow
                  timezone={it.timezone}
                  startsAt={it.startsAt}
                  title={it.title}
                  duration={'Full time (6 hours per day), 3 days'}
                  id={`event${i}`}
                  isLive={i === 0}
                  submitUrl={'https://academy.learnk8s.io/checkout?product%5B%5D=online-course'}
                />
              ))}
          </ul>
        </section>

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy tc'>How does it work?</h2>
            <p className='measure f3-l f4 lh-copy center'>
              This is a <span className='b'>full time, 3-days, course</span> on learning and mastering Kubernetes.
            </p>
            <p className='measure f3-l f4 lh-copy center'>Things you need to know about the course:</p>
            <ul className='list ph2'>
              <ListItem>
                You will get your hands dirty: the split is <span className='b'>40% lecture and 60% hands-on labs</span>
                .
              </ListItem>
              <ListItem>
                You will have the chance to <span className='b'>ask questions and discuss with the instructor.</span>
              </ListItem>
              <ListItem>The event is small and cosy, so everyone has a fair chance to participate and engage</ListItem>
              <ListItem>
                You will learn from expert instructors (you can find us on the{' '}
                <a href='https://t.me/learnk8s' className='link navy underline' ref='noreferrer'>
                  Learnk8s Telegram group
                </a>
                ).
              </ListItem>
              <ListItem>The event is streamed using excellent video quality, and we use Slack as chat.</ListItem>
              <ListItem>
                You will have <span className='b'>access to all the material after the course.</span>
              </ListItem>
              <ListItem>
                There's a clear schedule so that you can take a walk or look after the kids in-between lectures.
              </ListItem>
            </ul>
            <p className='measure f3-l f4 lh-copy center'>This course is not:</p>
            <ul className='list ph2'>
              <ListItemX>
                A webinar with hundreds of people. There's a 2-way audio (and video) stream with the instructor.
              </ListItemX>
              <ListItemX>
                Passive and less engaging because it's online. You will have to answer to question just like in a real,
                in-person workshop.
              </ListItemX>
            </ul>
          </div>
        </Section>

        <Section className='bg-evian'>
          <h2 className='f1-l f2 navy tc'>What does it cover?</h2>
          <p className='lh-copy f4 black-70 measure center tc ph3 mb4 mb5-ns'>
            The following are the ten most common modules
          </p>

          <div className='mv3 mv5-l mt0-l mw8 center'>
            <Module
              preview={material.docker.cover}
              title={`1. ${material.docker.name}`}
              description={material.docker.description}
              id='course0'
              className='mv3'
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
            </Module>

            <Module
              preview={material.kubernetesFundamentals.cover}
              title={`2. ${material.kubernetesFundamentals.name}`}
              description={material.kubernetesFundamentals.description}
              id='course1'
              className='mv3'
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
            </Module>

            <Module
              preview={material.deploymentStrategies.cover}
              title={`3. ${material.deploymentStrategies.name}`}
              description={material.deploymentStrategies.description}
              id='course2'
              className='mv3'
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
            </Module>

            <Module
              preview={material.architecture.cover}
              title={`4. ${material.architecture.name}`}
              description={material.architecture.description}
              id='course3'
              className='mv3'
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
            </Module>

            <Module
              preview={material.networking.cover}
              title={`5. ${material.networking.name}`}
              description={material.networking.description}
              id='course3'
              className='mv3'
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
            </Module>

            <Module
              preview={material.advancedNetworking.cover}
              title={`6. ${material.advancedNetworking.name}`}
              description={material.advancedNetworking.description}
              id='course3'
              className='mv3'
            >
              <p className='lh-copy measure-wide'>
                You will learn how to persist data in Kubernetes. The module covers the following topics:
              </p>
              <ul>
                {Object.values(material.advancedNetworking.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </Module>

            <Module
              preview={material.templating.cover}
              title={`7. ${material.templating.name}`}
              description={material.templating.description}
              id='course3'
              className='mv3'
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
            </Module>

            <Module
              preview={material.autoscaling.cover}
              title={`8. ${material.autoscaling.name}`}
              description={material.autoscaling.description}
              id='course3'
              className='mv3'
            >
              <p className='lh-copy measure-wide'>
                You will learn how to expose metrics from the cluster and how to use the to scale your apps. The module
                covers the following topics:
              </p>
              <ul>
                {Object.values(material.autoscaling.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </Module>

            <Module
              preview={material.serviceMeshes.cover}
              title={`9. ${material.serviceMeshes.name}`}
              description={material.serviceMeshes.description}
              id='course3'
              className='mv3'
            >
              <p className='lh-copy measure-wide'>
                You will learn what are service service and how you can build your own Istio service mesh with Envoy.
                The module covers the following topics:
              </p>
              <ul>
                {Object.values(material.serviceMeshes.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </Module>

            <Module
              preview={material.managingState.cover}
              title={`10. ${material.managingState.name}`}
              description={material.managingState.description}
              id='course3'
              className='mv3'
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
            </Module>

            <p className='f2-l f3 navy tc b'>And there's more</p>
            <ul className='pl0 f4 measure center'>
              <ListItem>Security</ListItem>
              <ListItem>CI/CD</ListItem>
              <ListItem>Multi-cloud, multi-data centre deployments</ListItem>
              <ListItem>Advanced Scheduling workloads</ListItem>
              <ListItem>ML/AI with Kubeflow</ListItem>
            </ul>
            <p className='lh-copy f4 black-80 measure center tc ph3 mb3 mb5-ns mt4'>
              Kubernetes is a vast subject, but you can select the topic that you are <span className='b'>really</span>{' '}
              interested in.
            </p>
          </div>
        </Section>

        <Section className=''>
          <h2 className='f1-l f2 navy tc'>What's the plan?</h2>
          <p className='lh-copy f4 black-70 measure center tc ph3 mb3 mb5-ns'>
            A typical schedule for the three days course:
          </p>
          <ul className='list pl0 flex justify-center flex-wrap mb0 mw7 center'>
            <li className='br2 br--right br--top order-0 w-third'>
              <p className='navy f3 b lh-solid bb bw1 b--light-gray pb3 pl2 ml3 mr4 mb0 bw2'>Day 1</p>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Introductions</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Morning session</p>
                  <div className='relative'>
                    <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                      {React.createElement('img', {
                        src: material.docker.cover.props.src,
                        alt: material.docker.cover.props.alt,
                        loading: 'lazy',
                        className: 'aspect-ratio--object br2 br--top z-1',
                      })}
                    </div>

                    <div className='absolute top-2 left-0 w-100'>
                      <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                        {React.createElement('img', {
                          src: material.kubernetesFundamentals.cover.props.src,
                          alt: material.kubernetesFundamentals.cover.props.alt,
                          loading: 'lazy',
                          className: 'aspect-ratio--object br2 br--top z-1',
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li className='br2 br--right br--top order-3 w-third'>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Lunch break</p>
                </li>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Whiteboard challenges</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Afternoon session</p>
                  <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                    {React.createElement('img', {
                      src: material.deploymentStrategies.cover.props.src,
                      alt: material.deploymentStrategies.cover.props.alt,
                      loading: 'lazy',
                      className: 'aspect-ratio--object br2 br--top z-1',
                    })}
                  </div>
                </li>
              </ul>
            </li>

            <li className='br2 br--right br--top order-1 w-third'>
              <p className='navy f3 b lh-solid bb bw1 b--light-gray pb3 pl2 ml3 mr4 mb0 bw2'>Day 2</p>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Recap day 1</p>
                </li>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Whiteboard challenges</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Morning session</p>
                  <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                    {React.createElement('img', {
                      src: material.architecture.cover.props.src,
                      alt: material.architecture.cover.props.alt,
                      loading: 'lazy',
                      className: 'aspect-ratio--object br2 br--top z-1',
                    })}
                  </div>
                </li>
              </ul>
            </li>

            <li className='br2 br--right br--top order-5 w-third'>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Lunch break</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Afternoon session</p>
                  <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                    {React.createElement('img', {
                      src: material.networking.cover.props.src,
                      alt: material.networking.cover.props.alt,
                      loading: 'lazy',
                      className: 'aspect-ratio--object br2 br--top z-1',
                    })}
                  </div>
                </li>
              </ul>
            </li>

            <li className='br2 br--right br--top mt0 order-2 w-third'>
              <p className='navy f3 b lh-solid bb bw1 b--light-gray pb3 pl2 ml3 mr4 mb0 bw2'>Day 3</p>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Recap day 2</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Morning session</p>
                  <div className='relative'>
                    <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                      {React.createElement('img', {
                        src: material.templating.cover.props.src,
                        alt: material.templating.cover.props.alt,
                        loading: 'lazy',
                        className: 'aspect-ratio--object br2 br--top z-1',
                      })}
                    </div>

                    <div className='absolute top-2 left-0 w-100'>
                      <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                        {React.createElement('img', {
                          src: material.managingState.cover.props.src,
                          alt: material.managingState.cover.props.alt,
                          loading: 'lazy',
                          className: 'aspect-ratio--object br2 br--top z-1',
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li className='br2 br--right br--top mt0 order-last w-third'>
              <ul className='list pl0 ph1 ph3-ns'>
                <li className='mv3 bg-evian br2 ph3 pv2'>
                  <p className='f6 ly-solid navy b mv1'>Lunch break</p>
                </li>
                <li className='mv3 br2 ph3 pt2 pb3'>
                  <p className='f7 gray ttu mv1'>Optional modules</p>
                  <ul className='list pl0 flex flex-wrap'>
                    <li className='w-50'>
                      <div className='mh2 mb2'>
                        <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                          {React.createElement('img', {
                            src: material.serviceMeshes.cover.props.src,
                            alt: material.serviceMeshes.cover.props.alt,
                            loading: 'lazy',
                            className: 'aspect-ratio--object br2 br--top z-1',
                          })}
                        </div>
                      </div>
                    </li>
                    <li className='w-50'>
                      <div className='mh2 mb2'>
                        <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                          {React.createElement('img', {
                            src: material.advancedNetworking.cover.props.src,
                            alt: material.advancedNetworking.cover.props.alt,
                            loading: 'lazy',
                            className: 'aspect-ratio--object br2 br--top z-1',
                          })}
                        </div>
                      </div>
                    </li>
                    <li className='w-50'>
                      <div className='mh2 mb2'>
                        <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                          {React.createElement('img', {
                            src: material.autoscaling.cover.props.src,
                            alt: material.autoscaling.cover.props.alt,
                            loading: 'lazy',
                            className: 'aspect-ratio--object br2 br--top z-1',
                          })}
                        </div>
                      </div>
                    </li>
                    <li className='w-50'>
                      <div className='mh2 mb2'>
                        <div className='aspect-ratio aspect-ratio--7x5 relative shadow-4 br2'>
                          {React.createElement('img', {
                            src: material.ckad.cover.props.src,
                            alt: material.ckad.cover.props.alt,
                            loading: 'lazy',
                            className: 'aspect-ratio--object br2 br--top z-1',
                          })}
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>

          <p className='lh-copy f4 black-80 measure center tc ph3 mt4'>
            You can also book a private session for your team with a fully customisable schedule.{' '}
            <a href={mailto(privateGroupEnquiry)} className='link navy undderline'>
              Get in touch to discuss your options
            </a>
            .
          </p>
        </Section>

        <Section className='bg-evian'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>What's included?</p>
            <ul className='pl0 list f4 measure center pt4 pb4-ns'>
              <ListItem className='b'>
                Lifetime access to the{' '}
                <a href='/academy' className='navy link underline'>
                  Learnk8s Academy
                </a>{' '}
                — the online Kubernetes courses (worth{' '}
                <span data-price='all'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    currencyDisplay: 'code',
                  }).format(499)}
                </span>
                )
              </ListItem>
              <ListItem>All the slides from the events</ListItem>
              <ListItem>Transcript of the chat room </ListItem>
              <ListItem>Lifetime access to the private Slack channel where you can ask for help</ListItem>
            </ul>
          </div>
        </Section>

        <Section className='mt4-ns pt5 pb4'>
          <div className='mw7 center relative bg-evian ph3 ph4-l pt3 pb4'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Join the next online class</p>
            <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>
              Online public classes are great to get started with Kubernetes from the comfort of your home.
            </p>
            <ul className='list pl0'>
              {courses
                .slice(0)
                .sort((a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf())
                .map((it, i) => (
                  <CourseRow
                    timezone={it.timezone}
                    startsAt={it.startsAt}
                    title={it.title}
                    duration={'Full time (6 hours per day), 3 days'}
                    id={`event${i}`}
                    isLive={i === 0}
                    submitUrl={'https://academy.learnk8s.io/checkout?product%5B%5D=online-course'}
                  />
                ))}
            </ul>
          </div>
        </Section>

        <Section className='bg-evian mt3 mt5-ns'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Training your team?</p>
            <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>Design your own private session:</p>
            <ul className='pl0 list f4 measure center'>
              <ListItem>
                <span className='b'>Customise the agenda in full</span> and select the modules relevant to you
              </ListItem>
              <ListItem>
                Increase the session length <span className='b'>up to five full-time days</span>
              </ListItem>
              <ListItem>
                Include <span className='b'>ad-hoc consulting sessions</span> to address your cluster configuration
              </ListItem>
              <ListItem>
                Add <span className='b'>ad-hoc modules</span> developed to help you deliver your cluster to production
              </ListItem>
            </ul>
          </div>
          <p className='tc pb4-ns'>
            <a href={mailto(privateGroupEnquiry)} className='link dib white bg-sky br1 pa3 b f5 mv3'>
              Get in touch →
            </a>
          </p>
        </Section>

        <Section className='mb4'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Who are the instructors?</p>
            <ul className='list pl0 flex flex-wrap justify-center pt3'>
              {instructors.map((instructor, i) => {
                return (
                  <li className='w-50 w-third-ns mv3' key={i}>
                    <div className='w4 center'>
                      <div className='aspect-ratio aspect-ratio--1x1'>
                        {{
                          ...instructor.avatar,
                          props: {
                            ...instructor.avatar.props,
                            className: 'aspect-ratio--object br-100',
                            loading: 'lazy',
                          },
                        }}
                      </div>
                    </div>
                    <p className='f4 navy mb1 tc'>
                      <a href={instructor.link} ref='noreferrer' className='navy link'>
                        {instructor.fullName}
                      </a>
                    </p>
                  </li>
                )
              })}
            </ul>
            <p className='lh-copy f4 black-80 measure center tc ph3 mt4'>
              You can chat with us on the{' '}
              <a href='https://t.me/learnk8s' className='link navy underline' ref='noreferrer'>
                Learnk8s' Telegram Group
              </a>
              !
            </p>
          </div>
        </Section>

        <Section className='bg-evian'>
          <FAQs faqs={faqs} />
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
        var elements = [].slice.call(document.querySelectorAll("[data-price='" + key + "']"))
        if (Array.isArray(elements) && elements.length > 0) {
          var price = resp[key]
          for (var j = 0, len = elements.length; j < len; j++) {
            var element = elements[j]
            element.innerHTML = new Intl.NumberFormat('en-' + price.country, {
              style: 'currency',
              currency: price.currency,
              currencyDisplay: 'code',
            }).format(price.gross)
          }
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
      </Body>
    </Html>
  )
}

const CourseRow: React.StatelessComponent<{
  timezone: string
  startsAt: string
  title: string
  id: string
  duration: string
  submitUrl: string
  isLive: boolean
}> = ({ timezone, startsAt, title, id, duration, submitUrl, isLive }) => {
  return (
    <li className='' key={id}>
      <div className='mv3 flex items-start'>
        <div className='flex-shrink-0 bg-navy w3 h3 white tc b br2 br--left'>
          <p className='f2 ma0'>{format(new Date(startsAt), 'd')}</p>
          <p className='ttu ma0'>{format(new Date(startsAt), 'MMM')}</p>
        </div>

        <div className='pl2 pl3-m pl4-l pr5 flex-auto relative bg-white br2 br--right'>
          <input type='checkbox' id={id} className='o-0 absolute top-0 right-0' />
          <label className='h3 f5 f3-l f4-m ma0 dtc v-mid lh-solid b pointer' htmlFor={id}>
            {title}
          </label>
          <div className='dn checked-reveal bg-white flex-grow-1 w-100'>
            <ul className='list pl0'>
              <li className='mv3'>
                <span className='ttu b black-20 f6'>Duration:</span> <span className='f5 black-70 dib'>{duration}</span>
              </li>
              <li className='mv3'>
                <span className='ttu b black-20 f6'>Starts at:</span>{' '}
                <span className='f5 black-70 dib'>{format(new Date(startsAt), 'h:mm aaaa')}</span>
              </li>
              <li className='mv3'>
                <span className='ttu b black-20 f6'>Time zone:</span>{' '}
                <span className='f5 black-70 dib'>{timezone}</span>
              </li>
            </ul>

            <p className='ttu black-60 f6 mb0'>Price</p>
            <p className='ma0 mt1 mb3 f4 black-70 tracked-tight b' data-price='online-course'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'code',
              }).format(2249)}
            </p>

            {isLive ? (
              <a href={submitUrl} className='link dib white bg-sky br1 pa3 b f5 mv3'>
                Book a ticket →
              </a>
            ) : (
              <Form id={`waiting list: ${title}`}></Form>
            )}
            <p className='lh-copy gray f6'>
              Questions?{' '}
              <a
                href={mailto(moreInfo(format(new Date(startsAt), "do 'of' LLLL")))}
                className='underline gray link hover-navy'
              >
                Get in touch.
              </a>
            </p>
          </div>

          <label
            htmlFor={id}
            className='dn checked-reveal bg-evian gray f4 tc lh-copy bn br-100 w2 h2 v-mid pointer absolute top-1 right-1 z-2'
          >
            ✕
          </label>
          <label
            htmlFor={id}
            className='bg-light-gray sky f4 tc lh-copy bn br-100 w2 h2 v-mid pointer absolute top-1 right-1 z-1'
          >
            ↓
          </label>
        </div>
      </div>
    </li>
  )
}

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f3-l f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const ListItemX: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/x.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f3-l f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const Module: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element
  className?: string
  id: string
}> = ({ children, title, description, preview, className, id }) => {
  return (
    <div className={`bg-white ${className || ''}`}>
      <div className='flex items-start pa4 flex-column flex-row-l'>
        <div className='flex-auto-ns relative mr4-l order-1 order-0-l center'>
          <input type='checkbox' id={id} className='o-0 absolute top-2 left-0' />
          <p className='f3 navy b bb b--black-20 pb3 mv0 dib'>{title}</p>
          <p className='f5 lh-copy measure-wide'>{description}</p>
          <div className='dn checked-reveal'>
            <label
              htmlFor={id}
              className='dib ba b--light-gray gray pv2 ph3 b f5 br2 bg-light-gray hover-bg-moon-gray hover-dark-gray pointer'
            >
              Hide details
            </label>
          </div>
          <div className='checked-hide'>
            <label htmlFor={id} className='dib ba b--sky sky pv2 ph3 b f5 br2 hover-bg-evian pointer bg-white'>
              View details
            </label>
          </div>
          <div className='dn checked-reveal'>{children}</div>
        </div>
        <div className='w5 order-0 center pb4 order-1-l'>
          <div className='aspect-ratio aspect-ratio--7x5 shadow-4'>
            {React.createElement('img', {
              src: preview.props.src,
              alt: preview.props.alt,
              loading: 'lazy',
              className: 'aspect-ratio--object',
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const Form: React.StatelessComponent<{ id: string; className?: string }> = ({ children, className, id }) => {
  return (
    <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST' className='relative'>
      <ol className='list pl0'>
        <li>
          <input type='hidden' name='u' defaultValue='2f82ec7d5caaa9ced71141211' />
        </li>
        <li>
          <input type='hidden' name='id' defaultValue='8ecff1a8cf' />
        </li>
        <li className='mt4'>
          <label htmlFor='MERGE0' className='db tl pb3 black-80'>
            Leave your email address here to be notified:
          </label>
          <input
            className='pa3 br3 input-reset ba b--none bg-near-white w-100 measure-narrow'
            type='email'
            required={true}
            name='MERGE0'
            id='MERGE0'
            placeholder='Your email address'
          />
        </li>
        <li>
          <input className='pa3 w-100 br3 input-reset b--none' type='hidden' name='SOURCE' id='SOURCE' value={id} />
        </li>
      </ol>
      <button className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none' type='submit'>
        Join the waiting list ⇢
      </button>
    </form>
  )
}
