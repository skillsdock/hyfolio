import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    config: 'src/config.ts',
    render: 'src/render.tsx',
    cli: 'src/cli/index.ts',
    create: 'src/cli/create.ts',
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
