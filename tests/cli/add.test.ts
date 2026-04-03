import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { addAction } from '../../src/cli/add.js'

let tmpDir: string
let hyfolioSourceDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-add-${Date.now()}`)
  hyfolioSourceDir = path.join(os.tmpdir(), `hyfolio-test-add-source-${Date.now()}`)

  // Set up user project structure
  await fs.ensureDir(path.join(tmpDir, 'src/blocks'))
  await fs.ensureDir(path.join(tmpDir, 'src/templates'))
  await fs.ensureDir(path.join(tmpDir, 'src/lib/hyfolio/primitives'))

  // Write hyfolio config
  await fs.writeFile(
    path.join(tmpDir, 'hyfolio.config.ts'),
    `export default {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
  )

  // Write payload.config.ts
  await fs.writeFile(
    path.join(tmpDir, 'payload.config.ts'),
    `import { buildConfig } from 'payload'

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
  )

  // Write package-lock.json so npm is detected
  await fs.writeFile(path.join(tmpDir, 'package-lock.json'), '{}')

  // Set up hyfolio source blocks
  await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/hero'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'blocks/hero/component.tsx'),
    `import type { HeroBlock as HeroProps } from '@/lib/hyfolio/types'

export function HeroBlock({ heading }: HeroProps) {
  return <section className="hyf-hero"><h1>{heading}</h1></section>
}
`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'blocks/hero/payload.ts'),
    `import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true },
  ],
}
`
  )

  // Set up hyfolio shared files
  await fs.ensureDir(path.join(hyfolioSourceDir, 'shared'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'shared/render.tsx'),
    `export function renderBlock(block: any) { return null }
`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'shared/types.ts'),
    `export interface HeroBlock { heading: string }
`
  )

  // Set up primitives
  await fs.ensureDir(path.join(hyfolioSourceDir, 'primitives'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'primitives/button.tsx'),
    `export function HyfButton() { return <button /> }
`
  )
})

afterEach(async () => {
  await fs.remove(tmpDir)
  await fs.remove(hyfolioSourceDir)
})

const testBlocksRegistry = [
  {
    name: 'hero',
    category: 'Hero',
    description: 'Hero section',
    slug: 'hero',
    payloadExportName: 'HeroBlock',
    files: ['component.tsx', 'payload.ts'],
    dependencies: {
      npm: ['@payloadcms/richtext-lexical'],
      shared: ['render.tsx', 'types.ts'],
      primitives: ['button.tsx'],
    },
  },
  {
    name: 'features',
    category: 'Content',
    description: 'Features grid',
    slug: 'features',
    payloadExportName: 'FeaturesBlock',
    files: ['component.tsx', 'payload.ts'],
    dependencies: {
      npm: [],
      shared: ['render.tsx', 'types.ts'],
      primitives: [],
    },
  },
]

const testTemplatesRegistry = [
  {
    name: 'landing',
    description: 'Landing page',
    blocks: ['hero', 'features'],
    globalExportName: 'LandingPageGlobal',
    files: ['page.tsx', 'payload.ts'],
  },
]

const mockRunCommand = vi.fn(async () => {})

describe('addAction', () => {
  it('copies block files to user project', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const componentExists = await fs.pathExists(
      path.join(tmpDir, 'src/blocks/hero/component.tsx')
    )
    const payloadExists = await fs.pathExists(
      path.join(tmpDir, 'src/blocks/hero/payload.ts')
    )
    expect(componentExists).toBe(true)
    expect(payloadExists).toBe(true)
  })

  it('copies shared dependencies if not present', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const renderExists = await fs.pathExists(
      path.join(tmpDir, 'src/lib/hyfolio/render.tsx')
    )
    const typesExists = await fs.pathExists(
      path.join(tmpDir, 'src/lib/hyfolio/types.ts')
    )
    expect(renderExists).toBe(true)
    expect(typesExists).toBe(true)
  })

  it('copies primitive dependencies if not present', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const buttonExists = await fs.pathExists(
      path.join(tmpDir, 'src/lib/hyfolio/primitives/button.tsx')
    )
    expect(buttonExists).toBe(true)
  })

  it('does not overwrite shared files if already present', async () => {
    const existingRender = 'export function renderBlock() { /* customized */ }'
    await fs.writeFile(
      path.join(tmpDir, 'src/lib/hyfolio/render.tsx'),
      existingRender
    )

    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const render = await fs.readFile(
      path.join(tmpDir, 'src/lib/hyfolio/render.tsx'),
      'utf-8'
    )
    expect(render).toContain('customized')
  })

  it('patches payload.config.ts with block import and registration', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const payloadConfig = await fs.readFile(
      path.join(tmpDir, 'payload.config.ts'),
      'utf-8'
    )
    expect(payloadConfig).toContain("import { HeroBlock } from '@/blocks/hero/payload'")
    expect(payloadConfig).toContain('blocks: [HeroBlock]')
  })

  it('errors when block does not exist in registry', async () => {
    await expect(
      addAction({
        names: ['nonexistent'],
        projectDir: tmpDir,
        sourceDir: hyfolioSourceDir,
        blocksRegistry: testBlocksRegistry,
        templatesRegistry: testTemplatesRegistry,
        exec: mockRunCommand,
      })
    ).rejects.toThrow('not found in registry')
  })

  it('skips already-added blocks', async () => {
    await fs.ensureDir(path.join(tmpDir, 'src/blocks/hero'))
    await fs.writeFile(
      path.join(tmpDir, 'src/blocks/hero/component.tsx'),
      'existing'
    )

    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const content = await fs.readFile(
      path.join(tmpDir, 'src/blocks/hero/component.tsx'),
      'utf-8'
    )
    expect(content).toBe('existing')
  })

  it('calls run command with npm install for missing npm deps', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    expect(mockRunCommand).toHaveBeenCalledWith(
      expect.stringContaining('@payloadcms/richtext-lexical'),
      expect.objectContaining({ cwd: tmpDir })
    )
  })

  it('adds multiple blocks in one call', async () => {
    await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/features'))
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'blocks/features/component.tsx'),
      'export function FeaturesBlock() { return <section /> }'
    )
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'blocks/features/payload.ts'),
      `import type { Block } from 'payload'\nexport const FeaturesBlock: Block = { slug: 'features', fields: [] }`
    )

    await addAction({
      names: ['hero', 'features'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks/hero/component.tsx'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks/features/component.tsx'))).toBe(true)
  })
})
