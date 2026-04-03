import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    { name: 'description', type: 'text', label: 'Section Description' },
    {
      name: 'items',
      type: 'array',
      label: 'Questions',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Question' },
        { name: 'answer', type: 'richText', required: true, label: 'Answer' },
      ],
    },
  ],
}
