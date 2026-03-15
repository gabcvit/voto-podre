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
- Adding or changing a data source or PEC file (update §11 Adding New Content)
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

**Voto Podre** ("Rotten Vote") is a Brazilian political transparency web app. It tracks which federal deputies (*deputados*) voted in favour of "pautas podres" — proposed legislation (PECs) deemed harmful to the Brazilian public. Users can browse deputies, see their voting records on catalogued bad proposals, and share the information.

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
| Testing | Vitest + `@vue/test-utils` |
| Linting | ESLint + oxlint |
| Package manager | **pnpm** |
| Deploy | `gh-pages` (runs `pnpm build && gh-pages -d dist`) |
| Fonts | Google Fonts — **Syne** (headings, loaded in `index.html`) + **DM Sans** (body) |

---

## 3. Key Scripts

```bash
pnpm dev          # dev server
pnpm build        # type-check + vite build → dist/
pnpm preview      # serve dist/
pnpm test:unit    # vitest
pnpm lint         # oxlint + eslint (auto-fix)
pnpm deploy       # build + push to gh-pages branch
```

---

## 4. File Structure (annotated)

```
/
├── index.html                  # Loads Google Fonts (Syne + DM Sans), mounts #app; anti-flash theme script
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
│   │   ├── pautasPodres.ts     # PAUTAS_PODRES — array of PautaPodre objects
│   │   └── pecs-podres/
│   │       ├── pec-aborto.ts       # Array of deputy IDs who voted FOR this PEC
│   │       └── pec-bandidagem.ts   # Array of deputy IDs who voted FOR this PEC
│   │
│   ├── stores/
│   │   ├── useDeputadosStore.ts     # Pinia store: exposes { deputados }
│   │   ├── usePautasPodresStore.ts  # Pinia store: exposes { pautasPodres }
│   │   └── useThemeStore.ts         # Pinia store: exposes { isDark, toggle() }; syncs .dark class on <html> and localStorage
│   │
│   ├── composables/
│   │   ├── useDeputadoDetails.ts   # Takes an ID, returns { deputado, pautasDoDeputado }
│   │   └── useDeputadosFilters.ts  # Filter logic for DeputadosView; exports useDeputadosFilters + StatusFilter type + STATUS_OPTIONS
│   │
│   ├── views/
│   │   ├── HomeView.vue            # Landing: hero, stats, callout, message cards
│   │   ├── DeputadosView.vue       # Lists deputies via BaseDeputado; includes DeputadosFilters panel
│   │   ├── DeputadoDetailsView.vue # Single deputy: card + InfoList + PautasList
│   │   ├── PautasPodresView.vue    # Lists all pautas via PautasList
│   │   ├── PautaDetailsView.vue    # Single pauta: header + list of deputies who voted for it
│   │   ├── AboutView.vue          # Static info / methodology
│   │   ├── PrivacyPolicyView.vue  # Política de Privacidade — LGPD-compliant, declares zero data collection
│   │   └── TermsOfUseView.vue     # Termos de Uso — govering law, liability, editorial character
│   │
│   └── components/
│       ├── TheNavbar.vue           # Sticky top nav (logo + 4 links + theme toggle button)
│       ├── TheFooter.vue           # Site footer: author credit (gabcvit), links to /privacidade and /termos
│       ├── BaseDeputado.vue        # Deputy row (list) or expanded card (details view)
│       ├── PageTitle.vue           # h1 + optional subtitle used by list views
│       ├── StatCard.vue            # Number + label + description; top-border colour variant
│       ├── MessageCard.vue         # Left-bordered editorial text block
│       ├── PautasList.vue          # Renders list of PautaPodre items; clickable rows
│       ├── InfoList.vue            # Key-value table of a deputy's raw fields
│       ├── DeputadosFilters.vue    # Filter panel for DeputadosView (search, status, partido, UF, min pautas podres)
│       └── icons/                  # Simple SVG icon components
│           ├── IconArrowBack.vue
│           ├── IconSun.vue         # Used in theme toggle (shown in dark mode → switch to light)
│           └── IconMoon.vue        # Used in theme toggle (shown in light mode → switch to dark)
```

---

## 5. Core Types (`src/types.ts`)

```ts
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
}

type PautaPodre = {
  id: number                          // Proposição ID from Câmara API
  nome: string
  descricao: string
  urlVotos: string                    // Câmara API endpoint for votes
  urlProposicao: string               // Câmara website link
  idsDeputadosPodres: (number | undefined)[]  // Deputy IDs who voted FOR it
}
```

---

## 6. Routes (`src/router.ts`)

| Path | Name | View | Notes |
|---|---|---|---|
| `/` | `Home` | `HomeView` | |
| `/deputados` | `Deputados` | `DeputadosView` | |
| `/deputado/:id` | `DeputadoDetails` | `DeputadoDetailsView` | `props: true` |
| `/pautas-podres` | `PautasPodres` | `PautasPodresView` | |
| `/pauta/:id` | `PautaDetails` | `PautaDetailsView` | |
| `/sobre` | `Sobre` | `AboutView` | |
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

In `list` variant: clicking navigates to `/deputado/:id`. In `card` variant: no navigation.

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
| `pautas` | `Array<{ id, nome, descricao }>` | — |
| `showTitle` | `boolean` | `true` |

Clicking a row navigates to `/pauta/:id`.

### `InfoList`
| Prop | Type | Notes |
|---|---|---|
| `info` | `Record<string, string \| number>` | Filters hidden keys: `uri`, `uriPartido`, `urlFoto` |

### `useDeputadoDetails(id: string | number)`
Returns `{ deputado: Ref<Deputado | null>, pautasDoDeputado: ComputedRef<PautaPodre[]> }`.

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
| `v-model:statusFilter` | `StatusFilter` | Toggle buttons: Todos / Somente podres / Somente limpos |
| `v-model:partidoFilter` | `string` | Dropdown; `''` = all parties |
| `v-model:ufFilter` | `string` | Dropdown; `''` = all states |
| `v-model:minPautasPodres` | `number` | Number input; `0` = no minimum |
| `availablePartidos` | `string[]` | Drives partido dropdown options |
| `availableUfs` | `string[]` | Drives UF dropdown options |
| `hasActiveFilters` | `boolean` | Shows "Limpar filtros" button when `true` |

Emits `reset` when "Limpar filtros" is clicked.

### `TheFooter`
No props. Renders the site-wide footer with:
- Author credit linking to `https://gabcvit.dev/`
- Attribution link to the Câmara dos Deputados open data API
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

### New Pauta Podre
1. Create `src/data/pecs-podres/pec-<slug>.ts` — export an array of deputy IDs who voted FOR it (IDs sourced from the Câmara votações API endpoint)
2. Import it in `src/data/pautasPodres.ts` and add an entry to `PAUTAS_PODRES` with all `PautaPodre` fields
3. No store, router, or component changes needed

### New Deputy
Add an entry to `TODOS_DEPUTADOS.dados` in `src/data/deputados.ts` following the `Deputado` type. Deputy IDs must match those referenced in `idsDeputadosPodres` arrays.

---

## 12. Testing

Tests live in `src/components/__tests__/` (currently empty — no tests written yet).
Test runner: `pnpm test:unit` (Vitest + jsdom + `@vue/test-utils`).

---

## 13. Build & Deploy

- `pnpm build` runs `vue-tsc --build` (type-check) in parallel with `vite build`
- Output: `dist/`
- Deploy: `pnpm deploy` → builds then pushes `dist/` to `gh-pages` branch via the `gh-pages` npm package
