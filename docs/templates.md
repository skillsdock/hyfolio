# Template Catalog

Templates are pre-composed pages -- a curated arrangement of blocks with a page component and Payload global config.

Add a template with:

```bash
npx hyfolio add template <name>
```

This adds all required blocks (skipping any already present), creates the page component and Payload global, and registers the global in your `payload.config.ts`.

---

## How Templates Work

Each template creates 2 files in your project:

```
src/templates/<name>/
  page.tsx      # Async React component that fetches content and renders blocks
  payload.ts    # Payload GlobalConfig defining content fields for each block
```

### Page component pattern

```tsx
// src/templates/landing/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
// ... more block imports

export async function LandingPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'landing' })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      {/* ... more blocks */}
    </>
  )
}
```

### Payload global pattern

```typescript
// src/templates/landing/payload.ts
import type { GlobalConfig } from 'payload'
import { NavbarBlock } from '@/blocks/navbar/payload'
import { HeroBlock } from '@/blocks/hero/payload'
// ... more block imports

export const LandingGlobal: GlobalConfig = {
  slug: 'landing',
  label: 'Landing Page',
  access: { read: () => true },
  fields: [
    { name: 'navbar', type: 'group', label: 'Navigation Bar', fields: NavbarBlock.fields },
    { name: 'hero', type: 'group', label: 'Hero Section', fields: HeroBlock.fields },
    // ... more block field groups
  ],
}
```

### Using a template in your route

```tsx
// src/app/(site)/page.tsx
import { LandingPage } from '@/templates/landing/page'

export default function Home() {
  return <LandingPage />
}
```

---

## Landing

A complete landing page for marketing sites and product launches.

```bash
npx hyfolio add template landing
```

**Blocks (in order):**

| Order | Block | Section |
|-------|-------|---------|
| 1 | `navbar` | Navigation bar with logo and links |
| 2 | `hero` | Full-width hero with heading, subheading, CTA |
| 3 | `features` | Feature grid highlighting key benefits |
| 4 | `stats` | Number counters for social proof |
| 5 | `testimonials` | Customer testimonial cards |
| 6 | `cta` | Call-to-action banner |
| 7 | `footer` | Site footer with links and copyright |

**Payload Global Slug:** `landing`

**Admin Panel:** Editors see "Landing Page" with 7 grouped sections. Each section contains the fields defined by that block.

---

## About

Tell your company story with team profiles and a timeline.

```bash
npx hyfolio add template about
```

**Blocks (in order):**

| Order | Block | Section |
|-------|-------|---------|
| 1 | `navbar` | Navigation bar |
| 2 | `hero` | Page hero with heading |
| 3 | `details` | Text and media split for company story |
| 4 | `team` | Team member cards with photos and bios |
| 5 | `timeline` | Company history in chronological order |
| 6 | `cta` | Call-to-action |
| 7 | `footer` | Site footer |

**Payload Global Slug:** `about`

---

## Contact

Contact form with company information and FAQ.

```bash
npx hyfolio add template contact
```

**Blocks (in order):**

| Order | Block | Section |
|-------|-------|---------|
| 1 | `navbar` | Navigation bar |
| 2 | `hero` | Page hero with heading |
| 3 | `contact` | Contact form + contact details |
| 4 | `faq` | Frequently asked questions |
| 5 | `footer` | Site footer |

**Payload Global Slug:** `contact`

---

## Pricing

Present your plans with detailed comparison and FAQ.

```bash
npx hyfolio add template pricing
```

**Blocks (in order):**

| Order | Block | Section |
|-------|-------|---------|
| 1 | `navbar` | Navigation bar |
| 2 | `hero` | Page hero with heading |
| 3 | `pricing` | Pricing tier cards |
| 4 | `comparison` | Feature comparison table |
| 5 | `faq` | Frequently asked questions |
| 6 | `cta` | Call-to-action |
| 7 | `footer` | Site footer |

**Payload Global Slug:** `pricing`

---

## Blog

Blog listing page with newsletter signup.

```bash
npx hyfolio add template blog
```

**Blocks (in order):**

| Order | Block | Section |
|-------|-------|---------|
| 1 | `navbar` | Navigation bar |
| 2 | `hero` | Page hero with heading |
| 3 | `blog-list` | Blog post listing grid |
| 4 | `newsletter` | Email newsletter signup |
| 5 | `footer` | Site footer |

**Payload Global Slug:** `blog`

**Note:** The `blog-list` block queries a `posts` collection. You need to create this collection in your `payload.config.ts`:

```typescript
collections: [
  {
    slug: 'posts',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'excerpt', type: 'text' },
      { name: 'content', type: 'richText' },
      { name: 'publishedAt', type: 'date' },
      { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    ],
  },
  // ... other collections
]
```

---

## Customizing Templates

### Changing block order

Edit the template's `page.tsx`. Blocks render in the order they appear in JSX:

```tsx
// Move testimonials above features
<NavbarBlock {...content.navbar} />
<HeroBlock {...content.hero} />
<TestimonialsBlock {...content.testimonials} />  {/* Moved up */}
<FeaturesBlock {...content.features} />           {/* Moved down */}
<CTABlock {...content.cta} />
<FooterBlock {...content.footer} />
```

### Adding blocks to a template

1. Add the block: `npx hyfolio add gallery`
2. Import it in the template's `page.tsx`
3. Add its field group in the template's `payload.ts`
4. Render it in the desired position

### Removing blocks from a template

1. Remove the import and JSX from `page.tsx`
2. Remove the field group from `payload.ts`
3. The block files remain in `src/blocks/` for use elsewhere

### Creating a custom template

Create your own template by composing blocks:

1. Create `src/templates/services/page.tsx`
2. Create `src/templates/services/payload.ts`
3. Import and arrange blocks in the page component
4. Define field groups in the Payload global config
5. Register the global in `payload.config.ts`
6. Create a route that renders your template

Templates are just conventions -- two files that compose blocks. There is no special framework magic.
