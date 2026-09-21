# Studio Bit & Beeld Brand Guidelines

## Purpose

This file defines the structural identity requirements for Studio Bit & Beeld. It exists so a future redesign, whether done by a person or an AI coding assistant, can tell what is safe to restyle and what must never quietly disappear.

The hierarchy is:

```
BRAND_GUIDELINES.md
    ↓
/brandbook
    ↓
the actual website
```

The **`/brandbook`** route (`src/pages/Brandbook.tsx`) is the canonical, human-facing reference for Studio Bit & Beeld's identity, both visual and written. Visual identity is the dominant, primary part of it; the writing system is one domain within it, not a second book. This file is not a second Brandbook; it is the concise structural backbone underneath it. There is no separate Tone of Voice authority: `/tone-of-voice` has been removed, and `/brandbook` is the only identity/writing reference. If future copy or design work conflicts with an established CORE rule below or in `/brandbook`, the established rule takes precedence.

## Authority levels

- **CORE** — A fundamental identity decision. The official logo files, the primary palette, the primary typefaces, and strict rules such as "no stylistic em dash or en dash" are CORE. CORE does not change, get removed, or get contradicted during a redesign unless the user explicitly asks for that change.
- **GUIDELINE** — A current rule for applying a CORE decision (e.g. which logo file to use against which background, how the tone-of-voice principles get applied). Guidelines may evolve as the identity develops, but must be grounded in real, current decisions, never invented.
- **EXAMPLE** — A concrete demonstration of a CORE rule or GUIDELINE. Examples are replaceable. If a homepage section changes, the example can change without touching the rule it illustrated.
- **UNDEFINED** — A subject that belongs in the identity system but has no established rule yet (e.g. logo clearspace, minimum logo/monogram size). This is a valid, honest state. Never invent a rule to fill an UNDEFINED gap, and never remove the subject just because it's incomplete.

## Permanent identity subjects

These must stay represented somewhere in `/brandbook`, however the chapters end up grouped or renamed:

1. Brand / Studio Bit & Beeld
2. Logo
3. Logo usage
4. Monogram
5. Monogram usage
6. Color palette
7. Color usage
8. Typography
9. Typographic hierarchy
10. Layout / composition
11. Imagery
12. Digital / UI application
13. Motion / interaction (where currently defined)
14. Tone of Voice (voice, plus the four content roles: Visie/Introductie, Persoonlijk, Projectcontext, Functioneel)
15. Editorial Direction (content structure: where content appears, how much space it gets, how text and imagery relate)
16. Applications

Subjects may be merged into stronger combined chapters (e.g. Logo + Logo usage, Color + Color usage). They may never be silently dropped.

## Verified assets

Confirmed present in the repository and used by `Brandbook.tsx` via `src/components/v2/BitBeeldLogo.tsx`:

- Official light/white logo: `src/assets/logo/KLOPT DEZE WIT.svg`
- Official dark/black logo: `src/assets/logo/KLOPT DEZE ZWART.svg`
- Official monogram: `src/assets/MONOGRAM.svg` — verified identical to `public/favicon.svg`, i.e. it is the site's actual favicon.

Never recreate, redraw, or approximate these with text or new artwork. The wordmark includes a registered trademark (®) mark; preserve it.

## Current verified foundations

- **Color** (`src/index.css`): warm paper `--background: 40 29% 94%`, cream `--cream: 40 33% 97%`, near-black `--near-black: 20 10% 7%`, brand orange `--brand-orange: 14 88% 49%`. The site has a light and a dark theme (`.dark` class); near-black and warm paper swap roles between them, `--brand-orange` is not redefined in dark mode and stays constant.
- **Typography** (`tailwind.config.ts`): Anton (`font-logo`, display/wordmark), Antonio (`font-antonio`, headings/editorial), Inter (`font-body`, body/UI). Note: at the time of writing, Antonio has no `@font-face`/`@fontsource` import anywhere in the codebase (only Anton, Inter, Nunito and Syne are loaded via the Google Fonts `@import` in `src/index.css`, and only Outfit/Anton are loaded via `@fontsource` in `src/main.tsx`) — flagged here as an implementation gap, not a Brandbook content issue.
- **Layout**: shared max content width `1240px` (`SECTION_TITLE_CONTAINER_CLASS` in `src/lib/sectionTitle.ts`), used site-wide for section titles.

