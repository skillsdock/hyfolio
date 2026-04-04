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
  links: LinkField[]
  cta?: LinkField | null
}

// -------------------------------------------------------------------------
// Hero
// -------------------------------------------------------------------------

export interface HeroBlock {
  heading: string
  subheading?: string
  description?: RichText | string
  image?: PayloadMedia | null
  cta?: LinkField | null
}

// -------------------------------------------------------------------------
// Content blocks
// -------------------------------------------------------------------------

export interface FeaturesBlock {
  heading?: string
  description?: string
  features: Array<{
    icon?: string
    title: string
    description?: string
  }>
}

export interface ContentBlock {
  heading?: string
  body: RichText | string
}

export interface StatsBlock {
  heading?: string
  stats: Array<{
    value: string
    label: string
    prefix?: string
    suffix?: string
  }>
}

export interface DetailsBlock {
  heading: string
  description?: RichText | string
  image?: PayloadMedia | null
  layout?: 'imageRight' | 'imageLeft'
}

export interface TeamBlock {
  heading?: string
  description?: string
  members: Array<{
    name: string
    role?: string
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
    description?: string
  }>
}

// -------------------------------------------------------------------------
// Social proof
// -------------------------------------------------------------------------

export interface TestimonialsBlock {
  heading?: string
  testimonials: Array<{
    quote: string
    authorName: string
    authorRole?: string
    authorImage?: PayloadMedia | null
    company?: string
  }>
}

export interface LogosBlock {
  heading?: string
  logos: Array<{
    image: PayloadMedia
    alt?: string
    href?: string
  }>
}

// -------------------------------------------------------------------------
// Commerce
// -------------------------------------------------------------------------

export interface PricingBlock {
  heading?: string
  description?: string
  plans: Array<{
    name: string
    price: string
    billingPeriod?: string
    features?: Array<{ text: string }>
    cta?: LinkField | null
    highlighted?: boolean
  }>
}

export interface ComparisonBlock {
  heading?: string
  plans: Array<{
    name: string
    highlighted?: boolean
  }>
  features: Array<{
    name: string
    values?: Array<{
      value?: string
      included?: boolean
    }>
  }>
}

// -------------------------------------------------------------------------
// Conversion
// -------------------------------------------------------------------------

export interface CTABlock {
  heading: string
  description?: string
  primaryButton?: LinkField | null
  secondaryButton?: LinkField | null
}

export interface ContactBlock {
  heading?: string
  description?: string
  formConfig?: {
    submitLabel?: string
    successMessage?: string
    fields?: {
      showPhone?: boolean
      showCompany?: boolean
    }
  }
}

export interface NewsletterBlock {
  heading: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
}

// -------------------------------------------------------------------------
// Structure
// -------------------------------------------------------------------------

export interface FAQBlock {
  heading?: string
  description?: string
  items: Array<{
    question: string
    answer: RichText | string
  }>
}

export interface GalleryBlock {
  heading?: string
  images: Array<{
    image: PayloadMedia
    caption?: string
  }>
  columns?: '2' | '3' | '4'
}

export interface BlogListBlock {
  heading?: string
  description?: string
  postsPerPage?: number
  showExcerpt?: boolean
  showDate?: boolean
  showAuthor?: boolean
}

export interface FooterBlock {
  columns?: Array<{
    title: string
    links?: Array<{
      label: string
      href: string
    }>
  }>
  copyright?: string
  socials?: Array<{
    platform: string
    url: string
  }>
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
