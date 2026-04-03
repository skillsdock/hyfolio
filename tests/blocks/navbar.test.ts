import { describe, it, expect } from 'vitest'
import { NavbarBlock } from '@/blocks/navbar/payload'

describe('NavbarBlock payload', () => {
  it('has the correct slug', () => {
    expect(NavbarBlock.slug).toBe('navbar')
  })

  it('has singular and plural labels', () => {
    expect(NavbarBlock.labels).toEqual({
      singular: 'Navbar',
      plural: 'Navbars',
    })
  })

  it('has a logo field', () => {
    const logoField = NavbarBlock.fields.find(
      (f: any) => f.name === 'logo'
    )
    expect(logoField).toBeDefined()
    expect(logoField!.type).toBe('upload')
  })

  it('has a links array field', () => {
    const linksField = NavbarBlock.fields.find(
      (f: any) => f.name === 'links'
    )
    expect(linksField).toBeDefined()
    expect(linksField!.type).toBe('array')
  })

  it('has a cta group field', () => {
    const ctaField = NavbarBlock.fields.find(
      (f: any) => f.name === 'cta'
    )
    expect(ctaField).toBeDefined()
    expect(ctaField!.type).toBe('group')
  })
})
