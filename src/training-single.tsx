import React from 'react'
import { Navbar, Consultation, Footer, mailto, MailTo, FAQs, FAQ, Html, Head, OpenGraph, Body } from './layout.v3'
import { PrimaryButton } from './homepage'
import {
  Course,
  CourseInstance,
  Boolean,
  EventAttendanceModeEnumeration,
  ItemAvailability,
  EventStatusType,
} from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { material } from './material'
import { Store } from 'redux'
import {
  State,
  Actions,
  Action,
  getPages,
  getOpenGraph,
  getWorkshops,
  getConfig,
  getOnlineCourses,
  getAuthors,
} from './store'
import { join } from 'path'
import { format, subDays } from 'date-fns'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { Authors } from './aboutUs'

export const faqs: FAQ[] = [
  {
    title: 'Who is this workshop for?',
    content:
      'Intended for Software developers, Architects and Deployment engineers seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerized applications.',
  },
  {
    title: 'Are there any joining instructions?',
    content:
      'You will receive the joining instructions with all the material needed to run the course after you sign up for the course.',
  },
  {
    title: 'What version of Kubernetes was this created for?',
    content: 'The material was authored for Minikube 1.8.x, Kubernetes 1.17, Helm 3',
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and I will refund you.`,
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

const moreInfo = (date: string): MailTo => ({
  subject: 'Online Kubernetes workshop',
  body: `Hi Learnk8s,\n\nI'd like to know ____ about the next online workshop scheduled for the ${date}. Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
})

const publicCourseEnquiry = (date: Date | number, timezone: string, venue: { city: string }): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')} in ${venue.city}.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
})

