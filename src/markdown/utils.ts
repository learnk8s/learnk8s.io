import * as Mdast from 'mdast'

export type Helpers<U> = {
  all: (node: Mdast.Node | Mdast.Parent | Mdast.Literal) => U[]
  one: (node: Mdast.Node | Mdast.Parent | Mdast.Literal, parent?: Mdast.Parent) => U
}

export interface MdastVisitors<U> {
  root(node: Mdast.Root, parent: undefined, helpers: Helpers<U>): U
  text(node: Mdast.Literal, parent: Mdast.Parent, helpers: Helpers<U>): U
  slideshow(node: Mdast.Slideshow, parent: Mdast.Parent, helpers: Helpers<U>): U
  slide(node: Mdast.Slide, parent: Mdast.Parent, helpers: Helpers<U>): U
  heading(node: Mdast.Heading, parent: Mdast.Parent, helpers: Helpers<U>): U
  paragraph(node: Mdast.Paragraph, parent: Mdast.Parent, helpers: Helpers<U>): U
  blockquote(node: Mdast.Blockquote, parent: Mdast.Parent, helpers: Helpers<U>): U
  list(node: Mdast.List, parent: Mdast.Parent, helpers: Helpers<U>): U
  listItem(node: Mdast.ListItem, parent: Mdast.Parent, helpers: Helpers<U>): U
  inlineCode(node: Mdast.InlineCode, parent: Mdast.Parent, helpers: Helpers<U>): U
  code(node: Mdast.Code, parent: Mdast.Parent, helpers: Helpers<U>): U
  terminal(node: Mdast.Terminal, parent: Mdast.Parent, helpers: Helpers<U>): U
  powershell(node: Mdast.Terminal, parent: Mdast.Parent, helpers: Helpers<U>): U
  html(node: Mdast.HTML, parent: Mdast.Parent, helpers: Helpers<U>): U
  thematicBreak(node: Mdast.ThematicBreak, parent: Mdast.Parent, helpers: Helpers<U>): U
  strong(node: Mdast.Strong, parent: Mdast.Parent, helpers: Helpers<U>): U
  emphasis(node: Mdast.Emphasis, parent: Mdast.Parent, helpers: Helpers<U>): U
  break(node: Mdast.Break, parent: Mdast.Parent, helpers: Helpers<U>): U
  delete(node: Mdast.Delete, parent: Mdast.Parent, helpers: Helpers<U>): U
  link(node: Mdast.Link, parent: Mdast.Parent, helpers: Helpers<U>): U
  linkReference(node: Mdast.LinkReference, parent: Mdast.Parent, helpers: Helpers<U>): U
  imageReference(node: Mdast.ImageReference, parent: Mdast.Parent, helpers: Helpers<U>): U
  definition(node: Mdast.Definition, parent: Mdast.Parent, helpers: Helpers<U>): U
  image(node: Mdast.Image, parent: Mdast.Parent, helpers: Helpers<U>): U
  footnote(node: Mdast.Footnote, parent: Mdast.Parent, helpers: Helpers<U>): U
  footnoteReference(node: Mdast.FootnoteReference, parent: Mdast.Parent, helpers: Helpers<U>): U
  footnoteDefinition(node: Mdast.FootnoteDefinition, parent: Mdast.Parent, helpers: Helpers<U>): U
  table(node: Mdast.Table, parent: Mdast.Parent, helpers: Helpers<U>): U
  tableCell(node: Mdast.TableCell, parent: Mdast.Parent, helpers: Helpers<U>): U
  tableRow(node: Mdast.TableRow, parent: Mdast.Parent, helpers: Helpers<U>): U
  animation(node: Mdast.Animation, parent: Mdast.Parent, helpers: Helpers<U>): U
  include(node: Mdast.Include, parent: Mdast.Parent, helpers: Helpers<U>): U
}

export type ArrayType<T extends Array<any>> = T extends (infer U)[] ? U : never
export function assertUnreachable(x: never): void {}

export function transform<U>(tree: Mdast.Node | Mdast.Literal | Mdast.Parent, visitors: MdastVisitors<U>): U {
  function one(node: Mdast.Node | Mdast.Literal | Mdast.Parent, parent?: Mdast.Parent): U {
    // Fail on unknown nodes.
    if (!(node.type in visitors)) {
      throw new Error(`Missing compiler for node of type ${node.type}: ${node}`)
    }

    return (visitors[node.type as keyof MdastVisitors<any>] as any).call(null, node, parent, { all, one })
  }

  function all(parent: Mdast.Parent): U[] {
    return parent.children.map((it, index) => {
      const result = one(it, parent)
      return isPrimitive(result) || Array.isArray(result) ? result : { ...result, key: index }
    })

    function isPrimitive(value: any): boolean {
      return value !== Object(value)
    }
  }

  return one(tree)
}

export function parseLink(
  link: Mdast.Link,
): <T>({
  absolute,
  relative,
  inline,
  file,
}: {
  absolute: () => T
  relative: () => T
  inline: () => T
  file: () => T
}) => T
export function parseLink(
  link: string,
): <T>({
  absolute,
  relative,
  inline,
  file,
}: {
  absolute: () => T
  relative: () => T
  inline: () => T
  file: () => T
}) => T
export function parseLink(link: Mdast.Link | string) {
  return function<T>({
    absolute,
    relative,
    inline,
    file,
  }: {
    absolute: () => T
    relative: () => T
    inline: () => T
    file: () => T
  }) {
    const url = isString(link) ? link : link.url
    // absolute
    if (url.startsWith('http')) {
      return absolute()
    }
    // external relative
    if (url.startsWith('/')) {
      return relative()
    }
    // local
    if (url.startsWith('#')) {
      return inline()
    }
    // relative
    return file()
  }
}

function isString(value: unknown): value is string {
  return {}.toString.call(value) === '[object String]'
}
