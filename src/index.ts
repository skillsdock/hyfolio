// Config
export { defineConfig } from './config.js'
export type { HyfolioConfig, HyfolioStylingConfig } from './config.js'

// Types
export type {
  PayloadMedia,
  LinkField,
  RichText,
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
  AnyBlock,
} from './types.js'

// Registry resolver
export {
  resolveBlock,
  resolveBlocks,
  resolveTemplate,
  getBlockMeta,
  listBlocks,
  listTemplates,
} from './registry/resolver.js'
export type {
  BlockMeta,
  TemplateMeta,
  ResolvedBlock,
  ResolvedBlocks,
  ResolvedTemplate,
} from './registry/resolver.js'

// Payload utilities
export {
  richTextField,
  imageField,
  linkField,
  groupField,
} from './payload/helpers.js'
export {
  mediaCollection,
  pagesCollection,
  getBaseCollections,
} from './payload/base-config.js'

// Block renderer (also available via 'hyfolio/render' sub-export)
export { createBlockRenderer } from './render.js'
export type { BlockComponentMap } from './render.js'
