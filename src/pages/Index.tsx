import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import HeroV2 from "@/components/v2/HeroV2";
import AboutV2 from "@/components/v2/AboutV2";
import ProjectsV2 from "@/components/v2/ProjectsV2";
import ContactV2 from "@/components/v2/ContactV2";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollLogo from "@/components/v2/ScrollLogo";

const DARK_BG = "hsl(0, 0%, 5%)";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutActive, setAboutActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(scrollRef);

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

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CursorEffects />
      <ScrollLogo scrollContainerRef={scrollRef} />
      <div
        ref={scrollRef}
        className="overflow-y-auto h-screen"
        style={{ background: DARK_BG }}
      >
        {/* Top gradient — improves navbar text contrast over image backgrounds */}
      <div
        className="fixed top-0 left-0 w-full pointer-events-none z-40"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
        }}
      />
      <NavbarV2 scrollContainerRef={scrollRef} isAboutActive={aboutActive} />
        <HeroV2 scrollContainerRef={scrollRef} />
        <AboutV2 scrollContainerRef={scrollRef} onSnap={setAboutActive} />
        <ProjectsV2 scrollContainerRef={scrollRef} />
        <ContactV2 scrollContainerRef={scrollRef} />
      </div>
    </>
  );
};

export default Index;
