import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark";

interface ThemeTransitionContextValue {
  /** Swaps the theme via the full-screen opening-panel transition instead of an abrupt flip. */
  toggleTheme: () => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue | null>(null);

export const useThemeTransition = () => {
  const ctx = useContext(ThemeTransitionContext);
  if (!ctx) throw new Error("useThemeTransition must be used within ThemeTransitionProvider");
  return ctx;
};

// Subtle diagonal gradient per theme, not a flat fill — mirrors --background
// (see index.css `:root` / `.dark`) at its center stop, kept as literal hex
// rather than a CSS var because the panel shows the TARGET theme's surface
// before <html> has actually gained/lost the `.dark` class, so
// `hsl(var(--background))` would still resolve to the OLD theme for the
// first part of the animation. The lighter/darker stops are a few percent
// of lightness either side — just enough to read as a soft light source
// rather than a dead-flat color block.
const BG_GRADIENT: Record<Theme, string> = {
  light: "linear-gradient(135deg, #FBF9F5 0%, #F4F1EB 45%, #EDE8DF 100%)",
  dark: "linear-gradient(135deg, #1A1715 0%, #110F0E 45%, #0A0908 100%)",
};

// Mirrors --near-black / --cream — the sitewide "ink" colors, used so the
// icon/label read correctly against the panel's own surface above.
const FG_HEX: Record<Theme, string> = {
  light: "#141110",
  dark: "#FAF8F5",
};

const THEME_LABEL: Record<Theme, string> = {
  light: "Light Mode",
  dark: "Dark Mode",
};

// Same convention as NavbarV2's own toggle button: the icon shown is the
// mode you're moving TO (Moon = heading into Dark, Sun = heading into Light).
const THEME_ICON: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
};

// Four-phase cycle — anticipate, open, hold+switch, finish opening away.
// Same total length as before; the hold window (index 2→3) is wider than it
// used to be so the middle has more room to breathe, taken from a slightly
// tighter anticipate/finish either side.
const TRANSITION_DURATION = 0.7;
const PHASE_TIMES = [0, 0.1, 0.48, 0.68, 1] as const;
// Theme flips at the start of the hold — the moment the panel is largest,
// most opaque, and (in translation) closest to its resting position — the
// safest and least noticeable point in the whole cycle for the swap.
const SWITCH_DELAY = TRANSITION_DURATION * PHASE_TIMES[2];
// Slow, gathering build — no positional payoff yet, just enough presence to
// register that the press was acknowledged before anything opens.
const ANTICIPATE_EASE = "easeIn";
// Fast acceleration into a soft, controlled stop — the "opening" gesture.
const OPEN_EASE = [0.16, 1, 0.3, 1] as const;
// Minimal movement during the hold, so the small drift that remains still
// feels intentional rather than jittery.
const HOLD_EASE = [0.4, 0, 0.2, 1] as const;
// A visibly softer release than OPEN_EASE — the finish phase should read as
// a slower, more deliberate lift-away rather than a mirror of the opening
// snap, so the two halves of the gesture don't feel identical.
const FINISH_EASE = [0.22, 1, 0.36, 1] as const;

const REDUCED_FADE_DURATION = 0.26;

// Side length of the (pre-rotation) panel, in vmax. Rotated ~45°, its
// bounding box becomes a diamond reaching ~0.707x its side from center on
// every axis (~212vmax here) — comfortably more than any real viewport's
// center-to-corner distance (worst case ~141vmax, a perfectly square
// window), so the panel fully covers the screen through the hold even
// with the scale/skew swings below.
const PANEL_SIDE = 300; // vmax

// Position, scale, rotate and opacity move together across the four phases
// (see PHASE_TIMES) — translation supplies the bottom-left → top-right
// trajectory, scale supplies the "growing open" / "lifting away" read, and
// rotate sweeps through a wider arc than a static 45° so the panel visibly
// turns rather than just slides. None of it is anchored to a fixed pivot
// point (no `transformOrigin` trick) — it's a plain center-origin
// transform, deliberately, so the motion reads as fluid interface motion
// rather than a physical object swinging on a hinge.
//
// Note the hold phase (index 2→3) doesn't return fully to (0, 0) — it
// settles at a small residual offset toward the bottom-left, so even at
// full coverage the panel still subtly "remembers" where it opened from.
const PANEL_X = ["-70vmax", "-58vmax", "-8vmax", "-8vmax", "104vmax"] as const;
const PANEL_Y = ["70vmax", "58vmax", "8vmax", "8vmax", "-104vmax"] as const;
const PANEL_SCALE = [0.15, 0.22, 1.08, 1.12, 0.82] as const;
const PANEL_ROTATE = [34, 36, 48, 50, 44] as const;
// Peak opacity is ~60%, not fully opaque — the interface underneath stays
// perceptible throughout, so this reads as a layer moving over the page
// rather than a screen replacing it.
const PANEL_OPACITY = [0, 0.08, 0.6, 0.6, 0] as const;
const PANEL_TRANSITION = {
  duration: TRANSITION_DURATION,
  times: PHASE_TIMES,
  ease: [ANTICIPATE_EASE, OPEN_EASE, HOLD_EASE, FINISH_EASE],
};

