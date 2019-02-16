import React from 'react'
import { LinkedNode, Page, getFullUrl, findOrPanic, PageName, AcademyPage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, assets as layoutAssets, SpecialListItem, Testimonal, MailTo, mailto, YourTeam, FAQs, FAQ} from './layout'
import {Image, Img, Script, Javascript} from './assets'
import {material} from './material'

export const assets = {
  page: {
    training: Image({url: 'assets/academy/training.svg', description: 'Training'}),
    down: Image({url: 'assets/academy/down_arrow_white.svg', description: 'Down'}),
    together: Image({url: 'assets/academy/together.svg', description: 'Team'}),
    tick: Image({url: 'assets/academy/tick.svg', description: 'Tick'}),
    preview: Javascript({script: `(${Scroll.toString()})()`}),
  },
  modules: {
    docker: {
      0: Image({url: 'assets/academy/preview1.png', description: 'Preview1'}),
      1: Image({url: 'assets/academy/preview2.png', description: 'Preview2'}),
      2: Image({url: 'assets/academy/preview3.png', description: 'Preview3'}),
    }
  },
  layout: layoutAssets,
}

interface AcademyModule {
  name: string
  description: string
  topics: Topic[]
}

interface Topic {
  name: string
  image: (a: typeof assets.modules) => Image
}

const modules: AcademyModule[] = [{
  name: material.docker.name,
  description: material.docker.description,
  topics: [{
    name: material.docker.topics[0],
    image: (a: typeof assets.modules) => a.docker[0],
  },{
    name: material.docker.topics[1],
    image: (a: typeof assets.modules) => a.docker[1],
  }, {
    name: material.docker.topics[2],
    image: (a: typeof assets.modules) => a.docker[2],
  }],
}, {
  name: material.zeroToKubernetes.name,
  description: material.zeroToKubernetes.description,
  topics: [],
}, {
  name: material.deploymentStrategies.name,
  description: material.deploymentStrategies.description,
  topics: [],
}, {
  name: material.architecture.name,
  description: material.architecture.name,
  topics: [],
}, {
  name: material.networking.name,
  description: material.networking.description,
  topics: [],
}, {
  name: material.managingState.name,
  description: material.managingState.description,
  topics: [],
}, {
  name: material.templating.name,
  description: material.templating.description,
  topics: [],
}]

