import React, { Children } from 'react'
import { LinkedNode, Page, TrainingPage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, assets as layoutAssets, InlineMarkdown, SpecialListItem, Testimonal} from './layout'
import dayjs from 'dayjs'
import {Image, Img, Script, Javascript} from './assets'
import { PrimaryButton } from './homepage';

const benefits = [
  '**Get started with Kubernetes in your next project** and you need to quickly get up to speed in deploying and scaling your Node.js, Java, .NET, Scala, etc. microservices',
  '**Design and architect micro services on Kubernetes** that leverage the strength of distributed systems',
  '**Design applications that can be deployed on AWS, GCP, Azure, etc.**, without requiring changing any of the application or infrastrucure code',
  '**Autoscale your clusters and applications as your service becomes more popular**',
  '**Standarise your development environments and workflow** and design processes for continuous delivery and intregration with Kubernetes',
  'Become a **Certified Kubernetes Administrator** (CKA) or **Certified Kubernetes Application Developer** (CKAD)',
]

const faqs = [
  {
    title: 'Who is this workshop for?',
    content: 'Intended for Software developers, Architects and Deployment engineers seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerized applications.',
  },
  {
    title: 'Are there any joining instructions?',
    content: 'You will receive the joining instructions with all the material needed to run the course after you sign up for a particular course.',
  },
  {
    title: 'What version of k8s was this created for?',
    content: 'The material was authored for Minikube 0.28, Kubernetes 1.10, Helm 2.9',
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to <a href=\'mailto:hello@learnk8s.io\' className=\'link navy underline\'>hello@learnk8s.io</a> with a copy of your receipt and I will refund you.`
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! <a href=\'https://docs.google.com/forms/d/e/1FAIpQLSc8dT07y92OHVH4JjkXAoDvB34nR0i-G2CpwkRfiwph77xTDQ/viewform\' className=\'link underline navy\'>Fill out this form</a> with some proof that you are a student and we'll send you a discount code. This applies to anyone in any type of schooling, including evening classes and coding bootcamps!`
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to <a href=\'mailto:hello@learnk8s.io\' className=\'link navy underline\'>hello@learnk8s.io</a>.`
  },
]

function mailto({subject, body}: {subject: string, body: string}) {
  return `mailto:hello@learnk8s.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const publicCourseEnquiry = (date: dayjs.Dayjs, location: Location) => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the Kubernetes course that will be held on the ${date.format('Do')} of ${date.format('MMMM')} in ${location}.\n\nKind regards,\n`})

const privateGroupEnquiry = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`
}

const newLocationEnquiry = {
  subject: 'Advanced Kubernetes training — New location enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know when you plan to visit ________.\n\nBest regards,\n`
}

const customRequest = {
  subject: 'Advanced Kubernetes training — Module enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know if you cover _______ in your course.\n\nBest regards,\n`
}

enum Country {
  NORTH_AMERICA = 'namerica',
  EUROPE = 'europe',
  ASIA = 'asia',
}

enum Location {
  ONLINE = 'Online',
  LONDON = 'London, UK',
  MILAN = 'Milan, Italy',
  SAN_FRANCISCO = 'San Francisco, US',
  TORONTO = 'Toronto, Canada',
  SINGAPORE = 'Singapore',
}

enum Days {
  TWO_DAYS = '2 days',
  THREE_DAYS = '3 days',
}

enum CourseName {
  BASIC = 'Deploying and scaling applications in Kubernetes',
  ADVANCED = 'Advanced Kubernetes training',
}

interface CourseEvents {
  date: dayjs.Dayjs
  title: CourseName
  courseInDays: Days
  location: Location
  price: string
  startsAt: string
  country: Country
}

