import type { ContactBlockProps } from '@/lib/hyfolio/types'
import { HyfSection } from '@/lib/hyfolio/primitives/section'
import { HyfContainer } from '@/lib/hyfolio/primitives/container'
import { HyfButton } from '@/lib/hyfolio/primitives/button'

export function ContactBlock({ heading, description, email, phone, address, formFields, submitLabel }: ContactBlockProps) {
  return (
    <HyfSection>
      <HyfContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {heading && (
              <h2 className="text-[length:var(--hyf-text-4xl)] font-[700] tracking-[var(--hyf-tracking-tight)] font-heading text-foreground mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground mb-8">{description}</p>
            )}
            <div className="space-y-4">
              {email && (
                <div>
                  <span className="text-[length:var(--hyf-text-sm)] font-[600] text-foreground">Email</span>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              )}
              {phone && (
                <div>
                  <span className="text-[length:var(--hyf-text-sm)] font-[600] text-foreground">Phone</span>
                  <p className="text-muted-foreground">{phone}</p>
                </div>
              )}
              {address && (
                <div>
                  <span className="text-[length:var(--hyf-text-sm)] font-[600] text-foreground">Address</span>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              )}
            </div>
          </div>
          <form className="space-y-6">
            {formFields?.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-[length:var(--hyf-text-sm)] font-[500] text-foreground mb-2"
                >
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    className="w-full rounded-[var(--hyf-input-radius)] border border-border bg-background px-[var(--hyf-input-padding-x)] py-[var(--hyf-input-padding-y)] text-foreground focus:outline-none focus:ring-[length:var(--hyf-focus-ring-width)] focus:ring-ring"
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    className="w-full rounded-[var(--hyf-input-radius)] border border-border bg-background px-[var(--hyf-input-padding-x)] py-[var(--hyf-input-padding-y)] text-foreground focus:outline-none focus:ring-[length:var(--hyf-focus-ring-width)] focus:ring-ring"
                  />
                )}
              </div>
            ))}
            <HyfButton type="submit" variant="primary">
              {submitLabel ?? 'Send Message'}
            </HyfButton>
          </form>
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
