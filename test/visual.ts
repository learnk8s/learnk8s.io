import backstop from 'backstopjs'
import { ok } from 'assert'
import { Sitemap, LinkedNode, getFullUrl } from '../src/sitemap';
import * as Redirect from '../src/redirect'
const commander = require('commander')

commander
  .version('1.0.0')
  .option('--approve', 'Approve the last screenshot')
  .option('--test', 'Test the current website')
  .option('--hostname <hostname>', 'Hostname')
  .parse(process.argv)

ok(commander.hostname, 'Please provide a hostname such as --hostname http://localhost:3000')
ok(commander.approve || commander.test, 'Please provide either --approve or --test')

Sitemap

function render(node: LinkedNode<any, object>, siteUrl: string): string {
  if (node.payload.type === Redirect.Type) {
    return ''
  }
  return `${siteUrl}${getFullUrl(node)}`
}

function renderTree(node: LinkedNode<any, object>, siteUrl: string): string[] {
  return [
    render(node, siteUrl),
    ...Object.values(node.children).reduce((acc, it) => acc.concat(renderTree(it as any, siteUrl)), [] as string[]),
  ]
}

function toId(raw: string): string {
  return raw.toLowerCase().replace(/[^\w]+/g, '-')
}

const command = commander.test ? 'test' :
  commander.approve ? 'approve' : ''

backstop(command, {
  config: {
    id: 'foo',
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
    scenarios: renderTree(Sitemap, commander.hostname).map(it => {
      console.log(it)
      return {
        label: toId(it),
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
