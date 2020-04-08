import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const CustomAuthentication = {
  id: 'custom-authentication',
  url: '/custom-authentication',
  title: 'How to set up custom authentication for your Kubernetes cluster',
  description: `Kubernetes allows you to bind any authentication method to your cluster. In this article, you will learn how to set up LDAP authentication for your Kubernetes cluster.`
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(CustomAuthentication))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-custom-authentication',
      pageId: CustomAuthentication.id,
      image: (
        <img
          src='src/custom-authentication/title.png'
          alt='How to set up custom authentication for your Kubernetes cluster'
        />
      ),
      title: 'How to set up custom authentication for your Kubernetes cluster',
      description: `Kubernetes supports some predefined authentication methods out-of-the box through so-called authentication plugins: client certificates, bearer tokens, and OpenID Connect tokens. However, Kubernetes also allows you to bind any desired authentication method to your cluster. In this article, you will learn how you can set up LDAP authentication for your Kubernetes cluster.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-custom-authentication',
      pageId: CustomAuthentication.id,
      authorId: Authors.danielWeibel.id,
      description: `Kubernetes supports some predefined authentication methods out-of-the box through so-called authentication plugins: client certificates, bearer tokens, and OpenID Connect tokens. However, Kubernetes also allows you to bind any desired authentication method to your cluster. In this article, you will learn how you can set up LDAP authentication for your Kubernetes cluster.`,
      title: 'How to set up custom authentication for your Kubernetes cluster',
      publishedDate: '2020-04-15',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: CustomAuthentication.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'custom-authentication',
      blogPostId: 'bp-custom-authentication',
      content: toVFile({ path: join(__dirname, 'content-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'custom-authentication-picture',
      pageId: CustomAuthentication.id,
      image: <img src='src/custom-authentication/title.svg' alt={CustomAuthentication.title} />,
    }),
  )
}
