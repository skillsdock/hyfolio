// -------------------------------------------------------------------------
// Shared field types used across blocks
// -------------------------------------------------------------------------

/** Payload media object (from the 'media' collection). */
export interface PayloadMedia {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  filename?: string
  mimeType?: string
}

/** A link with label and href. */
export interface LinkField {
  label: string
  href: string
  newTab?: boolean
}

/** Rich text content (Payload Lexical serialized state). */
export type RichText = Record<string, unknown>

// -------------------------------------------------------------------------
// Navigation
// -------------------------------------------------------------------------

export interface NavbarBlock {
  logo: PayloadMedia | null
  logoText?: string
  links: LinkField[]
  cta?: LinkField | null
}

// -------------------------------------------------------------------------
// Hero
// -------------------------------------------------------------------------

export interface HeroBlock {
  heading: string
  subheading?: string
  description?: RichText
  image?: PayloadMedia | null
  cta?: LinkField | null
}

// -------------------------------------------------------------------------
// Content blocks
// -------------------------------------------------------------------------

export interface FeaturesBlock {
  heading?: string
  description?: string
  items: Array<{
    icon?: string
    title: string
    description: string
  }>
}

export interface ContentBlock {
  heading?: string
  content: RichText
}

export interface StatsBlock {
  heading?: string
  items: Array<{
    value: string
    label: string
  }>
}

export interface DetailsBlock {
  heading: string
  description?: RichText
  image?: PayloadMedia | null
  imagePosition?: 'left' | 'right'
}

export interface TeamBlock {
  heading?: string
  description?: string
  members: Array<{
    name: string
    role: string
    image?: PayloadMedia | null
    bio?: string
    socials?: Array<{
      platform: string
      url: string
    }>
  }>
}

export interface TimelineBlock {
  heading?: string
  items: Array<{
    date: string
    title: string
    description: string
  }>
}

// -------------------------------------------------------------------------
// Social proof
// -------------------------------------------------------------------------

export interface TestimonialsBlock {
  heading?: string
  items: Array<{
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: PayloadMedia | null
  }>
}

export interface LogosBlock {
  heading?: string
  logos: Array<{
    name: string
    image: PayloadMedia
    href?: string
  }>
}

// -------------------------------------------------------------------------
// Commerce
// -------------------------------------------------------------------------

export interface PricingBlock {
  heading?: string
  description?: string
  tiers: Array<{
    name: string
    price: string
    interval?: string
    description?: string
    features: string[]
    cta: LinkField
    highlighted?: boolean
  }>
}

export interface ComparisonBlock {
  heading?: string
  columns: string[]
  features: Array<{
    name: string
    values: Record<string, boolean | string>
  }>
}

// -------------------------------------------------------------------------
// Conversion
// -------------------------------------------------------------------------

export interface CTABlock {
  heading: string
  description?: string
  cta: LinkField
  secondaryCta?: LinkField | null
}

export interface ContactBlock {
  heading?: string
  description?: string
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'textarea'
    required?: boolean
  }>
  submitLabel?: string
}

export interface NewsletterBlock {
  heading?: string
  description?: string
  placeholder?: string
  submitLabel?: string
}

// -------------------------------------------------------------------------
// Structure
// -------------------------------------------------------------------------

export interface FAQBlock {
  heading?: string
  items: Array<{
    question: string
    answer: string
  }>
}

export interface GalleryBlock {
  heading?: string
  images: Array<{
    image: PayloadMedia
    caption?: string
  }>
}

export interface BlogListBlock {
  heading?: string
  showExcerpt?: boolean
  postsPerPage?: number
}

export interface FooterBlock {
  logo?: PayloadMedia | null
  columns: Array<{
    title: string
    links: LinkField[]
  }>
  socials?: Array<{
    platform: string
    url: string
    icon?: string
  }>
  copyright: string
}

// -------------------------------------------------------------------------
// Union type of all blocks (useful for dynamic rendering)
// -------------------------------------------------------------------------

export type AnyBlock =
  | ({ blockType: 'navbar' } & NavbarBlock)
  | ({ blockType: 'hero' } & HeroBlock)
  | ({ blockType: 'features' } & FeaturesBlock)
  | ({ blockType: 'content' } & ContentBlock)
  | ({ blockType: 'stats' } & StatsBlock)
  | ({ blockType: 'details' } & DetailsBlock)
  | ({ blockType: 'team' } & TeamBlock)
  | ({ blockType: 'timeline' } & TimelineBlock)
  | ({ blockType: 'testimonials' } & TestimonialsBlock)
  | ({ blockType: 'logos' } & LogosBlock)
  | ({ blockType: 'pricing' } & PricingBlock)
  | ({ blockType: 'comparison' } & ComparisonBlock)
  | ({ blockType: 'cta' } & CTABlock)
  | ({ blockType: 'contact' } & ContactBlock)
  | ({ blockType: 'newsletter' } & NewsletterBlock)
  | ({ blockType: 'faq' } & FAQBlock)
  | ({ blockType: 'gallery' } & GalleryBlock)
  | ({ blockType: 'blog-list' } & BlogListBlock)
  | ({ blockType: 'footer' } & FooterBlock)
