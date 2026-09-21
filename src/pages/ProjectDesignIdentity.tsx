import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { PILL_CLASS } from "@/lib/pill";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
// Real client work. Kruize's guideline pages are the same identity shown on
// its website (see ProjectWebdesign) — documented as a system (clearspace
// grid, letterhead spec) rather than a one-off drawing. FIXY's slides show
// that same kind of system carried into photography and tone of voice.
import kruizeLogoSpacing from "@/assets/design-identity/Screenshot 2026-08-19 120730.png";
import kruizeLetterhead from "@/assets/design-identity/Screenshot 2026-08-19 120801.png";
import fixyCampaign from "@/assets/design-identity/image.jpg";
import fixySpaces from "@/assets/design-identity/Screenshot 2026-08-19 122911.jpg";
// Privacy-safe placeholder versions — real names/emails/phone numbers swapped
// for fictional ones, actual signature design and brand identity untouched.
import signatureBoilermaker from "@/assets/design-identity/Handtekening Boilermaker Placeholder.png";
import signatureFixy from "@/assets/design-identity/Handtekening FIXY placeholder.png";
import signatureWijck from "@/assets/design-identity/Handtekening Wijck Placeholder.png";

// Brand names never translate; only the alt text does (via signatureAlt()).
const SIGNATURE_BRANDS = [
  { src: signatureBoilermaker, brand: "The Boilermaker Group" },
  { src: signatureFixy, brand: "FIXY" },
  { src: signatureWijck, brand: "WIJCK" },
];

/**
 * Same depth-shadow frame treatment used for real work elsewhere on the site
 * (see FramedShot in ProjectWebdesign / PosterFrame in ProjectPrintDesign) —
 * recreated locally rather than imported so this page doesn't reach into
 * another subpage's file. `ratio` keeps each real document/slide at its own
 * native aspect ratio instead of forcing a single uniform box.
 */
const FramedDoc = ({ src, alt, caption, aspectClass }: { src: string; alt: string; caption: string; aspectClass: string }) => (
  <div>
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
        aria-hidden="true"
      />
      <div className={`relative z-[1] border border-border overflow-hidden ${aspectClass}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover block" loading="lazy" />
      </div>
    </div>
    <p className="mt-4 text-xs font-body uppercase tracking-[0.15em] text-muted-foreground">{caption}</p>
  </div>
);

const ProjectDesignIdentity = () => {
  const { t } = useLanguage();
  const di = t.projectDesignIdentity;
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title={di.pageTitle} />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Service introduction — short, general statement about what
                Design & Identiteit means, not tied to any one client. Kept
                brief on purpose so the work below (starting with Kruize)
                carries the page, rather than the intro itself. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 md:mb-20">
              <p className="font-antonio font-medium leading-relaxed max-w-[680px] text-foreground/80" style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)" }}>
                {di.serviceIntro}
              </p>
            </motion.div>

            {/* System — Kruize's identity documented as a repeatable system,
                the first actual project on the page. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">{di.systemEyebrow}</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">{di.systemHeading}</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                {di.systemParagraph}
              </p>
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                <FramedDoc
                  src={kruizeLogoSpacing}
                  alt={di.logoSpacingAlt}
                  caption={di.logoSpacingCaption}
                  aspectClass="aspect-[297/210]"
                />
                <FramedDoc
                  src={kruizeLetterhead}
                  alt={di.letterheadAlt}
                  caption={di.letterheadCaption}
                  aspectClass="aspect-[297/210]"
                />
              </div>
            </motion.div>

            {/* Application — FIXY's identity carried into photography and voice */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">{di.applicationEyebrow}</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">{di.applicationHeading}</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                {di.applicationParagraph}
              </p>
              <div className="flex flex-col gap-8 md:gap-10">
                <FramedDoc
                  src={fixyCampaign}
                  alt={di.fixyCampaignAlt}
                  caption={di.fixyCampaignCaption}
                  aspectClass="aspect-[16/9]"
                />
                <FramedDoc
                  src={fixySpaces}
                  alt={di.fixySpacesAlt}
                  caption={di.fixySpacesCaption}
                  aspectClass="aspect-[16/9]"
                />
              </div>
            </motion.div>

            {/* Consistency — the same practical touchpoint, three different identities */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">{di.consistencyEyebrow}</h2>
              <h3 className="text-2xl md:text-3xl font-antonio font-semibold mb-4">{di.consistencyHeading}</h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[640px] mb-10">
                {di.consistencyParagraph}
              </p>
              {/* Single column up through tablet so every signature stays close to
                  its native size and legible — three columns only once the 1240px
                  container has enough room per card (lg, ≥1024) to compare them
                  side by side without shrinking the type into thumbnails. */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
                {SIGNATURE_BRANDS.map((sig) => (
                  <div key={sig.brand}>
                    <div className="relative">
                      <div
                        className="absolute inset-0"
                        style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
                        aria-hidden="true"
                      />
                      <div className="relative z-[1] border border-border overflow-hidden bg-white flex items-center justify-center h-[150px] md:h-[170px] px-6 md:px-8">
                        <img src={sig.src} alt={di.signatureAlt(sig.brand)} className="max-w-full max-h-full w-auto h-auto object-contain" loading="lazy" />
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-body uppercase tracking-[0.15em] text-muted-foreground">{sig.brand}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What this can cover — compact, portfolio-flavored rather than a service menu */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">{di.coversEyebrow}</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[560px] mb-6">
                {di.coversParagraph}
              </p>
              <div className="flex flex-wrap gap-2">
                {di.disciplines.map((item) => (
                  <span key={item} className={`${PILL_CLASS} px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.1em]`}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold mb-8">
                {di.ctaHeading.lead} <span className="text-accent">{di.ctaHeading.accent}</span>{di.ctaHeading.rest}
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-accent bg-accent hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                {di.startProject}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: "hsl(var(--accent))" }}
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

export default ProjectDesignIdentity;
