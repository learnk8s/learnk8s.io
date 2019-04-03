import cheerio from 'cheerio'
import { cat } from 'shelljs'
import { writeFileSync } from 'fs'
import { optimise } from '../svgo'

const svg = cat(`${__dirname}/ingress.svg`).toString()
const css = `#animate-traffic1 path,
#animate-traffic2 path,
#animate-traffic3 path {
  stroke-dasharray: 15;
  animation: dash 11s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}`

optimise(svg, ['animate-traffic1', 'animate-traffic2', 'animate-traffic3']).then(it => {
  const $ = cheerio.load(it, { decodeEntities: false, xmlMode: true })
  const style = $('<style></style>').text(css)
  style.prependTo($('svg'))
  writeFileSync(`${__dirname}/ingress-generated.svg`, $.html())
})
