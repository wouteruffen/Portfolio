import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, easeInOut } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import React from "react";
import { SECTION_TITLE_CLASS, SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_DIVIDER_CLASS, SECTION_TITLE_PADDING_TOP_CLASS } from "@/lib/sectionTitle";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { PROJECTS as projects } from "@/lib/projectsData";

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

  // Raw progress drives the UI counter only — stays pixel-accurate, no lag.
  useMotionValueEvent(contentProgress, "change", (v) => {
    const idx = v < 0.2 ? 0 : v < 0.4 ? 1 : v < 0.6 ? 2 : 3;
    setProgressIndex(prev => (prev === idx ? prev : idx));
  });

  // Spring-smoothed progress for all card motion.
  const smoothProgress = useSpring(contentProgress, {
    stiffness: 200,
    damping: 45,
    mass: 0.8,
  });

  // ── Y positions — entrance from below, locks at 0 ────────────────────────
  //
  // Card i enters while the previous card is still settling.
  // The "staircase" motion: all cards behind the active one shift up
  // one slot each time a new card enters.
  const c1YRaw = useTransform(
    smoothProgress,
    [0,    0.20, 1],
    [CARD_H_VH,       0, 0],
    { ease: easeInOut },
  );
  const c2YRaw = useTransform(
    smoothProgress,
    [0, 0.20, 0.40, 1],
    [2*CARD_H_VH, CARD_H_VH, 0, 0],
    { ease: easeInOut },
  );
  const c3YRaw = useTransform(
    smoothProgress,
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
  const c0XNum = useTransform(smoothProgress, [0.06, 0.25], [0, -110], { ease: easeInOut });
  const c1XNum = useTransform(smoothProgress, [0.26, 0.44], [0, -110], { ease: easeInOut });
  const c2XNum = useTransform(smoothProgress, [0.46, 0.64], [0, -110], { ease: easeInOut });
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
    [smoothProgress, c1XNum] as const,
    ([p, x]: number[]) => {
      if (p < 0.20) return 0.62 + (p / 0.20) * 0.38; // stack ramp  0.62 → 1
      if (p < 0.26) return 1;                           // active, before exit
      return Math.max(0, 1 + x / 110);                 // position-linked fade
    },
  );
  const c2Opacity = useTransform(
    [smoothProgress, c2XNum] as const,
    ([p, x]: number[]) => {
      if (p < 0.20) return 0.45 + (p / 0.20) * 0.17;           // 0.45 → 0.62
      if (p < 0.40) return 0.62 + ((p - 0.20) / 0.20) * 0.38;  // 0.62 → 1
      if (p < 0.46) return 1;                                     // active, before exit
      return Math.max(0, 1 + x / 110);                           // position-linked fade
    },
  );
  const c3Opacity = useTransform(smoothProgress, [0, 0.20, 0.40, 0.60, 1], [0.30, 0.45, 0.62, 1, 1]);

  // ── Image focus — scale + blur ease as each card arrives ─────────────────
  const c1ImgScale = useTransform(smoothProgress, [0,    0.20], [0.96, 1], { ease: easeInOut });
  const c2ImgScale = useTransform(smoothProgress, [0.20, 0.40], [0.96, 1], { ease: easeInOut });
  const c3ImgScale = useTransform(smoothProgress, [0.40, 0.60], [0.96, 1], { ease: easeInOut });
  const c1BlurRaw  = useTransform(smoothProgress, [0,    0.20], [3,    0], { ease: easeInOut });
  const c2BlurRaw  = useTransform(smoothProgress, [0.20, 0.40], [3,    0], { ease: easeInOut });
  const c3BlurRaw  = useTransform(smoothProgress, [0.40, 0.60], [3,    0], { ease: easeInOut });
  const c1Filter   = useTransform(c1BlurRaw, v => `blur(${v}px)`);
  const c2Filter   = useTransform(c2BlurRaw, v => `blur(${v}px)`);
  const c3Filter   = useTransform(c3BlurRaw, v => `blur(${v}px)`);

  const yFor      = (i: number) => [undefined, c1Y, c2Y, c3Y][i] ?? "0px";
  const xFor      = (i: number) => [c0X, c1X, c2X, undefined][i] ?? "0%";
  const opFor     = (i: number) => [c0Opacity, c1Opacity, c2Opacity, c3Opacity][i];
  const scaleFor  = (i: number) => [1, c1ImgScale, c2ImgScale, c3ImgScale][i];
  const filterFor = (i: number) => ["blur(0px)", c1Filter, c2Filter, c3Filter][i];

  return (
    // 4 cards: 650 vh gives each card ~130 vh of action + generous dwell on last card
    <div
      ref={outerRef}
      style={{ height: "650vh", marginTop: "-100vh", position: "relative", zIndex: 44 }}
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
          className={`relative z-10 w-full px-6 md:px-10 lg:px-14 flex-shrink-0 ${SECTION_TITLE_PADDING_TOP_CLASS}`}
          style={{ paddingBottom: "12px" }}
        >
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>
              WAT IK DOE
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className={SECTION_TITLE_DIVIDER_CLASS} />

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
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center w-full max-w-[1240px] mx-auto">

                {/* ── Text block ──────────────────────────────────────── */}
                <div>
                  {/* Index row */}
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-[10px] tracking-[0.45em] font-body uppercase"
                      style={{ color: "hsl(var(--foreground) / 0.35)" }}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: "hsl(var(--foreground) / 0.10)" }}
                    />
                  </div>

                  {/* Highlight label — same pattern as AboutV2 "Introduction" */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px" style={{ backgroundColor: ACCENT }} />
                    <span
                      className="text-[10px] tracking-[0.4em] font-antonio uppercase"
                      style={{ color: ACCENT }}
                    >
                      {proj.highlight}
                    </span>
                  </div>

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
                        className="font-body text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                        style={{
                          color: "hsl(var(--foreground) / 0.55)",
                          backgroundColor: "hsl(var(--foreground) / 0.06)",
                          border: "1px solid hsl(var(--foreground) / 0.12)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <Link
                    to={proj.href}
                    className="group inline-flex items-center gap-3 font-body font-medium text-xs tracking-[0.18em] uppercase px-6 py-3 transition-opacity duration-300 hover:opacity-80"
                    style={{
                      backgroundColor: ACCENT,
                      color: "white",
                    }}
                  >
                    Bekijk werk
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
            <span
              className="text-[9px] tracking-[0.35em] font-body uppercase"
              style={{ color: "hsl(var(--foreground) / 0.35)" }}
            >
              0{progressIndex + 1} / 0{projects.length}
            </span>
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
