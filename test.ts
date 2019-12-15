const backstop = require('backstopjs')
import { ok } from 'assert'
import { store, getRedirects, getPages } from './src/store'
import { Training } from './src/training.v2'
import { BestPractices } from './src/best-practices/best'
import { TermsAndConditions } from './src/termsAndConditions'
import { Consulting } from './src/consulting'
import { AboutUs } from './src/aboutUs'
import { Newsletter } from './src/newsletter'
import { Academy } from './src/academy'
import { ContactUs } from './src/contactUs'
import { ChaosEngineering } from './src/chaosEngineering/chaosEngineering'
import { ZeroToK8sJs } from './src/02k8sjs/02k8sjs'
import { ZeroToK8s } from './src/zeroToK8s'
import { Blog } from './src/blog'
import { RSS } from './src/rss'
import { WhatIsKubernetes } from './src/whatIsKubernetes/whatIsK8s'
import { TerraformAks } from './src/terraformAks/terraformAks'
import { SpotInstances } from './src/spotInstances/spotInstances'
import { SolarPlants } from './src/solarPlants/solarPlants'
import { SmallerImages } from './src/smallerDockerImages/smallerImages'
import { ScalingSpringBoot } from './src/scalingSpringBoot/scalingSpringBoot'
import { ScalingTensorflow } from './src/scalingKubeflow/scalingTensorflow'
import { K8sOnWindows } from './src/k8sOnWindows/installingK8sOnWindows'
import { DeployLaravel } from './src/deployLaravel/deployLaravel'
import { Career } from './src/careers'
import { Pages as Landing } from './src/landing'
import { HomePage } from './src/homepage'
import { KubectlProductivity } from './src/advancedKubectl/advancedKubectl'
import { RSS as Flipboard } from './src/flipboard'
import { Pages as BiteSizedPosts } from './src/bite-sized-articles'
import { NotFound404 } from './src/404'
import { Architecting } from './src/architecting'
import { BiteSized } from './src/biteSized'
import commander from 'commander'

commander
  .version('1.0.0')
  .option('--approve', 'Approve the last screenshot')
  .option('--test', 'Test the current website')
  .option('--hostname <hostname>', 'Hostname')
  .parse(process.argv)

ok(commander.hostname, 'Please provide a hostname such as --hostname http://localhost:3000')
ok(commander.approve || commander.test, 'Please provide either --approve or --test')

function renderPage(siteUrl: string): string[] {
  // TODO: get all pages URL
  const urls = []
  urls.push(Training.url)
  Object.values(Landing).forEach(it => {
    urls.push(it.url)
  })
  urls.push(BestPractices.url)
  urls.push(Career.url)
  urls.push(TermsAndConditions.url)
  urls.push(Consulting.url)
  urls.push(HomePage.url)
  urls.push(AboutUs.url)
  urls.push(Newsletter.url)
  urls.push(KubectlProductivity.url)
  urls.push(Academy.url)
  urls.push(ContactUs.url)
  urls.push(ChaosEngineering.url)
  urls.push(Flipboard.url)
  urls.push(ZeroToK8sJs.url)
  urls.push(DeployLaravel.url)
  urls.push(K8sOnWindows.url)
  urls.push(ScalingTensorflow.url)
  urls.push(ScalingSpringBoot.url)
  urls.push(SmallerImages.url)
  urls.push(SolarPlants.url)
  urls.push(SpotInstances.url)
  urls.push(TerraformAks.url)
  urls.push(WhatIsKubernetes.url)
  Object.values(BiteSizedPosts).forEach(it => {
    urls.push(it.url)
  })
  urls.push(RSS.url)
  urls.push(NotFound404.url)
  urls.push(Blog.url)
  urls.push(Architecting.url)
  urls.push(ZeroToK8s.url)
  urls.push(BiteSized.url)

  return urls.map(it => `${siteUrl}${it}`)
}

function toId(raw: string): string {
  return raw.toLowerCase().replace(/[^\w]+/g, '-')
}

const command = commander.test ? 'test' : commander.approve ? 'approve' : ''

backstop(command, {
  config: {
    id: 'default',
    viewports: [
      {
        label: 'phone',
        width: 320,
        height: 480,
      },
      {
        label: 'tablet',
        width: 1024,
        height: 768,
      },
    ],
    scenarios: renderPage(commander.hostname)
      .filter(it => !!it)
      .map(it => {
        return {
          label: toId(new URL(it).pathname),
          url: it,
          referenceUrl: '',
          readyEvent: '',
          readySelector: '',
          delay: 0,
          hideSelectors: [],
          removeSelectors: [],
          hoverSelector: '',
          clickSelector: '',
          postInteractionWait: 0,
          selectors: [],
          selectorExpansion: true,
          expect: 0,
          misMatchThreshold: 0.01,
          requireSameDimensions: true,
        }
      }),
    paths: {
      bitmaps_reference: 'backstop_data/bitmaps_reference',
      bitmaps_test: 'backstop_data/bitmaps_test',
      engine_scripts: 'backstop_data/engine_scripts',
      html_report: 'backstop_data/html_report',
      ci_report: 'backstop_data/ci_report',
    },
    report: ['browser'],
    engine: 'puppeteer',
    engineOptions: {
      args: ['--no-sandbox'],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
  },
})
  .then(() => console.log('DONE'))
  .catch((error: any) => console.log('Error', error))
