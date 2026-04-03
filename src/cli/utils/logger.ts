import chalk from 'chalk'

export const logger = {
  success(message: string): void {
    process.stdout.write(`${chalk.green('\u2713')} ${message}\n`)
  },

  error(message: string): void {
    process.stderr.write(`${chalk.red('\u2717')} ${message}\n`)
  },

  info(message: string): void {
    process.stdout.write(`${chalk.blue('\u25B6')} ${message}\n`)
  },

  warn(message: string): void {
    process.stdout.write(`${chalk.yellow('\u25B2')} ${message}\n`)
  },

  newline(): void {
    process.stdout.write('\n')
  },

  step(message: string): void {
    process.stdout.write(`  ${chalk.dim('\u2022')} ${message}\n`)
  },

  box(lines: string[]): void {
    process.stdout.write('\n')
    for (const line of lines) {
      process.stdout.write(`  ${line}\n`)
    }
    process.stdout.write('\n')
  },
}
