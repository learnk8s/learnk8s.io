import * as React from 'react'
import { Store } from 'redux'
import { State, Actions, Action } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const Details = {
  type: 'solarPlants',
  url: '/kubernetes-on-solar-plants',
  seoTitle: 'Internet of Things on solar plants with Kubernetes ♦︎ Learnk8s',
  title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
  shortDescription: `When you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications? Enter Kubernetes.`,
  description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
  openGraphImage: <img src='src/solarPlants/solar_panel.png' alt='Solar panels and Kubernetes' />,
  publishedDate: '2018-12-04',
  previewImage: (
    <img
      src='src/solarPlants/solar_panel.png'
      alt='Cloud infrastructure for the Internet of Things: Kubernetes on solar plants'
    />
  ),
  author: {
    fullName: 'Daniele Polencic',
    avatar: <img src='assets/authors/daniele_polencic.jpg' alt='Daniele Polencic' />,
    link: 'https://linkedin.com/in/danielepolencic',
  },
} as const

export const SolarPlants = {
  id: 'solar-plants',
  url: '/blog/kubernetes-on-solar-plants',
  title: 'Internet of Things on solar plants with Kubernetes ♦︎ Learnk8s',
  description: `When you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications? Enter Kubernetes.`,
}

export function Register(store: Store<State, Actions>) {
  store.dispatch(Action.registerPage(SolarPlants))
  store.dispatch(
    Action.registerOpenGraph({
      id: 'og-solar-plants',
      pageId: SolarPlants.id,
      image: <img src='src/solarPlants/solar_panel.png' alt='Solar panels and Kubernetes' />,
      title: SolarPlants.title,
      description: SolarPlants.description,
    }),
  )
  store.dispatch(
    Action.registerBlogPost({
      id: 'bp-solar-plants',
      pageId: SolarPlants.id,
      authorId: Authors.danielePolencic.id,
      description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
      title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
      publishedDate: '2018-12-04',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.assignTag({ id: 'general-post', pageId: SolarPlants.id }))
  store.dispatch(
    Action.registerBlogPostMarkdownBlock({
      id: 'solar-plants-related-0',
      blogPostId: 'bp-solar-plants',
      content: toVFile({ path: join(__dirname, 'solar-plants-related.md') }),
    }),
  )
}
