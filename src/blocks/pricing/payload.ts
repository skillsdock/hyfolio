import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  labels: { singular: 'Pricing', plural: 'Pricing' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    { name: 'description', type: 'text', label: 'Section Description' },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Plan Name' },
        { name: 'price', type: 'text', required: true, label: 'Price' },
        { name: 'billingPeriod', type: 'text', label: 'Billing Period (e.g. /month)' },
        {
          name: 'features',
          type: 'array',
          label: 'Feature List',
          fields: [
            { name: 'text', type: 'text', required: true, label: 'Feature' },
          ],
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
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Highlight this plan',
          defaultValue: false,
        },
      ],
    },
  ],
}
