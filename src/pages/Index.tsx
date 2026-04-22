import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState, useEffect, useRef } from "react";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import HeroV2 from "@/components/v2/HeroV2";
import AboutV2 from "@/components/v2/AboutV2";
import ProjectsV2 from "@/components/v2/ProjectsV2";
import ContactV2 from "@/components/v2/ContactV2";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollLogo from "@/components/v2/ScrollLogo";

const DARK_BG = "hsl(0, 0%, 8%)";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutActive, setAboutActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
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
        <section
          className="relative min-h-screen snap-start overflow-hidden"
          style={{ backgroundColor: "hsl(0, 0%, 8%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </section>
        <footer
          className="py-6 px-6 md:px-16 lg:px-24 snap-start"
          style={{ background: DARK_BG }}
        >
          <div className="h-px bg-foreground/10 mb-4" />
          <div className="flex items-center justify-between">
            <p className="text-foreground/30 text-sm font-body">
              © 2026 Studio Bit & Beeld. Alle rechten voorbehouden.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
