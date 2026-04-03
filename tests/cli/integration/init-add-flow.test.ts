import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { initAction } from '../../../src/cli/init.js'
import { addAction } from '../../../src/cli/add.js'

let tmpDir: string
let hyfolioSourceDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-integration-${Date.now()}`)
  hyfolioSourceDir = path.join(os.tmpdir(), `hyfolio-test-integration-source-${Date.now()}`)

  // Create a minimal Next.js project
  await fs.ensureDir(tmpDir)
  await fs.writeFile(
    path.join(tmpDir, 'package.json'),
    JSON.stringify({
      name: 'test-project',
      dependencies: { next: '^15.0.0', react: '^19.0.0' },
    })
  )
  await fs.writeFile(path.join(tmpDir, 'package-lock.json'), '{}')
  await fs.ensureDir(path.join(tmpDir, 'src/app'))

  // Set up hyfolio source with block files
  await fs.ensureDir(path.join(hyfolioSourceDir, 'primitives'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'primitives/button.tsx'),
    `export function HyfButton({ children, variant = 'primary' }: { children: React.ReactNode; variant?: string }) {
  return <button className={\`hyf-btn hyf-btn-\${variant}\`}>{children}</button>
}
`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'primitives/section.tsx'),
    `export function HyfSection({ children }: { children: React.ReactNode }) {
  return <section className="hyf-section">{children}</section>
}
`
  )

  await fs.ensureDir(path.join(hyfolioSourceDir, 'shared'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'shared/render.tsx'),
    'export function renderBlock() { return null }'
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'shared/types.ts'),
    'export interface BlockProps { blockType: string }\nexport interface HeroBlock extends BlockProps { heading: string }\n'
  )

  await fs.ensureDir(path.join(hyfolioSourceDir, 'presets'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'presets/minimal.yaml'),
    'colors:\n  background: "#ffffff"\n  foreground: "#0a0a0a"\n  primary: "#2563eb"\n'
  )

  await fs.ensureDir(path.join(hyfolioSourceDir, 'payload'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'payload/base-config.ts'),
    `import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export default buildConfig({
  editor: lexicalEditor(),
  db: sqliteAdapter({ url: path.resolve(dirname, 'hyfolio.db') }),
  collections: [
    { slug: 'media', upload: true, fields: [] },
    { slug: 'pages', fields: [{ name: 'blocks', type: 'blocks', blocks: [] }] },
  ],
  globals: [],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
`
  )

  // Hero block source
  await fs.ensureDir(path.join(hyfolioSourceDir, 'blocks/hero'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'blocks/hero/component.tsx'),
    `import type { HeroBlock as HeroProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfButton } from '@/lib/hyfolio/primitives/button'

export function HeroBlock({ heading, subheading, cta }: HeroProps) {
  return (
    <HyfSection>
      <h1>{heading}</h1>
      {subheading && <p>{subheading}</p>}
      {cta && <HyfButton>{cta.label}</HyfButton>}
    </HyfSection>
  )
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
    { name: 'subheading', type: 'text' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
`
  )
})

afterEach(async () => {
  await fs.remove(tmpDir)
  await fs.remove(hyfolioSourceDir)
})

const mockRunCommand = vi.fn(async () => {})
const mockPrompt = vi.fn()
const mockGenerateTheme = vi.fn(() => `:root {
  --hyf-background: #ffffff;
  --hyf-foreground: #0a0a0a;
  --hyf-primary: #2563eb;
}
`)

const blocksRegistry = [
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
      primitives: ['button.tsx', 'section.tsx'],
    },
  },
]

const templatesRegistry: never[] = []

describe('Integration: init then add', () => {
  it('initializes project then adds a block successfully', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    // Step 1: Init
    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    // Verify init created everything
    expect(await fs.pathExists(path.join(tmpDir, 'hyfolio.config.ts'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'hyfolio.theme.yaml'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'payload.config.ts'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/theme.css'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/primitives/button.tsx'))).toBe(true)

    // Step 2: Add hero block
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry,
      templatesRegistry,
      exec: mockRunCommand,
    })

    // Verify block was added
    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks/hero/component.tsx'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks/hero/payload.ts'))).toBe(true)

    // Verify payload.config.ts was patched
    const payloadConfig = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    expect(payloadConfig).toContain("import { HeroBlock } from '@/blocks/hero/payload'")
    expect(payloadConfig).toContain('HeroBlock')

    // Verify component content
    const component = await fs.readFile(
      path.join(tmpDir, 'src/blocks/hero/component.tsx'),
      'utf-8'
    )
    expect(component).toContain('HyfSection')
    expect(component).toContain('HyfButton')
  })

  it('running add twice for same block does not duplicate', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    // Add hero twice
    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry,
      templatesRegistry,
      exec: mockRunCommand,
    })

    await addAction({
      names: ['hero'],
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      blocksRegistry,
      templatesRegistry,
      exec: mockRunCommand,
    })

    // Verify no duplicate imports
    const payloadConfig = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    const importMatches = payloadConfig.match(/import { HeroBlock }/g)
    expect(importMatches).toHaveLength(1)
  })
})
