import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'prefix', type: 'text', label: 'Prefix (e.g. $)' },
        { name: 'suffix', type: 'text', label: 'Suffix (e.g. +, %)' },
      ],
    },
  ],
}
