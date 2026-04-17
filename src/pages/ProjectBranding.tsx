import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CursorEffects from "@/components/CursorEffects";
import heroImg from "@/assets/hero-branding.jpg";
import projectBrand from "@/assets/project-brand.jpg";

const ProjectBranding = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <img src={heroImg} alt="Branding showcase" className="w-full h-full object-cover" width={1200} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-6">
                <ArrowLeft size={16} /> Terug naar home
              </Link>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight">
                Merk<span className="text-secondary">identiteit</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-display font-extrabold mb-6">Merken die blijven hangen</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Een sterk merk is meer dan een logo. Het is een compleet visueel systeem dat vertrouwen wekt en herkenning creëert bij je doelgroep.</p>
                <p>Ik ontwikkel merkidentiteiten van de grond af aan: van strategie en positionering tot logo-ontwerp, kleurpaletten, typografie en uitgebreide brandbooks.</p>
                <p>Elk element wordt zorgvuldig ontworpen om samen een consistent en krachtig verhaal te vertellen.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={projectBrand} alt="Branding project voorbeeld" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
              </div>
            </motion.div>
          </div>

          {/* Deliverables */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Wat je krijgt</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Logo & Beeldmerk", items: ["Primair logo", "Varianten (icon, horizontaal)", "Favicon & social assets"] },
                { title: "Visueel Systeem", items: ["Kleurpalet", "Typografie", "Iconografie & patronen"] },
                { title: "Brandbook", items: ["Merkrichtlijnen", "Do's & don'ts", "Toepassingsvoorbeelden"] },
              ].map((block) => (
                <div key={block.title} className="border-t border-border pt-6">
                  <h3 className="font-display font-extrabold text-foreground text-lg mb-4">{block.title}</h3>
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
            <p className="text-2xl md:text-4xl font-display font-extrabold mb-8">
              Tijd voor een <span className="text-secondary">sterk merk</span>?
            </p>
            <Link to="/#contact" className="inline-block bg-primary text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
              Start Project
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default ProjectBranding;
