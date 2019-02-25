import React from 'react'
import { LinkedNode, Page, AcademyPage } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, assets as layoutAssets, SpecialListItem, Testimonal, MailTo, mailto, YourTeam, FAQs, FAQ, PackageList, PackageLeft, PackageRight} from './layout'
import {Image, Img, Script, Javascript, ExternalJavascript, ExternalScript} from './assets'
import {material, assets as materialAssets} from './material'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

export const assets = (vendorId: string) => ({
  page: {
    training: Image({url: 'assets/academy/training.svg', description: 'Training'}),
    down: Image({url: 'assets/academy/down_arrow_white.svg', description: 'Down'}),
    together: Image({url: 'assets/academy/together.svg', description: 'Team'}),
    tick: Image({url: 'assets/academy/tick.svg', description: 'Tick'}),
    preview: Javascript({script: `(${Scroll.toString()})()`}),
    paddle: ExternalJavascript({url: 'https://cdn.paddle.com/paddle/paddle.js'}),
    paddleVendor: Javascript({script: `Paddle.Setup({vendor: ${vendorId}});`}),
  },
  material: materialAssets,
  layout: layoutAssets,
})

const individualPackage: MailTo = {
  subject: 'Learnk8s Academy',
  body: `Hi Learnk8s,\n\nI'd like to have access to the Academy.\n\nThanks,\n`,
  email: 'hello@learnk8s.io',
}

