import type { Block } from 'payload'

export const ComparisonBlock: Block = {
  slug: 'comparison',
  labels: { singular: 'Comparison', plural: 'Comparisons' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    {
      name: 'plans',
      type: 'array',
      label: 'Plan Columns',
      minRows: 2,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Plan Name' },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Highlight this column',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Rows',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Feature Name' },
        {
          name: 'values',
          type: 'array',
          label: 'Values per Plan',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value (text, checkmark, or dash)',
            },
            {
              name: 'included',
              type: 'checkbox',
              label: 'Included',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
