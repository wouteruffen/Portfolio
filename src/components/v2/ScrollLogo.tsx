import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { NEAR_BLACK_HEX, CREAM_HEX } from "@/lib/brandColor";
// @ts-ignore
import "@fontsource/anton";

interface ScrollLogoProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  /**
   * True once the navbar has gone solid (About has covered the Hero). Colors
   * the logo the same theme-aware foreground as the navbar's own text at
   * that point — cream in Light Mode (against the near-black solid bar),
   * near-black in Dark Mode (against the cream solid bar) — using the same
   * 0.4s/easeInOut so both cross-fade in sync.
   */
  solid?: boolean;
}

// Scroll past this → shrink. Drop below this → grow back.
const SHRINK_THRESHOLD = 50;
const GROW_THRESHOLD = 30;

const ScrollLogo = ({ scrollContainerRef, solid = false }: ScrollLogoProps) => {
  const [isSmall, setIsSmall] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      // Functional update reads the latest state without needing it as a dep,
      // avoiding listener re-registration (and the brief gap it caused) on every
      // isSmall state change.
      setIsSmall(prev => {
        if (!prev && scrollTop > SHRINK_THRESHOLD) return true;
        if (prev && scrollTop < GROW_THRESHOLD) return false;
        return prev;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const textColor = solid ? (theme === "light" ? CREAM_HEX : NEAR_BLACK_HEX) : CREAM_HEX;
  const colorTransition = { duration: 0.4, ease: "easeInOut" as const };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: 0 }}
      animate={{
        opacity: 1,
        scale: isSmall ? 0.10 : 1,
        y: isSmall ? -62 : 0,
      }}
      transition={
        isSmall
          ? { duration: 0.85, ease: [0.33, 1, 0.68, 1] }
          : { scale: { duration: 0.85, ease: [0.33, 1, 0.68, 1] }, y: { duration: 0.85, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.6, delay: 0.4 } }
      }
      // left matches NavbarV2's own horizontal padding exactly at each
      // breakpoint (md:px-12 / lg:px-24) so the logo's left edge always
      // lines up with the navbar content above it — previously a fixed
      // 96px regardless of viewport, which only matched the lg (desktop)
      // padding and drifted out of alignment at tablet widths (md, where
      // the navbar itself sits at 48px). landscape-mobile matches the
      // navbar's own safe-area-aware padding there too, and top/right move
      // to Tailwind classes (was inline style) purely so the landscape-mobile
      // variant below is able to override them — inline styles always beat
      // classes regardless of specificity.
      className="fixed z-50 pointer-events-none left-12 lg:left-24 landscape-mobile:left-[max(1rem,env(safe-area-inset-left))] top-20 right-4 landscape-mobile:top-14 landscape-mobile:right-[max(1rem,env(safe-area-inset-right))]"
      style={{
        transformOrigin: "top left",
      }}
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "110%", color: CREAM_HEX }}
          animate={{ y: 0, color: textColor }}
          transition={{ y: { duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }, color: colorTransition }}
          className="text-[18vw] md:text-[14vw] lg:text-[12vw] landscape-mobile:text-[clamp(1.25rem,6.5vh,2rem)] leading-[0.9] tracking-[-0.02em] uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Bit &
        </motion.h1>
      </div>
      <div className="overflow-hidden landscape-mobile:!pb-1" style={{ paddingBottom: "5vw" }}>
        <motion.h1
          initial={{ y: "110%", color: CREAM_HEX }}
          animate={{ y: 0, color: textColor }}
          transition={{ y: { duration: 1, delay: 0.55, ease: [0.33, 1, 0.68, 1] }, color: colorTransition }}
          className="text-[18vw] md:text-[14vw] lg:text-[12vw] landscape-mobile:text-[clamp(1.25rem,6.5vh,2rem)] leading-[0.9] tracking-[-0.02em] uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Beeld
          <motion.span
            animate={{ opacity: isSmall ? 0 : 1, color: textColor }}
            transition={{ opacity: { duration: 0.3 }, color: colorTransition }}
            className="text-[3vw] md:text-[2vw] lg:text-[1.5vw] landscape-mobile:text-[0.65rem] ml-[0.1em]"
            style={{
              display: "inline-block",
              verticalAlign: "-0.5em",
              lineHeight: 1,
              fontFamily: "'Anton', sans-serif",
            }}
          >
            ®
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default ScrollLogo;
