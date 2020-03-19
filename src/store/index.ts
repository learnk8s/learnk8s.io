import { createStore, combineReducers } from 'redux'
import * as CoursesReducer from './coursesReducer'
import * as WebsiteReducer from './websiteReducer'
import * as ConfigReducer from './configReducer'
import { OnlineCourse } from './coursesReducer'

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
      canPublishEvents: process.env.PUBLISH_EVENTS === 'yes',
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

export function getAuthors(state: State): WebsiteReducer.Author[] {
  return Object.values(state.website.authors)
}

export function getBlogPosts(state: State): WebsiteReducer.BlogPost[] {
  return Object.values(state.website.blogPosts)
}

export function hasTag(state: State, tagId: string) {
  return (page: WebsiteReducer.Page) => {
    return state.website.tags[page.id] && state.website.tags[page.id].includes(tagId)
  }
}

export function getBlogPostMarkdownBlocks(state: State): WebsiteReducer.BlogPostMarkdownBlock[] {
  return Object.values(state.website.relatedBlocks)
}

export function getRedirects(state: State): WebsiteReducer.Redirect[] {
  return Object.values(state.website.redirects)
}

export function getPreviewPictures(state: State): WebsiteReducer.PreviewPicture[] {
  return Object.values(state.website.previewPictures)
}

export function getOnlineCourses(state: State): OnlineCourse[] {
  return Object.values(state.courses.onlineCourse)
}
