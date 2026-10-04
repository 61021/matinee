# Matinee

A cinematic theme for Jellyfin 12, made for the new interface.

Full-bleed artwork on every show and movie page, title logos instead of plain text, Phosphor icons everywhere, Geist for the type, and one amber accent instead of Jellyfin blue, on desktop and phone, in dark and light.

## Install

Open **Dashboard → General → Custom CSS**, paste this line, save and refresh:

```css
@import url('https://cdn.jsdelivr.net/gh/61021/matinee@0/dist/matinee.css');
```

`@0` follows every 0.x release, if you'd rather update by hand pin a version like `@0.1.0` instead.

## Make it yours

Add any of these under the import line:

```css
:root[data-theme] {
  --matinee-accent: #e5484d;
  --jf-card-borderRadius: 6px;
  --matinee-card-hover: none;
  --matinee-font: 'Noto Sans', sans-serif;
}
```

| Variable                  | Default                     | Changes                                        |
| ------------------------- | --------------------------- | ---------------------------------------------- |
| `--matinee-accent`        | `#f2b84b`                   | Progress bars, badges, sliders, favorites      |
| `--jf-card-borderRadius`  | `12px`                      | Card corners                                   |
| `--matinee-card-hover`    | `scale(1.04)`               | The card lift on hover, `none` turns it off    |
| `--matinee-button-radius` | `999px`                     | Round buttons on detail pages                  |
| `--matinee-hero-height`   | `max(62vh, 440px)`          | How much artwork shows on desktop detail pages |
| `--matinee-font`          | Geist, IBM Plex Sans Arabic | The whole UI font                              |

## Good to know

- Made and tested on Jellyfin 12.1 in the web client.
- The full-bleed artwork on desktop needs a window at least 1000px wide, that's Jellyfin's own rule, smaller windows get the phone layout's artwork instead.
- Icons are inlined in the CSS, fonts load from jsDelivr through Fontsource.

## Development

```bash
pnpm install
```

```bash
pnpm dev
```

Then point your server's Custom CSS at `@import url("http://127.0.0.1:5178/matinee.css");`, the file rebuilds on every request so a refresh shows your change. `pnpm build` writes `dist/matinee.css`, and the icon maps live in `scripts/icons/`.

## Credits

[Phosphor Icons](https://phosphoricons.com) (MIT), [Geist](https://vercel.com/font) (OFL), [IBM Plex Sans Arabic](https://github.com/IBM/plex) (OFL).

## License

MIT
