import test from 'tape'
import { jsxToHast } from './jsxToHast'
import React, { Fragment } from 'react'

test('it should convert jsx to hast #1', assert => {
  assert.deepEqual(jsxToHast(<div className='test'>test</div>), {
    type: 'element',
    tagName: 'div',
    properties: { className: ['test'] },
    children: [{ type: 'text', value: 'test' }],
  })
  assert.end()
})

test('it should convert jsx to hast — nested structure and data attributes', assert => {
  assert.deepEqual(
    jsxToHast(
      <div className='test1 test2' data-test='1' id='bla'>
        test1<span>test2</span>
      </div>,
    ),
    {
      type: 'element',
      tagName: 'div',
      properties: { className: ['test1', 'test2'], dataTest: '1', id: 'bla' },
      children: [
        { type: 'text', value: 'test1' },
        { type: 'element', tagName: 'span', children: [{ type: 'text', value: 'test2' }], properties: {} },
      ],
    },
  )
  assert.end()
})

test('it should convert jsx to hast — react componentes', assert => {
  const Message: React.StatelessComponent<{ message: string }> = ({ message, children }) => {
    return (
      <p>
        {message}, <span>{children}</span>
      </p>
    )
  }
  assert.deepEqual(
    jsxToHast(
      <div>
        <Message message='yo'>one</Message>
      </div>,
    ),
    {
      type: 'element',
      tagName: 'div',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: 'yo' },
            { type: 'text', value: ', ' },
            {
              type: 'element',
              tagName: 'span',
              children: [{ type: 'text', value: 'one' }],
              properties: {},
            },
          ],
          properties: {},
        },
      ],
      properties: {},
    },
  )
  assert.end()
})

test('it should convert jsx to hast — raw', assert => {
  assert.deepEqual(jsxToHast(<div dangerouslySetInnerHTML={{ __html: 'html' }}>test</div>), {
    type: 'element',
    tagName: 'div',
    children: [
      { type: 'raw', value: 'html' },
      { type: 'text', value: 'test' },
    ],
    properties: {},
  })
  assert.end()
})

test('it should convert jsx to hast — null, boolean, undefined', assert => {
  assert.deepEqual(
    jsxToHast(
      <div>
        {null},{undefined},{true}
      </div>,
    ),
    {
      type: 'element',
      tagName: 'div',
      children: [
        { type: 'text', value: ',' },
        { type: 'text', value: ',' },
      ],
      properties: {},
    },
  )
  assert.end()
})

test('it should convert jsx to hast — Fragments', assert => {
  assert.deepEqual(
    jsxToHast(
      <Fragment>
        <span>one</span>two
      </Fragment>,
    ),
    [
      { type: 'element', tagName: 'span', children: [{ type: 'text', value: 'one' }], properties: {} },
      { type: 'text', value: 'two' },
    ],
  )
  assert.end()
})

test('it should convert jsx to hast — Nested fragments', assert => {
  assert.deepEqual(
    jsxToHast(
      <h1>
        <Fragment>one</Fragment>
      </h1>,
    ),
    { type: 'element', tagName: 'h1', children: [{ type: 'text', value: 'one' }], properties: {} },
  )
  assert.end()
})

test('it should convert defaultChecked', assert => {
  assert.deepEqual(jsxToHast(<input type='checkbox' defaultChecked={true} />), {
    type: 'element',
    tagName: 'input',
    children: [],
    properties: { checked: true, type: 'checkbox' },
  })
  assert.end()
})

test('it should convert defaultValue', assert => {
  assert.deepEqual(jsxToHast(<input type='text' defaultValue='this-is-it' />), {
    type: 'element',
    tagName: 'input',
    children: [],
    properties: { value: 'this-is-it', type: 'text' },
  })
  assert.end()
})
