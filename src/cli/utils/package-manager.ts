import fs from 'fs-extra'
import path from 'path'

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

const LOCKFILE_MAP: Array<{ file: string; pm: PackageManager }> = [
  { file: 'bun.lockb', pm: 'bun' },
  { file: 'bun.lock', pm: 'bun' },
  { file: 'pnpm-lock.yaml', pm: 'pnpm' },
  { file: 'yarn.lock', pm: 'yarn' },
  { file: 'package-lock.json', pm: 'npm' },
]

export function detectPackageManager(projectDir: string): PackageManager {
  for (const { file, pm } of LOCKFILE_MAP) {
    if (fs.existsSync(path.join(projectDir, file))) {
      return pm
    }
  }
  return 'npm'
}

export function getInstallCommand(pm: PackageManager): string {
  const commands: Record<PackageManager, string> = {
    npm: 'npm install',
    yarn: 'yarn',
    pnpm: 'pnpm install',
    bun: 'bun install',
  }
  return commands[pm]
}

export function getAddCommand(pm: PackageManager, packages: string[]): string {
  const pkgList = packages.join(' ')
  const commands: Record<PackageManager, string> = {
    npm: `npm install ${pkgList}`,
    yarn: `yarn add ${pkgList}`,
    pnpm: `pnpm add ${pkgList}`,
    bun: `bun add ${pkgList}`,
  }
  return commands[pm]
}

export function getRunCommand(pm: PackageManager): string {
  const commands: Record<PackageManager, string> = {
    npm: 'npm run',
    yarn: 'yarn',
    pnpm: 'pnpm',
    bun: 'bun run',
  }
  return commands[pm]
}
