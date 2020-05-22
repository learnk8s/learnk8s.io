import { VReference } from '../files'
import { createEntityAdapter, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { store } from '.'

const pageAdapter = createEntityAdapter<Page>({})
const redirectAdapter = createEntityAdapter<Redirect>({})
const previewPictureAdapter = createEntityAdapter<PreviewPicture>({})
const landingAdapter = createEntityAdapter<LandingPage>({})
const authorAdapter = createEntityAdapter<Author>({})
const openGraphAdapter = createEntityAdapter<OpenGraph>({})
const blogPostAdapter = createEntityAdapter<BlogPost>({})
const relatedBlogAdapter = createEntityAdapter<BlogPostMarkdownBlock>({})
const tagAdapter = createEntityAdapter<Tag>({})

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

export const openGraphSlice = createSlice({
  name: 'openGraph',
  initialState: openGraphAdapter.getInitialState(),
  reducers: {
    add: openGraphAdapter.addOne,
  },
})

export const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState: blogPostAdapter.getInitialState(),
  reducers: {
    add: blogPostAdapter.addOne,
  },
})

export const relatedBlogSlice = createSlice({
  name: 'relatedBlog',
  initialState: relatedBlogAdapter.getInitialState(),
  reducers: {
    add: relatedBlogAdapter.addOne,
  },
})

export const tagSlice = createSlice({
  name: 'tag',
  initialState: tagAdapter.getInitialState(),
  reducers: {
    add: tagAdapter.addOne,
  },
})

export type State = ReturnType<typeof store.getState>

export const websiteReducer = {
  pages: pageSlice.reducer,
  redirects: redirectSlice.reducer,
  previewPictures: previewPictureSlice.reducer,
  landings: landingSlice.reducer,
  authors: authorSlice.reducer,
  openGraphs: openGraphSlice.reducer,
  blogPosts: blogPostSlice.reducer,
  relatedBlogs: relatedBlogSlice.reducer,
  tags: tagSlice.reducer,
}

export const Action = {
  pages: { ...pageSlice.actions },
  redirects: { ...redirectSlice.actions },
  previewPictures: { ...previewPictureSlice.actions },
  landings: { ...landingSlice.actions },
  authors: { ...authorSlice.actions },
  openGraphs: { ...openGraphSlice.actions },
  blogPosts: { ...blogPostSlice.actions },
  relatedBlogs: { ...relatedBlogSlice.actions },
  tags: { ...tagSlice.actions },
}

export const Selector = {
  pages: pageAdapter.getSelectors<State>(state => state.pages),
  redirects: redirectAdapter.getSelectors<State>(state => state.redirects),
  previewPictures: previewPictureAdapter.getSelectors<State>(state => state.previewPictures),
  landings: landingAdapter.getSelectors<State>(state => state.landings),
  authors: authorAdapter.getSelectors<State>(state => state.authors),
  openGraphs: openGraphAdapter.getSelectors<State>(state => state.openGraphs),
  blogPosts: blogPostAdapter.getSelectors<State>(state => state.blogPosts),
  relatedBlogs: relatedBlogAdapter.getSelectors<State>(state => state.relatedBlogs),
  tags: tagAdapter.getSelectors<State>(state => state.tags),
}

const checkRedirectPage = middlewareCheck(checkRedirectPageRequirement)
const checkPreviewPicture = middlewareCheck(checkPreviewPictureRequirement)
const checkOpenGraph = middlewareCheck(checkOpenGraphRequirement)
const checkBlogPost = middlewareCheck(checkBlogPostRequirement)
const checkRelatedBlog = middlewareCheck(checkRelatedBlogRequirement)
const checkTag = middlewareCheck(checkTagRequirement)

export const middlewares = [
  checkRedirectPage,
  checkPreviewPicture,
  checkOpenGraph,
  checkBlogPost,
  checkRelatedBlog,
  checkTag,
]

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
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.pageId)
    ) {
      throw `Invalid pageId ${action.payload.pageId} for picture ${action.payload.id}`
    }
  }
}

function checkOpenGraphRequirement(action: PayloadAction<OpenGraph>, store: any) {
  if (action.type === 'openGraph/add') {
    if (
      Selector.openGraphs
        .selectAll(store.getState())
        .map(it => it.id)
        .includes(action.payload.id)
    ) {
      throw new Error(`Duplicate openGraph id ${action.payload.id}`)
    }
  }
}

function checkBlogPostRequirement(action: PayloadAction<BlogPost>, store: any) {
  if (action.type === 'blogPost/add') {
    if (!Selector.authors.selectAll(store.getState()).some(it => it.id === action.payload.authorId)) {
      throw new Error(`The author ${action.payload.authorId} for the blog post ${action.payload.title} doesn't exist`)
    }
  }
}

function checkRelatedBlogRequirement(action: PayloadAction<BlogPostMarkdownBlock>, store: any) {
  if (action.type === 'relatedBlog/add') {
    if (!Selector.blogPosts.selectAll(store.getState()).some(it => it.id === action.payload.blogPostId)) {
      throw new Error(
        `Couldn't find the blog post ${action.payload.blogPostId} for related article ${action.payload.id}`,
      )
    }
  }
}

function checkTagRequirement(action: PayloadAction<Tag>, store: any) {
  if (action.type === 'tag/add') {
    if (!Selector.pages.selectAll(store.getState()).some(it => it.id === action.payload.pageId)) {
      throw new Error(
        `Trying to create a tag ${action.payload.tag} for the not existent page ${action.payload.pageId}.`,
      )
    }
  }
}

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
  imagePath: string
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
  imagePath: string
  description: string
  title: string
}

export type Tag = {
  id: string
  tag: string
  pageId: string
}

export type BlogPostMarkdownBlock = {
  id: string
  blogPostId: string
  content: VReference
}
