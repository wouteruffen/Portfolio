import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";
import {
  LOGO_WIT,
  LOGO_ROW1_BOX,
  LOGO_ROW2_BOX,
  LOGO_MARK_BOX,
  LOGO_MARK_IN_ROW2,
  LOGO_ROW_GAP_FRACTION,
  LogoCrop,
  SolidLogoMark,
} from "@/components/v2/BitBeeldLogo";

interface ScrollLogoProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  /**
   * True once NavbarV2 has actually gone solid — which itself now waits for
   * BOTH the About-covers-Hero scroll geometry AND this component's own
   * `onShrinkSettled` signal below (see NavbarV2.tsx's `gatedSolidNav`), so
   * by the time this ever becomes true the shrink + crossfade into
   * SolidLogoMark is guaranteed to have already finished — no race with how
   * fast the user scrolled to get here. Fades this mark out (0.4s/easeInOut,
   * matching the navbar's own backgroundColor tween) as the hand-off point
   * to NavbarV2's own small Bit & Beeld logo.
   */
  solid?: boolean;
  /**
   * Fired once, the instant the shrink animation AND the quick crossfade
   * into SolidLogoMark have both fully finished. Index threads this into
   * NavbarV2 as `heroLogoSettled`, which gates the navbar's own solid-state
   * reveal — see the prop doc on NavbarV2Props.heroLogoSettled.
   */
  onShrinkSettled?: () => void;
  /**
   * The scroll position this mount is about to be restored to (Index's own
   * same-tick peek at the saved homepage position — see its own comment),
   * or null if this is a plain top-of-page visit. Lets this component mount
   * DIRECTLY in the settled/shrunk state — no shrink tween, no crossfade —
   * when that position is already past SHRINK_THRESHOLD, instead of always
   * starting from the big-logo state and animating a "shrink" that doesn't
   * correspond to anything actually happening on screen (the restore itself
   * is an instant jump, not a scroll journey). Purely an initial-state
   * decision; live scrolling from the top behaves identically to before.
   */
  initialScrollTop?: number | null;
}

// Scroll past this → shrink. Drop below this → grow back. Small, fixed
// pixel thresholds (not scroll-distance-relative) — the point is for the
// shrink to begin almost the instant the user starts scrolling at all, not
// partway through some larger scroll journey.
const SHRINK_THRESHOLD = 50;
const GROW_THRESHOLD = 30;

// Each row's own em-basis (matches the `height` on the row wrappers below)
// — shared with the row-gap margin and the shrink-scale math so all three
// can't quietly drift apart.
const ROW_HEIGHT_EM = 0.9;

// The row-group's own font-size at each breakpoint (as vw of viewport
// width) — mirrors the literal Tailwind classes on the rows below
// (text-[14vw] md:..., text-[12vw] lg:...), which MUST stay in sync with
// these by hand since Tailwind's class scanner needs static strings and
// can't read these constants.
const ROW_FONT_VW = { md: 14, lg: 12 };

// SolidLogoMark's own fixed pixel height at each breakpoint (h-6 md:h-7
// lg:h-8, see BitBeeldLogo.tsx's SOLID_LOGO_SIZE_CLASS) — the shrink target
// below is computed to land exactly on this, not a guessed ratio.
const SOLID_MARK_TARGET_PX = { md: 28, lg: 32 };

/**
 * The row-group's own full-size height is viewport-width-relative (vw
 * font-size), but SolidLogoMark — the thing it crossfades into — is a fixed
 * pixel size. A flat scale ratio of a vw-relative size is itself still
 * vw-relative, so it only ever lands on SolidLogoMark's fixed target at one
 * coincidental viewport width and drifts at every other one (confirmed:
 * ~+80% oversized at 2560px, ~-28% undersized at 1024px, using the old flat
 * 0.10). This computes the scale that lands the row-group's settled height
 * — TWO rows plus the artwork's own gap between them, LOGO_ROW_GAP_FRACTION
 * — exactly on SolidLogoMark's fixed target, at the current viewport width.
 * Recomputed on resize (see the effect below) rather than memoized once.
 */
