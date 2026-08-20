import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";
// @ts-ignore
import "@fontsource/anton";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { LOGO_ZWART, LOGO_FULL_BOX, LogoCrop } from "@/components/v2/BitBeeldLogo";

const FOOTER_BG = BRAND_ORANGE_HSL;

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { icon: Github,    label: "GitHub",    href: "#" },
  { icon: Mail,      label: "Mail",      href: "mailto:hello@studiobitbeeld.nl" },
];

interface FooterV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  // When provided, footer runs in "fixed" mode: position:fixed at viewport
  // bottom, y driven from "100%" (hidden below) to "0%" (fully visible).
  // This keeps the footer visible even after the Contact sticky pin exits.
  revealProgress?: MotionValue<number>;
}

const FooterV2 = ({ scrollContainerRef, revealProgress }: FooterV2Props) => {
  const footerRef = useRef<HTMLElement>(null);

  // Standalone scroll tracking — used only when revealProgress is absent.
  const { scrollYProgress } = useScroll({
    target: footerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "start 0.7"],
  });

  // Always call both transforms (React hooks must not be conditional).
  // standalone: subtle 80 → 0 slide driven by own scroll position
  const standaloneY       = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const standaloneOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // fixed mode: y from footer's full height below viewport → 0 (at bottom).
  // Opacity now shares the exact same [0,1] input range as y (previously
  // [0, 0.25], reaching full opacity while y was still mostly off-screen,
  // and — like ContactV2's old footerReveal cutoff — clamped there for the
  // rest of the scroll). Matching ranges keeps fade and slide in lockstep
  // and removes the second half of the "won't reverse" dead zone.
  const fixedY       = useTransform(revealProgress ?? scrollYProgress, [0, 1], ["100%", "0%"]);
  const fixedOpacity = useTransform(revealProgress ?? scrollYProgress, [0, 1], [0, 1]);

  const isFixed = !!revealProgress;
  const y       = isFixed ? fixedY       : standaloneY;
  const opacity = isFixed ? fixedOpacity : standaloneOpacity;

  return (
    <motion.footer
      ref={footerRef}
      style={{
        y,
        opacity,
        backgroundColor: FOOTER_BG,
        // Fixed mode: pinned to viewport bottom, immune to sticky/scroll changes.
        // The scroll container (overflow-y:auto) has no transform/filter, so
        // position:fixed correctly references the viewport even from inside it.
        position: isFixed ? "fixed" : "relative",
        bottom:   isFixed ? 0 : undefined,
        left:     isFixed ? 0 : undefined,
        right:    isFixed ? 0 : undefined,
        zIndex:   isFixed ? 48 : 47,
        boxShadow: "0 -24px 60px rgba(0,0,0,0.55)",
      }}
      className="px-6 md:px-12 lg:px-24 pt-10 md:pt-8 lg:pt-10 landscape-mobile:pt-5 pb-8 md:pb-6 lg:pb-8 landscape-mobile:pb-4 min-h-[32vh] landscape-mobile:min-h-0 flex flex-col justify-between overflow-hidden"
    >
      {/* ── Main row ─────────────────────────────────────────────────────── */}
      {/* Stacks on phones (flex-col) instead of squeezing both blocks into a
          row that has no room to breathe below md — desktop (lg+) keeps the
          original side-by-side layout untouched; tablet (md) also rows but
          with a tighter gap. */}
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-8 md:gap-6 lg:gap-8 landscape-mobile:gap-3 flex-1">

        {/* Left — wordmark anchored to bottom, sized off the same clamp() the
            old two-line Anton text used (as a font-size basis only — no text
            is rendered at it, it just sets the em scale below). 1.89em —
            not a plain 2× — matches the ratio between the full two-row mark
            and a single text row (validated against ScrollLogo, which uses
            the same font/weight/line-height and crops a single row to 0.9em). */}
        <div
          className="items-start md:self-end select-none text-[clamp(2rem,4.5vw,4rem)] landscape-mobile:text-[clamp(1.1rem,5vh,1.75rem)]"
          style={{ height: "1.89em" }}
        >
          <LogoCrop src={LOGO_ZWART} box={LOGO_FULL_BOX} className="h-full" alt="Bit & Beeld" />
        </div>

        {/* Right — statement + social icons */}
        <div className="flex flex-col items-start md:items-end justify-between gap-6 md:gap-4 lg:gap-6 landscape-mobile:gap-2 self-stretch shrink-0 max-w-full md:max-w-sm">
          {/* Tablet keeps this at the same size as mobile (text-xl) rather
              than desktop's larger step — it read oversized at 768–1023
              container widths; lg: restores the original text-3xl.
              landscape-mobile shrinks it again, further still. */}
          <p className="text-black font-antonio font-semibold text-xl lg:text-3xl landscape-mobile:text-sm leading-tight text-left md:text-right tracking-[-0.01em]">
            Design dat werkt.<br />
            Gebouwd met visie.
          </p>

          <div className="flex items-center gap-4 landscape-mobile:gap-3 mt-auto">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-black/60 hover:text-black transition-colors duration-150"
              >
                <Icon className="w-5 h-5 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 landscape-mobile:w-4 landscape-mobile:h-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="mt-8 md:mt-6 lg:mt-8 landscape-mobile:mt-3 pt-4 md:pt-3 lg:pt-4 landscape-mobile:pt-2 border-t border-black/15 flex items-center justify-between">
        <p className="text-black/40 text-xs landscape-mobile:text-[9px] font-body uppercase tracking-widest">
          © 2026 Studio Bit & Beeld
        </p>
        <p className="text-black/40 text-xs landscape-mobile:text-[9px] font-body uppercase tracking-widest">
          Amsterdam, NL
        </p>
      </div>
    </motion.footer>
  );
};

export default FooterV2;
