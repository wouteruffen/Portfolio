import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CursorEffects from "@/components/CursorEffects";
import aboutPortrait from "@/assets/about-portrait.jpg";

const skills = [
  "React", "TypeScript", "Figma", "Tailwind CSS", "Branding",
  "UI/UX Design", "Framer Motion", "Next.js", "Node.js", "SEO",
  "Adobe Creative Suite", "Webflow", "Git", "Responsive Design", "Accessibility",
];

const timeline = [
  { year: "2018", title: "Start als freelancer", desc: "Begonnen met kleine webprojecten en lokale bedrijven." },
  { year: "2019", title: "Eerste grote klant", desc: "Volledige merkidentiteit en website voor een tech-startup." },
  { year: "2021", title: "Studio Bit & Beeld", desc: "Officieel gestart onder de naam Studio Bit & Beeld." },
  { year: "2023", title: "Focus op digitale producten", desc: "Uitgebreid naar SaaS-platformen en complexe webapplicaties." },
  { year: "2026", title: "Vandaag", desc: "50+ projecten afgerond, continue groei en vernieuwing." },
];

const OverMijPage = () => {
  return (
    <>
      <CursorEffects />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `
              linear-gradient(hsl(25 95% 55%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(25 95% 55%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
          <div className="px-6 md:px-16 lg:px-24 pb-16 pt-32 max-w-7xl mx-auto w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-6">
                <ArrowLeft size={16} /> Terug naar home
              </Link>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight">
                Over <span className="text-primary">Mij</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Intro + Photo */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-6 leading-snug">
                Ik ben een creatieve freelancer die merken helpt groeien met doordacht design en slimme technologie.
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die impact maken. Mijn passie ligt bij het vertalen van complexe ideeën naar strakke, functionele oplossingen.</p>
                <p>Van merkidentiteit tot volledige webplatformen — ik bouw alles met precisie, passie en een scherp oog voor detail. Elk project is een kans om iets unieks te creëren.</p>
                <p>Als eenmanszaak werk ik nauw samen met mijn klanten. Korte lijnen, snelle beslissingen en persoonlijke aandacht voor elk detail.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={aboutPortrait} alt="Portret van de oprichter" className="w-full h-full object-cover" loading="lazy" width={800} height={1067} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary" />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border py-12">
            {[
              { num: "50+", label: "Projecten" },
              { num: "8", label: "Jaar ervaring" },
              { num: "100%", label: "Maatwerk" },
              { num: "∞", label: "Koffie" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="text-4xl font-display font-extrabold text-primary">{stat.num}</div>
                <div className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto relative">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `
              linear-gradient(hsl(25 95% 55%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(25 95% 55%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10">
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-12 font-body uppercase">Tijdlijn</h2>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-t border-border py-8"
                >
                  <span className="text-primary font-display font-extrabold text-2xl">{item.year}</span>
                  <div>
                    <h3 className="font-display font-extrabold text-foreground text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-body mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Skills & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="px-4 py-2 border border-border text-sm font-body text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Mijn Waarden</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Kwaliteit boven kwantiteit", desc: "Liever één project goed dan drie half. Elk detail telt." },
                { title: "Transparante communicatie", desc: "Geen verrassingen. Eerlijk, direct en altijd bereikbaar." },
                { title: "Continu leren", desc: "Technologie evolueert, en ik evolueer mee. Altijd up-to-date." },
              ].map((value) => (
                <div key={value.title} className="border border-border p-6 hover:border-primary transition-colors">
                  <h3 className="font-display font-extrabold text-foreground text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-2xl md:text-4xl font-display font-extrabold mb-8">
              Laten we <span className="text-primary">samenwerken</span>
            </p>
            <Link to="/#contact" className="inline-block bg-primary text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
              Neem Contact Op
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default OverMijPage;
