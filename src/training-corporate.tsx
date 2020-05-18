import React from 'react'
import { Navbar, Footer, mailto, MailTo, FAQs, FAQ, Html, Head, OpenGraph, Body } from './layout.v3'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { material } from './material'
import { Store } from 'redux'
import { State, Actions, Action, getPages, getOpenGraph, getConfig, getAuthors } from './store'
import { join } from 'path'
import { defaultAssetsPipeline } from './optimise'
import { tachyons } from './tachyons/tachyons'
import { Authors } from './aboutUs'

export const faqs: FAQ[] = [
  {
    title: 'What about Covid-19?',
    content:
      'The situation with Covid-19 is evolving rapidly. Please [get in touch to discuss your options](mailto:hello@learnk8s.io)).',
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

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train our team in Kubernetes. Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export const CorporateTraining = {
  id: 'corporate-training',
  url: '/corporate-training',
  title: 'Corporate Kubernetes Training',
  description:
    'Corporate Kubernetes training for top enterprises and SMEs using containers, Kubernetes and cloud native technologies.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(CorporateTraining))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-corporate-training',
      pageId: CorporateTraining.id,
      image: <img src='assets/opengraph.v2.png' alt='Learnk8s' />,
      description: CorporateTraining.description,
      title: 'Corporate Kubernetes Training',
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
      url: CorporateTraining.url,
      outputFolder: getConfig(state).outputFolder,
    })
  } catch (error) {
    console.log(error)
  }
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === CorporateTraining.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === CorporateTraining.id)
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
        <JsonLd<Course>
          item={{
            '@type': 'Course',
            '@context': 'https://schema.org',
            name: 'Advanced Kubernetes course — Corporate training',
            courseCode: 'LK8S-CORPORATE',
            description: `In this course, you'll take an app, build it into a container then use Kubernetes to deploy, scale, and update it. You will learn how to build a cluter and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
            educationalCredentialAwarded: 'Certificate of completetion',
            provider: {
              '@type': 'Organization',
              name: 'Learnk8s',
            },
            hasCourseInstance: [],
          }}
        />
      </Head>
      <Body>
        <Navbar />

        <section className='mt0 mt5-ns'>
          <DesignYourCourse id='first'></DesignYourCourse>
        </section>

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy tc'>How does it work?</h2>
            <p className='measure f3-l f4 lh-copy center'>
              This is a <span className='b'>full-time course</span> on learning and mastering Kubernetes.
            </p>
            <p className='measure f3-l f4 lh-copy center'>Things you need to know about the course:</p>
            <ul className='list pl0 ph2-ns'>
              <ListItem>
                Your team will get their hands dirty: the split is{' '}
                <span className='b'>40% lecture and 60% hands-on labs</span>.
              </ListItem>
              <ListItem>
                All students will have the chance to{' '}
                <span className='b'>ask questions and discuss with the instructor.</span>
              </ListItem>
              <ListItem>
                And they will learn from expert instructors (you can find us on the{' '}
                <a href='https://t.me/learnk8s' className='link navy underline' ref='noreferrer'>
                  Learnk8s Telegram group
                </a>
                ).
              </ListItem>
              <ListItem>
                Students will have <span className='b'>access to all the material after the course.</span> That's the{' '}
                <a href='/academy' className='link navy underline'>
                  full Learnk8s Academy (12 courses)
                </a>
              </ListItem>
              <ListItem>
                It's <span className='b'>beginner-friendly</span>, but you can customise the module and the topics.
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
            <p className='lh-copy f4 black-80 measure center ph3 mb3 mb5-ns'>
              In private and corporate training, you can customise the schedule in full.
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
              <ListItem>A virtual workstation in the cloud for each delegate for the duration of the course.</ListItem>
              <ListItem>Lifetime access to the private Slack channel where your team can always ask for help.</ListItem>
              <ListItem>A certificate of completion signed by the instructor.</ListItem>
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

        <section className='mt5'>
          <DesignYourCourse id='second'></DesignYourCourse>
        </section>

        <Section>
          <Demo></Demo>
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

function Quote() {
  const quotes = document.querySelectorAll<HTMLHtmlElement>('.js-quote')
  quotes.forEach(quote => {
    initRange()
    initMaxModules()
    initSubmit()
    initSelectedModules()

    function initRange() {
      const range = quote.querySelector('input[type="range"]') as HTMLInputElement
      const delegates = document.querySelector('.js-delegates')
      if (!range || !delegates) {
        return
      }
      range.addEventListener('input', () => {
        const value = parseInt(range.value)
        if (value >= 16) {
          delegates.innerHTML = '16+'
        } else {
          delegates.innerHTML = `${value}`
        }
      })
    }

    function initMaxModules() {
      const maxModules = quote.querySelectorAll('.js-max-modules')
      const durationCheckboxes = quote.querySelectorAll<HTMLInputElement>('input[name="duration"]')
      durationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event: any) => {
          if (event.target.checked) {
            maxModules.forEach(it => (it.innerHTML = `${parseInt(event.target.value) * 3}`))
          }
        })
      })
    }

    function initSelectedModules() {
      const countModules = quote.querySelector('.js-select-modules')
      if (!countModules) {
        return
      }
      const moduleCheckboxes = quote.querySelectorAll<HTMLInputElement>('input[name="modules"]')
      moduleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event: any) => {
          const selectedModules = quote.querySelectorAll<HTMLInputElement>('input[name="modules"]:checked')
          countModules.innerHTML = `${selectedModules.length}`
        })
      })
    }

    function initSubmit() {
      const submit = quote.querySelector('.js-submit')
      if (!submit) {
        return
      }
      submit.addEventListener('mousedown', event => {
        const classSizeElement = quote.querySelector<HTMLInputElement>('input[name="class-size"]')
        const whenElement = quote.querySelector<HTMLInputElement>('input[name="when"]:checked')
        const whereElement = quote.querySelector<HTMLInputElement>('input[name="where"]:checked')
        const durationElement = quote.querySelector<HTMLInputElement>('input[name="duration"]:checked')
        const moduleElements = [].slice.call(
          quote.querySelectorAll<HTMLInputElement>('input[name="modules"]:checked'),
        ) as HTMLInputElement[]
        const extrasElement = quote.querySelector<HTMLInputElement>('textarea')

        const body = [
          'Hi Learnk8s team,\n\n',
          `We wish to train ${classSizeElement?.value ??
            '___ (number)'} delegates in containers and Kubernetes ${whenElement?.value ?? '___ (month)'}.\n\n`,
          `The course should last ${durationElement?.value ??
            '___ (3/4/5 days)'} and include the following modules:\n\n`,
          `${moduleElements.map(it => `- ${it.value}`).join('\n')}\n\n`,
          !!extrasElement && extrasElement.value.trim().length > 0
            ? `It should also include:\n${extrasElement.value}\n\n`
            : '',
          `The course should be held ${whereElement?.value ?? '___ (on site/online)'}.\n\n`,
          'Can you help?\n\n',
          'Best regards,\n',
        ].join('')

        submit.setAttribute(
          'href',
          mailto({
            subject: 'Advanced Kubernetes training — Private group enquiry',
            email: 'hello@learnk8s.io',
            body,
          }),
        )
      })
    }

    function mailto({ subject, body, email }: MailTo) {
      return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  })
}

const DesignYourCourse: React.StatelessComponent<{ className?: string; id: string }> = ({
  children,
  className,
  id,
}) => {
  return (
    <div className='js-quote mw7 ph3 ph4-l center relative bg-evian pt3 pb4'>
      <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Design your Advanced Kubernetes course</p>
      <ul className='pl0 list f4 f3-ns mw7 center ph4-ns'>
        <li className='mv3 flex-ns items-top pt4'>
          <p className='b w-30-ns mv0 pt2'>Class size:</p>
          <ul className='list pl0 w-70-ns f4'>
            <li className='mv3'>
              <input
                type='range'
                name='class-size'
                min='6'
                max='17'
                step='1'
                defaultValue='10'
                className='w-100 mw6 center db'
              />
              <p className='f4-l f5 b lh-solid tc ph3'>
                <span className='js-delegates'>10</span> delegates
              </p>
            </li>
          </ul>
        </li>
        <li className='mv3 flex items-center bt pt2 pt4-ns b--light-gray '>
          <p className='b w-40 w-30-ns mv0'>When:</p>
          <ul className='list pl0 w-60 w-70-ns f4'>
            <li className='mv3'>
              <input type='radio' name='when' id={`${id}-when-option-1`} value='ASAP' />
              <label htmlFor={`${id}-when-option-1`} className='dib pl2'>
                ASAP
              </label>
            </li>
            <li className='mv3'>
              <input type='radio' name='when' id={`${id}-when-option-2`} defaultChecked value='in 1 month' />
              <label htmlFor={`${id}-when-option-2`} className='dib pl2'>
                in 1 month
              </label>
            </li>
            <li className='mv3'>
              <input type='radio' name='when' id={`${id}-when-option-3`} value='in 2 months' />
              <label htmlFor={`${id}-when-option-3`} className='dib pl2'>
                in 2 months
              </label>
            </li>
          </ul>
        </li>
        <li className='mv3 flex items-center bt pt2 pt4-ns b--light-gray'>
          <p className='b w-40 w-30-ns mv0'>Where:</p>
          <ul className='list pl0 w-60 w-70-ns f4'>
            <li className='mv3'>
              <input type='radio' name='where' id={`${id}-where-option-1`} defaultChecked value='online' />
              <label htmlFor={`${id}-where-option-1`} className='dib pl2'>
                Online
              </label>
            </li>
            <li className='mv3'>
              <input type='radio' name='where' id={`${id}-where-option-2`} value='on-site' />
              <label htmlFor={`${id}-where-option-2`} className='dib pl2' defaultChecked>
                On-site
              </label>
            </li>
          </ul>
        </li>
        <li className='mv3 flex items-center bt pt2 pt4-ns b--light-gray'>
          <p className='b w-40 w-30-ns mv0'>Duration:</p>
          <ul className='list pl0 w-60 w-70-ns f4'>
            <li className='mv3'>
              <input type='radio' name='duration' id={`${id}-duration-option-1`} defaultChecked value='3 days' />
              <label htmlFor={`${id}-duration-option-1`} className='dib pl2'>
                3 days
              </label>
            </li>
            <li className='mv3'>
              <input type='radio' name='duration' id={`${id}-duration-option-2`} value='4 days' />
              <label htmlFor={`${id}-duration-option-2`} className='dib pl2' defaultChecked>
                4 days
              </label>
            </li>
            <li className='mv3'>
              <input type='radio' name='duration' id={`${id}-duration-option-3`} value='5 days' />
              <label htmlFor={`${id}-duration-option-3`} className='dib pl2'>
                5 days
              </label>
            </li>
          </ul>
        </li>
        <li className='mv3 bt pt2 pt4-ns b--light-gray'>
          <p className='mv0'>
            <span className='b'>Choose the modules</span>{' '}
            <span className='f5 gray pl2'>
              (<span className='js-select-modules'>7</span>/<span className='js-max-modules'>9</span>)
            </span>
          </p>
          <p className='mt3 mb4 f5 measure i'>
            We recommend choosing about <span className='js-max-modules'>9</span> modules (three modules for each day of
            training).
          </p>
          <ul className='list pl0 f4-ns f5 flex flex-wrap'>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-1`}
                className='fl'
                defaultChecked
                value='Linux containers & Kubernetes'
              />
              <label htmlFor={`${id}-modules-option-1`} className='db pl4'>
                Linux containers & Kubernetes
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-2`}
                className='fl'
                defaultChecked
                value='Kubernetes fundamentals'
              />
              <label htmlFor={`${id}-modules-option-2`} className='db pl4'>
                Kubernetes fundamentals
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-3`}
                className='fl'
                defaultChecked
                value='Deployment strategies'
              />
              <label htmlFor={`${id}-modules-option-3`} className='db pl4'>
                Deployment strategies
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-4`}
                className='fl'
                defaultChecked
                value='Kubernetes Architecture'
              />
              <label htmlFor={`${id}-modules-option-4`} className='db pl4'>
                Kubernetes Architecture
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-5`}
                className='fl'
                defaultChecked
                value='Kubernetes Networking'
              />
              <label htmlFor={`${id}-modules-option-5`} className='db pl4'>
                Kubernetes Networking
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-6`}
                className='fl'
                defaultChecked
                value='YAML templating (and Helm)'
              />
              <label htmlFor={`${id}-modules-option-6`} className='db pl4'>
                YAML templating (and Helm)
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-7`}
                className='fl'
                defaultChecked
                value='Stateful apps'
              />
              <label htmlFor={`${id}-modules-option-7`} className='db pl4'>
                Stateful apps
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input type='checkbox' name='modules' id={`${id}-modules-option-8`} className='fl' value='Autoscaling' />
              <label htmlFor={`${id}-modules-option-8`} className='db pl4'>
                Autoscaling
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-9`}
                className='fl'
                value='Advanced Networking'
              />
              <label htmlFor={`${id}-modules-option-9`} className='db pl4'>
                Advanced Networking
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-10`}
                className='fl'
                value='Service meshes (and Istio)'
              />
              <label htmlFor={`${id}-modules-option-10`} className='db pl4'>
                Service meshes (and Istio)
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input type='checkbox' name='modules' id={`${id}-modules-option-11`} className='fl' value='Security' />
              <label htmlFor={`${id}-modules-option-11`} className='db pl4'>
                Security
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input type='checkbox' name='modules' id={`${id}-modules-option-12`} className='fl' value='CI/CD' />
              <label htmlFor={`${id}-modules-option-12`} className='db pl4'>
                CI/CD
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-13`}
                className='fl'
                value='CKA/CKAD preparation'
              />
              <label htmlFor={`${id}-modules-option-13`} className='db pl4'>
                CKA/CKAD preparation
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-14`}
                className='fl'
                value='Extending Kubernetes'
              />
              <label htmlFor={`${id}-modules-option-14`} className='db pl4'>
                Extending Kubernetes
              </label>
            </li>
            <li className='mv2 mv3-ns w-100 w-50-ns'>
              <input
                type='checkbox'
                name='modules'
                id={`${id}-modules-option-15`}
                className='fl'
                value='Ad-hoc consulting'
              />
              <label htmlFor={`${id}-modules-option-15`} className='db pl4'>
                Ad-hoc consulting
              </label>
            </li>
            <li className='mv3 w-100'>
              <p className='f5'>You can add custom modules or requests below:</p>
              <textarea name='modules-others' cols={30} rows={10} className='w-100 br2 b--light-gray h3'></textarea>
            </li>
          </ul>
        </li>
      </ul>

      <div className='tc'>
        <a
          href={mailto(privateGroupEnquiry)}
          className='js-submit link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
        >
          Submit enquiry
        </a>
      </div>

      <div className='tc'>
        <p className='lh-solid'>
          Have questions?{' '}
          <a href={mailto(privateGroupEnquiry)} className='link navy underline'>
            Speak to an instructor.
          </a>
        </p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `(${Quote.toString()})()` }}></script>
    </div>
  )
}

const Demo: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <>
      <div className='mw7 center'>
        <p className='f1-l f2 navy b tc ph3 mb3 mt4'>Still not convinced?</p>
        <p className='lh-copy f4 black-70 measure center tc'>
          We want to make sure that the course is 100% what you want. If you wish to{' '}
          <span className='b'>try before you buy</span>, you can book an instructor's time, and they will show you the
          material of the course.
        </p>

        <div className='tc'>
          <a
            href='https://calendly.com/learnk8s/15min'
            target='_blank'
            rel='noreferrer'
            className='link dib white bg-navy br1 pa3 b f5 mv3 submit br2 b--none ttu'
          >
            Book a demo
          </a>
        </div>
      </div>
    </>
  )
}
