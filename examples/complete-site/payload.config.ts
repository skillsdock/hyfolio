import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { LandingGlobal } from '@/templates/landing/payload'
import { AboutGlobal } from '@/templates/about/payload'
import { ContactGlobal } from '@/templates/contact/payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, 'media'),
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  globals: [
    LandingGlobal,
    AboutGlobal,
    ContactGlobal,
  ],
  editor: lexicalEditor(),
  db: sqliteAdapter({
    url: path.resolve(dirname, 'database.db'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
