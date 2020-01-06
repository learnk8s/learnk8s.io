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
  GenericSanFrancisco: {
    id: 'genericsf',
    locationName: 'San Francisco',
    city: 'San Francisco',
    country: 'California',
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
  Sydney: {
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
      id: 'LK8S|LONDON|20200122',
      startAt: '2020-02-17T09:30:00',
      endsAt: '2020-02-19T05:00:00',
      timezone: 'Europe/London',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.GreatBritain.id,
      venueId: Venues.LondonCitizenM.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|TORONTO|20200129',
      startAt: '2020-02-10T09:30:00',
      endsAt: '2020-02-12T05:00:00',
      timezone: 'America/Toronto',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Canada.id,
      venueId: Venues.GenericToronto.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SANFRANCISCO|20200203',
      startAt: '2020-02-17T09:30:00',
      endsAt: '2020-02-19T05:00:00',
      timezone: 'America/Los_Angeles',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedStates.id,
      venueId: Venues.GenericSanFrancisco.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|ZURICH|20200210',
      startAt: '2020-02-10T09:30:00',
      endsAt: '2020-02-12T05:00:00',
      timezone: 'Europe/Zurich',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Switzerland.id,
      venueId: Venues.GenericZurich.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|VIENNA|20200217',
      startAt: '2020-02-17T09:30:00',
      endsAt: '2020-02-19T05:00:00',
      timezone: 'Europe/Vienna',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Austria.id,
      venueId: Venues.GenericVienna.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SINGAPORE|20200217',
      startAt: '2020-02-17T10:00:00',
      endsAt: '2020-02-19T17:00:00',
      timezone: 'Asia/Singapore',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Singapore.id,
      venueId: Venues.JustCoSg.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|PARIS|20200217',
      startAt: '2020-02-17T10:00:00',
      endsAt: '2020-02-19T17:00:00',
      timezone: 'Europe/Paris',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.France.id,
      venueId: Venues.GenericParis.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SYDNEY|20200304',
      startAt: '2020-03-04T09:30:00',
      endsAt: '2020-03-06T05:00:00',
      timezone: 'Australia/Sydney',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.Sydney.id,
      venueId: Venues.GenericSydney.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|BERLIN|20200304',
      startAt: '2020-02-26T09:30:00',
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
      startAt: '2020-03-11T09:30:00',
      endsAt: '2020-03-13T05:00:00',
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
      startAt: '2020-03-11T09:30:00',
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
      startAt: '2020-03-18T09:30:00',
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
      startAt: '2020-03-18T09:30:00',
      endsAt: '2020-03-20T05:00:00',
      timezone: 'Asia/Dubai',
      courseId: Courses.threeDays.id,
      priceId: CoursePrice.UnitedArabEmirates.id,
      venueId: Venues.GenericDubai.id,
      pictureId: NewPictures.one.id,
    }),
  )
}
