import { describe, it, expect } from 'vitest'
import { generatePayloadConfig } from '../../../src/cli/utils/payload-template.js'

describe('generatePayloadConfig', () => {
  it('returns a string containing buildConfig', () => {
    const result = generatePayloadConfig()
    expect(result).toContain('buildConfig')
  })

  it('includes lexicalEditor', () => {
    const result = generatePayloadConfig()
    expect(result).toContain('lexicalEditor')
    expect(result).toContain('@payloadcms/richtext-lexical')
  })

  it('includes sqliteAdapter', () => {
    const result = generatePayloadConfig()
    expect(result).toContain('sqliteAdapter')
    expect(result).toContain('@payloadcms/db-sqlite')
  })

  it('includes media collection', () => {
    const result = generatePayloadConfig()
    expect(result).toContain("slug: 'media'")
    expect(result).toContain('upload: true')
  })

  it('includes pages collection with blocks field', () => {
    const result = generatePayloadConfig()
    expect(result).toContain("slug: 'pages'")
    expect(result).toContain("type: 'blocks'")
  })

  it('includes PAYLOAD_SECRET env var', () => {
    const result = generatePayloadConfig()
    expect(result).toContain('PAYLOAD_SECRET')
  })

  it('includes typescript output config', () => {
    const result = generatePayloadConfig()
    expect(result).toContain('typescript')
    expect(result).toContain('payload-types.ts')
  })

  it('is valid TypeScript syntax (no unmatched braces)', () => {
    const result = generatePayloadConfig()
    const opens = (result.match(/\{/g) || []).length
    const closes = (result.match(/\}/g) || []).length
    expect(opens).toBe(closes)
  })
})
