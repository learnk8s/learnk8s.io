import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action, StoreV2, ActionV2 } from '../store'
import { Authors } from '../aboutUs'
import { toVFile } from '../files'
import { join } from 'path'

export const Pages = {
  multipleClusters: {
    id: 'multiple-kubernetes-clusters',
    url: '/bite-sized/connecting-multiple-kubernetes-clusters',
    title: 'How do you connect clusters located in different data centres?',
    description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Learn what options you have.`,
  },

  ingressApiGateway: {
    id: 'ingress-api-gateway',
    url: '/kubernetes-ingress-api-gateway',
    title: 'Can you expose your services with an API gateway in Kubernetes?',
    description: `A Kubernetes Ingress routes the external traffic to your services and Pods inside the cluster. You could have an Ingress that is also an API gateway.`,
  },

  visualiseYaml: {
    id: 'visualise-yaml',
    url: '/visualise-dependencies-kubernetes',
    title: 'How do you visualise dependencies in your Kubernetes YAML files?',
    description: `When you have a large number of resources in your Kubernetes cluster, you might lose track of all relationships between them. Learn how to visualise your dependencies.`,
  },

  helm: {
    id: 'helm-templating',
    url: '/helm-templating-kubernetes-yaml',
    title: 'Is Helm used just for templating? ⎈ Learnk8s',
    description: `Learn how Helm is used for templating, sharing charts and managing releases.`,
  },

  nodeSize: {
    id: 'kubernetes-node-size',
    url: '/kubernetes-node-size',
    title: 'Architecting Kubernetes clusters — choosing a worker node size',
    description:
      'What type of worker nodes should I use for my Kubernetes cluster? And how many of them?. This article looks at the pros and cons of either.',
  },

  secretsGitOps: {
    id: 'secrets-git-ops',
    url: '/kubernetes-secrets-in-git',
    title: 'How to keep your Kubernetes secrets secure in Git',
    description:
      'Kubernetes secrets that you load into the cluster must exist somewhere. Is Kubernetes to be the only source of truth or do you keep a copy? Learn how to secure secrets.',
  },

  autoscaling: {
    id: 'autoscaling-apps-kubernetes',
    url: '/autoscaling-apps-kubernetes',
    title: 'How to autoscale apps on Kubernetes with custom metrics',
    description: `Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
  },

  rollbacks: {
    id: 'kubernetes-rollbacks',
    url: '/kubernetes-rollbacks',
    title: 'How do you rollback deployments in Kubernetes?',
    description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes.`,
  },
}

export function Register(store: Store<State, Actions>, storeV2: StoreV2) {
  storeV2.dispatch(ActionV2.pages.add(Pages.multipleClusters))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-multiple-kubernetes-clusters',
      pageId: Pages.multipleClusters.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.multipleClusters.title,
      description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options you have.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-multiple-kubernetes-clusters',
      pageId: Pages.multipleClusters.id,
      authorId: Authors.danielePolencic.id,
      description: `In Kubernetes, you might want to distribute your workloads in different regions to improve your reliability and availability. Should you use a single cluster over a unified network or multiple clusters? Learn what options you have.`,
      title: 'How do you connect Kubernetes clusters located in different data centres?',
      publishedDate: '2019-04-04',
      content: toVFile({ path: join(__dirname, 'connectMultipleClusters/connectMultipleClusters.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({
      id: Pages.multipleClusters.id + '-bite-sized',
      tag: 'bite-sized',
      pageId: Pages.multipleClusters.id,
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.ingressApiGateway))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-ingress-api-gateway',
      pageId: Pages.ingressApiGateway.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.ingressApiGateway.title,
      description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-ingress-api-gateway',
      pageId: Pages.ingressApiGateway.id,
      authorId: Authors.danielePolencic.id,
      description: `In Kubernetes, an Ingress is a component that routes the traffic from outside the cluster to your services and Pods inside the cluster. You can select an Ingress that is also an API gateway.`,
      title: 'Can you expose your microservices with an API gateway in Kubernetes?',
      publishedDate: '2019-04-23',
      lastModifiedDate: '2019-12-11',
      content: toVFile({ path: join(__dirname, 'ingressApiGateway/ingressApiGateway.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({
      id: Pages.ingressApiGateway.id + '-bite-sized',
      tag: 'bite-sized',
      pageId: Pages.ingressApiGateway.id,
    }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'ingress-api-gateway-related-0',
      blogPostId: 'bp-ingress-api-gateway',
      content: toVFile({ path: join(__dirname, 'ingressApiGateway/ingressApiGateway-related.md') }),
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.visualiseYaml))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-visualise-yaml',
      pageId: Pages.visualiseYaml.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.visualiseYaml.title,
      description: Pages.visualiseYaml.description,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-visualise-yaml',
      pageId: Pages.visualiseYaml.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.visualiseYaml.description,
      title: 'How do you visualise dependencies in your Kubernetes YAML files?',
      publishedDate: '2019-05-08',
      content: toVFile({ path: join(__dirname, 'visualiseYaml/visualiseYaml.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: Pages.visualiseYaml.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.visualiseYaml.id }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.helm))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-helm-templating',
      pageId: Pages.helm.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.helm.title,
      description: Pages.helm.description,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-helm-templating',
      pageId: Pages.helm.id,
      authorId: Authors.danielePolencic.id,
      description: Pages.helm.description,
      title: 'Is Helm used just for templating Kubernetes YAML files?',
      publishedDate: '2019-04-16',
      content: toVFile({ path: join(__dirname, 'helm/helm.md') }),
    }),
  )
  storeV2.dispatch(ActionV2.tags.add({ id: Pages.helm.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.helm.id }))
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'helm-templating-related-0',
      blogPostId: 'bp-helm-templating',
      content: toVFile({ path: join(__dirname, 'helm/helm-related.md') }),
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.nodeSize))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-kubernetes-node-size',
      pageId: Pages.nodeSize.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.nodeSize.title,
      description:
        'When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use, and how many of them?". This article looks at the pros and cons of either using many small or few large worker nodes in your cluster.',
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-kubernetes-node-size',
      pageId: Pages.nodeSize.id,
      authorId: Authors.danielWeibel.id,
      description:
        'When you create a Kubernetes cluster, one of the first questions that pops up is: "what type of worker nodes should I use, and how many of them?". This article looks at the pros and cons of either using many small or few large worker nodes in your cluster.',
      title: Pages.nodeSize.title,
      publishedDate: '2019-09-04',
      content: toVFile({ path: join(__dirname, 'nodes-size/smallOrLarge.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: Pages.nodeSize.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.nodeSize.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'kubernetes-node-size-related-0',
      blogPostId: 'bp-kubernetes-node-size',
      content: toVFile({ path: join(__dirname, 'nodes-size/smallOrLarge-related.md') }),
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.secretsGitOps))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-secrets-git-ops',
      pageId: Pages.secretsGitOps.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.secretsGitOps.title,
      description:
        'Kubernetes secrets that you load into the cluster must exist somewhere. Do you keep a copy or rely on Kubernetes to be the only source of truth? How do you back them up? What if you keep a copy and they go out of sync?',
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-secrets-git-ops',
      pageId: Pages.secretsGitOps.id,
      authorId: Authors.omerLeviHevroni.id,
      description:
        'Kubernetes secrets that you load into the cluster must exist somewhere. Do you keep a copy or rely on Kubernetes to be the only source of truth? How do you back them up? What if you keep a copy and they go out of sync?',
      title: Pages.secretsGitOps.title,
      publishedDate: '2019-09-25',
      content: toVFile({ path: join(__dirname, 'secrets/secrets.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: Pages.secretsGitOps.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.secretsGitOps.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'secrets-git-ops-related-0',
      blogPostId: 'bp-secrets-git-ops',
      content: toVFile({ path: join(__dirname, 'secrets/secrets-related.md') }),
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.autoscaling))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.autoscaling.title,
      description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-autoscaling-apps-kubernetes',
      pageId: Pages.autoscaling.id,
      authorId: Authors.danielWeibel.id,
      description: `Deploying an app to production with a static configuration is not optimal. Traffic patterns can change quickly and the app should be able to adapt to them. Kubernetes provides excellent support for autoscaling applications in the form of the Horizontal Pod Autoscaler. In this article, you will learn how to use it.`,
      title: 'How to autoscale apps on Kubernetes with custom metrics',
      publishedDate: '2019-10-03',
      content: toVFile({ path: join(__dirname, 'autoscaling/autoscaling.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: Pages.autoscaling.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.autoscaling.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'autoscaling-apps-kubernetes-related-0',
      blogPostId: 'bp-autoscaling-apps-kubernetes',
      content: toVFile({ path: join(__dirname, 'autoscaling/autoscaling-related.md') }),
    }),
  )

  storeV2.dispatch(ActionV2.pages.add(Pages.rollbacks))
  storeV2.dispatch(
    ActionV2.openGraphs.add({
      id: 'og-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      image: <img src='assets/bsk.png' alt='Bite-sized Kubernetes learning' />,
      title: Pages.rollbacks.title,
      description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
    }),
  )
  storeV2.dispatch(
    ActionV2.blogPosts.add({
      id: 'bp-kubernetes-rollbacks',
      pageId: Pages.rollbacks.id,
      authorId: Authors.gergelyRisko.id,
      description: `When you introduce a change that breaks production, you should have a plan to roll back that change. Kubernetes and kubectl offer a simple mechanism to roll back changes to resources such as Deployments, StatefulSets and DaemonSets.`,
      title: 'How do you rollback deployments in Kubernetes?',
      publishedDate: '2019-10-17',
      content: toVFile({ path: join(__dirname, 'rollbacks/rollbacks.md') }),
    }),
  )
  storeV2.dispatch(
    ActionV2.tags.add({ id: Pages.rollbacks.id + '-bite-sized', tag: 'bite-sized', pageId: Pages.rollbacks.id }),
  )
  storeV2.dispatch(
    ActionV2.relatedBlogs.add({
      id: 'kubernetes-rollbacks-related-0',
      blogPostId: 'bp-kubernetes-rollbacks',
      content: toVFile({ path: join(__dirname, 'rollbacks/rollbacks-related.md') }),
    }),
  )
}
