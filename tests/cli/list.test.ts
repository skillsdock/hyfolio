import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { listAction } from '../../src/cli/list.js'

let tmpDir: string
const mockStdout: string[] = []

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-list-${Date.now()}`)
  await fs.ensureDir(tmpDir)
  await fs.ensureDir(path.join(tmpDir, 'src/blocks'))
  mockStdout.length = 0
  vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
    mockStdout.push(String(chunk))
    return true
  })
})

afterEach(async () => {
  vi.restoreAllMocks()
  await fs.remove(tmpDir)
})

const testBlocksRegistry = [
  {
    name: 'hero',
    category: 'Hero',
    description: 'Full-width hero section with heading, subheading, image, and CTA',
    files: ['component.tsx', 'payload.ts'],
    dependencies: { npm: ['@payloadcms/richtext-lexical'], shared: ['render.tsx', 'types.ts'] },
  },
  {
    name: 'features',
    category: 'Content',
    description: 'Feature grid with icons, titles, and descriptions',
    files: ['component.tsx', 'payload.ts'],
    dependencies: { npm: [], shared: ['render.tsx', 'types.ts'] },
  },
  {
    name: 'pricing',
    category: 'Commerce',
    description: 'Pricing cards with tiers, features list, and CTA',
    files: ['component.tsx', 'payload.ts'],
    dependencies: { npm: [], shared: ['render.tsx', 'types.ts'] },
  },
]

const testTemplatesRegistry = [
  {
    name: 'landing',
    description: 'Complete landing page with hero, features, testimonials, CTA',
    blocks: ['hero', 'features', 'testimonials', 'cta', 'footer'],
  },
]

describe('listAction', () => {
  it('displays all blocks from registry', async () => {
    await listAction({
      projectDir: tmpDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
    })

    const output = mockStdout.join('')
    expect(output).toContain('hero')
    expect(output).toContain('features')
    expect(output).toContain('pricing')
  })

  it('displays templates from registry', async () => {
    await listAction({
      projectDir: tmpDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
    })

    const output = mockStdout.join('')
    expect(output).toContain('landing')
  })

  it('marks already-installed blocks', async () => {
    await fs.ensureDir(path.join(tmpDir, 'src/blocks/hero'))
    await fs.writeFile(path.join(tmpDir, 'src/blocks/hero/component.tsx'), '')

    await listAction({
      projectDir: tmpDir,
      blocksRegistry: testBlocksRegistry,
      templatesRegistry: testTemplatesRegistry,
    })

    const output = mockStdout.join('')
    expect(output).toContain('installed')
  })
})