const enterprisePackage: MailTo = {
  subject: 'Learnk8s Academy',
  body: `Hi Learnk8s,\n\nI'd like to discuss buying ___ licenses in bulk for the Learnk8s Academy.\n\nKind regards,\n`,
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

export const Academy: React.StatelessComponent<{root: LinkedNode<Page>, currentPage: LinkedNode<AcademyPage>, siteUrl: string, assets: ReturnType<typeof assets>}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout siteUrl={siteUrl} pageDetails={currentPage.payload.pageDetails}>
    <JsonLd<Course> item={{
      '@type': 'Course',
      '@context': 'https://schema.org',
      name: 'Learnk8s Academy',
      courseCode: 'K8SACADEMY',
      description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
      educationalCredentialAwarded: 'CKA or CKAD (optional)',
      provider: {
        '@type': 'Organization',
        name: 'Learnk8s',
      }}}></JsonLd>
    <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>
      <Navbar root={root} assets={assets.layout}/>

      <section className='ph5-l pt5-l'>
        <h1 className='f1 mt1-l pt2-l f-subheadline-l ph4 w-60 lh-solid'>Self-paced Kubernetes online course</h1>
        <h2 className='f4 normal measure-narrow lh-copy ph3 ph4-ns pb3-ns f3-l'>Become an expert in deploying applications at scale.</h2>
        <div className='dn db-l absolute bottom-0 right-1'>
          <div className='i-training relative'>
            <Img image={assets.page.training} className='absolute top-0 right-0'/>
          </div>
        </div>
        <div className='dn db-l measure mh3 mh4-ns tc'>
            <div className='w3 h3 dib'><Img image={assets.page.down}/></div>
        </div>
      </section>
    </div>

    <section className='ph3 ph4-ns flex items-center justify-center relative z3'>

      <div className='w-50-l dn db-l tc'>
        <div className='dib'>
          <div className='i-together relative'>
            <Img image={assets.page.together} className='absolute top-0 right-0'/>
          </div>
        </div>
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

      <div className='dn db-l center tc'>
        <div className='i-together dib relative'>
          <Img image={assets.page.together} className='absolute top-0 right-0'/>
        </div>
      </div>

    </section>

    <Testimonal author='Marcello Teodori, Architect' quote='This is the course you have to do to put all the pieces in the right place and challenge yourself to really master your knowledge of Kubernetes. Wish I had done it long ago.'/>

    <section className='bg-evian pt4'>
      <p className='f2 navy b tc'>What's inside</p>
      <p className='lh-copy f4 black-70 measure center tc'>Inside this course, you'll find all the know-how, scripts, documents, templates, code, and more you need to learn Kubernetes and its ecosystem.</p>

      <div className='ma3 ma5-l pa3 bg-white shadow-1'>

        <Module name={material.docker.name} description={material.docker.description} topics={Object.values(material.docker.topics)}>
          <Preview>
            <PreviewTopic title={material.docker.topics.isolation} image={assets.material.docker.isolation} />
            <PreviewTopic title={material.docker.topics.docker} image={assets.material.docker.docker} />
            <PreviewTopic title={material.docker.topics.architecture} image={assets.material.docker.architecture} />
            <PreviewTopic title={material.docker.topics.port} image={assets.material.docker.port} />
          </Preview>
        </Module>

        <Module name={material.zeroToKubernetes.name} description={material.zeroToKubernetes.description} topics={Object.values(material.zeroToKubernetes.topics)}>
          <Preview>
            <PreviewTopic title={material.zeroToKubernetes.topics.tetrisPlayer} image={assets.material.zeroToKubernetes.tetrisPlayer} />
            <PreviewTopic title={material.zeroToKubernetes.topics.datacentreAsVM} image={assets.material.zeroToKubernetes.datacentreAsVM} />
            <PreviewTopic title={material.zeroToKubernetes.topics.basics} image={assets.material.zeroToKubernetes.basics} />
            <PreviewTopic title={material.zeroToKubernetes.topics.localCluster} image={assets.material.zeroToKubernetes.localCluster} />
          </Preview>
        </Module>

        <Module name={material.deploymentStrategies.name} description={material.deploymentStrategies.description} topics={Object.values(material.deploymentStrategies.topics)}>
          <Preview>
            <PreviewTopic title={material.deploymentStrategies.topics.livenessProbe} image={assets.material.deploymentStrategies.livenessProbe} />
            <PreviewTopic title={material.deploymentStrategies.topics.readinessProbe} image={assets.material.deploymentStrategies.readinessProbe} />
            <PreviewTopic title={material.deploymentStrategies.topics.rollingUpdates} image={assets.material.deploymentStrategies.rollingUpdates} />
            <PreviewTopic title={material.deploymentStrategies.topics.servicesAndSelectors} image={assets.material.deploymentStrategies.servicesAndSelectors} />
          </Preview>
        </Module>

        <Module name={material.architecture.name} description={material.architecture.description} topics={Object.values(material.architecture.topics)}>
          <Preview>
            <PreviewTopic title={material.architecture.topics.controlPlane} image={assets.material.architecture.controlPlane} />
            <PreviewTopic title={material.architecture.topics.monzo} image={assets.material.architecture.monzo} />
            <PreviewTopic title={material.architecture.topics.raft} image={assets.material.architecture.raft} />
            <PreviewTopic title={material.architecture.topics.clusters} image={assets.material.architecture.clusters} />
          </Preview>
        </Module>

        <Module name={material.networking.name} description={material.networking.description} topics={Object.values(material.networking.topics)}>
          <Preview>
            <PreviewTopic title={material.networking.topics.networkRequirements} image={assets.material.networking.networkRequirements} />
            <PreviewTopic title={material.networking.topics.kubeProxy} image={assets.material.networking.kubeProxy} />
            <PreviewTopic title={material.networking.topics.latency} image={assets.material.networking.latency} />
            <PreviewTopic title={material.networking.topics.e2e} image={assets.material.networking.e2e} />
          </Preview>
        </Module>

        <Module name={material.managingState.name} description={material.managingState.description} topics={Object.values(material.managingState.topics)}>
          <Preview>
            <PreviewTopic title={material.managingState.topics.persistentVolumeClaims} image={assets.material.managingState.persistentVolumeClaims} />
            <PreviewTopic title={material.managingState.topics.storageClass} image={assets.material.managingState.storageClass} />
            <PreviewTopic title={material.managingState.topics.localVolumes} image={assets.material.managingState.localVolumes} />
            <PreviewTopic title={material.managingState.topics.statefulSets} image={assets.material.managingState.statefulSets} />
          </Preview>
        </Module>

        <Module name={material.templating.name} description={material.templating.description} topics={Object.values(material.templating.topics)}>
          <Preview>
            <PreviewTopic title={material.templating.topics.helm} image={assets.material.templating.helm} />
            <PreviewTopic title={material.templating.topics.helmArchitecture} image={assets.material.templating.helmArchitecture} />
            <PreviewTopic title={material.templating.topics.rollbacks} image={assets.material.templating.rollbacks} />
            <PreviewTopic title={material.templating.topics.repositories} image={assets.material.templating.repositories} />
          </Preview>
        </Module>

        <div className='flex-l justify-center'>

          <div className='w-30-l ph3 pb3'>
            <h2 className='navy b lh-solid'>Coming soon</h2>
            <p className='lh-copy black-70 measure'>The following modules are being developed and are coming to the Academy later on.</p>
          </div>

          <div className='w-60-l'>
            <ul className='list pa2'>
              <ComingSoon name={material.advancedNetworking.name} description={material.advancedNetworking.description} image={assets.material.advancedNetworking.nodeNetwork}/>
              <ComingSoon name={material.advancedScheduling.name} description={material.advancedScheduling.description} image={assets.material.advancedScheduling.antiAffinity}/>
              <ComingSoon name={material.security.name} description={material.security.description} image={assets.material.security.rbac}/>
              <ComingSoon name={material.multiCloud.name} description={material.multiCloud.description} image={assets.material.multiCloud.clusterFederation}/>
              <ComingSoon name={material.managedServices.name} description={material.managedServices.description} image={assets.material.managedServices.managedServices}/>
              <ComingSoon name={material.pipelines.name} description={material.pipelines.description} image={assets.material.pipelines.flow}/>
            </ul>
          </div>

        </div>

      </div>

      <div className='pt5-m pt4 pb5 ph3 measure-wide center black-80'>
        <p className='f3 mb1 mt0 lh-copy'>The course is totally worth the money and time, if you have a team that is getting started with Kubernetes and want to validate the approach that you are taking as well as to level up your knowledge on K8s, this is the way to go.</p>
        <p className='f4 i mb2'>— Salaboy, Activiti Cloud Team Lead</p>
      </div>

    </section>

    <section className='pv5'>

      <PackageList>
        <PackageLeft heading='Individual' subheading='Full membership plan'>
          <p className='navy tc f2'>
            <span className='dib relative'><span className='paddle-net' data-product='549763'>$999</span> <span className='f7 v-mid absolute right--2 top-0'>+TAX</span></span>
          </p>
          <ul className='list pl0 black-70'>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>12 months access</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Docker fundamentals module</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Access to the material for all modules</p>
              <ol className='pl3'>
                <li className='mv2'>Getting started with Kubernetes</li>
                <li className='mv2'>Deployment strategies</li>
                <li className='mv2'>Kubernetes architecture</li>
                <li className='mv2'>Kubernetes networking</li>
                <li className='mv2'>Managing state</li>
                <li className='mv2'>Helm</li>
                <li className='mv2'>Advanced networking</li>
              </ol>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy'><span className='b'>All source code</span> — build files, scripts and files for each module</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Access to all interactive challenges</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy'><span className='b'>All source code</span> — build files, scripts and files for each module</p>
            </Item>
          </ul>
          <div className='tc'>
            <a href='https://academy.learnk8s/payment' className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4'>Buy now &#8594;</a>
          </div>
        </PackageLeft>
        <PackageRight heading='Enterprise' subheading='From 10+ users'>
          <ul className='list pl0 black-70'>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>All individual plan features</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Dedicated customer support</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Dedicated playground for challenges</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Analytics and reports</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Custom topics</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Live classes and webinars</p>
            </Item>
            <Item tick={assets.page.tick}>
              <p className='mv0 f4-l lh-copy b'>Host the Academy on your cloud</p>
            </Item>
          </ul>
          <div className='tc'>
            <a href={mailto(enterprisePackage)} className='link dib white bg-blue br1 pa3 b f5 shadow-3 mv3 ph4'>Get in touch &#8594;</a>
          </div>
        </PackageRight>
      </PackageList>

    </section>

    <YourTeam mailto={mailto(privateGroupEnquiry)}/>

    <FAQs faqs={faqs}/>

    <Consultation />
    <Footer root={root} assets={assets.layout}/>
    <Script script={assets.page.preview}></Script>
    <ExternalScript script={assets.page.paddle}></ExternalScript>
    <Script script={assets.page.paddleVendor}></Script>
  </Layout>
}

