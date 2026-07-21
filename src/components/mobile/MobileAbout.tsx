import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import React from "react";
import aboutPortrait from "@/assets/about-portrait.jpg";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { SECTION_TITLE_CLASS, SECTION_TITLE_DIVIDER_CLASS } from "@/lib/sectionTitle";

const ACCENT = BRAND_ORANGE_HSL;
const EASE   = [0.22, 1, 0.36, 1] as const;
const VP     = { once: true, amount: 0.2 } as const;

interface MobileAboutProps {
  /**
   * Sentinel for NavbarV2's IntersectionObserver — same mechanism the
   * desktop AboutV2 uses, just placed at the top of this normal-flow
   * section instead of a sticky-panel wrapper. No NavbarV2 changes needed.
   */
  aboutTopRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Mobile "Over Mij" — a single normal-flow section (no 200vh sticky-pin
 * wrapper, no scroll-driven image parallax). Image first (compact, not
 * full-bleed), then intro copy, then one full-width CTA.
 */
const MobileAbout = ({ aboutTopRef }: MobileAboutProps) => {
  return (
    <section
      id="over-ons"
      className="relative scroll-mt-24 px-6 pt-24 landscape-mobile:pt-14 pb-20 landscape-mobile:pb-8 overflow-hidden bg-background"
    >
      <div ref={aboutTopRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" aria-hidden="true" />

      {/* Grid texture — same recipe as every other section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <h2 className={`relative z-10 ${SECTION_TITLE_CLASS} mb-4 landscape-mobile:mb-2`}>OVER MIJ</h2>
      <div className={`${SECTION_TITLE_DIVIDER_CLASS} mb-8 landscape-mobile:mb-4`} />

      {/* landscape-mobile: image + copy sit side by side (this outer div has
          no layout classes outside that variant, so portrait/tablet/desktop
          — which don't use this component at all past tablet anyway — see
          zero change here) — a full-width 4:3 image alone can exceed the
          entire usable height of a 956x440 screen, so this is the "compact
          side-by-side layout" the short-viewport composition needs. */}
      <div className="landscape-mobile:flex landscape-mobile:flex-row landscape-mobile:items-center landscape-mobile:gap-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative z-10 rounded-2xl overflow-hidden mb-8 landscape-mobile:mb-0 aspect-[4/3] landscape-mobile:aspect-square landscape-mobile:w-[34%] landscape-mobile:flex-shrink-0"
        >
          <img
            src={aboutPortrait}
            alt="Portret van Wouter"
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={600}
          />
        </motion.div>

        <div className="landscape-mobile:flex-1 landscape-mobile:min-w-0">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className="relative z-10 flex items-center gap-3 mb-3 landscape-mobile:mb-1.5"
          >
            <div className="w-5 h-px" style={{ backgroundColor: ACCENT }} />
            <span className="text-[10px] landscape-mobile:text-[8px] tracking-[0.35em] font-body uppercase" style={{ color: ACCENT }}>
              Introduction
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="relative z-10 font-antonio font-semibold text-foreground leading-[0.95] text-4xl landscape-mobile:text-lg mb-4 landscape-mobile:mb-1.5"
          >
            Hi, I'm <span style={{ color: ACCENT }}>Wouter</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="relative z-10 space-y-3 landscape-mobile:space-y-1 mb-8 landscape-mobile:mb-3"
          >
            <p className="font-body text-base landscape-mobile:text-xs leading-relaxed landscape-mobile:leading-snug text-foreground/60">
              Ik ontwerp en ontwikkel digitale ervaringen die niet alleen goed ogen, maar ook werken.
              Van eerste idee tot uitgewerkt concept denk ik mee in structuur, gebruik en uitstraling.
            </p>
            <p className="font-body text-base landscape-mobile:text-xs leading-relaxed landscape-mobile:leading-snug text-foreground/60">
              Geen overbodige complexiteit, maar duidelijke keuzes en een resultaat dat klopt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
            className="relative z-10"
          >
            <Link
              to="/over-mij"
              className="group flex items-center justify-center gap-3 w-full landscape-mobile:w-auto text-white font-body font-medium text-sm landscape-mobile:text-[10px] tracking-[0.12em] uppercase py-4 landscape-mobile:py-2 px-0 landscape-mobile:px-5 rounded-full active:scale-[0.98] transition-transform"
              style={{ backgroundColor: ACCENT }}
            >
              Meer over mij
              <ArrowRight size={16} className="transition-transform group-active:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MobileAbout;
