import { Reducer } from 'redux'

export interface State {
  organisationId: string
  hostname: string
  protocol: string
  isProduction: boolean
  googleAnalytics: string
  outputFolder: string
  canPublishEvents: boolean
}

export function createInitialState(options: {
  organisationId: string
  protocol: string
  hostname: string
  isProduction: boolean
  eventBriteToken: string
  googleAnalytics: string
  outputFolder: string
  canPublishEvents: boolean
}): State {
  return {
    ...options,
  }
}

export const RootReducer: Reducer<State, any> = (
  state = createInitialState({
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
): State => {
  switch (action.type) {
    default:
      return state
  }
}

function assertUnreachable(x: never): void {}
