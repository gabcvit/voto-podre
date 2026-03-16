# AGENTS.md — Voto Podre Repository Reference

> Single source of truth for AI agents working in this repository.
> Read this before touching any file. All paths are relative to the workspace root.

---

## 0. Standing Rules for AI Agents

These rules apply to **every task**, without exception.

### 0.1 Always update documentation after code changes

After completing any code change, identify and update every markdown file whose content is affected. This includes — but is not limited to — `AGENTS.md` itself.

**What triggers an update:**
- Adding, removing, or renaming a file (update the file structure tree and any relevant section)
- Adding or changing a composable, store, component, or view (update the Component API / Data Flow sections)
- Adding or changing a route (update §6 Routes table)
- Adding or changing a type (update §5 Core Types)
- Adding or changing a data source or proposition file (PEC/PL) (update §11 Adding New Content)
- Changing build, deploy, or test commands (update §3 Key Scripts)
- Changing design system conventions (update §9 Design System)

**How to do it:**
1. Before finishing a task, review the full list of changed files.
2. For each changed file, ask: *does any section of AGENTS.md describe this file or its API?*
3. If yes, update that section to reflect the current state of the code.
4. Keep descriptions concise — match the existing tone and format of the file.

> Failing to update documentation after a code change is considered an incomplete task.

---

## 1. Project Purpose

**Voto Podre** ("Rotten Vote") is a Brazilian political transparency web app. It tracks which federal deputies (*deputados*) voted in favour of or against catalogued proposals deemed relevant to the Brazilian public. Users can browse deputies, see their voting records on monitored proposals, and share the information.

Data is static (hand-curated from the public Câmara dos Deputados Open Data API). There is no backend.

---

## 2. Stack

