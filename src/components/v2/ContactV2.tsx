import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import React from "react";
import FooterV2 from "./FooterV2";
import { SECTION_TITLE_CLASS, SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS, SECTION_TITLE_DIVIDER_CLASS, SECTION_TITLE_PADDING_TOP_CLASS } from "@/lib/sectionTitle";

const EASE    = [0.22, 1, 0.36, 1] as const;
const VP      = { once: true } as const;

interface ContactV2Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const ContactV2 = ({ scrollContainerRef }: ContactV2Props) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Entrance progress: outer top moves from viewport bottom → viewport top ──
  const { scrollYProgress: revealProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "start start"],
  });

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

  // ── Dwell progress: 0 at snap, 1 when outer fully scrolled past ─────────────
  // With a 200vh outer and 100vh sticky pin, the true "pinned" dwell is 100vh.
  // After that, the sticky pin gradually scrolls off (100vh). Either way the
  // footer (position:fixed) is immune to sticky pin movement — it is rendered
  // OUTSIDE the sticky/transform hierarchy as a viewport-fixed element.
  const { scrollYProgress: contentProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // Footer reveal — normalized to contentProgress's TRUE achievable range,
  // not an arbitrary early cutoff. With a 200vh outer and a -100vh margin,
  // the outer's "start start" → "end start" span (0→1 for contentProgress)
  // requires the outer to travel a full 200vh, but only 100vh of that is
  // ever real, reachable scroll distance (the other 100vh is cancelled by
  // the negative margin) — so contentProgress can mathematically never
  // exceed 0.5. The previous version mapped just [0, 0.45] of that to the
  // reveal, clamping to "fully revealed" 0.05 short of the actual scroll
  // ceiling; scrolling back up had to cross back through that whole
  // plateau before ANYTHING moved, reading as "the footer won't slide back
  // down" for smaller reverse-scroll gestures. Mapping the reveal to the
  // EXACT [0, 0.5] ceiling instead means it completes precisely at the
  // natural scroll end, with zero dead zone in either direction.
  const footerReveal = useTransform(contentProgress, [0, 0.5], [0, 1]);

  // Nudge contact content upward as the footer slides in — title stays fixed.
  const contentCardY = useTransform(contentProgress, [0, 0.45], [0, -60]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/*
        Outer: 200vh. The sticky pin (100vh) gives 100vh of true dwell after
        snap. After that, the pin gradually exits (another 100vh). The footer
        is NOT inside either — it lives as position:fixed below, so the sticky
        pin's exit cannot pull it away.
      */}
      <div
        ref={outerRef}
        style={{
          height: "200vh",
          marginTop: "-100vh",
          position: "relative",
          zIndex: 46,
        }}
      >
        {/*
          Pure sticky pin — no transforms ever on this element.
          transform on the same element as position:sticky breaks sticky in
          Chromium/Safari by lifting it into a separate compositing layer.
        */}
        <div
          id="contact"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: 46,
          }}
        >
          <motion.section
            ref={sectionRef}
            className="relative overflow-hidden flex flex-col"
            style={{
              backgroundColor: "hsl(var(--background))",
              y: revealY,
              borderRadius: revealRadius,
              height: "100%",
              boxShadow: "var(--section-shadow)",
            }}
          >
            {/* Grid texture — same opacity in both themes (0.06): Light
                Mode's lines are near-black (--foreground = var(--near-black)
                here), Dark Mode's are the light --foreground already used
                before. Equal weight, mirrored tone, both equally present. */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* ── Title ────────────────────────────────────────────────── */}
            <div
              className={`relative z-10 w-full ${SECTION_TITLE_GUTTER_CLASS} flex-shrink-0 ${SECTION_TITLE_PADDING_TOP_CLASS}`}
              style={{ paddingBottom: "12px" }}
            >
              <div className={SECTION_TITLE_CONTAINER_CLASS}>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.8, ease: EASE }}
                  className={SECTION_TITLE_CLASS}
                >
                  Contact
                </motion.h2>
              </div>
            </div>

            {/* Divider */}
            <div className={SECTION_TITLE_DIVIDER_CLASS} />

            {/* ── Content ──────────────────────────────────────────────── */}
            <motion.div
              className="relative z-10 flex-1 flex items-center px-6 md:px-16 lg:px-24 pb-8 overflow-hidden"
              style={{ y: contentCardY }}
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16">

                  {/* Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VP}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  >
                    <p className="text-2xl md:text-4xl font-antonio font-semibold text-foreground leading-tight">
                      Klaar om iets
                      <span className="text-brand-orange"> moois</span> te bouwen?
                    </p>
                    <div className="mt-6 h-px w-48 bg-brand-orange/35" />
                    <div className="flex flex-col gap-4 text-sm text-foreground/50 font-body mt-6">
                      <div>
                        <div className="font-body font-medium mb-1 uppercase text-xs tracking-widest text-brand-orange/70">Email</div>
                        hello@studiobitbeeld.nl
                      </div>
                      <div>
                        <div className="font-body font-medium mb-1 uppercase text-xs tracking-widest text-brand-orange/70">Telefoon</div>
                        +31 (0)6 1234 5678
                      </div>
                      <div>
                        <div className="font-body font-medium mb-1 uppercase text-xs tracking-widest text-brand-orange/70">Locatie</div>
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
                    className="space-y-5 bg-foreground/5 border border-foreground/10 p-6 md:p-8"
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
                        className="w-full bg-transparent border-b-2 border-foreground/20 py-2.5 text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors placeholder:text-foreground/30"
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
                        className="w-full bg-transparent border-b-2 border-foreground/20 py-2.5 text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors placeholder:text-foreground/30"
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
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-foreground/20 py-2.5 text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors resize-none placeholder:text-foreground/30"
                        placeholder="Vertel over je project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-orange text-black px-8 py-3.5 font-body font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-opacity mt-2"
                    >
                      Verstuur Bericht
                    </button>
                  </motion.form>

                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/*
        Footer is rendered OUTSIDE the outer wrapper and the sticky pin entirely.
        position:fixed pins it to the viewport bottom regardless of what the
        sticky pin does. footerReveal (0→1) drives y from "100%" (footer's own
        height below the viewport) to "0%" (footer resting at viewport bottom).
        Once revealed, y stays at "0%" for the remainder of the scroll and the
        footer is permanently visible — Contact scrolling away cannot take it.
      */}
      <FooterV2
        scrollContainerRef={scrollContainerRef}
        revealProgress={footerReveal}
      />
    </>
  );
};

export default ContactV2;
