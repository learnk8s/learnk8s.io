import React from 'react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { mkdir } from 'shelljs'
import { syncEvents } from './eventbrite'
import eventbrite from 'eventbrite'
import { ok } from 'assert'
import { Sitemap, LinkedNode, getFullUrl, runSiteMap } from './sitemap'

import * as NotFound from './404'
import * as AboutUs from './aboutUs'
import * as Academy from './academy'
import * as Blog from './blog'
import * as BrowserConfig from './browserConfig'
import * as Careers from './careers'
import * as Consulting from './consulting'
import * as ContactUs from './contactUs'
import * as Homepage from './homepage'
import * as Landing from './landing'
import * as Newsletter from './newsletter'
import * as Redirect from './redirect'
import * as RSS from './rss'
import * as TermsAndConditions from './termsAndConditions'
import * as Training from './training'
import * as WebAppManifest from './webAppManifest'

import * as SmallerImages from './smallerDockerImages/smallerImages'
import * as DeployLaravel from './deployLaravel/deployLaravel'
import * as K8sOnWindows from './installingK8sOnWindows'
import * as ChaosEngineering from './chaosEngineering/chaosEngineering'
import * as SolarPlants from './solarPlants'
import * as SpotInstances from './spotInstances'
import * as ScalingTensorflow from './scalingTensorflow'
import * as ScalingSpringBoot from './scalingSpringBoot'
import * as WhatIsKubernetes from './whatIsK8s'

export function run(options: Settings) {
  return function mount(root: Sitemap) {
    renderTree(root, root)
    if (!!options.canPublishEvents && !!options.eventBriteToken && !!options.eventBriteOrg) {
      syncEvents(console.log, eventbrite({token: options.eventBriteToken}), options.eventBriteOrg, options.canPublishEvents)
    } else {
      console.log('Skipping Eventbrite publishing')
    }
  }

  function renderTree(node: LinkedNode<any>, root: Sitemap) {
    render(node, root, options)
    Object.values(node.children).forEach(it => renderTree(it as any, root))
  }
}

function render(node: LinkedNode<any>, root: Sitemap, {siteUrl}: Settings) {
  const page = node.payload
  const fullUrl = getFullUrl(node)
  function generatePath() {
    const path = `_site${resolve('.', fullUrl, 'index.html')}`
    mkdir('-p', `_site${resolve('.', fullUrl)}`)
    return path
  }

  switch (page.type) {
    case Homepage.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Homepage.render(root, node, siteUrl)}`)
      return
    }
    case Training.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Training.render(root, node, siteUrl)}`)
      return
    }
    case Academy.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Academy.render(root, node, siteUrl)}`)
      return
    }
    case Consulting.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Consulting.render(root, node, siteUrl)}`)
      return
    }
    case ContactUs.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ContactUs.render(root, node, siteUrl)}`)
      return
    }
    case Careers.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Careers.render(root, node, siteUrl)}`)
      return
    }
    case TermsAndConditions.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${TermsAndConditions.render(root, node, siteUrl)}`)
      return
    }
    case AboutUs.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${AboutUs.render(root, node, siteUrl)}`)
      return
    }
    case Redirect.Type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Redirect.render(root, node, siteUrl)}`)
      return
    }
    case Newsletter.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Newsletter.render(root, node, siteUrl)}`)
      return
    }
    case Blog.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Blog.render(root, node, siteUrl)}`)
      return
    }
    case RSS.Details.type: {
      writeFileSync(generatePath(), RSS.render(root, node, siteUrl))
      return
    }
    case SmallerImages.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${SmallerImages.render(root, node, siteUrl)}`)
      return
    }
    case DeployLaravel.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${DeployLaravel.render(root, node, siteUrl)}`)
      return
    }
    case ChaosEngineering.Details.type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${ChaosEngineering.render(root, node, siteUrl)}`)
      return
    }
    case K8sOnWindows.Details.type:
    case SolarPlants.Details.type:
    case SpotInstances.Details.type:
    case ScalingTensorflow.Details.type:
    case ScalingSpringBoot.Details.type:
    case WhatIsKubernetes.Details.type:
      // IGNORE
      return
    case NotFound.Details.type: {
      writeFileSync(`_site/404.html`, `<!DOCTYPE html>${NotFound.render(root, node, siteUrl)}`)
      return
    }
    case Landing.Type: {
      writeFileSync(generatePath(), `<!DOCTYPE html>${Landing.render(root, node, siteUrl)}`)
      return
    }
    case WebAppManifest.Details.type: {
      writeFileSync(generatePath(), WebAppManifest.render(root, node, siteUrl))
      return
    }
    case BrowserConfig.Details.type: {
      writeFileSync(generatePath(), BrowserConfig.render(root, node, siteUrl))
      return
    }
    default:
      assertUnreachable(page)
  }
}

function assertUnreachable(x: any): any {
  throw new Error('Did not expect to get here')
}

interface Settings {
  siteUrl: string
  eventBriteToken: string
  eventBriteOrg: string
  canPublishEvents: boolean
}

ok(process.env.ENVENTBRITE_TOKEN, `Missing Oauth token for Eventbrite https://www.eventbrite.com/platform/api#/introduction/authentication`)
ok(process.env.ENVENTBRITE_ORG, `Missing the organization ID for Eventbrite https://www.eventbrite.com/platform/api#/reference/organization/list/list-your-organizations`)

run({
  siteUrl: 'https://learnk8s.io',
  eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
  eventBriteOrg: process.env.ENVENTBRITE_ORG as string,
  canPublishEvents: process.env.NODE_ENV === 'production',
})(Sitemap)

writeFileSync('_site/sitemap.xml', runSiteMap(Sitemap, 'https://learnk8s.io'))