import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

// hsl(14 95% 52%) — vivid orange-red between --secondary (red) and --primary (orange)
const FOOTER_BG = "hsl(14, 95%, 52%)";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { icon: Github,    label: "GitHub",    href: "#" },
  { icon: Mail,      label: "Mail",      href: "mailto:hello@studiobitbeeld.nl" },
];

interface FooterV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const FooterV2 = ({ scrollContainerRef }: FooterV2Props) => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    // End at "start 0.7": animation completes when footer's top is at 70 % of the
    // viewport — which is reached BEFORE the page hits max scroll. At that point
    // scrollYProgress > 1, Framer Motion clamps it to 1, and y/opacity lock at
    // their final values. This avoids the boundary-measurement bug where Framer
    // Motion fires one last event with a near-zero value at the scroll limit.
    offset: ["start end", "start 0.7"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.footer
      ref={footerRef}
      style={{
        y,
        opacity,
        backgroundColor: FOOTER_BG,
        zIndex: 47,
        position: "relative",
        boxShadow: "0 -24px 60px rgba(0,0,0,0.55)",
      }}
      className="px-6 md:px-16 lg:px-24 pt-10 pb-8 min-h-[32vh] flex flex-col justify-between overflow-hidden"
    >
      {/* ── Main row ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-8 flex-1">

        {/* Left — wordmark anchored to bottom */}
        <div className="flex items-end flex-1 self-end">
          <span
            className="font-display font-black text-black uppercase leading-none select-none"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.025em" }}
          >
            BIT & BEELD
          </span>
        </div>

        {/* Right — statement + social icons */}
        <div className="flex flex-col items-end justify-between gap-6 self-stretch shrink-0 max-w-xs md:max-w-sm">
          <p className="text-black font-display font-black text-xl md:text-2xl lg:text-3xl leading-tight text-right tracking-[-0.01em]">
            Design dat werkt.<br />
            Gebouwd met visie.
          </p>

          <div className="flex items-center gap-4 mt-auto">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-black/60 hover:text-black transition-colors duration-150"
              >
                <Icon size={20} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="mt-8 pt-4 border-t border-black/15 flex items-center justify-between">
        <p className="text-black/40 text-xs font-body uppercase tracking-widest">
          © 2026 Studio Bit & Beeld
        </p>
        <p className="text-black/40 text-xs font-body uppercase tracking-widest">
          Amsterdam, NL
        </p>
      </div>
    </motion.footer>
  );
};

export default FooterV2;
