import {Image} from './assets'
import { Sitemap, LinkedNode } from './sitemap'
import * as React from 'react'

export const Details = {
  type: identity<'solarPlants'>('solarPlants'),
  url: '/kubernetes-on-solar-plants',
  seoTitle: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants ♦︎ Learnk8s',
  title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
  description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
  openGraphImage: Image({url: '_blog/kubernetes-on-solar-plants/solar_panel.png', description: 'Solar panels and Kubernetes'}),
  publishedDate: '2018-12-04',
  previewImage: Image({url: '_blog/kubernetes-on-solar-plants/solar_panel.png', description: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants'}),
  author: {
    fullName: 'Daniele Polencic',
    avatar: Image({url: 'assets/authors/daniele_polencic.jpg', description: 'Daniele Polencic'}),
    link: 'https://linkedin.com/in/danielepolencic'
  },
}

function identity<T>(value: T): T {
  return value
}

function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): JSX.Element {
  return <div></div>
}