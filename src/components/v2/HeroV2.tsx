import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { useEffect, useState } from "react";

interface HeroV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const HeroV2 = ({ scrollContainerRef }: HeroV2Props) => {
  const [darkOverlay, setDarkOverlay] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const p = Math.min(scrollTop / (windowHeight * 0.6), 1);
      setDarkOverlay(p);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <section className="h-screen relative overflow-hidden snap-start">
      {/* Full-screen background photo */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroPortrait}
          alt="Creative portrait"
          className="w-full h-full object-cover"
          width={960}
          height={1200}
        />
      </motion.div>

      {/* Base dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Scroll-based darkening overlay */}
      <div
        className="absolute inset-0 bg-black transition-none"
        style={{ opacity: darkOverlay * 0.85 }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Bottom-left description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-20 left-6 md:left-16 lg:left-24 z-10 max-w-sm"
      >
        <p className="text-white/80 text-sm md:text-base leading-relaxed font-body">
          <span className="text-white font-semibold">Wij ontwerpen merken, websites en digitale ervaringen</span>{" "}
          met intentie, helderheid en zorg.
        </p>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 flex justify-between items-end text-[10px] text-white/30 font-body tracking-[0.15em] uppercase z-20"
      >
        <div className="flex gap-6">
          <span>#01 Brand Strategy</span>
          <span>#02 Identity Design</span>
          <span className="hidden md:inline">#03 Webdesign</span>
          <span className="hidden md:inline">#04 Creative Direction</span>
        </div>

        {/* START PROJECT button */}
        <a
          href="#contact"
          className="group flex items-center gap-4 px-8 py-4 rounded-full border-2 border-[hsl(10,85%,50%)] text-[hsl(10,85%,50%)] font-display font-bold text-sm tracking-[0.15em] uppercase hover:bg-[hsl(10,85%,50%)] hover:text-black transition-all duration-300"
        >
          Start Project
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroV2;
