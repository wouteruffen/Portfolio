import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";

interface ScrollLogoProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ScrollLogo = ({ scrollContainerRef }: ScrollLogoProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const p = Math.min(scrollTop / (windowHeight * 0.6), 1);
      setProgress(p);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const isSmall = progress > 0.95;

  // When small: fixed small logo, no scale tricks
  if (isSmall) {
    return (
      <div
        className="fixed z-50 pointer-events-none"
        style={{ top: "28px", left: "96px" }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[1.5rem] leading-none tracking-[-0.01em] text-white uppercase whitespace-nowrap"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Bit & Beeld<sup className="text-[0.55rem] align-super ml-0.5">®</sup>
        </motion.h1>
      </div>
    );
  }

  // Large → shrinking state
  const scale = 1 - progress * 0.88;
  const supOpacity = 1 - progress;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed z-50 pointer-events-none"
      style={{
        top: "80px",
        left: "96px",
        right: "16px",
        transformOrigin: "top left",
        transform: `scale(${scale})`,
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
      {/* paddingBottom gives the overflow-hidden wrapper room to show the lowered ® */}
      <div className="overflow-hidden" style={{ paddingBottom: "5vw" }}>
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
          className="text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.9] tracking-[-0.02em] text-white uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Beeld
          <span
            className="text-[3vw] md:text-[2vw] lg:text-[1.5vw] text-white ml-[0.1em]"
            style={{
              display: "inline-block",
              verticalAlign: "-0.5em",
              opacity: supOpacity,
              lineHeight: 1,
              fontFamily: "'Anton', sans-serif",
            }}
          >
            ®
          </span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default ScrollLogo;
