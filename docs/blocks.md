# Block Catalog

hyfolio ships with 20 production-ready blocks. Each block is 2 files:

- `component.tsx` -- the React component that renders on the page
- `payload.ts` -- the Payload CMS field config that the admin panel renders

Add any block with:

```bash
npx hyfolio add <block-name>
```

---

## Navigation

### navbar

Navigation bar with logo, links, and optional CTA button.

```bash
npx hyfolio add navbar
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `logoText` | text | No | Text-based logo |
| `logo` | upload (media) | No | Logo image |
| `links` | array | No | Navigation links |
| `links.label` | text | Yes | Link display text |
| `links.href` | text | Yes | Link URL |
| `cta` | group | No | Call-to-action button |
| `cta.label` | text | No | Button text |
| `cta.href` | text | No | Button URL |

**Usage:**

```tsx
import { NavbarBlock } from '@/blocks/navbar/component'

<NavbarBlock
  logoText="My Site"
  links={[
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]}
  cta={{ label: 'Get Started', href: '/signup' }}
/>
```

---

## Hero

### hero

Full-width hero section with heading, subheading, optional image, and CTA.

```bash
npx hyfolio add hero
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | Yes | Main headline |
| `subheading` | text | No | Supporting text below heading |
| `description` | richText | No | Rich text content |
| `image` | upload (media) | No | Hero background or side image |
| `cta` | group | No | Call-to-action button |

**Usage:**

```tsx
import { HeroBlock } from '@/blocks/hero/component'

<HeroBlock
  heading="Build faster with hyfolio"
  subheading="Beautiful, CMS-ready blocks you own."
  cta={{ label: 'Get Started', href: '/docs' }}
/>
```

---

## Content

### features

Feature grid with optional icons, titles, and descriptions.

```bash
npx hyfolio add features
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `subheading` | text | No | Section subheading |
| `features` | array | No | Feature items |
| `features.icon` | text | No | Icon (emoji or icon name) |
| `features.title` | text | Yes | Feature title |
| `features.description` | text | Yes | Feature description |

### content

General-purpose rich text content block.

```bash
npx hyfolio add content
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `content` | richText | Yes | Rich text body |

### stats

Statistic counters displayed in a grid.

```bash
npx hyfolio add stats
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `stats` | array | No | Stat items |
| `stats.value` | text | Yes | The number or value (e.g., "500+") |
| `stats.label` | text | Yes | Label below the value |
| `stats.description` | text | No | Additional context |

### details

Text and media split layout for detailed content sections.

```bash
npx hyfolio add details
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `content` | richText | No | Rich text body |
| `image` | upload (media) | No | Side image |
| `imagePosition` | select | No | `left` or `right` (default: `right`) |

### team

Team member cards with photo, name, role, and bio.

```bash
npx hyfolio add team
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `subheading` | text | No | Section subheading |
| `members` | array | No | Team members |
| `members.name` | text | Yes | Full name |
| `members.role` | text | Yes | Job title |
| `members.bio` | text | No | Short biography |
| `members.photo` | upload (media) | No | Profile photo |

### timeline

Chronological events displayed in an alternating timeline layout.

```bash
npx hyfolio add timeline
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `events` | array | No | Timeline events |
| `events.year` | text | Yes | Year or date label |
| `events.title` | text | Yes | Event title |
| `events.description` | text | Yes | Event description |

---

## Social Proof

### testimonials

Customer testimonial cards with quote, author, and optional avatar.

```bash
npx hyfolio add testimonials
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `testimonials` | array | No | Testimonial items |
| `testimonials.quote` | textarea | Yes | The testimonial text |
| `testimonials.author` | text | Yes | Author name |
| `testimonials.role` | text | No | Author's role |
| `testimonials.company` | text | No | Author's company |
| `testimonials.avatar` | upload (media) | No | Author photo |

### logos

Client/partner logo strip for brand credibility.

```bash
npx hyfolio add logos
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading (e.g., "Trusted by") |
| `logos` | array | No | Logo images |
| `logos.image` | upload (media) | Yes | Logo image |
| `logos.alt` | text | Yes | Alt text |
| `logos.href` | text | No | Optional link URL |

---

## Commerce

### pricing

Pricing tier cards with features, price, and CTA.

