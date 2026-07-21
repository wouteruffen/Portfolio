import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface MobileHeroProps {
  /** Same handler Index.tsx wires into NavbarV2 — keeps CTA scrolling consistent. */
  onScrollToSection: (sectionId: string) => void;
}

/**
 * Mobile-only landing section, replacing HeroV2 + ScrollLogo below the `md`
 * breakpoint. Deliberately NOT a shrunk version of the desktop Hero: no
 * 300vh scroll-jacked parallax, no full-bleed portrait, no giant wordmark —
 * just a single, calm screen that states who this is and what to do next.
 * Normal document flow (no sticky/pinning), so it costs nothing to scroll
 * past and needs no scroll-linked motion values.
 */
const MobileHero = ({ onScrollToSection }: MobileHeroProps) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] landscape-mobile:min-h-0 px-6 pt-24 landscape-mobile:pt-14 pb-16 landscape-mobile:pb-6 text-center overflow-hidden">
      {/* Grid texture — same treatment as every other section, at rest (no
          scroll-driven parallax) so it costs nothing on scroll. */}
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

      {/* Availability indicator — the same info NavbarV2 shows on desktop
          (that block is `hidden md:flex`), given a home on mobile here.
          landscape-mobile: smaller badge, tighter bottom margin — this
          screen has ~380px of usable height after the navbar, not ~700px+
          like portrait. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-2 landscape-mobile:gap-1.5 px-4 landscape-mobile:px-3 py-2 landscape-mobile:py-1 rounded-full border border-foreground/15 bg-foreground/5 mb-8 landscape-mobile:mb-2"
      >
        <span
          className="w-2 h-2 landscape-mobile:w-1.5 landscape-mobile:h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
        />
        <span className="font-body text-xs landscape-mobile:text-[10px] text-foreground/70">Beschikbaar voor project</span>
        <span className="font-body text-xs landscape-mobile:text-[10px] text-foreground/40 uppercase tracking-wide">Medio 2026</span>
      </motion.div>

      {/* Studio logo — a modest static wordmark, not the animated Anton
          giant used on desktop. */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        className="relative z-10 font-logo uppercase text-foreground text-3xl landscape-mobile:text-lg mb-6 landscape-mobile:mb-2 tracking-tight"
      >
        Bit &amp; Beeld
      </motion.span>

      {/* Short introduction — landscape-mobile drops the narrow max-width so
          this reads as one line instead of wrapping to three across the
          much wider (800-1024px) short viewport. */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
        className="relative z-10 font-antonio font-semibold text-foreground leading-[1.05] text-[2rem] landscape-mobile:text-xl mb-4 landscape-mobile:mb-1.5 max-w-[15ch] landscape-mobile:max-w-none"
      >
        Merken en websites die werken.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
        className="relative z-10 font-body text-foreground/60 text-base landscape-mobile:text-xs leading-relaxed landscape-mobile:leading-snug max-w-[30ch] landscape-mobile:max-w-none mb-10 landscape-mobile:mb-4"
      >
        Ontworpen en gebouwd met intentie, helderheid en zorg.
      </motion.p>

      {/* Primary + secondary CTA — landscape-mobile lays these out side by
          side (not stacked) since the row's own height, not its width, is
          what's scarce here; this also guarantees the primary button never
          needs scrolling to reach. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
        className="relative z-10 flex flex-col landscape-mobile:flex-row items-center gap-3 landscape-mobile:gap-4 w-full max-w-xs landscape-mobile:max-w-none landscape-mobile:w-auto"
      >
        <button
          onClick={() => onScrollToSection("contact")}
          className="w-full landscape-mobile:w-auto py-4 landscape-mobile:py-2.5 px-0 landscape-mobile:px-6 rounded-full bg-brand-orange text-white font-body font-medium text-sm landscape-mobile:text-xs tracking-[0.12em] uppercase active:scale-[0.98] transition-transform"
        >
          Plan Gesprek
        </button>
        <button
          onClick={() => onScrollToSection("projecten")}
          className="group inline-flex items-center gap-2 py-3 landscape-mobile:py-2 px-4 landscape-mobile:px-2 font-body font-medium text-sm landscape-mobile:text-xs tracking-[0.1em] uppercase text-foreground/70"
        >
          Bekijk werk
          <ArrowRight size={14} className="transition-transform group-active:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
};

export default MobileHero;