| Concern | Library / Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`) |
| State | Pinia (stores are thin wrappers over static data) |
| Routing | Vue Router v5 (HTML5 history mode) |
| Testing | Vitest + `@vue/test-utils` + Cypress |
| Linting | ESLint + oxlint |
| Package manager | **pnpm** |
| Deploy | `gh-pages` (runs `pnpm build && gh-pages -d dist`) |
| Fonts | Google Fonts — **Syne** (headings, loaded in `index.html`) + **DM Sans** (body) |

---

## 3. Key Scripts

```bash
pnpm dev          # dev server (localhost:5173)
pnpm build        # type-check + vite build → dist/ + runs scripts/prerender.mjs
pnpm preview      # serve dist/
pnpm test         # run Cypress E2E smoke tests headlessly (requires dev server already running)
pnpm lint         # oxlint + eslint (auto-fix)
pnpm sync:deputados:rede-social  # fetches redeSocial for every deputy and rewrites src/data/deputados.ts
pnpm deploy       # build + push to gh-pages branch
```

---

## 4. File Structure (annotated)

```
/
├── .github/
│   └── workflows/
│       └── main_workflow.yml      # CI pipeline: install → Cypress smoke tests → build → GitHub Pages deploy
├── cypress/
│   └── e2e/
│       └── smoke.cy.ts            # Smoke coverage for every public route, including one deputado and one pauta details page
├── cypress.config.ts          # Cypress E2E config (baseUrl, spec pattern, no support file)
├── index.html                  # Loads Google Fonts (Syne + DM Sans), mounts #app; anti-flash theme script; base SEO/OG/Twitter meta + JSON-LD
├── scripts/
│   ├── prerender.mjs           # Post-build script: generates dist/<route>/index.html for each static
│                               # route with correct OG/Twitter meta pre-patched, plus dist/404.html
│                               # fallback. Required for social-media rich-embed support (GitHub Pages
│                               # returns 404 for SPA sub-paths without these files).
│   └── update-deputados-rede-social.mjs # Fetches /deputados/:id for all deputies and updates redeSocial in src/data/deputados.ts
├── public/
│   ├── robots.txt              # Allow all crawlers; points to sitemap
│   ├── sitemap.xml             # Static-route + pauta-detail sitemap for search engines
│   └── og-image.svg            # Source artwork for OG share image (convert to og-image.png for deployment)
├── src/
│   ├── main.ts                 # Creates Vue app, registers Pinia + Router, mounts
│   ├── App.vue                 # Root: initialises useThemeStore, applies theme-aware bg/text, TheNavbar + <router-view> + TheFooter; flex-col layout so footer sticks to bottom
│   ├── router.ts               # All routes (see §6)
│   ├── types.ts                # Shared TypeScript types: Deputado, PautaPodre
│   │
│   ├── assets/
│   │   ├── base.css            # body font-family (DM Sans), h1-h6 font-family (Syne)
│   │   └── main.css            # @import base.css; @import "tailwindcss"; @custom-variant dark (.dark selector)
│   │
│   ├── data/
│   │   ├── deputados.ts        # TODOS_DEPUTADOS — static export of all monitored deputies
│   │   ├── pautasPodres.ts     # PAUTAS_PODRES: PautaPodre[] — array of PautaPodre objects (typed)
│   │   ├── temas.ts            # TEMA_CONFIG: Record<Tema, { emoji, colorClass, buttonActiveClass }> — per-tema UI config
│   │   └── pecs-podres/
│           ├── utils.ts                                                 # extractIdsPodres(votos) — IDs of deputies who voted "Sim" (use for negative pautas)
│           │                                                            # extractIdsContraPauta(votos) — IDs of deputies who voted "Não" (use for positive pautas)
│           ├── pec-aborto.ts                                           # Deputy IDs flagged (voted Sim)
│           ├── pec-anistia.ts                                          # Deputy IDs flagged (voted Sim)
│           ├── pec-bandidagem.ts                                       # Deputy IDs flagged (voted Sim)
│           ├── pl-anti-movimentos-trabalhadores-rurais-e-indigenas.ts  # Deputy IDs flagged (voted Sim)
│           ├── pl-devastacao.ts                                        # Deputy IDs flagged (voted Sim)
│           ├── pl-marco-temporal.ts                                    # Deputy IDs flagged (voted Sim)
│           └── pl-mercado-de-carbono.ts                                # Deputy IDs flagged (voted Sim)
│   │
│   ├── stores/
│   │   ├── useDeputadosStore.ts     # Pinia store: exposes { deputados }
│   │   ├── usePautasPodresStore.ts  # Pinia store: exposes { pautasPodres }
│   │   └── useThemeStore.ts         # Pinia store: exposes { isDark, toggle() }; syncs .dark class on <html> and localStorage
│   │
│   ├── composables/
│   │   ├── useDeputadoDetails.ts   # Takes an ID, returns { deputado, pautasDoDeputado }
│   │   ├── useDeputadosFilters.ts  # Filter logic for DeputadosView; exports useDeputadosFilters + StatusFilter type + STATUS_OPTIONS
│   │   └── useMeta.ts              # Per-route <head> management (title, description, OG, Twitter/X, canonical)
│   │
│   ├── views/
│   │   ├── HomeView.vue            # Landing: hero, stats, callout, message cards
│   │   ├── DeputadosView.vue       # Lists deputies via BaseDeputado; includes DeputadosFilters panel
│   │   ├── DeputadoDetailsView.vue # Single deputy: card + social buttons (from redeSocial, platform-aware icons) + InfoList + PautasList + share button (Web Share API / clipboard fallback)
│   │   ├── PautasPodresView.vue    # Lists all pautas via PautasList; tema filter buttons
│   │   ├── PautaDetailsView.vue    # Single pauta: header (tipo-aware color/label) + toggleable "Leia mais" references (collapsed by default) + list of flagged deputies + share button (Web Share API / clipboard fallback)
│   │   ├── AboutView.vue          # Static info / methodology + project Instagram link
│   │   ├── GlossaryView.vue       # Glossário de termos legislativos usados no site (PEC, PL, proposição, etc.)
│   │   ├── PrivacyPolicyView.vue  # Política de Privacidade — LGPD-compliant, declares zero data collection
│   │   └── TermsOfUseView.vue     # Termos de Uso — govering law, liability, editorial character
│   │
│   └── components/
│       ├── TheNavbar.vue           # Sticky top nav (logo + 5 links + theme toggle + project Instagram icon link)
│       ├── TheFooter.vue           # Site footer: author credit (gabcvit), project Instagram link, links to /privacidade and /termos
│       ├── BaseDeputado.vue        # Deputy row (list) or expanded card (details view); badge shows "votos podres" count
│       ├── PageTitle.vue           # h1 + optional subtitle used by list views
│       ├── StatCard.vue            # Number + label + description; top-border colour variant
│       ├── MessageCard.vue         # Left-bordered editorial text block
│       ├── PautasList.vue          # Renders list of PautaPodre items; red row for negative, green row for positive; clickable
│       ├── InfoList.vue            # Key-value table of a deputy's raw fields
│       ├── DeputadosFilters.vue    # Filter panel for DeputadosView (search, status, partido, UF, min pautas)
│       └── icons/                  # Simple SVG icon components
│           ├── IconArrowBack.vue
│           ├── IconFacebook.vue     # Used in DeputadoDetailsView social buttons
│           ├── IconInstagram.vue    # Used in DeputadoDetailsView social buttons
│           ├── IconShare.vue       # Used in DeputadoDetailsView and PautaDetailsView share buttons
│           ├── IconX.vue            # Used in DeputadoDetailsView social buttons for X/Twitter links
│           ├── IconYoutube.vue      # Used in DeputadoDetailsView social buttons
│           ├── IconSun.vue         # Used in theme toggle (shown in dark mode → switch to light)
│           └── IconMoon.vue        # Used in theme toggle (shown in light mode → switch to dark)
```

---

## 5. Core Types (`src/types.ts`)

```ts
export type Tema = 'segurança pública' | 'direitos humanos' | 'meio ambiente' | 'democracia'

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'x'

