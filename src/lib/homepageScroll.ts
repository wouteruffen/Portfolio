const SCROLL_KEY = "sbb:homepage-scroll-y";

/**
 * Homepage scroll happens on an internal container (see useSmoothScroll),
 * not `window`, and Index fully unmounts on route change — so browser
 * scroll restoration doesn't apply. This persists the last known homepage
 * scrollTop across that unmount, letting a subpage's "Terug" link (or the
 * native browser Back button, which triggers the same unmount/remount)
 * bring the user back to where they actually were.
 */
export function saveHomepageScroll(y: number) {
  try {
    sessionStorage.setItem(SCROLL_KEY, String(Math.round(y)));
  } catch {
    // sessionStorage unavailable (e.g. private mode) — restore is best-effort
  }
}

/** Reads and clears the saved position — consumed once per return trip. */
export function consumeHomepageScroll(): number | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(SCROLL_KEY);
    return Number(raw);
  } catch {
    return null;
  }
}

/**
 * Non-consuming twin of consumeHomepageScroll — reads the saved position
 * without clearing it. Index's restore effect (via consumeHomepageScroll
 * above) remains the one place that actually applies and clears it; this
 * exists purely so a component that renders before that effect runs (e.g.
 * ScrollLogo, deciding what to paint on its very first frame) can know
 * ahead of time what position the page is about to be restored to, instead
 * of guessing or waiting.
 */
export function peekHomepageScroll(): number | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    return raw === null ? null : Number(raw);
  } catch {
    return null;
  }
}

/**
 * Href for a subpage's "Terug" link: if a homepage position was recorded
 * this session, route straight to "/" so Index can restore it. Otherwise
 * (e.g. someone opened the subpage URL directly) fall back to the
 * homepage section this subpage is normally reached from.
 */
export function getHomeReturnHref(fallbackSection: string): string {
  try {
    return sessionStorage.getItem(SCROLL_KEY) !== null ? "/" : `/#${fallbackSection}`;
  } catch {
    return `/#${fallbackSection}`;
  }
}
