import type { Block } from 'payload'

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Heading' },
    { name: 'description', type: 'text', label: 'Description' },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'href', type: 'text', label: 'Button URL' },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'href', type: 'text', label: 'Button URL' },
      ],
    },
  ],
}
