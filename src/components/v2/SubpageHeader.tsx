import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import SubpageHeaderSection from "./SubpageHeaderSection";
import { SECTION_TITLE_CLASS } from "@/lib/sectionTitle";
import { getHomeReturnHref } from "@/lib/homepageScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SubpageHeaderProps {
  title: ReactNode;
  /**
   * Homepage section id to fall back to when there's no saved scroll
   * position to restore (e.g. the subpage URL was opened directly).
   * Defaults to "projecten" — where every project-category subpage
   * (Webdesign & Development, Content & Social Media, Print & Design,
   * Digitale Producten) is linked from.
   */
  fallbackSection?: string;
}

/**
 * Full header hierarchy — back link, title — for the regular subpages
 * (project category pages). Reproduces OverMij's opening spread exactly
 * (same SECTION_TITLE_CLASS token for the title) so every subpage title
 * belongs to the same design system as "Meer over mij", the reference page.
 */
const SubpageHeader = ({ title, fallbackSection = "projecten" }: SubpageHeaderProps) => (
  <SubpageHeaderSection>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Link
        to={getHomeReturnHref(fallbackSection)}
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-foreground/50 hover:text-brand-orange transition-colors mb-10 md:mb-14"
      >
        <ArrowLeft size={14} /> Terug naar home
      </Link>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={SECTION_TITLE_CLASS}
    >
      {title}
    </motion.h1>
  </SubpageHeaderSection>
);

export default SubpageHeader;
