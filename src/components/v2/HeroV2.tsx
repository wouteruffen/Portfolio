import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { useRef, useState } from "react";

interface HeroV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const SKILLS = [
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.6" />
        <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Vite",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.5 2.5L5 15h5.5l-1 6.5L20 9h-6z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M14 9v5.5a2.5 2.5 0 0 1-5 0M9 9v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M8 12h8M12 9v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "HTML",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <path d="M4 4l1.4 15L12 21l6.6-2L21 4H4z" strokeLinejoin="round" />
        <path d="M8 9h8M8.8 14h6.5l-.5 3.5-3 .8-3-.8-.2-1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "CSS",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <path d="M4 4l1.4 15L12 21l6.6-2L21 4H4z" strokeLinejoin="round" />
        <path d="M8 9h8l-.6 4H9l.3 2.5 2.7.8 2.7-.8.2-1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Figma",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <path d="M9 3h4.5a3 3 0 0 1 0 6H9V3z" />
        <path d="M9 9h3a3 3 0 1 1 0 6H9V9z" />
        <path d="M9 15v-3a3 3 0 1 0 0 6V15z" />
        <circle cx="15.5" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Git",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <circle cx="7" cy="18" r="2" />
        <circle cx="7" cy="6" r="2" />
        <circle cx="17" cy="10" r="2" />
        <path d="M7 8v8M7 8c4-4 10-1 10 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M6 20.5L9 8l4 6 3.5-10L20 20.5H6z" fillOpacity="0.5" />
        <path d="M6 20.5l5.5-13 2.5 4L16.5 5 20 20.5H6z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <path d="M5 4h14v8H5V4zM5 12h7l7 9H5v-9z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Photoshop",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 16V8h3.5a3 3 0 0 1 0 5.5H8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "After Effects",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 16l2.5-8 2.5 8M8.2 13.5h3.6M17 8v8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const HeroV2 = ({ scrollContainerRef }: HeroV2Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(heroScroll, [0, 1], [0, -80]);
  const bgScale = useTransform(heroScroll, [0, 1], [1, 0.96]);
  const darkOverlayOpacity = useTransform(heroScroll, [0, 0.65], [0, 0.88]);
  const contentOpacity = useTransform(heroScroll, [0, 0.35], [1, 0]);

  return (
    <section ref={sectionRef} style={{ minHeight: "300vh", zIndex: 1 }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ y: bgY, scale: bgScale, height: "110%", top: "-5%", width: "100%", position: "absolute" }}
        >
          <img
            src={heroPortrait}
            alt="Creative portrait"
            className="w-full h-full object-cover"
            width={960}
            height={1200}
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: darkOverlayOpacity }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div className="absolute inset-0" style={{ opacity: contentOpacity }}>

      {/* Right-side vertical icon marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-y-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{ right: "3vw" }}
      >
        <div
          style={{
            height: "50vh",
            width: "300px",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            overflow: "visible",
          }}
        >
          <div
            className="pointer-events-auto"
            style={{
              overflow: "hidden",
              height: "100%",
              width: "100%",
              paddingLeft: "12px",
              paddingRight: "12px",
              boxSizing: "border-box",
            }}
          >
            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex flex-col items-end gap-7"
            >
              {[...SKILLS, ...SKILLS].map((skill, i) => {
                const hovered = hoveredSkillIndex === i;
                return (
                  <motion.div
                    key={i}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHoveredSkillIndex(i)}
                    onMouseLeave={() => setHoveredSkillIndex(null)}
                    animate={{ scale: hovered ? 1.08 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div
                      aria-label={skill.name}
                      className="w-16 h-16 flex items-center justify-center flex-shrink-0 text-white/65"
                      style={{
                        borderWidth: "1.5px",
                        borderStyle: "solid",
                        borderColor: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                        backgroundColor: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)",
                        borderRadius: "14px",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: hovered ? "0 0 8px rgba(255,255,255,0.25)" : "none",
                        transition: "border-color 0.2s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out",
                      }}
                    >
                      {skill.svg}
                    </div>

                    <AnimatePresence>
                      {hovered && (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
                          style={{
                            position: "absolute",
                            right: "calc(100% + 14px)",
                            top: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            pointerEvents: "none",
                            whiteSpace: "nowrap",
                            fontSize: "13px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.85)",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {skill.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-20 left-6 md:left-16 lg:left-24 z-10 max-w-sm"
      >
        <p className="text-white/80 text-base md:text-lg leading-relaxed font-body">
          <span className="text-white font-semibold">Wij ontwerpen merken, websites en digitale ervaringen</span>{" "}
          met intentie, helderheid en zorg.
        </p>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 flex justify-between items-end text-[10px] text-white/30 font-body tracking-[0.15em] uppercase z-20"
      >
        <div className="flex gap-6">
          <span>#01 Brand Strategy</span>
          <span>#02 Identity Design</span>
          <span className="hidden md:inline">#03 Webdesign</span>
          <span className="hidden md:inline">#04 Creative Direction</span>
        </div>

        <a
          href="#contact"
          className="group inline-flex items-center gap-4 px-16 py-5 rounded-full border-[3px] border-[#FF4A2A] bg-[#FF4A2A]/10 text-[#FF4A2A] font-body font-medium text-2xl tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#FF4A2A] hover:text-black hover:border-[#FF4A2A]"
        >
          Start Project
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#FF4A2A] group-hover:text-black">
            <ArrowUpRight size={26} strokeWidth={2.5} />
          </span>
        </a>
      </motion.div>

      </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;