const computeShrinkScale = () => {
  const vw = window.innerWidth;
  const isLg = vw >= 1024;
  const fontVwPercent = isLg ? ROW_FONT_VW.lg : ROW_FONT_VW.md;
  const fontSizePx = (fontVwPercent / 100) * vw;
  const fullTotalHeightPx = ROW_HEIGHT_EM * (2 + LOGO_ROW_GAP_FRACTION) * fontSizePx;
  const targetPx = isLg ? SOLID_MARK_TARGET_PX.lg : SOLID_MARK_TARGET_PX.md;
  return targetPx / fullTotalHeightPx;
};

// The shrink itself is a real Framer Motion tween again (not a direct
// scroll-position → scale mapping) — restored deliberately. A tween
// interpolates continuously at the browser's own frame rate once triggered,
// regardless of how sparse or bursty the underlying scroll input is (mouse-
// wheel notches, the site's own LERP-smoothed scroll, etc.), which is what
// gives it a fluid, high-frame-rate feel. Mapping scale directly off raw
// scroll position instead inherits whatever "stepped" update cadence the
// scroll source itself has — that's what read as low-fps/snappy. Same
// duration/easing the very first version of this component used.
const SHRINK_TRANSITION = { duration: 0.85, ease: [0.33, 1, 0.68, 1] as const };

// The row→SolidLogoMark crossfade — short, and only ever starts once the
// shrink above has fully finished (see onAnimationComplete below), so the
// two representations are never visible at different sizes at once. Both
// sides of the crossfade share this exact transition so it reads as one
// clean dissolve, not two independently-timed fades.
const CROSSFADE_TRANSITION = { duration: 0.25, ease: "easeInOut" as const };

