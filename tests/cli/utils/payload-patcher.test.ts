import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import {
  addBlockImport,
  addBlockToArray,
  addGlobalImport,
  addGlobalToArray,
} from '../../../src/cli/utils/payload-patcher.js'

let tmpDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-patcher-${Date.now()}`)
  await fs.ensureDir(tmpDir)
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

const BASE_PAYLOAD_CONFIG = `import { buildConfig } from 'payload'
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
    {
      slug: 'media',
      upload: true,
      fields: [],
    },
    {
      slug: 'pages',
      fields: [
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [],
        },
      ],
    },
  ],
  globals: [],
  secret: process.env.PAYLOAD_SECRET || 'hyfolio-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
`

describe('addBlockImport', () => {
  it('adds import statement for a block', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    await fs.writeFile(configPath, BASE_PAYLOAD_CONFIG)

    await addBlockImport(configPath, {
      name: 'HeroBlock',
      importPath: '@/blocks/hero/payload',
    })

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain("import { HeroBlock } from '@/blocks/hero/payload'")
  })

  it('does not add duplicate import', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    const withImport = `import { HeroBlock } from '@/blocks/hero/payload'\n${BASE_PAYLOAD_CONFIG}`
    await fs.writeFile(configPath, withImport)

    await addBlockImport(configPath, {
      name: 'HeroBlock',
      importPath: '@/blocks/hero/payload',
    })

    const result = await fs.readFile(configPath, 'utf-8')
    const matches = result.match(/import { HeroBlock }/g)
    expect(matches).toHaveLength(1)
  })
})

describe('addBlockToArray', () => {
  it('adds block to the blocks array', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    await fs.writeFile(configPath, BASE_PAYLOAD_CONFIG)

    await addBlockToArray(configPath, 'HeroBlock')

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain('blocks: [HeroBlock]')
  })

  it('appends to existing blocks in the array', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    const withHero = BASE_PAYLOAD_CONFIG.replace(
      'blocks: [],',
      'blocks: [HeroBlock],'
    )
    await fs.writeFile(configPath, withHero)

    await addBlockToArray(configPath, 'FeaturesBlock')

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain('blocks: [HeroBlock, FeaturesBlock]')
  })

  it('does not add duplicate block', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    const withHero = BASE_PAYLOAD_CONFIG.replace(
      'blocks: [],',
      'blocks: [HeroBlock],'
    )
    await fs.writeFile(configPath, withHero)

    await addBlockToArray(configPath, 'HeroBlock')

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain('blocks: [HeroBlock]')
    expect(result).not.toContain('blocks: [HeroBlock, HeroBlock]')
  })
})

describe('addGlobalImport', () => {
  it('adds import statement for a global', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    await fs.writeFile(configPath, BASE_PAYLOAD_CONFIG)

    await addGlobalImport(configPath, {
      name: 'LandingPageGlobal',
      importPath: '@/templates/landing/payload',
    })

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain("import { LandingPageGlobal } from '@/templates/landing/payload'")
  })
})

describe('addGlobalToArray', () => {
  it('adds global to the globals array', async () => {
    const configPath = path.join(tmpDir, 'payload.config.ts')
    await fs.writeFile(configPath, BASE_PAYLOAD_CONFIG)

    await addGlobalToArray(configPath, 'LandingPageGlobal')

    const result = await fs.readFile(configPath, 'utf-8')
    expect(result).toContain('globals: [LandingPageGlobal]')
  })
})