export const Item: React.StatelessComponent<{tick: Image}> = ({children, tick}) => {
  return <li className='mv3 flex justify-center'>
    <div className='v-top tc'><Img image={tick} className='w2 h2'/></div>
    <div className='v-top pl3 w-90'>{children}</div>
  </li>
}

export const Preview: React.StatelessComponent<{}> = ({children}) => {
  return <div className='preview-js'>
    <div className='academy-js flex w-100'>
      <div className='left-pane-js w-30 bg-evian ph4 pv2 dn db-l'>
        <div className='mt3 pt3 h1 bg-navy'></div>
        <div className='pr3'>
        {RandomBlocks({blocks: [
          [5, 6, 7, 5, 8],
          [6, 7, 4, 8, 9],
        ]})}
        </div>
      </div>
      <div className='w-100 w-70-l bg-black-05'>
        <div className='bg-sky h2 w-100'></div>
        <div className='relative'>
          <div className='bg-black-05 ph1 h-100 absolute top-0 right-0 z-1'></div>
          <div className='progress-bar-js bg-black-10 ph1 h4 absolute top-0 right-0 z-3'></div>
          <div className='right-pane-js overflow-hidden'>
          <div className='scrollable-content-js w-80 center mv4'>

            <div className='w-40 mt3 pt3 h1 bg-black-50 mb3'></div>
            <div className='bg-black-20 pa1 mv2 mr5'></div>
            <div className='bg-black-20 pa1 mv2 mr3'></div>
            <div className='pv2'><div className='relative padding-hack-75 first-image-js'></div></div>
            <div className='bg-black-20 pa1 mv2 mr5'></div>
            <div className='bg-black-20 pa1 mv2'></div>
            <div className='w-20 bg-black-20 pa1 mv2 mr3'></div>

          </div>
        </div>
        </div>
      </div>
    </div>
    <p className='ttu f7 black-50'>Modules include:</p>
    <ul className='topics-js flex flex-wrap list pl0'>{children}</ul>
  </div>
}

