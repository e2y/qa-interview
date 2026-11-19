import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

interface Asset {
  filePath: string
  contentType: string
}

const projectRoot = process.cwd()
const assets: ReadonlyMap<string, Asset> = new Map([
  [
    '/',
    {
      filePath: join(projectRoot, 'app', 'index.html'),
      contentType: 'text/html; charset=utf-8',
    },
  ],
  [
    '/app.js',
    {
      filePath: join(projectRoot, 'dist', 'app', 'app.js'),
      contentType: 'text/javascript; charset=utf-8',
    },
  ],
  [
    '/styles.css',
    {
      filePath: join(projectRoot, 'app', 'styles.css'),
      contentType: 'text/css; charset=utf-8',
    },
  ],
])

const server = createServer(async (request, response) => {
  const asset = assets.get(new URL(request.url ?? '/', 'http://localhost').pathname)
  if (!asset || (request.method !== 'GET' && request.method !== 'HEAD')) {
    response.writeHead(404).end('Not found')
    return
  }

  try {
    const contents = await readFile(asset.filePath)
    response.writeHead(200, { 'content-type': asset.contentType })
    response.end(request.method === 'HEAD' ? undefined : contents)
  } catch {
    response.writeHead(500).end('Unable to read app asset')
  }
})

const port = Number(process.env.PORT ?? 4173)
server.listen(port, '0.0.0.0', () => {
  console.log(`T-shirt shop listening on http://127.0.0.1:${port}`)
})
