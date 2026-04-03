import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true, label: 'Quote' },
        { name: 'authorName', type: 'text', required: true, label: 'Author Name' },
        { name: 'authorRole', type: 'text', label: 'Author Role' },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Photo',
        },
        { name: 'company', type: 'text', label: 'Company' },
      ],
    },
  ],
}
