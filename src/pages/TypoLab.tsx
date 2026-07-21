import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
// @ts-ignore
import "@fontsource/anton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const T = {
  bg:      "#0A0A0A",
  surface: "#111111",
  light:   "#F4F1EB",
  white:   "#F5F5F5",
  muted:   "#888888",
  dim:     "#555555",
  // Single brand orange, shared with NavbarV2/FooterV2/LoadingScreen — no
  // more a locally-hardcoded accent hex that can drift from --brand-orange.
  accent:  "hsl(var(--brand-orange))",
  borderD: "rgba(255,255,255,0.07)",
  borderL: "rgba(0,0,0,0.06)",
};

const SCALE = [
  { token: "L1", font: "Anton",   weight: 400, size: "clamp(2.5rem,6vw,5rem)",        tracking: "–0.02em", lh: "1.0",  role: "Logo · display · identity",         preview: "BIT & BEELD" },
  { token: "L2", font: "Anton",   weight: 400, size: "clamp(1.75rem,4vw,3.25rem)",    tracking: "–0.02em", lh: "1.0",  role: "Section titles",                    preview: "OVER MIJ" },
  { token: "L3", font: "Antonio", weight: 600, size: "clamp(1.375rem,2.5vw,2.25rem)", tracking: "0.01em",  lh: "1.0",  role: "Section subheadings",               preview: "Webdesign & Development" },
  { token: "L4", font: "Antonio", weight: 400, size: "clamp(1.125rem,2vw,1.75rem)",   tracking: "0.01em",  lh: "1.05", role: "Editorial headings",                preview: "Moderne, snelle websites" },
  { token: "L5", font: "Antonio", weight: 300, size: "clamp(1rem,1.5vw,1.25rem)",     tracking: "0.02em",  lh: "1.1",  role: "Supporting text · kicker labels",   preview: "Performance-first digital studio" },
  { token: "L6", font: "Inter",   weight: 500, size: "1rem",                          tracking: "0",       lh: "1.6",  role: "Body emphasis · intro paragraph",   preview: "Websites die converteren en resultaat opleveren." },
  { token: "L7", font: "Inter",   weight: 400, size: "1rem",                          tracking: "0",       lh: "1.7",  role: "Body copy · descriptions",          preview: "Moderne, snelle websites die niet alleen mooi zijn maar ook converteren." },
  { token: "L8", font: "Inter",   weight: 400, size: "0.75rem",                       tracking: "0.25em",  lh: "1.5",  role: "Labels · metadata · UI tags",       preview: "WEBDESIGN · BRANDING · 2026" },
];

const SectionHeader = ({ n, title }: { n: string; title: string }) => (
  <div className="mb-16">
    <div className="flex items-baseline gap-6 mb-5">
      <span className="font-body tabular-nums flex-shrink-0"
        style={{ fontSize: "0.75rem", letterSpacing: "0.25em", color: "#555" }}>
        {n}
      </span>
      <span className="font-antonio uppercase"
        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 600, letterSpacing: "0.04em", color: T.white }}>
        {title}
      </span>
    </div>
    <div style={{ height: "1px", background: T.borderD }} />
  </div>
);

const ANTONIO_CSS = `
@font-face {
  font-family: 'Antonio';
  src: url('/fonts/Antonio/Antonio-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 700;
  font-style: normal;
  font-display: swap;
}
`;

const HP = "clamp(20px, 5vw, 72px)";
const HPW = "clamp(20px, 5vw, 80px)";