const extraModules: AcademyModule[] = [{
  name: material.multiCloud.name,
  description: material.multiCloud.description,
  topics: [],
}, {
  name: material.managedServices.name,
  description: material.managedServices.description,
  topics: [],
}, {
  name: material.security.name,
  description: material.security.description,
  topics: [],
}, {
  name: material.advancedNetworking.name,
  description: material.advancedNetworking.description,
  topics: [],
}, {
  name: material.advancedScheduling.name,
  description: material.advancedScheduling.description,
  topics: [],
}, {
  name: material.pipelines.name,
  description: material.pipelines.description,
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
          return <div key={index} className="flex-l justify-between">

            <div className="w-30-l">
              <h2 className="navy b lh-solid">{index + 1}. {it.name}</h2>
              <p className="lh-copy black-70 measure">{it.description}</p>
            </div>

            <div className="w-60-l">
              <Preview modules={it.topics} assets={assets.modules}/>
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
                  <img src="module.image" alt="{{ module.title }}" className="br1 grow reverse-dim"/>
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
    <Script script={assets.page.preview}></Script>
  </Layout>
}

export const Item: React.StatelessComponent<{tick: Image}> = ({children, tick}) => {
  return <li className="mv3 flex justify-center">
    <div className="v-top tc"><Img image={tick} className='w2 h2'/></div>
    <div className="v-top pl3 w-90">{children}</div>
  </li>
}

export const Preview: React.StatelessComponent<{modules: Topic[], assets: typeof assets.modules}> = ({assets, modules}) => {
  return <div className='preview-js'>
    <div className='academy-js flex w-100'>
      <div className='left-pane-js w-30 bg-evian ph4 pv2'>
        <div className='mt3 pt3 h1 bg-navy'></div>
        <div className='pr3'>
        {RandomBlocks({blocks: [
          [0, 3, 2, 1, 0],
          [1, 0, 2, 0, 1],
        ]})}
        </div>
      </div>
      <div className='w-70 bg-black-05'>
        <div className='bg-sky h2 w-100'></div>
        <div className='relative'>
          <div className='bg-black-05 ph1 h-100 absolute top-0 right-0 z-1'></div>
          <div className='progress-bar-js bg-black-10 ph1 h4 absolute top-0 right-0 z-3'></div>
          <div className='right-pane-js overflow-hidden'>
          <div className='scrollable-content-js w-80 center mv4'>
            <div className='w-40 mt3 pt3 h1 bg-black-50 mb3'></div>
            <div className='bg-black-20 pa1 mv2 mr5'></div>
            <div className='bg-black-20 pa1 mv2 mr3'></div>
            <div className='pv2'>{modules[0] ? <div className='relative padding-hack-75'><Img image={modules[0].image(assets)} className='br1 absolute top-0 left-0'/></div> : null}</div>
            <div className='bg-black-20 pa1 mv2 mr5'></div>
            <div className='bg-black-20 pa1 mv2'></div>
            <div className='w-20 bg-black-20 pa1 mv2 mr3'></div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <ul className='topics-js flex flex-wrap list pl0'>
      {modules.map((it, index) => {
        return <li key={index} className="topic-js w-50 w-20-l pa3 pt0">
          <div className='relative padding-hack-75'><Img image={it.image(assets)} className='topic-image-js br1 grow reverse-dim absolute top-0 left-0'/></div>
          <h3 className="f6 navy">{it.name}</h3>
        </li>
      })}
    </ul>
  </div>
}

export const RandomBlocks = ({blocks}: {blocks: number[][]}) => {
  return blocks.map((it, index) => {
    const [firstLength] = it
    return [
      <div className={`title-js bg-sky h1 pa1 mt4 mb2 mr${5 - firstLength}`}></div>
    ].concat(it.slice(1).map(it => {
      return <div className={`bg-black-10 h1 mv2 mr${5 - it}`}></div>
    }))
  })
}

function Scroll() {
  var previews = [].slice.call(document.querySelectorAll('.preview-js')) as HTMLElement[]
  previews.forEach(it => {
    var rightPane = it.querySelector('.right-pane-js')
    if (!rightPane || !(rightPane instanceof HTMLElement)) return
    var height = rightPane.offsetHeight
    rightPane.style.height = `${height}px`
    var scrollableContent = rightPane.querySelector('.scrollable-content-js')
    var topics = it.querySelector('.topics-js')
    if (!scrollableContent || !topics) return
    var topicImages = [].slice.call(topics.querySelectorAll('.topic-image-js')) as HTMLImageElement[]
    topicImages.slice(1).forEach(it => {
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createTitle(`w-${random(4, 6)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createImage(it.src, it.alt))
    })
    scrollableContent.appendChild(createBlock('w-50'))
    scrollableContent.appendChild(createBlock('w-80'))
    scrollableContent.appendChild(createBlock('w-60'))
    scrollableContent.appendChild(createBlock('w-30'))
    var titles = [].slice.call(it.querySelectorAll('.title-js')) as HTMLElement[]
    if (titles.length < 2) return
    var progressBar = it.querySelector('.progress-bar-js') as HTMLElement
    rightPane.addEventListener('scroll', event => setTimeout(() => {
      checkScroll(rightPane as HTMLElement, titles[0], titles[1])
      if (!progressBar) return
      checkProgress((rightPane as HTMLElement).scrollTop, (rightPane as HTMLElement).offsetHeight, (scrollableContent as HTMLElement).offsetHeight, progressBar)
    }, 0))
    checkScroll(rightPane as HTMLElement, titles[0], titles[1])
    var items = [].slice.call(topics.querySelectorAll('.topic-js')) as HTMLElement[]
    items.forEach((it, index) => {
      var fn = () => rightPane!.scrollTo({
        top: (rightPane as HTMLElement).offsetHeight * index * 1.1,
        behavior: 'smooth',
      })
      it.addEventListener('mouseenter', fn)
      it.addEventListener('click', fn)
    })
  })
  function createBlock(...classNames: string[]) {
    var node = document.createElement('div')
    node.classList.add('bg-black-20', 'pa1', 'mv2', ...classNames)
    return node
  }
  function createImage(src: string, alt: string) {
    var node = document.createElement('img') as HTMLImageElement
    node.src = src
    node.alt = alt
    return node
  }
  function createTitle(...classNames: string[]) {
    var node = document.createElement('div')
    node.classList.add('mt5', 'pt3', 'h1', 'bg-black-50', 'mb3', ...classNames)
    return node
  }
  function random(min: number, max: number): number {
    return Math.round(((Math.random() * (max - min)) + min))
  }
  function checkScroll(target: HTMLElement, sectionA: HTMLElement, sectionB: HTMLElement) {
    var classes = ['bl', 'bw3', 'b--navy']
    if (target.scrollTop > (target.offsetHeight) * 0.5) {
      sectionA.classList.remove(...classes)
      sectionB.classList.add(...classes)
    } else {
      sectionB.classList.remove(...classes)
      sectionA.classList.add(...classes)
    }
  }
  function checkProgress(scrollTop: number, windowHeight: number, totalHeight: number, progressBar: HTMLElement) {
    var progressLength = windowHeight - progressBar.offsetHeight
    var percentageCompleted = Math.min((scrollTop) / totalHeight, 1)
    progressBar.style.top = `${progressLength * percentageCompleted}px`
  }
}