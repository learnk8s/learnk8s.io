import test from 'tape'
import { optimise } from '.'

test('it should remove height and width', async assert => {
  const svg = await optimise('<svg width="1200" height="1200"></svg>')
  assert.equal(svg, '<svg></svg>')
  assert.end()
})

test('it should remove ids but not all', async assert => {
  const svg = await optimise('<svg><path id="remove" d="M0 0h300v100H0z"></path><path id="anime-keep" d="M0 0h300v100H0z"></path></svg>', ['anime-'])
  assert.equal(svg, '<svg><path d="M0 0h300v100H0z"></path><path id="anime-keep" d="M0 0h300v100H0z"></path></svg>')
  assert.end()
})

test('it should keep ids for masks', async assert => {
  const svg = await optimise(
    [
      '<svg>',
      '<defs><linearGradient x1="85.463%" y1="97.424%" x2="5.901%" y2="-3.699%" id="linearGradient-3"><stop stop-color="#4F66B8" offset="0%"/><stop stop-color="#484FAA" offset="100%"/></linearGradient></defs>',
      '<path fill="url(#linearGradient-3)" d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"/>',
      '<path id="remove" d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"/>',
      '</svg>',
    ].join(''),
  )
  assert.equal(
    svg,
    [
      '<svg>',
      '<defs><linearGradient x1="85.463%" y1="97.424%" x2="5.901%" y2="-3.699%" id="linearGradient-3"><stop stop-color="#4F66B8" offset="0%"></stop><stop stop-color="#484FAA" offset="100%"></stop></linearGradient></defs>',
      '<path fill="url(#linearGradient-3)" d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"></path>',
      '<path d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"></path>',
      '</svg>',
    ].join(''),
  )
  assert.end()
})

test('it should replace the font', async assert => {
  const svg = await optimise('<svg><text font-family="Arial"><tspan>worker</tspan></text></svg>')
  assert.equal(
    svg,
    `<svg><style>.sans-serif{font-family:-apple-system,BlinkMacSystemFont,'avenir next', avenir,'helvetica neue',helvetica,ubuntu,roboto,noto,'segoe ui',arial,sans-serif}</style><text class="sans-serif"><tspan>worker</tspan></text></svg>`,
  )
  assert.end()
})

test('it should merge styles', async assert => {
  const svg = await optimise('<svg><style>.a{color:red}</style><style>.b{color:blue}</style><path id="remove" d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"/></svg>')
  assert.equal(svg, `<svg><style>.a{color:red}.b{color:blue}</style><path d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"></path></svg>`)
  assert.end()
})

test('it should merge styles', async assert => {
  const svg = await optimise('<svg><style>.a{color:red}</style><style>.b{color:blue}</style><path id="remove" d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"/></svg>')
  assert.equal(svg, `<svg><style>.a{color:red}.b{color:blue}</style><path d="M32.841.204L11.257 22.408V.204H3.76v52.698h7.497V26.555l23.381 26.347h9.594L19.049 24.667 42.735.204z"></path></svg>`)
  assert.end()
})