## The writing system

Studio Bit & Beeld's writing system (`/brandbook`, "Toon van stem" and "Contentrollen" chapters) separates three things. Conflating them is the most common way a redesign accidentally over-prescribes copy.

1. **Voice** — how everything sounds, regardless of what it's for: personal, direct, clear, concrete, confident without exaggeration, creative without turning vague, professional without sounding corporate. Studio Bit & Beeld is Wouter, not a fictional agency or team; "ik" for personal work, "we/wij" only for genuine collaboration, never to sound larger than it is.
2. **Content role** — the same voice, four different jobs. A page doesn't need all four; use a role only when the text has a real function.
   - **Visie / Introductie** — "Hoe kijk ik naar dit vakgebied of onderwerp?" Sets out a perspective on a service or theme. Not an agency slogan, not a project description.
   - **Persoonlijk** — "Wie zit erachter en hoe denk of werk ik?" Wouter's own voice on his approach or motivation. Not a company profile or third-person founder story.
   - **Projectcontext** — "Wat is relevant om over dit project te weten?" Optional, and only when the image doesn't already say it. Often the right amount of text is none; the site is not a traditional case-study portfolio where every visual needs an explanation.
   - **Functioneel** — "Waar ben ik, wat volgt er, wat kan ik doen?" Labels, buttons, navigation. Clarity over cleverness.
3. **CORE writing principles / guardrails** — apply across every role:
   - Text needs a reason to exist ("tekst moet een reden hebben om er te staan"). If it adds no perspective, context, information, clarification, personality, orientation or action, it may not be needed.
   - Don't narrate what's already visible (redundancy) — distinct from not writing merely to fill a layout slot that has room for an eyebrow/heading/paragraph (invention). Both are wrong, for different reasons.
   - Claims need support, not a forbidden-word list: words like "uniek" or "innovatief" aren't banned, but a claim needs something next to it that shows why it's true.
   - Plain language over invented design jargon ("holistische merkbeleving", "baanbrekende digitale ervaring") unless a specialist term is genuinely the clearest word.
   - No stylistic em dash or en dash in visitor-facing Dutch or English prose (normal hyphens in words/URLs/filenames are fine).
   - Dutch and English share the same voice; English is a natural translation, never more corporate or promotional.

Examples of each role currently live on the site (e.g. the Content & Social Media introduction for Visie/Introductie, the About page opening for Persoonlijk) and are shown as EXAMPLE in `/brandbook` — replaceable without invalidating the role or principle they illustrate. This file consolidates the writing system that used to live on a separate `/tone-of-voice` page; that page and its route have been removed, its useful content folded in here and into `/brandbook`.

## Editorial Direction

A third, distinct concern sits alongside Voice and Content role (`/brandbook`, "Editorial Direction" chapter, 15): not how copy sounds or what job it does, but **where** content appears, **how much space** it gets, and **how text and imagery relate** on a given page or section.

The core rule: content structure follows the importance and function of the content. Do not force every section into the same editorial pattern (eyebrow + heading + paragraph + image, always in that order) — a page's presentation adapts to what it actually contains, not the other way round. This is a decision framework (image-led / text-led / mixed, project context only when it changes understanding, text length matched to what the subject needs), not a layout template, and it is a GUIDELINE, not CORE: it explains how to make structural decisions, and does not itself fix a page's structure permanently.

Do not duplicate the Editorial Direction chapter's full content here; cross-reference it instead.

## Editing rules

- Never silently remove CORE information during a redesign.
- Never invent an undefined brand rule (clearspace, minimum size, spacing scale, animation timing, etc.) to make a chapter feel complete. Mark it UNDEFINED instead.
- Examples and guidelines may evolve as the identity develops.
- CORE decisions require an explicit instruction to change, not a redesign's aesthetic preference.
- Content is authoritative over layout: the presentation adapts to the identity information, not the reverse.
