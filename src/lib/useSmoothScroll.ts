import { useEffect, useRef, RefObject, useCallback } from "react";

const LERP = 0.10;

/**
 * Intercepts wheel events on a scroll container and animates scrollTop
 * toward the accumulated target using linear interpolation.
 *
 * Returns a `scrollTo(target)` function that shares the same RAF loop and
 * targetY ref, so programmatic navigation never fights the wheel handler.
 */
export function useSmoothScroll(containerRef: RefObject<HTMLDivElement>, enabled: boolean = true) {
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
    // On mobile, native touch scrolling handles everything and wheel events
    // don't fire from touch input anyway — skip attaching the listener
    // entirely rather than registering dead weight on every phone visit.
    if (!enabled) return;
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
  }, [containerRef, startTick, enabled]);

  const scrollTo = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    const max = container.scrollHeight - container.clientHeight;
    targetYRef.current = Math.max(0, Math.min(max, target));
    startTick();
  }, [containerRef, startTick]);

  /**
   * Instantly sets scrollTop AND the LERP target in one step, unlike
   * scrollTo (which animates toward the target over several frames). Used
   * to restore a saved position on mount, where an animated glide would
   * look like an unwanted scroll rather than "picking up where you left off".
   */
  const jumpTo = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const max = container.scrollHeight - container.clientHeight;
    const clamped = Math.max(0, Math.min(max, target));
    targetYRef.current = clamped;
    container.scrollTop = clamped;
  }, [containerRef]);

  return { scrollTo, jumpTo };
}
