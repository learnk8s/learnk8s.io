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

// import cheerio from 'cheerio'
import { Cheerio } from './optimise'
import { store, getPages } from './store'
import { renderToStaticMarkup } from 'react-dom/server'

const mainPages = [
  { detail: NotFound.NotFound404, page: NotFound },
  { detail: AboutUs.AboutUs, page: AboutUs },
  { detail: Academy.Academy, page: Academy },
  { detail: ArchitectingAndScaling.Architecting, page: ArchitectingAndScaling },
  { detail: ZeroToK8s.ZeroToK8s, page: ZeroToK8s },
  { detail: Blog.Blog, page: Blog },
  { detail: Careers.Career, page: Careers },
  { detail: Consulting.Consulting, page: Consulting },
  { detail: ContactUs.ContactUs, page: ContactUs },
  { detail: Homepage.HomePage, page: Homepage },
  { detail: Newsletter.Newsletter, page: Newsletter },
  { detail: TermsAndConditions.TermsAndConditions, page: TermsAndConditions },

  // { id: SmallerImages.SmallerImages.id, page: SmallerImages },
  // { id: DeployLaravel.DeployLaravel.id, page: DeployLaravel },
  // { id: K8sOnWindows.K8sOnWindows.id, page: K8sOnWindows },
  // { id: ChaosEngineering.ChaosEngineering.id, page: ChaosEngineering },
  // { id: SolarPlants.SolarPlants.id, page: SolarPlants },
  // { id: SpotInstances.SpotInstances.id, page: SpotInstances },
  // { id: ScalingTensorflow.ScalingTensorflow.id, page: ScalingTensorflow },
  // { id: ScalingSpringBoot.ScalingSpringBoot.id, page: ScalingSpringBoot },
  // { id: WhatIsKubernetes.WhatIsKubernetes.id, page: WhatIsKubernetes },
  // { id: AdvancedKubectl.KubectlProductivity.id, page: AdvancedKubectl },
  // { id: TerraformAks.TerraformAks.id, page: TerraformAks },
  // { id: ZeroToK8sJs.ZeroToK8sJs.id, page: ZeroToK8sJs },
  // { id: Troubleshooting.Troubleshooting.id, page: Troubleshooting },
]

interface Node {
  type: string
  tagName?: string
  properties?: any
  children?: Node[]
  value?: string
}

interface TagData {
  name: string
  value: string
}

const getHtmlLang = (nodes: Cheerio): TagData => {
  const html = nodes.find('html').get() as any
  return {
    name: 'html lang',
    value: html.properties ? html.properties.lang : '',
  }
}

const getTitle = (nodes: Cheerio): TagData => {
  const title = nodes.find('head title').get() as any
  return {
    name: 'title',
    value: title ? (title.children[0] ? title.children[0].value : '') : '',
  }
}

const getAllMetaNode = (nodes: Cheerio): Node[] => {
  return nodes.findAll('head meta').get()
}

const getDescription = (metas: Node[]): TagData => {
  const name = 'description'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getAuthor = (metas: Node[]): TagData => {
  const name = 'author'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getViewport = (metas: Node[]): TagData => {
  const name = 'viewport'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getTwitterCard = (metas: Node[]): TagData => {
  const name = 'twitter:card'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getTwitterSite = (metas: Node[]): TagData => {
  const name = 'twitter:site'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getFbAppId = (metas: Node[]): TagData => {
  const name = 'fb:app_id'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgSiteName = (metas: Node[]): TagData => {
  const name = 'og:site_name'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getPocketSiteVerification = (metas: Node[]): TagData => {
  const name = 'pocket-site-verification'
  const meta = metas.find(it => it.properties.name === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgUrl = (metas: Node[]): TagData => {
  const name = 'og:url'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgType = (metas: Node[]): TagData => {
  const name = 'og:type'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgTitle = (metas: Node[]): TagData => {
  const name = 'og:title'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgImage = (metas: Node[]): TagData => {
  const name = 'og:image'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const getOgDescription = (metas: Node[]): TagData => {
  const name = 'og:description'
  const meta = metas.find(it => it.properties.property === name)!
  return {
    name,
    value: meta ? meta.properties.content : '',
  }
}

const checkIsHeadValueExist = (pageMeta: any) => {
  const url = pageMeta.detail.url
  const tagData: TagData[] = [
    ...Object.values(pageMeta.common) as TagData[],
    ...Object.values(pageMeta.openGraph) as TagData[],
    ...Object.values(pageMeta.facebook) as TagData[],
    ...Object.values(pageMeta.twitter) as TagData[],
    ...Object.values(pageMeta.mobile) as TagData[],
    ...Object.values(pageMeta.pocket) as TagData[],
  ];

  tagData.forEach(it => {
    if (it.value === '') {
      console.error(`${it.name} is not defined at ${url}`)
    }
  })
}

const run = () => {
  mainPages.forEach(it => it.page.Register(store))
  const state = store.getState()

  let pageMetas: any[] = mainPages.map(it => {
    return {
      ...it,
      nodes: Cheerio.of(renderToStaticMarkup(it.page.renderPage(state))),
    }
  })

  // Get html lang
  pageMetas = pageMetas.map(it => {
    return {
      ...it,
      common: {
        ...it.common,
        htmlLang: getHtmlLang(it.nodes),
      },
    }
  })

  // Get head title
  pageMetas = pageMetas.map(it => {
    return {
      ...it,
      common: {
        ...it.common,
        title: getTitle(it.nodes),
      },
    }
  })

  // Get all meta tag
  pageMetas = pageMetas.map(it => {
    const metas = getAllMetaNode(it.nodes)
    return {
      ...it,
      common: {
        ...it.common,
        description: getDescription(metas),
        author: getAuthor(metas),
      },
      openGraph: {
        ...it.openGraph,
        ogSiteName: getOgSiteName(metas),
        ogUrl: getOgUrl(metas),
        ogType: getOgType(metas),
        ogTitle: getOgTitle(metas),
        ogImage: getOgImage(metas),
        ogDescription: getOgDescription(metas),
      },
      facebook: {
        ...it.facebook,
        fbAppId: getFbAppId(metas),
      },
      twitter: {
        ...it.twitter,
        twitterCard: getTwitterCard(metas),
        twitterSite: getTwitterSite(metas),
      },
      mobile: {
        ...it.mobile,
        viewport: getViewport(metas),
      },
      pocket: {
        ...it.pocket,
        pocketSiteVerification: getPocketSiteVerification(metas),
      },
    }
  })

  pageMetas.forEach(it => {
    checkIsHeadValueExist(it)
  })

}

run()
