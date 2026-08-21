import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import SubpageGridBackground from "@/components/v2/SubpageGridBackground";
import SubpageHeader from "@/components/v2/SubpageHeader";
import CursorEffects from "@/components/CursorEffects";
// TEMPORARY placeholder — the original project-product.jpg was lost in an
// asset reorg with no replacement yet decided. Reusing the Kruize website
// screenshot only to unblock the build; swap for the real Digitale
// Producten visual once one exists.
import projectProduct from "@/assets/web/website-timo.jpg";
import { SECTION_TITLE_CONTAINER_CLASS, SECTION_TITLE_GUTTER_CLASS } from "@/lib/sectionTitle";

const ProjectProduct = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        <SubpageGridBackground />

        <SubpageHeader title="Digitale Producten" />

        {/* Content */}
        <section className={`relative z-10 ${SECTION_TITLE_GUTTER_CLASS} py-16 md:py-24`}>
          <div className={SECTION_TITLE_CONTAINER_CLASS}>
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl font-antonio font-semibold mb-6">Complexe problemen, simpele oplossingen</h2>
                <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                  <p>Digitale producten vragen om een andere aanpak. Het draait om gebruikerservaring, schaalbaarheid en slimme architectuur.</p>
                  <p>Van SaaS-platformen tot interne tools en mobiele apps — ik ontwerp en bouw producten die gebruikers graag gebruiken.</p>
                  <p>Met een iteratieve aanpak zorgen we samen dat het product precies aansluit op de behoeften van jouw gebruikers.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={projectProduct} alt="Product design voorbeeld" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                </div>
              </motion.div>
            </div>

            {/* Capabilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
              <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Expertise</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Product Strategie", desc: "Van idee tot roadmap — samen bepalen we wat gebouwd moet worden en waarom." },
                  { title: "UX/UI Design", desc: "Gebruiksvriendelijke interfaces op basis van onderzoek en best practices." },
                  { title: "Full-Stack Development", desc: "Robuuste applicaties met moderne frameworks en schaalbare architectuur." },
                  { title: "Iteratie & Groei", desc: "Data-gedreven optimalisatie na lancering voor continue verbetering." },
                ].map((item) => (
                  <div key={item.title} className="border border-border p-6 hover:border-accent transition-colors">
                    <h3 className="font-antonio font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
              <p className="text-2xl md:text-4xl font-antonio font-semibold mb-8">
                Een <span className="text-accent">product</span> bouwen?
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

export default ProjectProduct;
