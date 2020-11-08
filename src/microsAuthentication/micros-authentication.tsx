import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const microsAuthentication = {
  id: 'micros-authentication',
  url: '/microservices-authentication-kubernetes',
  title: 'Authenticating microservices requests in Kubernetes',
  description: `Authenticating microservices requests in Kubernetes.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(microsAuthentication))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-micros-authentication',
      pageId: microsAuthentication.id,
      imagePath: 'src/yaml-validation/yaml-validate.png',
      title: microsAuthentication.title,
      description: microsAuthentication.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-micros-authentication',
      pageId: microsAuthentication.id,
      authorId: Authors.amitSaha.id,
      description: microsAuthentication.description,
      title: microsAuthentication.title,
      publishedDate: '2020-11-09',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: microsAuthentication.id + '-general-post',
      tag: 'general-post',
      pageId: microsAuthentication.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'yaml-validation-picture',
      pageId: microsAuthentication.id,
      imagePath: 'src/yaml-validation/yaml-validate.svg',
    }),
  )
}
