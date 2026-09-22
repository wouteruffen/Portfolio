import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import SubpageHeaderSection from "./SubpageHeaderSection";
import { SECTION_TITLE_CLASS } from "@/lib/sectionTitle";
import { getHomeReturnHref } from "@/lib/homepageScroll";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SubpageHeaderProps {
  title: ReactNode;
  /**
   * Short service introduction (1-2 sentences), rendered directly under the
   * title inside this same header block — title → intro → content is the
   * shared shape for every service subpage (Brandbook chapter 15.1/16).
   * Centralizing it here, rather than each page re-implementing its own
   * intro block further down, is what keeps title-to-intro spacing
   * consistent across the whole family instead of drifting per page.
   */
  intro?: ReactNode;
  /**
   * Homepage section id to fall back to when there's no saved scroll
   * position to restore (e.g. the subpage URL was opened directly).
   * Defaults to "projecten" — where every project-category subpage
   * (Webdesign & Development, Design & Identiteit, Print & Campagne Design,
   * Content & Social Media) is linked from.
   */
  fallbackSection?: string;
}

/**
 * Full header hierarchy — back link, title, optional intro — for the
 * regular subpages (project category pages). Reproduces OverMij's opening
 * spread exactly (same SECTION_TITLE_CLASS token for the title) so every
 * subpage title belongs to the same design system as "Meer over mij", the
 * reference page.
 *
 * "Terug naar home" is functional navigation, not a passive label — it uses
 * brand orange (not the muted foreground tone) so it reads as an active,
 * intentional wayfinding element while staying clearly subordinate to the
 * title's own type scale.
 */
const SubpageHeader = ({ title, intro, fallbackSection = "projecten" }: SubpageHeaderProps) => {
  const { t } = useLanguage();
  return (
  <SubpageHeaderSection>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Link
        to={getHomeReturnHref(fallbackSection)}
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold text-brand-orange/80 hover:text-brand-orange focus-visible:text-brand-orange transition-colors mb-10 md:mb-14"
      >
        <ArrowLeft size={14} /> {t.common.backToHome}
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

    {intro && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="font-antonio font-medium leading-relaxed max-w-[680px] text-foreground/80 mt-6 md:mt-8"
        style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)" }}
      >
        {intro}
      </motion.p>
    )}
  </SubpageHeaderSection>
  );
};

export default SubpageHeader;
