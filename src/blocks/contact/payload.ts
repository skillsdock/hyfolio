import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Contact', plural: 'Contacts' },
  fields: [
    { name: 'heading', type: 'text', label: 'Heading' },
    { name: 'description', type: 'text', label: 'Description' },
    {
      name: 'formConfig',
      type: 'group',
      label: 'Form Configuration',
      fields: [
        { name: 'submitLabel', type: 'text', label: 'Submit Button Text', defaultValue: 'Send Message' },
        { name: 'successMessage', type: 'text', label: 'Success Message', defaultValue: 'Thank you! We will be in touch.' },
        {
          name: 'fields',
          type: 'group',
          label: 'Field Visibility',
          fields: [
            { name: 'showPhone', type: 'checkbox', label: 'Show Phone Field', defaultValue: true },
            { name: 'showCompany', type: 'checkbox', label: 'Show Company Field', defaultValue: false },
          ],
        },
      ],
    },
  ],
}
