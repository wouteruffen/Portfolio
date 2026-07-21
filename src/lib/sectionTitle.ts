/**
 * Shared "WAT IK DOE" heading system — reused by every major section/page
 * title so typography, alignment and container width stay identical across
 * the site. Only the element type (h1/h2) and animation wrapper vary per use.
 */
// landscape-mobile overrides the vw-based sizing with a vh-based clamp — on
// a short, wide phone screen (e.g. 956x440) 10vw of an ~950px-wide viewport
// is ~95px, dwarfing the ~380px of usable height left after the navbar;
// sizing off height instead keeps the title proportionate to the space it
// actually has to live in. Portrait mobile, tablet and desktop (which use
// this same constant) are unaffected — the media query only ever matches
// short, wide phone viewports.
export const SECTION_TITLE_CLASS =
  "font-logo text-foreground/80 uppercase leading-[0.9] tracking-[-0.02em] text-[10vw] md:text-[7vw] lg:text-[5.5vw] landscape-mobile:text-[clamp(1.25rem,6vh,2rem)]";

export const SECTION_TITLE_CONTAINER_CLASS = "max-w-[1240px] mx-auto";

export const SECTION_TITLE_GUTTER_CLASS = "px-6 md:px-10 lg:px-14";

/**
 * Top padding for the title wrapper — the pause between the fixed navbar
 * and the start of each major section title. Smaller on mobile (less
 * vertical real estate to spend) than on desktop (md+), where the fuller
 * value reads as a more deliberate, editorial gap. Applied as a Tailwind
 * class (not inline style) specifically so it can vary by breakpoint.
 */
export const SECTION_TITLE_PADDING_TOP_CLASS = "pt-[132px] md:pt-[168px]";

/** Divider placed directly beneath a large section title — same edge-to-edge treatment as "WAT IK DOE". */
export const SECTION_TITLE_DIVIDER_CLASS =
  "relative z-10 flex-shrink-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent";
