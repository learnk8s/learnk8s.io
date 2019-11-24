import handler from 'serve-handler'
import http from 'http'
import { ln } from 'shelljs'
import { resolve } from 'path'

const PORT = 4000

ln('-fs', resolve(__dirname, '..'), resolve(__dirname, '..', '_site/b'))

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: '_site',
    symlinks: true,
  })
})

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})
