import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Compact, top-anchored scroll-progress meter — mounted per-page (not
 * globally) because each page's condition for showing it can differ (e.g.
 * the homepage hides it in phone layout). Previously lived bundled inside
 * CursorEffects.tsx; split out because the two are unrelated responsibilities
 * that happened to share a file.
 *
 * Subpages scroll the document itself, but the homepage's real content
 * lives inside Index.tsx's own `overflow-y-auto h-screen` container — the
 * document there never grows taller than the viewport, so window.scrollY
 * stays 0 no matter how far the user scrolls. This component has no ref
 * into that container, so rather than hardcoding a selector for it, a
 * capture-phase "scroll" listener on window sees scroll events from ANY
 * descendant (scroll doesn't bubble, but the capture phase still reaches
 * window) and e.target tells us which element actually scrolled.
 */
const ScrollProgressIndicator = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
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
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll]);

  return (
    // A compact, top-anchored progress meter rather than a near-full-height
    // bar. top-32 clears the navbar (~20px padding + content, desktop rest
    // state); a fixed h-48 (instead of a bottom offset) keeps its bottom
    // edge at a constant ~320px from the top of the viewport, comfortably
    // above the Footer's own reveal band (it slides up to cover ~32vh, i.e.
    // ~245-350px on common desktop heights) — so it can stay visible and
    // reach 100% while scrolling through the Footer without ever sitting on
    // top of it, no fade needed.
    <div className="fixed top-32 right-4 h-48 w-2 z-50 rounded-full overflow-hidden bg-muted/80">
      <motion.div
        className="w-full rounded-full bg-brand-orange"
        style={{ height: `${scrollPercent}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;
