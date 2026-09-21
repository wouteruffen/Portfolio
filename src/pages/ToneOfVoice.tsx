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
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";

/*
 * Same chapter-stack mechanic as /brandbook (Slide, ChapterTag, Rule,
 * editorialEase, the lg+ immersive vs. tablet/mobile natural-flow split) —
 * recreated locally rather than imported, matching this codebase's own
 * convention of not reaching into another subpage's file for a shared
 * primitive (see FramedDoc/Shot/PosterFrame across the project pages).
 * Deliberately NOT edited in Brandbook.tsx itself; that page stays untouched.
 */

const DARK = "hsl(var(--near-black))";
const LIGHT = "hsl(40, 29%, 94%)";

const editorialEase = (t: number): number => {
  const H = 0.18;
  if (t <= H) return 0;
  if (t >= 1 - H) return 1;
  const n = (t - H) / (1 - 2 * H);
  return n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, amount: 0.15 } as const;

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

const ToneOfVoice = () => {
  const { t } = useLanguage();
  const v = t.toneOfVoice;

  const isPhoneLayout = useIsPhoneLayout();
  const isTablet = useIsTablet();
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
      eyebrow: v.basics.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10 min-h-0">
          <div className="max-w-[52ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
              {v.basics.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
              {v.basics.paragraph}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {v.basics.pillars.map((pillar) => (
              <div key={pillar.title}>
                <Rule />
                <p className="font-antonio font-semibold mt-3 mb-1.5" style={{ color: "var(--ink)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}>
                  {pillar.title}
                </p>
                <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "02",
      eyebrow: v.workFirst.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.workFirst.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
              {v.workFirst.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-antonio uppercase font-semibold mb-3" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>
                {v.workFirst.preferLabel}
              </p>
              {v.workFirst.preferSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 py-2 border-t" style={{ borderColor: "var(--line)" }}>
                  <span className="font-body tabular-nums" style={{ color: "#5DB870", fontSize: "11px" }}>{i + 1}</span>
                  <span className="font-body" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>{step}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-antonio uppercase font-semibold mb-3 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>
                {v.workFirst.avoidLabel}
              </p>
              {v.workFirst.avoidSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 py-2 border-t" style={{ borderColor: "var(--line)" }}>
                  <span className="font-body tabular-nums text-brand-orange" style={{ fontSize: "11px" }}>{i + 1}</span>
                  <span className="font-body" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "03",
      eyebrow: v.addValue.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.addValue.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
              {v.addValue.paragraph}
            </p>
          </div>
          <div className="flex flex-col">
            {v.addValue.questions.map((q) => (
              <div key={q} className="flex items-start gap-3 py-2.5 border-t" style={{ borderColor: "var(--line)" }}>
                <span className="text-brand-orange flex-shrink-0" style={{ fontSize: "12px" }}>?</span>
                <span className="font-antonio" style={{ color: "var(--ink)", fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "04",
      eyebrow: v.dontFillSpace.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.dontFillSpace.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {v.dontFillSpace.paragraph}
            </p>
          </div>
          {/* Two distinct problems, kept visually separate on purpose: this
              chapter is not a rephrasing of "Vertel niet wat ik al zie" (the
              next chapter) — redundancy vs. a layout slot getting filled
              regardless of whether there's something to say. */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--line)" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "var(--ink)", fontSize: "11px", letterSpacing: "0.25em" }}>{v.dontFillSpace.distinctionLabel1}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{v.dontFillSpace.distinction1}</p>
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: "hsl(var(--brand-orange))" }}>
              <p className="font-antonio uppercase font-semibold mb-2 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>{v.dontFillSpace.distinctionLabel2}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>{v.dontFillSpace.distinction2}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "05",
      eyebrow: v.dontNarrate.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-2" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.dontNarrate.heading}
            </h2>
            <p className="font-body italic leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
              {v.dontNarrate.intro}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {v.dontNarrate.examples.map((ex) => (
              <div key={ex.before} className="flex flex-col gap-2.5 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <p className="font-antonio line-through decoration-brand-orange decoration-2" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>
                  {ex.before}
                </p>
                <p className="font-body leading-snug" style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>
                  {ex.reason}
                </p>
                <p className="font-body leading-snug" style={{ color: "var(--ink)", fontSize: "0.85rem" }}>
                  {ex.after}
                </p>
              </div>
            ))}
          </div>
          <p className="font-body italic leading-snug max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>
            {v.dontNarrate.exceptionNote}
          </p>
        </div>
      ),
    },
    {
      n: "06",
      eyebrow: v.avoid.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.avoid.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {v.avoid.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--line)" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "var(--ink-muted)", fontSize: "11px", letterSpacing: "0.25em" }}>{v.avoid.claimWeakLabel}</p>
              <p className="font-body leading-relaxed line-through decoration-1" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{v.avoid.claimWeak}</p>
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: "#5DB870" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>{v.avoid.claimStrongLabel}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>{v.avoid.claimStrong}</p>
            </div>
          </div>
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.8rem" }}>
            {v.avoid.jargonNote}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {v.avoid.patterns.map((cat) => (
              <div key={cat.title}>
                <p className="font-antonio uppercase font-semibold mb-2 text-brand-orange" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                  {cat.title}
                </p>
                <div className="flex flex-col gap-1">
                  {cat.examples.map((ex) => (
                    <p key={ex} className="font-body leading-snug" style={{ color: "var(--ink-muted)", fontSize: "0.8rem" }}>
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "07",
      eyebrow: v.voice.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.voice.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {v.voice.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-l-2 pl-5" style={{ borderColor: "#5DB870" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>{v.voice.doLabel}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "0.95rem" }}>{v.voice.doExample}</p>
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--line)" }}>
              <p className="font-antonio uppercase font-semibold mb-2 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>{v.voice.dontLabel}</p>
              <p className="font-body leading-relaxed line-through decoration-1" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>{v.voice.dontExample}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "08",
      eyebrow: v.rules.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
            {v.rules.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10">
            {v.rules.items.map((rule) => (
              <div key={rule} className="flex items-start gap-3 py-2.5 border-t" style={{ borderColor: "var(--line)" }}>
                <span className="text-brand-orange flex-shrink-0" style={{ fontSize: "12px" }}>+</span>
                <span className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "09",
      eyebrow: v.punctuation.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <div className="max-w-[56ch]">
            <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
              {v.punctuation.heading}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              {v.punctuation.paragraph}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--line)" }}>
              <p className="font-antonio uppercase font-semibold mb-2 text-brand-orange" style={{ fontSize: "11px", letterSpacing: "0.25em" }}>{v.punctuation.badLabel}</p>
              <p className="font-body leading-relaxed line-through decoration-1" style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>{v.punctuation.badExample}</p>
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: "#5DB870" }}>
              <p className="font-antonio uppercase font-semibold mb-2" style={{ color: "#5DB870", fontSize: "11px", letterSpacing: "0.25em" }}>{v.punctuation.goodLabel}</p>
              <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "0.95rem" }}>{v.punctuation.goodExample}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "10",
      eyebrow: v.languages.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight max-w-[22ch]" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            {v.languages.heading}
          </h2>
          <p className="font-body leading-relaxed max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
            {v.languages.paragraph}
          </p>
        </div>
      ),
    },
    {
      n: "11",
      eyebrow: v.examples.eyebrow,
      light: true,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
            {v.examples.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
            {v.examples.items.map((item) => (
              <div key={item.source} className="border-t pt-3" style={{ borderColor: "var(--line)" }}>
                <p className="font-antonio uppercase font-semibold mb-1.5 text-brand-orange" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                  {item.source}
                </p>
                <p className="font-body leading-snug mb-1.5" style={{ color: "var(--ink)", fontSize: "0.85rem" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="font-body italic leading-snug" style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "12",
      eyebrow: v.checklist.eyebrow,
      light: false,
      body: (
        <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
          <h2 className="font-antonio font-semibold leading-[0.95] tracking-tight" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
            {v.checklist.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10">
            {v.checklist.items.map((item) => (
              <div key={item} className="flex items-start gap-3 py-2.5 border-t" style={{ borderColor: "var(--line)" }}>
                <span className="flex-shrink-0 w-3.5 h-3.5 mt-0.5 border rounded-sm" style={{ borderColor: "var(--ink-muted)" }} />
                <span className="font-body leading-relaxed" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const TOTAL_SECTIONS = chapters.length + 2;
  const allTags = [v.cover.tag, ...chapters.map((c) => c.eyebrow), v.closing.eyebrow];

  /* ─── Cover content ──────────────────────────────────────────────────── */
  const coverBody = (immersive: boolean) => (
    <>
      <div className="flex items-center gap-4 flex-shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body transition-colors"
          style={{ fontSize: "12px", color: "var(--ink-muted)", letterSpacing: "0.1em" }}
        >
          <ArrowLeft size={12} /> {v.cover.backLink}
        </Link>
        <span style={{ color: "var(--line)", fontSize: "12px" }}>&middot;</span>
        <span className="font-body" style={{ fontSize: "12px", color: "var(--ink-muted)", letterSpacing: "0.12em" }}>
          {v.cover.tag}
        </span>
      </div>

      <div className={immersive ? "flex-1 flex flex-col justify-center min-h-0" : "py-10 md:py-14"}>
        <h1
          className="font-logo uppercase leading-[0.87]"
          style={{ fontSize: immersive ? "clamp(3rem, 9vw, 9.5rem)" : "clamp(2.25rem, 12vw, 4.25rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}
        >
          TONE OF<br />VOICE<span className="text-brand-orange">.</span>
        </h1>
      </div>

      <Rule />

      <div className="flex flex-wrap items-end justify-between gap-y-6 pt-6 md:pt-8 flex-shrink-0">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 md:gap-x-12">
          {v.cover.facts.map(({ label, value }) => (
            <div key={label}>
              <p className="font-body" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>{label.toUpperCase()}</p>
              <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{value}</p>
            </div>
          ))}
        </div>
        {immersive && (
          <p className="font-body flex-shrink-0" style={{ fontSize: "11px", color: "var(--ink-muted)", letterSpacing: "0.3em" }}>
            {v.cover.scrollHint.toUpperCase()}
          </p>
        )}
      </div>
    </>
  );

  /* ─── Closing content ────────────────────────────────────────────────── */
  const closingBody = (
    <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10 min-h-0">
      <h2 className="font-logo uppercase leading-[0.87]" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
        {v.closing.heading.replace(/\.$/, "")}<span className="text-brand-orange">.</span>
      </h2>
      <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
        <div>
          <p className="font-body uppercase" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>Studio</p>
          <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{v.closing.studio}</p>
        </div>
        <div>
          <p className="font-body uppercase" style={{ fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.22em", marginBottom: "6px" }}>{t.common.location}</p>
          <p className="font-body" style={{ fontSize: "13px", color: "var(--ink)" }}>{v.closing.location}</p>
        </div>
      </div>
      <p className="font-body italic max-w-[56ch]" style={{ color: "var(--ink-muted)", fontSize: "0.85rem" }}>
        {v.closing.note}
      </p>
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <Link to="/brandbook" className="group inline-flex items-center gap-3 text-white font-body font-medium text-xs tracking-[0.18em] uppercase px-8 py-4 bg-brand-orange transition-opacity hover:opacity-80">
          {v.closing.brandbookLink}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
        </Link>
        <Link to="/" className="font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-brand-orange" style={{ color: "var(--ink-muted)" }}>
          {v.closing.backHome}
        </Link>
      </div>
      <Rule />
      <p className="font-body" style={{ fontSize: "11px", color: "var(--ink-muted)", letterSpacing: "0.08em" }}>{v.closing.copyright}</p>
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
                <ChapterTag n="13" label={v.closing.eyebrow} />
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
            <ChapterTag n="13" label={v.closing.eyebrow} />
            {closingBody}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default ToneOfVoice;
