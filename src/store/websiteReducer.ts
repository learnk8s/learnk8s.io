import { Reducer } from 'redux'

export const Action = {
  registerPage(args: Page) {
    return { type: 'REGISTER_PAGE' as const, ...args }
  },
  registerOpenGraph(args: OpenGraph) {
    return { type: 'REGISTER_OG' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

export type Page = {
  id: string
  url: string
  title: string
  description: string
}

export type OpenGraph = {
  id: string
  pageId: string
  image: JSX.Element
  description: string
  title: string
}

export interface State {
  pages: Record<string, Page>
  openGraph: Record<string, OpenGraph>
}

export function createInitialState(options: {}): State {
  return {
    ...options,
    pages: {},
    openGraph: {},
  }
}

export const RootReducer: Reducer<State, Actions> = (
  state = createInitialState({ organisationId: 'unknown' }),
  action: Actions,
): State => {
  switch (action.type) {
    case 'REGISTER_PAGE': {
      if (!!Object.values(state.pages).find(it => it.url === action.url)) {
        throw new Error(`Duplicate page url: ${action.url}`)
      }
      return { ...state, pages: { ...state.pages, [action.id]: { ...action } } }
    }
    case 'REGISTER_OG': {
      return { ...state, openGraph: { ...state.openGraph, [action.id]: { ...action } } }
    }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}
