import React from 'react'
import {
  Navbar,
  Consultation,
  Footer,
  ListItem,
  Interlude,
  SpecialListItem,
  Testimonal,
  mailto,
  MailTo,
  YourTeam,
  FAQs,
  FAQ,
  PackageList,
  PackageLeft,
  PackageRight,
  Hero,
  Html,
  Head,
  OpenGraph,
  Body,
} from './layout.v3'
import { PrimaryButton } from './homepage'
import { Course, CourseInstance, Boolean, ItemAvailabilityEnum } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { material } from './material'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getWorkshops, getConfig } from './store'
import { join } from 'path'
import { format, subDays } from 'date-fns'
import { defaultAssetsPipeline } from './optimise'
import { transform } from './markdown/utils'
import { toMdast } from './markdown'
import { toVFile } from './files'
import { mdast2JsxInline } from './markdown/jsx'

export const faqs: FAQ[] = [
  {
    title: 'Who is this workshop for?',
    content:
      'Intended for Software developers, Architects and Deployment engineers seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerized applications.',
  },
  {
    title: 'Are there any joining instructions?',
    content:
      'You will receive the joining instructions with all the material needed to run the course after you sign up for a particular course.',
  },
  {
    title: 'What version of Kubernetes was this created for?',
    content: 'The material was authored for Minikube 1.4.0, Kubernetes 1.16, Helm 2.14',
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and I will refund you.`,
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! [Fill out this form](https://docs.google.com/forms/d/e/1FAIpQLSc8dT07y92OHVH4JjkXAoDvB34nR0i-G2CpwkRfiwph77xTDQ/viewform) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any type of schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`,
  },
]

