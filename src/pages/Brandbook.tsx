import { useRef, useState, useEffect, useCallback } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { useIsPhoneLayout, useIsTablet } from "@/hooks/use-mobile";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PILL_CLASS } from "@/lib/pill";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { LOGO_WIT, LOGO_ZWART, LOGO_FULL_BOX, LogoCrop } from "@/components/v2/BitBeeldLogo";
import monogramAsset from "@/assets/MONOGRAM.svg";
import aboutPortrait from "@/assets/about-portrait.jpg";
import kruizeLetterhead from "@/assets/design-identity/Screenshot 2026-08-19 120801.png";

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
// Fixed reference swatches for the two base tones — deliberately not the
// theme-dependent --background/--foreground pair (those flip meaning between
// Light/Dark Mode); these two name a specific brand tone regardless of the
// visitor's current site theme, same rationale as the Color chapter's swatches.
const DARK = "hsl(var(--near-black))";
const LIGHT = "hsl(40, 29%, 94%)";

/*
 * Editorial easing, ported from the previous Brandbook: holds 18% at each
 * end so a chapter sits still briefly before the next one rushes up to
 * cover it, eased in/out rather than linear.
 */
const editorialEase = (t: number): number => {
  const H = 0.18;
  if (t <= H) return 0;
  if (t >= 1 - H) return 1;
  const n = (t - H) / (1 - 2 * H);
  return n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, amount: 0.15 } as const;

/* ─── Shared primitives ──────────────────────────────────────────────────── */
// Both read --ink/--ink-muted/--line, set by whichever wrapper renders them
// (a full-bleed dark/light Slide on desktop, or a theme-aware <section> on
// tablet/mobile) — the same chapter body markup works, unstyled, in either.
const Rule = () => <div className="w-full h-px flex-shrink-0" style={{ background: "var(--line)" }} />;

const ChapterTag = ({ n, label }: { n: string; label: string }) => (
  <div className="mb-6 md:mb-8 flex-shrink-0">
    <div className="flex items-baseline gap-4 mb-3">
      <span className="font-body tabular-nums" style={{ fontSize: "11px", letterSpacing: "0.28em", color: "var(--ink-muted)" }}>
        {n}
      </span>
      <span className="font-antonio uppercase leading-none" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 600, letterSpacing: "0.04em", color: "var(--ink)" }}>
        {label}
      </span>
    </div>
    <Rule />
  </div>
);

const FramedBlock = ({
  children,
  caption,
  aspectClass = "aspect-[4/3]",
  bg,
  rounded = false,
}: {
  children: ReactNode;
  caption: string;
  aspectClass?: string;
  bg: string;
  rounded?: boolean;
}) => (
  <div>
    <div className="relative">
      <div
        className={`absolute inset-0 ${rounded ? "rounded-2xl" : ""}`}
        style={{ transform: "translate(8px, 8px)", backgroundColor: "var(--card-depth-shadow)" }}
        aria-hidden="true"
      />
      <div
        className={`relative z-[1] border overflow-hidden flex items-center justify-center ${aspectClass} ${rounded ? "rounded-2xl" : ""}`}
        style={{ backgroundColor: bg, borderColor: "var(--line)" }}
      >
        {children}
      </div>
    </div>
    <p className="mt-3 text-[10px] font-body uppercase tracking-[0.15em]" style={{ color: "var(--ink-muted)" }}>
      {caption}
    </p>
  </div>
);

/* ─── Desktop (lg+) immersive Slide wrapper ──────────────────────────────── */
interface SlideProps {
  index: number;
  scrollY: MotionValue<number>;
  vh: number;
  children: ReactNode;
  ink: string;
  inkMuted: string;
  line: string;
  bg: string;
}

const Slide = ({ index, scrollY, vh, children, ink, inkMuted, line, bg }: SlideProps) => {
  const y = useTransform(scrollY, [(index - 1) * vh, index * vh], [vh, 0], { ease: editorialEase, clamp: true });

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: index + 1,
        backgroundColor: bg,
        y: index === 0 ? 0 : y,
        "--ink": ink,
        "--ink-muted": inkMuted,
        "--line": line,
      } as CSSProperties}
    >
      <div className="h-full flex flex-col px-8 md:px-16 lg:px-24 pt-32 lg:pt-36 pb-10 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto h-full flex flex-col">{children}</div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */

const Brandbook = () => {
  const { t } = useLanguage();
  const b = t.brandbook;

  const isPhoneLayout = useIsPhoneLayout();
  const isTablet = useIsTablet();
  // Only true desktop (lg+, ≥1024px) gets the full-bleed sticky chapter
  // stack — the mechanic that made the previous Brandbook feel like a real
  // digital brand guide. Tablet keeps the same typography and chapter
  // numbering but in natural document flow: a touch-primary, often-shorter
  // viewport is exactly where a scroll-jacked full-height panel is most
  // likely to clip content or fight native scrolling. Mobile is the same
  // natural-flow path, simplified further.
  const isImmersive = !isPhoneLayout && !isTablet;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(() => window.innerHeight);
  const [activeIndex, setActiveIndex] = useState(0);
  const vhRef = useRef(vh);

  const { scrollTo } = useSmoothScroll(scrollRef, isImmersive);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { vhRef.current = vh; }, [vh]);

  const { scrollY } = useScroll({ container: scrollRef });

  useEffect(() => {
    if (!isImmersive) return;
    const unsubscribe = scrollY.on("change", (latest) => {
      setActiveIndex(Math.round(latest / vhRef.current));
    });
    return unsubscribe;
  }, [scrollY, isImmersive]);

  const scrollToSection = useCallback((index: number) => {
    scrollTo(index * vh);
  }, [scrollTo, vh]);

  /* ─── Chapter content — authored once, rendered by either layout ───────── */
  const chapters: { n: string; eyebrow: string; light: boolean; body: ReactNode }[] = [
    {
      n: "01",
      eyebrow: b.intro.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 md:gap-8 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
            {b.intro.heading}
          </h2>
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
            {b.intro.paragraph}
          </p>
          <Rule />
          <p className="font-antonio font-semibold leading-tight max-w-[26ch]" style={{ color: "var(--ink)", fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}>
            {b.intro.statement}
          </p>
        </div>
      ),
    },
    {
      n: "02",
      eyebrow: b.identity.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10 min-h-0">
          <div className="max-w-[52ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
              {b.identity.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
              {b.identity.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {b.identity.pillars.map((pillar) => (
              <div key={pillar.title}>
                <Rule />
                <p className="font-antonio font-semibold mt-3 mb-1.5" style={{ color: "var(--ink)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}>
                  {pillar.title}
                </p>
                <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "03",
      eyebrow: b.logo.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col min-h-0 gap-5">
          <p className="font-body leading-relaxed max-w-[56ch] flex-shrink-0" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
            {b.logo.paragraph}
          </p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0">
            <FramedBlock caption={b.logo.darkCaption} aspectClass="aspect-[4/3] lg:aspect-auto lg:h-[36vh]" bg="hsl(var(--near-black))">
              <LogoCrop src={LOGO_WIT} box={LOGO_FULL_BOX} className="w-[58%]" alt="Bit & Beeld" />
            </FramedBlock>
            <FramedBlock caption={b.logo.lightCaption} aspectClass="aspect-[4/3] lg:aspect-auto lg:h-[36vh]" bg={LIGHT}>
              <LogoCrop src={LOGO_ZWART} box={LOGO_FULL_BOX} className="w-[58%]" alt="Bit & Beeld" />
            </FramedBlock>
          </div>
        </div>
      ),
    },
    {
      n: "04",
      eyebrow: b.logoUsage.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight max-w-[24ch]" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
            {b.logoUsage.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="font-antonio uppercase font-semibold mb-3" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>
                {b.logoUsage.doLabel}
              </p>
              <div>
                {b.logoUsage.dos.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2.5 border-t" style={{ borderColor: "var(--line)" }}>
                    <span style={{ color: "#5DB870", fontSize: "12px", flexShrink: 0 }}>+</span>
                    <span className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-antonio uppercase font-semibold mb-3 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>
                {b.logoUsage.dontLabel}
              </p>
              <div>
                {b.logoUsage.donts.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2.5 border-t" style={{ borderColor: "var(--line)" }}>
                    <span className="text-brand-orange" style={{ fontSize: "12px", flexShrink: 0 }}>&minus;</span>
                    <span className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="font-body italic max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
            {b.logoUsage.note}
          </p>
        </div>
      ),
    },
    {
      n: "05",
      eyebrow: b.monogram.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-14 min-h-0">
          <img
            src={monogramAsset}
            alt="Studio Bit & Beeld monogram"
            className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 rounded-[22%] shadow-2xl"
          />
          <div className="max-w-[48ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {b.monogram.heading}
            </h2>
            <p className="font-body leading-relaxed mb-4" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
              {b.monogram.paragraph}
            </p>
            <p className="text-[10px] font-body uppercase tracking-[0.15em] mb-4" style={{ color: "var(--ink-muted)" }}>
              {b.monogram.caption}
            </p>
            <p className="font-body italic" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
              {b.monogram.note}
            </p>
          </div>
        </div>
      ),
    },
    {
      n: "06",
      eyebrow: b.color.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
            {b.color.paragraph}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: b.color.swatches.paper, bg: LIGHT, fg: "#141110", token: "--background" },
              { label: b.color.swatches.cream, bg: "hsl(var(--cream))", fg: "#141110", token: "--cream" },
              { label: b.color.swatches.nearBlack, bg: "hsl(var(--near-black))", fg: "#FAF8F5", token: "--near-black" },
              { label: b.color.swatches.orange, bg: "hsl(var(--brand-orange))", fg: "#FAF8F5", token: "--brand-orange" },
            ].map((swatch) => (
              <div key={swatch.label} className="flex flex-col justify-between p-4 md:p-6 aspect-square" style={{ backgroundColor: swatch.bg, color: swatch.fg }}>
                <span className="text-[10px] font-body uppercase tracking-[0.2em] opacity-60">{swatch.token}</span>
                <span className="font-antonio font-semibold" style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.25rem)" }}>{swatch.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "07",
      eyebrow: b.colorUsage.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {b.colorUsage.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {b.colorUsage.paragraph}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {(() => {
              const bgFor = (label: string) => {
                if (label.includes("Warm Paper") || label.includes("Papier")) return LIGHT;
                if (label.includes("Brand Orange")) return "hsl(var(--brand-orange))";
                return "hsl(var(--near-black))";
              };
              const fgFor = (label: string) => {
                if (label.startsWith("Near-black")) return "#141110";
                if (label.startsWith("Cream")) return "#FAF8F5";
                if (label.startsWith("Wit") || label.startsWith("White")) return "#FFFFFF";
                return "#FAF8F5";
              };
              return b.colorUsage.pairs.map((pair) => (
                <div key={pair.label} className="p-4 md:p-5 flex flex-col justify-between min-h-36 lg:min-h-24" style={{ backgroundColor: bgFor(pair.label) }}>
                  <p className="font-body text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ color: fgFor(pair.label) }}>{pair.label}</p>
                  <p className="font-antonio font-semibold leading-snug" style={{ color: fgFor(pair.label), fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}>{pair.sample}</p>
                </div>
              ));
            })()}
          </div>
          <p className="font-body italic max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
            {b.colorUsage.accentNote}
          </p>
        </div>
      ),
    },
    {
      n: "08",
      eyebrow: b.typography.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 md:gap-8 min-h-0">
          {[
            { name: b.typography.display.name, role: b.typography.display.role, node: (
              <p className="font-logo uppercase leading-[0.9] tracking-[-0.02em]" style={{ color: "var(--ink)", fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>{b.typography.specimenDisplay}</p>
            ) },
            { name: b.typography.editorial.name, role: b.typography.editorial.role, node: (
              <p className="font-antonio font-semibold leading-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)" }}>{t.overMij.values[0].title}</p>
            ) },
            { name: b.typography.body.name, role: b.typography.body.role, node: (
              <p className="font-body leading-relaxed max-w-[48ch]" style={{ color: "var(--ink-muted)", fontSize: "clamp(1rem, 1.3vw, 1.2rem)" }}>{t.hero.taglineRest}</p>
            ) },
          ].map((spec) => (
            <div key={spec.name} className="grid md:grid-cols-[180px_1fr] gap-3 md:gap-8 border-t pt-5 md:pt-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <p className="font-antonio font-semibold" style={{ color: "var(--ink)", fontSize: "1rem" }}>{spec.name}</p>
                <p className="font-body mt-0.5" style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>{spec.role}</p>
              </div>
              {spec.node}
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "09",
      eyebrow: b.hierarchy.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
            {b.hierarchy.paragraph}
          </p>
          <div className="flex flex-col gap-3">
            {[
              { size: "clamp(2rem, 5vw, 3.25rem)", weight: 600, font: "font-logo uppercase" },
              { size: "clamp(1.3rem, 2.6vw, 1.9rem)", weight: 600, font: "font-antonio" },
              { size: "clamp(1rem, 1.6vw, 1.25rem)", weight: 600, font: "font-antonio" },
              { size: "clamp(0.85rem, 1.1vw, 1rem)", weight: 400, font: "font-body" },
              { size: "0.7rem", weight: 500, font: "font-body uppercase tracking-[0.2em]" },
            ].map((style, i) => {
              const level = b.hierarchy.levels[i];
              return (
                <div key={level.label} className="flex items-baseline gap-4 border-t pt-2.5" style={{ borderColor: "var(--line)" }}>
                  <span className="font-body flex-shrink-0" style={{ color: "var(--ink-muted)", fontSize: "10px", letterSpacing: "0.15em", width: "6rem" }}>
                    {level.label.toUpperCase()}
                  </span>
                  <span className={style.font} style={{ color: "var(--ink)", fontSize: style.size, fontWeight: style.weight, lineHeight: 1.15 }}>
                    {level.sample}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      n: "10",
      eyebrow: b.layout.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
            {b.layout.paragraph}
          </p>
          <div className="flex flex-wrap items-stretch gap-6 md:gap-10">
            {b.layout.stats.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "pl-6 md:pl-10 border-l" : ""} style={{ borderColor: "var(--line)" }}>
                <div className="font-antonio font-semibold text-brand-orange" style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.8rem)" }}>{stat.value}</div>
                <div className="font-body mt-1 max-w-[14ch]" style={{ color: "var(--ink-muted)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <div
                className="aspect-[16/9] border relative overflow-hidden"
                style={{
                  borderColor: "var(--line)",
                  backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  opacity: 0.9,
                }}
              />
              <p className="mt-3 text-[10px] font-body uppercase tracking-[0.15em]" style={{ color: "var(--ink-muted)" }}>{b.layout.gridLabel}</p>
            </div>
            <div>
              <div className="aspect-[16/9] border flex gap-1.5 p-1.5" style={{ borderColor: "var(--line)" }}>
                <div className="h-full" style={{ flex: 4, backgroundColor: "hsl(var(--brand-orange))" }} />
                <div className="h-full" style={{ flex: 6, backgroundColor: "var(--line)" }} />
              </div>
              <p className="mt-3 text-[10px] font-body uppercase tracking-[0.15em]" style={{ color: "var(--ink-muted)" }}>{b.layout.asymmetryLabel}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "11",
      eyebrow: b.imagery.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
            {b.imagery.paragraph}
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FramedBlock caption={b.imagery.portraitCaption} aspectClass="aspect-[3/4] lg:aspect-auto lg:h-[34vh]" bg="var(--line)" rounded>
              <img src={aboutPortrait} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
            </FramedBlock>
            <FramedBlock caption={b.imagery.workCaption} aspectClass="aspect-[3/4] lg:aspect-auto lg:h-[34vh]" bg="var(--line)">
              <img src={kruizeLetterhead} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
            </FramedBlock>
          </div>
        </div>
      ),
    },
    {
      n: "12",
      eyebrow: b.digital.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
            {b.digital.paragraph}
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <p className="text-[10px] font-body uppercase tracking-[0.15em] mb-3" style={{ color: "var(--ink-muted)" }}>{b.digital.ctaLabel}</p>
              <span className="inline-flex items-center gap-2 text-white font-body font-medium text-xs tracking-[0.18em] uppercase px-6 py-3 bg-brand-orange">
                {b.digital.ctaLabel}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-body uppercase tracking-[0.15em] mb-3" style={{ color: "var(--ink-muted)" }}>{b.digital.tagsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.projects.webdesign.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className={`${PILL_CLASS} font-body text-[10px] uppercase tracking-[0.15em] px-3 py-1.5`}>{tool}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-body uppercase tracking-[0.15em] mb-3" style={{ color: "var(--ink-muted)" }}>{b.digital.navLabel}</p>
              <div className="flex items-center justify-between px-4 py-3 bg-brand-orange">
                <span className="w-4 h-4 rounded-full bg-white/20" />
                <div className="flex flex-col gap-1">
                  <span className="w-5 h-[1.5px] bg-white/70" />
                  <span className="w-5 h-[1.5px] bg-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "13",
      eyebrow: b.voice.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {b.voice.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {b.voice.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-l-2 pl-5" style={{ borderColor: "#5DB870" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>{b.voice.doLabel}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "0.95rem" }}>{b.voice.doExample}</p>
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--line)" }}>
              <p className="font-antonio uppercase font-semibold mb-2 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>{b.voice.dontLabel}</p>
              <p className="font-body leading-relaxed line-through decoration-1" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>{b.voice.dontExample}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "14",
      eyebrow: b.usage.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">
          <p className="font-body leading-relaxed max-w-[56ch] flex-shrink-0" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
            {b.usage.paragraph}
          </p>
          <div>
            {[
              { href: "/webdesign", data: t.projects.webdesign },
              { href: "/design-identity", data: t.projects.designIdentity },
              { href: "/print-design", data: t.projects.printDesign },
              { href: "/content-social-media", data: t.projects.contentSocial },
            ].map((example, i) => (
              <Link
                key={example.href}
                to={example.href}
                className="group grid grid-cols-[28px_1fr_auto] items-center gap-4 md:gap-6 border-t py-3.5 md:py-4 transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="text-brand-orange font-antonio font-semibold" style={{ fontSize: "1rem" }}>0{i + 1}</span>
                <h4 className="font-antonio font-semibold" style={{ color: "var(--ink)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}>{example.data.title}</h4>
                <span className="flex items-center gap-2 font-body uppercase tracking-[0.15em]" style={{ color: "var(--ink-muted)", fontSize: "10px" }}>
                  {b.usage.viewLabel}
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];

  // +1 for the cover (index 0), +1 for the closing/colophon chapter, which
  // is authored separately (closingBody below) rather than living in the
  // chapters array since its layout (facts row, CTA, copyright) doesn't fit
  // the shared "eyebrow + body" chapter shape.
  const TOTAL_SECTIONS = chapters.length + 2;
  const allTags = [b.cover.tag, ...chapters.map((c) => c.eyebrow), b.closing.eyebrow];

  /* ─── Cover content ──────────────────────────────────────────────────── */
  const coverBody = (immersive: boolean) => (
    <>
      <div className="flex items-center gap-4 flex-shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body transition-colors"
          style={{ fontSize: "12px", color: "var(--ink-muted)", letterSpacing: "0.1em" }}
        >
          <ArrowLeft size={12} /> {b.cover.backLink}
        </Link>
        <span style={{ color: "var(--line)", fontSize: "12px" }}>&middot;</span>
        <span className="font-body" style={{ fontSize: "12px", color: "var(--ink-muted)", letterSpacing: "0.12em" }}>
          {b.cover.tag}
        </span>
      </div>

      <div className={immersive ? "flex-1 flex flex-col justify-center min-h-0" : "py-10 md:py-14"}>
        <h1
          className="font-logo uppercase leading-[0.87]"
          style={{ fontSize: immersive ? "clamp(3.5rem, 10vw, 11rem)" : "clamp(2.75rem, 14vw, 5rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}
        >
          BRAND<br />BOOK<span className="text-brand-orange">.</span>
        </h1>
      </div>

      <Rule />

      <div className="flex flex-wrap items-end justify-between gap-y-6 pt-6 md:pt-8 flex-shrink-0">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 md:gap-x-12">
          {b.cover.facts.map(({ label, value }) => (
            <div key={label}>
              <p className="font-body" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>{label.toUpperCase()}</p>
              <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{value}</p>
            </div>
          ))}
        </div>
        {immersive && (
          <p className="font-body flex-shrink-0" style={{ fontSize: "11px", color: "var(--ink-muted)", letterSpacing: "0.3em" }}>
            {b.cover.scrollHint.toUpperCase()}
          </p>
        )}
      </div>
    </>
  );

  /* ─── Closing content ────────────────────────────────────────────────── */
  const closingBody = (
    <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10 min-h-0">
      <h2 className="font-logo uppercase leading-[0.87]" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
        {b.closing.heading.replace(/\.$/, "")}<span className="text-brand-orange">.</span>
      </h2>
      <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
        <div>
          <p className="font-body uppercase" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>Studio</p>
          <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{b.closing.studio}</p>
        </div>
        <div>
          <p className="font-body uppercase" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>{t.common.location}</p>
          <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{b.closing.location}</p>
        </div>
      </div>
      <p className="font-antonio font-semibold leading-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}>
        {b.closing.cta.lead} <span className="text-brand-orange">{b.closing.cta.accent}</span> {b.closing.cta.rest}
      </p>
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <Link to="/#contact" className="group inline-flex items-center gap-3 text-white font-body font-medium text-xs tracking-[0.18em] uppercase px-8 py-4 bg-brand-orange transition-opacity hover:opacity-80">
          {t.common.getInTouch}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
        </Link>
        <Link to="/" className="font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-brand-orange" style={{ color: "var(--ink-muted)" }}>
          {b.closing.backHome}
        </Link>
      </div>
      <Rule />
      <p className="font-body" style={{ fontSize: "11px", color: "var(--ink-muted)", letterSpacing: "0.08em" }}>{b.closing.copyright}</p>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════
   * IMMERSIVE (desktop, lg+): sticky full-bleed chapter stack
   * ═══════════════════════════════════════════════════════════════════════ */
  if (isImmersive) {
    return (
      <>
        <CursorEffects />
        <NavbarV2 forceSolid />

        {/* Chapter rail — subtle, numbers only, no labels: a progress marker
            for an immersive read, not a documentation sidebar. */}
        <div className="hidden lg:flex flex-col items-center gap-1 fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-[55] bg-nearBlack/50 backdrop-blur-sm rounded-full py-4 px-2">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className="flex items-center justify-center py-1 px-1.5"
              aria-label={allTags[i]}
            >
              <span
                className="font-body tabular-nums transition-colors"
                style={{ fontSize: "9px", color: activeIndex === i ? "hsl(var(--brand-orange))" : "rgba(250,248,245,0.35)", fontWeight: activeIndex === i ? 700 : 400 }}
              >
                {String(i).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        {/* Live chapter label */}
        <div className="hidden lg:block fixed left-6 xl:left-10 bottom-6 z-[55] bg-nearBlack/60 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-body uppercase text-cream/70" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
            {String(activeIndex).padStart(2, "0")} / {allTags[activeIndex]}
          </span>
        </div>

        <div
          ref={scrollRef}
          style={{ height: "100vh", overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" } as CSSProperties}
          className="[&::-webkit-scrollbar]:hidden"
        >
          <div style={{ height: `${TOTAL_SECTIONS * 100}vh`, position: "relative" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
              <Slide index={0} scrollY={scrollY} vh={vh} bg={DARK} ink="hsl(var(--cream))" inkMuted="rgba(250,248,245,0.6)" line="rgba(250,248,245,0.13)">
                {coverBody(true)}
              </Slide>

              {chapters.map((ch, i) => (
                <Slide
                  key={ch.n}
                  index={i + 1}
                  scrollY={scrollY}
                  vh={vh}
                  bg={ch.light ? LIGHT : DARK}
                  ink={ch.light ? "#141110" : "hsl(var(--cream))"}
                  inkMuted={ch.light ? "rgba(20,17,16,0.6)" : "rgba(250,248,245,0.6)"}
                  line={ch.light ? "rgba(20,17,16,0.12)" : "rgba(250,248,245,0.13)"}
                >
                  <ChapterTag n={ch.n} label={ch.eyebrow} />
                  {ch.body}
                </Slide>
              ))}

              <Slide
                index={chapters.length + 1}
                scrollY={scrollY}
                vh={vh}
                bg={DARK}
                ink="hsl(var(--cream))"
                inkMuted="rgba(250,248,245,0.6)"
                line="rgba(250,248,245,0.13)"
              >
                <ChapterTag n="15" label={b.closing.eyebrow} />
                {closingBody}
              </Slide>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════
   * NATURAL FLOW (tablet + mobile): same content, ordinary document scroll
   * ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <div
          className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} pt-[132px] md:pt-[168px] pb-10 md:pb-14`}
          style={{ "--ink": "hsl(var(--foreground))", "--ink-muted": "hsl(var(--muted-foreground))", "--line": "hsl(var(--border))" } as CSSProperties}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className={SECTION_TITLE_CONTAINER_CLASS}>
            {coverBody(false)}
          </motion.div>
        </div>

        {chapters.map((ch) => (
          <section
            key={ch.n}
            className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-14 md:py-20 border-t`}
            style={{ "--ink": "hsl(var(--foreground))", "--ink-muted": "hsl(var(--muted-foreground))", "--line": "hsl(var(--border))", borderColor: "var(--line)" } as CSSProperties}
          >
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: EASE }} className={SECTION_TITLE_CONTAINER_CLASS}>
              <ChapterTag n={ch.n} label={ch.eyebrow} />
              {ch.body}
            </motion.div>
          </section>
        ))}

        <section
          className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24 border-t`}
          style={{ "--ink": "hsl(var(--foreground))", "--ink-muted": "hsl(var(--muted-foreground))", "--line": "hsl(var(--border))", borderColor: "var(--line)" } as CSSProperties}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: EASE }} className={SECTION_TITLE_CONTAINER_CLASS}>
            <ChapterTag n="15" label={b.closing.eyebrow} />
            {closingBody}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Brandbook;
