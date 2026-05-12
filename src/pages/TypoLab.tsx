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

/* ── Local design tokens (proposals — not yet applied globally) ────────────── */
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

/* ── Proposed type scale ───────────────────────────────────────────────────── */
const SCALE = [
  { token: "2XS",  rem: "0.625rem", px: 10,
    preview: "Tags · chips · section numbers · metadata keys" },
  { token: "XS",   rem: "0.75rem",  px: 12,
    preview: "Captions · form labels · nav secondary · timestamps" },
  { token: "SM",   rem: "0.875rem", px: 14,
    preview: "Secondary body text, descriptions, and tool chip labels." },
  { token: "BASE", rem: "1rem",     px: 16,
    preview: "Primary body text — comfortable and clear for long reads." },
  { token: "LG",   rem: "1.125rem", px: 18,
    preview: "Large body paragraphs and introductory text blocks." },
  { token: "XL",   rem: "1.25rem",  px: 20,
    preview: "Prominent UI text, featured annotations and pull quotes." },
  { token: "2XL",  rem: "1.5rem",   px: 24,
    preview: "Small headings, card titles and contact information." },
  { token: "3XL",  rem: "1.875rem", px: 30,
    preview: "Section subheadings, featured quotes and key statements." },
  { token: "4XL",  rem: "2.25rem",  px: 36,
    preview: "Section headings and major block titles across the site." },
  { token: "5XL",  rem: "3rem",     px: 48,
    preview: "Large editorial titles and hero supporting text." },
  { token: "6XL",  rem: "3.75rem",  px: 60,
    preview: "Hero headings — primary page titles." },
  { token: "7XL",  rem: "4.5rem",   px: 72,
    preview: "Display — maximum impact moments only." },
];

/* ── Reusable section header ───────────────────────────────────────────────── */
const SectionHeader = ({ n, title, light = false }: { n: string; title: string; light?: boolean }) => (
  <div className="mb-10">
    <div className="flex items-baseline gap-5 mb-4">
      <span
        className="font-body tabular-nums flex-shrink-0"
        style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: light ? T.dim : T.dim }}
      >
        {n}
      </span>
      <span
        className="font-display font-extrabold uppercase"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
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
   THUNDER @font-face declarations — only injected when TypoLab is mounted.
   Paths resolve from /public. To revert: delete §10 + remove `thunder` from
   tailwind.config.ts and this THUNDER_CSS constant.
   ───────────────────────────────────────────────────────────────────────────── */
const THUNDER_CSS = `
@font-face {
  font-family: 'ThunderHC';
  src: url('/fonts/Web-TT/Thunder-LightHC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-LightHC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-LightHC.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ThunderHC';
  src: url('/fonts/Web-TT/Thunder-HC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-HC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-HC.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ThunderHC';
  src: url('/fonts/Web-TT/Thunder-BoldHC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-BoldHC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-BoldHC.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ThunderHC';
  src: url('/fonts/Web-TT/Thunder-ExtraBoldHC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-ExtraBoldHC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-ExtraBoldHC.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ThunderHC';
  src: url('/fonts/Web-TT/Thunder-BlackHC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-BlackHC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-BlackHC.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ThunderLC';
  src: url('/fonts/Web-TT/Thunder-BlackLC.woff2') format('woff2'),
       url('/fonts/Web-TT/Thunder-BlackLC.woff') format('woff'),
       url('/fonts/Web-TT/Thunder-BlackLC.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
`;

/* ═══════════════════════════════════════════════════════════════════════════ */

