import type { Block } from 'payload'

export const NewsletterBlock: Block = {
  slug: 'newsletter',
  labels: { singular: 'Newsletter', plural: 'Newsletters' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Heading' },
    { name: 'description', type: 'text', label: 'Description' },
    {
      name: 'placeholder',
      type: 'text',
      label: 'Email Placeholder',
      defaultValue: 'Enter your email',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Success Message',
      defaultValue: 'Thanks for subscribing!',
    },
  ],
}
