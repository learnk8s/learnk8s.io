import { Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const GracefulShutdown = {
  id: 'graceful-shutdown',
  url: '/graceful-shutdown',
  title: 'Graceful shutdown and zero downtime deployments in Kubernetes',
  description: `In this article, you will learn how to prevent broken connections when a Pod starts up or shuts down. You will also learn how to shut down long-running tasks gracefully.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(GracefulShutdown))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-graceful-shutdown',
      pageId: GracefulShutdown.id,
      imagePath: 'src/graceful-shutdown/graceful-shutdown.png',
      title: GracefulShutdown.title,
      description: GracefulShutdown.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-graceful-shutdown',
      pageId: GracefulShutdown.id,
      authorId: Authors.danielePolencic.id,
      description: GracefulShutdown.description,
      title: GracefulShutdown.title,
      publishedDate: '2020-08-12',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: GracefulShutdown.id + '-general-post',
      tag: 'general-post',
      pageId: GracefulShutdown.id,
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'graceful-shutdown-picture',
      pageId: GracefulShutdown.id,
      imagePath: 'src/graceful-shutdown/graceful-shutdown.svg',
    }),
  )
}