const TypoLab = () => (
  <div style={{ background: T.bg, minHeight: "100vh", color: T.white }}>
    {/* eslint-disable-next-line react/no-danger */}
    <style dangerouslySetInnerHTML={{ __html: ANTONIO_CSS }} />

    {/* ── Fixed header */}
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{ height: "52px", background: "rgba(10,10,10,0.96)", borderBottom: `1px solid ${T.borderD}`, backdropFilter: "blur(8px)" }}>
      <Link to="/"
        className="font-body inline-flex items-center gap-2 transition-colors"
        style={{ fontSize: "0.8125rem", color: T.dim, letterSpacing: "0.08em" }}
        onMouseEnter={e => (e.currentTarget.style.color = T.white)}
        onMouseLeave={e => (e.currentTarget.style.color = T.dim)}>
        <ArrowLeft size={13} />
        Portfolio
      </Link>

      <div className="flex items-center gap-3">
        <span className="font-logo uppercase" style={{ fontSize: "0.9375rem", color: T.white, letterSpacing: "0.04em" }}>Typo Lab</span>
        <span className="font-body"
          style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: T.accent, border: `1px solid ${T.accent}`, padding: "2px 8px", textTransform: "uppercase" }}>
          Internal
        </span>
      </div>

      <span className="font-body hidden md:block"
        style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Bit &amp; Beeld · 2026
      </span>
    </header>

    {/* ── Hero — Brandbook-style: full viewport, title vertically centered, metadata at bottom */}
    <div className="px-6 md:px-12 lg:px-24"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", borderBottom: `1px solid ${T.borderD}` }}>

      {/* Spacer for fixed header */}
      <div style={{ height: "52px", flexShrink: 0 }} />

      {/* Title — centered in remaining viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1 className="font-logo uppercase leading-none"
          style={{ fontSize: "clamp(4.5rem, 13vw, 13rem)", letterSpacing: "-0.025em", color: T.white }}>
          TYPO<br />LAB<span style={{ color: T.accent }}>.</span>
        </h1>
      </div>

      {/* Bottom metadata — mirrors Brandbook cover composition */}
      <div style={{ flexShrink: 0, paddingBottom: "48px" }}>
        <div style={{ height: "1px", background: T.borderD, marginBottom: "32px" }} />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <p className="font-antonio"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.375rem)", fontWeight: 300, letterSpacing: "0.02em", color: "#666", lineHeight: 1.55, maxWidth: "38ch" }}>
            Three typefaces. One voice.<br />
            A system built for impact, hierarchy, and long-form clarity.
          </p>
          <div style={{ display: "flex", gap: "40px", flexShrink: 0 }}>
            {[
              { label: "STUDIO", value: "Bit & Beeld" },
              { label: "SYSTEM", value: "Typography" },
              { label: "YEAR",   value: "2026" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body" style={{ fontSize: "0.6875rem", color: "#444", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "7px" }}>{label}</p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#888" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

    {/* ── Main content */}
    <main className="px-6 md:px-12 lg:px-24 py-40 space-y-64 max-w-screen-2xl mx-auto">

      {/* ═══ §01 FONT OVERVIEW */}
      <section>
        <SectionHeader n="01" title="Font Overview" />

        <div style={{ background: T.light }}>

          <div className="grid md:grid-cols-3 items-end" style={{ padding: `104px ${HP} 96px` }}>
            <div className="md:col-span-2">
              <p className="font-antonio uppercase"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", marginBottom: "48px" }}>
                Identity · Impact
              </p>
              <p className="font-logo uppercase leading-none"
                style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "#111", letterSpacing: "-0.025em" }}>
                Anton
              </p>
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#777", lineHeight: 1.85, maxWidth: "26ch" }}>
                Logo wordmark and major section titles. Reserved for display impact only — never for body or UI copy.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: T.borderL, marginLeft: HP, marginRight: HP }} />

          <div className="grid md:grid-cols-3 items-end" style={{ padding: `96px ${HP}` }}>
            <div className="md:col-span-2">
              <p className="font-antonio uppercase"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", marginBottom: "48px" }}>
                Editorial · Hierarchy
              </p>
              <p className="font-antonio leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", fontWeight: 600, color: "#111", letterSpacing: "0.01em" }}>
                Antonio
              </p>
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#777", lineHeight: 1.85, maxWidth: "26ch" }}>
                Section subheadings, editorial headings, and kicker labels. The bridge between display and reading.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: T.borderL, marginLeft: HP, marginRight: HP }} />

          <div className="grid md:grid-cols-3 items-start" style={{ padding: `96px ${HP} 104px` }}>
            <div className="md:col-span-2">
              <p className="font-antonio uppercase"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", marginBottom: "48px" }}>
                Readability · UI
              </p>
              <p className="font-body"
                style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.375rem)", color: "#111", lineHeight: 1.85, maxWidth: "44ch" }}>
                Van strategie en design tot volledige front-end implementatie. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn. Websites die niet alleen mooi zijn maar ook presteren.
              </p>
            </div>
            <div style={{ paddingTop: "4.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.9375rem", color: "#777", lineHeight: 1.85, maxWidth: "26ch" }}>
                Body text, labels, and all UI copy. The invisible workhorse — not for headings or display.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §02 TYPE SCALE */}
      <section>
        <SectionHeader n="02" title="Type Scale" />

        <div style={{ background: T.light }}>
          {SCALE.map((step) => {
            const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
            const isAnton = step.font === "Anton";
            return (
              <div key={step.token} className="flex items-baseline gap-10"
                style={{ padding: `44px ${HP}` }}>
                <span className="font-body flex-shrink-0"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: T.accent, textTransform: "uppercase", minWidth: "36px" }}>
                  {step.token}
                </span>
                <p className={`${fontClass} ${isAnton ? "uppercase" : ""} leading-none`}
                  style={{
                    fontSize: step.size.startsWith("clamp") ? "clamp(1rem,2vw,1.625rem)" : step.size,
                    fontWeight: step.weight,
                    letterSpacing: step.tracking === "0" ? undefined : step.tracking,
                    color: "#111",
                    lineHeight: parseFloat(step.lh),
                  }}>
                  {step.preview}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Editorial interlude */}
      <div style={{ background: T.light, padding: "192px 0", textAlign: "center" }}>
        <p className="font-logo uppercase leading-none"
          style={{ fontSize: "clamp(3rem, 9vw, 9rem)", color: "#111", letterSpacing: "-0.025em" }}>
          DESIGN<br />DAT WERKT<span style={{ color: T.accent }}>.</span>
        </p>
        <p className="font-antonio"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", fontWeight: 300, color: "#AAAAAA", letterSpacing: "0.06em", marginTop: "72px" }}>
          Anton — Logo &amp; Display
        </p>
      </div>

      {/* ═══ §03 DISPLAY TYPOGRAPHY */}
      <section>
        <SectionHeader n="03" title="Display Typography" />

        <div>

          <div className="overflow-hidden" style={{ background: T.surface, padding: `144px ${HPW}` }}>
            <h1 className="font-logo uppercase leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 13rem)", letterSpacing: "-0.025em", color: T.white }}>
              BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
            </h1>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "56px" }}>
              Anton — Logo &amp; Cover
            </p>
          </div>

          <div className="overflow-hidden" style={{ background: T.light, padding: `120px ${HPW}` }}>
            <div className="flex flex-col gap-6">
              {["OVER MIJ", "WAT IK DOE", "BRAND BOOK"].map(t => (
                <h2 key={t} className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.02em", color: "#111" }}>
                  {t}
                </h2>
              ))}
            </div>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "56px" }}>
              Anton — Section titles
            </p>
          </div>

          <div className="overflow-hidden" style={{ background: T.surface, padding: `120px ${HPW}` }}>
            <h3 className="font-antonio leading-none"
              style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white }}>
              Webdesign &amp; Development
            </h3>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "56px" }}>
              Antonio — Section subheadings
            </p>
          </div>

          <div className="overflow-hidden" style={{ background: T.light, padding: `104px ${HPW}` }}>
            <h4 className="font-antonio"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)", fontWeight: 400, letterSpacing: "0.01em", color: "#111", lineHeight: 1.15 }}>
              Moderne, snelle websites die niet alleen mooi zijn maar ook converteren.
            </h4>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "56px" }}>
              Antonio — Editorial headings
            </p>
          </div>

          <div className="overflow-hidden" style={{ background: T.surface, padding: `104px ${HPW}` }}>
            <p className="font-antonio"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 300, letterSpacing: "0.02em", color: "#888", lineHeight: 1.35 }}>
              Performance-first digital studio · Amsterdam
            </p>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "56px" }}>
              Antonio — Supporting text
            </p>
          </div>

        </div>
      </section>

      {/* ═══ §04 BODY TEXT */}
      <section>
        <SectionHeader n="04" title="Body Text — Inter" />

        <div style={{ background: T.light, padding: `120px ${HPW}` }}>
          <div className="max-w-2xl space-y-20">

            <div>
              <p className="font-body font-medium" style={{ fontSize: "1.0625rem", color: "#111", lineHeight: 1.8 }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren voor jouw bedrijf.
              </p>
              <p className="font-body"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "20px" }}>
                Inter — Body emphasis
              </p>
            </div>

            <div>
              <p className="font-body" style={{ fontSize: "1.0625rem", color: "#444", lineHeight: 1.88 }}>
                Van strategie en design tot volledige front-end implementatie met de nieuwste technologieën. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn. Wij bouwen websites die presteren.
              </p>
              <p className="font-body"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "20px" }}>
                Inter — Body copy
              </p>
            </div>

            <div>
              <p className="font-body uppercase" style={{ fontSize: "0.75rem", color: "#999", letterSpacing: "0.28em" }}>
                Webdesign · Branding · 2026 · Amsterdam · Performance-first
              </p>
              <p className="font-body"
                style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "20px" }}>
                Inter — Labels &amp; Metadata
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ §06 DARK · LIGHT */}
      <section>
        <SectionHeader n="06" title="Dark · Light" />

        <div style={{ background: "#0A0A0A", padding: `128px ${HPW}` }}>
          <div style={{ maxWidth: "480px" }}>
            <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: T.white, marginBottom: "40px" }}>BIT & BEELD</p>
            <h2 className="font-antonio leading-none"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", fontWeight: 600, color: T.white, letterSpacing: "0.01em", marginBottom: "32px" }}>
              Design dat<br />werkt.
            </h2>
            <p className="font-body" style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "40px" }}>
              Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "40px" }}>
              {["Webdesign", "Branding", "2026"].map(t => (
                <span key={t} className="font-body"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.white, border: "1px solid rgba(255,255,255,0.12)", padding: "5px 14px" }}>
                  {t}
                </span>
              ))}
              <span className="font-body"
                style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: T.accent, padding: "5px 14px" }}>
                Featured
              </span>
            </div>
            <button className="font-antonio uppercase"
              style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 36px", fontSize: "15px", letterSpacing: "0.1em" }}>
              Bekijk Werk
            </button>
          </div>
        </div>

        <div style={{ background: T.light, padding: `128px ${HPW}` }}>
          <div style={{ maxWidth: "480px", marginLeft: "auto" }}>
            <p className="font-logo uppercase" style={{ fontSize: "1.5rem", color: "#111", marginBottom: "40px" }}>BIT & BEELD</p>
            <h2 className="font-antonio leading-none"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", fontWeight: 600, color: "#111", letterSpacing: "0.01em", marginBottom: "32px" }}>
              Design dat<br />werkt.
            </h2>
            <p className="font-body" style={{ fontSize: "1.0625rem", color: "#555", lineHeight: 1.85, marginBottom: "40px" }}>
              Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "40px" }}>
              {["Webdesign", "Branding", "2026"].map(t => (
                <span key={t} className="font-body"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", border: "1px solid rgba(0,0,0,0.14)", padding: "5px 14px" }}>
                  {t}
                </span>
              ))}
              <span className="font-body"
                style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: T.accent, padding: "5px 14px" }}>
                Featured
              </span>
            </div>
            <button className="font-antonio uppercase"
              style={{ fontWeight: 700, background: "#111", color: T.light, padding: "14px 36px", fontSize: "15px", letterSpacing: "0.1em" }}>
              Bekijk Werk
            </button>
          </div>
        </div>

      </section>

      {/* ═══ §07 SPACING · RHYTHM */}
      <section>
        <SectionHeader n="07" title="Spacing · Rhythm" />

        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div style={{ background: T.surface, padding: `104px ${HPW}` }}>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "88px" }}>
              Live composition
            </p>
            <div>
              <span className="font-body" style={{ fontSize: "0.75rem", color: T.accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                01 — WEBDESIGN
              </span>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "8px 0 36px" }} />
              <h2 className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white, marginBottom: "24px" }}>
                Webdesign &amp;<br />Development
              </h2>
              <p className="font-body"
                style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "32px" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px" }}>
                {["React", "TypeScript", "Figma"].map(t => (
                  <span key={t} className="font-body"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.09)", padding: "4px 10px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <button className="font-antonio uppercase"
                style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                Bekijk Werk →
              </button>
            </div>
          </div>

          <div style={{ background: T.light, padding: `104px ${HPW}` }}>
            <p className="font-body"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "88px" }}>
              Spacing rules
            </p>
            <div className="space-y-14">
              {[
                { pair: "Label → rule",   gap: "6px",  note: "Section number to divider — binds them together without air." },
                { pair: "Rule → heading", gap: "28px", note: "Divider to subheading — one full beat to signal new content." },
                { pair: "Heading → body", gap: "20px", note: "Heading to paragraph — close enough to feel related." },
                { pair: "Body → tags",    gap: "28px", note: "Paragraph to metadata — pause before secondary information." },
                { pair: "Tags → CTA",     gap: "28px", note: "Metadata to button — pause before the action moment." },
              ].map(({ pair, gap, note }) => (
                <div key={pair}>
                  <div className="flex items-baseline justify-between" style={{ marginBottom: "10px" }}>
                    <span className="font-body font-medium" style={{ fontSize: "0.9375rem", color: "#111", letterSpacing: "0.04em" }}>{pair}</span>
                    <span className="font-antonio" style={{ fontSize: "1.5rem", fontWeight: 300, color: T.accent, letterSpacing: "0.02em" }}>{gap}</span>
                  </div>
                  <p className="font-body" style={{ fontSize: "0.9375rem", color: "#777", lineHeight: 1.78 }}>{note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §08 EDITORIAL — COMPOSITIONS */}
      <section>
        <SectionHeader n="08" title="Editorial — Compositions" />

        <div>

          <div className="grid md:grid-cols-2 gap-16 items-end"
            style={{ background: "#0A0A0A", padding: `160px ${HPW}` }}>
            <div>
              <h1 className="font-logo uppercase leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 9rem)", letterSpacing: "-0.025em", color: T.white }}>
                BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
              </h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <div className="flex items-start gap-12">
                {[{ label: "STUDIO", value: "Bit & Beeld" }, { label: "ISSUED", value: "May 2026" }, { label: "LOCATIE", value: "Amsterdam" }]
                  .map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-body" style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</p>
                      <p className="font-body" style={{ fontSize: "1rem", color: "#888" }}>{value}</p>
                    </div>
                  ))}
              </div>
              <p className="font-body" style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                SCROLL TO EXPLORE
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center"
            style={{ background: T.surface, padding: `120px ${HPW}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
                <span className="font-body tabular-nums"
                  style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.4em", textTransform: "uppercase" }}>01</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
              </div>
              <p className="font-antonio"
                style={{ fontSize: "1rem", fontWeight: 300, letterSpacing: "0.02em", color: T.accent, marginBottom: "16px" }}>
                Performance-first
              </p>
              <h3 className="font-antonio leading-none"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.01em", color: T.white, marginBottom: "32px" }}>
                Webdesign &amp;<br />Development
              </h3>
              <p className="font-body"
                style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, maxWidth: "38ch", marginBottom: "40px" }}>
                Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren.
              </p>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: "44px" }}>
                {["React", "TypeScript", "Figma", "CMS"].map(t => (
                  <span key={t} className="font-body"
                    style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <button className="font-antonio uppercase"
                style={{ fontWeight: 700, background: T.accent, color: "#000", padding: "14px 32px", fontSize: "15px", letterSpacing: "0.1em" }}>
                Bekijk werk →
              </button>
            </div>
            <div style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.025)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-body" style={{ fontSize: "0.75rem", color: "#2A2A2A", letterSpacing: "0.15em", textTransform: "uppercase" }}>Project image</span>
            </div>
          </div>

          <div style={{ background: T.light, padding: `120px ${HPW}` }}>
            <div className="grid md:grid-cols-3 gap-16 items-start">
              <div className="md:col-span-2">
                <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "40px" }} />
                <span className="font-body"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.25em", color: "#AAAAAA", textTransform: "uppercase", display: "block", marginBottom: "64px" }}>
                  03 — LOGO &amp; MONOGRAM
                </span>
                <p className="font-logo uppercase leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111", letterSpacing: "-0.01em" }}>
                  BIT &amp;<br />BEELD
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                {[
                  { label: "PRIMARY", body: "Light background — default application. Anton, uppercase, full wordmark." },
                  { label: "SCALE",   body: "Use the logo at a size where letterforms remain sharp and legible." },
                  { label: "SPACING", body: "Minimum clear space: one cap-height on all sides of the wordmark." },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "16px" }} />
                    <p className="font-body" style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>{label}</p>
                    <p className="font-body" style={{ fontSize: "0.9375rem", color: "#666", lineHeight: 1.85 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ §09 TYPOGRAPHY IN PRACTICE */}
      <section>
        <SectionHeader n="09" title="Typography in Practice" />

        <div style={{ background: T.light, padding: `128px ${HPW}` }}>
          <p className="font-antonio"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.125rem)", fontWeight: 300, color: "#555", letterSpacing: "0.01em", lineHeight: 1.5, maxWidth: "42ch" }}>
            Eight levels. Three families. Every decision serves a specific role — from identity-level impact down to invisible body copy.
          </p>
        </div>

        <div style={{ background: "#080808", padding: `128px ${HPW}` }}>
          <div className="space-y-20">
            {SCALE.map(step => {
              const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
              const fox = step.token === "L8"
                ? "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
                : "The quick brown fox jumps over the lazy dog.";
              return (
                <div key={`dark-${step.token}`}>
                  <p className={`${fontClass} ${step.font === "Anton" ? "uppercase" : ""}`}
                    style={{
                      fontSize: step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.token === "L8" ? "0.25em" : (step.tracking === "0" ? undefined : step.tracking),
                      color: T.white,
                      lineHeight: parseFloat(step.lh),
                    }}>
                    {fox}
                  </p>
                  <p className="font-body" style={{ fontSize: "0.75rem", color: "#2E2E2E", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "12px" }}>
                    {step.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: T.light, padding: `128px ${HPW}` }}>
          <div className="space-y-20">
            {SCALE.map(step => {
              const fontClass = step.font === "Anton" ? "font-logo" : step.font === "Antonio" ? "font-antonio" : "font-body";
              const fox = step.token === "L8"
                ? "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
                : "The quick brown fox jumps over the lazy dog.";
              return (
                <div key={`light-${step.token}`}>
                  <p className={`${fontClass} ${step.font === "Anton" ? "uppercase" : ""}`}
                    style={{
                      fontSize: step.size,
                      fontWeight: step.weight,
                      letterSpacing: step.token === "L8" ? "0.25em" : (step.tracking === "0" ? undefined : step.tracking),
                      color: "#111",
                      lineHeight: parseFloat(step.lh),
                    }}>
                    {fox}
                  </p>
                  <p className="font-body" style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "12px" }}>
                    {step.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: T.light, padding: `128px ${HPW}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
            {[
              { token: "L1", family: "Anton",   role: "Logo · cover · identity",         why: "Architecture-level impact. Reserved for the logo wordmark and cover statements only. Never for content that needs to be read.", feeling: "Monolithic · authoritative · unmistakable" },
              { token: "L2", family: "Anton",   role: "Section titles",                  why: "Opens a section. Directional rather than decorative — tells the reader exactly where they are in the document.", feeling: "Commanding · directional · structural" },
              { token: "L3", family: "Antonio", role: "Section subheadings",             why: "First editorial voice after Anton. Anchors the section without competing with L1 or L2. The bridge between display and reading.", feeling: "Structured · confident · editorial" },
              { token: "L4", family: "Antonio", role: "Editorial headings",              why: "Where meaning lives. Long enough to carry a full sentence, tight enough to feel considered. The most readable Antonio level.", feeling: "Readable at a glance · purposeful · clear" },
              { token: "L5", family: "Antonio", role: "Supporting text · kickers",       why: "Breath before content. Sets context, adds editorial color. Never demands attention — it supplements without interrupting.", feeling: "Light · understated · almost whispering" },
              { token: "L6", family: "Inter",   role: "Body emphasis · intro paragraph", why: "Leads the reader into body text. Slightly heavier than L7 to signal an opening statement or key point.", feeling: "Focused · grounded · one step above neutral" },
              { token: "L7", family: "Inter",   role: "Body copy · descriptions",        why: "The workhorse of the system. Neutral enough to disappear into long-form reading. Every word on the portfolio flows through L7.", feeling: "Invisible clarity · neutral · reliable" },
              { token: "L8", family: "Inter",   role: "Labels · metadata · UI tags",     why: "Scanned, not read. Always uppercase to signal its functional nature. Categorizes content — technology stacks, dates, locations.", feeling: "Functional · sparse · metadata" },
            ].map(({ token, family, role, why, feeling }, i, arr) => (
              <div key={token} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: "56px" }}>
                <div className="flex items-baseline gap-6 flex-wrap" style={{ marginBottom: "20px" }}>
                  <span className="font-body" style={{ fontSize: "0.75rem", color: T.accent, letterSpacing: "0.18em", textTransform: "uppercase" }}>{token}</span>
                  <span className="font-antonio" style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111", letterSpacing: "0.02em" }}>{family}</span>
                  <span className="font-body" style={{ fontSize: "0.9375rem", color: "#AAA" }}>{role}</span>
                </div>
                <p className="font-body" style={{ fontSize: "1.0625rem", color: "#555", lineHeight: 1.88, marginBottom: "16px", maxWidth: "54ch" }}>
                  {why}
                </p>
                <p className="font-body" style={{ fontSize: "0.75rem", color: T.accent, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  {feeling}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══ §10 CLOSING SPREAD */}
      <section>
        <SectionHeader n="10" title="Three Families" />

        <div style={{ background: T.light, padding: `160px ${HPW}` }}>

          <div style={{ marginBottom: "144px" }}>
            <p className="font-body uppercase"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.28em", marginBottom: "40px" }}>
              Anton
            </p>
            <p className="font-logo uppercase leading-none"
              style={{ fontSize: "clamp(4rem, 10vw, 9.5rem)", color: "#111", letterSpacing: "-0.025em" }}>
              BRAND<br />BOOK<span style={{ color: T.accent }}>.</span>
            </p>
            <p className="font-body"
              style={{ fontSize: "1rem", color: "#888", lineHeight: 1.85, marginTop: "48px", maxWidth: "38ch" }}>
              Identity and display. The loudest voice in the system. Reserved for moments that must announce themselves without apology.
            </p>
          </div>

          <div style={{ marginBottom: "144px" }}>
            <p className="font-body uppercase"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.28em", marginBottom: "40px" }}>
              Antonio
            </p>
            <p className="font-antonio leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)", fontWeight: 300, color: "#111", letterSpacing: "0.01em" }}>
              Design dat<br />werkt.
            </p>
            <p className="font-body"
              style={{ fontSize: "1rem", color: "#888", lineHeight: 1.85, marginTop: "48px", maxWidth: "38ch" }}>
              Editorial hierarchy. The voice between Anton and Inter — carries structure without demanding attention. Three weights, each with a specific gravity.
            </p>
          </div>

          <div>
            <p className="font-body uppercase"
              style={{ fontSize: "0.75rem", color: "#AAAAAA", letterSpacing: "0.28em", marginBottom: "40px" }}>
              Inter
            </p>
            <p className="font-body"
              style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.375rem)", color: "#333", lineHeight: 1.9, maxWidth: "52ch" }}>
              Van strategie en design tot volledige front-end implementatie met de nieuwste technologieën. Gebruiksvriendelijk, schaalbaar en gebouwd voor de lange termijn. Websites die niet alleen mooi zijn maar ook presteren.
            </p>
            <p className="font-body"
              style={{ fontSize: "1rem", color: "#888", lineHeight: 1.85, marginTop: "48px", maxWidth: "38ch" }}>
              Readability and presence. Not seen, only felt. The invisible architecture behind every sentence on the portfolio.
            </p>
          </div>

        </div>
      </section>

    </main>

    {/* ── Footer */}
    <footer className="px-6 md:px-12 lg:px-24 py-12 flex items-center justify-between flex-wrap gap-4"
      style={{ borderTop: `1px solid ${T.borderD}` }}>
      <div className="flex items-center gap-4">
        <span className="font-logo uppercase" style={{ fontSize: "0.9375rem", color: T.white }}>Typo Lab</span>
        <span className="font-body" style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          v0.6 · Internal
        </span>
      </div>
      <Link to="/"
        className="font-body inline-flex items-center gap-2 transition-colors"
        style={{ fontSize: "0.875rem", color: "#444", letterSpacing: "0.06em" }}
        onMouseEnter={e => (e.currentTarget.style.color = T.white)}
        onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
        <ArrowLeft size={13} />
        Back to portfolio
      </Link>
    </footer>

  </div>
);

export default TypoLab;
