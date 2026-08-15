import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BRAND_ORANGE_HSL } from "@/lib/brandColor";
import { SECTION_TITLE_CLASS, SECTION_TITLE_DIVIDER_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";
import { PROJECTS } from "@/lib/projectsData";

const ACCENT = BRAND_ORANGE_HSL;
const EASE   = [0.22, 1, 0.36, 1] as const;
const VP     = { once: true, amount: 0.15 } as const;

/**
 * Mobile "Wat Ik Doe" — the desktop version drives four absolutely-
 * positioned cards through a 650vh scroll-jacked spring-animated stack.
 * That's exactly the kind of oversized scroll effect this redesign is
 * meant to avoid on phones: it fights native scroll, costs a spring
 * recompute on every frame, and doesn't read any better on a small screen.
 * Mobile gets a plain vertical list instead — normal document flow, each
 * card fading in once via `whileInView` (no continuous scroll-linked work).
 */
const MobileProjects = () => {
  return (
    <section id="projecten" className="relative scroll-mt-24 px-6 pt-24 landscape-mobile:pt-14 pb-20 landscape-mobile:pb-8 overflow-hidden bg-background">
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

      <h2 className={`relative z-10 ${SECTION_TITLE_CLASS} mb-4 landscape-mobile:mb-2`}>WAT IK DOE</h2>
      <div className={`${SECTION_TITLE_DIVIDER_CLASS} mb-10 landscape-mobile:mb-5`} />

      <div className="relative z-10 flex flex-col gap-12 landscape-mobile:gap-6">
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.55, ease: EASE }}
            // landscape-mobile: image + copy side by side per card, same
            // reasoning as MobileAbout — a full-width 4:3 image per card
            // would burn most of a 956x440 screen's height on one project.
            className="landscape-mobile:flex landscape-mobile:flex-row landscape-mobile:items-center landscape-mobile:gap-5"
          >
            <div className="rounded-xl overflow-hidden mb-4 landscape-mobile:mb-0 aspect-[4/3] landscape-mobile:aspect-square landscape-mobile:w-[30%] landscape-mobile:flex-shrink-0">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>

            <div className="landscape-mobile:flex-1 landscape-mobile:min-w-0">
              <h3 className="font-antonio font-semibold text-foreground uppercase leading-[0.95] text-2xl landscape-mobile:text-base mb-2 landscape-mobile:mb-1">
                {proj.title}
              </h3>

              <p className="font-body text-foreground/65 text-sm landscape-mobile:text-[11px] leading-relaxed landscape-mobile:leading-snug mb-4 landscape-mobile:mb-2 landscape-mobile:line-clamp-2">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5 landscape-mobile:mb-2 landscape-mobile:hidden">
                {proj.tools.map(tool => (
                  <span
                    key={tool}
                    className={`${PILL_CLASS} font-body text-[9px] uppercase tracking-[0.18em] px-2.5 py-1`}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <Link
                to={proj.href}
                className="group inline-flex items-center gap-2 font-body font-medium text-xs landscape-mobile:text-[10px] tracking-[0.15em] uppercase px-6 landscape-mobile:px-4 py-3 landscape-mobile:py-1.5 rounded-full"
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                Bekijk werk
                <ArrowRight size={13} className="transition-transform group-active:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MobileProjects;
