import React from 'react'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { State, Actions, Action, getPages, getOpenGraph, getConfig } from './store'
import { material, assets as materialAssets } from './material'
import { Navbar, Html, Head, OpenGraph, Body, Footer, mailto, MailTo, FAQs, FAQ } from './layout.v3'
import { Store } from 'redux'
import { defaultAssetsPipeline } from './optimise'
import { join } from 'path'
import { tachyons } from './tachyons/tachyons'

const enterprisePackage: MailTo = {
  subject: 'Learnk8s Academy — Enterprise license',
  body: `Hi Learnk8s,\n\nI'd like to discuss buying ___ licenses in bulk for the Learnk8s Academy.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
}

const faqs: FAQ[] = [
  {
    title: `Can I see a preview of the videos?`,
    content: `This is not a video course. It is a learn-by-doing course. There's no shortcut in learning Kubernetes. You have to put the effort in and practice.`,
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! Drops an email at [hello@learnk8s.io](mailto:hello@learnk8s.io) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this, so we only want your money if you are happy with the product! If you aren't satisfied, within 30 days, send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and, we will refund you.`,
  },
  {
    title: `What are the prerequisites to join the Learnk8s Academy?`,
    content: `You should be familiar with Bash/Powershell, git, grep, curl and SSH. You should be familiar with web servers such as Apache or Nginx. Also, it helps if you used Vagrant and Virtual Box, in the past, but it's only a nice-to-have.`,
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`,
  },
]

export const Architecting = {
  id: 'academy-architecting-and-scaling',
  url: '/architecting-scaling-apps-kubernetes',
  title: 'Architecting and scaling apps on Kubernetes ⎈ Learnk8s Academy',
  description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Architecting))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-academy-architecting-and-scaling',
      pageId: Architecting.id,
      image: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
      title: 'Architecting and scaling apps on Kubernetes ⎈ Learnk8s Academy',
      description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
    }),
  )
}

export function Mount({ store }: { store: Store<State, Actions> }) {
  const state = store.getState()
  defaultAssetsPipeline({
    jsx: renderPage(state),
    isOptimisedBuild: getConfig(state).isProduction,
    siteUrl: `${getConfig(state).protocol}://${getConfig(state).hostname}`,
    url: Architecting.url,
    outputFolder: getConfig(state).outputFolder,
  })
}

