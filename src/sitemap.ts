import { PageDetails } from './layout'
import {Image} from './assets'

export const enum PageType {
  HOMEPAGE = 'HOMEPAGE',
  TRAINING = 'TRAINING',
  ACADEMY = 'ACADEMY',
  BLOG = 'BLOG',
  CONTACT_US = 'CONTACT_US',
  CONSULTING = 'CONSULTING',
  ABOUT_US = 'ABOUT_US',
  CAREERS = 'CAREERS',
  TERMS_AND_CONDITIONS = 'T_AND_CS',
  NEWSLETTER = 'NEWSLETTER',
  REDIRECT = 'REDIRECT',
  ARTICLE = 'ARTICLE',
  RSS = 'RSS',
  NOT_FOUND = 'NOT_FOUND',
}

export type Page =
  Homepage |
  TrainingPage |
  AcademyPage |
  Blog |
  ContactUsPage |
  ConsultingPage |
  AboutUsPage |
  TermsAndConditionsPage |
  Newsletter |
  CareersPage |
  Redirect |
  ArticlePage |
  RSS |
  NotFoundPage

export interface Homepage {
  type: PageType.HOMEPAGE
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface TrainingPage {
  type: PageType.TRAINING
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface AcademyPage {
  type: PageType.ACADEMY
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface ContactUsPage {
  type: PageType.CONTACT_US
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface Blog {
  type: PageType.BLOG
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface ConsultingPage {
  type: PageType.CONSULTING
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface AboutUsPage {
  type: PageType.ABOUT_US
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface TermsAndConditionsPage {
  type: PageType.TERMS_AND_CONDITIONS
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface Newsletter {
  type: PageType.NEWSLETTER
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface CareersPage {
  type: PageType.CAREERS
  seoTitle: string
  url: string
  pageDetails: PageDetails
}

export interface Redirect {
  type: PageType.REDIRECT
  url: string
  redirectTo: string
}

export interface ArticlePage {
  type: PageType.ARTICLE
  seoTitle: string
  url: string
  pageDetails: PageDetails
  publishedDate: string
}

export interface RSS {
  type: PageType.RSS
  url: string
}

export interface NotFoundPage {
  type: PageType.NOT_FOUND
  url: string
  seoTitle: string
  pageDetails: PageDetails
}

export const sitemapAssets = {
  openGraph: Image({url: 'assets/open_graph_preview.png', description: 'Learnk8s preview'}),
  k8sOnWindows: Image({url: '_blog/installing-docker-and-kubernetes-on-windows/k8s_on_win.jpg', description: 'Getting started with Docker and Kubernetes on Windows 10'}),
  chaos: Image({url: '_blog/kubernetes-chaos-engineering-lessons-learned/chaos-engineering-kubernetes.png', description: 'Chaos engineering'}),
  solar: Image({url: '_blog/kubernetes-on-solar-plants/solar_panel.png', description: 'Solar panels and Kubernetes'}),
  spot: Image({url: '_blog/kubernetes-spot-instances/cheap-cluster.jpg', description: 'Serving cheaper servers'}),
  kubeflow: Image({url: '_blog/scaling-machine-learning-with-kubeflow-tensorflow/kubeflow.png', description: 'Big data'}),
  springboot: Image({url: '_blog/scaling-spring-boot-microservices/autoscaling.png', description: 'Containers'}),
  smaller: Image({url: '_blog/smaller-docker-images/smaller_images.png', description: 'Docker whale'}),
  kubebucks: Image({url: '_blog/what-is-kubernetes/why-kube.png', description: 'Kubernetes bucks'}),
}

function identity<T>(value: T): T {
  return value
}

export function sitemap(assets: typeof sitemapAssets) {
  return createNode({
    page: identity<Homepage>({
      seoTitle: 'Learnk8s academy',
      url: '/',
      type: PageType.HOMEPAGE,
      pageDetails: {
        title: 'Learnk8s — the Kubernetes training company',
        description: 'We help you get started on your Kubernetes journey through comprehensive online, in person or remote training.',
        openGraphImage: assets.openGraph.url,
      },
    }),
   children: {
    training: createNode({
      page: identity<TrainingPage>({
        type: PageType.TRAINING,
        url: '/training',
        seoTitle: 'Kubernetes Training Courses ♦︎ Learnk8s',
        pageDetails: {
          title: 'Kubernetes Training Courses',
          description: 'Join an instructor-led, hands-on course on how to quickly deploy applications in Kubernetes — without having to wade through mountains of documentation — and learn how to orchestrate and manage containers at scale.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}}),
    academy: createNode({
      page: identity<AcademyPage>({
        type: PageType.ACADEMY,
        url: '/academy',
        seoTitle: 'Kubernetes Academy ♦︎ Learnk8s',
        pageDetails: {
          title: 'Kubernetes Online Course',
          description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}}),
    blog: createNode({
      page: identity<Blog>({
        type: PageType.BLOG,
        url: '/blog',
        seoTitle: 'Blog ♦︎ Learnk8s',
        pageDetails: {
          title: 'Blog',
          description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {
        installingK8sOnWindows: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/installing-docker-and-kubernetes-on-windows',
            seoTitle: 'Getting started with Docker and Kubernetes on Windows 10 ♦︎ Learnk8s',
            pageDetails: {
              title: 'Getting started with Docker and Kubernetes on Windows 10',
              description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
              openGraphImage: assets.k8sOnWindows.url,
            },
            publishedDate: '2018-06-05',
          }),
          children: {}
        }),
        chaosEngineering: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/kubernetes-chaos-engineering-lessons-learned',
            seoTitle: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1 ♦︎ Learnk8s',
            pageDetails: {
              title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
              description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
              openGraphImage: assets.chaos.url,
            },
            publishedDate: '2018-05-15',
          }),
          children: {}
        }),
        deployLaravel: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/kubernetes-deploy-laravel-the-easy-way',
            seoTitle: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
            pageDetails: {
              title: 'Kubernetes: deploy Laravel the easy way',
              description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
              openGraphImage: assets.chaos.url,
            },
            publishedDate: '2018-04-25',
          }),
          children: {}
        }),
        deployLaravelOld: createNode({
          page: identity<Redirect>({
            type: PageType.REDIRECT,
            url: '/deploying-laravel-to-kubernetes',
            redirectTo: '/kubernetes-deploy-laravel-the-easy-way',
          }),
          children: {}
        }),
        solarPlants: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/kubernetes-on-solar-plants',
            seoTitle: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants ♦︎ Learnk8s',
            pageDetails: {
              title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
              description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
              openGraphImage: assets.solar.url,
            },
            publishedDate: '2018-12-04',
          }),
          children: {}
        }),
        spotInstances: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/kubernetes-spot-instances',
            seoTitle: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes ♦︎ Learnk8s',
            pageDetails: {
              title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
              description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
              openGraphImage: assets.spot.url,
            },
            publishedDate: '2018-11-06',
          }),
          children: {}
        }),
        scalingTensorflow: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/scaling-machine-learning-with-kubeflow-tensorflow',
            seoTitle: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow ♦︎ Learnk8s',
            pageDetails: {
              title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow',
              description: `One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can operate at scale and in real-time. Data scientists and engineers are often expected to learn, develop and maintain the infrastructure for their experiments, but the process takes time away from focussing on training and developing the models. But what if you could outsource all of the non-data science to someone else while still retaining control? In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
              openGraphImage: assets.kubeflow.url,
            },
            publishedDate: '2019-01-09',
          }),
          children: {}
        }),
        scalingSpringBoot: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/scaling-spring-boot-microservices',
            seoTitle: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes ♦︎ Learnk8s',
            pageDetails: {
              title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes',
              description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
              openGraphImage: assets.springboot.url,
            },
            publishedDate: '2018-07-11',
          }),
          children: {}
        }),
        smallerDockerImage: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/smaller-docker-images',
            seoTitle: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
            pageDetails: {
              title: '3 simple tricks for smaller Docker images',
              description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
              openGraphImage: assets.smaller.url,
            },
            publishedDate: '2018-02-12',
          }),
          children: {}
        }),
        whatIsKubernetes: createNode({
          page: identity<ArticlePage>({
            type: PageType.ARTICLE,
            url: '/what-is-kubernetes',
            seoTitle: 'What is Kubernetes? Optimise your hosting costs and efficiency ♦︎ Learnk8s',
            pageDetails: {
              title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
              description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
              openGraphImage: assets.kubebucks.url,
            },
            publishedDate: '2018-09-04',
          }),
          children: {}
        })
      }
    }),
    contactUs: createNode({
      page: identity<ContactUsPage>({
        type: PageType.CONTACT_US,
        url: '/contact-us',
        seoTitle: 'Contact us ♦︎ Learnk8s',
        pageDetails: {
          title: 'Contact us',
          description: 'Get in touch and let us know how we can help.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    termsAndConditions: createNode({
      page: identity<TermsAndConditionsPage>({
        type: PageType.TERMS_AND_CONDITIONS,
        url: '/terms-and-conditions',
        seoTitle: 'Terms and Conditions ♦︎ Learnk8s',
        pageDetails: {
          title: 'Terms and Conditions',
          description: 'Terms and Conditions.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    newsletter: createNode({
      page: identity<Newsletter>({
        type: PageType.NEWSLETTER,
        url: '/newsletter',
        seoTitle: 'Newsletter ♦︎ Learnk8s',
        pageDetails: {
          title: 'Newsletter',
          description: 'Keep yourself up to date with the latest news from Learnk8s.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    consulting: createNode({
      page: identity<ConsultingPage>({
        type: PageType.CONSULTING,
        url: '/consulting',
        seoTitle: 'Consulting ♦︎ Learnk8s',
        pageDetails: {
          title: 'Consulting',
          description: 'Expertise in software development, strategy and operations to help you innovate at speed and scale.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    aboutUs: createNode({
      page: identity<AboutUsPage>({
        type: PageType.ABOUT_US,
        url: '/about-us',
        seoTitle: 'Team ♦︎ Learnk8s',
        pageDetails: {
          title: 'Team',
          description: 'Experienced software consultants, specialising in Kubernetes.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    careers: createNode({
      page: identity<CareersPage>({
        type: PageType.CAREERS,
        url: '/careers',
        seoTitle: 'Team ♦︎ Learnk8s',
        pageDetails: {
          title: 'Careers',
          description: 'Help others learn Kubernetes.',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    }),
    infiniteConf2018: createNode({
      page: identity<Redirect>({
        type: PageType.REDIRECT,
        url: '/infiniteconf2018',
        redirectTo: '/scaling-machine-learning-with-kubeflow-tensorflow'
      }),
      children: {}
    }),
    rss: createNode({
      page: identity<RSS>({
        type: PageType.RSS,
        url: '/rss',
      }),
      children: {}
    }),
    notFound: createNode({
      page: identity<NotFoundPage>({
        type: PageType.NOT_FOUND,
        url: '/404',
        seoTitle: 'Oops! Not found',
        pageDetails: {
          title: 'Not Found',
          description: 'Page not found',
          openGraphImage: assets.openGraph.url,
        },
      }),
      children: {}
    })
  }})
}

export type Website = ReturnType<typeof sitemap>

export interface LinkedNode<T, U extends object> {
  prev: LinkedNode<Page, any> | null
  next: LinkedNode<Page, any> | null
  payload: T
  children: U
  parent: LinkedNode<Page, any> | null
}

export function createNode<T extends Page, U extends {[name: string]: LinkedNode<Page, object>}>({page, children}: {page: T, children: U}): LinkedNode<T, U> {
  const linkedNode = {
    prev: null,
    next: null,
    payload: page,
    children,
    parent: null
  }
  Object.keys(children).forEach((key, index, array) => {
    children[key].parent = linkedNode
    if (index > 0) {
      children[key].prev = children[array[index -1]]
    }
    if (index < array.length) {
      children[key].next = children[array[index + 1]]
    }
  })
  return linkedNode
}

export function getFullUrl(currentPage: LinkedNode<Page, object>): string {
  let finalUrl = ''
  let currentNode: LinkedNode<Page, object> | null = currentPage
  while (currentNode !== null) {
    finalUrl = `${currentNode.payload.url}${finalUrl}`
    currentNode = currentNode.parent
  }
  return finalUrl.startsWith('//') ? finalUrl.slice(1) : finalUrl
}

export function getAbsoluteUrl(currentPage: LinkedNode<Page, object>, siteUrl: string): string {
  return `${siteUrl}${getFullUrl(currentPage)}`
}

export function getBlogPosts<T extends object>(blog: LinkedNode<Blog, T>): LinkedNode<ArticlePage, object>[] {
  return Object.values(blog.children).filter(it => it.payload.type === PageType.ARTICLE) as LinkedNode<ArticlePage, object>[]
}

function renderTree(node: LinkedNode<Page, object>, siteUrl: string): string[] {
  return [
    render(node, siteUrl),
    ...Object.values(node.children).reduce((acc, it) => acc.concat(renderTree(it as any, siteUrl)), [] as string[])
  ]
}

function render(node: LinkedNode<Page, object>, siteUrl: string) {
  if (node.payload.type === PageType.REDIRECT) {
    return ''
  }
  return `<url><loc>${getAbsoluteUrl(node, siteUrl)}</loc><lastmod>${(new Date()).toISOString()}</lastmod></url>`
}

export function run(root: LinkedNode<Page, object>, siteUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderTree(sitemap(sitemapAssets), siteUrl).join('')}</urlset>`
}