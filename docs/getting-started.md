# Getting Started

This guide walks you through creating a new website with hyfolio, or adding hyfolio to an existing Next.js project.

## Prerequisites

- **Node.js 18+** ([download](https://nodejs.org))
- Basic knowledge of **Next.js** and **React**
- A package manager: npm, yarn, pnpm, or bun

## Option A: New Project (Recommended)

### 1. Create your project

```bash
npx create-hyfolio my-site
```

The CLI prompts you for:

| Prompt | Options | Default |
|--------|---------|---------|
| Database | PostgreSQL / SQLite | SQLite |
| Theme preset | minimal / bold / warm | minimal |
| Include example blocks? | Yes (hero + features + cta) / No | Yes |

### 2. Start developing

```bash
cd my-site
npm run dev
```

### 3. Open your site

- **Site:** [http://localhost:3000](http://localhost:3000)
- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, Payload prompts you to create an admin user.

### 4. Add content

In the admin panel, click any registered global (e.g., "Home") and fill in content for each block section. Click "Save" and visit the site to see your changes.

## Option B: Existing Project

### 1. Initialize hyfolio

In your existing Next.js project root:

```bash
npx hyfolio init
```

This will:

- Detect if Payload CMS is installed (installs it if not)
- Create `hyfolio.config.ts` with your project's directory structure
- Create `hyfolio.theme.yaml` with the minimal theme preset
- Set up `src/lib/hyfolio/` with shared types, primitives, and generated theme CSS
- Update `tailwind.config.ts` to extend the hyfolio preset (if using Tailwind)

### 2. Verify the config

Open `hyfolio.config.ts` and confirm the paths match your project:

```typescript
import { defineConfig } from 'hyfolio'

export default defineConfig({
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: {
    framework: 'tailwind',
    theme: 'hyfolio.theme.yaml',
  },
  payload: 'payload.config.ts',
})
```

Adjust paths if your project uses a different structure.

## Adding Blocks

### Single block

```bash
npx hyfolio add hero
```

This copies two files into your project:

```
src/blocks/hero/
  component.tsx    # React component
  payload.ts       # Payload CMS field config
```

It also:
- Registers the block's fields in `payload.config.ts`
- Installs any missing npm dependencies
- Copies shared utilities (types, primitives) if not already present

### Multiple blocks

```bash
npx hyfolio add hero features pricing cta footer
```

### See what is available

```bash
npx hyfolio list
```

## Adding Templates

Templates add a pre-composed page plus all the blocks it needs:

```bash
npx hyfolio add template landing
```

This adds:
- All required blocks (hero, features, stats, testimonials, cta, footer, navbar) -- skipping any you already have
- `src/templates/landing/page.tsx` -- the page component
- `src/templates/landing/payload.ts` -- the Payload global config
- Registers the global in `payload.config.ts`

### Using a template in your route

```tsx
// src/app/(site)/page.tsx
import { LandingPage } from '@/templates/landing/page'

export default function Home() {
  return <LandingPage />
}
```

## Customizing the Theme

### 1. Edit the YAML

Open `hyfolio.theme.yaml` and change any value:

```yaml
colors:
  primary: "#dc2626"     # Changed from blue to red

radius:
  md: 0.5rem             # Rounder corners
```

### 2. Rebuild

```bash
npx hyfolio build-theme
```

This regenerates `src/lib/hyfolio/theme.css`. Every block and primitive that references these CSS variables updates automatically.

During development, `build-theme` runs automatically on file changes when you use `npm run dev`.

See the [Theming Guide](theming.md) for the full YAML schema reference.

## Customizing Blocks

You own every file. Open any block component and edit it:

```
src/blocks/hero/component.tsx
```

There is no abstraction layer or runtime dependency. Edit the JSX, change the Tailwind classes, restructure the HTML, add animations -- it is your code.

## Deployment

hyfolio projects are standard Next.js apps. Deploy anywhere Next.js runs:

- **Vercel:** `vercel deploy`
- **Docker:** standard Next.js Dockerfile
- **Node.js:** `npm run build && npm start`

For production databases, switch from SQLite to PostgreSQL in `payload.config.ts`. See the [example project](../examples/complete-site/README.md#database) for details.

## Next Steps

- [Theming Guide](theming.md) -- full YAML schema, dark mode, creating custom presets
- [Block Catalog](blocks.md) -- every block with fields and usage examples
- [Template Catalog](templates.md) -- all 5 templates and their block compositions
