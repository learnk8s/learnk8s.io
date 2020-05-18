import { Reducer } from 'redux'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { storeV2 } from '.'

const configAdapter = createEntityAdapter<Config>({})

export const configSlice = createSlice({
  name: 'config',
  initialState: configAdapter.getInitialState({}),
  reducers: {
    add: configAdapter.addOne,
  },
})

export const Action = {
  configs: { ...configSlice.actions },
}

export const configReducer = {
  configs: configSlice.reducer,
}

export type State = ReturnType<typeof storeV2.getState>

export const Selector = {
  configs: configAdapter.getSelectors<State>(state => state.configs),
}

export interface Config {
  id: string
  organisationId: string
  hostname: string
  protocol: string
  isProduction: boolean
  googleAnalytics: string
  outputFolder: string
  canPublishEvents: boolean
  eventBriteToken: string
}
