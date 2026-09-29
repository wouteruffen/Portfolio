import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

// Scroll-range mapping for the section's threshold logic (see the outer
// wrapper below for how these become the actual section height). Expressed
// as absolute vh distances rather than raw fractions so the two can be
// tuned independently: PROJECT_GAP_VH is exactly how much scroll it takes
// to trigger each project-to-project transition (unchanged from before),
// while FINAL_DWELL_VH is purely extra resting room on the last project
// before the section releases into Contact — growing it never touches the
// former. Thresholds are derived from these, not hardcoded, so they can
// never drift out of sync with the wrapper height.
const PROJECT_GAP_VH  = 90;  // same physical distance as before this change
const FINAL_DWELL_VH  = 300; // was ~180vh; now noticeably more breathing room
const WRAPPER_HEIGHT_VH = PROJECT_GAP_VH * 3 + FINAL_DWELL_VH;
const THRESHOLD_1 = PROJECT_GAP_VH / WRAPPER_HEIGHT_VH;
const THRESHOLD_2 = (PROJECT_GAP_VH * 2) / WRAPPER_HEIGHT_VH;
const THRESHOLD_3 = (PROJECT_GAP_VH * 3) / WRAPPER_HEIGHT_VH;

// Discrete-transition tuning. At most two cards are ever mounted at rest —
// the active one and a dimmed preview of the next one sitting below it in
// a vertical queue — and at most three momentarily during a transition (the
// card being removed, still playing its own exit). AnimatePresence
// mode="sync" lets whichever cards are present animate concurrently; exit +
// enter share one duration so the whole transition settles together, inside
// the requested 350–500ms window.
const X_SLIDE_PERCENT  = 45;  // how far the outgoing "active" card exits left
// >100% clears the active card's own box entirely (no stacking/overlap),
// with the extra 15% reading as genuine vertical spacing between the two —
// a queue, not a deck. Only opacity de-emphasizes the preview now; no
// scale-down and no blur are used to fake depth.
const QUEUE_Y_PERCENT  = 115;
const QUEUE_OPACITY    = 0.35;
const CARD_TRANSITION    = { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const };
const REDUCED_TRANSITION = { duration: 0 };
// Brief pause after a transition fully settles before another one may
// start — long enough that a newly-revealed project gets a moment on
// screen, short enough that scrolling never feels blocked. Applies
// regardless of prefers-reduced-motion: it paces *how often* a swap can
// happen, not how the swap itself looks.
const HOLD_MS = 200;

interface ProjectsV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  // From useSmoothScroll (see Index.tsx) — read-only, used only to tell
  // fresh wheel input apart from the LERP still coasting toward an earlier
  // target. Nothing here is ever written to; no scroll is intercepted.
  scrollTargetRef?: React.RefObject<number>;
  scrollAnimatingRef?: React.RefObject<number | null>;
}

