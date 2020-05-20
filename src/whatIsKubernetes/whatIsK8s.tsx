import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const WhatIsKubernetes = {
  id: 'what-is-kubernetes',
  url: '/blog/what-is-kubernetes',
  title: 'What is Kubernetes? ⎈ Learnk8s',
  description: `Learn why Kubernetes emrged as the de-facto container orchestrator.s`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(WhatIsKubernetes))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-what-is-kubernetes',
      pageId: WhatIsKubernetes.id,
      image: 'src/whatIsKubernetes/why-kube.png',
      title: WhatIsKubernetes.title,
      description: `The industry has experienced a shift towards developing smaller applications. But how does that impact the infrastructure? Don't end up paying the extra price in your cloud bill; learn how you can fix it with Kubernetes.`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-what-is-kubernetes',
      pageId: WhatIsKubernetes.id,
      authorId: Authors.danielePolencic.id,
      title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
      description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
      publishedDate: '2018-09-04',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({ id: WhatIsKubernetes.id + '-general-post', tag: 'general-post', pageId: WhatIsKubernetes.id }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'what-is-kubernetes-related-0',
      blogPostId: 'bp-what-is-kubernetes',
      content: toVFile({ path: join(__dirname, 'what-is-kubernetes-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'what-is-kubernetes-picture',
      pageId: WhatIsKubernetes.id,
      image: 'src/whatIsKubernetes/why-kube.svg',
    }),
  )
}
