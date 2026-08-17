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
 *
 * The gap below the title used to end in a divider line; every subpage's
 * content section already adds its own py-16/24 top padding right after
 * this section, so with the divider gone this bottom padding was tightened
 * (was pb-16/20) rather than left stacking two full paddings on top of each
 * other with nothing marking the seam between them.
 */
const SubpageHeaderSection = ({ children }: { children: ReactNode }) => (
  <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} ${SECTION_TITLE_PADDING_TOP_CLASS} pb-10 md:pb-14`}>
    <div className={SECTION_TITLE_CONTAINER_CLASS}>{children}</div>
  </section>
);

export default SubpageHeaderSection;
