let rafId: number | null = null;

/**
 * Smoothly scrolls a container to an absolute scrollTop position.
 * Uses ease-out-expo: fast initial movement, very smooth deceleration.
 * Cancels any in-progress scroll animation before starting.
 * Aborts if the user scrolls away mid-animation to prevent backward jitter.
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

  // Track the last scrollTop value we set so we can detect user scroll interruption.
  let lastSet = startY;

  const step = (now: number) => {
    // If scrollTop has diverged more than 10px from what we last wrote,
    // the user has scrolled manually — abort to avoid fighting their input.
    if (Math.abs(container.scrollTop - lastSet) > 10) {
      rafId = null;
      return;
    }
    const t = Math.min((now - startTime) / duration, 1);
    const next = startY + distance * easeOutExpo(t);
    container.scrollTop = next;
    lastSet = next;
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(step);
}
