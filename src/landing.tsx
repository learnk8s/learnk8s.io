import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Footer, Layout , FAQs, Hero, Testimonal, mailto, MailTo, Interlude } from './layout'
import { Image, Img, Javascript, Script } from './assets'
import { CourseRow, faqs, DashboardModule, PackageFeatures } from './training'
import { material } from './material'
import { PrimaryButton } from './homepage'
import { Course, Boolean, ItemAvailabilityEnum, CourseInstance} from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'
import { Timezone, Venue, Courses, isVenueOnline, CourseEvent } from './courses';

export const Assets = {
  slack: Image({url: 'assets/training/slack_in_colours.svg', description: 'Slack'}),
  downArrow: Image({url: 'assets/training/down_arrow_white.svg', description: 'Down'}),
  training: Image({url: 'assets/training/training.svg', description: 'Training'}),
  toggle: Javascript({script: `(${CreateToggle.toString()})()`}),
  previewDocker: Image({url: 'assets/training/docker.png', description: 'Linux containers and Kubernetes'}),
  previewZero: Image({url: 'assets/training/zero.png', description: 'Zero to Kubernetes'}),
  previewDeployments: Image({url: 'assets/training/deploy.png', description: 'Deployment strategies'}),
  previewArchitecture: Image({url: 'assets/training/architecture.png', description: 'Kubernetes architecture'}),
  previewNetworking: Image({url: 'assets/training/networking.png', description: 'Kubernetes networking'}),
  previewState: Image({url: 'assets/training/state.png', description: 'Managing state with Kubernetes'}),
  previewTemplating: Image({url: 'assets/training/templating.png', description: 'Templating Kubernetes resources'}),
  previewOptionals: Image({url: 'assets/training/optionals.png', description: 'Optional modules'}),
}

export const Type = identity<'landing'>('landing')

export function Details({url, city, timezone, location}: {url: string, city: string, timezone: Timezone, location: Venue}) {
  return {
    type: Type,
    url,
    seoTitle: `Kubernetes training in ${city} ♦︎ Learnk8s`,
    title: `Kubernetes training in ${city}`,
    description: `Become an expert in deploying application as scale with Kubernetes in ${city}.`,
    openGraphImage: Image({url: 'assets/open_graph_preview.png', description: 'Learnk8s preview'}),
    location,
    timezone,
  }
}

function identity<T>(value: T): T {
  return value
}

