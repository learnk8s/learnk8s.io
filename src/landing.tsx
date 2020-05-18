import { Training } from './training.v2'
import { State, Action, Store } from './store'

export const Pages = {
  landingLondon: {
    id: 'landingLondon',
    url: '/london',
    title: 'Kubernetes training in London',
    description: 'Become an expert in deploying application at scale with Kubernetes in London.',
    city: 'London',
  },
  landingToronto: {
    id: 'landingToronto',
    url: '/toronto',
    title: 'Kubernetes training in Toronto',
    description: 'Become an expert in deploying application at scale with Kubernetes in Toronto.',
    city: 'Toronto',
  },
  landingSingapore: {
    id: 'landingSingapore',
    url: '/singapore',
    title: 'Kubernetes training in Singapore',
    description: 'Become an expert in deploying application at scale with Kubernetes in Singapore.',
    city: 'Singapore',
  },
  landingSanFrancisco: {
    id: 'landingSanFrancisco',
    url: '/san-francisco',
    title: 'Kubernetes training in San Francisco',
    description: 'Become an expert in deploying application at scale with Kubernetes in San Francisco.',
    city: 'San Francisco',
  },
}

export function Register(store: Store) {
  Object.values(Pages).forEach(page => {
    store.dispatch(Action.pages.add(page))
    store.dispatch(
      Action.redirects.add({
        id: `redirect-${page.id}`,
        fromPageId: page.id,
        redirectToPageId: Training.id,
      }),
    )
  })
}
