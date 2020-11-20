import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as Linode from './linode'
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
import * as AllocatableResources from './allocatable-resources/allocatable-resources'
import * as YAMLValidation from './yaml-validation/yaml-validation'
import * as Gatekeeper from './gatekeeper/gatekeeper'
import * as GracefulShutdown from './graceful-shutdown/graceful-shutdown'
import * as RequestsLimits from './requests-limits/requests-limits'
import * as MicroServiceAuthentication from './microsAuthentication/micros-authentication'

import * as BiteSizedListing from './biteSized'
import * as BiteSizedArticles from './bite-sized-articles'
import { Store } from './store'
import * as Courses from './courses'
import * as Workshops from './training.v2'
import * as CorporateTraining from './training-corporate'
import * as Training from './learn'
import * as TrainingLandingPage from './training-landing'
import * as BestPractices from './best-practices/best'
import * as FreeTools from './resources'
import * as Research from './research'
import * as Wallpapers from './wallpapers'
import * as Flipboard from './flipboard'

export function register(store: Store) {
  Courses.Register(store)
  Workshops.Register(store)
  CorporateTraining.Register(store)
  Training.Register(store)
  Landing.Register(store)
  BestPractices.Register(store)
  FreeTools.Register(store)
  Research.Register(store)
  Wallpapers.Register(store)
  Careers.Register(store)
  TermsAndConditions.Register(store)
  Consulting.Register(store)
  Homepage.Register(store)
  AboutUs.Register(store)
  Newsletter.Register(store)
  AdvancedKubectl.Register(store)
  Academy.Register(store)
  Linode.Register(store)
  ContactUs.Register(store)
  ChaosEngineering.Register(store)
  Flipboard.Register(store)
  ZeroToK8sJs.Register(store)
  ZeroToK8sJava.Register(store)
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
  Online.Register(store)
  ProvisionCloudResources.Register(store)
  CustomAuthentication.Register(store)
  K8Bit.Register(store)
  AllocatableResources.Register(store)
  TrainingLandingPage.Register(store)
  YAMLValidation.Register(store)
  Gatekeeper.Register(store)
  GracefulShutdown.Register(store)
  RequestsLimits.Register(store)
  MicroServiceAuthentication.Register(store)
}
