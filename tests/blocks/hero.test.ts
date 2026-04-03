import { describe, it, expect } from 'vitest'
import { HeroBlock } from '@/blocks/hero/payload'

describe('HeroBlock payload', () => {
  it('has the correct slug', () => {
    expect(HeroBlock.slug).toBe('hero')
  })

  it('has singular and plural labels', () => {
    expect(HeroBlock.labels).toEqual({
      singular: 'Hero',
      plural: 'Heroes',
    })
  })

  it('has a required heading field', () => {
    const headingField = HeroBlock.fields.find(
      (f: any) => f.name === 'heading'
    )
    expect(headingField).toBeDefined()
    expect(headingField!.type).toBe('text')
    expect((headingField as any).required).toBe(true)
  })

  it('has a subheading text field', () => {
    const subField = HeroBlock.fields.find(
      (f: any) => f.name === 'subheading'
    )
    expect(subField).toBeDefined()
    expect(subField!.type).toBe('text')
  })

  it('has a description richText field', () => {
    const descField = HeroBlock.fields.find(
      (f: any) => f.name === 'description'
    )
    expect(descField).toBeDefined()
    expect(descField!.type).toBe('richText')
  })

  it('has an image upload field', () => {
    const imgField = HeroBlock.fields.find(
      (f: any) => f.name === 'image'
    )
    expect(imgField).toBeDefined()
    expect(imgField!.type).toBe('upload')
  })

  it('has a cta group field with label and href', () => {
    const ctaField = HeroBlock.fields.find(
      (f: any) => f.name === 'cta'
    ) as any
    expect(ctaField).toBeDefined()
    expect(ctaField.type).toBe('group')
    const labelField = ctaField.fields.find((f: any) => f.name === 'label')
    const hrefField = ctaField.fields.find((f: any) => f.name === 'href')
    expect(labelField).toBeDefined()
    expect(hrefField).toBeDefined()
  })
})
