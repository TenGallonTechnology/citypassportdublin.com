# AI Agent Working Guide

Concise, project-specific instructions for AI assistants contributing to this repository. Focus on these established patterns—do not introduce new stacks or speculative architecture.

## Project Snapshot
- Framework: Nuxt 4 (SSR + prerendered static output) with Nuxt UI Pro, @nuxt/image, @nuxt/scripts, @vercel/analytics.
- Rendering: Hybrid SSR -> static export. Critical routes are pre-rendered via `routeRules` and explicit `nitro.prerender.routes` list that is dynamically built from `app/data/businesses.json`.
- Styling/UI: Nuxt UI Pro components + utility classes (Tailwind via Nuxt UI). Keep stylistic consistency (compact class lists, semantic component usage like `UButton`, `UAvatar`, `UNavigationMenu`).
- Data Source: Single JSON file `app/data/businesses.json` used at build time for navigation, category pages, and business detail pages. No runtime mutations.

## Architecture & Data Flow
1. `businesses.json` imported directly in: `nuxt.config.ts`, `app/app.vue`, pages under `app/pages/**`, and components for navigation.
2. Build step reads the file to generate prerender route list (category + each business slug). Adding a business requires: valid `slug`, `category` (lowercase), and optional fields. Missing fields should safely render (code guards for null/undefined).
3. Navigation structure is recomputed on each render from the JSON (no caching layer). Category uniqueness via `new Set` over `category` field.
4. `useCategoryIcon(category)` composable returns a computed icon class. If adding new categories, update this composable and ensure matching lowercase category in data.
5. Page routing relies on Nuxt's file-based routes: `business/[slug].vue`, `category/[category].vue`.

## Conventions
- Categories: always lowercase in data; UI capitalization handled in templates.
- Optional string fields may be `null`. Components must null-check before rendering links, images, hours, etc. Continue this pattern.
- SEO: Use `useSeoMeta` per page; keep fallback images to `/favicon.ico` if no photos.
- Imports: Prefer alias `~/` for app root; types co-located (e.g., `Business` interface inside `app.vue`). If moving `Business` type to a dedicated file, adjust all imports consistently.
- Icons: Use lucide icon sets via class names (`i-lucide-*`). Ensure new icons follow existing naming style.
- Styling: Keep spacing utilities minimal and consistent with existing examples (e.g., `max-w-4xl mx-auto p-6`).

## Common Tasks
Add a new business:
1. Append object to `app/data/businesses.json` (ensure unique `slug`).
2. Use existing field naming; keep unused complex objects (`address`, `hours`, `contacts.social`) as `null` or objects with null members as precedent shows—do not remove keys arbitrarily (guards expect them).
3. If new `category`: update `useCategoryIcon.ts` and verify prerender includes new category (will auto-generate if category appears in data).
4. Run `pnpm dev` to verify route generation & navigation.

Add a new category-specific presentation tweak:
- Update icon mapping in `useCategoryIcon.ts`.
- Optionally adjust color mapping in `business/[slug].vue` local `colors` record.

## Build & Quality Workflows
- Install: `pnpm install` (postinstall runs `nuxt prepare`).
- Dev: `pnpm dev` (port 3000).
- Type check: `pnpm typecheck` (vue-tsc).
- Lint: `pnpm lint` (ESLint via `@nuxt/eslint`). Respect stylistic overrides in `nuxt.config.ts` (e.g., `commaDangle: never`).
- Static generate: `pnpm generate` or `pnpm build` (SSR build) + optional `pnpm preview`.

## Performance & Prerender Notes
- Do not fetch remote data at runtime; architecture assumes static build-time dataset.
- Large changes to `businesses.json` affect the prerender route list—avoid dynamic computation elsewhere.
- Keep JSON lean; unused nested structures can slow prerender diff, but preserve current schema until a refactor is explicit.

## Error Handling Patterns
- Use `createError({ statusCode, statusMessage })` inside page setup when validating dynamic params (`category` / `slug`). Continue throwing early if not found.

## When Extending
- Prefer new composables under `app/composables/` for reusable logic (naming: `useX.ts`).
- Keep UI logic declarative; avoid imperative DOM manipulation.
- If introducing runtime APIs or dynamic data, coordinate a design change (current model is fully static).

## Pitfalls
- Forgetting to update `useCategoryIcon` after adding category → blank icon fallback.
- Changing category casing in JSON breaks route links & nav grouping.
- Removing keys from business objects may cause undefined property access in templates; instead keep keys with null values.

## Quick Reference
Data file: `app/data/businesses.json`
Config: `nuxt.config.ts`
Layout root & nav generation: `app/app.vue`
Routing pages: `app/pages/`
Icons mapping: `app/composables/useCategoryIcon.ts`

Provide diffs for changes; do not reformat unrelated code.
