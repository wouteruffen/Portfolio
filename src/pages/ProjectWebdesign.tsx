import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import kruizeMockup from "@/assets/Webdesign 1600x1000.png";
import seoImage from "@/assets/SEO optimalisation .jpeg";
import webhostingImage from "@/assets/Webhosting.jpeg";
import reviewsImage from "@/assets/Reviews3.png";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/** Depth-shadow framed screenshot — same offset-card treatment as the hero project image, reused so every Kruize visual belongs to one family. */
const FramedShot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative h-full">
    <div
      className="absolute inset-0"
      style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
      aria-hidden="true"
    />
    <div className="relative z-[1] h-full border border-border overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover block" loading="lazy" />
    </div>
  </div>
);

const ProjectWebdesign = () => {
  const { t } = useLanguage();
  const pw = t.projectWebdesign;
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title={pw.pageTitle} intro={pw.serviceIntro} />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Uitgelicht project — small eyebrow + subtitle, subordinate to the page's own H1 so the mockup below can be the visual lead */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              {/* Visual + supporting copy — the polished homepage mockup (reused, not duplicated) does the selling; the text stays short and supportive */}
              <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-14">
                <FramedShot
                  src={kruizeMockup}
                  alt={pw.mockupAlt}
                />
                <div className="flex flex-col">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-2">{pw.featuredEyebrow}</h2>
                    <p className="font-antonio font-semibold uppercase tracking-wide text-foreground/80 text-2xl md:text-3xl mb-4">
                      {pw.featuredSubtitle.lead} <span className="text-brand-orange">{pw.featuredSubtitle.client}</span>
                    </p>
                  </motion.div>
                  <p className="text-muted-foreground font-body leading-relaxed mb-8">
                    {pw.intro}
                  </p>
                  <a
                    href="https://bouwbedrijfkruize.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-sm tracking-widest uppercase text-white bg-brand-orange hover:opacity-85 transition-opacity duration-300 w-fit"
                  >
                    {pw.viewWebsite}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Technical SEO — case-specific, not a generic capability pitch */}
              <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-16">
                <div className="order-1 md:order-2">
                  <FramedShot src={seoImage} alt={pw.seoImageAlt} />
                </div>
                <div className="order-2 md:order-1 flex flex-col">
                  <h4 className="font-antonio font-semibold text-foreground/80 uppercase tracking-wide text-2xl md:text-3xl mb-3">{pw.seoTitle}</h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {pw.seoText}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {pw.seoPills.map((item) => (
                      <span key={item} className={`${PILL_CLASS} px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hosting — case-specific, not a generic capability pitch */}
              <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16">
                <FramedShot src={webhostingImage} alt={pw.hostingImageAlt} />
                <div className="flex flex-col">
                  <h4 className="font-antonio font-semibold text-foreground/80 uppercase tracking-wide text-2xl md:text-3xl mb-3">{pw.hostingTitle}</h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {pw.hostingText}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {pw.hostingPills.map((item) => (
                      <span key={item} className={`${PILL_CLASS} px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social proof — real Google reviews, surfaced rather than hidden */}
              <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16">
                <div className="flex flex-col">
                  <h4 className="font-antonio font-semibold text-foreground/80 uppercase tracking-wide text-2xl md:text-3xl mb-3">{pw.reviewsTitle}</h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {pw.reviewsText}
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="font-antonio font-semibold tracking-wide text-4xl text-brand-orange">{pw.reviewsScore}</span>
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-[0.2em] leading-tight">
                      {pw.reviewsScoreLabel[0]}<br />{pw.reviewsScoreLabel[1]}
                    </span>
                  </div>
                </div>
                <div>
                  <FramedShot
                    src={reviewsImage}
                    alt={pw.reviewsImageAlt}
                  />
                </div>
              </div>
            </motion.div>

            {/* Area 2 — ICT. No longer a bordered card — separation from the web content above now comes purely from whitespace. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-32 md:mt-40">
              <h2 className="text-3xl md:text-4xl font-antonio font-semibold text-foreground/80 uppercase tracking-wide">{pw.ictTitle}</h2>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mt-3 mb-8">
                {pw.ictSubtitle}
              </p>

              <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                <div className="flex flex-col">
                  <div className="space-y-3 text-muted-foreground font-body leading-relaxed mb-6">
                    <p>{pw.ictParagraph1}</p>
                    <p>{pw.ictParagraph2}</p>
                  </div>
                  <span className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-body mb-3">{pw.ictTechLabel}</span>
                  <div className="flex flex-wrap gap-2">
                    {pw.ictTech.map((item) => (
                      <span key={item} className={`${PILL_CLASS} px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image placeholder — replace with a real asset once available, e.g.:
                    import itVisual from "@/assets/it/it-werkplek.jpg";
                    then swap the placeholder <div> below for <img src={itVisual} alt="..." className="w-full h-full object-cover" loading="lazy" /> */}
                <div className="relative h-full min-h-[240px]">
                  <div
                    className="absolute inset-0"
                    style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
                    aria-hidden="true"
                  />
                  <div className="relative z-[1] h-full border border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-3 text-center px-6">
                    <ImageIcon size={28} strokeWidth={1.5} className="text-muted-foreground/50" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-body">{pw.ictImagePending}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold text-foreground/80 uppercase tracking-wide mb-8">
                {pw.ctaHeading.lead} <span className="text-brand-orange">{pw.ctaHeading.accent}</span>{pw.ctaHeading.rest}
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-brand-orange bg-brand-orange hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                {pw.startProject}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: "hsl(var(--brand-orange))" }}
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <FooterV2 />
      </div>
    </>
  );
};

export default ProjectWebdesign;
