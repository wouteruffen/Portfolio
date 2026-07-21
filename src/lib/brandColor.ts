/**
 * Single source of truth for brand colors that Framer Motion animates
 * directly (FooterV2, NavbarV2's post-Hero solid state, ScrollLogo). Kept as
 * literals — mirroring the matching CSS custom properties in index.css —
 * because Framer Motion's `animate` prop interpolates colors frame-by-frame
 * and can't resolve a CSS custom property mid-transition.
 */

// Mirrors --brand-orange (hsl(14 88% 49%)).
export const BRAND_ORANGE_HSL = "hsl(var(--brand-orange))";
export const BRAND_ORANGE_RGB = "235, 66, 15";

// Mirrors --near-black (hsl(20 10% 7%)) — the sitewide soft near-black.
export const NEAR_BLACK_HEX = "#141110";
export const NEAR_BLACK_RGB = "20, 17, 16";

// Mirrors --cream (hsl(40 33% 97%)) — the sitewide warm off-white.
export const CREAM_HEX = "#FAF8F5";
export const CREAM_RGB = "250, 248, 245";

// Dedicated solid-navbar SURFACE colors — mirror --navbar-charcoal /
// --navbar-cream, deliberately kept separate from NEAR_BLACK_RGB/CREAM_RGB
// above. Those two drive body text, borders, ScrollLogo, etc. sitewide (via
// --near-black/--cream), so tuning the navbar's own fill lives here instead,
// where it can't inadvertently shift text tone elsewhere in the interface.
export const NAVBAR_CHARCOAL_RGB = "30, 26, 24";   // #1E1A18 — solid navbar bg, Light Mode
export const NAVBAR_CREAM_RGB = "243, 238, 231";   // #F3EEE7 — solid navbar bg, Dark Mode
