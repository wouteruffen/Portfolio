import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";

const DARK_BG = "hsl(0, 0%, 8%)";
const ACCENT = "hsl(350, 58%, 36%)";
const EASE = [0.22, 1, 0.36, 1] as const;

// Shared viewport config — all text elements trigger at the same threshold
// so delays alone control the stagger, not individual visibility timing.
const VP = { once: false, amount: 0.25 } as const;

const AboutV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const imageY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section
      ref={sectionRef}
      id="over-ons"
      className="relative min-h-screen flex flex-col pt-8 md:pt-12 pb-0 snap-start overflow-hidden"
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

      <div className="relative flex-1 w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">

        {/* Title — parallax only, no entrance animation. Already present as graphic layer. */}
        <motion.h2
          className="relative z-10 text-[13vw] md:text-[10vw] font-display font-extrabold leading-[0.85] tracking-tighter pointer-events-none select-none"
          style={{
            y: titleY,
            color: `hsl(350 55% 52% / 0.45)`,
            textShadow: `0 0 60px hsl(350 58% 36% / 0.18)`,
          }}
        >
          ABOUT
          <br />
          ME
        </motion.h2>

        <div className="relative -mt-[4vw] md:-mt-[3vw] grid grid-cols-1 md:grid-cols-[56%_44%] gap-3 md:gap-4">

          {/* Left: text — no wrapper animation, each child reveals independently */}
          <div className="self-end relative z-20 pb-4 md:pb-8 order-2 md:order-1 pointer-events-auto">

            {/* Label — first text element, enters as image is still sliding */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              viewport={VP}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span
                className="text-[9px] tracking-[0.4em] font-body uppercase"
                style={{ color: ACCENT }}
              >
                Introduction
              </span>
            </motion.div>

            {/* Heading — focal point of the text side */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
              viewport={VP}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-extrabold text-foreground leading-[1.0] mb-3"
            >
              Hi, I'm Wouter
            </motion.h3>

            {/* Body — appears as heading settles */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              viewport={VP}
              className="space-y-3 mb-5"
            >
              <p className="text-foreground/55 font-body text-sm leading-relaxed">
                Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die impact maken. Van merkidentiteit tot volledige webplatformen — ik bouw alles met precisie en passie.
              </p>
              <p className="text-foreground/55 font-body text-sm leading-relaxed">
                Ik geloof in de kracht van doordacht ontwerp. Elk project begint met een helder concept en eindigt met iets dat er niet alleen goed uitziet, maar ook écht werkt.
              </p>
            </motion.div>

            {/* Button — last detail, enters after everything else */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
              viewport={VP}
              whileHover={{ scale: 1.04 }}
              style={{ transformOrigin: "left center" }}
              className="inline-block"
            >
              <Link
                to="/over-mij"
                className="inline-flex items-center gap-3 text-white px-7 py-3.5 font-display font-bold text-xs tracking-[0.2em] uppercase group"
                style={{ backgroundColor: ACCENT }}
              >
                Meer over mij
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right: image — main focal point, stronger slide-in with scale */}
          <motion.div
            className="self-start relative z-0 md:-mt-[9vw] order-1 md:order-2"
            style={{ y: imageY }}
          >
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.97 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
              viewport={{ once: false, amount: 0.12 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
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
          </motion.div>

        </div>
      </div>

      {/* Marquee — pinned to bottom of section */}
      <div
        className="mt-auto py-5 md:py-6 overflow-hidden"
        style={{
          borderTop: `1px solid hsl(0 0% 100% / 0.12)`,
          borderBottom: `1px solid hsl(0 0% 100% / 0.12)`,
        }}
      >
        <motion.div
          className="flex items-center gap-14 text-xl md:text-2xl whitespace-nowrap font-display font-extrabold tracking-widest"
          style={{ color: "hsl(0 0% 100% / 0.28)" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 35, repeat: Infinity, ease: "linear" } }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="flex items-center gap-14 shrink-0 select-none">
              HI, I'M WOUTER
              <span
                className="w-2 h-2 rotate-45 inline-block flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              CREATIVE DEVELOPER
              <span
                className="w-2 h-2 rotate-45 inline-block flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              DESIGN & DEVELOPMENT
              <span
                className="w-2 h-2 rotate-45 inline-block flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutV2;