const events: CourseEvents[] = [
  {
    date: dayjs('2019-02-25'),
    title: CourseName.BASIC,
    courseInDays: Days.TWO_DAYS,
    location: Location.LONDON,
    price: '£1225',
    startsAt: '9:30 am GMT (London)',
    country: Country.EUROPE,
  },
  {
    date: dayjs('2019-03-4'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.MILAN,
    price: '2050€',
    startsAt: '9:30 am CET (Rome)',
    country: Country.EUROPE,
  },
  {
    date: dayjs('2019-03-20'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.ONLINE,
    price: '£1950',
    startsAt: '9:30 am GMT (London)',
    country: Country.EUROPE,
  },
  {
    date: dayjs('2019-03-25'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.SAN_FRANCISCO,
    price: '$2550',
    startsAt: '9:30 am PST (San Francisco)',
    country: Country.NORTH_AMERICA,
  },
  {
    date: dayjs('2019-03-27'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.LONDON,
    price: '£1950',
    startsAt: '9:30 am GMT (London)',
    country: Country.EUROPE,
  },
  {
    date: dayjs('2019-04-15'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.SINGAPORE,
    price: 'S$3400',
    startsAt: '9:30 am GST (Singapore)',
    country: Country.ASIA,
  },
  {
    date: dayjs('2019-05-13'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.TORONTO,
    price: 'C$3300',
    startsAt: '9:30 am EST (Toronto)',
    country: Country.EUROPE,
  },
  {
    date: dayjs('2019-05-15'),
    title: CourseName.ADVANCED,
    courseInDays: Days.THREE_DAYS,
    location: Location.ONLINE,
    price: '£1950',
    startsAt: '9:30 am GMT (London)',
    country: Country.EUROPE,
  }
]

export const assets = {
  page: {
    tick: Image({url: 'assets/training/tick.svg', description: 'Tick'}),
    slack: Image({url: 'assets/training/slack_in_colours.svg', description: 'Slack'}),
    downArrow: Image({url: 'assets/training/down_arrow_white.svg', description: 'Down'}),
    training: Image({url: 'assets/training/training.svg', description: 'Training'}),
    cargoLoading: Image({url: 'assets/training/more_cargo_loading.svg', description: 'Cargo loading'}),
    previewDocker: Image({url: 'assets/training/docker.png', description: 'Linux containers and Kubernetes'}),
    previewZero: Image({url: 'assets/training/zero.png', description: 'Zero to Kubernetes'}),
    previewDeployments: Image({url: 'assets/training/deploy.png', description: 'Deployment strategies'}),
    previewArchitecture: Image({url: 'assets/training/architecture.png', description: 'Kubernetes architecture'}),
    previewNetworking: Image({url: 'assets/training/networking.png', description: 'Kubernetes networking'}),
    previewState: Image({url: 'assets/training/state.png', description: 'Managing state with Kubernetes'}),
    previewTemplating: Image({url: 'assets/training/templating.png', description: 'Templating Kubernetes resources'}),
    previewOptionals: Image({url: 'assets/training/optionals.png', description: 'Optional modules'}),
    toggle: Javascript({script: `(${CreateToggle.toString()})()`})
  },
  layout: layoutAssets,
}

export const Training: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<TrainingPage>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>

      <Navbar root={root} assets={assets.layout}/>

      <section className='flex-ns items-start-ns ph5-l pt5-l'>
        <div className='w-100 w-70-l'>
          <h1 className='f1 pl3 pl4-ns pt4-l f-subheadline-l'>Kubernetes training</h1>
          <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>Learn how to deploy and scale applications with Kubernetes.</h2>
          <ul className='list w-60-m center-m mw6 bg-white black-70 ph3 pv1 shadow-1 mh3 mh4-ns mt4'>
            <li className='flex items-center justify-between ph2 bb b--light-gray'>
              <p className='ttu'>Private courses</p>
              <div className='w2 h2'><Img image={assets.page.tick}/></div>
            </li>
            <li className='flex items-center justify-between ph2'>
              <p className='ttu'>Public courses</p>
              <div className='w2 h2'><Img image={assets.page.tick}/></div>
            </li>
            <li className='flex items-center justify-between ph2 bb b--light-gray'>
              <p className='ttu v-mid mt2 mb1'>Online courses <span className='dib w2 v-mid'><Img image={assets.page.slack}/></span></p>
              <div className='w2 h2'><Img image={assets.page.tick}/></div>
            </li>
          </ul>
          <div className='dn db-l mw6 mh3 mh4-ns tc'>
            <div className='w3 h3 dib'><Img image={assets.page.downArrow}/></div>
          </div>
        </div>
        <div className='dn db-l i-training absolute bottom-0 right-1'><Img image={assets.page.training}/></div>
      </section>
    </div>

    <section className='content ph3 ph4-ns flex items-center justify-center pt5-ns relative z3'>
      <div className='dn db-l w-50-l center'>
      <div className='i-more-cargo-loading center'><Img image={assets.page.cargoLoading}/></div>
      </div>

      <div className='w-50-l center pt3'>
      <h2 className='f3 navy f2-l measure-narrow'>Instructor-led, hands-on courses</h2>
      <div className='measure-wide'>
        <p className='lh-copy f4-l black-70'>These courses are great if you wish to:</p>
        <ul className='list black-70 pl0 pt2'>{benefits.map(it => <ListItem assets={assets.layout}><InlineMarkdown content={it} /></ListItem>)}</ul>
      </div>
      </div>
    </section>

    <Interlude assets={assets.layout}/>

    <section className='cf pt5'>
    <ul className='pl0 list'>
    <li className='fl-ns w-50-ns'>
        <div className={`mv3 mh3 ml4-ns mr2-ns bg-black-02`}>
          <div className='header ph3 pt1 bb b--light-gray'>
              <h2 className='navy tc mb1'>Advanced Kubernetes Course</h2>
              <h3 className='normal black-70 tc mt0'>Most popular option — 3 days course</h3>
          </div>
          <PackageFeatures assets={assets.layout} description='The course lasts three days and you can choose from Kubernetes core modules and a selection of popular optional module. You will learn how to:' benefits={[
                  'Package applications in Linux containers',
                  'Deploy containers in Kubernetes',
                  'Zero downtime deployment strategies in Kubernetes',
                  'How to expose services to the public internet',
                  'The Kubernetes architecture and core components',
                  'The Kubernetes networking model',
                  'Autoscaling the cluster and the applicaions',
                  'Secure your cluster and your network',
                  'Design automated processes to leverage Kubernetes and continuon integration',
          ]}/>
          <p className='tc pb4'><PrimaryButton text='Learn more ⇢' anchor='#start'></PrimaryButton></p>
        </div>
      </li>
      <li className='fl-ns w-50-ns mt5-ns'>
        <div className={`mv3 mh3 ml2-ns mr4-ns bg-evian`}>
          <div className='header ph3 pt1 bb b--light-gray'>
              <h2 className='navy tc mb1'>Kubernetes Private Training</h2>
              <h3 className='normal black-70 tc mt0'>Make your own course</h3>
          </div>
          <PackageFeatures assets={assets.layout} description='The private training course is excellent if you wish to customise your learning path to adopt Kubernetes.' benefits={[
            'Pick the modules relevant to your team',
            'Deep dive into the content with a three, four or five days course',
            'Delivered on site, remotely or in a cozy meeting room',
            'Classes from 10+ delegates',
          ]}>
            <SpecialListItem assets={assets.layout}><span className='b'>Perfect for the Certified Kubernetes Administrator (CKA) exam</span> (exam not included and optional)</SpecialListItem>
          </PackageFeatures>
          <p className='tc pb4'><PrimaryButton text='Get in touch ⇢' mailto={mailto(privateGroupEnquiry)}></PrimaryButton></p>
        </div>
      </li>
    </ul>
    </section>

    <Testimonal quote='The training is very well prepared and also very well performed.' author='Przemek Anuszek, Senior engineer' />

    <section className='bg-evian pt4' id='start'>
      <p className='f2 navy b tc ph3'>Advanced Kubernetes course modules</p>
      <p className='lh-copy f4 black-70 measure center tc ph3'>The advanced course is made 6 core modules that are designed to last 2 full days. You're recommended to select 4 optional modules for the third day, but you choose more if you wish.</p>

      <div className='ma3 ma5-l flex-l flex-wrap justify-center'>
        <DashboardModule className='w-40-l' preview={assets.page.previewDocker} title='1. Linux containers and Kubernetes' description={`Kubernetes doesn't know how to deploy Java, Node.js, or .NET applications. The only thing it can deal with is Linux containers. But how do these Linux containers work? Why should you care? Are those necessary to master Kubernetes?`}>
          <p className='lh-copy measure-wide'>You will learn how to package and run applications in Docker containers. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Running containers</li>
            <li className='lh-copy mv1'>Docker registries</li>
            <li className='lh-copy mv1'>Mounting volumes</li>
            <li className='lh-copy mv1'>Building Docker images</li>
            <li className='lh-copy mv1'>Exposing ports</li>
            <li className='lh-copy mv1'>Containers lifecycle</li>
            <li className='lh-copy mv1'>Injecting environment variables</li>
            <li className='lh-copy mv1'>Debugging running containers</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewZero} title='2. Zero to k8s' description='Learn the basics of Kubernetes and deploy your first application to minikube — a Kubernetes cluster for local development. Learn how to declare resources in YAML files, how to send those to the cluster and retrieve them. Understand how Kubernetes reconciles the desired state of the infrastructure.'>
          <p className='lh-copy measure-wide'>You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Creating a local cluster</li>
            <li className='lh-copy mv1'>Creating deployments</li>
            <li className='lh-copy mv1'>Exposing applications</li>
            <li className='lh-copy mv1'>Scaling apps</li>
            <li className='lh-copy mv1'>Test failover</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewDeployments} title='3. Deployment strategies' description={`Every time you deploy new features in production you don't want to stop your service, load a new version and remove the holding page. Ideally, you should be able to transition to a new version of your application without anyone noticing any downtime. You can leverage Kubernetes to do that.`}>
          <p className='lh-copy measure-wide'>You will learn different techniques to deploy your applications with zero downtime. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Rolling updates</li>
            <li className='lh-copy mv1'>Services and selectors</li>
            <li className='lh-copy mv1'>Canary deployments</li>
            <li className='lh-copy mv1'>Blue-green deployments</li>
            <li className='lh-copy mv1'>Rollbacks</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewArchitecture} title='4. Kubernetes Architecture' description={`When you deploy applications to Kubernetes you don't decide in which server a container is scheduled. Kubernetes abstracts your data centre into a single entity, and you don't get to worry about the underlying resources. But how does Kubernetes work its magic?`}>
          <p className='lh-copy measure-wide'>You will learn the core components in Kubernetes and how they work. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Creating a three nodes cluster</li>
            <li className='lh-copy mv1'>The control plane</li>
            <li className='lh-copy mv1'>The kubelet: the Kubernetes agent</li>
            <li className='lh-copy mv1'>The API server</li>
            <li className='lh-copy mv1'>Testing resiliency</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewNetworking} title='5. Networking in Kubernetes' description={`How do you route traffic from the internet to your applications? How can you secure your communication with TLS? How about path routing to different services? In this module, you will explore how the traffic is routed in the cluster.`}>
          <p className='lh-copy measure-wide'>You will learn how the traffic flows inside the cluster. You will also learn how to expose your apps to the public internet. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Exploring the Endpoints</li>
            <li className='lh-copy mv1'>In-cluster load balancing</li>
            <li className='lh-copy mv1'>kube-proxy</li>
            <li className='lh-copy mv1'>The four kind of Services</li>
            <li className='lh-copy mv1'>Installing and debugging the Ingress</li>
            <li className='lh-copy mv1'>Service discovery</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewState} title='6. Managing state in Kubernetes' description={`How does Kubernetes store files and state? Can you host databases in it? Should you? Can you extract configurations and share them with different deployments? How do you make sure that your storage layer is replicated and persisted even if a node becomes unavailable?`}>
          <p className='lh-copy measure-wide'>You will learn how to persist data in Kubernetes. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Managing configurations</li>
            <li className='lh-copy mv1'>Managing secrets</li>
            <li className='lh-copy mv1'>Persisting changes</li>
            <li className='lh-copy mv1'>Dynamic volume provisioning</li>
            <li className='lh-copy mv1'>Stateful workloads</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewTemplating} title='7. Templating' description={`Resources in Kubernetes are described as YAML files. If you wish to have the same resources for different environments such as development, preproduction and production you may be tempted to copy the files three times. Or you could use a templating engine. Learn how to do precisely that with Helm — the Kubernetes package manager.`}>
          <p className='lh-copy measure-wide'>You will learn how to template resources for different environments. The module covers the following topics:</p>
          <ul>
            <li className='lh-copy mv1'>Creating reusable templates</li>
            <li className='lh-copy mv1'>Helm's templating engine</li>
            <li className='lh-copy mv1'>Releases lifecycle</li>
            <li className='lh-copy mv1'>Writing helpers</li>
            <li className='lh-copy mv1'>Rollbacks</li>
          </ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewTemplating} title='Optionals' description={`Kubernetes is a vast subject and there're many other topics you might be interested in such what's the best autoscaler and how you should secure your cluster. If you worked in a regulated environment, you could find interesting advanced allocations: scheduling workloads only on specific Nodes.`}>
          <p className='lh-copy measure-wide'>You can pick and choose from the modules below. Looking for something in particular? <a className='link underline' href={mailto(customRequest)}>Get in touch!</a></p>
          <ul>
            <li className='lh-copy mv1'>Advanced networking</li>
            <li className='lh-copy mv1'>Security</li>
            <li className='lh-copy mv1'>Autoscaling</li>
            <li className='lh-copy mv1'>Advanced scheduling</li>
            <li className='lh-copy mv1'>Multi-cloud, multi-data centre deployments</li>
            <li className='lh-copy mv1'>Service meshes</li>
            <li className='lh-copy mv1'>Extending and customising Kubernetes</li>
          </ul>
        </DashboardModule>
      </div>

      <div className='pt5-m pb4 pb5-ns ph3 measure-wide center'>
        <p className='f3 mb1 mt0 lh-copy'>&ldquo;The training is very well prepared and also very well performed.&rdquo;</p>
        <p className='f4 i mb2'>— Przemek Anuszek, Senior engineer</p>
      </div>
    </section>

    <section id='start' className='w-60-ns ph3 center pt3 pb3 pb5-l'>
      <h2 className='navy f4 f3-l'>Upcoming events</h2>

      <input className='dn' defaultChecked id='all' type='radio' name='country' />
      <input className='dn' id='namerica' type='radio' name='country' />
      <input className='dn' id='europe' type='radio' name='country' />
      <input className='dn' id='asia' type='radio' name='country' />
      <ul className='legend list pl0 flex'>
        <li className='all dib pa2 navy bb bw1 b--near-white bg-evian br1 br--left'><label htmlFor='all'>All</label></li>
        <li className='namerica dib pa2 navy bb bw1 b--near-white bg-evian'><label htmlFor='namerica'>North America</label></li>
        <li className='europe dib pa2 navy bb bw1 b--near-white bg-evian'><label htmlFor='europe'>Europe</label></li>
        <li className='asia dib pa2 navy bb bw1 b--near-white bg-evian br1 br--right'><label htmlFor='asia'>Asia</label></li>
      </ul>

      <ul className='events list pl0 pt3'>{events.map(it => {
        return <li className={it.country}>
          <div className='mv3 flex-ns items-start pb3 pb0-l'>
            <div className='date bg-sky w3 h3 white tc b'>
              <p className='f2 ma0'>{it.date.format('D')}</p>
              <p className='ttu ma0'>{it.date.format('MMM')}</p>
            </div>
            <div className='bg-evian ph4 pt2 flex-auto'>
              <h3 className='f3 ma0 mt3 mb2'>{it.title}</h3>
              <h4 className='normal black-70 mt1 mb4'>{it.courseInDays} course</h4>
              <p className='ma0 mv3'><span className='ttu b black-20 f6 v-mid'>Location:</span> <span></span>&nbsp;
              {it.location === Location.ONLINE ?
                <span className='link dib navy v-mid'>{it.location} <span className='w1 v-mid dib'><Img image={assets.page.slack}/></span></span> :
                <span className='link dib navy underline v-mid'>{it.location}</span>
              }
              </p>
              <p className='ma0 mv3'><span className='ttu b black-20 f6'>Starts at</span> <span className='f5 black-70 dib'>{it.startsAt}</span></p>
              <p className='ma0 mv3'><span className='ttu b black-20 f6'>Price</span> <span className='f4 black-70 relative dib'>{it.price} <span className='f7 v-mid absolute right--2 top-0'>+TAX</span></span></p>
              <p><PrimaryButton text='Get in touch &#8594;' mailto={mailto(publicCourseEnquiry(it.date, it.location))}/></p>
            </div>
          </div>
        </li>
      })}</ul>

      <p className='f2 navy b tc mb2 pt4-ns pt2'>Your city is not on the list?</p>
      <p className='lh-copy f4 black-70 measure center tc'>Don't worry. We run in-person class rooms in Europe, North America and Asia. If your city is not on the list, drop us a line at <a className='link underline' href={mailto(newLocationEnquiry)}>hello@learnk8s.io</a> and will try to make it happen.</p>
    </section>

    <YourTeam />

    <section className='ph3 measure-wide pv4 center'>
      <h3 className='f3 f2-l navy pb3'>Frequently asked questions</h3>
      <ul className='list pl0'>{faqs.map(it => {
        return <li>
          <h4 className='navy f4 f3-l mb2'>{it.title}</h4>
          <p className='lh-copy black-70' dangerouslySetInnerHTML={{__html: it.content}}></p>
        </li>
      })}
      </ul>
    </section>

    <Consultation />
    <Footer root={root} assets={assets.layout}/>
    <Script script={assets.page.toggle}></Script>
  </Layout>
}

