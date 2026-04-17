import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CursorEffects from "@/components/CursorEffects";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground snap-y snap-mandatory overflow-y-auto h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <footer className="border-t border-border py-8 px-6 md:px-16 lg:px-24 snap-start">
          <p className="text-muted-foreground text-sm font-body text-center">
            © 2026 Studio Bit & Beeld. Alle rechten voorbehouden.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
