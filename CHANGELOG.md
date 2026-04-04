# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-04

### Added

- 19 production-ready blocks: navbar, hero, features, content, stats, details, team, timeline, testimonials, logos, pricing, comparison, cta, contact, newsletter, faq, gallery, blog-list, footer.
- 5 page templates: landing, about, contact, pricing, blog.
- CLI tooling: `create-hyfolio` scaffolding command, plus `hyfolio init`, `hyfolio add`, `hyfolio list`, and `hyfolio build-theme` commands.
- Theme system with 3 built-in presets (minimal, bold, warm) and YAML-based customization.
- shadcn-style architecture where blocks are copied into user projects rather than imported from node_modules.
- Payload CMS integration with automatic patching of payload.config.ts.
- 7 shared primitives: badge, button, card, container, loader, rich-text, section.
- Config-aware import path rewriting to match each project's structure.
- Next.js and Tailwind CSS support.

[0.1.0]: https://github.com/skillsdock/hyfolio/releases/tag/v0.1.0
