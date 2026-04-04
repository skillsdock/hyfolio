export function generatePayloadConfig(): string {
  return `import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  db: sqliteAdapter({
    url: path.resolve(dirname, 'hyfolio.db'),
  }),
  collections: [
    { slug: 'media', upload: true, fields: [] },
    {
      slug: 'pages',
      fields: [{ name: 'blocks', type: 'blocks', blocks: [] }],
    },
  ],
  globals: [],
  secret: process.env.PAYLOAD_SECRET || 'hyfolio-dev-secret-change-me',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
`
}
