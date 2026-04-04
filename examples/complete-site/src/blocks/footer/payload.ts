import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',
  labels: { singular: 'Footer', plural: 'Footers' },
  fields: [
    { name: 'logoText', type: 'text', label: 'Logo Text' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Image' },
    { name: 'description', type: 'text' },
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'copyright', type: 'text' },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
