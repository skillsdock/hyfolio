import { describe, it, expect } from 'vitest'
import { TestimonialsBlock } from '@/blocks/testimonials/payload'
import { LogosBlock } from '@/blocks/logos/payload'

describe('TestimonialsBlock payload', () => {
  it('has the correct slug', () => {
    expect(TestimonialsBlock.slug).toBe('testimonials')
  })

  it('has a testimonials array field', () => {
    const field = TestimonialsBlock.fields.find(
      (f: any) => f.name === 'testimonials'
    )
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('testimonial items have required quote and authorName', () => {
    const field = TestimonialsBlock.fields.find(
      (f: any) => f.name === 'testimonials'
    ) as any
    const quoteField = field.fields.find((f: any) => f.name === 'quote')
    const authorField = field.fields.find((f: any) => f.name === 'authorName')
    expect(quoteField).toBeDefined()
    expect((quoteField as any).required).toBe(true)
    expect(authorField).toBeDefined()
    expect((authorField as any).required).toBe(true)
  })
})

describe('LogosBlock payload', () => {
  it('has the correct slug', () => {
    expect(LogosBlock.slug).toBe('logos')
  })

  it('has singular and plural labels', () => {
    expect(LogosBlock.labels).toEqual({
      singular: 'Logos',
      plural: 'Logos',
    })
  })

  it('has a logos array field', () => {
    const field = LogosBlock.fields.find((f: any) => f.name === 'logos')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('logo items have an image upload and optional link', () => {
    const field = LogosBlock.fields.find((f: any) => f.name === 'logos') as any
    const imageField = field.fields.find((f: any) => f.name === 'image')
    const linkField = field.fields.find((f: any) => f.name === 'href')
    expect(imageField).toBeDefined()
    expect(imageField.type).toBe('upload')
    expect(linkField).toBeDefined()
  })
})
