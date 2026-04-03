import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content', plural: 'Contents' },
  fields: [
    { name: 'heading', type: 'text', label: 'Heading' },
    { name: 'body', type: 'richText', required: true, label: 'Body Content' },
  ],
}
