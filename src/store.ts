import { Reducer } from 'redux'

export const Action = {
  registerCourse(args: Course) {
    return { type: 'REGISTER_COURSE' as const, ...args }
  },
  registerCourseVenue(args: CourseVenue) {
    return { type: 'REGISTER_COURSE_VENUE' as const, ...args }
  },
  registerCoursePrice(args: CoursePrice) {
    return { type: 'REGISTER_COURSE_PRICE' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

export type Course = {
  id: string
  startAt: string
  duration: string
  title: string
  language: string
  description: string
}

export type CourseVenue = {
  id: string
  courseId: string
  name: string
  country: string
  countryCode: string
  city: string
  postcode?: string
  address?: string
}

export type CoursePrice = { id: string; courseId: string; price: number; currency: string; locale: string }

export interface State {
  organisationId: string
  courses: Record<string, Course>
  venues: Record<string, CourseVenue>
  prices: Record<string, CoursePrice>
}

export function createInitialState(options: { organisationId: string }): State {
  return {
    ...options,
    courses: {},
    venues: {},
    prices: {},
  }
}

export const RootReducer: Reducer<State, Actions> = (
  state = createInitialState({ organisationId: 'unknown' }),
  action: Actions,
): State => {
  switch (action.type) {
    case 'REGISTER_COURSE': {
      return { ...state, courses: { ...state.courses, [action.id]: { ...action } } }
    }
    case 'REGISTER_COURSE_VENUE': {
      return { ...state, venues: { ...state.venues, [action.id]: { ...action } } }
    }
    case 'REGISTER_COURSE_PRICE': {
      return { ...state, prices: { ...state.prices, [action.id]: { ...action } } }
    }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}

export function getVenues(state: State): CourseVenue[] {
  return Object.values(state.venues)
}

export function getCourses(state: State): Course[] {
  return Object.values(state.courses)
}