const ScrollLogo = ({ scrollContainerRef, solid = false, onShrinkSettled, initialScrollTop = null }: ScrollLogoProps) => {
  // Only ever read on the very first render (useState/useRef initial
  // arguments are ignored on every render after) — a restore landing past
  // the shrink threshold, so this mount should start already-settled rather
  // than animate into it. See the prop doc above.
  const startSettled = initialScrollTop != null && initialScrollTop > SHRINK_THRESHOLD;
  const [isSmall, setIsSmall] = useState(startSettled);
  // True once the shrink (scale/y) tween has actually finished — this is
  // what triggers the row-group → SolidLogoMark crossfade, and is reset the
  // instant the user scrolls back near the top so growing back into the big
  // logo starts from the same clean state a fresh shrink would.
  const [settled, setSettled] = useState(startSettled);
  // Guards onShrinkSettled so it only ever fires once per genuine
  // shrink-then-crossfade completion, not on every render that happens to
  // pass through the completed state.
  const notifiedRef = useRef(startSettled);
  const [shrinkScale, setShrinkScale] = useState(computeShrinkScale);

  // Mount-only counterpart to the onAnimationComplete-driven notification
  // below: when startSettled is true, isSmall/settled are already `true` on
  // this component's very first render, so Framer Motion has nothing to
  // animate (with no `initial` prop, it defaults to matching the first
  // `animate` values) — the shrink/crossfade tweens below simply never run,
  // and onAnimationComplete never fires for them. Fire the settled
  // notification directly instead, so NavbarV2 isn't left waiting on an
  // animation that was never going to play.
  useEffect(() => {
    if (startSettled) onShrinkSettled?.();
    // startSettled is derived from a prop that Index only ever sets once
    // per mount (see its own comment), so it can't meaningfully change
    // across this component's lifetime — this is intentionally mount-only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => setShrinkScale(computeShrinkScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setIsSmall(prev => {
        if (!prev && scrollTop > SHRINK_THRESHOLD) return true;
        if (prev && scrollTop < GROW_THRESHOLD) {
          setSettled(false);
          notifiedRef.current = false;
          return false;
        }
        return prev;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  // Hands off to NavbarV2's own small Bit & Beeld logo once it actually goes
  // solid — same 0.4s/easeInOut as that logo's fade-in and the navbar's own
  // backgroundColor tween, so only one brand mark is ever visible in the
  // top-left at a time.
  const handOffTransition = { duration: 0.4, ease: "easeInOut" as const };

  return (
    <div
      // left matches NavbarV2's own horizontal padding exactly at each
      // breakpoint (md:px-12 / lg:px-24) so the logo's left edge always
      // lines up with the navbar content above it.
      className="fixed z-50 pointer-events-none left-12 lg:left-24 landscape-mobile:left-[max(1rem,env(safe-area-inset-left))] top-20 right-4 landscape-mobile:top-14 landscape-mobile:right-[max(1rem,env(safe-area-inset-right))]"
    >
      {/* Large/shrinking Hero animation. "BIT &" and "BEELD" are cropped and
          revealed as two independent rows (see BitBeeldLogo.tsx) so each can
          slide in on its own stagger. scale/y shrink on a real tween once
          `isSmall` flips; opacity only starts fading (via `settled`) once
          that tween has fully finished — see onAnimationComplete. */}
      <motion.div
        animate={{
          scale: isSmall ? shrinkScale : 1,
          y: isSmall ? -62 : 0,
          opacity: settled ? 0 : 1,
        }}
        transition={{
          scale: SHRINK_TRANSITION,
          y: SHRINK_TRANSITION,
          opacity: CROSSFADE_TRANSITION,
        }}
        onAnimationComplete={() => {
          // First completion: the shrink (scale/y) just finished — kick off
          // the quick crossfade by hiding this group.
          if (isSmall && !settled) {
            setSettled(true);
            return;
          }
          // Second completion: that crossfade itself just finished — this
          // group is now fully invisible and SolidLogoMark fully visible,
          // both at the exact same size/position. Only now is it safe to
          // unlock the navbar's own solid reveal.
          if (isSmall && settled && !notifiedRef.current) {
            notifiedRef.current = true;
            onShrinkSettled?.();
          }
        }}
        style={{ transformOrigin: "top left" }}
      >
        {/* Row 1 — "BIT &" */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="text-[18vw] md:text-[14vw] lg:text-[12vw] landscape-mobile:text-[clamp(1.25rem,6.5vh,2rem)] w-fit"
            style={{ height: `${ROW_HEIGHT_EM}em` }}
          >
            <LogoCrop src={LOGO_WIT} box={LOGO_ROW1_BOX} className="h-full" alt="Bit &" />
          </motion.div>
        </div>

        {/* Row 2 — "BEELD" + the trailing ® mark. marginTop reproduces the
            official SVG's own gap between the two rows (LOGO_ROW_GAP_FRACTION,
            measured from LOGO_ROW1_BOX/LOGO_ROW2_BOX — see BitBeeldLogo.tsx)
            — without it the two tight row crops sit edge-to-edge, losing the
            artwork's real spacing. */}
        <div className="overflow-hidden landscape-mobile:!pb-1" style={{ paddingBottom: "5vw" }}>
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
            className="relative text-[18vw] md:text-[14vw] lg:text-[12vw] landscape-mobile:text-[clamp(1.25rem,6.5vh,2rem)] w-fit"
            style={{ height: `${ROW_HEIGHT_EM}em`, marginTop: `${LOGO_ROW_GAP_FRACTION * ROW_HEIGHT_EM}em` }}
          >
            <LogoCrop src={LOGO_WIT} box={LOGO_ROW2_BOX} className="h-full" alt="Beeld" />
            <div
              className="absolute"
              style={{
                left: `${LOGO_MARK_IN_ROW2.left}%`,
                top: `${LOGO_MARK_IN_ROW2.top}%`,
                width: `${LOGO_MARK_IN_ROW2.width}%`,
                height: `${LOGO_MARK_IN_ROW2.height}%`,
              }}
            >
              <LogoCrop src={LOGO_WIT} box={LOGO_MARK_BOX} className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Small state — literally the same SolidLogoMark component NavbarV2
          renders for its own solid-state logo: same box (LOGO_FULL_BOX),
          same height classes, just WIT instead of ZWART since this still
          sits over the dark Hero. Only ever becomes visible once `settled`
          (the shrink has fully finished) — so it never appears at a moment
          when the row-group above is still a different size, which is what
          caused the double-logo/ghosting look. y snaps directly (no
          transition) since by the time this is visible the row-group's own
          y tween has already finished landing on the same value. */}
      <motion.div
        animate={{ opacity: solid ? 0 : settled ? 1 : 0 }}
        transition={{ duration: solid ? handOffTransition.duration : CROSSFADE_TRANSITION.duration, ease: "easeInOut" }}
        style={{ y: isSmall ? -62 : 0 }}
        className="absolute top-0 left-0"
      >
        <SolidLogoMark src={LOGO_WIT} />
      </motion.div>
    </div>
  );
};

export default ScrollLogo;
