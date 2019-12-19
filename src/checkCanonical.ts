import { ok } from 'assert'
import { store, getPages, getRedirects } from './store'
import commander from 'commander'
import { register } from './register'
import * as Hast from 'hast'
import { Cheerio } from './optimise'
const request = require('request')

commander
  .version('1.0.0')
  .option('--hostname <hostname>', 'Hostname')
  .parse(process.argv)

ok(commander.hostname, 'Please provide a hostname such as --hostname http://localhost:4000')

register(store)
const state = store.getState()
const redirectPageIds = getRedirects(state).map(it => it.fromPageId)
const pages = getPages(state)
  .filter(it => !redirectPageIds.includes(it.id))
  .filter(it => it.url.split('.').pop() !== 'xml')
  .filter(it => it.id !== 'not-found-404')
  .map(it => `${commander.hostname}${it.url}`)

pages.forEach(it => {
  request(it, (error: any, response: any, body: string) => {
    if (!error && response && response.statusCode === 200) {
      const $ = Cheerio.of(body)
      const canonicalNode = $.find('link[rel="canonical"]').get() as Hast.Element
      ok(canonicalNode !== null, `Page: ${it}, canonical is not defined.`)
      ok((canonicalNode.properties.href as string) !== '', `Page: ${it}, canonical is not defined.`)
    }
  })
})
