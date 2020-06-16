import { State, Action, store, Store, Selector } from './store'
import { toVFile } from './files'
import { join } from 'path'

const Venues = {
  JustCoSg: {
    id: 'justcosg',
    locationName: 'JustCo Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
  },
  LondonCitizenM: {
    id: 'citizenmldn',
    locationName: 'CitizenM Hotel',
    address: '20 Lavington St',
    city: 'London',
    country: 'UK',
    countryCode: 'GB',
    postcode: 'SE1 0NZ',
  },
  GenericSydney: {
    id: 'genericsyd',
    locationName: 'Sydney',
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
  },
  GenericMelbourne: {
    id: 'genericmel',
    locationName: 'Melbourne',
    city: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
  },
  GenericSanFrancisco: {
    id: 'genericsf',
    locationName: 'San Francisco',
    city: 'San Francisco',
    country: 'California',
    countryCode: 'US',
  },
  GenericSeattle: {
    id: 'genericseattle',
    locationName: 'Seattle',
    city: 'Seattle',
    country: 'Washington',
    countryCode: 'US',
  },
  GenericToronto: {
    id: 'genericto',
    locationName: 'Toronto',
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
  },
  GenericZurich: {
    id: 'genriczh',
    locationName: 'Zurich',
    city: 'Zurich',
    country: 'Switzerland',
    countryCode: 'CH',
  },
  GenericVienna: {
    id: 'genericvi',
    locationName: 'Vienna',
    city: 'Vienna',
    country: 'Austria',
    countryCode: 'AT',
  },
  GenericParis: {
    id: 'genericpa',
    locationName: 'Paris',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
  },
  GenericBerlin: {
    id: 'genericbe',
    locationName: 'Berlin',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
  },
  GenericMunich: {
    id: 'genericmu',
    locationName: 'Munich',
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
  },
  GenericHongKong: {
    id: 'generichk',
    locationName: 'Hong Kong',
    city: 'Hong Kong',
    country: 'Hong Kong',
    countryCode: 'HK',
  },
  GenericMilan: {
    id: 'genericmi',
    locationName: 'Milano',
    city: 'Milan',
    country: 'Italy',
    countryCode: 'IT',
  },
  GenericDubai: {
    id: 'genericdu',
    locationName: 'Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
}

const CoursePrice = {
  Singapore: {
    id: 'sgd3days',
    price: 2550,
    currency: 'SGD',
    locale: 'en-SG',
  },
  GreatBritain: {
    id: 'ldn3days',
    price: 1950,
    currency: 'GBP',
    locale: 'en-GB',
  },
  Australia: {
    id: 'syd3days',
    price: 2550,
    currency: 'AUD',
    locale: 'en-AU',
  },
  UnitedStates: {
    id: 'us3days',
    price: 2650,
    currency: 'USD',
    locale: 'en-US',
  },
  Canada: {
    id: 'ca3days',
    price: 2850,
    currency: 'CAD',
    locale: 'en-AU',
  },
  Switzerland: {
    id: 'sw3days',
    price: 2800,
    currency: 'CHF',
    locale: 'de-CH',
  },
  Austria: {
    id: 'at3days',
    price: 1995,
    currency: 'EUR',
    locale: 'de-AT',
  },
  France: {
    id: 'fr3days',
    price: 1950,
    currency: 'EUR',
    locale: 'fr-FR',
  },
  Germany: {
    id: 'de3days',
    price: 1995,
    currency: 'EUR',
    locale: 'de-DE',
  },
  HongKong: {
    id: 'hk3days',
    price: 14700,
    currency: 'HKD',
    locale: 'en-HK',
  },
  Italy: {
    id: 'it3days',
    price: 1500,
    currency: 'EUR',
    locale: 'it-IT',
  },
  UnitedArabEmirates: {
    id: 'uae3days',
    price: 1900,
    currency: 'USD',
    locale: 'ar-AE',
  },
}

const Courses = {
  threeDays: {
    id: '3days-eng',
    duration: '3 days',
    title: 'Advanced Kubernetes training',
    description: toVFile({ path: join(__dirname, 'description_en.md') }),
    language: 'English',
  },
}

const NewPictures = {
  one: {
    id: 'one',
    src: 'assets/open_graph_preview.png',
  },
}

export function Register(store: Store) {
  Object.values(NewPictures).forEach(picture => store.dispatch(Action.pictures.add(picture)))
  Object.values(Courses).forEach(course => store.dispatch(Action.courses.add(course)))
  Object.values(Venues).forEach(venue => store.dispatch(Action.venues.add(venue)))
  Object.values(CoursePrice).forEach(price => store.dispatch(Action.prices.add(price)))

  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|LONDON|20201005',
      startsAt: '2020-10-05T09:30:00',
      endsAt: '2020-10-07T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'GBP 1950.00',
      price: 1950,
      currency: 'GBP',
      location: 'London',
      address: 'CitizenM Southbank, London, UK',
      tags: ['country-europe', 'course-in-person'],
      timezone: 'GMT',
      link: '#',
      url: '/london-october-2020',
    }),
  )
  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|SINGAPORE|20201005',
      startsAt: '2020-10-05T09:30:00',
      endsAt: '2020-10-07T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'SGD 2550.00',
      price: 2550,
      currency: 'SGD',
      location: 'Singapore',
      address: 'JustCo, Singapore',
      tags: ['country-sea', 'course-in-person'],
      timezone: 'SGT',
      link: '#',
      url: '/singapore-october-2020',
    }),
  )
  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|SANFRANCISCO|20201012',
      startsAt: '2020-10-05T09:30:00',
      endsAt: '2020-10-07T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,650.00',
      price: 2650,
      currency: 'USD',
      location: 'San Francisco',
      address: 'San Francisco, CA',
      tags: ['country-na', 'course-in-person'],
      timezone: 'PDT',
      link: '#',
      url: '/san-francisco-october-2020',
    }),
  )
  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|ZURICH|20201005',
      startsAt: '2020-10-05T09:30:00',
      endsAt: '2020-10-07T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'SGD 2550.00',
      price: 2800,
      currency: 'CHF',
      location: 'Zurich',
      address: 'Zurich, Switzerland',
      tags: ['country-europe', 'course-in-person'],
      timezone: 'CET',
      link: '#',
      url: '/zurich-october-2020',
    }),
  )

  store.dispatch(
    Action.addOnlineCourse({
      id: 'LK8S|ONLINE|20200601',
      startsAt: '2020-06-01T10:00:00',
      endsAt: '2020-06-03T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      timezone: 'SGT',
      link: '#',
      url: '/online-singapore-june-2020',
    }),
  )
  store.dispatch(
    Action.addOnlineCourse({
      id: 'LK8S|ONLINE|20200608',
      startsAt: '2020-06-08T09:00:00',
      endsAt: '2020-06-10T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      timezone: 'CET',
      link: '#',
      url: '/online-london-june-2020',
    }),
  )
  store.dispatch(
    Action.addOnlineCourse({
      id: 'LK8S|ONLINE|20200629',
      startsAt: '2020-06-29T09:00:00',
      endsAt: '2020-07-01T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      timezone: 'EST',
      link: '#',
      url: '/online-new-york-june-2020',
    }),
  )
  store.dispatch(
    Action.addOnlineCourse({
      id: 'LK8S|ONLINE|20200812',
      startsAt: '2020-08-12T09:00:00',
      endsAt: '2020-08-14T17:00:00',
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      timezone: 'CET',
      link: '#',
      url: '/online-europe-august-2020',
    }),
  )
}
