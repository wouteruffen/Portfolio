import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const DARK      = "#0B0B0B";
const LIGHT     = "#F4F1EB";
const OFF_WHITE = "#F5F5F5";
const ACCENT    = "#FF4A2A";

/* ─── Color palette ──────────────────────────────────────────────────────── */
const PALETTE = [
  { name: "Accent Red",   hex: "#FF4A2A", bg: "#FF4A2A", lightText: false },
  { name: "Warm Orange",  hex: "#FF7A4A", bg: "#FF7A4A", lightText: false },
  { name: "Muted Yellow", hex: "#E8C87A", bg: "#E8C87A", lightText: true  },
  { name: "Soft Green",   hex: "#7AB87A", bg: "#7AB87A", lightText: true  },
  { name: "Dark Grey",    hex: "#2A2A2A", bg: "#2A2A2A", lightText: false },
];

/*
 * Editorial easing: holds 18 % at each end so each section sits still briefly,
 * then rushes through the middle with an ease-in-out cubic curve.
 */
const editorialEase = (t: number): number => {
  const H = 0.18;
  if (t <= H) return 0;
  if (t >= 1 - H) return 1;
  const n = (t - H) / (1 - 2 * H);
  return n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2;
};

/* ─── Reusable primitives ────────────────────────────────────────────────── */
const Rule = ({ light = false }: { light?: boolean }) => (
  <div
    className="w-full flex-shrink-0"
    style={{ height: "1px", background: light ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.08)" }}
  />
);

const SectionTag = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <div className="mb-6 flex-shrink-0">
    <div className="flex items-baseline gap-4 mb-4">
      <span
        className="font-body tabular-nums flex-shrink-0"
        style={{ fontSize: "11px", letterSpacing: "0.25em", color: light ? "#999999" : "#555555" }}
      >
        {n}
      </span>
      <span
        className="font-display font-extrabold uppercase leading-none"
        style={{
          fontSize: "clamp(1.3rem, 2.4vw, 3rem)",
          letterSpacing: "0.02em",
          color: light ? "#1A1A1A" : OFF_WHITE,
        }}
      >
        {label}
      </span>
    </div>
    <Rule light={light} />
  </div>
);

/* ─── Slide wrapper ──────────────────────────────────────────────────────── */
interface SlideProps {
  index: number;
  scrollY: MotionValue<number>;
  vh: number;
  children: React.ReactNode;
  bg?: string;
}

const Slide = ({ index, scrollY, vh, children, bg = DARK }: SlideProps) => {
  const y = useTransform(
    scrollY,
    [(index - 1) * vh, index * vh],
    [vh, 0],
    { ease: editorialEase, clamp: true },
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: index + 1,
        backgroundColor: bg,
        y: index === 0 ? 0 : y,
      }}
    >
      <div className="h-full flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto h-full flex flex-col">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── TOC chapter list ───────────────────────────────────────────────────── */
