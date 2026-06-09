# YMKCOE College Website

A modern, full-stack college website for Yashoda Mahadeo Kore College of Engineering (Talegaon Dabhade, Pune) — rebuilt from an outdated PHP site into a React + Express + PostgreSQL platform with a CMS admin panel.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Wouter routing, Framer Motion, Recharts
- API: Express 5 with express-session
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all API contracts)
- `lib/db/src/schema/` — Drizzle schema files (courses, faculty, admissions, news, media, placements, contact, admins)
- `artifacts/api-server/src/routes/` — Express route handlers (courses, faculty, admissions, news, media, placements, contact, admin, stats)
- `artifacts/ymkcoe/src/` — React frontend (pages, components, admin dashboard)
- `lib/api-client-react/src/generated/` — Generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — Generated Zod schemas (do not edit)

## Pages

**Public:**
- `/` — Conversion-focused home with hero, stats, courses, news, placements, CTA
- `/about` — Vision, mission, accreditations, leadership
- `/courses` — Filterable course listings by department
- `/faculty` — Faculty directory with HOD highlights
- `/admissions` — Admission process + inquiry form
- `/placements` — Stats dashboard with Recharts bar chart, top companies, testimonials
- `/news` — News & announcements feed with category filter
- `/media` — Photo/video gallery grid
- `/contact` — Contact form + address

**Admin (CMS):**
- `/admin` — Login page (admin / admin123)
- `/admin/dashboard` — Full CMS: manage courses, faculty, news, placements, leads, contact submissions

## Architecture decisions

- Contract-first: OpenAPI spec gates codegen which gates the frontend — never hand-write types.
- Session-based admin auth via `express-session` + SHA-256 password hashing (crypto built-in).
- All timestamps stored as PostgreSQL TIMESTAMP and serialized to ISO strings in API responses.
- Drizzle push used for dev schema changes; production schema managed by Replit Publish flow.
- Admin credentials: username `admin`, password `admin123` (change after first login).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, run `pnpm --filter @workspace/api-spec run codegen` before touching the frontend.
- After adding new Drizzle schema files, run `pnpm run typecheck:libs` before checking artifact packages.
- The `news.ts` route converts the `publishedAt` string to a `Date` object before inserting; don't skip this.
- Admin password hashing uses `SHA-256(password + SESSION_SECRET)` — changing `SESSION_SECRET` invalidates all existing passwords.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
