import * as React from "react";

const MOBILE_BREAKPOINT = 768;
// Tablet band: md up to (but not including) lg — landscape phones / small
// tablets that get their own dedicated tuning rather than inheriting
// desktop's fixed sizing wholesale.
const TABLET_MIN = 768;
const TABLET_MAX = 1024;

export function useIsMobile() {
  // Lazy-initialized from the real viewport width so the very first render
  // already reflects the correct layout — no "assume desktop, then swap"
  // flash while mounting, and no wasted mount of desktop-only content/assets
  // before this resolves.
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

/**
 * True for 768px–1023px (Tailwind's md up to just under lg) — used only
 * where a value can't be expressed as a Tailwind `md:`/`lg:` class pair
 * (e.g. a Framer Motion `animate` prop). Most tablet-specific sizing should
 * still prefer plain `md:`/`lg:` classes over this hook.
 */
export function useIsTablet() {
  const isInTabletRange = (w: number) => w >= TABLET_MIN && w < TABLET_MAX;
  const [isTablet, setIsTablet] = React.useState(() => isInTabletRange(window.innerWidth));

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX - 1}px)`);
    const onChange = () => setIsTablet(isInTabletRange(window.innerWidth));
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isTablet;
}

// Same condition as tailwind.config.ts's "landscape-mobile" screen — kept in
// sync manually since Framer Motion's `animate` prop (a JS value) can't read
// a Tailwind variant. Short, wide phones in landscape (e.g. iPhone Pro Max,
// ~800-1024px wide but only 390-500px tall) rather than tablet/desktop width.
// max-width: 1024px specifically covers the iPhone 17 Pro Max's 956px-wide
// landscape viewport; max-height: 500px is what excludes real tablet
// landscape (1024x768, 960x600 — both taller than 500px) and ordinary
// desktop browser windows.
const LANDSCAPE_MOBILE_QUERY = "(orientation: landscape) and (max-height: 500px) and (max-width: 1024px)";

export function useIsLandscapeMobile() {
  const [isLandscapeMobile, setIsLandscapeMobile] = React.useState(
    () => window.matchMedia(LANDSCAPE_MOBILE_QUERY).matches,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(LANDSCAPE_MOBILE_QUERY);
    const onChange = () => setIsLandscapeMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isLandscapeMobile;
}

/**
 * Single source of truth for "give this device the phone experience" —
 * portrait mobile (<768px wide) OR landscape phone (short + wide, see
 * useIsLandscapeMobile above). Used to route Index.tsx to the Mobile*
 * component tree instead of the scroll-jacked desktop/tablet V2 tree, and
 * by NavbarV2 to switch into its simplified always-solid navbar. Keeping
 * this as one hook (rather than each caller combining isMobile ||
 * isLandscapeMobile itself) guarantees every consumer agrees on which
 * layout is active — CSS (the landscape-mobile Tailwind screen) and JS
 * must never disagree about this.
 */
export function useIsPhoneLayout() {
  const isMobile = useIsMobile();
  const isLandscapeMobile = useIsLandscapeMobile();
  return isMobile || isLandscapeMobile;
}
