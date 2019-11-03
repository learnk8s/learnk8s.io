import { createStore, combineReducers } from 'redux'
import * as CoursesReducer from './coursesReducer'
import * as WebsiteReducer from './websiteReducer'
import * as ConfigReducer from './configReducer'

export type State = {
  courses: CoursesReducer.State
  website: WebsiteReducer.State
  config: ConfigReducer.State
}

export type Actions = CoursesReducer.Actions | WebsiteReducer.Actions

export const Action = {
  ...CoursesReducer.Action,
  ...WebsiteReducer.Action,
}

export const store = createStore<State, Actions, {}, {}>(
  combineReducers({
    courses: CoursesReducer.RootReducer,
    website: WebsiteReducer.RootReducer,
    config: ConfigReducer.RootReducer,
  }),
  {
    courses: CoursesReducer.createInitialState({}),
    website: WebsiteReducer.createInitialState({}),
    config: ConfigReducer.createInitialState({
      organisationId: process.env.ENVENTBRITE_ORG as string,
      isProduction: process.env.NODE_ENV === 'production',
      hostname: 'learnk8s.io',
      protocol: 'https',
      eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
      googleAnalytics: process.env.GOOGLE_ANALYTICS as string,
      outputFolder: '_site',
    }),
  },
)

export function getVenues(state: State): CoursesReducer.CourseVenue[] {
  return Object.values(state.courses.venues)
}

export function getWorkshops(state: State): CoursesReducer.FullWorkshop[] {
  return Object.values(state.courses.workshops).map(workshop => {
    return {
      price: Object.values(state.courses.prices).find(it => it.id === workshop.priceId)!,
      venue: Object.values(state.courses.venues).find(it => it.id === workshop.venueId)!,
      picture: Object.values(state.courses.pics).find(it => it.id === workshop.pictureId)!,
      ...Object.values(state.courses.courses).find(it => it.id === workshop.courseId)!,
      ...workshop,
    }
  })
}

export function getConfig(state: State): ConfigReducer.State {
  return state.config
}

export function getPages(state: State): WebsiteReducer.Page[] {
  return Object.values(state.website.pages)
}

export function getOpenGraph(state: State): WebsiteReducer.OpenGraph[] {
  return Object.values(state.website.openGraph)
}

export function getLandingPageLocations(state: State): WebsiteReducer.LandingPage[] {
  return Object.values(state.website.landingPages)
}
