import moment from 'moment-timezone'
import marked from 'marked'
import { cat } from 'shelljs'

const renderer = new marked.Renderer()

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
  return venue.name === Venues.Online.name
}

export const Venues = {
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
  },
  TorontoGK: {
    name: 'Toronto Global Knowledge',
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    address: '2 Bloor Street East 31st Floor',
    postcode: 'M4W 1A8',
  },
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

export const Courses: KubernetesCourse[] = [
  {
    name: 'Advanced Kubernetes training',
    code: CourseCode.ADVANCED,
    description: 'Learn how to deploy and scale applications with Kubernetes.',
    events: [
      {
        code: 'LK8S|SINGAPORE|20190429',
        startAt: moment('2019-04-29T09:30:00+08:00'),
        timezone: Timezone.SINGAPORE,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Singapore,
        offer: {
          price: 3400,
          currency: CurrencyCode.SGD,
          locale: 'en-SG',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|CARDIFF|20190429',
        startAt: moment('2019-05-29T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Cardiff,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|TORONTO|20190513',
        startAt: moment('2019-05-13T09:30:00-04:00'),
        timezone: Timezone.TORONTO,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.TorontoGK,
        offer: {
          price: 3300,
          currency: CurrencyCode.CAD,
          locale: 'en-CA',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|LONDON|20190522',
        startAt: moment('2019-05-22T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Online,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|SANFRANCISCO|20190603',
        startAt: moment('2019-06-03T09:30:00-07:00'),
        timezone: Timezone.SAN_FRANCISCO,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.SanFrancisco,
        offer: {
          price: 2650,
          currency: CurrencyCode.USD,
          locale: 'it-IT',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|LONDON|20190605',
        startAt: moment('2019-06-05T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.London,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|MILAN|20190610',
        startAt: moment('2019-06-10T09:30:00+01:00'),
        timezone: Timezone.ROME,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Milan,
        offer: {
          price: 2050,
          currency: CurrencyCode.EUR,
          locale: 'it-IT',
        },
        language: Language.ITALIAN,
        description: marked(cat(`${__dirname}/description_it.md`).toString(), { renderer }),
        eventbriteLogoId: '53323631',
      },
      {
        code: 'LK8S|SINGAPORE|20190703',
        startAt: moment('2019-07-03T09:30:00+08:00'),
        timezone: Timezone.SINGAPORE,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Singapore,
        offer: {
          price: 3400,
          currency: CurrencyCode.SGD,
          locale: 'en-SG',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|TORONTO|20190904',
        startAt: moment('2019-09-04T09:30:00-04:00'),
        timezone: Timezone.TORONTO,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.TorontoGK,
        offer: {
          price: 3300,
          currency: CurrencyCode.CAD,
          locale: 'en-CA',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|LONDON|20190916',
        startAt: moment('2019-09-16T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.London,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|MILAN|20190923',
        startAt: moment('2019-09-23T09:30:00+01:00'),
        timezone: Timezone.ROME,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Milan,
        offer: {
          price: 2050,
          currency: CurrencyCode.EUR,
          locale: 'it-IT',
        },
        language: Language.ITALIAN,
        description: marked(cat(`${__dirname}/description_it.md`).toString(), { renderer }),
        eventbriteLogoId: '53323631',
      },
      {
        code: 'LK8S|LONDON|20191002',
        startAt: moment('2019-10-02T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Online,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|CARDIFF|20191009',
        startAt: moment('2019-10-09T09:30:00+01:00'),
        timezone: Timezone.LONDON,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Cardiff,
        offer: {
          price: 1950,
          currency: CurrencyCode.GBP,
          locale: 'en-GB',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|SINGAPORE|20191009',
        startAt: moment('2019-10-09T09:30:00+08:00'),
        timezone: Timezone.SINGAPORE,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.Singapore,
        offer: {
          price: 3400,
          currency: CurrencyCode.SGD,
          locale: 'en-SG',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
      {
        code: 'LK8S|SANFRANCISCO|20191021',
        startAt: moment('2019-10-21T09:30:00-07:00'),
        timezone: Timezone.SAN_FRANCISCO,
        duration: moment.duration(3, 'days'),
        canBookInAdvanceFrom: moment.duration(90, 'days'),
        details: AdvancedDetails,
        location: Venues.SanFrancisco,
        offer: {
          price: 2650,
          currency: CurrencyCode.USD,
          locale: 'it-IT',
        },
        language: Language.ENGLISH,
        description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
        eventbriteLogoId: '48505063',
      },
    ],
  },
]
