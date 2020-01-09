import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Templating = {
  id: 'templating-yaml-options',
  url: '/templating-kubernetes-yaml',
  title: 'Templating Kubernetes YAML with yq, kustomize and real code',
  description: `Templating YAML in Kubernetes Templating YAML in Kubernetes Templating YAML in Kubernetes`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Templating))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-templating-yaml-options',
      pageId: Templating.id,
      image: <img src='src/templating/templating.png' alt='Troubleshooting Kubernetes deployments' />,
      title: Templating.title,
      description: Templating.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-templating-yaml-options',
      pageId: Templating.id,
      authorId: Authors.danielePolencic.id,
      title: Templating.title,
      description: `Templating YAML in Kubernetes`,
      publishedDate: '2020-01-08',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: Templating.id }))
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'templating-yaml-options-picture',
      pageId: Templating.id,
      image: <img src='src/templating/templating.svg' alt={Templating.title} />,
    }),
  )
}
