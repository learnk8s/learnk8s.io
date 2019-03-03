import { LinkedNode, Page, PageType, getFullUrl, sitemap, TrainingPage } from './sitemap'
import * as Sitemap from './sitemap'
import { Homepage, assets as assetsHomepage } from './homepage'
import { Training, assets as assetsTraining } from './training'
import { Academy, assets as assetsAcademy } from './academy'
import { Consulting, assets as assetsConsulting } from './consulting'
import { ContactUs, assets as assetsContactUs } from './contactUs'
import { Careers, assets as assetsCareers } from './careers'
import { TermsAndConditions, assets as assetsTermsAndConditions } from './termsAndConditions'
import { AboutUs, assets as assetsAboutUs } from './aboutUs'
import { Newsletter, assets as assetsNewsletter } from './newsletter'
import { Blog, assets as assetsBlog } from './blog'
import { NotFound, assets as assetsNotFound } from './404'
import { Landing, assets as assetsLanding } from './landing'
import { Redirect } from './redirect'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { optimiseAssets } from './assets'
import { mkdir } from 'shelljs'
import { syncEvents } from './eventbrite'
import eventbrite from 'eventbrite'
import { ok } from 'assert'
import {generateRSS} from './rss'

export function run(options: Settings) {
  return function mount(root: Sitemap.Website) {
    renderTree(root, root)
    if (!!options.canPublishEvents && !!options.eventBriteToken && !!options.eventBriteOrg) {
      syncEvents(console.log, eventbrite({token: options.eventBriteToken}), options.eventBriteOrg, options.canPublishEvents)
    } else {
      console.log('Skipping Eventbrite publishing')
    }
  }

  function renderTree(node: LinkedNode<Page, object>, root: Sitemap.Website) {
    render(node, root, options)
    Object.values(node.children).forEach(it => renderTree(it as any, root))
  }
}

function render(node: LinkedNode<Page, object>, root: Sitemap.Website, {siteUrl, vendorId}: Settings) {
  const page = node.payload
  const fullUrl = getFullUrl(node)
  const path = `_site${resolve('.', fullUrl, 'index.html')}`
  mkdir('-p', `_site${resolve('.', fullUrl)}`)
  switch (page.type) {
    case PageType.HOMEPAGE: {
      writeFileSync(path, renderToStaticMarkup(<Homepage root={root} currentPage={node as LinkedNode<Sitemap.Homepage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsHomepage)} />))
      return
    }
    case PageType.TRAINING: {
      writeFileSync(path, renderToStaticMarkup(<Training root={root} currentPage={node as LinkedNode<TrainingPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsTraining)} />))
      return
    }
    case PageType.ACADEMY: {
      writeFileSync(path, renderToStaticMarkup(<Academy root={root} currentPage={node as LinkedNode<Sitemap.AcademyPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsAcademy(vendorId))} />))
      return
    }
    case PageType.CONSULTING: {
      writeFileSync(path, renderToStaticMarkup(<Consulting root={root} currentPage={node as LinkedNode<Sitemap.ConsultingPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsConsulting)} />))
      return
    }
    case PageType.CONTACT_US: {
      writeFileSync(path, renderToStaticMarkup(<ContactUs root={root} currentPage={node as LinkedNode<Sitemap.ContactUsPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsContactUs)} />))
      return
    }
    case PageType.CAREERS: {
      writeFileSync(path, renderToStaticMarkup(<Careers root={root} currentPage={node as LinkedNode<Sitemap.CareersPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsCareers)} />))
      return
    }
    case PageType.TERMS_AND_CONDITIONS: {
      writeFileSync(path, renderToStaticMarkup(<TermsAndConditions root={root} currentPage={node as LinkedNode<Sitemap.TermsAndConditionsPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsTermsAndConditions)} />))
      return
    }
    case PageType.ABOUT_US: {
      writeFileSync(path, renderToStaticMarkup(<AboutUs root={root} currentPage={node as LinkedNode<Sitemap.AboutUsPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsAboutUs)} />))
      return
    }
    case PageType.REDIRECT: {
      writeFileSync(path, renderToStaticMarkup(<Redirect root={root} currentPage={node as LinkedNode<Sitemap.Redirect, object>} siteUrl={siteUrl} />))
      return
    }
    case PageType.NEWSLETTER: {
      writeFileSync(path, renderToStaticMarkup(<Newsletter root={root} currentPage={node as LinkedNode<Sitemap.Newsletter, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsNewsletter)} />))
      return
    }
    case PageType.BLOG: {
      writeFileSync(path, renderToStaticMarkup(<Blog root={root} currentPage={node as LinkedNode<Sitemap.Blog, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsBlog)} />))
      return
    }
    case PageType.RSS: {
      writeFileSync(path, generateRSS(root, siteUrl))
      return
    }
    case PageType.ARTICLE: {
      // IGNORE
      return
    }
    case PageType.NOT_FOUND: {
      writeFileSync(`_site/404.html`, renderToStaticMarkup(<NotFound root={root} currentPage={node as LinkedNode<Sitemap.NotFoundPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsNotFound)} />))
      return
    }
    case PageType.LANDING: {
      writeFileSync(path, renderToStaticMarkup(<Landing root={root} currentPage={node as LinkedNode<Sitemap.LandingPage, object>} siteUrl={siteUrl} assets={optimiseAssets(assetsLanding)} />))
      return
    }
    default:
      assertUnreachable(page)
  }
}

function assertUnreachable(x: never): never {
  throw new Error('Did not expect to get here')
}

interface Settings {
  siteUrl: string
  vendorId: string
  eventBriteToken: string
  eventBriteOrg: string
  canPublishEvents: boolean
}

ok(process.env.ENVENTBRITE_TOKEN, `Missing Oauth token for Eventbrite https://www.eventbrite.com/platform/api#/introduction/authentication`)
ok(process.env.ENVENTBRITE_ORG, `Missing the organization ID for Eventbrite https://www.eventbrite.com/platform/api#/reference/organization/list/list-your-organizations`)

run({
  siteUrl: 'https://learnk8s.io',
  vendorId: '38628',
  eventBriteToken: process.env.ENVENTBRITE_TOKEN as string,
  eventBriteOrg: process.env.ENVENTBRITE_ORG as string,
  canPublishEvents: process.env.NODE_ENV === 'production',
})(sitemap(optimiseAssets(Sitemap.sitemapAssets)))

writeFileSync('_site/sitemap.xml', Sitemap.run(sitemap(optimiseAssets(Sitemap.sitemapAssets)), 'https://learnk8s.io'))