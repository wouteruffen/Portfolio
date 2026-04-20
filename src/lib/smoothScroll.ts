let rafId: number | null = null;

/**
 * Smoothly scrolls a container to an absolute scrollTop position.
 * Uses ease-out-expo: fast initial movement, very smooth deceleration.
 * Cancels any in-progress scroll animation before starting.
 */
export function smoothScrollTo(
  container: HTMLElement,
  targetY: number,
  duration = 680,
) {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  const startY = container.scrollTop;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();
  const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    container.scrollTop = startY + distance * easeOutExpo(t);
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(step);
}
