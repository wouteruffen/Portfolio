import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { LOGO_ZWART, LOGO_ROW1_BOX, LOGO_ROW2_BOX, LogoCrop } from "@/components/v2/BitBeeldLogo";

const ORANGE_BG = BRAND_ORANGE_HSL;
const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;
const EASE_EXIT   = [0.76, 0, 0.24, 1] as const;

interface LoadingScreenProps {
  isLoading: boolean;
}

// Sets the font-size basis the row crops below size themselves from (via
// "0.9em" height, matching the old text's lineHeight: 0.88) — no text is
// actually rendered at this size, it just establishes the em scale.
const LOGO_SIZE_STYLE: React.CSSProperties = {
  fontSize: "clamp(3.5rem, 11vw, 8rem)",
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
          {/* Row 1 — "BIT &": overflow:hidden clips the starting y:105% position */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.2 }}
              className="w-fit"
              style={{ ...LOGO_SIZE_STYLE, height: "0.88em" }}
            >
              <LogoCrop src={LOGO_ZWART} box={LOGO_ROW1_BOX} className="h-full" alt="Bit &" />
            </motion.div>
          </div>

          {/* Row 2 — "BEELD": slight stagger so rows cascade upward */}
          <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.38 }}
              className="w-fit"
              style={{ ...LOGO_SIZE_STYLE, height: "0.88em" }}
            >
              <LogoCrop src={LOGO_ZWART} box={LOGO_ROW2_BOX} className="h-full" alt="Beeld" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
