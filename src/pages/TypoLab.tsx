import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
// @ts-ignore
import "@fontsource/anton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPO LAB — Internal typography testing page
   Route: /typo-lab
   Purpose: Controlled environment to refine the typography system before
            applying changes globally to the portfolio.
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Local design tokens ───────────────────────────────────────────────────── */
const T = {
  bg:       "#0A0A0A",
  surface:  "#111111",
  surface2: "#181818",
  light:    "#F4F1EB",
  white:    "#F5F5F5",
  muted:    "#888888",
  dim:      "#555555",
  accent:   "#FF4A2A",
  green:    "#5DB870",
  borderD:  "rgba(255,255,255,0.08)",
  borderL:  "rgba(0,0,0,0.09)",
};

/* ── Type scale L1–L8 (finalized) ─────────────────────────────────────────── */
const SCALE = [
  { token: "L1", font: "Anton",   weight: 400, size: "clamp(2.5rem,6vw,5rem)",        tracking: "–0.02em", lh: "1.0",  role: "Logo · display · identity",              preview: "BIT & BEELD" },
  { token: "L2", font: "Anton",   weight: 400, size: "clamp(1.75rem,4vw,3.25rem)",    tracking: "–0.02em", lh: "1.0",  role: "Section titles — OVER MIJ · WAT IK DOE", preview: "OVER MIJ" },
  { token: "L3", font: "Antonio", weight: 600, size: "clamp(1.375rem,2.5vw,2.25rem)", tracking: "0.01em",  lh: "1.0",  role: "Section subheadings",                     preview: "Webdesign & Development" },
  { token: "L4", font: "Antonio", weight: 400, size: "clamp(1.125rem,2vw,1.75rem)",   tracking: "0.01em",  lh: "1.05", role: "Editorial headings · card titles",          preview: "Moderne, snelle websites" },
  { token: "L5", font: "Antonio", weight: 300, size: "clamp(1rem,1.5vw,1.25rem)",     tracking: "0.02em",  lh: "1.1",  role: "Supporting text · kicker labels",           preview: "Performance-first digital studio" },
  { token: "L6", font: "Inter",   weight: 500, size: "0.9375rem",                     tracking: "0",       lh: "1.6",  role: "Body emphasis · intro paragraph",           preview: "Websites die converteren en resultaat opleveren." },
  { token: "L7", font: "Inter",   weight: 400, size: "0.9375rem",                     tracking: "0",       lh: "1.7",  role: "Body text · descriptions · paragraphs",     preview: "Moderne, snelle websites die niet alleen mooi zijn maar ook converteren." },
  { token: "L8", font: "Inter",   weight: 400, size: "0.625rem",                      tracking: "0.25em",  lh: "1.5",  role: "Labels · metadata · UI tags (uppercase)",   preview: "WEBDESIGN · BRANDING · 2026" },
];

/* ── Reusable section header ───────────────────────────────────────────────── */
const SectionHeader = ({ n, title, light = false }: { n: string; title: string; light?: boolean }) => (
  <div className="mb-10">
    <div className="flex items-baseline gap-5 mb-4">
      <span
        className="font-body tabular-nums flex-shrink-0"
        style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: T.dim }}
      >
        {n}
      </span>
      <span
        className="font-antonio uppercase"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: light ? "#1A1A1A" : T.white,
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ height: "1px", background: light ? T.borderL : T.borderD }} />
  </div>
);

/* ── Label chip ─────────────────────────────────────────────────────────────── */
const Tag = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    className="font-body inline-block"
    style={{
      fontSize: "0.625rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: accent ? T.accent : T.muted,
      border: `1px solid ${accent ? T.accent : T.borderD}`,
      padding: "3px 8px",
    }}
  >
    {children}
  </span>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Antonio @font-face declaration — only injected when TypoLab is mounted.
   Paths resolve from /public. Variable font covers the full weight range.
   To revert: delete §10 + remove `antonio` from tailwind.config.ts
   and delete ANTONIO_CSS.
   ───────────────────────────────────────────────────────────────────────────── */
const ANTONIO_CSS = `
@font-face {
  font-family: 'Antonio';
  src: url('/fonts/Antonio/Antonio-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 700;
  font-style: normal;
  font-display: swap;
}
`;

/* ═══════════════════════════════════════════════════════════════════════════ */

