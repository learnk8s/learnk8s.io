import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const KubectlProductivity = {
  id: 'kubectl-productivity',
  url: '/blog/kubectl-productivity',
  title: 'Boosting your kubectl productivity ⎈ Learnk8s',
  description: 'Learn the tips and tricks that make your usage of kubectl more efficient and effective.',
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(KubectlProductivity))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-kubectl-productivity',
      pageId: KubectlProductivity.id,
      imagePath: 'src/advancedKubectl/magic.jpg',
      title: 'Boosting your kubectl productivity',
      description:
        'If you work with Kubernetes, then kubectl is probably one of your most-used tools. This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective.',
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-kubectl-productivity',
      pageId: KubectlProductivity.id,
      authorId: Authors.danielWeibel.id,
      description: `If you work with Kubernetes, then kubectl is probably one of your most-used tools. Whenever you spend a lot of time working with a specific tool, it is worth to get to know it very well and learn how to use it efficiently.

This article contains a series of tips and tricks to make your usage of kubectl more efficient and effective. At the same time, it aims at deepening your understanding of how various aspects of Kubernetes work.

The goal of this article is not only to make your daily work with Kubernetes more efficient but also more enjoyable!`,
      title: 'Boosting your kubectl productivity',
      publishedDate: '2019-03-27',
      lastModifiedDate: '2019-04-15',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: KubectlProductivity.id + 'general-post',
      tag: 'general-post',
      pageId: KubectlProductivity.id,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'kubectl-productivity-related-0',
      blogPostId: 'bp-kubectl-productivity',
      content: toVFile({ path: join(__dirname, 'kubectl-productivity-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'kubectl-productivity-picture',
      pageId: KubectlProductivity.id,
      imagePath: 'src/advancedKubectl/magic.svg',
    }),
  )
}
