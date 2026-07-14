import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";
import React from "react";
import { SECTION_TITLE_CLASS, SECTION_TITLE_DIVIDER_CLASS } from "@/lib/sectionTitle";

const ACCENT  = "#FF4A2A";
const EASE    = [0.22, 1, 0.36, 1] as const;
const VP      = { once: false, amount: 0.1 } as const;


interface AboutV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  /** Called with true when About snaps into place; false when scrolled back past the reset threshold. */
  onSnap?: (active: boolean) => void;
}

const AboutV2 = ({ scrollContainerRef, onSnap }: AboutV2Props) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);

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
      onSnap?.(true);
    }
    if (latest < 0.25) {
      hasSnapped.current = false;
      onSnap?.(false);
    }
  });

  return (
    <div
      ref={outerRef}
      style={{ height: "200vh", marginTop: "-100vh", position: "relative", zIndex: 42 }}
    >
      <motion.section
        ref={sectionRef}
        id="over-ons"
        className="relative flex flex-col overflow-hidden"
        style={{
          backgroundColor: "hsl(var(--background))",
          y: revealY,
          borderRadius: revealRadius,
          height: "100vh",
          position: "sticky",
          top: 0,
          boxShadow: "var(--section-shadow)",
        }}
      >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Sticky title — pinned to the same top row as WAT IK DOE ─── */}
      <div
        className="relative z-10 w-full px-6 md:px-10 lg:px-14 flex-shrink-0"
        style={{ paddingTop: "100px", paddingBottom: "12px" }}
      >
        <div className="max-w-[1240px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={SECTION_TITLE_CLASS}
          >
            OVER MIJ
          </motion.h2>
        </div>
      </div>

      {/* Divider */}
      <div className={SECTION_TITLE_DIVIDER_CLASS} />

      {/* ── TWO-COLUMN EDITORIAL LAYOUT ──────────────────────────── */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14"
        style={{ paddingBottom: "40px" }}
      >
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-10 md:gap-12 lg:gap-16">

          {/* ── LEFT COLUMN: intro card → CTA ─────────────── */}
          <div className="flex flex-col">

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
                className="text-[10px] tracking-[0.4em] font-body uppercase"
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
              className="font-antonio font-semibold text-foreground leading-[0.9] tracking-tight mb-5"
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
              <p className="font-body text-lg leading-relaxed text-foreground/60">
                Ik ontwerp en ontwikkel digitale ervaringen die niet alleen goed ogen, maar ook werken.
                Van eerste idee tot uitgewerkt concept denk ik mee in structuur, gebruik en uitstraling.
              </p>
              <p className="font-body text-lg leading-relaxed text-foreground/60">
                Geen overbodige complexiteit, maar duidelijke keuzes en een resultaat dat klopt.
                Of het nu gaat om webdesign, branding of interactie — alles draait om balans tussen vorm en functie.
              </p>
              <p className="font-body text-sm leading-relaxed text-foreground/30 italic">
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
                className="group inline-flex items-center gap-3 text-white font-body font-medium text-xs tracking-[0.18em] uppercase px-8 py-4 transition-opacity hover:opacity-80"
                style={{ backgroundColor: ACCENT }}
              >
                Meer over mij
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: large dominant portrait ──────────────── */}
          <motion.div
            className="hidden md:block md:h-full"
            style={{ y: imageY }}
          >
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
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

          </div>
        </div>
      </div>
    </motion.section>
    </div>
  );
};

export default AboutV2;
