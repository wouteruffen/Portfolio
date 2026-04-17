import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";

const DARK_BG = "hsl(0, 0%, 8%)";

const AboutV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven transforms
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.6], [20, -20]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);
  const labelX = useTransform(scrollYProgress, [0.1, 0.5], [-20, 0]);

  return (
    <section
      ref={sectionRef}
      id="over-ons"
      className="relative min-h-[140vh] py-32 md:py-48 snap-start overflow-hidden"
      style={{ backgroundColor: DARK_BG }}
    >
      {/* Subtle grid */}
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

      <div className="relative px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        {/* === LAYERED COMPOSITION === */}
        <div className="relative min-h-[80vh]">

          {/* Portrait image — dominant, right-shifted */}
          <motion.div
            className="relative md:absolute md:right-0 md:top-0 z-10 md:w-[55%] lg:w-[48%]"
            style={{ y: imageY, scale: imageScale }}
          >
            <div className="aspect-[3/4] max-w-[500px] mx-auto md:ml-auto overflow-hidden">
              <img
                src={aboutPortrait}
                alt="Portret van Wouter"
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={1067}
              />
            </div>
          </motion.div>

          {/* Oversized title — overlapping the image */}
          <motion.h2
            className="relative z-20 text-[18vw] md:text-[12vw] lg:text-[10vw] font-display font-extrabold text-foreground leading-[0.85] tracking-tighter md:mt-12 pointer-events-none select-none"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            ABOUT
            <br />
            <span className="text-foreground/15">ME</span>
          </motion.h2>

          {/* Text block — positioned under/beside the image */}
          <motion.div
            className="relative z-30 mt-12 md:mt-0 md:absolute md:bottom-0 md:left-0 md:max-w-[45%] lg:max-w-[40%]"
            style={{ y: textY, opacity: textOpacity }}
          >
            {/* Label */}
            <motion.div className="flex items-center gap-3 mb-6" style={{ x: labelX }}>
              <div className="w-10 h-px bg-foreground/20" />
              <span className="text-[10px] tracking-[0.4em] text-foreground/30 font-body uppercase">
                Introduction
              </span>
            </motion.div>

            {/* Heading */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-foreground leading-[1.05] mb-6">
              Hi, I'm Wouter
            </h3>

            {/* Body */}
            <div className="space-y-4 mb-10">
              <p className="text-foreground/40 font-body text-sm leading-relaxed">
                Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die impact maken. Van merkidentiteit tot volledige webplatformen — ik bouw alles met precisie en passie.
              </p>
              <p className="text-foreground/40 font-body text-sm leading-relaxed">
                Ik geloof in de kracht van doordacht ontwerp. Elk project begint met een helder concept en eindigt met iets dat er niet alleen goed uitziet, maar ook écht werkt.
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/over-mij"
              className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 font-display font-bold text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:text-foreground transition-all duration-300 group"
            >
              Meer over mij
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* === MARQUEE at bottom === */}
      <div className="mt-32 md:mt-48 border-y border-foreground/6 py-3 overflow-hidden">
        <motion.div
          className="flex items-center gap-6 text-sm text-foreground/15 whitespace-nowrap font-display font-extrabold"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0 select-none">
              HI, I'M WOUTER
              <span className="w-1 h-1 bg-foreground/15 rotate-45" />
              CREATIVE DEVELOPER
              <span className="w-1 h-1 bg-foreground/15 rotate-45" />
              DESIGN & DEVELOPMENT
              <span className="w-1 h-1 bg-foreground/15 rotate-45" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutV2;
