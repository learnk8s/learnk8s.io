import { PageDetails } from './layout'
import { ok } from 'assert'
import {Image} from './assets'

export const enum PageName {
  HOMEPAGE = 'HOMEPAGE',
  TRAINING = 'TRAINING',
  ACADEMY = 'ACADEMY',
  BLOG = 'BLOG',
  CONTACT_US = 'CONTACT_US',
  CONSULTING = 'CONSULTING',
  ABOUT_US = 'ABOUT_US',
  CAREERS = 'CAREERS',
  T_AND_CS = 'T_AND_CS',
  NEWSLETTER = 'NEWSLETTER',
  RSS = 'RSS',
}

export const enum PageType {
  HOMEPAGE = 'HOMEPAGE',
  TRAINING = 'TRAINING',
  ACADEMY = 'ACADEMY',
  BLOG = 'BLOG',
  CONTACT_US = 'CONTACT_US',
  CONSULTING = 'CONSULTING',
  ABOUT_US = 'ABOUT_US',
  CAREERS = 'CAREERS',
  T_AND_CS = 'T_AND_CS',
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
  TAndCsPage |
  Newsletter |
  CareersPage |
  Redirect |
  ArticlePage |
  RSS |
  NotFoundPage

export interface Homepage {
  type: PageType.HOMEPAGE
  friendlyName: PageName.HOMEPAGE
  title: string
  url: string
  pageDetails: PageDetails
}

export interface TrainingPage {
  type: PageType.TRAINING
  friendlyName: PageName.TRAINING
  title: string
  url: string
  pageDetails: PageDetails
}

export interface AcademyPage {
  type: PageType.ACADEMY
  friendlyName: PageName.ACADEMY
  title: string
  url: string
  pageDetails: PageDetails
}

export interface ContactUsPage {
  type: PageType.CONTACT_US
  friendlyName: PageName.CONTACT_US
  title: string
  url: string
  pageDetails: PageDetails
}

export interface Blog {
  type: PageType.BLOG
  friendlyName: PageName.BLOG
  title: string
  url: string
  pageDetails: PageDetails
}

export interface ConsultingPage {
  type: PageType.CONSULTING
  friendlyName: PageName.CONSULTING
  title: string
  url: string
  pageDetails: PageDetails
}

export interface AboutUsPage {
  type: PageType.ABOUT_US
  friendlyName: PageName.ABOUT_US
  title: string
  url: string
  pageDetails: PageDetails
}

export interface TAndCsPage {
  type: PageType.T_AND_CS
  friendlyName: PageName.T_AND_CS
  title: string
  url: string
  pageDetails: PageDetails
}

export interface Newsletter {
  type: PageType.NEWSLETTER
  friendlyName: PageName.NEWSLETTER
  title: string
  url: string
  pageDetails: PageDetails
}

export interface CareersPage {
  type: PageType.CAREERS
  friendlyName: PageName.CAREERS
  title: string
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
  title: string
  url: string
  pageDetails: PageDetails
  publishedDate: string
}

export interface RSS {
  type: PageType.RSS
  friendlyName: PageName.RSS
  url: string
}

export interface NotFoundPage {
  type: PageType.NOT_FOUND
  url: string
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

export function sitemap(assets: typeof sitemapAssets) {
  return [
    createNode<TrainingPage>({
      type: PageType.TRAINING,
      friendlyName: PageName.TRAINING,
      url: '/training',
      title: 'Kubernetes Training Courses ♦︎ Learnk8s',
      pageDetails: {
        title: 'Kubernetes Training Courses',
        description: 'Join an instructor-led, hands-on course on how to quickly deploy applications in Kubernetes — without having to wade through mountains of documentation — and learn how to orchestrate and manage containers at scale.',
        image: assets.openGraph.url,
        url: '/training',
      },
    }),

    createNode<AcademyPage>({
      type: PageType.ACADEMY,
      friendlyName: PageName.ACADEMY,
      url: '/academy',
      title: 'Kubernetes Academy ♦︎ Learnk8s',
      pageDetails: {
        title: 'Kubernetes Online Course',
        description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
        image: assets.openGraph.url,
        url: '/academy',
      },
    }),

    [
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/installing-docker-and-kubernetes-on-windows',
        title: 'Getting started with Docker and Kubernetes on Windows 10 ♦︎ Learnk8s',
        pageDetails: {
          title: 'Getting started with Docker and Kubernetes on Windows 10',
          description: `Getting started with Docker and Kubernetes on Windows can be daunting when you don't know where to begin. In this article you'll learn how to make the right choices when it comes to setting up your development environment on Windows.`,
          image: assets.k8sOnWindows.url,
          url: '/installing-docker-and-kubernetes-on-windows',
        },
        publishedDate: '2018-06-05',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/kubernetes-chaos-engineering-lessons-learned',
        title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1 ♦︎ Learnk8s',
        pageDetails: {
          title: 'Kubernetes Chaos Engineering: Lessons Learned — Part 1',
          description: `When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. A node may be a physical machine or a VM. The cluster routes the traffic to the nodes using a network proxy. But what happens when network proxy crashes?`,
          image: assets.chaos.url,
          url: '/kubernetes-chaos-engineering-lessons-learned',
        },
        publishedDate: '2018-05-15',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/kubernetes-deploy-laravel-the-easy-way',
        title: 'Kubernetes: deploy Laravel the easy way ♦︎ Learnk8s',
        pageDetails: {
          title: 'Kubernetes: deploy Laravel the easy way',
          description: `Laravel is an excellent framework for developing PHP applications. Whether you need to prototype a new idea, develop an MVP (Minimum Viable Product) or release a full-fledged enterprise system, Laravel facilitates all of the development tasks and workflows. In this article, I’ll explain how to deal with the simple requirement of running a Laravel application as a local Kubernetes set up.`,
          image: assets.chaos.url,
          url: '/kubernetes-deploy-laravel-the-easy-way',
        },
        publishedDate: '2018-04-25',
      }),
      createNode<Redirect>({
        type: PageType.REDIRECT,
        url: '/deploying-laravel-to-kubernetes',
        redirectTo: '/blog/kubernetes-deploy-laravel-the-easy-way',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/kubernetes-on-solar-plants',
        title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants ♦︎ Learnk8s',
        pageDetails: {
          title: 'Cloud infrastructure for the Internet of Things: Kubernetes on solar plants',
          description: `Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world. For solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating. An embedded computer is in charge of monitoring metrics and driving the actuators. But when you have thousands of solar panels and embedded computers how do you orchestrate software updates, monitor uptime and secure communications?`,
          image: assets.solar.url,
          url: '/kubernetes-on-solar-plants',
        },
        publishedDate: '2018-12-04',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/kubernetes-spot-instances',
        title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes ♦︎ Learnk8s',
        pageDetails: {
          title: 'Embracing failures and cutting infrastructure costs: Spot instances in Kubernetes',
          description: `Spot Instances are unused servers that are available for less than the regular price. Therefore, you can significantly save on your infrastructure costs. It does come with a price, though. Your cloud provider can take away your spot instance at any time, and give to another client who has requested it at a standard cost. How can you save money, but work around disappearing servers? Learn how you can leverage Kubernetes to self-heal your infrastructure and cut costs with Spot Instances.`,
          image: assets.spot.url,
          url: '/kubernetes-spot-instances',
        },
        publishedDate: '2018-11-06',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/scaling-machine-learning-with-kubeflow-tensorflow',
        title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow ♦︎ Learnk8s',
        pageDetails: {
          title: 'Scaling Jupyter notebooks with Kubernetes and Tensorflow',
          description: `One of the most common hurdles with developing AI and deep learning models is to design data pipelines that can operate at scale and in real-time. Data scientists and engineers are often expected to learn, develop and maintain the infrastructure for their experiments, but the process takes time away from focussing on training and developing the models. But what if you could outsource all of the non-data science to someone else while still retaining control? In this article, you will explore how you can leverage Kubernetes, Tensorflow and Kubeflow to scale your models without having to worry about scaling the infrastructure.`,
          image: assets.kubeflow.url,
          url: '/scaling-machine-learning-with-kubeflow-tensorflow',
        },
        publishedDate: '2019-01-09',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/scaling-spring-boot-microservices',
        title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes ♦︎ Learnk8s',
        pageDetails: {
          title: 'Scaling Microservices with Message Queues, Spring Boot and Kubernetes',
          description: `You should design your service so that even if it is subject to intermittent heavy loads, it continues to operate reliably. But how do you build such applications? And how do you deploy an application that scales dynamically?`,
          image: assets.springboot.url,
          url: '/scaling-spring-boot-microservices',
        },
        publishedDate: '2018-07-11',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/smaller-docker-images',
        title: '3 simple tricks for smaller Docker images ♦︎ Learnk8s',
        pageDetails: {
          title: '3 simple tricks for smaller Docker images',
          description: `When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?`,
          image: assets.smaller.url,
          url: '/smaller-docker-images',
        },
        publishedDate: '2018-02-12',
      }),
      createNode<ArticlePage>({
        type: PageType.ARTICLE,
        url: '/what-is-kubernetes',
        title: 'What is Kubernetes? Optimise your hosting costs and efficiency ♦︎ Learnk8s',
        pageDetails: {
          title: 'What is Kubernetes? Optimise your hosting costs and efficiency',
          description: `In the last few years, the industry has experienced a shift towards developing smaller and more focused applications. Smaller services are excellent from a product and development perspective: they are quicker to deploy, easier to iterate on and can handle failure gracefully. But how does that cultural shift impact the infrastructure? The current practices don't fit the paradigm well, and you might end up paying the extra price in your cloud bill at the end of the month.`,
          image: assets.kubebucks.url,
          url: '/what-is-kubernetes',
        },
        publishedDate: '2018-09-04',
      }),
    ].reduce((root, it) => addChild(root, it), createNode<Blog>({
      type: PageType.BLOG,
      friendlyName: PageName.BLOG,
      url: '/blog',
      title: 'Blog ♦︎ Learnk8s',
      pageDetails: {
        title: 'Blog',
        description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
        image: assets.openGraph.url,
        url: '/blog',
      },
    })),

    createNode<ContactUsPage>({
      type: PageType.CONTACT_US,
      friendlyName: PageName.CONTACT_US,
      url: '/contact-us',
      title: 'Contact us ♦︎ Learnk8s',
      pageDetails: {
        title: 'Contact us',
        description: 'Get in touch and let us know how we can help.',
        image: assets.openGraph.url,
        url: '/contact-us',
      },
    }),

    createNode<TAndCsPage>({
      type: PageType.T_AND_CS,
      friendlyName: PageName.T_AND_CS,
      url: '/terms-and-conditions',
      title: 'Terms and Conditions ♦︎ Learnk8s',
      pageDetails: {
        title: 'Terms and Conditions',
        description: 'Terms and Conditions.',
        image: assets.openGraph.url,
        url: '/terms-and-conditions',
      },
    }),

    createNode<Newsletter>({
      type: PageType.NEWSLETTER,
      friendlyName: PageName.NEWSLETTER,
      url: '/newsletter',
      title: 'Newsletter ♦︎ Learnk8s',
      pageDetails: {
        title: 'Newsletter',
        description: 'Keep yourself up to date with the latest news from Learnk8s.',
        image: assets.openGraph.url,
        url: '/newsletter',
      },
    }),


    createNode<ConsultingPage>({
      type: PageType.CONSULTING,
      friendlyName: PageName.CONSULTING,
      url: '/consulting',
      title: 'Consulting ♦︎ Learnk8s',
      pageDetails: {
        title: 'Consulting',
        description: 'Expertise in software development, strategy and operations to help you innovate at speed and scale.',
        image: assets.openGraph.url,
        url: '/newsletter',
      },
    }),

    createNode<AboutUsPage>({
      type: PageType.ABOUT_US,
      friendlyName: PageName.ABOUT_US,
      url: '/about-us',
      title: 'Team ♦︎ Learnk8s',
      pageDetails: {
        title: 'Team',
        description: 'Experienced software consultants, specialising in Kubernetes.',
        image: assets.openGraph.url,
        url: '/about-us',
      },
    }),

    createNode<CareersPage>({
      type: PageType.CAREERS,
      friendlyName: PageName.CAREERS,
      url: '/careers',
      title: 'Team ♦︎ Learnk8s',
      pageDetails: {
        title: 'Careers',
        description: 'Help others learn Kubernetes.',
        image: assets.openGraph.url,
        url: '/careers',
      },
    }),

    createNode<Redirect>({
      type: PageType.REDIRECT,
      url: '/infiniteconf2018',
      redirectTo: '/blog/scaling-machine-learning-with-kubeflow-tensorflow'
    }),

    createNode<RSS>({
      type: PageType.RSS,
      url: '/rss',
      friendlyName: PageName.RSS
    }),

    createNode<NotFoundPage>({
      type: PageType.NOT_FOUND,
      url: '/404',
      pageDetails: {
        title: 'Not Found',
        description: 'Page not found',
        image: assets.openGraph.url,
        url: '/404',
      },
    }),

  ].reduce((root, it) => addChild(root, it), createNode<Homepage>({
    title: 'Learnk8s academy',
    url: '/',
    type: PageType.HOMEPAGE,
    friendlyName: PageName.HOMEPAGE,
    pageDetails: {
      title: 'Learnk8s — the Kubernetes training company',
      description: 'We help you get started on your Kubernetes journey through comprehensive online, in person or remote training.',
      image: assets.openGraph.url,
      url: '/',
    },
  }))
}

