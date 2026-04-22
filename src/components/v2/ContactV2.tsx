import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import React from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const DARK_BG = "hsl(0, 0%, 8%)";
const EASE    = [0.22, 1, 0.36, 1] as const;
const VP      = { once: true } as const;

interface ContactV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const ContactV2 = ({ scrollContainerRef }: ContactV2Props) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);

  const { scrollYProgress: revealProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "start start"],
  });

  // Same dramatic entrance as Projects — starts 800px off-screen below
  const revealY = useTransform(
    revealProgress,
    [0, 0.40, 0.60, 0.65, 1],
    [800, 380, 10, 0, 0],
  );
  const revealRadius = useTransform(
    revealProgress,
    [0, 0.60, 0.65, 1],
    ["20px 20px 0px 0px", "20px 20px 0px 0px", "0px 0px 0px 0px", "0px 0px 0px 0px"],
  );

  useMotionValueEvent(revealProgress, "change", (latest) => {
    if (latest >= 0.65 && !hasSnapped.current) {
      hasSnapped.current = true;
      const container = scrollContainerRef?.current;
      const section = sectionRef.current;
      if (container && section) {
        const targetY = section.getBoundingClientRect().top + container.scrollTop;
        smoothScrollTo(container, targetY);
      }
    }
    if (latest < 0.25) {
      hasSnapped.current = false;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center py-24 px-6 md:px-16 lg:px-24 relative snap-start overflow-hidden"
      style={{
        backgroundColor: DARK_BG,
        y: revealY,
        borderRadius: revealRadius,
        marginTop: "-100vh",
        zIndex: 46,
        boxShadow: "0 -24px 60px rgba(0,0,0,0.55)",
      }}
    >
      {/* Grid texture — matches About */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="flex items-center justify-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-start gap-2"
          >
            <h2 className="text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[-0.02em] text-foreground/80 uppercase text-center font-display font-extrabold">
              Contact
            </h2>
            <span className="text-foreground/40 text-xs md:text-sm font-body mt-2 md:mt-4">(Mail)</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — tagline + contact details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <p className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
              Klaar om iets
              <span className="text-secondary"> moois</span> te bouwen?
            </p>

            <div className="mt-8 h-px w-48 bg-foreground/20" />

            <div className="flex flex-col gap-6 text-sm text-foreground/50 font-body mt-8">
              <div>
                <div className="font-semibold mb-1 uppercase text-xs tracking-widest text-foreground/70">Email</div>
                hello@studiobitbeeld.nl
              </div>
              <div>
                <div className="font-semibold mb-1 uppercase text-xs tracking-widest text-foreground/70">Telefoon</div>
                +31 (0)6 1234 5678
              </div>
              <div>
                <div className="font-semibold mb-1 uppercase text-xs tracking-widest text-foreground/70">Locatie</div>
                Amsterdam, NL
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-foreground/5 border border-foreground/10 p-8"
          >
            <div>
              <label htmlFor="name-v2" className="block text-xs text-foreground/50 font-body uppercase tracking-widest mb-2">
                Naam
              </label>
              <input
                id="name-v2"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 text-foreground font-body focus:outline-none focus:border-secondary transition-colors placeholder:text-foreground/30"
                placeholder="Jouw naam"
              />
            </div>
            <div>
              <label htmlFor="email-v2" className="block text-xs text-foreground/50 font-body uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                id="email-v2"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 text-foreground font-body focus:outline-none focus:border-secondary transition-colors placeholder:text-foreground/30"
                placeholder="jouw@email.nl"
              />
            </div>
            <div>
              <label htmlFor="message-v2" className="block text-xs text-foreground/50 font-body uppercase tracking-widest mb-2">
                Bericht
              </label>
              <textarea
                id="message-v2"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 text-foreground font-body focus:outline-none focus:border-secondary transition-colors resize-none placeholder:text-foreground/30"
                placeholder="Vertel over je project..."
              />
            </div>
            <button
              type="submit"
              className="bg-foreground text-background px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:bg-secondary hover:text-foreground transition-colors mt-4"
            >
              Verstuur Bericht
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactV2;
