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
import * as Newsletter from './newsletter'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'
import * as Sitemap from './sitemap'

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
import * as Templating from './templating/templating'
import * as PersitentConnections from './persistent-connections/peristentConnections'
import * as ClusterSize from './clusterSize/clusterSize'

import * as BiteSizedListing from './biteSized'
import * as BiteSizedArticles from './bite-sized-articles'
import { State, Actions } from './store'
import * as Courses from './courses'
import * as Training from './training.v2'
import * as BestPractices from './best-practices/best'
import * as FreeTools from './freeTools'
import * as Wallpaper from './wallpaper'
import * as Flipboard from './flipboard'
import { Store } from 'redux'

export function register(store: Store<State, Actions>) {
  Courses.Register(store)
  Training.Register(store)
  Landing.Register(store)
  BestPractices.Register(store)
  FreeTools.Register(store)
  Wallpaper.Register(store)
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
  BiteSizedArticles.Register(store)
  RSS.Register(store)
  NotFound.Register(store)
  Sitemap.Register(store)
  Blog.Register(store)
  ArchitectingAndScaling.Register(store)
  ZeroToK8s.Register(store)
  BiteSizedListing.Register(store)
  Troubleshooting.Register(store)
  AdvancedInPractice.Register(store)
  MicroservicesAtScale.Register(store)
  ExploringKubernetes.Register(store)
  Templating.Register(store)
  PersitentConnections.Register(store)
  ClusterSize.Register(store)
}
