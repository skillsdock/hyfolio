# hyfolio Complete Site Example

A working example of a website built with [hyfolio](https://github.com/hyfolio/hyfolio) blocks and templates. This project demonstrates:

- Three page templates: **Landing**, **About**, and **Contact**
- 12 blocks composed into pages via templates
- Payload CMS for content management (SQLite, zero-config)
- The **minimal** theme preset
- Next.js App Router page structure

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open the site:**

   - Site: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

4. **Create an admin user** when prompted on first visit to `/admin`.

5. **Add content** via the admin panel. You will see three globals:
   - **Landing Page** -- hero, features, stats, testimonials, CTA
   - **About Page** -- hero, details, team, timeline, CTA
   - **Contact Page** -- hero, contact form, FAQ

## Project Structure

```
src/
  app/
    layout.tsx              # Root layout (imports theme CSS)
    (site)/
      page.tsx              # Homepage -> LandingPage template
      about/page.tsx        # About -> AboutPage template
      contact/page.tsx      # Contact -> ContactPage template
    (payload)/
      admin/[[...]]/page.tsx  # Payload admin panel
  blocks/                   # Block components + Payload field configs
  templates/                # Page templates (compose blocks)
  lib/hyfolio/              # Theme CSS, types, primitives
payload.config.ts           # Payload config (globals, collections, DB)
hyfolio.theme.yaml          # Design tokens (edit this, run build-theme)
hyfolio.config.ts           # hyfolio project config
```

## Customization

### Changing the theme

Edit `hyfolio.theme.yaml` and run:

```bash
npx hyfolio build-theme
```

This regenerates `src/lib/hyfolio/theme.css` with your new design tokens.

### Adding more blocks

```bash
npx hyfolio add pricing gallery newsletter
```

Then compose them into pages or create new templates.

### Adding a new page

1. Create a new route at `src/app/(site)/pricing/page.tsx`
2. Use an existing template or compose blocks directly:

   ```tsx
   import { PricingPage } from '@/templates/pricing/page'
   export default function Pricing() { return <PricingPage /> }
   ```

## Database

This example uses SQLite (stored at `database.db` in the project root). No database setup required. For PostgreSQL, update `payload.config.ts`:

```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URL },
})
```

## Learn More

- [hyfolio Documentation](https://github.com/hyfolio/hyfolio/tree/main/docs)
- [Getting Started Guide](https://github.com/hyfolio/hyfolio/blob/main/docs/getting-started.md)
- [Block Catalog](https://github.com/hyfolio/hyfolio/blob/main/docs/blocks.md)
- [Theming Guide](https://github.com/hyfolio/hyfolio/blob/main/docs/theming.md)
