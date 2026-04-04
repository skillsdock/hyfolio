# hyfolio

Beautiful, CMS-ready website blocks you own. Add what you need, customize everything.

hyfolio is a [shadcn/ui](https://ui.shadcn.com)-style block system for building Next.js websites with [Payload CMS](https://payloadcms.com). Each block ships with its React component and Payload CMS fields. The CLI copies them into your project -- you own the code.

## Quick Start

```bash
npx create-hyfolio my-site
cd my-site
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000) | Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Add Blocks

```bash
npx hyfolio add hero features pricing cta
```

Each block is 2 files copied into your project:

```
src/blocks/hero/
  component.tsx    # React component (what renders on the page)
  payload.ts       # Payload CMS fields (what the editor sees in admin)
```

You own these files. Edit them freely. Uninstall hyfolio and your project works identically.

## Features

- **20 production-ready blocks** -- navbar, hero, features, stats, testimonials, pricing, comparison, CTA, contact, newsletter, FAQ, gallery, blog-list, team, timeline, details, content, logos, footer
- **5 page templates** -- landing, about, contact, pricing, blog -- pre-composed pages with blocks wired to Payload globals
- **Payload CMS built-in** -- every block has a CMS field config; editors manage content from the admin panel without touching code
- **YAML-based design system** -- one config file controls colors, typography, spacing, radius, shadows, buttons, cards, and more across every block
- **3 theme presets** -- minimal, bold, warm -- pick one and customize from there
- **Dark mode** -- built-in, every preset includes dark mode values
- **Zero runtime dependency** -- hyfolio is a dev tool; after adding blocks, you can uninstall it
- **Shared primitives** -- button, card, badge, loader, container, section -- every block uses them, zero design drift

## Available Blocks

| Category | Blocks |
|----------|--------|
| Navigation | `navbar` |
| Hero | `hero` |
| Content | `features`, `content`, `stats`, `details`, `team`, `timeline` |
| Social Proof | `testimonials`, `logos` |
| Commerce | `pricing`, `comparison` |
| Conversion | `cta`, `contact`, `newsletter` |
| Structure | `faq`, `gallery`, `blog-list`, `footer` |

## Page Templates

Templates are pre-composed pages. One command adds the template plus all required blocks:

```bash
npx hyfolio add template landing
```

| Template | Blocks |
|----------|--------|
| `landing` | navbar, hero, features, stats, testimonials, cta, footer |
| `about` | navbar, hero, details, team, timeline, cta, footer |
| `contact` | navbar, hero, contact, faq, footer |
| `pricing` | navbar, hero, pricing, comparison, faq, cta, footer |
| `blog` | navbar, hero, blog-list, newsletter, footer |

## Theming

All visual decisions live in `hyfolio.theme.yaml`:

```yaml
colors:
  primary: "#2563eb"
  background: "#ffffff"

typography:
  fonts:
    heading: "Inter"

radius:
  md: 0.375rem

buttons:
  radius: md          # References radius.md above
```

Change the YAML, run `npx hyfolio build-theme`, and every block updates. See the [Theming Guide](docs/theming.md).

## CLI Commands

| Command | Description |
|---------|-------------|
| `npx create-hyfolio` | Scaffold a new project |
| `npx hyfolio init` | Initialize in an existing Next.js project |
| `npx hyfolio add <block>` | Add one or more blocks |
| `npx hyfolio add template <name>` | Add a page template + its blocks |
| `npx hyfolio list` | Show available blocks and templates |
| `npx hyfolio build-theme` | Generate CSS from theme YAML |

## Documentation

- [Getting Started](docs/getting-started.md) -- setup guide for new and existing projects
- [Theming](docs/theming.md) -- YAML schema, dark mode, presets, Tailwind integration
- [Blocks](docs/blocks.md) -- every block with fields, usage, and customization
- [Templates](docs/templates.md) -- template compositions and how to use them

## Example

See [`examples/complete-site/`](examples/complete-site/) for a working project using the landing, about, and contact templates with the minimal theme.

## Tech Stack

- [Next.js](https://nextjs.org) 15+ (App Router)
- [Payload CMS](https://payloadcms.com) 3.x (embedded in Next.js)
- [Tailwind CSS](https://tailwindcss.com) 3.4+
- [TypeScript](https://typescriptlang.org)

## License

MIT
