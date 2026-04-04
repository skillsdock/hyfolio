import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
import { ContactBlock } from '@/blocks/contact/payload'
import { FAQBlock } from '@/blocks/faq/payload'
import { FooterBlock } from '@/blocks/footer/payload'

export const ContactGlobal: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  access: { read: () => true },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    { name: 'contact', type: 'group', label: 'Contact Form', fields: ContactBlock.fields },
    { name: 'faq', type: 'group', label: 'FAQ Section', fields: FAQBlock.fields },
    { name: 'footer', type: 'group', label: 'Footer', fields: FooterBlock.fields },
  ],
}
