import type { IconMap } from './types.ts'
import { Buffer } from 'node:buffer'
import { Readable } from 'node:stream'
import svg2ttf from 'svg2ttf'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'
import { compress } from 'wawoff2'
import { readIcon } from './assets.ts'

type IconStream = Readable & { metadata: { name: string, unicode: string[] } }

function svgFont(map: IconMap, fontName: string): Promise<string> {
  const ligatures = new Map<string, string[]>()
  for (const [name, icon] of Object.entries(map))
    ligatures.set(icon, [...(ligatures.get(icon) ?? []), name])

  return new Promise((resolve, reject) => {
    const font = new SVGIcons2SVGFontStream({ fontName, fontHeight: 1024, descent: 0, normalize: true })
    let svg = ''
    font.on('data', (chunk: Buffer | string) => svg += chunk.toString())
    font.on('end', () => resolve(svg))
    font.on('error', reject)
    for (const [icon, names] of ligatures) {
      const glyph = Readable.from([readIcon(icon)]) as IconStream
      glyph.metadata = { name: icon.replace(':', '-'), unicode: names }
      font.write(glyph)
    }
    font.end()
  })
}

export async function buildIconFont(map: IconMap, fontName: string): Promise<Buffer> {
  // A fixed timestamp keeps the font byte-identical between builds, which CI checks.
  const ttf = svg2ttf(await svgFont(map, fontName), { ts: 0 })
  return Buffer.from(await compress(ttf.buffer))
}
