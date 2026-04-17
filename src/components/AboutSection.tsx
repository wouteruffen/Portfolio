import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MarqueeText from "@/components/MarqueeText";
import aboutPortrait from "@/assets/about-portrait.jpg";

const skills = [
  "React", "TypeScript", "Figma", "Tailwind CSS", "Branding",
  "UI/UX Design", "Framer Motion", "Next.js", "Node.js", "SEO",
];

const AboutSection = () => {
  return (
    <section id="over-ons" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 lg:px-24 relative snap-start">
      <div className="border-y border-border py-4 mb-12">
        <MarqueeText
          text="Over Mij · About Me · Over Mij · About Me"
          speed={25}
          reverse
          className="text-2xl md:text-4xl font-display font-extrabold text-muted-foreground/30 leading-none"
        />
      </div>
      {/* Retro grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(25 95% 55%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(25 95% 55%) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-10 font-body uppercase">Over Mij</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-2xl md:text-3xl font-display font-extrabold leading-snug text-foreground mb-6">
                Ik ben een creatieve freelancer die merken helpt groeien met doordacht design en slimme technologie.
              </p>
              <div className="space-y-4 text-muted-foreground font-body">
                <p>Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die impact maken.</p>
                <p>Van merkidentiteit tot volledige webplatformen — ik bouw alles met precisie, passie en een scherp oog voor detail.</p>
              </div>
              <Link
                to="/over-mij"
                className="inline-flex items-center gap-2 mt-6 bg-primary text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors group"
              >
                Meer over mij
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={aboutPortrait}
                  alt="Portret van de oprichter"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1067}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { num: "50+", label: "Projecten" },
            { num: "8", label: "Jaar ervaring" },
            { num: "100%", label: "Maatwerk" },
            { num: "∞", label: "Koffie" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-display font-extrabold text-primary">{stat.num}</div>
              <div className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-xs tracking-[0.3em] text-muted-foreground mb-6 font-body uppercase">Skills & Tools</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="px-4 py-2 border border-border text-sm font-body text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