export type DeputadoSocialLink = {
  url: string
  platform: SocialPlatform
  label: string
}

export type PautaReference = {
  title: string
  url: string
  source: string
  summary?: string
}

type Deputado = {
  id: number
  uri: string          // Câmara API URI
  nome: string
  siglaPartido: string
  uriPartido: string
  siglaUf: string      // State abbreviation (e.g. "SP")
  idLegislatura: number
  urlFoto: string
  email: string
  redeSocial: string[] // Social profile URLs from /deputados/:id
}

type PautaPodre = {
  id: number                          // Proposição ID from Câmara API
  nome: string
  descricao: string
  urlVotos: string                    // Câmara API endpoint for votes
  urlProposicao: string               // Câmara website link
  idsDeputadosPodres: (number | undefined)[]  // Deputy IDs who voted FOR it
  tipo: 'negativa' | 'positiva'       // negativa = voted Sim is bad; positiva = voted Não is bad
  temas: Tema[]                        // One or more thematic categories — use the Tema union type
  referencias?: PautaReference[]       // Optional "Leia mais" glossary with curated links and source metadata
}
```

---

## 6. Routes (`src/router.ts`)

| Path | Name | View | Notes |
|---|---|---|---|
| `/` | `Home` | `HomeView` | |
| `/deputados` | `Deputados` | `DeputadosView` | |
| `/deputado/:id` | `DeputadoDetails` | `DeputadoDetailsView` | `props: true` |
| `/pautas-podres` | `PautasPodres` | `PautasPodresView` | tema filter buttons |
| `/pauta/:id` | `PautaDetails` | `PautaDetailsView` | |
| `/sobre` | `Sobre` | `AboutView` | |
| `/glossario` | `Glossario` | `GlossaryView` | glossário de termos legislativos |
| `/privacidade` | `Privacidade` | `PrivacyPolicyView` | |
| `/termos` | `Termos` | `TermsOfUseView` | |

---

## 7. Data Flow

```
src/data/deputados.ts         ──► useDeputadosStore  ──► DeputadosView / useDeputadoDetails
src/data/pautasPodres.ts      ──► usePautasPodresStore ──► PautasPodresView / HomeView stats
src/data/pecs-podres/*.ts     ──► pautasPodres.ts (imported inside PAUTAS_PODRES array)
```

**"Is a deputy podre?"** logic lives in `BaseDeputado.vue`:
```ts
const isPodre = pautasPodres.some(p => p.idsDeputadosPodres.includes(deputado.id))
```

**Home page stat counts** are derived in `HomeView.vue` via `computed()`:
- `totalDeputadosMonitorados` = `deputados.length`
- `totalPautasPodres` = `pautasPodres.length`
- `totalDeputadosPodres` = unique deputy IDs across all pautas

---

## 8. Component API Quick Reference

### `BaseDeputado`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `deputado` | `Deputado` | — | Required |
| `pautasPodres` | `PautaPodre[]` | — | Used to compute `isPodre` and `podreCount` |
| `variant` | `'list' \| 'card'` | `'list'` | `'card'` = expanded layout, no click-to-navigate |

In `list` variant: renders as `<RouterLink>` (anchor) to `/deputado/:id` — fully keyboard accessible. In `card` variant: renders as `<div>` with no navigation.

### `StatCard`
| Prop | Type | Notes |
|---|---|---|
| `value` | `number` | Large display number |
| `label` | `string` | Short label below number |
| `description` | `string` | Fine print |
| `color` | `'zinc' \| 'red' \| 'orange'` | Controls top-border and number colour |

### `PageTitle`
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Rendered as `<h1>` |
| `subtitle` | `string?` | Optional small-caps subtitle below |

### `MessageCard`
| Prop | Type |
|---|---|
| `title` | `string` |
| `body` | `string` |

### `PautasList`
| Prop | Type | Default |
|---|---|---|
| `pautas` | `Array<{ id, nome, descricao, tipo, temas? }>` | — |
| `showTitle` | `boolean` | `true` |
| `title` | `string` | `'Votos deste Deputado'` |

Rows with `tipo === 'negativa'` get a red left-border and a **PAUTA PODRE** label. Rows with `tipo === 'positiva'` get a green left-border and a **PAUTA POSITIVA** label. When `temas` is present, colored emoji badges (one per tema) appear below the tipo/nome row (colors and emoji sourced from `TEMA_CONFIG` in `src/data/temas.ts`). Each row is a `RouterLink` (anchor) navigating to `/pauta/:id` — fully keyboard accessible.

### `InfoList`
| Prop | Type | Notes |
|---|---|---|
| `info` | `Record<string, string \| number \| string[]>` | Filters hidden keys: `uri`, `uriPartido`, `urlFoto`, `redeSocial` |

Rendered as a `<dl>` (description list) with `<dt>`/`<dd>` pairs for each key-value entry.

### `useDeputadoDetails(id: string | number)`
Returns `{ deputado: Ref<Deputado | null>, pautasDoDeputado: ComputedRef<PautaPodre[]> }`.

### `useMeta(opts)`
Reactively updates `<head>` meta, Open Graph, and Twitter/X Card tags for the current route. Uses `watchEffect` so reactive refs update the DOM when data resolves.

```ts
useMeta({
  title: MaybeRefOrGetter<string>       // page title; appended with '— Voto Podre' unless already 'Voto Podre'
  description: MaybeRefOrGetter<string> // meta description, og:description, twitter:description
  canonicalPath?: MaybeRefOrGetter<string> // e.g. '/deputado/12345'; defaults to '/'
  ogImage?: string                      // absolute URL; defaults to SITE_URL + '/og-image.png'
})
```

Exports `SITE_URL = 'https://voto-podre.com.br'` for use in other modules.

**Bot compatibility:**
- All static routes (`/sobre`, `/glossario`, `/deputados`, etc.): `scripts/prerender.mjs` generates a separate `dist/<route>/index.html` with the correct OG/Twitter meta pre-patched at build time. GitHub Pages serves these as HTTP 200, so all crawlers (Bluesky, WhatsApp, Telegram, Google, etc.) get the right metadata without executing JS.
- Dynamic routes (`/deputado/:id`, `/pauta/:id`): fall back to `dist/404.html` (GitHub Pages' SPA fallback). Real users get correct in-app navigation; social-media crawlers may show the homepage defaults.
- If you add a new static route, add a matching entry to `scripts/prerender.mjs`.

### `useDeputadosFilters(deputados, pautasPodres)`
Accepts `Ref<Deputado[]>` and `Ref<PautaPodre[]>` (use `storeToRefs` when passing from stores). Returns:
```ts
{
  searchQuery: Ref<string>           // name substring search
  statusFilter: Ref<StatusFilter>    // 'all' | 'podres' | 'clean'
  partidoFilter: Ref<string>         // '' = all parties
  ufFilter: Ref<string>              // '' = all states
  minPautasPodres: Ref<number>       // 0 = no minimum
  availablePartidos: ComputedRef<string[]>
  availableUfs: ComputedRef<string[]>
  filteredDeputados: ComputedRef<Deputado[]>
  hasActiveFilters: ComputedRef<boolean>
  resetFilters(): void
}
```
Each filter criterion is a separate pure predicate function internally (`matchesSearch`, `matchesStatus`, `matchesPartido`, `matchesUf`, `matchesMinPautas`).

`StatusFilter` type and `STATUS_OPTIONS` array are also exported from this module.

### `DeputadosFilters`
Dumb UI component — all state lives in the composable. Communicates via `v-model` bindings and a `reset` event.

| Prop / v-model | Type | Notes |
|---|---|---|
| `v-model:searchQuery` | `string` | Text search by name |
| `v-model:statusFilter` | `StatusFilter` | Toggle buttons with `aria-pressed`; wrapped in `role="group"` |
| `v-model:partidoFilter` | `string` | Dropdown; `''` = all parties |
| `v-model:ufFilter` | `string` | Dropdown; `''` = all states |
| `v-model:minPautasPodres` | `number` | Number input; `0` = no minimum |
| `availablePartidos` | `string[]` | Drives partido dropdown options |
| `availableUfs` | `string[]` | Drives UF dropdown options |
| `hasActiveFilters` | `boolean` | Shows "Limpar filtros" button when `true` |

Emits `reset` when "Limpar filtros" is clicked. Label reads **Mín. pautas** (no longer "pautas podres"). All inputs have programmatically associated `<label>` elements via `for`/`id`.

### `TheFooter`
No props. Renders the site-wide footer with:
- Author credit linking to `https://gabcvit.dev/`
- Attribution link to the Câmara dos Deputados open data API
- External link to the project Instagram profile (`https://www.instagram.com/voto.podre/`)
- Navigation links to `/privacidade` and `/termos`

Registered globally in `App.vue`. The root `<div>` in `App.vue` uses `flex flex-col` so the footer always sits at the bottom — `<main>` gets `flex-1`.

---

## 9. Design System

The app uses a **flat, manifesto-style design** targeting Gen Z aesthetics, with support for both **dark mode** (default) and **light mode**.

### Theme System
- Dark mode is the default. Preference is persisted in `localStorage` under the key `theme` (`'dark'` | `'light'`).
- An inline `<script>` in `index.html` adds `.dark` to `<html>` before first paint to avoid flash.
- `useThemeStore` owns all theme logic. Call `themeStore.toggle()` to switch; read `themeStore.isDark` to check.
- Tailwind's `dark:` variant is activated by the `.dark` class on `<html>` via `@custom-variant dark (&:where(.dark, .dark *))` in `main.css`.
- **All components and views carry both light and `dark:` Tailwind classes.** Never add a colour class without its counterpart.

### Fonts
- **Headings (`h1`–`h6`)**: `Syne` — Black/ExtraBold weight, `uppercase`, tight `tracking-tight` or `tracking-tighter`
- **Body**: `DM Sans` — Regular/Medium weight

### Colour Palette (Tailwind classes)
| Token | Light mode usage | Dark mode usage |
|---|---|---|
| `white` / `zinc-50` | Page and surface backgrounds | — |
| `black` / `zinc-950` | — | Page and surface backgrounds |
| `zinc-200` / `zinc-300` | Dividers, secondary surfaces | — |
| `zinc-800` / `zinc-900` | — | Dividers, secondary surfaces |
| `zinc-900` | Primary text, key headings | — |
| `white` | — | Primary text, key headings |
| `zinc-500` / `zinc-600` | Body copy, secondary text | Body copy, secondary text |
| `zinc-400` / `zinc-500` | — | Muted labels, metadata |
| `red-500` | Primary accent — all "podre" highlights, CTAs, left borders on flagged content | Same |
| `red-400` / `red-600` | Supporting red tones | Same |
| `orange-400` / `orange-500` | "Deputies flagrado" stat only | Same |

### Design Principles
- **No border-radius on cards** — flat, sharp edges
- **No box shadows or glows** — removed completely
- **Accent via left-border** (`border-l-2 border-red-500`) not background fills
- **Typography-first hierarchy** — size + weight + tracking conveys importance, not colour fills
- **All-caps + `tracking-widest`** for labels, tags, section markers
- **`clamp()`-based fluid type** on hero headings (inline `style` attribute for font-size)
- Interactive states use `hover:text-zinc-900` (light) / `dark:hover:text-white` (dark) transitions — subtle

### Inline Style Exception
The `font-family: 'Syne', sans-serif` is applied inline via `style` attribute on specific large headings (hero, pauta title, about section h2) in addition to the global CSS rule, to ensure correct fallback.

### `useThemeStore` API
```ts
const { isDark, toggle } = useThemeStore()
// isDark: Ref<boolean> — true = dark mode active
// toggle(): void — switches mode, updates <html> class and localStorage
```
Bootstrap it once in `App.vue` (`useThemeStore()`) so the watcher fires on app init. Any component can then call it freely without re-registering.

---

## 10. Legal Pages

Both legal pages are static views with no props or stores. They follow the same layout conventions as `AboutView.vue` (`max-w-3xl mx-auto px-4 py-12`) and use `PageTitle` for the heading.

### `PrivacyPolicyView` (`/privacidade`)
- Declares **zero data collection, zero cookies** (permanently and irrevocably)
- Sections: identification, data collected, cookies, third-party sharing, LGPD conformance, data subject rights, hosting (GitHub Pages), change policy
- Only data persisted locally: `theme` key in `localStorage` (never transmitted to any server)
- LGPD articles referenced: art. 7º (legal basis), art. 18 (data subject rights), art. 20 (profiling), art. 33 (international transfer)

### `TermsOfUseView` (`/termos`)
- Sections: object/purpose, nature of data (all public via Lei de Acesso à Informação nº 12.527/2011), liability disclaimer, editorial character + constitutional free speech basis (CF art. 5º IV), intellectual property, user conduct, applicable law, contact
- Governing law: Brazilian (LGPD, Marco Civil da Internet, LAI, CF/1988)
- Jurisdiction: São Paulo/SP

---

## 11. Adding New Content

### `PautasPodresView` (`/pautas-podres`)
Displays all catalogued `pautas` with a row of **tema filter buttons** ("Todos" + one button per unique `tema` value). Clicking a button filters the list to that theme; clicking "Todos" resets. Filter state is local (`ref`) inside the view — no composable needed.
1. Create `src/data/pecs-podres/<type>-<slug>.ts` — use `pec-` prefix for PECs and `pl-` prefix for PLs.
   - For **negative** pautas (voting Sim = bad): import `extractIdsPodres` from `./utils` and call it with the raw `VOTOS` constant.
   - For **positive** pautas (voting Não = bad): import `extractIdsContraPauta` from `./utils` and call it with the raw `VOTOS` constant.
2. Import it in `src/data/pautasPodres.ts` and add an entry to `PAUTAS_PODRES` with all `PautaPodre` fields, setting `tipo` to `'negativa'` or `'positiva'` and `tema` to a descriptive thematic category string (e.g. `'direitos humanos'`, `'meio ambiente'`, `'segurança pública'`, `'democracia'`).
  - Add `referencias` when available (`PautaReference[]`) to populate the toggleable "Leia mais" section in `PautaDetailsView.vue` (hidden by default until the user expands it).
3. No store, router, or component changes needed.

### New Deputy
Add an entry to `TODOS_DEPUTADOS.dados` in `src/data/deputados.ts` following the `Deputado` type. Deputy IDs must match those referenced in `idsDeputadosPodres` arrays.

---

## 12. Testing

- E2E smoke tests live in `cypress/e2e/smoke.cy.ts` — one test per public route asserting the page title, main heading, and key UI controls/content.
- `pnpm test` runs Cypress headlessly (`cypress run`). The dev server must already be running (`pnpm dev` in a separate terminal).
- In CI, the `test` job uses `cypress-io/github-action@v6` which starts `pnpm vite --host` automatically and waits for `http://localhost:5173` before running the suite.
- The `build` job declares `needs: test`, so GitHub Pages deploys are gated on passing smoke coverage.
- Unit test infrastructure (Vitest + `@vue/test-utils`) is installed but no `test:unit` script is defined. Specs would live in `src/components/__tests__/`.
- **Cypress config notes** (`cypress.config.ts`): `baseUrl: http://localhost:5173/`, `pageLoadTimeout: 30000`, `defaultCommandTimeout: 8000`. A `beforeEach` intercept stubs all `camara.leg.br` requests so external deputy photo URLs don't stall `window.load` on pages that render hundreds of images.

---

## 13. Build & Deploy

- `pnpm build` runs `vue-tsc --build` (type-check) in parallel with `vite build`
- Output: `dist/`
- Deploy: `pnpm deploy` → builds then pushes `dist/` to `gh-pages` branch via the `gh-pages` npm package
