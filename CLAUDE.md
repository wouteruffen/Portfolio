# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run test         # Run Vitest tests once
npm run test:watch   # Run Vitest in watch mode
```

Path alias `@` maps to `./src` in both Vite and TypeScript configs.

## Architecture

This is a Dutch-language portfolio site built with React 18 + TypeScript + Vite, using shadcn/ui components and Tailwind CSS.

**Routing** (`src/App.tsx`): React Router v6 with these routes:
- `/` — Home (Index)
- `/webdesign`, `/merkidentiteit`, `/digitale-producten` — Project category pages
- `/over-mij` — About page
- `/brandbook` — Brand book page

**Component layers**:
- `src/components/v2/` — The active design system (NavbarV2, HeroV2, AboutV2, ProjectsV2, ContactV2, ScrollLogo). Pages compose these.
- `src/components/ui/` — shadcn/ui primitives (generated, avoid manual edits).
- `src/components/CursorEffects.tsx` and `LoadingScreen.tsx` — Global effects rendered at the app level.

**Styling**: Tailwind CSS with HSL CSS variables defined in `src/index.css`. Custom fonts: Syne (display/headings), Inter (body), Anton, Bebas Neue, Outfit. Dark mode via `.dark` class.

**Animation**: Framer Motion is used throughout v2 components for scroll-triggered and entrance animations.

**Testing**: Vitest for unit tests (`src/test/`), Playwright for E2E (`playwright.config.ts`).

## Adding new pages

1. Create `src/pages/NewPage.tsx` composing v2 components.
2. Add the route in `src/App.tsx` above the `*` catch-all.

## shadcn/ui components

Add new shadcn components with `npx shadcn-ui@latest add <component>`. They land in `src/components/ui/` and should not be manually modified — customize via Tailwind classes or CSS variables in `index.css`.
