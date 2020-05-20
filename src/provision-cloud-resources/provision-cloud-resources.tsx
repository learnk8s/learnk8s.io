import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const ProvisionCloudResources = {
  id: 'provision-cloud-resources',
  url: '/cloud-resources-kubernetes',
  title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
  description: `You can create and connect to managed cloud provider resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(ProvisionCloudResources))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      image: 'src/provision-cloud-resources/cloud-resources.png',
      title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
      description: `You can create and connect to managed cloud resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators such as Config Connector and AWS Operator Service.`,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-provision-cloud-resources',
      pageId: ProvisionCloudResources.id,
      authorId: Authors.danielePolencic.id,
      description: `Learn how you can create and connect to managed cloud resources using the Service Catalog, a tool such as Kubeform or cloud-specific operators such as Config Connector and AWS Operator Service.`,
      title: 'Provisioning cloud resources (AWS, GCP, Azure) in Kubernetes',
      publishedDate: '2020-04-01',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(
    Action.tags.add({
      id: ProvisionCloudResources.id + '-general-post',
      tag: 'general-post',
      pageId: ProvisionCloudResources.id,
    }),
  )
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'provision-cloud-resources-related-0',
      blogPostId: 'bp-provision-cloud-resources',
      content: toVFile({ path: join(__dirname, 'provision-cloud-resources-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'provision-cloud-resources-picture',
      pageId: ProvisionCloudResources.id,
      image: 'src/provision-cloud-resources/cloud-resources.svg',
    }),
  )
}