const ProjectsV2 = ({ scrollContainerRef, scrollTargetRef, scrollAnimatingRef }: ProjectsV2Props) => {
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  const prefersReducedMotion = useReducedMotion();

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

  // ── Scroll progress used only to decide WHEN the active project changes ───
  const { scrollYProgress: contentProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // ── Discrete card transitions ─────────────────────────────────────────────
  //
  // The rendered list is always just `[active, preview?]`, recomputed fresh
  // from `displayIndex` on every render — never all four projects. Each
  // entry is keyed by the project's own title, so when a role changes on an
  // already-mounted project (the preview becoming active going forward, or
  // the active becoming the preview going backward) React treats it as the
  // same component instance and Framer Motion animates smoothly between the
  // two variants — no pop, no re-mount. A project entering the list for the
  // first time (the new preview appearing going forward, or the returning
  // project going backward) mounts fresh and plays its own `initial`. A
  // project leaving the list (the old active going forward, the far-out
  // preview going backward) is handled entirely by AnimatePresence's own
  // exit-then-unmount flow — no manual "still exiting" state is tracked.
  //
  // `displayIndex` (state — what's actually rendered) and `direction` (state
  // — which way the pair should move, fed to AnimatePresence's own `custom`
  // prop) only change via `stepToward`, which always moves exactly ONE
  // project at a time. `lockedRef` is true for the transition AND the brief
  // hold after it (see HOLD_MS above), i.e. for the whole window in which
  // another step must not start.
  //
  // Fresh-input gating (fixes buffered scroll being "replayed" after a
  // hold): a threshold crossing may only start a step if either (a) the
  // page's global smooth-scroll LERP is currently idle (scrollAnimatingRef
  // === null) — meaning whatever moved contentProgress just now wasn't
  // wheel-driven coasting at all (e.g. keyboard or scrollbar-dragging,
  // neither of which go through that LERP), so there's nothing to have
  // buffered — or (b) the LERP is active but its own target has moved since
  // we last "spent" it (scrollTargetRef.current !== consumedTargetRef.current),
  // proving a genuinely new wheel/trackpad event set that target, not just
  // the tail end of an earlier one still coasting toward an old target.
  // `consumedTargetRef` is (re)synced to the current target at the moment a
  // hold ends, which is what makes leftover coasting from the gesture that
  // triggered the *previous* step read as "already spent" rather than new
  // intent — this is the actual fix for "scrolling hard then waiting can
  // still rush through several cards after the hold": that used to happen
  // because the old code re-checked and replayed whatever the scroll
  // position implied at the moment the hold ended, regardless of whether
  // any new input had actually arrived since. There is no longer a
  // "requestedRef" being caught up to at all — every step now requires its
  // own qualifying threshold-crossing event to fire while unlocked.
  //
  // This also covers the last-project boundary: nothing here ever
  // intercepts or blocks the real page scroll (Projects has never had a
  // wheel listener — leaving the section into Contact, or back into About,
  // has always been governed purely by scroll position vs. the sticky
  // panel's own CSS, untouched by this file). What this fix removes is the
  // multi-step "catch-up" cascade that used to run to completion off old
  // momentum alone — with it gone, the last project's card settles from a
  // single, freshly-triggered transition and then simply stays put through
  // any continued coasting, rather than chaining forward on its own.
  //
  // Direction is handed to AnimatePresence via `custom` — the one mechanism
  // that can still update an *already-exiting* element's own exit target (a
  // plain ref read at render time cannot, since AnimatePresence keeps
  // animating the outgoing element from whatever props it had when it was
  // last part of the tree). z-index is instant per variant (so the card
  // becoming active is immediately drawn on top as it rises); pointer-events
  // is instant everywhere EXCEPT turning on, which is deliberately delayed
  // until the settle transition finishes, so a still-moving card's button
  // can't be clicked mid-flight.
  //
  // No second scroll/wheel system: still the same contentProgress this page
  // already tracked, which already reflects the existing global smooth-
  // scroll (useSmoothScroll.ts — only its two existing internal refs are now
  // also exposed read-only, nothing about its own behavior changed).
  const [displayIndex, setDisplayIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const displayIndexRef = useRef(0);
  useEffect(() => { displayIndexRef.current = displayIndex; }, [displayIndex]);
  const lockedRef = useRef(false);
  const consumedTargetRef = useRef(0);
  const holdTimerRef = useRef<number | null>(null);
  useEffect(() => () => {
    if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
  }, []);

  const stepToward = (target: number) => {
    const current = displayIndexRef.current;
    if (target === current) return;
    const dir: 1 | -1 = target > current ? 1 : -1;
    setDirection(dir);
    setDisplayIndex(current + dir); // exactly one project, never more
    lockedRef.current = true;
  };

  // Thresholds are derived from PROJECT_GAP_VH/WRAPPER_HEIGHT_VH above, not
  // hardcoded — see there for how the per-project distance and the final
  // dwell are tuned independently.
  useMotionValueEvent(contentProgress, "change", (v) => {
    if (lockedRef.current) return;
    const idx = v < THRESHOLD_1 ? 0 : v < THRESHOLD_2 ? 1 : v < THRESHOLD_3 ? 2 : 3;
    if (idx === displayIndexRef.current) return;
    const isCoasting = scrollAnimatingRef?.current != null;
    const hasFreshTarget = scrollTargetRef == null || scrollTargetRef.current !== consumedTargetRef.current;
    if (!isCoasting || hasFreshTarget) {
      stepToward(idx);
    }
  });

  const handleSettled = () => {
    if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null;
      // Discard whatever the scroll target drifted to during the transition
      // + hold — only a target change *after* this point counts as fresh.
      if (scrollTargetRef != null) consumedTargetRef.current = scrollTargetRef.current;
      lockedRef.current = false;
    }, HOLD_MS);
  };

  // Only ever [active] or [active, preview] — never all four projects.
  const cards: { index: number; role: "active" | "preview" }[] = [
    { index: displayIndex, role: "active" },
    ...(displayIndex + 1 < projects.length ? [{ index: displayIndex + 1, role: "preview" as const }] : []),
  ];

  const roleVariants = prefersReducedMotion
    ? {
        active:  { opacity: 1,              zIndex: 3, pointerEvents: "auto" as const, transition: REDUCED_TRANSITION },
        preview: { opacity: QUEUE_OPACITY,  zIndex: 1, pointerEvents: "none" as const, transition: REDUCED_TRANSITION },
        exit:    { opacity: 0,              transition: REDUCED_TRANSITION },
      }
    : {
        active: {
          x: "0%", y: "0%", opacity: 1,
          zIndex: 3, pointerEvents: "auto" as const,
          // pointer-events is the one property deliberately delayed until
          // the rest of the transition finishes — everything else (visual
          // settle) can proceed at the normal pace.
          transition: { ...CARD_TRANSITION, pointerEvents: { delay: CARD_TRANSITION.duration } },
        },
        // Sits below the active card's own box (no overlap — see
        // QUEUE_Y_PERCENT above), dimmed only. No scale-down, no blur: this
        // is a vertical queue, not a stacked/blurred deck.
        preview: {
          x: "0%", y: `${QUEUE_Y_PERCENT}%`, opacity: QUEUE_OPACITY,
          zIndex: 1, pointerEvents: "none" as const,
          transition: CARD_TRANSITION,
        },
        // Whatever gets removed from the list was either the active card
        // (forward: it exits left, continuing its own departure) or the
        // preview (backward: it moves further down the queue and fades,
        // continuing its own de-emphasis) — never the other way around,
        // since forward only ever drops the old active and backward only
        // ever drops the far-out preview (see the block comment above).
        exit: (dir: 1 | -1) => dir === 1
          ? { x: `${-X_SLIDE_PERCENT}%`, y: "0%", opacity: 0,
              zIndex: 2, pointerEvents: "none" as const, transition: CARD_TRANSITION }
          : { x: "0%", y: `${QUEUE_Y_PERCENT * 2}%`, opacity: 0,
              zIndex: 0, pointerEvents: "none" as const, transition: CARD_TRANSITION },
      };

  // How a freshly-mounted card should look the instant before it animates
  // toward its role. "active" only ever mounts fresh on a backward commit
  // (the returning project enters from the left, reversing how it left);
  // "preview" only ever mounts fresh on a forward commit (it fades in at
  // its queue position, already below the active card — no extra entrance
  // motion needed, it's meant to be subtle from the very start).
  const initialFor = (role: "active" | "preview") => {
    if (prefersReducedMotion) return { opacity: 0 };
    return role === "active"
      ? { x: `${-X_SLIDE_PERCENT}%`, y: "0%", opacity: 0 }
      : { x: "0%", y: `${QUEUE_Y_PERCENT}%`, opacity: 0 };
  };

  return (
    <div
      ref={outerRef}
      // This wrapper's own box is how long the sticky panel below stays
      // pinned, and its height is now WRAPPER_HEIGHT_VH — derived from
      // PROJECT_GAP_VH (90vh, unchanged) and FINAL_DWELL_VH (300vh, was
      // ~180vh) above, rather than a single hardcoded number with separate
      // threshold fractions. That's what makes it possible to grow only the
      // tail: PROJECT_GAP_VH stays fixed, so THRESHOLD_1/2/3 (fractions of
      // the new, larger total) still land at exactly the same absolute vh
      // distance apart — only the leftover space after THRESHOLD_3 grows.
      // See the report for this change's one known side effect (carried
      // over from the previous height change, and now partially reduced by
      // this one): NavbarV2.tsx's own hardcoded nav-click scroll target for
      // Contact assumes a fixed contribution from this section's height and
      // is off by the current difference from its original 650vh baseline —
      // left alone since NavbarV2 is out of scope here, but flagged rather
      // than silently leaving it.
      style={{ height: `${WRAPPER_HEIGHT_VH}vh`, marginTop: "-100vh", position: "relative", zIndex: 44, pointerEvents: "none" }}
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

        {/* ── Card stack — at most 2 mounted at rest, 3 mid-transition ────── */}
        <div className="relative z-10 flex-1 overflow-hidden">
          <AnimatePresence mode="sync" initial={false} custom={direction}>
            {cards.map(({ index, role }) => {
              const proj = projects[index];
              return (
                <motion.div
                  key={proj.title}
                  custom={direction}
                  variants={roleVariants}
                  initial={initialFor(role)}
                  animate={role}
                  exit="exit"
                  onAnimationComplete={role === "active" ? handleSettled : undefined}
                  className="absolute inset-x-0 top-0 flex items-center px-6 md:px-10 lg:px-14"
                  style={{ height: `${CARD_H_VH}vh` }}
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch w-full max-w-[1240px] mx-auto">

                    {/* ── Text block — three explicit rows (title / middle
                        content / CTA) rather than a packed-top flex column,
                        so the middle group can occupy the actual center of
                        the leftover space instead of all of it collecting
                        as one gap right above the CTA. Row 1 and row 3 stay
                        "auto" (their own content height); the middle row is
                        "1fr" and centers its own children within whatever
                        space that leaves — the grid row still stretches to
                        match the image's height via items-stretch above. */}
                    <div className="grid h-full" style={{ gridTemplateRows: "auto 1fr auto" }}>
                      {/* Title. Keeps its own mb-3 (part of this row's
                          "auto" height, not fighting the centered row below)
                          so there's always a minimum gap even if a long
                          description leaves little room to center within. */}
                      <h3
                        className="font-antonio font-semibold text-foreground uppercase leading-[0.88] tracking-tight mb-3"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                      >
                        {proj.title}
                      </h3>

                      {/* Description + tool chips — centered as one group
                          within the middle row; their own spacing relative
                          to each other (mb-4 between them) is unchanged. */}
                      <div className="flex flex-col justify-center">
                        <p className="font-body text-foreground/65 text-sm leading-relaxed mb-4 max-w-[42ch]">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {proj.tools.map(tool => (
                            <span
                              key={tool}
                              className={`${PILL_CLASS} font-body text-[9px] uppercase tracking-[0.18em] px-2.5 py-1`}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA button */}
                      <Link
                        to={proj.href}
                        className="group inline-flex justify-self-start items-center gap-3 font-body font-medium text-xs tracking-[0.18em] uppercase px-6 py-3 transition-opacity duration-300 hover:opacity-80"
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

                    {/* ── Image block ─────────────────────────────────── */}
                    <div className="relative">
                      {/* Depth shadow layer */}
                      <div
                        className="absolute inset-0 rounded-sm"
                        style={{ transform: "translate(7px, 7px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
                      />

                      <div
                        style={{ position: "relative", zIndex: 1 }}
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
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </motion.section>
    </div>
  );
};

export default ProjectsV2;
