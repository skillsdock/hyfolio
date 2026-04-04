import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
import { FeaturesBlock } from '@/blocks/features/payload'
import { StatsBlock } from '@/blocks/stats/payload'
import { TestimonialsBlock } from '@/blocks/testimonials/payload'
import { CTABlock } from '@/blocks/cta/payload'
import { FooterBlock } from '@/blocks/footer/payload'

export const LandingGlobal: GlobalConfig = {
  slug: 'landing',
  label: 'Landing Page',
  access: { read: () => true },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    { name: 'features', type: 'group', label: 'Features Section', fields: FeaturesBlock.fields },
    { name: 'stats', type: 'group', label: 'Stats Section', fields: StatsBlock.fields },
    { name: 'testimonials', type: 'group', label: 'Testimonials Section', fields: TestimonialsBlock.fields },
    { name: 'cta', type: 'group', label: 'Call to Action', fields: CTABlock.fields },
    { name: 'footer', type: 'group', label: 'Footer', fields: FooterBlock.fields },
  ],
}
