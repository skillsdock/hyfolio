import { describe, it, expect } from 'vitest'
import { FaqBlock } from '@/blocks/faq/payload'
import { GalleryBlock } from '@/blocks/gallery/payload'
import { BlogListBlock } from '@/blocks/blog-list/payload'
import { FooterBlock } from '@/blocks/footer/payload'

describe('FaqBlock payload', () => {
  it('has the correct slug', () => {
    expect(FaqBlock.slug).toBe('faq')
  })

  it('has an items array field', () => {
    const field = FaqBlock.fields.find((f: any) => f.name === 'items')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('items have required question and answer fields', () => {
    const field = FaqBlock.fields.find((f: any) => f.name === 'items') as any
    const questionField = field.fields.find((f: any) => f.name === 'question')
    const answerField = field.fields.find((f: any) => f.name === 'answer')
    expect(questionField).toBeDefined()
    expect((questionField as any).required).toBe(true)
    expect(answerField).toBeDefined()
    expect((answerField as any).required).toBe(true)
    expect(answerField.type).toBe('richText')
  })
})

describe('GalleryBlock payload', () => {
  it('has the correct slug', () => {
    expect(GalleryBlock.slug).toBe('gallery')
  })

  it('has an images array field', () => {
    const field = GalleryBlock.fields.find((f: any) => f.name === 'images')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('image items have required image upload', () => {
    const field = GalleryBlock.fields.find(
      (f: any) => f.name === 'images'
    ) as any
    const imageField = field.fields.find((f: any) => f.name === 'image')
    expect(imageField).toBeDefined()
    expect(imageField.type).toBe('upload')
    expect(imageField.required).toBe(true)
  })

  it('has a columns select field', () => {
    const field = GalleryBlock.fields.find((f: any) => f.name === 'columns')
    expect(field).toBeDefined()
    expect(field!.type).toBe('select')
  })
})

describe('BlogListBlock payload', () => {
  it('has the correct slug', () => {
    expect(BlogListBlock.slug).toBe('blog-list')
  })

  it('has postsPerPage number field', () => {
    const field = BlogListBlock.fields.find(
      (f: any) => f.name === 'postsPerPage'
    )
    expect(field).toBeDefined()
    expect(field!.type).toBe('number')
  })

  it('has showExcerpt, showDate, showAuthor checkboxes', () => {
    const showExcerpt = BlogListBlock.fields.find(
      (f: any) => f.name === 'showExcerpt'
    )
    const showDate = BlogListBlock.fields.find(
      (f: any) => f.name === 'showDate'
    )
    const showAuthor = BlogListBlock.fields.find(
      (f: any) => f.name === 'showAuthor'
    )
    expect(showExcerpt).toBeDefined()
    expect(showExcerpt!.type).toBe('checkbox')
    expect(showDate).toBeDefined()
    expect(showDate!.type).toBe('checkbox')
    expect(showAuthor).toBeDefined()
    expect(showAuthor!.type).toBe('checkbox')
  })
})

describe('FooterBlock payload', () => {
  it('has the correct slug', () => {
    expect(FooterBlock.slug).toBe('footer')
  })

  it('has singular and plural labels', () => {
    expect(FooterBlock.labels).toEqual({
      singular: 'Footer',
      plural: 'Footers',
    })
  })

  it('has a columns array field', () => {
    const field = FooterBlock.fields.find((f: any) => f.name === 'columns')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })

  it('column items have a title and links array', () => {
    const field = FooterBlock.fields.find(
      (f: any) => f.name === 'columns'
    ) as any
    const titleField = field.fields.find((f: any) => f.name === 'title')
    const linksField = field.fields.find((f: any) => f.name === 'links')
    expect(titleField).toBeDefined()
    expect(linksField).toBeDefined()
    expect(linksField.type).toBe('array')
  })

  it('has a copyright text field', () => {
    const field = FooterBlock.fields.find((f: any) => f.name === 'copyright')
    expect(field).toBeDefined()
    expect(field!.type).toBe('text')
  })

  it('has a socials array field', () => {
    const field = FooterBlock.fields.find((f: any) => f.name === 'socials')
    expect(field).toBeDefined()
    expect(field!.type).toBe('array')
  })
})
