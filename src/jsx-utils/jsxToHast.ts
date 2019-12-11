import * as Hast from 'hast'
import { FunctionComponent, ComponentClass } from 'react'
import * as ReactIs from 'react-is'
import toHtml from 'hast-util-to-html'

export function jsxToString(jsx: JSX.Element | string | number | Array<JSX.Element | string | number>): string {
  const hast = jsxToHast(jsx)
  return toHtml({ type: 'root', children: Array.isArray(hast) ? hast : [hast] }, { allowDangerousHTML: true })
}

export function jsxToHast(
  jsx: JSX.Element | string | number | Array<JSX.Element | string | number>,
): Hast.Element | Hast.Comment | Hast.Text | Array<Hast.Element | Hast.Comment | Hast.Text> {
  if (isVoid(jsx) || isBoolean(jsx) || isNull(jsx)) {
    return null as any
  }
  if (isNumber(jsx) || isString(jsx)) {
    return { type: 'text', value: `${jsx}` }
  }
  if (Array.isArray(jsx)) {
    return jsx
      .reduce((acc, it) => {
        return acc.concat(jsxToHast(it))
      }, [] as Array<Hast.Element | Hast.Comment | Hast.Text>)
      .filter((it: any) => !isNull(it)) as any
  }
  if (isString(jsx.type)) {
    let {
      children,
      dangerouslySetInnerHTML,
      ...restProps
    }: {
      dangerouslySetInnerHTML: { __html: string }
      children: null | JSX.Element | JSX.Element[]
      className: string
      [name: string]: unknown
    } = jsx.props || {}
    children = !!children ? children : []
    children = Array.isArray(children) ? children : [children]
    const childrenInHast = children
      .reduce((acc, it) => {
        return acc.concat(jsxToHast(it))
      }, [] as Array<Hast.Element | Hast.Comment | Hast.Text>)
      .filter((it: any) => !isNull(it))
    let element: Hast.Element = {
      type: 'element',
      tagName: jsx.type as any,
      children: [
        ...(!!dangerouslySetInnerHTML ? [{ type: 'raw', value: dangerouslySetInnerHTML.__html } as Hast.Raw] : []),
        ...childrenInHast,
      ],
      properties: Object.keys(restProps).reduce((acc, key) => {
        if (key === 'className') {
          acc[key] = restProps.className.split(' ')
          return acc
        }
        if (key === 'defaultChecked') {
          acc['checked'] = restProps.defaultChecked
          return acc
        }
        if (key === 'defaultValue') {
          acc['value'] = restProps.defaultValue
          return acc
        }
        acc[hypenToCamelCase(key)] = restProps[key]
        return acc
      }, {} as Record<string, unknown>),
    }
    return element
  }
  if (ReactIs.isFragment(jsx)) {
    let { children }: { children: null | JSX.Element | JSX.Element[] } = jsx.props
    if (!children) {
      return null as any
    }
    if (!Array.isArray(children)) {
      children = [children]
    }
    return children
      .reduce((acc, it) => {
        return acc.concat(jsxToHast(it))
      }, [] as Array<Hast.Element | Hast.Comment | Hast.Text>)
      .filter((it: any) => !isNull(it)) as any
  }
  if (isStatelessComponent(jsx)) {
    try {
      return jsxToHast(((jsx as any).type as any).call(null, { ...(jsx as any).props }))
    } catch {
      // Component class
      return jsxToHast(new ((jsx as any).type as any)((jsx as any).props).render())
    }
  }
  throw 'Invalid element'
}

function isString(value: unknown): value is string {
  return {}.toString.call(value) === '[object String]'
}

function isNumber(value: unknown): value is number {
  return {}.toString.call(value) === '[object Number]'
}

function isFunction(value: unknown): value is Function {
  return {}.toString.call(value) === '[object Function]'
}

function isBoolean(value: unknown): value is boolean {
  return {}.toString.call(value) === '[object Boolean]'
}

function isNull(value: unknown): value is boolean {
  return {}.toString.call(value) === '[object Null]'
}

function isVoid(value: unknown): value is void {
  return {}.toString.call(value) === '[object Undefined]'
}

function isStatelessComponent(component: unknown): component is FunctionComponent {
  return isFunction((component as any).type)
}

function isComponentClass(component: unknown): component is ComponentClass {
  return component && (component as any).prototype.isReactComponent
}

function hypenToCamelCase(string: string) {
  return string.replace(/-([a-z])/g, g => g[1].toUpperCase())
}
