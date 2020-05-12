import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Templating = {
  id: 'templating-yaml-options',
  url: '/templating-yaml-with-code',
  title: 'Templating YAML in Kubernetes with real code',
  description: `Learn how you can parametrise resource definitions with yq, kustomize and real code.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Templating))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-templating-yaml-options',
      pageId: Templating.id,
      image: <img src='src/templating/templating.png' alt='Troubleshooting Kubernetes deployments' />,
      title: Templating.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-templating-yaml-options',
      pageId: Templating.id,
      authorId: Authors.danielePolencic.id,
      title: Templating.title,
      description: `Learn how you can leverage tools such as yq and kustomize to template your Kubernetes YAML file. Learn how to write your own tool to generate YAML programatically with a real programming language such as Java, Node.js, Go, Python or C#.`,
      publishedDate: '2020-01-09',
      lastModifiedDate: '2020-05-12',
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
