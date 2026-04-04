import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
import { BlogListBlock } from '@/blocks/blog-list/payload'
import { NewsletterBlock } from '@/blocks/newsletter/payload'
import { FooterBlock } from '@/blocks/footer/payload'

export const BlogGlobal: GlobalConfig = {
  slug: 'blog',
  label: 'Blog Page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    { name: 'blogList', type: 'group', label: 'Blog List', fields: BlogListBlock.fields },
    { name: 'newsletter', type: 'group', label: 'Newsletter Signup', fields: NewsletterBlock.fields },
    { name: 'footer', type: 'group', label: 'Footer', fields: FooterBlock.fields },
  ],
}
