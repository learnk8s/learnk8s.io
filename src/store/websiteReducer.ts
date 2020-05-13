import { Reducer, applyMiddleware } from 'redux'
import { VReference } from '../files'
import { createEntityAdapter, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { storeV2 } from '.'

const pageAdapter = createEntityAdapter<Page>({})
const redirectAdapter = createEntityAdapter<Redirect>({})
const previewPictureAdapter = createEntityAdapter<PreviewPicture>({})
const landingAdapter = createEntityAdapter<LandingPage>({})
const authorAdapter = createEntityAdapter<Author>({})

export const pageSlice = createSlice({
  name: 'page',
  initialState: pageAdapter.getInitialState(),
  reducers: {
    add: pageAdapter.addOne,
  },
})

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState: redirectAdapter.getInitialState(),
  reducers: {
    add: redirectAdapter.addOne,
  },
})

export const previewPictureSlice = createSlice({
  name: 'previewPicture',
  initialState: previewPictureAdapter.getInitialState(),
  reducers: {
    add: previewPictureAdapter.addOne,
  },
})

export const landingSlice = createSlice({
  name: 'landing',
  initialState: landingAdapter.getInitialState(),
  reducers: {
    add: landingAdapter.addOne,
  },
})

export const authorSlice = createSlice({
  name: 'author',
  initialState: authorAdapter.getInitialState(),
  reducers: {
    add: authorAdapter.addOne,
  },
})

export type StateV2 = ReturnType<typeof storeV2.getState>

export const websiteReducer = {
  pages: pageSlice.reducer,
  redirects: redirectSlice.reducer,
  previewPictures: previewPictureSlice.reducer,
  landings: landingSlice.reducer,
  authors: authorSlice.reducer,
}

export const ActionV2 = {
  pages: { ...pageSlice.actions },
  redirects: { ...redirectSlice.actions },
  previewPictures: { ...previewPictureSlice.actions },
  landings: { ...landingSlice.actions },
  authors: { ...authorSlice.actions },
}

export const Selector = {
  pages: pageAdapter.getSelectors<StateV2>(state => state.pages),
  redirects: redirectAdapter.getSelectors<StateV2>(state => state.redirects),
  previewPictures: previewPictureAdapter.getSelectors<StateV2>(state => state.previewPictures),
  landings: landingAdapter.getSelectors<StateV2>(state => state.landings),
  authors: authorAdapter.getSelectors<StateV2>(state => state.authors),
}

const checkRedirectPage = middlewareCheck(checkRedirectPageRequirement)
const checkPreviewPicture = middlewareCheck(checkPreviewPictureRequirement)

export const middlewares = [checkRedirectPage, checkPreviewPicture]

function middlewareCheck<T>(checkFn: (action: PayloadAction<T>, store: any) => void) {
  return (store: any) => {
    return (next: Dispatch<PayloadAction<T>>) => (action: PayloadAction<T>) => {
      checkFn(action, store)
      return next(action)
    }
  }
}

function checkRedirectPageRequirement(action: PayloadAction<Redirect>, store: any) {
  if (action.type === 'redirect/add') {
    if (
      !Selector.pages
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.fromPageId)
    ) {
      throw new Error(
        `Couldn't create redirect ${action.payload.fromPageId} -> ${action.payload.redirectToPageId}. FROM does not exist`,
      )
    }
    if (
      !Selector.pages
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.redirectToPageId)
    ) {
      throw new Error(
        `Couldn't create redirect ${action.payload.fromPageId} -> ${action.payload.redirectToPageId}. TO does not exist`,
      )
    }
  }
}

function checkPreviewPictureRequirement(action: PayloadAction<PreviewPicture>, store: any) {
  if (action.type === 'previewPicture/add') {
    if (
      !Selector.pages
        .selectAll(storeV2.getState())
        .map(it => it.id)
        .includes(action.payload.pageId)
    ) {
      throw `Invalid pageId ${action.payload.pageId} for picture ${action.payload.id}`
    }
  }
}

