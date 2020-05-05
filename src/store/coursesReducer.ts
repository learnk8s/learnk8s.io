import { Reducer } from 'redux'
import { VReference } from '../files'
import { createEntityAdapter, createSlice, configureStore } from '@reduxjs/toolkit'
import { storeV2 } from '.'

const courseAdapter = createEntityAdapter<Course>({})

export const courseSlice = createSlice({
  name: 'courses',
  initialState: courseAdapter.getInitialState(),
  reducers: {
    add: courseAdapter.addOne,
  },
})

export const courseStore = configureStore({
  reducer: {
    courses: courseSlice.reducer,
  },
})

export const ActionV2 = {
  courses: { ...courseSlice.actions },
}

type StateV2 = ReturnType<typeof storeV2.getState>

export const selector = {
  courses: courseAdapter.getSelectors<StateV2>(state => state.courses),
}

export const Action = {
  // registerCourse(args: Course) {
  //   return { type: 'REGISTER_COURSE' as const, ...args }
  // },
  registerCourseVenue(args: CourseVenue) {
    return { type: 'REGISTER_COURSE_VENUE' as const, ...args }
  },
  registerCoursePrice(args: CoursePrice) {
    return { type: 'REGISTER_COURSE_PRICE' as const, ...args }
  },
  registerWorkshop(args: Workshop) {
    return { type: 'REGISTER_WORKSHOP' as const, ...args }
  },
  registerCoursePicture(args: CoursePicture) {
    return { type: 'REGISTER_COURSE_PIC' as const, ...args }
  },
  registerOnlineCourse(args: OnlineCourse) {
    return { type: 'ONLINE_COURSE' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

export type FullWorkshop = Omit<Workshop, 'courseId' | 'priceId' | 'venueId'> &
  Omit<Course, 'id'> & {
    venue: Omit<CourseVenue, 'id'>
    price: Omit<CoursePrice, 'id'>
    picture: Omit<CoursePicture, 'id'>
  }

type Workshop = {
  id: string
  startsAt: string
  endsAt: string
  timezone: string
  courseId: string
  priceId: string
  venueId: string
  pictureId: string
}

type Course = {
  id: string
  duration: string
  title: string
  language: string
  description: VReference
}

type CoursePicture = {
  id: string
  src: string
}

export type CourseVenue = {
  id: string
  locationName: string
  country: string
  countryCode: string
  city: string
  postcode?: string
  address?: string
}

type CoursePrice = { id: string; price: number; currency: string; locale: string }

export type OnlineCourse = {
  id: string
  defaultPrice: { country: string; currency: string; gross: number }
  timezone: string
  startsAt: string
  endsAt: string
  title: string
  image: string
}

export interface State {
  // courses: Record<string, Course>
  venues: Record<string, CourseVenue>
  prices: Record<string, CoursePrice>
  workshops: Record<string, Workshop>
  pics: Record<string, CoursePicture>
  onlineCourse: Record<string, OnlineCourse>
}

export function createInitialState(options: {}): State {
  return {
    ...options,
    // courses: {},
    venues: {},
    prices: {},
    workshops: {},
    pics: {},
    onlineCourse: {},
  }
}

export const RootReducer: Reducer<State, Actions> = (
  state = createInitialState({ organisationId: 'unknown' }),
  action: Actions,
): State => {
  switch (action.type) {
    // case 'REGISTER_COURSE': {
    //   return { ...state, courses: { ...state.courses, [action.id]: { ...action } } }
    // }
    case 'REGISTER_COURSE_VENUE': {
      return { ...state, venues: { ...state.venues, [action.id]: { ...action } } }
    }
    case 'REGISTER_COURSE_PRICE': {
      return { ...state, prices: { ...state.prices, [action.id]: { ...action } } }
    }
    case 'REGISTER_WORKSHOP': {
      // if (!(action.courseId in state.courses)) {
      //   throw new Error(`I couldn't find the course ${action.courseId}. Please fix Workshop ${action.id}`)
      // }
      if (!(action.venueId in state.venues)) {
        throw new Error(`I couldn't find the venue ${action.venueId}. Please fix Workshop ${action.id}`)
      }
      if (!(action.priceId in state.prices)) {
        throw new Error(`I couldn't find the price ${action.priceId}. Please fix Workshop ${action.id}`)
      }
      if (!(action.pictureId in state.pics)) {
        throw new Error(`I couldn't find the picture ${action.pictureId}. Please fix Workshop ${action.id}`)
      }
      return { ...state, workshops: { ...state.workshops, [action.id]: { ...action } } }
    }
    case 'REGISTER_COURSE_PIC': {
      return { ...state, pics: { ...state.pics, [action.id]: { ...action } } }
    }
    case 'ONLINE_COURSE': {
      return { ...state, onlineCourse: { ...state.onlineCourse, [action.id]: { ...action } } }
    }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}
