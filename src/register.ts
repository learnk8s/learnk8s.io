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
import * as ZeroToK8sJava from './02k8s-java/02k8s-java'
import * as ProvisionCloudResources from './provision-cloud-resources/provision-cloud-resources'
import * as CustomAuthentication from './custom-authentication/index'
import * as K8Bit from './k8bit/k8bit'

import * as BiteSizedListing from './biteSized'
import * as BiteSizedArticles from './bite-sized-articles'
import { State, Actions, StoreV2 } from './store'
import * as Courses from './courses'
import * as Workshops from './training.v2'
import * as Training from './learn'
import * as BestPractices from './best-practices/best'
import * as FreeTools from './freeTools'
import * as Wallpapers from './wallpapers'
import * as Flipboard from './flipboard'
import { Store } from 'redux'

export function register(store: Store<State, Actions>, storeV2: StoreV2) {
  Courses.Register(store, storeV2)
  Workshops.Register(store, storeV2)
  Training.Register(store, storeV2)
  Landing.Register(store, storeV2)
  BestPractices.Register(store, storeV2)
  FreeTools.Register(store, storeV2)
  Wallpapers.Register(store, storeV2)
  Careers.Register(store, storeV2)
  TermsAndConditions.Register(store, storeV2)
  Consulting.Register(store, storeV2)
  Homepage.Register(store, storeV2)
  AboutUs.Register(store, storeV2)
  Newsletter.Register(store, storeV2)
  AdvancedKubectl.Register(store, storeV2)
  Academy.Register(store, storeV2)
  ContactUs.Register(store, storeV2)
  ChaosEngineering.Register(store, storeV2)
  Flipboard.Register(store, storeV2)
  ZeroToK8sJs.Register(store, storeV2)
  ZeroToK8sJava.Register(store, storeV2)
  DeployLaravel.Register(store, storeV2)
  K8sOnWindows.Register(store, storeV2)
  ScalingTensorflow.Register(store, storeV2)
  ScalingSpringBoot.Register(store, storeV2)
  SmallerImages.Register(store, storeV2)
  SolarPlants.Register(store, storeV2)
  SpotInstances.Register(store, storeV2)
  TerraformAks.Register(store, storeV2)
  WhatIsKubernetes.Register(store, storeV2)
  BiteSizedArticles.Register(store, storeV2)
  RSS.Register(store, storeV2)
  NotFound.Register(store, storeV2)
  Sitemap.Register(store, storeV2)
  Blog.Register(store, storeV2)
  ArchitectingAndScaling.Register(store, storeV2)
  ZeroToK8s.Register(store, storeV2)
  BiteSizedListing.Register(store, storeV2)
  Troubleshooting.Register(store, storeV2)
  AdvancedInPractice.Register(store, storeV2)
  MicroservicesAtScale.Register(store, storeV2)
  ExploringKubernetes.Register(store, storeV2)
  Templating.Register(store, storeV2)
  PersitentConnections.Register(store, storeV2)
  ClusterSize.Register(store, storeV2)
  Online.Register(store, storeV2)
  ProvisionCloudResources.Register(store, storeV2)
  CustomAuthentication.Register(store, storeV2)
  K8Bit.Register(store, storeV2)
}
