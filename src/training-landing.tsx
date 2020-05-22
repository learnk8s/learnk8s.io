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
import { getConfig, Store, Action, Selector, State } from './store'
import { join } from 'path'
import { format, subDays } from 'date-fns'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { Authors } from './aboutUs'
import { CourseInPerson, CourseOnline } from './store/coursesReducer'
import { Author } from './store/websiteReducer'

export const faqs: FAQ[] = [
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
    content: 'The material was authored for Minikube 1.9.x, Kubernetes 1.18, Helm 3',
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

const publicCourseEnquiryInPerson = (date: Date | number, location: string): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')} in ${location}.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
})

const publicCourseEnquiryOnline = (date: Date | number): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')} online.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
})

const publicOnlineCourseEnquiry = (date: Date | number): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held online on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')}.\n\nI'd like to buy a ticket, what are the next steps?\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
})

export function Register(store: Store) {
  const state = store.getState()
  const onlineCourses = Selector.onlineCourses.selectAll(state)
  const inPersonCourses = Selector.inPersonCourses.selectAll(state)
  onlineCourses.forEach(course => {
    const title = `${course.title} — ${course.location}`
    const description = `Join the ${format(
      new Date(course.startsAt),
      'MMMM yyyy',
    )} online Kubernetes course and become an expert in deploying and scaling applications with Kubernetes.`
    store.dispatch(
      Action.pages.add({
        id: `page-${course.id}`,
        url: course.url,
        title,
        description,
      }),
    )
    store.dispatch(
      Action.openGraphs.add({
        id: `og-${course.id}`,
        pageId: `page-${course.id}`,
        imagePath: 'assets/open_graph_preview.png',
        description,
        title,
      }),
    )
  })
  inPersonCourses.forEach(course => {
    const title = `${course.title} — ${course.location}`
    const description = `Join the ${format(new Date(course.startsAt), 'MMMM yyyy')} Kubernetes course in ${
      course.location
    } and become an expert in deploying and scaling applications with Kubernetes.`
    store.dispatch(
      Action.pages.add({
        id: `page-${course.id}`,
        url: course.url,
        title,
        description,
      }),
    )
    store.dispatch(
      Action.openGraphs.add({
        id: `og-${course.id}`,
        pageId: `page-${course.id}`,
        imagePath: 'assets/opengraph.v2.png',
        description,
        title,
      }),
    )
  })
}

export function Mount({ store }: { store: Store }) {
  const state = store.getState()
  const inPersonCourses = Selector.inPersonCourses.selectAll(state)
  const onlineCourses = Selector.onlineCourses.selectAll(state)
  inPersonCourses.forEach(course => {
    try {
      defaultAssetsPipeline({
        jsx: renderInPersonCoursePage(course, state),
        isOptimisedBuild: getConfig(state).isProduction,
        siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
        url: course.url,
        outputFolder: getConfig(state).outputFolder,
      })
    } catch (error) {
      console.log(error)
    }
  })
  onlineCourses.forEach(course => {
    try {
      defaultAssetsPipeline({
        jsx: renderOnlineCoursePage(course, state),
        isOptimisedBuild: getConfig(state).isProduction,
        siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
        url: course.url,
        outputFolder: getConfig(state).outputFolder,
      })
    } catch (error) {
      console.log(error)
    }
  })
}

function renderInPersonCoursePage(course: CourseInPerson, state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === `page-${course.id}`)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === `page-${course.id}`)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  const instructors = Selector.authors
    .selectAll(state)
    .filter(it =>
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
            image={openGraph.imagePath}
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
                eventStatus: EventStatusType.EventScheduled,
                eventAttendanceMode: EventAttendanceModeEnumeration.OfflineEventAttendanceMode,
              } as CourseInstance,
            ],
          }}
        />
      </Head>
      <Body>
        <Navbar />

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt0 mt5-ns'>
          <CTAInPerson course={course}></CTAInPerson>
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
                This is a <span className='b'>real event held in {course.location}.</span>
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
          <Agenda></Agenda>
        </Section>

        <Section className=''>
          <Included></Included>
        </Section>

        <Section className='bg-evian'>
          <Prerequisites></Prerequisites>
        </Section>

        <Section className='mb4'>
          <Instructors instructors={instructors}></Instructors>
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
          <CTAInPerson course={course}></CTAInPerson>
        </section>

        <section className='mb5 mt5 mt3-m mt0-l'>
          <SecondaryCTA identifier={course.id}></SecondaryCTA>
        </section>

        <Section className='bg-evian'>
          <Guarantee></Guarantee>
        </Section>

        <Section className=''>
          <FAQs faqs={faqs} />
        </Section>

        <Footer />
        <script dangerouslySetInnerHTML={{ __html: `(${FetchPrice.toString()})()` }} />
      </Body>
    </Html>
  )
}

