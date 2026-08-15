import type { ReactNode } from "react";
import {
  SECTION_TITLE_CONTAINER_CLASS,
  SECTION_TITLE_GUTTER_CLASS,
  SECTION_TITLE_PADDING_TOP_CLASS,
} from "@/lib/sectionTitle";

/**
 * Shared header shell for regular subpages: same gutter, max-width container
 * and navbar-to-title spacing as OverMij's opening spread, so every
 * subpage's back link + title land in the identical centered content column.
 * Owns positioning only — callers supply their own back link + title
 * markup as children, so per-page typography stays untouched.
 */
const SubpageHeaderSection = ({ children }: { children: ReactNode }) => (
  <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} ${SECTION_TITLE_PADDING_TOP_CLASS} pb-16 md:pb-20`}>
    <div className={SECTION_TITLE_CONTAINER_CLASS}>{children}</div>
  </section>
);

export default SubpageHeaderSection;
