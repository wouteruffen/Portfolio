import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.jpg";

const COLORS = [
  "hsl(220, 80%, 55%)",  // blue
  "hsl(280, 70%, 55%)",  // purple
  "hsl(350, 80%, 55%)",  // red
  "hsl(25, 95%, 55%)",   // orange
  "hsl(50, 90%, 55%)",   // yellow
  "hsl(160, 70%, 45%)",  // teal
];

const HeroSectionPhoto = () => {
  return (
    <section className="h-screen flex items-center relative overflow-hidden snap-start">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={heroPortrait}
          alt="Creative director portrait"
          className="w-full h-full object-cover object-top"
          width={960}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Rainbow stripe accents - top */}
      <div className="absolute top-0 left-0 right-0 flex h-1.5">
        {COLORS.map((color, i) => (
          <motion.div
            key={i}
            className="flex-1"
            style={{ background: color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-muted-foreground font-body text-xs tracking-[0.3em] uppercase">
            Creatief Bureau — Web · Beeld · Identiteit
          </span>
        </motion.div>

        {/* Text logo with rainbow colors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="mb-4"
        >
          <h1 className="font-display font-extrabold text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            <span className="block">
              {"Bit".split("").map((char, i) => (
                <motion.span
                  key={i}
                  style={{ color: COLORS[i] }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="text-muted-foreground/40 mx-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                &
              </motion.span>
            </span>
            <span className="block">
              {"Beeld".split("").map((char, i) => (
                <motion.span
                  key={i}
                  style={{ color: COLORS[(i + 3) % COLORS.length] }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                .
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Colored pixel blocks as decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex gap-1.5 mb-8"
        >
          {COLORS.map((color, i) => (
            <motion.div
              key={i}
              className="w-3 h-3"
              style={{ background: color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + i * 0.06, type: "spring" }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-md"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body mb-8">
            Wij ontwerpen en bouwen digitale ervaringen die opvallen.
            Webdesign, branding en ontwikkeling vanuit één studio.
          </p>
          <div className="flex gap-4">
            <a
              href="#projecten"
              className="relative overflow-hidden px-8 py-4 font-display font-bold text-sm tracking-widest uppercase text-background transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,80%,55%)] via-[hsl(350,80%,55%)] to-[hsl(50,90%,55%)]" />
              <span className="relative z-10">Bekijk Werk</span>
            </a>
            <a
              href="#contact"
              className="border-2 border-foreground/20 px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:border-[hsl(50,90%,55%)] hover:text-[hsl(50,90%,55%)] transition-colors"
            >
              Contact
            </a>
          </div>
        </motion.div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 flex gap-8 text-xs text-muted-foreground font-body"
        >
          <div>
            <div className="font-semibold mb-1" style={{ color: COLORS[0] }}>Locatie</div>
            Amsterdam, NL
          </div>
          <div className="border-l border-border pl-8">
            <div className="font-semibold mb-1" style={{ color: COLORS[2] }}>Telefoon</div>
            +31 (0)6 1234 5678
          </div>
          <div className="border-l border-border pl-8">
            <div className="font-semibold mb-1" style={{ color: COLORS[4] }}>Web</div>
            studiobitbeeld.nl
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionPhoto;
