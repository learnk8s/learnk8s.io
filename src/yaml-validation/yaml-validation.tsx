import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const YamlValidation = {
  id: 'yaml-validation',
  url: '/validating-kubernetes-yaml',
  title: 'Validating Kubernetes YAML for best practices and policies',
  description: `..............................................................................`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(YamlValidation))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-yaml-validation',
      pageId: YamlValidation.id,
      imagePath: 'src/yaml-validation/yaml-validate.png',
      title: YamlValidation.title,
      description: YamlValidation.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-yaml-validation',
      pageId: YamlValidation.id,
      authorId: Authors.amitSaha.id,
      description: YamlValidation.description,
      title: YamlValidation.title,
      publishedDate: '2020-06-17',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: YamlValidation.id + '-general-post',
      tag: 'general-post',
      pageId: YamlValidation.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'yaml-validation-picture',
      pageId: YamlValidation.id,
      imagePath: 'src/yaml-validation/yaml-validate.svg',
    }),
  )
}
