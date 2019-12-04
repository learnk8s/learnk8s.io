import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Troubleshooting = {
  id: 'troubleshooting-deployments',
  url: '/troubleshooting-deployments',
  title: 'A visual guide on troubleshooting Kubernetes deployments',
  description: ``,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(Troubleshooting))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      image: <img src='src/troubleshooting/flowchart.png' alt='Troubleshooting Kubernetes deployments' />,
      title: Troubleshooting.title,
      description: Troubleshooting.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-troubleshooting-deployments',
      pageId: Troubleshooting.id,
      authorId: Authors.danielePolencic.id,
      title: Troubleshooting.title,
      description: ``,
      publishedDate: '2019-12-05',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: Troubleshooting.id }))
  // store.dispatch(
  //   Action.registerBlogPostMarkdownBlock({
  //     id: 'troubleshooting-deployments-related-0',
  //     blogPostId: 'bp-troubleshooting-deployments',
  //     content: toVFile({ path: join(__dirname, 'troubleshooting-deployments-related.md') }),
  //   }),
  // )
}
