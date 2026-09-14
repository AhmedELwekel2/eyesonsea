# عينك على البحر · Eyes on the Sea

Arabic (RTL) institutional landing page for the *Eyes on the Sea* initiative, under Jeddah Governorate's
«لنبادر» volunteering & community-partnership program.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | Purpose |
|---|---|
| `src/lib/content.ts` | **All page text and numbers.** Edit here, redeploy. |
| `src/components/Sections.tsx` | The 12 page sections. |
| `src/components/Forms.tsx` | Registration (7 tracks, consent boxes) and partnership-request modal. |
| `src/components/DashboardDemo.tsx` | Blue Impact Dashboard demo (data from `content.ts`). |
| `src/app/api/submissions/` | `POST` saves a form to `data/submissions.jsonl`; `GET export?key=` returns CSV for Excel. |
| `public/photos/`, `public/logos/` | Workshop photos (EXIF stripped) and partner logos. |

## Environment

`ADMIN_KEY` — required; protects `/api/submissions/export`. Put it in `.env` (Docker) or `.env.local` (dev).

## Not yet wired

- Email confirmation on submit (needs an SMTP account).
- Admin UI for editing content (use `content.ts`).
- Logos for لنبادر, البيك, ترانسفورمكس (shown as text until supplied).
- Video summary and testimonials (no assets yet).