const TypoLab = () => (
  <div style={{ background: T.bg, minHeight: "100vh", color: T.white }}>

    {/* Thunder @font-face — scoped to this route; removed when TypoLab unmounts */}
    {/* eslint-disable-next-line react/no-danger */}
    <style dangerouslySetInnerHTML={{ __html: THUNDER_CSS }} />

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
      style={{ paddingTop: "52px", paddingBottom: "48px", borderBottom: `1px solid ${T.borderD}` }}
    >
      <div style={{ paddingTop: "80px" }}>
        <Tag>Typography System · v0.1 Draft</Tag>
        <h1
          className="font-logo uppercase leading-none mt-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.02em", color: T.white }}
        >
          TYPO<br />LAB<span style={{ color: T.accent }}>.</span>
        </h1>
        <p
          className="font-body mt-6 max-w-xl"
          style={{ fontSize: "1rem", color: T.muted, lineHeight: 1.7 }}
        >
          A controlled environment for testing and refining the typography system
          before applying changes globally. Not part of the public portfolio.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          {["Anton — Identity", "Syne — Structure", "Inter — Readability"].map(t => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>

    {/* ── Main content ─────────────────────────────────────────────────────── */}
    <main className="px-6 md:px-12 lg:px-24 py-24 space-y-32 max-w-screen-2xl mx-auto">

      {/* ═══ §01 FONT OVERVIEW ════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="01" title="Font Overview" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Anton */}
          <div
            className="flex flex-col p-8"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: T.dim, textTransform: "uppercase" }}>
                Identity / Impact
              </span>
              <Tag accent>Logo</Tag>
            </div>

            <div style={{ height: "1px", background: T.borderD, marginBottom: "32px" }} />

            <span
              className="font-logo uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: T.white, letterSpacing: "-0.01em" }}
            >
              Anton
            </span>

            <div style={{ height: "1px", background: T.borderD, marginTop: "32px", marginBottom: "24px" }} />

            <div className="space-y-3">
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Available weight
                </span>
                <p className="font-logo uppercase mt-1" style={{ fontSize: "1.5rem", color: T.white }}>
                  400 — Regular
                </p>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Usage
                </span>
                <p className="font-body mt-1" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.6 }}>
                  Logo wordmark only. Hero display moments. Brandbook cover. Never for body or UI.
                </p>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Example
                </span>
                <p className="font-logo uppercase mt-2" style={{ fontSize: "1.25rem", color: T.white, letterSpacing: "0.01em" }}>
                  BIT &<br />BEELD
                </p>
              </div>
            </div>
          </div>

          {/* Syne */}
          <div
            className="flex flex-col p-8"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: T.dim, textTransform: "uppercase" }}>
                Structure / Design
              </span>
              <Tag accent>Display</Tag>
            </div>

            <div style={{ height: "1px", background: T.borderD, marginBottom: "32px" }} />

            <span
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: T.white, letterSpacing: "-0.025em" }}
            >
              Syne
            </span>

            <div style={{ height: "1px", background: T.borderD, marginTop: "32px", marginBottom: "24px" }} />

            <div className="space-y-3">
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Loaded weights
                </span>
                <div className="mt-2 space-y-1">
                  {[
                    { w: "400", cls: "font-normal", label: "Regular" },
                    { w: "700", cls: "font-bold",   label: "Bold" },
                    { w: "800", cls: "font-extrabold", label: "ExtraBold — primary" },
                  ].map(({ w, cls, label }) => (
                    <p key={w} className={`font-display ${cls}`} style={{ fontSize: "1rem", color: w === "800" ? T.white : T.muted }}>
                      {w} — {label}
                    </p>
                  ))}
                </div>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Usage
                </span>
                <p className="font-body mt-1" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.6 }}>
                  All h1–h6, section titles, CTAs, navigation menu items, editorial headings.
                </p>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Example
                </span>
                <p className="font-display font-extrabold uppercase mt-2" style={{ fontSize: "1.25rem", color: T.white, letterSpacing: "-0.01em" }}>
                  DESIGN<br />DAT WERKT.
                </p>
              </div>
            </div>
          </div>

          {/* Inter */}
          <div
            className="flex flex-col p-8"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: T.dim, textTransform: "uppercase" }}>
                Readability / UI
              </span>
              <Tag accent>Body</Tag>
            </div>

            <div style={{ height: "1px", background: T.borderD, marginBottom: "32px" }} />

            <span
              className="font-body font-medium leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: T.white, letterSpacing: "-0.02em" }}
            >
              Inter
            </span>

            <div style={{ height: "1px", background: T.borderD, marginTop: "32px", marginBottom: "24px" }} />

            <div className="space-y-3">
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Loaded weights
                </span>
                <div className="mt-2 space-y-1">
                  {[
                    { w: "400", cls: "font-normal", label: "Regular — body" },
                    { w: "500", cls: "font-medium", label: "Medium — UI, buttons" },
                  ].map(({ w, cls, label }) => (
                    <p key={w} className={`font-body ${cls}`} style={{ fontSize: "1rem", color: T.white }}>
                      {w} — {label}
                    </p>
                  ))}
                </div>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Usage
                </span>
                <p className="font-body mt-1" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.6 }}>
                  All body text, paragraphs, labels, captions, form fields, metadata, UI copy.
                </p>
              </div>
              <div style={{ height: "1px", background: T.borderD }} />
              <div>
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
                  Example
                </span>
                <p className="font-body mt-2" style={{ fontSize: "1rem", color: T.muted, lineHeight: 1.7 }}>
                  Moderne websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §02 TYPOGRAPHY SCALE ═════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="02" title="Typography Scale — Proposed rem system" />

        <div style={{ border: `1px solid ${T.borderD}` }}>
          {/* Header row */}
          <div
            className="grid font-body uppercase"
            style={{
              gridTemplateColumns: "80px 100px 60px 1fr",
              gap: "0 24px",
              padding: "12px 24px",
              borderBottom: `1px solid ${T.borderD}`,
              fontSize: "0.625rem",
              letterSpacing: "0.25em",
              color: T.dim,
            }}
          >
            <span>Token</span>
            <span>Rem</span>
            <span>Px</span>
            <span>Preview (Inter · Regular)</span>
          </div>

          {SCALE.map((step, i) => (
            <div
              key={step.token}
              className="grid items-center"
              style={{
                gridTemplateColumns: "80px 100px 60px 1fr",
                gap: "0 24px",
                padding: "20px 24px",
                borderBottom: i < SCALE.length - 1 ? `1px solid ${T.borderD}` : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
              }}
            >
              <span
                className="font-body font-medium"
                style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: T.accent, textTransform: "uppercase" }}
              >
                {step.token}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.75rem", color: T.dim, letterSpacing: "0.05em" }}
              >
                {step.rem}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.75rem", color: T.dim }}
              >
                {step.px}
              </span>
              <span
                className="font-body leading-tight"
                style={{ fontSize: step.rem, color: T.white, lineHeight: 1.3 }}
              >
                {step.preview}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Use rem for", items: ["Body text (BASE, LG)", "UI labels (XS, 2XS)", "Buttons and CTAs", "Form inputs", "Captions and meta"] },
            { label: "Keep clamp() for", items: ["Brandbook section h2s", "Portfolio card headings", "About / Contact intro", "Any heading that must scale between breakpoints"] },
            { label: "Keep vw for", items: ["Section banners (OVER MIJ)", "ScrollLogo hero wordmark", "Full-bleed editorial titles", "WAT IK DOE / Contact heading"] },
          ].map(({ label, items }) => (
            <div key={label} className="p-6" style={{ background: T.surface2, border: `1px solid ${T.borderD}` }}>
              <p className="font-body mb-4" style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: T.accent, textTransform: "uppercase" }}>
                {label}
              </p>
              <ul className="space-y-2">
                {items.map(i => (
                  <li key={i} className="font-body flex items-start gap-2" style={{ fontSize: "0.875rem", color: T.muted }}>
                    <span style={{ color: T.accent, flexShrink: 0 }}>—</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ §03 DISPLAY TYPOGRAPHY ═══════════════════════════════════════════ */}
      <section>
        <SectionHeader n="03" title="Display Typography — clamp / vw justified" />

        <div className="space-y-2">

          {/* Anton — Logo / Cover */}
          <div
            className="p-8 md:p-12 overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div className="flex gap-3">
                <Tag>Anton</Tag>
                <Tag>clamp(4rem, 10vw, 12rem)</Tag>
                <Tag accent>Cover · Brandbook</Tag>
              </div>
            </div>
            <h1
              className="font-logo uppercase leading-none"
              style={{ fontSize: "clamp(4rem, 10vw, 12rem)", letterSpacing: "-0.025em", color: T.white }}
            >
              BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
            </h1>
          </div>

          {/* Syne — Section banner */}
          <div
            className="p-8 md:p-12 overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex gap-3 mb-6">
              <Tag>Syne ExtraBold</Tag>
              <Tag>text-[10vw] md:text-[7vw] lg:text-[5.5vw]</Tag>
              <Tag accent>Section banners</Tag>
            </div>
            <h2
              className="font-display font-extrabold uppercase leading-none"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              OVER MIJ
            </h2>
          </div>

          {/* Syne — Section banner 2 */}
          <div
            className="p-8 md:p-12 overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex gap-3 mb-6">
              <Tag>Syne ExtraBold</Tag>
              <Tag>same scale — full-bleed title</Tag>
              <Tag accent>Projects section</Tag>
            </div>
            <h2
              className="font-display font-extrabold uppercase leading-none"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              WAT IK DOE
            </h2>
          </div>

          {/* Syne — Colophon / large editorial */}
          <div
            className="p-8 md:p-12 overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex gap-3 mb-6">
              <Tag>Syne ExtraBold</Tag>
              <Tag>clamp(2.2rem, 6vw, 8.5rem)</Tag>
              <Tag accent>Colophon · endings</Tag>
            </div>
            <h2
              className="font-display font-extrabold uppercase leading-none"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 8.5rem)",
                letterSpacing: "-0.025em",
                color: T.white,
              }}
            >
              DESIGN<br />DAT WERKT<span style={{ color: T.accent }}>.</span>
            </h2>
          </div>

          {/* Syne — Intro heading (About) */}
          <div
            className="p-8 md:p-12 overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex gap-3 mb-6">
              <Tag>Syne ExtraBold</Tag>
              <Tag>clamp(3rem, 5.5vw, 5rem)</Tag>
              <Tag accent>Intro / About</Tag>
            </div>
            <h3
              className="font-display font-extrabold leading-none"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 5rem)",
                letterSpacing: "-0.025em",
                color: T.white,
              }}
            >
              Hi, I'm<br />Wouter
            </h3>
          </div>

          {/* Note on clamp ranges */}
          <div
            className="p-6"
            style={{ background: "rgba(255,74,42,0.05)", border: `1px solid rgba(255,74,42,0.2)` }}
          >
            <p className="font-body" style={{ fontSize: "0.75rem", color: T.muted, lineHeight: 1.7 }}>
              <span style={{ color: T.accent }}>Note:</span> The five Brandbook section h2s currently use five slightly different clamp ranges
              (5rem, 5.5rem, and 6rem max values) with no visible difference. Proposal: consolidate to a
              single token <span style={{ color: T.white }}>clamp(1.6rem, 4vw, 5.5rem)</span> for all section headings at that scale.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ §04 BODY TEXT SYSTEM ═════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="04" title="Body Text System — Inter only" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Text hierarchy on dark */}
          <div
            className="p-8 space-y-8"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag>Dark background</Tag>
            </div>

            <div className="space-y-1">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                LG · 1.125rem · 18px
              </p>
              <p className="font-body" style={{ fontSize: "1.125rem", color: T.white, lineHeight: 1.65 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-1">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                BASE · 1rem · 16px
              </p>
              <p className="font-body" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Van strategie en design tot volledige front-end implementatie met de nieuwste technologieën. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-1">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                SM · 0.875rem · 14px
              </p>
              <p className="font-body" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                Apps en platformen die complexe processen vereenvoudigen. Van wireframe tot werkend product.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-1">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                XS · 0.75rem · 12px
              </p>
              <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, letterSpacing: "0.02em" }}>
                Webdesign &amp; Development · Groningen, Nederland · hello@bitenbeeld.nl
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-1">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                2XS · 0.625rem · 10px
              </p>
              <p className="font-body" style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                WEBDESIGN · 2026 · PERFORMANCE-FIRST · UI/UX
              </p>
            </div>
          </div>

          {/* Italic / emphasis variants */}
          <div
            className="p-8 space-y-8"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag>Weight &amp; style variants</Tag>
            </div>

            <div className="space-y-3">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Regular 400 — primary body
              </p>
              <p className="font-body font-normal" style={{ fontSize: "1rem", color: T.white, lineHeight: 1.7 }}>
                Visuele identiteiten die herkenbaar blijven en een krachtig verhaal vertellen.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-3">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Medium 500 — labels, UI, buttons
              </p>
              <p className="font-body font-medium" style={{ fontSize: "1rem", color: T.white, lineHeight: 1.7 }}>
                Visuele identiteiten die herkenbaar blijven en een krachtig verhaal vertellen.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-3">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Italic — emphasis / secondary
              </p>
              <p className="font-body italic" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                Visuele identiteiten die herkenbaar blijven en een krachtig verhaal vertellen.
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-3">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Uppercase tracking — labels
              </p>
              <p className="font-body font-medium uppercase" style={{ fontSize: "0.75rem", color: T.muted, lineHeight: 1.7, letterSpacing: "0.25em" }}>
                Studio · Amsterdam · Available for project · Medio 2026
              </p>
            </div>

            <div style={{ height: "1px", background: T.borderD }} />

            <div className="space-y-3">
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Tabular nums — time, counts
              </p>
              <p className="font-body font-medium tabular-nums" style={{ fontSize: "1rem", color: T.white }}>
                09:41 &nbsp;·&nbsp; GMT+2 &nbsp;·&nbsp; 01 / 04
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §05 BUTTON SYSTEM ════════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="05" title="Button System — font comparison" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Primary */}
          <div className="p-8 space-y-6" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Primary button
            </p>
            <div className="space-y-4">
              <div>
                <Tag>Syne · Bold · uppercase</Tag>
                <button
                  className="font-display font-bold uppercase mt-3 block w-full"
                  style={{
                    background: T.accent,
                    color: "#000",
                    padding: "14px 24px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                  }}
                >
                  Start Project
                </button>
              </div>
              <div>
                <Tag>Inter · Medium · uppercase</Tag>
                <button
                  className="font-body font-medium uppercase mt-3 block w-full"
                  style={{
                    background: T.accent,
                    color: "#000",
                    padding: "14px 24px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                  }}
                >
                  Start Project
                </button>
              </div>
              <p className="font-body" style={{ fontSize: "0.75rem", color: T.muted, lineHeight: 1.6 }}>
                Syne gives more personality. Inter is more neutral and readable at small sizes.
              </p>
            </div>
          </div>

          {/* Secondary / ghost */}
          <div className="p-8 space-y-6" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Secondary &amp; ghost
            </p>
            <div className="space-y-4">
              <div>
                <Tag>Secondary — outline</Tag>
                <button
                  className="font-display font-bold uppercase mt-3 block w-full"
                  style={{
                    background: "transparent",
                    color: T.white,
                    border: `1px solid rgba(255,255,255,0.25)`,
                    padding: "14px 24px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                  }}
                >
                  Bekijk Werk
                </button>
              </div>
              <div>
                <Tag>Ghost — text link</Tag>
                <button
                  className="font-display font-bold uppercase mt-3 block"
                  style={{
                    background: "transparent",
                    color: T.accent,
                    padding: "0",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    border: "none",
                  }}
                >
                  Meer over mij →
                </button>
              </div>
              <div>
                <Tag>Pill — rounded</Tag>
                <button
                  className="font-display font-bold uppercase mt-3 inline-block rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.75)",
                    border: `1px solid rgba(255,255,255,0.2)`,
                    padding: "12px 28px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  Plan Gesprek
                </button>
              </div>
            </div>
          </div>

          {/* Size comparison */}
          <div className="p-8 space-y-6" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Size hierarchy
            </p>
            <div className="space-y-4">
              {[
                { size: "1rem",     label: "LG — hero CTA",    py: "18px 36px" },
                { size: "0.875rem", label: "BASE — standard",  py: "14px 28px" },
                { size: "0.75rem",  label: "SM — compact",     py: "10px 20px" },
                { size: "0.625rem", label: "XS — inline link", py: "0" },
              ].map(({ size, label, py }) => (
                <div key={label}>
                  <Tag>{label}</Tag>
                  <button
                    className="font-display font-bold uppercase mt-2 block"
                    style={{
                      background: py === "0" ? "transparent" : T.accent,
                      color: py === "0" ? T.accent : "#000",
                      padding: py,
                      fontSize: size,
                      letterSpacing: "0.15em",
                      border: "none",
                    }}
                  >
                    Start Project {py === "0" ? "→" : ""}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §06 DARK / LIGHT TESTS ══════════════════════════════════════════ */}
      <section>
        <SectionHeader n="06" title="Dark / Light Contrast Tests" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          {/* Dark panel */}
          <div className="p-10 space-y-8" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
            <div className="flex gap-3">
              <Tag>Dark — #0B0B0B</Tag>
              <Tag accent>Primary canvas</Tag>
            </div>

            <div>
              <p className="font-body mb-1" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Studio
              </p>
              <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#F5F5F5" }}>
                BIT & BEELD
              </p>
            </div>

            <div>
              <h2 className="font-display font-extrabold uppercase leading-none" style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "#F5F5F5", letterSpacing: "-0.02em" }}>
                DESIGN DAT<br />WERKT.
              </h2>
            </div>

            <div>
              <p className="font-body" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Webdesign", "Branding", "2026"].map(t => (
                <span key={t} className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5F5F5", border: "1px solid rgba(255,255,255,0.12)", padding: "4px 10px" }}>
                  {t}
                </span>
              ))}
              <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: "#FF4A2A", padding: "4px 10px" }}>
                Featured
              </span>
            </div>

            <button
              className="font-display font-bold uppercase"
              style={{ background: "#FF4A2A", color: "#000", padding: "12px 28px", fontSize: "0.75rem", letterSpacing: "0.18em" }}
            >
              Bekijk Werk
            </button>
          </div>

          {/* Light panel */}
          <div className="p-10 space-y-8" style={{ background: "#F4F1EB", border: "1px solid rgba(0,0,0,0.09)" }}>
            <div className="flex gap-3">
              <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.12)", padding: "3px 8px" }}>
                Light — #F4F1EB
              </span>
              <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF4A2A", border: "1px solid #FF4A2A", padding: "3px 8px" }}>
                Secondary canvas
              </span>
            </div>

            <div>
              <p className="font-body mb-1" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Studio
              </p>
              <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#111111" }}>
                BIT & BEELD
              </p>
            </div>

            <div>
              <h2 className="font-display font-extrabold uppercase leading-none" style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "#111111", letterSpacing: "-0.02em" }}>
                DESIGN DAT<br />WERKT.
              </h2>
            </div>

            <div>
              <p className="font-body" style={{ fontSize: "1rem", color: "#666", lineHeight: 1.7 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Webdesign", "Branding", "2026"].map(t => (
                <span key={t} className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", border: "1px solid rgba(0,0,0,0.15)", padding: "4px 10px" }}>
                  {t}
                </span>
              ))}
              <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: "#FF4A2A", padding: "4px 10px" }}>
                Featured
              </span>
            </div>

            <button
              className="font-display font-bold uppercase"
              style={{ background: "#111111", color: "#F4F1EB", padding: "12px 28px", fontSize: "0.75rem", letterSpacing: "0.18em" }}
            >
              Bekijk Werk
            </button>
          </div>
        </div>
      </section>

      {/* ═══ §07 SPACING / RHYTHM ═════════════════════════════════════════════ */}
      <section>
        <SectionHeader n="07" title="Spacing / Rhythm" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Base spacing scale */}
          <div className="p-8" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body mb-8" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Base spacing scale — rem
            </p>
            <div className="space-y-4">
              {[
                { label: "4px  · 0.25rem", px: 4 },
                { label: "8px  · 0.5rem",  px: 8 },
                { label: "12px · 0.75rem", px: 12 },
                { label: "16px · 1rem",    px: 16 },
                { label: "24px · 1.5rem",  px: 24 },
                { label: "32px · 2rem",    px: 32 },
                { label: "48px · 3rem",    px: 48 },
                { label: "64px · 4rem",    px: 64 },
                { label: "96px · 6rem",    px: 96 },
              ].map(({ label, px }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    style={{ width: `${px}px`, height: "2px", background: T.accent, flexShrink: 0, minWidth: "4px" }}
                  />
                  <span className="font-body" style={{ fontSize: "0.75rem", color: T.dim, whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography rhythm example */}
          <div className="p-8" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body mb-8" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Typography rhythm — live example
            </p>

            {/* Simulated section layout */}
            <div className="space-y-0">
              <div style={{ paddingBottom: "4px" }}>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  01 — WEBDESIGN
                </span>
              </div>
              <div style={{ height: "1px", background: T.borderD, marginBottom: "24px" }} />

              <h2
                className="font-display font-extrabold uppercase leading-none"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: T.white, marginBottom: "16px" }}
              >
                Webdesign &amp;<br />Development
              </h2>

              <p className="font-body" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "24px" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>

              <div className="flex flex-wrap gap-2" style={{ marginBottom: "24px" }}>
                {["React", "TypeScript", "Figma"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px" }}>
                    {t}
                  </span>
                ))}
              </div>

              <button
                className="font-display font-bold uppercase"
                style={{ background: T.accent, color: "#000", padding: "10px 20px", fontSize: "0.75rem", letterSpacing: "0.15em" }}
              >
                Bekijk Werk →
              </button>
            </div>

            <div style={{ height: "1px", background: T.borderD, marginTop: "32px", marginBottom: "16px" }} />

            {/* Spacing annotations */}
            <div className="space-y-1">
              {[
                { label: "section number → rule", value: "4px" },
                { label: "rule → h2", value: "24px" },
                { label: "h2 → paragraph", value: "16px" },
                { label: "paragraph → tags", value: "24px" },
                { label: "tags → button", value: "24px" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>{label}</span>
                  <span className="font-body" style={{ fontSize: "0.625rem", color: T.accent, letterSpacing: "0.1em" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §08 EDITORIAL TEST AREA ══════════════════════════════════════════ */}
      <section>
        <SectionHeader n="08" title="Editorial Test Area — combinations" />

        <div className="space-y-4">

          {/* Combination 1: Anton + Syne + Inter — Brandbook style */}
          <div
            className="p-10 md:p-16 grid md:grid-cols-2 gap-12 items-end"
            style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Tag>Anton + Syne + Inter</Tag>
                <Tag accent>Brandbook cover style</Tag>
              </div>
              <h1
                className="font-logo uppercase leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 9rem)", letterSpacing: "-0.025em", color: "#F5F5F5" }}
              >
                BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
              </h1>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-8">
                {[
                  { label: "STUDIO",   value: "Bit & Beeld" },
                  { label: "ISSUED",   value: "May 2026" },
                  { label: "LOCATIE",  value: "Amsterdam, NL" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "6px" }}>
                      {label}
                    </p>
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

          {/* Combination 2: Syne + Inter — Project card style */}
          <div
            className="p-10 grid md:grid-cols-2 gap-10 items-center"
            style={{ background: T.surface, border: `1px solid ${T.borderD}` }}
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Tag>Syne + Inter</Tag>
                <Tag accent>Project card</Tag>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="font-body tabular-nums" style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.45em", textTransform: "uppercase" }}>
                  01
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: "20px", height: "1px", background: T.accent }} />
                <span className="font-body font-medium uppercase" style={{ fontSize: "0.625rem", letterSpacing: "0.4em", color: T.accent }}>
                  Performance-first
                </span>
              </div>

              <h3
                className="font-display font-extrabold uppercase leading-none mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#F5F5F5" }}
              >
                Webdesign &amp;<br />Development
              </h3>

              <p className="font-body mb-5" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: "38ch" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "TypeScript", "Figma", "CMS"].map(t => (
                  <span key={t} className="font-body" style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.42)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", padding: "3px 10px" }}>
                    {t}
                  </span>
                ))}
              </div>

              <button
                className="font-display font-bold uppercase inline-flex items-center gap-3"
                style={{ background: T.accent, color: "#fff", padding: "12px 24px", fontSize: "0.75rem", letterSpacing: "0.18em" }}
              >
                Bekijk werk →
              </button>
            </div>

            <div style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.borderD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-body" style={{ fontSize: "0.75rem", color: T.dim, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Project image
              </span>
            </div>
          </div>

          {/* Combination 3: Anton + Inter — Identity card (Brandbook light) */}
          <div
            className="p-10 md:p-16"
            style={{ background: "#F4F1EB", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-10">
              <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.12)", padding: "3px 8px" }}>
                Anton + Inter
              </span>
              <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF4A2A", border: "1px solid #FF4A2A", padding: "3px 8px" }}>
                Light — Brandbook style
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <div style={{ height: "1px", background: "rgba(0,0,0,0.09)", marginBottom: "24px" }} />
                <span className="font-body" style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: "#999", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>
                  03 — LOGO &amp; MONOGRAM
                </span>
                <p
                  className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111", letterSpacing: "-0.01em" }}
                >
                  BIT &amp;<br />BEELD
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "PRIMARY",  body: "Light background — default application. Anton, uppercase, full wordmark." },
                  { label: "SCALE",    body: "Use the logo at a size where the letterforms remain sharp and legible." },
                  { label: "SPACING",  body: "Minimum clear space: one cap-height on all sides of the wordmark." },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.09)", marginBottom: "12px" }} />
                    <p className="font-body" style={{ fontSize: "0.625rem", color: "#999", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "6px" }}>
                      {label}
                    </p>
                    <p className="font-body" style={{ fontSize: "0.75rem", color: "#777", lineHeight: 1.6 }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Notes section ──────────────────────────────────────────────────── */}
      <section>
        <SectionHeader n="09" title="System Notes — Issues identified" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              status: "fix",
              title: "Remove Google Fonts CDN",
              body: "index.css imports Anton, Inter, Syne, and Nunito via CDN. The same fonts are also loaded via @fontsource. Visitors download each font twice. Remove the CDN @import entirely.",
            },
            {
              status: "fix",
              title: "Move Anton import to shared entry",
              body: "@fontsource/anton is currently imported only in ScrollLogo.tsx. The Brandbook and TypoLab also use Anton. Move the import to index.css or main.tsx to guarantee it loads on every route.",
            },
            {
              status: "fix",
              title: "Remove Nunito",
              body: "Nunito is loaded via Google Fonts but has no Tailwind alias and appears nowhere in the component tree. It is dead weight — remove from the CDN import.",
            },
            {
              status: "fix",
              title: "Replace font-black with font-extrabold",
              body: "ContactV2 uses font-black (weight 900). Syne only has weights up to 800. The browser synthesises 900 which looks broken. Replace with font-extrabold (800).",
            },
            {
              status: "fix",
              title: "Replace font-semibold with font-medium",
              body: "ContactV2 uses font-semibold (600) on Inter. Inter only loads 400 and 500. The browser synthesises 600 poorly. Replace with font-medium (500) or add @fontsource/inter/600.",
            },
            {
              status: "todo",
              title: "Consolidate Brandbook h2 clamps",
              body: "Five near-identical section headings use five slightly different clamp ranges. Proposal: one shared token clamp(1.6rem, 4vw, 5.5rem) for all Brandbook section h2 elements.",
            },
            {
              status: "todo",
              title: "Add 2XS token to Tailwind config",
              body: "20+ instances of fontSize: '9px' and text-[9px] across Brandbook and component files. Adding a named 2XS = 0.625rem token eliminates all arbitrary px values at the smallest scale.",
            },
            {
              status: "todo",
              title: "Replace all bare px inline styles with rem",
              body: "Small UI text (9–14px range) in Brandbook.tsx uses bare px values. These should move to the rem scale via Tailwind named classes for accessibility and consistency.",
            },
          ].map(({ status, title, body }) => (
            <div
              key={title}
              className="p-6"
              style={{
                background: status === "fix" ? "rgba(255,74,42,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${status === "fix" ? "rgba(255,74,42,0.2)" : T.borderD}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-body"
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: status === "fix" ? T.accent : T.green,
                    border: `1px solid ${status === "fix" ? T.accent : T.green}`,
                    padding: "2px 8px",
                  }}
                >
                  {status === "fix" ? "Fix now" : "Refine"}
                </span>
              </div>
              <p className="font-display font-bold mb-2" style={{ fontSize: "1rem", color: T.white }}>
                {title}
              </p>
              <p className="font-body" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ §10 THUNDER TYPEFACE TEST ══════════════════════════════════════════ */}
      <section>
        <SectionHeader n="10" title="Thunder HC — Typeface Test (not applied globally)" />

        {/* Info strip */}
        <div
          className="mb-6 flex flex-wrap items-center gap-4 justify-between p-5"
          style={{ background: T.surface2, border: `1px solid ${T.borderD}` }}
        >
          <div className="flex flex-wrap gap-3">
            <Tag accent>Test only — not global</Tag>
            <Tag>ThunderHC · @font-face in TypoLab only</Tag>
            <Tag>9 weights · HC = High Condensed · LC = Less Condensed</Tag>
          </div>
          <p className="font-body" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
            To revert: delete §10 from TypoLab.tsx · remove <code style={{ color: T.white }}>thunder</code> from tailwind.config.ts · delete THUNDER_CSS
          </p>
        </div>

        <div className="space-y-3">

          {/* ── Anton vs Thunder Black HC ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <div className="p-10 flex flex-col" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
              <div className="flex flex-wrap gap-3 mb-10">
                <Tag>Anton</Tag>
                <Tag>weight 400 · only weight available</Tag>
                <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.green, border: `1px solid ${T.green}`, padding: "3px 8px" }}>
                  CURRENT
                </span>
              </div>
              <p className="font-logo uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.01em", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <p className="font-body mt-6" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
                Wide letterforms. Distinctive retrograde condensed serif. Single weight.
              </p>
            </div>

            <div className="p-10 flex flex-col" style={{ background: "#0E0E0E", border: "1px solid rgba(255,74,42,0.3)" }}>
              <div className="flex flex-wrap gap-3 mb-10">
                <Tag>ThunderHC</Tag>
                <Tag>weight 900 · Black</Tag>
                <Tag accent>TEST</Tag>
              </div>
              <p className="font-thunder font-black uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.01em", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <p className="font-body mt-6" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
                Geometric. Sharp horizontals. Tight counters. Extreme condensing. Multiple weights.
              </p>
            </div>

          </div>

          {/* Thunder ExtraBold HC — secondary wordmark option */}
          <div className="p-8" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <div className="flex flex-wrap gap-3 mb-6">
              <Tag>ThunderHC</Tag>
              <Tag>weight 800 · ExtraBold</Tag>
              <Tag>lighter than Black — more airy</Tag>
            </div>
            <p className="font-thunder font-extrabold uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.01em", color: T.white }}>
              BIT &amp;<br />BEELD
            </p>
          </div>

          {/* ── All registered weights ── */}
          <div className="p-8" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
            <p className="font-body mb-8" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              ThunderHC — Registered weight range
            </p>
            <div className="space-y-0">
              {[
                { label: "300 · Light",     weight: 300 },
                { label: "400 · Regular",   weight: 400 },
                { label: "700 · Bold",      weight: 700 },
                { label: "800 · ExtraBold", weight: 800 },
                { label: "900 · Black",     weight: 900 },
              ].map(({ label, weight }) => (
                <div
                  key={label}
                  className="flex items-baseline gap-6"
                  style={{ borderBottom: `1px solid ${T.borderD}`, paddingTop: "14px", paddingBottom: "14px" }}
                >
                  <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase", minWidth: "130px", flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: '"ThunderHC", sans-serif', fontWeight: weight, fontSize: "clamp(1.5rem, 4vw, 3.5rem)", color: T.white, lineHeight: 1, textTransform: "uppercase" }}>
                    DESIGN DAT WERKT
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── HC vs LC ── */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10" style={{ background: T.surface2, border: `1px solid ${T.borderD}` }}>
            <div>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                HC — High Condensed (very tall, narrow)
              </p>
              <p style={{ fontFamily: '"ThunderHC", sans-serif', fontWeight: 900, fontSize: "clamp(3rem, 7vw, 7rem)", color: T.white, lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                BIT &amp;<br />BEELD
              </p>
              <p className="font-body mt-4" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
                Extreme condensing. Strong vertical rhythm. Ideal for stacked wordmarks.
              </p>
            </div>
            <div>
              <p className="font-body mb-6" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                LC — Less Condensed (wider, more balanced)
              </p>
              <p style={{ fontFamily: '"ThunderLC", sans-serif', fontWeight: 900, fontSize: "clamp(3rem, 7vw, 7rem)", color: T.white, lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                BIT &amp;<br />BEELD
              </p>
              <p className="font-body mt-4" style={{ fontSize: "0.75rem", color: T.dim, lineHeight: 1.5 }}>
                Less extreme. Closer to standard condensed proportions. Reads more comfortably at body sizes.
              </p>
            </div>
          </div>

          {/* ── 6 typographic roles ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Logo / wordmark</Tag>
              <p className="font-thunder font-black uppercase leading-none" style={{ fontSize: "2rem", color: T.white }}>
                BIT &amp; BEELD
              </p>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder Black HC · 2rem</p>
            </div>

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Hero display</Tag>
              <p className="font-thunder font-black uppercase leading-none" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", color: T.white, letterSpacing: "-0.01em" }}>
                DESIGN<br />DAT WERKT.
              </p>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder Black HC · clamp hero</p>
            </div>

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Section title</Tag>
              <p className="font-thunder font-extrabold uppercase leading-none" style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", color: T.white }}>
                WEBDESIGN &amp;<br />DEVELOPMENT
              </p>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder ExtraBold HC · clamp section</p>
            </div>

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Accent word</Tag>
              <p className="font-thunder font-black uppercase leading-none" style={{ fontSize: "3rem", color: T.accent }}>
                FEATURED
              </p>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder Black HC · 3rem · accent color</p>
            </div>

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Button text</Tag>
              <div className="space-y-3">
                <button className="font-thunder font-bold uppercase block w-full" style={{ background: T.accent, color: "#000", padding: "12px 24px", fontSize: "1rem", letterSpacing: "0.06em" }}>
                  Plan Gesprek
                </button>
                <button className="font-thunder font-bold uppercase block w-full" style={{ background: "transparent", color: T.white, border: "1px solid rgba(255,255,255,0.25)", padding: "12px 24px", fontSize: "1rem", letterSpacing: "0.06em" }}>
                  Bekijk Werk
                </button>
              </div>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder Bold HC · 1rem — compare with Syne Bold</p>
            </div>

            <div className="p-6 flex flex-col gap-4" style={{ background: T.surface, border: `1px solid ${T.borderD}` }}>
              <Tag>Small label</Tag>
              <div className="flex flex-wrap gap-2">
                {["WEBDESIGN", "BRANDING", "2026"].map(t => (
                  <span
                    key={t}
                    style={{ fontFamily: '"ThunderHC", sans-serif', fontWeight: 400, fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.2em", border: `1px solid ${T.borderD}`, padding: "3px 10px" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="font-body" style={{ fontSize: "0.625rem", color: T.dim }}>Thunder Regular HC · 0.875rem — heavier optically than Inter at same size</p>
            </div>

          </div>

          {/* ── Editorial system comparison ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Current: Anton + Syne + Inter */}
            <div className="p-8 flex flex-col" style={{ background: "#0B0B0B", border: `1px solid ${T.borderD}` }}>
              <div className="flex gap-2 mb-8">
                <span className="font-body inline-block" style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.green, border: `1px solid ${T.green}`, padding: "3px 8px" }}>
                  Current system
                </span>
              </div>
              <div style={{ height: "1px", background: T.borderD, marginBottom: "16px" }} />
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                01 — WEBDESIGN
              </span>
              <p className="font-logo uppercase leading-none mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <h3 className="font-display font-extrabold uppercase leading-none mb-4" style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)", color: T.white, letterSpacing: "-0.02em" }}>
                DESIGN DAT<br />WERKT.
              </h3>
              <p className="font-body mb-6" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren.
              </p>
              <span className="font-body mt-auto" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Anton + Syne + Inter
              </span>
            </div>

            {/* Test A: Thunder + Syne + Inter */}
            <div className="p-8 flex flex-col" style={{ background: "#0E0E0E", border: "1px solid rgba(255,74,42,0.2)" }}>
              <div className="flex gap-2 mb-8">
                <Tag accent>Test A</Tag>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, alignSelf: "center" }}>Thunder replaces Anton</span>
              </div>
              <div style={{ height: "1px", background: T.borderD, marginBottom: "16px" }} />
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                01 — WEBDESIGN
              </span>
              <p className="font-thunder font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <h3 className="font-display font-extrabold uppercase leading-none mb-4" style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)", color: T.white, letterSpacing: "-0.02em" }}>
                DESIGN DAT<br />WERKT.
              </h3>
              <p className="font-body mb-6" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren.
              </p>
              <span className="font-body mt-auto" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Thunder HC + Syne + Inter
              </span>
            </div>

            {/* Test B: Thunder + Inter (no Syne) */}
            <div className="p-8 flex flex-col" style={{ background: "#0E0E0E", border: "1px solid rgba(255,74,42,0.2)" }}>
              <div className="flex gap-2 mb-8">
                <Tag accent>Test B</Tag>
                <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, alignSelf: "center" }}>Thunder replaces Anton + Syne</span>
              </div>
              <div style={{ height: "1px", background: T.borderD, marginBottom: "16px" }} />
              <span className="font-body" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                01 — WEBDESIGN
              </span>
              <p className="font-thunder font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: T.white }}>
                BIT &amp;<br />BEELD
              </p>
              <h3 className="font-thunder font-extrabold uppercase leading-none mb-4" style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)", color: T.white, letterSpacing: "-0.02em" }}>
                DESIGN DAT<br />WERKT.
              </h3>
              <p className="font-body mb-6" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren.
              </p>
              <span className="font-body mt-auto" style={{ fontSize: "0.625rem", color: T.dim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Thunder HC + Inter (Syne removed)
              </span>
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
          v0.1 · Internal only
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
