import { LintMd } from '../repositories/lintmd/lintmd.cli'
import { LintSVG } from '../repositories/svgo/svgo.cli'
import { Prettier } from '../repositories/prettier/prettier.cli'
import { exit } from 'shelljs'

async function run() {
  try {
    await LintMd(['{src,repositories}/**/*.md'], true)
  } catch (error) {
    console.log(error)
    exit(1)
  }
}

run()
