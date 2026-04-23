import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectWeb from "@/assets/project-web.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectProduct from "@/assets/project-product.jpg";
import React from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";
// @ts-ignore
import "@fontsource/anton";

const DARK_BG   = "hsl(0, 0%, 8%)";
// Each card is 54 vh tall.
// Panel area ≈ 85 vh → active card (0–54 vh) + next card peek (54–85 vh, 57 % visible).
// Total visible at any moment: ~1.57 cards.
const CARD_H_VH = 54;

const projects = [
  {
    title: "Webdesign & Development",
    description: "Moderne, snelle websites die converteren. Van concept tot lancering.",
    tools: ["React", "HTML / CSS", "Figma", "CMS Integratie"],
    image: projectWeb,
    href: "/webdesign",
  },
  {
    title: "Merkidentiteit",
    description: "Visuele identiteiten die blijven hangen. Logo's, huisstijlen en brandbooks.",
    tools: ["Figma", "Illustrator", "Branding", "Brand Guidelines"],
    image: projectBrand,
    href: "/merkidentiteit",
  },
  {
    title: "Digitale Producten",
    description: "Apps en platformen die complexe problemen simpel maken.",
    tools: ["React", "TypeScript", "UI/UX", "Prototyping"],
    image: projectProduct,
    href: "/digitale-producten",
  },
];

