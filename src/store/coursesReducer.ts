import { VReference } from '../files'
import { createEntityAdapter, createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { store } from '.'

const courseAdapter = createEntityAdapter<Course>({})
const venueAdapter = createEntityAdapter<CourseVenue>({})
const workshopAdapter = createEntityAdapter<Workshop>({})
const pictureAdapter = createEntityAdapter<CoursePicture>({})
const priceAdapter = createEntityAdapter<CoursePrice>({})
const onlineCourseAdapter = createEntityAdapter<OnlineCourse>({})
const courseInPersonAdapter = createEntityAdapter<CourseInPerson>({})
const courseOnlineAdapter = createEntityAdapter<CourseOnline>({})

export const courseSlice = createSlice({
  name: 'course',
  initialState: courseAdapter.getInitialState(),
  reducers: {
    add: courseAdapter.addOne,
  },
})

export const venueSlice = createSlice({
  name: 'venue',
  initialState: venueAdapter.getInitialState(),
  reducers: {
    add: venueAdapter.addOne,
  },
})

export const workshopSlice = createSlice({
  name: 'workshop',
  initialState: workshopAdapter.getInitialState(),
  reducers: {
    add: (state, action: PayloadAction<Workshop>) => {
      return workshopAdapter.addOne(state, action)
    },
  },
})

export const pictureSlice = createSlice({
  name: 'picture',
  initialState: pictureAdapter.getInitialState(),
  reducers: {
    add: pictureAdapter.addOne,
  },
})

export const priceSlice = createSlice({
  name: 'price',
  initialState: priceAdapter.getInitialState(),
  reducers: {
    add: priceAdapter.addOne,
  },
})

export const onlineCourseSlice = createSlice({
  name: 'onlineCourse',
  initialState: onlineCourseAdapter.getInitialState(),
  reducers: {
    add: onlineCourseAdapter.addOne,
  },
})

export const courseInPersonSlice = createSlice({
  name: 'coursesInPerson',
  initialState: courseInPersonAdapter.getInitialState(),
  reducers: {
    add: (state, action: PayloadAction<Omit<CourseInPerson, 'type'>>) => {
      return courseInPersonAdapter.addOne(state, { ...action.payload, type: 'in-person' })
    },
  },
})

export const courseOnlineSlice = createSlice({
  name: 'coursesOnline',
  initialState: courseOnlineAdapter.getInitialState(),
  reducers: {
    add: (state, action: PayloadAction<Omit<CourseOnline, 'type'>>) => {
      return courseOnlineAdapter.addOne(state, { ...action.payload, type: 'online' })
    },
  },
})

export type State = ReturnType<typeof store.getState>

export const courseReducer = {
  courses: courseSlice.reducer,
  venues: venueSlice.reducer,
  workshops: workshopSlice.reducer,
  pictures: pictureSlice.reducer,
  prices: priceSlice.reducer,
  onlineCourses: onlineCourseSlice.reducer,
  coursesInPerson: courseInPersonSlice.reducer,
  coursesOnline: courseOnlineSlice.reducer,
}

export const Action = {
  courses: { ...courseSlice.actions },
  venues: { ...venueSlice.actions },
  workshops: { ...workshopSlice.actions },
  pictures: { ...pictureSlice.actions },
  prices: { ...priceSlice.actions },
  onlineCourses: { ...onlineCourseSlice.actions },
  addInPersonCourse: courseInPersonSlice.actions.add,
  addOnlineCourse: courseOnlineSlice.actions.add,
}

export const Selector = {
  courses: courseAdapter.getSelectors<State>(state => state.courses),
  venues: venueAdapter.getSelectors<State>(state => state.venues),
  workshops: workshopAdapter.getSelectors<State>(state => state.workshops),
  pictures: pictureAdapter.getSelectors<State>(state => state.pictures),
  prices: priceAdapter.getSelectors<State>(state => state.prices),
  onlineCourses2: onlineCourseAdapter.getSelectors<State>(state => state.onlineCourses),
  onlineCourses: courseOnlineAdapter.getSelectors<State>(state => state.coursesOnline),
  inPersonCourses: courseInPersonAdapter.getSelectors<State>(state => state.coursesInPerson),
}

const checkWorkshop = middlewareCheck(checkWorkshopRequirement)

export const middlewares = [checkWorkshop]

function middlewareCheck<T>(checkFn: (action: PayloadAction<T>, store: any) => void) {
  return (store: any) => {
    return (next: Dispatch<PayloadAction<T>>) => (action: PayloadAction<T>) => {
      checkFn(action, store)
      return next(action)
    }
  }
}

function checkWorkshopRequirement(action: PayloadAction<Workshop>, store: any) {
  if (action.type === 'workshop/add') {
    if (
      !Selector.courses
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.courseId)
    ) {
      throw new Error(`I couldn't find the course ${action.payload.courseId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.venues
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.venueId)
    ) {
      throw new Error(`I couldn't find the venue ${action.payload.venueId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.prices
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.priceId)
    ) {
      throw new Error(`I couldn't find the price ${action.payload.priceId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.pictures
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.pictureId)
    ) {
      throw new Error(
        `I couldn't find the picture ${action.payload.pictureId}. Please fix Workshop ${action.payload.id}`,
      )
    }
  }
}

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

export interface CourseInPerson {
  id: string
  type: 'in-person'
  startsAt: string
  endsAt: string
  title: string
  description: string
  priceAsString: string
  price: number
  currency: string
  location: string
  address: string
  tags: string[]
  timezone: string
  link: string
  url: string
}

export interface CourseOnline {
  id: string
  type: 'online'
  startsAt: string
  endsAt: string
  title: string
  description: string
  priceAsString: string
  price: number
  currency: string
  location: string
  tags: string[]
  timezone: string
  link: string
  url: string
}
