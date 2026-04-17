import { motion } from "framer-motion";

const LOGO_COLOR_CLASSES = [
  "bg-brand-red",
  "bg-brand-orange",
  "bg-brand-yellow",
  "bg-brand-green",
  "bg-brand-blue",
];

const HeroSection = () => {
  return (
    <section className="h-screen flex items-center px-6 md:px-16 lg:px-24 relative overflow-hidden snap-start">
      {/* Retro grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(0 0% 40%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(0 0% 40%) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />


      {/* Large decorative text */}
      <div className="absolute bottom-[10%] right-8 text-[18vw] font-display font-extrabold text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter">
        B&B
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex gap-1">
            {LOGO_COLOR_CLASSES.map((colorClass) => (
              <div key={colorClass} className={`w-2.5 h-2.5 ${colorClass}`} />
            ))}
          </div>
          <span className="text-muted-foreground font-body text-xs tracking-[0.3em] uppercase">
            Creatief Bureau — Web · Beeld · Identiteit
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="text-[11vw] md:text-[9vw] lg:text-[7vw] font-display font-extrabold leading-[0.95] tracking-tight"
          >
            Studio
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="text-[11vw] md:text-[9vw] lg:text-[7vw] font-display font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="text-foreground">Bit</span>
            <span className="text-foreground mx-2 md:mx-4">&</span>
            <span className="text-foreground">Beeld</span>
            <span className="text-foreground">.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed font-body">
            Wij ontwerpen en bouwen digitale ervaringen die opvallen.
            Webdesign, branding en ontwikkeling vanuit één studio.
          </p>
          <div className="flex gap-4">
            <a
              href="#projecten"
              className="bg-primary text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Bekijk Werk
            </a>
            <a
              href="#contact"
              className="border-2 border-primary/40 text-primary px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="pointer-events-none absolute -bottom-16 right-0 w-[36%] opacity-[0.06] blur-[4px]"
          aria-hidden="true"
        >
          {LOGO_COLOR_CLASSES.map((colorClass, index) => (
            <motion.div
              key={colorClass}
              animate={{ x: [0, index % 2 === 0 ? 32 : -24, 0], scaleX: [1, index === 1 ? 0.96 : 1.04, 1] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              className={`h-1 mb-1 origin-left ${colorClass}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