export interface LinkedNode<T> {
  prev: LinkedNode<Page> | null
  next: LinkedNode<Page> | null
  payload: T
  children: LinkedNode<Page>[]
  parent: LinkedNode<Page> | null
}

export function addChild<U extends Page>(parent: LinkedNode<U>, child: LinkedNode<Page>): LinkedNode<U> {
  child.prev = parent.children[parent.children.length - 1] || null
  child.parent = parent
  const previousChild = parent.children[parent.children.length - 1]
  if (!!previousChild) {
    previousChild.next = child
    parent.children = [...parent.children.slice(0, -1), previousChild, child]
    return parent
  }
  parent.children = [child]
  return parent
}

export function createNode<T extends Page>(payload: T): LinkedNode<T> {
  return {
    prev: null,
    next: null,
    payload,
    children: [],
    parent: null
  }
}

export function find(node: LinkedNode<Page>, friendlyName: string): LinkedNode<Page> | null {
  return ('friendlyName' in node.payload) && node.payload.friendlyName === friendlyName ?
    node : node.children.find(it => find(it, friendlyName) !== null) || null
}

export function findOrPanic(node: LinkedNode<Page>, friendlyName: string): LinkedNode<Page> {
  const target = find(node, friendlyName)
  ok(target, `I couldn't find the friendly name ${friendlyName}`)
  return target as LinkedNode<Page>
}

export function getFullUrl(node: LinkedNode<Page>): string {
  let finalUrl = ''
  let currentNode: LinkedNode<Page> | null = node
  while (currentNode !== null) {
    finalUrl = `${currentNode.payload.url}${finalUrl}`
    currentNode = currentNode.parent
  }
  return finalUrl.startsWith('//') ? finalUrl.slice(1) : finalUrl
}

function renderTree(node: LinkedNode<Page>, root: LinkedNode<Page>, siteUrl: string): string[] {
  return [
    render(node, root, {siteUrl}),
    ...node.children.reduce((acc, it) => acc.concat(renderTree(it as any, root, siteUrl)), [] as string[])
  ]
}

function render(node: LinkedNode<Page>, root: LinkedNode<Page>, {siteUrl}: {siteUrl: string}) {
  if (node.payload.type === PageType.REDIRECT) {
    return ''
  }
  return `<url><loc>${siteUrl}${getFullUrl(node)}</loc><lastmod>${(new Date()).toISOString()}</lastmod></url>`
}

export function run(root: LinkedNode<Page>, siteUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderTree(sitemap(sitemapAssets), sitemap(sitemapAssets), siteUrl).join('')}</urlset>`
}