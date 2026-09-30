import { useEffect, useRef, RefObject, useCallback } from "react";

// Was 0.10 — measured (via a headless simulation of this exact tick loop)
// to leave a ~600-900ms autonomous glide after the user's last wheel input
// on every scroll, regardless of distance (settle time is a function of
// log(distance), so it barely shortens for small scrolls). 0.18 cuts that
// tail to ~200-400ms while still reading as smoothed motion, not a snap.
const LERP = 0.18;

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

    // Keyboard scrolling (arrow/Page/Space keys on a focused element inside
    // the container) and scrollbar-thumb dragging move scrollTop directly,
    // bypassing onWheel entirely — targetYRef never hears about it and goes
    // stale. The next wheel/trackpad event would then compute its new
    // target from that stale ref instead of from where the page actually
    // is, snapping the LERP toward a target offset by however far the
    // native scroll moved things (confirmed via simulation: this can even
    // reverse the visible scroll direction relative to the user's actual
    // wheel input). Resync targetYRef to the real scrollTop whenever a
    // scroll happens while the LERP loop is idle (rafRef === null) — if the
    // loop is running, this scroll event is our own tick's doing and
    // scrollTop is already converging toward targetYRef on its own, so
    // there's nothing to resync.
    const onScroll = () => {
      if (rafRef.current === null && Math.abs(container.scrollTop - targetYRef.current) > 0.5) {
        targetYRef.current = container.scrollTop;
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scroll", onScroll);
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

  // targetYRef/rafRef are exposed read-only for consumers (ProjectsV2) that
  // need to tell fresh wheel input apart from the LERP still coasting
  // toward an earlier target — rafRef.current is non-null for exactly as
  // long as that coasting is in progress, and targetYRef.current only
  // changes when a real wheel event (or scrollTo/jumpTo) sets a new target.
  // No behavior of this hook changes; these are the same refs it already
  // maintains internally.
  return { scrollTo, jumpTo, targetYRef, rafRef };
}
