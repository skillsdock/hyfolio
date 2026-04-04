/** Shared media type from Payload uploads */
export interface HyfMedia {
  url: string
  alt: string
  width?: number
  height?: number
}

/** Rich text content from Payload Lexical editor */
export type HyfRichText = Record<string, unknown>

/** Link/CTA field */
export interface HyfLink {
  label: string
  href: string
}

/** Navbar block props */
export interface NavbarBlockProps {
  logo?: HyfMedia
  logoText?: string
  links: Array<{ label: string; href: string }>
  cta?: HyfLink
}

/** Hero block props */
export interface HeroBlockProps {
  heading: string
  subheading?: string
  description?: HyfRichText
  image?: HyfMedia
  cta?: HyfLink
}

/** Features block props */
export interface FeaturesBlockProps {
  heading?: string
  subheading?: string
  features: Array<{
    icon?: string
    title: string
    description: string
  }>
}

/** Stats block props */
export interface StatsBlockProps {
  heading?: string
  stats: Array<{
    value: string
    label: string
    description?: string
  }>
}

/** Testimonials block props */
export interface TestimonialsBlockProps {
  heading?: string
  testimonials: Array<{
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: HyfMedia
  }>
}

/** CTA block props */
export interface CTABlockProps {
  heading: string
  description?: string
  primaryCta?: HyfLink
  secondaryCta?: HyfLink
}

/** Footer block props */
export interface FooterBlockProps {
  logo?: HyfMedia
  logoText?: string
  description?: string
  columns: Array<{
    title: string
    links: Array<{ label: string; href: string }>
  }>
  copyright?: string
  socialLinks?: Array<{ platform: string; href: string }>
}

/** Details block props (text + media split) */
export interface DetailsBlockProps {
  heading?: string
  content?: HyfRichText
  image?: HyfMedia
  imagePosition?: 'left' | 'right'
}

/** Team block props */
export interface TeamBlockProps {
  heading?: string
  subheading?: string
  members: Array<{
    name: string
    role: string
    bio?: string
    photo?: HyfMedia
  }>
}

/** Timeline block props */
export interface TimelineBlockProps {
  heading?: string
  events: Array<{
    year: string
    title: string
    description: string
  }>
}

/** Contact block props */
export interface ContactBlockProps {
  heading?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  formFields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'textarea'
    required?: boolean
  }>
  submitLabel?: string
}

/** FAQ block props */
export interface FAQBlockProps {
  heading?: string
  items: Array<{
    question: string
    answer: string
  }>
}