const publicOnlineCourseEnquiry = (date: Date | number, timezone: string): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held online on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')}.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
})

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const newLocationEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — New location enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know when you plan to visit ________.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const customRequest: MailTo = {
  subject: 'Advanced Kubernetes training — Module enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know if you cover _______ in your course.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const genericRequest: MailTo = {
  subject: 'Kubernetes training — Generic enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know ______.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export const TrainingSingle = {
  id: 'training-single',
  url: '/training-single',
  title: 'Instructor-led Kubernetes Training',
  description:
    'Join an instructor-led, hands-on course and become an expert in deploying and scaling applications with containers and Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(TrainingSingle))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-training-single',
      pageId: TrainingSingle.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      description: TrainingSingle.description,
      title: 'Kubernetes Training Courses',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  try {
    defaultAssetsPipeline({
      jsx: renderPage(state),
      isOptimisedBuild: getConfig(state).isProduction,
      siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
      url: TrainingSingle.url,
      outputFolder: getConfig(state).outputFolder,
    })
  } catch (error) {
    console.log(error)
  }
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === TrainingSingle.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === TrainingSingle.id)
  const courses = getWorkshops(state)
  const onlineCourses = getOnlineCourses(state)
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
  const newCourses = [
    {
      startsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      price: 'USD 2,249.00',
      location: 'London',
      tags: ['country-europe', 'course-in-person'],
      durationInDays: 3,
      hoursPerDay: 6,
      timezone: 'GMT',
      link: '#',
    },
    {
      startsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      price: 'USD 2,249.00',
      location: 'San Francisco',
      tags: ['country-na', 'course-in-person'],
      durationInDays: 3,
      hoursPerDay: 6,
      timezone: 'PDT',
      link: '#',
    },
    {
      startsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      price: 'USD 2,249.00',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      durationInDays: 3,
      hoursPerDay: 6,
      timezone: 'PDT',
      link: '#',
    },
  ]
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
                    duration: course.duration,
                    inLanguage: course.language,
                    startDate: course.startsAt,
                    endDate: course.endsAt,
                    location: {
                      '@type': 'Place',
                      name: course.venue.locationName,
                      address: `${course.venue.city}, ${course.venue.country}`,
                    },
                    isAccessibleForFree: Boolean.False,
                    offers: {
                      '@type': 'Offer',
                      availability: ItemAvailability.InStock,
                      price: course.price.price,
                      priceCurrency: course.price.currency,
                      url: currentAbsoluteUrl,
                      validFrom: subDays(new Date(course.startsAt), 90).toISOString(),
                    },
                    image: `${course.picture.src}`,
                    performer: {
                      '@type': 'Organization',
                      name: 'Learnk8s',
                    },
                    eventStatus: EventStatusType.EventPostponed,
                    eventAttendanceMode: EventAttendanceModeEnumeration.OfflineEventAttendanceMode,
                  } as CourseInstance,
                ],
              }}
            />
          )
        })}
        {onlineCourses.map((course, index) => {
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
                      price: course.defaultPrice.gross,
                      priceCurrency: course.defaultPrice.currency,
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

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt5'>
          <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Join the next Advanced Kubernetes course in London</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>What you need to know:</p>

          <ul className='pl0 list f3 mw6 center'>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>When:</p>
              <p className='mv0 w-70'>27th of April 2020 (in 4 days)</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Starts at:</p>
              <p className='mv0 w-70'>9 am CET</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Where:</p>
              <p className='mv0 w-70'>Online</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Duration:</p>
              <p className='mv0 w-70'>3 days / 6 hours per day</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Price:</p>
              <p className='mv0 w-70'>USD 2,500.00</p>
            </li>
          </ul>

          <div className='tc'>
            <a href='#start' className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none ttu'>
              Book a ticket now
            </a>
          </div>

          <div className='tc'>
            <p className='lh-solid'>
              Have questions?{' '}
              <a href='mailto:' className='link navy underline'>
                Speak to an instructor.
              </a>
            </p>
          </div>
        </section>

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy tc'>How does it work?</h2>
            <p className='measure f3-l f4 lh-copy center'>
              This is a <span className='b'>full time, 3 days course</span> on learning and mastering Kubernetes.
            </p>
            <p className='measure f3-l f4 lh-copy center'>Things you need to know about the course:</p>
            <ul className='list pl0 ph2-ns'>
              <ListItem>
                This is a <span className='b'>real event held in London.</span>
              </ListItem>
              <ListItem>
                You will get your hands dirty: the split is <span className='b'>40% lecture and 60% hands-on labs</span>
                .
              </ListItem>
              <ListItem>
                You will have the chance to <span className='b'>ask questions and discuss with the instructor.</span>
              </ListItem>
              <ListItem>
                You will learn from expert instructors (you can find us on the{' '}
                <a href='https://t.me/learnk8s' className='link navy underline' ref='noreferrer'>
                  Learnk8s Telegram group
                </a>
                ).
              </ListItem>
              <ListItem>
                You will have <span className='b'>access to all the material after the course.</span> That's the{' '}
                <a href='/academy' className='link navy underline'>
                  full Learnk8s Academy (12 courses)
                </a>
              </ListItem>
              <ListItem>
                It's <span className='b'>beginner friendly</span>, but you will learn some pretty advanced topics during
                day 3.
              </ListItem>
            </ul>
            <p className='measure f3-l f4 lh-copy center'>This course is not:</p>
            <ul className='list pl0 ph2-ns'>
              <ListItemX>
                <span className='b'>Not Death by PowerPoint</span>. There are slides, but most of the content is
                hands-on labs.
              </ListItemX>
            </ul>
          </div>
        </Section>

        <Section className='bg-evian'>
          <h2 className='f1-l f2 navy tc'>What does it cover?</h2>
          <p className='lh-copy f4 black-70 measure center tc ph3 mb4'>
            A typical agenda for the 3 days is as follows:
          </p>

          <div className='mw8 center'>
            <ol className='list pl0 f4 measure-wide center'>
              <li>
                <p className='f2-l f3 navy b'>Day 1</p>
                <ol className='list pl0'>
                  <DrillDown
                    title={`1. ${material.docker.name}`}
                    subtitle='Lecture + hands-on labs + challenges'
                    topics={Object.values(material.docker.topics)}
                    description={material.docker.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`2. ${material.kubernetesFundamentals.name}`}
                    subtitle='Lecture + hands-on labs + challenges'
                    topics={Object.values(material.kubernetesFundamentals.topics)}
                    description={material.kubernetesFundamentals.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`3. ${material.deploymentStrategies.name}`}
                    subtitle='Lecture + hands-on labs + challenges'
                    topics={Object.values(material.deploymentStrategies.topics)}
                    description={material.deploymentStrategies.description}
                    className='mv4'
                  ></DrillDown>
                </ol>
              </li>
              <li>
                <p className='f2-l f3 navy b'>Day 2</p>
                <ol className='list pl0'>
                  <DrillDown
                    title={`1. ${material.architecture.name}`}
                    subtitle='Lecture + hands-on labs'
                    topics={Object.values(material.architecture.topics)}
                    description={material.architecture.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`2. ${material.networking.name}`}
                    subtitle='Lecture + hands-on labs'
                    topics={Object.values(material.networking.topics)}
                    description={material.networking.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`3. ${material.advancedNetworking.name}`}
                    subtitle='Lecture'
                    topics={Object.values(material.advancedNetworking.topics)}
                    description={material.advancedNetworking.description}
                    className='mv4'
                  ></DrillDown>
                </ol>
              </li>
              <li>
                <p className='f2-l f3 navy b'>Day 3</p>
                <ol className='list pl0'>
                  <DrillDown
                    title={`1. ${material.managingState.name}`}
                    subtitle='Lecture + hands-on labs'
                    topics={Object.values(material.managingState.topics)}
                    description={material.managingState.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`2. ${material.templating.name}`}
                    subtitle='Lecture + hands-on labs'
                    topics={Object.values(material.templating.topics)}
                    description={material.templating.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`3. ${material.autoscaling.name}`}
                    subtitle='Lecture'
                    topics={Object.values(material.autoscaling.topics)}
                    description={material.autoscaling.description}
                    className='mv4'
                  ></DrillDown>
                  <DrillDown
                    title={`4. ${material.security.name}`}
                    subtitle='Lecture'
                    topics={Object.values(material.security.topics)}
                    description={material.security.description}
                    className='mv4'
                  ></DrillDown>
                </ol>
              </li>
            </ol>

            <p className='f2-l f3 navy tc b'>Plus a few more</p>
            <ul className='pl0 f4 measure center'>
              <ListItem>CI/CD</ListItem>
              <ListItem>Service Meshes (and Istio)</ListItem>
              <ListItem>CKA/CKAD exam preparation</ListItem>
              <ListItem>Multi-cloud, multi-data centre deployments</ListItem>
              <ListItem>Advanced Scheduling workloads</ListItem>
              <ListItem>ML/AI with Kubeflow</ListItem>
            </ul>
            <p className='lh-copy f4 black-80 measure center ph3 mt4'>
              During the third day the instructor will ask you to vote for your favourite topics.
            </p>
            <p className='lh-copy f4 black-80 measure center ph3 mt4'>
              You will cover as many modules as possible starting from the most populars.
            </p>
            <p className='lh-copy f4 black-80 measure center ph3 mb3 mb5-ns b'>
              <a href='#' className='link navy underline'>
                In private and corporate training, you can customise the agenda in full.
              </a>
            </p>
          </div>
        </Section>

        <Section className=''>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>What's included?</p>
            <ul className='pl0 list f4 measure center pt4 pb4-ns'>
              <ListItem className='b'>
                <span data-tags='price-all'>
                  Lifetime access to the{' '}
                  <a href='/academy' className='navy link underline'>
                    Learnk8s Academy
                  </a>{' '}
                  — the online Kubernetes courses (worth{' '}
                  <span className='js-price'>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'code',
                    }).format(499)}
                  </span>
                  ).
                </span>
              </ListItem>
              <ListItem>All the slides from the events.</ListItem>
              <ListItem>A virtual workstation in the cloud for the duration of the course.</ListItem>
              <ListItem>Lifetime access to the private Slack channel where you can always ask for help.</ListItem>
              <ListItem>A certificate of completion signed by the instructor.</ListItem>
            </ul>
          </div>
        </Section>

        <Section className='bg-evian'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>What are the prerequisites?</p>
            <ul className='pl0 list f4 measure center pt4 pb4-ns'>
              <ListItem className=''>Knowledge of basic Linux command and navigation.</ListItem>
              <ListItem>Familiarity with Linux networking.</ListItem>
              <ListItem>Some experience with reverse proxies such as Nginx or HAProxy.</ListItem>
              <ListItem>Exposure to Virtual Machines.</ListItem>
              <ListItem className='b'>A laptop with 8GB of memory and 20GB of space available.</ListItem>
              <ListItem>
                <span className='b'>Windows 10 Pro,</span> macOS, Ubuntu (or your favourite Linux distribution).
              </ListItem>
            </ul>
          </div>
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
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>What happens after I buy the ticket?</p>
            <ul className='pl0 list f4 measure center pt4 pb4-ns'>
              <ListItem className=''>An instructor will get in touch with you.</ListItem>
              <ListItem>You will receive a list of tools that you should install ahead of the event.</ListItem>
              <ListItem>We will collect your dietary requirements (if any).</ListItem>
              <ListItem>
                You will be granted access to the{' '}
                <a href='/academy' className='navy link underline'>
                  Learnk8s Academy
                </a>
                .
              </ListItem>
              <ListItem>We will keep you informed (and send gentle reminders) until the day of the event.</ListItem>
            </ul>
          </div>
        </Section>

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt5'>
          <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Join the next Advanced Kubernetes course in London</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>What you need to know:</p>

          <ul className='pl0 list f3 mw6 center'>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>When:</p>
              <p className='mv0 w-70'>27th of April 2020 (in 4 days)</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Starts at:</p>
              <p className='mv0 w-70'>9 am CET</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Where:</p>
              <p className='mv0 w-70'>Online</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Duration:</p>
              <p className='mv0 w-70'>3 days / 6 hours per day</p>
            </li>
            <li className='mv3 flex items-center'>
              <p className='b w-30 mv0'>Price:</p>
              <p className='mv0 w-70'>USD 2,500.00</p>
            </li>
          </ul>

          <div className='tc'>
            <a href='#start' className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none ttu'>
              Book a ticket now
            </a>
          </div>

          <div className='tc'>
            <p className='lh-solid'>
              Have questions?{' '}
              <a href='mailto:' className='link navy underline'>
                Speak to an instructor.
              </a>
            </p>
          </div>
        </section>


        <Section className=''>
          <div className='f3 measure center tc'>
            <h2 className='f1-l f2 navy navy'>The Learnk8s Academy Guarantee: Our promise to you</h2>
          </div>
          <div className='mw7 center'>
            <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
              We care more about our students' success than taking their money.
            </p>
            <p className='lh-copy f3-l f4 black-70 mt1'>
              If you follow the lectures and practise the material and still DO NOT feel like you are making progress 30
              days after you begin doing the work, we will try to work with you to identify what's missing. And if that
              doesn't work, we'll give you a full refund.
            </p>
            <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
              We're honest to the end about the level of effort, skills, and other ingredients required.
            </p>
            <p className='lh-copy f3-l f4 black-70 mt1'>
              This is not a <span className='i'>watch someone else deploying containers in Kubernetes</span> video
              course. Completing the Learnk8s Academy's modules takes time and effort…{' '}
              <span className='b'>but it does work.</span> The learning curve is steep; then, the plateau of usefulness
              is very long and smooth. It's a great feeling operating Kubernetes after you've mastered it.
            </p>
          </div>
        </Section>

        <Section className='bg-evian'>
          <FAQs faqs={faqs} />
        </Section>

        <Footer />
        <script dangerouslySetInnerHTML={{ __html: `(${FetchPrice.toString()})()` }} />
      </Body>
    </Html>
  )
}

