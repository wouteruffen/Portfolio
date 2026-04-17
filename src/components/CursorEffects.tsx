import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

let dotId = 0;

const CursorEffects = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const lastPos = useRef({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    setPos({ x, y });

    const last = lastPos.current;
    const dist = Math.hypot(x - last.x, y - last.y);
    if (dist > 12) {
      lastPos.current = { x, y };
      setTrail((prev) => [...prev.slice(-14), { id: dotId++, x, y }]);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollPercent(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  const size = 28;
  const thickness = 1.5;

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Trail dots */}
        {trail.map((dot, i) => {
          const opacity = ((i + 1) / trail.length) * 0.4;
          const dotSize = 2 + ((i + 1) / trail.length) * 2;
          return (
            <div
              key={dot.id}
              className="absolute rounded-full bg-primary"
              style={{
                left: dot.x - dotSize / 2,
                top: dot.y - dotSize / 2,
                width: dotSize,
                height: dotSize,
                opacity,
                transition: "opacity 0.3s ease-out",
              }}
            />
          );
        })}

        {/* Crosshair - horizontal */}
        <div
          className="absolute bg-primary"
          style={{
            left: pos.x - size / 2,
            top: pos.y - thickness / 2,
            width: size,
            height: thickness,
          }}
        />
        {/* Crosshair - vertical */}
        <div
          className="absolute bg-primary"
          style={{
            left: pos.x - thickness / 2,
            top: pos.y - size / 2,
            width: thickness,
            height: size,
          }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full bg-primary"
          style={{
            left: pos.x - 2,
            top: pos.y - 2,
            width: 4,
            height: 4,
          }}
        />
      </div>

      {/* Custom scrollbar */}
      <div className="fixed top-4 right-4 bottom-4 w-1.5 z-50 rounded-full overflow-hidden bg-muted/60">
        <motion.div
          className="w-full rounded-full bg-primary"
          style={{ height: `${scrollPercent}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  );
};

export default CursorEffects;
