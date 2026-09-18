import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

let dotId = 0;

const CursorEffects = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const lastPos = useRef({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    setPos({ x, y });

    const last = lastPos.current;
    const dist = Math.hypot(x - last.x, y - last.y);
    if (dist > 12) {
      lastPos.current = { x, y };
      setTrail((prev) => [...prev.slice(-14), { id: dotId++, x, y }]);
    }
  }, []);

  // Subpages scroll the document itself, but the homepage's real content
  // lives inside Index.tsx's own `overflow-y-auto h-screen` container —
  // the document there never grows taller than the viewport, so
  // window.scrollY stays 0 no matter how far the user scrolls. CursorEffects
  // is a global component mounted on every page and has no ref into that
  // container, so rather than hardcoding a selector for it, a capture-phase
  // "scroll" listener on window sees scroll events from ANY descendant
  // (scroll doesn't bubble, but the capture phase still reaches window) and
  // e.target tells us which element actually scrolled.
  const scrollSourceRef = useRef<Element | null>(null);

  const computeProgress = useCallback((el: Element) => {
    const scrollable = el.scrollHeight - el.clientHeight;
    const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
    setScrollPercent(Math.min(100, Math.max(0, pct)));
  }, []);

  const handleScroll = useCallback((e?: Event) => {
    const doc = document.documentElement;
    if (doc.scrollHeight - doc.clientHeight > 1) {
      // The document itself scrolls (every subpage) — always prefer this,
      // so it can never be confused by some unrelated nested scroll box.
      scrollSourceRef.current = doc;
      computeProgress(doc);
      return;
    }
    // Document isn't the scroller. Accept the event's target only if it's
    // plausibly the full-page shell — a large, viewport-height-ish
    // scrollable region — not an incidental widget (a dropdown, a
    // horizontally-scrolling code block, …) that also happens to scroll.
    const target = e?.target instanceof Element ? e.target : scrollSourceRef.current;
    if (
      target &&
      target.scrollHeight - target.clientHeight > 1 &&
      target.clientHeight >= window.innerHeight * 0.9
    ) {
      scrollSourceRef.current = target;
      computeProgress(target);
    }
  }, [computeProgress]);

  useEffect(() => {
    const handleResize = () => handleScroll();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove, handleScroll]);

  const size = 28;
  const thickness = 1.5;

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Trail dots */}
        {trail.map((dot, i) => {
          const opacity = ((i + 1) / trail.length) * 0.4;
          const dotSize = 2 + ((i + 1) / trail.length) * 2;
          return (
            <div
              key={dot.id}
              className="absolute rounded-full bg-brand-orange"
              style={{
                left: dot.x - dotSize / 2,
                top: dot.y - dotSize / 2,
                width: dotSize,
                height: dotSize,
                opacity,
                transition: "opacity 0.3s ease-out",
              }}
            />
          );
        })}

        {/* Crosshair - horizontal */}
        <div
          className="absolute bg-brand-orange"
          style={{
            left: pos.x - size / 2,
            top: pos.y - thickness / 2,
            width: size,
            height: thickness,
          }}
        />
        {/* Crosshair - vertical */}
        <div
          className="absolute bg-brand-orange"
          style={{
            left: pos.x - thickness / 2,
            top: pos.y - size / 2,
            width: thickness,
            height: size,
          }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full bg-brand-orange"
          style={{
            left: pos.x - 2,
            top: pos.y - 2,
            width: 4,
            height: 4,
          }}
        />
      </div>

      {/* Custom scrollbar — a compact, top-anchored progress meter rather
          than a near-full-height bar. top-32 clears the navbar (~20px
          padding + content, desktop rest state); a fixed h-48 (instead of
          a bottom offset) keeps its bottom edge at a constant ~320px from
          the top of the viewport, comfortably above the Footer's own
          reveal band (it slides up to cover ~32vh, i.e. ~245-350px on
          common desktop heights) — so it can stay visible and reach 100%
          while scrolling through the Footer without ever sitting on top
          of it, no fade needed. */}
      <div className="fixed top-32 right-4 h-48 w-2 z-50 rounded-full overflow-hidden bg-muted/80">
        <motion.div
          className="w-full rounded-full bg-brand-orange"
          style={{ height: `${scrollPercent}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  );
};

export default CursorEffects;
