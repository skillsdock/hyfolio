import { describe, it, expect } from 'vitest'
import { adaptBlocksRegistry, adaptTemplatesRegistry } from '../../src/cli/utils/registry-adapter.js'

describe('adaptTemplatesRegistry', () => {
  it('uses globalExport from registry data instead of deriving from name', () => {
    const templates = adaptTemplatesRegistry([
      {
        slug: 'landing',
        name: 'Landing Page',
        globalExport: 'LandingGlobal',
        description: 'A landing page',
        blocks: ['hero'],
        files: ['page.tsx', 'payload.ts'],
      },
    ])

    expect(templates[0].globalExportName).toBe('LandingGlobal')
    // Not 'LandingPageGlobal' (old derived behavior)
    expect(templates[0].globalExportName).not.toBe('LandingPageGlobal')
  })

  it('maps slug to name for registry lookup', () => {
    const templates = adaptTemplatesRegistry([
      {
        slug: 'about',
        name: 'About Page',
        globalExport: 'AboutGlobal',
        description: 'An about page',
        blocks: ['hero', 'team'],
        files: ['page.tsx', 'payload.ts'],
      },
    ])

    expect(templates[0].name).toBe('about')
  })

  it('preserves all template metadata', () => {
    const templates = adaptTemplatesRegistry([
      {
        slug: 'contact',
        name: 'Contact Page',
        globalExport: 'ContactGlobal',
        description: 'Contact page',
        blocks: ['hero', 'contact', 'faq'],
        files: ['page.tsx', 'payload.ts'],
      },
    ])

    expect(templates[0]).toEqual({
      name: 'contact',
      description: 'Contact page',
      blocks: ['hero', 'contact', 'faq'],
      globalExportName: 'ContactGlobal',
      files: ['page.tsx', 'payload.ts'],
    })
  })
})

describe('adaptBlocksRegistry', () => {
  it('derives payloadExportName from block name', () => {
    const blocks = adaptBlocksRegistry([
      {
        slug: 'hero',
        name: 'Hero',
        description: 'Hero section',
        category: 'Hero',
        files: ['component.tsx', 'payload.ts'],
        dependencies: ['@payloadcms/richtext-lexical'],
        registryDependencies: [],
      },
    ])

    expect(blocks[0].payloadExportName).toBe('HeroBlock')
    expect(blocks[0].name).toBe('hero')
  })
})