export const Action = {
  // registerLandingPageLocation(args: LandingPage) {
  //   return { type: 'REGISTER_LANDING' as const, ...args }
  // },
  registerOpenGraph(args: OpenGraph) {
    return { type: 'REGISTER_OG' as const, ...args }
  },
  registerBlogPost(args: BlogPost) {
    return { type: 'REGISTER_BLOG_POST.V2' as const, ...args }
  },
  // registerPreviewPicture(args: PreviewPicture) {
  //   return { type: 'REGISTER_PREVIEW_PICTURE' as const, ...args }
  // },
  // registerAuthor(args: Author) {
  //   return { type: 'REGISTER_AUTHOR' as const, ...args }
  // },
  assignTag(args: Tag) {
    return { type: 'ASSIGN_TAG' as const, ...args }
  },
  registerBlogPostMarkdownBlock(args: BlogPostMarkdownBlock) {
    return { type: 'REGISTER_RELATED_BLOCK' as const, ...args }
  },
  // registerRedirect(args: Redirect) {
  //   return { type: 'REGISTER_REDIRECT' as const, ...args }
  // },
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

export type PreviewPicture = {
  id: string
  pageId: string
  image: JSX.Element
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
  openGraph: Record<string, OpenGraph>
  // landingPages: Record<string, LandingPage>
  blogPosts: Record<string, BlogPost>
  // authors: Record<string, Author>
  tags: Record<string, string[]>
  relatedBlocks: Record<string, BlogPostMarkdownBlock>
  // redirects: Record<string, Redirect>
  // previewPictures: Record<string, PreviewPicture>
}

export function createInitialState(options: {}): State {
  return {
    ...options,
    openGraph: {},
    // landingPages: {},
    blogPosts: {},
    // authors: {},
    tags: {},
    relatedBlocks: {},
    // redirects: {},
    // previewPictures: {},
  }
}

export const RootReducer: Reducer<State, Actions> = (
  state = createInitialState({ organisationId: 'unknown' }),
  action: Actions,
): State => {
  switch (action.type) {
    case 'REGISTER_OG': {
      if (action.id in state.openGraph) {
        throw new Error(`Duplicate openGraph id ${action.id}`)
      }
      return { ...state, openGraph: { ...state.openGraph, [action.id]: { ...action } } }
    }
    // case 'REGISTER_LANDING': {
    //   return { ...state, landingPages: { ...state.landingPages, [action.id]: { ...action } } }
    // }
    case 'REGISTER_BLOG_POST.V2': {
      if (!Selector.authors.selectAll(storeV2.getState()).some(it => it.id === action.authorId )) {
        throw new Error(`The author ${action.authorId} for the blog post ${action.title} doesn't exist`)
      }
      return { ...state, blogPosts: { ...state.blogPosts, [action.id]: { ...action } } }
    }
    // case 'REGISTER_AUTHOR': {
    //   return { ...state, authors: { ...state.authors, [action.id]: { ...action } } }
    // }
    case 'ASSIGN_TAG': {
      if (
        !Selector.pages
          .selectAll(storeV2.getState())
          .map(it => it.id)
          .includes(action.pageId)
      ) {
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
    // case 'REGISTER_REDIRECT': {
    //   if (
    //     !Selector.pages
    //       .selectAll(storeV2.getState())
    //       .map(it => it.id)
    //       .includes(action.fromPageId)
    //   ) {
    //     throw new Error(
    //       `Couldn't create redirect ${action.fromPageId} -> ${action.redirectToPageId}. FROM does not exist`,
    //     )
    //   }
    //   if (
    //     !Selector.pages
    //       .selectAll(storeV2.getState())
    //       .map(it => it.id)
    //       .includes(action.redirectToPageId)
    //   ) {
    //     throw new Error(
    //       `Couldn't create redirect ${action.fromPageId} -> ${action.redirectToPageId}. TO does not exist`,
    //     )
    //   }
    //   return { ...state, redirects: { ...state.redirects, [action.id]: { ...action } } }
    // }
    // case 'REGISTER_PREVIEW_PICTURE': {
    //   if (
    //     !Selector.pages
    //       .selectAll(storeV2.getState())
    //       .map(it => it.id)
    //       .includes(action.pageId)
    //   ) {
    //     throw `Invalid pageId ${action.pageId} for picture ${action.id}`
    //   }
    //   return { ...state, previewPictures: { ...state.previewPictures, [action.id]: { ...action } } }
    // }
    default:
      assertUnreachable(action)
      return state
  }
}

function assertUnreachable(x: never): void {}
