import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { consumeHomepageScroll, saveHomepageScroll } from "@/lib/homepageScroll";
import { useIsPhoneLayout } from "@/hooks/use-mobile";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import HeroV2 from "@/components/v2/HeroV2";
import AboutV2 from "@/components/v2/AboutV2";
import ProjectsV2 from "@/components/v2/ProjectsV2";
import ContactV2 from "@/components/v2/ContactV2";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollLogo from "@/components/v2/ScrollLogo";
import MobileHero from "@/components/mobile/MobileHero";
import MobileAbout from "@/components/mobile/MobileAbout";
import MobileProjects from "@/components/mobile/MobileProjects";
import MobileContact from "@/components/mobile/MobileContact";


/*
 * Scroll targets (px) for each section anchor — desktop only, derived from
 * the layout heights:
 *   HeroV2: 300vh | About outer: 200vh, -100vh margin | Projects outer: 650vh, -100vh margin | Contact outer: 200vh, -100vh margin
 * Mobile sections are normal document flow (no fixed vh heights), so mobile
 * scrolls to them by element id instead (see scrollToSection below).
 */
const SECTION_SCROLL_TARGETS: Record<string, number> = {
  "over-ons":  2   * window.innerHeight,   // 200vh
  "projecten": 3   * window.innerHeight,   // 300vh
  "contact":   8.5 * window.innerHeight,   // 850vh
  "__top__":   0,
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [heroLeft, setHeroLeft] = useState(false);
  // True once ScrollLogo's own shrink + crossfade into SolidLogoMark has
  // fully settled — threaded into NavbarV2 as `heroLogoSettled` so it can't
  // visually go solid before the Hero logo has actually finished shrinking
  // into it, regardless of scroll speed. Sticky once true: there's no
  // legitimate reason to "unsettle" it just because the user scrolled back
  // up, and re-scrolling down always re-settles well before the Hero ends.
  const [logoSettled, setLogoSettled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aboutTopRef = useRef<HTMLDivElement>(null);
  const location  = useLocation();
  // Portrait phone OR landscape phone — see useIsPhoneLayout's own comment.
  // Both get the same Mobile* component tree below; tablet/desktop always
  // get the scroll-jacked V2 tree untouched.
  const isPhoneLayout  = useIsPhoneLayout();

  // Desktop/tablet only: the wheel-intercepting LERP loop. Phone layouts
  // (portrait or landscape) use native touch scrolling — wheel events never
  // fire from touch input anyway — so the listener is skipped entirely
  // rather than registered as dead weight.
  const { scrollTo, jumpTo } = useSmoothScroll(scrollRef, !isPhoneLayout);

  useEffect(() => {
    let cancelled = false;
    const minWait = new Promise<void>(resolve => setTimeout(resolve, 2200));
    // Wait for both the minimum display time AND all @font-face fonts to render.
    // On cold cache, fonts load after the JS bundle; without this wait, font
    // layout shifts mid-scroll corrupt useScroll measurements and cause jitter.
    Promise.all([minWait, document.fonts.ready]).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  /*
   * Persists scrollTop to sessionStorage on every scroll event (not just on
   * unmount) so a subpage's "Terug" link can read a correct, already-saved
   * position the instant it first renders. Saving only in an unmount
   * cleanup would race the subpage's initial render: React unmounts Index
   * and mounts the subpage in the same commit, but passive-effect cleanups
   * (where an unmount-only save would run) fire only after that commit and
   * its paint — after the subpage has already rendered its "Terug" href
   * from a stale/empty value.
   *
   * Deliberately no eager save on mount: at mount time scrollTop is 0
   * (nothing has been restored yet — see the restore effect below, gated
   * on isLoading turning false several seconds later), so an immediate
   * write would overwrite a legitimately-saved position with 0 before the
   * restore effect gets a chance to consume it. jumpTo's own scrollTop
   * assignment fires a scroll event on its own, which this listener picks
   * up and re-persists — no eager call needed.
   */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => { saveHomepageScroll(container.scrollTop); };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { container.removeEventListener("scroll", onScroll); };
  }, []);

  /*
   * Unified nav-click / deep-link scroll handler. Desktop sections have
   * fixed vh heights, so it uses the precomputed pixel table via the shared
   * smooth-scroll LERP loop. Mobile sections are normal document flow, so it
   * scrolls straight to the target element by id via native smooth scroll
   * instead — no pixel math to keep in sync with a layout that no longer
   * has fixed heights.
   */
  const scrollToSection = useCallback((sectionId: string) => {
    if (isPhoneLayout) {
      if (sectionId === "__top__") {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const target = SECTION_SCROLL_TARGETS[sectionId];
    if (target != null) scrollTo(target);
  }, [isPhoneLayout, scrollTo]);

  /*
   * After the loading screen exits, scroll to any section referenced in the URL hash.
   * This handles navigation from other pages (e.g. Brandbook → /#over-ons).
   */
  useEffect(() => {
    if (isLoading) return;
    if (!location.hash) return;
    scrollToSection(location.hash.slice(1));
  }, [isLoading, location.hash, scrollToSection]);

  /*
   * Restores the homepage scroll position saved when the user left for a
   * subpage (see the tracking effect above and SubpageHeader's "Terug"
   * link), so returning — via that link or the native browser Back button,
   * which remounts Index the same way — lands back where they were instead
   * of at the top. Skipped when a hash is present (the effect above owns
   * that case: a direct subpage visit with no saved position falls back to
   * a section anchor instead). jumpTo (not scrollTo) applies it instantly,
   * since an animated glide right after mount would read as an unwanted
   * scroll rather than "picking up where you left off".
   */
  useEffect(() => {
    if (isLoading) return;
    if (location.hash) return;
    const saved = consumeHomepageScroll();
    if (saved == null) return;
    jumpTo(saved);
  }, [isLoading, location.hash, jumpTo]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {/* Cursor trail + custom scrollbar are mouse/desktop-only decoration —
          invisible (and pointless) on a touchscreen, so skip mounting them. */}
      {!isPhoneLayout && <CursorEffects />}
      {/* The giant scroll-shrinking wordmark is desktop-Hero-specific;
          both phone layouts get their own small static logo inside
          MobileHero instead. */}
      {!isPhoneLayout && (
        <ScrollLogo
          scrollContainerRef={scrollRef}
          solid={heroLeft}
          onShrinkSettled={() => setLogoSettled(true)}
        />
      )}
      <div
        ref={scrollRef}
        className="overflow-y-auto h-screen bg-background transition-colors duration-500"
      >
        {!isPhoneLayout && (
          <>
            {/*
              Top gradient — stays forced dark while any part of the Hero is still
              visible (heroLeft false) so the Hero's navbar fade never turns
              white/warm in Light Mode. heroLeft is driven by NavbarV2's own
              IntersectionObserver on aboutTopRef (the same sentinel that flips
              the navbar to solid orange), so the gradient, the navbar, and Hero
              visibility all switch on the exact same trigger and can't desync.
              Desktop-Hero-only: the mobile hero has no dark background image
              behind the navbar to fade, so there's nothing for this to do there.
            */}
            <div
              className={`transition-opacity duration-300 fixed top-0 left-0 w-full pointer-events-none z-40 ${heroLeft ? "opacity-0 dark:opacity-100" : "opacity-100"}`}
              style={{ height: "160px", background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)" }}
            />
            <div
              className={`transition-opacity duration-300 fixed top-0 left-0 w-full pointer-events-none z-40 ${heroLeft ? "opacity-100 dark:opacity-0" : "opacity-0"}`}
              style={{ height: "200px", background: "linear-gradient(to bottom, rgba(244,241,235,0.55) 0%, rgba(244,241,235,0.22) 50%, transparent 100%)" }}
            />
          </>
        )}
        <NavbarV2
          scrollContainerRef={scrollRef}
          aboutTopRef={aboutTopRef}
          onScrollToSection={scrollToSection}
          onSolidNavChange={setHeroLeft}
          heroLogoSettled={logoSettled}
        />
        {isPhoneLayout ? (
          <>
            <MobileHero onScrollToSection={scrollToSection} />
            <MobileAbout aboutTopRef={aboutTopRef} />
            <MobileProjects />
            <MobileContact scrollContainerRef={scrollRef} />
          </>
        ) : (
          <>
            <HeroV2 scrollContainerRef={scrollRef} />
            <AboutV2 scrollContainerRef={scrollRef} aboutTopRef={aboutTopRef} />
            <ProjectsV2 scrollContainerRef={scrollRef} />
            <ContactV2 scrollContainerRef={scrollRef} />
          </>
        )}
      </div>
    </>
  );
};

export default Index;
