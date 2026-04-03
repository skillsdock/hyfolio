import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    config: 'src/config.ts',
    render: 'src/render.tsx',
    'cli/index': 'src/cli/index.ts',
    'cli/create-entry': 'src/cli/create-entry.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['payload', 'react', 'react-dom'],
  banner: {
    js: '/* hyfolio - Beautiful, CMS-ready website blocks you own */',
  },
})
