import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ProvisionCloudResources = {
  id: 'provision-cloud-resources',
  url: '/provision-cloud-resources-kubernetes',
  title: 'Provisioning cloud provider managed services in Kubernetes',
  description: `Provisioning cloud provider managed services in Kubernetes .......................`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(ProvisionCloudResources))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      image: (
        <img
          src='src/provision-cloud-resources/cloud-resources.png'
          alt='Provisioning cloud provider managed services in Kubernetes'
        />
      ),
      title: 'Provisioning cloud provider managed services in Kubernetes',
      description: `Provisioning cloud provider managed services in Kubernetes`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      authorId: Authors.danielePolencic.id,
      description: `Provisioning cloud provider managed services in Kubernetes`,
      title: 'Provisioning cloud provider managed services in Kubernetes',
      publishedDate: '2020-03-25',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: ProvisionCloudResources.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'provision-cloud-resources-related-0',
      blogPostId: 'bp-provision-cloud-resources',
      content: toVFile({ path: join(__dirname, 'provision-cloud-resources-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'provision-cloud-resources-picture',
      pageId: ProvisionCloudResources.id,
      image: <img src='src/provision-cloud-resources/cloud-resources.svg' alt={ProvisionCloudResources.title} />,
    }),
  )
}
