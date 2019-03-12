import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const Details = {
  type: identity<'deployLaravel'>('deployLaravel'),
  url: '/kubernetes-deploy-laravel-the-easy-way',
  seoTitle: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
  pageDetails: {
    title: 'Kubernetes: deploy Laravel the easy way',
    description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
    openGraphImage: Image({url: '_blog/kubernetes-deploy-laravel-the-easy-way/laravel_k8s.jpg', description: 'Deploy Laravel on Kubernetes'}),
  },
  publishedDate: '2018-04-25',
  previewImage: Image({url: '_blog/kubernetes-deploy-laravel-the-easy-way/laravel_k8s.jpg', description: 'Deploy Laravel the easy way'}),
  author: {
    fullName: 'Keith Mifsud',
    avatar: Image({url: 'assets/authors/keith_mifsud.jpg', description: 'Keith Mifsud'}),
    link: 'https://keith-mifsud.me/'
  },
}

function identity<T>(value: T): T {
  return value
}

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(<div></div>)
}