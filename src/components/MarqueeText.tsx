import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
}

const MarqueeText = ({ text, speed = 20, className = "", reverse = false }: MarqueeTextProps) => {
  const repeats = 6;
  const items = Array.from({ length: repeats }, (_, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="font-display font-extrabold">{text}</span>
      <span className="w-3 h-3 bg-[hsl(0,80%,50%)] rotate-45" />
    </span>
  ));

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex items-center gap-8"
        animate={{ x: reverse ? ["0%", `-${100 / repeats}%`] : [`-${100 / repeats}%`, "0%"] }}
        transition={{
          x: { duration: speed, repeat: Infinity, ease: "linear" },
        }}
      >
        {items}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
