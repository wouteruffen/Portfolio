import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import HeroV2 from "@/components/v2/HeroV2";
import AboutV2 from "@/components/v2/AboutV2";
import ProjectsV2 from "@/components/v2/ProjectsV2";
import ContactV2 from "@/components/v2/ContactV2";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollLogo from "@/components/v2/ScrollLogo";


/*
 * Scroll targets (px) for each section anchor, derived from the layout heights:
 *   HeroV2: 300vh | About outer: 200vh, -100vh margin | Projects outer: 650vh, -100vh margin | Contact outer: 200vh, -100vh margin
 */
const SECTION_SCROLL_TARGETS: Record<string, number> = {
  "over-ons":  2   * window.innerHeight,   // 200vh
  "projecten": 3   * window.innerHeight,   // 300vh
  "contact":   8.5 * window.innerHeight,   // 850vh
  "__top__":   0,
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutActive, setAboutActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location  = useLocation();

  const { scrollTo } = useSmoothScroll(scrollRef);

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
   * After the loading screen exits, scroll to any section referenced in the URL hash.
   * This handles navigation from other pages (e.g. Brandbook → /#over-ons).
   */
  useEffect(() => {
    if (isLoading) return;
    if (!location.hash) return;
    const sectionId = location.hash.slice(1);
    const target    = SECTION_SCROLL_TARGETS[sectionId];
    if (target == null) return;
    scrollTo(target);
  }, [isLoading, location.hash, scrollTo]);

  /* Passed to NavbarV2 so section-link clicks use the shared LERP loop. */
  const handleScrollToSection = useCallback((sectionId: string) => {
    const target = SECTION_SCROLL_TARGETS[sectionId];
    if (target != null) scrollTo(target);
  }, [scrollTo]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CursorEffects />
      <ScrollLogo scrollContainerRef={scrollRef} />
      <div
        ref={scrollRef}
        className="overflow-y-auto h-screen bg-background transition-colors duration-500"
      >
        {/*
          Top gradient — stays forced dark while the Hero is active (aboutActive
          false) so the Hero's navbar fade never turns white/warm in Light Mode.
          Once About has snapped in (aboutActive true) it cross-fades normally
          between dark mode and light mode for the rest of the page.
        */}
        <div
          className={`transition-opacity duration-300 fixed top-0 left-0 w-full pointer-events-none z-40 ${aboutActive ? "opacity-0 dark:opacity-100" : "opacity-100"}`}
          style={{ height: "160px", background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)" }}
        />
        <div
          className={`transition-opacity duration-300 fixed top-0 left-0 w-full pointer-events-none z-40 ${aboutActive ? "opacity-100 dark:opacity-0" : "opacity-0"}`}
          style={{ height: "200px", background: "linear-gradient(to bottom, rgba(244,241,235,0.55) 0%, rgba(244,241,235,0.22) 50%, transparent 100%)" }}
        />
        <NavbarV2
          scrollContainerRef={scrollRef}
          isAboutActive={aboutActive}
          overHero={!aboutActive}
          onScrollToSection={handleScrollToSection}
        />
        <HeroV2 scrollContainerRef={scrollRef} />
        <AboutV2 scrollContainerRef={scrollRef} onSnap={setAboutActive} />
        <ProjectsV2 scrollContainerRef={scrollRef} />
        <ContactV2 scrollContainerRef={scrollRef} />
      </div>
    </>
  );
};

export default Index;
