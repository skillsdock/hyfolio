import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    { name: 'heading', type: 'text', label: 'Section Heading' },
    { name: 'description', type: 'text', label: 'Section Description' },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Name' },
        { name: 'role', type: 'text', label: 'Role / Title' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
        { name: 'bio', type: 'textarea', label: 'Bio' },
        {
          name: 'socials',
          type: 'array',
          label: 'Social Links',
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'Website', value: 'website' },
              ],
            },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
      ],
    },
  ],
}
