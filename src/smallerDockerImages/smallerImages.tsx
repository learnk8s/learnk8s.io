import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const SmallerImages = {
  id: 'smaller-images',
  url: '/blog/smaller-docker-images',
  title: '3 simple tricks for smaller Docker images ⎈ Learnk8s',
  description: `Learn how to make your container images smaller in size for a quicker transfer time and deployment.`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(SmallerImages))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-smaller-images',
      pageId: SmallerImages.id,
      image: <img src='src/smallerDockerImages/smaller_images.png' alt='Docker whale' />,
      title: SmallerImages.title,
      description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-smaller-images',
      pageId: SmallerImages.id,
      authorId: Authors.danielePolencic.id,
      description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
      title: '3 simple tricks for smaller Docker images',
      publishedDate: '2018-02-12',
      lastModifiedDate: '2019-04-14',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: SmallerImages.id + '-general-post', tag: 'general-post', pageId: SmallerImages.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'smaller-images-related-0',
      blogPostId: 'bp-smaller-images',
      content: toVFile({ path: join(__dirname, 'smaller-images-related.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.previewPictures.add({
      id: 'smaller-images-picture',
      pageId: SmallerImages.id,
      image: <img src='src/smallerDockerImages/smaller_images.svg' alt={SmallerImages.title} />,
    }),
  )
}
