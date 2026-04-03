import type { Block } from 'payload'

export const LogosBlock: Block = {
  slug: 'logos',
  labels: { singular: 'Logos', plural: 'Logos' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    {
      name: 'logos',
      type: 'array',
      label: 'Client Logos',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        { name: 'alt', type: 'text', label: 'Alt Text' },
        { name: 'href', type: 'text', label: 'Link URL (optional)' },
      ],
    },
  ],
}
