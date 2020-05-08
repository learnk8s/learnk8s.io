const backstop = require('backstopjs')
import { ok } from 'assert'
import { store, getPages, storeV2 } from './src/store'
import commander from 'commander'
import { register } from './src/register'

commander
  .version('1.0.0')
  .option('--approve', 'Approve the last screenshot')
  .option('--test', 'Test the current website')
  .option('--hostname <hostname>', 'Hostname')
  .parse(process.argv)

ok(commander.hostname, 'Please provide a hostname such as --hostname http://localhost:3000')
ok(commander.approve || commander.test, 'Please provide either --approve or --test')

function renderPage(siteUrl: string): string[] {
  register(store, storeV2)
  const state = store.getState()
  const pages = getPages(state)
  return pages.map(it => `${siteUrl}${it.url}`)
}

function toId(raw: string): string {
  return raw.toLowerCase().replace(/[^\w]+/g, '-')
}

const command = commander.test ? 'test' : commander.approve ? 'approve' : ''

backstop(command, {
  config: {
    id: 'default',
    viewports: [
      {
        label: 'phone',
        width: 320,
        height: 480,
      },
      {
        label: 'tablet',
        width: 1024,
        height: 768,
      },
    ],
    scenarios: renderPage(commander.hostname)
      .filter(it => !!it)
      .map(it => {
        return {
          label: toId(new URL(it).pathname),
          url: it,
          referenceUrl: '',
          readyEvent: '',
          readySelector: '',
          delay: 0,
          hideSelectors: [],
          removeSelectors: [],
          hoverSelector: '',
          clickSelector: '',
          postInteractionWait: 0,
          selectors: [],
          selectorExpansion: true,
          expect: 0,
          misMatchThreshold: 0.01,
          requireSameDimensions: true,
        }
      }),
    paths: {
      bitmaps_reference: 'backstop_data/bitmaps_reference',
      bitmaps_test: 'backstop_data/bitmaps_test',
      engine_scripts: 'backstop_data/engine_scripts',
      html_report: 'backstop_data/html_report',
      ci_report: 'backstop_data/ci_report',
    },
    report: ['browser'],
    engine: 'puppeteer',
    engineOptions: {
      args: ['--no-sandbox'],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
  },
})
  .then(() => console.log('DONE'))
  .catch((error: any) => console.log('Error', error))
