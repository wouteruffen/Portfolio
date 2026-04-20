import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";

interface ScrollLogoProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

// Scroll past this → shrink. Drop below this → grow back.
const SHRINK_THRESHOLD = 50;
const GROW_THRESHOLD = 30;

const ScrollLogo = ({ scrollContainerRef }: ScrollLogoProps) => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      if (!isSmall && scrollTop > SHRINK_THRESHOLD) {
        setIsSmall(true);
      } else if (isSmall && scrollTop < GROW_THRESHOLD) {
        setIsSmall(false);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef, isSmall]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: 0 }}
      animate={{
        opacity: 1,
        scale: isSmall ? 0.11 : 1,
        y: isSmall ? -52 : 0,
      }}
      transition={
        isSmall
          ? { duration: 0.85, ease: [0.33, 1, 0.68, 1] }
          : { scale: { duration: 0.85, ease: [0.33, 1, 0.68, 1] }, y: { duration: 0.85, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.6, delay: 0.4 } }
      }
      className="fixed z-50 pointer-events-none"
      style={{
        top: "80px",
        left: "96px",
        right: "16px",
        transformOrigin: "top left",
      }}
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.9] tracking-[-0.02em] text-white uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Bit &
        </motion.h1>
      </div>
      <div className="overflow-hidden" style={{ paddingBottom: "5vw" }}>
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
          className="text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.9] tracking-[-0.02em] text-white uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Beeld
          <motion.span
            animate={{ opacity: isSmall ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-[3vw] md:text-[2vw] lg:text-[1.5vw] text-white ml-[0.1em]"
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
