/**
 * Payload CMS field factory helpers.
 *
 * These are convenience wrappers that produce Payload field definition objects.
 * They reduce boilerplate when defining block fields and enforce consistency
 * (e.g., image fields always point to the 'media' collection).
 *
 * Uses plain object types instead of importing from 'payload' to avoid
 * requiring payload as a hard runtime dependency of the hyfolio package.
 */

/** Minimal Payload field shape -- enough for the factories to produce valid configs. */
interface PayloadField {
  name: string
  type: string
  [key: string]: unknown
}

/**
 * Create a rich text field.
 *
 * @example
 * ```ts
 * richTextField('description')
 * // => { name: 'description', type: 'richText' }
 *
 * richTextField('content', { required: true })
 * // => { name: 'content', type: 'richText', required: true }
 * ```
 */
export function richTextField(
  name: string,
  overrides: Record<string, unknown> = {}
): PayloadField {
  return {
    name,
    type: 'richText',
    ...overrides,
  }
}

/**
 * Create an image upload field pointing to the 'media' collection.
 *
 * @example
 * ```ts
 * imageField('photo')
 * // => { name: 'photo', type: 'upload', relationTo: 'media' }
 * ```
 */
export function imageField(
  name: string,
  overrides: Record<string, unknown> = {}
): PayloadField {
  return {
    name,
    type: 'upload',
    relationTo: 'media',
    ...overrides,
  }
}

/**
 * Create a link group field with label, href, and newTab sub-fields.
 *
 * @example
 * ```ts
 * linkField('cta')
 * // => { name: 'cta', type: 'group', fields: [...] }
 * ```
 */
export function linkField(
  name: string,
  overrides: Record<string, unknown> = {}
): PayloadField & { fields: PayloadField[] } {
  return {
    name,
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
      { name: 'newTab', type: 'checkbox', defaultValue: false },
    ],
    ...overrides,
  }
}

/**
 * Create a group field wrapping multiple child fields.
 *
 * @example
 * ```ts
 * groupField('metadata', [
 *   { name: 'title', type: 'text' },
 *   { name: 'description', type: 'text' },
 * ])
 * ```
 */
export function groupField(
  name: string,
  fields: PayloadField[],
  overrides: Record<string, unknown> = {}
): PayloadField & { fields: PayloadField[] } {
  return {
    name,
    type: 'group',
    fields: [...fields],
    ...overrides,
  }
}
