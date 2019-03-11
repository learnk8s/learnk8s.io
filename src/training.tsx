import React from 'react'
import { LinkedNode, TrainingPage, getAbsoluteUrl, Website } from './sitemap'
import { Navbar, Consultation, Footer, Layout, ListItem, Interlude, assets as layoutAssets, InlineMarkdown, SpecialListItem, Testimonal, mailto, MailTo, YourTeam, FAQs, FAQ, PackageList, PackageLeft, PackageRight, Hero} from './layout'
import {Image, Img, Script, Javascript} from './assets'
import { PrimaryButton } from './homepage'
import { Course, CourseInstance, Boolean, ItemAvailabilityEnum } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import moment from 'moment-timezone'
import { material } from './material'
import { cat } from 'shelljs'
import marked from 'marked'

const renderer = new marked.Renderer()

const benefits = [
  '**Get started with Kubernetes in your next project** and you need to quickly get up to speed in deploying and scaling your Node.js, Java, .NET, Scala, etc. microservices',
  '**Design and architect micro services on Kubernetes** that leverage the strength of distributed systems',
  '**Design applications that can be deployed on AWS, GCP, Azure, etc.**, without requiring changing any of the application or infrastrucure code',
  '**Autoscale your clusters and applications as your service becomes more popular**',
  '**Standarise your development environments and workflow** and design processes for continuous delivery and intregration with Kubernetes',
  'Become a **Certified Kubernetes Administrator** (CKA) or **Certified Kubernetes Application Developer** (CKAD)',
]

