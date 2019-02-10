import { PageDetails } from './layout'
import { ok } from 'assert'

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
  CareersPage

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

export const sitemap = [
  createNode<TrainingPage>({
    type: PageType.TRAINING,
    friendlyName: PageName.TRAINING,
    url: '/training',
    title: 'Kubernetes Training Courses ♦︎ Learnk8s',
    pageDetails: {
      title: 'Kubernetes Training Courses',
      description: 'Join an instructor-led, hands-on course on how to quickly deploy applications in Kubernetes — without having to wade through mountains of documentation — and learn how to orchestrate and manage containers at scale.',
      image: '/assets/open_graph_preview.png',
      url: '/training',
    },
  }),

  createNode<AcademyPage>({
    type: PageType.ACADEMY,
    friendlyName: PageName.ACADEMY,
    url: '/acaedemy',
    title: 'Kubernetes Academy ♦︎ Learnk8s',
    pageDetails: {
      title: 'Kubernetes Online Course',
      description: `A hands-on, online course on mastering Kubernetes, containers and the tools you'll need to build real, working applications at scale.`,
      image: '/assets/open_graph_preview.png',
      url: '/academy',
    },
  }),

  createNode<Blog>({
    type: PageType.BLOG,
    friendlyName: PageName.BLOG,
    url: '/blog',
    title: 'Blog ♦︎ Learnk8s',
    pageDetails: {
      title: 'Blog',
      description: 'The fastest way to become an expert in deploying applications at scale with Kubernetes.',
      image: '/assets/open_graph_preview.png',
      url: '/blog',
    },
  }),

  createNode<ContactUsPage>({
    type: PageType.CONTACT_US,
    friendlyName: PageName.CONTACT_US,
    url: '/contact-us',
    title: 'Contact us ♦︎ Learnk8s',
    pageDetails: {
      title: 'Contact us',
      description: 'Get in touch and let us know how we can help.',
      image: '/assets/open_graph_preview.png',
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
      image: '/assets/open_graph_preview.png',
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
      image: '/assets/open_graph_preview.png',
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
      image: '/assets/open_graph_preview.png',
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
      image: '/assets/open_graph_preview.png',
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
      image: '/assets/open_graph_preview.png',
      url: '/careers',
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
    image: '/assets/open_graph_preview.png',
    url: '/',
  },
}))

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