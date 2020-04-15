import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const CustomAuthentication = {
  id: 'custom-authentication',
  url: '/custom-authentication',
  title: 'Implementing a custom Kubernetes authentication method',
  description: `Kubernetes allows binding a cluster to arbitrary authentication methods. In this article, you will learn how to implement LDAP authentication for your Kubernetes cluster.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(CustomAuthentication))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-custom-authentication',
      pageId: CustomAuthentication.id,
      image: (
        <img
          src='src/custom-authentication/authentication.png'
          alt='Implementing a custom Kubernetes authentication method'
        />
      ),
      title: 'Implementing a custom Kubernetes authentication method',
      description: `Kubernetes supports some predefined authentication methods out-of-the-box, such as client certificates, bearer tokens, and OpenID Connect. However, Kubernetes also allows binding arbitrary custom authentication methods to a cluster. In this article, you will learn how to implement LDAP authentication for your Kubernetes cluster.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-custom-authentication',
      pageId: CustomAuthentication.id,
      authorId: Authors.danielWeibel.id,
      description: `Kubernetes supports some predefined authentication methods out-of-the-box, such as client certificates, bearer tokens, and OpenID Connect. However, Kubernetes also allows binding arbitrary custom authentication methods to a cluster. In this article, you will learn how to implement LDAP authentication for your Kubernetes cluster.`,
      title: 'Implementing a custom Kubernetes authentication method',
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
      image: <img src='src/custom-authentication/authentication.svg' alt={CustomAuthentication.title} />,
    }),
  )
}