export const faqs: FAQ[] = [{
  title: 'Who is this workshop for?',
  content: 'Intended for Software developers, Architects and Deployment engineers seeking to learn how to use Kubernetes to automate deployment, scaling and management of containerized applications.',
}, {
  title: 'Are there any joining instructions?',
  content: 'You will receive the joining instructions with all the material needed to run the course after you sign up for a particular course.',
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

const publicCourseEnquiry = (date: moment.Moment, venue: Venue): MailTo => ({
  subject: 'Kubernetes training — Public course enquiry',
  body: `Hello Learnk8s,\n\nI'd like to know more about the ${isVenueOnline(venue) ? 'online ': ''}Kubernetes course that will be held on the ${date.format('Do')} of ${date.format('MMMM')}${isVenueOnline(venue) ? '' : `in ${venue.city || venue.name}`}.\n\nKind regards,\n`,
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

enum Language {
  ENGLISH = 'English',
  ITALIAN = 'Italian',
}

enum CourseName {
  BASIC = 'Deploying and scaling applications in Kubernetes',
  ADVANCED = 'Advanced Kubernetes training',
}

export enum CurrencyCode {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  SGD = 'SGD',
  CAD = 'CAD',
}

export interface Venue {
  address: string | null
  country: string | null
  countryCode: string | null
  city: string | null
  postcode: string | null
  name: string
}

interface Offer {
  price: number
  currency: CurrencyCode
  locale: string
}

enum CourseCode {
  BASIC = 'K8SBASIC',
  ADVANCED = 'K8SADVANCED',
}

export enum Timezone {
  LONDON = 'Europe/London',
  SAN_FRANCISCO = 'America/Los_Angeles',
  TORONTO = 'America/Toronto',
  SINGAPORE = 'Asia/Singapore',
  ROME = 'Europe/Rome',
}

export interface CourseEvent {
  code: string
  startAt: moment.Moment
  duration: moment.Duration
  timezone: Timezone
  canBookInAdvanceFrom: moment.Duration
  location: Venue
  offer: Offer
  language: Language
  details: CourseDetails
  description: string
  eventbriteLogoId: string
}

interface CourseDetails {
  title: CourseName
  code: CourseCode
}

export function isVenueOnline(venue: Venue): boolean {
  return venue.name === venues.Online.name
}

export const venues = {
  Online: {
    address: null,
    city: null,
    country: null,
    countryCode: null,
    postcode: null,
    name: 'Online',
  },
  London: {
    name: 'CitizenM Hotel',
    address: '20 Lavington St',
    city: 'London',
    country: 'UK',
    countryCode: 'GB',
    postcode: 'SE1 0NZ',
  },
  Singapore: {
    name: 'JustCo Singapore',
    address: null,
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    postcode: null,
  },
  Milan: {
    name: 'Milano',
    address: null,
    postcode: null,
    city: 'Milan',
    country: 'Italy',
    countryCode: 'IT',
  },
  SanFrancisco: {
    name: 'San Francisco',
    city: 'San Francisco',
    postcode: null,
    address: null,
    country: 'California',
    countryCode: 'US',
  },
  Cardiff: {
    name: 'Cardiff',
    city: 'Cardiff',
    postcode: null,
    address: null,
    country: 'Wales',
    countryCode: 'GB',
  },
  Toronto: {
    name: 'Toronto',
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    address: null,
    postcode: null,
  }
}
const AdvancedDetails = {
  title: CourseName.ADVANCED,
  code: CourseCode.ADVANCED,
}

interface KubernetesCourse {
  name: string
  code: CourseCode
  description: string
  events: CourseEvent[]
}

export const courses: KubernetesCourse[] = [
  {
    name: 'Advanced Kubernetes training',
    code: CourseCode.ADVANCED,
    description: 'Learn how to deploy and scale applications with Kubernetes.',
    events: [
    {
      code: 'LK8S|ONLINE|20190313',
      startAt: moment('2019-03-13T09:30:00+00:00'),
      duration: moment.duration(3, 'days'),
      timezone: Timezone.LONDON,
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Online,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|SANFRANCISCO|20190325',
      startAt: moment('2019-03-25T09:30:00-07:00'),
      timezone: Timezone.SAN_FRANCISCO,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.SanFrancisco,
      offer: {
        price: 2250,
        currency: CurrencyCode.USD,
        locale: 'it-IT',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|LONDON|20190320',
      startAt: moment('2019-03-20T09:30:00+00:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.London,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|SINGAPORE|20190429',
      startAt: moment('2019-04-29T09:30:00+08:00'),
      timezone: Timezone.SINGAPORE,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Singapore,
      offer: {
        price: 3400,
        currency: CurrencyCode.SGD,
        locale: 'en-SG',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|CARDIFF|20190429',
      startAt: moment('2019-04-29T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Cardiff,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|TORONTO|20190513',
      startAt: moment('2019-05-13T09:30:00-04:00'),
      timezone: Timezone.TORONTO,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Toronto,
      offer: {
        price: 3300,
        currency: CurrencyCode.CAD,
        locale: 'en-CA',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|LONDON|20190522',
      startAt: moment('2019-05-22T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Online,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|SANFRANCISCO|20190603',
      startAt: moment('2019-06-03T09:30:00-07:00'),
      timezone: Timezone.SAN_FRANCISCO,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.SanFrancisco,
      offer: {
        price: 2250,
        currency: CurrencyCode.USD,
        locale: 'it-IT',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|LONDON|20190605',
      startAt: moment('2019-06-05T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.London,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|MILAN|20190610',
      startAt: moment('2019-06-10T09:30:00+01:00'),
      timezone: Timezone.ROME,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Milan,
      offer: {
        price: 2050,
        currency: CurrencyCode.EUR,
        locale: 'it-IT',
      },
      language: Language.ITALIAN,
      description: marked(cat(`${__dirname}/description_it.md`).toString(), {renderer}),
      eventbriteLogoId: '53323631',
    },
    {
      code: 'LK8S|SINGAPORE|20190703',
      startAt: moment('2019-07-03T09:30:00+08:00'),
      timezone: Timezone.SINGAPORE,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Singapore,
      offer: {
        price: 3400,
        currency: CurrencyCode.SGD,
        locale: 'en-SG',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|TORONTO|20190904',
      startAt: moment('2019-09-04T09:30:00-04:00'),
      timezone: Timezone.TORONTO,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Toronto,
      offer: {
        price: 3300,
        currency: CurrencyCode.CAD,
        locale: 'en-CA',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|LONDON|20190916',
      startAt: moment('2019-09-16T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.London,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|MILAN|20190923',
      startAt: moment('2019-09-23T09:30:00+01:00'),
      timezone: Timezone.ROME,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Milan,
      offer: {
        price: 2050,
        currency: CurrencyCode.EUR,
        locale: 'it-IT',
      },
      language: Language.ITALIAN,
      description: marked(cat(`${__dirname}/description_it.md`).toString(), {renderer}),
      eventbriteLogoId: '53323631',
    },
    {
      code: 'LK8S|LONDON|20191002',
      startAt: moment('2019-10-02T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Online,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|CARDIFF|20191009',
      startAt: moment('2019-10-09T09:30:00+01:00'),
      timezone: Timezone.LONDON,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Cardiff,
      offer: {
        price: 1950,
        currency: CurrencyCode.GBP,
        locale: 'en-GB',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|SINGAPORE|20191009',
      startAt: moment('2019-10-09T09:30:00+08:00'),
      timezone: Timezone.SINGAPORE,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.Singapore,
      offer: {
        price: 3400,
        currency: CurrencyCode.SGD,
        locale: 'en-SG',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },
    {
      code: 'LK8S|SANFRANCISCO|20191021',
      startAt: moment('2019-10-21T09:30:00-07:00'),
      timezone: Timezone.SAN_FRANCISCO,
      duration: moment.duration(3, 'days'),
      canBookInAdvanceFrom: moment.duration(90, 'days'),
      details: AdvancedDetails,
      location: venues.SanFrancisco,
      offer: {
        price: 2250,
        currency: CurrencyCode.USD,
        locale: 'it-IT',
      },
      language: Language.ENGLISH,
      description: marked(cat(`${__dirname}/description_en.md`).toString(), {renderer}),
      eventbriteLogoId: '48505063',
    },]
  },
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
    toggle: Javascript({script: `(${CreateToggle.toString()})()`}),
  },
  layout: layoutAssets,
}

export const Training: React.StatelessComponent<{root: Website, currentPage: LinkedNode<TrainingPage, object>, siteUrl: string, assets: typeof assets}> = ({assets, root, siteUrl, currentPage}) => {
  return <Layout root={root} siteUrl={siteUrl} currentPage={currentPage}>
    {courses.map((course, index) => {
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
        hasCourseInstance: course.events.map(it => ({
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
            url: getAbsoluteUrl(currentPage, siteUrl),
          },
          image: `${siteUrl}${currentPage.payload.pageDetails.openGraphImage}`,
          performer: {
            '@type': 'Organization',
            name: 'Learnk8s',
          }
        } as CourseInstance)),
      }}></JsonLd>
    })}
    <div className='trapezoid-1 trapezoid-2-l white pt3 pt0-ns pb5 pb4-ns'>

      <Navbar root={root} assets={assets.layout}/>

      <Hero assets={assets.layout} image={assets.page.training} imageClass='i-training'>
        <h1 className='f1 f-subheadline-l'>Kubernetes <span className='no-wrap'>instructor-led</span> training</h1>
        <h2 className='f4 normal measure-narrow lh-copy pb3-ns f3-l'>Learn how to deploy and scale applications with Kubernetes.</h2>
        <ul className='list w-60-m center-m mw6 bg-white black-70 ph3 pv1 shadow-1 mh3 mh4-ns mt4'>
          <li className='flex items-center justify-between ph2 bb b--light-gray'>
            <p className='ttu'>Private courses</p>
            <div className='w2 h2'><Img image={assets.page.tick}/></div>
          </li>
          <li className='flex items-center justify-between ph2 bb b--light-gray'>
            <p className='ttu'>Public courses</p>
            <div className='w2 h2'><Img image={assets.page.tick}/></div>
          </li>
          <li className='flex items-center justify-between ph2'>
            <p className='ttu v-mid mt2 mb1'>Online courses <span className='dib w2 v-mid'><Img image={assets.page.slack}/></span></p>
            <div className='w2 h2'><Img image={assets.page.tick}/></div>
          </li>
        </ul>
        <div className='dn db-l mw6 mh3 mh4-ns tc'>
          <div className='w3 h3 dib'><Img image={assets.page.downArrow}/></div>
        </div>
      </Hero>
    </div>

    <section className='content ph3 ph4-ns flex items-center justify-center pt5-ns relative z3'>

      <div className='w-50-l dn db-l tc'>
        <div className='dib'>
          <div className='i-more-cargo-loading relative'>
            <Img image={assets.page.cargoLoading} className='absolute top-0 right-0'/>
          </div>
        </div>
      </div>

      <div className='w-50-l center pt3'>
        <h2 className='f3 navy f2-l measure-narrow'>Instructor-led, hands-on courses</h2>
        <div className='measure-wide'>
          <p className='lh-copy f4-l black-70'>These courses are great if you wish to:</p>
          <ul className='list black-70 pl0 pt2'>{benefits.map((it, index) => <ListItem key={index} assets={assets.layout}><InlineMarkdown content={it} /></ListItem>)}</ul>
        </div>
      </div>
    </section>

    <Interlude assets={assets.layout}/>

    <section className='pt5'>
      <PackageList>
        <PackageLeft heading='Advanced Kubernetes Course' subheading='Most popular option — 3 days course'>
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
        </PackageLeft>
        <PackageRight heading='Kubernetes Private Training' subheading='Make your own course'>
          <PackageFeatures assets={assets.layout} description='The private training course is excellent if you wish to customise your learning path to adopt Kubernetes.' benefits={[
                'Pick the modules relevant to your team',
                'Deep dive into the content with a three, four or five days course',
                'Delivered on site, remotely or in a cozy meeting room',
                'Classes from 10+ delegates',
              ]}>
            <SpecialListItem assets={assets.layout}><span className='b'>Perfect for the Certified Kubernetes Administrator (CKA) exam</span> (exam not included and optional)</SpecialListItem>
          </PackageFeatures>
          <p className='tc pb4'><PrimaryButton text='Get in touch ⇢' mailto={mailto(privateGroupEnquiry)}></PrimaryButton></p>
        </PackageRight>
      </PackageList>
    </section>

    <Testimonal quote='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.' author='Luke Anderson, Senior IT Engineer' />

    <section className='bg-evian pt4' id='start'>
      <p className='f2 navy b tc ph3'>Advanced Kubernetes course modules</p>
      <p className='lh-copy f4 black-70 measure center tc ph3'>The advanced course is made 6 core modules that are designed to last 2 full days. You're recommended to select 4 optional modules for the third day, but you choose more if you wish.</p>

      <div className='ma3 ma5-l flex-l flex-wrap justify-center'>
        <DashboardModule className='w-40-l' preview={assets.page.previewDocker} title={`1. ${material.docker.name}`} description={material.docker.description}>
          <p className='lh-copy measure-wide'>You will learn how to package and run applications in Docker containers. The module covers the following topics:</p>
          <ul>{Object.values(material.docker.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewZero} title={`2. ${material.zeroToKubernetes.name}`} description={material.zeroToKubernetes.description}>
          <p className='lh-copy measure-wide'>You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the following topics:</p>
          <ul>{Object.values(material.zeroToKubernetes.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewDeployments} title={`3. ${material.deploymentStrategies.name}`} description={material.deploymentStrategies.description}>
          <p className='lh-copy measure-wide'>You will learn different techniques to deploy your applications with zero downtime. The module covers the following topics:</p>
          <ul>{Object.values(material.deploymentStrategies.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewArchitecture} title={`4. ${material.architecture.name}`} description={material.architecture.description}>
          <p className='lh-copy measure-wide'>You will learn the core components in Kubernetes and how they work. The module covers the following topics:</p>
          <ul>{Object.values(material.architecture.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewNetworking} title={`5. ${material.networking.name}`} description={material.networking.description}>
          <p className='lh-copy measure-wide'>You will learn how the traffic flows inside the cluster. You will also learn how to expose your apps to the public internet. The module covers the following topics:</p>
          <ul>{Object.values(material.networking.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewState} title={`6. ${material.managingState.name}`} description={material.managingState.description}>
          <p className='lh-copy measure-wide'>You will learn how to persist data in Kubernetes. The module covers the following topics:</p>
          <ul>{Object.values(material.managingState.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewTemplating} title={`7. ${material.templating.name}`} description={material.templating.description}>
          <p className='lh-copy measure-wide'>You will learn how to template resources for different environments. The module covers the following topics:</p>
          <ul>{Object.values(material.templating.topics).map((it, index) => <li key={index} className='lh-copy mv1'>{it}</li>)}</ul>
        </DashboardModule>

        <DashboardModule className='w-40-l' preview={assets.page.previewOptionals} title='Optionals' description={`Kubernetes is a vast subject and there're many other topics you might be interested in such what's the best autoscaler and how you should secure your cluster. If you worked in a regulated environment, you could find interesting advanced allocations: scheduling workloads only on specific Nodes.`}>
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

    <section id='start' className='w-60-ns ph3 center pt3 pb3 pb5-l'>
      <h2 className='navy f4 f3-l'>Upcoming events</h2>

      <input className='dn' defaultChecked id='all' type='radio' name='country' />
      <input className='dn' id='america' type='radio' name='country' />
      <input className='dn' id='europe' type='radio' name='country' />
      <input className='dn' id='asia' type='radio' name='country' />
      <ul className='legend list pl0 flex'>
        <li className='all dib pa2 navy bb bw1 b--near-white bg-evian br1 br--left'><label htmlFor='all'>All</label></li>
        <li className='america dib pa2 navy bb bw1 b--near-white bg-evian'><label htmlFor='america'>North America</label></li>
        <li className='europe dib pa2 navy bb bw1 b--near-white bg-evian'><label htmlFor='europe'>Europe</label></li>
        <li className='asia dib pa2 navy bb bw1 b--near-white bg-evian br1 br--right'><label htmlFor='asia'>Asia</label></li>
      </ul>

      <ul className='events list pl0 pt3'>{courses.reduce((acc, course) => acc.concat(course.events), [] as CourseEvent[]).sort((a, b) => a.startAt.valueOf() - b.startAt.valueOf()).map(it => <CourseRow event={it} slackIcon={assets.page.slack}/>)}</ul>

      <p className='f2 navy b tc mb2 pt4-ns pt2'>Your city is not on the list?</p>
      <p className='lh-copy f4 black-70 measure center tc'>Don't worry. We run in-person classrooms in Europe, North America and Asia. If your city is not on the list, drop us a line at <a className='link underline' href={mailto(newLocationEnquiry)}>hello@learnk8s.io</a> and will try to make it happen.</p>
    </section>

    <YourTeam mailto={mailto(privateGroupEnquiry)}/>

    <FAQs faqs={faqs}/>

    <Consultation />
    <Footer root={root} assets={assets.layout}/>
    <Script script={assets.page.toggle}></Script>
  </Layout>
}

export const CourseRow: React.StatelessComponent<{event: CourseEvent, slackIcon: Image}> =({event, slackIcon}) => {
  const id = `e-${event.startAt.toISOString()}-${event.location.address}`.toLowerCase().replace(/[^\w]+/g, '-')
  return <li className={`${event.timezone}`.split('/')[0].toLowerCase()}>
    <div className='mv3 flex-ns items-start pb3 pb0-l module'>
      <div className='date bg-sky w3 h3 white tc b'>
        <p className='f2 ma0'>{event.startAt.format('D')}</p>
        <p className='ttu ma0'>{event.startAt.format('MMM')}</p>
      </div>
      <div className='bg-evian ph4 pt2 flex-auto relative'>
        <h3 className='f3 ma0 mt3 mb2'>{event.details.title} — {isVenueOnline(event.location) ? 'Online' : event.location.city}</h3>
        <h4 className='normal black-70 mt1 mb4'>{event.duration.asDays()} days course</h4>
        <div className={`controls controls-${id} absolute top-1 right-1`}>
          <button className='open bg-sky pa2 white f7 tc lh-solid bn br1' data-toggle={`.details-${id},.controls-${id}`} data-toggle-collapsed>▼</button>
          <button className='close bg-sky pa2 white f7 tc lh-solid bn br1' data-toggle={`.details-${id},.controls-${id}`}>▲</button>
        </div>
        <div className={`details details-${id}`}>
          <p className='ma0 mv3'><span className='ttu b black-20 f6 v-mid'>Location:</span> <span></span>&nbsp;
    {isVenueOnline(event.location) ?
      <span className='link dib navy v-mid'>Online <span className='w1 v-mid dib'><Img image={slackIcon}/></span></span> :
      <span className='link dib navy underline v-mid'>{event.location.city}, {event.location.country}</span>
          }
          </p>
          <p className='ma0 mv3'><span className='ttu b black-20 f6'>Starts at:</span> <span className='f5 black-70 dib'>{event.startAt.tz(event.timezone).format('h:mm A z')}</span></p>
          <p className='ma0 mv3'><span className='ttu b black-20 f6'>Price:</span> <span className='f4 black-70 relative dib'>{event.offer.price.toLocaleString(event.offer.locale, {style: 'currency', currency: event.offer.currency})} <span className='f7 v-mid absolute right--2 top-0'>+TAX</span></span></p>
          <p><PrimaryButton text='Get in touch &#8594;' mailto={mailto(publicCourseEnquiry(event.startAt, event.location))}/></p>
        </div>
      </div>
    </div>
  </li>
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
          <div className='padding-hack-75 relative'>
            <Img image={preview} className='absolute top-0 right-0'/>
          </div>
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
    </div>
  </div>
}

export function CreateToggle() {
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