// Shear, on its own faster timeline layered under the main one above — this
// is what breaks the panel out of being "one perfectly rigid rectangle."
// It peaks mid-opening (one corner stretching ahead of the other along the
// direction of travel) and relaxes to zero exactly as the panel settles
// into its hold, so the shape reads clean while the icon/label are shown,
// then peaks again mid-finish (the trailing corner lagging as the panel
// lifts away) before relaxing once more. skewX/skewY move in opposite
// signs so the distortion runs along the same diagonal as the translation
// — the visual cue of one corner leading and the other following, without
// literally splitting the panel into two shapes or curling anything.
const SKEW_TIMES = [0, 0.29, 0.48, 0.68, 0.85, 1] as const;
const SKEW_X = [0, 9, 0, 0, 8, 0] as const;
const SKEW_Y = [0, -7, 0, 0, -6, 0] as const;
const SKEW_TRANSITION = {
  duration: TRANSITION_DURATION,
  times: SKEW_TIMES,
  ease: [OPEN_EASE, HOLD_EASE, HOLD_EASE, FINISH_EASE, HOLD_EASE],
};

interface Transition {
  target: Theme;
  mode: "open" | "fade";
}

export const ThemeTransitionProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [transition, setTransition] = useState<Transition | null>(null);
  const switchTimeout = useRef<number>();
  const clearTimeout_ = useRef<number>();

  const toggleTheme = useCallback(() => {
    if (transition) return; // one open/close cycle at a time — keeps it feeling deliberate, not janky
    const target: Theme = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTheme(target);
      setTransition({ target, mode: "fade" });
      window.clearTimeout(clearTimeout_.current);
      clearTimeout_.current = window.setTimeout(() => setTransition(null), REDUCED_FADE_DURATION * 1000);
      return;
    }

    setTransition({ target, mode: "open" });
    window.clearTimeout(switchTimeout.current);
    switchTimeout.current = window.setTimeout(() => setTheme(target), SWITCH_DELAY * 1000);
  }, [theme, setTheme, transition]);

  const handlePanelComplete = useCallback(() => setTransition(null), []);

  const Icon = transition ? THEME_ICON[transition.target] : Sun;

  return (
    <ThemeTransitionContext.Provider value={{ toggleTheme }}>
      {children}
      {transition &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {transition.mode === "open" && (
              <motion.div
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${PANEL_SIDE}vmax`,
                  height: `${PANEL_SIDE}vmax`,
                  marginLeft: `-${PANEL_SIDE / 2}vmax`,
                  marginTop: `-${PANEL_SIDE / 2}vmax`,
                  background: BG_GRADIENT[transition.target],
                  willChange: "transform, opacity",
                }}
                initial={{
                  x: PANEL_X[0],
                  y: PANEL_Y[0],
                  scale: PANEL_SCALE[0],
                  rotate: PANEL_ROTATE[0],
                  skewX: SKEW_X[0],
                  skewY: SKEW_Y[0],
                  opacity: PANEL_OPACITY[0],
                }}
                animate={{
                  x: PANEL_X,
                  y: PANEL_Y,
                  scale: PANEL_SCALE,
                  rotate: PANEL_ROTATE,
                  skewX: SKEW_X,
                  skewY: SKEW_Y,
                  opacity: PANEL_OPACITY,
                }}
                transition={{
                  x: PANEL_TRANSITION,
                  y: PANEL_TRANSITION,
                  scale: PANEL_TRANSITION,
                  rotate: PANEL_TRANSITION,
                  opacity: PANEL_TRANSITION,
                  skewX: SKEW_TRANSITION,
                  skewY: SKEW_TRANSITION,
                }}
                onAnimationComplete={handlePanelComplete}
              />
            )}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                transition.mode === "open"
                  ? { opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }
                  : { opacity: [0, 1, 0], scale: [0.94, 1, 0.94] }
              }
              transition={
                transition.mode === "open"
                  ? { duration: TRANSITION_DURATION, times: [0, 0.4, 0.48, 0.68, 0.8], ease: "easeOut" }
                  : { duration: REDUCED_FADE_DURATION, times: [0, 0.5, 1], ease: "easeOut" }
              }
            >
              <Icon
                className="w-8 h-8 md:w-9 md:h-9"
                strokeWidth={1.5}
                style={{ color: FG_HEX[transition.target] }}
              />
              <span
                className="font-body uppercase text-[11px] md:text-xs tracking-[0.2em]"
                style={{ color: FG_HEX[transition.target] }}
              >
                {THEME_LABEL[transition.target]}
              </span>
            </motion.div>
          </div>,
          document.body
        )}
    </ThemeTransitionContext.Provider>
  );
};
