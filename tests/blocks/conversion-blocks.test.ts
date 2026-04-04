import { describe, it, expect } from 'vitest'
import { CTABlock } from '@/blocks/cta/payload'
import { ContactBlock } from '@/blocks/contact/payload'
import { NewsletterBlock } from '@/blocks/newsletter/payload'

describe('CTABlock payload', () => {
  it('has the correct slug', () => {
    expect(CTABlock.slug).toBe('cta')
  })

  it('has a required heading field', () => {
    const field = CTABlock.fields.find((f: any) => f.name === 'heading')
    expect(field).toBeDefined()
    expect((field as any).required).toBe(true)
  })

  it('has primaryButton and secondaryButton groups', () => {
    const primary = CTABlock.fields.find(
      (f: any) => f.name === 'primaryButton'
    )
    const secondary = CTABlock.fields.find(
      (f: any) => f.name === 'secondaryButton'
    )
    expect(primary).toBeDefined()
    expect(primary!.type).toBe('group')
    expect(secondary).toBeDefined()
    expect(secondary!.type).toBe('group')
  })
})

describe('ContactBlock payload', () => {
  it('has the correct slug', () => {
    expect(ContactBlock.slug).toBe('contact')
  })

  it('has a formConfig group', () => {
    const field = ContactBlock.fields.find(
      (f: any) => f.name === 'formConfig'
    )
    expect(field).toBeDefined()
    expect(field!.type).toBe('group')
  })

  it('formConfig has submitLabel and successMessage', () => {
    const field = ContactBlock.fields.find(
      (f: any) => f.name === 'formConfig'
    ) as any
    const submitLabel = field.fields.find(
      (f: any) => f.name === 'submitLabel'
    )
    const successMessage = field.fields.find(
      (f: any) => f.name === 'successMessage'
    )
    expect(submitLabel).toBeDefined()
    expect(successMessage).toBeDefined()
  })
})

describe('NewsletterBlock payload', () => {
  it('has the correct slug', () => {
    expect(NewsletterBlock.slug).toBe('newsletter')
  })

  it('has singular and plural labels', () => {
    expect(NewsletterBlock.labels).toEqual({
      singular: 'Newsletter',
      plural: 'Newsletters',
    })
  })

  it('has a required heading field', () => {
    const field = NewsletterBlock.fields.find(
      (f: any) => f.name === 'heading'
    )
    expect(field).toBeDefined()
    expect((field as any).required).toBe(true)
  })

  it('has placeholder and buttonText fields', () => {
    const placeholder = NewsletterBlock.fields.find(
      (f: any) => f.name === 'placeholder'
    )
    const buttonText = NewsletterBlock.fields.find(
      (f: any) => f.name === 'buttonText'
    )
    expect(placeholder).toBeDefined()
    expect(buttonText).toBeDefined()
  })
})
