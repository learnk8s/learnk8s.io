import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const MicrosAuthentication = {
  id: 'micros-authentication',
  url: '/microservices-authentication-kubernetes',
  title: 'Authenticating microservices requests in Kubernetes',
  description: `Authenticating microservices requests in Kubernetes.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(MicrosAuthentication))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-micros-authentication',
      pageId: MicrosAuthentication.id,
      imagePath: 'src/yaml-validation/yaml-validate.png',
      title: MicrosAuthentication.title,
      description: MicrosAuthentication.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-micros-authentication',
      pageId: MicrosAuthentication.id,
      authorId: Authors.amitSaha.id,
      description: MicrosAuthentication.description,
      title: MicrosAuthentication.title,
      publishedDate: '2020-11-09',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: MicrosAuthentication.id + '-general-post',
      tag: 'general-post',
      pageId: MicrosAuthentication.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'yaml-validation-picture',
      pageId: MicrosAuthentication.id,
      imagePath: 'src/yaml-validation/yaml-validate.svg',
    }),
  )
}
