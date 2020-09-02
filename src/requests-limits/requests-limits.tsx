import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ResourceRequests = {
  id: 'requests-limits',
  url: '/setting-cpu-memory-limits-requests',
  title: 'Setting the right requests and limits in Kubernetes',
  description: `Find the right requests and limits can be tricky. Instead of guessing, you could inspect the application at runtime and extrapolate the values.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ResourceRequests))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-requests-limits',
      pageId: ResourceRequests.id,
      imagePath: 'src/requests-limits/requests-limits.png',
      title: ResourceRequests.title,
      description: ResourceRequests.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-requests-limits',
      pageId: ResourceRequests.id,
      authorId: Authors.santhoshNagaraj.id,
      description: ResourceRequests.description,
      title: ResourceRequests.title,
      publishedDate: '2020-09-02',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: ResourceRequests.id + '-general-post',
      tag: 'general-post',
      pageId: ResourceRequests.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'requests-limits-picture',
      pageId: ResourceRequests.id,
      imagePath: 'src/requests-limits/requests-limits.svg',
    }),
  )
}
