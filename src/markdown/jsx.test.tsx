import test from 'tape'
import React from 'react'
import parents, { NestedParent, NestedNode } from 'unist-util-parents'
import { select, matches } from 'unist-util-select'
import * as Mdast from 'mdast'
import {Node} from 'unist'

test('it should retrieve the last heading', assert => {
  const element = parentUntil(
    parents({
      type: 'root',
      children: [],
    }),
    'heading',
  )
  assert.notOk(element)
  assert.end()
})

test('it should retrieve the last heading', assert => {
  const mdast = parents({
    type: 'root',
    children: [
      { type: 'heading', depth: 1, children: [{ type: 'text', value: 'title' }] },
      { type: 'text', value: 'start' },
    ],
  })
  const element = parentUntil<Mdast.Heading>(select<NestedParent>('text[value="start"]', mdast)!, 'heading')
  assert.ok(element)
  assert.equal(element!.depth, 1)
  assert.end()
})

test('it should retrieve the last heading', assert => {
  const mdast = parents({
    type: 'root',
    children: [
      { type: 'heading', depth: 1, children: [{ type: 'text', value: 'title1' }] },
      { type: 'heading', depth: 2, children: [{ type: 'text', value: 'title2' }] },
      { type: 'paragraph', children: [{ type: 'string', children: [{ type: 'text', value: 'start' }] }] },
    ],
  })
  const element = parentUntil<Mdast.Heading>(select<NestedParent>('text[value="start"]', mdast)!, 'heading')
  assert.ok(element)
  assert.equal(element!.depth, 2)
  assert.end()
})

export function parentUntil<T extends Node>(node: NestedNode | NestedParent, selector: string): T | null {
  const parent = node.parent
  if (!parent) {
    return null
  }
  const children = parent.children
  let index = children.findIndex(it => it === node)
  while (index > -1 && !matches(selector, children[index].node)) {
    index--
  }
  return index > -1 ? (children[index].node as T) : parentUntil<T>(parent, selector)
}