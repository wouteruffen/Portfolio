import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import posterDominant from "@/assets/print/a2-screen-1.jpg";
import posterTeal from "@/assets/print/a2-screen-2.jpg";
import posterArtboard from "@/assets/print/artboard-1.jpg";
import posterSimplon from "@/assets/print/b31-simplon.jpg";

/**
 * Same depth-shadow frame treatment used for real work elsewhere on the site
 * (see FramedShot in ProjectWebdesign) — recreated locally rather than
 * imported so this page doesn't reach into another subpage's file. Every
 * poster sits in an A-series aspect-ratio box (210/297, close to the real
 * source artwork's own ratio) with object-cover, so cropping is negligible.
 */
const PosterFrame = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <div>
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{ transform: "translate(8px, 8px)", zIndex: 0, backgroundColor: "var(--card-depth-shadow)" }}
        aria-hidden="true"
      />
      <div className="relative z-[1] aspect-[210/297] border border-border overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover block" loading="lazy" />
      </div>
    </div>
    {/* Subordinate to the artwork: small, muted, only rendered when a
        verified identifier actually exists for this poster (see POSTERS) —
        not invented for visual symmetry across all four. */}
    {caption && <p className="mt-3 text-xs font-body uppercase tracking-[0.15em] text-muted-foreground">{caption}</p>}
  </div>
);

/**
 * Each poster's own native pixel width (see asset inspection notes) used as
 * a hard display cap, so no poster is ever upscaled past its real source
 * resolution — a2-screen-1/2 are native ~605-608px, artboard-1/b31-simplon
 * are native 994px. Presented one at a time, full-bleed up to that cap,
 * rather than forced into equal-sized grid cells: an exhibition-style single
 * column lets the two higher-resolution posters actually read larger than
 * the two lower-resolution ones, honestly, instead of averaging every piece
 * down to whatever the smallest source supports.
 */
const POSTERS = [
  { src: posterDominant, key: "dominant", maxWidth: 605, hasCaption: false },
  { src: posterTeal, key: "teal", maxWidth: 608, hasCaption: false },
  { src: posterArtboard, key: "artboard", maxWidth: 994, hasCaption: false },
  { src: posterSimplon, key: "simplon", maxWidth: 994, hasCaption: true },
];

const ProjectPrintDesign = () => {
  const { t } = useLanguage();
  const pd = t.projectPrintDesign;
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title={pd.pageTitle} />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Service introduction — short, general statement about the
                poster work, not explaining print design in the abstract. */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 md:mb-20">
              <p className="font-antonio font-medium leading-relaxed max-w-[680px] text-foreground/80" style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)" }}>
                {pd.postersParagraph}
              </p>
            </motion.div>

            {/* Real work — poster showcase, presented one at a time rather
                than in equal grid cells, each capped at its own native pixel
                width (see POSTERS) so nothing is upscaled. This lets the
                higher-resolution posters (artboard-1, b31-simplon: native
                994px) read noticeably larger than the lower-resolution ones
                (a2-screen-1/2: native ~605-608px) — an exhibition-style
                single column, one poster in full view at a time, rather than
                a uniform thumbnail grid. */}
            <div className="flex flex-col items-center gap-16 md:gap-24">
              {POSTERS.map((poster, i) => (
                <motion.div
                  key={poster.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full"
                  style={{ maxWidth: poster.maxWidth }}
                >
                  <PosterFrame src={poster.src} alt={pd.posterAlt} caption={poster.hasCaption ? pd.simplonCaption : undefined} />
                </motion.div>
              ))}
            </div>

            {/* What can be made */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">{pd.canMakeTitle}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {pd.canMakeBlocks.map((block) => (
                  <div key={block.title} className="border-t border-border pt-6">
                    <h3 className="font-antonio font-semibold text-foreground text-lg mb-4">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="text-muted-foreground text-sm font-body flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold mb-8">
                {pd.ctaHeading.lead} <span className="text-secondary">{pd.ctaHeading.accent}</span>{pd.ctaHeading.rest}
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-[hsl(350,58%,36%)] bg-[hsl(350,58%,36%)] hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                {pd.startProject}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: "hsl(350,58%,36%)" }}
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

export default ProjectPrintDesign;
