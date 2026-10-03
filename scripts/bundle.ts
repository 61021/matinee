import browserslist from 'browserslist'
import { browserslistToTargets, bundle } from 'lightningcss'
import { BROWSERS, ENTRY } from './constants.ts'

const targets = browserslistToTargets(browserslist(BROWSERS))

export function bundleTheme(minify: boolean): string {
  const { code } = bundle({ filename: ENTRY, minify, targets })
  return code.toString()
}
