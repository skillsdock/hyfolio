import { describe, it, expectTypeOf } from 'vitest'
import type {
  NavbarBlock,
  HeroBlock,
  FeaturesBlock,
  ContentBlock,
  StatsBlock,
  DetailsBlock,
  TeamBlock,
  TimelineBlock,
  TestimonialsBlock,
  LogosBlock,
  PricingBlock,
  ComparisonBlock,
  CTABlock,
  ContactBlock,
  NewsletterBlock,
  FAQBlock,
  GalleryBlock,
  BlogListBlock,
  FooterBlock,
} from '../src/types'

describe('block prop types', () => {
  it('HeroBlock has the expected shape', () => {
    expectTypeOf<HeroBlock>().toHaveProperty('heading')
    expectTypeOf<HeroBlock['heading']>().toBeString()
    expectTypeOf<HeroBlock>().toHaveProperty('subheading')
    expectTypeOf<HeroBlock>().toHaveProperty('image')
    expectTypeOf<HeroBlock>().toHaveProperty('cta')
  })

  it('FeaturesBlock has items array', () => {
    expectTypeOf<FeaturesBlock>().toHaveProperty('heading')
    expectTypeOf<FeaturesBlock>().toHaveProperty('items')
  })

  it('PricingBlock has tiers array', () => {
    expectTypeOf<PricingBlock>().toHaveProperty('heading')
    expectTypeOf<PricingBlock>().toHaveProperty('tiers')
  })

  it('NavbarBlock has logo and links', () => {
    expectTypeOf<NavbarBlock>().toHaveProperty('logo')
    expectTypeOf<NavbarBlock>().toHaveProperty('links')
  })

  it('FooterBlock has columns', () => {
    expectTypeOf<FooterBlock>().toHaveProperty('columns')
    expectTypeOf<FooterBlock>().toHaveProperty('copyright')
  })

  it('ContactBlock has form fields config', () => {
    expectTypeOf<ContactBlock>().toHaveProperty('heading')
    expectTypeOf<ContactBlock>().toHaveProperty('fields')
  })

  it('FAQBlock has items with question and answer', () => {
    expectTypeOf<FAQBlock>().toHaveProperty('heading')
    expectTypeOf<FAQBlock>().toHaveProperty('items')
  })

  it('TestimonialsBlock has items array', () => {
    expectTypeOf<TestimonialsBlock>().toHaveProperty('heading')
    expectTypeOf<TestimonialsBlock>().toHaveProperty('items')
  })

  it('all block types are importable', () => {
    // This test passes if the file compiles -- verifies every export exists
    expectTypeOf<NavbarBlock>().toBeObject()
    expectTypeOf<HeroBlock>().toBeObject()
    expectTypeOf<FeaturesBlock>().toBeObject()
    expectTypeOf<ContentBlock>().toBeObject()
    expectTypeOf<StatsBlock>().toBeObject()
    expectTypeOf<DetailsBlock>().toBeObject()
    expectTypeOf<TeamBlock>().toBeObject()
    expectTypeOf<TimelineBlock>().toBeObject()
    expectTypeOf<TestimonialsBlock>().toBeObject()
    expectTypeOf<LogosBlock>().toBeObject()
    expectTypeOf<PricingBlock>().toBeObject()
    expectTypeOf<ComparisonBlock>().toBeObject()
    expectTypeOf<CTABlock>().toBeObject()
    expectTypeOf<ContactBlock>().toBeObject()
    expectTypeOf<NewsletterBlock>().toBeObject()
    expectTypeOf<FAQBlock>().toBeObject()
    expectTypeOf<GalleryBlock>().toBeObject()
    expectTypeOf<BlogListBlock>().toBeObject()
    expectTypeOf<FooterBlock>().toBeObject()
  })
})
