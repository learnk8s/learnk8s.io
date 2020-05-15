import { Store } from 'redux'

import { State, Actions, Action, StoreV2, ActionV2 } from './store'
import { Training } from './training.v2'

export const Page = {
  id: 'online-classroom',
  url: '/kubernetes-online-classroom',
  title: 'Online Kubernetes training',
  description: 'Become an expert in deploying application at scale with Kubernetes.',
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Page))
  storeV2.dispatch(
    ActionV2.redirects.add({
      id: `redirect-${Page.id}`,
      fromPageId: Page.id,
      redirectToPageId: Training.id,
    }),
  )
}
