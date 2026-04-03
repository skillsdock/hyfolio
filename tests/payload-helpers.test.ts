import { describe, it, expect } from 'vitest'
import {
  richTextField,
  imageField,
  linkField,
  groupField,
} from '../src/payload/helpers'

describe('richTextField', () => {
  it('returns a richText field config with the given name', () => {
    const field = richTextField('description')

    expect(field).toEqual({
      name: 'description',
      type: 'richText',
    })
  })

  it('passes through additional overrides', () => {
    const field = richTextField('content', { required: true, label: 'Body' })

    expect(field.name).toBe('content')
    expect(field.type).toBe('richText')
    expect(field.required).toBe(true)
    expect(field.label).toBe('Body')
  })
})

describe('imageField', () => {
  it('returns an upload field pointing to media collection', () => {
    const field = imageField('photo')

    expect(field).toEqual({
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    })
  })

  it('passes through additional overrides', () => {
    const field = imageField('avatar', { required: true })

    expect(field.name).toBe('avatar')
    expect(field.type).toBe('upload')
    expect(field.relationTo).toBe('media')
    expect(field.required).toBe(true)
  })
})

describe('linkField', () => {
  it('returns a group with label, href, and newTab fields', () => {
    const field = linkField('cta')

    expect(field.name).toBe('cta')
    expect(field.type).toBe('group')
    expect(field.fields).toHaveLength(3)

    const names = field.fields.map((f: { name: string }) => f.name)
    expect(names).toEqual(['label', 'href', 'newTab'])
  })

  it('label and href are text fields, newTab is checkbox', () => {
    const field = linkField('link')

    const labelField = field.fields.find(
      (f: { name: string }) => f.name === 'label'
    )
    const hrefField = field.fields.find(
      (f: { name: string }) => f.name === 'href'
    )
    const newTabField = field.fields.find(
      (f: { name: string }) => f.name === 'newTab'
    )

    expect(labelField.type).toBe('text')
    expect(hrefField.type).toBe('text')
    expect(newTabField.type).toBe('checkbox')
  })
})

describe('groupField', () => {
  it('returns a group field config with child fields', () => {
    const field = groupField('metadata', [
      { name: 'title', type: 'text' as const },
      { name: 'description', type: 'text' as const },
    ])

    expect(field.name).toBe('metadata')
    expect(field.type).toBe('group')
    expect(field.fields).toHaveLength(2)
  })

  it('passes through additional overrides', () => {
    const field = groupField(
      'settings',
      [{ name: 'enabled', type: 'checkbox' as const }],
      { label: 'Settings Panel' }
    )

    expect(field.label).toBe('Settings Panel')
    expect(field.fields).toHaveLength(1)
  })
})
