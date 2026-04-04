import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
import { PricingBlock } from '@/blocks/pricing/payload'
import { ComparisonBlock } from '@/blocks/comparison/payload'
import { FAQBlock } from '@/blocks/faq/payload'
import { CTABlock } from '@/blocks/cta/payload'
import { FooterBlock } from '@/blocks/footer/payload'

export const PricingGlobal: GlobalConfig = {
  slug: 'pricing',
  label: 'Pricing Page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    { name: 'pricing', type: 'group', label: 'Pricing Section', fields: PricingBlock.fields },
    { name: 'comparison', type: 'group', label: 'Feature Comparison', fields: ComparisonBlock.fields },
    { name: 'faq', type: 'group', label: 'FAQ Section', fields: FAQBlock.fields },
    { name: 'cta', type: 'group', label: 'Call to Action', fields: CTABlock.fields },
    { name: 'footer', type: 'group', label: 'Footer', fields: FooterBlock.fields },
  ],
}
