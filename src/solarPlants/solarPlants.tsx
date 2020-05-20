import * as React from 'react'
import { State, Action, Store } from '../store'
import { Authors } from '../aboutUs'
import { join } from 'path'
import { toVFile } from '../files'

export const SolarPlants = {
  id: 'solar-plants',
  url: '/blog/kubernetes-on-solar-plants',
  title: 'Internet of Things on solar plants with Kubernetes ⎈ Learnk8s',
  description: `When you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications? Enter Kubernetes.`,
}

export function Register(store: Store) {
  store.dispatch(Action.pages.add(SolarPlants))
  store.dispatch(
    Action.openGraphs.add({
      id: 'og-solar-plants',
      pageId: SolarPlants.id,
      image: 'src/solarPlants/solar_panel.png',
      title: SolarPlants.title,
      description: SolarPlants.description,
    }),
  )
  store.dispatch(
    Action.blogPosts.add({
      id: 'bp-solar-plants',
      pageId: SolarPlants.id,
      authorId: Authors.danielePolencic.id,
      description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
      title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
      publishedDate: '2018-12-04',
      content: toVFile({ path: join(__dirname, 'content.md') }),
    }),
  )
  store.dispatch(Action.tags.add({ id: SolarPlants.id + '-general-post', tag: 'general-post', pageId: SolarPlants.id }))
  store.dispatch(
    Action.relatedBlogs.add({
      id: 'solar-plants-related-0',
      blogPostId: 'bp-solar-plants',
      content: toVFile({ path: join(__dirname, 'solar-plants-related.md') }),
    }),
  )
  store.dispatch(
    Action.previewPictures.add({
      id: 'solar-plants-picture',
      pageId: SolarPlants.id,
      image: 'src/solarPlants/solar_panel.svg',
    }),
  )
}
