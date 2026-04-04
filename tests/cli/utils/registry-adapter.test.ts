import { describe, it, expect } from 'vitest'
import { adaptBlocksRegistry, adaptTemplatesRegistry } from '../../../src/cli/utils/registry-adapter.js'

describe('adaptBlocksRegistry', () => {
  it('maps raw blocks to adapted format with primitives', () => {
    const raw = [
      {
        slug: 'hero',
        name: 'Hero',
        description: 'Hero section',
        category: 'Hero',
        files: ['component.tsx', 'payload.ts'],
        dependencies: ['@payloadcms/richtext-lexical'],
        registryDependencies: [],
      },
    ]

    const result = adaptBlocksRegistry(raw)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('hero')
    expect(result[0].payloadExportName).toBe('HeroBlock')
    expect(result[0].dependencies.npm).toEqual(['@payloadcms/richtext-lexical'])
    expect(result[0].dependencies.shared).toEqual(['render.tsx', 'types.ts'])
    expect(result[0].dependencies.primitives).toContain('button.tsx')
    expect(result[0].dependencies.primitives).toContain('section.tsx')
    expect(result[0].dependencies.primitives).toContain('container.tsx')
  })

  it('returns empty primitives for unknown blocks', () => {
    const raw = [
      {
        slug: 'unknown-block',
        name: 'Unknown',
        description: 'Unknown block',
        category: 'Other',
        files: ['component.tsx'],
        dependencies: [],
        registryDependencies: [],
      },
    ]

    const result = adaptBlocksRegistry(raw)
    expect(result[0].dependencies.primitives).toEqual([])
  })

  it('maps features block with correct primitives', () => {
    const raw = [
      {
        slug: 'features',
        name: 'Features',
        description: 'Features grid',
        category: 'Content',
        files: ['component.tsx', 'payload.ts'],
        dependencies: [],
        registryDependencies: [],
      },
    ]

    const result = adaptBlocksRegistry(raw)
    expect(result[0].dependencies.primitives).toContain('section.tsx')
    expect(result[0].dependencies.primitives).toContain('container.tsx')
    expect(result[0].dependencies.primitives).toContain('card.tsx')
  })

  it('maps pricing block with all 5 primitives', () => {
    const raw = [
      {
        slug: 'pricing',
        name: 'Pricing',
        description: 'Pricing table',
        category: 'Commerce',
        files: ['component.tsx', 'payload.ts'],
        dependencies: [],
        registryDependencies: [],
      },
    ]

    const result = adaptBlocksRegistry(raw)
    expect(result[0].dependencies.primitives).toHaveLength(5)
    expect(result[0].dependencies.primitives).toContain('badge.tsx')
  })
})

describe('adaptTemplatesRegistry', () => {
  it('maps raw templates to adapted format using explicit globalExport', () => {
    const raw = [
      {
        slug: 'landing',
        name: 'Landing Page',
        globalExport: 'LandingGlobal',
        description: 'A landing page template',
        blocks: ['hero', 'features', 'cta'],
        files: ['page.tsx', 'payload.ts'],
      },
    ]

    const result = adaptTemplatesRegistry(raw)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('landing')
    expect(result[0].globalExportName).toBe('LandingGlobal')
    expect(result[0].blocks).toEqual(['hero', 'features', 'cta'])
  })
})