interface ProjectsV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const ProjectsV2 = ({ scrollContainerRef }: ProjectsV2Props) => {
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);
  // Only React state kept: the progress-indicator dot, updated at 2 thresholds total.
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
  useMotionValueEvent(revealProgress, "change", (latest) => {
    if (latest >= 0.65 && !hasSnapped.current) {
      hasSnapped.current = true;
      const container = scrollContainerRef?.current;
      const outer     = outerRef.current;
      if (container && outer) {
        const targetY = outer.getBoundingClientRect().top + container.scrollTop;
        smoothScrollTo(container, targetY);
      }
    }
    if (latest < 0.25) hasSnapped.current = false;
  });

  // ── Scroll progress that drives all card motion ────────────────────────────
  // 0 = outer top at viewport top (right after section snap)
  // 1 = outer bottom at viewport top (500 vh later)
  const { scrollYProgress: contentProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // Lightweight UI update — two threshold crossings, not per-frame state change.
  useMotionValueEvent(contentProgress, "change", (v) => {
    const idx = v < 0.2 ? 0 : v < 0.4 ? 1 : 2;
    setProgressIndex(prev => (prev === idx ? prev : idx));
  });

  // ── Y positions — phase 1 only (entrance from below, locks at 0) ─────────────
  //
  // Each card rises from below into its presentation position (y = 0) and then
  // STOPS. y never goes negative. The horizontal exit (phase 2) is a separate
  // transform that only starts after y has fully settled at 0.
  // This prevents any diagonal motion: the two phases never overlap.
  //
  // Card 0: already at y = 0 on mount — no vertical travel needed.
  // Card 1: 54 vh → 0 during progress 0–0.20, then locked at 0.
  // Card 2: 108 vh → 54 vh (peek slot) → 0 during progress 0–0.40, locked at 0.
  //         The two-step path keeps card 2 peeking while card 1 is active.
  const c1YRaw = useTransform(contentProgress, [0,    0.20, 1], [CARD_H_VH,       0, 0]);
  const c2YRaw = useTransform(contentProgress, [0, 0.20, 0.40, 1], [2*CARD_H_VH, CARD_H_VH, 0, 0]);
  const c1Y = useTransform(c1YRaw, v => `${v}vh`);
  const c2Y = useTransform(c2YRaw, v => `${v}vh`);
  // Card 0 y is always "0px" — applied as a static style value, not a MotionValue.

  // ── X exits — phase 2 only, starts strictly after y has reached 0 ──────────
  //
  // Card 0: y reaches 0 at mount. Settle 0–0.06 (30 vh), exit 0.06–0.25.
  // Card 1: y reaches 0 at progress 0.20. Settle 0.20–0.26 (30 vh), exit 0.26–0.44.
  // Card 2: no horizontal exit (last card, held during dwell).
  //
  // The exit ranges begin at or after the y completion point, guaranteeing
  // that y = 0 is locked before any x movement starts.
  const c0X = useTransform(contentProgress, [0.06, 0.25], ["0%", "-110%"]);
  const c1X = useTransform(contentProgress, [0.26, 0.44], ["0%", "-110%"]);

  // ── Opacity ───────────────────────────────────────────────────────────────
  // Peeking/waiting cards are dimmed to signal "coming next".
  // Opacity milestones are aligned with the y completion points.
  const c0Opacity = useTransform(contentProgress, [0,    0.08, 0.28], [1,    1,    0.1]);
  const c1Opacity = useTransform(contentProgress, [0,    0.20, 0.36, 0.48], [0.62, 1,    1,   0.1]);
  const c2Opacity = useTransform(contentProgress, [0, 0.20, 0.40, 1], [0.45, 0.62, 1, 1]);

  // ── Image focus — scale + blur relax as each card reaches y = 0 ──────────
  const c1ImgScale = useTransform(contentProgress, [0,    0.20], [0.96, 1]);
  const c2ImgScale = useTransform(contentProgress, [0.20, 0.40], [0.96, 1]);
  const c1BlurRaw  = useTransform(contentProgress, [0,    0.20], [3,    0]);
  const c2BlurRaw  = useTransform(contentProgress, [0.20, 0.40], [3,    0]);
  const c1Filter   = useTransform(c1BlurRaw, v => `blur(${v}px)`);
  const c2Filter   = useTransform(c2BlurRaw, v => `blur(${v}px)`);

  return (
    <div
      ref={outerRef}
      style={{ height: "500vh", marginTop: "-100vh", position: "relative", zIndex: 44 }}
    >
      <motion.section
        ref={sectionRef}
        id="projecten"
        className="relative snap-start overflow-hidden flex flex-col"
        style={{
          backgroundColor: DARK_BG,
          y: revealY,
          borderRadius: revealRadius,
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: "0 -24px 60px rgba(0,0,0,0.55)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Sticky title ──────────────────────────────────────────────── */}
        <div
          className="relative z-10 w-full text-center px-6 md:px-16 lg:px-24 flex-shrink-0"
          style={{ paddingTop: "88px", paddingBottom: "20px" }}
        >
          <h2 className="text-[11vw] md:text-[7.5vw] lg:text-[6vw] leading-[0.9] tracking-[-0.02em] text-white/80 uppercase font-display font-extrabold">
            Wat wij doen
          </h2>
        </div>

        {/* Divider */}
        <div className="relative z-10 flex-shrink-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* ── Card stack ────────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="absolute inset-x-0 top-0 flex items-center px-6 md:px-16 lg:px-24"
              style={{
                height:  `${CARD_H_VH}vh`,
                y:       i === 0 ? "0px" : i === 1 ? c1Y : c2Y,
                x:       i === 0 ? c0X : i === 1 ? c1X : "0%",
                opacity: i === 0 ? c0Opacity : i === 1 ? c1Opacity : c2Opacity,
              }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-14 items-center w-full max-w-6xl mx-auto">

                {/* Text block */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-[10px] tracking-[0.45em] font-body uppercase"
                      style={{ color: "hsl(0 0% 100% / 0.22)" }}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: "hsl(0 0% 100% / 0.08)" }}
                    />
                  </div>

                  <h3
                    className="font-display font-extrabold text-white uppercase leading-[0.88] tracking-tight mb-3"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                  >
                    {proj.title}
                  </h3>

                  <p className="font-body text-white/55 text-sm leading-relaxed mb-4 max-w-[38ch]">
                    {proj.description}
                  </p>

                  <p
                    className="font-body uppercase mb-5"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      color: "hsl(0 0% 100% / 0.28)",
                    }}
                  >
                    {proj.tools.join("  ·  ")}
                  </p>

                  <Link
                    to={proj.href}
                    className="group inline-flex items-center gap-3 font-display font-bold text-xs tracking-[0.22em] uppercase transition-all duration-300"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300">
                      Bekijk werk
                    </span>
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                    />
                  </Link>
                </div>

                {/* Image — wrapped in a relative container so the depth layer
                    sits behind the image without being clipped by overflow:hidden */}
                <div className="relative">
                  {/* Depth layer: a dark offset panel that peeks out from behind
                      the image, creating a subtle raised/floating appearance */}
                  <div
                    className="absolute inset-0 rounded-sm bg-black/55"
                    style={{ transform: "translate(7px, 7px)", zIndex: 0 }}
                  />
                  <motion.div
                    style={{
                      scale:    i === 0 ? 1 : i === 1 ? c1ImgScale : c2ImgScale,
                      filter:   i === 0 ? "blur(0px)" : i === 1 ? c1Filter : c2Filter,
                      position: "relative",
                      zIndex:   1,
                    }}
                    className="aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-sm"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Progress indicator ─────────────────────────────────────────── */}
        <div
          className="relative z-10 flex-shrink-0 px-6 md:px-16 lg:px-24 flex items-center gap-4"
          style={{ paddingTop: "14px", paddingBottom: "20px" }}
        >
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-700 ease-out"
                style={{
                  width: i === progressIndex ? "28px" : "14px",
                  backgroundColor:
                    i === progressIndex
                      ? "hsl(0 0% 100% / 0.5)"
                      : "hsl(0 0% 100% / 0.15)",
                }}
              />
            ))}
          </div>
          <span
            className="text-[9px] tracking-[0.35em] font-body uppercase"
            style={{ color: "hsl(0 0% 100% / 0.2)" }}
          >
            0{progressIndex + 1} / 0{projects.length}
          </span>
          <div className="flex-1" />
          <span
            className="text-[9px] tracking-[0.25em] font-body uppercase hidden md:block"
            style={{ color: "hsl(0 0% 100% / 0.14)" }}
          >
            Scroll to explore
          </span>
        </div>

      </motion.section>
    </div>
  );
};

export default ProjectsV2;
