import type { Block } from 'payload'

export const BlogListBlock: Block = {
  slug: 'blog-list',
  labels: { singular: 'Blog List', plural: 'Blog Lists' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    { name: 'description', type: 'text', label: 'Section Description' },
    {
      name: 'postsPerPage',
      type: 'number',
      label: 'Posts Per Page',
      defaultValue: 6,
      min: 1,
      max: 24,
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      label: 'Show Excerpt',
      defaultValue: true,
    },
    {
      name: 'showDate',
      type: 'checkbox',
      label: 'Show Date',
      defaultValue: true,
    },
    {
      name: 'showAuthor',
      type: 'checkbox',
      label: 'Show Author',
      defaultValue: true,
    },
  ],
}
