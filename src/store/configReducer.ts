import { Reducer } from 'redux'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { storeV2 } from '.'

const configAdapter = createEntityAdapter<Config>({})

export const configSlice = createSlice({
  name: 'config',
  initialState: configAdapter.getInitialState({}),
  reducers: {
    add: configAdapter.addOne,
    update: configAdapter.updateOne,
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

export const middlewares = []

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

export function createInitialState(options: {
  id: string
  organisationId: string
  protocol: string
  hostname: string
  isProduction: boolean
  eventBriteToken: string
  googleAnalytics: string
  outputFolder: string
  canPublishEvents: boolean
}): Config {
  return {
    ...options,
  }
}

export const RootReducer: Reducer<Config, any> = (
  state = createInitialState({
    id: 'config',
    organisationId: 'unknown',
    protocol: 'http',
    hostname: 'localhost',
    isProduction: false,
    eventBriteToken: 'invalid',
    googleAnalytics: 'invalid',
    outputFolder: '_site',
    canPublishEvents: false,
  }),
  action: any,
): Config => {
  switch (action.type) {
    default:
      return state
  }
}

function assertUnreachable(x: never): void {}
