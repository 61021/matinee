import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ASSETS = join(import.meta.dirname, '../../node_modules/@phosphor-icons/core/assets')

export function svgFile(icon: string): string {
  const [name, weight = 'regular'] = icon.split(':')
  return weight === 'regular'
    ? join(ASSETS, 'regular', `${name}.svg`)
    : join(ASSETS, weight, `${name}-${weight}.svg`)
}

export function readIcon(icon: string): string {
  return readFileSync(svgFile(icon), 'utf8')
}

export function missingIcons(icons: string[]): string[] {
  return icons.filter(icon => !existsSync(svgFile(icon)))
}
