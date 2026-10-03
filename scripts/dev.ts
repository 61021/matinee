import { createServer } from 'node:http'
import { bundleTheme } from './bundle.ts'
import { DEV_HOST, DEV_PORT } from './constants.ts'

const url = `http://${DEV_HOST}:${DEV_PORT}/matinee.css`
const headers = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' }
const css = { ...headers, 'Content-Type': 'text/css; charset=utf-8' }

createServer((req, res) => {
  if (req.url?.split('?')[0] !== '/matinee.css') {
    res.writeHead(404, headers).end()
    return
  }
  try {
    res.writeHead(200, css).end(bundleTheme(false))
  }
  catch (error) {
    console.error(error)
    res.writeHead(500, css).end(`/* ${String(error)} */`)
  }
}).listen(DEV_PORT, DEV_HOST, () => {
  console.log(`Serving ${url}, rebuilt on every request.`)
  console.log(`Paste into Jellyfin > Dashboard > General > Custom CSS:\n@import url("${url}");`)
})