function renderOnlineCoursePage(course: CourseOnline, state: State) {
  const page = Selector.pages.selectAll(state).find(it => it.id === `page-${course.id}`)!
  const openGraph = Selector.openGraphs.selectAll(state).find(it => it.pageId === `page-${course.id}`)
  const currentAbsoluteUrl = `${getConfig(state).protocol}://${join(getConfig(state).hostname, page.url)}`
  const instructors = Selector.authors
    .selectAll(state)
    .filter(it =>
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
            image={openGraph.imagePath}
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
      </Head>
      <Body>
        <Navbar />

        <section className='mw7 ph3 ph4-l center relative bg-evian pt3 pb4 mt0 mt5-ns'>
          <CTAOnline course={course}></CTAOnline>
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
                This is an <span className='b'>online event.</span>
              </ListItem>
              <ListItem>
                You will get your hands dirty: the split is <span className='b'>40% lecture and 60% hands-on labs</span>
                .
              </ListItem>
              <ListItem>The event is small and cosy, so everyone has a fair chance to participate and engage.</ListItem>
              <ListItem>
                You will have the chance to <span className='b'>ask questions and discuss with the instructor</span>{' '}
                (you can find us on the{' '}
                <a href='https://t.me/learnk8s' className='link navy underline' ref='noreferrer'>
                  Learnk8s Telegram group
                </a>
                ).
              </ListItem>
              <ListItem>The event is streamed using excellent video quality, and we use Slack as chat.</ListItem>
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
              <ListItem>
                There's a clear schedule so that you can take a walk or look after the kids in-between lectures.
              </ListItem>
            </ul>
            <p className='measure f3-l f4 lh-copy center'>This course is not:</p>
            <ul className='list pl0 ph2-ns'>
              <ListItemX>
                <span className='b'>Not a webinar with hundreds of people.</span> There's a 2-way audio (and video)
                stream with the instructor.
              </ListItemX>
              <ListItemX>
                <span className='b'>Not Death by PowerPoint</span>. There are slides, but most of the content is
                hands-on labs.
              </ListItemX>
              <ListItemX>
                <span className='b'>Not passive or less engaging.</span> You will have to answer questions just like in
                a real, in-person workshop.
              </ListItemX>
            </ul>
          </div>
        </Section>

        <Section className='bg-evian'>
          <Agenda></Agenda>
        </Section>

        <Section className=''>
          <Included></Included>
        </Section>

        <Section className='bg-evian'>
          <Prerequisites></Prerequisites>
        </Section>

        <Section className='mb4'>
          <Instructors instructors={instructors}></Instructors>
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
          <CTAOnline course={course}></CTAOnline>
        </section>

        <section className='mb5 mt5 mt3-m mt0-l'>
          <SecondaryCTA identifier={course.id}></SecondaryCTA>
        </section>

        <Section className='bg-evian'>
          <Guarantee></Guarantee>
        </Section>

        <Section className=''>
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

const CTAInPerson: React.StatelessComponent<{
  className?: string
  course: {
    address?: string
    startsAt: string
    timezone: string
    priceAsString: string
    location: string
  }
}> = ({ children, className, course }) => {
  return (
    <>
      <p className='f1-l f2 navy b tc ph3 mb3 mt4 measure-narrow center'>
        Join the next Advanced Kubernetes course in {course.location}
      </p>
      <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>What you need to know:</p>

      <ul className='pl0 list f4 f3-ns mw6 center'>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>When:</p>
          <p className='mv0 w-70'>{format(new Date(course.startsAt), `do 'of' MMMM yyyy`)}</p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Starts at:</p>
          <p className='mv0 w-70'>
            {format(new Date(course.startsAt), 'H:mm a')} {course.timezone}
          </p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Where:</p>
          <p className='mv0 w-70'>{course.address}</p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Duration:</p>
          <p className='mv0 w-70'>3 days / 6 hours per day</p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Price:</p>
          <p className='mv0 w-70'>{course.priceAsString}</p>
        </li>
      </ul>

      <div className='tc'>
        {/* <a href={course.link} className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none ttu'>
              Book a ticket now
            </a> */}
        <a
          href={mailto(publicOnlineCourseEnquiry(new Date(course.startsAt)))}
          className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
        >
          Book a ticket now
        </a>
      </div>

      <div className='tc'>
        <p className='lh-solid'>
          Have questions?{' '}
          <a
            href={mailto(publicCourseEnquiryInPerson(new Date(course.startsAt), course.location))}
            className='link navy underline'
          >
            Speak to an instructor.
          </a>
        </p>
      </div>
    </>
  )
}

const CTAOnline: React.StatelessComponent<{
  className?: string
  course: {
    address?: string
    startsAt: string
    timezone: string
    priceAsString: string
  }
}> = ({ children, className, course }) => {
  return (
    <>
      <p className='f1-l f2 navy b tc ph3 mb3 mt4 measure-narrow center'>Join the online Advanced Kubernetes course</p>
      <p className='lh-copy f4 black-70 measure center tc ph3 pb4 mt0'>What you need to know:</p>

      <ul className='pl0 list f4 f3-ns mw6 center'>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>When:</p>
          <p className='mv0 w-70'>{format(new Date(course.startsAt), `do 'of' MMMM yyyy`)}</p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Starts at:</p>
          <p className='mv0 w-70'>
            {format(new Date(course.startsAt), 'H:mm a')} {course.timezone}
          </p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Where:</p>
          <p className='mv0 w-70'>Online</p>
        </li>
        <li className='mv3 flex items-center'>
          <p className='b w-30 mv0'>Duration:</p>
          <p className='mv0 w-70'>3 days / 6 hours per day</p>
        </li>
        <li className='mv3 flex items-center' data-tags='price-online-course'>
          <p className='b w-30 mv0'>Price:</p>
          <p className='mv0 w-70 js-price'>{course.priceAsString}</p>
        </li>
      </ul>

      <div className='tc'>
        {/* <a href={course.link} className='link dib white bg-sky br1 pa3 b f5 mv3 submit br2 b--none ttu'>
              Book a ticket now
            </a> */}
        <a
          href={mailto(publicOnlineCourseEnquiry(new Date(course.startsAt)))}
          className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
        >
          Book a ticket now
        </a>
      </div>

      <div className='tc'>
        <p className='lh-solid'>
          Have questions?{' '}
          <a href={mailto(publicCourseEnquiryOnline(new Date(course.startsAt)))} className='link navy underline'>
            Speak to an instructor.
          </a>
        </p>
      </div>
    </>
  )
}

const Guarantee: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <>
      <div className='f3 measure center tc'>
        <h2 className='f1-l f2 navy navy'>The Learnk8s Academy Guarantee: Our promise to you</h2>
      </div>
      <div className='mw7 center'>
        <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
          We care more about our students' success than taking their money.
        </p>
        <p className='lh-copy f3-l f4 black-70 mt1'>
          If you follow the lectures and practise the material (without being distracted by your day to day duties) and
          still DO NOT feel like you made any progress, we'll give you a full refund.
        </p>
        <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
          We're honest to the end about the level of effort, skills, and other ingredients required.
        </p>
        <p className='lh-copy f3-l f4 black-70 mt1'>
          This is not a <span className='i'>watch someone else presenting a PowerPoint and become an expert</span> type
          of course. The learning curve is steep; then, the plateau of usefulness is very long and smooth. It's a great
          feeling operating Kubernetes after you've mastered it.
        </p>
      </div>
    </>
  )
}

