import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeaderSection from "@/components/v2/SubpageHeaderSection";
import CursorEffects from "@/components/CursorEffects";
import { getHomeReturnHref } from "@/lib/homepageScroll";
import aboutPortrait from "@/assets/about-portrait.jpg";
import { SECTION_TITLE_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, amount: 0.15 } as const;

// Not translated — technology/skill names, same list in both languages.
const skills = [
  "React", "TypeScript", "Figma", "Tailwind CSS", "Branding",
  "UI/UX Design", "Framer Motion", "Next.js", "Node.js", "SEO",
  "Adobe Creative Suite", "Webflow", "Git", "Responsive Design", "Accessibility",
];

const OverMijPage = () => {
  const { t } = useLanguage();
  const om = t.overMij;
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(portraitProgress, [0, 1], [30, -30]);

  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        {/* ── Opening spread ─────────────────────────────────────────── */}
        <SubpageHeaderSection>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              to={getHomeReturnHref("over-ons")}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-foreground/50 hover:text-brand-orange transition-colors mb-10 md:mb-14"
            >
              <ArrowLeft size={14} /> {om.backLink}
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={SECTION_TITLE_CLASS}
          >
            {om.title}
          </motion.h1>
        </SubpageHeaderSection>

        <section className="relative z-10 px-6 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-10 md:gap-12 lg:gap-16">

              {/* Left column — statement, copy, stats */}
              <div className="flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  className="font-antonio font-semibold text-foreground leading-[0.95] tracking-tight mb-6"
                  style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
                >
                  {om.heading.line1}<br />
                  {om.heading.rest} <span className="text-brand-orange">{om.heading.accent}</span>{om.heading.suffix}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                  className="space-y-4 mb-10"
                >
                  <p className="font-body text-lg leading-relaxed text-foreground/60">
                    {om.paragraph1}
                  </p>
                  <p className="font-body text-lg leading-relaxed text-foreground/60">
                    {om.paragraph2}
                  </p>
                </motion.div>

                {/* Stats — integrated inline, not a boxed strip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                  className="flex items-stretch gap-8 md:gap-10"
                >
                  {om.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={i > 0 ? "pl-8 md:pl-10 border-l border-foreground/10" : ""}
                    >
                      <div className="font-antonio font-semibold text-3xl md:text-4xl text-brand-orange">
                        {stat.num}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-body mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column — portrait with depth-shadow + parallax */}
              <motion.div
                ref={portraitRef}
                initial={{ opacity: 0, x: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
                className="relative md:max-w-[400px] md:ml-auto"
                style={{ y: portraitY }}
              >
                <div className="relative aspect-[3/4]">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ transform: "translate(12px, 12px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
                  />
                  <div className="relative z-10 w-full h-full overflow-hidden rounded-2xl">
                    <img
                      src={aboutPortrait}
                      alt={om.portraitAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={1000}
                      height={1333}
                      style={{ transform: "scale(1.06)", transformOrigin: "center top" }}
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── 01 — Tijdlijn ──────────────────────────────────────────── */}
        <section className="relative z-10 px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/10">
          <div className="max-w-[1240px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-antonio font-semibold text-foreground leading-[0.95] tracking-tight mb-10 md:mb-14"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {om.timelineTitle}
            </motion.h2>

            <div>
              {om.timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="grid grid-cols-[64px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-t border-foreground/10 py-7 md:py-8"
                >
                  <span className="text-brand-orange font-antonio font-semibold text-xl md:text-2xl">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-antonio font-semibold text-foreground text-base md:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-foreground/50 text-sm font-body mt-1 leading-relaxed max-w-[52ch]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-foreground/10" />
            </div>
          </div>
        </section>

        {/* ── 02 — Skills & Tools ────────────────────────────────────── */}
        <section className="relative z-10 px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/10">
          <div className="max-w-[1240px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-antonio font-semibold text-foreground leading-[0.95] tracking-tight mb-10 md:mb-14"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {om.skillsTitle}
            </motion.h2>

            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: EASE }}
                  className={`${PILL_CLASS} font-body text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 hover:border-brand-orange hover:text-brand-orange`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 — Waarden ───────────────────────────────────────────── */}
        <section className="relative z-10 px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/10">
          <div className="max-w-[1240px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-antonio font-semibold text-foreground leading-[0.95] tracking-tight mb-10 md:mb-14"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {om.valuesTitle}
            </motion.h2>

            <div>
              {om.values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="grid grid-cols-[64px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-t border-foreground/10 py-7 md:py-8"
                >
                  <span className="text-brand-orange font-antonio font-semibold text-xl md:text-2xl">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-antonio font-semibold text-foreground text-base md:text-lg">
                      {value.title}
                    </h3>
                    <p className="text-foreground/50 text-sm font-body mt-1 leading-relaxed max-w-[52ch]">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-foreground/10" />
            </div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────────────── */}
        <section className="relative z-10 px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-foreground/10">
          <div className="max-w-[1240px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-antonio font-semibold text-foreground leading-tight mb-8"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              {om.ctaHeading.lead} <span className="text-brand-orange">{om.ctaHeading.accent}</span> {om.ctaHeading.rest}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            >
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 text-white font-body font-medium text-xs tracking-[0.18em] uppercase px-8 py-4 bg-brand-orange transition-opacity hover:opacity-80"
              >
                {om.ctaButton}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <FooterV2 />
      </div>
    </>
  );
};

export default OverMijPage;