function FetchPrice() {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://academy.learnk8s.io/api/v1/prices', true)

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      try {
        const resp = JSON.parse(this.response)
        const keys = Object.keys(resp)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const elements = [].slice.call(document.querySelectorAll(`[data-tags*="price-${key}"]`)) as HTMLElement[]
          if (elements.length > 0) {
            const price = resp[key]
            for (let j = 0, len = elements.length; j < len; j++) {
              const element = elements[j]
              const priceElement = element.querySelector('.js-price')
              if (priceElement) {
                priceElement.innerHTML = price.priceAsString
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
    }
  }

  request.onerror = function() {}

  request.send()
}

export const CourseRowOld: React.StatelessComponent<{
  event: {
    timezone: string
    startsAt: string
    location: { address?: string; city: string; country: string }
    details: { title: string }
    offer: { price: number; locale: string; currency: string }
  }
}> = ({ event }) => {
  const id = `e-${event.startsAt}-${event.location.address || ''}-${event.location.city}`
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
  return (
    <li className={`${event.timezone}`.split('/')[0].toLowerCase()} key={id}>
      <div className='mv3 flex-ns items-start pb3 pb0-l module'>
        <div className='date bg-sky w3 h3 white tc b'>
          <p className='f2 ma0'>{format(new Date(event.startsAt), 'd')}</p>
          <p className='ttu ma0'>{format(new Date(event.startsAt), 'MMM')}</p>
        </div>
        <div className='bg-evian ph4 pt2 flex-auto relative'>
          <h3 className='f3 ma0 mt3 mb2'>
            {event.details.title} — {event.location.city}
          </h3>
          <h4 className='normal black-70 mt1 mb4'>3 days course</h4>
          <div className={`controls controls-${id} absolute top-1 right-1`}>
            <button
              className='open bg-sky pa2 white f7 tc lh-solid bn br1'
              data-toggle={`.details-${id},.controls-${id}`}
              data-toggle-collapsed
            >
              ▼
            </button>
            <button
              className='close bg-sky pa2 white f7 tc lh-solid bn br1'
              data-toggle={`.details-${id},.controls-${id}`}
            >
              ▲
            </button>
          </div>
          <div className={`details details-${id}`}>
            <p className='ma0 mv3'>
              <span className='ttu b black-20 f6 v-mid'>Location:</span> <span />
              &nbsp;
              <span className='link dib navy underline v-mid'>
                {event.location.city}, {event.location.country}
              </span>
            </p>
            <p className='ma0 mv3'>
              <span className='ttu b black-20 f6'>Starts at:</span>{' '}
              <span className='f5 black-70 dib'>{format(new Date(event.startsAt), 'h:mm aaaa')}</span>
            </p>
            <p className='ma0 mv3'>
              <span className='ttu b black-20 f6'>Price:</span>{' '}
              <span className='f4 black-70 dib'>
                {new Intl.NumberFormat(event.offer.locale, {
                  style: 'currency',
                  currency: event.offer.currency,
                  currencyDisplay: 'code',
                }).format(event.offer.price)}{' '}
              </span>
            </p>
            <p>
              <PrimaryButton
                text='Get in touch &#8594;'
                mailto={mailto(publicCourseEnquiry(new Date(event.startsAt), event.timezone, event.location))}
              />
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export const PackageFeatures: React.StatelessComponent<{ description: string; benefits: string[] }> = ({
  benefits,
  description,
  children,
}) => {
  return (
    <div className='content ph4 pb4'>
      <div className='list pl0 black-70'>
        <p className='lh-copy pt3 f4-l measure center'>{description}</p>
        <ul className='list pl0'>
          {benefits.map(benefit => (
            <ListItem>{benefit}</ListItem>
          ))}
          {children}
        </ul>
      </div>
    </div>
  )
}

export const DashboardModule: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element
  className?: string
}> = ({ children, title, description, preview, className }) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return (
    <div className={`mh3 ${className}`}>
      <div className='module bl bw3 b--sky pt1 pb3 ph4 shadow-2 mv4 bg-white'>
        <p className='f3 navy b bb b--black-20 pb3'>{title}</p>
        <div className=''>
          <div className='w-80 center'>
            <div className='aspect-ratio aspect-ratio--4x3'>
              {React.createElement('img', {
                src: preview.props.src,
                alt: preview.props.alt,
                loading: 'lazy',
                className: 'aspect-ratio--object',
              })}
            </div>
          </div>
          <div className=''>
            <p className='f5 lh-copy measure-wide'>{description}</p>
            <div className={`controls controls-${id}`}>
              <button
                className='open dib ba b--sky sky pv2 ph3 b f5 br2 hover-bg-evian pointer bg-white'
                data-toggle={`.details-${id},.controls-${id}`}
                data-toggle-collapsed
              >
                View details
              </button>
              <button
                className='close dib ba b--light-gray gray pv2 ph3 b f5 br2 ml2 bg-light-gray hover-bg-moon-gray hover-dark-gray pointer'
                data-toggle={`.details-${id},.controls-${id}`}
              >
                Hide details
              </button>
            </div>
            <div className={`details details-${id}`}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CourseRow: React.StatelessComponent<{
  startsAt: string
  title: string
  id: string
  tags: string[]
  price: string
  link: string
}> = ({ startsAt, title, id, tags, price, link }) => {
  return (
    <li className='' key={id} data-tags={tags.join(' ')}>
      <div className='mv3 flex items-start'>
        <div className='flex-shrink-0 bg-navy w3 h3 white tc b br2 br--left'>
          <p className='f2 ma0'>{format(new Date(startsAt), 'd')}</p>
          <p className='ttu ma0'>{format(new Date(startsAt), 'MMM')}</p>
        </div>

        <div className='pl2 pl3-m pl4-l pr5 flex-auto relative bg-white br2 br--right'>
          <a href='#' className='link navy pv3 ma0 dtc v-mid lh-solid pointer'>
            <span className='b f5 f4-m f3-l'>{title}</span>
            <span className='db f6 f5-m f4-l pt2'>
              Price: <span className='js-price'>{price}</span>
            </span>
          </a>

          <a
            href={link}
            className='link bg-light-gray sky f4 tc lh-copy bn br-100 w2 h2 v-mid pointer absolute top-1 mt2 right-1 z-1'
          >
            →
          </a>
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
      <div className='v-top pl2 pl3-ns w-90'>
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
      <div className='v-top pl2 pl3-ns w-90'>
        <p className='mv0 f3-l f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const DrillDown: React.StatelessComponent<{
  className?: string
  title: string
  description: string
  topics: string[]
  subtitle: string
}> = ({ children, className, title, subtitle, description, topics }) => {
  return (
    <li className={`relative bg-white br2 pa3 ${className ?? ''}`}>
      <input type='checkbox' id={toId(title)} className='o-0 absolute top-0 right-0' />
      <label htmlFor={toId(title)} className='checked-hide absolute top-2 right-2 moon-gray'>
        <span className='arr-down'></span>
      </label>
      <label htmlFor={toId(title)} className='dn checked-reveal absolute top-2 right-2 moon-gray'>
        <span className='arr-up'></span>
      </label>
      <label className='f3-l f4 b pl0 pl4-ns db mr5' htmlFor={toId(title)}>
        {title}
      </label>
      <p className='pl0 pl4-ns lh-copy mv1 ttu f5 silver mr5'>{subtitle}</p>
      <div className='dn checked-reveal'>
        <div className='pt4 ph1 pb1 ph1 pa4-ns mt3 mb0 bt b--light-gray'>
          <p className='lh-copy f4 black-70 measure mt0'>{description}</p>
          <ol className='pl4'>
            {topics.map((it, i) => {
              return (
                <li key={i}>
                  <p className='f4 lh-copy measure-narrow black-70 mv2'>{it}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </li>
  )
}

function toId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace('_', '-')
}

function FilterTable() {
  const filters = document.querySelector('.js-filters')
  const table = document.querySelector('.js-table')
  if (!filters || !table) {
    return
  }
  filters.addEventListener('click', event => {
    if ((event.target as HTMLHtmlElement).tagName === 'INPUT') {
      filter({
        country: document.querySelector('input[name="country"]:checked')?.id ?? 'country-all',
        courseType: document.querySelector('input[name="course-type"]:checked')?.id ?? 'course-all',
      })
    }
  })

  function filter({ country, courseType }: { country: string; courseType: string }) {
    const rows = [].slice.call(document.querySelectorAll('.js-table tbody tr')) as HTMLTableRowElement[]
    const totalVisibleRows = rows
      .map(row => {
        let isVisible = false
        const tags = row.getAttribute('data-tags')?.split(' ') ?? []
        switch (courseType) {
          case 'course-all':
            isVisible = country === 'country-all' || tags.includes(country) || tags.includes('course-online')
            break
          case 'course-in-person':
            isVisible = tags.includes('course-in-person') && (country === 'country-all' || tags.includes(country))
            break
          case 'course-online':
            isVisible = tags.includes('course-online')
            break
          default:
        }
        if (isVisible) {
          row.classList.add('dt-row-ns', 'db')
          row.classList.remove('dn')
        } else {
          row.classList.remove('dt-row-ns', 'db')
          row.classList.add('dn')
        }
        return (isVisible ? 1 : 0) as number
      })
      .reduce((acc, it) => acc + it, 0)
    if (totalVisibleRows === 0) {
      document.querySelector('.js-empty-results')?.classList.add('db')
    } else {
      document.querySelector('.js-empty-results')?.classList.remove('db')
    }
  }
}
