import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const courseInPersonAdapter = createEntityAdapter<CourseInPerson>({})
export const courseOnlineAdapter = createEntityAdapter<CourseOnline>({})

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
