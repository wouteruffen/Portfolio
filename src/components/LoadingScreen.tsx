import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import "@fontsource/anton";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import {
  LOGO_ZWART,
  LOGO_ROW1_BOX,
  LOGO_ROW2_BOX,
  LOGO_MARK_BOX,
  LOGO_MARK_IN_ROW2,
  LOGO_ROW_GAP_FRACTION,
  LogoCrop,
} from "@/components/v2/BitBeeldLogo";

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

// Each row's own em-basis (matches the "0.88em" height on the row wrappers
// below) — shared with the row-gap margin so the two can't quietly drift
// apart. Same role as ScrollLogo.tsx's ROW_HEIGHT_EM, just this component's
// own value.
const ROW_HEIGHT_EM = 0.88;

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: ORANGE_BG }}
        exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE_EXIT } }}
      >
        <div>
          {/* Row 1 — "BIT &": overflow:hidden clips the starting y:105% position */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.15 }}
              className="w-fit"
              style={{ ...LOGO_SIZE_STYLE, height: `${ROW_HEIGHT_EM}em` }}
            >
              <LogoCrop src={LOGO_ZWART} box={LOGO_ROW1_BOX} className="h-full" alt="Bit &" />
            </motion.div>
          </div>

          {/* Row 2 — "BEELD": slight stagger so rows cascade upward.
              marginTop reproduces the official SVG's own gap between the two
              rows (LOGO_ROW_GAP_FRACTION, same math as ScrollLogo.tsx) —
              without it the two tight row crops sit edge-to-edge, losing the
              artwork's real spacing. */}
          <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: EASE_REVEAL, delay: 0.3 }}
              className="relative w-fit"
              style={{
                ...LOGO_SIZE_STYLE,
                height: `${ROW_HEIGHT_EM}em`,
                marginTop: `${LOGO_ROW_GAP_FRACTION * ROW_HEIGHT_EM}em`,
              }}
            >
              <LogoCrop src={LOGO_ZWART} box={LOGO_ROW2_BOX} className="h-full" alt="Beeld" />
              {/* Trailing ® mark — same LOGO_MARK_BOX/LOGO_MARK_IN_ROW2 pair
                  ScrollLogo.tsx uses to pin it against its own row2 crop, so
                  its position is derived from the official SVG's own
                  geometry rather than guessed. A plain child of row2's own
                  reveal motion.div, so it rides row2's existing slide-up
                  animation for free — no separate animation to add. */}
              <div
                className="absolute"
                style={{
                  left: `${LOGO_MARK_IN_ROW2.left}%`,
                  top: `${LOGO_MARK_IN_ROW2.top}%`,
                  width: `${LOGO_MARK_IN_ROW2.width}%`,
                  height: `${LOGO_MARK_IN_ROW2.height}%`,
                }}
              >
                <LogoCrop src={LOGO_ZWART} box={LOGO_MARK_BOX} className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