export const PreviewTopic: React.StatelessComponent<{title: string, image: Image}> = ({title, image}) => {
  return <li className='topic-js w-50 w-25-l pa3 pt0'>
    <div className='grow reverse-dim'>
      <div className='topic-image-js relative padding-hack-75'><Img image={image} className='bg-white br1 absolute top-0 left-0'/></div>
    </div>
    <h3 className='f6 navy'>{title}</h3>
  </li>
}

export const Module: React.StatelessComponent<{name: string, description: string, topics: string[]}> = ({children, name, description, topics}) => {
  return <div className='flex-ns justify-center mt5-l'>
  <div className='w-40-ns w-30-l pa3 pt0 black-70 lh-copy mr4-l'>
    <h2 className='navy b lh-solid'>{name}</h2>
    <p className='measure'>{description}</p>
    <p>The topics covered in this module are:</p>
    <ul className=''>{topics.map((it, index) => <li className='mv1' key={index}>{it}</li>)}</ul>
  </div>
  <div className='w-60-ns'>{children}</div>
</div>
}

export const ComingSoon: React.StatelessComponent<{name: string, description: string, image: Image}> = ({name, description, image}) => {
  return <li className='w-100 pa3 pt0 flex-l items-start'>
    <div className='w-20-l'>
      <div className='relative padding-hack-75'><Img image={image} className='absolute top-0 left-0'/></div>
    </div>
    <div className='w-80-l ml4-l'>
      <h3 className='f5 navy'>{name}</h3>
      <p className='measure-wide lh-copy'>{description}</p>
    </div>
  </li>
}

export const RandomBlocks = ({blocks}: {blocks: number[][]}) => {
  return blocks.map((it, index) => {
    const [firstLength] = it
    return [
      <div className={`title-js bg-sky h1 pa1 mt4 mb2 w-${10 * firstLength}`}></div>
    ].concat(it.slice(1).map(it => {
      return <div className={`bg-black-10 pa1 pt2 mv2 w-${it * 10}`}></div>
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
    var firstImage = it.querySelector('.first-image-js')
    if (!scrollableContent || !topics || !firstImage) return
    var topicImages = [].slice.call(topics.querySelectorAll('.topic-image-js')) as HTMLImageElement[]
    var parentFirstImage = firstImage.parentElement
    if (parentFirstImage) {
      parentFirstImage.removeChild(firstImage)
      parentFirstImage.appendChild(topicImages[0].cloneNode(true))
    }
    topicImages.slice(1).forEach(it => {
      scrollableContent!.appendChild(createTitle(`w-${random(4, 6)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(it.cloneNode(true))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
      scrollableContent!.appendChild(createBlock(`w-${random(3, 8)}0`))
    })
    topicImages.forEach(it => {
      var img = it.querySelector('img')
      if (!img) return
      img.classList.remove('bg-white')
      img.classList.add('bg-black-05')
    })
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
    items.forEach(function(it, index) {
      var fn = function() {
        rightPane!.scrollTo({
          top: ((scrollableContent as HTMLElement).offsetHeight / items.length) * index * 1.05,
          behavior: 'smooth',
        })
      }
      it.addEventListener('mouseenter', fn)
      it.addEventListener('click', fn)
    })
  })
  function createBlock(...classNames: string[]) {
    var node = document.createElement('div')
    node.classList.add('bg-black-20', 'pa1', 'mv2', ...classNames)
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