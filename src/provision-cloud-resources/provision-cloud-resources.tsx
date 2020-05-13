import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ProvisionCloudResources = {
  id: 'provision-cloud-resources',
  url: '/cloud-resources-kubernetes',
  title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
  description: `You can create and connect to managed cloud provider resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators`,
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(ProvisionCloudResources))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      image: (
        <img
          src='src/provision-cloud-resources/cloud-resources.png'
          alt='Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes'
        />
      ),
      title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
      description: `You can create and connect to managed cloud resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators such as Config Connector and AWS Operator Service.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      authorId: Authors.danielePolencic.id,
      description: `Learn how you can create and connect to managed cloud resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators such as Config Connector and AWS Operator Service.`,
      title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
      publishedDate: '2020-04-01',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({
      id: ProvisionCloudResources.id + '-general-post',
      tag: 'general-post',
      pageId: ProvisionCloudResources.id,
    }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'provision-cloud-resources-related-0',
      blogPostId: 'bp-provision-cloud-resources',
      content: toVFile({ path: join(__dirname, 'provision-cloud-resources-related.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.previewPictures.add({
      id: 'provision-cloud-resources-picture',
      pageId: ProvisionCloudResources.id,
      image: <img src='src/provision-cloud-resources/cloud-resources.svg' alt={ProvisionCloudResources.title} />,
    }),
  )
}
