import { Store } from 'redux'
import { State, Actions, Action } from './store'
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

export function Register(store: Store<State, Actions>) {
  Object.values(NewPictures).forEach(picture => store.dispatch(Action.registerCoursePicture(picture)))
  Object.values(Courses).forEach(course => store.dispatch(Action.registerCourse(course)))
  Object.values(Venues).forEach(venue => store.dispatch(Action.registerCourseVenue(venue)))
  Object.values(CoursePrice).forEach(price => store.dispatch(Action.registerCoursePrice(price)))
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SINGAPORE|20200217',
      startsAt: '2020-03-16T10:00:00',
      endsAt: '2020-03-18T17:00:00',
      timezone: 'Asia/Singapore',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Singapore.id,
      venueId: Venues.JustCoSg.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SYDNEY|20200304',
      startsAt: '2020-03-04T09:30:00',
      endsAt: '2020-03-06T05:00:00',
      timezone: 'Australia/Sydney',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Australia.id,
      venueId: Venues.GenericSydney.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|BERLIN|20200304',
      startsAt: '2020-02-26T09:30:00',
      endsAt: '2020-02-28T05:00:00',
      timezone: 'Europe/Berlin',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Germany.id,
      venueId: Venues.GenericBerlin.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|LONDON|20200311',
      startsAt: '2020-04-27T09:30:00',
      endsAt: '2020-04-29T05:00:00',
      timezone: 'Europe/London',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.GreatBritain.id,
      venueId: Venues.LondonCitizenM.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|HONGKONG|20200311',
      startsAt: '2020-03-11T09:30:00',
      endsAt: '2020-03-13T05:00:00',
      timezone: 'Asia/Hong_Kong',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.HongKong.id,
      venueId: Venues.GenericHongKong.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|MILAN|20200318',
      startsAt: '2020-03-18T09:30:00',
      endsAt: '2020-03-20T05:00:00',
      timezone: 'Europe/Rome',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Italy.id,
      venueId: Venues.GenericMilan.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|DUBAI|20200318',
      startsAt: '2020-03-18T09:30:00',
      endsAt: '2020-03-20T05:00:00',
      timezone: 'Asia/Dubai',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedArabEmirates.id,
      venueId: Venues.GenericDubai.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|LONDON|20200629',
      startsAt: '2020-06-29T09:30:00',
      endsAt: '2020-07-01T05:00:00',
      timezone: 'Europe/London',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.GreatBritain.id,
      venueId: Venues.LondonCitizenM.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SANFRANCISCO|20200622',
      startsAt: '2020-06-22T09:30:00',
      endsAt: '2020-06-24T05:00:00',
      timezone: 'America/Los_Angeles',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedStates.id,
      venueId: Venues.GenericSanFrancisco.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|MELBOURNE|20200615',
      startsAt: '2020-06-15T09:30:00',
      endsAt: '2020-06-17T05:00:00',
      timezone: 'Australia/Sydney',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Australia.id,
      venueId: Venues.GenericMelbourne.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|HONGKONG|20200610',
      startsAt: '2020-06-10T09:30:00',
      endsAt: '2020-06-12T05:00:00',
      timezone: 'Asia/Hong_Kong',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.HongKong.id,
      venueId: Venues.GenericHongKong.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|MUNICH|20200608',
      startsAt: '2020-06-08T09:30:00',
      endsAt: '2020-06-10T05:00:00',
      timezone: 'Europe/Berlin',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Germany.id,
      venueId: Venues.GenericMunich.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|DUBAI|20200609',
      startsAt: '2020-06-09T09:30:00',
      endsAt: '2020-06-11T05:00:00',
      timezone: 'Asia/Dubai',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedArabEmirates.id,
      venueId: Venues.GenericDubai.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SINGAPORE|20200601',
      startsAt: '2020-06-01T10:00:00',
      endsAt: '2020-06-03T17:00:00',
      timezone: 'Asia/Singapore',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Singapore.id,
      venueId: Venues.JustCoSg.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|ZURICH|20200601',
      startsAt: '2020-06-01T09:30:00',
      endsAt: '2020-06-03T05:00:00',
      timezone: 'Europe/Zurich',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Switzerland.id,
      venueId: Venues.GenericZurich.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|TORONTO|20200615',
      startsAt: '2020-06-15T09:30:00',
      endsAt: '2020-06-17T05:00:00',
      timezone: 'America/Toronto',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Canada.id,
      venueId: Venues.GenericToronto.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SEATTLE|20200629',
      startsAt: '2020-06-29T09:30:00',
      endsAt: '2020-07-01T05:00:00',
      timezone: 'America/Los_Angeles',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedStates.id,
      venueId: Venues.GenericSeattle.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerOnlineCourse({
      id: 'LK8S|ONLINE|20200427',
      timezone: 'Central European Time (CET) UTC+1',
      defaultPrice: {
        country: 'US',
        currency: 'USD',
        gross: 2250,
      },
      startsAt: '2020-04-27T09:00:00',
      endsAt: '2020-04-29T17:00:00',
      title: 'Advanced Kubernetes course — Europe & Africa',
      image: NewPictures.one.src,
    }),
  )
  store.dispatch(
    Action.registerOnlineCourse({
      id: 'LK8S|ONLINE|20200513',
      timezone: 'Central Time US (CDT) UTC-5',
      defaultPrice: {
        country: 'US',
        currency: 'USD',
        gross: 2250,
      },
      startsAt: '2020-06-29T09:00:00',
      endsAt: '2020-06-31T17:00:00',
      title: 'Advanced Kubernetes course — Americas',
      image: NewPictures.one.src,
    }),
  )
  store.dispatch(
    Action.registerOnlineCourse({
      id: 'LK8S|ONLINE|20200527',
      timezone: 'Singapore (SGT) UTC+8',
      defaultPrice: {
        country: 'US',
        currency: 'USD',
        gross: 2250,
      },
      startsAt: '2020-06-01T09:00:00',
      endsAt: '2020-06-03T17:00:00',
      title: 'Advanced Kubernetes course — Asia Pacific',
      image: NewPictures.one.src,
    }),
  )

  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|LONDON|20200527',
      startsAt: new Date().toISOString(),
      endsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'London',
      address: 'London, UK',
      tags: ['country-europe', 'course-in-person'],
      timezone: 'GMT',
      link: '#',
      url: '/london-may-2020',
    }),
  )
  store.dispatch(
    Action.addInPersonCourse({
      id: 'LK8S|SANFRAN|20200527',
      startsAt: new Date().toISOString(),
      endsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'San Francisco',
      address: 'San Francisco, CA',
      tags: ['country-europe', 'course-in-person'],
      timezone: 'GMT',
      link: '#',
      url: '/san-francisco-may-2020',
    }),
  )
  store.dispatch(
    Action.addOnlineCourse({
      id: 'LK8S|ONLINE|20200527',
      startsAt: new Date().toISOString(),
      endsAt: new Date().toISOString(),
      title: 'Advanced Kubernetes course',
      description: `In this course, you will learn how to build a cluster and explore advanced topics such as networking, storage, multi-data centre and multi cloud deployments.`,
      priceAsString: 'USD 2,249.00',
      price: 2249,
      currency: 'USD',
      location: 'Online',
      tags: ['course-online', 'price-online-course'],
      timezone: 'GMT',
      link: '#',
      url: '/online-may-2020',
    }),
  )
}
