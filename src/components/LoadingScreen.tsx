import { motion, AnimatePresence } from "framer-motion";

const LOGO_COLOR_CLASSES = [
  "bg-brand-red",
  "bg-brand-orange",
  "bg-brand-yellow",
  "bg-brand-green",
  "bg-brand-blue",
];

const BAR_HEIGHTS = [42, 50, 62, 56, 48];

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-end gap-2"
          >
            {LOGO_COLOR_CLASSES.map((colorClass, index) => (
              <motion.span
                key={colorClass}
                className={`block w-5 ${colorClass}`}
                style={{ height: `${BAR_HEIGHTS[index]}px` }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-10 font-display text-3xl font-black tracking-[0.08em] text-foreground"
          >
            B<span className="text-brand-yellow">&amp;</span>B
          </motion.span>

          <div className="mt-10 h-[4px] w-64 overflow-hidden bg-border/80">
            <motion.div
              className="flex h-full w-24 overflow-hidden"
              initial={{ x: "-120%" }}
              animate={{ x: "340%" }}
              transition={{ duration: 0.9, repeat: 2, ease: "easeInOut" }}
            >
              {LOGO_COLOR_CLASSES.map((colorClass) => (
                <span key={colorClass} className={`h-full flex-1 ${colorClass}`} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
