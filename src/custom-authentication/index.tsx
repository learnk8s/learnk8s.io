import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const CustomAuthentication = {
  id: 'custom-authentication',
  url: '/kubernetes-custom-authentication',
  title: 'Implementing a custom Kubernetes authentication method',
  description: `Kubernetes allows binding a cluster to arbitrary authentication methods. In this article, you will learn how to implement LDAP authentication for your Kubernetes cluster.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(CustomAuthentication))
  store.dispatch(
    Action.openGraphs.add({
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
    Action.blogPosts.add({
      id: 'bp-custom-authentication',
      pageId: CustomAuthentication.id,
      authorId: Authors.danielWeibel.id,
      description: `Kubernetes supports some predefined authentication methods out-of-the-box, such as client certificates, bearer tokens, and OpenID Connect. However, Kubernetes also allows binding arbitrary custom authentication methods to a cluster. In this article, you will learn how to implement LDAP authentication for your Kubernetes cluster.`,
      title: 'Implementing a custom Kubernetes authentication method',
      publishedDate: '2020-04-15',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: CustomAuthentication.id + '-general-post',
      tag: 'general-post',
      pageId: CustomAuthentication.id,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'custom-authentication',
      blogPostId: 'bp-custom-authentication',
      content: toVFile({ path: join(__dirname, 'content-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'custom-authentication-picture',
      pageId: CustomAuthentication.id,
      image: <img src='src/custom-authentication/authentication.svg' alt={CustomAuthentication.title} />,
    }),
  )
}
