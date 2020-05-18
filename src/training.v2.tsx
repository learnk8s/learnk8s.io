import React from 'react'
import { Navbar, Footer, mailto, MailTo, FAQs, FAQ, Html, Head, OpenGraph, Body } from './layout.v3'
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
import { State, Actions, Action, getPages, getOpenGraph, getConfig, getAuthors, Selector } from './store'
import { join } from 'path'
import { format, subDays } from 'date-fns'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { Authors } from './aboutUs'

export const faqs: FAQ[] = [
  {
    title: 'What about Covid-19?',
    content:
      'The situation with Covid-19 is evolving rapidly. Please [get in touch to confirm your attendance](mailto:hello@learnk8s.io)).',
  },
  {
    title: 'Who is this workshop for?',
    content:
      'Software developers, Data engineers, Architects and DevOps seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerised applications.',
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

const newLocationEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — New location enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know when you plan to visit ________.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export const Training = {
  id: 'training',
  url: '/training',
  title: 'Instructor-led Kubernetes Training',
  description:
    'Join an instructor-led, hands-on course and become an expert in deploying and scaling applications with containers and Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Training))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-training',
      pageId: Training.id,
      image: <img src='assets/opengraph.v2.png' alt='Learnk8s' />,
      description: Training.description,
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
      url: Training.url,
      outputFolder: getConfig(state).outputFolder,
    })
  } catch (error) {
    console.log(error)
  }
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Training.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Training.id)
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
  const onlineCourses = Selector.onlineCourses.selectAll(state)
  const inPersonCourses = Selector.inPersonCourses.selectAll(state)
  const allCourses = [...onlineCourses, ...inPersonCourses]
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
        {inPersonCourses.map((course, index) => {
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
                    duration: `3 days`,
                    inLanguage: 'English',
                    startDate: course.startsAt,
                    endDate: course.endsAt,
                    location: {
                      '@type': 'Place',
                      name: course.location,
                      address: course.address,
                    },
                    isAccessibleForFree: Boolean.False,
                    offers: {
                      '@type': 'Offer',
                      availability: ItemAvailability.InStock,
                      price: course.price,
                      priceCurrency: course.currency,
                      url: currentAbsoluteUrl,
                      validFrom: subDays(new Date(course.startsAt), 90).toISOString(),
                    },
                    image: `assets/open_graph_preview.png`,
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
                      price: course.price,
                      priceCurrency: course.currency,
                      url: currentAbsoluteUrl,
                      validFrom: subDays(new Date(course.startsAt), 90).toISOString(),
                    },
                    image: `assets/open_graph_preview.png`,
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
            <h1 className='f-subheadline-l f1 b white mv0 lh-solid'>Instructor-led Kubernetes training</h1>
            <div className='f4 measure'>
              <p className='f2-l f3 white bt bw2 pt3 o-90'>
                Master Kubernetes networking, architecture, authentication, scaling, storage{' '}
                <span className='i'>(and more)</span> in excruciating detail.
              </p>
            </div>
          </div>
          <div className='dn db-ns flex-auto-l w4-m mw5-l'>
            <div className='aspect-ratio aspect-ratio--3x4'>
              <img src={'assets/training/in-person3x4.svg'} alt='' className='aspect-ratio--object' />
            </div>
          </div>
        </div>

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt5'>
          <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Join the next class</p>
          <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>
            Join the next public class in your city or from the comfort of your home.
          </p>
          <ul className='list pl0'>
            {allCourses
              .slice(0, 3)
              .sort((a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf())
              .map((it, i) => (
                <CourseRow
                  startsAt={it.startsAt}
                  title={`${it.title} — ${it.location}`}
                  id={`event${i}`}
                  tags={it.tags}
                  price={it.priceAsString}
                  link={it.url}
                />
              ))}
          </ul>
          <div className='tc'>
            <a href='#start' className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'>
              Show all
            </a>
          </div>
        </section>

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy tc'>How does it work?</h2>
            <p className='measure f3-l f4 lh-copy center'>
              This is a <span className='b'>full-time, 3 days course</span> on learning and mastering Kubernetes.
            </p>
            <p className='measure f3-l f4 lh-copy center'>Things you need to know about the course:</p>
            <ul className='list pl0 ph2-ns'>
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
                It's <span className='b'>beginner-friendly</span>, but you will learn some pretty advanced topics during
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
            A typical schedule for the 3 days is as follows:
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
              During the third day, the instructor will ask you to vote for your favourite topics.
            </p>
            <p className='lh-copy f4 black-80 measure center ph3 mt4'>
              You will cover as many modules as possible, starting from the most popular.
            </p>
            <p className='lh-copy f4 black-80 measure center ph3 mb3 mb5-ns b'>
              <a href='/corporate-training' className='link navy underline'>
                In private and corporate training, you can customise the schedule in full.
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

        <section id='start'>
          <div className='mw8 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>When is the next event?</p>

            <div className='js-filters flex-ns justify-center-ns dn'>
              <div className='w-100 mw5 f5 bg-evian ph3 pv2 br2 br--left'>
                <p className='ttu gray f6 lh-solid'>Filter by location:</p>
                <ul className='list pl1'>
                  <li className='mv2'>
                    <input className='' defaultChecked id='country-all' type='radio' name='country' />
                    <label htmlFor='country-all' className='pl2'>
                      All
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='country-na' type='radio' name='country' />
                    <label htmlFor='country-na' className='pl2'>
                      North America
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='country-europe' type='radio' name='country' />
                    <label htmlFor='country-europe' className='pl2'>
                      Europe
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='country-sea' type='radio' name='country' />
                    <label htmlFor='country-sea' className='pl2'>
                      South East Asia
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='country-oceania' type='radio' name='country' />
                    <label htmlFor='country-oceania' className='pl2'>
                      Oceania
                    </label>
                  </li>
                </ul>
              </div>
              <div className='w-100 mw5 f5 bg-evian ph3 pv2 br2 br--right'>
                <p className='ttu gray f6 lh-solid'>Filter by course type:</p>
                <ul className='list pl1'>
                  <li className='mv2'>
                    <input className='' defaultChecked id='course-all' type='radio' name='course-type' />
                    <label htmlFor='course-all' className='pl2'>
                      All
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='course-in-person' type='radio' name='course-type' />
                    <label htmlFor='course-in-person' className='pl2'>
                      In-person
                    </label>
                  </li>
                  <li className='mv2'>
                    <input className='' id='course-online' type='radio' name='course-type' />
                    <label htmlFor='course-online' className='pl2'>
                      Online
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className='ph3'>
              <table className='js-table w-100 collapse mt4'>
                <thead>
                  <tr className='dn dt-row-ns'>
                    <th className='tc pv3'>Date</th>
                    <th className='tc pv3'>Location</th>
                    <th className='tc pv3'>Course</th>
                    <th className='tc pv3 dn-m'>Duration</th>
                    <th className='tc pv3 dn-m'>Time Zone</th>
                    <th className='tc pv3'>Price</th>
                  </tr>
                </thead>
                <tbody className='results black-70'>
                  {allCourses
                    .slice(0)
                    .sort((a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf())
                    .map((event, i) => {
                      return (
                        <tr
                          key={i}
                          className={`db dt-row-ns relative static-ns ${
                            i % 2 === 0 ? 'bg-evian' : ''
                          } hover-bg-washed-yellow f5-m f4 ph3 pt3 mv3 pa0-ns ma0-ns`}
                          data-tags={event.tags.join(' ')}
                        >
                          <td className='absolute static-ns top-0 right-0 dtc-ns'>
                            <div className='date bg-navy w3 h3 white tc'>
                              <p className='f2 ma0 b'>{format(new Date(event.startsAt), 'd')}</p>
                              <p className='ttu ma0'>{format(new Date(event.startsAt), 'MMM')}</p>
                            </div>
                          </td>
                          <td className='tc-ns db dtc-ns table-label mr5 mr0-ns' data-label='Location'>
                            {event.location}
                          </td>
                          <td className='tc-ns db dtc-ns ph1-m ph3-l table-label mr5 mr0-ns' data-label='Course'>
                            {event.title}
                          </td>
                          <td className='tc-ns db dtc-ns table-label mr5 mr0-ns dn-m' data-label='Duration'>
                            3 days
                            <span className='f7 dark-gray dn dib-l'> / 6 hours per day</span>
                          </td>
                          <td className='tc-ns db dtc-ns table-label dn-m' data-label='Timezone'>
                            {event.timezone}
                          </td>
                          <td className='js-price tc-ns db dtc-ns table-label' data-label='Price'>
                            {event.priceAsString}
                          </td>
                          <td className='tc-ns db dtc-ns'>
                            <a
                              href={event.url}
                              className='link dib white bg-navy br1 pv2 ph3 b f6 mv3 submit br2 b--none lh-solid mh1-m mh2-l'
                            >
                              Book&nbsp;⇢
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <div className='js-empty-results dn tc'>
                <p className='tc b bg-navy pa2 dib br2 white'>Oops, we don't run any event with that selection.</p>
              </div>
            </div>
            <script dangerouslySetInnerHTML={{ __html: `(${FilterTable.toString()})()` }}></script>

            <div className='ph3'>
              <p className='f2-l f3 navy b tc mb2 pt4-ns pt2'>
                What about <span className='i'>other locations</span>?
              </p>
              <p className='lh-copy f4 black-70 measure center tc'>
                Learnk8s runs in-person workshops in Europe, North America, South East Asia and Australia. If you have a
                suggestion for a new location, drop us a line at{' '}
                <a className='link underline navy' href={mailto(newLocationEnquiry)}>
                  hello@learnk8s.io
                </a>{' '}
                and will make it happen.
              </p>
            </div>
          </div>
        </section>

        <Section className='bg-evian mt3 mt5-ns'>
          <div className='mw7 center'>
            <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Training your team?</p>
            <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>Design your private session:</p>
            <ul className='pl0 list f4 measure center'>
              <ListItem>
                <span className='b'>Customise the schedule in full</span> and select the modules relevant to you
              </ListItem>
              <ListItem>
                Increase the session length <span className='b'>up to five full-time days</span>
              </ListItem>
              <ListItem>
                Include <span className='b'>ad-hoc consulting sessions</span> to address your cluster configuration
              </ListItem>
              <ListItem>
                Add <span className='b'>ad-hoc modules</span> developed to help you deliver your cluster to production.
              </ListItem>
            </ul>
          </div>
          <p className='tc pb4-ns'>
            <a href='/corporate-training' className='link dib white bg-navy br1 pa3 b f5 mv3'>
              Learn more →
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