const TOC_CHAPTERS = [
  { n: "01", label: "Cover" },
  { n: "02", label: "Inhoudsopgave" },
  { n: "03", label: "Logo & Monogram" },
  { n: "04", label: "Color System" },
  { n: "05", label: "Typography" },
  { n: "06", label: "Grid & Layout" },
  { n: "07", label: "UI Elements" },
  { n: "08", label: "Dark Mode" },
  { n: "09", label: "Light Mode" },
  { n: "10", label: "Voice & Tone" },
  { n: "11", label: "Do's & Don'ts" },
  { n: "12", label: "Colophon" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

const TOTAL_SECTIONS = 12;

const Brandbook = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(() => window.innerHeight);

  useSmoothScroll(scrollRef);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollY } = useScroll({ container: scrollRef });

  /* Smooth programmatic scroll to a given section index */
  const scrollToSection = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = index * vh;
    const start = container.scrollTop;
    if (Math.abs(target - start) < 2) return;
    const duration = 950;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      container.scrollTop = start + (target - start) * eased;
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [vh]);

  return (
    <>
      <CursorEffects />
      <NavbarV2 />

      {/* Scroll container — hidden scrollbar, full viewport */}
      <div
        ref={scrollRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        } as React.CSSProperties}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {/* Scroll track — 12 × 100 vh of scrollable space */}
        <div style={{ height: `${TOTAL_SECTIONS * 100}vh`, position: "relative" }}>

          {/* Sticky layer — pinned to viewport throughout */}
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

            {/* ── 01 COVER ─────────────────────────────────────────────── */}
            <Slide index={0} scrollY={scrollY} vh={vh}>

              {/* Top bar */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 font-body transition-colors"
                  style={{ fontSize: "10px", color: "#777777", letterSpacing: "0.08em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = OFF_WHITE)}
                  onMouseLeave={e => (e.currentTarget.style.color = "#777777")}
                >
                  <ArrowLeft size={10} /> Back
                </Link>
                <span style={{ color: "#555555", fontSize: "10px" }}>·</span>
                <span className="font-body" style={{ fontSize: "10px", color: "#CCCCCC", letterSpacing: "0.1em" }}>
                  Vol. 1 — The Brandbook
                </span>
              </div>

              {/* Vertically centered title */}
              <div className="flex-1 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75 }}
                  className="flex items-start justify-between"
                >
                  <h1
                    className="font-display font-extrabold uppercase leading-[0.87]"
                    style={{ fontSize: "clamp(4rem, 10vw, 12rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
                  >
                    BRAND<br />BOOK<span style={{ color: ACCENT }}>.</span>
                  </h1>
                  <div className="text-right flex-shrink-0 space-y-1.5 mt-2">
                    {["Studio Bit & Beeld", "Groningen, NL", "2026"].map((line) => (
                      <p key={line} className="font-body" style={{ fontSize: "11px", color: "#AAAAAA" }}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bottom — rule + description + scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex-shrink-0"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="origin-left mb-6"
                >
                  <Rule />
                </motion.div>
                <div className="flex items-end justify-between">
                  <p className="font-body" style={{ fontSize: "13px", color: "#777777", maxWidth: "420px", lineHeight: 1.65 }}>
                    A complete visual identity system for Studio Bit & Beeld — defining how the brand
                    looks, speaks, and behaves across every touchpoint.
                  </p>
                  <p
                    className="font-body flex-shrink-0"
                    style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.35em" }}
                  >
                    SCROLL TO EXPLORE
                  </p>
                </div>
              </motion.div>
            </Slide>

            {/* ── 02 INHOUDSOPGAVE ─────────────────────────────────────── */}
            <Slide index={1} scrollY={scrollY} vh={vh}>
              <SectionTag n="02" label="INHOUDSOPGAVE" />

              <div className="flex-1 grid grid-cols-2 gap-x-20 content-start min-h-0">
                {TOC_CHAPTERS.map(({ n, label }, index) => (
                  <motion.div
                    key={n}
                    className="group flex items-center gap-6 cursor-pointer relative"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px", paddingBottom: "20px" }}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
                    onClick={() => scrollToSection(index)}
                  >
                    <span
                      className="font-body tabular-nums flex-shrink-0 transition-colors duration-200 group-hover:text-[#FF4A2A]"
                      style={{ fontSize: "11px", color: "#555555", letterSpacing: "0.1em" }}
                    >
                      {n}
                    </span>
                    <span
                      className="font-display font-bold uppercase transition-colors duration-200 group-hover:text-[#FF4A2A]"
                      style={{ fontSize: "clamp(18px, 2vw, 28px)", color: OFF_WHITE, letterSpacing: "0.01em" }}
                    >
                      {label}
                    </span>
                    <span
                      className="ml-auto font-body flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ fontSize: "14px", color: ACCENT }}
                    >
                      →
                    </span>
                  </motion.div>
                ))}
              </div>
            </Slide>

            {/* ── 03 LOGO & MONOGRAM ───────────────────────────────────── */}
            <Slide index={2} scrollY={scrollY} vh={vh}>
              <SectionTag n="03" label="LOGO & MONOGRAM" />

              <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
                <div
                  className="col-span-2 flex flex-col items-center justify-center"
                  style={{ background: "#EDEBE7" }}
                >
                  <span
                    className="font-logo uppercase text-black leading-none tracking-tight"
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
                  >
                    BIT & BEELD
                  </span>
                </div>

                <div className="flex flex-col gap-3 min-h-0">
                  <div
                    className="flex-1 flex flex-col items-center justify-center"
                    style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="font-body mb-3" style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.3em" }}>DARK</p>
                    <span className="font-logo uppercase leading-none" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: OFF_WHITE }}>
                      BIT & BEELD
                    </span>
                  </div>
                  <div
                    className="flex-1 flex flex-col items-center justify-center"
                    style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="font-body mb-3" style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.3em" }}>ACCENT</p>
                    <span className="font-logo uppercase leading-none" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: ACCENT }}>
                      BIT & BEELD
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 flex-shrink-0">
                {[
                  { label: "PRIMARY",  body: "Light background — default application. Anton, uppercase, full wordmark." },
                  { label: "DARK",     body: "Off-white on near-black. Same weight, same spacing. Use in dark contexts." },
                  { label: "ACCENT",   body: "#FF4A2A variant — reserved for special moments only. Never as default." },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <Rule />
                    <p className="font-body mt-3 mb-1" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.22em" }}>{label}</p>
                    <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>{body}</p>
                  </div>
                ))}
              </div>
            </Slide>

            {/* ── 04 COLOR SYSTEM ──────────────────────────────────────── */}
            <Slide index={3} scrollY={scrollY} vh={vh}>
              <SectionTag n="04" label="COLOR SYSTEM" />

              <h2
                className="font-display font-extrabold uppercase leading-[0.88] mb-8 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4.5vw, 6rem)", color: OFF_WHITE, letterSpacing: "-0.025em", opacity: 0.6 }}
              >
                TWO STATES.<br />ONE SIGNAL.
              </h2>

              <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
                {PALETTE.map(({ name, hex, bg, lightText }) => (
                  <div key={name} className="flex flex-col justify-end p-4" style={{ background: bg }}>
                    <p
                      className="font-body font-medium"
                      style={{ fontSize: "10px", color: lightText ? "#222222" : OFF_WHITE, letterSpacing: "0.07em" }}
                    >
                      {name}
                    </p>
                    <p className="font-body mt-0.5" style={{ fontSize: "9px", color: lightText ? "#555555" : "rgba(255,255,255,0.55)" }}>
                      {hex}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-2 flex-shrink-0"
                style={{ height: "4px", background: "linear-gradient(to right, #FF4A2A, #FF7A4A, #E8C87A, #7AB87A, #2A2A2A)" }}
              />

              <div className="mt-4 grid grid-cols-2 gap-8 flex-shrink-0">
                {[
                  { label: "PRIMARY SIGNAL", body: "#FF4A2A — the only color accent. Used sparingly across both light and dark states." },
                  { label: "NEUTRAL SYSTEM", body: "#0B0B0B and #F4F1EB as structural base. No additional color accents outside this system." },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <Rule />
                    <p className="font-body mt-3 mb-1" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.22em" }}>{label}</p>
                    <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>{body}</p>
                  </div>
                ))}
              </div>
            </Slide>

            {/* ── 05 TYPOGRAPHY ────────────────────────────────────────── */}
            <Slide index={4} scrollY={scrollY} vh={vh}>
              <SectionTag n="05" label="TYPOGRAPHY" />

              <h2
                className="font-display font-bold mb-5 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4vw, 5rem)", color: OFF_WHITE, letterSpacing: "-0.02em", opacity: 0.6 }}
              >
                Three fonts. One clear voice.
              </h2>

              <div className="flex-1 grid grid-cols-3 gap-2 min-h-0">
                {/* Anton */}
                <div className="flex flex-col p-6" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>DISPLAY / LOGO</p>
                  <p className="font-body mb-5" style={{ fontSize: "10px", color: "#555555" }}>Anton</p>
                  <span className="font-logo uppercase text-[#F5F5F5] leading-none mt-auto" style={{ fontSize: "clamp(1.8rem, 3.2vw, 4.5rem)" }}>
                    BIT &<br />BEELD
                  </span>
                  <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>
                    Used exclusively for the wordmark and maximum-impact display moments.
                  </p>
                </div>

                {/* Syne */}
                <div className="flex flex-col p-6" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>HEADINGS</p>
                  <p className="font-body mb-5" style={{ fontSize: "10px", color: "#555555" }}>Syne</p>
                  <span className="font-display font-extrabold text-[#F5F5F5] leading-tight mt-auto" style={{ fontSize: "clamp(1.4rem, 2.4vw, 3.2rem)" }}>
                    Design<br />that works.
                  </span>
                  <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>
                    All titles and section headers. ExtraBold 800 for impact, Bold 700 for sub-hierarchy.
                  </p>
                </div>

                {/* Inter */}
                <div className="flex flex-col p-6" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>BODY / UI</p>
                  <p className="font-body mb-5" style={{ fontSize: "10px", color: "#555555" }}>Inter</p>
                  <span className="font-body text-[#F5F5F5] leading-relaxed mt-auto" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1.25rem)" }}>
                    Clear, functional text<br />for every context<br />and every scale.
                  </span>
                  <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>
                    Paragraphs, labels, captions, UI copy. Regular 400 and Medium 500.
                  </p>
                </div>
              </div>
            </Slide>

            {/* ── 06 GRID & LAYOUT ─────────────────────────────────────── */}
            <Slide index={5} scrollY={scrollY} vh={vh}>
              <SectionTag n="06" label="GRID & LAYOUT" />

              <h2
                className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4vw, 5.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em", opacity: 0.6 }}
              >
                STRUCTURE<br />CREATES<br />FREEDOM.
              </h2>

              <div className="flex-1 flex gap-6 min-h-0">
                {/* 12-column grid visualisation — clean, no fills */}
                <div className="flex-1 relative" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0D0D0D" }}>
                  <div className="absolute inset-0 grid grid-cols-12">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-full"
                        style={{
                          borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="font-body" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.25em" }}>12 COLUMN GRID</p>
                  </div>
                </div>

                {/* Spacing scale */}
                <div className="w-56 flex-shrink-0 flex flex-col gap-3 pt-1">
                  <Rule />
                  <p className="font-body mb-2" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.22em" }}>SPACING SCALE</p>
                  {[
                    { label: "4px",  size: 4  },
                    { label: "8px",  size: 8  },
                    { label: "16px", size: 16 },
                    { label: "24px", size: 24 },
                    { label: "32px", size: 32 },
                    { label: "48px", size: 48 },
                    { label: "64px", size: 64 },
                  ].map(({ label, size }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div style={{ width: `${size}px`, height: "1px", background: ACCENT, flexShrink: 0 }} />
                      <span className="font-body" style={{ fontSize: "10px", color: "#666666" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Slide>

            {/* ── 07 UI ELEMENTS ───────────────────────────────────────── */}
            <Slide index={6} scrollY={scrollY} vh={vh}>
              <SectionTag n="07" label="UI ELEMENTS" />

              <h2
                className="font-display font-bold mb-5 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4vw, 5rem)", color: OFF_WHITE, letterSpacing: "-0.02em", opacity: 0.6 }}
              >
                Components built with intent.
              </h2>

              <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
                {/* Buttons */}
                <div className="flex flex-col p-6 gap-4" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>BUTTONS</p>
                  <div className="flex flex-col gap-3 mt-2">
                    <button
                      className="font-body font-medium uppercase w-full"
                      style={{ background: ACCENT, color: "#000", padding: "12px 24px", fontSize: "10px", letterSpacing: "0.2em" }}
                    >
                      PRIMARY
                    </button>
                    <button
                      className="font-body font-medium uppercase w-full"
                      style={{ background: "transparent", color: OFF_WHITE, border: "1px solid rgba(255,255,255,0.18)", padding: "12px 24px", fontSize: "10px", letterSpacing: "0.2em" }}
                    >
                      SECONDARY
                    </button>
                    <button
                      className="font-body font-medium uppercase text-left"
                      style={{ background: "transparent", color: ACCENT, padding: 0, fontSize: "10px", letterSpacing: "0.2em", border: "none" }}
                    >
                      TEXT LINK →
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col p-6 gap-4" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>TAGS & LABELS</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Webdesign", "Branding", "2026", "UI/UX", "Identity"].map((tag) => (
                      <span
                        key={tag}
                        className="font-body"
                        style={{ fontSize: "9px", color: OFF_WHITE, letterSpacing: "0.1em", border: "1px solid rgba(255,255,255,0.14)", padding: "4px 10px" }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className="font-body"
                      style={{ fontSize: "9px", color: "#000", letterSpacing: "0.1em", background: ACCENT, padding: "4px 10px" }}
                    >
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="flex flex-col p-6 gap-4" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Rule />
                  <p className="font-body" style={{ fontSize: "9px", color: "#777777", letterSpacing: "0.3em" }}>FORM FIELDS</p>
                  <div className="flex flex-col gap-5 mt-2">
                    <div>
                      <p className="font-body mb-1.5" style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.15em" }}>NAAM</p>
                      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.14)", paddingBottom: "8px" }}>
                        <span className="font-body" style={{ fontSize: "12px", color: "#666666" }}>Wouter</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-body mb-1.5" style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.15em" }}>EMAIL</p>
                      <div style={{ borderBottom: `1px solid ${ACCENT}`, paddingBottom: "8px" }}>
                        <span className="font-body" style={{ fontSize: "12px", color: OFF_WHITE }}>hello@bitenbeeld.nl</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slide>

            {/* ── 08 DARK MODE ─────────────────────────────────────────── */}
            <Slide index={7} scrollY={scrollY} vh={vh}>
              <SectionTag n="08" label="DARK MODE" />

              <h2
                className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4vw, 5.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em", opacity: 0.6 }}
              >
                BUILT FOR THE<br />BLACK CANVAS.
              </h2>

              <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                <div className="flex flex-col justify-between">
                  <p className="font-body leading-relaxed" style={{ fontSize: "13px", color: "#777777" }}>
                    The primary canvas is dark. Strong contrast, intentional. Off-white on near-black
                    gives character without noise. The accent is the only fixed signal — present in both
                    states, always purposeful.
                  </p>
                  <div>
                    <button
                      className="font-body font-medium uppercase"
                      style={{ background: ACCENT, color: "#000000", padding: "14px 36px", fontSize: "10px", letterSpacing: "0.2em" }}
                    >
                      START PROJECT
                    </button>
                    <p className="font-body mt-3" style={{ fontSize: "11px", color: "#666666" }}>
                      Accent on black — maximum contrast, one signal.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-6 gap-5" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between pb-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="font-logo uppercase" style={{ fontSize: "12px", color: OFF_WHITE }}>BIT & BEELD</span>
                    <div className="flex gap-5">
                      {["Work", "About", "Contact"].map((item) => (
                        <span key={item} className="font-body" style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.1em" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-body mb-2" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.3em" }}>WEBDESIGN — 2026</p>
                    <h3 className="font-display font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(1rem, 2vw, 2rem)", color: OFF_WHITE }}>
                      Project Naam
                    </h3>
                    <p className="font-body" style={{ fontSize: "11px", color: "#555555" }}>Short project description. Goal, context, outcome.</p>
                  </div>
                  <span className="font-body flex-shrink-0" style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.15em" }}>
                    VIEW PROJECT <span style={{ color: ACCENT }}>→</span>
                  </span>
                </div>
              </div>
            </Slide>

            {/* ── 09 LIGHT MODE ────────────────────────────────────────── */}
            <Slide index={8} scrollY={scrollY} vh={vh} bg={LIGHT}>
              <SectionTag n="09" label="LIGHT MODE" light />

              <h2
                className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 4vw, 5.5rem)", color: "#111111", letterSpacing: "-0.025em", opacity: 0.5 }}
              >
                SET ON<br />WARM PAPER.
              </h2>

              <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                <div className="flex flex-col justify-between">
                  <p className="font-body leading-relaxed" style={{ fontSize: "13px", color: "#777777" }}>
                    The light system is the complement — documentation, guidelines, editorial contexts.
                    Warm off-white, never cold white. The same type hierarchy, the same accent, the same
                    intentional spacing.
                  </p>
                  <div>
                    <button
                      className="font-body font-medium uppercase"
                      style={{ background: "#111111", color: LIGHT, padding: "14px 36px", fontSize: "10px", letterSpacing: "0.2em" }}
                    >
                      START PROJECT
                    </button>
                    <p className="font-body mt-3" style={{ fontSize: "11px", color: "#999999" }}>
                      Dark on warm paper — same hierarchy, inverse state.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-6 gap-5" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div className="flex items-center justify-between pb-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <span className="font-logo uppercase" style={{ fontSize: "12px", color: "#111111" }}>BIT & BEELD</span>
                    <div className="flex gap-5">
                      {["Work", "About", "Contact"].map((item) => (
                        <span key={item} className="font-body" style={{ fontSize: "10px", color: "#AAAAAA", letterSpacing: "0.1em" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-body mb-2" style={{ fontSize: "9px", color: "#BBBBBB", letterSpacing: "0.3em" }}>BRANDING — 2026</p>
                    <h3 className="font-display font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(1rem, 2vw, 2rem)", color: "#111111" }}>
                      Project Naam
                    </h3>
                    <p className="font-body" style={{ fontSize: "11px", color: "#999999" }}>Short project description. Goal, context, outcome.</p>
                  </div>
                  <span className="font-body flex-shrink-0" style={{ fontSize: "10px", color: "#AAAAAA", letterSpacing: "0.15em" }}>
                    VIEW PROJECT <span style={{ color: ACCENT }}>→</span>
                  </span>
                </div>
              </div>
            </Slide>

            {/* ── 10 VOICE & TONE ──────────────────────────────────────── */}
            <Slide index={9} scrollY={scrollY} vh={vh}>
              <SectionTag n="10" label="VOICE & TONE" />

              <div className="flex-1 flex flex-col justify-between min-h-0">
                <div>
                  <h2
                    className="font-display font-bold uppercase leading-none mb-3"
                    style={{ fontSize: "clamp(3rem, 9vw, 13rem)", color: OFF_WHITE, letterSpacing: "-0.03em" }}
                  >
                    CONSIDERED
                  </h2>
                  <p className="font-body" style={{ fontSize: "clamp(12px, 1.4vw, 17px)", color: "#888888", letterSpacing: "0.05em" }}>
                    Precise, generous, clear.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { word: "DIRECT",    desc: "No filler words. Every sentence carries weight." },
                    { word: "CRAFTED",   desc: "Attention to detail in every element, always." },
                    { word: "CONFIDENT", desc: "Assured tone. No hedging. Clear decisions." },
                    { word: "WARM",      desc: "Human, not corporate. Present, not distant." },
                  ].map(({ word, desc }) => (
                    <div key={word} className="p-6" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Rule />
                      <h3
                        className="font-display font-bold uppercase mt-4 mb-2"
                        style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: OFF_WHITE, letterSpacing: "-0.01em" }}
                      >
                        {word}
                      </h3>
                      <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#666666" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Slide>

            {/* ── 11 DO'S & DON'TS ─────────────────────────────────────── */}
            <Slide index={10} scrollY={scrollY} vh={vh}>
              <SectionTag n="11" label="DO'S & DON'TS" />

              <h2
                className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 4.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em", opacity: 0.6 }}
              >
                RULES OF<br />THE SYSTEM.
              </h2>

              <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                {/* Do's */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body" style={{ fontSize: "10px", color: "#5DB870", letterSpacing: "0.25em" }}>DO</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(93,184,112,0.2)" }} />
                  </div>
                  {[
                    "Use Anton exclusively for the wordmark",
                    "Maintain generous whitespace throughout",
                    "Use #FF4A2A as the single accent color",
                    "Keep type hierarchy consistent and clear",
                    "Apply the 12-column grid at every breakpoint",
                    "Use #F4F1EB (warm off-white) in light mode",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "#5DB870", fontSize: "12px", flexShrink: 0, lineHeight: 1.5 }}>+</span>
                      <span className="font-body" style={{ fontSize: "11px", color: "#777777", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Don'ts */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body" style={{ fontSize: "10px", color: ACCENT, letterSpacing: "0.25em" }}>DON'T</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,74,42,0.2)" }} />
                  </div>
                  {[
                    "Use Anton for body copy or UI labels",
                    "Add color accents outside the defined system",
                    "Distort, rotate, or recolor the wordmark",
                    "Use cold white (#FFFFFF) as a page background",
                    "Mix display fonts with Inter at body sizes",
                    "Place the logo on busy photographic backgrounds",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: ACCENT, fontSize: "12px", flexShrink: 0, lineHeight: 1.5 }}>—</span>
                      <span className="font-body" style={{ fontSize: "11px", color: "#777777", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Slide>

            {/* ── 12 COLOPHON ──────────────────────────────────────────── */}
            <Slide index={11} scrollY={scrollY} vh={vh}>
              <SectionTag n="12" label="COLOPHON" />

              <div className="flex-1 flex flex-col justify-between pt-4 min-h-0">
                <div className="flex items-start justify-between">
                  <h2
                    className="font-display font-extrabold uppercase leading-[0.87]"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 8.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
                  >
                    DESIGN<br />DAT WERKT<span style={{ color: ACCENT }}>.</span>
                  </h2>

                  <div className="text-right space-y-4 mt-1">
                    {[
                      { label: "STUDIO",  value: "Studio Bit & Beeld" },
                      { label: "LOCATIE", value: "Groningen, Nederland" },
                      { label: "WEB",     value: "bitenbeeld.nl" },
                      { label: "MAIL",    value: "hello@bitenbeeld.nl" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="font-body" style={{ fontSize: "9px", color: "#666666", letterSpacing: "0.28em" }}>{label}</p>
                        <p className="font-body" style={{ fontSize: "13px", color: OFF_WHITE }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Rule />
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-body" style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.08em" }}>
                      © 2026 Studio Bit & Beeld — Brand Guidelines v2.0
                    </p>
                    <p className="font-body" style={{ fontSize: "10px", color: "#555555" }}>Nederland</p>
                  </div>
                </div>
              </div>
            </Slide>

          </div>
        </div>
      </div>
    </>
  );
};

export default Brandbook;
