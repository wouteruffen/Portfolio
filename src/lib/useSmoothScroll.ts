import { useEffect, useRef, RefObject, useCallback } from "react";

const LERP = 0.10;

/**
 * Intercepts wheel events on a scroll container and animates scrollTop
 * toward the accumulated target using linear interpolation.
 *
 * Returns a `scrollTo(target)` function that shares the same RAF loop and
 * targetY ref, so programmatic navigation never fights the wheel handler.
 */
export function useSmoothScroll(containerRef: RefObject<HTMLDivElement>) {
  const targetYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const startTick = useCallback(() => {
    if (rafRef.current !== null) return;
    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      const current = container.scrollTop;
      const distance = targetYRef.current - current;
      if (Math.abs(distance) < 0.5) {
        container.scrollTop = targetYRef.current;
        rafRef.current = null;
        return;
      }
      container.scrollTop = current + distance * LERP;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    targetYRef.current = container.scrollTop;

    const normalizeDelta = (e: WheelEvent): number => {
      if (e.deltaMode === 1) return e.deltaY * 40;
      if (e.deltaMode === 2) return e.deltaY * container.clientHeight;
      return e.deltaY;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = container.scrollHeight - container.clientHeight;
      targetYRef.current = Math.max(0, Math.min(max, targetYRef.current + normalizeDelta(e)));
      startTick();
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [containerRef, startTick]);

  const scrollTo = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    const max = container.scrollHeight - container.clientHeight;
    targetYRef.current = Math.max(0, Math.min(max, target));
    startTick();
  }, [containerRef, startTick]);

  return { scrollTo };
}
