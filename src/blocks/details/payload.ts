import type { Block } from 'payload'

export const DetailsBlock: Block = {
  slug: 'details',
  labels: { singular: 'Details', plural: 'Details' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Heading' },
    { name: 'description', type: 'richText', label: 'Description' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'imageRight',
      options: [
        { label: 'Image Right', value: 'imageRight' },
        { label: 'Image Left', value: 'imageLeft' },
      ],
    },
  ],
}
