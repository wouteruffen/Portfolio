import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";

const ORANGE_BG = BRAND_ORANGE_HSL;
const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;
const EASE_EXIT   = [0.76, 0, 0.24, 1] as const;

interface LoadingScreenProps {
  isLoading: boolean;
}

const LINE_STYLE: React.CSSProperties = {
  fontFamily: "'Anton', sans-serif",
  fontSize: "clamp(3.5rem, 11vw, 8rem)",
  letterSpacing: "-0.02em",
  lineHeight: 0.88,
  color: "black",
  textTransform: "uppercase",
  userSelect: "none",
  display: "block",
};

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: ORANGE_BG }}
        exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE_EXIT } }}
      >
        <div>
          {/* Line 1 — "BIT &": overflow:hidden clips the starting y:105% position */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.2 }}
            >
              <span style={LINE_STYLE}>Bit &</span>
            </motion.div>
          </div>

          {/* Line 2 — "BEELD": slight stagger so lines cascade upward */}
          <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.38 }}
            >
              <span style={LINE_STYLE}>Beeld</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
