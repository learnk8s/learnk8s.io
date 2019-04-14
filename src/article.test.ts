import test from 'tape'
import { groupHighlightedCode, Group, extractCodeFences } from './remark'

test('it should group code when highlighted', assert => {
  const grouped = groupHighlightedCode('12-13,23-30', 34)
  assert.equal(grouped[0][0], Group.STANDARD)
  assert.equal(grouped[0][1].length, 11)
  assert.equal(grouped[1][0], Group.HIGHLIGHT)
  assert.equal(grouped[1][1].length, 2)
  assert.equal(grouped[2][0], Group.STANDARD)
  assert.equal(grouped[2][1].length, 9)
  assert.equal(grouped[3][0], Group.HIGHLIGHT)
  assert.equal(grouped[3][1].length, 8)
  assert.equal(grouped[4][0], Group.STANDARD)
  assert.equal(grouped[4][1].length, 4)

  assert.end()
})

test('it should group code when not highlighted', assert => {
  const grouped = groupHighlightedCode(null, 5)
  assert.equal(grouped[0][1].length, 5)

  assert.end()
})

test('it should group code when highlighted, first part', assert => {
  const grouped = groupHighlightedCode('1', 5)
  assert.equal(grouped[0][1].length, 1)
  assert.equal(grouped[1][1].length, 4)

  assert.end()
})

test('it should group code when highlighted, last part', assert => {
  const grouped = groupHighlightedCode('5', 5)
  assert.equal(grouped[0][1].length, 4)
  assert.equal(grouped[1][1].length, 1)

  assert.end()
})

test('it should group code when highlighted, e2e', assert => {
  const grouped = groupHighlightedCode('1,12-13,15,23-30,34', 34)
  assert.equal(grouped[0][1].length, 1)
  assert.equal(grouped[1][1].length, 10)
  assert.equal(grouped[2][1].length, 2)
  assert.equal(grouped[3][1].length, 1)
  assert.equal(grouped[4][1].length, 1)
  assert.equal(grouped[5][1].length, 7)
  assert.equal(grouped[6][1].length, 8)
  assert.equal(grouped[7][1].length, 3)
  assert.equal(grouped[8][1].length, 1)
  assert.end()
})

test('it should extract args', assert => {
  assert.deepEqual(extractCodeFences(null, []), {
    lang: null,
  })
  assert.end()
})

test('it should extract args', assert => {
  assert.deepEqual(extractCodeFences('yaml', []), {
    lang: 'yaml',
  })
  assert.end()
})

test('it should extract args', assert => {
  assert.deepEqual(extractCodeFences('yaml|highlight=12-24,5|title=test.yaml', ['highlight', 'title']), {
    lang: 'yaml',
    highlight: '12-24,5',
    title: 'test.yaml',
  })
  assert.end()
})

test('it should extract args', assert => {
  assert.deepEqual(extractCodeFences('highlight=12-24,5|title=test.yaml', ['highlight', 'title']), {
    lang: null,
    highlight: '12-24,5',
    title: 'test.yaml',
  })
  assert.end()
})

test('it should extract args', assert => {
  assert.deepEqual(extractCodeFences('terminal|command=12-24,5|title=test.yaml', ['command', 'title', 'nope']), {
    lang: 'terminal',
    command: '12-24,5',
    title: 'test.yaml',
    nope: null,
  })
  assert.end()
})
