import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";
import posterDominant from "@/assets/print/a2-screen-1.jpg";
import posterTeal from "@/assets/print/a2-screen-2.jpg";
import posterArtboard from "@/assets/print/artboard-1.jpg";
import posterSimplon from "@/assets/print/b31-simplon.jpg";

/**
 * Same depth-shadow frame treatment used for real work elsewhere on the site
 * (see FramedShot in ProjectWebdesign) — recreated locally rather than
 * imported so this page doesn't reach into another subpage's file. Every
 * poster sits in an identical A-series aspect-ratio box (210/297, same as
 * the source A2 artwork) with object-cover, so all four render at exactly
 * the same size regardless of their native pixel dimensions.
 */
const PosterFrame = ({ src, alt }: { src: string; alt: string }) => (
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
);

const ProjectPrintDesign = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title="Print & Campaign Design" />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-[640px]">
              <h2 className="text-3xl font-antonio font-semibold mb-6">Vormgeving die ook offline werkt</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Niet alles hoeft op een scherm te leven. Posters, flyers en ander drukwerk trekken de aandacht juist doordat ze tastbaar zijn.</p>
                <p>Van los grafisch ontwerp voor een enkele opdracht tot samenhangende campagnebeelden — ik ontwerp print- en promotiemateriaal dat overtuigt, van eerste schets tot drukklaar bestand.</p>
                <p>Ook hier geldt: consistent, doordacht en afgestemd op waar het materiaal daadwerkelijk gebruikt wordt.</p>
              </div>
            </motion.div>

            {/* Real work — poster showcase */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 md:mt-32">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4 font-body uppercase">Posters in de praktijk</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-[560px] mb-10">
                Een selectie posters, van eerste schets tot drukklaar ontwerp.
              </p>

              {/* Uniform poster grid — one poster per column on mobile, two
                  on tablet, all four in a single row on desktop. Every
                  poster sits in an identical aspect-ratio box (see
                  PosterFrame), so the collection reads as one set rather
                  than four independently sized images. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                <PosterFrame src={posterDominant} alt="Posterontwerp, A2 formaat" />
                <PosterFrame src={posterTeal} alt="Posterontwerp, A2 formaat" />
                <PosterFrame src={posterArtboard} alt="Posterontwerp, A2 formaat" />
                <PosterFrame src={posterSimplon} alt="Posterontwerp, A2 formaat" />
              </div>
            </motion.div>

            {/* What can be made */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Wat ik kan maken</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Drukwerk", items: ["Posters & flyers", "Promotiemateriaal", "Drukklare bestanden"] },
                  { title: "Grafisch Ontwerp", items: ["Losse ontwerpopdrachten", "Campagnebeelden", "Visuele consistentie"] },
                  { title: "Toepassing", items: ["Advies over formaat & materiaal", "Afstemming met drukker", "Van concept tot eindresultaat"] },
                ].map((block) => (
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
                Tijd voor <span className="text-secondary">sterk drukwerk</span>?
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-widest uppercase border border-[hsl(350,58%,36%)] bg-[hsl(350,58%,36%)] hover:bg-transparent transition-all duration-300"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.88)" }}
              >
                Start Project
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
