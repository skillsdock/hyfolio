import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      minRows: 1,
      fields: [
        { name: 'date', type: 'text', required: true, label: 'Date / Year' },
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
  ],
}
