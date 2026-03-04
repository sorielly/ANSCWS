# St. Anthony Nordic Ski Club

A faithful rebuild of the original ski club prototype with improved architecture, accessibility, and production-minded maintainability.

## Project Overview
This application preserves the original product behavior and visual tone:
- warm, community-driven Nordic club identity
- card-focused content layout
- sticky header + trail status banner
- CMS/edit mode with audit logging
- local-first persistence and seeded realistic content
- weather/social/activity widgets

## Chosen Stack and Why
### Stack
- **Vanilla JavaScript (ES Modules) SPA** with History API routing
- Local modular stores (UI / domain content / weather integration)
- Node built-in test runner (`node --test`)

### Why this stack was chosen
The top requirement is fidelity to the original interaction model while keeping maintainability high. In this constrained environment, a dependency-light modular SPA avoids toolchain fragility, still supports deep linking and CMS interactions cleanly, and keeps the architecture easy to migrate later to React/Vue if desired. The implementation emphasizes feature boundaries and repository-like data actions to stay production-ready.

## Install
```bash
npm install
```

## Run in Development
```bash
npm run dev
```
Open `http://localhost:4173`.

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Quality Checks
Run these commands locally before opening a PR:

```bash
npm test
npm run lint
npm run format:check
```

## Architecture Overview
- `src/app`
  - `main.js`: app bootstrap and canonical store wiring
  - `router.js`: deep-link + history routing
  - `renderApp.js`: composition root and event binding
  - `stores/`: **canonical store modules**
    - `uiStore.js`: UI-only flags (CMS mode, mobile nav, audit modal)
    - `contentStore.js`: content editing + audit log generation
    - `weatherStore.js`: weather fetch/cache and refresh lifecycle
  - Legacy parallel store implementations are intentionally disallowed outside `src/app/stores/`.
- `src/pages`: page modules (`home`, `events`, `programs`, `trails`, `rentals`, `membership`, `about`, `404`)
- `src/components`
  - `layout/`: header/footer
  - `widgets/`: weather/social/activity
  - `cms/`: audit modal
- `src/features`: domain concerns (`cms validation`, `audit entry`, `weather API + code mapping`)
- `src/shared`: cross-feature utilities (`date`, `sorting`, `safe storage`)
- `src/data/seed.js`: realistic local seed content
- `tests/`: utility and behavior tests

## Persistence Approach
- Seed data initializes domain state on first run.
- Content state is persisted in `localStorage` using safe JSON parse/load helpers.
- All content writes go through content store actions (events, trails, programs, rentals, about), which also produce centralized audit entries.
- UI state is intentionally separate from domain state.

## Replacing Local/Mock Data with Real APIs
1. Keep page and component modules unchanged.
2. Replace content store action internals with async repository/API calls.
3. Map API responses into current domain shapes.
4. Persist audit entries server-side and hydrate the modal from API.
5. Keep weather module as-is or swap in a server proxy if needed.

## Fidelity to Original Prototype
- **Intentionally preserved:** page set/routes, sticky global header, responsive navigation, trail status banner, card-based page composition, CMS mode pattern, edit controls visibility, weather/social/activity modules, and audit trail behavior.
- **Technically improved:** modular page/component boundaries, split state domains (UI/content/external), reusable utilities for sorting/latest-selection/date formatting, stronger form validation flows, and clearer persistence boundaries.
- **Changed (and why):** implementation is dependency-light and framework-agnostic to maximize reliability in this environment while preserving the same visible product behavior and interaction model.

## Internal Module Hygiene
- Run `npm run check:internal-modules` to prevent obsolete internal modules from lingering.
- The check fails if legacy files like `src/app/store.js` or `src/features/audit/audit.js` exist or are still imported.
- Keep app state entrypoints in `src/app/main.js` and `src/app/renderApp.js`, with stores sourced only from `src/app/stores/`.
