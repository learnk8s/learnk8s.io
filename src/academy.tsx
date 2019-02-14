import React from 'react'
import { LinkedNode, Page, getFullUrl, findOrPanic, PageName, AcademyPage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, assets as layoutAssets, SpecialListItem, Testimonal, MailTo, mailto, YourTeam, FAQs, FAQ} from './layout'
import {Image, Img, Script, Javascript} from './assets'

export const assets = {
  page: {
    training: Image({url: 'assets/academy/training.svg', description: 'Training'}),
    down: Image({url: 'assets/academy/down_arrow_white.svg', description: 'Down'}),
    together: Image({url: 'assets/academy/together.svg', description: 'Team'}),
    tick: Image({url: 'assets/academy/tick.svg', description: 'Tick'}),
  },
  layout: layoutAssets
}

interface AcademyModule {
  name: string
  description: string
  topics: string[]
}

const modules: AcademyModule[] = [{
  name: 'Docker fundamentals',
  description: `Kubernetes doesn't know how to deploy Java, Node.js, or .NET applications. The only thing it can deal with is Linux containers. But how do these Linux containers work? Why should you care? Are those necessary to master Kubernetes?`,
  topics: [
    'Containers VS VMs',
    'Understanding process isolation',
    'Is Docker the one?',
    'Running containers',
    'Using Docker registries',
    'Mounting volumes',
    'Building Docker images',
    'Exposing ports',
    'Managing containers lifecycle',
    'Injecting environment variables',
    'Debugging running containers',
  ],
}, {
  name: 'Zero to Kubernetes',
  description: 'Learn the basics of Kubernetes and deploy your first application to minikube — a Kubernetes cluster for local development. Learn how to declare resources in YAML files, how to send those to the cluster and retrieve them. Understand how Kubernetes reconciles the desired state of the infrastructure.',
  topics: [],
}, {
  name: 'Deployment strategies',
  description: `Every time you deploy new features in production you don't want to stop your service, load a new version and remove the holding page. Ideally, you should be able to transition to a new version of your application without anyone noticing any downtime. You can leverage Kubernetes to do that.`,
  topics: [],
}, {
  name: 'Kubernetes architecture',
  description: `When you deploy applications to Kubernetes, you don't decide in which server a container is scheduled. Kubernetes abstracts your data centre into a single entity, and you don’t get to worry about the underlying resources. But how does Kubernetes work its magic?`,
  topics: [],
}, {
  name: 'Kubernetes networking',
  description: `How do you route traffic from the internet to your applications? How can you secure your communication with TLS? How about path routing to different services? In this module, you will explore how the traffic is routed in the cluster.`,
  topics: [],
}, {
  name: 'Managing state',
  description: `How does Kubernetes store files and state? Can you host databases in it? Should you? Can you extract configurations and share them with different deployments? How do you make sure that your storage layer is replicated and persisted even if a node becomes unavailable?`,
  topics: [],
}, {
  name: 'Templating Kubernetes resources',
  description: `Resources in Kubernetes are described as YAML files. If you wish to have the same resources for different environments such as development, preproduction and production you may be tempted to copy the files three times. Or you could use a templating engine. Learn how to do precisely that with Helm — the Kubernetes package manager.`,
  topics: [],
}]

const extraModules: AcademyModule[] = [{
  name: 'Multi-cloud, multi-data centre',
  description: 'Learn how to design clusters that span multiple cloud providers for resilience, disaster recovery or just saving money.',
  topics: [],
}, {
  name: 'EKS, AKS, GKE',
  description: 'Discover the nitty-gritty details of how AKS, EKS and GKE work and their strength and limitations.',
  topics: [],
}, {
  name: 'Security',
  description: 'Wear your black hat and try to break the cluster. Study mitigation and countermeasure to secure your cluster against malicious attacks.',
  topics: [],
}, {
  name: 'Advanced networking',
  description: 'Dive into the specifics of network interfaces, IP addresses and network topologies in this session about advanced Kubernetes networking.',
  topics: [],
}, {
  name: 'Advanced scheduling',
  description: 'Master advanced placements of workloads in your infrastructure. Learn how to schedule machine learning deployments to nodes with GPU or how you can segregate workloads for regions (useful if you need to comply with policies and regulations).',
  topics: [],
}, {
  name: 'CI/CD pipelines',
  description: 'Learn how to design CI/CD pipelines that leverage containers and Kubernetes. Ship software quicker, more reliably and cheaply.',
  topics: [],
}]

const individualPackage: MailTo = {
  subject: 'Learnk8s Academy',
  body: `Hi Learnk8s,\n\nLet me know when the Academy is ready.\n\nThanks,\n`,
  email: 'hello@learnk8s.io',
}

