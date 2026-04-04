import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Contact', plural: 'Contacts' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'text' },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
          ],
        },
        { name: 'required', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'submitLabel', type: 'text', label: 'Submit Button Label' },
  ],
}
