import { writeFileSync, copyFileSync } from 'fs'

import { resolve } from 'path'
import { SyncEvents } from './eventbrite.v2'
import * as Sitemap from './sitemap'
import Axios from 'axios'

import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as ArchitectingAndScaling from './architecting'
import * as AdvancedInPractice from './advanced'
import * as MicroservicesAtScale from './microservices'
import * as ExploringKubernetes from './exploring'
import * as ZeroToK8s from './zeroToK8s'
import * as Blog from './blog'
import * as Careers from './careers'
import * as Consulting from './consulting'
import * as ContactUs from './contactUs'
import * as Homepage from './homepage'
import * as Landing from './landing'
import * as Online from './online'
import * as Newsletter from './newsletter'
import * as Redirect from './redirect'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'

import * as GenericBlogPost from './genericBlogPost'

import * as BiteSizedListing from './biteSized'
import * as BiteSizedRenderer from './biteSized.v2'
import { store, getConfig } from './store'
import * as Workshop from './training.v2'
import * as Training from './learn'
import * as BestPractices from './best-practices/best'
import * as FreeTools from './freeTools'
import * as Wallpapers from './wallpapers'
import * as Flipboard from './flipboard'
import { checkPageDetail } from './checkPageDetail'
import { register } from './register'

register(store)

Landing.Mount({ store })
Online.Mount({ store })
Workshop.Mount({ store })
Training.Mount({ store })
BestPractices.Mount({ store })
FreeTools.Mount({ store })
Wallpapers.Mount({ store })
Careers.Mount({ store })
TermsAndConditions.Mount({ store })
Consulting.Mount({ store })
Homepage.Mount({ store })
AboutUs.Mount({ store })
Newsletter.Mount({ store })
Academy.Mount({ store })
ContactUs.Mount({ store })
BiteSizedRenderer.Mount({ store })
GenericBlogPost.Mount({ store })
Flipboard.Mount({ store })
Redirect.Mount({ store })
RSS.Mount({ store })
NotFound.Mount({ store })
Blog.Mount({ store })
ArchitectingAndScaling.Mount({ store })
ZeroToK8s.Mount({ store })
BiteSizedListing.Mount({ store })
Sitemap.Mount({ store })
AdvancedInPractice.Mount({ store })
MicroservicesAtScale.Mount({ store })
ExploringKubernetes.Mount({ store })

checkPageDetail(store)

const config = getConfig(store.getState())

if (!!config.canPublishEvents && !!config.eventBriteToken && !!config.organisationId) {
  SyncEvents({
    log: console.log,
    sdk: Axios.create({
      baseURL: 'https://www.eventbriteapi.com/v3/',
      headers: { Authorization: `Bearer ${config.eventBriteToken}` },
    }),
    state: store.getState(),
    canPublish: config.canPublishEvents,
  })
} else {
  console.log('Skipping Eventbrite publishing')
}

copyFileSync('robots.txt', resolve('_site', 'robots.txt'))
copyFileSync('favicon.ico', resolve('_site', 'favicon.ico'))

if (!getConfig(store.getState()).isProduction) {
  writeFileSync('_site/state.json', JSON.stringify(store.getState(), null, 2))
}
