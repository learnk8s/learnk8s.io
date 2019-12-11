import { writeFileSync, copyFileSync } from 'fs'

import { resolve } from 'path'
import { SyncEvents } from './eventbrite.v2'
import * as Sitemap from './sitemap'
import Axios from 'axios'

import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as ArchitectingAndScaling from './architecting'
import * as ZeroToK8s from './zeroToK8s'
import * as Blog from './blog'
import * as Careers from './careers'
import * as Consulting from './consulting'
import * as ContactUs from './contactUs'
import * as Homepage from './homepage'
import * as Landing from './landing'
import * as Newsletter from './newsletter'
import * as Redirect from './redirect'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'

import * as SmallerImages from './smallerDockerImages/smallerImages'
import * as DeployLaravel from './deployLaravel/deployLaravel'
import * as K8sOnWindows from './k8sOnWindows/installingK8sOnWindows'
import * as ChaosEngineering from './chaosEngineering/chaosEngineering'
import * as SolarPlants from './solarPlants/solarPlants'
import * as SpotInstances from './spotInstances/spotInstances'
import * as ScalingTensorflow from './scalingKubeflow/scalingTensorflow'
import * as ScalingSpringBoot from './scalingSpringBoot/scalingSpringBoot'
import * as WhatIsKubernetes from './whatIsKubernetes/whatIsK8s'
import * as AdvancedKubectl from './advancedKubectl/advancedKubectl'
import * as TerraformAks from './terraformAks/terraformAks'
import * as ZeroToK8sJs from './02k8sjs/02k8sjs'
import * as Troubleshooting from './troubleshooting/troubleshooting'
import * as GenericBlogPost from './genericBlogPost'

import * as BiteSized from './biteSized'
import * as BiteSizedV2 from './biteSized.v2'
import * as BiteSized201903 from './bite-sized-articles'
import { store, getConfig } from './store'
import * as Courses from './courses'
import * as Training2 from './training.v2'
import * as BestPractices from './best-practices/best'
import * as Flipboard from './flipboard'

Courses.Register(store)
Training2.Register(store)
Landing.Register(store)
BestPractices.Register(store)
Careers.Register(store)
TermsAndConditions.Register(store)
Consulting.Register(store)
Homepage.Register(store)
AboutUs.Register(store)
Newsletter.Register(store)
AdvancedKubectl.Register(store)
Academy.Register(store)
ContactUs.Register(store)
ChaosEngineering.Register(store)
Flipboard.Register(store)
ZeroToK8sJs.Register(store)
DeployLaravel.Register(store)
K8sOnWindows.Register(store)
ScalingTensorflow.Register(store)
ScalingSpringBoot.Register(store)
SmallerImages.Register(store)
SolarPlants.Register(store)
SpotInstances.Register(store)
TerraformAks.Register(store)
WhatIsKubernetes.Register(store)
BiteSized201903.Register(store)
RSS.Register(store)
NotFound.Register(store)
Sitemap.Register(store)
Blog.Register(store)
ArchitectingAndScaling.Register(store)
ZeroToK8s.Register(store)
BiteSized.Register(store)
Troubleshooting.Register(store)

Landing.Mount({ store })
Training2.Mount({ store })
BestPractices.Mount({ store })
Careers.Mount({ store })
TermsAndConditions.Mount({ store })
Consulting.Mount({ store })
Homepage.Mount({ store })
AboutUs.Mount({ store })
Newsletter.Mount({ store })
Academy.Mount({ store })
ContactUs.Mount({ store })
BiteSizedV2.Mount({ store })
GenericBlogPost.Mount({ store })
Flipboard.Mount({ store })
Redirect.Mount({ store })
RSS.Mount({ store })
NotFound.Mount({ store })
Blog.Mount({ store })
ArchitectingAndScaling.Mount({ store })
ZeroToK8s.Mount({ store })
BiteSized.Mount({ store })
Sitemap.Mount({ store })

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