const businessPackage: MailTo = {
  subject: 'Learnk8s Academy',
  body: `Hi Learnk8s,\n\nLet me know when the Academy is ready. I'd like to buy lincenses in bulk for ______ users.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
}

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const faqs: FAQ[] = [{
  title: `I'm starting out. Is this right for me?`,
  content: 'Of course. The academy and our online courses are meant for developers that have little to no experience in containers nor Kubernetes.',
}, {
  title: 'What happens after I buy the access for the course?',
  content: `You'll be given an account where you can access the course at any time and from any web browser (desktop, tablet, or mobile). You can log in and start learning Kubernetes.`,
}, {
  title: 'What version of Kubernetes was this created for?',
  content: 'The material was authored for Minikube 0.28, Kubernetes 1.10, Helm 2.9',
}, {
  title: `What if I'm not thrilled?`,
  content: `We want to make sure you get real value out of this so we only want your money if you are happy with the product! If you aren't satisfied, please send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and I will refund you.`
}, {
  title: 'Do you offer a student discount?',
  content: `Absolutely! [Fill out this form](https://docs.google.com/forms/d/e/1FAIpQLSc8dT07y92OHVH4JjkXAoDvB34nR0i-G2CpwkRfiwph77xTDQ/viewform) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any type of schooling, including evening classes and coding bootcamps!`
}, {
  title: 'I have another question!',
  content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`
}]

export const Academy: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<AcademyPage>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
      <Navbar root={root} assets={assets.layout}/>

      <section className='ph5-l pt5-l'>
        <h1 className='f1 mt1-l pt2-l f-subheadline-l ph4 w-60 lh-solid'>Self-paced Kubernetes online course</h1>
        <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>Become an expert in deploying applications at scale.</h2>
        <div className='dn db-l i-training absolute bottom-0 right-1'><Img image={assets.page.training}/></div>
        <div className='dn db-l measure mh3 mh4-ns tc'>
            <div className='w3 h3 dib'><Img image={assets.page.down}/></div>
        </div>
      </section>
    </div>

    <section className='ph3 ph4-ns flex items-center relative z3'>

      <div className='dn db-l w-50-l'>
        <div className='i-together center'><Img image={assets.page.together}/></div>
      </div>

      <div className='w-50-l center pt3'>
        <h2 className='f3 navy f2-l measure-narrow'>Learn Kubernetes at your pace</h2>
        <div className='measure-wide'>
          <p className='lh-copy f4-l black-70'>With a focus on simplicity and readability, this course will have you deploying and scaling applications in no time!</p>
          <ul className='list black-70 pl0 pt2'>
            {[
              'Gain hands-on experience in deploying and scaling applications',
              'Level up your expertise by solving challenges from real-world use cases',
              'Learn best practices from the experts and how to do things the Kubernetes way™',
              'Speak the Kubernetes jargon and talk to the rest of the Cloud Native community',
              'Gain valuable knowledge by getting your hands dirty and trying things for yourself',
              'Become an expert faster with laser-focused materials and labs (no fluff!)',
              'Help to shape your company\'s roadmap to cloud-native technologies',
              'Empower your team to operate and use Kubernetes like experts',
              'Quickly onboard new members your team to the same level as everyone else',
            ].map((it, index) => <ListItem key={index} assets={assets.layout}>{it}</ListItem>)}
          </ul>
        </div>
      </div>

    </section>

    <Interlude assets={assets.layout}/>

    <section className='w-100 ph3 ph4-ns flex items-center justify-center pb4'>

      <div className='center pt3'>
        <h2 className='f3 navy f2-l measure-narrow'>You will learn how to</h2>
        <div className='measure-wide'>
          <ul className='list black-70 pl0 pt2'>
            {[
              'Standardise your tools, workflows and deployments under a single tool',
              'Master architecting services that span multiple clouds and data centres for resilience and failover',
              'Secure your Kubernetes cluster by breaking it',
              'Package, deploy and scale applications in Kubernetes',
              'Design cloud provider agnostic clusters',
              'Leverage the strength and avoid the weaknesses of the major Kubernetes managed service offerings (AKS, EKS, GKE)',
              'Deploy applications in production with zero downtime',
              'Monitor, log and debug production issues in Kubernetes',
              'Deploy stateful workloads such as databases',
              'Implement a CI/CD delivery pipeline that leverages containers and Kubernetes for speed and reliability',
            ].map((it, index) => <ListItem key={index} assets={assets.layout}>{it}</ListItem>)}
            <SpecialListItem assets={assets.layout}>Everything you need to pass your certification as a Certified Kubernetes Administrator (CKA) and Kubernetes Application Developer (CKAD)</SpecialListItem>
          </ul>
        </div>
      </div>

      <div className='dn db-l center'>
        <div className='i-together center'><Img image={assets.page.together}/></div>
      </div>

    </section>

    <Testimonal author='Przemek Anuszek, Senior engineer' quote='The training is very well prepared and also very well performed.'/>

    <section className="bg-evian pt4">
      <p className="f2 navy b tc">What's inside</p>
      <p className="lh-copy f4 black-70 measure center tc">Inside this course, you'll find all the know-how, scripts, documents, templates, code, and more you need to learn Kubernetes and its ecosystem.</p>

      <div className="ma3 ma5-l pa3 pa5-l bg-white shadow-1">

        {modules.map((it, index) => {
          return <div key={index} className="flex-l">

            <div className="w-30-l">
              <h2 className="navy b lh-solid">{index + 1}. {it.name}</h2>
              <p className="lh-copy black-70 measure">{it.description}</p>
            </div>

            <div className="w-70-l">
              <ul className="list pa2 flex flex-wrap">
                {it.topics.map((it, index) => {
                  return <li key={index} className="w-50 w-20-l pa3 pt0">
                    <h3 className="f6 navy">{it}</h3>
                  </li>
                })}
              </ul>
            </div>

          </div>
        })}

        <div className="flex-l">

          <div className="w-30-l">
            <h2 className="navy b lh-solid">Extras</h2>
            <p className="lh-copy black-70 measure">You can tune in to the following live classes.</p>
          </div>


          <div className="w-70-l">
            <ul className="list pa2">
              {extraModules.map((it, index) => {
                return <li key={index} className="w-100 pa3 pt0 flex-l items-start">
                <div className="w-20-l">
                  <img src="{{ module.image }}" alt="{{ module.title }}" className="br1 grow reverse-dim"/>
                </div>
                <div className="w-80-l ml4-l">
                  <h3 className="f5 navy">{it.name}</h3>
                  <p className="measure-wide lh-copy">{it.description}</p>
                </div>
              </li>
              })}
            </ul>
          </div>

        </div>

      </div>

      <div className="pt5-m pt4 pb5 ph3 measure-wide center black-80">
        <p className="f3 mb1 mt0 lh-copy">I cemented my understanding of Kubernetes and can now use that to start implementing and furthering my knowledge with real examples and workflows. Next stop, production experience.</p>
        <p className="f4 i mb2">— David Heward, Senior DevOps Engineer</p>
      </div>

    </section>

    <section className="cf pt5">

      <div className="fl-ns w-50-ns">
        <div className="mv3 mh3 ml4-ns mr2-ns bg-black-02">
          <div className="header ph3 pt1 bb b--light-gray">
              <h2 className="navy tc mb1">Basic package</h2>
              <h3 className="normal black-70 tc mt0">6 modules</h3>
          </div>
          <div className="content ph3 pb4">
            <p className="navy tc f2">£599 / $749 / 649€</p>
            <ul className="list pl0 black-70">
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">12 months access</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Docker fundamentals module</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Access to the material for all modules</p>
                <ol className="pl3">
                  <li className="mv2">Getting started with Kubernetes</li>
                  <li className="mv2">Deployment strategies</li>
                  <li className="mv2">Kubernetes architecture</li>
                  <li className="mv2">Kubernetes networking</li>
                  <li className="mv2">Managing state</li>
                  <li className="mv2">Helm</li>
                  <li className="mv2">Advanced networking</li>
                </ol>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy"><span className="b">All source code</span> — build files, scripts and files for each module</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Access to all interactive challenges</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy"><span className="b">All source code</span> — build files, scripts and files for each module</p>
              </Item>
            </ul>
            <div className="tc">
              <a href={mailto(individualPackage)} className="link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4">Register your interest &#8594;</a>
            </div>
          </div>
        </div>
      </div>

      <div className="fl-ns w-50-ns">
        <div className="mv3 mh3 ml2-ns mr4-ns bg-evian">
          <div className="header ph3 pt1 bb b--light-gray">
              <h2 className="navy tc mb1">Business package</h2>
              <h3 className="normal black-70 tc mt0">6 modules + extras</h3>
          </div>
          <div className="content ph3 pb4">
            <p className="navy tc f2">£799 / $999 / 899€</p>
            <ul className="list pl0 black-70">
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">12 months access</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Docker fundamentals module</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Access to the material for all modules</p>
                <ol className="pl3">
                  <li className="mv2">Getting started with Kubernetes</li>
                  <li className="mv2">Deployment strategies</li>
                  <li className="mv2">Kubernetes architecture</li>
                  <li className="mv2">Kubernetes networking</li>
                  <li className="mv2">Managing state</li>
                  <li className="mv2">Helm</li>
                  <li className="mv2">Advanced networking</li>
                </ol>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy"><span className="b">All source code</span> — build files, scripts and files for each module</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy b">Access to all interactive challenges</p>
              </Item>
              <Item tick={assets.page.tick}>
                <p className="mv0 f4-l lh-copy"><span className="b">All source code</span> — build files, scripts and files for each module</p>
              </Item>
            </ul>
            <div className="tc">
              <a href={mailto(businessPackage)} className="link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4">Register your interest &#8594;</a>
            </div>
          </div>
        </div>
      </div>

    </section>

    <YourTeam mailto={mailto(privateGroupEnquiry)}/>

    <FAQs faqs={faqs}/>

    <Consultation />
    <Footer root={root} assets={assets.layout}/>
  </Layout>
}

export const Item: React.StatelessComponent<{tick: Image}> = ({children, tick}) => {
  return <li className="mv3 flex justify-center">
    <div className="v-top tc"><Img image={tick} className='w2 h2'/></div>
    <div className="v-top pl3 w-90">{children}</div>
  </li>
}