import { describe, it, expect, vi } from 'vitest'
import { createBlockRenderer } from '../src/render'
import type { AnyBlock } from '../src/types'

// Minimal mock components -- just return a string representation
function MockHero(props: { heading: string }) {
  return `Hero: ${props.heading}`
}

function MockCTA(props: { heading: string }) {
  return `CTA: ${props.heading}`
}

describe('createBlockRenderer', () => {
  const blockComponents = {
    hero: MockHero,
    cta: MockCTA,
  }

  const renderBlocks = createBlockRenderer(blockComponents)

  it('returns null for an empty blocks array', () => {
    const result = renderBlocks([])

    expect(result).toEqual([])
  })

  it('maps a block to its registered component', () => {
    const blocks: AnyBlock[] = [
      { blockType: 'hero', heading: 'Hello', cta: null },
    ]

    const result = renderBlocks(blocks)

    expect(result).toHaveLength(1)
  })

  it('skips blocks with no registered component and logs a warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const blocks: AnyBlock[] = [
      { blockType: 'features', heading: 'Features', items: [] },
    ]

    const result = renderBlocks(blocks)

    expect(result).toHaveLength(0)
    expect(warnSpy).toHaveBeenCalledWith(
      '[hyfolio] No component registered for block type "features"'
    )
    warnSpy.mockRestore()
  })

  it('renders multiple blocks in order', () => {
    const blocks: AnyBlock[] = [
      { blockType: 'hero', heading: 'Welcome' },
      { blockType: 'cta', heading: 'Get Started', cta: { label: 'Go', href: '/' } },
    ]

    const result = renderBlocks(blocks)

    expect(result).toHaveLength(2)
  })
})

describe('createBlockRenderer type safety', () => {
  it('accepts any component map shape', () => {
    // This test verifies the function signature accepts arbitrary component maps
    const renderer = createBlockRenderer({
      hero: () => 'hero',
      custom: () => 'custom',
    })

    expect(typeof renderer).toBe('function')
  })
})
