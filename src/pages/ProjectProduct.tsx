import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import CursorEffects from "@/components/CursorEffects";
import heroImg from "@/assets/hero-product.jpg";
import projectProduct from "@/assets/project-product.jpg";

const ProjectProduct = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 />

        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <img src={heroImg} alt="Digital product showcase" className="w-full h-full object-cover" width={1200} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-6">
                <ArrowLeft size={16} /> Terug naar home
              </Link>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight">
                Digitale<br /><span className="text-accent">Producten</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-display font-extrabold mb-6">Complexe problemen, simpele oplossingen</h2>
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
                  <h3 className="font-display font-extrabold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
            <p className="text-2xl md:text-4xl font-display font-extrabold mb-8">
              Een <span className="text-accent">product</span> bouwen?
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

export default ProjectProduct;
