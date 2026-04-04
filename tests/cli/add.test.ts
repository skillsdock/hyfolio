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
    `import type { HeroBlock as HeroProps } from '@/types'
import { HyfButton } from '@/primitives/button'

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

  // Shared files live at sourceDir root (not shared/ subdirectory)
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'render.tsx'),
    `export function renderBlock(block: any) { return null }
`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'types.ts'),
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
    globalExportName: 'LandingGlobal',
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

  it('rewrites @/types imports to use lib path', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const component = await fs.readFile(
      path.join(tmpDir, 'src/blocks/hero/component.tsx'),
      'utf-8'
    )
    expect(component).toContain("from '@/lib/hyfolio/types'")
    expect(component).not.toContain("from '@/types'")
  })

  it('rewrites @/primitives imports to use lib path', async () => {
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const component = await fs.readFile(
      path.join(tmpDir, 'src/blocks/hero/component.tsx'),
      'utf-8'
    )
    expect(component).toContain("from '@/lib/hyfolio/primitives/button'")
    expect(component).not.toContain("from '@/primitives/button'")
  })

  it('patches payload.config.ts with block import and registration (default config)', async () => {
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
    // Default config: blocks at src/blocks → import alias @/blocks
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

  it('strips "block" prefix from names (hyfolio add block hero)', async () => {
    await addAction({
      names: ['block', 'hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks/hero/component.tsx'))).toBe(true)
  })

  it('strips "template" prefix from names (hyfolio add template landing)', async () => {
    // Set up template source files
    await fs.ensureDir(path.join(hyfolioSourceDir, 'templates/landing'))
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/payload.ts'),
      `import { HeroBlock } from '@/blocks/hero/payload'\nexport const LandingGlobal = { slug: 'landing', fields: [] }`
    )
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/page.tsx'),
      `import { HeroBlock } from '@/blocks/hero/component'\nexport function LandingPage() { return <div /> }`
    )

    // Set up required block sources
    await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/features'))
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/component.tsx'), 'export function F() {}')
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/payload.ts'), 'export const FeaturesBlock = {}')

    await addAction({
      names: ['template', 'landing'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/templates/landing/payload.ts'))).toBe(true)
  })

  it('errors when only "template" or "block" prefix with no names after', async () => {
    await expect(
      addAction({
        names: ['template'],
        projectDir: tmpDir,
        sourceDir: hyfolioSourceDir,
        blocksRegistry: testBlocksRegistry,
        templatesRegistry: testTemplatesRegistry,
        exec: mockRunCommand,
      })
    ).rejects.toThrow('No block or template names provided')
  })

  it('uses config-aware import paths for blocks in payload.config.ts', async () => {
    // Write custom config with non-default blocks path
    await fs.writeFile(
      path.join(tmpDir, 'hyfolio.config.ts'),
      `export default {
  blocks: 'src/custom-blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
    )
    await fs.ensureDir(path.join(tmpDir, 'src/custom-blocks'))

    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const payloadConfig = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    expect(payloadConfig).toContain("from '@/custom-blocks/hero/payload'")
    expect(payloadConfig).not.toContain("from '@/blocks/hero/payload'")
  })

  it('uses config-aware import paths for templates in payload.config.ts', async () => {
    // Write custom config with non-default templates path
    await fs.writeFile(
      path.join(tmpDir, 'hyfolio.config.ts'),
      `export default {
  blocks: 'src/blocks',
  templates: 'src/page-templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
    )
    await fs.ensureDir(path.join(tmpDir, 'src/page-templates'))

    // Set up template source files
    await fs.ensureDir(path.join(hyfolioSourceDir, 'templates/landing'))
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/payload.ts'),
      `import { HeroBlock } from '@/blocks/hero/payload'\nexport const LandingGlobal = { slug: 'landing', fields: [] }`
    )
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/page.tsx'),
      `export function LandingPage() { return <div /> }`
    )

    // Set up required block sources
    await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/features'))
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/component.tsx'), 'export function F() {}')
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/payload.ts'), 'export const FeaturesBlock = {}')

    await addAction({
      names: ['landing'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const payloadConfig = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    expect(payloadConfig).toContain("from '@/page-templates/landing/payload'")
    expect(payloadConfig).not.toContain("from '@/templates/landing/payload'")
  })

  it('rewrites @/blocks/ imports in copied template files', async () => {
    // Write custom config with non-default blocks path
    await fs.writeFile(
      path.join(tmpDir, 'hyfolio.config.ts'),
      `export default {
  blocks: 'src/custom-blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
    )
    await fs.ensureDir(path.join(tmpDir, 'src/custom-blocks'))

    // Set up template source files with @/blocks imports
    await fs.ensureDir(path.join(hyfolioSourceDir, 'templates/landing'))
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/payload.ts'),
      `import { HeroBlock } from '@/blocks/hero/payload'\nimport { FeaturesBlock } from '@/blocks/features/payload'\nexport const LandingGlobal = { slug: 'landing', fields: [] }`
    )
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/page.tsx'),
      `import { HeroBlock } from '@/blocks/hero/component'\nexport function LandingPage() { return <div /> }`
    )

    // Set up required block sources
    await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/features'))
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/component.tsx'), 'export function F() {}')
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/payload.ts'), 'export const FeaturesBlock = {}')

    await addAction({
      names: ['landing'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const templatePayload = await fs.readFile(
      path.join(tmpDir, 'src/templates/landing/payload.ts'),
      'utf-8'
    )
    expect(templatePayload).toContain("from '@/custom-blocks/hero/payload'")
    expect(templatePayload).toContain("from '@/custom-blocks/features/payload'")
    expect(templatePayload).not.toContain("from '@/blocks/")

    const templatePage = await fs.readFile(
      path.join(tmpDir, 'src/templates/landing/page.tsx'),
      'utf-8'
    )
    expect(templatePage).toContain("from '@/custom-blocks/hero/component'")
    expect(templatePage).not.toContain("from '@/blocks/")
  })

  it('patches payload.config.ts with correct global export name from registry', async () => {
    // Set up template source files
    await fs.ensureDir(path.join(hyfolioSourceDir, 'templates/landing'))
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/payload.ts'),
      `export const LandingGlobal = { slug: 'landing', fields: [] }`
    )
    await fs.writeFile(
      path.join(hyfolioSourceDir, 'templates/landing/page.tsx'),
      `export function LandingPage() { return <div /> }`
    )

    // Set up required block sources
    await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/features'))
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/component.tsx'), 'export function F() {}')
    await fs.writeFile(path.join(hyfolioSourceDir, 'blocks/features/payload.ts'), 'export const FeaturesBlock = {}')

    await addAction({
      names: ['landing'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
      exec: mockRunCommand,
    })

    const payloadConfig = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    // Should use LandingGlobal (from registry), not LandingPageGlobal (old derived name)
    expect(payloadConfig).toContain("import { LandingGlobal }")
    expect(payloadConfig).toContain('globals: [LandingGlobal]')
    expect(payloadConfig).not.toContain('LandingPageGlobal')
  })
})
