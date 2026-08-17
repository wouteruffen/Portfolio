import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
import projectPrint from "@/assets/project-brand.jpg";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";

const ProjectPrintDesign = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title="Print & Design" />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl font-antonio font-semibold mb-6">Vormgeving die ook offline werkt</h2>
                <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                  <p>Niet alles hoeft op een scherm te leven. Posters, flyers en ander drukwerk trekken de aandacht juist doordat ze tastbaar zijn.</p>
                  <p>Van los grafisch ontwerp voor een enkele opdracht tot samenhangende campagnebeelden — ik ontwerp print- en promotiemateriaal dat overtuigt, van eerste schets tot drukklaar bestand.</p>
                  <p>Ook hier geldt: consistent, doordacht en afgestemd op waar het materiaal daadwerkelijk gebruikt wordt.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={projectPrint} alt="Print & Design voorbeeld" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                </div>
              </motion.div>
            </div>

            {/* Deliverables */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Wat je krijgt</h2>
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
