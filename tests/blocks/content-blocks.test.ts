import { describe, it, expect } from 'vitest'
import { FeaturesBlock } from '@/blocks/features/payload'
import { ContentBlock } from '@/blocks/content/payload'
import { StatsBlock } from '@/blocks/stats/payload'
import { DetailsBlock } from '@/blocks/details/payload'
import { TeamBlock } from '@/blocks/team/payload'
import { TimelineBlock } from '@/blocks/timeline/payload'

describe('FeaturesBlock payload', () => {
  it('has the correct slug', () => {
    expect(FeaturesBlock.slug).toBe('features')
  })

  it('has a features array field', () => {
    const field = FeaturesBlock.fields.find((f: any) => f.name === 'features')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('features array items have title and description', () => {
    const field = FeaturesBlock.fields.find((f: any) => f.name === 'features') as any
    const titleField = field.fields.find((f: any) => f.name === 'title')
    const descField = field.fields.find((f: any) => f.name === 'description')
    expect(titleField).toBeDefined()
    expect(descField).toBeDefined()
  })
})

describe('ContentBlock payload', () => {
  it('has the correct slug', () => {
    expect(ContentBlock.slug).toBe('content')
  })

  it('has a required body richText field', () => {
    const field = ContentBlock.fields.find((f: any) => f.name === 'body')
    expect(field).toBeDefined()
    expect(field!.type).toBe('richText')
    expect((field as any).required).toBe(true)
  })
})

describe('StatsBlock payload', () => {
  it('has the correct slug', () => {
    expect(StatsBlock.slug).toBe('stats')
  })

  it('has a stats array field', () => {
    const field = StatsBlock.fields.find((f: any) => f.name === 'stats')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('stats items have value and label', () => {
    const field = StatsBlock.fields.find((f: any) => f.name === 'stats') as any
    const valueField = field.fields.find((f: any) => f.name === 'value')
    const labelField = field.fields.find((f: any) => f.name === 'label')
    expect(valueField).toBeDefined()
    expect(labelField).toBeDefined()
    expect((valueField as any).required).toBe(true)
    expect((labelField as any).required).toBe(true)
  })
})

describe('DetailsBlock payload', () => {
  it('has the correct slug', () => {
    expect(DetailsBlock.slug).toBe('details')
  })

  it('has a required heading field', () => {
    const field = DetailsBlock.fields.find((f: any) => f.name === 'heading')
    expect(field).toBeDefined()
    expect((field as any).required).toBe(true)
  })

  it('has a layout select field with imageRight and imageLeft', () => {
    const field = DetailsBlock.fields.find((f: any) => f.name === 'layout') as any
    expect(field).toBeDefined()
    expect(field.type).toBe('select')
    const values = field.options.map((o: any) => o.value)
    expect(values).toContain('imageRight')
    expect(values).toContain('imageLeft')
  })
})

describe('TeamBlock payload', () => {
  it('has the correct slug', () => {
    expect(TeamBlock.slug).toBe('team')
  })

  it('has a members array field', () => {
    const field = TeamBlock.fields.find((f: any) => f.name === 'members')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('members have name, role, image, bio, socials', () => {
    const field = TeamBlock.fields.find((f: any) => f.name === 'members') as any
    const names = field.fields.map((f: any) => f.name)
    expect(names).toContain('name')
    expect(names).toContain('role')
    expect(names).toContain('image')
    expect(names).toContain('bio')
    expect(names).toContain('socials')
  })
})

describe('TimelineBlock payload', () => {
  it('has the correct slug', () => {
    expect(TimelineBlock.slug).toBe('timeline')
  })

  it('has an items array field', () => {
    const field = TimelineBlock.fields.find((f: any) => f.name === 'items')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('items have date, title, and description', () => {
    const field = TimelineBlock.fields.find((f: any) => f.name === 'items') as any
    const names = field.fields.map((f: any) => f.name)
    expect(names).toContain('date')
    expect(names).toContain('title')
    expect(names).toContain('description')
  })
})
