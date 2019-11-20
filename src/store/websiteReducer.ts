import { Reducer } from 'redux'

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
    return { type: 'REGISTER_BLOG_POST' as const, ...args }
  },
  registerAuthor(args: Author) {
    return { type: 'REGISTER_AUTHOR' as const, ...args }
  },
  assignTag(args: Tag) {
    return { type: 'ASSIGN_TAG' as const, ...args }
  },
  registerRelatedArticle(args: RelatedArticle) {
    return { type: 'REGISTER_RELATED_ARTICLE' as const, ...args }
  },
}

export type Actions = ReturnType<typeof Action[keyof typeof Action]>

export type Page = {
  id: string
  url: string
  title: string
  description: string
}

export type BlogPost = {
  id: string
  pageId: string
  authorId: string
  title: string
  description: string
  publishedDate: string
  lastModifiedDate?: string
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

export type RelatedArticle = {
  title: string
  description: string
  url: string
  blogPostId: string
}

export interface State {
  pages: Record<string, Page>
  openGraph: Record<string, OpenGraph>
  landingPages: Record<string, LandingPage>
  blogPosts: Record<string, BlogPost>
  authors: Record<string, Author>
  tags: Record<string, string[]>
  relatedArticles: Record<string, RelatedArticle>
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
    relatedArticles: {},
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
    case 'REGISTER_BLOG_POST': {
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
    case 'REGISTER_RELATED_ARTICLE': {
      if (!(action.blogPostId in state.blogPosts)) {
        throw new Error(`Couldn't find the blog post ${action.blogPostId} for related article ${action.title}`)
      }
      return {
        ...state,
        relatedArticles: { ...state.relatedArticles, [Object.keys(state.relatedArticles).length + 1]: { ...action } },
      }
    }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}
