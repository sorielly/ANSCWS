# St. Anthony Nordic Ski Club

A production-minded, local-first frontend rebuild of the St. Anthony Nordic Ski Club prototype with preserved structure, page flow, and CMS-style editing behavior.

## Chosen stack and rationale

### Stack
- Dependency-light **Vanilla ES Modules SPA** (History API routing)
- Node scripts for `dev`, `build`, and `preview`
- Node built-in test runner for core logic coverage

### Why this stack
I selected a modular vanilla stack to maximize reliability in constrained environments while still preserving full UX fidelity (multi-page feel, CMS mode, edit controls, local persistence, weather integration, audit log). The architecture is organized by feature modules so a future migration to React/Vue is straightforward.

## Install
```bash
npm install
```

## Develop
```bash
npm run dev
```
Then open `http://localhost:4173`.

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Architecture overview
- `src/app`: app shell, renderer, store
- `src/data`: seed content
- `src/features/*`: weather, cms validation, audit
- `src/shared/*`: sorting, date formatting, safe storage helpers
- `src/styles`: global visual system and responsive styling
- `tests/*`: logic and smoke coverage

## Persistence approach
- A local-first store hydrates from `localStorage` using guarded JSON parsing.
- Initial boot falls back to realistic seed data.
- Domain updates pass through action functions and produce centralized audit entries.

## Replacing local/mock data with real APIs
1. Replace store action internals (`src/app/store.js`) with async repository calls.
2. Keep form validation and UI unchanged.
3. Map backend response models to the same frontend entities.
4. Continue writing audit events server-side while retaining local UI modal rendering.

## Fidelity to Original Prototype
- Preserved: page set (Home, Events, Programs, Trails, Rentals, Membership, About), sticky header, trail status banner, card-driven content hierarchy, community/winter tone, CMS mode toggle with visible indicator, edit-only controls, audit log, weather/social/activity widgets, and CRUD flow on events/trails.
- Improved: modular code boundaries, reusable utilities for sorting/latest selection, explicit validation, resilient persistence layer, and test coverage for key business logic.
- Changed intentionally: implemented with dependency-light modules for maintainability and predictable local execution while retaining original behavior and structure.
