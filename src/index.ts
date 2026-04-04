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

// Theme
export { themeSchema, type ThemeConfig } from './theme/schema.js'
export { generateThemeCSS } from './theme/generator.js'
export { hyfolioPreset } from './theme/tailwind-preset.js'

// Primitives
export { HyfRichText } from './primitives/rich-text.js'
export { HyfButton } from './primitives/button.js'
export { HyfCard } from './primitives/card.js'
export { HyfLoader, HyfInlineLoader } from './primitives/loader.js'
export { HyfBadge } from './primitives/badge.js'
export { HyfContainer } from './primitives/container.js'
export { HyfSection } from './primitives/section.js'
