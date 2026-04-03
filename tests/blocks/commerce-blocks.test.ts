import { describe, it, expect } from 'vitest'
import { PricingBlock } from '@/blocks/pricing/payload'
import { ComparisonBlock } from '@/blocks/comparison/payload'

describe('PricingBlock payload', () => {
  it('has the correct slug', () => {
    expect(PricingBlock.slug).toBe('pricing')
  })

  it('has a plans array field', () => {
    const field = PricingBlock.fields.find((f: any) => f.name === 'plans')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('plan items have name, price, features, cta, and highlighted', () => {
    const field = PricingBlock.fields.find((f: any) => f.name === 'plans') as any
    const names = field.fields.map((f: any) => f.name)
    expect(names).toContain('name')
    expect(names).toContain('price')
    expect(names).toContain('features')
    expect(names).toContain('cta')
    expect(names).toContain('highlighted')
  })

  it('highlighted is a checkbox defaulting to false', () => {
    const field = PricingBlock.fields.find((f: any) => f.name === 'plans') as any
    const highlighted = field.fields.find((f: any) => f.name === 'highlighted')
    expect(highlighted.type).toBe('checkbox')
    expect(highlighted.defaultValue).toBe(false)
  })
})

describe('ComparisonBlock payload', () => {
  it('has the correct slug', () => {
    expect(ComparisonBlock.slug).toBe('comparison')
  })

  it('has singular and plural labels', () => {
    expect(ComparisonBlock.labels).toEqual({
      singular: 'Comparison',
      plural: 'Comparisons',
    })
  })

  it('has a plans array field', () => {
    const field = ComparisonBlock.fields.find((f: any) => f.name === 'plans')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('has a features array field', () => {
    const field = ComparisonBlock.fields.find((f: any) => f.name === 'features')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('feature items have name and values array', () => {
    const field = ComparisonBlock.fields.find(
      (f: any) => f.name === 'features'
    ) as any
    const nameField = field.fields.find((f: any) => f.name === 'name')
    const valuesField = field.fields.find((f: any) => f.name === 'values')
    expect(nameField).toBeDefined()
    expect(valuesField).toBeDefined()
    expect(valuesField.type).toBe('array')
  })
})
