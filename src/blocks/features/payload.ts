import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Features', plural: 'Features' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    { name: 'description', type: 'text', label: 'Section Description' },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'text', label: 'Icon Name' },
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
  ],
}
