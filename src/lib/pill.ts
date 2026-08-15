/**
 * Shared chrome for technology/skill pills (OverMij skills, project Tech
 * Stack tags, ProjectsV2/MobileProjects tool chips) — background, border
 * and shape only. Each usage layers its own padding/font-size/tracking on
 * top so sizing stays context-appropriate while the pill "look" is
 * identical everywhere.
 *
 * Background/border are tinted with --brand-orange (a fixed HSL value, same
 * in both themes) at low opacity rather than a neutral foreground tint —
 * a plain foreground/opacity fill read as generic/near-invisible and blended
 * into the page. Mixing brand-orange into the surface instead gives the
 * pill a soft terracotta identity in Light Mode and a warm ember tone in
 * Dark Mode, without ever resolving to a fixed hex — it adapts automatically
 * because the opacity blends with whatever --background sits underneath.
 */
export const PILL_CLASS =
  "rounded-full border border-brand-orange/25 bg-brand-orange/10 text-foreground/70 transition-colors duration-300";
