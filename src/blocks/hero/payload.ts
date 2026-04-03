import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Heading' },
    { name: 'subheading', type: 'text', label: 'Subheading' },
    { name: 'description', type: 'richText', label: 'Description' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'href', type: 'text', label: 'Button URL' },
      ],
    },
  ],
}
