import commander from 'commander'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { tempdir } from 'shelljs'
import toHtml from 'hast-util-to-html'
import * as Hast from 'hast'
import * as Hast$ from 'hast-util-select'
import remove from 'unist-util-remove'
import open from 'open'
import { store, Selector, Action } from './store'
import { register } from './register'

commander.version('1.0.0').usage('[command] [options]')

commander
  .command('get:pages')
  .description('Get Pages and write in "learnk8s-pages-state.json"')
  .action(() => {
    register(store)
    const pages = Selector.pages.selectAll(store.getState())
    const tmpFolder = tempdir()
    const jsonPath = join(tmpFolder, `learnk8s-pages-state.json`)
    writeFileSync(jsonPath, JSON.stringify(pages))
    console.log(`Created ${jsonPath}!`)
  })

commander.parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}
