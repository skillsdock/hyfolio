import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
import { DetailsBlock } from '@/blocks/details/payload'
import { TeamBlock } from '@/blocks/team/payload'
import { TimelineBlock } from '@/blocks/timeline/payload'
import { CTABlock } from '@/blocks/cta/payload'
import { FooterBlock } from '@/blocks/footer/payload'

export const AboutGlobal: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: { read: () => true },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    { name: 'details', type: 'group', label: 'Details Section', fields: DetailsBlock.fields },
    { name: 'team', type: 'group', label: 'Team Section', fields: TeamBlock.fields },
    { name: 'timeline', type: 'group', label: 'Timeline Section', fields: TimelineBlock.fields },
    { name: 'cta', type: 'group', label: 'Call to Action', fields: CTABlock.fields },
    { name: 'footer', type: 'group', label: 'Footer', fields: FooterBlock.fields },
  ],
}
