import commander from 'commander'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { tempdir } from 'shelljs'
import { store, Selector } from './store'
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