const TypoLab = () => (
  <div style={{ background: T.bg, minHeight: "100vh", color: T.white }}>

    {/* Antonio @font-face — scoped to this route; removed when TypoLab unmounts */}
    {/* eslint-disable-next-line react/no-danger */}
    <style dangerouslySetInnerHTML={{ __html: ANTONIO_CSS }} />

    {/* ── Fixed header bar ──────────────────────────────────────────────────── */}
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        height: "52px",
        background: "rgba(10,10,10,0.96)",
        borderBottom: `1px solid ${T.borderD}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <Link
        to="/"
        className="font-body inline-flex items-center gap-2 transition-colors"
        style={{ fontSize: "0.75rem", color: T.dim, letterSpacing: "0.1em" }}
        onMouseEnter={e => (e.currentTarget.style.color = T.white)}
        onMouseLeave={e => (e.currentTarget.style.color = T.dim)}
      >
        <ArrowLeft size={12} />
        Portfolio
      </Link>

      <div className="flex items-center gap-3">
        <span className="font-logo uppercase" style={{ fontSize: "0.875rem", color: T.white, letterSpacing: "0.04em" }}>
          Typo Lab
        </span>
        <span
          className="font-body"
          style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: T.accent, border: `1px solid ${T.accent}`, padding: "2px 8px", textTransform: "uppercase" }}
        >
          Internal
        </span>
      </div>

      <span className="font-body hidden md:block" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Not public · Design system workspace
      </span>
    </header>

    {/* ── Hero band ────────────────────────────────────────────────────────── */}
    <div
      className="flex flex-col justify-end px-6 md:px-12 lg:px-24"
      style={{ paddingTop: "52px", paddingBottom: "120px", borderBottom: `1px solid ${T.borderD}` }}
    >
      <div style={{ paddingTop: "200px" }}>
        <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "40px" }}>
          Typography System · Internal
        </p>
        <h1
          className="font-logo uppercase leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.02em", color: T.white }}
        >
          TYPO<br />LAB<span style={{ color: T.accent }}>.</span>
        </h1>
        <p
          className="font-antonio"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 300, letterSpacing: "0.03em", color: T.muted, lineHeight: 1.2, marginTop: "40px", maxWidth: "36ch" }}
        >
          Anton · Antonio · Inter — a controlled environment to refine the system before global rollout.
        </p>
      </div>
    </div>

    {/* ── Main content ─────────────────────────────────────────────────────── */}
    <main className="px-6 md:px-12 lg:px-24 py-24 space-y-48 max-w-screen-2xl mx-auto">

      {/* ═══ §01 FONT OVERVIEW ════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="01" title="Font Overview" />

        <div style={{ background: "#F4F1EB" }}>
          <div className="grid grid-cols-1 md:grid-cols-3">

            <div style={{ padding: "56px 40px", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "56px" }}>
                01 — Identity · Impact
              </p>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#111", letterSpacing: "-0.02em" }}>
                Anton
              </p>
              <div style={{ marginTop: "48px" }}>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Weight 400 — single
                </p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#666", lineHeight: 1.65 }}>
                  Logo wordmark. Major section titles. Display impact moments only. Never for body or UI.
                </p>
              </div>
            </div>

            <div style={{ padding: "56px 40px", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "56px" }}>
                02 — Editorial · Hierarchy
              </p>
              <p className="font-antonio leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 600, color: "#111", letterSpacing: "0.01em" }}>
                Antonio
              </p>
              <div style={{ marginTop: "48px" }}>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Weights 300 · 400 · 600
                </p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#666", lineHeight: 1.65 }}>
                  Section subheadings. Editorial headings. Kicker labels. Never for body copy or logo use.
                </p>
              </div>
            </div>

            <div style={{ padding: "56px 40px" }}>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "56px" }}>
                03 — Readability · UI
              </p>
              <p className="font-body font-medium leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#111", letterSpacing: "-0.02em" }}>
                Inter
              </p>
              <div style={{ marginTop: "48px" }}>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Weights 400 · 500
                </p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#666", lineHeight: 1.65 }}>
                  Body text. Labels. Captions. Metadata. Forms. UI copy. Never for headings or display.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ §02 TYPE SCALE ════════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="02" title="Type Scale" />

        <div style={{ border: `1px solid ${T.borderD}` }}>
          <div
            className="grid font-body uppercase"
            style={{
              gridTemplateColumns: "48px 80px 120px 80px 60px 1fr",
              gap: "0 16px",
              padding: "12px 24px",
              borderBottom: `1px solid ${T.borderD}`,
              fontSize: "0.5625rem",
              letterSpacing: "0.25em",
              color: T.dim,
            }}
          >
            <span>Level</span>
            <span>Font</span>
            <span>Size</span>
            <span>Tracking</span>
            <span>LH</span>
            <span>Role · Preview</span>
          </div>

          {SCALE.map((step, i) => {
            const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
            const isAnton = step.font === "Anton";
            return (
              <div
                key={step.token}
                className="grid items-center"
                style={{
                  gridTemplateColumns: "48px 80px 120px 80px 60px 1fr",
                  gap: "0 16px",
                  padding: "22px 24px",
                  borderBottom: i < SCALE.length - 1 ? `1px solid ${T.borderD}` : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                }}
              >
                <span className="font-body font-medium" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: T.accent, textTransform: "uppercase" }}>
                  {step.token}
                </span>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>
                  {step.font} {step.weight}
                </span>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.03em" }}>
                  {step.size}
                </span>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>
                  {step.tracking}
                </span>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>
                  {step.lh}
                </span>
                <div>
                  <p className="font-body" style={{ fontSize: "0.5rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                    {step.role}
                  </p>
                  <p
                    className={`${fontClass} ${isAnton ? "uppercase" : ""} leading-none`}
                    style={{
                      fontSize: step.size.startsWith("clamp") ? "clamp(1rem,2vw,1.5rem)" : step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.tracking === "0" ? undefined : step.tracking,
                      color: T.white,
                      lineHeight: parseFloat(step.lh),
                    }}
                  >
                    {step.preview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Editorial interlude — Anton statement ──────────────────────────── */}
      <div style={{ background: "#F4F1EB", padding: "120px 0", textAlign: "center" }}>
        <p
          className="font-logo uppercase leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)", color: "#111", letterSpacing: "-0.02em" }}
        >
          DESIGN<br />DAT WERKT<span style={{ color: "#FF4A2A" }}>.</span>
        </p>
        <p
          className="font-antonio"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", fontWeight: 300, color: "#999", letterSpacing: "0.03em", marginTop: "40px" }}
        >
          Anton · L1 · clamp(3rem, 8vw, 8rem) · –0.02em
        </p>
      </div>

      {/* ═══ §03 DISPLAY TYPOGRAPHY ═══════════════════════════════════════════ */}
      <section>
        <SectionHeader n="03" title="Display Typography" />

        <div className="space-y-1">

          <div className="overflow-hidden" style={{ background: T.surface, padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "48px" }}>
              Anton · L1 · Logo · Cover
            </p>
            <h1
              className="font-logo uppercase leading-none"
              style={{ fontSize: "clamp(4rem, 10vw, 12rem)", letterSpacing: "-0.025em", color: T.white }}
            >
              BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
            </h1>
          </div>

          <div className="overflow-hidden" style={{ background: "#F4F1EB", padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "48px" }}>
              Anton · L2 · Section titles
            </p>
            <div className="flex flex-col gap-4">
              {["OVER MIJ", "WAT IK DOE", "BRAND BOOK"].map(t => (
                <h2 key={t}
                  className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.02em", color: "#111" }}
                >
                  {t}
                </h2>
              ))}
            </div>
          </div>

          <div className="overflow-hidden" style={{ background: T.surface, padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "48px" }}>
              Antonio · L3 · 600 · Section subheadings
            </p>
            <h3
              className="font-antonio leading-none"
              style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white }}
            >
              Webdesign &amp; Development
            </h3>
          </div>

          <div className="overflow-hidden" style={{ background: T.surface, padding: "48px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "32px" }}>
              Antonio · L4 · 400 · Editorial headings
            </p>
            <h4
              className="font-antonio"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)", fontWeight: 400, letterSpacing: "0.01em", color: T.white, lineHeight: 1.05 }}
            >
              Moderne, snelle websites die niet alleen mooi zijn maar ook converteren.
            </h4>
          </div>

          <div className="overflow-hidden" style={{ background: "#F4F1EB", padding: "48px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "32px" }}>
              Antonio · L5 · 300 · Kicker · Supporting
            </p>
            <p
              className="font-antonio"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 300, letterSpacing: "0.02em", color: "#777", lineHeight: 1.1 }}
            >
              Performance-first digital studio · Amsterdam
            </p>
          </div>

        </div>
      </section>

      {/* ═══ §04 BODY TEXT ════════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="04" title="Body Text — Inter" />

        <div style={{ background: "#F4F1EB", padding: "64px 48px" }}>
          <div className="max-w-2xl space-y-12">

            <div>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>
                L6 · Inter 500 · 0.9375rem · Body emphasis
              </p>
              <p className="font-body font-medium" style={{ fontSize: "0.9375rem", color: "#111", lineHeight: 1.6 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren voor jouw bedrijf.
              </p>
            </div>

            <div style={{ height: "1px", background: "rgba(0,0,0,0.09)" }} />

            <div>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>
                L7 · Inter 400 · 0.9375rem · Body text
              </p>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#444", lineHeight: 1.7 }}>
                Van strategie en design tot volledige front-end implementatie met de nieuwste technologieën. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn. Wij bouwen websites die presteren.
              </p>
            </div>

            <div style={{ height: "1px", background: "rgba(0,0,0,0.09)" }} />

            <div>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>
                L8 · Inter 400 · 0.625rem · Labels · Metadata
              </p>
              <p className="font-body uppercase" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em" }}>
                Webdesign · Branding · 2026 · Amsterdam · Performance-first
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ §05 BUTTON SYSTEM ════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="05" title="Button System" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          <div style={{ background: "#0B0B0B", padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "56px" }}>
              Dark canvas
            </p>
            <div className="space-y-8">
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Primary CTA — Antonio 700
                </p>
                <button
                  className="font-antonio uppercase"
                  style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
                >
                  Start Project
                </button>
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Secondary — Antonio 400
                </p>
                <button
                  className="font-antonio uppercase"
                  style={{ fontWeight: 400, background: "transparent", color: T.white, border: "1px solid rgba(255,255,255,0.2)", padding: "13px 28px", fontSize: "14px", letterSpacing: "0.08em" }}
                >
                  Bekijk Werk
                </button>
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  UI tags — Inter 400
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Webdesign", "Branding", "2026"].map(t => (
                    <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted, border: `1px solid ${T.borderD}`, padding: "3px 10px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#F4F1EB", padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "56px" }}>
              Light canvas
            </p>
            <div className="space-y-8">
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Primary CTA — Antonio 700
                </p>
                <button
                  className="font-antonio uppercase"
                  style={{ fontWeight: 700, background: "#111", color: "#F4F1EB", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
                >
                  Start Project
                </button>
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Secondary — Antonio 400
                </p>
                <button
                  className="font-antonio uppercase"
                  style={{ fontWeight: 400, background: "transparent", color: "#111", border: "1px solid rgba(0,0,0,0.2)", padding: "13px 28px", fontSize: "14px", letterSpacing: "0.08em" }}
                >
                  Bekijk Werk
                </button>
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  UI tags — Inter 400
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Webdesign", "Branding", "2026"].map(t => (
                    <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.12)", padding: "3px 10px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §06 DARK · LIGHT ════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="06" title="Dark · Light" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          <div style={{ background: "#0B0B0B", padding: "64px 48px" }}>
            <div className="space-y-8">
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>Studio</p>
                <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#F5F5F5" }}>BIT & BEELD</p>
              </div>
              <h2
                className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", fontWeight: 600, color: "#F5F5F5", letterSpacing: "0.01em" }}
              >
                Design dat<br />werkt.
              </h2>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Webdesign", "Branding", "2026"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5F5F5", border: "1px solid rgba(255,255,255,0.12)", padding: "4px 10px" }}>
                    {t}
                  </span>
                ))}
                <span className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: "#FF4A2A", padding: "4px 10px" }}>
                  Featured
                </span>
              </div>
              <button
                className="font-antonio uppercase"
                style={{ fontWeight: 700, background: "#FF4A2A", color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
              >
                Bekijk Werk
              </button>
            </div>
          </div>

          <div style={{ background: "#F4F1EB", padding: "64px 48px" }}>
            <div className="space-y-8">
              <div>
                <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>Studio</p>
                <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#111111" }}>BIT & BEELD</p>
              </div>
              <h2
                className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", fontWeight: 600, color: "#111111", letterSpacing: "0.01em" }}
              >
                Design dat<br />werkt.
              </h2>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#555", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Webdesign", "Branding", "2026"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", border: "1px solid rgba(0,0,0,0.15)", padding: "4px 10px" }}>
                    {t}
                  </span>
                ))}
                <span className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: "#FF4A2A", padding: "4px 10px" }}>
                  Featured
                </span>
              </div>
              <button
                className="font-antonio uppercase"
                style={{ fontWeight: 700, background: "#111111", color: "#F4F1EB", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
              >
                Bekijk Werk
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §07 SPACING · RHYTHM ═════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="07" title="Spacing · Rhythm" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          <div style={{ background: T.surface, padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "56px" }}>
              Live composition
            </p>
            <div>
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                01 — WEBDESIGN
              </span>
              <div style={{ height: "1px", background: T.borderD, margin: "4px 0 24px" }} />
              <h2
                className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white, marginBottom: "16px" }}
              >
                Webdesign &amp;<br />Development
              </h2>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "24px" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: "24px" }}>
                {["React", "TypeScript", "Figma"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <button
                className="font-antonio uppercase"
                style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
              >
                Bekijk Werk →
              </button>
            </div>
          </div>

          <div style={{ background: T.surface2, padding: "64px 48px" }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "56px" }}>
              Spacing rules
            </p>
            <div className="space-y-8">
              {[
                { pair: "L8 label → rule",  gap: "4px",  note: "Section number to divider — minimal, binds them together." },
                { pair: "Rule → L3",         gap: "24px", note: "Divider to subheading — full beat to signal new content." },
                { pair: "L3 → L7 body",      gap: "16px", note: "Subheading to paragraph — close enough to feel related." },
                { pair: "L7 body → tags",    gap: "24px", note: "Paragraph to metadata — pause before secondary info." },
                { pair: "Tags → CTA",        gap: "24px", note: "Metadata to button — pause before the action moment." },
              ].map(({ pair, gap, note }) => (
                <div key={pair} style={{ borderBottom: `1px solid ${T.borderD}`, paddingBottom: "20px" }}>
                  <div className="flex items-baseline justify-between" style={{ marginBottom: "8px" }}>
                    <span className="font-body font-medium" style={{ fontSize: "0.625rem", color: T.white, letterSpacing: "0.1em" }}>{pair}</span>
                    <span className="font-antonio" style={{ fontSize: "1.5rem", fontWeight: 300, color: T.accent, letterSpacing: "0.02em" }}>{gap}</span>
                  </div>
                  <p className="font-body" style={{ fontSize: "0.8125rem", color: T.muted, lineHeight: 1.6 }}>{note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §08 EDITORIAL — COMPOSITIONS ════════════════════════════════════ */}
      <section>
        <SectionHeader n="08" title="Editorial — Compositions" />

        <div className="space-y-1">

          <div
            className="grid md:grid-cols-2 gap-12 items-end"
            style={{ background: "#0B0B0B", padding: "96px 64px" }}
          >
            <div>
              <h1
                className="font-logo uppercase leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 9rem)", letterSpacing: "-0.025em", color: "#F5F5F5" }}
              >
                BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
              </h1>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-8">
                {[
                  { label: "STUDIO",  value: "Bit & Beeld" },
                  { label: "ISSUED",  value: "May 2026" },
                  { label: "LOCATIE", value: "Amsterdam" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</p>
                    <p className="font-body" style={{ fontSize: "0.875rem", color: "#AAAAAA" }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.35em", textTransform: "uppercase" }}>
                SCROLL TO EXPLORE
              </p>
            </div>
          </div>

          <div
            className="grid md:grid-cols-2 gap-10 items-center"
            style={{ background: T.surface, padding: "80px 64px" }}
          >
            <div>
              <div className="flex items-center gap-4" style={{ marginBottom: "32px" }}>
                <span className="font-body tabular-nums" style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.45em", textTransform: "uppercase" }}>01</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              </div>
              <p className="font-antonio" style={{ fontSize: "0.9375rem", fontWeight: 300, letterSpacing: "0.02em", color: T.accent, marginBottom: "12px" }}>
                Performance-first
              </p>
              <h3
                className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: "#F5F5F5", marginBottom: "20px" }}
              >
                Webdesign &amp;<br />Development
              </h3>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "38ch", marginBottom: "24px" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px" }}>
                {["React", "TypeScript", "Figma", "CMS"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.42)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "3px 10px" }}>{t}</span>
                ))}
              </div>
              <button
                className="font-antonio uppercase"
                style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}
              >
                Bekijk werk →
              </button>
            </div>
            <div style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.borderD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-body" style={{ fontSize: "0.75rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase" }}>Project image</span>
            </div>
          </div>

          <div style={{ background: "#F4F1EB", padding: "80px 64px" }}>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <div style={{ height: "1px", background: "rgba(0,0,0,0.09)", marginBottom: "24px" }} />
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: "#999", textTransform: "uppercase", display: "block", marginBottom: "32px" }}>
                  03 — LOGO &amp; MONOGRAM
                </span>
                <p
                  className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111", letterSpacing: "-0.01em" }}
                >
                  BIT &amp;<br />BEELD
                </p>
              </div>
              <div className="space-y-8">
                {[
                  { label: "PRIMARY",  body: "Light background — default application. Anton, uppercase, full wordmark." },
                  { label: "SCALE",    body: "Use the logo at a size where the letterforms remain sharp and legible." },
                  { label: "SPACING",  body: "Minimum clear space: one cap-height on all sides of the wordmark." },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.09)", marginBottom: "12px" }} />
                    <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</p>
                    <p className="font-body" style={{ fontSize: "0.8125rem", color: "#777", lineHeight: 1.65 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §09 TYPOGRAPHY IN PRACTICE ══════════════════════════════════════ */}
      <section>
        <SectionHeader n="09" title="Typography in Practice" />

        {/* Intro */}
        <div style={{ background: "#F4F1EB", padding: "64px 48px", marginBottom: "1px" }}>
          <p
            className="font-antonio"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 300, color: "#888", letterSpacing: "0.02em", lineHeight: 1.35, maxWidth: "52ch" }}
          >
            Eight levels. Three families. Every decision exists to serve a specific role — from identity-level impact down to invisible body copy.
          </p>
        </div>

        {/* Dark canvas */}
        <div style={{ background: "#0B0B0B", padding: "80px 48px", marginBottom: "1px" }}>
          <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "72px" }}>
            Dark canvas
          </p>
          <div className="space-y-14">
            {SCALE.map(step => {
              const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
              const fox = step.token === "L8"
                ? "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
                : "The quick brown fox jumps over the lazy dog.";
              return (
                <div key={`dark-${step.token}`}>
                  <p className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
                    {step.token} · {step.font} {step.weight} · {step.role}
                  </p>
                  <p
                    className={`${fontClass} ${step.font === "Anton" ? "uppercase" : ""}`}
                    style={{
                      fontSize: step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.token === "L8" ? "0.25em" : (step.tracking === "0" ? undefined : step.tracking),
                      color: T.white,
                      lineHeight: parseFloat(step.lh),
                    }}
                  >
                    {fox}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Light canvas */}
        <div style={{ background: "#F4F1EB", padding: "80px 48px", marginBottom: "1px" }}>
          <p className="font-body" style={{ fontSize: "0.625rem", color: "#AAA", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "72px" }}>
            Light canvas
          </p>
          <div className="space-y-14">
            {SCALE.map(step => {
              const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
              const fox = step.token === "L8"
                ? "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
                : "The quick brown fox jumps over the lazy dog.";
              return (
                <div key={`light-${step.token}`}>
                  <p className="font-body" style={{ fontSize: "0.5625rem", color: "#AAA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
                    {step.token} · {step.font} {step.weight} · {step.role}
                  </p>
                  <p
                    className={`${fontClass} ${step.font === "Anton" ? "uppercase" : ""}`}
                    style={{
                      fontSize: step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.token === "L8" ? "0.25em" : (step.tracking === "0" ? undefined : step.tracking),
                      color: "#111",
                      lineHeight: parseFloat(step.lh),
                    }}
                  >
                    {fox}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* System notes */}
        <div style={{ background: T.surface, padding: "80px 48px" }}>
          <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "64px" }}>
            System notes
          </p>
          <div className="space-y-10">
            {[
              { token: "L1", family: "Anton 400",    role: "Logo · cover · identity",          why: "Architecture-level impact. Reserved for the logo wordmark and cover statements only. Never for content that needs to be read.", feeling: "Monolithic · authoritative · unmistakable" },
              { token: "L2", family: "Anton 400",    role: "Section titles",                   why: "Opens a section. Directional rather than decorative — tells the reader exactly where they are in the document.", feeling: "Commanding · directional · structural" },
              { token: "L3", family: "Antonio 600",  role: "Section subheadings",              why: "First editorial voice after Anton. Anchors the section without competing with L1 or L2. The bridge between display and reading.", feeling: "Structured · confident · editorial" },
              { token: "L4", family: "Antonio 400",  role: "Editorial headings · card titles", why: "Where meaning lives. Long enough to carry a full sentence, tight enough to feel considered. The most readable Antonio level.", feeling: "Readable at a glance · purposeful · clear" },
              { token: "L5", family: "Antonio 300",  role: "Kickers · supporting text",        why: "Breath before content. Sets context, adds editorial color. Never demands attention — it supplements without interrupting.", feeling: "Light · understated · almost whispering" },
              { token: "L6", family: "Inter 500",    role: "Body emphasis · intro paragraph",  why: "Leads the reader into body text. Slightly heavier than L7 to signal an opening statement or key point.", feeling: "Focused · grounded · one step above neutral" },
              { token: "L7", family: "Inter 400",    role: "Body text · descriptions",         why: "The workhorse of the system. Neutral enough to disappear into long-form reading. Every word on the portfolio flows through L7.", feeling: "Invisible clarity · neutral · reliable" },
              { token: "L8", family: "Inter 400",    role: "Labels · metadata · UI tags",      why: "Scanned, not read. Always uppercase to signal its functional nature. Categorizes content — technology stacks, dates, locations.", feeling: "Functional · sparse · metadata" },
            ].map(({ token, family, role, why, feeling }, i, arr) => (
              <div
                key={token}
                style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.borderD}` : "none", paddingBottom: "36px" }}
              >
                <div className="flex items-baseline gap-4 flex-wrap" style={{ marginBottom: "14px" }}>
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.accent, letterSpacing: "0.2em", textTransform: "uppercase", minWidth: "24px" }}>{token}</span>
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.white, letterSpacing: "0.1em" }}>{family}</span>
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.1em" }}>{role}</span>
                </div>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "10px", maxWidth: "56ch" }}>
                  {why}
                </p>
                <p className="font-body" style={{ fontSize: "0.5625rem", color: T.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {feeling}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══ §10 TYPOGRAPHY SYSTEM — ANTON · ANTONIO · INTER ════════════════════ */}
      <section>
        <SectionHeader n="10" title="Anton · Antonio · Inter — Typography System" />

        {/* Info strip */}
        <div
          className="mb-6 flex flex-wrap items-center gap-4 justify-between p-5"
          style={{ background: T.surface2, border: `1px solid ${T.borderD}` }}
        >
          <div className="flex flex-wrap gap-3">
            <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.green, border: `1px solid ${T.green}`, padding: "3px 8px" }}>
              System finalized
            </span>
            <Tag>Anton — identity · impact</Tag>
            <Tag>Antonio — editorial · hierarchy</Tag>
            <Tag>Inter — body · UI · readability</Tag>
          </div>
          <p className="font-body" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
            Refine here before applying globally · revert: delete §10 + remove <code style={{ color: T.white }}>antonio</code> from tailwind.config.ts
          </p>
        </div>

        <div className="space-y-3">

          {/* ── §A System roles ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="p-8 flex flex-col gap-6" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
              <Tag>Anton — Identity · Impact</Tag>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <div className="space-y-1">
                {([
                  ["Role",     "Logo · display · major section titles"],
                  ["Weight",   "400 — single weight"],
                  ["Tracking", "–0.02em display · –0.01em title"],
                  ["Leading",  "1.0"],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase", minWidth: "62px", flexShrink: 0 }}>{k}</span>
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.muted }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 flex flex-col gap-6" style={{ background: "#0E0E0E", border: "1px solid rgba(255,74,42,0.25)" }}>
              <Tag accent>Antonio — Editorial · Hierarchy</Tag>
              <p className="font-antonio" style={{ fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", color: T.white, lineHeight: 1.05, letterSpacing: "0.01em" }}>
                Design dat<br />werkt.
              </p>
              <div className="space-y-1">
                {([
                  ["Role",     "Secondary headings · editorial support"],
                  ["Weight",   "300 / 400 / 600"],
                  ["Tracking", "0.01–0.02em"],
                  ["Leading",  "1.0–1.1"],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase", minWidth: "62px", flexShrink: 0 }}>{k}</span>
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.muted }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 flex flex-col gap-6" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Inter — Body · UI · Readability</Tag>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Moderne websites die converteren en resultaat opleveren voor jouw bedrijf.
              </p>
              <div className="space-y-1">
                {([
                  ["Role",     "Body · labels · forms · metadata · UI"],
                  ["Weight",   "400 / 500"],
                  ["Tracking", "0 body · 0.25em labels"],
                  ["Leading",  "1.65–1.75 body · 1.5 UI"],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase", minWidth: "62px", flexShrink: 0 }}>{k}</span>
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.muted }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── §B Type scale L1–L8 ── */}
          <div style={{ border: `1px solid ${T.borderD}` }}>
            <div className="px-6 py-4 flex items-center gap-4" style={{ background: T.surface2, borderBottom: `1px solid ${T.borderD}` }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>§B</span>
              <p className="font-body" style={{ fontSize: "0.75rem", color: T.white }}>Type scale — L1 → L8</p>
            </div>
            {SCALE.map((step, i) => {
              const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
              const isAnton = step.font === "Anton";
              return (
                <div
                  key={`b-${step.token}`}
                  className="px-6 py-5 flex flex-col gap-2"
                  style={{ borderBottom: i < SCALE.length - 1 ? `1px solid ${T.borderD}` : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>{step.token}</span>
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.1em" }}>{step.font} {step.weight} · {step.size} · {step.tracking} · lh {step.lh}</span>
                    <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.1em" }}>{step.role}</span>
                  </div>
                  <p
                    className={`${fontClass} ${isAnton ? "uppercase" : ""}`}
                    style={{
                      fontSize: step.size.startsWith("clamp") ? step.size : step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.tracking === "0" ? undefined : step.tracking,
                      color: T.white,
                      lineHeight: parseFloat(step.lh),
                    }}
                  >
                    {step.preview}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ── §C Anton primary roles ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <div className="p-8 overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>L1 · Logo · clamp(2.5rem,6vw,5rem)</p>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
            </div>

            <div className="p-8 overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>L1 · Cover · clamp(4rem,10vw,12rem)</p>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(4rem, 10vw, 12rem)", letterSpacing: "-0.025em", color: T.white }}>
                BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
              </p>
            </div>

            <div className="p-8 overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>L2 · Section titles · clamp(1.75rem,4vw,3.25rem)</p>
              <div className="flex flex-col gap-2">
                {["OVER MIJ", "WAT IK DOE", "BRAND BOOK"].map(t => (
                  <p key={t} className="font-logo uppercase leading-none" style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.02em", color: T.white }}>{t}</p>
                ))}
              </div>
            </div>

            <div className="p-8 overflow-hidden" style={{ background: "#F4F1EB", border: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase" }}>L1 · Light bg · clamp(3rem,8vw,7rem)</p>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.01em", color: "#111" }}>
                BIT &amp;<br />BEELD
              </p>
            </div>

          </div>

          {/* ── §D Antonio 3 weights ── */}
          <div style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <div className="px-6 py-4" style={{ background: T.surface2, borderBottom: `1px solid ${T.borderD}` }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>§D · Antonio — 3 active weights</span>
            </div>
            {[
              { weight: 600, level: "L3", size: "clamp(1.375rem, 2.5vw, 2.25rem)", tracking: "0.01em", label: "SemiBold · Section subheadings", text: "Webdesign & Development" },
              { weight: 400, level: "L4", size: "clamp(1.125rem, 2vw, 1.75rem)",   tracking: "0.01em", label: "Regular · Editorial headings",    text: "Moderne, snelle websites die niet alleen mooi zijn maar ook converteren." },
              { weight: 300, level: "L5", size: "clamp(1rem, 1.5vw, 1.25rem)",     tracking: "0.02em", label: "Light · Supporting text · kickers", text: "Performance-first digital studio · Amsterdam, NL" },
            ].map(({ weight, level, size, tracking, label, text }, i) => (
              <div
                key={level}
                className="px-8 py-8"
                style={{ borderBottom: i < 2 ? `1px solid ${T.borderD}` : "none" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>{level}</span>
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.1em" }}>Antonio {weight} · {size} · {tracking}</span>
                  <span className="font-body" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.1em" }}>{label}</span>
                </div>
                <p className="font-antonio" style={{ fontSize: size, fontWeight: weight, letterSpacing: tracking, color: T.white, lineHeight: 1.05 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* ── §E Button + UI system ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <div className="p-8 space-y-6" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>Dark · Button system</span>
              <div className="space-y-5">
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase" }}>Primary CTA · Antonio 700 · 15px · 0.1em</p>
                  <button className="font-antonio uppercase" style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                    Start Project
                  </button>
                </div>
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase" }}>Secondary · Antonio 400 · 14px · 0.08em</p>
                  <button className="font-antonio uppercase" style={{ fontWeight: 400, background: "transparent", color: T.white, border: "1px solid rgba(255,255,255,0.2)", padding: "13px 28px", fontSize: "14px", letterSpacing: "0.08em" }}>
                    Bekijk Werk
                  </button>
                </div>
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase" }}>UI tag · Inter 400 · 10px · 0.15em</p>
                  <div className="flex flex-wrap gap-2">
                    {["Webdesign", "Branding", "2026"].map(t => (
                      <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted, border: `1px solid ${T.borderD}`, padding: "3px 10px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6" style={{ background: "#F4F1EB", border: "1px solid rgba(0,0,0,0.08)" }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase" }}>Light · Button system</span>
              <div className="space-y-5">
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: "#999", letterSpacing: "0.15em", textTransform: "uppercase" }}>Primary CTA · Antonio 700 · 15px · 0.1em</p>
                  <button className="font-antonio uppercase" style={{ fontWeight: 700, background: "#111", color: "#F4F1EB", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                    Start Project
                  </button>
                </div>
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: "#999", letterSpacing: "0.15em", textTransform: "uppercase" }}>Secondary · Antonio 400 · 14px · 0.08em</p>
                  <button className="font-antonio uppercase" style={{ fontWeight: 400, background: "transparent", color: "#111", border: "1px solid rgba(0,0,0,0.2)", padding: "13px 28px", fontSize: "14px", letterSpacing: "0.08em" }}>
                    Bekijk Werk
                  </button>
                </div>
                <div>
                  <p className="font-body mb-2" style={{ fontSize: "0.5625rem", color: "#999", letterSpacing: "0.15em", textTransform: "uppercase" }}>UI tag · Inter 400 · 10px · 0.15em</p>
                  <div className="flex flex-wrap gap-2">
                    {["Webdesign", "Branding", "2026"].map(t => (
                      <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.12)", padding: "3px 10px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── §F Full composition ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <div className="p-10 space-y-8" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase" }}>§F · Full composition — dark</span>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <p className="font-body mb-1" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>Studio · L8</p>
                <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: T.white }}>BIT & BEELD</p>
              </div>
              <p className="font-antonio leading-none" style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white }}>
                Webdesign &amp;<br />Development
              </p>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Figma"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px" }}>{t}</span>
                ))}
              </div>
              <button className="font-antonio uppercase" style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                Start Project
              </button>
            </div>

            <div className="p-10 space-y-8" style={{ background: "#F4F1EB", border: "1px solid rgba(0,0,0,0.08)" }}>
              <span className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.3em", textTransform: "uppercase" }}>§F · Full composition — light</span>
              <div style={{ height: "1px", background: "rgba(0,0,0,0.09)" }} />
              <div>
                <p className="font-body mb-1" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase" }}>Studio · L8</p>
                <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#111" }}>BIT & BEELD</p>
              </div>
              <p className="font-antonio leading-none" style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: "#111" }}>
                Webdesign &amp;<br />Development
              </p>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#555", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Figma"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.12)", padding: "3px 8px" }}>{t}</span>
                ))}
              </div>
              <button className="font-antonio uppercase" style={{ fontWeight: 700, background: "#111", color: "#F4F1EB", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                Start Project
              </button>
            </div>

          </div>

        </div>
      </section>

    </main>

    {/* ── Footer ────────────────────────────────────────────────────────────── */}
    <footer
      className="px-6 md:px-12 lg:px-24 py-10 flex items-center justify-between flex-wrap gap-4"
      style={{ borderTop: `1px solid ${T.borderD}` }}
    >
      <div className="flex items-center gap-4">
        <span className="font-logo uppercase" style={{ fontSize: "0.875rem", color: T.white }}>
          Typo Lab
        </span>
        <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          v0.2 · Internal only
        </span>
      </div>
      <Link
        to="/"
        className="font-body inline-flex items-center gap-2 transition-colors"
        style={{ fontSize: "0.75rem", color: T.dim, letterSpacing: "0.08em" }}
        onMouseEnter={e => (e.currentTarget.style.color = T.white)}
        onMouseLeave={e => (e.currentTarget.style.color = T.dim)}
      >
        <ArrowLeft size={12} />
        Back to portfolio
      </Link>
    </footer>

  </div>
);

export default TypoLab;