```bash
npx hyfolio add pricing
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `subheading` | text | No | Section subheading |
| `tiers` | array | No | Pricing tiers |
| `tiers.name` | text | Yes | Tier name (e.g., "Pro") |
| `tiers.price` | text | Yes | Price display (e.g., "$29/mo") |
| `tiers.description` | text | No | Tier description |
| `tiers.features` | array | No | Feature list items |
| `tiers.features.text` | text | Yes | Feature text |
| `tiers.features.included` | checkbox | No | Whether included |
| `tiers.cta` | group | No | CTA button |
| `tiers.highlighted` | checkbox | No | Visually emphasize this tier |

### comparison

Feature comparison table across plans or products.

```bash
npx hyfolio add comparison
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `columns` | array | No | Plan/product columns |
| `columns.name` | text | Yes | Column header |
| `rows` | array | No | Feature rows |
| `rows.feature` | text | Yes | Feature name |
| `rows.values` | array | No | Values per column (text or boolean) |

---

## Conversion

### cta

Call-to-action banner with heading, description, and up to 2 buttons.

```bash
npx hyfolio add cta
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | Yes | CTA headline |
| `description` | text | No | Supporting text |
| `primaryCta` | group | No | Primary button |
| `primaryCta.label` | text | No | Button text |
| `primaryCta.href` | text | No | Button URL |
| `secondaryCta` | group | No | Secondary button |

### contact

Contact form with customizable fields and contact information display.

```bash
npx hyfolio add contact
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `description` | text | No | Introductory text |
| `email` | text | No | Contact email |
| `phone` | text | No | Contact phone |
| `address` | text | No | Physical address |
| `formFields` | array | No | Form field definitions |
| `formFields.name` | text | Yes | Field name (used as form key) |
| `formFields.label` | text | Yes | Display label |
| `formFields.type` | select | Yes | `text`, `email`, or `textarea` |
| `formFields.required` | checkbox | No | Whether field is required |
| `submitLabel` | text | No | Submit button text |

### newsletter

Email signup form with heading and description.

```bash
npx hyfolio add newsletter
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `description` | text | No | Supporting text |
| `placeholder` | text | No | Input placeholder text |
| `submitLabel` | text | No | Button text |

---

## Structure

### faq

Collapsible FAQ accordion using `<details>` elements.

```bash
npx hyfolio add faq
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `items` | array | No | FAQ items |
| `items.question` | text | Yes | The question |
| `items.answer` | textarea | Yes | The answer |

### gallery

Image grid or masonry layout for portfolios and showcases.

```bash
npx hyfolio add gallery
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `images` | array | No | Gallery images |
| `images.image` | upload (media) | Yes | The image |
| `images.caption` | text | No | Image caption |
| `columns` | select | No | Grid columns: `2`, `3`, or `4` (default: `3`) |

### blog-list

Blog post listing with title, excerpt, date, and optional image.

```bash
npx hyfolio add blog-list
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heading` | text | No | Section heading |
| `postsPerPage` | number | No | Posts to display (default: 6) |

The blog-list block queries the `posts` collection automatically. Create a `posts` collection in Payload with `title`, `excerpt`, `publishedAt`, and `featuredImage` fields.

### footer

Site footer with logo, description, link columns, copyright, and social links.

```bash
npx hyfolio add footer
```

**Payload Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `logoText` | text | No | Text logo |
| `logo` | upload (media) | No | Logo image |
| `description` | text | No | Company description |
| `columns` | array | No | Link columns |
| `columns.title` | text | Yes | Column heading |
| `columns.links` | array | No | Links in column |
| `columns.links.label` | text | Yes | Link text |
| `columns.links.href` | text | Yes | Link URL |
| `copyright` | text | No | Copyright notice |
| `socialLinks` | array | No | Social media links |
| `socialLinks.platform` | text | Yes | Platform name |
| `socialLinks.href` | text | Yes | Profile URL |

---

## Customization Tips

### Editing block components

Every block component is a standard React component in your project. Common customizations:

- **Change layout:** Edit the JSX structure and Tailwind classes
- **Add animations:** Add Framer Motion or CSS transitions
- **Change responsive breakpoints:** Modify the Tailwind grid classes
- **Add conditional rendering:** Wrap sections in `{condition && ...}`

### Editing Payload fields

Add, remove, or modify fields in `payload.ts`:

```typescript
// Add a new field to the hero block
fields: [
  { name: 'heading', type: 'text', required: true },
  { name: 'subheading', type: 'text' },
  { name: 'alignment', type: 'select', options: ['left', 'center', 'right'] },  // NEW
  // ...
]
```

After changing Payload fields, regenerate types:

```bash
npm run generate:types
```

Then update the component to use the new field.
