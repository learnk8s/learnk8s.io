import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const TerraformAks = {
  id: 'terraform-aks',
  url: '/blog/get-start-terraform-aks',
  title: 'Getting started with Terraform and Kubernetes on Azure AKS',
  description: `Learn how you can use Terraform to create Kubernetes cluster in Azure.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(TerraformAks))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-terraform-aks',
      pageId: TerraformAks.id,
      image: (
        <img src='src/terraformAks/terraforming.jpg' alt='Getting started with Terraform and Kubernetes on Azure AKS' />
      ),
      title: TerraformAks.title,
      description: `Using Azure Kubernetes Service (AKS) instead of creating your cluster is convenient if you are a small team and don't want to spend time monitoring and maintaining Kubernetes control planes. But while you can create a cluster with few clicks in the Azure portal, it usually a better idea to keep the configuration for your cluster under source control.`,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-terraform-aks',
      pageId: TerraformAks.id,
      authorId: Authors.danielePolencic.id,
      description: `Using Azure Kubernetes Service (AKS) instead of creating your cluster is convenient if you are a small team and don't want to spend time monitoring and maintaining Kubernetes control planes. But while you can create a cluster with few clicks in the Azure portal, it usually a better idea to keep the configuration for your cluster under source control.`,
      title: 'Getting started with Terraform and Kubernetes on Azure AKS',
      publishedDate: '2019-08-21',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: TerraformAks.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'terraform-aks-related-0',
      blogPostId: 'bp-terraform-aks',
      content: toVFile({ path: join(__dirname, 'terraform-aks-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'terraform-aks-picture',
      pageId: TerraformAks.id,
      image: <img src='src/terraformAks/terraforming.svg' alt={TerraformAks.title} />,
    }),
  )
}
