import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import {
  addBlockImport,
  addBlockToArray,
  addGlobalImport,
  addGlobalToArray,
} from '../../src/cli/utils/payload-patcher.js'

let tmpDir: string
let configPath: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-patcher-v2-${Date.now()}`)
  await fs.ensureDir(tmpDir)
  configPath = path.join(tmpDir, 'payload.config.ts')
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

const STANDARD_CONFIG = `import { buildConfig } from 'payload'

export default buildConfig({
  collections: [
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
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
})
`

describe('addBlockImport', () => {
  it('adds import after last import statement', async () => {
    await fs.writeFile(configPath, STANDARD_CONFIG)

    await addBlockImport(configPath, {
      name: 'HeroBlock',
      importPath: '@/blocks/hero/payload',
    })

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain("import { HeroBlock } from '@/blocks/hero/payload'")
  })

  it('skips duplicate imports', async () => {
    await fs.writeFile(configPath, STANDARD_CONFIG)

    await addBlockImport(configPath, {
      name: 'HeroBlock',
      importPath: '@/blocks/hero/payload',
    })
    await addBlockImport(configPath, {
      name: 'HeroBlock',
      importPath: '@/blocks/hero/payload',
    })

    const content = await fs.readFile(configPath, 'utf-8')
    const importCount = (content.match(/import \{ HeroBlock \}/g) || []).length
    expect(importCount).toBe(1)
  })
})

describe('addBlockToArray', () => {
  it('adds block to empty blocks array', async () => {
    await fs.writeFile(configPath, STANDARD_CONFIG)

    await addBlockToArray(configPath, 'HeroBlock')

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain('blocks: [HeroBlock]')
  })

  it('appends to existing blocks array', async () => {
    const withHero = STANDARD_CONFIG.replace('blocks: []', 'blocks: [HeroBlock]')
    await fs.writeFile(configPath, withHero)

    await addBlockToArray(configPath, 'FeaturesBlock')

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain('blocks: [HeroBlock, FeaturesBlock]')
  })

  it('skips if block already in array', async () => {
    const withHero = STANDARD_CONFIG.replace('blocks: []', 'blocks: [HeroBlock]')
    await fs.writeFile(configPath, withHero)

    await addBlockToArray(configPath, 'HeroBlock')

    const content = await fs.readFile(configPath, 'utf-8')
    const count = (content.match(/HeroBlock/g) || []).length
    // Once in blocks array + possibly in type declarations, but not duplicated
    expect(content).toContain('blocks: [HeroBlock]')
    expect(count).toBeLessThanOrEqual(2)
  })

  it('throws when no blocks array found', async () => {
    await fs.writeFile(configPath, 'export default {}')

    await expect(addBlockToArray(configPath, 'HeroBlock')).rejects.toThrow(
      'No "blocks: [...]" array found'
    )
  })

  it('correctly targets type: blocks array when multiple blocks arrays exist', async () => {
    const multiBlockConfig = `import { buildConfig } from 'payload'

export default buildConfig({
  collections: [
    {
      slug: 'pages',
      fields: [
        {
          name: 'layout',
          type: 'blocks',
          blocks: [],
        },
      ],
    },
    {
      slug: 'posts',
      fields: [
        {
          name: 'sidebar',
          type: 'blocks',
          blocks: [ExistingBlock],
        },
      ],
    },
  ],
  globals: [],
})
`
    await fs.writeFile(configPath, multiBlockConfig)

    await addBlockToArray(configPath, 'HeroBlock')

    const content = await fs.readFile(configPath, 'utf-8')
    // Should patch the first type: 'blocks' array
    expect(content).toContain('blocks: [HeroBlock]')
    // Second array should be unchanged
    expect(content).toContain('blocks: [ExistingBlock]')
  })

  it('selects second blocks array when only it is preceded by type: blocks', async () => {
    const config = `import { buildConfig } from 'payload'

export default buildConfig({
  admin: {
    blocks: [AdminBlock],
  },
  collections: [
    {
      slug: 'pages',
      fields: [
        {
          name: 'layout',
          type: 'blocks',
          blocks: [],
        },
      ],
    },
  ],
  globals: [],
})
`
    await fs.writeFile(configPath, config)

    await addBlockToArray(configPath, 'HeroBlock')

    const content = await fs.readFile(configPath, 'utf-8')
    // Should patch the one preceded by type: 'blocks', not the admin one
    expect(content).toContain('blocks: [HeroBlock]')
    expect(content).toContain('blocks: [AdminBlock]')
  })

  it('throws when multiple blocks arrays and none preceded by type: blocks', async () => {
    const ambiguousConfig = `const a = { blocks: [] }
const b = { blocks: [] }
`
    await fs.writeFile(configPath, ambiguousConfig)

    await expect(addBlockToArray(configPath, 'HeroBlock')).rejects.toThrow(
      'could not determine which one to patch'
    )
  })
})

describe('addGlobalToArray', () => {
  it('adds global to empty globals array', async () => {
    await fs.writeFile(configPath, STANDARD_CONFIG)

    await addGlobalToArray(configPath, 'LandingGlobal')

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain('globals: [LandingGlobal]')
  })

  it('appends to existing globals array', async () => {
    const withLanding = STANDARD_CONFIG.replace('globals: []', 'globals: [LandingGlobal]')
    await fs.writeFile(configPath, withLanding)

    await addGlobalToArray(configPath, 'AboutGlobal')

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain('globals: [LandingGlobal, AboutGlobal]')
  })

  it('throws when no globals array found', async () => {
    await fs.writeFile(configPath, 'export default {}')

    await expect(addGlobalToArray(configPath, 'LandingGlobal')).rejects.toThrow(
      'No "globals: [...]" array found'
    )
  })

  it('throws when multiple globals arrays found', async () => {
    const ambiguousConfig = `const a = { globals: [] }
const b = { globals: [] }
`
    await fs.writeFile(configPath, ambiguousConfig)

    await expect(addGlobalToArray(configPath, 'LandingGlobal')).rejects.toThrow(
      'Cannot determine which one to patch'
    )
  })
})

describe('addGlobalImport', () => {
  it('delegates to addBlockImport', async () => {
    await fs.writeFile(configPath, STANDARD_CONFIG)

    await addGlobalImport(configPath, {
      name: 'LandingGlobal',
      importPath: '@/templates/landing/payload',
    })

    const content = await fs.readFile(configPath, 'utf-8')
    expect(content).toContain("import { LandingGlobal } from '@/templates/landing/payload'")
  })
})
