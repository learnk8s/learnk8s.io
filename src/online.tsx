import { State, Action, Store } from './store'
import { Training } from './training.v2'

export const Page = {
  id: 'online-classroom',
  url: '/kubernetes-online-classroom',
  title: 'Online Kubernetes training',
  description: 'Become an expert in deploying application at scale with Kubernetes.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(Page))
  store.dispatch(
    Action.redirects.add({
      id: `redirect-${Page.id}`,
      fromPageId: Page.id,
      redirectToPageId: Training.id,
    }),
  )
}
