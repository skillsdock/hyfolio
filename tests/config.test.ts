import { describe, it, expect } from 'vitest'
import { defineConfig } from '../src/config'
import type { HyfolioConfig } from '../src/config'

describe('defineConfig', () => {
  it('returns the config object unchanged when all fields are provided', () => {
    const input: HyfolioConfig = {
      blocks: 'src/blocks',
      templates: 'src/templates',
      lib: 'src/lib/hyfolio',
      styling: {
        framework: 'tailwind',
        theme: 'hyfolio.theme.yaml',
      },
      payload: 'payload.config.ts',
    }

    const result = defineConfig(input)

    expect(result).toEqual(input)
  })

  it('applies default values when optional fields are omitted', () => {
    const input = {}

    const result = defineConfig(input)

    expect(result).toEqual({
      blocks: 'src/blocks',
      templates: 'src/templates',
      lib: 'src/lib/hyfolio',
      styling: {
        framework: 'tailwind',
        theme: 'hyfolio.theme.yaml',
      },
      payload: 'payload.config.ts',
    })
  })

  it('merges partial styling config with defaults', () => {
    const result = defineConfig({
      styling: {
        framework: 'css',
      },
    })

    expect(result.styling).toEqual({
      framework: 'css',
      theme: 'hyfolio.theme.yaml',
    })
  })

  it('overrides only the provided fields, keeping other defaults', () => {
    const result = defineConfig({
      blocks: 'custom/blocks',
      payload: 'custom-payload.config.ts',
    })

    expect(result.blocks).toBe('custom/blocks')
    expect(result.templates).toBe('src/templates')
    expect(result.lib).toBe('src/lib/hyfolio')
    expect(result.payload).toBe('custom-payload.config.ts')
  })

  it('does not mutate the input object', () => {
    const input = { blocks: 'my-blocks' }
    const inputCopy = { ...input }

    defineConfig(input)

    expect(input).toEqual(inputCopy)
  })
})
