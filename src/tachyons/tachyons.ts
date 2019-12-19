import cssom from 'cssom'
import CSSwhat from 'css-what'

const mediaQueries = [
  { from: 30, name: 'ns' },
  { from: 30, to: 60, name: 'm' },
  { from: 60, name: 'l' },
]

const mediaQueriesless = [
  aspectRatios(),
  backgroundSize(),
  skip(backgroundPosition()),
  skip(outlines()),
  borders(),
  borderRadius([0, 0.125, 0.25, 0.5, 1]),
  borderStyle(),
  borderWidths([0, 0.125, 0.25, 0.5, 1, 2]),
  boxShadow(),
  code(),
  coordinates([0, 1, 2, -1, -2]),
  clears(),
  display(),
  flexbox(),
  floats(),
  fontStyle(),
  fontWeight([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  heights([1, 2, 4, 8, 16]),
  letterSpacing([0.1, -0.05, 0.25]),
  utilities(),
  lineHeight([1, 1.25, 1.5]),
  maxWidths([1, 2, 4, 8, 16, 32, 48, 64, 96]),
  widths([1, 2, 4, 8, 16, 32, 48]),
  overflow(),
  position(),
  rotations([45, 90, 135, 180, 225, 270, 315]),
  spacing([0.25, 0.5, 1, 2, 4, 8, 16]),
  textDecoration(),
  textAlign(),
  textTransform(),
  typography([6, 5, 3, 2.25, 1.5, 1.25, 1, 0.875, 0.75]),
  measure([30, 34, 20]),
  visibility(),
  whiteSpace(),
  verticalAlign(),
  skip(wordBreak()),
]

export const tachyons = [
  normalize(),
  boxSizing(),
  colour({
    black: '#000',
    // 'near-black': '#111',
    'dark-gray': '#333',
    // 'mid-gray': '#555',
    gray: '#777',
    silver: '#999',
    'light-silver': '#aaa',
    'moon-gray': '#ccc',
    'light-gray': '#eee',
    'near-white': '#f4f4f4',
    white: '#fff',
    'black-90': 'rgba(0,0,0,.9)',
    'black-80': 'rgba(0,0,0,.8)',
    'black-70': 'rgba(0,0,0,.7)',
    'black-60': 'rgba(0,0,0,.6)',
    'black-50': 'rgba(0,0,0,.5)',
    'black-40': 'rgba(0,0,0,.4)',
    'black-30': 'rgba(0,0,0,.3)',
    'black-20': 'rgba(0,0,0,.2)',
    'black-10': 'rgba(0,0,0,.1)',
    'black-05': 'rgba(0,0,0,.05)',
    'black-025': 'rgba(0,0,0,.025)',
    'black-0125': 'rgba(0,0,0,.0125)',
    // 'white-90': 'rgba(255,255,255,.9)',
    // 'white-80': 'rgba(255,255,255,.8)',
    'white-70': 'rgba(255,255,255,.7)',
    // 'white-60': 'rgba(255,255,255,.6)',
    // 'white-50': 'rgba(255,255,255,.5)',
    // 'white-40': 'rgba(255,255,255,.4)',
    // 'white-30': 'rgba(255,255,255,.3)',
    // 'white-20': 'rgba(255,255,255,.2)',
    // 'white-10': 'rgba(255,255,255,.1)',
    // 'white-05': 'rgba(255,255,255,.05)',
    // 'white-025': 'rgba(255,255,255,.025)',
    // 'white-0125': 'rgba(255,255,255,.0125)',
    'dark-red': '#e7040f',
    'light-red': '#ff725c',
    // red: '#ff4136',
    // orange: '#ff6300',
    // gold: '#ffb700',
    yellow: '#ffd700',
    // 'light-yellow': '#fbf1a9',
    // purple: '#5e2ca5',
    // 'light-purple': '#a463f2',
    // 'dark-pink': '#d5008f',
    // 'hot-pink': '#ff41b4',
    // pink: '#ff80cc',
    // 'light-pink': '#ffa3d7',
    'dark-green': '#137752',
    green: '#19a974',
    'light-green': '#9eebcf',
    'dark-blue': '#00449e',
    blue: '#357edd',
    'light-blue': '#96ccff',
    'lightest-blue': '#cdecff',
    // 'washed-blue': '#f6fffe',
    // 'washed-green': '#e8fdf5',
    'washed-yellow': '#fffceb',
    // 'washed-red': '#ffdfdf',
    navy: '#001b44',
    sky: '#569ad1',
    evian: '#f7f9fc',
  }),
  links(),
  ...mediaQueriesless,
  opacity([1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.025, 0]),
  fontFamily(),
  forms(),
  hover(),
  images(),
  lists(),
  tables(),
  zScale([0, 1, 2, 3, 4, 5]),
  codeHighlightingCommon(),
  codeHighlighting(),
  powershellHighlighting(),
  bashHighlighting(),
  mediaQueryfy(mediaQueries)(mediaQueriesless.join('\n')),
].join('\n')

function normalize(): string {
  return `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
main {
  display: block;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
a {
  background-color: transparent;
}
abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
[type='button'],
[type='reset'],
[type='submit'],
button {
  -webkit-appearance: button;
}
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner,
button::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring,
button:-moz-focusring {
  outline: 1px dotted ButtonText;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}
progress {
  vertical-align: baseline;
}
textarea {
  overflow: auto;
}
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
details {
  display: block;
}
summary {
  display: list-item;
}
template {
  display: none;
}
[hidden] {
  display: none;
}`
}

function aspectRatios(): string {
  return `.aspect-ratio {
  height: 0;
  position: relative;
}
.aspect-ratio--16x9 { padding-bottom: 56.25%; }
.aspect-ratio--9x16 { padding-bottom: 177.77%; }
.aspect-ratio--4x3 { padding-bottom: 75%; }
.aspect-ratio--3x4 { padding-bottom: 133.33%; }
.aspect-ratio--6x4 { padding-bottom: 66.6%; }
.aspect-ratio--4x6 { padding-bottom: 150%; }
.aspect-ratio--8x5 { padding-bottom: 62.5%; }
.aspect-ratio--5x8 { padding-bottom: 160%; }
.aspect-ratio--7x5 { padding-bottom: 71.42%; }
.aspect-ratio--5x7 { padding-bottom: 140%; }
.aspect-ratio--1x1 { padding-bottom: 100%; }
.aspect-ratio--object {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}`
}

function backgroundPosition(): string {
  return `.bg-center {
  background-repeat: no-repeat;
  background-position: center center;
}
.bg-top {
  background-repeat: no-repeat;
  background-position: top center;
}
.bg-right {
  background-repeat: no-repeat;
  background-position: center right;
}
.bg-bottom {
  background-repeat: no-repeat;
  background-position: bottom center;
}
.bg-left {
  background-repeat: no-repeat;
  background-position: center left;
}`
}

function backgroundSize(): string {
  return `.cover { background-size: cover!important; }
.contain { background-size: contain!important; }`
}

function borderStyle(): string {
  return `.b--dotted { border-style: dotted; }
.b--dashed { border-style: dashed; }
.b--solid { border-style: solid; }
.b--none { border-style: none; }`
}

function borders(): string {
  return `.ba { border-style: solid; border-width: 1px; }
.bt { border-top-style: solid; border-top-width: 1px; }
.br { border-right-style: solid; border-right-width: 1px; }
.bb { border-bottom-style: solid; border-bottom-width: 1px; }
.bl { border-left-style: solid; border-left-width: 1px; }
.bn { border-style: none; border-width: 0; }`
}

function boxShadow(): string {
  return `.shadow-1 { box-shadow: 0 0 4px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-2 { box-shadow: 0 0 8px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-3 { box-shadow: 2px 2px 4px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-4 { box-shadow: 2px 2px 8px 0 rgba( 0, 0, 0, 0.2 ); }
.shadow-5 { box-shadow: 4px 4px 8px 0 rgba( 0, 0, 0, 0.2 ); }`
}

function boxSizing(): string {
  return `html,
body,
div,
article,
aside,
section,
main,
nav,
footer,
header,
form,
fieldset,
legend,
pre,
code,
a,
h1,h2,h3,h4,h5,h6,
p,
ul,
ol,
li,
dl,
dt,
dd,
blockquote,
figcaption,
figure,
textarea,
table,
td,
th,
tr,
input[type="email"],
input[type="number"],
input[type="password"],
input[type="tel"],
input[type="text"],
input[type="url"],
.border-box {
  box-sizing: border-box;
}`
}

function clears(): string {
  return `.cf:before,
.cf:after { content: " "; display: table; }
.cf:after { clear: both; }
.cf { *zoom: 1; }
.cl { clear: left; }
.cr { clear: right; }
.cb { clear: both; }
.cn { clear: none; }`
}

function code(): string {
  return `.pre {
  overflow-x: auto;
  overflow-y: hidden;
  overflow: scroll;
}`
}

function coordinates(scale: number[]): string {
  return [
    scale
      .map(it => {
        return [
          `.top-${it} { top: ${toRem(it)}; }`,
          `.right-${it} { right: ${toRem(it)}; }`,
          `.bottom-${it} { bottom: ${toRem(it)}; }`,
          `.left-${it} { left: ${toRem(it)}; }`,
        ].join('\n')
      })
      .join('\n'),
    `.absolute--fill {top: 0; right: 0; bottom: 0; left: 0; }`,
  ].join('\n')
}

function display(): string {
  return `.dn { display: none; }
.di { display: inline; }
.db { display: block; }
.dib { display: inline-block; }
.dit { display: inline-table; }
.dt { display: table; }
.dtc { display: table-cell; }
.dt-row { display: table-row; }
.dt-row-group { display: table-row-group; }
.dt-column { display: table-column; }
.dt-column-group { display: table-column-group; }
.dt--fixed { table-layout: fixed; width: 100%; }`
}

function flexbox(): string {
  return `.flex { display: flex; }
.inline-flex { display: inline-flex; }

/* 1. Fix for Chrome 44 bug.
  * https://code.google.com/p/chromium/issues/detail?id=506893 */
.flex-auto {
  flex: 1 1 auto;
  min-width: 0; /* 1 */
  min-height: 0; /* 1 */
}

.flex-none { flex: none; }

.flex-column { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.flex-wrap-reverse { flex-wrap: wrap-reverse; }
.flex-column-reverse { flex-direction: column-reverse; }
.flex-row-reverse { flex-direction: row-reverse; }

.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

.self-start { align-self: flex-start; }
.self-end { align-self: flex-end; }
.self-center { align-self: center; }
.self-baseline { align-self: baseline; }
.self-stretch { align-self: stretch; }

.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.content-start { align-content: flex-start; }
.content-end { align-content: flex-end; }
.content-center { align-content: center; }
.content-between { align-content: space-between; }
.content-around { align-content: space-around; }
.content-stretch { align-content: stretch; }

.order-0 { order: 0; }
.order-1 { order: 1; }
.order-2 { order: 2; }
.order-3 { order: 3; }
.order-4 { order: 4; }
.order-5 { order: 5; }
.order-6 { order: 6; }
.order-7 { order: 7; }
.order-8 { order: 8; }
.order-last { order: 99999; }

.flex-grow-0 { flex-grow: 0; }
.flex-grow-1 { flex-grow: 1; }

.flex-shrink-0 { flex-shrink: 0; }
.flex-shrink-1 { flex-shrink: 1; }`
}

function floats(): string {
  return `.fl { float: left; _display: inline; }
.fr { float: right; _display: inline; }
.fn { float: none; }`
}

function fontFamily(): string {
  return `.sans-serif {
  font-family: -apple-system, BlinkMacSystemFont,
                'avenir next', avenir,
                'helvetica neue', helvetica,
                ubuntu,
                roboto, noto,
                'segoe ui', arial,
                sans-serif;
}

.serif {
  font-family: georgia, times, serif;
}

code, .code {
  font-family: Consolas, monaco, monospace;
}`
}

function fontStyle(): string {
  return `.i { font-style: italic; }
.fs-normal { font-style: normal; }`
}

function fontWeight(scale: number[]): string {
  return [
    scale.map((it, index) => `.fw${index + 1} { font-weight: ${it}; }`).join('\n'),
    `.normal { font-weight: normal; }`,
    `.b { font-weight: bold; }`,
  ].join('\n')
}

function forms(): string {
  return `.input-reset {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.button-reset::-moz-focus-inner,
.input-reset::-moz-focus-inner {
  border: 0;
  padding: 0;
}`
}

function hover(): string {
  return `.dim {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.dim:hover,
.dim:focus {
  opacity: .5;
  transition: opacity .15s ease-in;
}
.dim:active {
  opacity: .8; transition: opacity .15s ease-out;
}
.glow {
  transition: opacity .15s ease-in;
}
.glow:hover,
.glow:focus {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.hide-child .child {
  opacity: 0;
  transition: opacity .15s ease-in;
}
.hide-child:hover .child,
.hide-child:focus .child,
.hide-child:active .child {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.underline-hover:hover,
.underline-hover:focus {
  text-decoration: underline;
}
.grow {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}
.grow:hover,
.grow:focus {
  transform: scale(1.05);
}
.grow:active {
  transform: scale(.90);
}
.grow-large {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform .25s ease-in-out;
}
.grow-large:hover,
.grow-large:focus {
  transform: scale(1.2);
}
.grow-large:active {
  transform: scale(.95);
}
.pointer:hover {
  cursor: pointer;
}
.shadow-hover {
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.shadow-hover::after {
  content: '';
  box-shadow: 0 0 16px 2px rgba( 0, 0, 0, .2 );
  border-radius: inherit;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.shadow-hover:hover::after,
.shadow-hover:focus::after {
  opacity: 1;
}
.bg-animate,
.bg-animate:hover,
.bg-animate:focus {
  transition: background-color .15s ease-in-out;
}`
}

function images(): string {
  return `img { max-width: 100%; }`
}

function letterSpacing([normal, tight, mega]: [number, number, number]): string {
  return `.tracked { letter-spacing: ${normal}em; }
.tracked-tight { letter-spacing: ${tight}em; }
.tracked-mega { letter-spacing: ${mega}em; }`
}

function links(): string {
  return `.link {
  text-decoration: none;
  transition: color .15s ease-in;
}
.link:link,
.link:visited {
  transition: color .15s ease-in;
}
.link:hover {
  transition: color .15s ease-in;
}
.link:active {
  transition: color .15s ease-in;
}
.link:focus {
  transition: color .15s ease-in;
  outline: 1px dotted currentColor;
}`
}

function lists(): string {
  return `.list { list-style-type: none; }`
}

function outlines(): string {
  return `.outline { outline: 1px solid; }
.outline-transparent { outline: 1px solid transparent; }
.outline-0 { outline: 0; }`
}

function overflow(): string {
  return `.overflow-visible { overflow: visible; }
.overflow-hidden { overflow: hidden; }
.overflow-scroll { overflow: scroll; }
.overflow-auto { overflow: auto; }
.overflow-x-visible { overflow-x: visible; }
.overflow-x-hidden { overflow-x: hidden; }
.overflow-x-scroll { overflow-x: scroll; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-visible { overflow-y: visible; }
.overflow-y-hidden { overflow-y: hidden; }
.overflow-y-scroll { overflow-y: scroll; }
.overflow-y-auto { overflow-y: auto; }`
}

function position(): string {
  return `.static { position: static; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }`
}

function rotations(scale: number[]): string {
  return scale.map(it => `.rotate-${it} { transform: rotate(${it}deg); }`).join('\n')
}

function textAlign(): string {
  return `.tl { text-align: left; }
.tr { text-align: right; }
.tc { text-align: center; }
.tj { text-align: justify; }`
}

function textDecoration(): string {
  return `.strike { text-decoration: line-through; }
.underline { text-decoration: underline; }
.no-underline { text-decoration: none; }`
}

function textTransform(): string {
  return `.ttc { text-transform: capitalize; }
.ttl { text-transform: lowercase; }
.ttu { text-transform: uppercase; }
.ttn { text-transform: none; }`
}

function utilities(): string {
  return `.overflow-container {
  overflow-y: scroll;
}
.center {
  margin-right: auto;
  margin-left: auto;
}
.mr-auto { margin-right: auto; }
.ml-auto { margin-left: auto; }`
}

function verticalAlign(): string {
  return `.v-base { vertical-align: baseline; }
  .v-mid { vertical-align: middle; }
  .v-top { vertical-align: top; }
  .v-btm { vertical-align: bottom; }`
}

function visibility(): string {
  return `.clip {
  position: fixed !important;
  _position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
}`
}

function whiteSpace(): string {
  return `.ws-normal { white-space: normal; }
.nowrap { white-space: nowrap; }
.pre { white-space: pre; }`
}

function wordBreak(): string {
  return `.word-normal { word-break: normal; }
.word-wrap { word-break: break-all; }
.word-nowrap { word-break: keep-all; }`
}

function zScale(scale: number[]) {
  return [
    scale.map(it => `.z-${it} { z-index: ${it}; }`).join('\n'),
    `.z-999 { z-index: 999; }`,
    `.z-9999 { z-index: 9999; }`,
    `.z-max { z-index: 2147483647; }`,
    `.z-inherit { z-index: inherit; }`,
    `.z-initial { z-index: initial; }`,
    `.z-unset { z-index: unset; }`,
  ].join('\n')
}

function tables(): string {
  return `.collapse {
  border-collapse: collapse;
  border-spacing: 0;
}

.striped--light-silver:nth-child(odd) {
  background-color: var(--light-silver);
}

.striped--moon-gray:nth-child(odd) {
  background-color: var(--moon-gray);
}

.striped--light-gray:nth-child(odd) {
  background-color: var(--light-gray);
}

.striped--near-white:nth-child(odd) {
  background-color: var(--near-white);
}

.stripe-light:nth-child(odd) {
  background-color: var(--white-10);
}

.stripe-dark:nth-child(odd) {
  background-color: var(--black-10);
}`
}

function typography(scale: number[]): string {
  return [
    ...scale.map((it, step) => `.ff${step + 1} { font-size: ${it}rem; }`),
    `.f-6, .f-headline { font-size: 6rem; }
.f-5,.f-subheadline { font-size: 5rem; }
.f1 { font-size: 3rem; }
.f2 { font-size: 2.25rem; }
.f3 { font-size: 1.5rem; }
.f4 { font-size: 1.25rem; }
.f5 { font-size: 1rem; }
.f6 { font-size: .875rem; }
.f7 { font-size: .75rem; }`,
  ].join('\n')
}

function mediaQueryfy(mediaQueries: { from?: number; to?: number; name: string }[]) {
  return function(input: string): string {
    return mediaQueries
      .map(it => {
        const css = cssom.parse(input)
        css.cssRules.forEach((selector: any) => {
          const cssSelector = CSSwhat.parse(selector.selectorText)
          cssSelector.forEach((tokens: any[]) => {
            tokens.forEach((element: any) =>
              element.name === 'class' ? (element.value = `${element.value}-${it.name}`) : null,
            )
          })
          return (selector.selectorText = CSSwhat.stringify(cssSelector))
        })
        const min = it.from && !isNaN(it.from) ? `and (min-width: ${it.from}em)` : ''
        const max = it.to && !isNaN(it.to) ? `and (max-width: ${it.to}em)` : ''
        return `@media screen ${[min, max].join(' ')} {\n${css}\n}`
      })
      .join('\n')
  }
}

function spacing(scale: number[]): string {
  const directions = {
    all: {
      name: 'a',
      fn: (prop: string, value: number) => `${prop}: ${toRem(value)}`,
    },
    left: {
      name: 'l',
      fn: (prop: string, value: number) => `${prop}-left: ${toRem(value)}`,
    },
    right: { name: 'r', fn: (prop: string, value: number) => `${prop}-right: ${toRem(value)}` },
    top: {
      name: 't',
      fn: (prop: string, value: number) => `${prop}-top: ${toRem(value)}`,
    },
    bottom: { name: 'b', fn: (prop: string, value: number) => `${prop}-bottom: ${toRem(value)}` },
    vert: {
      name: 'v',
      fn: (prop: string, value: number) => `${prop}-top: ${toRem(value)}; ${prop}-bottom: ${toRem(value)}`,
    },
    horiz: {
      name: 'h',
      fn: (prop: string, value: number) => `${prop}-left: ${toRem(value)}; ${prop}-right: ${toRem(value)}`,
    },
  } as const
  return [0]
    .concat(scale)
    .map((spacing, step) => {
      return [
        ...Object.values(directions).map(it => {
          return [`.p${it.name}${step} { ${it.fn('padding', spacing)}; }`].join('\n')
        }),
        ...Object.values(directions).map(it => {
          return [`.m${it.name}${step} { ${it.fn('margin', spacing)}; }`].join('\n')
        }),
        ...Object.values(directions)
          .filter(it => ['a', 'l', 'r', 'b', 't'].includes(it.name))
          .map(it => {
            return [`.n${it.name}${step} { ${it.fn('margin', -spacing)}; }`].join('\n')
          }),
      ].join('\n')
    })
    .join('\n')
}

function lineHeight([solid, title, copy]: [number, number, number]): string {
  return [
    `.lh-solid { line-height: ${solid}; }`,
    `.lh-title { line-height: ${title}; }`,
    `.lh-copy { line-height: ${copy}; }`,
  ].join('\n')
}

function measure([normal, wide, narrow]: [number, number, number]): string {
  return [
    `.measure { max-width: ${normal}em; }`,
    `.measure-wide { max-width: ${wide}em; }`,
    `.measure-narrow { max-width: ${narrow}em; }`,
    `.small-caps { font-variant: small-caps; }`,
    `.indent { text-indent: 1em; margin-top: 0; margin-bottom: 0; }`,
    `.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
  ].join('\n')
}

function colour(colours: Record<string, string>): string {
  const expandedColours: Record<string, string> = { ...colours, transparent: 'transparent', inherit: 'inherit' }
  return Object.keys(expandedColours)
    .map(name => {
      return [
        `.${name}, .hover-${name}:focus, .hover-${name}:hover { color: ${expandedColours[name]}; }`,
        `.bg-${name}, .hover-bg-${name}:focus, .hover-bg-${name}:hover { background-color: ${expandedColours[name]}; }`,
        `.b--${name} { border-color: ${expandedColours[name]}; }`,
      ].join('\n')
    })
    .join('\n')
}

function borderWidths(scale: number[]): string {
  return [
    scale.map((it, step) => `.bw${step} { border-width: ${toRem(it)}; }`).join('\n'),
    `.bt-0 { border-top-width: 0; }`,
    `.br-0 { border-right-width: 0; }`,
    `.bb-0 { border-bottom-width: 0; }`,
    `.bl-0 { border-left-width: 0; }`,
  ].join('\n')
}

function borderRadius(scale: number[]): string {
  return [
    scale.map((it, step) => `.br${step} { border-radius: ${toRem(it)}; }`).join('\n'),
    '.br-100 { border-radius: 100%; }',
    '.br-pill { border-radius: 9999px; }',
    `.br--bottom { border-top-left-radius: 0; border-top-right-radius: 0; }`,
    `.br--top { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }`,
    `.br--right { border-top-left-radius: 0; border-bottom-left-radius: 0; }`,
    `.br--left { border-top-right-radius: 0; border-bottom-right-radius: 0; }`,
  ].join('\n')
}

function widths(scale: number[]): string {
  return [
    scale.map((it, step) => `.w${step + 1} { width: ${it}rem; }`).join('\n'),
    '.w-10 { width: 10%; }',
    '.w-20 { width: 20%; }',
    '.w-25 { width: 25%; }',
    '.w-30 { width: 30%; }',
    '.w-33 { width: 33%; }',
    '.w-34 { width: 34%; }',
    '.w-40 { width: 40%; }',
    '.w-50 { width: 50%; }',
    '.w-60 { width: 60%; }',
    '.w-70 { width: 70%; }',
    '.w-75 { width: 75%; }',
    '.w-80 { width: 80%; }',
    '.w-90 { width: 90%; }',
    '.w-100 { width: 100%; }',
    '.w-third { width: calc(100% / 3); }',
    '.w-two-thirds { width: calc(100% / 1.5); }',
    '.w-auto { width: auto; }',
  ].join('\n')
}

function heights(scale: number[]): string {
  return [
    scale.map((it, step) => `.h${step + 1} { height: ${it}rem; }`).join('\n'),
    '.h-25 { height: 25%; }',
    '.h-50 { height: 50%; }',
    '.h-75 { height: 75%; }',
    '.h-100 { height: 100%; }',
    '.min-h-100 { min-height: 100%; }',
    '.vh-25 { height: 25vh; }',
    '.vh-50 { height: 50vh; }',
    '.vh-75 { height: 75vh; }',
    '.vh-100 { height: 100vh; }',
    '.min-vh-100 { min-height: 100vh; }',
    '.h-auto { height: auto; }',
    '.h-inherit { height: inherit; }',
  ].join('\n')
}

function maxWidths(scale: number[]): string {
  return [
    scale.map((it, step) => `.mw${step + 1} { max-width: ${it}rem; }`).join('\n'),
    '.mw-none { max-width: none; }',
    '.mw-100 { max-width: 100%; }',
  ].join('\n')
}

function opacity(scale: number[]): string {
  return scale
    .map(it => {
      if (it === 1) {
        return `.o-100 { opacity: 1; }`
      }
      if (it === 0) {
        return `.o-0 { opacity: 0; }`
      }
      const [, decimal] = `${it}`.split('.')
      const num = it.toFixed(Math.max(2, decimal.length))
      return `.o-${`${num}`.slice(2)} { opacity: ${it}; }`
    })
    .join('\n')
}

function codeHighlightingCommon(): string {
  return `[class^="code-"] {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

[class^="code-"] .namespace {
  opacity: 0.7
}

[class^="code-"] .token.important,
[class^="code-"] .token.bold {
  font-weight: bold;
}

[class^="code-"] .token.italic {
  font-style: italic;
}

[class^="code-"] .token.entity {
  cursor: help;
}

[class^="code-"] .highlight,
[class^="code-"] .standard,
[class^="code-"] .command,
[class^="code-"] .output {
  padding-left: 2rem;
  padding-right: 2rem;
  display: block;
  min-width: 100%;
  box-sizing: border-box;
}

[class^="code-"] .code .prompt.active:after {
  content: ' _';
}
[class^="code-"] .code .prompt.empty:after {
  content: '_';
}

[class^="code-"] .code .prompt.active:after,
[class^="code-"] .code .prompt.empty:after,
[class^="code-"] .blinking-cursor {
  -webkit-animation: 1s blinking step-end infinite;
  -moz-animation: 1s blinking step-end infinite;
  -ms-animation: 1s blinking step-end infinite;
  -o-animation: 1s blinking step-end infinite;
  animation: 1s blinking step-end infinite;
}

@keyframes blinking {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-moz-keyframes blinking {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-webkit-keyframes blinking {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-ms-keyframes blinking {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-o-keyframes blinking {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}`
}

function codeHighlighting(): string {
  return `.code-light-theme {
  color: #657b83;
  background-color: #fdf6e3;
}

.code-light-theme::-moz-selection, .code-light-theme ::-moz-selection,
.code-light-theme::-moz-selection, .code-light-theme ::-moz-selection {
  background: #073642;
}

.code-light-theme::selection, .code-light-theme ::selection,
.code-light-theme::selection, .code-light-theme ::selection {
  background: #073642;
}

.code-light-theme .token.comment,
.code-light-theme .token.prolog,
.code-light-theme .token.doctype,
.code-light-theme .token.cdata {
  color: #93a1a1;
}

.code-light-theme .token.punctuation {
  color: #586e75;
}

.code-light-theme .token.property,
.code-light-theme .token.tag,
.code-light-theme .token.boolean,
.code-light-theme .token.number,
.code-light-theme .token.constant,
.code-light-theme .token.symbol,
.code-light-theme .token.deleted {
  color: #268bd2;
}

.code-light-theme .token.selector,
.code-light-theme .token.attr-name,
.code-light-theme .token.string,
.code-light-theme .token.char,
.code-light-theme .token.builtin,
.code-light-theme .token.url,
.code-light-theme .token.inserted {
  color: #2aa198;
}

.code-light-theme .token.entity {
  color: #657b83;
  background: #eee8d5;
}

.code-light-theme .token.atrule,
.code-light-theme .token.attr-value,
.code-light-theme .token.keyword {
  color: #859900;
}

.code-light-theme .token.function,
.code-light-theme .token.class-name {
  color: #b58900;
}

.code-light-theme .token.regex,
.code-light-theme .token.important,
.code-light-theme .token.variable {
  color: #cb4b16;
}

.code-light-theme .highlight {
  background: #ffe6c3;
}`
}

function bashHighlighting(): string {
  return `.code-dark-theme {
  color: #f8f8f2;
  background-color: #272822;
}

.code-dark-theme .token.comment,
.code-dark-theme .token.prolog,
.code-dark-theme .token.doctype,
.code-dark-theme .token.cdata {
  color: slategray;
}

.code-dark-theme .token.punctuation {
  color: #f8f8f2;
}

.code-dark-theme .token.property,
.code-dark-theme .token.tag,
.code-dark-theme .token.constant,
.code-dark-theme .token.symbol,
.code-dark-theme .token.deleted {
  color: #f92672;
}

.code-dark-theme .token.boolean,
.code-dark-theme .token.number {
  color: #ae81ff;
}

.code-dark-theme .token.selector,
.code-dark-theme .token.attr-name,
.code-dark-theme .token.string,
.code-dark-theme .token.char,
.code-dark-theme .token.builtin,
.code-dark-theme .token.inserted {
  color: #a6e22e;
}

.code-dark-theme .token.operator,
.code-dark-theme .token.entity,
.code-dark-theme .token.url,
.code-dark-theme .language-css .token.string,
.code-dark-theme .style .token.string,
.code-dark-theme .token.variable {
  color: #f8f8f2;
}

.code-dark-theme .token.atrule,
.code-dark-theme .token.attr-value,
.code-dark-theme .token.function,
.code-dark-theme .token.class-name {
  color: #e6db74;
}

.code-dark-theme .token.keyword {
  color: #66d9ef;
}

.code-dark-theme .token.regex,
.code-dark-theme .token.important {
  color: #fd971f;
}

.code-dark-theme .code .prompt {
  text-indent: 1em;
  position: relative;
}

.code-dark-theme .code .prompt:before {
  position: absolute;
  top: 0;
  left: 1em;
  content: '$';
}`
}

function powershellHighlighting(): string {
  return `.code-powershell {
  background: #012456;
  color: #f8f8f2;
}

.code-powershell::-moz-selection, .code-powershell ::-moz-selection,
.code-powershell::-moz-selection, .code-powershell ::-moz-selection {
  background:#2f7289;
}

.code-powershell::selection, .code-powershell ::selection,
.code-powershell::selection, .code-powershell ::selection {
  background:#2f7289;
}

.code-powershell .token.comment,
.code-powershell .token.prolog,
.code-powershell .token.doctype,
.code-powershell .token.cdata {
  color: #6272a4;
}

.code-powershell .token.punctuation {
  color: #f8f8f2;
}

.code-powershell .token.property,
.code-powershell .token.tag,
.code-powershell .token.constant,
.code-powershell .token.symbol,
.code-powershell .token.deleted {
  color: #ff79c6;
}

.code-powershell .token.boolean,
.code-powershell .token.number {
  color: #bd93f9;
}

.code-powershell .token.selector,
.code-powershell .token.attr-name,
.code-powershell .token.string,
.code-powershell .token.char,
.code-powershell .token.builtin,
.code-powershell .token.inserted {
  color: #50fa7b;
}

.code-powershell .token.operator,
.code-powershell .token.entity,
.code-powershell .token.url,
.code-powershell .language-css .token.string,
.code-powershell .style .token.string,
.code-powershell .token.variable {
  color: #f8f8f2;
}

.code-powershell .token.atrule,
.code-powershell .token.attr-value,
.code-powershell .token.function,
.code-powershell .token.class-name {
  color: #f1fa8c;
}

.code-powershell .token.keyword {
  color: #8be9fd;
}

.code-powershell .token.regex,
.code-powershell .token.important {
  color: #ffb86c;
}

.code-powershell .highlight {
  background: #ffe6c3
}

.code-powershell .highlight,
.code-powershell .standard {
  padding-left: 2rem;
  padding-right: 2rem;
  display: block;
  min-width: 100%;
  box-sizing: border-box;
}

.code-powershell .command,
.code-powershell .output {
  padding-left: 2rem;
  padding-right: 2rem;
  display: block;
  min-width: 100%;
  box-sizing: border-box;
}

.code-powershell .code .prompt {
  text-indent: 2em;
  position: relative;
}

.code-powershell .code .prompt:before {
  position: absolute;
  top: 0;
  left: 0em;
  content: 'PS>';
}`
}

function toRem(value: number) {
  return value === 0 ? '0' : `${value}rem`
}

function skip(value: string) {
  return ''
}