const customRequest: MailTo = {
  subject: 'Advanced Kubernetes training — Module enquiry',
  body: `Hi Learnk8s,\n\nI'd like to know if you cover _______ in your course.\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

const privateGroupEnquiry: MailTo = {
  subject: 'Advanced Kubernetes training — Private group enquiry',
  body: `Hi Learnk8s,\n\nWe wish to train ___(number) people to Kubernetes and containers in ____(month). Can you help?\n\nBest regards,\n`,
  email: 'hello@learnk8s.io',
}

export function render(website: Sitemap, currentNode: LinkedNode<ReturnType<typeof Details>>, siteUrl: string): string {
  return renderToStaticMarkup(<Layout
    website={website}
    seoTitle={currentNode.payload.seoTitle}
    title={currentNode.payload.title}
    description={currentNode.payload.description}
    openGraphImage={currentNode.payload.openGraphImage}
    absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}>
    {Courses.map((course, index) => {
      return <JsonLd<Course> key={index} item={{
        '@type': 'Course',
        '@context': 'https://schema.org',
        name: course.name,
        courseCode: course.code,
        description: course.description,
        educationalCredentialAwarded: 'CKA or CKAD (optional)',
        provider: {
          '@type': 'Organization',
          name: 'Learnk8s',
        },
        hasCourseInstance: course.events.filter(onlyCityOrOnline).map(it => ({
          '@type': 'CourseInstance',
          name: it.details.title,
          description: 'Learn how to deploy and scale applications with Kubernetes.',
          courseMode: 'full-time',
          duration: it.duration.toISOString() as any,
          inLanguage: it.language,
          startDate: it.startAt.toISOString(),
          endDate: it.startAt.clone().add(it.duration).toISOString(),
          location: {
            '@type': 'Place',
            name: it.location.name,
            address: isVenueOnline(it.location) ? 'Online' : `${it.location.city}, ${it.location.country}`,
          },
          isAccessibleForFree: Boolean.False,
          offers: {
            '@type': 'Offer',
            availability: ItemAvailabilityEnum.InStock,
            price: it.offer.price,
            priceCurrency: it.offer.currency,
            validFrom: it.startAt.clone().subtract(it.canBookInAdvanceFrom).toISOString(),
            url: getAbsoluteUrl(currentNode, siteUrl),
          },
          image: `${siteUrl}${currentNode.payload.openGraphImage}`,
          performer: {
            '@type': 'Organization',
            name: 'Learnk8s',
          }
        } as CourseInstance)),
      }}></JsonLd>
    })}
    <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>

      <Navbar root={website} />

      <Hero image={Assets.training} imageClass='i-training'>
        <h1 className='f1 f-subheadline-l'>Kubernetes <span className='no-wrap'>instructor-led</span> training course in {currentNode.payload.location.city}</h1>
        <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>Become an expert in deploing and scaling applications with Kubernetes.</h2>
        <div className='dn db-l mw6 mh3 mh4-ns tc'>
          <div className='w3 h3 dib'><Img image={Assets.downArrow}/></div>
        </div>
      </Hero>
    </div>

    <section className='w-60-ns ph3 center relative z3 bg-white pt3 pb5 mb4'>
      <p className='f2 navy b tc ph3'>Join the next class in {currentNode.payload.location.city} or online</p>
      <p className='lh-copy f4 black-70 measure center tc ph3 pb3'>Public classes are great to get started mastering Kubernetes or prepare for your CKA or CKAD exam. The starting time is 9.30 am GMT.</p>
      <ul className='list'>{Courses.reduce((acc, course) => acc.concat(course.events), [] as CourseEvent[]).filter(onlyCityOrOnline).map(it => <CourseRow event={it} slackIcon={Assets.slack} />)}</ul>
    </section>

    <Testimonal quote='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.' author='Luke Anderson, Senior IT Engineer' />

    <section className='bg-evian pt4' id='start'>
      <p className='f2 navy b tc ph3'>Advanced Kubernetes course modules</p>
      <p className='lh-copy f4 black-70 measure center tc ph3'>The advanced course is made 6 core modules that are designed to last 2 full days. You're recommended to select 4 optional modules for the third day, but you choose more if you wish.</p>

      <div className='ma3 ma5-l flex-l flex-wrap justify-center'>
        <DashboardModule className='w-40-l' preview={Assets.previewDocker} title={`1. ${material.docker.name}`} description={material.docker.description}>
          <p className='lh-copy measure-wide'>You will learn how to package and run applications in Docker containers. The module covers the following topics:</p>
          <ul>{Object.values(material.docker.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewZero} title={`2. ${material.zeroToKubernetes.name}`} description={material.zeroToKubernetes.description}>
          <p className='lh-copy measure-wide'>You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the following topics:</p>
          <ul>{Object.values(material.zeroToKubernetes.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewDeployments} title={`3. ${material.deploymentStrategies.name}`} description={material.deploymentStrategies.description}>
          <p className='lh-copy measure-wide'>You will learn different techniques to deploy your applications with zero downtime. The module covers the following topics:</p>
          <ul>{Object.values(material.deploymentStrategies.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewArchitecture} title={`4. ${material.architecture.name}`} description={material.architecture.description}>
          <p className='lh-copy measure-wide'>You will learn the core components in Kubernetes and how they work. The module covers the following topics:</p>
          <ul>{Object.values(material.architecture.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewNetworking} title={`5. ${material.networking.name}`} description={material.networking.description}>
          <p className='lh-copy measure-wide'>You will learn how the traffic flows inside the cluster. You will also learn how to expose your apps to the public internet. The module covers the following topics:</p>
          <ul>{Object.values(material.networking.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewState} title={`6. ${material.managingState.name}`} description={material.managingState.description}>
          <p className='lh-copy measure-wide'>You will learn how to persist data in Kubernetes. The module covers the following topics:</p>
          <ul>{Object.values(material.managingState.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewTemplating} title={`7. ${material.templating.name}`} description={material.templating.description}>
          <p className='lh-copy measure-wide'>You will learn how to template resources for different environments. The module covers the following topics:</p>
          <ul>{Object.values(material.templating.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={Assets.previewOptionals} title='Optionals' description={`Kubernetes is a vast subject and there're many other topics you might be interested in such what's the best autoscaler and how you should secure your cluster. If you worked in a regulated environment, you could find interesting advanced allocations: scheduling workloads only on specific Nodes.`}>
          <p className='lh-copy measure-wide'>You can pick and choose from the modules below. Looking for something in particular? <a className='link underline' href={mailto(customRequest)}>Get in touch!</a></p>
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
        <p className='f3 mb1 mt0 lh-copy'>&ldquo;A really enjoyable 3-day workshop on Kubernetes. I cemented my understanding of Kubernetes and can now start implementing and furthering my knowledge with real examples and workflows. Next stop, production experience.&rdquo;</p>
        <p className='f4 i mb2'>— David Heward, Senior Devops Engineer</p>
      </div>
    </section>

    <div className={`mv3 mh3 ml2-ns mr4-ns mw6 center`}>
      <div className='header ph3 pt1 bb b--light-gray'>
          <h2 className='navy tc f2'>Looking to train your team?</h2>
          <h3 className='normal black-70 tc mt0 measure lh-copy'>The private training course is excellent if you wish to customise your learning path to adopt Kubernetes.</h3>
      </div>
      <PackageFeatures description='' benefits={[
        'Pick the modules relevant to your team',
        'Deep dive into the content with a three, four or five days course',
        'Delivered on site, remotely or in a cozy meeting room',
        'Classes from 10+ delegates',
      ]}/>
      <p className='tc pb4'><PrimaryButton text='Get in touch ⇢' mailto={mailto(privateGroupEnquiry)}></PrimaryButton></p>
    </div>

     <Interlude />

    <FAQs faqs={faqs}/>

    <Footer root={website} />
    <Script script={Assets.toggle}></Script>
  </Layout>)

  function onlyCityOrOnline(event: CourseEvent) {
    return (isVenueOnline(event.location) && event.timezone === currentNode.payload.timezone) || event.location.city === currentNode.payload.location.city
  }
}

function CreateToggle() {
  function doesntExist<T>(it: T): boolean {
    return !it;
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
      targetElements.forEach(function (it) {
        return it!.classList.add('toggle-collapse')
      })
    }
  }

  [].slice.call(document.querySelectorAll('[data-toggle]')).forEach(function(element: Element) {
    element.addEventListener('click', function() {
      Toggle(element)
    })
  });
  [].slice.call(document.querySelectorAll('[data-toggle-collapsed]')).forEach(Toggle)
}
