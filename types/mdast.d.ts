declare module '~mdast/index' {
  import * as Unist from 'unist'

  export type Base = Parent | Literal | Node
  export type Content = TopLevelContent | ListContent | TableContent | RowContent | PhrasingContent
  export type TopLevelContent = BlockContent | FrontmatterContent | DefinitionContent
  export type BlockContent =
    | Paragraph
    | Heading
    | ThematicBreak
    | Blockquote
    | List
    | Table
    | HTML
    | Code
    | Terminal
    | PowerShell
    | Slideshow
    | Animation
  export type FrontmatterContent = YAML
  export type DefinitionContent = Definition | FootnoteDefinition
  export type ListContent = ListItem
  export type TableContent = TableRow
  export type RowContent = TableCell
  export type PhrasingContent = StaticPhrasingContent | Link | LinkReference
  export type StaticPhrasingContent =
    | Text
    | Emphasis
    | Strong
    | Delete
    | HTML
    | InlineCode
    | Break
    | Image
    | ImageReference
    | Footnote
    | FootnoteReference
    | Slide

  export interface Parent extends Unist.Parent {
    children: Content[]
  }

  export interface Node extends Unist.Node {}

  export interface Literal extends Unist.Literal {
    value: string
  }

  export interface Root extends Parent {
    type: 'root'
  }

  export interface Paragraph extends Parent {
    type: 'paragraph'
    children: PhrasingContent[]
  }

  export interface Heading extends Parent {
    type: 'heading'
    depth: number
    children: PhrasingContent[]
  }

  export interface ThematicBreak extends Node {
    type: 'thematicBreak'
  }

  export interface Blockquote extends Parent {
    type: 'blockquote'
    children: BlockContent[]
  }

  export interface List extends Parent {
    type: 'list'
    ordered?: boolean
    start?: number
    spread?: boolean
    children: ListContent[]
  }

  export interface ListItem extends Parent {
    type: 'listItem'
    checked?: boolean
    spread?: boolean
    children: BlockContent[]
  }

  export interface Table extends Parent {
    type: 'table'
    align?: Array<'left' | 'right' | 'center' | null>
    children: TableContent[]
  }

  export interface TableRow extends Parent {
    type: 'tableRow'
    children: RowContent[]
  }

  export interface TableCell extends Parent {
    type: 'tableCell'
    children: PhrasingContent[]
  }

  export interface HTML extends Literal {
    type: 'html'
  }

  export interface Code extends Literal {
    type: 'code'
    lang?: string
    meta?: string
  }

  export interface YAML extends Literal {
    type: 'yaml'
  }

  export interface Definition extends Node, Association, Resource {
    type: 'definition'
  }

  export interface FootnoteDefinition extends Parent, Association {
    type: 'footnoteDefinition'
    children: BlockContent[]
  }

  export interface Text extends Literal {
    type: 'text'
  }

  export interface Emphasis extends Parent {
    type: 'emphasis'
    children: PhrasingContent[]
  }

  export interface Strong extends Parent {
    type: 'strong'
    children: PhrasingContent[]
  }

  export interface Delete extends Parent {
    type: 'delete'
    children: PhrasingContent[]
  }

  export interface InlineCode extends Literal {
    type: 'inlineCode'
  }

  export interface Break extends Node {
    type: 'break'
  }

  export interface Link extends Parent, Resource {
    type: 'link'
    children: StaticPhrasingContent[]
  }

  export interface Image extends Node, Resource, Alternative {
    type: 'image'
  }

  export interface LinkReference extends Parent, Reference {
    type: 'linkReference'
    children: StaticPhrasingContent[]
  }

  export interface ImageReference extends Node, Reference, Alternative {
    type: 'imageReference'
  }

  export interface Footnote extends Parent {
    type: 'footnote'
    children: PhrasingContent[]
  }

  export interface FootnoteReference extends Node, Association {
    type: 'footnoteReference'
  }

  interface Resource {
    url: string
    title?: string
  }

  interface Association {
    identifier: string
    label?: string
  }

  interface Reference extends Association {
    referenceType: string
  }

  interface Alternative {
    alt?: string
  }

  /* Custom elements */
  export interface Terminal extends Literal {
    type: 'terminal'
    title: string | null
    command: string | null
    highlight: string | null
  }

  export interface PowerShell extends Literal {
    type: 'powershell'
    title: string | null
    command: string | null
  }

  export interface Slideshow extends Parent {
    type: 'slideshow'
    children: (Slide | Paragraph)[]
  }

  export interface Animation extends Parent {
    type: 'animation'
    children: Image[]
  }

  export interface Slide extends Parent {
    type: 'slide'
    children: (Image | Paragraph)[]
  }

  export interface Include extends Literal {
    type: 'include'
  }
}

declare module 'mdast' {
  import alias = require('~mdast/index')
  export = alias
}