const Instructors: React.StatelessComponent<{ className?: string; instructors: Author[] }> = ({
  children,
  className,
  instructors,
}) => {
  return (
    <>
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
    </>
  )
}

const Prerequisites: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <>
      <div className='mw7 center'>
        <p className='f1-l f2 navy b tc ph3 mb3 mt4'>What are the prerequisites?</p>
        <ul className='pl0 list f4 measure center pt4 pb4-ns'>
          <ListItem className=''>Knowledge of basic Linux commands and navigation.</ListItem>
          <ListItem>Familiarity with Linux networking.</ListItem>
          <ListItem>Some experience with reverse proxies such as Nginx or HAProxy.</ListItem>
          <ListItem>Exposure to Virtual Machines.</ListItem>
          <ListItem className='b'>A laptop with 8GB of memory and 20GB of space available.</ListItem>
          <ListItem>
            <span className='b'>Windows 10 Pro,</span> macOS, Ubuntu (or your favourite Linux distribution).
          </ListItem>
        </ul>
      </div>
    </>
  )
}

const Included: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <>
      {' '}
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
          <ListItem>
            <span className='b'>A certificate of completion</span> signed by the instructor.
          </ListItem>
        </ul>
      </div>
    </>
  )
}

const Agenda: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <>
      <h2 className='f1-l f2 navy tc'>What does it cover?</h2>
      <p className='lh-copy f4 black-70 measure center tc ph3 mb4'>A typical schedule for the 3 days is as follows:</p>

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
    </>
  )
}

