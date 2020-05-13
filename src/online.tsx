import { Store } from 'redux'
import { State, Actions, Action } from './store'
import { Training } from './training.v2'

export const Page = {
  id: 'online-classroom',
  url: '/kubernetes-online-classroom',
  title: 'Online Kubernetes training',
  description: 'Become an expert in deploying application at scale with Kubernetes.',
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Page))
  store.dispatch(
    Action.registerRedirect({
      id: `redirect-${Page.id}`,
      fromPageId: Page.id,
      redirectToPageId: Training.id,
    }),
  )
}
