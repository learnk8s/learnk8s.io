import { createStore, combineReducers } from 'redux'
import * as CoursesReducer from './coursesReducer'
import * as CoursesReducer2 from './coursesReducer.v2'
import * as WebsiteReducer from './websiteReducer'
import * as ConfigReducer from './configReducer'
import { OnlineCourse } from './coursesReducer'
import { configureStore } from '@reduxjs/toolkit'

export type State = {
  coursesInPerson: ReturnType<typeof CoursesReducer2.courseInPersonSlice.reducer>
  coursesOnline: ReturnType<typeof CoursesReducer2.courseOnlineSlice.reducer>
}

export type StateV2 = ReturnType<typeof storeV2.getState>

export type Actions =
  | ReturnType<typeof CoursesReducer2.courseInPersonSlice.actions.add>
  | ReturnType<typeof CoursesReducer2.courseOnlineSlice.actions.add>

export const Action = {
  ...WebsiteReducer.Action,
  addInPersonCourse: CoursesReducer2.courseInPersonSlice.actions.add,
  addOnlineCourse: CoursesReducer2.courseOnlineSlice.actions.add,
}

export const ActionV2 = {
  ...CoursesReducer.Action,
  ...WebsiteReducer.ActionV2,
  ...ConfigReducer.Action,
}

export type StoreV2 = typeof storeV2

export const storeV2 = configureStore({
  reducer: {
    ...CoursesReducer.courseReducer,
    ...WebsiteReducer.websiteReducer,
    ...ConfigReducer.configReducer,
  },
  middleware: [...WebsiteReducer.middlewares, ...CoursesReducer.middlewares, ...ConfigReducer.middlewares],
})

export const SelectorV2 = {
  ...CoursesReducer.Selector,
  ...WebsiteReducer.Selector,
  ...ConfigReducer.Selector,
}

export const store = createStore<State, Actions, {}, {}>(
  combineReducers({
    coursesInPerson: CoursesReducer2.courseInPersonSlice.reducer,
    coursesOnline: CoursesReducer2.courseOnlineSlice.reducer,
  }),
  {
    // website: WebsiteReducer.createInitialState({}),
    // config: ConfigReducer.createInitialState({
    //   organisationId: process.env.ENVENTBRITE_ORG as string,
    //   isProduction: process.env.NODE_ENV === 'production',
    //   hostname: 'learnk8s.io',
    //   protocol: 'https',
    //   eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
    //   googleAnalytics: process.env.GOOGLE_ANALYTICS as string,
    //   outputFolder: '_site',
    //   canPublishEvents: process.env.PUBLISH_EVENTS === 'yes',
    // }),
  },
)

storeV2.dispatch(
  ActionV2.configs.add({
    id: 'config',
    organisationId: process.env.ENVENTBRITE_ORG as string,
    isProduction: process.env.NODE_ENV === 'production',
    hostname: 'learnk8s.io',
    protocol: 'https',
    eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
    googleAnalytics: process.env.GOOGLE_ANALYTICS as string,
    outputFolder: '_site',
    canPublishEvents: process.env.PUBLISH_EVENTS === 'yes',
  }),
)

export function getVenues(state: StateV2): CoursesReducer.CourseVenue[] {
  return Object.values(SelectorV2.venues.selectAll(state))
}

export function getWorkshops(state: StateV2): CoursesReducer.FullWorkshop[] {
  return Object.values(SelectorV2.workshops.selectAll(state)).map(workshop => {
    return {
      price: Object.values(SelectorV2.prices.selectAll(state)).find(it => it.id === workshop.priceId)!,
      venue: Object.values(SelectorV2.venues.selectAll(state)).find(it => it.id === workshop.venueId)!,
      picture: Object.values(SelectorV2.pictures.selectAll(state)).find(it => it.id === workshop.pictureId)!,
      ...Object.values(SelectorV2.courses.selectAll(state)).find(it => it.id === workshop.courseId)!,
      ...workshop,
    }
  })
}

export function getOnlineCourses(state: StateV2): OnlineCourse[] {
  return Object.values(SelectorV2.onlineCourses.selectAll(state))
}

export function getConfig(state: State): ConfigReducer.Config {
  return SelectorV2.configs.selectAll(storeV2.getState())[0]
}

export const Selector = {
  onlineCourses: CoursesReducer2.courseOnlineAdapter.getSelectors<State>(state => state.coursesOnline),
  inPersonCourses: CoursesReducer2.courseInPersonAdapter.getSelectors<State>(state => state.coursesInPerson),
}

export function getPages(state: State): WebsiteReducer.Page[] {
  return Object.values(SelectorV2.pages.selectAll(storeV2.getState()))
}

export function getOpenGraph(state: State): WebsiteReducer.OpenGraph[] {
  return Object.values(SelectorV2.openGraphs.selectAll(storeV2.getState()))
}

export function getLandingPageLocations(state: State): WebsiteReducer.LandingPage[] {
  return Object.values(SelectorV2.landings.selectAll(storeV2.getState()))
}

export function getAuthors(state: State): WebsiteReducer.Author[] {
  return Object.values(SelectorV2.authors.selectAll(storeV2.getState()))
}

export function getBlogPosts(state: State): WebsiteReducer.BlogPost[] {
  return Object.values(SelectorV2.blogPosts.selectAll(storeV2.getState()))
}

export function hasTag(state: State, tagId: string) {
  return (page: WebsiteReducer.Page) => {
    return SelectorV2.tags
      .selectAll(storeV2.getState())
      .filter(it => it.pageId === page.id)
      .some(it => it.tag === tagId)
  }
}

export function getBlogPostMarkdownBlocks(state: State): WebsiteReducer.BlogPostMarkdownBlock[] {
  return Object.values(SelectorV2.relatedBlogs.selectAll(storeV2.getState()))
}

export function getRedirects(state: State): WebsiteReducer.Redirect[] {
  return Object.values(SelectorV2.redirects.selectAll(storeV2.getState()))
}

export function getPreviewPictures(state: State): WebsiteReducer.PreviewPicture[] {
  return Object.values(SelectorV2.previewPictures.selectAll(storeV2.getState()))
}
