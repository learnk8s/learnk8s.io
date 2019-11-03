import marked from 'marked'
import { cat } from 'shelljs'
import { Store } from 'redux'
import { State, Actions, Action } from './store'

const renderer = new marked.Renderer()

const NewVenues = {
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
}

const NewCoursePrice = {
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
    currency: 'EUR',
    locale: 'en-HK',
  },
  Italy: {
    id: 'it3days',
    price: 1500,
    currency: 'EUR',
    locale: 'it-IT',
  },
}

const NewCourses = {
  threeDays: {
    id: '3days-eng',
    duration: '3 days',
    title: 'Advanced Kubernetes training',
    description: marked(cat(`${__dirname}/description_en.md`).toString(), { renderer }),
    language: 'English',
  },
  threeDaysIT: {
    id: '3days-it',
    duration: '3 days',
    title: 'Advanced Kubernetes training',
    description: marked(cat(`${__dirname}/description_it.md`).toString(), { renderer }),
    language: 'Italiano',
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
  Object.values(NewCourses).forEach(course => store.dispatch(Action.registerCourse(course)))
  Object.values(NewVenues).forEach(venue => store.dispatch(Action.registerCourseVenue(venue)))
  Object.values(NewCoursePrice).forEach(price => store.dispatch(Action.registerCoursePrice(price)))
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SINGAPORE|20191127',
      startAt: new Date('2019-11-27T10:00:00').toISOString(),
      endsAt: new Date('2019-11-29T17:00:00').toISOString(),
      timezone: 'Asia/Singapore',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Singapore.id,
      venueId: NewVenues.JustCoSg.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|LONDON|20191202',
      startAt: new Date('2019-12-02T09:30:00').toISOString(),
      endsAt: new Date('2019-12-04T05:00:00').toISOString(),
      timezone: 'Europe/London',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.GreatBritain.id,
      venueId: NewVenues.LondonCitizenM.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SYDNEY|20191216',
      startAt: new Date('2019-12-16T09:30:00').toISOString(),
      endsAt: new Date('2019-12-18T05:00:00').toISOString(),
      timezone: 'Australia/Sydney',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Sydney.id,
      venueId: NewVenues.GenericSydney.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|TORONTO|20200129',
      startAt: new Date('2020-01-29T09:30:00').toISOString(),
      endsAt: new Date('2020-01-31T05:00:00').toISOString(),
      timezone: 'America/Toronto',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Canada.id,
      venueId: NewVenues.GenericToronto.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SANFRANCISCO|20200203',
      startAt: new Date('2020-02-03T09:30:00').toISOString(),
      endsAt: new Date('2020-02-05T05:00:00').toISOString(),
      timezone: 'America/Los_Angeles',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.UnitedStates.id,
      venueId: NewVenues.GenericSanFrancisco.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|ZURICH|20200210',
      startAt: new Date('2020-02-10T09:30:00').toISOString(),
      endsAt: new Date('2020-02-12T05:00:00').toISOString(),
      timezone: 'Europe/Zurich',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Switzerland.id,
      venueId: NewVenues.GenericZurich.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|VIENNA|20200217',
      startAt: new Date('2020-02-17T09:30:00').toISOString(),
      endsAt: new Date('2020-02-19T05:00:00').toISOString(),
      timezone: 'Europe/Vienna',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Austria.id,
      venueId: NewVenues.GenericVienna.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SINGAPORE|20200217',
      startAt: new Date('2020-02-17T10:00:00').toISOString(),
      endsAt: new Date('2020-02-19T17:00:00').toISOString(),
      timezone: 'Asia/Singapore',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Singapore.id,
      venueId: NewVenues.JustCoSg.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|PARIS|20200217',
      startAt: new Date('2020-02-17T10:00:00').toISOString(),
      endsAt: new Date('2020-02-19T17:00:00').toISOString(),
      timezone: 'Europe/Paris',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.France.id,
      venueId: NewVenues.GenericParis.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|SYDNEY|20200304',
      startAt: new Date('2020-03-04T09:30:00').toISOString(),
      endsAt: new Date('2020-03-06T05:00:00').toISOString(),
      timezone: 'Australia/Sydney',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Sydney.id,
      venueId: NewVenues.GenericSydney.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|BERLIN|20200304',
      startAt: new Date('2020-02-26T09:30:00').toISOString(),
      endsAt: new Date('2020-02-28T05:00:00').toISOString(),
      timezone: 'Europe/Berlin',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.Germany.id,
      venueId: NewVenues.GenericBerlin.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|LONDON|20200311',
      startAt: new Date('2020-03-11T09:30:00').toISOString(),
      endsAt: new Date('2020-03-13T05:00:00').toISOString(),
      timezone: 'Europe/London',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.GreatBritain.id,
      venueId: NewVenues.LondonCitizenM.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|HONGKONG|20200311',
      startAt: new Date('2020-03-11T09:30:00').toISOString(),
      endsAt: new Date('2020-03-13T05:00:00').toISOString(),
      timezone: 'Asia/Hong_Kong',
      courseId: NewCourses.threeDays.id,
      priceId: NewCoursePrice.HongKong.id,
      venueId: NewVenues.GenericHongKong.id,
      pictureId: NewPictures.one.id,
    }),
  )
  store.dispatch(
    Action.registerWorkshop({
      id: 'LK8S|MILAN|20190923',
      startAt: new Date('2020-03-18T09:30:00').toISOString(),
      endsAt: new Date('2020-03-20T05:00:00').toISOString(),
      timezone: 'Europe/Rome',
      courseId: NewCourses.threeDaysIT.id,
      priceId: NewCoursePrice.Italy.id,
      venueId: NewVenues.GenericMilan.id,
      pictureId: NewPictures.one.id,
    }),
  )
}
