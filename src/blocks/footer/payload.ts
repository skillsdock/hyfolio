import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',
  labels: { singular: 'Footer', plural: 'Footers' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Column Title' },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Label' },
            { name: 'href', type: 'text', required: true, label: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'GitHub', value: 'github' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
}
