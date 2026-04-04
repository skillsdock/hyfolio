import type { Block } from 'payload'

export const NavbarBlock: Block = {
  slug: 'navbar',
  labels: { singular: 'Navbar', plural: 'Navbars' },
  fields: [
    { name: 'logoText', type: 'text', label: 'Logo Text' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Image' },
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