export const YourTeam: React.StatelessComponent<{}> = ({children}) => {
  return <section className='trapezoidr-1 white flex-l items-end-l justify-around-l'>
    <div className='pt5-m pt4 pb4 ph3'>
      <h2 className='f2 mb2'>Need to train your team?</h2>
      <h3 className='normal mb1 measure-wide mt0 lh-copy'>We offer flexible, cost-effective group membership for businesses, schools or government organisations.</h3>
    </div>
    <div className='ph3 pb4'>
      <a href={mailto(privateGroupEnquiry)} className='link dib blue bg-white br1 pa3 b f5 shadow-3 ph4'>Get in touch &#8594;</a>
    </div>
  </section>
}

export const PackageFeatures: React.StatelessComponent<{description: string, benefits: string[], assets: typeof layoutAssets}> = ({benefits, description, children, assets}) => {
  return <div className='content ph4 pb4'>
    <div className='list pl0 black-70'>
      <p className='lh-copy pt3 f4-l measure center'>{description}</p>
      <ul className='list pl0'>
        {benefits.map(benefit => <ListItem assets={assets}>{benefit}</ListItem>)}
        {children}
      </ul>
    </div>
  </div>
}

export const DashboardModule: React.StatelessComponent<{title: string, description: string, preview: Image, className?: string}> = ({children, title, description, preview, className}) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return <div className={`mh3 ${className}`}><div className='module bl bw3 b--sky pt1 pb3 ph4 shadow-2 mv4 bg-white'>
    <p className='f3 navy b bb b--black-20 pb3'>{title}</p>
    <div className=''>
      <div className='w-80 center'>
        <Img image={preview} />
      </div>
      <div className=''>
        <p className='f5 lh-copy measure-wide'>{description}</p>
        <div className={`controls controls-${id}`}>
          <button className='open dib ba b--sky sky pv2 ph3 b f5 br2 hover-bg-evian pointer bg-white' data-toggle={`.details-${id},.controls-${id}`} data-toggle-collapsed>View details</button>
          <button className='close dib ba b--light-gray gray pv2 ph3 b f5 br2 ml2 bg-light-gray hover-bg-moon-gray hover-dark-gray pointer' data-toggle={`.details-${id},.controls-${id}`}>Hide details</button>
        </div>
        <div className={`details details-${id}`}>{children}</div>
      </div>
    </div>
  </div></div>
}

function CreateToggle() {
  function Toggle(element: Element) {
    const target = element.getAttribute('data-toggle')
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

  document.querySelectorAll('[data-toggle]').forEach(element => {
    element.addEventListener('click', () => Toggle(element))
  })
  document.querySelectorAll('[data-toggle-collapsed]').forEach(Toggle)
}
