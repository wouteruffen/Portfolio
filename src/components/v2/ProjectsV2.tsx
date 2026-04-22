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
const EASE      = [0.22, 1, 0.36, 1] as const;

// Each card is 54 vh tall.
// Panel area ≈ 85 vh  →  active card fills 0–54 vh,
// next card starts at 54 vh and shows 31 vh of itself (57 % peeking).
// Total visible: ~1.57 cards.
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

// Returns the y-target for card i given the current active index.
// - active   → 0 vh (in view, under the title)
// - exited   → 0 vh (stays put; x handles the left exit)
// - peeking  → 54 vh (just below the active card, partially visible)
// - far away → 105 vh (fully below the fold)
const cardY = (i: number, active: number): string => {
  if (i <= active)         return "0vh";
  if (i === active + 1)    return `${CARD_H_VH}vh`;
  return "105vh";
};

interface ProjectsV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const ProjectsV2 = ({ scrollContainerRef }: ProjectsV2Props) => {
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped     = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Section reveal ───────────────────────────────────────────────────────
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

  // ── Content panel switching ──────────────────────────────────────────────
  const { scrollYProgress: contentProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(contentProgress, "change", (latest) => {
    const next = Math.min(Math.max(Math.floor(latest * 5), 0), 2);
    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  });

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
          className="relative z-10 px-6 md:px-16 lg:px-24 flex-shrink-0"
          style={{ paddingTop: "88px", paddingBottom: "20px" }}
        >
          <div className="flex items-start gap-2">
            <h2 className="text-[13vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.9] tracking-[-0.02em] text-foreground/80 uppercase font-display font-extrabold">
              Wat wij doen
            </h2>
            <span className="text-foreground/40 text-xs md:text-sm font-body mt-1 md:mt-3">(Services)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="relative z-10 flex-shrink-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* ── Card stack ────────────────────────────────────────────────── */}
        {/*
          All cards are stacked at absolute top:0 and each has a fixed height.
          Their y position determines their role:
            y = 0      → active (or already exited, but those have x = -110%)
            y = 54 vh  → peeking card — the NEXT card, always partially visible below
            y = 105 vh → far-waiting card, fully below the fold

          When activeIndex advances:
            • Incoming card  animates y: 54vh → 0  (enters from below)
            • Outgoing card  animates x: 0   → -110%  (exits left, with slight delay)
            • New peek card  animates y: 105vh → 54vh  (enters peek slot, off-screen so not visible)

          The x exit fires slightly after the y entrance starts, giving the sequence:
          "enters from below → settles → scrolls left"
        */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {projects.map((proj, i) => {
            const isActive = i === activeIndex;
            const isExited = i < activeIndex;

            return (
              <motion.div
                key={proj.title}
                className="absolute inset-x-0 top-0 flex items-center px-6 md:px-16 lg:px-24"
                style={{ height: `${CARD_H_VH}vh` }}
                // initial matches the t=0 animate target so no spurious mount animation
                initial={{ y: cardY(i, 0), x: "0%" }}
                animate={{
                  y:       cardY(i, activeIndex),
                  x:       isExited ? "-110%" : "0%",
                  opacity: isActive ? 1 : isExited ? 1 : 0.62,
                }}
                transition={{
                  // Slow, smooth bottom entrance
                  y:       { duration: 1.1, ease: EASE },
                  // Exit left starts just after the incoming card has begun rising;
                  // ease-in accelerates as it leaves, feeling natural
                  x:       { duration: 0.95, delay: 0.12, ease: [0.4, 0, 1, 1] },
                  opacity: { duration: 1.0,  ease: EASE },
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

                  {/* Image — sharp on active, blurred on peek */}
                  <motion.div
                    animate={{
                      scale:   isActive ? 1    : 0.96,
                      filter:  isActive ? "blur(0px)" : "blur(3px)",
                      opacity: isActive ? 1    : isExited ? 0.3 : 0.55,
                    }}
                    transition={{ duration: 1.1, ease: EASE }}
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
              </motion.div>
            );
          })}
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
                  width: i === activeIndex ? "28px" : "14px",
                  backgroundColor:
                    i === activeIndex
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
            0{activeIndex + 1} / 0{projects.length}
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
