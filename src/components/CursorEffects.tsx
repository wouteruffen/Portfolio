import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useHasFinePointer } from "@/hooks/use-fine-pointer";
import cursorBlack from "@/assets/cursors/black2.svg";
import cursorWhite from "@/assets/cursors/white2.svg";
import cursorPointBlack from "@/assets/cursors/pointblack2.svg";
import cursorPointWhite from "@/assets/cursors/pointwhite2.svg";
import cursorTextBlack from "@/assets/cursors/verticalblack2.svg";
import cursorTextWhite from "@/assets/cursors/verticalwhite2.svg";

type CursorKind = "default" | "interactive" | "text";

// Semantic, native-first matching: real interactive/text-entry elements are
// detected generically by tag/role/attribute, not by hand-listing selectors
// per page or component. Anything current or future built from a real <a>,
// <button>, form control, or a proper ARIA role/tabindex is picked up
// automatically — nothing here is specific to any one page or component.
// `:not(:disabled)` / `:not([aria-disabled="true"])` keep disabled controls
// out, so they fall through to the plain default mark instead.
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "select:not(:disabled)",
  "summary",
  "label[for]",
  "input[type='button']:not(:disabled)",
  "input[type='submit']:not(:disabled)",
  "input[type='reset']:not(:disabled)",
  "input[type='checkbox']:not(:disabled)",
  "input[type='radio']:not(:disabled)",
  "[role='button']:not([aria-disabled='true'])",
  "[role='link']",
  "[role='tab']",
  "[role='menuitem']",
  "[role='switch']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const TEXT_SELECTOR = [
  "input:not([type]):not(:disabled)",
  "input[type='text']:not(:disabled)",
  "input[type='email']:not(:disabled)",
  "input[type='tel']:not(:disabled)",
  "input[type='number']:not(:disabled)",
  "input[type='password']:not(:disabled)",
  "input[type='search']:not(:disabled)",
  "input[type='url']:not(:disabled)",
  "textarea:not(:disabled)",
  "[contenteditable='true']",
  "[contenteditable='']",
].join(", ");

const ASSETS: Record<CursorKind, { light: string; dark: string }> = {
  default:     { light: cursorBlack,      dark: cursorWhite },
  interactive: { light: cursorPointBlack, dark: cursorPointWhite },
  text:        { light: cursorTextBlack,  dark: cursorTextWhite },
};

/**
 * The visual cursor mark — deliberately isolated from CursorTracker's
 * tracking logic below: swapping assets or adding another state only ever
 * means editing this component, never how position is tracked.
 *
 * Black/white asset choice reuses the site's existing light/dark theme
 * (`next-themes`, same source NavbarV2/MobileHero already read) rather than
 * a new per-section background-detection system: black variants on the
 * light theme, white variants on the dark theme (the site's default).
 * Rendered as an <img> at a fixed square size so each SVG's own 64x64
 * proportions are never distorted, and offset by its scaled hotspot (see
 * HOTSPOT_NATIVE below) rather than by its bounding-box center, so each
 * asset's actual drawn tip sits under the real pointer position.
 *
 * Which of the three states is active is tracked separately from position:
 * a `mouseover` listener (bubbles natively, fires only when the hovered
 * element actually changes — not on every pointer pixel) classifies
 * `e.target` against TEXT_SELECTOR / INTERACTIVE_SELECTOR via `closest()`
 * and stores the result in ordinary React state. That's deliberately
 * decoupled from the mousemove/rAF position loop below: state changes here
 * are rare (once per element boundary crossing) and only ever swap which
 * <img> is rendered, never the position-tracking transform, so this can't
 * reintroduce per-pixel re-renders or add any lag to tracking.
 */
// Every asset in this set (default/interactive/text, black or white) was
// inspected — not assumed — by measuring each SVG's actual path geometry:
// all six share the same drawn hotspot at (11, 11) in their native 64x64
// canvas (confirmed via getBBox()/getPointAtLength(), not eyeballed), the
// pointing-hand's fingertip and the text-bar's caret included. So one shared
// offset is correct for every state, and swapping the <img> src on a state
// change never requires repositioning it — no jump between states.
const NATIVE_SIZE = 64;
const HOTSPOT_NATIVE = 11;

const CursorMark = () => {
  const { theme } = useTheme();
  const [kind, setKind] = useState<CursorKind>("default");

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const next: CursorKind = target.closest(TEXT_SELECTOR)
        ? "text"
        : target.closest(INTERACTIVE_SELECTOR)
        ? "interactive"
        : "default";
      setKind(prev => (prev === next ? prev : next));
    };
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // 28 -> 32: a slightly larger mark. hotspotOffset below is derived from
  // `size` (not a fixed pixel value), so every state's proportions and its
  // shared (11, 11) native hotspot stay correctly aligned at any size.
  const size = 32;
  const hotspotOffset = (HOTSPOT_NATIVE / NATIVE_SIZE) * size;
  const asset = ASSETS[kind];
  const src = theme === "dark" ? asset.dark : asset.light;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="absolute select-none"
      style={{
        left: -hotspotOffset,
        top: -hotspotOffset,
        width: size,
        height: size,
        // markerRef (this element's positioned ancestor) has no in-flow
        // content of its own — its only child is this absolutely positioned
        // <img> — so it shrink-to-fits to a 0px-wide containing block.
        // Tailwind preflight's `img { max-width: 100% }` then resolves
        // against that 0px, clamping the image to invisible regardless of
        // the fixed width above. Pin max-width in px to opt this element
        // out of that percentage clamp.
        maxWidth: size,
      }}
    />
  );
};

/**
 * Custom cursor — mounted once at application level (see App.tsx), active
 * only on devices with a genuine fine pointer + hover capability (real mice
 * and trackpads). Touch phones and touch-first tablets get plain native
 * touch interaction; useHasFinePointer checks actual input capability, not
 * viewport width, so this can't be fooled by a touch device that happens to
 * be tablet/desktop-sized.
 *
 * Position tracking writes `transform` straight to a ref'd DOM node instead
 * of React state, so a mousemove never triggers a re-render. The pending
 * write is batched to at most one `requestAnimationFrame` per movement burst
 * purely to collapse redundant writes when a high-polling-rate mouse fires
 * faster than the display paints — it always applies the latest known
 * pointer position, so this adds no delay versus writing on every event.
 * There is no spring/lerp/easing anywhere in this path: the mark jumps
 * directly to the pointer's real position, exactly like a native cursor.
 *
 * No prefers-reduced-motion branch is needed: the mark has no transition or
 * animation of any kind (see CursorMark above and the lack of a `transition`
 * on the wrapper below) — an instant 1:1 echo of the pointer is the same
 * "motion" a native OS cursor already produces, which reduced-motion has
 * never applied to.
 */
const CursorEffects = () => {
  const hasFinePointer = useHasFinePointer();
  const markerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasFinePointer) return;

    const applyPosition = () => {
      frameRef.current = null;
      const el = markerRef.current;
      if (el) el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(applyPosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div
        ref={markerRef}
        className="absolute top-0 left-0"
        style={{ transform: "translate3d(-100px, -100px, 0)", willChange: "transform" }}
      >
        <CursorMark />
      </div>
    </div>
  );
};

export default CursorEffects;
