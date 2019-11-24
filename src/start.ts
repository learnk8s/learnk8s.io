import handler from 'serve-handler'
import http from 'http'
import { ln } from 'shelljs'
import { resolve } from 'path'
import repl from 'repl'
import { LintMd } from '../repositories/lintmd/lintmd.cli'
import { LintSVG } from '../repositories/svgo/svgo.cli'
import { Prettier } from '../repositories/prettier/prettier.cli'

const PORT = 4000

const replServer = repl.start({
  prompt: 'learnk8s.io> ',
})

ln('-fs', resolve(__dirname, '..'), resolve(__dirname, '..', '_site/b'))

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: '_site',
    symlinks: true,
  })
})

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
  replServer.displayPrompt()
})

replServer.defineCommand('lintmd!', {
  help: 'Lints and fixes Markdown files',
  action: async function(paths) {
    await LintMd(paths.length === 0 ? ['{src,repositories}/**/*.md'] : paths.split(' '), true)
    this.displayPrompt()
  },
})
replServer.defineCommand('lintmd', {
  help: 'Lints Markdown files',
  action: async function(paths) {
    await LintMd(paths.length === 0 ? ['{src,repositories}/**/*.md'] : paths.split(' '), false)
    this.displayPrompt()
  },
})
replServer.defineCommand('lintsvg!', {
  help: 'Lints and fixes SVG files',
  action: async function(paths) {
    await LintSVG(paths.length === 0 ? ['src/smallerDockerImages/*.svg'] : paths.split(' '), true)
    this.displayPrompt()
  },
})
replServer.defineCommand('lintsvg', {
  help: 'Lints SVG files',
  action: async function(paths) {
    await LintSVG(paths.length === 0 ? ['src/smallerDockerImages/*.svg'] : paths.split(' '), false)
    this.displayPrompt()
  },
})
replServer.defineCommand('lintts!', {
  help: 'Lints and fixes Typescript files',
  action: async function(paths) {
    await Prettier(paths.length === 0 ? ['src/**/*.{ts,tsx}'] : paths.split(' '), true)
    this.displayPrompt()
  },
})
replServer.defineCommand('lintts', {
  help: 'Lints and fixes Typescript files',
  action: async function(paths) {
    await Prettier(paths.length === 0 ? ['src/**/*.{ts,tsx}'] : paths.split(' '), true)
    this.displayPrompt()
  },
})
replServer.defineCommand('fmt!', {
  help: 'Lints and fixes all files',
  action: async function(paths) {
    await LintMd(['{src,repositories}/**/*.md'], true)
    await LintSVG(['src/smallerDockerImages/*.svg'], true)
    await Prettier(['src/**/*.{ts,tsx}'], true)
    this.displayPrompt()
  },
})
replServer.defineCommand('fmt', {
  help: 'Lints all files',
  action: async function(paths) {
    await LintMd(['{src,repositories}/**/*.md'], false)
    await LintSVG(['src/smallerDockerImages/*.svg'], false)
    await Prettier(['src/**/*.{ts,tsx}'], false)
    this.displayPrompt()
  },
})

replServer.on('exit', () => {
  server.close(() => {
    process.exit(0)
  })
})
