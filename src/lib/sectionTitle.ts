/**
 * Shared "WAT IK DOE" heading system — reused by every major section/page
 * title so typography, alignment and container width stay identical across
 * the site. Only the element type (h1/h2) and animation wrapper vary per use.
 */
export const SECTION_TITLE_CLASS =
  "font-logo text-foreground/80 uppercase leading-[0.9] tracking-[-0.02em] text-[10vw] md:text-[7vw] lg:text-[5.5vw]";

export const SECTION_TITLE_CONTAINER_CLASS = "max-w-[1240px] mx-auto";

export const SECTION_TITLE_GUTTER_CLASS = "px-6 md:px-10 lg:px-14";

/** Divider placed directly beneath a large section title — same edge-to-edge treatment as "WAT IK DOE". */
export const SECTION_TITLE_DIVIDER_CLASS =
  "relative z-10 flex-shrink-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent";
