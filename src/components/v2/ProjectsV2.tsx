import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, easeInOut } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import React from "react";
import { SECTION_TITLE_CLASS, SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GAP_CLASS, SECTION_TITLE_PADDING_TOP_CLASS } from "@/lib/sectionTitle";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { PILL_CLASS } from "@/lib/pill";
import { getProjects } from "@/lib/projectsData";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Single brand orange, shared with NavbarV2/FooterV2/LoadingScreen — no more
// locally-hardcoded accent hex that can drift from --brand-orange over time.
const ACCENT    = BRAND_ORANGE_HSL;
const CARD_H_VH = 42;

interface ProjectsV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const ProjectsV2 = ({ scrollContainerRef }: ProjectsV2Props) => {
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progressIndex, setProgressIndex] = useState(0);
  const { language, t } = useLanguage();
  const projects = getProjects(language);

  // ── Section reveal (unchanged) ────────────────────────────────────────────
  const { scrollYProgress: revealProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "start start"],
  });
  const revealY = useTransform(
    revealProgress,
    [0, 0.40, 0.60, 0.65, 1],
    [800, 380, 10, 0, 0],
  );
  const revealRadius = useTransform(
    revealProgress,
    [0, 0.60, 0.65, 1],
    ["20px 20px 0px 0px", "20px 20px 0px 0px", "0px 0px 0px 0px", "0px 0px 0px 0px"],
  );
  // ── Scroll progress that drives all card motion ────────────────────────────
  const { scrollYProgress: contentProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // Drives the dots AND the z-index — a single discrete "which project is
  // current" value, always in sync with whatever contentProgress is doing.
  useMotionValueEvent(contentProgress, "change", (v) => {
    const idx = v < 0.2 ? 0 : v < 0.4 ? 1 : v < 0.6 ? 2 : 3;
    setProgressIndex(prev => (prev === idx ? prev : idx));
  });

  // No reduced-motion branch needed for the section reveal above (a single
  // one-time slide-and-round-off as the panel arrives, not a "prolonged"
  // effect) — see below for the actual card-stack simplification.
  const prefersReducedMotion = useReducedMotion();

  // ── Y positions — entrance from below, locks at 0 ────────────────────────
  //
  // Card i enters while the previous card is still settling.
  // The "staircase" motion: all cards behind the active one shift up
  // one slot each time a new card enters.
  //
  // Driven directly by contentProgress (not a spring on top of it) — this
  // page's own wheel handler (useSmoothScroll.ts) already smooths the raw
  // scroll input into `container.scrollTop` before Framer Motion ever sees
  // it, so contentProgress is itself already a smoothed value. A second,
  // independent spring stacked on top of that had its own decay curve
  // chasing an already-moving target, which produced a "settles late" /
  // "still creeping after I stopped scrolling" feel — removing it makes the
  // cards track the (already-smooth) scroll position directly.
  //
  // A later attempt replaced this continuous scrub with a discrete,
  // wheel-intercepting state machine that also nudged the real page scroll
  // position to stay in step with the active index. That introduced a sign
  // error (scrolled the page backward on every forward commit) which made
  // the section's own "am I currently pinned" check flicker, handing control
  // to native scroll unpredictably — the reported "tripping"/jumping. That
  // whole mechanism has been reverted; this file is back to the simpler,
  // single-source-of-truth continuous version below, which has no separate
  // system fighting the page's own scroll position at all.
  const c1YRaw = useTransform(
    contentProgress,
    [0,    0.20, 1],
    [CARD_H_VH,       0, 0],
    { ease: easeInOut },
  );
  const c2YRaw = useTransform(
    contentProgress,
    [0, 0.20, 0.40, 1],
    [2*CARD_H_VH, CARD_H_VH, 0, 0],
    { ease: easeInOut },
  );
  const c3YRaw = useTransform(
    contentProgress,
    [0, 0.20, 0.40, 0.60, 1],
    [3*CARD_H_VH, 2*CARD_H_VH, CARD_H_VH, 0, 0],
    { ease: easeInOut },
  );
  const c1Y = useTransform(c1YRaw, v => `${v}vh`);
  const c2Y = useTransform(c2YRaw, v => `${v}vh`);
  const c3Y = useTransform(c3YRaw, v => `${v}vh`);

  // ── X exits — numeric first so opacity can couple to position ───────────
  //
  // Pattern: card i exits [i*0.20 + 0.06, i*0.20 + 0.25]. Card 3 never exits.
  const c0XNum = useTransform(contentProgress, [0.06, 0.25], [0, -110], { ease: easeInOut });
  const c1XNum = useTransform(contentProgress, [0.26, 0.44], [0, -110], { ease: easeInOut });
  const c2XNum = useTransform(contentProgress, [0.46, 0.64], [0, -110], { ease: easeInOut });
  const c0X = useTransform(c0XNum, v => `${v}%`);
  const c1X = useTransform(c1XNum, v => `${v}%`);
  const c2X = useTransform(c2XNum, v => `${v}%`);

  // ── Opacity: stack depth dimming + exit fade coupled to X position ───────
  //
  // Exit cards (0–2): opacity is derived from their X value so the fade is
  // scroll-linked — the farther the card slides off screen, the lower the
  // opacity. Linear mapping (0 → 1, −110 → 0) gives an honest position tie;
  // the easeInOut already baked into XNum makes it feel premium without
  // needing an extra easing layer.
  //
  // Background cards (1–3): the progress-based ramp before the exit window
  // preserves the stack depth effect as each card rises to the active slot.
  const c0Opacity = useTransform(c0XNum, [0, -110], [1, 0]);
  const c1Opacity = useTransform(
    [contentProgress, c1XNum] as const,
    ([p, x]: number[]) => {
      if (p < 0.20) return 0.62 + (p / 0.20) * 0.38; // stack ramp  0.62 → 1
      if (p < 0.26) return 1;                           // active, before exit
      return Math.max(0, 1 + x / 110);                 // position-linked fade
    },
  );
  const c2Opacity = useTransform(
    [contentProgress, c2XNum] as const,
    ([p, x]: number[]) => {
      if (p < 0.20) return 0.45 + (p / 0.20) * 0.17;           // 0.45 → 0.62
      if (p < 0.40) return 0.62 + ((p - 0.20) / 0.20) * 0.38;  // 0.62 → 1
      if (p < 0.46) return 1;                                     // active, before exit
      return Math.max(0, 1 + x / 110);                           // position-linked fade
    },
  );
  const c3Opacity = useTransform(contentProgress, [0, 0.20, 0.40, 0.60, 1], [0.30, 0.45, 0.62, 1, 1]);

  // ── Image focus — scale + blur ease as each card arrives ─────────────────
  const c1ImgScale = useTransform(contentProgress, [0,    0.20], [0.96, 1], { ease: easeInOut });
  const c2ImgScale = useTransform(contentProgress, [0.20, 0.40], [0.96, 1], { ease: easeInOut });
  const c3ImgScale = useTransform(contentProgress, [0.40, 0.60], [0.96, 1], { ease: easeInOut });
  const c1BlurRaw  = useTransform(contentProgress, [0,    0.20], [3,    0], { ease: easeInOut });
  const c2BlurRaw  = useTransform(contentProgress, [0.20, 0.40], [3,    0], { ease: easeInOut });
  const c3BlurRaw  = useTransform(contentProgress, [0.40, 0.60], [3,    0], { ease: easeInOut });
  const c1Filter   = useTransform(c1BlurRaw, v => `blur(${v}px)`);
  const c2Filter   = useTransform(c2BlurRaw, v => `blur(${v}px)`);
  const c3Filter   = useTransform(c3BlurRaw, v => `blur(${v}px)`);

  // prefers-reduced-motion: no translateY/X staircase, no scale/blur focus
  // ease — every card sits stationary in the same spot, distinguished by an
  // instant opacity swap tied to the same discrete progressIndex the dots
  // already use. Every project stays reachable (still in the DOM, still
  // linked) — only the transform/blur/scale motion is removed.
  const yFor      = (i: number) => (prefersReducedMotion ? "0px" : [undefined, c1Y, c2Y, c3Y][i] ?? "0px");
  const xFor      = (i: number) => (prefersReducedMotion ? "0%"  : [c0X, c1X, c2X, undefined][i] ?? "0%");
  const opFor     = (i: number) => (prefersReducedMotion ? (i === progressIndex ? 1 : 0) : [c0Opacity, c1Opacity, c2Opacity, c3Opacity][i]);
  const scaleFor  = (i: number) => (prefersReducedMotion ? 1 : [1, c1ImgScale, c2ImgScale, c3ImgScale][i]);
  const filterFor = (i: number) => (prefersReducedMotion ? "blur(0px)" : ["blur(0px)", c1Filter, c2Filter, c3Filter][i]);
  // Deterministic stacking, independent of scroll direction: without this,
  // 4 same-position absolutely-positioned cards fall back to plain DOM
  // order for paint order, which only happens to look right while scrolling
  // forward (each new card is later in the .map() than the one it covers).
  // Scrolling BACKWARD, the card re-entering as active is an EARLIER sibling
  // than the one it's replacing, so default DOM order kept the outgoing
  // (higher-index) card on top — the wrong card visibly in front during
  // reverse. progressIndex already names which card is current in both
  // directions, so ranking every card at-or-before it (highest = current)
  // keeps the right one on top regardless of which way the user is
  // scrolling.
  const zFor = (i: number) => (i <= progressIndex ? i + 1 : 0);

  return (
    // 4 cards: 650 vh gives each card ~130 vh of action + generous dwell on last card.
    // This wrapper's own box is 650vh tall so the sticky panel below can stay
    // pinned for the whole scroll-jack duration, but only that inner 100vh
    // panel is ever actually visible — the rest is empty space sitting in
    // front (in DOM order / z-index) of the previous section during the
    // -100vh overlap. Without pointer-events:none here, that empty space
    // would hit-test as this wrapper and swallow clicks meant for the still-
    // visible content behind it. The sticky panel opts back into
    // pointer-events since it's the part genuinely on screen.
    <div
      ref={outerRef}
      style={{ height: "650vh", marginTop: "-100vh", position: "relative", zIndex: 44, pointerEvents: "none" }}
    >
      <motion.section
        ref={sectionRef}
        id="projecten"
        className="relative snap-start overflow-hidden flex flex-col"
        style={{
          backgroundColor: "hsl(var(--background))",
          y: revealY,
          borderRadius: revealRadius,
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: "var(--section-shadow)",
          pointerEvents: "auto",
        }}
      >
        {/* Grid texture — same opacity in both themes (0.06): Light Mode's
            lines are near-black (--foreground = var(--near-black) here),
            Dark Mode's are the light --foreground already used before.
            Equal weight, mirrored tone, so both read as equally present. */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Sticky title ──────────────────────────────────────────────── */}
        <div
          className={`relative z-10 w-full px-6 md:px-10 lg:px-14 flex-shrink-0 ${SECTION_TITLE_PADDING_TOP_CLASS} ${SECTION_TITLE_GAP_CLASS}`}
        >
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>
              {t.nav.projects.toUpperCase()}
            </h2>
          </div>
        </div>

        {/* ── Card stack ────────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="absolute inset-x-0 top-0 flex items-center px-6 md:px-10 lg:px-14"
              style={{
                height:  `${CARD_H_VH}vh`,
                y:       yFor(i),
                x:       xFor(i),
                opacity: opFor(i),
                zIndex:  zFor(i),
                // Only the active card should ever be interactive — an
                // inactive card (queued below, or already exited off-screen)
                // must never be able to catch a click meant for the one
                // that's actually visible and in place.
                pointerEvents: i === progressIndex ? "auto" : "none",
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch w-full max-w-[1240px] mx-auto">

                {/* ── Text block — flex column so the CTA can anchor to the
                    bottom (mt-auto below), matching the image's bottom edge
                    now that the grid row stretches both columns to the same
                    height. Title/description/pills keep their own existing
                    spacing untouched; only the leftover space above the CTA
                    is what's absorbed. ─────────────────────────────────── */}
                <div className="flex flex-col">
                  {/* Title */}
                  <h3
                    className="font-antonio font-semibold text-foreground uppercase leading-[0.88] tracking-tight mb-3"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                  >
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-foreground/65 text-sm leading-relaxed mb-4 max-w-[42ch]">
                    {proj.description}
                  </p>

                  {/* Tool chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tools.map(tool => (
                      <span
                        key={tool}
                        className={`${PILL_CLASS} font-body text-[9px] uppercase tracking-[0.18em] px-2.5 py-1`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <Link
                    to={proj.href}
                    className="group inline-flex items-center gap-3 font-body font-medium text-xs tracking-[0.18em] uppercase px-6 py-3 transition-opacity duration-300 hover:opacity-80 mt-auto"
                    style={{
                      backgroundColor: ACCENT,
                      color: "white",
                    }}
                  >
                    {t.common.viewWork}
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>

                {/* ── Image block ─────────────────────────────────────── */}
                <div className="relative">
                  {/* Depth shadow layer */}
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{ transform: "translate(7px, 7px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
                  />

                  <motion.div
                    style={{
                      scale:    scaleFor(i),
                      filter:   filterFor(i),
                      position: "relative",
                      zIndex:   1,
                    }}
                    className="group aspect-[16/10] overflow-hidden rounded-sm"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    {/* Gradient overlay — depth, darkens bottom edge */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 45%, transparent 70%)",
                        zIndex: 2,
                      }}
                    />
                    {/* Vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.30) 100%)",
                        zIndex: 3,
                      }}
                    />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Progress indicator ─────────────────────────────────────────── */}
        <div
          className="relative z-10 flex-shrink-0 px-6 md:px-10 lg:px-14"
          style={{ paddingTop: "12px", paddingBottom: "18px" }}
        >
          <div className="max-w-[1240px] mx-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-700 ease-out"
                  style={{
                    width: i === progressIndex ? "28px" : "14px",
                    backgroundColor:
                      i === progressIndex
                        ? ACCENT
                        : "hsl(var(--foreground) / 0.18)",
                  }}
                />
              ))}
            </div>
            <div className="flex-1" />
            <span
              className="text-[9px] tracking-[0.25em] font-body uppercase hidden md:block"
              style={{ color: "hsl(var(--foreground) / 0.25)" }}
            >
              Scroll to explore
            </span>
          </div>
        </div>

      </motion.section>
    </div>
  );
};

export default ProjectsV2;
