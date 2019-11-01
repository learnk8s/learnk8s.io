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
  registerWorkshop(args: Workshop) {
    return { type: 'REGISTER_WORKSHOP' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

type FullWorkshop = Omit<Workshop, 'courseId' | 'priceId' | 'venueId'> &
  Omit<CourseVenue, 'id'> &
  Omit<CoursePrice, 'id'> &
  Omit<Course, 'id'>

type Workshop = {
  id: string
  startAt: string
  endsAt: string
  timezone: string
  courseId: string
  priceId: string
  venueId: string
}

type Course = {
  id: string
  duration: string
  title: string
  language: string
  description: string
}

type CourseVenue = {
  id: string
  locationName: string
  country: string
  countryCode: string
  city: string
  postcode?: string
  address?: string
}

type CoursePrice = { id: string; price: number; currency: string; locale: string }

export interface State {
  organisationId: string
  courses: Record<string, Course>
  venues: Record<string, CourseVenue>
  prices: Record<string, CoursePrice>
  workshops: Record<string, Workshop>
}

export function createInitialState(options: { organisationId: string }): State {
  return {
    ...options,
    courses: {},
    venues: {},
    prices: {},
    workshops: {},
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
    case 'REGISTER_WORKSHOP': {
      if (!(action.courseId in state.courses)) {
        throw new Error(`I couldn't find the course ${action.courseId}. Please fix Workshop ${action.id}`)
      }
      if (!(action.venueId in state.venues)) {
        throw new Error(`I couldn't find the venue ${action.venueId}. Please fix Workshop ${action.id}`)
      }
      if (!(action.priceId in state.prices)) {
        throw new Error(`I couldn't find the price ${action.priceId}. Please fix Workshop ${action.id}`)
      }
      return { ...state, workshops: { ...state.workshops, [action.id]: { ...action } } }
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

export function getWorkshops(state: State): FullWorkshop[] {
  return Object.values(state.workshops).map(workshop => {
    return {
      ...Object.values(state.prices).find(it => it.id === workshop.priceId)!,
      ...Object.values(state.venues).find(it => it.id === workshop.venueId)!,
      ...Object.values(state.courses).find(it => it.id === workshop.courseId)!,
      ...workshop,
    }
  })
}
