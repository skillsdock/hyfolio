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
