import React, { Fragment } from 'react'
import { material, assets as materialAssets } from './material'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { State, Actions, Action, getPages, getOpenGraph, getConfig } from './store'
import { Navbar, Html, Head, OpenGraph, Body, Footer, mailto, MailTo, FAQs, FAQ, Hero } from './layout.v3'
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
    content: `This is not a video course. This is a learn-by-doing course. There's no shortcut in learning Kubernetes. You have to put the effort in and practice.`,
  },
  {
    title: `Kubernetes is a vast subject, what topics I won't find in this course?`,
    content: `You won't find:

- The Cilium CNI plugin, but you'll learn about the CNI and how to customise it
- How to set up CI/CD with Kubernetes
- Advanced allocations
- Securing your cluster
- Multi-cloud and multi-data centres deployments
- Architecture and networking`,
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! [Fill out this form](https://docs.google.com/forms/d/e/1FAIpQLSc8dT07y92OHVH4JjkXAoDvB34nR0i-G2CpwkRfiwph77xTDQ/viewform) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this, so we only want your money if you are happy with the product! If you aren't satisfied, within 30 days send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and, we will refund you.`,
  },
  {
    title: `What are the prerequisites to join the Learnk8s Academy?`,
    content: `You should be familiar with Bash/Powershell, git, curl and SSH. You should be familiar with web servers such as Apache or Nginx. Also, it helps if you used Vagrant and Virtual Box, in the past, but it's only a nice-to-have.`,
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
        <JsonLd<Course>
          item={{
            '@type': 'Course',
            '@context': 'https://schema.org',
            name: 'Architecting and scaling apps on Kubernetes',
            courseCode: 'K8SARCH',
            description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
            educationalCredentialAwarded: 'CKAD (optional)',
            provider: {
              '@type': 'Organization',
              name: 'Learnk8s',
            },
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .numbered {
            counter-reset: my-awesome-counter;
          }
          .numbered li {
            counter-increment: my-awesome-counter;
          }
          .numbered li::before {
            content: counter(my-awesome-counter);
            background: #662974;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: inline-block;
            line-height: 2rem;
            color: white;
            text-align: center;
            margin-right: 0.5rem;
            font-weight: bold;
            float: left;
          }
          .feedback {
            column-count: 1;
          }
          @media screen and (min-width: 30em) and (max-width:60em) {
            .feedback {
              column-count: 2;
            }
          }
          @media screen and (min-width: 60em) {
            .feedback {
              column-count: 4;
            }
          }`,
          }}
        />
      </Head>
      <Body>
        <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
          <Navbar />

          <Hero image={<img src='assets/academy/academy.svg' alt='Learn Kubernetes online' />} imageClass='i-academy'>
            <h1 className='f1 mt1-l pt5-l f-subheadline-l lh-solid'>Architecting and scaling apps on Kubernetes</h1>
            <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>
              A hands-on course on mastering containers and Kubernetes and the tools you'll need to build real, working
              applications at scale.
            </h2>
          </Hero>
        </div>

        <section className='ph3 ph4-ns flex items-center justify-center relative z3'>
          <div className='w-50-l dn db-l tc'>
            <div className='dib'>
              <div className='i-rocks relative'>
                <img
                  src='assets/academy/rocks.svg'
                  alt='You may feel stranded while learning Kubernetes'
                  className='absolute top-0 right-0'
                />
              </div>
            </div>
          </div>

          <div className='w-50-l center pt3'>
            <h2 className='f3 navy f2-l measure-narrow'>
              What is <span className='i'>even</span> the point of Kubernetes?
            </h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>
                You keep hearing people talking about Kubernetes as if it were the holy grail of tech.
              </p>
              <p className='lh-copy f4-l black-70'>
                But every time you read the docs, you struggle to understand why you should spend time on it.
              </p>
              <p className='lh-copy f4-l black-70 b'>It' so complex.</p>
              <p className='lh-copy f4-l black-70'>
                How can it even compete with{' '}
                <span className='code f6 bg-light-gray pa1 br2'>SSH → docker-compose up</span>?
              </p>
              <p className='lh-copy f4-l black-70 i'>That's only two commands!</p>
              <p className='lh-copy f4-l black-70'>
                But maybe you're convinced that <span className='b'>Kubernetes can handle Google kind of load</span> and
                you should learn it.
              </p>
            </div>
          </div>
        </section>

        <section className='ph3 ph4-ns flex items-center justify-center relative'>
          <div className='w-40-l center pt3'>
            <h2 className='f3 navy f2-l measure-narrow'>According to the experts</h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>To work effectively within Kubernetes, you should understand:</p>
              <ul>
                <li className='lh-copy black-70 f4-l'>1. Docker (images, containers, volumes, layers, etc.)</li>
                <li className='lh-copy black-70 f4-l'>
                  2. Kubernetes fundamentals (pods, ingress, stateful sets, persistent volumes, etc.)
                </li>
                <li className='lh-copy black-70 f4-l'>3. Helm (for templating resources)</li>
                <li className='lh-copy black-70 f4-l'>4. Ansible, Puppet and Chef to configure your nodes</li>
                <li className='lh-copy black-70 f4-l'>5. Let's not forget your CI stack (Jenkins, Travis, etc.)</li>
                <li className='lh-copy black-70 f4-l'>…</li>
                <li className='lh-copy black-70 f4-l'>57. What is best CNI</li>
                <li className='lh-copy black-70 f4-l'>58. How kubectl works</li>
              </ul>
              <p className='lh-copy f4-l black-70'>
                Before you can deploy your <span className='i'>"Hello World"</span> app.
              </p>
              <p className='lh-copy f4-l black-70 b'>
                It's getting to the point that no one person can be an expert in all of it, but what should you focus
                on?
              </p>
            </div>
          </div>

          <div className='w-50-l dn db-l tc'>
            <div className='dib'>
              <div className='i-onfire relative'>
                <img
                  src='assets/academy/onfire.svg'
                  alt={`In Kubernetes everything feels like it's on fire`}
                  className='absolute top-0 right-0'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='ph3 ph4-ns flex items-center justify-center relative'>
          <div className='w-50-l dn db-l tc'>
            <div className='dib'>
              <div className='i-nope relative'>
                <img src='assets/academy/nope.svg' alt='Kubernetes is hard' className='absolute top-0 right-0' />
              </div>
            </div>
          </div>

          <div className='w-40-l center pt3'>
            <h2 className='f3 navy f2-l measure-narrow'>Also, why is everyone so obsessed with building clusters?</h2>
            <div className='measure-wide'>
              <p className='lh-copy f4-l black-70'>
                It seems that every Kubernetes tutorial out there is focussed on building a cluster from scratch — a
                slight variation from Kubernetes The Hard Way.
              </p>
              <p className='lh-copy f4-l black-70 b'>
                But what's the point of building a cluster from scratch if you don't know how to take advantage of it?
              </p>
              <p className='lh-copy f4-l black-70'>
                How can you set the control manager flags if you don't know how the apps respond to that? (I'm looking
                at you <span className='code f6 bg-light-gray pa1 br2'>--pod-eviction-timeout</span>)
              </p>
            </div>
          </div>
        </section>

        <section className='mv5 mv6-ns ph3'>
          <h2 className='f3 f2-l navy measure-narrow center tc'>
            Learn how to develop apps that scale to millions of users
          </h2>
          <div className='mw7 center'>
            <p className='lh-copy f4-l black-70'>
              In this course, you will learn how to design, develop and deploy applications in Kubernetes.
            </p>
            <p className='lh-copy f4-l black-70'>And you will learn how to:</p>
            <ul className='list numbered black-70 pl3 pt2'>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>package apps in containers</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>deploy apps on a Kubernetes cluster</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>
                  release apps to production using rolling updates, canary deployment, or blue-green deployments
                </p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>
                  expose your services using load balancers and ingress controllers
                </p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>manage databases and stateful applications</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>leverage database clustering using operators</p>
              </li>
              <li className='f4-l lh-copy mv2 cf'>
                <p className='pl4 ml2 lh-copy measure mt0'>
                  not repeat yourself using a templating engine for Kubernetes resources
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className='bg-evian pt4'>
          <p className='f3 f2-l navy b tc'>What's inside</p>
          <ul className='flex flex-wrap pl0 mw7 center ph3'>
            <ListItem className='w-50'>Content-based, hands-on tutorials</ListItem>
            <ListItem className='w-50'>6 courses with ebooks</ListItem>
            <ListItem className='w-50'>
              Concise lectures with plenty of diagrams <span className='i'>(great if you are a visual learner)</span>
            </ListItem>
            <ListItem className='w-50'>Interactive challenges for beginners and experts</ListItem>
          </ul>

          <div className='ma3 ma5-l pa3 mt0-l'>
            <Module
              preview={[materialAssets.docker.docker, materialAssets.docker.containersVMs]}
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
              preview={[
                materialAssets.kubernetesFundamentals.apiInfrastructure,
                materialAssets.kubernetesFundamentals.tetrisPlayer,
              ]}
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
              preview={[
                materialAssets.deploymentStrategies.livenessProbe,
                materialAssets.deploymentStrategies.rollingUpdates,
              ]}
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

            <Module
              preview={[
                materialAssets.managingState.clusteredDatabase,
                materialAssets.managingState.distributedStorage,
              ]}
              title={`4. ${material.managingState.name}`}
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
            </Module>

            <Module
              preview={[materialAssets.templating.helmArchitecture, materialAssets.templating.reusableTemplates]}
              title={`5. ${material.templating.name}`}
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
            </Module>

            <Module
              preview={[materialAssets.autoscaling.intro, materialAssets.autoscaling.registry]}
              title={`6. ${material.autoscaling.name}`}
              description={material.autoscaling.description}
              className='ribbon-module'
            >
              <p className='lh-copy measure-wide'>
                You will learn how to autoscale your applications based on CPU, memory and application-specific custom
                metrics. The module covers the following topics:
              </p>
              <ul>
                {Object.values(material.autoscaling.topics).map((it, index) => (
                  <li key={index} className='lh-copy mv1'>
                    {it}
                  </li>
                ))}
              </ul>
            </Module>
            <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
          </div>
        </section>

        <section className='mv5 mv6-ns ph3'>
          <h2 className='f3 f2-l navy measure-wide center tc'>The Learnk8s Academy Guarantee: Our promise to you</h2>
          <div className='mw7 center'>
            <p className='lh-copy f4-l black-70 b mb1 mt5-l mt4'>
              We care more about our students' success than taking their money.
            </p>
            <p className='lh-copy f4-l black-70 mt1'>
              If you follow the lectures and practise the material and still DO NOT feel like you are making progress 30
              days after you begin doing the work, we will try to work with you to identify what's missing. And if that
              doesn't work, we'll give you a full refund.
            </p>
            <p className='lh-copy f4-l black-70 b mb1 mt5-l mt4'>
              We're honest to the end about the level of effort, skills, and other ingredients required.
            </p>
            <p className='lh-copy f4-l black-70 mt1'>
              This is not a <span className='i'>"master Kubernetes in 3 hours"</span> or{' '}
              <span className='i'>watch someone else deploying containers in Kubernetes</span> video course. Completing
              the Learnk8s Academy's modules takes time and effort… <span className='b'>but it does work.</span> The
              learning curve is steep; then, the plateau of usefulness is very long and smooth. It's a great feeling
              operating Kubernetes after you've mastered it.
            </p>
          </div>
        </section>

        <section className='pv4 bg-evian'>
          <p className='center f3 f2-l navy b tc ph3 measure-narrow'>Start your Kubernetes journey now</p>
          <p className='lh-copy f4-l black-70 measure center tc ph3 mb5'>
            Join the Learnk8s Academy and learn how to deploy and manage applications at scale with Kubernetes.
          </p>

          <section className='flex mw8 center more-content mb5'>
            <div className='left w-30 mw5'>
              <div className='pl3'>
                <div className='overflow-hidden'>
                  <div className='w5'>
                    <div className='h2 mb3'>&nbsp;</div>
                    <div className='padding-hack-75'>&nbsp;</div>
                  </div>
                </div>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Courses</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Ebooks</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Online material</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Online challenges</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Certificate of completion</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Lifetime updates</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>CKAD tips and tricks</p>
                <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Discounted CKAD</p>
              </div>
            </div>
            <div className='right mw7 overflow-auto'>
              <div className='flex w7'>
                <div className='w5'>
                  <div className='header h2 mb3'>
                    <h2 className='f3 tc navy mt0'>Professional</h2>
                  </div>
                  <div className='padding-hack-75'>
                    <img src='assets/academy/full-package.svg' alt='The full package' />
                  </div>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>6</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>20%</p>
                  <div>
                    <p className='f3 navy tc mv4 bs'>
                      <span className='db' id='architecting-full'>
                        {(597).toLocaleString('US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </p>
                    <div className='tc'>
                      <a
                        href='https://academy.learnk8s.io/architecting-full'
                        className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                        target='_self'
                        ref='noreferrer'
                      >
                        Buy now →
                      </a>
                    </div>
                  </div>
                </div>

                <div className='w5'>
                  <div className='header h2 mb3'>
                    <h2 className='f3 tc navy mt0'>Expert</h2>
                  </div>
                  <div className='padding-hack-75'>
                    <img src='assets/academy/expert-package.svg' alt='The expert package' />
                  </div>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>6</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>&nbsp;</p>
                  <div>
                    <p className='f3 navy tc mv4 bs'>
                      <span className='db' id='architecting-expert'>
                        {(397).toLocaleString('US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </p>
                    <div className='tc'>
                      <a
                        href='https://academy.learnk8s.io/architecting-expert'
                        className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                        target='_self'
                        ref='noreferrer'
                      >
                        Buy now →
                      </a>
                    </div>
                  </div>
                </div>

                <div className='w5'>
                  <div className='header h2 mb3'>
                    <h2 className='f3 tc navy mt0'>Beginner</h2>
                  </div>
                  <div className='padding-hack-75'>
                    <img src='assets/academy/ebooks-bundle.png' alt='The eBooks bundle' />
                  </div>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>4</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                    <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                  </p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                  <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>&nbsp;</p>
                  <div>
                    <p className='f3 navy tc mv4 bs'>
                      <span className='db' id='architecting-bundle'>
                        {(121).toLocaleString('US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </p>
                    <div className='tc'>
                      <a
                        href='https://academy.learnk8s.io/architecting-bundle'
                        className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                        target='_self'
                        ref='noreferrer'
                      >
                        Buy now →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className='tc pv4'>
            <a href={mailto(enterprisePackage)} className='f7 black-70 no-underline'>
              Learnk8s offers competitive corporate prices.{' '}
              <span className='underline'>Get in touch to learn more.</span>
            </a>
          </div>
        </section>

        <section className='mt5 mb4'>
          <p className='f3 f2-l navy b tc'>Learnk8s trains over 300+ engineers per year in Kubernetes</p>
          <p className='lh-copy f4-l black-70 measure center tc ph3 pb4'>
            The systems, techniques, and processes you'll learn in the Learnk8s Academy have been developed over 2+
            years during our hands-on, instructor-led workshops.
          </p>
          <div className='feedback tc'>
            <Feedback
              className='mw5 dib mv3'
              author='Mauricio Salatino'
              role='Activiti Cloud Team Lead'
              description='The course is totally worth the money and time, if you have a team that is getting started with Kubernetes and want to validate the approach that you are taking as well as to level up your knowledge on K8s, this is the way to go.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Marcello Teodori'
              role='Architect'
              description='This is the course you have to do to put all the pieces in the right place and challenge yourself to really master your knowledge of Kubernetes. Wish I had done it long ago.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Yawwani Gunawardaba'
              role='Data Scientist'
              description='Good course with practical labs.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Sandeep Sarthavalli Ramesh'
              role='Software developer'
              description='A good course to get started with Kubernetes with enough confidence to deploy, debug and progress in the world of k8s.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='David Heward'
              role='Senior DevOps Engineer'
              description='A really enjoyable 3-day workshop on Kubernetes. I cemented my understanding of Kubernetes and can now start implementing and furthering my knowledge with real examples and workflows. Next stop, production experience.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Chris Cooney'
              role='Senior Software Engineer'
              description={`We previously had a couple of people talking about Kubernetes in the pub. Now half the office are raving about it. I don't think reading documentation alone would have done that for us, it needed some people to come in and show us what is possible, validate the ideas we've already had and give us guidance on where to go next. Now everyone has a clear, shared vision and a mission. All that's left is to take the first few steps.`}
            />
            <Feedback
              className='mw5 dib mv3'
              author='Luke Anderson'
              role='Senior IT Engineer'
              description='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Mark Gardiner'
              role='Infrastructure Developer'
              description='This is very intensive course, particularly if you are new to cloud computing or networking concepts.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Przemek Anuszek'
              role='Cloud architect'
              description='The training is very well prepared and also very well performed.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Eda Meadows'
              role='Polyglott Developer'
              description='Clear, good explanations with good use of diagrams.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Sara Aspery'
              role='Software Engineer'
              description='Be prepared to learn a lot and enjoy the hands-on sessions.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Ryan Dawson'
              role='Software Developer'
              description='Learnk8s know this stuff, have put a lot of thought into the course and will put a lot of thought into your questions too!'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Grant Hammond'
              role='Senior Linux Engineer'
              description='Essential knowledge. I mostly enjoyed finding out how the components were doing their thing under the hood and how traffic is/was actually being shunted around.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Antonio Troina'
              role='Senior Software Developer'
              description='Great experience. Going back to the office with a much better understanding of the topic. Useful exercises, great Q&A session with clarification.'
            />
          </div>
        </section>

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
          discount.innerHTML = Math.ceil(price.gross * 0.7).toLocaleString(price.country, {
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

export const Module: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element[]
  className?: string
}> = ({ children, title, description, preview, className }) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return (
    <div className={`mh3 ${className}`}>
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
        <div className='w-50 flex-ns flex-wrap items-start pt3 dn'>
          {preview.map(it => {
            return (
              <div className='w-80 w-50-l center'>
                <div className='padding-hack-75 relative'>
                  <img src={it.props.src} alt={it.props.alt} className='absolute top-0 right-0' />
                </div>
              </div>
            )
          })}
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

const ComingSoon: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <React.Fragment>
      <p className='lh-solid navy b ttu tc f4 mb1 mt5'>Coming soon</p>
      <p className='lh-copy black-70 tc f6 mt2'>
        Release date: 19<span className='f7 v-top'>th</span> of September 2019
      </p>
      <div className='measure center bg-evian ph4 pt2 pb4 b--blue bl bw2'>
        <p className='lh-copy black-70'>
          Subscribers to the Learnk8s newsletter will receive a discount ahead of the announcement.
        </p>
        <a href='https://learnk8s.io/newsletter' target='_blank' rel='noreferrer' className='navy underline'>
          Subscribe now →
        </a>
      </div>
    </React.Fragment>
  )
}

const MiniComingSoon: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <React.Fragment>
      <p className='lh-solid navy b ttu f4 mb1 mt5'>Coming soon</p>
      <p className='lh-copy black-70 f6 mt2'>
        Release date: 19<span className='f7 v-top'>th</span> of September 2019
      </p>
    </React.Fragment>
  )
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}
