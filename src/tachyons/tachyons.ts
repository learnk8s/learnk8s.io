const cssom = require('cssom')
const { createGenerator, createParser } = require('scalpel')
const generator = createGenerator()
const parser = createParser()
const CSSwhat = require('css-what')

const mediaQueries = [
  { from: 30, name: 'ns' },
  { from: 30, to: 60, name: 'm' },
  { from: 60, name: 'l' },
]

const css = [
  fontFamily(),
  hover(),
  images(),
  links(),
  lists(),
  normalize(),
  utilities(),
  zScale([0, 1, 2, 3, 4, 5]),
  mediaQueryfy(mediaQueries)(
    [
      aspectRatios(),
      backgroundPosition(),
      backgroundSize(),
      borderStyle(),
      borderRadius([0, 0.125, 0.25, 0.5, 1]),
      borderWidths([0, 0.125, 0.25, 0.5, 1, 2]),
      borders(),
      boxShadow(),
      boxSizing(),
      clears(),
      code(),
      colour({
        black: '#000',
        'near-black': '#111',
        'dark-gray': '#333',
        'mid-gray': '#555',
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
        'white-90': 'rgba(255,255,255,.9)',
        'white-80': 'rgba(255,255,255,.8)',
        'white-70': 'rgba(255,255,255,.7)',
        'white-60': 'rgba(255,255,255,.6)',
        'white-50': 'rgba(255,255,255,.5)',
        'white-40': 'rgba(255,255,255,.4)',
        'white-30': 'rgba(255,255,255,.3)',
        'white-20': 'rgba(255,255,255,.2)',
        'white-10': 'rgba(255,255,255,.1)',
        'white-05': 'rgba(255,255,255,.05)',
        'white-025': 'rgba(255,255,255,.025)',
        'white-0125': 'rgba(255,255,255,.0125)',
        'dark-red': '#e7040f',
        red: '#ff4136',
        'light-red': '#ff725c',
        orange: '#ff6300',
        gold: '#ffb700',
        yellow: '#ffd700',
        'light-yellow': '#fbf1a9',
        purple: '#5e2ca5',
        'light-purple': '#a463f2',
        'dark-pink': '#d5008f',
        'hot-pink': '#ff41b4',
        pink: '#ff80cc',
        'light-pink': '#ffa3d7',
        'dark-green': '#137752',
        green: '#19a974',
        'light-green': '#9eebcf',
        navy: '#001b44',
        'dark-blue': '#00449e',
        blue: '#357edd',
        'light-blue': '#96ccff',
        'lightest-blue': '#cdecff',
        'washed-blue': '#f6fffe',
        'washed-green': '#e8fdf5',
        'washed-yellow': '#fffceb',
        'washed-red': '#ffdfdf',
      }),
      coordinates([0, 1, 2, -1, -2]),
      display(),
      fontStyle(),
      fontWeight([100, 200, 300, 400, 500, 600, 700, 800, 900]),
      heights([1, 2, 4, 8, 16]),
      letterSpacing([0.1, -0.5, 0.25]),
      lineHeight([1, 1.25, 1.5]),
      maxWidths([1, 2, 4, 8, 16, 32, 48, 64, 96]),
      measure([30, 34, 20]),
      opacity([1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.025, 0]),
      overflow(),
      position(),
      rotations([45, 90, 135, 180, 225, 270, 315]),
      spacing([0.25, 0.5, 1, 2, 4, 8, 16]),
      textAlign(),
      textDecoration(),
      textTransform(),
      typography([6, 5, 3, 2.25, 1.5, 1.25, 1, 0.875, 0.75]),
      verticalAlign(),
      visibility(),
      whiteSpace(),
      widths([1, 2, 4, 8, 16]),
      wordBreak(),
    ].join('\n'),
  ),
].join('\n')

console.log(css)

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
.aspect-ratio--4x3 {  padding-bottom: 75%; }
.aspect-ratio--3x4 {  padding-bottom: 133.33%; }
.aspect-ratio--6x4 {  padding-bottom: 66.6%; }
.aspect-ratio--4x6 {  padding-bottom: 150%; }
.aspect-ratio--8x5 {  padding-bottom: 62.5%; }
.aspect-ratio--5x8 {  padding-bottom: 160%; }
.aspect-ratio--7x5 {  padding-bottom: 71.42%; }
.aspect-ratio--5x7 {  padding-bottom: 140%; }
.aspect-ratio--1x1 {  padding-bottom: 100%; }
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
  return `.b--dotted { border-style: dotted; }
.b--dashed { border-style: dashed; }
.b--solid { border-style: solid; }
.b--none { border-style: none; }`
}

