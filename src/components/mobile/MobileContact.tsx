import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import FooterV2 from "@/components/v2/FooterV2";
import { SECTION_TITLE_CLASS, SECTION_TITLE_DIVIDER_CLASS } from "@/lib/sectionTitle";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, amount: 0.15 } as const;

interface MobileContactProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Mobile "Contact" — a single normal-flow section (no 200vh sticky pin, no
 * fixed-position footer choreography). The form fields are sized for touch
 * (taller tap targets, larger text) rather than shrunk desktop inputs.
 * FooterV2 renders in its own "standalone" mode (no revealProgress prop),
 * which already does a simple scroll-triggered fade — exactly right for
 * sitting in normal flow here.
 */
const MobileContact = ({ scrollContainerRef }: MobileContactProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <section id="contact" className="relative scroll-mt-24 px-6 pt-24 landscape-mobile:pt-14 pb-20 landscape-mobile:pb-8 overflow-hidden bg-background">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <h2 className={`relative z-10 ${SECTION_TITLE_CLASS} mb-4 landscape-mobile:mb-2`}>Contact</h2>
        <div className={`${SECTION_TITLE_DIVIDER_CLASS} mb-8 landscape-mobile:mb-4`} />

        {/* landscape-mobile: info column + form side by side (same pairing
            desktop's ContactV2 already uses), so the two don't have to stack
            and eat the whole limited height in sequence. */}
        <div className="landscape-mobile:grid landscape-mobile:grid-cols-2 landscape-mobile:gap-8 landscape-mobile:items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 text-2xl landscape-mobile:text-base font-antonio font-semibold text-foreground leading-tight mb-6 landscape-mobile:mb-3"
            >
              Klaar om iets <span className="text-brand-orange">moois</span> te bouwen?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
              className="relative z-10 flex flex-col gap-4 landscape-mobile:gap-2 text-sm landscape-mobile:text-[11px] text-foreground/60 font-body mb-10 landscape-mobile:mb-0"
            >
              <div>
                <div className="font-body font-medium mb-1 landscape-mobile:mb-0.5 uppercase text-xs landscape-mobile:text-[9px] tracking-widest text-brand-orange/70">Email</div>
                hello@studiobitbeeld.nl
              </div>
              <div>
                <div className="font-body font-medium mb-1 landscape-mobile:mb-0.5 uppercase text-xs landscape-mobile:text-[9px] tracking-widest text-brand-orange/70">Telefoon</div>
                +31 (0)6 1234 5678
              </div>
              <div>
                <div className="font-body font-medium mb-1 landscape-mobile:mb-0.5 uppercase text-xs landscape-mobile:text-[9px] tracking-widest text-brand-orange/70">Locatie</div>
                Amsterdam, NL
              </div>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            onSubmit={handleSubmit}
            className="relative z-10 space-y-6 landscape-mobile:space-y-2 bg-foreground/5 border border-foreground/10 rounded-xl p-6 landscape-mobile:p-4"
          >
            <div>
              <label htmlFor="name-mobile" className="block text-xs landscape-mobile:text-[9px] text-foreground/50 font-body uppercase tracking-widest mb-2 landscape-mobile:mb-1">
                Naam
              </label>
              <input
                id="name-mobile"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 landscape-mobile:py-1 text-base landscape-mobile:text-xs text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors placeholder:text-foreground/30"
                placeholder="Jouw naam"
              />
            </div>
            <div>
              <label htmlFor="email-mobile" className="block text-xs landscape-mobile:text-[9px] text-foreground/50 font-body uppercase tracking-widest mb-2 landscape-mobile:mb-1">
                Email
              </label>
              <input
                id="email-mobile"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 landscape-mobile:py-1 text-base landscape-mobile:text-xs text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors placeholder:text-foreground/30"
                placeholder="jouw@email.nl"
              />
            </div>
            <div>
              <label htmlFor="message-mobile" className="block text-xs landscape-mobile:text-[9px] text-foreground/50 font-body uppercase tracking-widest mb-2 landscape-mobile:mb-1">
                Bericht
              </label>
              <textarea
                id="message-mobile"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b-2 border-foreground/20 py-3 landscape-mobile:py-1 landscape-mobile:h-12 text-base landscape-mobile:text-xs text-foreground font-body focus:outline-none focus:border-brand-orange transition-colors resize-none placeholder:text-foreground/30"
                placeholder="Vertel over je project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-orange text-black px-8 landscape-mobile:px-6 py-4 landscape-mobile:py-2 rounded-full font-body font-medium text-sm landscape-mobile:text-xs tracking-widest uppercase active:scale-[0.98] transition-transform"
            >
              Verstuur Bericht
            </button>
          </motion.form>
        </div>
      </section>

      <FooterV2 scrollContainerRef={scrollContainerRef} />
    </>
  );
};

export default MobileContact;
