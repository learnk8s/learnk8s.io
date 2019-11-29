import { Reducer } from 'redux'
import { VReference } from '../files'

export const Action = {
  registerPage(args: Page) {
    return { type: 'REGISTER_PAGE' as const, ...args }
  },
  registerLandingPageLocation(args: LandingPage) {
    return { type: 'REGISTER_LANDING' as const, ...args }
  },
  registerOpenGraph(args: OpenGraph) {
    return { type: 'REGISTER_OG' as const, ...args }
  },
  registerBlogPost(args: BlogPost) {
    return { type: 'REGISTER_BLOG_POST.V2' as const, ...args }
  },
  registerAuthor(args: Author) {
    return { type: 'REGISTER_AUTHOR' as const, ...args }
  },
  assignTag(args: Tag) {
    return { type: 'ASSIGN_TAG' as const, ...args }
  },
  registerBlogPostMarkdownBlock(args: BlogPostMarkdownBlock) {
    return { type: 'REGISTER_RELATED_BLOCK' as const, ...args }
  },
  registerRedirect(args: Redirect) {
    return { type: 'REGISTER_REDIRECT' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

export type Page = {
  id: string
  url: string
  title: string
  description: string
}

export type Redirect = {
  id: string
  fromPageId: string
  redirectToPageId: string
}

export type BlogPost = {
  id: string
  pageId: string
  authorId: string
  title: string
  description: string
  publishedDate: string
  lastModifiedDate?: string
  content: VReference
}

export type Author = {
  id: string
  fullName: string
  avatar: JSX.Element
  link: string
  description?: string
}

export type LandingPage = {
  id: string
  pageId: string
  city: string
}

export type OpenGraph = {
  id: string
  pageId: string
  image: JSX.Element
  description: string
  title: string
}

export type Tag = {
  id: string
  pageId: string
}

export type BlogPostMarkdownBlock = {
  id: string
  blogPostId: string
  content: VReference
}

export interface State {
  pages: Record<string, Page>
  openGraph: Record<string, OpenGraph>
  landingPages: Record<string, LandingPage>
  blogPosts: Record<string, BlogPost>
  authors: Record<string, Author>
  tags: Record<string, string[]>
  relatedBlocks: Record<string, BlogPostMarkdownBlock>
  redirects: Record<string, Redirect>
}

export function createInitialState(options: {}): State {
  return {
    ...options,
    pages: {},
    openGraph: {},
    landingPages: {},
    blogPosts: {},
    authors: {},
    tags: {},
    relatedBlocks: {},
    redirects: {},
  }
}

export const RootReducer: Reducer<State, Actions> = (
  state = createInitialState({ organisationId: 'unknown' }),
  action: Actions,
): State => {
  switch (action.type) {
    case 'REGISTER_PAGE': {
      if (!!Object.values(state.pages).find(it => it.url === action.url)) {
        throw new Error(`Duplicate page url: ${action.url}`)
      }
      return { ...state, pages: { ...state.pages, [action.id]: { ...action } } }
    }
    case 'REGISTER_OG': {
      if (action.id in state.openGraph) {
        throw new Error(`Duplicate openGraph id ${action.id}`)
      }
      return { ...state, openGraph: { ...state.openGraph, [action.id]: { ...action } } }
    }
    case 'REGISTER_LANDING': {
      return { ...state, landingPages: { ...state.landingPages, [action.id]: { ...action } } }
    }
    case 'REGISTER_BLOG_POST.V2': {
      if (!(action.authorId in state.authors)) {
        throw new Error(`The author ${action.authorId} for the blog post ${action.title} doesn't exist`)
      }
      return { ...state, blogPosts: { ...state.blogPosts, [action.id]: { ...action } } }
    }
    case 'REGISTER_AUTHOR': {
      return { ...state, authors: { ...state.authors, [action.id]: { ...action } } }
    }
    case 'ASSIGN_TAG': {
      if (!(action.pageId in state.pages)) {
        throw new Error(`Trying to create a tag ${action.id} for the not existent page ${action.pageId}.`)
      }
      return {
        ...state,
        tags: {
          ...state.tags,
          [action.pageId]: [action.id, ...(Array.isArray(state.tags[action.pageId]) ? state.tags[action.pageId] : [])],
        },
      }
    }
    case 'REGISTER_RELATED_BLOCK': {
      if (!(action.blogPostId in state.blogPosts)) {
        throw new Error(`Couldn't find the blog post ${action.blogPostId} for related article ${action.id}`)
      }
      return {
        ...state,
        relatedBlocks: { ...state.relatedBlocks, [Object.keys(state.relatedBlocks).length + 1]: { ...action } },
      }
    }
    case 'REGISTER_REDIRECT': {
      if (!(action.fromPageId in state.pages)) {
        throw new Error(
          `Couldn't create redirect ${action.fromPageId} -> ${action.redirectToPageId}. FROM does not exist`,
        )
      }
      if (!(action.redirectToPageId in state.pages)) {
        throw new Error(
          `Couldn't create redirect ${action.fromPageId} -> ${action.redirectToPageId}. TO does not exist`,
        )
      }
      return { ...state, redirects: { ...state.redirects, [action.id]: { ...action } } }
    }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}
