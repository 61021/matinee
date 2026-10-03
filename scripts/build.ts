import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import pkg from '../package.json' with { type: 'json' }
import { bundleTheme } from './bundle.ts'
import { OUT_FILE } from './constants.ts'

const banner = `/*! Matinee ${pkg.version} | MIT | github.com/61021/matinee */\n`

mkdirSync(dirname(OUT_FILE), { recursive: true })
writeFileSync(OUT_FILE, banner + bundleTheme(true))
console.log(`Built ${OUT_FILE}`)
