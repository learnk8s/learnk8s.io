import { VReference } from '../files'
import { createEntityAdapter, createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { storeV2 } from '.'

const courseAdapter = createEntityAdapter<Course>({})
const venueAdapter = createEntityAdapter<CourseVenue>({})
const workshopAdapter = createEntityAdapter<Workshop>({})
const pictureAdapter = createEntityAdapter<CoursePicture>({})
const priceAdapter = createEntityAdapter<CoursePrice>({})
const onlineCourseAdapter = createEntityAdapter<OnlineCourse>({})

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

export type State = ReturnType<typeof storeV2.getState>

export const Action = {
  courses: { ...courseSlice.actions },
  venues: { ...venueSlice.actions },
  workshops: { ...workshopSlice.actions },
  pictures: { ...pictureSlice.actions },
  prices: { ...priceSlice.actions },
  onlineCourses: { ...onlineCourseSlice.actions },
}

export const Selector = {
  courses: courseAdapter.getSelectors<State>(state => state.courses),
  venues: venueAdapter.getSelectors<State>(state => state.venues),
  workshops: workshopAdapter.getSelectors<State>(state => state.workshops),
  pictures: pictureAdapter.getSelectors<State>(state => state.pictures),
  prices: priceAdapter.getSelectors<State>(state => state.prices),
  onlineCourses: onlineCourseAdapter.getSelectors<State>(state => state.onlineCourses),
}

export const middlewares = [checkWorkshopRegisterRequire]

function checkWorkshopRegisterRequire(store: any) {
  return (next: Dispatch<PayloadAction<Workshop>>) => (action: PayloadAction<Workshop>) => {
    if (action.type !== 'workshop/add') {
      return next(action)
    }
    if (
      !Selector.courses
        .selectAll(storeV2.getState())
        .map(it => it.id)
        .includes(action.payload.courseId)
    ) {
      throw new Error(`I couldn't find the course ${action.payload.courseId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.venues
        .selectAll(storeV2.getState())
        .map(it => it.id)
        .includes(action.payload.venueId)
    ) {
      throw new Error(`I couldn't find the venue ${action.payload.venueId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.prices
        .selectAll(storeV2.getState())
        .map(it => it.id)
        .includes(action.payload.priceId)
    ) {
      throw new Error(`I couldn't find the price ${action.payload.priceId}. Please fix Workshop ${action.payload.id}`)
    }
    if (
      !Selector.pictures
        .selectAll(storeV2.getState())
        .map(it => it.id)
        .includes(action.payload.pictureId)
    ) {
      throw new Error(
        `I couldn't find the picture ${action.payload.pictureId}. Please fix Workshop ${action.payload.id}`,
      )
    }
    return next(action)
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
