import { motion } from "framer-motion";

/**
 * Full-width horizontal marquee placed directly under the fixed navbar.
 *
 * How the seamless loop works:
 *   The motion div contains ITEMS repeated twice. Animating x from "0%" to
 *   "-50%" moves the strip left by exactly half its own width — landing on
 *   an identical copy of the starting frame. Framer Motion then repeats
 *   infinitely, creating a gapless loop with no JavaScript scroll events.
 *
 * Edge fades:
 *   A mask-image gradient on the outer wrapper softens both edges, giving
 *   the text a premium "fade into nothing" appearance without any extra DOM.
 *
 * Navbar offset:
 *   The fixed navbar is ~80px tall (py-5 × 2 + content). Set the wrapper's
 *   paddingTop to match — or pass a `top` prop if your navbar height varies.
 */

const TEXT    = "HI! IK BEN WOUTER";
const SEP     = "✦";               // separator between repetitions
const ITEMS   = 8;                  // how many copies fill one "half" of the strip
const SPEED   = 28;                 // seconds for one full cycle — lower = faster
const NAVBAR_H = 80;                // px — must match your fixed navbar height

interface MarqueeSectionProps {
  /** Override navbar height if yours differs from the default 80 px */
  navbarHeight?: number;
  /** Override scroll speed in seconds */
  speed?: number;
}

const MarqueeSection = ({
  navbarHeight = NAVBAR_H,
  speed = SPEED,
}: MarqueeSectionProps) => {
  return (
    <section
      className="relative overflow-hidden bg-[hsl(0,0%,8%)]"
      style={{
        paddingTop: navbarHeight,
        /* Edge fades — gradient is horizontal so only left/right edges dissolve */
        maskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      {/* Top border */}
      <div className="w-full h-px bg-white/10" />

      <div className="py-5 md:py-6">
        {/*
          overflow-hidden on this inner div prevents any subpixel bleed
          from becoming a horizontal scrollbar on the page.
        */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/*
              Two identical halves. When x reaches -50% the second half
              is in exactly the same position the first half started in.
            */}
            {[0, 1].map((half) => (
              <span key={half} className="flex items-center">
                {Array.from({ length: ITEMS }, (_, i) => (
                  <span
                    key={i}
                    className="flex items-center font-logo uppercase text-white/90 tracking-tight leading-none"
                    style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
                  >
                    {TEXT}
                    <span
                      className="mx-6 md:mx-10 text-white/30 flex-shrink-0"
                      style={{ fontSize: "0.45em" }}
                      aria-hidden
                    >
                      {SEP}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px bg-white/10" />
    </section>
  );
};

export default MarqueeSection;
