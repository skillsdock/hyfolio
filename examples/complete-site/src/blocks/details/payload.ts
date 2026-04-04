import type { Block } from 'payload'

export const DetailsBlock: Block = {
  slug: 'details',
  labels: { singular: 'Details', plural: 'Details' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