const SecondaryCTA: React.StatelessComponent<{ className?: string; identifier: string }> = ({
  children,
  className,
  identifier,
}) => {
  return (
    <>
      <div className='ph3'>
        <p className='f2-l f3 navy b tc mb2 pt4-ns pt2'>Maybe next time?</p>
        <p className='lh-copy f4 black-70 measure center tc'>
          If the date isn't quite right, don't worry. We run workshops regularly.{' '}
          <span className='b'>Join our newsletter</span> and keep up to date with the latest news (and workshop
          announcements) from Learnk8s:
        </p>
        <div className='f4 measure tc center'>
          <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST'>
            <input type='hidden' name='u' value='2f82ec7d5caaa9ced71141211' />
            <input type='hidden' name='id' value='8ecff1a8cf' />
            <input type='hidden' name='orig-lang' value='1' />
            {/* <Honeypot> */}
            <div className='dn' aria-label='Please leave the following three fields empty'>
              <label htmlFor='b_name'>Name: </label>
              <input type='text' name='b_name' tabIndex={-1} defaultValue='' placeholder='Freddie' id='b_comment' />

              <label htmlFor='b_email'>Email: </label>
              <input
                type='email'
                name='b_email'
                tabIndex={-1}
                defaultValue=''
                placeholder='youremail@gmail.com'
                id='b_comment'
              />

              <label htmlFor='b_comment'>Comment: </label>
              <textarea name='b_comment' tabIndex={-1} placeholder='Please comment' id='b_comment' />
            </div>
            {/* </Honeypot> */}

            <div className='mv4'>
              <div className='mv3'>
                <span className='dib bb ml2'>
                  <input
                    className='pa2 input-reset b--none'
                    type='email'
                    autoCapitalize='off'
                    autoCorrect='off'
                    name='MERGE0'
                    id='MERGE0'
                    size={25}
                    defaultValue=''
                    placeholder='Your email address'
                  />
                </span>
              </div>
            </div>

            <div className=''>
              <input
                type='submit'
                defaultValue='Subscribe'
                className='dib white bg-navy br1 pv2 ph3 b f5 bn pointer'
                name='submit'
              />
            </div>
            <input type='hidden' name='MERGE2' id='MERGE2' defaultValue={identifier} />
            <input
              type='hidden'
              name='ht'
              defaultValue='69b0fd8eb9c012c25b28cf22b63612792eb64a30:MTU4OTUyNjkxMC45MDUz'
            />
            <input type='hidden' name='mc_signupsource' defaultValue='hosted' />
          </form>
          <p className='f6 black-60 mt4 mb0 underline'>
            *We'll never share your email address, and you can opt-out at any time.
          </p>
        </div>
      </div>
    </>
  )
}
