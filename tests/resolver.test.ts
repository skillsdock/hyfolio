import { describe, it, expect } from 'vitest'
import {
  resolveBlock,
  resolveTemplate,
  resolveBlocks,
  getBlockMeta,
  listBlocks,
  listTemplates,
} from '../src/registry/resolver'

describe('resolveBlock', () => {
  it('returns files and dependencies for a known block', () => {
    const result = resolveBlock('hero')

    expect(result).toEqual({
      slug: 'hero',
      files: ['blocks/hero/component.tsx', 'blocks/hero/payload.ts'],
      dependencies: ['@payloadcms/richtext-lexical'],
    })
  })

  it('throws for an unknown block slug', () => {
    expect(() => resolveBlock('nonexistent')).toThrow(
      'Block "nonexistent" not found in registry'
    )
  })

  it('returns empty dependencies for blocks without npm deps', () => {
    const result = resolveBlock('navbar')

    expect(result.dependencies).toEqual([])
  })
})

describe('resolveBlocks', () => {
  it('resolves multiple blocks and deduplicates dependencies', () => {
    const result = resolveBlocks(['hero', 'content'])

    expect(result.files).toEqual(
      expect.arrayContaining([
        'blocks/hero/component.tsx',
        'blocks/hero/payload.ts',
        'blocks/content/component.tsx',
        'blocks/content/payload.ts',
      ])
    )
    // Both hero and content depend on @payloadcms/richtext-lexical
    // It should appear only once
    const lexicalCount = result.dependencies.filter(
      (d) => d === '@payloadcms/richtext-lexical'
    ).length
    expect(lexicalCount).toBe(1)
  })

  it('throws if any block in the list is unknown', () => {
    expect(() => resolveBlocks(['hero', 'fake'])).toThrow(
      'Block "fake" not found in registry'
    )
  })

  it('deduplicates blocks if the same slug is passed twice', () => {
    const result = resolveBlocks(['hero', 'hero'])

    expect(result.files).toHaveLength(2) // component.tsx + payload.ts, not doubled
  })
})

describe('resolveTemplate', () => {
  it('returns template files plus all required block files', () => {
    const result = resolveTemplate('contact')

    // contact template requires: navbar, hero, contact, faq, footer
    expect(result.templateFiles).toEqual([
      'templates/contact/page.tsx',
      'templates/contact/payload.ts',
    ])
    expect(result.blocks).toHaveLength(5)
    expect(result.blocks.map((b) => b.slug)).toEqual(
      expect.arrayContaining(['navbar', 'hero', 'contact', 'faq', 'footer'])
    )
  })

  it('throws for an unknown template slug', () => {
    expect(() => resolveTemplate('nonexistent')).toThrow(
      'Template "nonexistent" not found in registry'
    )
  })

  it('collects all npm dependencies from included blocks', () => {
    // landing template includes hero which depends on @payloadcms/richtext-lexical
    const result = resolveTemplate('landing')

    expect(result.dependencies).toContain('@payloadcms/richtext-lexical')
  })
})

describe('getBlockMeta', () => {
  it('returns full metadata for a known block', () => {
    const meta = getBlockMeta('pricing')

    expect(meta).toEqual({
      slug: 'pricing',
      name: 'Pricing',
      description: 'Pricing tier cards with features, price, and CTA button.',
      category: 'commerce',
      files: ['blocks/pricing/component.tsx', 'blocks/pricing/payload.ts'],
      dependencies: [],
      registryDependencies: [],
    })
  })

  it('returns null for an unknown block', () => {
    const meta = getBlockMeta('nonexistent')

    expect(meta).toBeNull()
  })
})

describe('listBlocks', () => {
  it('returns all 19 blocks', () => {
    const blocks = listBlocks()

    expect(blocks).toHaveLength(19)
  })

  it('can filter by category', () => {
    const contentBlocks = listBlocks('content')

    expect(contentBlocks.length).toBeGreaterThan(0)
    expect(contentBlocks.every((b) => b.category === 'content')).toBe(true)
  })
})

describe('listTemplates', () => {
  it('returns all 5 templates', () => {
    const templates = listTemplates()

    expect(templates).toHaveLength(5)
  })
})
