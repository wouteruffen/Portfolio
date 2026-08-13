import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import CursorEffects from "@/components/CursorEffects";
import heroImg from "@/assets/hero-webdesign.jpg";
import projectWeb from "@/assets/project-web.jpg";

const ProjectWebdesign = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <NavbarV2 forceSolid />

        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <img src={heroImg} alt="Webdesign showcase" className="w-full h-full object-cover" width={1200} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-6">
                <ArrowLeft size={16} /> Terug naar home
              </Link>
              <h1 className="text-5xl md:text-7xl font-logo leading-tight">
                Webdesign &<br /><span className="text-primary">Development</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-antonio font-semibold mb-6">Websites die werken</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Elk project begint met een duidelijke strategie. Ik ontwerp en bouw websites die niet alleen mooi zijn, maar ook converteren en resultaat opleveren.</p>
                <p>Van snelle landingspagina's tot complexe webapplicaties — alles wordt gebouwd met moderne technologieën zoals React, TypeScript en Tailwind CSS.</p>
                <p>Performance, toegankelijkheid en SEO zijn geen afterthoughts maar fundamenten van elk project.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={projectWeb} alt="Web project voorbeeld" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
              </div>
            </motion.div>
          </div>

          {/* Process */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Werkwijze</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "Doelen, doelgroep en concurrentie in kaart brengen." },
                { step: "02", title: "Design", desc: "Wireframes en visueel ontwerp in Figma." },
                { step: "03", title: "Development", desc: "Pixel-perfect bouwen met moderne tech stack." },
                { step: "04", title: "Launch", desc: "Testen, optimaliseren en live zetten." },
              ].map((item) => (
                <div key={item.step} className="border-t border-border pt-6">
                  <span className="text-primary font-antonio font-semibold text-2xl">{item.step}</span>
                  <h3 className="font-antonio font-semibold text-foreground text-lg mt-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24">
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Vercel", "Supabase"].map((tech) => (
                <span key={tech} className="px-4 py-2 border border-border text-sm font-body text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-24 text-center">
            <p className="text-2xl md:text-4xl font-antonio font-semibold mb-8">
              Klaar voor een nieuwe <span className="text-primary">website</span>?
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
        </section>

        <FooterV2 />
      </div>
    </>
  );
};

export default ProjectWebdesign;
