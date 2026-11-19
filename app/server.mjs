import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const appDirectory = dirname(fileURLToPath(import.meta.url))
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
])

const server = createServer(async (request, response) => {
  const asset = assets.get(new URL(request.url ?? '/', 'http://localhost').pathname)
  if (!asset || (request.method !== 'GET' && request.method !== 'HEAD')) {
    response.writeHead(404).end('Not found')
    return
  }

  try {
    const [fileName, contentType] = asset
    const contents = await readFile(join(appDirectory, fileName))
    response.writeHead(200, { 'content-type': contentType })
    response.end(request.method === 'HEAD' ? undefined : contents)
  } catch {
    response.writeHead(500).end('Unable to read app asset')
  }
})

const port = Number(process.env.PORT ?? 4173)
server.listen(port, '0.0.0.0', () => {
  console.log(`Todo app listening on http://127.0.0.1:${port}`)
})
