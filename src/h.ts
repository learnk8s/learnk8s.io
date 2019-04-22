import hastscript from 'hastscript'

type Component = <T extends keyof HTMLElementTagNameMap>(...args: any[]) => HTMLElementTagNameMap[T]

export function h<T extends keyof HTMLElementTagNameMap>(
  tagName: T | string | Component,
  attrs?: Object,
  ...children: any[]
): HTMLElementTagNameMap[T] {
  if (isFunction(tagName)) {
    return tagName({ ...attrs, children })
  }
  if (!!attrs && 'dangerouslySetInnerHTML' in attrs) {
    const value = (attrs as any).dangerouslySetInnerHTML.__html
    delete (attrs as any).dangerouslySetInnerHTML
    return hastscript(tagName, attrs, [{ type: 'raw', value }])
  }
  return hastscript(tagName, attrs, children)
}

function isFunction(value: unknown): value is Function {
  return {}.toString.call(value) === '[object Function]'
}