function boxShadow(): string {
  return `.shadow-1 { box-shadow: 0px 0px 4px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-2 { box-shadow: 0px 0px 8px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-3 { box-shadow: 2px 2px 4px 2px rgba( 0, 0, 0, 0.2 ); }
.shadow-4 { box-shadow: 2px 2px 8px 0px rgba( 0, 0, 0, 0.2 ); }
.shadow-5 { box-shadow: 4px 4px 8px 0px rgba( 0, 0, 0, 0.2 ); }`
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
  overflow:   scroll;
}`
}

function coordinates(scale: number[]): string {
  return [
    scale
      .map(it => {
        return [
          `.top-${it} { top: ${toEm(it)}; }`,
          `.right-${it} { right: ${toEm(it)}; }`,
          `.bottom-${it} { bottom: ${toEm(it)}; }`,
          `.left-${it} { left: ${toEm(it)}; }`,
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
  font-family: georgia,
                times,
                serif;
}

.system-sans-serif {
  font-family: sans-serif;
}

.system-serif {
  font-family: serif;
}


/* Monospaced Typefaces (for code) */

/* From http://cssfontstack.com */
code, .code {
  font-family: Consolas,
                monaco,
                monospace;
}

.courier {
  font-family: 'Courier Next',
                courier,
                monospace;
}


/* Sans-Serif Typefaces */

.helvetica {
  font-family: 'helvetica neue', helvetica,
                sans-serif;
}

.avenir {
  font-family: 'avenir next', avenir,
                sans-serif;
}


/* Serif Typefaces */

.athelas {
  font-family: athelas,
                georgia,
                serif;
}

.georgia {
  font-family: georgia,
                serif;
}

.times {
  font-family: times,
                serif;
}

.bodoni {
  font-family: "Bodoni MT",
                serif;
}

.calisto {
  font-family: "Calisto MT",
                serif;
}

.garamond {
  font-family: garamond,
                serif;
}

.baskerville {
  font-family: baskerville,
                serif;
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

function form(): string {
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
.hide-child:hover  .child,
.hide-child:focus  .child,
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
  box-shadow: 0px 0px 16px 2px rgba( 0, 0, 0, .2 );
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
  return `.tracked  { letter-spacing: ${normal}; }
.tracked-tight { letter-spacing: ${tight}; }
.tracked-mega  { letter-spacing:  ${mega}; }`
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
  return `.tl  { text-align: left; }
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
.ml-auto { margin-left:  auto; }`
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

function typography(scale: number[]): string {
  return scale.map((it, step) => `.f${step + 1} { font-size: ${it}rem; }`).join('\n')
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
      fn: (prop: string, value: number) => `${prop}: ${toEm(value)}`,
    },
    left: {
      name: 'l',
      fn: (prop: string, value: number) => `${prop}-left: ${toEm(value)}`,
    },
    right: { name: 'r', fn: (prop: string, value: number) => `${prop}-right: ${toEm(value)}` },
    top: {
      name: 't',
      fn: (prop: string, value: number) => `${prop}-top: ${toEm(value)}`,
    },
    bottom: { name: 'b', fn: (prop: string, value: number) => `${prop}-bottom: ${toEm(value)}` },
    vert: {
      name: 'v',
      fn: (prop: string, value: number) => `${prop}-top: ${toEm(value)}; ${prop}-bottom: ${toEm(value)}`,
    },
    horiz: {
      name: 'h',
      fn: (prop: string, value: number) => `${prop}-left: ${toEm(value)}; ${prop}-right: ${toEm(value)}`,
    },
  } as const
  return [0]
    .concat(scale)
    .map((spacing, step) => {
      return Object.values(directions)
        .map(it => {
          return [
            `.p${it.name}${step} { ${it.fn('padding', step)}; }`,
            `.m${it.name}${step} { ${it.fn('margin', step)}; }`,
            `.n${it.name}${step} { ${it.fn('margin', -step)}; }`,
          ].join('\n')
        })
        .join('\n')
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
  return Object.keys({ ...colours, transparent: 'transparent', inherit: 'inherit' })
    .map(name => {
      return [
        `.${name}, .hover-${name}:focus, .hover-${name}:hover { color: ${colours[name]}; }`,
        `.bg-${name}, .hover-bg-${name}:focus, .hover-bg-${name}:hover { background-color: ${colours[name]}; }`,
        `.b--${name} { border-color: ${colours[name]}; }`,
      ].join('\n')
    })
    .join('\n')
}

function borderWidths(scale: number[]): string {
  return [
    scale.map((it, step) => `.bw${step} { border-width: ${it}rem; }`).join('\n'),
    `.bt-0 { border-top-width: 0; }`,
    `.br-0 { border-right-width: 0; }`,
    `.bb-0 { border-bottom-width: 0; }`,
    `.bl-0 { border-left-width: 0; }`,
  ].join('\n')
}

function borderRadius(scale: number[]): string {
  return [
    scale.map((it, step) => `.br${step} { border-radius: ${it}rem; }`).join('\n'),
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
    scale.map((it, step) => `.w${step} { width: ${it}rem; }`).join('\n'),
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
    scale.map((it, step) => `.h${step} { height: ${it}rem; }`).join('\n'),
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
    scale.map((it, step) => `.mw${step} { max-width: ${it}rem; }`).join('\n'),
    '.mw-none { max-width: none; }',
    '.mw-100 { max-width: 100%; }',
  ].join('\n')
}

function opacity(scale: number[]): string {
  return scale.map((it, step) => `.o-${step} { opacity: ${it}; }`).join('\n')
}

function toEm(value: number) {
  return value === 0 ? '0' : `${value}em`
}
