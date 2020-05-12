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
  description: `In this article, you will learn how you can automate cluster creation with kubeadm and Terraform. This will allow you to create a cluster on AWS with a single command.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(TerraformAWS))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-terraform-aws',
      pageId: TerraformAWS.id,
      image: (
        <img
          src='src/terraform-aws/terraform-aws.png'
          alt='Bootstrapping Kubernetes clusters on AWS with Terraform'
        />
      ),
      title: 'Bootstrapping Kubernetes clusters on AWS with Terraform',
      description: 'There are many ways to create Kubernetes clusters and they generally pose a trade-off between automation and flexibility. In this article, you will learn how you can combine both worlds by automating infrastructure provisioning and the operation of kubeadm with Terraform. This will allow you to bootstrap a cluster on AWS in a few minutes with a single command.',
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-terraform-aws',
      pageId: TerraformAWS.id,
      authorId: Authors.danielWeibel.id,
      title: 'Bootstrapping Kubernetes clusters on AWS with Terraform',
      description: 'There are many ways to create Kubernetes clusters and they generally pose a trade-off between automation and flexibility. In this article, you will learn how you can combine both worlds by automating infrastructure provisioning and the operation of kubeadm with Terraform. This will allow you to bootstrap a cluster on AWS in a few minutes with a single command.',
      publishedDate: '2020-05-13',

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
