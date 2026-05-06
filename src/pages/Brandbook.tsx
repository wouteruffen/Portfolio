import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const DARK     = "#0B0B0B";
const LIGHT    = "#F4F1EB";
const OFF_WHITE = "#F5F5F5";
const MUTED    = "#A0A0A0";
const ACCENT   = "#FF4A2A";

const DARK_GRID: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
  `,
  backgroundSize: "60px 60px",
};

const LIGHT_GRID: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
  `,
  backgroundSize: "60px 60px",
};

/* ─── Cover nav list ─────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  "LOGO & MONOGRAM",
  "COLOR SYSTEM",
  "TYPOGRAPHY",
  "GRID & LAYOUT",
  "UI ELEMENTS",
  "DARK MODE",
  "LIGHT MODE",
  "VOICE & TONE",
  "DO'S & DON'TS",
  "COLOPHON",
];

/* ─── Color palette for section 03 ──────────────────────────────────────── */
const PALETTE = [
  { name: "Accent Red",   hex: "#FF4A2A", bg: "#FF4A2A", lightText: false },
  { name: "Warm Orange",  hex: "#FF7A4A", bg: "#FF7A4A", lightText: false },
  { name: "Muted Yellow", hex: "#E8C87A", bg: "#E8C87A", lightText: true  },
  { name: "Soft Green",   hex: "#7AB87A", bg: "#7AB87A", lightText: true  },
  { name: "Dark Grey",    hex: "#2A2A2A", bg: "#2A2A2A", lightText: false },
];

/* ─── Shared animation ───────────────────────────────────────────────────── */
const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true },
  transition:  { duration: 0.6 },
};

