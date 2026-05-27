import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { useRef } from "react";

interface HeroV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const HeroV2 = ({ scrollContainerRef }: HeroV2Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(heroScroll, [0, 1], [0, -80]);
  const bgScale = useTransform(heroScroll, [0, 1], [1, 0.96]);
  const darkOverlayOpacity = useTransform(heroScroll, [0, 0.65], [0, 0.88]);
  const contentOpacity = useTransform(heroScroll, [0, 0.35], [1, 0]);

  return (
    <section ref={sectionRef} style={{ minHeight: "300vh", zIndex: 1 }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ y: bgY, scale: bgScale, height: "110%", top: "-5%", width: "100%", position: "absolute" }}
        >
          <img
            src={heroPortrait}
            alt="Creative portrait"
            className="w-full h-full object-cover"
            width={960}
            height={1200}
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: darkOverlayOpacity }}
      />

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

      <motion.div className="absolute inset-0" style={{ opacity: contentOpacity }}>

      {/* Bottom-left description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-20 left-6 md:left-16 lg:left-24 z-10 max-w-sm"
      >
        <p className="text-white/80 text-base md:text-lg leading-relaxed font-body">
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

        <a
          href="#contact"
          className="group inline-flex items-center gap-4 px-16 py-5 rounded-full border-[3px] border-[#FF4A2A] bg-[#FF4A2A]/10 text-[#FF4A2A] font-body font-medium text-2xl tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#FF4A2A] hover:text-black hover:border-[#FF4A2A]"
        >
          Start Project
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#FF4A2A] group-hover:text-black">
            <ArrowUpRight size={26} strokeWidth={2.5} />
          </span>
        </a>
      </motion.div>

      </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;
