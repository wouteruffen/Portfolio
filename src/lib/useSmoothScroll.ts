import { useEffect, RefObject } from "react";

// Controls how quickly scrollTop chases the target each frame.
// 0.10 → smooth, premium feel without feeling floaty or disconnected.
const LERP = 0.10;

/**
 * Intercepts wheel events on a scroll container and animates scrollTop
 * toward the accumulated target using linear interpolation.
 * This gives every scroll interaction a smooth, premium eased feel while
 * keeping the animation strictly tied to user input (no inertia overshoot).
 */
export function useSmoothScroll(containerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetY = container.scrollTop;
    let rafId: number | null = null;

    // Normalize wheel delta across deltaMode variants
    const normalizeDelta = (e: WheelEvent): number => {
      if (e.deltaMode === 1) return e.deltaY * 40;           // lines → pixels
      if (e.deltaMode === 2) return e.deltaY * container.clientHeight; // pages → pixels
      return e.deltaY;
    };

    const tick = () => {
      const current = container.scrollTop;
      const distance = targetY - current;

      if (Math.abs(distance) < 0.5) {
        container.scrollTop = targetY;
        rafId = null;
        return;
      }

      container.scrollTop = current + distance * LERP;
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = container.scrollHeight - container.clientHeight;
      targetY = Math.max(0, Math.min(max, targetY + normalizeDelta(e)));
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [containerRef]);
}