/* ─── Reusable pieces ────────────────────────────────────────────────────── */
const Rule = ({ light = false }: { light?: boolean }) => (
  <div
    className="w-full"
    style={{ height: "1px", background: light ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)" }}
  />
);

const SectionTag = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <div className="mb-5">
    <p
      className="font-body mb-2"
      style={{ fontSize: "10px", letterSpacing: "0.28em", color: light ? "#999999" : "#444444" }}
    >
      {n} — {label}
    </p>
    <Rule light={light} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */

const Brandbook = () => (
  <>
    <CursorEffects />
    <div style={{ background: DARK }}>
      <NavbarV2 />

      {/* ════════════════════════════════════════
          01 — COVER
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <div className="max-w-7xl w-full mx-auto h-full flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 font-body transition-colors"
                style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.08em" }}
                onMouseEnter={e => (e.currentTarget.style.color = OFF_WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
              >
                <ArrowLeft size={10} /> Back
              </Link>
              <span style={{ color: "#333333", fontSize: "10px" }}>·</span>
              <span className="font-body" style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.1em" }}>
                Vol. 1 — The Brandbook
              </span>
            </div>
          </div>

          {/* Title row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="flex items-start justify-between mb-6 flex-shrink-0"
          >
            <h1
              className="font-display font-extrabold uppercase leading-[0.87]"
              style={{ fontSize: "clamp(4rem, 10vw, 12rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
            >
              BRAND<br />BOOK<span style={{ color: ACCENT }}>.</span>
            </h1>

            {/* Metadata block — right-aligned beside title */}
            <div className="text-right mt-2 flex-shrink-0 space-y-1">
              {["Studio Bit & Beeld", "Groningen, NL", "2026"].map((line) => (
                <p key={line} className="font-body" style={{ fontSize: "11px", color: "#4A4A4A" }}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="origin-left mb-6 flex-shrink-0"
          >
            <Rule />
          </motion.div>

          {/* Navigation list — 2 columns, fills remaining height */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex-1 grid grid-cols-2 gap-x-12 content-start min-h-0"
          >
            {NAV_ITEMS.map((item, i) => (
              <div
                key={item}
                className="group flex items-center gap-4 py-3 cursor-default transition-colors"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="font-body tabular-nums flex-shrink-0"
                  style={{ fontSize: "10px", color: "#333333", letterSpacing: "0.05em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display font-bold uppercase transition-colors group-hover:text-[#FF4A2A]"
                  style={{ fontSize: "clamp(13px, 1.4vw, 19px)", color: OFF_WHITE, letterSpacing: "0.015em" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          02 — LOGO & MONOGRAM
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="02" label="LOGO & MONOGRAM" />

          {/* Main content row */}
          <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">

            {/* Primary — light square */}
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

            {/* Right — dark + accent variants */}
            <div className="flex flex-col gap-3 min-h-0">
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-body mb-3" style={{ fontSize: "9px", color: "#444444", letterSpacing: "0.3em" }}>DARK</p>
                <span
                  className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: OFF_WHITE }}
                >
                  BIT & BEELD
                </span>
              </div>
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-body mb-3" style={{ fontSize: "9px", color: "#444444", letterSpacing: "0.3em" }}>ACCENT</p>
                <span
                  className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: ACCENT }}
                >
                  BIT & BEELD
                </span>
              </div>
            </div>

          </div>

          {/* Descriptions */}
          <div className="mt-4 grid grid-cols-3 gap-3 flex-shrink-0">
            {[
              { label: "PRIMARY",  body: "Light background — default application. Anton, uppercase, full wordmark." },
              { label: "DARK",     body: "Off-white on near-black. Same weight, same spacing. Use in dark contexts." },
              { label: "ACCENT",   body: "#FF4A2A variant — reserved for special moments only. Never as default." },
            ].map(({ label, body }) => (
              <div key={label}>
                <Rule />
                <p className="font-body mt-3 mb-1" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.22em" }}>{label}</p>
                <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>{body}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          03 — COLOR SYSTEM
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="03" label="COLOR SYSTEM" />

          {/* Statement headline */}
          <h2
            className="font-display font-extrabold uppercase leading-[0.88] mb-8 flex-shrink-0"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 8rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
          >
            TWO STATES.<br />ONE SIGNAL.
          </h2>

          {/* Color swatches */}
          <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
            {PALETTE.map(({ name, hex, bg, lightText }) => (
              <div
                key={name}
                className="flex flex-col justify-end p-4"
                style={{ background: bg }}
              >
                <p
                  className="font-body font-medium"
                  style={{ fontSize: "10px", color: lightText ? "#222222" : OFF_WHITE, letterSpacing: "0.07em" }}
                >
                  {name}
                </p>
                <p
                  className="font-body mt-0.5"
                  style={{ fontSize: "9px", color: lightText ? "#555555" : "rgba(255,255,255,0.5)" }}
                >
                  {hex}
                </p>
              </div>
            ))}
          </div>

          {/* Gradient strip */}
          <div
            className="mt-2"
            style={{
              height: "4px",
              background: "linear-gradient(to right, #FF4A2A, #FF7A4A, #E8C87A, #7AB87A, #2A2A2A)",
            }}
          />

          {/* Notes */}
          <div className="mt-4 grid grid-cols-2 gap-8 flex-shrink-0">
            {[
              {
                label: "PRIMARY SIGNAL",
                body: "#FF4A2A — the only color accent. Used sparingly across both light and dark states.",
              },
              {
                label: "NEUTRAL SYSTEM",
                body: "#0B0B0B and #F4F1EB as structural base. No additional color accents outside this system.",
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <Rule />
                <p className="font-body mt-3 mb-1" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.22em" }}>{label}</p>
                <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>{body}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          04 — TYPOGRAPHY
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="04" label="TYPOGRAPHY" />

          <h2
            className="font-display font-bold mb-6 flex-shrink-0"
            style={{ fontSize: "clamp(1.4rem, 3.2vw, 4rem)", color: OFF_WHITE, letterSpacing: "-0.01em" }}
          >
            Three fonts. One clear voice.
          </h2>

          {/* Font cards */}
          <div className="flex-1 grid grid-cols-3 gap-2 min-h-0">

            {/* Anton */}
            <div
              className="flex flex-col p-6"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Rule />
              <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.3em" }}>DISPLAY / LOGO</p>
              <p className="font-body mb-5" style={{ fontSize: "10px", color: "#333333" }}>Anton</p>
              <span
                className="font-logo uppercase text-[#F5F5F5] leading-none mt-auto"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 4.5rem)" }}
              >
                BIT &<br />BEELD
              </span>
              <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>
                Used exclusively for the wordmark and maximum-impact display moments.
              </p>
            </div>

            {/* Syne */}
            <div
              className="flex flex-col p-6"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Rule />
              <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.3em" }}>HEADINGS</p>
              <p className="font-body mb-5" style={{ fontSize: "10px", color: "#333333" }}>Syne</p>
              <span
                className="font-display font-extrabold text-[#F5F5F5] leading-tight mt-auto"
                style={{ fontSize: "clamp(1.4rem, 2.4vw, 3.2rem)" }}
              >
                Design<br />that works.
              </span>
              <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>
                All titles and section headers. ExtraBold 800 for impact, Bold 700 for sub-hierarchy.
              </p>
            </div>

            {/* Inter */}
            <div
              className="flex flex-col p-6"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Rule />
              <p className="font-body mt-4 mb-0.5" style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.3em" }}>BODY / UI</p>
              <p className="font-body mb-5" style={{ fontSize: "10px", color: "#333333" }}>Inter</p>
              <span
                className="font-body text-[#F5F5F5] leading-relaxed mt-auto"
                style={{ fontSize: "clamp(0.85rem, 1.15vw, 1.25rem)" }}
              >
                Clear, functional text<br />for every context<br />and every scale.
              </span>
              <p className="font-body mt-4 leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>
                Paragraphs, labels, captions, UI copy. Regular 400 and Medium 500.
              </p>
            </div>

          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          05 — DARK MODE
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="05" label="DARK MODE" />

          <h2
            className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
            style={{ fontSize: "clamp(2rem, 5.5vw, 7.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
          >
            BUILT FOR THE<br />BLACK CANVAS.
          </h2>

          <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">

            {/* Left — copy + CTA */}
            <div className="flex flex-col justify-between">
              <p className="font-body leading-relaxed" style={{ fontSize: "13px", color: "#555555" }}>
                The primary canvas is dark. Strong contrast, intentional. Off-white on near-black
                gives character without noise. The accent is the only fixed signal — present in both
                states, always purposeful.
              </p>
              <div>
                <button
                  className="font-body font-medium uppercase"
                  style={{
                    background: ACCENT,
                    color: "#000000",
                    padding: "14px 36px",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  START PROJECT
                </button>
                <p className="font-body mt-3" style={{ fontSize: "11px", color: "#333333" }}>
                  Accent on black — maximum contrast, one signal.
                </p>
              </div>
            </div>

            {/* Right — UI mockup */}
            <div
              className="flex flex-col p-6 gap-5"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Mock nav */}
              <div
                className="flex items-center justify-between pb-4 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="font-logo uppercase" style={{ fontSize: "12px", color: OFF_WHITE }}>
                  BIT & BEELD
                </span>
                <div className="flex gap-5">
                  {["Work", "About", "Contact"].map((item) => (
                    <span key={item} className="font-body" style={{ fontSize: "10px", color: "#404040", letterSpacing: "0.1em" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mock content */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="font-body mb-2" style={{ fontSize: "9px", color: "#3A3A3A", letterSpacing: "0.3em" }}>
                  WEBDESIGN — 2026
                </p>
                <h3
                  className="font-display font-extrabold leading-tight mb-3"
                  style={{ fontSize: "clamp(1rem, 2vw, 2rem)", color: OFF_WHITE }}
                >
                  Project Naam
                </h3>
                <p className="font-body" style={{ fontSize: "11px", color: "#3A3A3A" }}>
                  Short project description. Goal, context, outcome.
                </p>
              </div>

              <span className="font-body flex-shrink-0" style={{ fontSize: "10px", color: "#3A3A3A", letterSpacing: "0.15em" }}>
                VIEW PROJECT <span style={{ color: ACCENT }}>→</span>
              </span>
            </div>

          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          06 — LIGHT MODE
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: LIGHT, ...LIGHT_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="06" label="LIGHT MODE" light />

          <h2
            className="font-display font-extrabold uppercase leading-[0.87] mb-8 flex-shrink-0"
            style={{ fontSize: "clamp(2rem, 5.5vw, 7.5rem)", color: "#111111", letterSpacing: "-0.025em" }}
          >
            SET ON<br />WARM PAPER.
          </h2>

          <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">

            {/* Left — copy + CTA */}
            <div className="flex flex-col justify-between">
              <p className="font-body leading-relaxed" style={{ fontSize: "13px", color: "#888888" }}>
                The light system is the complement — documentation, guidelines, editorial contexts.
                Warm off-white, never cold white. The same type hierarchy, the same accent, the same
                intentional spacing.
              </p>
              <div>
                <button
                  className="font-body font-medium uppercase"
                  style={{
                    background: "#111111",
                    color: LIGHT,
                    padding: "14px 36px",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  START PROJECT
                </button>
                <p className="font-body mt-3" style={{ fontSize: "11px", color: "#BBBBBB" }}>
                  Dark on warm paper — same hierarchy, inverse state.
                </p>
              </div>
            </div>

            {/* Right — UI mockup */}
            <div
              className="flex flex-col p-6 gap-5"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="flex items-center justify-between pb-4 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
              >
                <span className="font-logo uppercase" style={{ fontSize: "12px", color: "#111111" }}>
                  BIT & BEELD
                </span>
                <div className="flex gap-5">
                  {["Work", "About", "Contact"].map((item) => (
                    <span key={item} className="font-body" style={{ fontSize: "10px", color: "#BBBBBB", letterSpacing: "0.1em" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="font-body mb-2" style={{ fontSize: "9px", color: "#CCCCCC", letterSpacing: "0.3em" }}>
                  BRANDING — 2026
                </p>
                <h3
                  className="font-display font-extrabold leading-tight mb-3"
                  style={{ fontSize: "clamp(1rem, 2vw, 2rem)", color: "#111111" }}
                >
                  Project Naam
                </h3>
                <p className="font-body" style={{ fontSize: "11px", color: "#AAAAAA" }}>
                  Short project description. Goal, context, outcome.
                </p>
              </div>

              <span className="font-body flex-shrink-0" style={{ fontSize: "10px", color: "#AAAAAA", letterSpacing: "0.15em" }}>
                VIEW PROJECT <span style={{ color: ACCENT }}>→</span>
              </span>
            </div>

          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          07 — VOICE & PRINCIPLES
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <SectionTag n="07" label="VOICE & TONE" />

          <div className="flex-1 flex flex-col justify-between min-h-0">

            {/* Statement */}
            <div>
              <h2
                className="font-display font-bold uppercase leading-none mb-3"
                style={{ fontSize: "clamp(3rem, 9vw, 13rem)", color: OFF_WHITE, letterSpacing: "-0.03em" }}
              >
                CONSIDERED
              </h2>
              <p
                className="font-body"
                style={{ fontSize: "clamp(12px, 1.4vw, 17px)", color: MUTED, letterSpacing: "0.05em" }}
              >
                Precise, generous, clear.
              </p>
            </div>

            {/* 2 × 2 values grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { word: "DIRECT",    desc: "No filler words. Every sentence carries weight." },
                { word: "CRAFTED",   desc: "Attention to detail in every element, always." },
                { word: "CONFIDENT", desc: "Assured tone. No hedging. Clear decisions." },
                { word: "WARM",      desc: "Human, not corporate. Present, not distant." },
              ].map(({ word, desc }) => (
                <div
                  key={word}
                  className="p-6"
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Rule />
                  <h3
                    className="font-display font-bold uppercase mt-4 mb-2"
                    style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)", color: OFF_WHITE, letterSpacing: "-0.01em" }}
                  >
                    {word}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: "11px", color: "#444444" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          08 — FOOTER
      ════════════════════════════════════════ */}
      <section
        className="h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-10 overflow-hidden"
        style={{ background: DARK, ...DARK_GRID }}
      >
        <motion.div {...fadeUp} className="max-w-7xl w-full mx-auto h-full flex flex-col">

          <Rule />

          <div className="flex-1 flex flex-col justify-between pt-8 min-h-0">

            {/* Title + contact */}
            <div className="flex items-start justify-between">
              <h2
                className="font-display font-extrabold uppercase leading-[0.87]"
                style={{ fontSize: "clamp(2.2rem, 6vw, 8.5rem)", color: OFF_WHITE, letterSpacing: "-0.025em" }}
              >
                DESIGN<br />DAT WERKT<span style={{ color: ACCENT }}>.</span>
              </h2>

              {/* Contact details */}
              <div className="text-right space-y-4 mt-1">
                {[
                  { label: "STUDIO",  value: "Studio Bit & Beeld" },
                  { label: "LOCATIE", value: "Groningen, Nederland" },
                  { label: "WEB",     value: "bitenbeeld.nl" },
                  { label: "MAIL",    value: "hello@bitenbeeld.nl" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body" style={{ fontSize: "9px", color: "#333333", letterSpacing: "0.28em" }}>
                      {label}
                    </p>
                    <p className="font-body" style={{ fontSize: "13px", color: OFF_WHITE }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal / bottom bar */}
            <div>
              <Rule />
              <div className="flex items-center justify-between mt-4">
                <p className="font-body" style={{ fontSize: "10px", color: "#2E2E2E", letterSpacing: "0.08em" }}>
                  © 2026 Studio Bit & Beeld — Brand Guidelines v2.0
                </p>
                <p className="font-body" style={{ fontSize: "10px", color: "#2E2E2E" }}>
                  Nederland
                </p>
              </div>
            </div>

          </div>

        </motion.div>
      </section>

    </div>
  </>
);

export default Brandbook;
