import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const TerraformAWS = {
  id: 'terraform-aws',
  url: '/terraform-aws',
  title: 'Bootstrapping Kubernetes clusters on AWS with Terraform',
  description: `In this article, you will learn how you can create a cluster with kubeadm on AWS by using Terraform for both infrastructure provisioning and cluster bootstrapping.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(TerraformAWS))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-terraform-aws',
      pageId: TerraformAWS.id,
      image: (
        <img src='src/terraform-aws/terraform-aws.jpg' alt='Bootstrapping Kubernetes clusters on AWS with Terraform' />
      ),
      title: 'Bootstrapping Kubernetes clusters on AWS with Terraform',
      description:
        'There are many ways to create Kubernetes clusters and they generally pose a trade-off between automation and flexibility. In this article, you will learn how you can create a flexible cluster with kubeadm on AWS with a single command. The solution makes use of Terraform for both infrastructure provisioning and cluster bootstrapping.',
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-terraform-aws',
      pageId: TerraformAWS.id,
      authorId: Authors.danielWeibel.id,
      title: 'Bootstrapping Kubernetes clusters on AWS with Terraform',
      description:
        'There are many ways to create Kubernetes clusters and they generally pose a trade-off between automation and flexibility. In this article, you will learn how you can create a flexible cluster with kubeadm on AWS with a single command. The solution makes use of Terraform for both infrastructure provisioning and cluster bootstrapping.',
      publishedDate: '2020-05-14',

      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: TerraformAWS.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'terraform-aws',
      blogPostId: 'bp-terraform-aws',
      content: toVFile({ path: join(__dirname, 'content-related.md') }),
    }),
  )
  store.dispatch(
    Action.registerPreviewPicture({
      id: 'terraform-aws-picture',
      pageId: TerraformAWS.id,
      image: <img src='src/terraform-aws/terraform-aws.svg' alt={TerraformAWS.title} />,
    }),
  )
}
