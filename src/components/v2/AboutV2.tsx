import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";
import React from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const DARK_BG = "hsl(0, 0%, 8%)";
const ACCENT  = "#FF4A2A";
const EASE    = [0.22, 1, 0.36, 1] as const;
const VP      = { once: false, amount: 0.1 } as const;

const SKILLS = [
  {
    label: "Figma",
    icon: (
      <svg viewBox="0 0 24 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2"  width="10" height="14" rx="5" opacity="0.7" />
        <rect x="12" y="2" width="10" height="14" rx="5" opacity="0.5" />
        <rect x="2" y="16" width="10" height="14" rx="5" opacity="0.5" />
        <circle cx="17" cy="23" r="5" opacity="1" />
        <rect x="2" y="30" width="10" height="6"  rx="5" opacity="0.35" />
      </svg>
    ),
  },
  {
    label: "HTML",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0l2 22.6L12 24l8.5-1.4L22.5 0H1.5zm16.4 6.9H7l.3 3.2h10.3l-.9 10.2L12 21.5l-4.7-1.2-.3-3.9h3.1l.2 2 1.7.5 1.7-.5.2-2.5H7.3L6.5 6.9h11l-.6 3.4z" />
      </svg>
    ),
  },
  {
    label: "CSS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0l2 22.6L12 24l8.5-1.4L22.5 0H1.5zm14.1 16.9l-.4 4.3-3.2.9-3.2-.9-.2-2.7H11l.1 1.4 1.1.3 1.1-.3.1-1.6H7.9l-.9-9.5h10l-.3 3.2H9.9l.2 2h7.2l-.7 3.9z" />
      </svg>
    ),
  },
  {
    label: "JavaScript",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="24" height="24" rx="2" opacity="0.15" />
        <path d="M2 2h20v20H2V2zm11.3 14.5c.3.5.6.9 1.3.9.5 0 .9-.3.9-.7 0-.5-.4-.7-1-.9l-.4-.2c-1-.4-1.6-1-1.6-2.1 0-1.1.8-1.9 2.1-1.9.9 0 1.6.3 2.1 1.1l-1.1.7c-.3-.5-.5-.6-.9-.6-.4 0-.7.3-.7.6 0 .4.3.6.8.8l.4.2c1.1.5 1.8 1 1.8 2.2 0 1.3-1 2.1-2.4 2.1-1.3 0-2.2-.6-2.6-1.5l1.3-.7zm-5.4.2c.2.4.4.7.9.7.4 0 .7-.2.7-.8V9.8h1.5v6.8c0 1.4-.8 2-2 2-1.1 0-1.7-.6-2-1.3l.9-.6z" />
      </svg>
    ),
  },
  {
    label: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="24" height="24" rx="2" opacity="0.15" />
        <path d="M2 2h20v20H2V2zm11 9.5h-3V10H18v1.5h-3V18h-2v-6.5zm-5.5 5.1c.3.5.8.8 1.4.8.5 0 .9-.2.9-.6 0-.5-.5-.6-1.2-.9l-.3-.1c-1-.4-1.6-.9-1.6-2 0-1 .8-1.8 2.1-1.8.9 0 1.6.3 2.1 1l-1 .7c-.2-.4-.5-.6-.9-.6-.4 0-.6.2-.6.5 0 .4.3.5.8.7l.3.1c1.2.5 1.8 1 1.8 2.1 0 1.2-.9 2-2.4 2-1.2 0-2.1-.6-2.5-1.4l1.1-.5z" />
      </svg>
    ),
  },
];

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

      {/* ── STATIC TITLE ──────────────────────────────────────────── */}
      <div className="w-full text-center px-6 md:px-16 lg:px-24" style={{ marginTop: "92px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-white/80 uppercase leading-[0.9] tracking-[-0.02em] text-[14vw] md:text-[10vw] lg:text-[8vw]"
        >
          OVER MIJ
        </motion.h2>
      </div>

      {/* ── MAIN CONTENT: portrait left-offset + text ─────────────── */}
      <div className="relative z-10 flex-1 flex flex-col w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">

        {/* Portrait + text — centered in remaining space */}
        <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-10 md:gap-16 py-8 md:py-10 items-stretch">

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

        </div>{/* end centering wrapper */}

        {/* ── META ROW ────────────────────────────────────────────── */}
        <div
          className="py-4 md:py-6"
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

      {/* ── SKILLS / ICONS ROW ───────────────────────────────────── */}
      <div
        className="w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto pb-6 md:pb-8"
        style={{ borderTop: "1px solid hsl(0 0% 100% / 0.08)", paddingTop: "20px" }}
      >
        <motion.div
          className="flex items-center justify-center gap-8 md:gap-12 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          viewport={VP}
        >
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="group flex flex-col items-center gap-2 cursor-default"
            >
              <div
                className="w-8 h-8 text-white/35 transition-all duration-300 group-hover:text-white/80 group-hover:scale-110"
              >
                {skill.icon}
              </div>
              <span className="text-[9px] tracking-[0.3em] font-body uppercase text-white/20 transition-colors duration-300 group-hover:text-white/50">
                {skill.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
    </div>
  );
};

export default AboutV2;
