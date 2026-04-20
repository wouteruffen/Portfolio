import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";
import React from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const DARK_BG = "hsl(0, 0%, 8%)";
const ACCENT  = "hsl(350, 58%, 46%)";
const EASE    = [0.22, 1, 0.36, 1] as const;
const VP      = { once: false, amount: 0.1 } as const;

const META = [
  { label: "Locatie",  value: "Amsterdam, NL"     },
  { label: "Focus",    value: "Web Design & Dev"   },
  { label: "Aanpak",   value: "Concept → Code"     },
  { label: "Klanten",  value: "Startup → Scale-up" },
];

interface AboutV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  /** Called with true when About snaps into place; false when scrolled back past the reset threshold. */
  onSnap?: (active: boolean) => void;
}

const AboutV2 = ({ scrollContainerRef, onSnap }: AboutV2Props) => {
  // outerRef: the tall scroll-tracked wrapper. Tracking this (not the sticky
  // inner) gives accurate revealProgress even when the section is pinned.
  const outerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);

  // Portrait parallax uses the outer wrapper so sticky doesn't distort values.
  const { scrollYProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end end"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const { scrollYProgress: revealProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "start start"],
  });
  const revealY = useTransform(
    revealProgress,
    [0, 0.40, 0.60, 0.65, 1],
    [100, 55, 8, 0, 0],
  );
  const revealRadius = useTransform(
    revealProgress,
    [0, 0.60, 0.65, 1],
    ["20px 20px 0px 0px", "20px 20px 0px 0px", "0px 0px 0px 0px", "0px 0px 0px 0px"],
  );

  useMotionValueEvent(revealProgress, "change", (latest) => {
    if (latest >= 0.65 && !hasSnapped.current) {
      hasSnapped.current = true;
      // Notify parent that About is now the active snapped section.
      onSnap?.(true);
      const container = scrollContainerRef?.current;
      const outer = outerRef.current;
      if (container && outer) {
        const targetY = outer.getBoundingClientRect().top + container.scrollTop;
        smoothScrollTo(container, targetY);
      }
    }
    if (latest < 0.25) {
      hasSnapped.current = false;
      // Notify parent that the user has scrolled back to the Hero.
      onSnap?.(false);
    }
  });

  return (
    // 200vh outer wrapper keeps the sticky inner section pinned at the top
    // while Projects slides up — mirrors exactly how Hero stays under About.
    <div
      ref={outerRef}
      style={{ height: "200vh", marginTop: "-100vh", position: "relative", zIndex: 42 }}
    >
      <motion.section
        ref={sectionRef}
        id="over-ons"
        className="relative flex flex-col overflow-hidden"
        style={{
          backgroundColor: DARK_BG,
          y: revealY,
          borderRadius: revealRadius,
          height: "100vh",
          position: "sticky",
          top: 0,
          boxShadow: "0 -24px 60px rgba(0,0,0,0.55)",
        }}
      >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── MARQUEE TITLE ─────────────────────────────────────────── */}
      {/* marginTop pushes the inverted band below the navbar so it never overlaps.
          The light background starts here, not behind the navbar. */}
      <div
        className="overflow-hidden"
        style={{
          marginTop: "80px",
          backgroundColor: "hsl(0, 0%, 95%)",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        <motion.div
          className="flex items-baseline whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {[0, 1].map((half) => (
            <span key={half} className="flex items-baseline">
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="flex items-baseline font-display font-extrabold uppercase tracking-tighter leading-none select-none"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    color: "hsl(0 0% 8%)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  OVER MIJ
                  <span
                    className="mx-6 md:mx-10 flex-shrink-0"
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      backgroundColor: ACCENT,
                      transform: "rotate(45deg)",
                      verticalAlign: "middle",
                      marginBottom: "2px",
                    }}
                    aria-hidden
                  />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── MAIN CONTENT: portrait left-offset + text ─────────────── */}
      <div className="relative z-10 flex-1 flex flex-col w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">

        {/* Portrait + text side by side */}
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-10 md:gap-16 pt-10 md:pt-14 pb-6 md:pb-8 items-stretch">

          {/* Portrait — dominant, large */}
          <motion.div
            className="order-1 h-full"
            style={{ y: imageY }}
          >
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: -32, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              viewport={{ once: false, amount: 0.08 }}
            >
              <div className="h-full overflow-hidden rounded-2xl">
                <img
                  src={aboutPortrait}
                  alt="Portret van Wouter"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1000}
                  height={1333}
                  style={{ transform: "scale(1.06)", transformOrigin: "center top" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text block */}
          <div className="order-2 flex flex-col justify-center pt-4 md:pt-8">

            {/* Red label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
              viewport={VP}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
              <span
                className="text-[10px] tracking-[0.4em] font-body font-medium uppercase"
                style={{ color: ACCENT }}
              >
                Introduction
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              viewport={VP}
              className="font-display font-extrabold text-white leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
            >
              Hi, I'm
              <br />
              <span style={{ color: ACCENT }}>Wouter</span>
            </motion.h3>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
              viewport={VP}
              className="space-y-3 mb-6"
            >
              <p className="font-body text-lg leading-relaxed text-white/60">
                Ik ontwerp en ontwikkel digitale ervaringen die niet alleen goed ogen, maar ook werken.
                Van eerste idee tot uitgewerkt concept denk ik mee in structuur, gebruik en uitstraling.
              </p>
              <p className="font-body text-lg leading-relaxed text-white/60">
                Geen overbodige complexiteit, maar duidelijke keuzes en een resultaat dat klopt.
                Of het nu gaat om webdesign, branding of interactie — alles draait om balans tussen vorm en functie.
              </p>
              <p className="font-body text-sm leading-relaxed text-white/30 italic">
                Ik werk het liefst aan projecten waar creativiteit en techniek samenkomen.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38, ease: EASE }}
              viewport={VP}
            >
              <Link
                to="/over-mij"
                className="group inline-flex items-center gap-3 text-white font-display font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-opacity hover:opacity-80"
                style={{ backgroundColor: ACCENT }}
              >
                Meer over mij
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── META ROW ────────────────────────────────────────────── */}
        <div
          className="mt-auto py-4 md:py-6"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.08)" }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-y-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            viewport={VP}
          >
            {META.map((item) => (
              <div key={item.label}>
                <p className="text-white/20 text-[9px] font-body tracking-[0.35em] uppercase mb-2">
                  {item.label}
                </p>
                <p className="text-white/55 text-base font-body font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* ── BOTTOM MARQUEE ────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-3 md:py-4"
        style={{
          borderTop:    "1px solid hsl(0 0% 100% / 0.08)",
          borderBottom: "1px solid hsl(0 0% 100% / 0.08)",
        }}
      >
        <motion.div
          className="flex items-center gap-14 text-base md:text-lg whitespace-nowrap font-display font-extrabold tracking-widest"
          style={{ color: "hsl(0 0% 100% / 0.18)" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 35, repeat: Infinity, ease: "linear" } }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="flex items-center gap-14 shrink-0 select-none">
              HI, I'M WOUTER
              <span className="w-2 h-2 rotate-45 inline-block flex-shrink-0" style={{ backgroundColor: ACCENT }} />
              CREATIVE DEVELOPER
              <span className="w-2 h-2 rotate-45 inline-block flex-shrink-0" style={{ backgroundColor: ACCENT }} />
              DESIGN & DEVELOPMENT
              <span className="w-2 h-2 rotate-45 inline-block flex-shrink-0" style={{ backgroundColor: ACCENT }} />
            </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
    </div>
  );
};

export default AboutV2;
