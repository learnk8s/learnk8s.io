import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Details = {
  type: 'whatIsK8s',
  url: '/what-is-kubernetes',
  seoTitle: 'What is Kubernetes? ♦︎ Learnk8s',
  title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
  shortDescription: `The industry has experienced a shift towards developing smaller applications. But how does that impact the infrastructure? Don't end up paying the extra price in your cloud bill; learn how you can fix it with Kubernetes.`,
  description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
  openGraphImage: <img src='src/whatIsKubernetes/why-kube.png' alt='Kubernetes bucks' />,
  publishedDate: '2018-09-04',
  previewImage: (
    <img src='src/whatIsKubernetes/why-kube.png' alt='What is Kubernetes? Optimise your hosting costs and efficiency' />
  ),
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://linkedin.com/in/danielepolencic',
  },
} as const

export const WhatIsKubernetes = {
  id: 'what-is-kubernetes',
  url: '/blog/what-is-kubernetes',
  title: 'What is Kubernetes? ♦︎ Learnk8s',
  description: `The industry has experienced a shift towards developing smaller applications. But how does that impact the infrastructure? Don't end up paying the extra price in your cloud bill; learn how you can fix it with Kubernetes.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(WhatIsKubernetes))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-what-is-kubernetes',
      pageId: WhatIsKubernetes.id,
      image: <img src='src/whatIsKubernetes/why-kube.png' alt='Kubernetes bucks' />,
      title: WhatIsKubernetes.title,
      description: WhatIsKubernetes.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPostV2({
      id: 'bp-what-is-kubernetes',
      pageId: WhatIsKubernetes.id,
      authorId: Authors.danielePolencic.id,
      title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
      description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
      publishedDate: '2018-09-04',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: WhatIsKubernetes.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'what-is-kubernetes-related-0',
      blogPostId: 'bp-what-is-kubernetes',
      content: toVFile({ path: join(__dirname, 'what-is-kubernetes-related.md') }),
    }),
  )
}