const publicCourseEnquiry = (date: Date | number, timezone: string, venue: { city: string }): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held on the ${format(
    date,
    'do',
  )} of ${format(date, 'LLLL')} in ${venue.city}.\n\nKind regards,\n`,
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

export const Training = {
  id: 'training',
  url: '/training',
  title: 'Kubernetes Training Courses ⎈ Learnk8s',
  description:
    'Join an instructor-led, hands-on course and become an expert in deploying and scaling applications with containers and Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Training))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-training',
      pageId: Training.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      description: Training.description,
      title: 'Kubernetes Training Courses',
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Training.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Training.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Training.id)
  const courses = getWorkshops(state)
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
        <link rel='stylesheet' href='node_modules/tachyons/css/tachyons.css' />
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
              Kubernetes <span className='no-wrap'>instructor-led</span> training
            </h1>
            <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>
              Learn how to deploy and scale applications with Kubernetes.
            </h2>
            <ul className='list w-60-m center-m mw6 bg-white black-70 ph3 pv1 shadow-1 mh3 mh4-ns mt4'>
              <li className='flex items-center justify-between ph2 bb b--light-gray'>
                <p className='ttu'>Private courses</p>
                <div className='w2 h2'>
                  <img src='assets/training/tick.svg' alt='Tick' />
                </div>
              </li>
              <li className='flex items-center justify-between ph2 bb b--light-gray'>
                <p className='ttu'>Public courses</p>
                <div className='w2 h2'>
                  <img src='assets/training/tick.svg' alt='Tick' />
                </div>
              </li>
              <li className='flex items-center justify-between ph2'>
                <p className='ttu v-mid mt2 mb1'>
                  Online courses{' '}
                  <span className='dib w2 v-mid'>
                    <img src='assets/training/slack_in_colours.svg' alt='Slack' />
                  </span>
                </p>
                <div className='w2 h2'>
                  <img src='assets/training/tick.svg' alt='Tick' />
                </div>
              </li>
            </ul>
            <div className='dn db-l mw6 mh3 mh4-ns tc'>
              <div className='w3 h3 dib'>
                <img src='assets/training/down_arrow_white.svg' alt='Down' />
              </div>
            </div>
          </Hero>
        </div>

        <section className='content ph3 ph4-ns flex items-center justify-center pt5-ns relative z3'>
          <div className='w-50-l dn db-l tc'>
            <div className='dib'>
              <div className='i-more-cargo-loading relative'>
                {React.createElement('img', {
                  src: 'assets/training/more_cargo_loading.svg',
                  alt: 'Cargo loading',
                  loading: 'lazy',
                  className: 'absolute top-0 right-0',
                })}
              </div>
            </div>
          </div>

          <div className='w-50-l center pt3'>
            <h2 className='f3 navy f2-l measure-narrow'>Instructor-led, hands-on courses</h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>These courses are great if you wish to:</p>
              <ul className='list black-70 pl0 pt2'>
                <ListItem>
                  <InlineMarkdown
                    content={
                      '**Get started with Kubernetes in your next project** and you need to quickly get up to speed in deploying and scaling your Node.js, Java, .NET, Scala, etc. microservices'
                    }
                  />
                </ListItem>
                <ListItem>
                  <InlineMarkdown
                    content={
                      '**Design and architect micro services on Kubernetes** that leverage the strength of distributed systems'
                    }
                  />
                </ListItem>
                <ListItem>
                  <InlineMarkdown
                    content={
                      '**Design applications that can be deployed on AWS, GCP, Azure, etc.**, without requiring changing any of the application or infrastrucure code'
                    }
                  />
                </ListItem>
                <ListItem>
                  <InlineMarkdown
                    content={'**Autoscale your clusters and applications as your service becomes more popular**'}
                  />
                </ListItem>
                <ListItem>
                  <InlineMarkdown
                    content={
                      '**Standarise your development environments and workflow** and design processes for continuous delivery and intregration with Kubernetes'
                    }
                  />
                </ListItem>
                <ListItem>
                  <InlineMarkdown
                    content={
                      'Become a **Certified Kubernetes Administrator** (CKA) or **Certified Kubernetes Application Developer** (CKAD)'
                    }
                  />
                </ListItem>
              </ul>
            </div>
          </div>
        </section>

        <Interlude />

        <section className='pt5'>
          <PackageList>
            <PackageLeft heading='Advanced Kubernetes Course' subheading='Most popular option — 3 days course'>
              <PackageFeatures
                description='The course lasts three days and you can choose from Kubernetes core modules and a selection of popular optional module. You will learn how to:'
                benefits={[
                  'Package applications in Linux containers',
                  'Deploy containers in Kubernetes',
                  'Zero downtime deployment strategies in Kubernetes',
                  'How to expose services to the public internet',
                  'The Kubernetes architecture and core components',
                  'The Kubernetes networking model',
                  'Autoscaling the cluster and the applications',
                  'Secure your cluster and your network',
                  'Design automated processes to leverage Kubernetes and continuous integration',
                ]}
              />
              <p className='tc pb4'>
                <PrimaryButton text='Learn more ⇢' anchor='#start' />
              </p>
            </PackageLeft>
            <PackageRight heading='Kubernetes Private Training' subheading='Make your own course'>
              <PackageFeatures
                description='The private training course is excellent if you wish to customise your learning path to adopt Kubernetes.'
                benefits={[
                  'Pick the modules relevant to your team',
                  'Deep dive into the content with a three, four or five days course',
                  'Delivered on site, remotely or in a cozy meeting room',
                  'Classes from 5+ delegates',
                ]}
              >
                <SpecialListItem>
                  <span className='b'>Perfect for the Certified Kubernetes Administrator (CKA) exam</span> (exam not
                  included and optional)
                </SpecialListItem>
              </PackageFeatures>
              <p className='tc pb4'>
                <PrimaryButton text='Get in touch ⇢' mailto={mailto(privateGroupEnquiry)} />
              </p>
            </PackageRight>
          </PackageList>
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

        <section id='start' className='w-60-ns ph3 center pt3 pb3 pb5-l'>
          <h2 className='navy f4 f3-l'>Upcoming events</h2>
          <input className='dn' id='all' type='radio' name='country' />
          <input className='dn' id='america' type='radio' name='country' />
          <input className='dn' defaultChecked id='europe' type='radio' name='country' />
          <input className='dn' id='asia' type='radio' name='country' />
          <input className='dn' id='australia' type='radio' name='country' />
          <ul className='legend list pl0 flex'>
            <li className='all dib pa2 navy bb bw1 b--near-white bg-evian br1 br--left'>
              <label htmlFor='all'>All</label>
            </li>
            <li className='america dib pa2 navy bb bl bw1 b--near-white bg-evian'>
              <label htmlFor='america'>North America</label>
            </li>
            <li className='europe dib pa2 navy bb bl bw1 b--near-white bg-evian'>
              <label htmlFor='europe'>Europe</label>
            </li>
            <li className='asia dib pa2 navy bb bl bw1 b--near-white bg-evian'>
              <label htmlFor='asia'>Asia</label>
            </li>
            <li className='australia dib pa2 navy bb bw1 b--near-white bg-evian br1 br--right'>
              <label htmlFor='australia'>Australia & New Zeland</label>
            </li>
          </ul>

          <ul className='events list pl0 pt3'>
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

          <p className='f2 navy b tc mb2 pt4-ns pt2'>Your city is not on the list?</p>
          <p className='lh-copy f4 black-70 measure center tc'>
            Don't worry. We run in-person classrooms in Europe, North America and Asia. If your city is not on the list,
            drop us a line at{' '}
            <a className='link underline' href={mailto(newLocationEnquiry)}>
              hello@learnk8s.io
            </a>{' '}
            and will try to make it happen.
          </p>
        </section>

        <YourTeam mailto={mailto(privateGroupEnquiry)} />

        <FAQs faqs={faqs} />

        <Consultation />
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
      </Body>
    </Html>
  )
}

export const CourseRow: React.StatelessComponent<{
  event: {
    timezone: string
    startAt: string
    location: { address?: string; city: string; country: string }
    details: { title: string }
    offer: { price: number; locale: string; currency: string }
  }
}> = ({ event }) => {
  const id = `e-${event.startAt}-${event.location.address || ''}-${event.location.city}`
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
  return (
    <li className={`${event.timezone}`.split('/')[0].toLowerCase()}>
      <div className='mv3 flex-ns items-start pb3 pb0-l module'>
        <div className='date bg-sky w3 h3 white tc b'>
          <p className='f2 ma0'>{format(new Date(event.startAt), 'd')}</p>
          <p className='ttu ma0'>{format(new Date(event.startAt), 'MMM')}</p>
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
              <span className='f5 black-70 dib'>{format(new Date(event.startAt), 'h:mm aaaa')}</span>
            </p>
            <p className='ma0 mv3'>
              <span className='ttu b black-20 f6'>Price:</span>{' '}
              <span className='f4 black-70 dib'>
                {event.offer.price.toLocaleString(event.offer.locale, {
                  style: 'currency',
                  currency: event.offer.currency,
                })}{' '}
              </span>
            </p>
            <p>
              <PrimaryButton
                text='Get in touch &#8594;'
                mailto={mailto(publicCourseEnquiry(new Date(event.startAt), event.timezone, event.location))}
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
            <div className='padding-hack-75 relative'>
              {React.createElement('img', {
                src: preview.props.src,
                alt: preview.props.alt,
                loading: 'lazy',
                className: 'absolute top-0 right-0',
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

function CreateToggle() {
  function Toggle(element: HTMLElement) {
    const target = element.dataset.toggle
    if (!target) {
      return
    }
    const targetElements = target.split(',').map(selector => document.querySelector(selector))
    if (targetElements.some(it => !it)) {
      return
    }
    if (targetElements[0]!.classList.contains('toggle-collapse')) {
      targetElements.forEach(it => it!.classList.remove('toggle-collapse'))
    } else {
      targetElements.forEach(it => it!.classList.add('toggle-collapse'))
    }
  }

  document.querySelectorAll<HTMLElement>('[data-toggle]').forEach(element => {
    if (element.classList.contains('active')) {
      return
    }
    element.classList.add('active')
    element.addEventListener('click', () => Toggle(element))
    if (!('toggleCollapsed' in element.dataset)) {
      return
    }
    Toggle(element)
  })
}

const InlineMarkdown: React.StatelessComponent<{ content: string }> = ({ content }) => {
  return transform(toMdast(toVFile({ contents: content })), mdast2JsxInline())
}
