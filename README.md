# عينك على البحر · Eyes on the Sea

Bilingual (Arabic / English) landing page for the *Eyes on the Sea* marine-education program
(Workshop #6 — Coral Farming Simulation, Pearl Village, Jeddah).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | Purpose |
|---|---|
| `src/lib/i18n.ts` | All page copy in `ar` and `en`. Edit text here. |
| `src/components/LanguageProvider.tsx` | Client context; toggles `lang`/`dir` on `<html>` and remembers the choice in `localStorage`. |
| `src/components/Navbar.tsx` | Sticky header with language switch and mobile menu. |
| `src/components/Sections.tsx` | Hero, Stats, Journey, Teams, Threats, Gallery, Safety, Partners, Register CTA, Footer. |
| `public/photos/` | Workshop photos, resized to 1920px with EXIF/GPS stripped. |

Default language is Arabic (RTL). The `EN / عربي` button in the navbar switches.

## To do

- Wire the **Register** button (`RegisterCta` → `href="#"`) to a real form or registration link.
- Replace partner name cards with logos once provided.