function renderPage(state: State) {
  const page = getPages(state).find(it => it.id === Architecting.id)!
  const openGraph = getOpenGraph(state).find(it => it.pageId === Architecting.id)
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
        <link rel='canonical' href={currentAbsoluteUrl} />
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `(function() {
window.__insp = window.__insp || [];
__insp.push(['wid', 1190458479]);
var ldinsp = function(){
if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1190458479&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
setTimeout(ldinsp, 0);
})();`,
          }}
        />
      </Head>
      <Body>
        <JsonLd<Course>
          item={{
            '@type': 'Course',
            '@context': 'https://schema.org',
            name: 'Architecting and scaling apps on Kubernetes',
            courseCode: 'K8SARCH',
            description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
            educationalCredentialAwarded: 'Learnk8s Certificate of completion',
            provider: {
              '@type': 'Organization',
              name: 'Learnk8s',
            },
          }}
        />

        <Navbar />

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy'>A Kubernetes course built by engineers for engineers</h2>
            <p className='measure f3-l f4 lh-copy center'>
              The course, where you can learn how to design, develop and deploy applications in Kubernetes.
            </p>
            <p className='measure f3-l f4 lh-copy center'>A course that:</p>
            <ul className='list ph2'>
              <ListItem>Prioritises hands-on material and challenges</ListItem>
              <ListItem>Covers practical, day-to-day scenario rather than abstract use cases</ListItem>
              <ListItem>
                Goes in-depth enough to be useful, but without becoming a boring list of flags that you can tweak
              </ListItem>
              <ListItem>Get you up to speed quickly</ListItem>
              <ListItem>Gives you the skills to be confident in deploying and managing production-grade apps</ListItem>
            </ul>
            <p className='measure f3-l f4 lh-copy center'>This course is not:</p>
            <ul className='list ph2'>
              <ListItemX>
                <span className='b'>A "watch the videos, and you become an expert" course.</span> There are no videos,
                and there are no experts in Kubernetes who learnt that way
              </ListItemX>
              <ListItemX>
                <span className='b'>Only about building clusters.</span> Clusters should be configured to support the
                apps deploying on it, not the other way around.
              </ListItemX>
            </ul>
          </div>
        </Section>

        <section className='bg-evian pv4'>
          <p className='f3 f2-l navy b tc'>What's inside</p>
          <ul className='flex-l flex-wrap-l pl0 mw8 center ph3'>
            <ListItem className='w-50-l'>Content-based, hands-on labs</ListItem>
            <ListItem className='w-50-l'>3 courses with ebooks</ListItem>
            <ListItem className='w-50-l'>
              Concise lectures with plenty of diagrams{' '}
              <span className='i underline'>(great if you are a visual learner)</span>
            </ListItem>
            <ListItem className='w-50-l'>Interactive challenges for beginners and experts</ListItem>
          </ul>

          <div className='mv3 mv5-l mt0-l mw8 center'>
            <Module
              preview={material.docker.cover}
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
            </Module>

            <Module
              preview={material.kubernetesFundamentals.cover}
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
            </Module>

            <Module
              preview={material.deploymentStrategies.cover}
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
            </Module>

            <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
          </div>
        </section>

        <Section>
          <div className='mt4 measure f3-l f4 center'>
            <h2 className='f1-l f2 navy'>You will enjoy the courses, according to our students</h2>
            <p className='measure f3-l f4 lh-copy center'>Here is the feedback from our students.</p>
            <ul className='list pl0'>
              <li className='mv5'>
                {React.createElement('img', {
                  src: 'assets/academy/testimonial1.png',
                  alt: 'Testimonial',
                  loading: 'lazy',
                  className: 'shadow-4',
                })}
                <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                  That's the response from Shawn when Daniele reached him out and offered to help on the material.
                </p>
              </li>
              <li className='mv5'>
                <img src='assets/academy/testimonial2.png' alt='Testimonial' className='shadow-4' />
                <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                  We keep the Academy always up to date with the latest changes and Rudolf noticed that immediately.
                </p>
              </li>
              <li className='mv5'>
                {React.createElement('img', {
                  src: 'assets/academy/testimonial3.png',
                  alt: 'Testimonial',
                  loading: 'lazy',
                  className: 'shadow-4',
                })}
                <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                  Karl was looking for an in-depth course to learn Kubernetes inside-out and kept us updated with his
                  progress.
                </p>
                <div className='flex-l'>
                  <div className='w-50-l'>
                    {React.createElement('img', {
                      src: 'assets/academy/testimonial3b.png',
                      alt: 'Testimonial',
                      loading: 'lazy',
                      className: 'shadow-4',
                    })}
                  </div>
                  <div className='w-50-l'>
                    {React.createElement('img', {
                      src: 'assets/academy/testimonial3c.png',
                      alt: 'Testimonial',
                      loading: 'lazy',
                      className: 'shadow-4',
                    })}
                  </div>
                </div>
                <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                  Karl was impressed by the quality of the content and enjoy practising with the hands-on labs and
                  challenges.
                </p>
              </li>
              <li className='mv5'>
                {React.createElement('img', {
                  src: 'assets/academy/testimonial4.png',
                  alt: 'Testimonial',
                  loading: 'lazy',
                  className: 'shadow-4',
                })}
                <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                  The Learnk8s Academy courses are excellent if you're a beginner and wish to get started with
                  containers and Kubernetes.
                </p>
              </li>
            </ul>
          </div>
        </Section>

        <section className='pv4 bg-evian' id='start'>
          <p className='center f1-l f2 navy b tc ph3 measure-narrow'>Get instant access to the courses</p>
          <p className='lh-copy f4-l black-70 measure center tc ph3 mb5'>Choose the package that works best for you.</p>

          <div className='flex justify-center'>
            <div className='bg-white br4 mh3 ph3 pb3'>
              <h2 className='lh-copy f2 navy tc'>Complete series</h2>
              <p className='f2 navy tc mv4 bs'>
                <span className='db' id='pricing-one'>
                  {(187).toLocaleString('US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </p>
              <ul className='list ph2'>
                <ListItem>All in-depth 3 courses</ListItem>
                <ListItem>Ebooks for offline reading</ListItem>
                <ListItem>Hands-on guided labs</ListItem>
                <ListItem>Practice with real challenges</ListItem>
                <ListItem>One time fee, lifetime updates</ListItem>
              </ul>
              <p className='tc mt4'>
                <a
                  href='https://academy.learnk8s.io/architecting-bundle'
                  className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                  target='_self'
                  ref='noreferrer'
                >
                  Buy now →
                </a>
              </p>
            </div>

            <div className='bg-white br4 mh3 ph3 pb3'>
              <h2 className='lh-copy f2 navy tc'>
                Complete series<sup>++</sup>
              </h2>
              <p className='f2 navy tc mv4 bs'>
                <span className='db' id='pricing-one'>
                  {(347).toLocaleString('US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </p>
              <ul className='list ph2'>
                <ListItem>All in-depth 3 courses</ListItem>
                <ListItem>Ebooks for offline reading</ListItem>
                <ListItem>Hands-on guided labs</ListItem>
                <ListItem>Practice with real challenges</ListItem>
                <ListItem>One time fee, lifetime updates</ListItem>
                <ListItem>
                  <span className='b'>1-on-1 coaching session</span>
                </ListItem>
              </ul>
              <p className='tc mt4'>
                <a
                  href='https://academy.learnk8s.io/architecting-bundle'
                  className='no-underline dib ba b--sky sky br1 pv3 ph4 b f4 br2'
                  target='_self'
                  ref='noreferrer'
                >
                  Buy now →
                </a>
              </p>
            </div>
          </div>
        </section>

        <Section className='bg-evian'>
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

        <FAQs faqs={faqs} />

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
          element.innerHTML = price.gross.toLocaleString(price.country, {
            style: 'currency',
            currency: price.currency,
          })
        }
        var discount = document.querySelector('#' + key + '-discount')
        if (!!discount) {
          var price = resp[key]
          discount.innerHTML = Math.ceil(price.gross * 0.5).toLocaleString(price.country, {
            style: 'currency',
            currency: price.currency,
          })
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
            __html: `
var endsIn = [].slice.call(document.querySelectorAll('.ends-in'))
var countDownDate = new Date('2019-12-05').getTime()
setInterval(function () {
  var now = new Date().getTime()
  var distance = countDownDate - now
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)
  for (let i = 0, len = endsIn.length; i < len; i++) {
    if (distance < 0) {
      endsIn[i].innerHTML = '00:00:00'
    } else {
      endsIn[i].innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    }
  }
  function pad(n) {
    return ('' + n).length === 1 ? '0' + n : n
  }
}, 1000)
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

const Module: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element
  className?: string
}> = ({ children, title, description, preview, className }) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return (
    <div className={`mh3 ${className || ''}`}>
      <div className='module pt3 pb4 ph4 shadow-2 mv4 bg-white flex items-start'>
        <div className='w-50-ns'>
          <p className='f3 navy b bb b--black-20 pb3'>{title}</p>
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
        <div className='w-50 pa4'>
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

const Quiz: React.StatelessComponent<{
  className?: string
  correctAnswer: 'yes' | 'no'
  id: string
  labelYes: string
  labelNo: string
}> = ({ id, children, className, correctAnswer, labelYes, labelNo }) => {
  return (
    <div className={`yesno ${correctAnswer === 'yes' ? 'first-right' : 'second-right'} ${className || ''}`}>
      <input type='radio' name={id} id={`yes-${id}`} className='dn yes' />
      <input type='radio' name={id} id={`no-${id}`} className='dn no' />
      <ol className='ph5-l ph2 list'>
        <li className='yes mv2 pa2 br2'>
          <label htmlFor={`yes-${id}`} className='h2 flex items-center'>
            <span className='radio ba w2 h2 br-100 bw1 v-mid dib' />
            <span className='pl3 f3-l f4'>{labelYes}</span>
          </label>
        </li>
        <li className='no mv2 pa2 br2'>
          <label htmlFor={`no-${id}`} className='h2 flex items-center'>
            <span className='radio ba w2 h2 br-100 bw1 v-mid dib' />

            <span className='pl3 f3-l f4'>{labelNo}</span>
          </label>
        </li>
      </ol>
      <p className='pt3 f5-l f6 ttu lh-copy b'>Answer:</p>
      <div className='answer'>{children}</div>
    </div>
  )
}

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
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
