import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useHasFinePointer } from "@/hooks/use-fine-pointer";
import cursorBlack from "@/assets/cursors/black.svg";
import cursorWhite from "@/assets/cursors/white.svg";

/**
 * The visual cursor mark — deliberately isolated from CursorTracker's
 * tracking logic below: swapping this asset again only ever means editing
 * this component, never how position is tracked.
 *
 * Black/white asset choice reuses the site's existing light/dark theme
 * (`next-themes`, same source NavbarV2/MobileHero already read) rather than
 * a new per-section background-detection system: black on the light theme,
 * white on the dark theme (the site's default). Rendered as an <img> at a
 * fixed square size so the SVG's own 64x64 proportions are never distorted,
 * and offset by its scaled hotspot (see HOTSPOT_NATIVE below) rather than by
 * its bounding-box center, so the SVG's actual drawn tip sits under the real
 * pointer position.
 */
// The SVG's own canvas is 64x64, with its drawn hotspot (the point that
// should sit exactly under the real pointer) at (11, 11) in that native
// space — not the canvas center. Since the mark renders at `size` rather
// than the native 64px, the offset below is scaled by the same ratio so the
// hotspot still lands under the pointer at whatever size it's drawn at.
const NATIVE_SIZE = 64;
const HOTSPOT_NATIVE = 11;

const CursorMark = () => {
  const { theme } = useTheme();
  const size = 28;
  const hotspotOffset = (HOTSPOT_NATIVE / NATIVE_SIZE) * size;
  const src = theme === "dark" ? cursorWhite : cursorBlack;
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
